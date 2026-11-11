/* ---------- Coloriage (color by number) ----------
   Chaque dessin est décrit par des formes simples (rectangles, cercles, ellipses, polygones) en coordonnées 0..1,
   puis rastérisé en grille (12 à 20 cases de côté selon le niveau). Chaque case porte le numéro de sa couleur. */
const CBP=[
 {n:'Cœur',p:['#d8ecff','#e8485a','#b8303f','#ff9aa8','#ffffff','#b9dcff'],s:[['r',6,0,.78,1,.22],['c',2,.33,.38,.2],['c',2,.67,.38,.2],['p',2,[.13,.44,.87,.44,.5,.86]],['p',3,[.5,.86,.87,.44,.84,.56,.62,.8]],['c',4,.29,.32,.07],['c',5,.86,.12,.04],['c',5,.12,.18,.035]]},
 {n:'Étoile',p:['#24245a','#ffd54a','#f0a020','#ffffff','#3a3a80','#fff2a8'],s:[['r',5,0,.8,1,.2],['p',2,[.5,.08,.61,.38,.93,.38,.67,.57,.77,.88,.5,.69,.23,.88,.33,.57,.07,.38,.39,.38]],['p',3,[.5,.69,.77,.88,.67,.57,.93,.38,.61,.38,.5,.5]],['c',6,.5,.48,.07],['c',4,.1,.12,.035],['c',4,.88,.16,.035],['c',4,.85,.7,.03]]},
 {n:'Lune',p:['#1f2a5c','#f6e7a8','#d8c27a','#ffffff','#8ea0d8','#b8c6f0'],s:[['c',2,.45,.42,.3],['c',1,.6,.34,.25],['c',3,.3,.5,.05],['c',3,.38,.62,.035],['e',5,.62,.8,.3,.1],['e',6,.42,.82,.2,.08],['c',4,.85,.15,.035],['c',4,.75,.45,.03],['c',4,.12,.12,.03]]},
 {n:'Champignon',p:['#cdeccf','#e0453f','#ffffff','#f3e3c3','#5aa860','#d8c49e'],s:[['r',5,0,.82,1,.18],['r',4,.38,.48,.24,.38],['r',6,.54,.48,.08,.38],['e',2,.5,.46,.38,.26],['c',3,.36,.36,.07],['c',3,.62,.3,.06],['c',3,.66,.46,.05],['c',3,.42,.22,.045]]},
 {n:'Sapin',p:['#cfe6ff','#2f8f4e','#1f6b3a','#8a5a3a','#ffd54a','#ffffff'],s:[['r',6,0,.84,1,.16],['r',4,.44,.72,.12,.14],['p',2,[.5,.14,.82,.48,.18,.48]],['p',2,[.5,.3,.88,.74,.12,.74]],['p',3,[.5,.3,.88,.74,.62,.74]],['p',3,[.5,.14,.82,.48,.62,.48]],['p',5,[.5,.04,.54,.12,.62,.12,.56,.17,.58,.25,.5,.2,.42,.25,.44,.17,.38,.12,.46,.12]],['c',6,.12,.2,.03],['c',6,.86,.3,.03]]},
 {n:'Bonhomme de neige',p:['#9fc8f0','#ffffff','#d6e6f5','#2b2a3d','#f08a30','#e0453f'],s:[['r',2,0,.86,1,.14],['c',2,.5,.7,.22],['c',3,.58,.74,.14],['c',2,.5,.38,.15],['r',4,.36,.1,.28,.06],['r',4,.41,0,.18,.12],['p',5,[.5,.38,.66,.41,.5,.42]],['c',4,.45,.34,.022],['c',4,.56,.34,.022],['r',6,.34,.5,.32,.06],['r',6,.56,.5,.07,.16],['c',4,.5,.65,.025],['c',4,.5,.75,.025]]},
 {n:'Maison',p:['#bfe3ff','#f2c38a','#c0504a','#7a4a2a','#ffe680','#6cbf5a'],s:[['r',6,0,.82,1,.18],['r',2,.2,.46,.6,.38],['p',3,[.12,.48,.5,.16,.88,.48]],['r',4,.44,.62,.14,.22],['r',5,.26,.54,.13,.12],['r',5,.63,.54,.13,.12],['r',4,.66,.2,.08,.14],['c',2,.86,.14,.07]]},
 {n:'Poisson',p:['#7cc7f0','#ff9f40','#e06a20','#2b2a3d','#d8f2ff','#3fa060'],s:[['p',6,[.06,1,.12,.6,.16,1]],['p',6,[.84,1,.9,.66,.95,1]],['e',2,.46,.48,.28,.18],['p',3,[.7,.48,.94,.28,.94,.68]],['p',3,[.4,.31,.56,.2,.6,.34]],['c',5,.3,.45,.05],['c',4,.3,.45,.025],['c',5,.78,.14,.04],['c',5,.86,.06,.025],['p',3,[.42,.62,.52,.72,.56,.6]]]},
 {n:'Fleur',p:['#fff3d6','#ff8fb8','#ffcc33','#4caf50','#7cd47a','#c0704a'],s:[['p',6,[.3,.76,.7,.76,.64,1,.36,1]],['r',4,.47,.42,.06,.36],['e',5,.36,.6,.12,.05],['e',5,.64,.54,.12,.05],['c',2,.5,.18,.12],['c',2,.66,.3,.12],['c',2,.34,.3,.12],['c',2,.42,.46,.11],['c',2,.58,.46,.11],['c',3,.5,.32,.1]]},
 {n:'Soleil',p:['#9fd8ff','#ffd23a','#ffae2a','#ffffff','#7ccf6a','#5bb050'],s:[['e',5,.25,1,.5,.25],['e',6,.8,1,.45,.2],['p',3,[.5,.02,.56,.16,.44,.16]],['p',3,[.5,.66,.56,.52,.44,.52]],['p',3,[.16,.34,.3,.28,.3,.4]],['p',3,[.84,.34,.7,.28,.7,.4]],['p',3,[.26,.1,.36,.2,.28,.24]],['p',3,[.74,.1,.64,.2,.72,.24]],['p',3,[.26,.58,.36,.48,.28,.44]],['p',3,[.74,.58,.64,.48,.72,.44]],['c',2,.5,.34,.16],['e',4,.78,.62,.14,.06],['e',4,.2,.68,.12,.05]]},
 {n:'Chocolat chaud',p:['#f5e1c8','#e05a5a','#7a4a2a','#ffffff','#d8d8e8','#ffd6e0'],s:[['e',5,.48,.86,.38,.07],['p',2,[.2,.42,.76,.42,.7,.84,.26,.84]],['e',3,.48,.44,.28,.06],['c',6,.42,.42,.05],['c',6,.54,.43,.045],['p',2,[.76,.5,.9,.5,.9,.72,.74,.74,.75,.66,.84,.64,.84,.56,.76,.56]],['p',4,[.36,.34,.4,.12,.44,.34]],['p',4,[.5,.34,.54,.06,.58,.34]],['r',4,.3,.62,.36,.04]]},
 {n:'Mitaine',p:['#d8ecff','#3f7fd0','#ffffff','#ffd54a','#2f60a8','#a8d0ff'],s:[['c',6,.15,.15,.04],['c',6,.85,.3,.04],['c',6,.2,.8,.035],['e',2,.52,.42,.24,.3],['e',5,.27,.46,.09,.14],['r',2,.3,.42,.44,.32],['r',3,.26,.74,.52,.14],['r',4,.32,.5,.4,.05],['c',4,.4,.36,.035],['c',4,.6,.36,.035]]},
 {n:'Chat',p:['#ffe8cc','#f0a050','#c87a30','#3a8a50','#ff8fa0','#ffffff'],s:[['e',2,.5,.78,.28,.22],['c',2,.5,.42,.26],['p',2,[.26,.3,.28,.04,.44,.2]],['p',2,[.74,.3,.72,.04,.56,.2]],['p',5,[.3,.24,.3,.12,.38,.2]],['p',5,[.7,.24,.7,.12,.62,.2]],['r',3,.46,.17,.08,.08],['r',3,.3,.66,.06,.16],['r',3,.64,.66,.06,.16],['e',6,.5,.53,.12,.08],['c',4,.4,.4,.04],['c',4,.6,.4,.04],['p',5,[.46,.48,.54,.48,.5,.53]]]},
 {n:'Baleine',p:['#3f8fd0','#5a6fb8','#c8d4f0','#ffffff','#7cc0f0','#1f2a4a'],s:[['e',2,.44,.56,.34,.2],['p',2,[.74,.52,.96,.34,.92,.56,.96,.74]],['e',3,.4,.66,.26,.09],['c',6,.24,.52,.025],['p',4,[.36,.34,.3,.14,.36,.2,.4,.08,.42,.22,.48,.16,.44,.34]],['e',5,.2,.92,.2,.05],['e',5,.72,.94,.24,.05]]},
 {n:'Voilier',p:['#cfeaff','#3f8fd0','#a0522d','#ffffff','#ffd0a0','#ffd23a'],s:[['c',6,.82,.16,.09],['r',2,0,.76,1,.24],['p',3,[.18,.66,.82,.66,.72,.8,.28,.8]],['r',3,.49,.14,.03,.52],['p',4,[.52,.16,.52,.62,.8,.62]],['p',5,[.48,.24,.48,.62,.24,.62]],['e',4,.3,.88,.12,.02],['e',4,.74,.9,.14,.02]]},
 {n:'Hibou',p:['#2c3a6a','#a0703a','#e8c890','#ffffff','#ffb020','#5a3a20'],s:[['r',6,0,.84,1,.06],['e',2,.5,.54,.26,.32],['p',2,[.24,.3,.28,.12,.4,.26]],['p',2,[.76,.3,.72,.12,.6,.26]],['e',3,.5,.64,.16,.2],['c',4,.4,.4,.09],['c',4,.6,.4,.09],['c',6,.41,.4,.04],['c',6,.59,.4,.04],['p',5,[.46,.48,.54,.48,.5,.56]],['c',4,.84,.14,.025],['c',4,.14,.2,.025]]},
 {n:'Renard',p:['#dff0d8','#f07a2a','#ffffff','#3a2a2a','#7cbf5a','#ffd54a'],s:[['r',5,0,.84,1,.16],['c',6,.12,.84,.03],['c',6,.86,.88,.03],['e',2,.74,.66,.18,.1],['e',3,.88,.62,.06,.06],['e',2,.46,.66,.2,.16],['p',2,[.22,.42,.5,.42,.36,.62]],['p',2,[.22,.42,.24,.18,.32,.34]],['p',2,[.5,.42,.48,.18,.4,.34]],['p',3,[.27,.48,.36,.62,.45,.48,.36,.52]],['c',4,.36,.6,.025],['c',4,.3,.44,.02],['c',4,.42,.44,.02],['p',4,[.24,.22,.25,.3,.29,.28]],['p',4,[.48,.22,.47,.3,.43,.28]]]},
 {n:'Fusée',p:['#1f2350','#e8e8f0','#7cc7f0','#e0453f','#ffb020','#ffffff'],s:[['c',6,.15,.2,.025],['c',6,.85,.12,.025],['c',6,.8,.7,.02],['c',6,.18,.72,.02],['p',5,[.42,.76,.58,.76,.5,.98]],['p',4,[.36,.56,.3,.78,.4,.74]],['p',4,[.64,.56,.7,.78,.6,.74]],['e',2,.5,.48,.14,.32],['p',4,[.4,.26,.5,.06,.6,.26]],['c',3,.5,.42,.06],['r',4,.4,.72,.2,.05]]},
 {n:'Cadeau',p:['#e8f4ff','#e0453f','#ffd54a','#b8303f','#ffffff','#b9d8f0'],s:[['r',6,0,.84,1,.16],['r',2,.2,.44,.6,.42],['r',4,.62,.44,.18,.42],['r',2,.14,.34,.72,.12],['r',3,.45,.34,.1,.52],['e',3,.38,.28,.12,.07],['e',3,.62,.28,.12,.07],['c',3,.5,.3,.05],['p',5,[.66,.5,.78,.5,.78,.6,.66,.6]]]},
 {n:'Bougie',p:['#2a2550','#f5e6d0','#ffcc33','#ff8a2a','#4a3f80','#c08a3a'],s:[['c',5,.5,.26,.2],['e',6,.5,.88,.3,.06],['r',6,.3,.8,.4,.08],['r',2,.38,.36,.24,.46],['r',1,.49,.3,.02,.06],['e',3,.5,.2,.06,.11],['e',4,.5,.23,.03,.05],['p',2,[.38,.36,.44,.36,.44,.46]]]},
 {n:'Cloche',p:['#dbeefe','#ffcc33','#e0a020','#e0453f','#3a9a50','#8a5a2a'],s:[['p',2,[.32,.66,.36,.34,.5,.22,.64,.34,.68,.66,.78,.76,.22,.76]],['p',3,[.56,.26,.64,.34,.68,.66,.78,.76,.58,.76]],['c',6,.5,.82,.06],['e',5,.3,.18,.1,.05],['e',5,.7,.18,.1,.05],['c',4,.44,.16,.06],['c',4,.56,.16,.06],['c',4,.5,.2,.05]]},
 {n:'Pingouin',p:['#bfe3ff','#2b2a3d','#ffffff','#ffa030','#e8f6ff','#3fa0e0'],s:[['r',5,0,.84,1,.16],['e',2,.5,.54,.22,.32],['e',3,.5,.6,.14,.24],['c',2,.5,.28,.15],['c',3,.45,.27,.04],['c',3,.55,.27,.04],['c',2,.45,.27,.018],['c',2,.55,.27,.018],['p',4,[.46,.32,.54,.32,.5,.37]],['r',6,.34,.38,.32,.05],['e',4,.42,.86,.08,.03],['e',4,.58,.86,.08,.03]]},
 {n:'Montgolfière',p:['#bfe8ff','#ff6a6a','#ffd54a','#a0703a','#5a3a20','#ffffff'],s:[['e',6,.18,.3,.14,.06],['e',6,.82,.7,.14,.06],['c',2,.5,.34,.26],['p',2,[.3,.48,.7,.48,.56,.66,.44,.66]],['e',3,.5,.36,.09,.27],['r',5,.43,.66,.01,.1],['r',5,.56,.66,.01,.1],['r',4,.42,.74,.16,.12]]},
 {n:'Village de nuit',p:['#1f2560','#5a4a8a','#ffffff','#ffd54a','#f6e7a8','#e8f0ff'],s:[['c',5,.82,.18,.1],['c',1,.86,.15,.08],['r',6,0,.8,1,.2],['r',2,.08,.52,.26,.3],['p',3,[.04,.54,.21,.36,.38,.54]],['r',2,.42,.46,.24,.36],['p',3,[.38,.48,.54,.3,.7,.48]],['r',2,.72,.56,.22,.26],['p',3,[.68,.58,.83,.44,.98,.58]],['r',4,.14,.6,.06,.07],['r',4,.24,.6,.06,.07],['r',4,.5,.56,.08,.08],['r',4,.78,.64,.06,.06],['c',3,.2,.14,.015],['c',3,.5,.1,.015],['c',3,.62,.24,.015]]}
];
const cbLight=h=>{const n=parseInt(h.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;return .299*r+.587*g+.114*b>200},CBN=CBP.length,cbSize=l=>l<4?12:l<8?14:l<12?16:l<18?18:20;
function cbInPoly(x,y,P){let c=false;for(let i=0,j=P.length-2;i<P.length;j=i,i+=2){const xi=P[i],yi=P[i+1],xj=P[j],yj=P[j+1];if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))c=!c}return c}
function cbGrid(l){const D=CBP[l],n=cbSize(l),G=new Array(n*n).fill(1);
 for(let r=0;r<n;r++)for(let c=0;c<n;c++){const x=(c+.5)/n,y=(r+.5)/n;let v=1;
  for(const s of D.s){const t=s[0];let h=false;
   if(t==='r')h=x>=s[2]&&x<s[2]+s[4]&&y>=s[3]&&y<s[3]+s[5];
   else if(t==='c')h=(x-s[2])**2+(y-s[3])**2<=s[4]**2;
   else if(t==='e')h=((x-s[2])/s[4])**2+((y-s[3])/s[5])**2<=1;
   else if(t==='p')h=cbInPoly(x,y,s[2]);
   if(h)v=s[1]}
  G[r*n+c]=v}
 /* numéros compacts : seules les couleurs présentes, dans l’ordre de la palette */
 const used=[...new Set(G)].sort((a,b)=>a-b),map={};used.forEach((v,i)=>map[v]=i+1);
 return{n,g:G.map(v=>map[v]),pal:used.map(v=>D.p[v-1])}}
