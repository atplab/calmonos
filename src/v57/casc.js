/* ---------- Mots cachés en cascade : quand un mot est trouvé, il disparaît et les lettres au-dessus tombent ---------- */
const CAW=8,CAH=8,CANL=60,CAHARD=49,CADIR=[[1,0],[0,1],[1,1],[1,-1]];
function caOn(){try{return st.get('ca:mode','')==='cascade'}catch(e){return false}}
const caRng=n=>{let s=n>>>0;return()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}};
const caShuf=(a,r)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
/* mots d'un niveau : une liste thématique, mots de 3 à 7 lettres */
function caWords(k,K,r){const out=[];for(let d=0;d<6&&out.length<K;d++){const L=MSL[(k*7+3+d*11)%100].filter(w=>w.length>=3&&w.length<=7&&!out.includes(w));caShuf(L,r).forEach(w=>{if(out.length<K)out.push(w)})}return out}
const caGet=(cols,c,i)=>c>=0&&c<CAW&&i>=0&&i<cols[c].length?cols[c][i].ch:null;
function caOcc(cols,w){const res=[],seen=new Set(),rv=[...w].reverse().join(''),T=w===rv?[w]:[w,rv];
 for(let c=0;c<CAW;c++)for(let i=0;i<cols[c].length;i++)for(const[dc,di]of CADIR)for(const t of T){let ok=true;const cells=[];
  for(let j=0;j<t.length;j++){const cc=c+dc*j,ii=i+di*j;if(caGet(cols,cc,ii)!==t[j]){ok=false;break}cells.push([cc,ii])}
  if(ok){const key=cells.map(x=>x.join(':')).sort().join('|');if(!seen.has(key)){seen.add(key);res.push(cells)}}}
 return res}
function caRemove(cols,cells){const del=cols.map(()=>new Set());cells.forEach(([c,i])=>del[c].add(i));return cols.map((col,c)=>col.filter((_,i)=>!del[c].has(i)))}
function caSolve(cols,rem,memo,cap){if(!rem.length)return true;const key=cols.map(c=>c.map(x=>x.ch).join('')).join('|')+'#'+rem.join(',');if(memo.has(key))return memo.get(key);if(--cap.n<0)return true;
 let r=false;for(const w of rem){for(const cells of caOcc(cols,w)){if(caSolve(caRemove(cols,cells),rem.filter(x=>x!==w),memo,cap)){r=true;break}}if(r)break}
 memo.set(key,r);return r}
const caOk=(cols,rem)=>caSolve(cols,rem,new Map(),{n:6000});
/* construction à l'envers : on part d'un fond de lettres, puis on insère les mots du dernier au premier trouvé, en repoussant vers le haut les lettres qui sont au-dessus */
function caGen(WS,r,need){
 for(let at=0;at<80;at++){
  let id=0;const cols=Array.from({length:CAW},()=>[]),pool=[...new Set(WS.join(''))];
  for(let c=0;c<CAW;c++){const h=Math.floor(r()*3)+(r()<.5?1:0);for(let k=0;k<h;k++)cols[c].push({ch:pool[Math.floor(r()*pool.length)],id:id++})}
  let ok=true;
  for(let k=WS.length-1;k>=0&&ok;k--){
   const w=r()<.5?WS[k]:[...WS[k]].reverse().join(''),L=w.length,opts=[],hh=cols.map(x=>x.length);
   for(const[dc,di]of CADIR)for(let c0=0;c0<CAW;c0++)for(let i0=0;i0<CAH;i0++){
    const cE=c0+dc*(L-1),iE=i0+di*(L-1);if(cE>=CAW||iE<0||iE>=CAH)continue;
    let good=true;const add=new Array(CAW).fill(0);
    for(let j=0;j<L;j++){const c=c0+dc*j,i=i0+di*j;if(dc===0){if(j===0&&i>hh[c]){good=false;break}}else if(i>hh[c]){good=false;break}add[c]++}
    if(!good)continue;for(let c=0;c<CAW;c++)if(hh[c]+add[c]>CAH){good=false;break}
    if(good)opts.push([dc,di,c0,i0])}
   if(!opts.length){ok=false;break}
   const[dc,di,c0,i0]=opts[Math.floor(r()*opts.length)];
   for(let j=0;j<L;j++)cols[c0+dc*j].splice(i0+di*j,0,{ch:w[j],id:id++})}
  if(ok&&caOk(cols,WS)&&(!need||WS.filter(w=>!caOcc(cols,w).length).length>=need))return cols}
 return null}
