
/* ---------- Blocs (façon Block Blast) : grille 8×8, trois pièces à placer, lignes et colonnes pleines qui disparaissent ----------
   Les trois pièces proposées peuvent toujours être posées ensemble (dans un certain ordre) au moment où elles apparaissent ;
   à toi de ne pas te bloquer ensuite. Niveaux : atteindre un score. Mode infini : jouer jusqu’à ne plus pouvoir poser. */
const BBN=40,BBC=['#a066e0','#f2b632','#3ab8e8','#f2752a','#3a6ae0','#e8403a','#3ab84a','#d058e0'];
const BBS=(()=>{const L=[];const add=(w,cells)=>{const k=cells.map(c=>c.join(',')).sort().join(';');if(!L.some(x=>x.k===k))L.push({w,c:cells,k})};
 const rots=c=>{let out=[],cur=c;for(let i=0;i<4;i++){const mn=[Math.min(...cur.map(p=>p[0])),Math.min(...cur.map(p=>p[1]))];out.push(cur.map(p=>[p[0]-mn[0],p[1]-mn[1]]));cur=cur.map(([r,q])=>[q,-r])}return out};
 const base=[[3,[[0,0]]],[5,[[0,0],[0,1]]],[5,[[0,0],[0,1],[0,2]]],[4,[[0,0],[0,1],[0,2],[0,3]]],[2,[[0,0],[0,1],[0,2],[0,3],[0,4]]],
  [5,[[0,0],[0,1],[1,0],[1,1]]],[1.6,[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]],[2.2,[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]]],
  [4,[[0,0],[1,0],[1,1]]],[2.4,[[0,0],[1,0],[2,0],[2,1],[2,2]]],[3,[[0,0],[0,1],[0,2],[1,1]]],[3,[[0,0],[0,1],[1,1],[1,2]]],[3,[[0,1],[0,2],[1,0],[1,1]]],
  [3,[[0,0],[1,0],[2,0],[2,1]]],[3,[[0,1],[1,1],[2,1],[2,0]]],[1.4,[[0,0],[1,1]]],[1,[[0,0],[1,1],[2,2]]]];
 base.forEach(([w,c])=>rots(c).forEach(r=>add(w,r)));return L})();
