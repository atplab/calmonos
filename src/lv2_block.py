import json as _j
_G='gen/'
# Jeu de mots : 60 → 99
_M=open(_G+'mots.txt').read().strip('\n')
RR("arène rêne née ère are\n","arène rêne née ère are\n"+_M+"\n")
RR("const NLS={mots:60,","const NLS={mots:99,croises:49,")
# Mots croisés : 8 → 49
_i=h.index('const CW=[')+9;_d=0;_k=_i
while True:
    if h[_k]=='[':_d+=1
    elif h[_k]==']':
        _d-=1
        if not _d:break
    _k+=1
_cw=_j.loads(h[_i:_k+1]);assert len(_cw)==18
_cw=_cw[:8]+_j.load(open(_G+'cw.json'))+_cw[8:]
h=h[:_i]+_j.dumps(_cw,ensure_ascii=False,separators=(',',':'))+h[_k+1:]
# Sudoku : 40 → 70 (images 41 à 70 nouvelles, fêtes après)
RR("sudoku:40,","sudoku:70,")
RR(",22,22,22,22,22,22,22,22,22,22,22,22][Math.min(39,",",22,22,22,22,22,22,22,22,22,22,22,22"+",22"*30+"][Math.min(69,")
_p=open(_G+'px.txt').read().strip().split('\n');_px=[]
for _a in range(0,len(_p),2):
    _r=_p[_a+1].split();assert len(_r)==9 and all(len(x)==9 for x in _r),_p[_a];_px.append([_p[_a],_r])
assert len(_px)==30
_i=h.index('SDPX=[')+5;_d=0;_k=_i
while True:
    if h[_k]=='[':_d+=1
    elif h[_k]==']':
        _d-=1
        if not _d:break
    _k+=1
_sx=_j.loads(h[_i:_k+1]);assert len(_sx)==50
_sx=_sx[:40]+_px+_sx[40:]
h=h[:_i]+_j.dumps(_sx,ensure_ascii=False)+h[_k+1:]
# Coloriage : 40 → 60 dessins (les 40 premiers inchangés)
RR("const CDN=40,","const CDN=60,")
RR("q=l/(CDN-1),th=l%10","q=Math.min(1,l/39),th=l%10")
assert h.count("l*40/(CDN-1)")>=1;h=h.replace("l*40/(CDN-1)","l*40/39")
# fêtes : la progression glisse
RR("mv('tournade',24,38,'mig:tn38');mv('sudoku',28,40,'mig:sd40')","mv('tournade',24,38,'mig:tn38');mv('sudoku',28,40,'mig:sd40');mv('sudoku',40,70,'mig:sd70');mv('mots',60,99,'mig:mo99');mv('croises',8,49,'mig:cw49')")

# Déménagement : dix pièces de fêtes refaites
RR("function pDemen2(r){",open('v57/demx.js').read()+"\nfunction pDemen2(r){")
RR("R=DRM[i]||DRM[0],ids=X?DXI[i%DXI.length]:R.items,sc=dScene(DRM[i]?i:0)","R=X?DXR[i%DXR.length]:(DRM[i]||DRM[0]),ids=R.items,sc=X?dSceneX(R):dScene(DRM[i]?i:0)")
RR("if(!r&&!X&&dStory[lv]&&!st.get(ckey('demenage')+':'+lv,false))dmOv(`<small>${dStory[lv][0]}</small><p class=\"sfq\">${dStory[lv][1]}</p>`,'Ouvrir les cartons');","if(!r&&X&&!st.get(ckey('demenage')+':'+lv,false))dmOv(`<small>Fêtes · ${R.n}</small><p class=\"sfq\">${R.s}</p>`,'Ouvrir les cartons');else if(!r&&!X&&dStory[lv]&&!st.get(ckey('demenage')+':'+lv,false))dmOv(`<small>${dStory[lv][0]}</small><p class=\"sfq\">${dStory[lv][1]}</p>`,'Ouvrir les cartons');")
# Labyrinthe : 30 → 50 niveaux
_mz=_j.load(open(_G+'mz.json'))
import re as _re
for _k,_v in [('MZS',_mz['S']),('MZB',_mz['B']),('MZP',_mz['P']),('MZK',_mz['K'])]:
    _m=_re.search(_k+r'=(\[[^\n]*?\]\]|\[[^\[\]\n]*\])',h);_a=_j.loads(_re.sub(r'(?<![0-9])\.',r'0.',_m.group(1)));assert len(_a)==40,_k
    _a=_a[:30]+_v+_a[30:];h=h[:_m.start(1)]+_j.dumps(_a,separators=(',',':'))+h[_m.end(1):]
