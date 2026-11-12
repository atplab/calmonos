/* ---------- Solitaire (Klondike, une carte à la fois, pioche illimitée) : 40 niveaux et un mode infini ----------
   Toutes les donnes proposées ont une solution : les niveaux sont des donnes choisies d’avance (de la plus simple à la plus
   coriace), le mode infini tire une donne au hasard et la vérifie avec le petit solveur avant de la proposer. */
const SOLR=['A','2','3','4','5','6','7','8','9','10','J','Q','K'],SOS=['♠','♥','♦','♣'],SON=40;
const soR=c=>c%13+1,soSu=c=>Math.floor(c/13),soRed=c=>{const s=soSu(c);return s===1||s===2};
function soRng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function soDeal(seed){
 const r=soRng(seed),d=[...Array(52).keys()];for(let i=51;i>0;i--){const j=Math.floor(r()*(i+1));[d[i],d[j]]=[d[j],d[i]]}
 const T=[...Array(7)].map(()=>({d:[],u:[]}));let p=0;
 for(let row=0;row<7;row++)for(let k=row;k<7;k++){T[k].d.push(d[p++])}
 T.forEach(t=>t.u.push(t.d.pop()));
 return{T,F:[0,0,0,0],S:d.slice(28).reverse(),W:[],mv:0}}
const soFits=(c,t)=>t.u.length?(soRed(c)!==soRed(t.u[t.u.length-1])&&soR(t.u[t.u.length-1])===soR(c)+1):(t.d.length===0&&soR(c)===13);
const soFF=(c,F)=>F[soSu(c)]===soR(c)-1;
/* ---------- solveur : pioche illimitée à une carte = n’importe quelle carte de la pioche est jouable ---------- */
function soSolve(T0,F0,P0,lim){
 const seen=new Set();let nodes=0;
 const cp=T=>T.map(p=>({d:p.d.slice(),u:p.u.slice()}));
 const safe=(c,F)=>{const r=soR(c);if(r<=2)return true;const red=soRed(c),o=red?[0,3]:[1,2];return F[o[0]]>=r-1&&F[o[1]]>=r-1};
 const auto=(T,F,P)=>{let ch=true;while(ch){ch=false;for(const t of T){const c=t.u[t.u.length-1];if(c!==undefined&&soFF(c,F)&&safe(c,F)){t.u.pop();F[soSu(c)]++;if(!t.u.length&&t.d.length)t.u.push(t.d.pop());ch=true}}}};
 const key=(T,F,P)=>T.map(p=>p.d.length+':'+p.u.join(',')).sort().join('|')+'/'+F.join(',')+'/'+P.slice().sort((a,b)=>a-b).join(',');
 function moves(T,F,P){
  const M=[];
  T.forEach((t,i)=>{const c=t.u[t.u.length-1];if(c!==undefined&&soFF(c,F))M.push({k:'tf',i})});
  P.forEach(c=>{if(soFF(c,F))M.push({k:'pf',c})});
  const rv=[];T.forEach((t,i)=>{if(!t.u.length)return;const c=t.u[0];T.forEach((o,j)=>{if(j!==i&&soFits(c,o)&&!(soR(c)===13&&!t.d.length))rv.push({k:'tt',i,j,n:t.u.length,w:t.d.length})})});
  rv.sort((a,b)=>b.w-a.w);M.push(...rv);
  P.forEach(c=>{T.forEach((o,j)=>{if(soFits(c,o))M.push({k:'pt',c,j})})});
  T.forEach((t,i)=>{for(let x=1;x<t.u.length;x++){const b=t.u[x-1];if(!soFF(b,F))continue;const c=t.u[x];T.forEach((o,j)=>{if(j!==i&&soFits(c,o))M.push({k:'tt',i,j,n:t.u.length-x})})}});
  return M}
 function apply(T,F,P,m){
  T=cp(T);F=F.slice();P=P.slice();
  if(m.k==='tf'){const t=T[m.i],c=t.u.pop();F[soSu(c)]++;if(!t.u.length&&t.d.length)t.u.push(t.d.pop())}
  else if(m.k==='pf'){P.splice(P.indexOf(m.c),1);F[soSu(m.c)]++}
  else if(m.k==='pt'){P.splice(P.indexOf(m.c),1);T[m.j].u.push(m.c)}
  else if(m.k==='tt'){const t=T[m.i],run=t.u.splice(t.u.length-m.n,m.n);T[m.j].u.push(...run);if(!t.u.length&&t.d.length)t.u.push(t.d.pop())}
  auto(T,F,P);return[T,F,P]}
 function rec(T,F,P){
  if(F.every(x=>x===13))return[];if(++nodes>lim)return null;
  const k=key(T,F,P);if(seen.has(k))return null;seen.add(k);
  for(const m of moves(T,F,P)){const[a,b,c]=apply(T,F,P,m);const r=rec(a,b,c);if(r)return[m,...r];if(nodes>lim)return null}
  return null}
 const T=cp(T0),F=F0.slice(),P=P0.slice().sort((a,b)=>a-b);auto(T,F,P);
 const r=rec(T,F,P);return{ok:!!r,path:r,nodes}}
