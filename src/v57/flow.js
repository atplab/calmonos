/* ---------- Relie les points : un fil par couleur, toute la grille remplie ---------- */
const FLC=['#ff5a5f','#4f8cff','#3ccf6e','#ffd84a','#ff9a3c','#5fe0e6','#e65cd7','#a06cff','#b8e986','#f2f2f2','#c9874a','#ff8fb1'];
/* ordre des niveaux : 1 à 10 en douceur, le 50 difficile, le reste mélangé (dont 15 grilles 6×6 moyennement faciles) */
const flSz=l=>l<5?5:l<15?6:l<30?7:l<45?8:9;
const FLO=(()=>{const R=rng(424242),P=[...Array(49).keys()].map(i=>i+10).map(l=>[l,flSz(l)]).concat([...Array(15).keys()].map(i=>[100+i,6]));
 for(let i=P.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[P[i],P[j]]=[P[j],P[i]]}
 return[...[...Array(10).keys()].map(l=>[l,flSz(l)]),...P.slice(0,39),[59,9],...P.slice(39)]})();
function flGen(l){const o=FLO[l]||[l,7];return flGen0(o[0],o[1])}
function flGen0(l,n){
 const R=rng((l+3)*2246822519+17),N=n*n;
 const nb=a=>{const r=a/n|0,c=a%n,o=[];if(r)o.push(a-n);if(r<n-1)o.push(a+n);if(c)o.push(a-1);if(c<n-1)o.push(a+1);return o};
 const adj=(a,b)=>Math.abs((a/n|0)-(b/n|0))+Math.abs(a%n-b%n)===1;
 let best=null;
 for(let att=0;att<300;att++){
  /* chemin qui passe par toutes les cases (serpentin brassé par « backbite ») */
  let P=[];for(let r=0;r<n;r++)for(let c=0;c<n;c++)P.push(r*n+(r%2?n-1-c:c));
  for(let it=0;it<N*60;it++){if(R()<.5)P.reverse();const ns=nb(P[0]),v=ns[R()*ns.length|0],i=P.indexOf(v);if(i>1)P=P.slice(0,i).reverse().concat(P.slice(i))}
  /* découpé en fils d’au moins 3 cases */
  const K=n-1+(R()<.5?0:1)+(n>=9&&R()<.5?1:0),L=Array(K).fill(3);let rem=N-3*K;
  const w=L.map(()=>.3+R()*R()*2.5),ws=w.reduce((a,b)=>a+b,0);for(let i=0;i<K;i++){const x=Math.floor(rem*w[i]/ws);L[i]+=x}
  let left=N-L.reduce((a,b)=>a+b,0);while(left-->0)L[R()*K|0]++;
  const S=[];let p=0;for(const x of L){S.push(P.slice(p,p+x));p+=x}
  /* pas de fil trop évident : les deux points ne se touchent pas et le fil tourne au moins une fois */
  const bad=S.filter(s=>adj(s[0],s[s.length-1])).length;
  const str=S.filter(s=>s.every(c=>(c/n|0)===(s[0]/n|0))||s.every(c=>c%n===s[0]%n)).length;
  const sc=bad*10+str;
  if(!best||sc<best.sc)best={sc,S};
  if(sc===0)break;
 }
 const S=best.S.map(s=>R()<.5?s.slice().reverse():s);
 return{n,S,F:S.map(s=>[s[0],s[s.length-1]])};
}
function pFlow(r){
 const Z=flGen(lv),n=Z.n,K=Z.F.length,N=n*n,end={};Z.F.forEach(([a,b],i)=>{end[a]=i;end[b]=i});
 const nb=(a,b)=>Math.abs((a/n|0)-(b/n|0))+Math.abs(a%n-b%n)===1;
 let paths=r&&r.v===2&&r.p&&r.p.length===K?r.p.map(x=>x.slice()):Z.F.map(()=>[]),mv=r&&r.mv||0,last=-1,drag=null,okPrev=paths.map(()=>false),done=false;
 snap=()=>({v:2,p:paths,mv});
 const conn=i=>{const p=paths[i];return p.length>1&&end[p[p.length-1]]===i&&p[p.length-1]!==p[0]};
 const own=()=>{const o=Array(N).fill(-1);paths.forEach((p,i)=>p.forEach(c=>o[c]=i));return o};
 const C=i=>FLC[i%FLC.length],cx=a=>a%n+.5,cy=a=>(a/n|0)+.5;
 let gl='';for(let i=1;i<n;i++)gl+=`M${i} 0V${n}M0 ${i}H${n}`;
 frame(`<div class="fls" id="fls"></div><div class="flw"><svg class="flv" id="flv" viewBox="-.06 -.06 ${n+.12} ${n+.12}">
  <g>${[...Array(N).keys()].map(a=>`<rect class="flc" id="fc${a}" x="${a%n+.04}" y="${(a/n|0)+.04}" width=".92" height=".92" rx=".1" style="--d:${((a%n)+(a/n|0))*35}ms"/>`).join('')}</g>
  <path class="flg" d="M0 0H${n}V${n}H0Z${gl}"/>
  <circle class="flcur" id="flcur" r=".62" cx="-5" cy="-5"/>
  <g>${Z.F.map((_,i)=>`<polyline class="flp" id="fp${i}" stroke="${C(i)}" points=""/>`).join('')}</g>
  <g>${Z.F.map(([a,b],i)=>[a,b].map(x=>`<circle class="fld" data-c="${i}" fill="${C(i)}" cx="${cx(x)}" cy="${cy(x)}" r=".34"/>`).join('')).join('')}</g>
 </svg></div>`,1);
 const sv0=$('#flv'),cur0=$('#flcur');
 const draw=()=>{const o=own();
  for(let a=0;a<N;a++){const e=$('#fc'+a);e.style.fill=o[a]<0?'':C(o[a])}
  paths.forEach((p,i)=>$('#fp'+i).setAttribute('points',p.map(a=>cx(a)+','+cy(a)).join(' ')));
  const ok=paths.map((_,i)=>conn(i));
  sv0.querySelectorAll('.fld').forEach(d=>{const i=+d.dataset.c;d.classList.toggle('ok',ok[i]);if(ok[i]&&!okPrev[i]){d.classList.remove('pop');void d.getBBox();d.classList.add('pop')}});
  ok.forEach((v,i)=>{$('#fp'+i).classList.toggle('ok',v);if(v&&!okPrev[i]&&drag){sfx(520+i*40,.25);vib(12)}});okPrev=ok;
  const f=o.filter(x=>x>=0).length;
  $('#fls').innerHTML=`<span>Fils <b>${ok.filter(Boolean).length}/${K}</b></span><span>Coups <b>${mv}</b></span><span>Grille <b>${Math.round(f*100/N)} %</b></span>`;
  return{ok,f}};
 const pt=e=>{const b=sv0.getBoundingClientRect(),s=(n+.12)/b.width;return[(e.clientX-b.left)*s-.06,(e.clientY-b.top)*s-.06]};
 const cellAt=([x,y])=>x<0||y<0||x>=n||y>=n?-1:(y|0)*n+(x|0);
 /* les autres fils sont coupés là où le fil en cours passe, et reviennent si on recule */
 const recut=()=>{const S=new Set(drag.p);paths=drag.base.map((p,i)=>{if(i===drag.c)return drag.p;const k=p.findIndex(a=>S.has(a));return k<0?p.slice():p.slice(0,k)})};
 const step=y=>{const p=drag.p,h=p[p.length-1];if(y===h)return true;
  const k=p.indexOf(y);if(k>=0){p.length=k+1;return true}
  if(!nb(h,y))return false;
  if(p.length>1&&end[h]===drag.c)return false;
  if(end[y]!==undefined&&end[y]!==drag.c)return false;
  p.push(y);return true};
 const go=y=>{let h=drag.p[drag.p.length-1],g=0;
  while(h!==y&&g++<20){if(drag.p.includes(y)){step(y);break}
   const dr=(y/n|0)-(h/n|0),dc=y%n-h%n,cand=Math.abs(dr)>=Math.abs(dc)?[h+Math.sign(dr)*n,h+Math.sign(dc)]:[h+Math.sign(dc),h+Math.sign(dr)*n];
   let moved=false;for(const c of cand)if(c!==h&&c>=0&&c<N&&nb(h,c)&&step(c)){moved=true;break}
   if(!moved)break;h=drag.p[drag.p.length-1]}
  recut();draw()};
 sv0.addEventListener('pointerdown',e=>{if(done)return;const q=pt(e),x=cellAt(q);if(x<0)return;const o=own();let c,p;
  if(end[x]!==undefined){c=end[x];p=[x]}else if(o[x]>=0){c=o[x];p=paths[c].slice(0,paths[c].indexOf(x)+1)}else return;
  drag={c,p,base:paths.map(z=>z.slice()),b0:JSON.stringify(paths)};try{sv0.setPointerCapture(e.pointerId)}catch(_){}
  cur0.setAttribute('cx',q[0]);cur0.setAttribute('cy',q[1]);cur0.style.fill=C(c);sv0.classList.add('drg');recut();draw();e.preventDefault()});
 sv0.addEventListener('pointermove',e=>{if(!drag)return;const q=pt(e);cur0.setAttribute('cx',q[0]);cur0.setAttribute('cy',q[1]);
  const x=cellAt([Math.min(n-.01,Math.max(0,q[0])),Math.min(n-.01,Math.max(0,q[1]))]);go(x)});
 const up=()=>{if(!drag)return;const ch=JSON.stringify(paths)!==drag.b0;if(ch&&drag.c!==last){mv++;last=drag.c}
  drag=null;sv0.classList.remove('drg');const s=draw();if(ch)sv();check(s)};
 ['pointerup','pointercancel','lostpointercapture'].forEach(t=>sv0.addEventListener(t,up));
 const check=s=>{if(done)return;if(s.ok.every(Boolean)){if(s.f===N){done=true;sv0.classList.add('won');msg('Toute la grille brille ✦');setTimeout(win,1300)}else msg('Tous les fils sont reliés : remplis aussi toute la grille.')}};
 /* indice : un fil se trace tout seul, à sa bonne place */
 act.hint=()=>{if(done)return;const i=paths.findIndex((p,j)=>p.join()!==Z.S[j].join()&&p.join()!==Z.S[j].slice().reverse().join());if(i<0||!spend(1))return;
  const S=new Set(Z.S[i]);paths=paths.map((p,j)=>{if(j===i)return Z.S[i].slice();const k=p.findIndex(a=>S.has(a));return k<0?p:p.slice(0,k)});
  const e=$('#fp'+i);e.classList.remove('hn');void e.getBBox();e.classList.add('hn');sv();check(draw())};
 draw();
}
