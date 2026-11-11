import re
base='v2_before_v34.html'
h=open(base,encoding='utf-8').read()
d='v34/'
def rep(a,b,cnt=1):
    global h
    assert h.count(a)==cnt,(a[:80],h.count(a))
    h=h.replace(a,b)
# 1. histoire (segment + css)
seg=''.join(open(d+f,encoding='utf-8').read().rstrip('\n')+'\n' for f in ['story_a.js','story_b.js','story_c.js','story_d.js'])
a=h.index('/* ---------- Histoire : le petit bonhomme');b=h.index('function prefScreen(){')
h=h[:a]+seg+h[b:]
css=open(d+'story.css',encoding='utf-8').read().rstrip('\n')+'\n'+open(d+'pref.css',encoding='utf-8').read().rstrip('\n')+'\n'+open(d+'night.css',encoding='utf-8').read().rstrip('\n')+'\n'
m='/* histoire : carte plein écran, la caméra suit le bonhomme */'
a=h.index(m);b=h.index('</style>',a);h=h[:a]+css+h[b:]
old='${first?\'<p class="sd">✦ +1 poussière d’étoile</p>\':\'\'}'
rep(old,old.replace('class="sd"','class="sdu"'))
# 2. réglages : jour/nuit, sans arrêt automatique, compacts
rep("kbd:'qwerty',timer:0}","kbd:'qwerty',sky:'auto'}")
rep("apply();sleepT();prefScreen()},","apply();prefScreen()},")
rep(" tm:()=>{const p=prefs(),o=[0,15,30,60];p.timer=o[(o.indexOf(p.timer)+1)%4];savePrefs();sleepT();prefScreen()},"," sky:v=>{const p=prefs();p.sky=['auto','day','night'].includes(v)?v:'auto';savePrefs();prefScreen()},")
rep("let AC,mg,music,tmr;","let AC,mg,music;")
rep("apply();sleepT()}catch(e){}}","apply()}catch(e){}}")
a=h.index('function sleepT(){');b=h.index('\n',a);h=h[:a]+h[b+1:]
a=h.index('function prefScreen(){');b=h.index('\n}\n',a)+3
PREF=r'''function prefScreen(){
 cur=null;nv('set');const p=prefs();
 const tg=(k,n,s)=>`<button class="tg ${p[k]?'on':''}" role="switch" aria-checked="${!!p[k]}" data-a="tg" data-v="${k}"><span>${n}${s?`<small>${s}</small>`:''}</span><i></i></button>`,
  pt=(k,n)=>`<button class="pt ${p[k]?'on':''}" role="switch" aria-checked="${!!p[k]}" data-a="tg" data-v="${k}"><span>${n}</span><i></i></button>`;
 app.innerHTML=`<header class="top pfh"><h1>Réglages</h1></header><section class="glass play pf"><label class="vol"><span>Volume <b id="vv">${p.vol} %</b></span><input type="range" min="0" max="100" value="${p.vol}" data-r="vol" aria-label="Volume"></label><div class="pg">${pt('music','Musique')}${pt('sfx','Effets sonores')}${pt('vib','Vibrations')}${pt('snow','Neige animée')}</div>${tg('breath','Respiration entre les niveaux','Inspire 4 s, retiens 2 s, expire 4 s')}<div class="tg pk"><span>Jour et nuit<small>Aquarium et histoire</small></span><div class="seg" role="radiogroup" aria-label="Jour et nuit">${[['auto','Auto'],['day','Jour'],['night','Nuit']].map(([v,l])=>`<button role="radio" aria-checked="${p.sky===v}" class="${p.sky===v?'on':''}" data-a="sky" data-v="${v}">${l}</button>`).join('')}</div></div><button class="tg" data-a="kbl"><span>Clavier du mot du jour</span><b>${p.kbd==='azerty'?'AZERTY':'QWERTY'}</b></button></section>${syncHTML()}<button class="btn alt" data-a="rst">${rc?'Confirmer : tout effacer':'Réinitialiser la progression'}</button>${rc&&st.get('sync:acc',false)?'<p class="note" style="text-align:center;margin:10px 0 0">La sauvegarde de ton compte sera remise à zéro aussi.</p>':''}`;
}
'''
h=h[:a]+PREF+h[b:]
# 3. ciel : réglage jour / nuit / auto
rep("const s=h<SKY_A[0]||h>=SKY_B[1]?0:","const f=prefs().sky,s=f==='day'?1:f==='night'?0:h<SKY_A[0]||h>=SKY_B[1]?0:")
rep("const ps=Math.max(0,Math.min(1,(h-SKY_A[0])/(SKY_B[1]-SKY_A[0]))),pm=Math.min(1,","const ps=f==='day'?.5:Math.max(0,Math.min(1,(h-SKY_A[0])/(SKY_B[1]-SKY_A[0]))),pm=f==='night'?.5:Math.min(1,")
rep("ph:s>=.995?'day'","ph:f==='day'||f==='night'?f:s>=.995?'day'")

# 4. mode nuit pour toute l’appli (verre sombre, fond plus profond), selon Auto / Jour / Nuit
rep("background:linear-gradient(180deg,#1A2B46 0%,#34397F 50%,#856CA6 85%,#CC94BC 100%) fixed}",
    "background:linear-gradient(180deg,color-mix(in srgb,#f6e1f2 calc(var(--gs,1)*100%),#080c20) 0%,color-mix(in srgb,#eee4fa calc(var(--gs,1)*100%),#10143c) 50%,color-mix(in srgb,#e8e6ff calc(var(--gs,1)*100%),#1c1648) 85%,color-mix(in srgb,#e2ebff calc(var(--gs,1)*100%),#2a1c52) 100%) fixed}")
rep(".glass{background:rgba(255,255,255,.12);",".glass{background:var(--ngl,rgba(255,255,255,.12));")
rep("border:1px solid rgba(255,255,255,.22);border-radius:26px;box-shadow:0 10px 30px rgba(20,20,70,.35)}","border:1px solid var(--nbd,rgba(255,255,255,.22));border-radius:26px;box-shadow:0 10px 30px var(--nsh,rgba(20,20,70,.35))}")
rep(".tile,.item{background:color-mix(in srgb,var(--a) 20%,rgba(255,255,255,.07));",".tile,.item{background:color-mix(in srgb,var(--a) 20%,var(--nb7,rgba(255,255,255,.07)));")
rep("background-color:color-mix(in srgb,var(--a) 14%,rgba(255,255,255,.06));-webkit-backdrop-filter:blur(14px)","background-color:color-mix(in srgb,var(--a) 14%,var(--nb6,rgba(255,255,255,.06)));-webkit-backdrop-filter:blur(14px)")
rep(".chip,.hb{background:rgba(255,255,255,.14);",".chip,.hb{background:var(--nchip,rgba(255,255,255,.14));")
rep(".top.stk .back{background:rgba(255,255,255,.14);",".top.stk .back{background:var(--nchip,rgba(255,255,255,.14));")
rep("#tint.on{opacity:1}","#tint.on{opacity:calc(.5 + .5*var(--gs,1))}")
rep("#pat.on{opacity:1}","#pat.on{opacity:calc(.6 + .4*var(--gs,1))}")
rep("const aqSkyStyle=now=>","""/* jour / nuit pour toute l’appli : la même qu’à l’aquarium (aqSky), selon le réglage Auto / Jour / Nuit */
function skyBody(){const k=aqSky(),b=document.body;b.style.setProperty('--gs',k.s.toFixed(3));b.dataset.sky=k.ph}
const aqSkyStyle=now=>""")
rep("p.sky=['auto','day','night'].includes(v)?v:'auto';savePrefs();prefScreen()}","p.sky=['auto','day','night'].includes(v)?v:'auto';savePrefs();skyBody();prefScreen()}")
rep("\nhome();aqDot(aqAlert());\n","\nskyBody();setInterval(()=>{skyBody();if($('#stg'))sSky()},60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden){skyBody();if($('#stg'))sSky()}});\nhome();aqDot(aqAlert());\n")
rep("z-index:7;background:rgba(26,43,70,.94);pointer-events:none}","z-index:7;background:var(--nsa,rgba(26,43,70,.94));pointer-events:none}")
rep("function skyBody(){const k=aqSky(),b=document.body;b.style.setProperty('--gs',k.s.toFixed(3));b.dataset.sky=k.ph}","let GS=1;function skyBody(){const k=aqSky(),b=document.body;GS=k.s;b.style.setProperty('--gs',k.s.toFixed(3));b.dataset.sky=k.ph;b.dataset.tx=k.s>=.5?'d':'n';try{skyChap(!window.__skI&&(window.__skI=1))}catch(e){}}")
rep("x.fillStyle='rgba(255,255,255,.7)';for(const p of P)","x.fillStyle=`rgba(${Math.round(120+135*(1-GS))},${Math.round(110+145*(1-GS))},${Math.round(200+55*(1-GS))},${(.5+.2*(1-GS)).toFixed(2)})`;for(const p of P)")
rep("background-color:color-mix(in srgb,var(--a) 22%,rgba(10,12,34,.4));box-shadow:0 10px 30px rgba(20,20,70,.35)}","background-color:color-mix(in srgb,var(--a) 22%,var(--nb7,rgba(10,12,34,.4)));box-shadow:0 10px 30px var(--nsh,rgba(20,20,70,.35))}")
rep(".cl.g{background:rgba(255,255,255,.18);color:var(--a)}",".cl.g{background:color-mix(in srgb,rgba(255,255,255,.6) calc(var(--gs,1)*100%),rgba(255,255,255,.18));color:color-mix(in srgb,#2b3a86 calc(var(--gs,1)*100%),color-mix(in srgb,var(--a) 50%,#fff))}")

# ---------- mode illimité : 10 appuis sur « Clavier du mot du jour » en moins de 5 s (réglages) : flocons et poussières d’étoile illimités, réversible
rep("let fl=st.get('fl',20),","const UNL=()=>st.get('unl',false)===true,FLX=()=>UNL()?'∞':fl;\nlet UT=[];/* appuis récents sur « Clavier du mot du jour » */\nconst unlTap=()=>{const n=Date.now();UT=UT.filter(t=>n-t<5000);UT.push(n);if(UT.length<10)return false;UT=[];st.set('unl',!UNL());return true};\nconst unlToast=()=>{const o=document.getElementById('unlt');if(o)o.remove();const t=document.createElement('div');t.id='unlt';t.className='shm';t.setAttribute('role','status');t.textContent=UNL()?'✦ Mode illimité : flocons et poussières d’étoile sans fin':'Mode illimité désactivé';document.body.appendChild(t);setTimeout(()=>{t.style.transition='opacity .4s';t.style.opacity='0';setTimeout(()=>t.remove(),450)},2600)};\nlet fl=st.get('fl',20),")
rep("const spend=n=>{if(fl<n){","const spend=n=>{if(UNL())return true;if(fl<n){")
rep("if(c)c.textContent='❄ '+fl;return true}","if(c)c.textContent='❄ '+FLX();return true}")
rep("const chip=()=>{const c=$('.chip');if(c)c.textContent='❄ '+fl}","const chip=()=>{const c=$('.chip');if(c)c.textContent='❄ '+FLX()}")
n=h.count('❄ ${fl}');print('puces de flocons :',n)
h=h.replace('❄ ${fl}','❄ ${FLX()}')
rep("${fl<f.p?'low':''}","${!UNL()&&fl<f.p?'low':''}")
rep("${fl<d.p?'low':''}","${!UNL()&&fl<d.p?'low':''}")
rep("${fl<w.p?'low':''}","${!UNL()&&fl<w.p?'low':''}")
rep("${fl<SG?' low':''}","${!UNL()&&fl<SG?' low':''}")
rep("if(fl<SG)return socFail(","if(!UNL()&&fl<SG)return socFail(")
rep("kbl:()=>{const p=prefs();p.kbd=p.kbd==='azerty'?'qwerty':'azerty';savePrefs();prefScreen()},","kbl:()=>{const p=prefs();p.kbd=p.kbd==='azerty'?'qwerty':'azerty';savePrefs();const u=unlTap();prefScreen();if(u)unlToast()},")

# ---------- niveaux de Noël : plus de bande rayée en haut, plus de liste de niveaux — une carte avec un seul bouton Commencer / Continuer
rep("body.xm #tint::after{content:\"\";position:absolute;left:0;right:0;top:env(safe-area-inset-top,0px);height:5px;background:repeating-linear-gradient(135deg,#d9453d 0 9px,#fff 9px 12px,#1f8a52 12px 21px,#fff 21px 24px)}\n","")
rep("xdn=[...Array(NLX).keys()].filter(xok).length;","xdn=[...Array(NLX).keys()].filter(xok).length,xns=[...Array(NLX).keys()].findIndex(xsk),xtg=xnx>=0?xnx:xns>=0?xns:NLX-1,xpr=xdn+[...Array(NLX).keys()].filter(xsk).length;")
_i=h.index("${xon?`<div class=\"dd xm pt-${id}")
_j=h.index(":''}<div class=\"dd pt-${id}${lvOpen",_i)
h=h[:_i]+"${xon?`<section class=\"rc xm\" data-g=\"✦\"><div class=\"rc-ic\">✦</div><div class=\"rc-t\"><small>Spécial Noël</small><b>${xnx<0&&xns<0?'Rejouer Fêtes '+NLX:'Fêtes '+(xtg+1)+(xnx<0?' (passé)':'')}</b><span>${xdn} / ${NLX} terminés</span></div><button class=\"rc-go\" data-a=\"play\" data-v=\"${N+xtg}\" title=\"Jusqu’au 11 janvier\">${xnx<0&&xns<0?'Rejouer':xpr?'Continuer':'Commencer'}<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></button></section>`"+h[_j:]
rep("pick:()=>{if(isX(cur,lv)&&xmasOn()){xOpen=true;lvOpen=false}else lvOpen=true;hub(cur)},","pick:()=>{lvOpen=!(isX(cur,lv)&&xmasOn());hub(cur)},")
rep(" ddx:()=>{const d=$('.dd.xm');if(!d)return;xOpen=d.classList.toggle('open');d.querySelector('.dd-h').setAttribute('aria-expanded',xOpen)},\n","")

# ---------- fluidité : poissons animés par la carte graphique, neige arrêtée quand elle est coupée, flou de la brume seulement si l’eau est sale
rep(".tank .fx{position:absolute;top:var(--y);width:var(--w);animation:swx",".tank .fx{position:absolute;left:2%;top:var(--y);width:var(--w);animation:swx")
rep("@keyframes swx{from{left:2%}to{left:calc(98% - var(--w))}}","@keyframes swx{from{translate:0 0}to{translate:var(--tx) 0}}")
rep("style=\"--y:${y}%;--w:${(15*f.sz).toFixed(1)}%;","style=\"--y:${y}%;--w:${(15*f.sz).toFixed(1)}%;--tx:${((96-15*f.sz)/(15*f.sz)*100).toFixed(2)}%;")
rep("nx=parseFloat(getComputedStyle(el).left)||0,ny=el.offsetTop","nx=aqNx(el),ny=el.offsetTop")
rep("function aqNear(P,cx,cy){","/* position naturelle (sans le décalage de la ruée vers les grains) : bord gauche + glissement animé (en % de la largeur du poisson) */\nconst aqNx=el=>{const c=getComputedStyle(el),q=parseFloat(c.translate);return(parseFloat(c.left)||0)+(q>=0||q<0?q/100*el.getBoundingClientRect().width:0)};\nfunction aqNear(P,cx,cy){")
rep("data-ph=\"${aqSky(now).ph}\" data-late=\"${aqMt(a,now).late?1:0}\"><div class=\"skn\"","data-ph=\"${aqSky(now).ph}\" data-late=\"${aqMt(a,now).late?1:0}\" data-dirty=\"${aqLv(a,now).dt>.01?1:0}\"><div class=\"skn\"")
rep("t.dataset.late=v.late?'1':'0'};","t.dataset.late=v.late?'1':'0';t.dataset.dirty=v.dt>.01?'1':'0'};")
rep("const snow=()=>{x.clearRect(0,0,W,H);if(!prefs().snow)return requestAnimationFrame(snow);","let sOn=0,sT=0;\nconst snow=ts=>{if(!prefs().snow||document.hidden){if(sOn){x.clearRect(0,0,W,H);sOn=0}sT=0;return setTimeout(snow,300)}const k=sT?Math.min(3,(ts-sT)/16.67)||1:1;sT=ts||0;sOn=1;x.clearRect(0,0,W,H);")
rep("for(const p of P){p.y+=p.v;p.d+=.004;p.x+=Math.sin(p.d)*.25;if(p.y>H+5){p.y=-5;p.x=Math.random()*W}x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()}requestAnimationFrame(snow)};","x.beginPath();for(const p of P){p.y+=p.v*k;p.d+=.004*k;p.x+=Math.sin(p.d)*.25*k;if(p.y>H+5){p.y=-5;p.x=Math.random()*W}x.moveTo(p.x+p.r,p.y);x.arc(p.x,p.y,p.r,0,7)}x.fill();requestAnimationFrame(snow)};")


