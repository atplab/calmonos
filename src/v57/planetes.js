/* ---------- Planètes : on laisse tomber des planètes, deux pareilles fusionnent en une plus grosse ---------- */
const PLN=['Comète','Lune','Mercure','Mars','Vénus','Terre','Neptune','Saturne','Jupiter','Soleil'];
const PLR=[13,18,23,29,35,42,50,58,67,78];
const PLCL=[['#e8f8ff','#7fc8ff'],['#f0f0f6','#9a9ab0'],['#d9c4b4','#85705f'],['#ffa77e','#b8402a'],['#fff0b8','#d9a64c'],['#8fd0ff','#2a63c8'],['#7f98ff','#2a2f9a'],['#f6dca8','#b88a4a'],['#f4c995','#b0603a'],['#fff4a8','#ff8a2a']];
const PLFN=['Cerise','Fraise','Raisin','Clémentine','Kaki','Pomme','Pêche','Ananas','Melon','Pastèque'];
const PLFC=[['#ff9aaa','#c8102e'],['#ffa08a','#e0302a'],['#d6b3ff','#6a2a9a'],['#ffd890','#ff8a1a'],['#ffbf7a','#e0601a'],['#ffb0a8','#d8202a'],['#ffe6d2','#ff8a6a'],['#fff2a0','#e0a82a'],['#e8ffc0','#86c64a'],['#8ae07a','#1f7a3a']];
const PLWN=['Bulle','Perle','Oursin','Méduse','Coquillage','Poisson-globe','Tortue','Pieuvre','Poisson-lune','Baleine'];
const PLWC=[['#ffffff','#8ad0ff'],['#ffffff','#d0c8e4'],['#d9b8ff','#5a2a8a'],['#ffe0f6','#c87ae0'],['#ffe8dc','#ff9a8a'],['#fff4b0','#e8b82a'],['#c8f0a0','#3a8a4a'],['#ffc0b0','#e0503a'],['#e4ecf6','#7a8aa8'],['#9ac4ff','#2a4a9a']];
const plMd=()=>{try{const m=st.get('pl:mode','');return m==='orbite'||m==='eau'?m:''}catch(e){return''}};
function plLv(l){const T=Math.min(8,3+Math.floor(l/5)),sc=(l>=20&&l%5===4&&l!==39)?800+(l-20)*120:0;
 return{T:sc?0:T,N:sc?0:(l===39?2:T>=7?1:1+(l%5>=3?1:0)),sc,km:Math.min(4,2+Math.floor(l/10)),pre:l%4===3?6+Math.min(6,l>>2):0}}

function plModeCard(){const m=plMd();
 return`<section class="rc plmode" data-g="●"><div class="rc-t"><small>Mode de jeu</small><b>${m==='orbite'?'Orbite':m==='eau'?'Sous l’eau':'Fruits'}</b><span>${m==='orbite'?'Un bocal rond : les planètes sont attirées vers le centre.':m==='eau'?'Les objets marins remontent vers la surface.':'Les fruits tombent au fond du bocal.'}</span></div><div class="plseg"><button class="${m?'':'on'}" data-a="plMode" data-v="">Fruits</button><button class="${m==='orbite'?'on':''}" data-a="plMode" data-v="orbite">Orbite</button><button class="${m==='eau'?'on':''}" data-a="plMode" data-v="eau">Sous l’eau</button></div></section>`}