function caBoard(k,K,r,need){for(let t=0;t<12;t++){const WS=caWords(k+t*97,K,r),cols=caGen(WS,r,need);if(cols)return{WS,cols}}return null}
function pCasc(rs){
 const INF=INFG==='caches',lvl=INF?0:lv;
 let wave=1,score=0,T0=0,tLeft=60000,tick=null,over=false,run=Math.floor(Math.random()*1e9);
 let WS=[],cols=[],F=[],M=[],a0=null,hn=null,drag=null,busy=false,pend=null,fall=null,nh=false;
 const mk=()=>{const K=INF?Math.min(7,4+Math.floor((wave-1)/2)):4+Math.min(3,Math.floor(lvl/8)),r=caRng(INF?run*31+wave*977:lvl*977+31),b=caBoard(INF?wave:lvl,K,r,!INF&&lvl>=CAHARD?2:0);WS=b.WS;cols=b.cols;F=[];M=[]};
 mk();
 if(!INF&&rs&&rs.cs&&Array.isArray(rs.M)){try{const m=[];for(const x of rs.M){const cells=x.c;if(!WS.includes(x.w))throw 0;const oc=caOcc(cols,x.w);if(!oc.some(o=>o.map(q=>q.join(':')).sort().join('|')===cells.map(q=>q.join(':')).sort().join('|')))throw 0;cols=caRemove(cols,cells);F.push(x.w);m.push(x)}M=m}catch(e){mk()}}
 snap=()=>INF?null:({cs:1,M});
 if(!INF&&lvl===0&&!st.get('can',0)){nh=true;st.set('can',1)}
 act.cax=()=>{nh=false;d()};
 const rowOf=i=>CAH-1-i;
 const d=()=>{
  const fc=new Set();if(pend)pend.forEach(([c,i])=>fc.add(rowOf(i)+','+c));
  let cells='';
  for(let r=0;r<CAH;r++)for(let c=0;c<CAW;c++){const i=rowOf(r),x=cols[c][i],q=r+','+c;
   if(!x){cells+=`<span class="sc ce" data-v="${q}"></span>`;continue}
   const k=fall&&fall[x.id]?fall[x.id]:0;
   cells+=`<button class="sc ca${fc.has(q)?' f':''}${a0===q?' st':''}${hn===q?' hn':''}${k?' fl':''}" data-a="sg" data-v="${q}"${k?` style="--k:${k}"`:''}>${x.ch}</button>`}
  fall=null;
  const hdr=INF?`<div class="cah"><div class="cat"><small>Vague</small><b>${wave}</b></div><div class="cat"><small>Score</small><b id="cas">${score}</b></div><div class="cat tm"><small>Temps</small><b id="cat">${Math.ceil(tLeft/1000)} s</b></div></div><div class="cab"><i id="cab" style="width:${Math.max(0,Math.min(100,tLeft/600))}%"></i></div>`:'';
  frame(`${nh?`<div class="dnote" role="note"><span>Cascade : quand tu trouves un mot, il disparaît et les lettres au-dessus tombent. Les mots changent de place à chaque fois !</span><button data-a="cax" aria-label="Fermer">OK</button></div>`:''}${hdr}<div class="sg ca" style="--n:${CAW}">${cells}</div><p class="sw">${WS.map(w=>`<span class="${F.includes(w)?'d':''}">${w}</span>`).join('')}</p>${INF?'<p class="note" style="text-align:center">Trouve un maximum de mots avant la fin du temps.</p>':''}`,INF?0:1)};
 const clock=()=>{clearInterval(tick);T0=performance.now();let last=T0;tick=setInterval(()=>{if(!playing||!$('#cat')){clearInterval(tick);return}const n=performance.now();if(!busy&&!over)tLeft-=n-last;last=n;
  const e=$('#cat'),b=$('#cab');if(e)e.textContent=Math.max(0,Math.ceil(tLeft/1000))+' s';if(b)b.style.width=Math.max(0,Math.min(100,tLeft/600))+'%';
  if(tLeft<=0&&!over){over=true;clearInterval(tick);end()}},120)};
 const end=()=>{const nb=infSave('caches',score);frame(`<section class="glass story pt-caches"><h2>Temps écoulé</h2><p>Vague ${wave} · ${score} pts${nb?' · nouveau record !':' · record : '+infBest('caches')+' pts'}</p><button class="btn" data-a="car">Rejouer</button></section>`,0)};
 act.car=()=>{INFG='caches';pCasc(undefined);window.scrollTo(0,0)};
 const cellsAt=path=>path.map(([r,c])=>[c,rowOf(r)]);
 const chk=path=>{
  if(busy||over)return;const cs=cellsAt(path);
  if(cs.some(([c,i])=>!cols[c][i])){d();return msg('Il y a un trou dans la ligne.')}
  const str=cs.map(([c,i])=>cols[c][i].ch).join(''),rv=[...str].reverse().join(''),rem=WS.filter(w=>!F.includes(w)),w=rem.find(x=>x===str||x===rv);
  if(!w){d();return msg('Pas ici…')}
  const nx=caRemove(cols,cs),rest=rem.filter(x=>x!==w);
  if(!caOk(nx,rest)){d();return msg('Ce mot-là n’est pas encore à toi : essaie-en un autre.')}
  busy=true;pend=cs;sfx(660,.4);vib(15);F.push(w);M.push({w,c:cs});
  if(INF){score+=w.length*10;tLeft=Math.min(60000,tLeft+4000)}
  d();msg('✦ '+w);
  setTimeout(()=>{const before={};cols.forEach((col,c)=>col.forEach((x,i)=>{before[x.id]=i}));cols=nx;pend=null;fall={};cols.forEach(col=>col.forEach((x,i)=>{const k=before[x.id]-i;if(k>0)fall[x.id]=k}));busy=false;
   if(F.length===WS.length){if(INF){score+=50*wave;tLeft=Math.min(60000,tLeft+15000);wave++;mk();fall={};cols.forEach(col=>col.forEach((x,i)=>{fall[x.id]=CAH-i}));d();return}d();setTimeout(win,900)}else d()},520)};
 act.sg=v=>{if(busy||over)return;if(!a0){a0=v;hn=null;return d()}if(a0===v){a0=null;return d()}
  const[p,q]=a0.split(',').map(Number),[s2,t]=v.split(',').map(Number),dr=s2-p,dc=t-q;a0=null;
  if(!(dr===0||dc===0||Math.abs(dr)===Math.abs(dc))){d();return msg('En ligne droite, doucement.')}
  const m=Math.max(Math.abs(dr),Math.abs(dc)),sr=Math.sign(dr),sc=Math.sign(dc);
  chk(Array.from({length:m+1},(_,k)=>[p+sr*k,q+sc*k]))};
 act.hint=()=>{if(INF||busy)return;const rem=WS.filter(w=>!F.includes(w));for(const w of rem)for(const cs of caOcc(cols,w)){if(caOk(caRemove(cols,cs),rem.filter(x=>x!==w))){if(!spend(1))return;hn=rowOf(cs[0][1])+','+cs[0][0];d();return}}};
 const cellAt=e=>{const el=document.elementFromPoint(e.clientX,e.clientY),c=el&&el.closest?el.closest('.sc'):null;return c&&c.dataset.v?c.dataset.v.split(',').map(Number):null};
 const line=(r0,c0,r1,c1)=>{const dr=r1-r0,dc=c1-c0;if(!dr&&!dc)return[[r0,c0]];
  const a=Math.round(Math.atan2(dr,dc)/(Math.PI/4))*Math.PI/4,sr=Math.round(Math.sin(a)),sc=Math.round(Math.cos(a));
  let L=Math.round((dr*sr+dc*sc)/(sr*sr+sc*sc));if(L<0)L=0;
  while(L>0&&(r0+sr*L<0||r0+sr*L>=CAH||c0+sc*L<0||c0+sc*L>=CAW))L--;
  return Array.from({length:L+1},(_,k)=>[r0+sr*k,c0+sc*k])};
 const paint=path=>{const on=new Set(path.map(([r,c])=>r*CAW+c));app.querySelectorAll('.sg .sc').forEach((b,i)=>b.classList.toggle('st',on.has(i)))};
 wsG={
  down:e=>{if(busy||over)return;const c=cellAt(e);if(c)drag={r:c[0],c:c[1],path:[c],on:false}},
  move:e=>{if(!drag)return;const c=cellAt(e);if(!c)return;const p=line(drag.r,drag.c,c[0],c[1]);
   if(p.length>1&&!drag.on){drag.on=true;a0=null;hn=null}
   if(drag.on){drag.path=p;paint(p)}},
  up:()=>{if(!drag)return;const x=drag;drag=null;if(!x.on)return;wsSw=true;setTimeout(()=>{wsSw=false},60);chk(x.path)},
  cancel:()=>{if(drag&&drag.on)d();drag=null}
 };
 d();if(INF)clock()}
/* récompense : facile = base, moyen = +1, difficile = +2 */
function caTier(l){if(caOn())return l<16?0:l<CAHARD?1:2;return l>=99&&l<167?(+MST[l-99]||0):0}