const CB={l:0,G:null,done:null,sel:1,cv:null,x:null,cs:0,drag:false,ok:false,fl:null};
function cbSave(){if(!CB.G)return;st.set('cb:sv:'+CB.l,CB.done.map(b=>b?1:0).join(''))}
function cbLoad(l){const s=st.get('cb:sv:'+l,'');return typeof s==='string'&&s.length===CB.G.g.length?[...s].map(c=>c==='1'):new Array(CB.G.g.length).fill(false)}
function cbThumb(l){const G=cbGrid(l),c=document.createElement('canvas'),k=Math.max(2,Math.round(48/G.n));c.width=c.height=G.n*k;const x=c.getContext('2d');G.g.forEach((v,i)=>{x.fillStyle=G.pal[v-1];x.fillRect((i%G.n)*k,Math.floor(i/G.n)*k,k,k)});return c.toDataURL()}
/* pixel art caché le temps de le retravailler */
const CBHIDE=true;
function cbHub(){
 cbActs();cur='colorie';nv('games');theme('colorie');
 const d=st.get('cb:d',[]),nx=[...Array(CBN).keys()].find(i=>!d.includes(i)),tg=nx===undefined?CBN-1:nx,g=ALL.find(x=>x.id==='colorie')||{ic:'🎨',t:'Coloriage'},AR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',chev='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
 const dd=st.get('cd:d',[]),nd=[...Array(CDN).keys()].find(i=>!dd.includes(i)),td=nd===undefined?CDN-1:nd,K=l=>Math.min(50,10+Math.round(l*40/(CDN-1)));
 app.innerHTML=`<div class="top stk">${bk('home')}<div class="chip">❄ ${FLX()}</div></div><section class="glass story pt-colorie"><i>${g.ic}</i><h2>${g.t}</h2><p>${CBHIDE?'De grands dessins à numéros : glisse pour te déplacer, pince pour zoomer, touche une zone pour la colorier.':'Deux façons de colorier : de grands dessins à numéros (glisse pour te déplacer, pince pour zoomer, touche une zone pour la colorier), ou des petits dessins en pixel art.'}</p></section>
 <div class="opts"><section class="rc pt-colorie" data-g="🖌️"><div class="rc-ic">🖌️</div><div class="rc-t"><small>Dessins · ${dd.length?'Continuer':'Commencer'}</small><b>Dessin ${td+1}</b><span>${K(td)} couleurs · ${dd.length} sur ${CDN} terminés</span></div><button class="rc-go" data-a="cdLv" data-v="${td}">Jouer${AR}</button></section>
 <button class="albc" data-a="cdAlb" aria-label="Album photo : ${dd.length} sur ${CDN} dessins terminés"><span class="albs">${(dd.length?dd.slice(-3):[null,null,null]).map((l,i,A)=>`<span class="alph${l===null?' e':''}" style="--r:${(i-(A.length-1)/2)*9}deg;--x:${(i-(A.length-1)/2)*16}px">${l===null?'':`<img alt="" src="${cdPic(l,96)}">`}</span>`).join('')}</span><span class="albt"><small>Album photo</small><b>Mes dessins</b><i class="albp"><u style="width:${Math.round(dd.length*100/CDN)}%"></u></i><em>${dd.length} sur ${CDN} terminés</em></span><span class="albg" aria-hidden="true">›</span></button>
 <section class="rc pt-colorie" data-g="🎨"${CBHIDE?' style="display:none"':''}><div class="rc-ic">🎨</div><div class="rc-t"><small>Pixel art · ${d.length?'Continuer':'Commencer'}</small><b>${nx===undefined?'Rejouer : '+CBP[tg].n:CBP[tg].n}</b><span>${d.length} sur ${CBN} pixel arts terminés</span></div><button class="rc-go" data-a="cbLv" data-v="${tg}">Jouer${AR}</button></section>
 <div class="dd pt-colorie${CD.ddOpen?' open':''}" id="cddd"><button class="dd-h" data-a="cdDd" aria-expanded="${!!CD.ddOpen}" aria-controls="cdl"><span><b>Choisir un dessin</b><small>${dd.length} / ${CDN} terminés</small></span>${chev}</button><div class="dd-l" id="cdl"><div class="dd-i"><div class="lvg cbg cdg">${[...Array(CDN).keys()].map(i=>{const o=dd.includes(i);return`<button class="lv ${o?'d cbt':i===nd?'nx':'far'}" data-a="cdLv" data-v="${i}" aria-label="Dessin ${i+1}, ${K(i)} couleurs${o?', terminé':''}">${o?`<img src="${cdThumb(i)}" alt="">`:`${i+1}<small>${K(i)}</small>`}</button>`}).join('')}</div></div></div></div>
 <div class="dd pt-colorie${lvOpen?' open':''}" id="cbdd"${CBHIDE?' style="display:none"':''}><button class="dd-h" data-a="cbDd" aria-expanded="${lvOpen}" aria-controls="lvl"><span><b>Choisir un pixel art</b><small>${d.length} / ${CBN} terminés</small></span>${chev}</button><div class="dd-l" id="lvl"><div class="dd-i"><div class="lvg cbg">${[...Array(CBN).keys()].map(i=>{const o=d.includes(i);return`<button class="lv ${o?'d cbt':i===nx?'nx':'far'}" data-a="cbLv" data-v="${i}" aria-label="${esc(CBP[i].n)}${o?', terminé':''}">${o?`<img src="${cbThumb(i)}" alt="">`:i+1}</button>`}).join('')}</div></div></div></div></div>`;
 window.scrollTo(0,0)}