# ---------- départ à 0 flocon ; le premier poisson n’est plus offert : 10 ❄ ; on peut nommer chaque poisson à l’achat (sinon nom au hasard)
rep("st.get('fl',20)","st.get('fl',0)")
rep("fl=20;st.set('fl',20);prefScreen()","fl=0;st.set('fl',0);prefScreen()")
rep("rep?20+oth:L.fl+","rep?oth:L.fl+")
# base de la synchro propre à chaque appareil : 20 pour une sauvegarde existante, 0 pour une nouvelle (le protocole du nuage ne change pas)
rep("if(rep){st.set('sync:gb',Math.max(0,...cur.map(v=>+v.gb||0)));st.set('sync:g',0)}","if(rep){st.set('sync:gb',Math.max(0,...cur.map(v=>+v.gb||0)));st.set('sync:g',0);st.set('sync:b',0)}")
rep("n:S.fl-20-st.get('sync:o',0)","n:S.fl-(+st.get('sync:b',0)||0)-st.get('sync:o',0)")
rep("let fl=st.get('fl',0),cur=null,daily=false,lv=0,playing=false,snap=null,rc=false,lvOpen=false,origin='home';","let fl=st.get('fl',0),cur=null,daily=false,lv=0,playing=false,snap=null,rc=false,lvOpen=false,origin='home';\nif(st.get('sync:b',null)===null)st.set('sync:b',st.get('fl',null)===null?0:20);/* base de la synchro : 20 = ancienne sauvegarde, 0 = nouvelle */")
rep("st.set('sync:o',0);st.set('sync:gb',SO.gt);","st.set('sync:o',0);st.set('sync:b',0);st.set('sync:gb',SO.gt);")
rep("{id:'rouge',n:'Poisson rouge',p:0,","{id:'rouge',n:'Poisson rouge',p:10,")
rep("return{f:{rouge:{t:0,on:1}},d:{},p:{},ws:['nuit']","return{f:{},d:{},p:{},ws:['nuit']")
# noms
rep("const aqOn=a=>FISH.filter(","""/* noms des poissons : choisis à l’achat, sinon tirés au hasard ; un poisson sans nom enregistré (anciennes sauvegardes) reçoit un nom fixe tiré de son espèce */
const FNM=['Bulle','Nacre','Écume','Perle','Lune','Brume','Coquille','Marée','Opale','Onde','Étoile','Flocon','Givre','Lagune','Corail','Azur','Saphir','Plume','Nuage','Rosée','Velours','Ambre','Cannelle','Pépin','Noisette','Biscotte','Mochi','Praline','Câlin','Douceur','Pâquerette','Dragée','Sirop','Mirabelle','Clémentine','Violette','Cerise','Myrtille','Châtaigne','Réglisse','Nougat','Caramel','Zéphyr','Aurore','Galet','Sable','Mousse','Pistache'];
const aqClN=s=>String(s==null?'':s).replace(/[\\u0000-\\u001f\\u007f<>]/g,'').replace(/\\s+/g,' ').trim().slice(0,16);
function aqNames(a){const m={},u=new Set();FISH.forEach(f=>{const o=a.f[f.id],n=o&&aqClN(o.n);if(n){m[f.id]=n;u.add(n.toLowerCase())}});
 FISH.forEach(f=>{if(!a.f[f.id]||m[f.id])return;let i=hs(f.id)%FNM.length,k=0;while(u.has(FNM[i].toLowerCase())&&k++<FNM.length)i=(i+1)%FNM.length;m[f.id]=FNM[i];u.add(FNM[i].toLowerCase())});return m}
function aqRnd(a,skip){const u=new Set(Object.values(aqNames(a)).map(n=>n.toLowerCase()));if(skip)u.add(String(skip).toLowerCase());const P=FNM.filter(n=>!u.has(n.toLowerCase())),L=P.length?P:FNM;return L[Math.floor(Math.random()*L.length)]}
const aqOn=a=>FISH.filter(""")
rep("const n=aqOn(a).length,own=FISH.filter(f=>a.f[f.id]).length;\n","const n=aqOn(a).length,own=FISH.filter(f=>a.f[f.id]).length,nm=aqNames(a);\n")
rep("<div class=\"atx\"><b>${f.n}</b><small>${o?(on?'Dans l’aquarium':'En réserve'):'À débloquer'} · +${frN(fv(f)*aqM(a)/1000)}","<div class=\"atx\"><b>${o?esc(nm[f.id]):f.n}</b><small>${o?esc(f.n)+' · ':''}${o?(on?'Dans l’aquarium':'En réserve'):'À débloquer'} · +${frN(fv(f)*aqM(a)/1000)}")
rep("gn=Object.fromEntries(gl.map((f,i)=>[f.id,gq[i]]));\n return`<div class=\"tank","gn=Object.fromEntries(gl.map((f,i)=>[f.id,gq[i]])),nmq=aqNames(a);\n return`<div class=\"tank")
rep("role=\"button\" tabindex=\"0\" aria-label=\"${f.n}\" style=\"--y:","role=\"button\" tabindex=\"0\" aria-label=\"${esc(nmq[f.id]||f.n)} (${f.n})\" style=\"--y:")
rep("s.textContent=!on.length?'Aucun poisson dans l’aquarium':lt?","s.textContent=!on.length?(FISH.some(f=>a.f[f.id])?'Aucun poisson dans l’aquarium':'Ton aquarium est vide'):lt?")
rep("$('#aqn').textContent=!on.length?'Remets un poisson à l’eau.':lt?","$('#aqn').textContent=!on.length?(FISH.some(f=>a.f[f.id])?'Remets un poisson à l’eau.':'Ton premier poisson coûte '+FISH[0].p+' ❄.'):lt?")
rep("msg('Rassasié · prochain repas dans '+aqFmt(o.t+HR-Date.now())+'.')","msg(aqNames(a)[v]+' est rassasié · prochain repas dans '+aqFmt(o.t+HR-Date.now())+'.')")
rep("f[k]={t:Math.max(+v.t||0,p?p.t:0),on:v.on?1:0}}});","const nn=aqClN(v.n)||(p&&p.n)||'';f[k]={t:Math.max(+v.t||0,p?p.t:0),on:v.on?1:0,...(nn?{n:nn}:{})}}});")
rep("""  if(!spend(f.p))return;
  const on=aqOn(a).length<MAXF?1:0;a.f[id]={t:Date.now(),on};aqSave(a);aquaRefresh();msg(on?'✦ '+f.n+' rejoint l’aquarium.':'Aquarium complet : '+f.n+' attend en réserve.')}""","""  if(!UNL()&&fl<f.p)return msg('Il te manque quelques flocons.');
  return aqNameOpen(f)}""")
rep("/* Déplacer les décors : en mode placement","""/* acheter un poisson : on lui donne un nom (champ vide = nom au hasard), puis il rejoint l’aquarium */
function aqNameClose(){const d=$('#aqnm'),id=d&&d.dataset.f;if(d)d.remove();const n=$('#nav');if(n)n.hidden=false;const b=id&&document.querySelector('[data-a=aqbuy][data-v="f:'+id+'"]');if(b)b.focus()}
function aqNameOpen(f){
 const a=aqRead(),e=$('#aqnm');if(e)e.remove();const nv0=$('#nav');if(nv0)nv0.hidden=true;
 const sug=aqRnd(a),d=document.createElement('div');d.className='sfr';d.id='aqnm';d.dataset.f=f.id;d.dataset.s=sug;d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-labelledby','aqnt');
 d.innerHTML=`<div class="glass sfc aqnm"><h2 id="aqnt">Comment l’appeler ?</h2><div class="aqnp">${fishSVG(f)}</div><p class="note">${f.n} · ${f.p} ❄</p><input class="ci nm" id="aqni" type="text" maxlength="16" autocomplete="off" autocapitalize="words" spellcheck="false" enterkeyhint="done" placeholder="${esc(sug)}" aria-label="Nom du poisson (vide : nom au hasard)"><p class="note aqnh">Laisse vide : on choisit un nom au hasard.</p><button class="lnk" data-a="aqnr">Un autre nom au hasard</button><button class="btn" data-a="aqny">Adopter · ${f.p} ❄</button><button class="btn alt" data-a="aqnc">Annuler</button></div>`;
 app.appendChild(d);
 d.addEventListener('click',q=>{if(q.target===d)aqNameClose()});
 d.addEventListener('keydown',q=>{if(q.key==='Escape'){q.preventDefault();aqNameClose()}else if(q.key==='Enter'&&q.target.id==='aqni'){q.preventDefault();act.aqny()}});
 const b=d.querySelector('[data-a=aqny]');if(b)b.focus();
}
function aqAdopt(id,name){
 mt='m-aq';const f=FISH.find(x=>x.id===id),a=aqRead();
 if(!f||a.f[id]){aqNameClose();return}
 if(!spend(f.p)){aqNameClose();return}
 const nh=id==='gardien'&&!(a.f.hockey&&a.f.hockey.on),on=aqOn(a).length<MAXF&&!nh?1:0;a.f[id]={t:Date.now(),on,n:name};aqSave(a);aqNameClose();aquaRefresh();
 const tx=on?'✦ '+name+' rejoint l’aquarium.':nh?name+' attend en réserve : il lui faut le poisson hockeyeur dans l’aquarium.':'Aquarium complet : '+name+' attend en réserve.';msg(tx);setTimeout(()=>{const m=$('#m-aq');if(m&&m.textContent===tx)m.textContent=''},5000);sfx(740,.3);
}
Object.assign(act,{
 aqnr:()=>{const d=$('#aqnm'),i=$('#aqni');if(!d||!i)return;const s=aqRnd(aqRead(),d.dataset.s);d.dataset.s=s;i.placeholder=s},
 aqny:()=>{const d=$('#aqnm');if(!d)return;const i=$('#aqni');aqAdopt(d.dataset.f,aqClN(i&&i.value)||d.dataset.s)},
 aqnc:()=>aqNameClose()
});
/* Déplacer les décors : en mode placement""")
rep("</style>",""".aqnm{text-align:center}.aqnp{width:104px;margin:4px auto 2px}.aqnp svg{display:block;width:100%;height:auto;overflow:visible}.aqnm .note{margin:2px 0 0}.aqnm .ci{margin-top:12px;text-align:center}.aqnm .aqnh{margin:6px 0 0;font-size:13px}.aqnm .btn{margin-top:10px}
</style>""",1) if False else None
# ---------- v55 : tous les poissons viennent manger (affamés ou non) ; un poisson touché avance d’un élan
rep("function aqFx(ids){","function aqFx(ids,hg){")
rep("fs.forEach((f,k)=>aqLab(t,f,k*.1));return;","fs.filter(f=>(hg||ids).includes(f.dataset.id)).forEach((f,k)=>aqLab(t,f,k*.1));return;")
rep("np=Math.min(18,Math.max(4,fs.length*2+2));","np=Math.min(30,Math.max(4,fs.length*3));")
rep("wait:i*.11+Math.random()*.3","wait:i*Math.min(.11,2/np)+Math.random()*.3")
rep("et:0,lab:false,k,vmax","et:0,lab:!(hg||ids).includes(id),k,vmax")
rep("const R=aqGain(a,ids.map(id=>FISH.find(x=>x.id===id)))","/* tous les poissons de l’aquarium viennent manger ; seuls les affamés rapportent des flocons */\n const R=aqGain(a,ids.map(id=>FISH.find(x=>x.id===id)))")
rep("mt='m-aq';const a=aqRead(),now=Date.now(),ids=[];\n if(aqMt(a,now).late&&aqOn(a).length){msg(aqLateMsg(a,now));return false}\n aqOn(a).forEach(f=>{const o=a.f[f.id];if(only&&only!==f.id)return;if(now-o.t<HR)return;o.t=now;ids.push(f.id)});",
    "mt='m-aq';const a=aqRead(),now=Date.now(),ids=[],all=[];\n if(aqMt(a,now).late&&aqOn(a).length){msg(aqLateMsg(a,now));return false}\n aqOn(a).forEach(f=>{const o=a.f[f.id];if(only&&only!==f.id)return;all.push(f.id);if(now-o.t<HR)return;o.t=now;ids.push(f.id)});")
rep("aqSave(a);chip();aqStatus();aqFx(ids);sfx(660,.45)","aqSave(a);chip();aqStatus();aqFx(all,ids);sfx(660,.45)")
# élan d’un poisson touché : le temps de sa nage avance (il avance vraiment sur sa route, dans son sens), un décalage s’efface en douceur
rep("function aqNear(P,cx,cy)","""/* un poisson qu’on touche n’aime pas ça : il prend de l’avance sur sa route, dans le sens où il nage (si un mur est tout près, il fait demi-tour et s’éloigne) */
function aqDash(el){
 if(wRM||!el||!el.isConnected||el._dsh)return;
 const A=el.getAnimations({subtree:true}).filter(a=>a.animationName==='swx'||a.animationName==='flp'),sw=A.find(a=>a.animationName==='swx');
 if(!sw)return;
 const tm=sw.effect.getComputedTiming(),d=+tm.duration,dl=+tm.delay||0,o=A.map(a=>+a.currentTime),c0=+sw.currentTime;
 if(!(d>0)||!isFinite(c0))return;
 const k=Math.floor((c0-dl)/d),smax=Math.max(0,dl+(k+1)*d-c0-30),pos=s=>{A.forEach((a,i)=>{a.currentTime=o[i]+s});return aqNx(el)},x0=pos(0),D=54;
 /* on cherche de combien de temps de nage il doit avancer pour gagner D px : d’abord droit devant sur son trajet ; s’il atteint le mur avant, il fait demi-tour et s’éloigne */
 const M=smax+d*.6,n=120;let s=-1,bs=0,bd=0;
 for(let i=1;i<=n;i++){const q=M*i/n,g=Math.abs(pos(q)-x0);if(g>bd){bd=g;bs=q}if(g>=D){let lo=M*(i-1)/n,hi=q;for(let j=0;j<8;j++){const m=(lo+hi)/2;if(Math.abs(pos(m)-x0)>=D)hi=m;else lo=m}s=hi;break}}
 if(s<0)s=bs;
 const x1=pos(s);
 if(Math.abs(x1-x0)<2){pos(0);return}
 el._dsh=1;
 const an=el.animate([{transform:'translateX('+(x0-x1).toFixed(1)+'px)'},{transform:'translateX(0px)'}],{duration:760,easing:'cubic-bezier(.12,.8,.25,1)'});
 an.onfinish=an.oncancel=()=>{el._dsh=0};
}
function aqNear(P,cx,cy)""")
rep("aqfish:v=>{mt='m-aq';if(!aqFeed(v)){const a=aqRead(),o=a.f[v];","aqfish:v=>{mt='m-aq';if(!aqFeed(v)){const a=aqRead(),o=a.f[v];if(o&&o.on&&!(AQS&&AQS.F[v]&&AQS.F[v].mode!=='done'))aqDash(document.querySelector('.tank .fx[data-id=\"'+v+'\"]'));")

# v55 : équité du repas (un poisson déjà servi laisse des grains à ceux qui n’ont rien mangé)
rep("f.mode=f.eaten<f.max&&S.P.some(q=>q.state<2)?'rush':'back'","f.mode=f.eaten<f.max&&S.P.filter(q=>q.state<2).length>Object.values(S.F).filter(g=>g.eaten===0&&g.mode!=='done').length?'rush':'back'")
# v55 : changer d’onglet (Poissons · Décors · Entretien) ne recharge plus l’aquarium ; quand l’aquarium est rafraîchi (achat, rangement), les poissons gardent leur place dans leur nage
rep("aqtab:v=>{aqTab=v;aqEd=false;aquaScreen()},","aqtab:v=>aqTabTo(v),")
rep("aqcare:()=>{aqTab='care';aqEd=false;aquaScreen()},","aqcare:()=>aqTabTo('care'),")
rep("{aqTab='care';aqEd=false;aquaScreen();return}aqFeed(null)","{aqTabTo('care');return}aqFeed(null)")
rep("function aquaRefresh(){const t=$('#tank');if(!t)return;t.outerHTML=tankHTML(aqRead());aqPanel();aqStatus();chip()}",
"""function aquaRefresh(){const t=$('#tank');if(!t)return;
 const ct={};t.querySelectorAll('.fx').forEach(e=>{ct[e.dataset.id]=e.getAnimations({subtree:true}).map(a=>[a.animationName,+a.currentTime])});
 t.outerHTML=tankHTML(aqRead());
 document.querySelectorAll('#tank .fx').forEach(e=>{const c=ct[e.dataset.id];if(c)e.getAnimations({subtree:true}).forEach(a=>{const m=c.find(q=>q[0]===a.animationName);if(m&&isFinite(m[1]))a.currentTime=m[1]})});
 aqPanel();aqStatus();chip()}
/* onglets de l’aquarium : seul le panneau du bas change, l’aquarium (poissons, bulles, repas en cours) continue sans se recharger */
function aqTabTo(v){
 const was=aqEd,bs=document.querySelectorAll('[data-a=aqtab]');aqTab=v;aqEd=false;
 if(!$('#tank')||!bs.length)return aquaScreen();
 bs.forEach(b=>b.classList.toggle('on',b.dataset.v===v));
 const m=$('#m-aq');if(m)m.textContent='';
 if(was)aquaRefresh();else{aqPanel();aqStatus()}
}""")

