/* ---------- 2048 : les flocons qui s’assemblent ---------- */
const G2L=[[4,64],[4,128],[4,128],[4,256],[3,64],[4,256],[5,256],[4,512],[3,128],[4,512],[5,512],[4,512],[3,128],[4,1024],[5,1024],[4,1024],[3,256],[5,1024],[4,1024],[4,2048],[5,2048],[3,256],[4,1024],[5,2048],[4,2048],[3,256],[5,2048],[4,2048],[5,4096],[4,2048],
/* 31 à 50 : variantes · rk glaçons qui bloquent · mv coups comptés · cnt plusieurs flocons objectifs · sc score à atteindre · st tempête (2 flocons par coup) · g4 neige épaisse (flocons de 4) */
[4,128,{rk:[5]}],[4,64,{mv:80}],[4,64,{cnt:2}],[5,256,{rk:[12]}],[5,128,{st:1}],
[4,0,{sc:800}],[4,256,{rk:[0]}],[4,256,{g4:1}],[5,256,{mv:250}],[5,128,{cnt:2}],
[5,512,{rk:[0]}],[5,256,{st:1}],[4,128,{mv:120}],[5,0,{sc:2500}],[4,64,{mv:60}],
[5,256,{rk:[6,18]}],[5,128,{cnt:3}],[4,512,{g4:1}],[5,0,{sc:2000,mv:300}],[5,1024,{rk:[24]}]];
const G2C={2:['#eef4fb','#3b4a6b'],4:['#d9e7f7','#3b4a6b'],8:['#aed3f6','#24406b'],16:['#82b8f0','#fff'],32:['#6895ea','#fff'],64:['#7a6ee6','#fff'],128:['#9a62d8','#fff'],256:['#c45cc4','#fff'],512:['#e0609a','#fff'],1024:['#f0846a','#fff'],2048:['#f5b942','#fff'],4096:['#ffd96a','#6b4a10']};
function p2048(r){
 const [n,T,O={}]=G2L[lv%G2L.length],D=110,RK=new Set(O.rk||[]),CN=O.cnt||1,MV=O.mv||0,SG=O.sc||0;
 let mu=0,tiles=[],id=0,sc=0,prev=null,busy=false,q=null,done=false,over=false,S=0,GP=0;
 const mk=(v,r,c)=>{const t={id:++id,v,r,c,el:null};tiles.push(t);return t};
 const free=()=>{const o=[];for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(!RK.has(r*n+c)&&!tiles.some(t=>t.r===r&&t.c===c))o.push([r,c]);return o};
 const spawn=()=>{const f=free();if(!f.length)return null;const [r,c]=f[Math.random()*f.length|0];return mk(O.g4?(Math.random()<.9?4:8):Math.random()<.9?2:4,r,c)};
 const spawnAll=()=>{const a=[spawn()];if(O.st)a.push(spawn());return a.filter(Boolean)};
 const goal=()=>SG?sc>=SG:tiles.filter(t=>t.v>=T).length>=CN;
 const vals=()=>{const g=Array(n*n).fill(0);tiles.forEach(t=>g[t.r*n+t.c]=t.v);return g};
 if(r&&r.g&&r.g.length===n*n){r.g.forEach((v,i)=>{if(v)mk(v,i/n|0,i%n)});sc=r.sc||0;prev=r.pv||null;mu=r.mu||0}else{spawn();spawn()}
 snap=()=>({g:vals(),sc,pv:prev,mu});
 frame(`<div class="g2h"><div class="g2t"><small>Objectif</small>${SG?`<b>${SG} pts</b>`:`<b class="g2o" style="--tb:${G2C[T][0]};--tf:${G2C[T][1]}">${CN>1?CN+' × ':''}${T}</b>`}</div><div class="g2t"><small>Score</small><b id="g2s">${sc}</b></div>${MV?`<div class="g2t"><small>Coups</small><b id="g2m">${MV-mu}</b></div>`:''}<button class="g2u" data-a="g2u" aria-label="Annuler le dernier coup, 1 flocon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg><span>1 ❄</span></button></div>
  <div class="g2b" id="g2b" style="--n:${n}">${[...Array(n*n).keys()].map(i=>RK.has(i)?'<i class="rk"></i>':'<i></i>').join('')}<div class="g2ar" id="g2ar"></div><div class="g2ov" id="g2ov" hidden></div></div><p class="g2k">${O.rk?'Les glaçons ne bougent pas : les flocons s’arrêtent contre eux.':O.st?'Tempête : deux flocons tombent à chaque glissement.':O.g4?'Neige épaisse : les nouveaux flocons valent 4.':MV?'Atteins l’objectif avant la fin des coups.':CN>1?'Fais naître '+CN+' flocons '+T+' en même temps.':SG?'Atteins '+SG+' points de score.':'Glisse dans une direction : tous les flocons partent ensemble.'}</p>`,1);
 const B=$('#g2b');
 const geo=()=>{const w=B.clientWidth;GP=Math.max(6,Math.round(w*.025));S=(w-GP*(n+1))/n;B.style.setProperty('--s',S+'px');B.style.setProperty('--gp',GP+'px')};
 /* position via la propriété translate : l’échelle des animations reste centrée sur la case */
 const pos=t=>`${GP+t.c*(S+GP)}px ${GP+t.r*(S+GP)}px`;
 const paint=t=>{const k=G2C[t.v]||['#ffe9a8','#6b4a10'];t.el.style.background=k[0];t.el.style.color=k[1];t.el.textContent=t.v;t.el.dataset.d=String(t.v).length;t.el.classList.toggle('gl',t.v>=128)};
 const add=(t,cl)=>{const e=document.createElement('b');e.className='g2x'+(cl?' '+cl:'');t.el=e;e.style.transition='none';e.style.translate=pos(t);paint(t);B.appendChild(e)};
 const layout=()=>{geo();tiles.forEach(t=>{if(!t.el)add(t);t.el.style.transition='none';t.el.style.translate=pos(t)})};
 const hud=()=>{$('#g2s').textContent=sc;const m=$('#g2m');if(m){m.textContent=MV-mu;m.classList.toggle('lo',MV-mu<=10)}};
 const can=()=>{if(free().length)return true;const g=vals();for(let r=0;r<n;r++)for(let c=0;c<n;c++){const v=g[r*n+c];if(c<n-1&&g[r*n+c+1]===v||r<n-1&&g[(r+1)*n+c]===v)return true}return false};
 /* d : 0 gauche, 1 droite, 2 haut, 3 bas */
 const sim=(g,d)=>{let moved=false,gain=0;const o=g.slice();
  for(let i=0;i<n;i++){const P0=[...Array(n).keys()].map(j=>{const k=d===0||d===2?j:n-1-j;return d<2?i*n+k:k*n+i});
   /* les glaçons coupent la ligne en morceaux */
   const segs=[[]];P0.forEach(p=>{if(RK.has(p))segs.push([]);else segs[segs.length-1].push(p)});
   for(const P of segs){const L=P.map(p=>g[p]).filter(Boolean),R=[];for(let j=0;j<L.length;j++){if(L[j]===L[j+1]){R.push(L[j]*2);gain+=L[j]*2;j++}else R.push(L[j])}
   P.forEach((p,j)=>{const v=R[j]||0;if(o[p]!==v)moved=true;o[p]=v})}}
  return{g:o,moved,gain}};
 const move=d=>{if(done||over)return;if(busy){q=d;return}
  const g0=vals(),sc0=sc,merged=[],dead=[];let moved=false;
  for(let i=0;i<n;i++){
   const P=[...Array(n).keys()].map(j=>{const k=d===0||d===2?j:n-1-j;return d<2?[i,k]:[k,i]});
   let tg=0,lastT=null;
   for(const [r,c] of P){if(RK.has(r*n+c)){tg=P.findIndex(x=>x[0]===r&&x[1]===c)+1;lastT=null;continue}const t=tiles.find(x=>x.r===r&&x.c===c&&!x.x);if(!t)continue;
    if(lastT&&lastT.v===t.v&&!lastT.m){t.r=lastT.r;t.c=lastT.c;t.x=1;dead.push(t);lastT.v*=2;lastT.m=1;merged.push(lastT);sc+=lastT.v;moved=true}
    else{const [nr,nc]=P[tg++];if(nr!==r||nc!==c)moved=true;t.r=nr;t.c=nc;lastT=t}}
  }
  if(!moved){B.classList.remove('nm'+d);void B.offsetWidth;B.classList.add('nm'+d);return}
  prev={g:g0,sc:sc0,mu};mu++;busy=true;$('#g2ar').className='g2ar';
  /* les flocons glissent ; ceux qui se rejoignent disparaissent dans l’autre, qui grandit */
  /* un flocon tout juste apparu n’a pas de transition tant qu’il n’a pas bougé : il naît sur sa case */
  tiles.forEach(t=>{t.el.style.transition='';t.el.classList.remove('nw')});void B.offsetWidth;
  tiles.forEach(t=>{const v=t.m?t.v/2:t.v;t.el.style.translate=pos(t);if(t.m){t.el.textContent=v}});
  setTimeout(()=>{dead.forEach(t=>{t.el.remove()});tiles=tiles.filter(t=>!t.x);
   merged.forEach(t=>{t.m=0;paint(t);t.el.classList.remove('mg');void t.el.offsetWidth;t.el.classList.add('mg')});
   if(merged.length){sfx(330+Math.log2(Math.max(...merged.map(t=>t.v)))*45,.25);vib(8)}
   spawnAll().forEach(nt=>add(nt,'nw'));hud();sv();busy=false;
   if(goal()){done=true;if(SG)B.classList.add('wonb');else tiles.filter(t=>t.v>=T).forEach(t=>t.el.classList.add('win'));msg(SG?'Score atteint ✦':CN>1?CN+' flocons '+T+' brillent ✦':'Le flocon '+T+' est né ✦');setTimeout(win,1400);return}
   if(!can()){over=true;showOver();return}
   if(MV&&mu>=MV){over=true;showOver(1);return}
   if(q!==null){const d2=q;q=null;move(d2)}},D)};
 const showOver=m=>{const o=$('#g2ov');o.hidden=false;o.innerHTML=`<div><b>${m?'Plus de coups…':'Plus de place…'}</b><p>${m?'Les '+MV+' coups sont joués.':'Aucun flocon ne peut encore bouger.'}</p><button class="btn" data-a="g2u">Annuler le dernier coup · 1 ❄</button><button class="btn alt" data-a="g2r">Recommencer</button></div>`;requestAnimationFrame(()=>o.classList.add('on'))};
 const load=(g,s,m)=>{mu=m||0;tiles.forEach(t=>t.el&&t.el.remove());tiles=[];g.forEach((v,i)=>{if(v)mk(v,i/n|0,i%n)});sc=s;layout();tiles.forEach(t=>{t.el.classList.add('nw')});hud();over=false;const o=$('#g2ov');o.classList.remove('on');o.hidden=true};
 act.g2u=()=>{if(done||busy)return;if(!prev)return msg('Rien à annuler pour l’instant.');if(!spend(1))return;load(prev.g,prev.sc,prev.mu);prev=null;sv();msg('Dernier coup annulé.')};
 act.g2r=()=>{if(done)return;const g=Array(n*n).fill(0);load(g,0,0);spawn();spawn();layout();tiles.forEach(t=>t.el.classList.add('nw'));prev=null;sv()};
 /* indice : la flèche montre le glissement qui garde le plus de place */
 act.hint=()=>{if(done||over||busy)return;const g=vals();let bd=-1,bs=-1e9;
  for(let d=0;d<4;d++){const s=sim(g,d);if(!s.moved)continue;let e=s.g.filter(v=>!v).length*10+s.gain/4;
   const mx=Math.max(...s.g),k=s.g.indexOf(mx),r0=k/n|0,c0=k%n;if((r0===0||r0===n-1)&&(c0===0||c0===n-1))e+=15;
   for(let d2=0;d2<4;d2++){const s2=sim(s.g,d2);if(s2.moved)e+=s2.g.filter(v=>!v).length}
   if(e>bs){bs=e;bd=d}}
  if(bd<0||!spend(1))return;const a=$('#g2ar');a.className='g2ar';void a.offsetWidth;a.className='g2ar on d'+bd;msg(['Glisse vers la gauche','Glisse vers la droite','Glisse vers le haut','Glisse vers le bas'][bd])};
 let sx=null,sy=null;
 B.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;try{B.setPointerCapture(e.pointerId)}catch(_){}e.preventDefault()});
 B.addEventListener('pointermove',e=>{if(sx===null)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<26)return;move(Math.abs(dx)>Math.abs(dy)?(dx<0?0:1):(dy<0?2:3));sx=null});
 ['pointerup','pointercancel'].forEach(t=>B.addEventListener(t,()=>{sx=null}));
 const kd=e=>{if(cur!=='g2048'||!B.isConnected){removeEventListener('keydown',kd);return}const d={ArrowLeft:0,ArrowRight:1,ArrowUp:2,ArrowDown:3}[e.key];if(d!==undefined){e.preventDefault();move(d)}};
 addEventListener('keydown',kd);
 const rs=()=>{if(!B.isConnected){removeEventListener('resize',rs);return}layout()};addEventListener('resize',rs);
 layout();tiles.forEach(t=>t.el.classList.add('nw'));
 if(!can()){over=true;showOver()}else if(MV&&mu>=MV){over=true;showOver(1)}
}
