/* Firebase : à l’extérieur de Claude, ce petit adaptateur fournit la même interface « claude.use('db' | 'user') » que l’appli utilise déjà,
   avec de vrais comptes (e-mail ou Google) et la base Firestore. Chaque document est stocké sous la forme { j : "<JSON>" }. */
(()=>{
if(window.claude)return;
const CFG={apiKey:"AIzaSyDi7m8lfhpeSHjX-dvIuFkD8oL0PhO-o08",authDomain:"calmonus.firebaseapp.com",projectId:"calmonus",storageBucket:"calmonus.firebasestorage.app",messagingSenderId:"219014024976",appId:"1:219014024976:web:dcaa4e350cbfaf174c9f95"};
const B='https://www.gstatic.com/firebasejs/10.14.1/';
const fb=window.__fb={u:null,ready:false,failed:false};
let P=null;
const load=()=>P||(P=(async()=>{
 const [A,Au,Fs]=await Promise.all([import(B+'firebase-app.js'),import(B+'firebase-auth.js'),import(B+'firebase-firestore.js')]);
 const app=A.initializeApp(CFG),auth=Au.getAuth(app),db=Fs.getFirestore(app);
 try{auth.languageCode='fr'}catch(e){}
 await auth.authStateReady();
 fb.u=auth.currentUser?(auth.currentUser.email||'compte'):null;fb.ready=true;
 Au.onAuthStateChanged(auth,u=>{fb.u=u?(u.email||'compte'):null});
 return{A,Au,Fs,app,auth,db};
})().catch(e=>{fb.failed=true;P=null;throw e}));
setTimeout(()=>{load().catch(()=>{})},0);
const code=e=>{const c=e&&e.code;return c==='permission-denied'||c==='unauthenticated'?'not_granted':'unavailable'};
const parse=d=>{try{const v=d&&d.j!=null?JSON.parse(d.j):null;return v&&typeof v==='object'?v:{}}catch(e){return{}}};
window.claude={use:async n=>{
 let F;try{F=await load()}catch(e){return null}
 const {Fs,auth,db}=F;
 if(n==='user')return{id:async()=>auth.currentUser?auth.currentUser.uid:null,can:async()=>true,isOwner:async()=>false,canEdit:async()=>false};
 if(n==='db'){
  if(!auth.currentUser)return null;
  return{collection:cp=>cp==='profiles'?profilesCol(F):({
   doc:id=>({
    set:async d=>{try{await Fs.setDoc(Fs.doc(db,cp+'/'+id),{j:JSON.stringify(d)})}catch(e){const x=new Error(e&&e.message||'x');x.code=code(e);throw x}},
    get:async()=>{try{const s=await Fs.getDoc(Fs.doc(db,cp+'/'+id));return{exists:s.exists(),data:()=>parse(s.data())}}catch(e){const x=new Error(e&&e.message||'x');x.code=code(e);throw x}},
    delete:async()=>{try{await Fs.deleteDoc(Fs.doc(db,cp+'/'+id))}catch(e){const x=new Error(e&&e.message||'x');x.code=code(e);throw x}},
    onSnapshot:(next,err)=>Fs.onSnapshot(Fs.doc(db,cp+'/'+id),s=>next({id,exists:s.exists(),data:()=>s.exists()?parse(s.data()):undefined,metadata:{fromCache:s.metadata.fromCache,hasPendingWrites:s.metadata.hasPendingWrites}}),e=>{if(err)err(e)})}),
   onSnapshot:(next,err)=>Fs.onSnapshot(Fs.collection(db,cp),sn=>next({docs:sn.docs.map(d=>({id:d.id,data:()=>parse(d.data())})),metadata:{fromCache:sn.metadata.fromCache,hasPendingWrites:sn.metadata.hasPendingWrites}}),e=>{if(err)err(e)})
  })}}
 return null}};

/* ---- Boutique : paiement Stripe (fonction createCheckout) et total des flocons achetés (buys/<uid>, écrit par le webhook) ---- */
const FN='https://us-central1-calmonus.cloudfunctions.net/';
window.fbShop={live:true, // passer à true une fois les fonctions déployées et Stripe configuré
 buy:async k=>{let F;try{F=await load()}catch(e){return{err:'x'}}const u=F.auth.currentUser;if(!u)return{err:'login'};
  try{const t=await u.getIdToken(),r=await fetch(FN+'createCheckout',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+t},body:JSON.stringify({pack:k})});
   if(!r.ok)return{err:r.status===401?'login':'x'};const j=await r.json();if(!j.url)return{err:'x'};location.href=j.url;return{}}catch(e){return{err:'x'}}},
 watch:cb=>{load().then(F=>{let un=null;F.Au.onAuthStateChanged(F.auth,u=>{if(un){un();un=null}if(!u)return;un=F.Fs.onSnapshot(F.Fs.doc(F.db,'buys/'+u.uid),x=>cb(x.exists()?(+x.data().t||0):0),()=>{})})}).catch(()=>{})}
};