# v55 : un grain tombe toujours à portée (jamais hors de l’aquarium) et un poisson contre un mur se retourne pour l’attraper avec sa bouche
rep("S.P.push({e,x:(cx+(Math.random()*2-1)*sp)*tw,y:-8,","S.P.push({e,x:Math.max(.04*tw,Math.min(.96*tw,(cx+(Math.random()*2-1)*sp)*tw)),y:-8,")
rep("if(Math.abs(p.xs-cx)>f.fw*.45)f.dir=p.xs>cx?1:-1;","if(Math.abs(p.xs-cx)>f.fw*.45)f.dir=p.xs>cx?1:-1;\n    {const nd=q=>p.xs-q*f.fw*.4-f.fw/2;if(nd(f.dir)<-1||nd(f.dir)>tw-f.fw+1)f.dir=-f.dir}")

rep("  if(!UNL()&&fl<SG)return socFail('Il te faut '+SG+' ❄ pour faire un cadeau (tu en as '+fl+').');\n","")
rep("  if(!spend(SG))return socFail('Il te manque quelques flocons.');\n","")
rep("ils quittent ton total et arrivent dans le sien.","c’est gratuit : ça ne coûte rien à ton total, et ils arrivent dans le sien.")

rep("${!UNL()&&fl<SG?' low':''}","")
rep("'Confirmer · −'+SG+' ❄'","'Confirmer · offrir '+SG+' ❄'")

# ---- v57 : Social — cadeaux sans confirmation ni texte, fiche d'ami
# 1. envoi immédiat, sans message
rep("""  if(SO.cf!==id){SO.cf=id;clearTimeout(SO.cft);SO.cft=setTimeout(()=>{SO.cf='';socRefresh()},3500);SO.ms='';SO.mse=false;return socRefresh()}
  clearTimeout(SO.cft);SO.cf='';
""","")
rep("""  SO.ms=SG+' ❄ envoyés à '+p.name+' ✓ À demain pour un autre cadeau.';SO.mse=false;sfx(660,.4);vib(20);socLater();socRefresh()}""","""  SO.ms='';SO.mse=false;sfx(660,.4);vib(20);socLater();socRefresh()}""")
rep("""${SO.cf===id?'Confirmer · offrir '+SG+' ❄':'Offrir '+SG+' ❄'}""","""Offrir ${SG} ❄""")
rep("""<p class="note" style="margin:0 0 4px">Offrir ${SG} ❄ à un ami : c’est gratuit : ça ne coûte rien à ton total, et ils arrivent dans le sien. Un cadeau par ami et par jour.</p>""","")
# 2. la ligne d'ami ouvre sa fiche ; plus de bouton « Retirer » dans la liste
rep("""return`<div class="fr-i">${av(id)}<div class="fr-t"><b>${esc(nameOf(id))}</b><small>${p?(p.fr[me]>0?'Amis':'N’a pas encore ajouté ton code'):'Profil introuvable'}${r?' · t’a offert '+r+'\\u00a0❄':''}</small></div><div class="fr-b">""","""return`<div class="fr-i"><button class="fr-o" data-a="socProf" data-v="${esc(id)}" aria-label="Voir le profil de ${esc(nameOf(id))}">${av(id)}<span class="fr-t"><b>${esc(nameOf(id))}</b><small>${p?(p.fr[me]>0?'Amis':'N’a pas encore ajouté ton code'):'Profil introuvable'}${r?' · t’a offert '+r+'\\u00a0❄':''}</small></span></button><div class="fr-b">""")
rep("""<button class="lnk" data-a="socRm" data-v="${esc(id)}">${SO.rm===id?'Confirmer le retrait':'Retirer'}</button></div></div>`};
 const inc=""","""</div></div>`};
 const inc=""")
# 3. fiche d'ami
rep(""" const named=M.nt>0;
 const A=""",""" if(SO.pf&&M.fr[SO.pf]>0)return socProfile(SO.pf,M,P[SO.pf],av,nameOf);SO.pf='';
 const named=M.nt>0;
 const A=""")
rep("""function socBody(){""","""const socProg=()=>{let n=0;try{readState().lv.forEach(a=>a.forEach(v=>{if(v)n++}))}catch(e){}let f=0;try{f=Object.keys(aqRead().f||{}).length}catch(e){}return{p:styRead().p,n,f}};
const socWord=()=>{const x=wdRead(),k=wKey(x.d);return x.g.length?{d:x.d,r:x.r,n:x.g.length,p:x.g.map(q=>wdEval(q,k).join(''))}:{d:x.d,r:0,n:0,p:[]}};
function socProfile(id,M,p,av,nameOf){
 const g=p&&p.g,w=p&&p.w,t=socDay(),ch=g?CHP[sCh(g.p)]:null;
 const pr=!g?'<p class="note" style="margin:0">Pas encore de progression : ton ami doit rouvrir l’onglet Social avec la dernière version du jeu.</p>'
  :`<div class="pf-g"><div><b>${g.p}</b><small>/ ${SMX} étapes</small></div><div><b>${g.n}</b><small>niveaux terminés</small></div><div><b>${g.f}</b><small>poisson${g.f>1?'s':''}</small></div></div><p class="note" style="margin:10px 0 0">Chapitre : ${ch?esc(ch.t):'—'}</p>`;
 let wd;
 if(!w||w.d!==t)wd='<p class="note" style="margin:0">Pas encore joué aujourd’hui.</p>';
 else{const mini=w.p.length?`<div class="wmini" aria-hidden="true">${w.p.map(q=>`<div>${[...q].map(e=>`<i class="${['no','pr','ok'][+e]}"></i>`).join('')}</div>`).join('')}</div>`:'';
  wd=`<p class="note" style="margin:0">${w.r===1?'Trouvé en '+w.n+' essai'+(w.n>1?'s':'')+' ✓':w.r===2?'Pas trouvé aujourd’hui ('+w.n+' / '+WT+' essais)':w.n?'En cours : '+w.n+' / '+WT+' essais':'Pas encore joué aujourd’hui.'}</p>${mini}`}
 return`<button class="lnk fr-bk" data-a="socPb">‹ Mes amis</button><section class="glass play soc-i pf-c"><div class="pf-h">${av(id)}<h2 style="margin:0">${esc(nameOf(id))}</h2></div><div class="sy-h">Progression</div>${pr}<div class="sy-h">Mot du jour</div>${wd}<button class="lnk fr-rm" data-a="socRm" data-v="${esc(id)}">${SO.rm===id?'Confirmer le retrait':'Retirer de mes amis'}</button></section>`}
function socBody(){""")
rep("""cur=null;origin='home';nv('soc');mt='m';SO.want=true;SO.cf='';SO.rm='';SO.h='';""","""cur=null;origin='home';nv('soc');mt='m';SO.want=true;SO.cf='';SO.rm='';SO.pf='';SO.h='';""")
rep("""const SO={st:'off',""","""const SO={pf:'',st:'off',""")
rep("""Object.assign(act,{
 socCp:""","""Object.assign(act,{
 socProf:id=>{SO.pf=id;SO.rm='';SO.ms='';SO.h='';socRefresh();window.scrollTo(0,0)},
 socPb:()=>{SO.pf='';SO.rm='';SO.h='';socRefresh();window.scrollTo(0,0)},
 socCp:""")
rep("""M.fr[id]=-Math.max(Date.now(),Math.abs(M.fr[id])+1);st.set('soc:me',M);SO.cf='';SO.ms='Ami retiré.';SO.mse=false;socLater();socRefresh()},""","""M.fr[id]=-Math.max(Date.now(),Math.abs(M.fr[id])+1);st.set('soc:me',M);SO.cf='';SO.pf='';SO.ms='Ami retiré.';SO.mse=false;SO.h='';socLater();socRefresh();window.scrollTo(0,0)},""")
# 4. données publiées : progression + mot du jour
rep("""  if(!o.code&&typeof x.code==='string'&&SOR.test(x.code))o.code=x.code;""","""  if(!o.code&&typeof x.code==='string'&&SOR.test(x.code))o.code=x.code;
  if(x.g&&typeof x.g==='object'&&(+x.g.t||0)>=((o.g&&o.g.t)||0)){const q=v=>Math.max(0,Math.floor(+v)||0);o.g={p:Math.min(SMX,q(x.g.p)),n:Math.min(999,q(x.g.n)),f:Math.min(99,q(x.g.f)),t:+x.g.t||0}}
  if(x.w&&typeof x.w==='object'&&/^\\d{4}-\\d{2}-\\d{2}$/.test(x.w.d)&&(!o.w||x.w.d>=o.w.d)){const pp=(Array.isArray(x.w.p)?x.w.p:[]).filter(s=>/^[012]{5}$/.test(s)).slice(0,6);o.w={d:x.w.d,r:x.w.r===1||x.w.r===2?x.w.r:0,n:pp.length,p:pp}}""")
rep("""const socKey=o=>JSON.stringify([o.code,o.name,o.nt,""","""const socKey=o=>JSON.stringify([o.code,o.name,o.nt,o.g&&[o.g.p,o.g.n,o.g.f],o.w,""")
rep("""const M=socMerge(SO.R,st.get('soc:me',null));
 if(!M.code&&SO.want""","""const M=socMerge(SO.R,st.get('soc:me',null));
 if(SO.got){M.g=Object.assign(socProg(),{t:Date.now()});M.w=socWord()}
 if(!M.code&&SO.want""")
rep("""await SO.col.doc(SO.uid).set({code:M.code,name:M.name,nt:M.nt,fr:M.fr,s:M.s,d:M.d,at:Date.now()})""","""await SO.col.doc(SO.uid).set({code:M.code,name:M.name,nt:M.nt,fr:M.fr,s:M.s,d:M.d,g:Object.assign(socProg(),{t:Date.now()}),w:socWord(),at:Date.now()})""")
# fin du mot du jour : la progression part tout de suite
rep("""function wdSave(x){x.r=x.g.length&&x.g[x.g.length-1]===wKey(x.d)?1:x.g.length>=WT?2:0;st.set('wd',{d:x.d,g:x.g,r:x.r,h:x.h})}""","""function wdSave(x){x.r=x.g.length&&x.g[x.g.length-1]===wKey(x.d)?1:x.g.length>=WT?2:0;st.set('wd',{d:x.d,g:x.g,r:x.r,h:x.h});try{if(SO.col&&SO.got&&SO.can)socLater()}catch(e){}}""")
# CSS
rep(""".fr-b .lnk{margin:2px 0 0;padding:4px 6px;font-size:12px}""",""".fr-b .lnk{margin:2px 0 0;padding:4px 6px;font-size:12px}
.fr-o{flex:1;min-width:0;display:flex;align-items:center;gap:12px;background:none;border:0;padding:0;color:inherit;font:inherit;text-align:left;cursor:pointer}
.fr-bk{margin:0 0 6px;text-decoration:none;font-size:15px}
.pf-c .fr-rm{margin-top:22px}.pf-h{display:flex;align-items:center;gap:12px;margin-bottom:6px}
.pf-g{display:flex;gap:10px}.pf-g>div{flex:1;text-align:center;background:rgba(255,255,255,.08);border-radius:14px;padding:10px 4px}.pf-g b{display:block;font:600 1.5rem Fraunces,Georgia,serif}.pf-g small{font-size:12px;color:var(--soft)}
.pf-c .wmini{margin:12px 0 0}""")

# ---- v58 : l'aquarium d'un ami sur sa fiche
rep("""const socWord=()=>""","""const socAq=()=>{const a=aqRead(),nm=aqNames(a),p={};DECO.forEach(d=>{const o=a.p&&a.p[d.id];if(a.d[d.id]&&o&&typeof o.x==='number'&&typeof o.b==='number')p[d.id]=[+o.x.toFixed(1),+o.b.toFixed(1)]});return{f:aqOn(a).map(f=>[f.id,nm[f.id]||'']),d:DECO.filter(d=>a.d[d.id]).map(d=>d.id),p,w:a.w}};
function socTank(q){
 const n=Date.now(),a={f:{},d:{},p:{},ws:[q.w],w:q.w,fc:n,wc:n,at:n};
 q.f.forEach(([i,nm])=>{a.f[i]={on:1,t:n,n:nm}});q.d.forEach(i=>{a.d[i]=1});Object.entries(q.p).forEach(([i,v])=>{a.p[i]={x:v[0],b:v[1],t:n}});
 const ed=aqEd;aqEd=false;let h;try{h=tankHTML(a)}finally{aqEd=ed}
 return h.replace('id="tank"','id="ftank"').replace(/ data-a="aqfish" data-v="[^"]*" role="button" tabindex="0"/g,' role="img"').replace(/<span class="hg">[^<]*<\\/span>/g,'')}
const socWord=()=>""")
rep("""<div class="sy-h">Mot du jour</div>${wd}""","""<div class="sy-h">Aquarium</div>${q?`<div class="ftk">${socTank(q)}</div><p class="note" style="margin:10px 0 0">${q.f.length} poisson${q.f.length>1?'s':''} · ${q.d.length} décor${q.d.length>1?'s':''}</p>`:'<p class="note" style="margin:0">Pas encore visible : ton ami doit rouvrir l’onglet Social avec la dernière version du jeu.</p>'}<div class="sy-h">Mot du jour</div>${wd}""")
rep("""const g=p&&p.g,w=p&&p.w,t=socDay()""","""const g=p&&p.g,w=p&&p.w,q=p&&p.q,t=socDay()""")
rep("""  if(x.w&&typeof x.w==='object'&&/^""","""  if(x.q&&typeof x.q==='object'&&WATER.some(w=>w.id===x.q.w)){const fi=(Array.isArray(x.q.f)?x.q.f:[]).filter(e=>Array.isArray(e)&&FISH.some(f=>f.id===e[0])).slice(0,40).map(e=>[e[0],aqClN(e[1])]),di=(Array.isArray(x.q.d)?x.q.d:[]).filter(i=>DECO.some(d=>d.id===i)).slice(0,60),pp={},c=v=>Math.max(0,Math.min(100,+v||0));if(x.q.p&&typeof x.q.p==='object')di.forEach(i=>{const v=x.q.p[i];if(Array.isArray(v)&&v.length>=2)pp[i]=[c(v[0]),c(v[1])]});o.q={f:fi,d:di,p:pp,w:x.q.w}}
  if(x.w&&typeof x.w==='object'&&/^""")
rep("""o.g&&[o.g.p,o.g.n,o.g.f],o.w,""","""o.g&&[o.g.p,o.g.n,o.g.f],o.w,o.q,""")
rep("""M.w=socWord()}""","""M.w=socWord();M.q=socAq()}""")
rep("""w:socWord(),at:Date.now()})""","""w:socWord(),q:socAq(),at:Date.now()})""")
rep("""function aqSave(a){a.at=Date.now();st.set('aq',a)}""","""function aqSave(a){a.at=Date.now();st.set('aq',a);try{if(SO.col&&SO.got&&SO.can)socLater()}catch(e){}}""")
rep(""".pf-c .wmini{margin:12px 0 0}""",""".pf-c .wmini{margin:12px 0 0}
.ftk{margin-top:2px;border-radius:18px;overflow:hidden;pointer-events:none}.ftk .tank{margin:0}""")