RR("(l>=30?l-10:l)*7919","(l>=50?l-30:l)*7919")
RR("maze:30,","maze:50,")
RR("mv('croises',8,49,'mig:cw49')","mv('croises',8,49,'mig:cw49');mv('maze',30,50,'mig:mz50')")
# Modes calme / régulier
RR("const ALL=[...G,ANA,","""/* mode de jeu : calme (jeux stimulants cachés, niveaux ×1,5 flocon, jeux stimulants sans flocons) ou régulier */
const DMSTIM=['uno','airhockey','cuisine','tetris','brick'],APM=()=>st.get('app:mode','reg'),dmR=(id,v)=>APM()==='calm'?(DMSTIM.includes(id)?0:Math.round(v*1.5)):v;
function apMode(v){const H=new Set(st.get('g:hide',[]));DMSTIM.forEach(i=>v==='calm'?H.add(i):H.delete(i));st.set('g:hide',[...H]);st.set('app:mode',v)}
function apChoose(){if(document.getElementById('apm'))return;const d=document.createElement('div');d.className='sfr';d.id='apm';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');
 d.innerHTML=`<div class="glass sfc apmc"><small>Bienvenue</small><h2>Comment veux-tu jouer ?</h2><button class="apmo" data-a="apSet" data-v="calm"><b>🌙 Mode calme</b><span>Pour jouer en douceur, à ton rythme. Les jeux plus stimulants (Uno, air hockey, cuisine, Tèconta, casse-briques) sont cachés, et les niveaux donnent 1,5 fois plus de flocons.</span></button><button class="apmo" data-a="apSet" data-v="reg"><b>✦ Mode régulier</b><span>Tous les jeux, tels quels. Pour les joueurs réguliers.</span></button><p class="note">Tu pourras changer de mode dans les réglages.</p></div>`;document.body.appendChild(d)}
setTimeout(()=>{try{if(st.get('app:mode',null)===null)apChoose()}catch(e){}},700);
const ALL=[...G,ANA,""")
RR("r=first?rw(cur,lv):1;\n fl+=r;st.set('fl',fl);","r=first?rw(cur,lv):1,rf=dmR(cur,r);\n fl+=rf;st.set('fl',fl);")
RR("<p class=\"big\">${first?'+'+r+' flocons':'Niveau refait : +1 flocon'}</p>","<p class=\"big\">${rf?(first?'+'+rf+' flocons':'Niveau refait : +'+rf+' flocon'+(rf>1?'s':'')):'Mode calme : ce jeu ne donne pas de flocons'}</p>")
RR("r=first?3+Math.floor(SL.lv/10):1}else{st.set('sol:inf',st.get('sol:inf',0)+1);r=2}\n fl+=r;","r=first?3+Math.floor(SL.lv/10):1}else{st.set('sol:inf',st.get('sol:inf',0)+1);r=2}\n r=dmR('solitaire',r);fl+=r;")
RR("else if(AH.mode==='net'&&win)r=2;\n if(r){","else if(AH.mode==='net'&&win)r=2;\n r=dmR('airhockey',r);if(r){")
RR("const r=first?2+Math.floor(CB.l/8):1;fl+=r;","const r=dmR('colorie',first?2+Math.floor(CB.l/8):1);fl+=r;")
RR("const r=first?3+Math.floor(CD.l/8):1;fl+=r;","const r=dmR('colorie',first?3+Math.floor(CD.l/8):1);fl+=r;")
RR("S.rwd=r;if(r)scrGain(r);return}","r=dmR('uno',r);S.rwd=r;if(r)scrGain(r);return}")
RR("const n=S.S.length,r=S.w===UN.me?2+2*(n-1):1;scrGain(r);return}","const n=S.S.length,r=dmR('uno',S.w===UN.me?2+2*(n-1):1);if(r)scrGain(r);return}")
RR("scrGain(S.w===me?10:2)}","{const q=dmR('uno',S.w===me?10:2);if(q)scrGain(q)}}")
RR("${tg('breath','Respiration entre les niveaux'","<div class=\"tg pk\"><span>Mode de jeu<small>${APM()==='calm'?'Calme : jeux stimulants cachés, niveaux ×1,5 flocon':'Régulier : tous les jeux, tels quels'}</small></span><div class=\"seg\" role=\"radiogroup\" aria-label=\"Mode de jeu\">${[['calm','Calme'],['reg','Régulier']].map(([v,l])=>`<button role=\"radio\" aria-checked=\"${APM()===v}\" class=\"${APM()===v?'on':''}\" data-a=\"apPref\" data-v=\"${v}\">${l}</button>`).join('')}</div></div>${tg('breath','Respiration entre les niveaux'")
RR("function prefScreen(){","act.apSet=v=>{apMode(v==='calm'?'calm':'reg');const e=document.getElementById('apm');if(e)e.remove();if(!playing)home()};act.apPref=v=>{apMode(v==='calm'?'calm':'reg');prefScreen()};\nfunction prefScreen(){")
# Boutique de flocons (paiement à brancher : liens de paiement dans SHOPL)
RR("function prefScreen(){","""/* boutique : un lien de paiement par paquet (Stripe Payment Links : carte, Apple Pay, Google Pay, PayPal…). Tant qu'un lien est vide, le paquet affiche « Bientôt ». */
const SHOPP=[['p1',100,'0,99 $',''],['p2',350,'2,99 $','+17 %'],['p3',700,'4,99 $','+40 %'],['p4',2000,'9,99 $','Le plus populaire'],['p5',4500,'19,99 $','Meilleure valeur']],SHOPL={};
function shopOpen(){let o=document.getElementById('shpo');if(o)o.remove();o=document.createElement('div');o.id='shpo';o.className='sfr';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');
 o.innerHTML=`<div class="glass sfc shpc"><div class="shph"><h2>❄ Flocons</h2><button class="shpx" data-a="shopX" aria-label="Fermer">✕</button></div><p class="note">Tu as <b>${FLX()}</b> flocons. Ajoute-en pour débloquer des indices, des poissons et des décorations.</p><div class="shpl">${SHOPP.map(([k,n,p,t])=>`<button class="shpi${t==='Le plus populaire'?' hot':''}" data-a="shopBuy" data-v="${k}"><span class="shpn">❄ ${n.toLocaleString('fr-CA')}</span>${t?`<small>${t}</small>`:'<small>&nbsp;</small>'}<b>${shopOn()?p:p+'<i>Bientôt</i>'}</b></button>`).join('')}</div><p class="note shpm">${shopOn()?'Paiement sécurisé par Stripe · carte de crédit, Apple Pay, Google Pay':'Carte de crédit · Apple Pay · Google Pay'}</p></div>`;
 o.addEventListener('click',e=>{if(e.target===o)o.remove()});document.body.appendChild(o)}
act.shopX=()=>{const o=document.getElementById('shpo');if(o)o.remove()};
const shToast=t=>{if(typeof gToast==='function')gToast(t);else if(typeof msg==='function')msg(t)};
/* la boutique n'est active que sur le site web (pas dans l'appli installée depuis un magasin d'applications) */
const inStore=()=>{try{if(document.referrer.startsWith('android-app://'))sessionStorage.setItem('twa','1');return sessionStorage.getItem('twa')==='1'||/[?&]src=(play|ios)/.test(location.search)}catch(e){return false}};inStore();
const shopOn=()=>!!window.fbShop&&window.fbShop.live&&!inStore();
act.shopBuy=async k=>{if(!shopOn())return shToast('Les achats arrivent bientôt ✦');const b=document.querySelector('[data-a="shopBuy"][data-v="'+k+'"]');if(b){if(b.dataset.busy)return;b.dataset.busy=1;b.style.opacity=.6}
 const r=await window.fbShop.buy(k);if(b){delete b.dataset.busy;b.style.opacity=''}
 if(r&&r.err==='login')shToast('Connecte-toi à ton compte (Réglages) pour acheter des flocons.');else if(r&&r.err)shToast('Le paiement n’a pas pu démarrer. Réessaie dans un instant.')};
/* flocons achetés : total serveur (buys/<uid>.t) − base après réinitialisation (buy:b) − déjà crédité sur cet appareil (buy:c) */
function buyCredit(){const T=+st.get('buy:t',0)||0,E=Math.max(0,T-(+st.get('buy:b',0)||0)),c=+st.get('buy:c',0)||0;if(E<=c)return;const d=E-c;st.set('buy:c',E);fl=Math.min(1e8,fl+d);st.set('fl',fl);try{chip()}catch(e){}shToast('+'+d.toLocaleString('fr-CA')+' ❄ — merci énormément pour ton soutien !');try{schedulePush()}catch(e){}}
if(window.fbShop)window.fbShop.watch(T=>{st.set('buy:t',T);buyCredit()});
try{const q=new URLSearchParams(location.search).get('achat');if(q){history.replaceState(null,'',location.pathname);setTimeout(()=>shToast(q==='ok'?'Paiement reçu ✦ Tes flocons arrivent dans quelques secondes.':'Achat annulé.'),900)}}catch(e){}
document.addEventListener('click',e=>{const c=e.target.closest&&e.target.closest('.chip');if(!c||c.dataset.a||c.closest('#shpo'))return;if((c.textContent||'').trim().startsWith('❄'))shopOpen()});
function prefScreen(){""")