/* ---- Social : on ne lit plus tous les profils, seulement le sien, ceux de mes amis et de ceux qui m’ont ajouté ou offert un cadeau ----
   Index d’appoint : codes/<CODE> = { u: uid } (recherche d’un ami par son code) ; inbox/<uid> = { <expéditeur>: 1 } (qui m’a ajouté ou gâté). */
const OKID=/^[A-Za-z0-9_-]{1,128}$/,OKC=/^[A-HJKMNP-Z2-9]{8}$/,MK='fb:mk:',tried=new Set();
let LIVE=null;
async function index(F,uid,d){
 if(!d||typeof d!=='object')return;const {Fs,db}=F;let S;
 try{S=new Set(JSON.parse(localStorage.getItem(MK+uid))||[])}catch(e){S=new Set()}
 const T=[];
 if(typeof d.code==='string'&&OKC.test(d.code))T.push(['c:'+d.code,()=>Fs.setDoc(Fs.doc(db,'codes/'+d.code),{u:uid})]);
 const R=new Set();
 Object.entries(d.fr||{}).forEach(([k,t])=>{if(+t>0&&OKID.test(k))R.add(k)});
 Object.values(d.s||{}).forEach(m=>{if(m&&typeof m==='object')Object.entries(m).forEach(([k,n])=>{if(+n>0&&OKID.test(k))R.add(k)})});
 R.forEach(k=>{if(k!==uid)T.push(['i:'+k,()=>Fs.setDoc(Fs.doc(db,'inbox/'+k),{[uid]:1},{merge:true})])});
 let ch=false;
 for(const [key,fn] of T.filter(t=>!S.has(t[0])&&!tried.has(uid+t[0])).slice(0,40)){
  tried.add(uid+key);
  try{await fn();S.add(key);ch=true}catch(e){tried.delete(uid+key)}
 }
 if(ch){try{localStorage.setItem(MK+uid,JSON.stringify([...S]))}catch(e){}}
}
function profilesCol(F){
 const {Fs,db,auth}=F,uid=auth.currentUser.uid;
 return{
  doc:id=>({
   set:async d=>{try{await Fs.setDoc(Fs.doc(db,'profiles/'+id),{j:JSON.stringify(d)})}catch(e){const x=new Error(e&&e.message||'x');x.code=code(e);throw x}if(id===uid)index(F,uid,d).catch(()=>{})},
   get:async()=>{try{const s=await Fs.getDoc(Fs.doc(db,'profiles/'+id));return{exists:s.exists(),data:()=>parse(s.data())}}catch(e){const x=new Error(e&&e.message||'x');x.code=code(e);throw x}},
   delete:async()=>{try{await Fs.deleteDoc(Fs.doc(db,'profiles/'+id))}catch(e){const x=new Error(e&&e.message||'x');x.code=code(e);throw x}}}),
  onSnapshot:(next,err)=>{
   const docs=new Map(),subs=new Map(),loaded=new Set(),extra=new Set();
   let own=null,inbox=[],gotOwn=false,gotInbox=false,late=false,dead=false,tm=0,pw=0;
   const ready=()=>gotOwn&&(late||(gotInbox&&[...subs.keys()].every(k=>loaded.has(k))));
   const emit=()=>{tm=0;if(dead||!gotOwn)return;next({docs:[...docs].map(([id,v])=>({id,data:()=>v})),metadata:{fromCache:false,hasPendingWrites:false}})};
   const sched=()=>{if(dead||tm||!ready())return;tm=setTimeout(emit,40)};
   const watch=id=>{if(subs.has(id)||id===uid)return;
    subs.set(id,Fs.onSnapshot(Fs.doc(db,'profiles/'+id),s=>{if(dead)return;loaded.add(id);if(s.exists())docs.set(id,parse(s.data()));else docs.delete(id);sched()},()=>{loaded.add(id);sched()}))};
   const want=()=>{
    const ids=[];const add=k=>{if(OKID.test(k)&&k!==uid&&!ids.includes(k))ids.push(k)};
    if(own&&own.fr&&typeof own.fr==='object')Object.entries(own.fr).forEach(([k,t])=>{if(+t>0)add(k)});
    extra.forEach(add);inbox.forEach(add);
    const keep=new Set(ids.slice(0,80));
    keep.forEach(watch);
    subs.forEach((u,id)=>{if(!keep.has(id)){u();subs.delete(id);docs.delete(id);loaded.delete(id)}});
   };
   const u0=Fs.onSnapshot(Fs.doc(db,'profiles/'+uid),{includeMetadataChanges:true},s=>{
    if(dead)return;
    if(s.metadata.fromCache&&!s.exists())return;
    own=s.exists()?parse(s.data()):null;
    if(own)docs.set(uid,own);else docs.delete(uid);
    gotOwn=true;want();
    /* une écriture du profil qui traîne ne doit pas cacher les amis : on les montre quand même après 6 s */
    if(s.metadata.hasPendingWrites){clearTimeout(pw);pw=setTimeout(()=>{if(!dead)sched()},6000);return}
    clearTimeout(pw);
    sched();if(own)index(F,uid,own).catch(()=>{});
   },e=>{if(!dead&&err)err(e)});
   const u1=Fs.onSnapshot(Fs.doc(db,'inbox/'+uid),s=>{if(dead)return;const v=s.exists()?s.data():null;inbox=v&&typeof v==='object'?Object.keys(v):[];gotInbox=true;want();sched()},()=>{gotInbox=true;sched()});
   const tl=setTimeout(()=>{late=true;sched()},3000);
   const live={addExtra:(id,v)=>{extra.add(id);docs.set(id,v);loaded.add(id);want();if(gotOwn)emit()},
    stop:()=>{dead=true;clearTimeout(tm);clearTimeout(tl);clearTimeout(pw);try{u0()}catch(e){}try{u1()}catch(e){}subs.forEach(u=>{try{u()}catch(e){}});subs.clear()}};
   LIVE=live;
   return()=>{live.stop();if(LIVE===live)LIVE=null};
  }};
}
/* recherche d’un ami par son code : renvoie son identifiant (et charge son profil), ou null */
fb.lookup=async c=>{
 const F=await load(),{Fs,db,auth}=F;
 if(!auth.currentUser||!OKC.test(c))return null;
 const s=await Fs.getDoc(Fs.doc(db,'codes/'+c));if(!s.exists())return null;
 const d=s.data(),id=d&&d.u;if(typeof id!=='string'||!OKID.test(id))return null;
 const p=await Fs.getDoc(Fs.doc(db,'profiles/'+id));if(!p.exists())return null;
 if(LIVE)LIVE.addExtra(id,parse(p.data()));
 return id;
};
/* ---- fenêtre de connexion ---- */
const MSG={'auth/invalid-credential':'Adresse ou mot de passe incorrect.','auth/wrong-password':'Adresse ou mot de passe incorrect.','auth/user-not-found':'Adresse ou mot de passe incorrect.','auth/invalid-email':'Cette adresse e-mail n’est pas valide.','auth/email-already-in-use':'Un compte existe déjà avec cette adresse : connecte-toi.','auth/weak-password':'Mot de passe trop court : 6 caractères au moins.','auth/missing-password':'Entre ton mot de passe.','auth/too-many-requests':'Trop d’essais. Réessaie dans quelques minutes.','auth/network-request-failed':'Pas de connexion à internet.','auth/unauthorized-domain':'Ce site n’est pas encore autorisé dans Firebase (domaines autorisés).','auth/operation-not-allowed':'Cette méthode de connexion n’est pas activée dans Firebase.','auth/popup-blocked':'La fenêtre Google a été bloquée par le navigateur.','auth/account-exists-with-different-credential':'Un compte existe déjà avec cette adresse, avec une autre méthode.'};
const CSS=`.fbo{position:fixed;inset:0;z-index:2000;display:grid;place-items:center;padding:16px;background:rgba(8,10,40,.6);backdrop-filter:blur(4px);font-family:inherit}
.fbo *{box-sizing:border-box}.fbc{width:min(100%,360px);background:#f6f2fc;color:#2e2a63;border-radius:20px;padding:22px 20px 18px;box-shadow:0 18px 50px rgba(0,0,20,.5);max-height:calc(100dvh - 32px);overflow:auto}
.fbc h2{margin:0 0 4px;font:600 21px/1.25 Fraunces,Georgia,serif}.fbc p{margin:0 0 12px;font-size:14px;line-height:1.45;color:#4d4986}
.fbc label{display:block;font-size:13px;font-weight:700;margin:10px 0 4px}.fbc input{width:100%;font:inherit;font-size:16px;padding:11px 12px;border-radius:12px;border:1.5px solid #b9b3e2;background:#fff;color:#2e2a63}
.fbc input:focus{outline:2px solid #5458ab;outline-offset:1px}.fbc button{display:block;width:100%;font:inherit;font-weight:700;font-size:15px;min-height:46px;margin-top:10px;border-radius:14px;border:0;cursor:pointer}
.fbc .p{background:#3d3a85;color:#fff}.fbc .g{background:#fff;color:#2e2a63;border:1.5px solid #b9b3e2}.fbc .l{background:none;color:#3d3a85;font-weight:600;text-decoration:underline;min-height:40px;margin-top:2px}
.fbc button:disabled{opacity:.55}.fbc .e{margin:10px 0 0;color:#a12b2b;font-size:14px;font-weight:600}.fbc .o{margin:10px 0 0;color:#1b6b3d;font-size:14px;font-weight:600}.fbc .sp{margin:12px 0 2px;text-align:center;font-size:12px;color:#8a86c4}`;
let ov=null,mode='in';
const $=s=>ov&&ov.querySelector(s);
function close(){if(ov){ov.remove();ov=null}}
function draw(){
 if(!ov)return;const up=mode==='up';
 ov.innerHTML=`<div class="fbc" role="dialog" aria-modal="true" aria-labelledby="fbt"><h2 id="fbt">${up?'Créer un compte':'Se connecter'}</h2><p>${up?'Un compte te permet de retrouver tes flocons, ton aquarium et tes amis sur tous tes appareils.':'Retrouve ta progression sur cet appareil.'}</p><form id="fbf" novalidate><label for="fbe">Adresse e-mail</label><input id="fbe" type="email" autocomplete="email" inputmode="email" autocapitalize="off"><label for="fbp">Mot de passe</label><input id="fbp" type="password" autocomplete="${up?'new-password':'current-password'}"><div class="e" id="fbm" role="alert" hidden></div><button class="p" type="submit" id="fbs">${up?'Créer mon compte':'Me connecter'}</button></form><div class="sp">ou</div><button class="g" type="button" id="fbg">Continuer avec Google</button>${up?'':'<button class="l" type="button" id="fbr">Mot de passe oublié ?</button>'}<button class="l" type="button" id="fbw">${up?'J’ai déjà un compte':'Créer un compte'}</button><button class="l" type="button" id="fbx">Plus tard</button></div>`;
 $('#fbw').onclick=()=>{mode=up?'in':'up';draw()};$('#fbx').onclick=close;
 const r=$('#fbr');if(r)r.onclick=reset;
 $('#fbf').onsubmit=e=>{e.preventDefault();go(up)};$('#fbg').onclick=google;
 ov.onclick=e=>{if(e.target===ov)close()};
 const f=$('#fbe');if(f)f.focus();
}
const say=(t,ok)=>{const m=$('#fbm');if(!m)return;m.className=ok?'o':'e';m.hidden=!t;m.textContent=t||''};
const busy=b=>{ov&&ov.querySelectorAll('button').forEach(x=>x.disabled=b)};
const fail=e=>{busy(false);const c=e&&e.code;if(c==='auth/popup-closed-by-user'||c==='auth/cancelled-popup-request')return say('');say(MSG[c]||'Connexion impossible pour l’instant. Réessaie dans un moment.')};
async function done(){close();try{if(window.__fbDone)window.__fbDone()}catch(e){}}
async function go(up){
 const em=($('#fbe').value||'').trim(),pw=$('#fbp').value||'';
 if(!em)return say('Entre ton adresse e-mail.');if(!pw)return say('Entre ton mot de passe.');
 say('');busy(true);
 try{const F=await load(),Au=F.Au;if(up)await Au.createUserWithEmailAndPassword(F.auth,em,pw);else await Au.signInWithEmailAndPassword(F.auth,em,pw);done()}catch(e){fail(e)}
}
async function google(){
 say('');busy(true);
 try{const F=await load(),Au=F.Au;await Au.signInWithPopup(F.auth,new Au.GoogleAuthProvider());done()}catch(e){fail(e)}
}
async function reset(){
 const em=($('#fbe').value||'').trim();if(!em)return say('Entre d’abord ton adresse e-mail.');
 busy(true);
 try{const F=await load();await F.Au.sendPasswordResetEmail(F.auth,em);busy(false);say('Un e-mail pour changer ton mot de passe vient d’être envoyé.',true)}catch(e){fail(e)}
}
fb.open=(m)=>{
 if(ov)return;mode=m==='up'?'up':'in';
 if(!document.getElementById('fbcss')){const s=document.createElement('style');s.id='fbcss';s.textContent=CSS;document.head.appendChild(s)}
 ov=document.createElement('div');ov.className='fbo';document.body.appendChild(ov);draw();
 document.addEventListener('keydown',function k(e){if(!ov){document.removeEventListener('keydown',k);return}if(e.key==='Escape')close()});
};
/* Classements du mode infini (collection lb/<plateau>/e/<uid>) */
fb.lbTop=async b=>{const F=await load(),{Fs,db}=F;const r=await Fs.getDocs(Fs.query(Fs.collection(db,'lb/'+b+'/e'),Fs.orderBy('s','desc'),Fs.limit(30)));return r.docs.map(d=>{const x=d.data();return{id:d.id,s:x.s,n:x.n}})};
fb.lbPut=async(b,s,n)=>{const F=await load(),{Fs,db,auth}=F;if(!auth.currentUser)return;await Fs.setDoc(Fs.doc(db,'lb/'+b+'/e/'+auth.currentUser.uid),{s:Math.floor(s),n:String(n||'').slice(0,24),t:Date.now()})};
fb.lbDel=async b=>{const F=await load(),{Fs,db,auth}=F;if(!auth.currentUser)return;await Fs.deleteDoc(Fs.doc(db,'lb/'+b+'/e/'+auth.currentUser.uid))};
fb.out=async()=>{try{const F=await load();await F.Au.signOut(F.auth)}catch(e){}try{if(window.__fbOut)window.__fbOut()}catch(e){}};
})();