# ---- v60 : trois nouveaux jeux (match-3, déménagement, scrabble)
D57='/tmp/claude-0/-home-claude/3d7f4fc1-f8a6-597b-88d5-0c7ad635827d/scratchpad/v57/'
R57=lambda f:open(D57+f,encoding='utf-8').read().rstrip('\n')+'\n'
rep("""w:'Le petit renard est rentré au terrier, bien au chaud sous la lune.'}
];""","""w:'Le petit renard est rentré au terrier, bien au chaud sous la lune.'},
{id:'match3',n:'Constellations',ic:'✧',a:'#8fb4f0',b:'#4a5db0',t:'Les constellations',s:'Dans le ciel, des pièces brillantes se mêlent. Aligne-les pour les faire briller : quatre alignées font naître une lune, un carré de quatre une étoile, et cinq alignées un soleil.',w:'Le ciel brille un peu plus fort ce soir.'},
{id:'demenage',n:'Déménagement',ic:'⌂',a:'#e8b98a',b:'#9a5f3a',t:'Les boîtes du déménagement',s:'Une nouvelle maison, des boîtes partout. Sors les objets un à un et range-les là où ils vont : la brosse à dents sur le lavabo, le toutou sur le lit…',w:'Tout est rangé. La maison sent déjà le chez-soi.'}
];
const SP=[{id:'scrabble',n:'Scrabble',ic:'Ⓢ',a:'#e6b86a',b:'#9a6a2e',t:'La partie du soir',s:'Pose des mots sur le plateau avec les sept lettres de ton chevalet. Joue ton tour, ton ami joue le sien quand il le souhaite. Pas d’indices ici.',sp:'Entre amis'}];""")
rep("const NLS={mots:40,memo:20,caches:20,phrase:20,maze:20}","const NLS={mots:40,memo:20,caches:20,phrase:20,maze:20,match3:20,demenage:10}")
rep("const ORD=['mots','caches','croises','phrase','tournade','maze','memo','sudoku'],GD=[...ORD.map(i=>G.find(g=>g.id===i)),...G.filter(g=>g.soon)];","const ORD=['mots','caches','croises','phrase','tournade','maze','memo','sudoku','match3','demenage'],GD=[...ORD.map(i=>G.find(g=>g.id===i)),...SP,...G.filter(g=>g.soon)];")
rep("const ALL=[...G,...DL],","const ALL=[...G,...DL,...SP],")
rep("maze:pMaze,memo:pMemo,sudoku:pSudoku,caches:pSearch})[g](r)","maze:pMaze,memo:pMemo,sudoku:pSudoku,caches:pSearch,match3:pMatch,demenage:pDemen})[g](r)")
rep("open:v=>{lvOpen=false;return v==='quote'?quote():hub(v)},","open:v=>{lvOpen=false;return v==='quote'?quote():v==='scrabble'?scrHub():hub(v)},")
rep("${g.soon?'Bientôt':[...Array(nl(g.id)).keys()]","${g.soon?'Bientôt':g.sp?g.sp:[...Array(nl(g.id)).keys()]")
rep("<h2>Bien joué</h2><p>${g.w}</p>","<h2>Bien joué</h2><p>${(g.wl&&g.wl[lv])||g.w}</p>")
rep("const sv=keep;","/* v57 */\n"+R57('m3.js')+R57('dem.js')+R57('scr.js')+"const sv=keep;")
rep(".ftk .tank{margin:0}",".ftk .tank{margin:0}\n"+R57('games.css'))

# ---- v61 : Scrabble — repère « sg » dans le profil, fiche d'ami, tuile d'accueil
rep("const o={code:'',name:'',nt:-1,fr:{},s:{},d:{}};","const o={code:'',name:'',nt:-1,fr:{},s:{},d:{},sg:{}};")
rep("""  if(x.d&&typeof x.d==='object')Object.entries(x.d).forEach(([k,v])=>{if(SOK.test(k)&&/^\\d{4}-\\d{2}-\\d{2}$/.test(v)&&v>(o.d[k]||''))o.d[k]=v});""","""  if(x.d&&typeof x.d==='object')Object.entries(x.d).forEach(([k,v])=>{if(SOK.test(k)&&/^\\d{4}-\\d{2}-\\d{2}$/.test(v)&&v>(o.d[k]||''))o.d[k]=v});
  if(x.sg&&typeof x.sg==='object')Object.entries(x.sg).forEach(([k,v])=>{if(SOK.test(k)&&Array.isArray(v)&&typeof v[0]==='string'&&/^[a-z0-9]{1,16}$/.test(v[0])&&(+v[2]||0)>((o.sg[k]&&o.sg[k][2])||0))o.sg[k]=[v[0],Math.max(0,Math.min(9999,Math.floor(+v[1])||0)),+v[2]||0]});""")
rep("o.w,o.q,Object.entries(o.fr).sort(),","o.w,o.q,Object.entries(o.sg).sort(),Object.entries(o.fr).sort(),")
rep(".set({code:M.code,name:M.name,nt:M.nt,fr:M.fr,s:M.s,d:M.d,g:",".set({code:M.code,name:M.name,nt:M.nt,fr:M.fr,s:M.s,d:M.d,sg:M.sg||{},g:")
rep(""" socDot();socRefresh();
}
async function socInit(){""",""" socDot();socRefresh();scrOnProfiles();
}
async function socInit(){""")
rep("""<button class="lnk fr-rm" data-a="socRm\"""","""${scrProf(id)}<button class="lnk fr-rm" data-a="socRm\"""")
rep("g.sp?g.sp:[...Array(nl(g.id))","g.sp?(g.id==='scrabble'?scrTile():g.sp):[...Array(nl(g.id))")
rep("""Object.assign(act,{
 socProf:id=>{""","""Object.assign(act,{
 scrFrom:id=>{scrInstall();scrOpen(id)},
 socProf:id=>{""")

# ---- v62 : mon profil, photo de profil, indices à 1 ❄, flocons par jeu
import re as _re
# indices : 1 flocon
n0=h.count("spend(5)")+h.count("spend(3)");assert n0==10,n0
h=h.replace("spend(5)","spend(1)").replace("spend(3)","spend(1)")
h,k=_re.subn(r"`,[35]\)","`,1)",h);assert k==10,k
# flocons par jeu (première réussite d'un niveau)
rep("const sv=keep;","const RWD={mots:5,caches:3,croises:5,phrase:2,tournade:2,maze:2,memo:2,sudoku:5,demenage:4,match3:3},rw=id=>RWD[id]||5;\nconst sv=keep;")
rep("first=!st.get(lk,false),r=5;","first=!st.get(lk,false),r=rw(cur);")
rep("' sur '+N+' terminés · +5 ❄'","' sur '+N+' terminés · +'+rw(id)+' ❄'")
rep("'Un niveau passé t’attend · +5 ❄'","'Un niveau passé t’attend · +'+rw(id)+' ❄'")
# profil : photo (av) fusionnée, enregistrée, comparée
rep("const o={code:'',name:'',nt:-1,fr:{},s:{},d:{},sg:{}};","const o={code:'',name:'',nt:-1,fr:{},s:{},d:{},sg:{},av:null};")
rep("""o.sg[k]=[v[0],Math.max(0,Math.min(9999,Math.floor(+v[1])||0)),+v[2]||0]});""","""o.sg[k]=[v[0],Math.max(0,Math.min(9999,Math.floor(+v[1])||0)),+v[2]||0]});
  if(x.av&&typeof x.av==='object'){const t=+x.av.t||0,k=x.av.k,v=x.av.v;if(t>(o.av?o.av.t:-1)){if(k==='e'&&SOAV.includes(v))o.av={k,v,t};else if(k==='p'&&typeof v==='string'&&/^data:image\\/jpeg;base64,[A-Za-z0-9+/=]{20,14000}$/.test(v))o.av={k,v,t};else if(!k)o.av={k:'',v:'',t}}}""")
rep("o.w,o.q,Object.entries(o.sg).sort(),","o.w,o.q,o.av,Object.entries(o.sg).sort(),")
rep("sg:M.sg||{},g:","sg:M.sg||{},av:M.av||{k:'',v:'',t:0},g:")
# avatar commun
rep(""" const av=id=>`<span class="fr-av" style="--h:${hue(id)}" aria-hidden="true">${esc(([...nameOf(id)][0]||'?').toUpperCase())}</span>`;""",""" const av=id=>socAv(id);""")
# fiche : mon profil / fiche d'ami, fermeture par le nom ou la photo
rep(""" if(SO.pf&&M.fr[SO.pf]>0)return socProfile(SO.pf,M,P[SO.pf],av,nameOf);SO.pf='';""",""" if(SO.pf&&SO.pf===me)return socProfile(me,M,socSelf(M),av,nameOf);
 if(SO.pf&&M.fr[SO.pf]>0)return socProfile(SO.pf,M,P[SO.pf],av,nameOf);SO.pf='';""")
rep("""function socProfile(id,M,p,av,nameOf){
 const g=p&&p.g,""","""function socProfile(id,M,p,av,nameOf){
 const self=id===SO.uid,g=p&&p.g,""")
rep("""return`<button class="lnk fr-bk" data-a="socPb">‹ Mes amis</button><section class="glass play soc-i pf-c"><div class="pf-h">${av(id)}<h2 style="margin:0">${esc(nameOf(id))}</h2></div><div class="sy-h">Progression</div>""","""return`<button class="lnk fr-bk" data-a="socPb">${self?'‹ Social':'‹ Mes amis'}</button><section class="glass play soc-i pf-c"><button class="pf-h" data-a="socPb" aria-label="Fermer le profil de ${esc(self?(M.name||'moi'):nameOf(id))}">${av(id)}<span class="pf-n">${esc(self?(M.name||'Moi'):nameOf(id))}</span></button>${self?socAvEd(M):''}<div class="sy-h">Progression</div>""")
rep("""${scrProf(id)}<button class="lnk fr-rm" data-a="socRm" data-v="${esc(id)}">${SO.rm===id?'Confirmer le retrait':'Retirer de mes amis'}</button></section>`}""","""${self?'':scrProf(id)+`<button class="lnk fr-rm" data-a="socRm" data-v="${esc(id)}">${SO.rm===id?'Confirmer le retrait':'Retirer de mes amis'}</button>`}</section>`}""")
rep(""" return C+D+B+A;""",""" const ME=`<section class="glass play soc-i"><div class="fr-i"><button class="fr-o" data-a="socMe" aria-label="Voir mon profil">${av(me)}<span class="fr-t"><b>${esc(M.name||'Moi')}</b><small>Mon profil · photo, progression, aquarium</small></span></button></div></section>`;
 return ME+C+D+B+A;""")
rep(""" scrFrom:id=>{scrInstall();scrOpen(id)},""",""" scrFrom:id=>{scrInstall();scrOpen(id)},
 socMe:()=>{SO.pf=SO.uid;SO.rm='';SO.ms='';SO.mse=false;SO.h='';socRefresh();window.scrollTo(0,0)},
 socAvE:v=>{if(SOAV.includes(v))socSetAv('e',v)},
 socAvX:()=>socSetAv('',''),""")
rep("${R57('games.css')}","${R57('games.css')}") if False else None

# ---- v63 : moins de lag (flous coûteux, neige plus sobre, halo de l'aquarium)
import re as _re
rep(".glass{background:var(--ngl,rgba(255,255,255,.12));-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);",".glass{background:var(--ngl,rgba(255,255,255,.12));")
h,k=_re.subn(r"(-webkit-)?backdrop-filter:blur\((18|14)px\)( saturate\(1\.2\))?","backdrop-filter:blur(5px)",h);assert k>=6,k
h,k=_re.subn(r"(-webkit-)?backdrop-filter:blur\(calc\(var\(--dt,0\)\*2\.8px\)\)","background:rgba(120,140,70,calc(var(--dt,0)*.2))",h);assert k>=2,k
rep("const snow=ts=>{if(!prefs().snow||document.hidden){","const snow=ts=>{if(!prefs().snow||document.hidden||playing){")
rep("const k=sT?Math.min(3,(ts-sT)/16.67)||1:1;","if(sT&&ts-sT<32)return requestAnimationFrame(snow);const k=sT?Math.min(3,(ts-sT)/16.67)||1:1;")

# ---- v64 : neige partout (allégée en jeu), barre du bas plus opaque avec préfixe Safari
rep("const snow=ts=>{if(!prefs().snow||document.hidden||playing){","const snow=ts=>{if(!prefs().snow||document.hidden){")
rep("x.beginPath();for(const p of P){p.y+=","x.beginPath();let qn=0;for(const p of P){if(playing&&++qn>22)break;p.y+=")
_n=h.count("backdrop-filter:blur(5px);backdrop-filter:blur(5px)");assert _n>=2,_n
h=h.replace("backdrop-filter:blur(5px);backdrop-filter:blur(5px)","-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)")

# ---- v65 : nouveau jeu « Quiz » (le bonhomme pose une question de culture générale par niveau)
rep("w:'Tout est rangé. La maison sent déjà le chez-soi.'}\n];","w:'Tout est rangé. La maison sent déjà le chez-soi.'},\n{id:'quiz',n:'Quiz',ic:'?',a:'#8fd6d0',b:'#2f7f87',t:'Le quiz du bonhomme',s:'Le petit bonhomme te pose une question de culture générale, avec quatre réponses possibles. Bonne réponse : il est content et tu gagnes un flocon. Mauvaise réponse : il est déçu, la bonne réponse t’est montrée, et on passe à la suite.',w:'Le bonhomme est ravi.'}\n];")
rep("match3:20,demenage:10}","match3:20,demenage:10,quiz:40}")
rep("'match3','demenage'],GD=","'match3','demenage','quiz'],GD=")
rep("match3:pMatch,demenage:pDemen})[g](r)","match3:pMatch,demenage:pDemen,quiz:pQuiz})[g](r)")
rep("demenage:4,match3:3}","demenage:4,match3:3,quiz:1}")
rep("const sv=keep;",R57('quiz.js')+"const sv=keep;")

# ---- v68 : écran Jeux en 3 colonnes, sans compteurs de niveaux ni de fêtes
rep("""g.soon?'Bientôt':g.sp?(g.id==='scrabble'?scrTile():g.sp):[...Array(nl(g.id)).keys()].filter(i=>st.get(ckey(g.id)+':'+i,false)).length+' / '+nl(g.id)+' niveaux'+(xmasOn()?'<br><span class="xt">✦ Fêtes '+[...Array(NLX).keys()].filter(i=>st.get(ckey(g.id)+':'+(nl(g.id)+i),false)).length+' / '+NLX+'</span>':'')""","""g.soon?'Bientôt':g.sp?(g.id==='scrabble'?scrTile():g.sp):''""")

# ---- v69 : ouvrir un jeu depuis l'écran Jeux ramène en haut de la page
rep("open:v=>{lvOpen=false;return v==='quote'?quote():v==='scrabble'?scrHub():hub(v)},","open:v=>{lvOpen=false;const r=v==='quote'?quote():v==='scrabble'?scrHub():hub(v);window.scrollTo(0,0);return r},")

# ---- v70 : tuile Scrabble : icône « plusieurs personnes » à gauche du nom
rep("""data-v="${g.id}"><i>${g.ic}</i><b>${g.n}</b><small>""","""data-v="${g.id}"><i>${g.ic}</i><b>${g.id==='scrabble'?'<svg class="mp" viewBox="0 0 24 24" role="img" aria-label="Multijoueur"><circle cx="12" cy="8" r="3.2"/><circle cx="5" cy="9.6" r="2.3"/><circle cx="19" cy="9.6" r="2.3"/><path d="M6.2 19.5c0-3.3 2.6-5.4 5.8-5.4s5.8 2.1 5.8 5.4z"/><path d="M1.3 18.6c0-2.5 1.7-4.2 4.1-4.2.7 0 1.3.1 1.9.4-1 .9-1.7 2.2-1.9 3.8z"/><path d="M22.7 18.6c0-2.5-1.7-4.2-4.1-4.2-.7 0-1.3.1-1.9.4 1 .9 1.7 2.2 1.9 3.8z"/></svg>':''}${g.n}</b><small>""")

# ---- v71 : nouveau jeu « Échecs » (la clairière) : contre l'ordinateur, entre amis, même appareil
rep("sp:'Entre amis'}];","sp:'Entre amis'},\n{id:'chess',n:'Échecs',ic:'♞',a:'#7fb88a',b:'#2b5f45',t:'La clairière',s:'Une partie d’échecs au calme, sous les sapins : contre l’ordinateur, à deux sur le même appareil, ou à distance contre un ami. Tu choisis la durée au début, ou pas de limite de temps.',sp:'Seul ou à deux'}];")
rep("v==='scrabble'?scrHub():hub(v);window.scrollTo(0,0)","v==='scrabble'?scrHub():v==='chess'?chHub():hub(v);window.scrollTo(0,0)")
rep("${g.id==='scrabble'?'<svg class=\"mp\"","${g.id==='scrabble'||g.id==='chess'?'<svg class=\"mp\"")
rep("g.id==='scrabble'?scrTile():g.sp","g.id==='scrabble'?scrTile():g.id==='chess'?'':g.sp")
rep("socDot();socRefresh();scrOnProfiles();","socDot();socRefresh();scrOnProfiles();chOnProfiles();")
rep("const sv=keep;",R57('chess_a.js')+R57('chess_b.js')+"const sv=keep;")
rep(".ftk .tank{margin:0}\n",".ftk .tank{margin:0}\n"+R57('chess.css')+"\n")