RR("n:S.fl-(+st.get('sync:b',0)||0)-st.get('sync:o',0)-st.get('sync:g',0),","n:S.fl-(+st.get('sync:b',0)||0)-st.get('sync:o',0)-st.get('sync:g',0)-(+st.get('buy:c',0)||0),")
RR("const GB=+st.get('sync:gb',0)||0;if(GB>0)body.gb=GB;","const GB=+st.get('sync:gb',0)||0;if(GB>0)body.gb=GB;const BB=+st.get('buy:b',0)||0;if(BB>0)body.bb=BB;")
RR("if(rep){st.set('sync:gb',Math.max(0,...cur.map(v=>+v.gb||0)));st.set('sync:g',0);st.set('sync:b',0)}","if(rep){st.set('sync:gb',Math.max(0,...cur.map(v=>+v.gb||0)));st.set('sync:g',0);st.set('sync:b',0);st.set('buy:b',Math.max(0,...cur.map(v=>+v.bb||0)));st.set('buy:c',0)}")
RR("st.set('sync:gb',SO.gt);st.set('sync:g',0);","st.set('sync:gb',SO.gt);st.set('sync:g',0);st.set('buy:b',+st.get('buy:t',0)||0);st.set('buy:c',0);")
RR("st.set('sync:o',oth);socCredit();","st.set('sync:o',oth);socCredit();try{buyCredit()}catch(e){}")