function cbScreen(){
 cbActs();cur='colorie';nv('games');theme('colorie');{const n=$('#nav');if(n)n.hidden=true}
 const G=CB.G,D=CBP[CB.l];
 app.innerHTML=`<div class="cbs"><div class="top stk"><button class="back" data-a="cbBk">‹ Retour</button><button class="tl tlk" data-a="cSkip" data-v="cb" aria-label="Niveau ${CB.l+1} : toucher pour passer ce niveau"><span class="tlf">Niveau</span><span class="tls">Niv.</span>&nbsp;${CB.l+1}<i aria-hidden="true">⏭</i></button><div class="tr"><button class="hb hintb" data-a="cbHint" aria-label="Indice : coûte 1 flocon">${HBI(1)}</button><div class="chip">❄ ${FLX()}</div></div></div><div id="skw" class="skw"></div>
 <div class="cbpal" role="radiogroup" aria-label="Couleurs">${G.pal.map((c,i)=>`<button class="cbsw${cbLight(c)?' lt':''}" role="radio" data-a="cbSel" data-v="${i+1}" style="--c:${c}" aria-label="Couleur ${i+1}"><b>${i+1}</b><i></i></button>`).join('')}</div>
 <div class="cbw"><canvas id="cbc" aria-label="Dessin à colorier"></canvas></div>
 <p class="m" id="m" role="status" aria-live="polite"></p>
 </div>`;
 const cv=CB.cv=$('#cbc');CB.x=cv.getContext('2d');cbSizeC();
 cv.addEventListener('pointerdown',cbPD);cv.addEventListener('pointermove',cbPM);['pointerup','pointercancel'].forEach(e=>cv.addEventListener(e,()=>{CB.drag=false}));
 addEventListener('resize',cbSizeC);
 if(CB.done.every(b=>b))CB.ok=true;
 cbPick(cbNextCol(CB.sel)||1);window.scrollTo(0,0)}