# ---- v72 : 60 niveaux de mots, livre du déménagement, poussières = flocons, quiz aléatoire, échecs (skins, gains)
import json as _j
_M=_j.load(open('words/mots_final.json',encoding='utf-8'))
_a=h.index("const L=`");_b=h.index("const LB='",_a);_c=h.index("';",_b)+2
_old=set(h[_b+10:_c-2].split(' '))
_ex=list(_M['extra'])+[w for w in sorted(_old) if w and w not in _M['extra']]
h=h[:_a]+"const L=`"+"\n".join(_M['L'])+"`.split('\\n').map(l=>l.trim().split(' '));\nconst LB='"+" ".join(_ex)+"';"+h[_c:]
rep("{mots:40,","{mots:60,")
rep("quiz:40}","quiz:1}")
# livre du déménagement
rep("const sv=keep;",R57('dembook.js')+"""(()=>{if(st.get('mig72',0))return;st.set('mig72',1);
 for(let i=0;i<10;i++){const a='c:mots:'+(40+i),b='c:mots:'+(60+i),k='k:mots:'+(40+i);if(st.get(a,false)){st.set(b,true);st.set(a,null)}if(st.get(k,false)){st.set('k:mots:'+(60+i),true);st.set(k,null)}}
 for(let i=0;i<70;i++)st.set('p:mots:'+i,null)})();
const sv=keep;""")
rep("${xon?`<section class=\"rc xm\" data-g=\"✦\">","${id==='demenage'?`<section class=\"rc\" data-g=\"📖\"><div class=\"rc-ic\">📖</div><div class=\"rc-t\"><small>Le livre</small><b>Revoir l’histoire</b><span>Les pages que tu as déjà écrites</span></div><button class=\"rc-go\" data-a=\"dbook\">Ouvrir<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></button></section>`:''}${xon?`<section class=\"rc xm\" data-g=\"✦\">")
# refaire un niveau : 1 flocon et 1 poussière, quel que soit le jeu
rep("first=!st.get(lk,false),r=rw(cur);\n if(first){fl+=r;st.set('fl',fl);styGain()}","first=!st.get(lk,false),r=first?rw(cur):1;\n fl+=r;st.set('fl',fl);styGain(r)")
rep("${first?'+'+r+' flocons':'Déjà terminé : pas de flocons cette fois.'}","${first?'+'+r+' flocons':'Niveau refait : +1 flocon'}")
rep("${first?'<p class=\"sdu\">✦ +1 poussière d’étoile</p>':''}","<p class=\"sdu\">✦ +${r} poussière${r>1?'s':''} d’étoile</p>")
# quiz : plus de sélecteur de niveau
rep("function hub(id){","function hub(id){if(id==='quiz')return home();")
rep("open:v=>{lvOpen=false;const r=v==='quote'?quote()","dbook:()=>demBook(),dbk:()=>hub('demenage'),open:v=>{lvOpen=false;const r=v==='quiz'?start('quiz',false,0):v==='quote'?quote()")

# ---- v73 : mot du jour compact une fois fait, musique aquatique du match-3, nouvelles espèces de l'aquarium
rep('<button class="glass wcard pt-wordle" style="${dgSty(g)}"','<button class="glass wcard${x.r?\' wdone\':\'\'} pt-wordle" style="${dgSty(g)}"')
rep("<small>${sub}</small></span><svg viewBox","<small>${sub}</small></span>${x.r?mini:''}<svg viewBox")
rep("</svg></span>${mini}</button>`;\n}","</svg></span>${x.r?'':mini}</button>`;\n}")
rep(".ftk .tank{margin:0}\n",".ftk .tank{margin:0}\n.wcard.wdone{padding:10px 14px}.wcard.wdone .wh{gap:10px}.wcard.wdone .wh>i{width:30px;height:30px;font-size:16px;border-radius:10px}.wcard.wdone .wt b{font-size:16px}.wcard.wdone .wt small{font-size:12px;line-height:1.3}.wcard.wdone .wh>svg{width:16px;height:16px}.wcard.wdone .wmini{margin:0;gap:2px;flex:none}.wcard.wdone .wmini div{grid-template-columns:repeat(5,8px);gap:2px}.wcard.wdone .wmini i{height:5px;border-radius:2px}\n")
rep("function fishSVG(f){",R57('fish2.js')+"function fishSVG(f){")
rep("{id:'ange',n:'Poisson-ange'","{id:'globe',n:'Poisson-globe',p:220,sh:'globe',b:'#f2c94c',f:'#fff0b0',sc:'#c9972a',sp:'#e0a93a',sz:1},\n{id:'ange',n:'Poisson-ange'")
rep("{id:'discus',n:'Discus turquoise'","{id:'hippo',n:'Hippocampe',p:350,sh:'hippo',b:'#ff9f5a',f:'#ffd9a8',sc:'#d9692a',sz:1},\n{id:'discus',n:'Discus turquoise'")
rep("{id:'lune',n:'Poisson-lune doré'","{id:'raie',n:'Raie manta',p:500,sh:'manta',b:'#4d5aa8',f:'#e9eeff',sc:'#2c3573',sp:'#8f9be0',sz:1.3},\n{id:'lune',n:'Poisson-lune doré'")
rep("{id:'hockey',n:'Poisson hockeyeur'","{id:'tortue',n:'Tortue de mer',p:650,sh:'tortue',b:'#4fae6a',f:'#ecdca2',sc:'#8bcf86',sz:1.3},\n{id:'hockey',n:'Poisson hockeyeur'")
rep("{id:'royal',n:'Betta royal'","{id:'meduse',n:'Méduse',p:850,sh:'meduse',b:'#c9a3ff',f:'#f2e3ff',sc:'#ff9ad5',sz:1.15},\n{id:'royal',n:'Betta royal'")
rep("music.gain.setTargetAtTime(p.music?.6:0,t,1.2)","music.gain.setTargetAtTime(p.music?(typeof aqMu==='object'&&aqMu.on?.08:.6):0,t,1.2);if(typeof aqMu==='object')aqMu.vol(p.music)")
rep("function theme(id,x){","function theme(id,x){m3Mus(id==='match3');")
rep("const sv=keep;",R57('aqmus.js')+"const sv=keep;")

rep("function sfx(f=520,d=.25){if(!AC||!mg||!prefs().sfx)return;","function sfx(f=520,d=.25){if(!AC||!mg||!prefs().sfx)return;if(typeof aqMu==='object'&&aqMu.on)return aqMu.fx(f,d);")

# ---- v73b : musique et bruitages de Noël dans les niveaux spéciaux de Noël
rep("typeof aqMu==='object'&&aqMu.on?.08:.6","(typeof aqMu==='object'&&aqMu.on)||(typeof xmMu==='object'&&xmMu.on)?.08:.6")
rep("if(typeof aqMu==='object')aqMu.vol(p.music)","if(typeof aqMu==='object')aqMu.vol(p.music);if(typeof xmMu==='object')xmMu.vol(p.music)")
rep("m3Mus(id==='match3');","m3Mus(id==='match3'&&!x);xmMus(!!x);")
rep("if(typeof aqMu==='object'&&aqMu.on)return aqMu.fx(f,d);","if(typeof xmMu==='object'&&xmMu.on)return xmMu.fx(f,d);if(typeof aqMu==='object'&&aqMu.on)return aqMu.fx(f,d);")
rep("const sv=keep;",R57('xmmus.js')+"const sv=keep;")

rep(".ftk .tank{margin:0}\n",".ftk .tank{margin:0}\n"+R57('bg73.css')+"\n")

rep("const q=hs(f.id),du=16+q%10,y=8+(k*37+q%11)%46;return`<div class=\"fx ","const q=hs(f.id),du=16+q%10,y=8+(k*37+q%11)%46,W=aqWan(f,q,du,k);return`<style>${W.css}</style><div class=\"fx ")
rep("--d:${du}s;--dl:${-(q%du)}s;--p:","--d:${W.D}s;--dl:${W.dl}s;--p:")
rep("a.animationName==='swx'||a.animationName==='flp'),sw=A.find(a=>a.animationName==='swx')","/^(swx|flp)/.test(a.animationName)),sw=A.find(a=>a.animationName.startsWith('swx'))")
rep("const aqNx=el=>",R57('wander.js')+"\nconst aqNx=el=>")

rep("function aqNear(P,cx,cy)",R57('aqquote.js')+"\nfunction aqNear(P,cx,cy)")

rep("${d.svg}</svg>`}).join('')}","${d.svg}</svg>${aqGlowEl(d,q)}`}).join('')}")
rep("function aqNear(P,cx,cy)",R57('aqglow.js')+"\nfunction aqNear(P,cx,cy)")

_o='app.innerHTML=`<header class="top"><h1>Aquarium</h1><div class="chip">❄ ${FLX()}</div></header>${tankHTML(aqRead())}<section class="glass play" style="--a:#6fc3e8;--b:#2a6f9a"><div class="aqf"><div><b id="aqs"></b><small id="aqn"></small></div><button class="btn" id="aqb" data-a="aqfeed"></button></div><p class="m" id="m-aq" role="status" aria-live="polite"></p><div class="seg"><button class="${aqTab===\'fish\'?\'on\':\'\'}" data-a="aqtab" data-v="fish">Poissons</button><button class="${aqTab===\'deco\'?\'on\':\'\'}" data-a="aqtab" data-v="deco">Décors</button><button class="${aqTab===\'care\'?\'on\':\'\'}" data-a="aqtab" data-v="care">Entretien<i class="aqm-pt" id="aqm-pt" hidden></i></button></div><div id="aql"></div></section>`;'
rep(_o,'AQR=innerWidth/innerHeight;app.innerHTML=`<div class="aqfs"><header class="top aqhd"><h1>Aquarium</h1><div class="chip">❄ ${FLX()}</div></header>${tankHTML(aqRead())}<div class="aqst"><b id="aqs"></b><small id="aqn"></small></div><p class="m" id="m-aq" role="status" aria-live="polite"></p><div class="aqbar"><button class="aqrb" data-a="aqshop"><span class="aqri"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg></span><b>Boutique</b></button><button class="aqfeedb" id="aqb" data-a="aqfeed"></button><button class="aqrb" data-a="aqcare"><span class="aqri"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c3.6 4.6 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 2.4-6.4 6-11Z"/><path d="M9 14.5a3 3 0 0 0 3 3"/></svg><i class="aqm-pt" id="aqm-pt" hidden></i></span><b>Entretien</b></button></div><button class="btn aqedb" data-a="aqed">Terminer le placement</button><div class="aqbd" id="aqbd" data-a="aqclose"></div><section class="aqsh glass" id="aqsh" data-tab="${aqTab}" aria-label="Boutique et entretien"><div class="aqsht"><div class="seg"><button class="${aqTab===\'fish\'?\'on\':\'\'}" data-a="aqtab" data-v="fish">Poissons</button><button class="${aqTab===\'deco\'?\'on\':\'\'}" data-a="aqtab" data-v="deco">Décors</button></div><h2 class="aqtc">Entretien</h2><button class="aqx" data-a="aqclose" aria-label="Fermer">×</button></div><div id="aql"></div></section></div>`;')
rep("const dH=d=>d.w*4/3/(d.ar||1);","let AQR=4/3;const dH=d=>d.w*AQR/(d.ar||1);")
rep("const ed=aqEd;aqEd=false;let h;try{h=tankHTML(a)}finally{aqEd=ed}","const ed=aqEd,ar0=AQR;aqEd=false;AQR=4/3;let h;try{h=tankHTML(a)}finally{aqEd=ed;AQR=ar0}")
rep(" const was=aqEd,bs=document.querySelectorAll('[data-a=aqtab]');aqTab=v;aqEd=false;"," const was=aqEd,bs=document.querySelectorAll('[data-a=aqtab]');aqTab=v;aqEd=false;aqOpenSh(v);")
rep(" aqed:()=>{aqEd=!aqEd;aquaRefresh()},"," aqshop:()=>aqTabTo(aqTab==='care'?'fish':aqTab),aqclose:()=>aqShut(),\n aqed:()=>{aqEd=!aqEd;if(aqEd)aqShut();aquaRefresh()},")
rep("function aqNear(P,cx,cy)","""function aqOpenSh(v){const s=$('#aqsh'),b=$('#aqbd');if(s){s.dataset.tab=v;s.classList.add('open');s.scrollTop=0}if(b)b.classList.add('open')}
function aqShut(){const s=$('#aqsh'),b=$('#aqbd');if(s)s.classList.remove('open');if(b)b.classList.remove('open')}
function aqNear(P,cx,cy)""")

rep("function aqPanel(){","function aqPanel0(){")
rep("function aqNear(P,cx,cy)",R57('aqinv.js')+"\nfunction aqNear(P,cx,cy)")
rep('<div class="aqbar"><button class="aqrb" data-a="aqshop">','<button class="aqrb aqinv" data-a="aqinv"><span class="aqri"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8l8-4 8 4v9l-8 4-8-4V8Z"/><path d="M4 8l8 4 8-4M12 12v9"/></svg></span><b>Inventaire</b></button><div class="aqbar"><button class="aqrb" data-a="aqshop">')
rep("aqshop:()=>aqTabTo(aqTab==='care'?'fish':aqTab),","aqshop:()=>aqTabTo(aqTab==='care'||aqTab==='inv'?'fish':aqTab),aqinv:()=>aqTabTo('inv'),")
rep("aqed:()=>{aqEd=!aqEd;if(aqEd)aqShut();aquaRefresh()},","aqed:()=>{aqEd=!aqEd;if(aqEd)aqShut();aquaRefresh();if(!aqEd)aqTabTo('inv')},")
rep("cur=null;origin='home';nv('aqua');mt='m-aq';aqEd=false;aqBusy=0;","cur=null;origin='home';nv('aqua');mt='m-aq';aqEd=false;aqBusy=0;aqTab='fish';")

rep("function nv(t){playing=false;","function nv(t){if(t!=='aqua')['#aqsh','#aqbd'].forEach(q=>{const e=$(q);if(e){e.classList.remove('open');e.style.visibility='hidden';e.style.transition='none'}});playing=false;")


# ---- v125 : nouveau jeu « Cherche et trouve » (plein écran)
rep("w:'Le bonhomme est ravi.'}\n];","w:'Le bonhomme est ravi.'},\n{id:'cherche',n:'Cherche et trouve',ic:'◉',a:'#ffd37a',b:'#c9742e',nox:1,t:'Le bonhomme s’est perdu',s:'Le petit bonhomme est tombé de son étoile filante. Dans chaque univers, retrouve-le parmi des dizaines d’éléments, ainsi que les objets qui l’aideront à rentrer chez lui. Fais glisser la scène, pince pour agrandir, touche ce que tu trouves.',w:'Le bonhomme te remercie. Un pas de plus vers la maison.',wl:CHWL}\n];")
rep("match3:20,demenage:10,quiz:1}","match3:20,demenage:10,quiz:1,cherche:12}")
rep("'match3','demenage','quiz'],GD=","'match3','demenage','quiz','cherche'],GD=")
rep("demenage:pDemen,quiz:pQuiz})[g](r)","demenage:pDemen,quiz:pQuiz,cherche:pCherche})[g](r)")
rep("demenage:4,match3:3,quiz:1}","demenage:4,match3:3,quiz:1,cherche:4}")
rep("const xon=xmasOn()&&!g.soon,","const xon=xmasOn()&&!g.soon&&!g.nox,")
rep("const G=[","/*CHU*/"+R57('cherche.js')+"\nconst CHWL=CHU.map(u=>u.w);\nconst G=[")


# ---- v126 : « Passer » dans l'en-tête, à gauche d'« Indice » ; barre des objets du cherche-et-trouve
rep(r"""<div class="tr">${hint?`<button class="hb" data-a="hint">""",r"""<div class="tr">${daily?'':'<button class="hb skh" data-a="skip">Passer</button>'}${hint?`<button class="hb" data-a="hint">""")
rep(r"""${daily?'':'<div class="skw" id="skw"><button class="skp" data-a="skip">Passer ce niveau</button></div>'}""",r"""${daily?'':'<div class="skw" id="skw"></div>'}""")
rep(r"""act.skipn=()=>{const w=$('#skw');if(w)w.innerHTML='<button class="skp" data-a="skip">Passer ce niveau</button>'}""",r"""act.skipn=()=>{const w=$('#skw');if(w)w.innerHTML=''}""")