# Hors ligne : indicateur, fonctions réseau grisées, sauvegarde envoyée au retour du réseau
RR("function prefScreen(){","""const offl=()=>typeof navigator!=='undefined'&&navigator.onLine===false;
function netUI(){const o=offl();document.body.classList.toggle('offl',o);let p=document.getElementById('offp');if(o&&!p){p=document.createElement('div');p.id='offp';p.setAttribute('role','status');p.textContent='Hors ligne · tes parties sont gardées sur l’appareil';document.body.appendChild(p)}else if(!o&&p)p.remove()}
addEventListener('offline',netUI);addEventListener('online',()=>{netUI();try{if(st.get('sync:acc',false)){if(!Sy.ref)accInit();else push()}}catch(e){}try{if(typeof socLater==='function')socLater()}catch(e){}});setTimeout(netUI,0);
document.addEventListener('click',e=>{if(!offl())return;const t=e.target.closest&&e.target.closest('[data-a="tab"][data-v="soc"],[data-a="shopBuy"],[data-net]');if(!t)return;e.preventDefault();e.stopPropagation();shToast('Hors ligne : cette fonction a besoin d’Internet.')},true);
function prefScreen(){""")
# Son : la redirection vers un flux média (pour jouer en arrière-plan) causait des coupures et des notes faussées ; on ne l'utilise plus que quand l'appli est cachée
RR("bgOn()?acHold():acFree()","(bgOn()&&document.hidden)?acHold():acFree()")
RR("function acFree(){","document.addEventListener('visibilitychange',()=>{try{if(bgOn()&&document.hidden)acHold();else acFree()}catch(e){}});\nfunction acFree(){")
# Arrière-plan : plus de flux média (coupures, notes faussées). Un élément audio quasi muet garde l'appli éveillée et le son reste direct.
RR("function acHold(){if(!AC||!mg||AC.__md)return;","function acHold(){try{if(typeof plTone==='function'){plTone(true);AC.__tn=1}}catch(e){}return;if(!AC||!mg||AC.__md)return;")
RR("function acFree(){if(!AC||!AC.__md)return;","function acFree(){try{if(AC&&AC.__tn&&!(PLK&&!PLPA)){plTone(false);AC.__tn=0}}catch(e){}if(!AC||!AC.__md)return;")
# Accueil des jeux : sections par genre, avec raccourcis
RR("""${F.length?`<h2 class="s shr"><span>Favoris</span>${window.mpLink?mpLink():''}</h2><div class="grid fgrid">${F.map(tile).join('')}</div>${R.length?'<h2 class="s">Autres jeux</h2>':''}`:`<h2 class="s shr"><span>Choisis ta veillée</span>${window.mpLink?mpLink():''}</h2>`}${R.length?`<div class="grid">${R.map(tile).join('')}</div>`:''}""",
"""${F.length?`<h2 class="s shr"><span>Favoris</span>${window.mpLink?mpLink():''}</h2><div class="grid fgrid">${F.map(tile).join('')}</div>`:`<h2 class="s shr"><span>Choisis ta veillée</span>${window.mpLink?mpLink():''}</h2>`}${gSecs(R,tile)}""")
RR("const HBI=n=>","""/* sections de jeux par genre (l'ordre choisi par le joueur est gardé à l'intérieur de chaque section) */
const GCAT=[['mots','Mots',['mots','croises','caches','phrase','ana','quiz','wordle']],['dete','Détente',['tournade','colorie','cherche','demenage','match3','peche','planetes']],['refl','Réflexion',['sudoku','memo','puzzle','flow','maze','g2048','demineur','blocs']],['cart','Cartes et plateau',['solitaire','scrabble','chess','uno']],['arca','Arcade',['tetris','brick','airhockey','cuisine']]];
const gCatOf=id=>{const c=GCAT.find(c=>c[2].includes(id));return c?c[0]:'autr'};
function gSecs(R,tile){if(!R.length)return'';const S=[...GCAT,['autr','Autres',[]]].map(c=>({k:c[0],n:c[1],L:R.filter(g=>gCatOf(g.id)===c[0])})).filter(s=>s.L.length);
 return`<nav class="gcats" aria-label="Genres de jeux">${S.map(s=>`<button data-a="gCat" data-v="${s.k}">${s.n}</button>`).join('')}</nav>`+S.map(s=>`<h2 class="s gcs" id="gc-${s.k}"><span>${s.n}</span><small>${s.L.length}</small></h2><div class="grid">${s.L.map(tile).join('')}</div>`).join('')}
const HBI=n=>""")
RR("function prefScreen(){","act.gCat=v=>{const e=document.getElementById('gc-'+v);if(e)e.scrollIntoView({behavior:'smooth',block:'start'})};\nfunction prefScreen(){")