function cbSizeC(){const cv=CB.cv;if(!cv||!cv.isConnected){removeEventListener('resize',cbSizeC);return}const w=Math.min(($('.cbw')||cv).clientWidth||340,520,innerHeight-260),dpr=Math.min(2.5,devicePixelRatio||1);cv.style.width=cv.style.height=w+'px';cv.width=cv.height=Math.round(w*dpr);CB.dpr=dpr;CB.w=w;cbDraw()}
function cbLeft(k){let n=0;CB.G.g.forEach((v,i)=>{if(v===k&&!CB.done[i])n++});return n}
function cbNextCol(from){const K=CB.G.pal.length;for(let j=0;j<K;j++){const k=(from-1+j)%K+1;if(cbLeft(k))return k}return 0}
function cbPick(k){CB.sel=k;document.querySelectorAll('.cbsw').forEach(b=>{const v=+b.dataset.v,left=cbLeft(v);b.classList.toggle('on',v===k);b.classList.toggle('ok',!left);b.setAttribute('aria-checked',v===k);b.querySelector('i').textContent=left?left:'✓'});cbDraw()}
function cbDraw(){
 const c=CB.x,G=CB.G;if(!c||!G)return;const n=G.n,W=CB.cv.width,s=W/n,dpr=CB.dpr;c.clearRect(0,0,W,W);
 const fin=CB.ok;
 for(let i=0;i<n*n;i++){const x=(i%n)*s,y=Math.floor(i/n)*s,v=G.g[i];
  if(CB.done[i]||fin){c.fillStyle=G.pal[v-1];c.fillRect(x,y,s+.6,s+.6)}
  else{const on=v===CB.sel,hl=CB.fl&&CB.fl.has(i);c.fillStyle=hl?'#ffe27a':on?'#d9d2ff':'#f6f4fb';c.fillRect(x,y,s,s);
   c.fillStyle=on?'#3b2f8a':'#9a96b5';c.font=`${on?800:600} ${Math.round(s*.46)}px "Nunito Sans",system-ui,sans-serif`;c.textAlign='center';c.textBaseline='middle';c.fillText(v,x+s/2,y+s/2+s*.03)}}
 if(!fin){c.strokeStyle='rgba(60,50,120,.14)';c.lineWidth=Math.max(1,dpr*.6);c.beginPath();for(let k=0;k<=n;k++){c.moveTo(k*s,0);c.lineTo(k*s,W);c.moveTo(0,k*s);c.lineTo(W,k*s)}c.stroke()}}