rep("if(!matchMedia('(prefers-reduced-motion: reduce)').matches)snow();","if(!matchMedia('(prefers-reduced-motion: reduce)').matches)snow();\n"+R57('navback.js')+"\n"+R57('notif.js'))
# ---- histoire de Noël ----
rep("const SDU=10,SMX=80,","const XMX=20,XDU=10,SDU=10,SMX=80,")
rep("const styClean=x=>{if(!x||typeof x!=='object')return null;const n=(v,m)=>Math.max(0,Math.min(m,Math.floor(+v)||0)),p=n(x.p,SMX),bw=Math.floor(Math.min(p,n(x.bw,SMX))/10)*10;return{e:Math.max(n(x.e,1e6),p*SDU),p,bw,v:x.v?1:0}};","const styClean=x=>{if(!x||typeof x!=='object')return null;const n=(v,m)=>Math.max(0,Math.min(m,Math.floor(+v)||0)),p=n(x.p,SMX),bw=Math.floor(Math.min(p,n(x.bw,SMX))/10)*10,xp=n(x.xp,XMX);return{e:Math.max(n(x.e,1e6),p*SDU),p,bw,v:x.v?1:0,xe:Math.max(n(x.xe,1e6),xp*XDU),xp}};")
rep("return styClean({e:m('e'),p:m('p'),bw:m('bw'),v:m('v')})}","return styClean({e:m('e'),p:m('p'),bw:m('bw'),v:m('v'),xe:m('xe'),xp:m('xp')})}")
rep("function dayScreen(){",R57('xstory.js')+"\nfunction dayScreen(){")
rep("const Y=styRead();\n app.innerHTML=`<div class=\"stg\" id=\"stg\" data-ph=\"day\"><div class=\"smv\" id=\"smv\">${sMapSVG(Y,'d')}${sMapSVG(Y,'n')}","const Y=styRead(),X=sxOn();xmMus(X);\n app.innerHTML=`<div class=\"stg\" id=\"stg\" data-ph=\"day\"><div class=\"smv\" id=\"smv\">${X?xMapSVG(Y,'d'):sMapSVG(Y,'d')}${X?xMapSVG(Y,'n'):sMapSVG(Y,'n')}")
rep("${sHud(Y)}${aquaRemind()}<p class=\"m shm\" id=\"m\" role=\"status\" aria-live=\"polite\"></p>${sBar(Y)}`;","${X?xHud(Y):sHud(Y)}${aquaRemind()}<p class=\"m shm\" id=\"m\" role=\"status\" aria-live=\"polite\"></p>${X?xBar(Y):sBar(Y)}`;")
rep("qq=SGY.NXY[Y.p];","qq=SGY.NXY[X?(Y.xp||0):Y.p];")
rep("if(sFrag){const n=sFrag;sFrag=0;sOv(sFragH(n))}","if(X&&xFr){const n=xFr;xFr=0;sOv(xFragH(n))}else if(X&&!st.get('stx:i',0)){st.set('stx:i',1);sOv(`<small>Prologue</small><p class=\"sfq\">${XPRO}</p>`,'Commencer')}else if(!X&&sFrag){const n=sFrag;sFrag=0;sOv(sFragH(n))}")
rep("function sGo(){\n if(sBusy)return;","function sGo(){\n if(sxOn())return xGo();if(sBusy)return;")
rep("<div class=\"shc\"><h1>Histoire</h1><small>${C.t} · étape ${Y.p} / ${SMX}</small>","<div class=\"shc\" data-a=\"sstory\" role=\"button\" tabindex=\"0\" aria-label=\"Changer d’histoire\"><h1>Histoire</h1><small>${C.t} · étape ${Y.p} / ${SMX} ▾</small>")
rep("function storyBook(S){\n cur=S?'dbook':'book';nv(S?'games':'daily');","function storyBook(S){\n if(!S&&sxOn())S=xBookS();cur=S?'dbook':'book';nv(S&&S.tab?S.tab:S?'games':'daily');if(S&&S.tab==='daily')xmMus(true);")
rep("${S?'<button class=\"back\" data-a=\"dbk\">‹ Déménagement</button>':bk('day')}","${S?(S.bk||'<button class=\"back\" data-a=\"dbk\">‹ Déménagement</button>'):bk('day')}")
rep("fl+=r;st.set('fl',fl);styGain(r)\n","fl+=r;st.set('fl',fl);(isX(cur,lv)?xGain(r):styGain(r))\n")
rep("<p class=\"sdu\">✦ +${r} poussière${r>1?'s':''} d’étoile</p>","<p class=\"sdu\">${isX(cur,lv)?'🎄 +'+r+' boule'+(r>1?'s':'')+' de Noël':'✦ +'+r+' poussière'+(r>1?'s':'')+' d’étoile'}</p>")

rep("function theme(id,x){m3Mus(id==='match3'&&!x);xmMus(!!x);","function theme(id,x){const xa=xmAll();m3Mus(id==='match3'&&!x&&!xa);xmMus(!!x||xa);")

# ---- Uno ----
rep("sp:'Seul ou à deux'}];","sp:'Seul ou à deux'},\n{id:'uno',n:'Uno',ic:'🃏',a:'#e8735a',b:'#7a3550',t:'Le salon de cartes',s:'Débarrasse-toi de toutes tes cartes avant les autres, contre des bots ou avec jusqu’à 3 amis.',sp:'Seul ou entre amis'}];")
rep("v==='chess'?chHub():","v==='chess'?chHub():v==='uno'?unHub():")
rep("<b>${g.id==='scrabble'||g.id==='chess'?","<b>${g.id==='scrabble'||g.id==='chess'||g.id==='uno'?")
rep("g.id==='chess'?'':g.sp","g.id==='chess'?'':g.id==='uno'?unTile():g.sp")
rep("  if(x.av&&typeof x.av==='object'){","  if(x.un&&typeof x.un==='object'&&typeof x.un.g==='string'&&(x.un.g===''||/^[A-Za-z0-9_-]{3,600}_u$/.test(x.un.g))&&(+x.un.t||0)>((o.un&&o.un.t)||0))o.un={g:x.un.g,t:+x.un.t||0};\n  if(x.av&&typeof x.av==='object'){")
rep("Object.entries(o.sg).sort(),","Object.entries(o.sg).sort(),o.un?[o.un.g,o.un.t]:0,")
rep("scrOnProfiles();chOnProfiles();","scrOnProfiles();chOnProfiles();unOnProfiles();")
rep("function chHub(){",R57('uno.js')+"\nfunction chHub(){")

# ---- notifications ----
rep("(Y.p/SMX*100).toFixed(1)}%\"></b></span></div><div class=\"sht\"><div class=\"chip\" title=\"Flocons\">❄ ${FLX()}</div><button class=\"shb\" data-a=\"sbook\"","(Y.p/SMX*100).toFixed(1)}%\"></b></span></div><div class=\"sht\"><div class=\"chip\" title=\"Flocons\">❄ ${FLX()}</div>${ntBell()}<button class=\"shb\" data-a=\"sbook\"")

# ---- Solitaire ----
rep("sp:'Seul ou entre amis'}];","sp:'Seul ou entre amis'},\n{id:'solitaire',n:'Solitaire',ic:'♠',a:'#5aa38a',b:'#24505a',t:'La patience',s:'Le solitaire classique : 40 niveaux et un mode infini.',sp:'Niveaux et mode infini'}];")
rep("v==='uno'?unHub():","v==='uno'?unHub():v==='solitaire'?soHub():")
rep("function chHub(){",R57('solitaire.js')+"\nfunction chHub(){")
# ---- aquarium : message de repas court, effacé après 4 s ----
rep("msg('✦ +'+gain+' ❄ '+(M>1000?'(décors ×'+frN(M/1000)+') ':'')+'· merci !');return true;","msg('✦ +'+gain+' ❄');setTimeout(()=>{const m=$('#m');if(m&&m.textContent==='✦ +'+gain+' ❄')m.textContent=''},4000);return true;")

# ---- Noël dans l'aquarium + 30 étapes pour Zeni ----
rep("const XMX=20,XDU=10,","const XMX=30,XDU=10,")
rep("const hs=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);",R57('aqxmas.js')+"\nconst hs=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);")
rep("function aqBuy(v){\n mt='m-aq';const[k,id]=v.split(':'),a=aqRead();","function aqBuy(v){\n mt='m-aq';const[k,id]=v.split(':'),a=aqRead(),XL=(k==='f'?FISH:k==='d'?DECO:WATER).find(x=>x.id===id);if(aqXL(XL))return msg('Se débloque à l’étape '+XL.lk+' d’« Un noël pour Zeni ».');")
rep(" if(f.hk)s+=`<path d=\"M52 30L70 49\""," if(f.sa)s+=`<path d=\"M${bx+rx*.05} ${by-ry*.72}Q${bx+rx*.2} ${by-ry-20} ${bx-rx*.35} ${by-ry-14}Q${bx+rx*.5} ${by-ry-12} ${bx+rx*.9} ${by-ry*.5}Z\" fill=\"#d6363f\"/><path d=\"M${bx} ${by-ry*.7}Q${bx+rx*.5} ${by-ry*1.05} ${bx+rx*.95} ${by-ry*.48}\" stroke=\"#fff\" stroke-width=\"5\" fill=\"none\" stroke-linecap=\"round\"/><circle cx=\"${bx-rx*.38}\" cy=\"${by-ry-13}\" r=\"3.8\" fill=\"#fff\"/><g fill=\"#fff\"><circle cx=\"${bx+rx*.92}\" cy=\"${by+ry*.18}\" r=\"3.6\"/><circle cx=\"${bx+rx*.78}\" cy=\"${by+ry*.42}\" r=\"4.4\"/><circle cx=\"${bx+rx*.56}\" cy=\"${by+ry*.55}\" r=\"4.2\"/><circle cx=\"${bx+rx*.36}\" cy=\"${by+ry*.5}\" r=\"3.4\"/></g>`;\n if(f.hk)s+=`<path d=\"M52 30L70 49\"")
rep("<div class=\"skn\" aria-hidden=\"true\"></div><div class=\"rays\"></div>","<div class=\"skn\" aria-hidden=\"true\"></div>${a.w==='noel'?XMBG:''}<div class=\"rays\"></div>")

# ---- Mots cachés : 20 niveaux de plus (21 à 40) ----
rep("const NLS={mots:60,memo:20,caches:20,","const NLS={mots:60,memo:20,caches:40,")
rep("const MSN=[6,6,7,7,8,8,9,9,7,8,8,8,9,8,9,9,8,9,9,9,","const MSN=[6,6,7,7,8,8,9,9,7,8,8,8,9,8,9,9,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,")
rep(" ['VOLCAN','SAGESSE','HARPE','SALADE','GROTTE','LIVRE','TENDRESSE'],\n /* niveaux de fêtes */"," ['VOLCAN','SAGESSE','HARPE','SALADE','GROTTE','LIVRE','TENDRESSE'],\n ['MONTAGNE','REFUGE','SENTIER','BOUSSOLE','CHAMOIS','CORDEE','SOMMET'],\n ['PHARE','MOUETTE','GALET','MAREE','ECUME','VOILIER','PORT'],\n ['GRATIN','FONDUE','RAGOUT','POTAGE','CREPE','BEIGNET','COMPOTE'],\n ['ROMAN','POEME','CONTE','PAGE','SIGNET','RECIT','GRIMOIRE'],\n ['COMETE','GALAXIE','ORBITE','PLANETE','NEBULEUSE','ECLIPSE','SATURNE'],\n ['CHENE','BOULEAU','FOUGERE','MOUSSE','LICHEN','HERISSON','BLAIREAU'],\n ['PIANO','MELODIE','ACCORD','TAMBOUR','CANON','REFRAIN','BERCEUSE'],\n ['SERRE','BULBE','GRAINE','TERREAU','ARROSOIR','JACINTHE','AMARYLLIS'],\n ['GRENIER','ESCALIER','PARQUET','VERANDA','BUFFET','HORLOGE','FAUTEUIL'],\n ['THEIERE','INFUSION','VERVEINE','TILLEUL','JASMIN','SUCRE','TASSE'],\n ['PHOQUE','MORSE','PINGOUIN','RENARD','LAGOPEDE','HERMINE','BALEINE'],\n ['PINCEAU','CRAYON','ARGILE','TOILE','AQUARELLE','FUSAIN','CHEVALET'],\n ['VALISE','TRAIN','BILLET','ESCALE','CARTE','HORIZON','PASSAGER'],\n ['VEILLEUSE','REVERIE','BERCEAU','OREILLER','DUVET','PYJAMA','CHUCHOTER'],\n ['MACARON','GUIMAUVE','PRALINE','MERINGUE','CARAMEL','NOUGATINE','SABLE'],\n ['BARQUE','ROSEAU','MOULIN','PONTON','ECLUSE','NENUPHAR','LIBELLULE'],\n ['AIGUILLE','PELOTE','MAILLE','TRICOT','MOUFLE','CHAUSSON','CROCHET'],\n ['BUCHERON','COPEAU','RABOT','ERABLE','NOYER','CABANE','SCIURE'],\n ['PRINTEMPS','AUTOMNE','SOLSTICE','EQUINOXE','FEUILLE','RECOLTE','SAISON'],\n ['SERENITE','GRATITUDE','PATIENCE','HARMONIE','SOURIRE','LUMINEUX','PAISIBLE'],\n /* niveaux de fêtes */")
rep("LS=Object.assign(mkL(PG,FST.length,i=>QS(nl(G[i].id)).length),{tb:FST,q:PG.map(i=>QS(nl(G[i].id)))})","LS=Object.assign(mkL(PG,FST.length,i=>QS(Math.min(nl(G[i].id),LSN[G[i].id]||99)).length),{tb:FST,q:PG.map(i=>QS(Math.min(nl(G[i].id),LSN[G[i].id]||99)))})")
rep("const PG=G.map((g,i)=>g.soon?-1:i)","const LSN={caches:20};/* les codes courts gardent leur disposition : Mots cachés y compte jusqu’à 20 niveaux */\nconst PG=G.map((g,i)=>g.soon?-1:i)")

# ---- Mots cachés : encore 20 niveaux (41 à 60) ----
rep("const NLS={mots:60,memo:20,caches:40,","const NLS={mots:60,memo:20,caches:60,")
rep("9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,","9,9,9,9,9,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,10,10,10,11,10,10,10,10,10,10,11,")
rep(" ['SERENITE','GRATITUDE','PATIENCE','HARMONIE','SOURIRE','LUMINEUX','PAISIBLE'],\n"," ['SERENITE','GRATITUDE','PATIENCE','HARMONIE','SOURIRE','LUMINEUX','PAISIBLE'],\n ['PATINOIRE','BOURRASQUE','CONGERE','VERGLAS','GIBOULEE','FRIMAS','BLIZZARD'],\n ['LOUVETEAU','FAON','OURSON','CHATON','POUSSIN','CANETON','AGNEAU'],\n ['MARMITE','LOUCHE','FOUET','RAPE','PASSOIRE','ROULEAU','TAMIS'],\n ['CATHEDRALE','CLOCHER','VITRAIL','ARCADE','PORCHE','CLOITRE','DONJON'],\n ['ALBATROS','PELICAN','HERON','MESANGE','ROUGEGORGE','PINSON','HIRONDELLE'],\n ['TOPAZE','RUBIS','EMERAUDE','QUARTZ','AGATE','OPALE','JADE'],\n ['CERCEAU','TOUPIE','MARELLE','CERFVOLANT','BILLE','DOMINO','PUZZLE'],\n ['DUNE','OASIS','MIRAGE','CARAVANE','SABLIER','PALMIER','CHAMEAU'],\n ['FROMAGE','RACLETTE','TARTIFLETTE','COMTE','REBLOCHON','BEAUFORT','TOMME'],\n ['ATELIER','ENCLUME','MARTEAU','TENAILLE','ETABLI','SOUFFLET','LIME'],\n ['NUAGE','ARCENCIEL','ECLAIR','TONNERRE','GRELE','BROUILLARD','AVERSE'],\n ['VIOLETTE','PIVOINE','LILAS','GLYCINE','CAPUCINE','DAHLIA','LAVANDE'],\n ['MARIONNETTE','THEATRE','RIDEAU','COULISSE','ACTEUR','DECOR','APPLAUDIR'],\n ['COQUELICOT','BLEUET','PRAIRIE','MEULE','EPI','MOISSON','GRANGE'],\n ['ARCHIPEL','ATOLL','LAGON','RECIF','ILOT','CRIQUE','PRESQUILE'],\n ['CARROSSE','CHATEAU','PRINCESSE','DRAGON','FEE','SORCIER','LICORNE'],\n ['GOELAND','FALAISE','EMBRUN','BALISE','CHALUTIER','FILET','QUAI'],\n ['CONFITURE','TARTINE','BEURRE','CROISSANT','PAIN','JUS','BOL'],\n ['BOUGEOIR','CHANDELLE','MECHE','CIRE','FLAMBEAU','LUEUR','ETINCELLE'],\n ['BONTE','GENTILLESSE','CONFIANCE','ECOUTE','PARTAGE','ACCUEIL','ENTRAIDE'],\n")

# ---- en-tête des niveaux : le numéro revient, « Passer » se cache dedans ----
rep("<span class=\"tl\">${isX(cur,lv)?'Fêtes '+xn(cur,lv):'Niveau '+(lv+1)}</span><div class=\"tr\">${daily?'':'<button class=\"hb skh\" data-a=\"skip\">Passer</button>'}","${(()=>{const t=isX(cur,lv)?'Fêtes '+xn(cur,lv):'Niveau '+(lv+1);return daily||cur==='quiz'||cur==='match3'?`<span class=\"tl\">${t}</span>`:`<button class=\"tl tlk\" data-a=\"skip\" aria-label=\"${t} : toucher pour passer ce niveau\">${isX(cur,lv)?t:'<span class=\"tlf\">Niveau</span><span class=\"tls\">Niv.</span>&nbsp;'+(lv+1)}<i aria-hidden=\"true\">⏭</i></button>`})()}<div class=\"tr\">")

