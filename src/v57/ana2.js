function pAna2(r){
 const A=ANL2[lv],W=A.W,b0=A.b,n=b0.length,KS=new Set(W.map(o=>o.k)),rd=rng((lv+11)*2654435761);
 const ck=(o,j)=>(o.r+(o.h?0:j))+','+(o.c+(o.h?j:0));
 const CL={};W.forEach((o,i)=>[...o.k].forEach((ch,j)=>{const q=ck(o,j);(CL[q]=CL[q]||{ch,w:[]}).w.push(i)}));
 /* lettres de la roue mélangées de façon stable, jamais dans l’ordre d’un mot à trouver */
 const a0=[...b0];let base;for(let t=0;t<40;t++){const a=a0.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}base=a.join('');if(!KS.has(base))break}
 const ok=r&&r.v===4;
 let got=ok?r.got.filter(i=>i<W.length):[],rev=ok?r.rev.filter(q=>q in CL):[],bn=ok&&r.bn?r.bn:[],order=[...base].map((_,i)=>i),sel=[],down=false,cu=null;
 snap=()=>({v:4,got,rev,bn});
 const full=()=>W.every((o,i)=>got.includes(i));
 const shown=q=>rev.includes(q)||CL[q].w.some(i=>got.includes(i));
 /* un mot dont toutes les cases sont visibles (croisements + indices) compte comme trouvé */
 const auto=()=>W.forEach((o,i)=>{if(!got.includes(i)&&[...o.k].every((_,j)=>shown(ck(o,j))))got.push(i)});
 const T=()=>Math.max(20,Math.min(42,Math.floor((Math.min(innerWidth,460)-84)/A.c)-4,Math.floor(innerHeight*.4/A.h)-4));
 const grid=(nw,fl)=>{const e=$('#agr');e.style.setProperty('--t',T()+'px');e.style.gridTemplateColumns=`repeat(${A.c},var(--t))`;
  e.innerHTML=Object.entries(CL).map(([q,c])=>{const[y,x]=q.split(',').map(Number),on=c.w.some(i=>got.includes(i)),rv=!on&&rev.includes(q),
   k=nw?nw.indexOf(q):-1,f=fl&&fl.includes(q);
   return`<i class="${on?'on':rv?'rv':''}${k>=0?' nw':''}${f?' fl':''}" style="grid-row:${y+1};grid-column:${x+1}${k>=0?';--d:'+k*70+'ms':''}">${on||rv?c.ch:''}</i>`}).join('')};
 frame(`<div class="agr" id="agr"></div><div class="pv" id="pv"></div><div class="whw"><button class="shf" data-a="shuf" aria-label="Mélanger les lettres" title="Mélanger"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg></button><div class="whl" id="whl"><svg viewBox="0 0 100 100"><polyline id="ln" points=""/></svg>${[...base].map(c=>`<b>${c}</b>`).join('')}</div></div>`,1);
 const wh=$('#whl'),bs=[...wh.querySelectorAll('b')],P=[];
 const place=()=>order.forEach((j,p)=>{const a=-Math.PI/2+p*2*Math.PI/n;P[j]=[50+35*Math.cos(a),50+35*Math.sin(a)];bs[j].style.left=P[j][0]+'%';bs[j].style.top=P[j][1]+'%'});
 const draw=()=>{bs.forEach((b,j)=>b.classList.toggle('s',sel.includes(j)));$('#pv').textContent=sel.map(j=>base[j]).join('');const p=sel.map(j=>P[j].join(','));if(down&&cu&&sel.length)p.push(cu.join(','));$('#ln').setAttribute('points',p.join(' '))};
 const hit=e=>{const b=wh.getBoundingClientRect(),x=(e.clientX-b.left)/b.width*100,y=(e.clientY-b.top)/b.height*100;cu=[x,y];for(let j=0;j<n;j++)if(Math.hypot(x-P[j][0],y-P[j][1])<10){const k=sel.indexOf(j);if(k<0)sel.push(j);else if(k===sel.length-2)sel.pop();break}draw()};
 const cells=i=>[...W[i].k].map((_,j)=>ck(W[i],j));
 const submit=()=>{const k=sel.map(j=>base[j]).join('');if(!k)return;if(k.length<3)return msg('Trois lettres au moins');
  const i=W.findIndex(o=>o.k===k);
  if(i>=0){if(got.includes(i)){grid(null,cells(i));return msg('Déjà trouvé')}
   const nw=cells(i).filter(q=>!shown(q));got.push(i);auto();sfx(660,.4);vib(15);grid(nw.length?nw:cells(i));msg('✦ '+W[i].d);sv();if(full())setTimeout(win,1100)}
  else if(A.X.has(k)||GW.has(k)){if(bn.includes(k))return msg('Déjà trouvé');bn.push(k);fl++;st.set('fl',fl);chip();sv();msg('Mot bonus · +1 ❄')}
  else{const p=$('#pv');p.classList.remove('bad');void p.offsetWidth;p.classList.add('bad');msg('Ce mot dort encore…')}};
 wh.addEventListener('pointerdown',e=>{down=true;sel=[];try{wh.setPointerCapture(e.pointerId)}catch(_){}hit(e);e.preventDefault()});
 wh.addEventListener('pointermove',e=>{if(down)hit(e)});
 const end=()=>{if(!down)return;down=false;submit();sel=[];draw()};
 wh.addEventListener('pointerup',end);wh.addEventListener('pointercancel',end);wh.addEventListener('contextmenu',e=>e.preventDefault());
 act.shuf=()=>{order.sort(()=>Math.random()-.5);place();sel=[];draw()};
 /* indice : une lettre d’un mot encore caché apparaît dans la grille */
 act.hint=()=>{const c=W.map((_,i)=>i).filter(i=>!got.includes(i));if(!c.length||!spend(1))return;const i=c[Math.random()*c.length|0],h=cells(i).filter(q=>!shown(q)),q=h[Math.random()*h.length|0];
  rev.push(q);const g0=got.length;auto();grid([q]);sv();if(got.length>g0)msg('✦ '+W[got[got.length-1]].d);if(full())setTimeout(win,1100)};
 window.__anT=T;if(!window.__anR){window.__anR=1;addEventListener('resize',()=>{const e=$('#agr');if(e&&window.__anT)e.style.setProperty('--t',window.__anT()+'px')})}
 place();auto();grid();draw();
}