const soSolvable=(g,lim)=>soSolve(g.T,g.F,[...g.S,...g.W],lim||25000);
/* niveaux : graines vérifiées d’avance, rangées de la plus simple à la plus difficile */
const SOLV=[262,77,276,219,351,302,229,161,22,264,67,140,58,127,149,1,284,110,259,189,57,265,210,212,18,324,234,126,162,174,107,137,308,32,207,194,138,336,225,114];
/* ---------- état et écran ---------- */
const SL={g:null,mode:'',lv:0,h:[],hint:null,m:'',el:{},busy:false,done:false,t0:0};
const soSave=()=>{if(SL.g&&!SL.done)st.set('sol:sv',{g:SL.g,mode:SL.mode,lv:SL.lv,h:SL.h.slice(-60)});else st.set('sol:sv',null)};
function soNew(mode,lv){
 let seed;
 if(mode==='lv')seed=SOLV[lv]||lv+1;
 else{const a=new Uint32Array(1);for(let i=0;i<30;i++){if(window.crypto&&crypto.getRandomValues)crypto.getRandomValues(a);else a[0]=Math.floor(Math.random()*4294967295);seed=a[0]|0;if(soSolvable(soDeal(seed),3000).ok)break}}
 SL.g=soDeal(seed);SL.g.seed=seed;SL.mode=mode;SL.lv=lv;SL.h=[];SL.hint=null;SL.m='';SL.done=false;soSave();soScreen()}
function soScreen(){
 soActs();cur='solitaire';nv('games');theme('solitaire');SL.el={};
 const ttl=SL.mode==='lv'?'Niveau '+(SL.lv+1):'Mode infini';
 app.innerHTML=`<div id="sog" class="sog"><div class="top stk"><button class="back" data-a="soBk">‹ Solitaire</button><b class="sott">${ttl}</b><div class="tr"><button class="hb hintb" data-a="soHint" aria-label="Indice : coûte 1 flocon">${HBI(1)}</button><div class="chip">❄ ${FLX()}</div></div></div><div class="sob" id="sob"></div><p class="m somsg" id="m" role="status" aria-live="polite"></p><div class="sobt"><button class="btn alt" data-a="soUndo">Annuler</button><button class="btn alt" data-a="soRe">${SL.mode==='lv'?'Recommencer':'Nouvelle donne'}</button></div></div>`;
 const B=$('#sob');B.addEventListener('click',soTap);
 soLay();window.scrollTo(0,0);
 clearTimeout(SL.rt);addEventListener('resize',soRs)}