function cbCell(e){const r=CB.cv.getBoundingClientRect(),n=CB.G.n,c=Math.floor((e.clientX-r.left)/r.width*n),w=Math.floor((e.clientY-r.top)/r.height*n);return c<0||w<0||c>=n||w>=n?-1:w*n+c}
function cbPaint(i,tap){
 if(i<0||CB.ok||CB.done[i])return;const v=CB.G.g[i];
 if(v!==CB.sel){if(tap){cbBad(i)}return}
 CB.done[i]=true;if(CB.fl)CB.fl.delete(i);sfx(500+v*60,.03);
 const left=cbLeft(v);if(!left){sfx(780,.12);vib(10);const nk=cbNextCol(v);cbSave();if(!nk)return cbWin();cbPick(nk);return}
 if(Math.random()<.3)cbSave();cbDraw();const b=$(`.cbsw[data-v="${v}"] i`);if(b)b.textContent=left}
function cbBad(i){vib(12);const c=CB.x,n=CB.G.n,s=CB.cv.width/n,x=(i%n)*s,y=Math.floor(i/n)*s;c.fillStyle='rgba(232,72,90,.55)';c.fillRect(x,y,s,s);setTimeout(cbDraw,260);const m=$('#m');if(m)m.textContent='Cette case porte le numéro '+CB.G.g[i]+'.'}
function cbPD(e){if(!CB.G)return;CB.drag=true;try{CB.cv.setPointerCapture(e.pointerId)}catch(x){}const m=$('#m');if(m)m.textContent='';cbPaint(cbCell(e),true);e.preventDefault()}
function cbPM(e){if(!CB.drag)return;cbPaint(cbCell(e),false);e.preventDefault()}
function cbWin(){
 CB.ok=true;st.set('cb:sv:'+CB.l,'');const d=st.get('cb:d',[]),first=!d.includes(CB.l);if(first){d.push(CB.l);st.set('cb:d',d)}
 const r=first?2+Math.floor(CB.l/8):1;fl+=r;st.set('fl',fl);const ch=$('.chip:not(.hintb)');if(ch)ch.textContent='❄ '+FLX();
 cbDraw();document.querySelectorAll('.cbsw').forEach(b=>{b.classList.add('ok');b.querySelector('i').textContent='✓'});
 const cv=CB.cv;if(cv&&!wRM)cv.animate([{transform:'scale(1)'},{transform:'scale(1.04)'},{transform:'scale(1)'}],{duration:600,easing:'ease-out'});
 sfx(784,.6);vib([20,40,20]);try{confetti(cv)}catch(e){}
 const nx=CB.l+1<CBN;setTimeout(()=>{const s=$('.cbs');if(!s)return;s.insertAdjacentHTML('beforeend',`<div class="unend"><section class="glass play"><h2>${esc(CBP[CB.l].n)}</h2><p class="note" style="margin:0 0 4px">Dessin terminé !</p><p class="unrw">+${r} ❄</p><div class="chrow">${nx?`<button class="btn" data-a="cbLv" data-v="${CB.l+1}">Dessin suivant</button>`:''}<button class="btn alt" data-a="cbBk">Retour</button></div></section></div>`)},1900)}
let cbAO=false;
function cbActs(){if(cbAO)return;cbAO=true;Object.assign(act,{
 cbBk:()=>{cbSave();CB.G=null;cbHub()},
 cbDd:()=>{const d=$('#cbdd');lvOpen=d.classList.toggle('open');d.querySelector('.dd-h').setAttribute('aria-expanded',lvOpen)},
 cbLv:v=>{CB.l=Math.max(0,Math.min(CBN-1,+v||0));CB.G=cbGrid(CB.l);CB.done=cbLoad(CB.l);CB.ok=false;CB.sel=1;CB.fl=null;cbScreen()},
 cbSel:v=>{cbPick(+v)},
 cbHint:()=>{if(CB.ok)return;const left=cbLeft(CB.sel);if(!left)return;if(!UNL()){if(fl<1){const m=$('#m');if(m)m.textContent='Il te manque un flocon pour un indice.';return}fl-=1;st.set('fl',fl);const c=$('.chip:not(.hintb)');if(c)c.textContent='❄ '+FLX()}
  CB.fl=new Set();CB.G.g.forEach((v,i)=>{if(v===CB.sel&&!CB.done[i])CB.fl.add(i)});cbDraw();setTimeout(()=>{CB.fl=null;cbDraw()},1600)}
})}
