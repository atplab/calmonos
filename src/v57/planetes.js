/* ---------- Planètes : on laisse tomber des planètes, deux pareilles fusionnent en une plus grosse ---------- */
const PLN=['Comète','Lune','Mercure','Mars','Vénus','Terre','Neptune','Saturne','Jupiter','Soleil'];
const PLR=[13,18,23,29,35,42,50,58,67,78];
const PLCL=[['#e8f8ff','#7fc8ff'],['#f0f0f6','#9a9ab0'],['#d9c4b4','#85705f'],['#ffa77e','#b8402a'],['#fff0b8','#d9a64c'],['#8fd0ff','#2a63c8'],['#7f98ff','#2a2f9a'],['#f6dca8','#b88a4a'],['#f4c995','#b0603a'],['#fff4a8','#ff8a2a']];
function plLv(l){const T=Math.min(8,3+Math.floor(l/5)),sc=(l>=20&&l%5===4&&l!==39)?800+(l-20)*120:0;
 return{T:sc?0:T,N:sc?0:(l===39?2:T>=7?1:1+(l%5>=3?1:0)),sc,km:Math.min(4,2+Math.floor(l/10)),pre:l%4===3?6+Math.min(6,l>>2):0}}
function pPlan(r){
 const L=plLv(lv),LW=360,LH=560,WL=24,WR=336,FL=528,LINEY=118,DY=70,G=1500,E=.14;
 let ps=[],parts=[],pops=[],id=0,score=0,made=Array(10).fill(0),hx=LW/2,aim=false,held=0,nxt=0,cd=0,over=false,done=false,paused=false,lastT=0,sc=1,dpr=Math.min(2,devicePixelRatio||1),SP={},danger=0;
 snap=()=>({});
 const R=rng((lv+5)*6007+11);
 const pick=()=>{const w=[];for(let k=0;k<=L.km;k++)w.push(Math.pow(.62,k));const s=w.reduce((a,b)=>a+b);let x=Math.random()*s;for(let k=0;k<w.length;k++){x-=w[k];if(x<=0)return k}return 0};
 const mk=(k,x,y,vx,vy)=>{const p={id:++id,k,r:PLR[k],x,y,vx:vx||0,vy:vy||0,a:Math.random()*6,w:0,born:performance.now(),age:0,ov:0,dead:false};ps.push(p);return p};
 const goalDone=()=>L.sc?score>=L.sc:made[L.T]>=L.N;
 frame(`<div class="bkh"><div class="pntg" id="plg"></div><div class="ttmid"><div class="ttbar"><i id="plbr"></i></div><div class="tts"><span id="plsc">0</span> pts</div></div>
  <button class="bkpz" data-a="plPause" aria-label="Pause"><svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg></button></div>
  <div class="ttw pntw" id="pntw"><canvas id="plcv" class="ttcv"></canvas><div class="ttpop" id="plpop"></div><div class="ttov" id="plov" hidden></div></div>`,1);
 const cv=$('#plcv'),ctx=cv.getContext('2d'),wr=$('#pntw');
 const size=()=>{const avW=Math.min(wr.parentElement.clientWidth||340,460)-8,avH=Math.max(380,innerHeight-178);sc=Math.min(avW/LW,avH/LH);
  cv.width=Math.round(LW*sc*dpr);cv.height=Math.round(LH*sc*dpr);cv.style.width=LW*sc+'px';cv.style.height=LH*sc+'px';SP={}};
 const hud=()=>{const g=L.sc?L.sc:L.N,v=L.sc?Math.min(score,L.sc):Math.min(made[L.T],L.N);
  $('#plg').innerHTML=L.sc?`<b>Objectif</b> ${L.sc} pts`:`<i class="pntgi" style="background:radial-gradient(circle at 35% 30%,${PLCL[L.T][0]},${PLCL[L.T][1]})"></i><span>${PLN[L.T]} ${v}/${L.N}</span>`;
  $('#plbr').style.width=(v*100/g)+'%';$('#plsc').textContent=score};
 const pop=(t,big)=>{const e=$('#plpop');e.textContent=t;e.className='ttpop';void e.offsetWidth;e.className='ttpop on'+(big?' big':'')};
 const burst=(x,y,c,n,sp)=>{for(let i=0;i<n;i++){const a=Math.random()*7,v=(sp||90)*(.4+Math.random());parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-30,l:1,c,s:1.2+Math.random()*2.4})}};
 /* image d’une planète, prête à dessiner (tourne avec la planète) */
 const spr=k=>{if(SP[k])return SP[k];const r=PLR[k],s=sc*dpr,W=Math.ceil(r*2.9*s),o=document.createElement('canvas');o.width=o.height=W;const g=o.getContext('2d');g.translate(W/2,W/2);g.scale(s,s);
  const c=PLCL[k],gr=g.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r);gr.addColorStop(0,c[0]);gr.addColorStop(1,c[1]);
  if(k===9){g.shadowColor='#ffb347';g.shadowBlur=r*.6}
  g.save();g.beginPath();g.arc(0,0,r,0,7);g.fillStyle=gr;g.fill();g.shadowBlur=0;g.clip();
  const blob=(x,y,rx,ry,col,rot)=>{g.fillStyle=col;g.beginPath();g.ellipse(x*r,y*r,rx*r,ry*r,rot||0,0,7);g.fill()};
  if(k===1||k===2){[[-.4,-.3,.16],[.35,.2,.2],[-.1,.5,.12],[.45,-.45,.1]].forEach(a=>blob(a[0],a[1],a[2],a[2],'rgba(80,70,90,.28)'))}
  if(k===3){blob(-.2,.1,.4,.22,'rgba(120,40,20,.35)',.4);blob(.45,-.35,.18,.12,'rgba(255,255,255,.45)')}
  if(k===4){for(let i=-2;i<=2;i++)blob(0,i*.32,1.1,.1,'rgba(255,255,255,.35)',.25)}
  if(k===5){blob(-.3,-.2,.34,.26,'#5cc97a',.5);blob(.35,.3,.3,.2,'#5cc97a',-.4);blob(.1,-.62,.22,.1,'#fff')}
  if(k===6){for(let i=-1;i<=1;i++)blob(0,i*.45,1.1,.12,'rgba(160,200,255,.4)',-.15)}
  if(k===7){for(let i=-2;i<=2;i++)blob(0,i*.3,1.1,.09,'rgba(160,110,50,.3)',.1)}
  if(k===8){[-.6,-.3,0,.3,.6].forEach((y,i)=>blob(0,y,1.1,.11,i%2?'rgba(255,240,210,.5)':'rgba(170,80,40,.4)'));blob(.35,.25,.2,.12,'#d9573a')}
  if(k===9){blob(-.3,-.2,.2,.14,'rgba(255,255,220,.6)');blob(.3,.3,.14,.1,'rgba(255,200,80,.6)')}
  g.restore();
  if(k===7){g.strokeStyle='rgba(240,205,140,.9)';g.lineWidth=r*.16;g.beginPath();g.ellipse(0,0,r*1.42,r*.4,-.35,0,7);g.stroke();g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=r*.04;g.beginPath();g.ellipse(0,0,r*1.42,r*.4,-.35,0,7);g.stroke()}
  if(k===9){g.strokeStyle='rgba(255,200,90,.7)';g.lineWidth=r*.07;g.lineCap='round';for(let i=0;i<12;i++){const a=i/12*6.283;g.beginPath();g.moveTo(Math.cos(a)*r*1.08,Math.sin(a)*r*1.08);g.lineTo(Math.cos(a)*r*1.3,Math.sin(a)*r*1.3);g.stroke()}}
  return SP[k]=o};
 const fall=now=>{cd=now+420;const p=mk(held,Math.max(WL+PLR[held],Math.min(WR-PLR[held],hx)),DY,0,60);held=nxt;nxt=pick();sfx(240,.05)};
 const merge=(a,b)=>{a.dead=b.dead=true;const k=a.k,x=(a.x*a.r*a.r+b.x*b.r*b.r)/(a.r*a.r+b.r*b.r),y=(a.y*a.r*a.r+b.y*b.r*b.r)/(a.r*a.r+b.r*b.r);
  if(k>=9){score+=400;burst(x,y,'#ffe38a',40,260);pop('Supernova !',1);sfx(900,.4);vib([20,40,20]);made[9]++;hud();checkWin();return}
  const n=mk(k+1,x,y,(a.vx+b.vx)/2,(a.vy+b.vy)/2-40);n.w=(a.w+b.w)/2;n.age=1.2;made[k+1]++;score+=(k+2)*(k+2)*2;
  burst(x,y,PLCL[k+1][1],10+k*3,90+k*12);pops.push({x,y,r:n.r,t:performance.now(),c:PLCL[k+1][0]});sfx(300+k*55,.14);vib(k>5?[12,30,12]:6);
  if(k+1>=6)pop(PLN[k+1]+' !',k+1>=8);hud();checkWin()};
 const checkWin=()=>{if(done||over)return;if(goalDone()){done=true;pop('Bravo !',1);ps.forEach(p=>burst(p.x,p.y,PLCL[p.k][0],6,120));setTimeout(win,1600)}};
 const lose=()=>{over=true;const o=$('#plov');o.hidden=false;o.innerHTML=`<div><b>Le bocal déborde</b><p>Les planètes dépassent la ligne.</p><button class="btn" data-a="plCont">Continuer · 1 ❄</button><button class="btn alt" data-a="plRe">Recommencer</button></div>`;requestAnimationFrame(()=>o.classList.add('on'))};
 const hideOv=()=>{const o=$('#plov');o.classList.remove('on');o.hidden=true};
 const fresh=()=>{ps=[];parts=[];pops=[];score=0;made=Array(10).fill(0);over=done=false;danger=0;
  for(let i=0;i<L.pre;i++){const k=Math.floor(R()*3),x=WL+PLR[k]+R()*(WR-WL-2*PLR[k]);mk(k,x,FL-30-i*26-R()*20,0,0)}
  held=pick();nxt=pick();cd=performance.now()+300;hud()};
 act.plCont=()=>{if(!over||!spend(1))return;hideOv();ps=ps.filter(p=>p.y-p.r>LINEY+90);ps.forEach(p=>p.ov=0);over=false;danger=0;cd=performance.now()+500};
 act.plRe=()=>{hideOv();fresh()};
 act.plPause=()=>{if(done||over)return;paused=!paused;const o=$('#plov');if(paused){o.hidden=false;o.innerHTML='<div><b>Pause</b><p>Les planètes attendent.</p><button class="btn" data-a="plPause">Reprendre</button></div>';requestAnimationFrame(()=>o.classList.add('on'))}else hideOv()};
 /* indice : une pluie de météorites retire les trois plus petites planètes */
 act.hint=()=>{if(done||over||!ps.length)return;if(!spend(1))return;const s=ps.slice().sort((a,b)=>a.k-b.k||b.y-a.y).slice(0,3);s.forEach(p=>{p.dead=true;burst(p.x,p.y,'#ffffff',12,120)});ps=ps.filter(p=>!p.dead);msg('Une météorite emporte les trois plus petites planètes.')};
 /* physique : petits pas de temps, collisions entre cercles */
 const phys=h=>{const mg=[];
  for(const p of ps){p.vy+=G*h;p.x+=p.vx*h;p.y+=p.vy*h;p.a+=p.w*h;p.age+=h;
   if(p.x-p.r<WL){p.x=WL+p.r;if(p.vx<0)p.vx*=-E;p.w*=.97}
   if(p.x+p.r>WR){p.x=WR-p.r;if(p.vx>0)p.vx*=-E;p.w*=.97}
   if(p.y+p.r>FL){p.y=FL-p.r;if(p.vy>0)p.vy*=-E;p.vx*=.985;p.w=p.w*.9+p.vx/p.r*.1}}
  for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const a=ps[i],b=ps[j];if(a.dead||b.dead)continue;const dx=b.x-a.x,dy=b.y-a.y,RR=a.r+b.r;if(dx*dx+dy*dy>=RR*RR)continue;
   if(a.k===b.k){a.dead=b.dead=false;mg.push([a,b]);continue}
   const d=Math.sqrt(dx*dx+dy*dy)||.01,nx=dx/d,ny=dy/d,ma=a.r*a.r,mb=b.r*b.r,ov=RR-d,ms=ma+mb;
   a.x-=nx*ov*mb/ms;a.y-=ny*ov*mb/ms;b.x+=nx*ov*ma/ms;b.y+=ny*ov*ma/ms;
   const vn=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
   if(vn<0){const j2=-(1+E)*vn/(1/ma+1/mb);a.vx-=j2*nx/ma;a.vy-=j2*ny/ma;b.vx+=j2*nx/mb;b.vy+=j2*ny/mb;
    const tx=-ny,ty=nx,vt=(b.vx-a.vx)*tx+(b.vy-a.vy)*ty;a.vx+=tx*vt*.06*mb/ms;a.vy+=ty*vt*.06*mb/ms;b.vx-=tx*vt*.06*ma/ms;b.vy-=ty*vt*.06*ma/ms;a.w+=vt*.02/a.r;b.w+=vt*.02/b.r}}
  const used=new Set();mg.forEach(([a,b])=>{if(used.has(a)||used.has(b))return;used.add(a);used.add(b);merge(a,b)});
  if(mg.length)ps=ps.filter(p=>!p.dead)};
 const ease=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),3);
 const face=(p,k)=>{const r=p.r,e=r*.2,y=-r*.05;ctx.fillStyle='rgba(32,26,66,.8)';ctx.beginPath();ctx.arc(p.x-e,p.y+y,r*.07,0,7);ctx.arc(p.x+e,p.y+y,r*.07,0,7);ctx.fill();
  ctx.strokeStyle='rgba(32,26,66,.8)';ctx.lineWidth=Math.max(1,r*.05);ctx.lineCap='round';ctx.beginPath();ctx.arc(p.x,p.y+r*.1,r*.15,.2,Math.PI-.2);ctx.stroke()};
 const drawP=(p,now,al)=>{const t=(now-p.born)/320,k=t<1?1+.16*Math.sin(Math.min(1,t)*Math.PI)*(p.age>1?1:0):1,im=spr(p.k),w=im.width/(sc*dpr)*k;
  ctx.save();ctx.globalAlpha=al==null?1:al;ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.drawImage(im,-w/2,-w/2,w,w);ctx.restore();ctx.globalAlpha=al==null?1:al;face(p,p.k);ctx.globalAlpha=1};
 const draw=now=>{const s=sc*dpr;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,cv.width,cv.height);ctx.setTransform(s,0,0,s,0,0);
  /* bocal */
  ctx.fillStyle='rgba(255,255,255,.045)';ctx.beginPath();ctx.roundRect(WL-3,LINEY-30,WR-WL+6,FL-LINEY+33,[0,0,22,22]);ctx.fill();
  ctx.strokeStyle='rgba(210,230,255,.55)';ctx.lineWidth=3;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(WL-3,LINEY-30);ctx.lineTo(WL-3,FL+3-20);ctx.quadraticCurveTo(WL-3,FL+3,WL+19,FL+3);ctx.lineTo(WR-19,FL+3);ctx.quadraticCurveTo(WR+3,FL+3,WR+3,FL-17);ctx.lineTo(WR+3,LINEY-30);ctx.stroke();
  /* ligne limite */
  ctx.strokeStyle=danger>0?'rgba(255,110,120,'+(.55+.4*Math.sin(now/120))+')':'rgba(255,255,255,.3)';ctx.lineWidth=2;ctx.setLineDash([8,8]);ctx.beginPath();ctx.moveTo(WL,LINEY);ctx.lineTo(WR,LINEY);ctx.stroke();ctx.setLineDash([]);
  /* visée */
  const can=!over&&!done&&!paused&&now>=cd,hxc=Math.max(WL+PLR[held],Math.min(WR-PLR[held],hx));
  if(can){ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=1.5;ctx.setLineDash([3,7]);ctx.beginPath();ctx.moveTo(hxc,DY+PLR[held]);ctx.lineTo(hxc,FL);ctx.stroke();ctx.setLineDash([])}
  if(!over&&!done)drawP({x:hxc,y:DY,r:PLR[held],k:held,a:now/2600,born:0,age:2},now,can?1:.35);
  /* suivante */
  ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='700 11px "Nunito Sans",sans-serif';ctx.textAlign='center';ctx.fillText('Ensuite',318,26);
  {const k=nxt,q={x:318,y:52,r:PLR[k]*.55,k,a:now/3000,born:0,age:2};ctx.save();ctx.translate(318,52);const sk=.55;ctx.scale(sk,sk);ctx.translate(-318,-52);drawP({x:318,y:52,r:PLR[k],k,a:now/3000,born:0,age:2},now);ctx.restore()}
  for(const p of ps)drawP(p,now);
  pops.forEach(q=>{const t=(now-q.t)/450;if(t>=1)return;ctx.strokeStyle='rgba(255,255,255,'+(.7*(1-t))+')';ctx.lineWidth=3*(1-t)+.5;ctx.beginPath();ctx.arc(q.x,q.y,q.r*(1+.8*ease(t)),0,7);ctx.stroke()});pops=pops.filter(q=>now-q.t<450);
  parts.forEach(p=>{ctx.globalAlpha=Math.max(0,Math.min(1,p.l));ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,7);ctx.fill()});ctx.globalAlpha=1};
 const tick=now=>{if(!cv.isConnected)return;requestAnimationFrame(tick);const dt=Math.min(.033,(now-(lastT||now))/1000);lastT=now;
  parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=300*dt;p.l-=dt*1.3});parts=parts.filter(p=>p.l>0);
  if(!paused&&!over){for(let i=0;i<8;i++)phys(dt/8);
   if(!done){let dg=0;for(const p of ps){if(p.age>1.4&&p.y-p.r<LINEY&&Math.hypot(p.vx,p.vy)<80){p.ov+=dt;if(p.ov>dg)dg=p.ov}else p.ov=0}danger=dg;if(dg>2.2)lose()}}
  draw(now)};
 /* commandes : glisser pour placer, lâcher pour laisser tomber */
 const wx=e=>{const r=cv.getBoundingClientRect();return(e.clientX-r.left)/sc};
 let g0=null;
 const gd=e=>{if(!cv.isConnected){document.removeEventListener('pointerdown',gd,true);return}if(e.button>0||done||over||paused)return;const t=e.target;if(t.closest&&t.closest('button,a,input,.top,.ttov,.nav,nav,dialog'))return;
  e.preventDefault();g0=e.pointerId;hx=wx(e)};
 const gm=e=>{if(!cv.isConnected){document.removeEventListener('pointermove',gm);document.removeEventListener('pointerup',gu);return}if(g0===e.pointerId)hx=wx(e)};
 const gu=e=>{if(!cv.isConnected||g0!==e.pointerId)return;g0=null;hx=wx(e);const now=performance.now();if(!done&&!over&&!paused&&now>=cd)fall(now)};
 document.addEventListener('pointerdown',gd,true);document.addEventListener('pointermove',gm);document.addEventListener('pointerup',gu);
 const kd=e=>{if(!cv.isConnected){removeEventListener('keydown',kd);return}const now=performance.now();
  if(e.key==='ArrowLeft'){hx=Math.max(WL,hx-14);e.preventDefault()}else if(e.key==='ArrowRight'){hx=Math.min(WR,hx+14);e.preventDefault()}else if((e.key===' '||e.key==='Enter'||e.key==='ArrowDown')&&!done&&!over&&!paused&&now>=cd){e.preventDefault();fall(now)}};
 addEventListener('keydown',kd);
 const rs=()=>{if(!cv.isConnected){removeEventListener('resize',rs);return}size()};addEventListener('resize',rs);
 window.__PLDBG={ps:()=>ps,made:()=>made,L,win:()=>{made[L.T||0]=99;score=1e5;checkWin()}};
 size();fresh();
 msg(L.pre?'Le bocal est déjà un peu rempli.':'Deux planètes identiques fusionnent en une plus grosse.');
 requestAnimationFrame(tick);
}