function soRs(){clearTimeout(SL.rt);SL.rt=setTimeout(()=>{if($('#sob'))soLay();else removeEventListener('resize',soRs)},120)}
/* carte : index en coin (valeur sur la couleur) en haut à gauche et retourné en bas à droite, enseignes disposées comme un vrai jeu */
const SOPIP={2:[[50,24],[50,76]],3:[[50,24],[50,50],[50,76]],4:[[38,24],[62,24],[38,76],[62,76]],5:[[38,24],[62,24],[50,50],[38,76],[62,76]],6:[[38,24],[62,24],[38,50],[62,50],[38,76],[62,76]],
 7:[[38,24],[62,24],[50,37],[38,50],[62,50],[38,76],[62,76]],8:[[38,24],[62,24],[50,37],[38,50],[62,50],[50,63],[38,76],[62,76]],9:[[38,24],[62,24],[38,41.5],[62,41.5],[50,50],[38,58.5],[62,58.5],[38,76],[62,76]],
 10:[[38,24],[62,24],[50,33],[38,41.5],[62,41.5],[38,58.5],[62,58.5],[50,67],[38,76],[62,76]]};
const soCard=c=>{const r=soR(c),R=SOLR[r-1],S=SOS[soSu(c)]+'\uFE0E',ix=d=>`<i class="pki${d?' dn':''}"><b${r===10?' class="p10"':''}>${R}</b><u>${S}</u></i>`;
 const mid=r===1?`<i class="ppa">${S}</i>`:r>10?`<i class="ppf"><b>${R}</b><u>${S}</u></i>`:SOPIP[r].map(([x,y])=>`<i class="pp${y>55?' dn':''}" style="left:${x}%;top:${y}%">${S}</i>`).join('');
 return`<span class="pkf">${ix(0)}${mid}${ix(1)}</span><span class="pkb"></span>`};
/* placement de toutes les cartes (les éléments sont gardés : les déplacements glissent) */
function soLay(){
 const B=$('#sob');if(!B||!SL.g)return;const g=SL.g,W=B.clientWidth,gap=Math.max(3,Math.round(W*.012)),cw=Math.floor((W-gap*6)/7),ch=Math.round(cw*1.42);
 B.style.setProperty('--cw',cw+'px');B.style.setProperty('--ch',ch+'px');
 const X=k=>k*(cw+gap),ty=ch+Math.round(ch*.28),avail=Math.max(ch*3,innerHeight-B.getBoundingClientRect().top-ty-150);
 if(!B.querySelector('.sslot')){let h='';for(let k=0;k<7;k++){if(k!==2)h+=`<span class="sslot${k===0?' sstk':k>2?' sfnd':''}" data-z="${k}"${k>2?` data-s="${SOS[k-3]}"`:''}></span>`;h+=`<span class="sslot stab" data-t="${k}"></span>`}B.innerHTML=h}
 B.querySelectorAll('.sslot').forEach(s=>{const t=s.dataset.t;if(t!==undefined){s.style.left=X(+t)+'px';s.style.top=ty+'px'}else{s.style.left=X(+s.dataset.z)+'px';s.style.top='0px'}});
 const pos={};let z=1;
 g.S.forEach((c,i)=>pos[c]={x:X(0),y:0,f:0,z:z++,l:{a:'s'}});
 const wn=g.W.length;g.W.forEach((c,i)=>pos[c]={x:X(1)+Math.max(0,i-(wn-3))*Math.round(cw*.4)*(wn>=3?1:0),y:0,f:1,z:z++,l:{a:'w',i}});
 for(let s=0;s<4;s++){let n=g.F[s];for(let r=1;r<=n;r++){const c=s*13+r-1;pos[c]={x:X(3+s),y:0,f:1,z:z++,l:{a:'f',s}}}}
 g.T.forEach((t,k)=>{const nd=t.d.length,nu=t.u.length;let od=Math.round(ch*.11),ou=Math.round(ch*.36);const need=nd*od+Math.max(0,nu-1)*ou;if(need>avail-ch&&nu>1){ou=Math.max(Math.round(ch*.17),Math.floor((avail-ch-nd*od)/(nu-1)))}
  let y=ty;t.d.forEach(c=>{pos[c]={x:X(k),y,f:0,z:z++,l:{a:'t',k}};y+=od});t.u.forEach((c,i)=>{pos[c]={x:X(k),y,f:1,z:z++,l:{a:'t',k,i}};y+=ou})});
 let maxY=ty+ch;Object.values(pos).forEach(p=>{if(p.y+ch>maxY)maxY=p.y+ch});B.style.height=(maxY+8)+'px';
 SL.pos=pos;
 for(let c=0;c<52;c++){let e=SL.el[c];if(!e){e=document.createElement('span');e.className='scd';e.dataset.c=c;e.innerHTML=soCard(c);e.classList.add(soRed(c)?'sred':'sblk');B.appendChild(e);SL.el[c]=e}
  const p=pos[c];e.style.transform=`translate(${p.x}px,${p.y}px)`;e.style.zIndex=p.z;e.classList.toggle('up',!!p.f);e.classList.toggle('hn',!!(SL.hint&&SL.hint.c===c));e.classList.toggle('bur',(p.l.a==='s'&&c!==g.S[g.S.length-1])||(p.l.a==='f'&&soR(c)!==g.F[p.l.s]))}
 const ss=B.querySelector('.sstk');if(ss)ss.classList.toggle('rec',!g.S.length&&g.W.length>0);
 const fin=!g.S.length&&!g.W.length&&g.T.every(t=>!t.d.length)&&!SL.done;
 const bt=$('.sobt');if(bt){let f=bt.querySelector('[data-a=soFin]');if(fin&&!f)bt.insertAdjacentHTML('afterbegin','<button class="btn" data-a="soFin">Terminer</button>');else if(!fin&&f)f.remove()}}