function pPlan(r){
 const MD=plMd(),OR=MD==='orbite',UW=MD==='eau',NM=OR?PLN:UW?PLWN:PLFN,CL=OR?PLCL:UW?PLWC:PLFN.map((_,i)=>PLFC[i]),NOUN=OR?'planètes':UW?'objets':'fruits',CE=32,LU=442,DU=490,RK=OR?.84:1,PR=k=>PLR[k]*RK,CX=180,CY=312,RA=152,GC=1000,PI=Math.PI;
 const INF=INFG==='planetes',L=INF?{T:0,N:0,sc:0,km:2,pre:0}:plLv(lv),LW=360,LH=560,WL=24,WR=336,FL=528,LINEY=118,DY=70,G=1500,E=.14;
 let ps=[],parts=[],pops=[],id=0,score=0,made=Array(10).fill(0),hx=LW/2,aimA=-PI/2,aim=false,held=0,nxt=0,cd=0,over=false,done=false,paused=false,lastT=0,sc=1,dpr=Math.min(2,devicePixelRatio||1),SP={},danger=0;
 snap=INF?null:()=>({});
 const R=rng((lv+5)*6007+11);
 const pick=()=>{const w=[];const km=INF?Math.min(4,2+Math.floor(score/2500)):L.km;for(let k=0;k<=km;k++)w.push(Math.pow(.62,k));const s=w.reduce((a,b)=>a+b);let x=Math.random()*s;for(let k=0;k<w.length;k++){x-=w[k];if(x<=0)return k}return 0};
 const mk=(k,x,y,vx,vy)=>{const p={id:++id,k,r:PR(k),x,y,vx:vx||0,vy:vy||0,a:Math.random()*6,w:0,born:performance.now(),age:0,ov:0,dead:false};ps.push(p);return p};
 const goalDone=()=>INF?false:L.sc?score>=L.sc:made[L.T]>=L.N;
 frame(`<div class="bkh"><div class="pntg" id="plg"></div><div class="ttmid"><div class="ttbar"><i id="plbr"></i></div><div class="tts"><span id="plsc">0</span> pts</div></div>
  <button class="bkpz" data-a="plPause" aria-label="Pause"><svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg></button></div>
  <div class="ttw pntw" id="pntw"><canvas id="plcv" class="ttcv"></canvas><div class="ttpop" id="plpop"></div><div class="ttov" id="plov" hidden></div></div>`,1);
 const cv=$('#plcv'),ctx=cv.getContext('2d'),wr=$('#pntw');
 const size=()=>{const avW=Math.min(wr.parentElement.clientWidth||340,460)-8,avH=Math.max(380,innerHeight-178);sc=Math.min(avW/LW,avH/LH);
  cv.width=Math.round(LW*sc*dpr);cv.height=Math.round(LH*sc*dpr);cv.style.width=LW*sc+'px';cv.style.height=LH*sc+'px';SP={}};
 const hud=()=>{if(INF){$('#plg').innerHTML='<b>Mode infini</b>';$('#plbr').style.width=Math.min(100,score%2500/25)+'%';$('#plsc').textContent=score;return}const g=L.sc?L.sc:L.N,v=L.sc?Math.min(score,L.sc):Math.min(made[L.T],L.N);
  $('#plg').innerHTML=L.sc?`<b>Objectif</b> ${L.sc} pts`:`<i class="pntgi" style="background:radial-gradient(circle at 35% 30%,${CL[L.T][0]},${CL[L.T][1]})"></i><span>${NM[L.T]} ${v}/${L.N}</span>`;
  $('#plbr').style.width=(v*100/g)+'%';$('#plsc').textContent=score};
 const pop=(t,big)=>{const e=$('#plpop');e.textContent=t;e.className='ttpop';void e.offsetWidth;e.className='ttpop on'+(big?' big':'')};
 const burst=(x,y,c,n,sp)=>{for(let i=0;i<n;i++){const a=Math.random()*7,v=(sp||90)*(.4+Math.random());parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-30,l:1,c,s:1.2+Math.random()*2.4})}};
 /* image d’une planète, prête à dessiner (tourne avec la planète) */
 const spr=k=>{if(SP[k])return SP[k];const r=PR(k),s=sc*dpr,W=Math.ceil(r*2.9*s),o=document.createElement('canvas');o.width=o.height=W;const g=o.getContext('2d');g.translate(W/2,W/2);g.scale(s,s);
  const c=CL[k],gr=g.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r);gr.addColorStop(0,c[0]);gr.addColorStop(1,c[1]);
  if(k===9&&OR){g.shadowColor='#ffb347';g.shadowBlur=r*.6}
  g.save();g.beginPath();g.arc(0,0,r,0,7);g.fillStyle=gr;g.fill();g.shadowBlur=0;g.clip();
  const blob=(x,y,rx,ry,col,rot)=>{g.fillStyle=col;g.beginPath();g.ellipse(x*r,y*r,rx*r,ry*r,rot||0,0,7);g.fill()};
  if(OR){
  if(k===1||k===2){[[-.4,-.3,.16],[.35,.2,.2],[-.1,.5,.12],[.45,-.45,.1]].forEach(a=>blob(a[0],a[1],a[2],a[2],'rgba(80,70,90,.28)'))}
  if(k===3){blob(-.2,.1,.4,.22,'rgba(120,40,20,.35)',.4);blob(.45,-.35,.18,.12,'rgba(255,255,255,.45)')}
  if(k===4){for(let i=-2;i<=2;i++)blob(0,i*.32,1.1,.1,'rgba(255,255,255,.35)',.25)}
  if(k===5){blob(-.3,-.2,.34,.26,'#5cc97a',.5);blob(.35,.3,.3,.2,'#5cc97a',-.4);blob(.1,-.62,.22,.1,'#fff')}
  if(k===6){for(let i=-1;i<=1;i++)blob(0,i*.45,1.1,.12,'rgba(160,200,255,.4)',-.15)}
  if(k===7){for(let i=-2;i<=2;i++)blob(0,i*.3,1.1,.09,'rgba(160,110,50,.3)',.1)}
  if(k===8){[-.6,-.3,0,.3,.6].forEach((y,i)=>blob(0,y,1.1,.11,i%2?'rgba(255,240,210,.5)':'rgba(170,80,40,.4)'));blob(.35,.25,.2,.12,'#d9573a')}
  if(k===9){blob(-.3,-.2,.2,.14,'rgba(255,255,220,.6)');blob(.3,.3,.14,.1,'rgba(255,200,80,.6)')}
  }else if(UW){
  if(k===0){blob(-.35,-.35,.22,.14,'rgba(255,255,255,.9)',-.6);blob(.3,.35,.1,.06,'rgba(255,255,255,.6)')}
  if(k===1){blob(-.3,-.35,.28,.18,'rgba(255,255,255,.95)',-.5);blob(.2,.4,.4,.2,'rgba(200,180,230,.35)')}
  if(k===2){[[-.3,-.2],[.25,.3],[.3,-.35],[-.2,.4]].forEach(a=>blob(a[0],a[1],.12,.12,'rgba(255,255,255,.35)'))}
  if(k===3){for(let i=-1;i<=1;i++)blob(i*.35,.1,.12,.5,'rgba(255,255,255,.3)');blob(0,-.45,.6,.2,'rgba(255,255,255,.35)')}
  if(k===4){g.strokeStyle='rgba(200,90,90,.4)';g.lineWidth=r*.06;for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(0,r*.95);g.lineTo(i*r*.32,-r);g.stroke()}}
  if(k===5){blob(0,-.4,.9,.45,'rgba(200,140,30,.35)');for(let i=0;i<8;i++)blob(Math.cos(i)*.55,Math.sin(i*1.7)*.5,.05,.05,'rgba(140,90,20,.6)')}
  if(k===6){[[0,0,.32],[-.5,-.3,.2],[.5,-.3,.2],[-.5,.35,.2],[.5,.35,.2],[0,-.62,.16],[0,.62,.16]].forEach(a=>blob(a[0],a[1],a[2],a[2]*.85,'rgba(30,90,40,.4)'))}
  if(k===7){[[-.3,-.35,.1],[.25,-.4,.12],[.4,0,.08],[-.45,.05,.07]].forEach(a=>blob(a[0],a[1],a[2],a[2],'rgba(255,230,220,.55)'))}
  if(k===8){for(let i=-2;i<=2;i++)blob(0,i*.3,1.1,.06,'rgba(255,255,255,.3)')}
  if(k===9){blob(0,.55,.9,.35,'rgba(220,235,255,.55)');for(let i=0;i<4;i++)blob(0,.38+i*.13,.85,.025,'rgba(30,60,140,.4)')}
  }else{
  if(k===0||k===5){blob(-.35,-.35,.22,.14,'rgba(255,255,255,.55)',-.6)}
  if(k===1){for(let y=-.4;y<=.6;y+=.28)for(let x=-.6;x<=.6;x+=.3)blob(x+(Math.round(y*10)%2?.15:0),y,.04,.06,'#ffe27a')}
  if(k===2){[[-.35,-.35],[.25,-.4],[0,0],[-.4,.3],[.35,.25],[0,.55],[.5,-.05]].forEach(a=>{blob(a[0],a[1],.26,.26,'rgba(90,20,130,.35)');blob(a[0]-.08,a[1]-.08,.07,.05,'rgba(255,255,255,.5)')})}
  if(k===3){for(let i=0;i<14;i++)blob(Math.cos(i*2.4)*.6,Math.sin(i*2.4)*.6,.03,.03,'rgba(200,90,0,.4)');blob(-.3,-.35,.2,.12,'rgba(255,255,255,.4)',-.5)}
  if(k===4){blob(-.3,-.3,.2,.12,'rgba(255,255,255,.4)',-.5)}
  if(k===6){g.strokeStyle='rgba(220,90,70,.45)';g.lineWidth=r*.07;g.beginPath();g.moveTo(-r*.1,-r);g.quadraticCurveTo(r*.35,0,-r*.05,r);g.stroke();blob(.35,.1,.4,.45,'rgba(255,110,90,.3)')}
  if(k===7){g.strokeStyle='rgba(170,110,20,.45)';g.lineWidth=r*.05;for(let i=-4;i<=4;i++){g.beginPath();g.moveTo(i*r*.35-r,-r);g.lineTo(i*r*.35+r,r);g.stroke();g.beginPath();g.moveTo(i*r*.35+r,-r);g.lineTo(i*r*.35-r,r);g.stroke()}}
  if(k===8){g.strokeStyle='rgba(255,255,230,.55)';g.lineWidth=r*.035;for(let i=-4;i<=4;i++){g.beginPath();g.moveTo(i*r*.3,-r);g.quadraticCurveTo(i*r*.3+r*.2,0,i*r*.3,r);g.stroke();g.beginPath();g.moveTo(-r,i*r*.3);g.quadraticCurveTo(0,i*r*.3+r*.2,r,i*r*.3);g.stroke()}}
  if(k===9){g.strokeStyle='rgba(20,70,30,.7)';g.lineWidth=r*.13;for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(i*r*.32,-r);for(let t=-1;t<=1;t+=.25)g.lineTo(i*r*.32+(Math.round(t*4)%2?r*.07:-r*.07),t*r);g.stroke()}}
  }
  g.restore();
  if(!OR){const lf=(x,y,a,l,c)=>{g.fillStyle=c||'#4aa83a';g.save();g.translate(x*r,y*r);g.rotate(a);g.beginPath();g.ellipse(0,-l*r/2,l*r*.22,l*r/2,0,0,7);g.fill();g.restore()};
   if(!UW){if(k===0||k===5){g.strokeStyle='#6a4a2a';g.lineWidth=r*.09;g.lineCap='round';g.beginPath();g.moveTo(0,-r*.85);g.quadraticCurveTo(r*.1,-r*1.2,r*.3,-r*1.35);g.stroke();lf(.3,-1.2,1.1,.45)}
    if(k===1){for(let i=-2;i<=2;i++)lf(i*.18,-.85,i*.5,.42,'#3aa83a')}
    if(k===3)lf(.15,-.9,.6,.38);if(k===4){for(let i=0;i<4;i++)lf(0,-.9,i*1.57+.78,.32,'#2f6a2a')}
    if(k===7){for(let i=-2;i<=2;i++)lf(i*.14,-.85,i*.35,.7,'#3a9a3a')}}
   else{g.lineCap='round';
    if(k===2){g.strokeStyle='#7a3ab8';g.lineWidth=r*.06;for(let i=0;i<20;i++){const a=i/20*6.283;g.beginPath();g.moveTo(Math.cos(a)*r*.95,Math.sin(a)*r*.95);g.lineTo(Math.cos(a)*r*1.28,Math.sin(a)*r*1.28);g.stroke()}}
    if(k===3){g.strokeStyle='rgba(220,140,230,.8)';g.lineWidth=r*.07;for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(i*r*.3,r*.8);g.quadraticCurveTo(i*r*.3+r*.15,r*1.1,i*r*.3,r*1.35);g.stroke()}}
    if(k===5){g.strokeStyle='#c8961a';g.lineWidth=r*.05;for(let i=0;i<14;i++){const a=i/14*6.283;g.beginPath();g.moveTo(Math.cos(a)*r*.97,Math.sin(a)*r*.97);g.lineTo(Math.cos(a)*r*1.14,Math.sin(a)*r*1.14);g.stroke()}}
    if(k===7){g.fillStyle='#e0503a';for(let i=-3;i<=3;i++){g.beginPath();g.arc(i*r*.26,r*.95,r*.13,0,7);g.fill()}}
    if(k===8){g.fillStyle='#7a8aa8';g.beginPath();g.moveTo(-r*.2,-r*.9);g.lineTo(0,-r*1.35);g.lineTo(r*.2,-r*.9);g.fill();g.beginPath();g.moveTo(-r*.2,r*.9);g.lineTo(0,r*1.35);g.lineTo(r*.2,r*.9);g.fill()}
    if(k===9){g.fillStyle='rgba(200,230,255,.85)';[[-.2,-1.25,.09],[0,-1.4,.11],[.2,-1.25,.09]].forEach(a=>{g.beginPath();g.arc(a[0]*r,a[1]*r,a[2]*r,0,7);g.fill()})}}}
  if(k===7&&OR){g.strokeStyle='rgba(240,205,140,.9)';g.lineWidth=r*.16;g.beginPath();g.ellipse(0,0,r*1.42,r*.4,-.35,0,7);g.stroke();g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=r*.04;g.beginPath();g.ellipse(0,0,r*1.42,r*.4,-.35,0,7);g.stroke()}
  if(k===9&&OR){g.strokeStyle='rgba(255,200,90,.7)';g.lineWidth=r*.07;g.lineCap='round';for(let i=0;i<12;i++){const a=i/12*6.283;g.beginPath();g.moveTo(Math.cos(a)*r*1.08,Math.sin(a)*r*1.08);g.lineTo(Math.cos(a)*r*1.3,Math.sin(a)*r*1.3);g.stroke()}}
  return SP[k]=o};
 const lp=k=>{const d=RA+PR(k)+16,x=CX+Math.cos(aimA)*d,y=CY+Math.sin(aimA)*d;return[Math.max(PR(k)+3,Math.min(LW-PR(k)-3,x)),Math.max(PR(k)+3,Math.min(LH-PR(k)-3,y))]};
 const fall=now=>{cd=now+420;if(OR){const[x,y]=lp(held),d=Math.hypot(CX-x,CY-y)||1,p=mk(held,x,y,(CX-x)/d*470,(CY-y)/d*470);p.in=false}else mk(held,Math.max(WL+PR(held),Math.min(WR-PR(held),hx)),UW?DU:DY,0,UW?-25:60);held=nxt;nxt=pick();sfx(240,.05)};
 const merge=(a,b)=>{a.dead=b.dead=true;const k=a.k,x=(a.x*a.r*a.r+b.x*b.r*b.r)/(a.r*a.r+b.r*b.r),y=(a.y*a.r*a.r+b.y*b.r*b.r)/(a.r*a.r+b.r*b.r);
  if(k>=9){score+=400;burst(x,y,'#ffe38a',40,260);pop(OR?'Supernova !':UW?'Raz-de-marée !':'Super pastèque !',1);sfx(900,.4);vib([20,40,20]);made[9]++;hud();checkWin();return}
  const n=mk(k+1,x,y,(a.vx+b.vx)/2,(a.vy+b.vy)/2-40);n.w=(a.w+b.w)/2;n.age=1.2;made[k+1]++;score+=(k+2)*(k+2)*2;
  burst(x,y,CL[k+1][1],10+k*3,90+k*12);pops.push({x,y,r:n.r,t:performance.now(),c:CL[k+1][0]});sfx(300+k*55,.14);vib(k>5?[12,30,12]:6);
  if(k+1>=6)pop(NM[k+1]+' !',k+1>=8);hud();checkWin()};
 const checkWin=()=>{if(done||over)return;if(goalDone()){done=true;pop('Bravo !',1);ps.forEach(p=>burst(p.x,p.y,CL[p.k][0],6,120));setTimeout(win,1600)}};
 const lose=()=>{over=true;const o=$('#plov');o.hidden=false;if(INF){const nb=infSave('planetes',score);o.innerHTML=`<div><b>Fin de partie</b><p>Score : ${score} pts${nb?' · nouveau record !':' · record : '+infBest('planetes')+' pts'}</p><button class="btn" data-a="plRe">Rejouer</button></div>`;requestAnimationFrame(()=>o.classList.add('on'));return}o.innerHTML=`<div><b>Le bocal déborde</b><p>Les ${NOUN} dépassent la ligne.</p><button class="btn" data-a="plCont">Continuer · 1 ❄</button><button class="btn alt" data-a="plRe">Recommencer</button></div>`;requestAnimationFrame(()=>o.classList.add('on'))};
 const hideOv=()=>{const o=$('#plov');o.classList.remove('on');o.hidden=true};
 const fresh=()=>{ps=[];parts=[];pops=[];score=0;made=Array(10).fill(0);over=done=false;danger=0;
  for(let i=0;i<L.pre;i++){const k=Math.floor(R()*3);if(OR){const a=R()*PI*2,d=R()*70;const p=mk(k,CX+Math.cos(a)*d,CY+Math.sin(a)*d,0,0);p.in=true}else{const x=WL+PR(k)+R()*(WR-WL-2*PR(k));mk(k,x,UW?CE+30+i*26+R()*20:FL-30-i*26-R()*20,0,0)}}
  held=pick();nxt=pick();cd=performance.now()+300;hud()};
 act.plCont=()=>{if(!over||!spend(1))return;hideOv();ps=ps.filter(p=>UW?p.y+p.r<LU-90:p.y-p.r>LINEY+90);ps.forEach(p=>p.ov=0);over=false;danger=0;cd=performance.now()+500};
 act.plRe=()=>{hideOv();fresh()};
 act.plPause=()=>{if(done||over)return;paused=!paused;const o=$('#plov');if(paused){o.hidden=false;o.innerHTML='<div><b>Pause</b><p>Les '+NOUN+' attendent.</p><button class="btn" data-a="plPause">Reprendre</button></div>';requestAnimationFrame(()=>o.classList.add('on'))}else hideOv()};
 /* indice : une pluie de météorites retire les trois plus petites planètes */
 act.hint=()=>{if(done||over||!ps.length)return;if(!spend(1))return;const s=ps.slice().sort((a,b)=>a.k-b.k||b.y-a.y).slice(0,3);s.forEach(p=>{p.dead=true;burst(p.x,p.y,'#ffffff',12,120)});ps=ps.filter(p=>!p.dead);msg(OR?'Une météorite emporte les trois plus petites planètes.':UW?'Un courant emporte les trois plus petits objets.':'Un petit oiseau picore les trois plus petits fruits.')};
 /* physique : petits pas de temps, collisions entre cercles */
 const phys=h=>{const mg=[];
  for(const p of ps){
   if(OR){const dx=CX-p.x,dy=CY-p.y,d=Math.hypot(dx,dy)||1;p.vx+=dx/d*GC*h;p.vy+=dy/d*GC*h;if(p.in){p.vx*=1-1.5*h;p.vy*=1-1.5*h}p.w*=1-1.6*h;if(Math.abs(p.w)<.05)p.w=0;p.x+=p.vx*h;p.y+=p.vy*h;p.a+=p.w*h;p.age+=h;
    const c=Math.hypot(p.x-CX,p.y-CY)||1;if(!p.in){if(c+p.r<RA-1)p.in=true;continue}
    if(c+p.r>RA){const nx=(p.x-CX)/c,ny=(p.y-CY)/c;p.x=CX+nx*(RA-p.r);p.y=CY+ny*(RA-p.r);const vr=p.vx*nx+p.vy*ny;if(vr>0){p.vx-=(1+E)*vr*nx;p.vy-=(1+E)*vr*ny}p.w*=.9;{const tx=-ny,ty=nx,vt=p.vx*tx+p.vy*ty;p.vx-=tx*vt*.25;p.vy-=ty*vt*.25}}
    continue}
   if(UW){p.vy-=G*.15*h;p.vx*=1-2.2*h;p.vy*=1-1.9*h;p.w*=1-1.2*h}else p.vy+=G*h;p.x+=p.vx*h;p.y+=p.vy*h;p.a+=p.w*h;p.age+=h;
   if(p.x-p.r<WL){p.x=WL+p.r;if(p.vx<0)p.vx*=-E;p.w*=.97}
   if(p.x+p.r>WR){p.x=WR-p.r;if(p.vx>0)p.vx*=-E;p.w*=.97}
   if(UW){if(p.y-p.r<CE){p.y=CE+p.r;if(p.vy<0)p.vy*=-E;p.vx*=.985;p.w=p.w*.9-p.vx/p.r*.1}}else if(p.y+p.r>FL){p.y=FL-p.r;if(p.vy>0)p.vy*=-E;p.vx*=.985;p.w=p.w*.9+p.vx/p.r*.1}}
  for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const a=ps[i],b=ps[j];if(a.dead||b.dead)continue;const dx=b.x-a.x,dy=b.y-a.y,RR=a.r+b.r;if(dx*dx+dy*dy>=RR*RR)continue;
   if(a.k===b.k){a.dead=b.dead=false;mg.push([a,b]);continue}
   const d=Math.sqrt(dx*dx+dy*dy)||.01,nx=dx/d,ny=dy/d,ma=a.r*a.r,mb=b.r*b.r,ov=RR-d,ms=ma+mb;
   a.x-=nx*ov*mb/ms;a.y-=ny*ov*mb/ms;b.x+=nx*ov*ma/ms;b.y+=ny*ov*ma/ms;
   const vn=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
   if(vn<0){const j2=-(1+(UW?.04:E))*vn/(1/ma+1/mb);a.vx-=j2*nx/ma;a.vy-=j2*ny/ma;b.vx+=j2*nx/mb;b.vy+=j2*ny/mb;
    const tx=-ny,ty=nx,vt=(b.vx-a.vx)*tx+(b.vy-a.vy)*ty;a.vx+=tx*vt*.06*mb/ms;a.vy+=ty*vt*.06*mb/ms;b.vx-=tx*vt*.06*ma/ms;b.vy-=ty*vt*.06*ma/ms;a.w+=vt*.02/a.r;b.w+=vt*.02/b.r}}
  const used=new Set();mg.forEach(([a,b])=>{if(used.has(a)||used.has(b))return;used.add(a);used.add(b);merge(a,b)});
  if(mg.length)ps=ps.filter(p=>!p.dead)};
 const ease=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),3);
 const face=(p,k)=>{const r=p.r,e=r*.2,y=-r*.05;ctx.fillStyle='rgba(32,26,66,.8)';ctx.beginPath();ctx.arc(p.x-e,p.y+y,r*.07,0,7);ctx.arc(p.x+e,p.y+y,r*.07,0,7);ctx.fill();
  ctx.strokeStyle='rgba(32,26,66,.8)';ctx.lineWidth=Math.max(1,r*.05);ctx.lineCap='round';ctx.beginPath();ctx.arc(p.x,p.y+r*.1,r*.15,.2,Math.PI-.2);ctx.stroke()};
 const drawP=(p,now,al)=>{const t=(now-p.born)/320,k=t<1?1+.16*Math.sin(Math.min(1,t)*Math.PI)*(p.age>1?1:0):1,im=spr(p.k),w=im.width/(sc*dpr)*k;
  ctx.save();ctx.globalAlpha=al==null?1:al;ctx.translate(p.x,p.y);ctx.rotate(p.a);ctx.drawImage(im,-w/2,-w/2,w,w);ctx.restore();ctx.globalAlpha=al==null?1:al;face(p,p.k);ctx.globalAlpha=1};
 const draw=now=>{const s=sc*dpr;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,cv.width,cv.height);ctx.setTransform(s,0,0,s,0,0);
  const can=!over&&!done&&!paused&&now>=cd;
  if(OR){const gr=ctx.createRadialGradient(CX,CY,10,CX,CY,RA);gr.addColorStop(0,'rgba(255,210,170,.16)');gr.addColorStop(1,'rgba(255,255,255,.06)');ctx.fillStyle=gr;ctx.beginPath();ctx.arc(CX,CY,RA+3,0,7);ctx.fill();
   ctx.strokeStyle=danger>0?'rgba(255,110,120,'+(.6+.4*Math.sin(now/120))+')':'rgba(210,230,255,.6)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(CX,CY,RA+3,0,7);ctx.stroke();
   ctx.fillStyle='rgba(255,230,180,.5)';ctx.beginPath();ctx.arc(CX,CY,4,0,7);ctx.fill();
   const[hx2,hy2]=lp(held);if(can){ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=1.8;ctx.setLineDash([5,8]);ctx.beginPath();ctx.moveTo(hx2,hy2);ctx.lineTo(CX,CY);ctx.stroke();ctx.setLineDash([])}
   if(!over&&!done)drawP({x:hx2,y:hy2,r:PR(held),k:held,a:now/2600,born:0,age:2},now,can?1:.35)}
  else if(UW){
  const gw=ctx.createLinearGradient(0,CE,0,LU+30);gw.addColorStop(0,'rgba(120,200,255,.22)');gw.addColorStop(1,'rgba(40,90,200,.12)');ctx.fillStyle=gw;ctx.beginPath();ctx.roundRect(WL-3,CE-3,WR-WL+6,LU-CE+33,[22,22,0,0]);ctx.fill();
  for(let i=0;i<9;i++){const bx=WL+((i*53)%(WR-WL)),by=LU+20-((now/22+i*67)%(LU-CE)),br=2+i%3;ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(bx,by,br,0,7);ctx.stroke()}
  ctx.strokeStyle='rgba(210,230,255,.55)';ctx.lineWidth=3;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(WL-3,LU+30);ctx.lineTo(WL-3,CE-3+20);ctx.quadraticCurveTo(WL-3,CE-3,WL+19,CE-3);ctx.lineTo(WR-19,CE-3);ctx.quadraticCurveTo(WR+3,CE-3,WR+3,CE+17);ctx.lineTo(WR+3,LU+30);ctx.stroke();
  ctx.strokeStyle=danger>0?'rgba(255,110,120,'+(.55+.4*Math.sin(now/120))+')':'rgba(255,255,255,.3)';ctx.lineWidth=2;ctx.setLineDash([8,8]);ctx.beginPath();ctx.moveTo(WL,LU);ctx.lineTo(WR,LU);ctx.stroke();ctx.setLineDash([]);
  const hxc=Math.max(WL+PR(held),Math.min(WR-PR(held),hx));
  if(can){ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=1.5;ctx.setLineDash([3,7]);ctx.beginPath();ctx.moveTo(hxc,DU-PR(held));ctx.lineTo(hxc,CE);ctx.stroke();ctx.setLineDash([])}
  if(!over&&!done)drawP({x:hxc,y:DU,r:PR(held),k:held,a:now/2600,born:0,age:2},now,can?1:.35)}
  else{
  ctx.fillStyle='rgba(255,255,255,.045)';ctx.beginPath();ctx.roundRect(WL-3,LINEY-30,WR-WL+6,FL-LINEY+33,[0,0,22,22]);ctx.fill();
  ctx.strokeStyle='rgba(210,230,255,.55)';ctx.lineWidth=3;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(WL-3,LINEY-30);ctx.lineTo(WL-3,FL+3-20);ctx.quadraticCurveTo(WL-3,FL+3,WL+19,FL+3);ctx.lineTo(WR-19,FL+3);ctx.quadraticCurveTo(WR+3,FL+3,WR+3,FL-17);ctx.lineTo(WR+3,LINEY-30);ctx.stroke();
  ctx.strokeStyle=danger>0?'rgba(255,110,120,'+(.55+.4*Math.sin(now/120))+')':'rgba(255,255,255,.3)';ctx.lineWidth=2;ctx.setLineDash([8,8]);ctx.beginPath();ctx.moveTo(WL,LINEY);ctx.lineTo(WR,LINEY);ctx.stroke();ctx.setLineDash([]);
  const hxc=Math.max(WL+PR(held),Math.min(WR-PR(held),hx));
  if(can){ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=1.5;ctx.setLineDash([3,7]);ctx.beginPath();ctx.moveTo(hxc,DY+PR(held));ctx.lineTo(hxc,FL);ctx.stroke();ctx.setLineDash([])}
  if(!over&&!done)drawP({x:hxc,y:DY,r:PR(held),k:held,a:now/2600,born:0,age:2},now,can?1:.35)}
  /* suivante */
  ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='700 11px "Nunito Sans",sans-serif';ctx.textAlign='center';const NY=UW?LH-46:52;ctx.fillText('Ensuite',318,UW?LH-8:26);
  {const k=nxt;ctx.save();ctx.translate(318,NY);const sk=.55;ctx.scale(sk,sk);ctx.translate(-318,-NY);drawP({x:318,y:NY,r:PR(k),k,a:now/3000,born:0,age:2},now);ctx.restore()}
  for(const p of ps)drawP(p,now);
  pops.forEach(q=>{const t=(now-q.t)/450;if(t>=1)return;ctx.strokeStyle='rgba(255,255,255,'+(.7*(1-t))+')';ctx.lineWidth=3*(1-t)+.5;ctx.beginPath();ctx.arc(q.x,q.y,q.r*(1+.8*ease(t)),0,7);ctx.stroke()});pops=pops.filter(q=>now-q.t<450);
  parts.forEach(p=>{ctx.globalAlpha=Math.max(0,Math.min(1,p.l));ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,7);ctx.fill()});ctx.globalAlpha=1};
 const tick=now=>{if(!cv.isConnected)return;requestAnimationFrame(tick);const dt=Math.min(.033,(now-(lastT||now))/1000);lastT=now;
  parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=300*dt;p.l-=dt*1.3});parts=parts.filter(p=>p.l>0);
  if(!paused&&!over){for(let i=0;i<8;i++)phys(dt/8);
   if(!done){let dg=0;for(const p of ps){if(p.age>1.4&&(OR?p.in&&Math.hypot(p.x-CX,p.y-CY)+p.r>RA-5:UW?p.y+p.r>LU:p.y-p.r<LINEY)&&Math.hypot(p.vx,p.vy)<80){p.ov+=dt;if(p.ov>dg)dg=p.ov}else p.ov=0}danger=dg;if(dg>2.2)lose()}}
  draw(now)};
 /* commandes : glisser pour placer, lâcher pour laisser tomber */
 const setAim=e=>{const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/sc,y=(e.clientY-r.top)/sc;hx=x;if(OR)aimA=Math.atan2(y-CY,x-CX)};
 let g0=null;
 const gd=e=>{if(!cv.isConnected){document.removeEventListener('pointerdown',gd,true);return}if(e.button>0||done||over||paused)return;const t=e.target;if(t.closest&&t.closest('button,a,input,.top,.ttov,.nav,nav,dialog'))return;
  e.preventDefault();g0=e.pointerId;setAim(e)};
 const gm=e=>{if(!cv.isConnected){document.removeEventListener('pointermove',gm);document.removeEventListener('pointerup',gu);return}if(g0===e.pointerId)setAim(e)};
 const gu=e=>{if(!cv.isConnected||g0!==e.pointerId)return;g0=null;setAim(e);const now=performance.now();if(!done&&!over&&!paused&&now>=cd)fall(now)};
 document.addEventListener('pointerdown',gd,true);document.addEventListener('pointermove',gm);document.addEventListener('pointerup',gu);
 const kd=e=>{if(!cv.isConnected){removeEventListener('keydown',kd);return}const now=performance.now();
  if(e.key==='ArrowLeft'){hx=Math.max(WL,hx-14);aimA-=.12;e.preventDefault()}else if(e.key==='ArrowRight'){hx=Math.min(WR,hx+14);aimA+=.12;e.preventDefault()}else if((e.key===' '||e.key==='Enter'||e.key==='ArrowDown')&&!done&&!over&&!paused&&now>=cd){e.preventDefault();fall(now)}};
 addEventListener('keydown',kd);
 const rs=()=>{if(!cv.isConnected){removeEventListener('resize',rs);return}size()};addEventListener('resize',rs);
 window.__PLDBG={OR,ps:()=>ps,made:()=>made,L,win:()=>{made[L.T||0]=99;score=1e5;checkWin()}};
 size();fresh();
  msg(OR?'Mode Orbite : les planètes sont attirées vers le centre.':UW?'Sous l’eau : les objets remontent vers la surface. Deux pareils fusionnent.':L.pre?'Le bocal est déjà un peu rempli.':'Deux fruits identiques fusionnent en un plus gros.');
 requestAnimationFrame(tick);
}