# ---- Plantes de l'aquarium ----
RR("const aqBuy0=aqBuy;",open('v57/plantes.js').read()+"const aqBuy0=aqBuy;")
RR("a.d=a.d||{};a.p=a.p||{};a.ws=a.ws||['nuit'];","a.d=a.d||{};a.p=a.p||{};a.pl=a.pl||{};a.ws=a.ws||['nuit'];")
RR("<div class=\"sand\"></div><div class=\"bubs\">","<div class=\"sand\"></div>${aqPlHTML(a,now)}<div class=\"bubs\">")
RR("if(aqTab==='inv')return aqInv();","if(aqTab==='inv')return aqInv();\n if(aqTab==='plant')return aqPl();")
RR("data-a=\"aqtab\" data-v=\"deco\">Décors</button></div>","data-a=\"aqtab\" data-v=\"deco\">Décors</button><button class=\"${aqTab==='plant'?'on':''}\" data-a=\"aqtab\" data-v=\"plant\">Plantes</button></div>")
RR("aqcare:()=>aqTabTo('care'),","aqcare:()=>aqTabTo('care'),aqpb:v=>aqPlBuy(v),aqpf:v=>aqPlFeed(v),aqpa:()=>aqPlFeed(),")

RR("Chaque décor dans l’aquarium augmente les flocons des repas : 100 ❄ → ×1,1 ; 500 ❄ → ×1,5. Les bonus s’additionnent. Total actuel : <b>×${frN(aqM(a)/1000)}</b>","Les poissons sont plus heureux avec des décorations !")
RR("const HR=6*36e5,MAXF=10","const HR=8*36e5,MAXF=10")