function soPush(){SL.h.push(JSON.stringify(SL.g));if(SL.h.length>200)SL.h.shift()}
const soFlip=t=>{if(!t.u.length&&t.d.length)t.u.push(t.d.pop())};
function soAfter(sound){
 const g=SL.g;g.mv++;SL.hint=null;SL.m='';const m=$('#m');if(m)m.textContent='';
 if(sound){sfx(sound,.06);vib(6)}
 if(g.F.every(x=>x===13))return soWin();
 soSave();soLay()}
/* toucher : la carte part d’elle-même au meilleur endroit (fondation d’abord, puis colonne) */
function soTap(e){
 if(SL.busy||SL.done)return;const g=SL.g,el=e.target.closest('.scd'),sl=e.target.closest('.sslot');
 if(!el){if(sl&&sl.classList.contains('sstk'))return soDraw();return}
 const c=+el.dataset.c,l=SL.pos[c].l;
 if(l.a==='s')return soDraw();
 if(l.a==='w'){if(c!==g.W[g.W.length-1])return;
  if(soFF(c,g.F)){soPush();g.W.pop();g.F[soSu(c)]++;return soAfter(660)}
  const j=soBest(c,-1);if(j>=0){soPush();g.W.pop();g.T[j].u.push(c);return soAfter(440)}return soNo(el)}
 if(l.a==='f'){const s=l.s;if(g.F[s]!==soR(c))return;const j=soBest(c,-1);if(j>=0){soPush();g.F[s]--;g.T[j].u.push(c);return soAfter(400)}return soNo(el)}
 if(l.a==='t'){const t=g.T[l.k];if(l.i===undefined)return;const run=t.u.slice(l.i);
  if(run.length===1&&soFF(c,g.F)){soPush();t.u.pop();g.F[soSu(c)]++;soFlip(t);return soAfter(660)}
  const j=soBest(c,l.k,l.i===0&&!t.d.length);if(j>=0){soPush();t.u.splice(l.i);g.T[j].u.push(...run);soFlip(t);return soAfter(440)}
  return soNo(el)}}
