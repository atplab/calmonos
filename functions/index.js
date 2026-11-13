/* Boutique de flocons : Stripe Checkout + webhook. Le prix et le nombre de flocons sont fixés ICI (côté serveur) :
   l'appli n'envoie que l'identifiant du paquet, elle ne peut donc pas changer le prix. */
const {onRequest}=require('firebase-functions/v2/https');
const {defineSecret}=require('firebase-functions/params');
const admin=require('firebase-admin');
const Stripe=require('stripe');
admin.initializeApp();
const STRIPE_KEY=defineSecret('STRIPE_SECRET_KEY'),STRIPE_WH=defineSecret('STRIPE_WEBHOOK_SECRET');
const SITE='https://atplab.github.io/calmonos/';
const ORIGINS=['https://atplab.github.io'];
const PACKS={p1:{f:100,c:99},p2:{f:350,c:299},p3:{f:700,c:499},p4:{f:2000,c:999},p5:{f:4500,c:1999}};

/* 1. Créer une session de paiement (joueur connecté obligatoire) */
exports.createCheckout=onRequest({secrets:[STRIPE_KEY],cors:ORIGINS,region:'us-central1'},async(req,res)=>{
  if(req.method!=='POST')return res.status(405).send('');
  try{
    const tok=(req.get('Authorization')||'').replace(/^Bearer /,'');
    const {uid}=await admin.auth().verifyIdToken(tok);
    const k=String((req.body&&req.body.pack)||''),P=PACKS[k];
    if(!P)return res.status(400).json({error:'pack'});
    const stripe=Stripe(STRIPE_KEY.value());
    const s=await stripe.checkout.sessions.create({
      mode:'payment',
      client_reference_id:uid,
      metadata:{uid,pack:k,flakes:String(P.f)},
      payment_intent_data:{metadata:{uid,pack:k,flakes:String(P.f)}},
      line_items:[{quantity:1,price_data:{currency:'cad',unit_amount:P.c,product_data:{name:P.f+' flocons',description:'Calmos',tax_code:'txcd_10201000'}}}],
      success_url:SITE+'?achat=ok',
      cancel_url:SITE+'?achat=annule'
    },{idempotencyKey:uid+':'+k+':'+Math.floor(Date.now()/10000)});
    res.json({url:s.url});
  }catch(e){console.error(e);res.status(e&&e.code&&String(e.code).startsWith('auth/')?401:500).json({error:'x'})}
});

/* 2. Webhook : Stripe confirme le paiement → on ajoute les flocons, une seule fois par session */
async function credit(s){
  if(s.payment_status!=='paid')return;
  const uid=s.metadata&&s.metadata.uid,P=PACKS[s.metadata&&s.metadata.pack];
  if(!uid||!P)return;
  const db=admin.firestore(),R=db.doc('buys/'+uid),L=db.doc('buys/'+uid+'/s/'+s.id);
  await db.runTransaction(async t=>{
    if((await t.get(L)).exists)return;
    t.set(L,{f:P.f,c:s.amount_total,at:admin.firestore.FieldValue.serverTimestamp()});
    t.set(R,{t:admin.firestore.FieldValue.increment(P.f)},{merge:true});
  });
}
exports.stripeWebhook=onRequest({secrets:[STRIPE_KEY,STRIPE_WH],region:'us-central1'},async(req,res)=>{
  let ev;
  try{ev=Stripe(STRIPE_KEY.value()).webhooks.constructEvent(req.rawBody,req.get('stripe-signature'),STRIPE_WH.value())}
  catch(e){return res.status(400).send('signature')}
  try{
    if(ev.type==='checkout.session.completed'||ev.type==='checkout.session.async_payment_succeeded')await credit(ev.data.object);
    res.json({ok:true});
  }catch(e){console.error(e);res.status(500).send('x')}
});
