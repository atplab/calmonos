
/* ---------- Pêche : un lac de nuit, Zeni sur le ponton, une ligne et beaucoup de calme ----------
   Pas de niveaux : on lance, on attend la touche, on ferre, on remonte doucement (sans jamais casser la ligne).
   Les prises vont dans le panier ; on les vend contre des flocons. Les deux légendaires peuvent rejoindre l’aquarium. */
const PER=[ /* rareté : nom, couleur, valeur en flocons, chance sur 10 000 */
 {k:'c',n:'Commun',c:'#c9d2e0',v:1},{k:'u',n:'Peu commun',c:'#7fe0a0',v:2},{k:'r',n:'Rare',c:'#7ab8ff',v:4},{k:'e',n:'Épique',c:'#c79aff',v:7},{k:'l',n:'Légendaire',c:'#ffd36b',v:50}];
const PEF=[
 {id:'gardon',r:'c',n:'Gardon',sh:'std',b:'#b8c4cc',f:'#e8a0a0',sz:.9},
 {id:'perche',r:'c',n:'Perche',sh:'std',b:'#c9c25a',f:'#ff9a5a',st:'v',sc:'#4a5a2a',sz:.95},
 {id:'ablette',r:'c',n:'Ablette',sh:'long',b:'#dfe8f2',f:'#b8c8dc',sz:.85},
 {id:'goujon',r:'c',n:'Goujon',sh:'long',b:'#a89a7a',f:'#c9b898',sp:'#6a5a3a',sz:.8},
 {id:'rotengle',r:'c',n:'Rotengle',sh:'std',b:'#c8ccc0',f:'#ff5a4a',sz:.9},
 {id:'breme',r:'c',n:'Brème',sh:'round',b:'#d8dce4',f:'#a8b0c0',sz:.95},
 {id:'vandoise',r:'c',n:'Vandoise',sh:'long',b:'#b8d0ea',f:'#8aa8c8',sp:'#e8f2ff',sz:.85},
 {id:'chevesne',r:'c',n:'Chevesne',sh:'std',b:'#6a7484',f:'#e0804a',sz:1},
 {id:'carassin',r:'c',n:'Carassin',sh:'std',b:'#c9a85a',f:'#e0c07a',sz:.9},
 {id:'loche',r:'c',n:'Loche franche',sh:'long',b:'#a8946a',f:'#c8b48a',sp:'#5a4a2a',sz:.75},
 {id:'epinoche',r:'c',n:'Épinoche',sh:'std',b:'#8aa0a8',f:'#e8664a',sz:.7},
 {id:'hotu',r:'c',n:'Hotu',sh:'long',b:'#9aa8b4',f:'#d0a080',sz:.9},
 {id:'gremille',r:'c',n:'Grémille',sh:'std',b:'#a8a070',f:'#c8c090',sp:'#4a4a2a',sz:.8},
 {id:'spirlin',r:'c',n:'Spirlin',sh:'long',b:'#c8d4e4',f:'#9aaccc',st:'v',sc:'#5a6a8a',sz:.75},
 {id:'truite',r:'u',n:'Truite arc-en-ciel',sh:'long',b:'#9ab8a0',f:'#c9dcc0',sp:'#ff8aa0',sz:1},
 {id:'carpe',r:'u',n:'Carpe',sh:'round',b:'#c99a4a',f:'#e8c07a',sz:1.05},
 {id:'tanche',r:'u',n:'Tanche',sh:'std',b:'#5a7a3a',f:'#8aa85a',sz:1},
 {id:'fario',r:'u',n:'Truite fario',sh:'long',b:'#b8945a',f:'#d8b880',sp:'#e84a3a',sz:1},
 {id:'miroir',r:'u',n:'Carpe miroir',sh:'round',b:'#d8a83a',f:'#f2d27a',sp:'#fff2c0',sz:1.05},
 {id:'sandre',r:'u',n:'Sandre',sh:'long',b:'#8a9a8a',f:'#c0ccc0',st:'v',sc:'#4a5a4a',sz:1.05},
 {id:'blackbass',r:'u',n:'Black-bass',sh:'std',b:'#5a8a4a',f:'#a8c890',st:'v',sc:'#2a4a2a',sz:1},
 {id:'ombre',r:'u',n:'Ombre commun',sh:'std',b:'#8a94a8',f:'#b88ad0',sp:'#3a3a4a',sz:1},
 {id:'barbeau',r:'u',n:'Barbeau',sh:'long',b:'#b8a070',f:'#e09a5a',sz:1},
 {id:'truitelac',r:'u',n:'Truite de lac',sh:'long',b:'#8aa0b8',f:'#b8c8d8',sp:'#2a3a4a',sz:1.05},
 {id:'lotte',r:'u',n:'Lotte',sh:'long',b:'#7a6a4a',f:'#a89a7a',sp:'#4a3a2a',sz:1.05},
 {id:'aspe',r:'u',n:'Aspe',sh:'long',b:'#b8c4d4',f:'#8a9ab4',sz:1},
 {id:'brochet',r:'r',n:'Brochet',sh:'long',b:'#6a8a4a',f:'#a8c07a',sp:'#e8f0a0',sz:1.15},
 {id:'saumon',r:'r',n:'Saumon',sh:'long',b:'#c8d0e0',f:'#ff9a7a',sp:'#ff8a6a',sz:1.15},
 {id:'omble',r:'r',n:'Omble chevalier',sh:'std',b:'#3a4a6a',f:'#ff8a5a',sp:'#ffd0a0',sz:1.05},
 {id:'huchon',r:'r',n:'Huchon',sh:'long',b:'#b88a6a',f:'#d8a888',sp:'#5a3a2a',sz:1.2},
 {id:'coregone',r:'r',n:'Corégone',sh:'std',b:'#d0dcea',f:'#a8b8d0',sz:1.05},
 {id:'marbree',r:'r',n:'Truite marbrée',sh:'long',b:'#8a9a6a',f:'#b8c890',sp:'#3a4a2a',sz:1.1},
 {id:'anguille',r:'r',n:'Anguille argentée',sh:'long',b:'#7a8aa0',f:'#a8b8cc',sz:1.15},
 {id:'esturgeon',r:'e',n:'Esturgeon',sh:'long',b:'#7a8aa8',f:'#b8c4dc',sc:'#4a5a78',sz:1.3},
 {id:'silure',r:'e',n:'Poisson-chat géant',sh:'std',b:'#5a4a3a',f:'#8a7a6a',sz:1.3},
 {id:'koidor',r:'e',n:'Koï dorée',sh:'std',b:'#ffcf4a',f:'#fff0b0',sp:'#ffffff',sz:1.15},
 {id:'koiciel',r:'l',aq:1,n:'Koï céleste',sh:'koiciel',b:'#f4f2ff',f:'#ff6a3a',f2:'#ffd27a',sz:1.3},
 {id:'raieaur',r:'l',aq:1,n:'Raie aurore',sh:'raieaur',b:'#2fd1c5',f:'#e9d6ff',sc:'#9a6ad8',sp:'#fff6d0',sz:1.35}
];
const peR=k=>PER.find(x=>x.k===k);
function peRoll(){const x=Math.random()*10000,k=x<2?'l':x<502?'e':x<2002?'r':x<5002?'u':'c',L=PEF.filter(f=>f.r===k);return k==='l'?L[x<1?0:1]:L[Math.floor(Math.random()*L.length)]}
function peBag(){const b=st.get('pe:bag',{});return b&&typeof b==='object'?b:{}}
function peBg(){
 const st0=[...Array(46)].map((_,i)=>`<circle cx="${(i*83+17)%400}" cy="${(i*47+11)%240}" r="${.7+i%3*.5}" fill="#fff" opacity="${.35+i%3*.2}"/>`).join('');
 return`<svg class="pebg" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
<linearGradient id="pes" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0f33"/><stop offset=".5" stop-color="#2b2a6e"/><stop offset="1" stop-color="#5a4a8e"/></linearGradient>
<linearGradient id="pew0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a7a"/><stop offset="1" stop-color="#0c1638"/></linearGradient>
<linearGradient id="pea" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7affd0" stop-opacity="0"/><stop offset=".4" stop-color="#7affd0" stop-opacity=".28"/><stop offset=".7" stop-color="#c9a3ff" stop-opacity=".22"/><stop offset="1" stop-color="#c9a3ff" stop-opacity="0"/></linearGradient>
<radialGradient id="pem"><stop offset="0" stop-color="#fff6d0" stop-opacity=".5"/><stop offset="1" stop-color="#fff6d0" stop-opacity="0"/></radialGradient></defs>
<rect width="400" height="700" fill="url(#pes)"/>${st0}
<path class="peau" d="M-20 120Q80 40 200 100T420 80V140Q300 170 200 150T-20 180Z" fill="url(#pea)"/>
<circle cx="300" cy="90" r="70" fill="url(#pem)"/><circle cx="300" cy="90" r="22" fill="#fff6d0"/>
<path d="M0 290L40 230L70 250L120 190L170 250L210 220L260 270L300 210L350 250L400 220V300H0Z" fill="#3a3a7a"/><path d="M120 190L106 210L118 206L126 214L134 204ZM300 210L288 228L300 224L310 230Z" fill="#e8ecff"/>
${[...Array(26)].map((_,i)=>{const x=i*16-4,h=26+(i*37)%24;return`<path d="M${x} 302L${x+7} ${302-h}L${x+14} 302Z" fill="#1c2250"/>`}).join('')}
<rect x="0" y="300" width="400" height="400" fill="url(#pew0)"/>
${[...Array(9)].map((_,i)=>`<path d="M${280+(i%3)*8-i*3} ${312+i*16}h${36-i*3}" stroke="#fff6d0" stroke-opacity="${.45-i*.04}" stroke-width="3" stroke-linecap="round"/>`).join('')}
${[...Array(14)].map((_,i)=>`<path class="perp" style="animation-delay:${-i*.7}s" d="M${(i*67)%380+10} ${330+(i*53)%330}q10 -4 20 0" stroke="#9ab8ff" stroke-opacity=".35" stroke-width="1.6" fill="none"/>`).join('')}
</svg>`}
const pePier=()=>`<svg class="pepi" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M0 560h150l14 10v130H0Z" fill="#6a4a30"/><path d="M0 560h150" stroke="#e8ecff" stroke-width="6" stroke-linecap="round"/>${[20,60,100,140].map(x=>`<rect x="${x-5}" y="566" width="10" height="134" fill="#4a3220"/>`).join('')}${[...Array(6)].map((_,i)=>`<path d="M0 ${578+i*20}h150" stroke="#4a3220" stroke-width="2"/>`).join('')}
<path d="M138 560v-46" stroke="#4a3220" stroke-width="4"/><circle cx="138" cy="508" r="7" fill="#ffcf7a"/><circle cx="138" cy="508" r="26" fill="#ffcf7a" opacity=".2"/></svg>`;
function pePlay(){
 if(typeof gLock==='function'&&gLock('peche'))return;
 cur='peche';daily=false;playing=false;snap=null;theme('peche');try{kzMu.style('pe')}catch(e){}
 const run=++KZRUN,ok=()=>run===KZRUN&&cur==='peche'&&!!document.getElementById('peg');
 app.innerHTML=`<div class="peg" id="peg"><div class="pet"><button class="back" data-a="back" data-v="home">‹ Jeux</button><b>Pêche</b><div class="petr"><button class="hb pebk" data-a="peBook" aria-label="Carnet de pêche"><span>📖</span></button><button class="hb pebk" data-a="peBag" aria-label="Ouvrir le panier"><span>🧺</span> <b id="pebn">0</b></button><div class="chip" id="pefl">❄ ${FLX()}</div></div></div>
<div class="pesc" id="pesc">${peBg()}<div class="pesh"><i style="top:62%;animation-duration:26s"></i><i style="top:74%;animation-duration:34s;animation-delay:-12s"></i><i style="top:84%;animation-duration:30s;animation-delay:-20s" class="r"></i></div>${pePier()}<svg class="peln" id="peln" aria-hidden="true"><path id="perd" d="" stroke="#8a5a30" stroke-width="3.2" stroke-linecap="round" fill="none"/><path id="pelp" d="" stroke="#e8ecff" stroke-opacity=".75" stroke-width="1.4" fill="none"/></svg>
<div class="pezn" id="pezn">${typeof qzGuy==='function'?qzGuy('ask'):''}</div>

<div class="pefl" id="pefo" hidden><svg viewBox="0 0 20 30" aria-hidden="true"><path d="M10 0v8" stroke="#fff" stroke-width="1.4"/><ellipse cx="10" cy="14" rx="6" ry="7" fill="#ff5a5a"/><path d="M4 14a6 7 0 0 0 12 0z" fill="#fff"/><ellipse cx="10" cy="21" rx="9" ry="2.2" fill="#9ab8ff" opacity=".5"/></svg><b class="pex" id="pex" hidden>!</b></div></div>
<div class="pehud"><p class="m pem" id="m" role="status" aria-live="polite">Touche le lac pour lancer ta ligne.</p><div class="pepr" id="pepr" hidden><i id="pepi"></i><b class="pete"><i id="pete"></i></b></div><button class="btn pebt" id="pebt" data-a="peAct">Lancer</button></div><div class="peov" id="peov" hidden></div></div>`;
 $('#nav').hidden=true;mt='m';
 const sc=$('#pesc'),fo=$('#pefo'),lp=$('#pelp'),bt=$('#pebt'),pr=$('#pepr'),pi=$('#pepi');
 let S={st:'idle',x:0,y:0,fish:null,p:0,hold:false,pull:0,pt:0,t0:0,bite:0},raf=0;
 const W=()=>sc.clientWidth,H=()=>sc.clientHeight,tip=()=>({x:W()*.33,y:H()*.62});
 const bagN=()=>{const b=peBag(),n=Object.values(b).reduce((a,v)=>a+(v|0),0),e=$('#pebn');if(e)e.textContent=n};bagN();
 const line=()=>{const t=tip(),rd=$('#perd');if(rd)rd.setAttribute('d',`M${W()*.2+10} ${H()*.8-30}L${t.x} ${t.y}`);if(fo.hidden){lp.setAttribute('d','');return}const sag=S.st==='reel'?(S.pull?2:14):30;lp.setAttribute('d',`M${t.x} ${t.y}Q${(t.x+S.x)/2} ${Math.max(t.y,S.y)+sag} ${S.x} ${S.y}`)};
 const put=(x,y)=>{fo.style.transform=`translate(${x-10}px,${y-21}px)`};
 const setBt=(t,a)=>{bt.textContent=t;bt.dataset.a=a};
 const idle=m=>{S.st='idle';fo.hidden=true;pr.hidden=true;$('#pex').hidden=true;setBt('Lancer','peAct');if(m)msg(m);line()};
 const cast=(tx,ty)=>{if(S.st!=='idle')return;const t=tip(),w=W(),h=H();tx=Math.max(w*.42,Math.min(w-20,tx));ty=Math.max(h*.5,Math.min(h*.86,ty));S.st='cast';fo.hidden=false;setBt('…','peAct');sfx(420,.12);
  const t0=performance.now(),go=n=>{if(!ok())return;const k=Math.min(1,(n-t0)/750);S.x=t.x+(tx-t.x)*k;S.y=t.y+(ty-t.y)*k-Math.sin(k*Math.PI)*h*.18;put(S.x,S.y);line();
   if(k<1)return requestAnimationFrame(go);S.st='wait';S.t0=performance.now();S.bite=S.t0+2500+Math.random()*5500;sfx(240,.15);msg('Patience… le flotteur se balance.');setBt('Ramener','peAct');loop()};requestAnimationFrame(go)};
 const loop=()=>{cancelAnimationFrame(raf);const step=n=>{if(!ok())return;const t=(n-S.t0)/1000;
   if(S.st==='wait'){const nib=Math.sin(t*9)*(Math.sin(t*1.3)>.92?3:0);put(S.x,S.y+Math.sin(t*2)*1.6+nib);if(n>=S.bite){S.st='bite';S.bt=n;$('#pex').hidden=false;sfx(700,.2);vib([20,40,20]);msg('Ça mord ! Ferre vite !');setBt('Ferrer !','peAct')}}
   else if(S.st==='bite'){put(S.x,S.y+6+Math.sin(t*30)*3);if(n-S.bt>3000){S.st='wait';$('#pex').hidden=true;S.bite=n+2500+Math.random()*5000;msg('Le poisson est reparti. Un autre viendra…');setBt('Ramener','peAct')}}
   else if(S.st==='reel'){const f=S.fish,rk='curel'.indexOf(f.r),dt=Math.min(.05,(n-(S.ln||n))/1000);S.ln=n;
    if(n>=S.pt){S.pull=S.pull?0:1;S.pt=n+(S.pull?700+rk*250:1600-rk*200+Math.random()*900);if(S.pull){msg('Il tire ! Relâche un peu…');sfx(300,.08)}else msg('Il se fatigue : remonte-le doucement.')}
    /* plus il est rare, plus il tire fort : tenir pendant qu’il tire tend la ligne ; trop tendue, il se décroche */
    const sp=.3-rk*.04;S.p+=S.hold?(S.pull?-.1-rk*.03:sp)*dt:(S.pull?-.03*(1+rk):0)*dt;S.p=Math.max(0,Math.min(1,S.p));pi.style.width=(S.p*100)+'%';pr.classList.toggle('pl',!!S.pull);
    S.te=Math.max(0,(S.te||0)+(S.hold&&S.pull?[.3,.55,.85,1.2,1.6][rk]:-.45)*dt);const tz=$('#pete');if(tz){tz.style.width=Math.min(100,S.te*100)+'%';tz.classList.toggle('hi',S.te>.6)}
    if(S.te>=1){cancelAnimationFrame(raf);sfx(180,.3);vib(60);const nm=f.r==='l'||f.r==='e'?'un poisson très puissant':f.r==='r'?'un beau poisson':'le poisson';idle('Oh ! '+nm[0].toUpperCase()+nm.slice(1)+' s’est décroché… Relâche quand il tire !');return}
    const t2=tip(),k=S.p;S.x=S.rx+(t2.x+30-S.rx)*k+(S.pull?Math.sin(n/60)*4:0);S.y=S.ry+(t2.y+20-S.ry)*k;put(S.x,S.y+Math.sin(n/90)*2);line();
    if(S.p>=1)return caught()}
   raf=requestAnimationFrame(step)};raf=requestAnimationFrame(step)};
 const hook=()=>{S.fish=peRoll();S.st='reel';S.p=.08;S.te=0;S.pull=0;S.pt=performance.now()+900;S.rx=S.x;S.ry=S.y;S.ln=0;$('#pex').hidden=true;pr.hidden=false;sfx(520,.15);
  msg(S.fish.r==='l'?'Quelle force… c’est un poisson extraordinaire !':S.fish.r==='e'?'Il est lourd ! Prends ton temps.':'Ferré ! Maintiens le bouton pour remonter.');setBt('Maintenir pour remonter','peHold');pr.classList.toggle('lg',S.fish.r==='l')};
 const caught=()=>{cancelAnimationFrame(raf);const f=S.fish,R=peR(f.r),b=peBag();b[f.id]=(b[f.id]|0)+1;st.set('pe:bag',b);const seen=st.get('pe:seen',[]);const nw=!seen.includes(f.id);if(nw){seen.push(f.id);st.set('pe:seen',seen)}bagN();
  sfx(f.r==='l'?990:784,.35);vib(f.r==='l'?[40,60,40,60,80]:[20,30,20]);idle('');
  const o=$('#peov');o.hidden=false;o.innerHTML=`<div class="pecard pr${f.r}"><small style="color:${R.c}">${R.n}${nw?' · nouveau !':''}</small><div class="pefi">${fishSVG(f)}</div><h2>${f.n}</h2><p>${R.v} ❄ à la vente${f.aq?' · peut rejoindre l’aquarium':''}</p><button class="btn" data-a="peOk">Dans le panier</button></div>`};
 const reelHold=v=>{if(S.st==='reel')S.hold=v};
 sc.addEventListener('pointerdown',e=>{if(S.st==='idle'){const r=sc.getBoundingClientRect();cast(e.clientX-r.left,e.clientY-r.top)}else if(S.st==='bite')hook();else if(S.st==='reel')reelHold(true)});
 bt.addEventListener('pointerdown',e=>{if(S.st==='reel'){e.preventDefault();reelHold(true)}});
 const up=()=>reelHold(false);addEventListener('pointerup',up);addEventListener('pointercancel',up);
 Object.assign(act,{
  peAct:()=>{if(!ok())return;if(S.st==='idle')cast(W()*(.55+Math.random()*.35),H()*(.58+Math.random()*.25));else if(S.st==='bite')hook();else if(S.st==='wait'){cancelAnimationFrame(raf);idle('Ligne ramenée.')}},
  peHold:()=>{},
  peOk:()=>{const o=$('#peov');if(o){o.hidden=true;o.innerHTML=''}msg('Touche le lac pour relancer.')},
  peBag:()=>peBagShow(),
  peBook:()=>{const o=$('#peov');if(!o)return;const seen=st.get('pe:seen',[]);
   o.hidden=false;o.innerHTML=`<div class="pebag"><div class="pebh"><h2>Carnet de pêche</h2><button class="sb" data-a="peBagX">Fermer</button></div><p class="kzsm">${seen.length} / ${PEF.length} espèces découvertes</p>${PER.map(R=>{const L=PEF.filter(f=>f.r===R.k);return`<h3 class="pebkh" style="color:${R.c}">${R.n} · ${R.v} ❄</h3><div class="pebkg">${L.map(f=>{const ok=seen.includes(f.id);return`<div class="pebki${ok?'':' no'}"><span>${fishSVG(f)}</span><small>${ok?f.n:'???'}</small></div>`}).join('')}</div>`}).join('')}</div>`},
  peSell:v=>{const b=peBag(),f=PEF.find(x=>x.id===v);if(!f||!(b[v]>0))return;const n=v==='*'?0:b[v],g=n*peR(f.r).v;delete b[v];st.set('pe:bag',b);fl+=g;st.set('fl',fl);sfx(880,.2);msg('+'+g+' ❄');peBagShow();bagN();peFl()},
  peSellAll:()=>{const b=peBag();let g=0;for(const id in b){const f=PEF.find(x=>x.id===id);if(!f||f.r==='l')continue;g+=(b[id]|0)*peR(f.r).v;delete b[id]}if(!g)return msg('Rien à vendre pour l’instant.');st.set('pe:bag',b);fl+=g;st.set('fl',fl);sfx(880,.25);msg('Tu as vendu ta pêche : +'+g+' ❄');peBagShow();bagN();peFl()},
  peAq:v=>{const b=peBag(),f=PEF.find(x=>x.id===v&&x.aq);if(!f||!(b[v]>0))return;const a=aqRead();if(a.f[v])return msg('Ce poisson nage déjà dans ton aquarium.');
   const on=(typeof aqOn==='function'&&typeof MAXF!=='undefined')?aqOn(a).length<MAXF:true;a.f[v]={t:Date.now(),on:on?1:0,n:f.n};st.set('aq',a);b[v]--;if(!b[v])delete b[v];st.set('pe:bag',b);sfx(990,.3);msg(f.n+' nage maintenant dans ton aquarium'+(on?' !':' (en réserve).'));peBagShow();bagN()},
  peBagX:()=>{const o=$('#peov');if(o){o.hidden=true;o.innerHTML=''}}
 });
 const peFl=()=>{const c=$('#pefl');if(c)c.textContent='❄ '+FLX()};
 function peBagShow(){const o=$('#peov');if(!o)return;const b=peBag(),seen=st.get('pe:seen',[]),A=aqRead();
  const rows=PEF.filter(f=>b[f.id]>0).map(f=>{const R=peR(f.r),n=b[f.id];return`<div class="pebr"><span class="pebf">${fishSVG(f)}</span><span class="pebt2"><b>${f.n} × ${n}</b><small style="color:${R.c}">${R.n} · ${R.v} ❄ pièce</small></span><span class="pebb"><button class="sb" data-a="peSell" data-v="${f.id}">Vendre · ${n*R.v} ❄</button>${f.aq?`<button class="sb buy" data-a="peAq" data-v="${f.id}"${A.f[f.id]?' disabled':''}>${A.f[f.id]?'Déjà à l’aquarium':'Aquarium'}</button>`:''}</span></div>`}).join('');
  const tot=PEF.filter(f=>f.r!=='l').reduce((a,f)=>a+(b[f.id]|0)*peR(f.r).v,0);
  o.hidden=false;o.innerHTML=`<div class="pebag"><div class="pebh"><h2>Ton panier</h2><button class="sb" data-a="peBagX">Fermer</button></div><p class="kzsm">Carnet de pêche : ${seen.length} / ${PEF.length} espèces découvertes</p>${rows||'<p class="kzsm">Ton panier est vide. Lance ta ligne !</p>'}${tot?`<button class="btn" data-a="peSellAll">Tout vendre · ${tot} ❄</button><p class="kzsm">Les poissons légendaires ne sont pas vendus avec le reste.</p>`:''}</div>`}
 idle();
}