# ---- Tournade : 16 niveaux de plus (espace, plage, forêt, océan) ----
rep('"3aabaa9"]},{"n": "Cloche"','"3aabaa9"]},{"n": "Fusée", "a": "une fusée", "g": ["0004000", "006bc00", "0050500", "007ad00", "0050500", "0050500", "06bebc0", "0105010", "0001000"]},{"n": "Planète", "a": "une planète et son anneau", "g": ["0006ac000", "000505000", "2aad07aa8", "000505000", "0003a9000"]},{"n": "Satellite", "a": "un satellite", "g": ["000040000", "6ec0506ec", "7ffafaffd", "3b90503b9", "000050000", "000010000"]},{"n": "Casque", "a": "un casque d’astronaute", "g": ["06aaac0", "690003c", "506ac05", "5050505", "503a905", "3c00069", "03eae90", "0010100"]},{"n": "Parasol", "a": "un parasol", "g": ["006aaac00", "06d0007c0", "2bbaeabb8", "000050000", "000050000", "000050000", "2aaabaaa8"]},{"n": "Coquillage", "a": "un coquillage", "g": ["06aeac0", "690503c", "5005005", "3c05069", "03afa90", "0005000", "002b800"]},{"n": "Château de sable", "a": "un château de sable", "g": ["404000404", "7ad0007ad", "503aaa905", "500000005", "5006ac005", "500505005", "3aababaa9"]},{"n": "Palmier", "a": "un palmier", "g": ["06ac06ac0", "6903e903c", "100050001", "000050000", "00003c000", "000005000", "002aabaa8"]},{"n": "Arbre", "a": "un arbre de la forêt", "g": ["006ac00", "06903c0", "690003c", "5000005", "3c00069", "03aea90", "0005000", "02aba80"]},{"n": "Champignon", "a": "un champignon", "g": ["006aaac00", "0690003c0", "6d000007c", "3baeaeab9", "000505000", "000505000", "0003a9000"]},{"n": "Hibou", "a": "un hibou", "g": ["4000004", "7ac06ad", "5050505", "7ababad", "5000005", "5000005", "3eaaae9", "0100010"]},{"n": "Gland", "a": "un gland", "g": ["0004000", "06afac0", "6d0507c", "3fabaf9", "0500050", "0500050", "03c0690", "003e900", "0001000"]},{"n": "Poisson", "a": "un poisson", "g": ["006aac000", "069003c04", "2d00007ad", "03c006901", "003aa9000"]},{"n": "Méduse", "a": "une méduse", "g": ["006ac00", "06903c0", "6d0007c", "7beaebd", "5050505", "5050505", "1010101"]},{"n": "Ancre", "a": "une ancre", "g": ["006ac00", "0050500", "003e900", "0005000", "02afa80", "0005000", "4005004", "3c05069", "03aba90"]},{"n": "Phare", "a": "un phare", "g": ["0004000", "006bc00", "0050500", "007ad00", "0050500", "007ad00", "06d07c0", "03bab90"]},{"n": "Cloche"')
rep("cherche:12},nl=id=>NLS[id]||8","cherche:12,tournade:24},nl=id=>NLS[id]||8")
rep("const LSN={caches:20};","const LSN={caches:20,tournade:8};")

# ---- Social / synchro : relance automatique, bouton Réessayer, profil lié au compte ----
rep("  SO.uid=id;SO.can=cw!==false;SO.col=db.collection('profiles');","  {const ou=st.get('soc:uid','');if(ou&&ou!==id){st.set('soc:me',null);st.set('soc:seen',{})}st.set('soc:uid',id)}\n  SO.uid=id;SO.can=cw!==false;SO.col=db.collection('profiles');SO.ec='';")
rep("SO.unsub=SO.col.onSnapshot(socSnap,()=>{clearTimeout(SO.t10);SO.unsub=null;SO.col=null;SO.got=false;SO.st='err';socRefresh()});","SO.unsub=SO.col.onSnapshot(socSnap,e=>{clearTimeout(SO.t10);SO.unsub=null;SO.col=null;SO.got=false;SO.st='err';SO.ec=String(e&&(e.code||e.message)||'').slice(0,40);socRefresh()});")
rep("w?'Le Social se connectera dès que possible. Tes flocons et tes niveaux ne bougent pas.':'Ton profil se prépare.')}","w?'Le Social se connectera dès que possible : il réessaie tout seul. Tes flocons et tes niveaux ne bougent pas.'+(SO.ec?' <small style=\"opacity:.7\">('+esc(SO.ec)+')</small>':'')+'</p><button class=\"btn\" style=\"margin-top:14px\" data-a=\"socRetry\">Réessayer maintenant</button><p style=\"display:none\">':'Ton profil se prépare.')}")

# ---- Réglages › Sauvegarde : plus de code, seulement le compte ----
rep('<div class="sy-h">Mon code</div><div class="code" id="code" aria-label="Mon code de sauvegarde">${encode(readState())}</div><p class="note" style="margin:8px 0 0">Code court de 10 chiffres : il retient à peu près ta progression (niveaux terminés arrondis vers le bas par paliers de 2, 3 ou 5, et flocons approchés), jamais plus que ce que tu as. Le compte, lui, synchronise tout à l’identique.</p><button class="btn alt" data-a="syCp" id="cpb">Copier le code</button><div class="sy-h">Reprendre avec un code</div><input class="ci" id="ci" type="text" inputmode="numeric" maxlength="20" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="${DG+1} chiffres" value="${esc(Sy.in)}" aria-label="Code à reprendre">${Sy.err?`<p class="m err">${Sy.err}</p>`:\'\'}${Sy.done?`<p class="m">${Sy.done}</p>`:\'\'}${low}</section>`;','</section>`;')
rep('<p class="note">Retrouve tes niveaux et tes flocons sur un autre appareil.</p>','<p class="note">Ta sauvegarde suit ton compte : connecte-toi sur un autre appareil pour retrouver tes niveaux et tes flocons.</p>')

# ---- Sudoku : une image se dessine ----
rep("function pSudoku(r){",R57('sdpix.js')+"function pSudoku(r){")
rep("return`<button class=\"sd-c ${g[i]?'gv':''}","return`<button style=\"${x?'--pc:'+sdPx(lv,i):''}\" class=\"sd-c ${x?'pc '+sdPxC(lv,i):''} ${g[i]?'gv':''}")
rep("const fin=()=>{if(done())setTimeout(win,900);","const fin=()=>{if(done()){msg('Tu as fait apparaître '+sdPxN(lv)+' !');const G=document.querySelector('.sd');if(G)requestAnimationFrame(()=>G.classList.add('sdpxr'));setTimeout(win,2600)}")

# ---- Sudoku : un niveau terminé montre son image, avec « Recommencer le niveau » ----
rep("function pSudoku(r){\n const {g,sol}=sdkPuzzle(lv),","function pSudoku(r){\n if(!r&&!daily&&!SDRE&&st.get(ckey('sudoku')+':'+lv,false)){const {sol:S0}=sdkPuzzle(lv);snap=null;frame(`<p class=\"lit\">Niveau terminé : tu avais fait apparaître ${sdPxN(lv)}.</p><div class=\"sd sdpxr sdview\" aria-label=\"Image de ${sdPxN(lv)}\">${S0.map((x,i)=>`<span class=\"sd-c pc ${sdPxC(lv,i)}\" style=\"--pc:${sdPx(lv,i)}\">${x}</span>`).join('')}</div><button class=\"btn\" data-a=\"sdre\">Recommencer le niveau</button>`);act.sdre=()=>{SDRE=true;pSudoku(null)};return}\n SDRE=false;\n const {g,sol}=sdkPuzzle(lv),")

# ---- Sudoku : 20 niveaux de plus (9 à 28) ----
rep("cherche:12,tournade:24},","cherche:12,tournade:24,sudoku:28},")
rep("const LSN={caches:20,tournade:8};","const LSN={caches:20,tournade:8,sudoku:8};")
rep(" const rnd=rng(l*7919+101),sf=a=>"," const NS=nl('sudoku'),X=l>=NS,sk=X?8+(l-NS):(l<8?l:1000+l),rnd=rng(sk*7919+101),sf=a=>")
rep("const goal=l>=8?[44,41,38,36,34,32,31,30,29,28][Math.min(9,l-8)]:[46,42,38,35,33,31,29,27][Math.max(0,l)],","const goal=X?[44,41,38,36,34,32,31,30,29,28][Math.min(9,l-NS)]:[46,42,38,35,33,31,29,27,27,27,26,26,26,25,25,25,25,24,24,24,24,24,23,23,23,23,22,22,22,22,22,22,22,22,22,22,22,22,22,22][Math.min(39,Math.max(0,l))],")

# ---- Tournade : 14 niveaux de plus (25 à 38) ; Sudoku : 12 de plus (29 à 40) ----
rep('"]},{"n": "Cloche"','"]},{"n": "Clé", "a": "une clé", "g": ["6ac000000", "507aaaeac", "3a9000101"]},{"n": "Lunettes", "a": "des lunettes", "g": ["6ac0006ac", "507aaad05", "3a90003a9"]},{"n": "Tasse", "a": "une tasse fumante", "g": ["040404000", "010101000", "000000000", "6aaaaac00", "5000007ac", "500000505", "5000007a9", "500000500", "3aaaaa900"]},{"n": "Avion", "a": "un avion", "g": ["000040000", "0006bc000", "2aad07aa8", "000505000", "000505000", "002d07800", "0003a9000"]},{"n": "Voiture", "a": "une voiture", "g": ["006aeac00", "06d0507c0", "6bbababbc", "500000005", "3aaaaaaa9", "06c0006c0", "039000390"]},{"n": "Robot", "a": "un robot", "g": ["0004000", "06abac0", "0500050", "03aea90", "0005000", "6eabaec", "3d00079", "0500050", "03aaa90"]},{"n": "Cactus", "a": "un cactus", "g": ["0004000", "4005004", "5005005", "3aafaa9", "0005000", "0005000", "2aabaa8"]},{"n": "Pomme", "a": "une pomme", "g": ["0006800", "0005000", "06abac0", "690003c", "5000005", "5000005", "3c00069", "03aaa90"]},{"n": "Nuage", "a": "un nuage de pluie", "g": ["006ac0000", "06903aac0", "69000003c", "500000005", "3aaaaaaa9", "040404040", "010101010"]},{"n": "Couronne de roi", "a": "une couronne de roi", "g": ["400040004", "5006bc005", "7aa903aad", "500000005", "3aaaaaaa9"]},{"n": "Ampoule", "a": "une ampoule", "g": ["006ac00", "06903c0", "690003c", "5000005", "3c00069", "03c0690", "0050500", "007ed00", "003b900"]},{"n": "Papillon", "a": "un papillon", "g": ["6ac0406ac", "507afad05", "3a90503a9", "000050000", "06aefeac0", "0507bd050", "03a903a90"]},{"n": "Montgolfière", "a": "une montgolfière", "g": ["006aaac00", "0690003c0", "69000003c", "500000005", "3c0000069", "03c000690", "003c06900", "000505000", "0003a9000"]},{"n": "Note de musique", "a": "une note de musique", "g": ["006aaac", "0050005", "0050005", "06d006d", "0390039"]},{"n": "Cloche"')
rep("cherche:12,tournade:24,sudoku:28},","cherche:12,tournade:38,sudoku:40},")

# ---- Tournade : 2 niveaux de plus (39 et 40) ----
rep('"]},{"n": "Cloche"','"]},{"n": "Chapeau", "a": "un chapeau haut-de-forme", "g": ["06aaac0", "0500050", "0500050", "07eeed0", "2bbbbb8"]},{"n": "Tente", "a": "une tente de camping", "g": ["000040000", "0006bc000", "006903c00", "0690403c0", "6d005007c", "3baabaab9"]},{"n": "Cloche"')
rep("cherche:12,tournade:38,sudoku:40},","cherche:12,tournade:40,sudoku:40},")

# ---- Phrases mystères : 20 niveaux de plus (21 à 40) ----
rep("comme un flocon sur l’eau tranquille.',","comme un flocon sur l’eau tranquille.','Au petit matin, la brume se lève sur le lac, les oiseaux chantent tout bas et la journée commence sans aucune hâte.','Dans le jardin endormi, les graines patientent sous la terre froide et rêvent des couleurs que le printemps leur rendra bientôt.','Le vent caresse les dunes, la mer revient doucement sur le sable, et chaque vague emporte un petit souci vers le large.','Sous la pluie fine, la ville ralentit, les fenêtres brillent une à une, et le parfum du pain chaud flotte dans les rues mouillées.','Un vieux phare veille sur la baie, sa lumière tourne lentement, et les bateaux rentrent au port bercés par le murmure des flots.','Dans la bibliothèque silencieuse, les pages tournent lentement, la lampe dessine un cercle doré, et le temps semble enfin suspendu.','Les montagnes gardent leurs neiges éternelles, les torrents descendent en chantant, et le refuge accueille les marcheurs avec une soupe fumante.','Au bord de la rivière, les saules penchent leurs branches vers l’eau claire, et les libellules dansent dans la lumière de l’été.','Quand l’automne arrive, les feuilles rousses tourbillonnent dans les allées, et les écureuils cachent leurs trésors pour les longs mois froids.','Le train traverse les plaines enneigées, les passagers somnolent contre les vitres, et le paysage défile comme un rêve tranquille.','Dans la cuisine, la soupe mijote doucement, les tomates brillent sur la table, et toute la maison sent le thym et le romarin.','Les lucioles allument la prairie, les grillons accordent leurs violons, et la nuit d’été se remplit d’une musique minuscule et joyeuse.','Sur la colline, un vieux moulin tourne paisiblement, le blé ondule sous le vent, et les nuages passent comme des moutons blancs.','La marée basse découvre les rochers, les crabes se cachent dans les flaques, et les enfants ramassent des coquillages nacrés.','Au fond de la forêt, la mousse étouffe chaque pas, les champignons sortent après la pluie, et la lumière filtre entre les feuilles.','Le matin de neige, le monde semble neuf, les traces des renards dessinent des chemins secrets, et le ciel rose promet une journée douce.','Dans le grenier, une malle garde des lettres anciennes, des photos jaunies et des souvenirs qui sentent la lavande et le bois ciré.','Les étoiles filantes traversent la nuit d’août, chacun fait un vœu en silence, et la terre tiède garde encore la chaleur du jour.','Prends le temps de marcher lentement, de regarder le ciel changer de couleur, et de remercier la journée pour ses petits bonheurs.','Quand tout devient calme, écoute ton souffle aller et venir comme la mer, laisse tes pensées flotter, et accueille le sommeil comme un ami fidèle.',")
rep("[4,4,5,6,7,8,9,12,6,7,8,8,8,7,9,9,9,10,10,11,5,6,7,6,8,7,9,8,10,8][lv]","[4,4,5,6,7,8,9,12,6,7,8,8,8,7,9,9,9,10,10,11,8,9,9,10,10,10,11,11,11,12,12,12,12,13,13,13,14,14,14,15,5,6,7,6,8,7,9,8,10,8][lv]")
rep("const NLS={mots:60,memo:20,caches:60,phrase:20,","const NLS={mots:60,memo:20,caches:60,phrase:40,")
rep("const LSN={caches:20,","const LSN={phrase:20,caches:20,")

# ---- Mémoire : une paire trouvée ne bloque plus, la pause reste seulement en cas d’erreur ----
rep("if(op.length===2){lock=true;setTimeout(()=>{if(C[op[0]]===C[op[1]])ok.push(...op);op=[];lock=false;d();if(ok.length===C.length)win()},800)}","if(op.length===2){if(C[op[0]]===C[op[1]]){ok.push(...op);op=[];d();if(ok.length===C.length)setTimeout(win,600)}else{lock=true;setTimeout(()=>{op=[];lock=false;d()},800)}}")

# ---- Carnet du soir : 22 pensées de plus ----
rep("'Fermer les yeux, c’est ouvrir la porte aux rêves.'];","'Fermer les yeux, c’est ouvrir la porte aux rêves.','La lune ne se presse jamais, et pourtant elle fait le tour du ciel.','Une pensée à la fois, comme on allume une seule bougie dans le noir.','Les arbres ne s’inquiètent pas de l’hiver : ils savent que le printemps reviendra.','Ce qui n’a pas été fait aujourd’hui attendra sagement demain.','Laisse tes soucis sur le pas de la porte, comme des bottes pleines de neige.','La nuit n’éteint pas le monde, elle le berce.','Respirer lentement, c’est déjà se faire un cadeau.','Même le plus petit feu réchauffe une grande pièce.','Le calme n’est pas l’absence de bruit, c’est un endroit en toi.','Les étoiles brillent mieux quand on cesse de courir.','Chaque soir est une page blanche que le sommeil écrit pour toi.','Tu n’as pas besoin de tout comprendre ce soir. Repose-toi.','La neige efface les traces de la journée et prépare un chemin tout neuf.','Sois doux avec toi-même, comme avec un ami qui rentre du froid.','Le vent peut souffler dehors : ici, la lampe reste allumée.','Ce n’est pas grave d’avancer lentement, tant que tu avances avec douceur.','Une tasse chaude entre les mains, et le monde paraît plus léger.','Les rivières gelées continuent de couler, tout bas, sous la glace.','Demain sera un autre jour, et il saura t’attendre.','Le sommeil est une forêt tranquille où personne ne te presse.','Ferme les volets, éteins les écrans, et laisse la nuit faire le reste.','Il y a de la beauté dans les choses qui prennent leur temps.'];")