function pBlocs(r){
 const INF=INFG==='blocs',N=8,goal=INF?0:Math.round(90+lv*45+(lv>20?(lv-20)*20:0)),R0=rng((lv+3)*7919+5);
 let g=Array(N*N).fill(-1),P=[null,null,null],sc=0,best=INF?infBest('blocs'):0,combo=0,over=false,done=false,drag=null,hn=null;
 const fits=(G,s,r0,c0)=>s.c.every(([r,c])=>{const R=r0+r,C=c0+c;return R>=0&&R<N&&C>=0&&C<N&&G[R*N+C]<0});
 const lines=G=>{const rows=[],cols=[];for(let i=0;i<N;i++){let fr=true,fc=true;for(let j=0;j<N;j++){if(G[i*N+j]<0)fr=false;if(G[j*N+i]<0)fc=false}if(fr)rows.push(i);if(fc)cols.push(i)}return{rows,cols}};
 const place=(G,s,r0,c0,col)=>{const H=G.slice();s.c.forEach(([r,c])=>H[(r0+r)*N+c0+c]=col);const{rows,cols}=lines(H);rows.forEach(i=>{for(let j=0;j<N;j++)H[i*N+j]=-1});cols.forEach(i=>{for(let j=0;j<N;j++)H[j*N+i]=-1});return{H,n:rows.length+cols.length,rows,cols}};
 const anyFit=(G,s)=>{for(let r=0;r<N;r++)for(let c=0;c<N;c++)if(fits(G,s,r,c))return[r,c];return null};
 /* les trois pièces peuvent-elles toutes entrer, dans au moins un ordre ? */
 const allFit=(G,S)=>{if(!S.length)return true;for(let i=0;i<S.length;i++){const s=S[i],rest=S.filter((_,j)=>j!==i);for(let r=0;r<N;r++)for(let c=0;c<N;c++){if(!fits(G,s,r,c))continue;if(!rest.length)return true;if(allFit(place(G,s,r,c,0).H,rest))return true}}return false};
 const bigW=INF?Math.min(2.2,1+sc/3000):1+Math.min(1.2,lv/30);
 const pick=()=>{const W=BBS.map(s=>s.w*(s.c.length>=5?bigW:1)),T=W.reduce((a,b)=>a+b,0);let x=Math.random()*T;for(let i=0;i<BBS.length;i++){x-=W[i];if(x<=0)return BBS[i]}return BBS[0]};
 const deal=()=>{let S=null;for(let t=0;t<80;t++){const c=[pick(),pick(),pick()];if(allFit(g,c)){S=c;break}}
  if(!S){const small=BBS.filter(s=>s.c.length<=3);for(let t=0;t<200&&!S;t++){const c=[small[Math.floor(Math.random()*small.length)],small[Math.floor(Math.random()*small.length)],small[Math.floor(Math.random()*small.length)]];if(allFit(g,c))S=c}}
  if(!S)S=[BBS[0],BBS[0],BBS[0]];P=S.map(s=>({s,col:Math.floor(Math.random()*BBC.length)}))};
 snap=INF?null:()=>({g,P:P.map(p=>p?{k:p.s.k,col:p.col}:null),sc,combo});
 if(r&&Array.isArray(r.g)&&r.g.length===N*N){g=r.g.slice();sc=r.sc|0;combo=r.combo|0;P=(r.P||[]).map(p=>{if(!p)return null;const s=BBS.find(x=>x.k===p.k);return s?{s,col:p.col|0}:null});while(P.length<3)P.push(null);if(!P.some(Boolean))deal()}
 else{if(!INF&&lv>=6){const n=Math.min(20,4+Math.floor(lv/3));for(let i=0;i<n*3&&g.filter(x=>x>=0).length<n;i++){const k=Math.floor(R0()*N*N);g[k]=Math.floor(R0()*BBC.length);if(lines(g).rows.length||lines(g).cols.length)g[k]=-1}}deal()}
 frame(`<div class="bbh"><div class="bbsc"><small>${INF?'Mode infini':'Objectif '+goal}</small><b id="bbs">${sc}</b>${INF?`<span>👑 ${best}</span>`:`<i class="bbbar"><i id="bbbr"></i></i>`}</div></div><div class="bbw"><div class="bbg" id="bbg">${g.map((_,i)=>`<i class="bbc" data-i="${i}"></i>`).join('')}</div><div class="bbov" id="bbov" hidden></div></div><div class="bbt" id="bbt"></div><div class="bbdr" id="bbdr" hidden></div>`,1);
 const bg=$('#bbg'),cells=[...bg.children],bt=$('#bbt'),dr=$('#bbdr');
 const mini=(p,cs)=>{const w=Math.max(...p.s.c.map(x=>x[1]))+1,h=Math.max(...p.s.c.map(x=>x[0]))+1;return`<span class="bbp" style="--w:${w};--h:${h};--cs:${cs}px">${p.s.c.map(([r,c])=>`<i style="grid-row:${r+1};grid-column:${c+1};--c:${BBC[p.col]}"></i>`).join('')}</span>`};
 const draw=()=>{cells.forEach((e,i)=>{const v=g[i];e.className='bbc'+(v>=0?' f':'');e.style.setProperty('--c',v>=0?BBC[v]:'')});
  bt.innerHTML=P.map((p,i)=>`<div class="bbs${hn&&hn.i===i?' hn':''}" data-i="${i}">${p?mini(p,16):''}</div>`).join('');
  $('#bbs').textContent=sc;const b=$('#bbbr');if(b)b.style.width=Math.min(100,sc*100/goal)+'%';
  if(hn){const p=P[hn.i];if(p)p.s.c.forEach(([r,c])=>{const e=cells[(hn.r+r)*N+hn.c+c];if(e)e.classList.add('gh','hn')})}};
 const ghost=(p,r0,c0)=>{cells.forEach(e=>e.classList.remove('gh','bad','cl'));if(!p||r0==null)return;const ok=fits(g,p.s,r0,c0);
  p.s.c.forEach(([r,c])=>{const R=r0+r,C=c0+c;if(R>=0&&R<N&&C>=0&&C<N){const e=cells[R*N+C];e.classList.add(ok?'gh':'bad');e.style.setProperty('--g',BBC[p.col])}});
  if(ok){const{rows,cols}=place(g,p.s,r0,c0,p.col);rows.forEach(i=>{for(let j=0;j<N;j++)cells[i*N+j].classList.add('cl')});cols.forEach(i=>{for(let j=0;j<N;j++)cells[j*N+i].classList.add('cl')})}};
 const stuck=()=>!P.some(p=>p&&anyFit(g,p.s));
 const end=()=>{over=true;const o=$('#bbov');o.hidden=false;
  if(INF){const nb=infSave('blocs',sc);o.innerHTML=`<div><b>Plus de place !</b><p>Score : ${sc}${nb?' · nouveau record !':' · record : '+infBest('blocs')}</p><button class="btn" data-a="bbRe">Rejouer</button></div>`}
  else o.innerHTML=`<div><b>Plus de place !</b><p>Aucune pièce ne rentre. Il te manquait ${Math.max(0,goal-sc)} points.</p><button class="btn" data-a="bbCo">Continuer · 1 ❄</button><button class="btn alt" data-a="bbRe">Recommencer</button></div>`;sfx(220,.3)};
 const drop=(i,r0,c0)=>{const p=P[i];if(!p||over||done||!fits(g,p.s,r0,c0))return false;const res=place(g,p.s,r0,c0,p.col),n=res.n;
  const placed=p.s.c.map(([r,c])=>(r0+r)*N+c0+c);g=res.H;P[i]=null;hn=null;
  let gain=p.s.c.length;if(n){combo++;gain+=[0,10,30,60,100,150,210][Math.min(6,n)]*(1+(combo-1)*.5)}else combo=0;gain=Math.round(gain);sc+=gain;
  if(!P.some(Boolean))deal();draw();placed.forEach(k=>{if(g[k]>=0){cells[k].classList.add('pop')}});
  if(n){[...res.rows.flatMap(i=>[...Array(N).keys()].map(j=>i*N+j)),...res.cols.flatMap(i=>[...Array(N).keys()].map(j=>j*N+i))].forEach(k=>{const e=cells[k];e.classList.add('boom');e.style.setProperty('--c',BBC[p.col])});
   sfx(520+n*90,.25);vib(n>1?[15,30,15]:12);msg(n>1?n+' lignes ! +'+gain+(combo>1?' · combo ×'+combo:''):'+'+gain+(combo>1?' · combo ×'+combo:''))}else sfx(420,.08);
  setTimeout(()=>cells.forEach(e=>e.classList.remove('pop','boom')),450);
  if(!INF&&sc>=goal&&!done){done=true;msg('Objectif atteint !');setTimeout(win,900);return true}
  if(stuck())setTimeout(end,500);return true};
 act.bbRe=()=>{const o=$('#bbov');o.hidden=true;g=Array(N*N).fill(-1);sc=0;combo=0;over=false;deal();draw()};
 act.bbCo=()=>{if(!over||!spend(1))return;const o=$('#bbov');o.hidden=true;over=false;const rs=[...Array(N).keys()].sort(()=>Math.random()-.5).slice(0,3);rs.forEach(i=>{for(let j=0;j<N;j++)g[i*N+j]=-1});if(stuck())deal();draw()};
 act.hint=()=>{if(over||done)return;for(let i=0;i<3;i++){const p=P[i];if(!p)continue;const rest=P.filter((q,j)=>q&&j!==i).map(q=>q.s);for(let r=0;r<N;r++)for(let c=0;c<N;c++)if(fits(g,p.s,r,c)&&allFit(place(g,p.s,r,c,0).H,rest)){if(!spend(1))return;hn={i,r,c};draw();msg('Essaie de poser cette pièce ici.');return}}};
 /* glisser-déposer : la pièce flotte au-dessus du doigt */
 const cellAt=(x,y,p)=>{const b=bg.getBoundingClientRect(),cs=b.width/N,w=Math.max(...p.s.c.map(q=>q[1]))+1,h=Math.max(...p.s.c.map(q=>q[0]))+1;
  const px=x-w*cs/2,py=y-h*cs-cs*1.2;return[Math.round((py-b.top)/cs),Math.round((px-b.left)/cs),cs,px,py]};
 bt.addEventListener('pointerdown',e=>{const s=e.target.closest('.bbs');if(!s||over||done)return;const i=+s.dataset.i,p=P[i];if(!p)return;e.preventDefault();
  const cs=bg.getBoundingClientRect().width/N;drag={i,p,id:e.pointerId};dr.hidden=false;dr.innerHTML=mini(p,cs-2);s.classList.add('dg');try{bt.setPointerCapture(e.pointerId)}catch(_){}move(e)});
 const move=e=>{if(!drag||e.pointerId!==drag.id)return;const[r0,c0,cs,px,py]=cellAt(e.clientX,e.clientY,drag.p);dr.style.transform=`translate(${px}px,${py}px)`;drag.r=r0;drag.c=c0;ghost(drag.p,r0,c0)};
 bt.addEventListener('pointermove',move);
 const up=e=>{if(!drag||e.pointerId!==drag.id)return;const d=drag;drag=null;dr.hidden=true;ghost(null);const ok=drop(d.i,d.r,d.c);if(!ok)draw()};
 bt.addEventListener('pointerup',up);bt.addEventListener('pointercancel',e=>{if(drag){drag=null;dr.hidden=true;ghost(null);draw()}});
 draw();msg(INF?'Place les pièces le plus longtemps possible.':'Complète des lignes et des colonnes pour atteindre '+goal+' points.');
 if(stuck())setTimeout(end,400);
}