function soBest(c,from,whole){
 const g=SL.g;let emp=-1;
 for(let k=1;k<=7;k++){const j=((from<0?-1:from)+k+7)%7;if(j===from)continue;const t=g.T[j];if(!soFits(c,t))continue;if(t.u.length)return j;if(emp<0)emp=j}
 if(emp>=0&&soR(c)===13&&whole)return -1;
 return emp}
function soNo(el){el.classList.remove('shk');void el.offsetWidth;el.classList.add('shk');vib(10)}
function soDraw(){
 const g=SL.g;if(!g.S.length&&!g.W.length)return;soPush();
 if(g.S.length)g.W.push(g.S.pop());else{g.S=g.W.reverse();g.W=[]}
 soAfter(330)}
function soWin(){
 SL.done=true;st.set('sol:sv',null);soLay();
 let r;if(SL.mode==='lv'){const d=st.get('sol:d',[]);const first=!d.includes(SL.lv);if(first){d.push(SL.lv);st.set('sol:d',d)}r=first?3+Math.floor(SL.lv/10):1}else{st.set('sol:inf',st.get('sol:inf',0)+1);r=2}
 fl+=r;st.set('fl',fl);const ch=$('.chip');if(ch)ch.textContent='❄ '+FLX();
 sfx(784,.7);vib([20,40,20]);try{confetti()}catch(e){}
 const nx=SL.mode==='lv'&&SL.lv+1<SON;
 setTimeout(()=>{const g=$('#sog');if(!g)return;g.insertAdjacentHTML('beforeend',`<div class="unend"><section class="glass play"><h2>Bravo !</h2><p class="note" style="margin:0 0 4px">${SL.g.mv} coups</p><p class="unrw">+${r} ❄</p><div class="chrow">${SL.mode==='lv'?(nx?'<button class="btn" data-a="soNext">Niveau suivant</button>':''):'<button class="btn" data-a="soInf">Nouvelle donne</button>'}<button class="btn alt" data-a="soBk">Retour</button></div></section></div>`)},700)}
/* indice : un coup sûr vers les fondations, sinon le premier coup d’une solution trouvée par le solveur */
function soHintFind(){
 const g=SL.g,top=t=>t.u[t.u.length-1];
 for(let k=0;k<7;k++){const c=top(g.T[k]);if(c!==undefined&&soFF(c,g.F))return{c,t:'Cette carte peut monter sur sa pile'}}
 const w=g.W[g.W.length-1];if(w!==undefined&&soFF(w,g.F))return{c:w,t:'Cette carte peut monter sur sa pile'};
 const r=soSolve(g.T,g.F,[...g.S,...g.W],15000);
 if(r.ok&&r.path&&r.path.length){const m=r.path[0];
  if(m.k==='tf')return{c:top(g.T[m.i]),t:'Cette carte peut monter sur sa pile'};
  if(m.k==='tt'){const t=g.T[m.i];return{c:t.u[t.u.length-m.n],t:'Déplace cette carte'}}
  if(m.k==='pf'||m.k==='pt'){if(g.W[g.W.length-1]===m.c)return{c:m.c,t:'Joue la carte de la défausse'};return{c:-1,t:'Pioche : le '+SOLR[soR(m.c)-1]+' '+SOS[soSu(m.c)]+' va servir'}}}
 return{c:-1,t:g.S.length||g.W.length?'Essaie de piocher, ou annule quelques coups':'Annule quelques coups pour trouver un autre chemin'}}
/* fin automatique quand tout est découvert */
function soFin(){
 if(SL.busy)return;SL.busy=true;const g=SL.g;
 const step=()=>{if(!$('#sob')){SL.busy=false;return}let done=false;
  for(let k=0;k<7&&!done;k++){const t=g.T[k],c=t.u[t.u.length-1];if(c!==undefined&&soFF(c,g.F)){t.u.pop();g.F[soSu(c)]++;done=true}}
  if(!done){SL.busy=false;return}
  g.mv++;sfx(600+g.F.reduce((a,b)=>a+b,0)*6,.04);
  if(g.F.every(x=>x===13)){SL.busy=false;return soWin()}
  soLay();setTimeout(step,110)};
 soPush();step()}