# ---- Cherche et trouve : 8 univers de plus (20) et 10 niveaux de Noël avec Zeni ----
rep("cherche:12,tournade:40,","cherche:20,tournade:40,")
rep("{id:'cherche',n:'Cherche et trouve',ic:'◉',a:'#ffd37a',b:'#c9742e',nox:1,","{id:'cherche',n:'Cherche et trouve',ic:'◉',a:'#ffd37a',b:'#c9742e',")

# ---- Mémoire : 10 niveaux de plus (21 à 30) ----
rep("const NLS={mots:60,memo:20,","const NLS={mots:60,memo:30,")
rep("const LSN={phrase:20,","const LSN={memo:20,cherche:12,phrase:20,")
rep("n=X?[3,4,4,5,6,6,7,8,9,10][xn('memo',lv)-1]:3+(lv>>1),","n=X?[3,4,4,5,6,6,7,8,9,10][xn('memo',lv)-1]:lv<20?3+(lv>>1):[13,13,14,14,15,15,16,16,17,18][lv-20],")
rep("const E=['🌲','🌙','⛄','🦊','🔔','🕯️','🧣','🦉','🍄','🦌','🧤','🐻']","const E=['🌲','🌙','⛄','🦊','🔔','🕯️','🧣','🦉','🍄','🦌','🧤','🐻','🐧','🦔','🍵','🏔️','🪵','🐿️']")
rep("<div class=\"cards\">${C.map(","<div class=\"cards${C.length>30?' c6':''}\">${C.map(")

# ---- Labyrinthe : 10 niveaux de plus (21 à 30), les labyrinthes de Noël restent identiques ----
rep("[11,18],[11,18],[8,9],","[11,18],[11,18],[11,19],[11,19],[11,20],[11,20],[11,21],[11,21],[11,22],[11,22],[11,23],[11,24],[8,9],")
rep("MZB=[0,0,0,2,3,4,5,6,3,3,4,4,5,5,5,6,6,6,7,7,","MZB=[0,0,0,2,3,4,5,6,3,3,4,4,5,5,5,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,")
rep("MZP=[1,1,1,1,1,1,1,1,.85,.8,.75,.7,.65,.62,.6,.58,.56,.54,.52,.5,","MZP=[1,1,1,1,1,1,1,1,.85,.8,.75,.7,.65,.62,.6,.58,.56,.54,.52,.5,.52,.5,.5,.5,.48,.48,.48,.46,.46,.45,")
rep("MZK=[126,182,20,433,42,5,1,252,45,97,121,1783,1803,1173,3887,846,4812,1411,4090,1430,","MZK=[126,182,20,433,42,5,1,252,45,97,121,1783,1803,1173,3887,846,4812,1411,4090,1430,662,184,1124,62,1282,737,2,346,2712,1540,")
rep("rg=rng(l*7919+101+MZK[l]*104729)","rg=rng((l>=30?l-10:l)*7919+101+MZK[l]*104729)")
rep("const NLS={mots:60,memo:30,caches:60,phrase:40,maze:20,","const NLS={mots:60,memo:30,caches:60,phrase:40,maze:30,")
rep("const LSN={memo:20,","const LSN={memo:20,maze:20,")

# ---- Labyrinthe : la page ne défile plus toute seule quand le renard descend ----

# ---- Noël : tout le contenu de Noël s'ouvre le 1er décembre (jusqu'au 11 janvier), ou tout de suite en mode illimité ----
rep("xmasOn=()=>{const t=Date.now();return location.hash==='#noel'||t<new Date(2027,0,12).getTime()}","xmasOn=()=>{const d=new Date(),m=d.getMonth();return UNL()||location.hash==='#noel'||m===11||(m===0&&d.getDate()<12)}")
rep(":''}<div class=\"dd pt-${id}",":(!g.soon&&!g.nox?`<section class=\"rc xm xlk\" data-g=\"✦\"><div class=\"rc-ic\">🔒</div><div class=\"rc-t\"><small>Spécial Noël</small><b>${NLX} niveaux de fêtes</b><span>Disponible le 1er décembre</span></div></section>`:'')}<div class=\"dd pt-${id}")

# ---- Aquarium : le sable monte, les décorations ne sont plus cachées par la barre du bas ----
rep("c=dcl(m,(e.clientX-DR.gx-DR.r.left)/DR.r.width*100,(DR.r.bottom-e.clientY-DR.gy)/DR.r.height*100)","c=dcl(m,(e.clientX-DR.gx-DR.r.left)/DR.r.width*100,(DR.r.bottom-e.clientY-DR.gy-(parseFloat(getComputedStyle(DR.d).marginBottom)||0))/DR.r.height*100)")

# ---- Constellations : 20 niveaux de plus (21 à 40) avec de nouvelles formes ----
rep("maze:30,match3:20,","maze:30,match3:40,")
rep("const LSN={memo:20,","const LSN={match3:20,memo:20,")

# ---- Constellations : niveaux à résidus (dès le 25) et à algues (dès le 40), 60 niveaux ----
rep("maze:30,match3:40,","maze:30,match3:60,")

# ---- Déménagement 2 : onze pièces, cartons, zoom, validation correcte / acceptable ----
rep("const sv=keep;",R57('dem2a.js')+R57('dem2b.js')+R57('dem2c.js')+"const sv=keep;")
rep("demenage:pDemen,","demenage:pDemen2,")
rep("match3:60,demenage:10,","match3:60,demenage:11,")

# ---- Jeux : lien « Parties en cours » à droite du titre ----
rep("`<h2 class=\"s\">Choisis ta veillée</h2>`","`<h2 class=\"s shr\"><span>Choisis ta veillée</span>${window.mpLink?mpLink():''}</h2>`")
rep("<h2 class=\"s\">Favoris</h2>","<h2 class=\"s shr\"><span>Favoris</span>${window.mpLink?mpLink():''}</h2>")

rep("all.push(f.id);if(now-o.t<HR)return;o.t=now;","all.push(f.id);if(now-o.t<HR&&!UNL())return;o.t=now;")
rep("const b=$('#aqb');b.disabled=!lt&&!hg.length;b.textContent=lt?'Entretien':hg.length?","const b=$('#aqb'),uf=UNL()&&on.length&&!hg.length;b.disabled=!lt&&!hg.length&&!uf;b.classList.toggle('uf',!!uf);b.textContent=lt?'Entretien':uf?'Nourrir':hg.length?")

rep("on=aqOn(a).length<MAXF&&!nh?1:0;a.f[id]={t:Date.now(),on,n:name};","on=aqOn(a).length<MAXF&&!nh?1:0;a.f[id]={t:Date.now()-HR,on,n:name};")

rep("lab:!(hg||ids).includes(id),k,","lab:!(hg||ids).includes(id),fed:(hg||ids).includes(id),k,")
rep("     f.eaten++;f.mode='eat';f.et=0;","     f.eaten++;f.mode='eat';f.et=0;if(f.fed&&el.dataset.id==='meduse'&&window.aqMedGl)aqMedGl(f.eaten);")

rep("const mx=cx+f.dir*f.fw*.4,dx","const mx=cx+(el.dataset.id==='meduse'?-.42:.4)*f.dir*f.fw,dx")
rep("     p.state=2;p.n--;f.tg=null;p.e.classList.add('x');","     p.state=2;p.n--;f.tg=null;p.e.classList.add('x');if(el.dataset.id==='meduse'&&window.aqMedEat){p.e.style.opacity=0;aqMedEat(el)}")

rep("const mx=cx+(el.dataset.id==='meduse'?-.42:.4)*f.dir*f.fw,dx=p.xs-mx,dy=Math.max(p.y,th*.2)-cy,d=Math.hypot(dx,dy),de=Math.hypot(dx,p.y-cy);","const MO=window.aqMouth&&aqMouth(el,t),mx=MO?MO.x:cx+.4*f.dir*f.fw,my=MO?MO.y:cy,dx=p.xs-mx,dy=Math.max(p.y,th*.2)-my,d=Math.hypot(dx,dy),de=Math.hypot(dx,p.y-my);")
rep("    if(de<=Math.max(8,v*dt)){","    if(de<=Math.max(5,v*dt)){")

rep('<header class="top aqhd"><h1>Aquarium</h1>','<header class="top aqhd"><h1 class="aqh1" data-a="aqlvt" role="button" tabindex="0" aria-expanded="false" aria-label="Aquarium : voir le niveau des poissons et des décors">Aquarium<span class="aqhi" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5h6M3 11h10"/><path d="m11 4 2 2 2-2" stroke-width="1.6"/></svg></span></h1>')

rep("msg('✦ +'+gain+' ❄');setTimeout(()=>{const m=$('#m');if(m&&m.textContent==='✦ +'+gain+' ❄')m.textContent=''},4000);return true;","if(window.aqGainShow)aqGainShow(gain);else msg('✦ +'+gain+' ❄');return true;")
rep("aqLab=(t,f,k)=>{const tb=","aqLab=(t,f,k)=>{if(window.aqGainShow)return;const tb=")

rep("{id:'hockey',n:'Poisson hockeyeur',p:767,sh:'std',b:'#7ed3ff',f:'#e9f7ff',hk:1,sz:1.12}","{id:'hockey',n:'Poisson hockeyeur',p:767,sh:'std',b:'#7ed3ff',f:'#e9f7ff',hk:1,sz:1.12},\n{id:'gardien',n:'Poisson gardien de but',p:470,sh:'std',b:'#ffcf5c',f:'#fff4d6',gk:1,sz:1.16}")
rep("if(f.hk)[[-12,6,'#d63a52'],[-7,3.2,'#fff'],[-2,6,'#d63a52']]","if(f.hk||f.gk)[[-12,6,f.gk?'#1d2b5a':'#d63a52'],[-7,3.2,'#fff'],[-2,6,f.gk?'#1d2b5a':'#d63a52']]")
rep(" if(f.hk)s+=`<path d=\"M52 30L70 49\""," if(f.gk)s+=`<circle cx=\"36\" cy=\"38\" r=\"6.5\" fill=\"#c8913b\" stroke=\"#7a5420\" stroke-width=\"1.2\"/><path d=\"M31 36Q36 31 41 36\" stroke=\"#7a5420\" stroke-width=\"1\" fill=\"none\"/><path class=\"gstk\" d=\"M55 30L64 46\" stroke=\"#c98a4b\" stroke-width=\"3\" stroke-linecap=\"round\"/><path class=\"gstk\" d=\"M62 42L66 49\" stroke=\"#2a2a3a\" stroke-width=\"5\" stroke-linecap=\"round\"/><path class=\"gstk\" d=\"M65 50L80 51\" stroke=\"#2a2a3a\" stroke-width=\"4.5\" stroke-linecap=\"round\"/><path d=\"M45 15Q57 1 71 16L71 26Q69 31 63 31L61 18Q53 14 45 18Z\" fill=\"#f4f6fa\" stroke=\"#9aa3b5\" stroke-width=\"1\"/><path d=\"M62 18V30M65.5 17.5V30.5M69 18V28.5M61.5 22H71M61.5 26H70.5\" stroke=\"#6f7890\" stroke-width=\"1.1\" fill=\"none\"/>`;\n if(f.hk)s+=`<path d=\"M52 30L70 49\"")

rep("  f.px=Math.max(0,Math.min(tw-f.fw,f.px));f.py=Math.max(0,Math.min(th*.8-f.fh,f.py));","  if(f.mode!=='hk'){f.px=Math.max(0,Math.min(tw-f.fw,f.px));f.py=Math.max(0,Math.min(th*.8-f.fh,f.py))}")

rep("sp:'Niveaux et mode infini'}];","sp:'Niveaux et mode infini'},\n{id:'airhockey',n:'Air hockey',ic:'🏒',a:'#4aa3d8',b:'#1d4f7a',t:'La table glisse',s:'Contre l’IA en 20 niveaux, à deux sur le même écran ou en ligne avec un ami.',sp:'IA, à deux ou en ligne'}];")
rep("v==='solitaire'?soHub():","v==='solitaire'?soHub():v==='airhockey'?ahHub():")
rep("function chHub(){",R57('airhockey.js')+"\nfunction chHub(){")
rep("  if(x.av&&typeof x.av==='object'){const t=+x.av.t||0","  if(x.ah&&typeof x.ah==='object'&&typeof x.ah.g==='string'&&/^[a-z0-9]{0,20}$/.test(x.ah.g)&&(x.ah.w===''||SOK.test(x.ah.w))&&(+x.ah.t||0)>((o.ah&&o.ah.t)||0))o.ah={g:x.ah.g,w:x.ah.w,t:+x.ah.t||0};\n  if(x.av&&typeof x.av==='object'){const t=+x.av.t||0")
rep("o.un?[o.un.g,o.un.t]:0,","o.un?[o.un.g,o.un.t]:0,o.ah?[o.ah.g,o.ah.w,o.ah.t]:0,")

rep("sp:'Seul ou entre amis'}","sp:''}")
rep("sp:'Niveaux et mode infini'}","sp:''}")
rep("sp:'IA, à deux ou en ligne'}","sp:''}")
rep("if(!SO.uid)return'Seul ou entre amis'","if(!SO.uid)return''")
rep(":'Seul ou entre amis'};",":''};")

rep("g.id==='scrabble'||g.id==='chess'||g.id==='uno'?'<svg class=\"mp\"","g.id==='scrabble'||g.id==='chess'||g.id==='uno'||g.id==='airhockey'?'<svg class=\"mp\"")
rep(" const F=GD.filter(g=>!g.soon&&fv.includes(g.id)),R=GD.filter(g=>!F.includes(g));"," const GO=gOrd(GD.filter(g=>!gHid(g.id))),F=GO.filter(g=>!g.soon&&fv.includes(g.id)),R=GO.filter(g=>!F.includes(g));")
rep("${R.length?`<div class=\"grid\">${R.map(tile).join('')}</div>`:''}`;\n}","${R.length?`<div class=\"grid\">${R.map(tile).join('')}</div>`:''}<button class=\"gordb\" data-a=\"gOrd\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4\"/></svg>Modifier l’ordre des jeux</button>`;gLockTiles();gUnlockCheck();\n}\n"+open('v57/gord.js').read())

rep("g=l?ALL.find(x=>x.id===l.g):null;if(!g)return'';","g=l?ALL.find(x=>x.id===l.g):null;if(!g||gHid(g.id))return'';")
rep("open:v=>{lvOpen=false;","open:v=>{if(typeof gHid==='function'&&gHid(v))return home();lvOpen=false;")

rep("open:v=>{if(typeof gHid==='function'&&gHid(v))return home();","open:v=>{if(typeof gHid==='function'&&gHid(v))return home();if(typeof gLock==='function'&&gLock(v)){if(cur!==null)home();return act.gLk(v)}")
rep(" const xon=xmasOn()&&!g.soon&&!g.nox,"," const xon=xLvOn()&&!g.soon&&!g.nox,")
rep("<b>${NLX} niveaux de fêtes</b><span>Disponible le 1er décembre</span>","<b>${NLX} niveaux de fêtes</b><span>${xmasOn()?'Étape 10 de l’histoire':'Disponible le 1er décembre'}</span>")

rep("sp:''},\n{id:'airhockey'","sp:''},\n{id:'colorie',n:'Coloriage',ic:'🎨',a:'#e88ab0',b:'#7a3f8a',t:'Couleurs du soir',s:'Colorie les dessins case par case, en suivant les numéros.',sp:''},\n{id:'airhockey'")
rep("v==='airhockey'?ahHub():","v==='airhockey'?ahHub():v==='colorie'?cbHub():")
rep("function chHub(){",R57('colorie.js')+R57('coldes.js')+"\nfunction chHub(){")

rep("<button class=\"hb\" data-a=\"hint\">Indice · ${hint} ❄</button>","<button class=\"hb hintb\" data-a=\"hint\" aria-label=\"Indice : coûte ${hint} flocon${hint>1?'s':''}\">${HBI(hint)}</button>")

rep("match3:60,demenage:11,","match3:70,demenage:11,")

import os
open(os.environ.get('OUT','/mnt/user-data/outputs/nuit-de-neige-2.html'),'w',encoding='utf-8').write(h)
print(len(h))