/* ---------- accueil ---------- */
function soHub(){
 soActs();cur='solitaire';nv('games');theme('solitaire');
 const d=st.get('sol:d',[]),nx=[...Array(SON).keys()].find(i=>!d.includes(i)),sv=st.get('sol:sv',null),inf=st.get('sol:inf',0);
 app.innerHTML=`<div class="top stk">${bk('home')}<div class="chip">❄ ${FLX()}</div></div><section class="glass story pt-solitaire"><i>♠</i><h2>La patience</h2><p>Le solitaire classique, au calme : range les cartes par couleur de l’as au roi. Touche une carte pour qu’elle trouve sa place toute seule. Toutes les donnes ont une solution.</p></section>
 ${sv&&sv.g?`<section class="glass play"><h2>Partie en cours</h2><p class="note" style="margin:0 0 12px">${sv.mode==='lv'?'Niveau '+(sv.lv+1):'Mode infini'} · ${sv.g.mv} coups</p><div class="chrow"><button class="btn" data-a="soRes">Reprendre</button><button class="btn alt" data-a="soDrop">Laisser tomber</button></div></section>`:''}
 <section class="glass play"><h2>Mode infini</h2><p class="note" style="margin:0 0 12px">Une nouvelle donne au hasard à chaque partie. ${inf?inf+' partie'+(inf>1?'s':'')+' gagnée'+(inf>1?'s':'')+'.':''} +2 ❄ par victoire.</p><button class="btn chgo" data-a="soInf">Jouer</button></section>
 <section class="glass play"><h2>Niveaux</h2><p class="note" style="margin:0 0 10px">${d.length} sur ${SON} terminés · de plus en plus coriaces</p><div class="solv">${[...Array(SON).keys()].map(i=>{const ok=d.includes(i),open=ok||i===nx||i<=(nx===undefined?SON:nx);return`<button class="sol${ok?' ok':''}${i===nx?' nx':''}" data-a="soLv" data-v="${i}"${open?'':' disabled'}>${ok?'✓':i+1}</button>`}).join('')}</div></section>`;
 window.scrollTo(0,0)}
let soAO=false;
function soActs(){if(soAO)return;soAO=true;Object.assign(act,{
 soBk:()=>{soSave();soHub()},
 soInf:()=>soNew('inf',0),
 soLv:v=>soNew('lv',+v),
 soNext:()=>soNew('lv',SL.lv+1),
 soRes:()=>{const sv=st.get('sol:sv',null);if(!sv)return soHub();SL.g=sv.g;SL.mode=sv.mode;SL.lv=sv.lv;SL.h=sv.h||[];SL.hint=null;SL.done=false;soScreen()},
 soDrop:()=>{st.set('sol:sv',null);soHub()},
 soUndo:()=>{if(SL.busy||SL.done||!SL.h.length)return;SL.g=JSON.parse(SL.h.pop());SL.hint=null;soSave();soLay();sfx(300,.05)},
 soRe:()=>{if(SL.busy)return;if(SL.mode==='lv')soNew('lv',SL.lv);else soNew('inf',0)},
 soHint:()=>{if(SL.busy||SL.done)return;if(!UNL()){if(fl<1){const m=$('#m');if(m)m.textContent='Il te manque un flocon pour un indice.';return}fl-=1;st.set('fl',fl);const c=$('.chip:not(.hintb)');if(c)c.textContent='❄ '+FLX()}
  const h=soHintFind();SL.hint=h.c>=0?h:null;const m=$('#m');if(m)m.textContent=h.t;soLay();if(h.c<0&&SL.g.S.length){const s=$('.sstk');if(s){s.classList.remove('shk');void s.offsetWidth;s.classList.add('shk')}}},
 soFin:()=>soFin()
})}
