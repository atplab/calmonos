/* ---------- Casse-glace : une balle, une plateforme, des briques de glace douce ---------- */
const BKC=['#ff9fb2','#ffb991','#ffdc8f','#b3e8a6','#93d8f5','#a3b6ff','#c8adff'];
const BKN=50;
/* niveaux spéciaux, un sur quatre : ice glace incassable · multi trois balles · move rangées qui glissent · bomb briques qui éclatent · cry cristaux à libérer · down les briques descendent */
const BKS=['multi','ice','move','bomb','cry','down'];
const BKH=[[0,0,1,1,0,0,1,1,0,0],[0,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[0,1,1,1,1,1,1,1,1,0],[0,0,1,1,1,1,1,1,0,0],[0,0,0,1,1,1,1,0,0,0],[0,0,0,0,1,1,0,0,0,0]];
function bkLv(l){const f=l%BKN,k=Math.floor(l/BKN),sp=f%4===3?BKS[((f-3)/4)%BKS.length]:'',R=rng((l+11)*7919+3);
 return{f,sp,R,rows:Math.min(9,4+Math.floor(f/7)),pat:f<3?f:(f*5+k)%9,h2:Math.min(.42,f*.011),h3:f>24?Math.min(.22,(f-24)*.012):0,v:330*(1+Math.min(.22,f*.005)+k*.05)}}
function pBrick(r){
 const L=bkLv(lv),LW=360,LH=600,C=10,M=12,GP=5,BW=(LW-2*M-GP*(C-1))/C,BH=17,TOP=34,PY=530,BR=6.5,NY=566,BKP=(lv>=24?'mwns':lv>=14?'mwn':lv>=7?'mw':lv>=2?'m':'');
 let net=null,bricks=[],balls=[],caps=[],parts=[],pops=[],state='aim',aimA=0,aiming=false,lives=3,score=0,combo=0,paused=false,over=false,done=false,shield=false;
 let px=LW/2,ptx=LW/2,pw=84,pwT=84,wideT=0,slowT=0,squash=0,hits=0,dropY=0,dropT=0,lastT=0,sc=1,dpr=Math.min(2,devicePixelRatio||1),total=0,t0=performance.now();
 snap=()=>({});
 const R=L.R;
 /* motifs de briques */
 const pat=(p,y,x,rows)=>{const c=x-(C-1)/2,yy=y/(rows-1||1);switch(p){case 0:return 1;case 1:return Math.abs(c)<=(rows-y)*.62+.6;case 2:return (x+y)%2===0;case 3:return Math.abs(c)/(C/2)+Math.abs(yy-.5)*1.6<=1.05;
  case 4:return y<BKH.length&&BKH[y][x];case 5:return y%2===0||x%3!==1;case 6:return x<2||x>C-3||y<2;case 7:return (x<4||x>5)||y%2===1;default:return R()<.78}};
 const fresh=()=>{bricks=[];caps=[];parts=[];const rows=L.sp==='cry'?Math.max(6,L.rows):L.rows+(L.sp==='multi'?1:0);
  const sym=[];for(let y=0;y<rows;y++){sym[y]=[];for(let x=0;x<C/2;x++)sym[y][x]=R()}
  for(let y=0;y<rows;y++)for(let x=0;x<C;x++){if(!pat(L.pat,y,x,rows))continue;const q=sym[y][x<C/2?x:C-1-x];
   let hp=q<L.h3?3:q<L.h3+L.h2?2:1,t='n';
   if(L.sp==='ice'&&y===rows-2&&x%3!==1)t='ice';
   if(L.sp==='bomb'&&R()<.16)t='bomb';
   bricks.push({x0:M+x*(BW+GP),y0:TOP+y*(BH+GP),x:0,y:0,w:BW,h:BH,c:BKC[(y+Math.floor(L.f/3))%BKC.length],hp,max:hp,t,row:y,col:x,a:1,hitT:-1e4,dead:0})}
  if(L.sp==='cry'){const cand=bricks.filter(b=>b.t==='n');for(let i=0;i<Math.min(5,3+Math.floor(L.f/16));i++){const b=cand.splice(R()*cand.length|0,1)[0];if(b){b.t='cry';b.hp=b.max=2}}}
  if(L.sp==='move')bricks.forEach(b=>{b.w=BW*.78;b.x0+=BW*.11});
  total=bricks.filter(b=>b.t!=='ice').length;lives=3;score=0;over=false;done=false;shield=false;wideT=slowT=0;pwT=pw=84;hits=0;dropY=0;resetBall();place(performance.now());hud()};
 const resetBall=()=>{balls=[{x:px,y:PY-BR-1,vx:0,vy:0,tr:[]}];state='aim';aiming=false;combo=0};
 frame(`<div class="bkh"><div class="bklv" id="bklv"></div><div class="ttmid"><div class="ttbar"><i id="bkbr"></i></div><div class="tts"><span id="bksc">0</span> pts</div></div>
  <button class="bkpz" data-a="bkPause" aria-label="Pause"><svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg></button></div>
  <div class="ttw bkw" id="bkw"><canvas id="bkcv" class="ttcv"></canvas><div class="ttpop" id="bkpop"></div><div class="ttov" id="bkov" hidden></div></div>`,1);
 const cv=$('#bkcv'),ctx=cv.getContext('2d'),wr=$('#bkw');
 const size=()=>{const avW=Math.min(wr.parentElement.clientWidth||340,460)-8,avH=Math.max(380,innerHeight-178);sc=Math.min(avW/LW,avH/LH);
  cv.width=Math.round(LW*sc*dpr);cv.height=Math.round(LH*sc*dpr);cv.style.width=LW*sc+'px';cv.style.height=LH*sc+'px';SP={}};
 /* image d’une brique, prête à dessiner */
 let SP={};const spr=(b)=>{const id=b.c+b.t+b.hp+'|'+b.w;if(SP[id])return SP[id];const s=sc*dpr,o=document.createElement('canvas'),w=Math.ceil(b.w*s)+4,h=Math.ceil(b.h*s)+4;o.width=w;o.height=h;const g=o.getContext('2d'),rr=b.h*s*.36;
  const col=b.t==='ice'?'#c9d8ea':b.t==='bomb'?'#ff8f7a':b.t==='cry'?'#f6d7ff':b.c;
  g.translate(2,2);g.beginPath();g.roundRect(0,0,b.w*s,b.h*s,rr);const gr=g.createLinearGradient(0,0,0,b.h*s);gr.addColorStop(0,'#ffffff');gr.addColorStop(.22,col);gr.addColorStop(1,col);g.fillStyle=gr;g.globalAlpha=b.t==='ice'?.7:.96;g.fill();g.globalAlpha=1;
  g.fillStyle=col;g.beginPath();g.roundRect(b.w*s*.03,b.h*s*.2,b.w*s*.94,b.h*s*.72,rr*.8);g.fill();
  g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.roundRect(b.w*s*.1,b.h*s*.14,b.w*s*.3,b.h*s*.14,b.h*s*.07);g.fill();
  if(b.hp>1){g.fillStyle='rgba(40,30,80,.28)';for(let i=0;i<b.hp-1;i++){g.beginPath();g.arc(b.w*s*(.5+(i-(b.hp-2)/2)*.16),b.h*s*.6,b.h*s*.11,0,7);g.fill()}}
  if(b.t==='ice'){g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=s;g.beginPath();g.moveTo(b.w*s*.2,b.h*s*.8);g.lineTo(b.w*s*.4,b.h*s*.25);g.moveTo(b.w*s*.55,b.h*s*.85);g.lineTo(b.w*s*.75,b.h*s*.3);g.stroke()}
  if(b.t==='bomb'){g.fillStyle='#fff';g.beginPath();g.arc(b.w*s/2,b.h*s*.55,b.h*s*.2,0,7);g.fill();g.fillStyle='#ff8f7a';g.beginPath();g.arc(b.w*s/2,b.h*s*.55,b.h*s*.1,0,7);g.fill()}
  if(b.t==='cry'){const m=b.w*s/2,n=b.h*s*.55;g.fillStyle='#fff';g.shadowColor='#ffe38a';g.shadowBlur=b.h*s*.4;g.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,rd=i%2?b.h*s*.1:b.h*s*.32;g.lineTo(m+Math.cos(a)*rd,n+Math.sin(a)*rd)}g.closePath();g.fill()}
  return SP[id]=o};
 /* position des briques (glissement des rangées, descente) */
 const place=now=>{const tt=(now-t0)/1000;bricks.forEach(b=>{b.x=b.x0+(L.sp==='move'&&b.row%2===0?Math.sin(tt*.9+b.row)*BW*.11*1.9:L.sp==='move'?-Math.sin(tt*.9+b.row)*BW*.11*1.9:0);b.y=b.y0+dropY})};
 const alive=()=>bricks.filter(b=>!b.dead&&b.t!=='ice');
 const goalLeft=()=>L.sp==='cry'?bricks.filter(b=>!b.dead&&b.t==='cry').length:alive().length;
 const hud=()=>{const g=L.sp==='cry'?bricks.filter(b=>b.t==='cry').length:total,left=goalLeft();
  $('#bkbr').style.width=(g?(g-left)*100/g:0)+'%';$('#bksc').textContent=score;
  $('#bklv').innerHTML=[0,1,2].map(i=>`<i class="${i<lives?'on':''}"></i>`).join('')};
 const pop=(t,big)=>{const e=$('#bkpop');e.textContent=t;e.className='ttpop';void e.offsetWidth;e.className='ttpop on'+(big?' big':'')};
 const burst=(x,y,c,n,sp)=>{for(let i=0;i<n;i++){const a=Math.random()*7,v=(sp||90)*(.4+Math.random());parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-30,l:1,c,s:1.2+Math.random()*2.2})}};
 const breakB=(b,now,chain)=>{if(b.dead)return;b.dead=now;combo++;score+=10*b.max+(combo>2?combo*2:0);
  burst(b.x+b.w/2,b.y+b.h/2,b.t==='cry'?'#ffe38a':b.t==='bomb'?'#ff8f7a':b.c,b.t==='cry'?22:12,b.t==='cry'?150:90);sfx(520+Math.min(12,combo)*35,.05);
  if(b.t==='cry')pop('Cristal libéré !',1);
  if(!chain&&b.t!=='cry'&&BKP&&Math.random()<.1)caps.push({x:b.x+b.w/2,y:b.y+b.h/2,k:BKP[Math.random()*BKP.length|0]});
  if(b.t==='bomb'){wr.classList.remove('bump');void wr.offsetWidth;wr.classList.add('bump');vib(15);pops.push({x:b.x+b.w/2,y:b.y+b.h/2,t:now});
   setTimeout(()=>bricks.forEach(o=>{if(!o.dead&&o.t!=='ice'&&Math.abs(o.row-b.row)<=1&&Math.abs(o.col-b.col)<=1)hitB(o,performance.now(),1,true)}),90)}
  if(combo>=5&&combo%5===0)pop('Enchaînement ×'+combo)};
 const hitB=(b,now,dmg,chain)=>{b.hitT=now;if(b.t==='ice'){sfx(300,.03);return}b.hp-=dmg;if(b.hp<=0)breakB(b,now,chain);else sfx(440,.04);hud();checkWin()};
 const checkWin=()=>{if(!done&&goalLeft()===0){done=true;state='win';const now=performance.now();bricks.forEach(b=>{if(!b.dead&&b.t!=='ice')b.dead=now});
  balls.forEach(bl=>burst(bl.x,bl.y,'#ffffff',18,140));pop('Bravo !',1);setTimeout(win,1700)}};
 const lose=()=>{over=true;const o=$('#bkov');o.hidden=false;o.innerHTML=`<div><b>La balle s’est envolée</b><p>Il reste ${goalLeft()} brique${goalLeft()>1?'s':''}.</p><button class="btn" data-a="bkCont">Continuer · 1 ❄</button><button class="btn alt" data-a="bkRe">Recommencer</button></div>`;requestAnimationFrame(()=>o.classList.add('on'))};
 const hideOv=()=>{const o=$('#bkov');o.classList.remove('on');o.hidden=true};
 act.bkCont=()=>{if(!over||!spend(1))return;hideOv();over=false;lives=3;resetBall();hud()};
 act.bkRe=()=>{hideOv();net=null;fresh()};
 act.bkPause=()=>{if(done||over)return;paused=!paused;const o=$('#bkov');if(paused){o.hidden=false;o.innerHTML='<div><b>Pause</b><p>La balle attend.</p><button class="btn" data-a="bkPause">Reprendre</button></div>';requestAnimationFrame(()=>o.classList.add('on'))}else hideOv()};
 /* indice : un filet de neige protège le sol pour un rebond */
 act.hint=()=>{if(done||over||shield)return;if(!spend(1))return;shield=true;msg('Un filet de neige protège le sol pour un rebond.')};
 const launch=()=>{const sp=L.v,a=aimA;const mk=d=>({x:px,y:PY-BR-1,vx:sp*Math.sin(a+d),vy:-sp*Math.cos(a+d),tr:[]});
  balls=L.sp==='multi'?[mk(-.22),mk(0),mk(.22)]:[mk(0)];state='play';sfx(620,.06);vib(6)};
 /* commandes : glisser pour viser puis lâcher pour tirer ; ensuite glisser pour déplacer la plateforme */
 let g0=null;const wx=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)/sc,(e.clientY-r.top)/sc]};
 const gd=e=>{if(!cv.isConnected){document.removeEventListener('pointerdown',gd,true);return}if(e.button>0||done||over||paused)return;const t=e.target;if(t.closest&&t.closest('button,a,input,.top,.ttov,.nav,nav,dialog'))return;
  e.preventDefault();const [x]=wx(e);g0={id:e.pointerId,x,p:ptx};if(state==='aim'){aiming=true;aimA=0}};
 const gm=e=>{if(!g0||e.pointerId!==g0.id)return;const [x]=wx(e),dx=x-g0.x;
  if(state==='aim'&&aiming)aimA=Math.max(-1,Math.min(1,dx/130))*1.15;else if(state==='play'){ptx=Math.max(pw/2,Math.min(LW-pw/2,g0.p+dx*1.15))}};
 const gu=e=>{if(!g0||e.pointerId!==g0.id)return;g0=null;if(state==='aim'&&aiming&&!paused&&!over){aiming=false;launch()}};
 const gM=e=>{if(!cv.isConnected){document.removeEventListener('pointermove',gM);document.removeEventListener('pointerup',gU);return}gm(e)},gU=e=>{if(cv.isConnected)gu(e)};
 document.addEventListener('pointerdown',gd,true);document.addEventListener('pointermove',gM);document.addEventListener('pointerup',gU);
 const keys={};const kd=e=>{if(!cv.isConnected){removeEventListener('keydown',kd);removeEventListener('keyup',ku);return}
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){keys[e.key]=1;e.preventDefault();if(state==='aim')aimA=Math.max(-1.15,Math.min(1.15,aimA+(e.key==='ArrowLeft'?-.12:.12)))}
  else if(e.key===' '){e.preventDefault();if(state==='aim'&&!paused&&!over)launch()}else if(e.key==='p'||e.key==='Escape')act.bkPause()};
 const ku=e=>{delete keys[e.key]};addEventListener('keydown',kd);addEventListener('keyup',ku);
 /* trajectoire prévue pendant la visée */
 const aimPath=()=>{let x=px,y=PY-BR-1,vx=Math.sin(aimA),vy=-Math.cos(aimA);const pts=[];let len=0,bnc=0;
  while(len<520&&bnc<2){x+=vx*4;y+=vy*4;len+=4;if(x<BR){x=BR;vx=-vx;bnc++}if(x>LW-BR){x=LW-BR;vx=-vx;bnc++}if(y<BR){y=BR;vy=-vy;bnc++}
   if(bricks.some(b=>!b.dead&&x>b.x-BR&&x<b.x+b.w+BR&&y>b.y-BR&&y<b.y+b.h+BR)){pts.push([x,y,1]);break}if(len%14<4)pts.push([x,y,0])}return pts};
 /* physique */
 const stepBall=(bl,dt,now)=>{const sp=Math.hypot(bl.vx,bl.vy)*(slowT>0?.7:1),n=Math.max(1,Math.ceil(sp*dt/(BR*.6))),h=dt/n,f=slowT>0?.7:1;
  for(let i=0;i<n;i++){bl.x+=bl.vx*h*f;bl.y+=bl.vy*h*f;
   if(bl.x<BR){bl.x=BR;bl.vx=Math.abs(bl.vx);sfx(260,.02)}if(bl.x>LW-BR){bl.x=LW-BR;bl.vx=-Math.abs(bl.vx);sfx(260,.02)}if(bl.y<BR){bl.y=BR;bl.vy=Math.abs(bl.vy);sfx(260,.02)}
   /* plateforme : l’angle dépend de l’endroit touché */
   if(bl.vy>0&&bl.y+BR>=PY&&bl.y-BR<=PY+12&&bl.x>px-pw/2-BR&&bl.x<px+pw/2+BR){const rel=Math.max(-1,Math.min(1,(bl.x-px)/(pw/2))),a=rel*1.05,s=Math.hypot(bl.vx,bl.vy);
    bl.vx=s*Math.sin(a);bl.vy=-s*Math.cos(a);bl.y=PY-BR;squash=now;combo=0;hits++;sfx(330,.05);vib(5);
    if(L.sp==='down'&&hits%6===0){dropT=now;dropY+=BH+GP;const low=Math.max(...bricks.filter(b=>!b.dead&&b.t!=='ice').map(b=>b.y0+b.h))+dropY;if(low>PY-30){lives=0;balls=[];hud();lose();return false}}}
   for(const b of bricks){if(b.dead)continue;const cx=Math.max(b.x,Math.min(bl.x,b.x+b.w)),cy=Math.max(b.y,Math.min(bl.y,b.y+b.h)),dx=bl.x-cx,dy=bl.y-cy;
    if(dx*dx+dy*dy<BR*BR){const ox=Math.min(bl.x+BR-b.x,b.x+b.w-(bl.x-BR)),oy=Math.min(bl.y+BR-b.y,b.y+b.h-(bl.y-BR));
     if(ox<oy){bl.vx=bl.x<b.x+b.w/2?-Math.abs(bl.vx):Math.abs(bl.vx);bl.x+=bl.x<b.x+b.w/2?-ox:ox}else{bl.vy=bl.y<b.y+b.h/2?-Math.abs(bl.vy):Math.abs(bl.vy);bl.y+=bl.y<b.y+b.h/2?-oy:oy}
     hitB(b,now,1);break}}
   /* petite plateforme de secours : un rebond, puis elle se brise */
   if(net&&!net.br&&bl.vy>0&&bl.y+BR>=NY&&bl.y-BR<=NY+8&&Math.abs(bl.x-net.x)<net.w/2+BR){bl.vy=-Math.abs(bl.vy);bl.y=NY-BR;net.br=now;sfx(560,.08);vib(8);
    for(let q=0;q<16;q++)parts.push({x:net.x+(Math.random()-.5)*net.w,y:NY+4,vx:(Math.random()-.5)*120,vy:-Math.random()*120,l:1,c:'#c9f0ff',s:1.2+Math.random()*2})}
   /* jamais trop à plat */
   const s=Math.hypot(bl.vx,bl.vy);if(Math.abs(bl.vy)<s*.28){bl.vy=Math.sign(bl.vy||-1)*s*.28;bl.vx=Math.sign(bl.vx)*Math.sqrt(s*s-bl.vy*bl.vy)}
   if(bl.y-BR>LH){if(shield){shield=false;bl.y=LH-BR;bl.vy=-Math.abs(bl.vy);burst(bl.x,LH-4,'#ffffff',20,120);sfx(700,.08)}else return false}}
  return true};
 const ease=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),3);
 const draw=now=>{const s=sc*dpr;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,cv.width,cv.height);ctx.setTransform(s,0,0,s,0,0);
  /* briques */
  for(const b of bricks){let a=1,k=1;if(b.dead){const t=(now-b.dead)/260;if(t>=1)continue;a=1-t;k=1-.35*ease(t)}else{const t=(now-b.hitT)/180;if(t<1)k=1+.08*Math.sin(t*Math.PI)}
   ctx.globalAlpha=a;const im=spr(b),w=b.w*k,h=b.h*k;ctx.drawImage(im,b.x+b.w/2-w/2-2/s*k,b.y+b.h/2-h/2-2/s*k,im.width/s*k,im.height/s*k);
   if(!b.dead&&now-b.hitT<160){ctx.globalAlpha=.5*(1-(now-b.hitT)/160);ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(b.x,b.y,b.w,b.h,b.h*.36);ctx.fill()}}
  ctx.globalAlpha=1;
  /* ondes des briques qui éclatent */
  pops=pops.filter(p=>now-p.t<420);pops.forEach(p=>{const t=(now-p.t)/420;ctx.strokeStyle='rgba(255,170,140,'+(.7*(1-t))+')';ctx.lineWidth=3*(1-t)+.5;ctx.beginPath();ctx.arc(p.x,p.y,10+70*ease(t),0,7);ctx.stroke()});
  /* capsules bonus */
  caps.forEach(c=>{const col={m:'#93d8f5',w:'#b3e8a6',s:'#c8adff',n:'#ffdc8f'}[c.k];ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=10;ctx.beginPath();ctx.roundRect(c.x-15,c.y-7,30,14,7);ctx.fill();ctx.shadowBlur=0;
   ctx.fillStyle='#24305e';ctx.font='800 10px "Nunito Sans",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText({m:'×3',w:'↔',s:'◔',n:'▁'}[c.k],c.x,c.y+.5)});
  /* petite plateforme de secours */
  if(net){const t=net.br?(now-net.br)/320:0,ap=net.t?Math.min(1,(now-net.t)/250):1;if(t>=1)net=null;else{ctx.globalAlpha=(1-t)*ap;ctx.fillStyle='#c9f0ff';ctx.shadowColor='rgba(150,220,255,.9)';ctx.shadowBlur=10;
   const w=net.w*(net.br?1+.3*t:.6+.4*ease(ap));ctx.beginPath();ctx.roundRect(net.x-w/2,NY+(net.br?t*10:0),w,7,3.5);ctx.fill();ctx.shadowBlur=0;ctx.globalAlpha=1}}
  /* filet */
  if(shield){ctx.strokeStyle='rgba(200,235,255,'+(.55+.25*Math.sin(now/260))+')';ctx.lineWidth=3;ctx.setLineDash([2,6]);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(6,LH-4);ctx.lineTo(LW-6,LH-4);ctx.stroke();ctx.setLineDash([])}
  /* visée */
  if(state==='aim'){const pts=aimPath(),al=aiming?.95:.35+.2*Math.sin(now/300);pts.forEach(([x,y,e],i)=>{ctx.globalAlpha=al*(1-i/(pts.length+4));ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,e?4:1.8,0,7);ctx.fill()});ctx.globalAlpha=1}
  /* plateforme */
  const sq=now-squash<200?Math.sin((now-squash)/200*Math.PI)*.18:0,w=pw*(1+sq*.3),h=12*(1-sq);
  const pg=ctx.createLinearGradient(0,PY,0,PY+12);pg.addColorStop(0,'#ffffff');pg.addColorStop(1,'#dfe7ff');ctx.fillStyle=pg;ctx.shadowColor='rgba(170,200,255,.8)';ctx.shadowBlur=14;
  ctx.beginPath();ctx.roundRect(px-w/2,PY+(12-h)/2,w,h,h/2);ctx.fill();ctx.shadowBlur=0;
  /* balles et traînées */
  balls.forEach(bl=>{for(let i=0;i<bl.tr.length;i++){const [x,y]=bl.tr[i],t=i/bl.tr.length;ctx.globalAlpha=t*.35;ctx.fillStyle='#c9b8ff';ctx.beginPath();ctx.arc(x,y,BR*(.4+.6*t),0,7);ctx.fill()}
   ctx.globalAlpha=1;ctx.fillStyle='#fff';ctx.shadowColor='rgba(190,170,255,.95)';ctx.shadowBlur=12;ctx.beginPath();ctx.arc(bl.x,bl.y,BR,0,7);ctx.fill();ctx.shadowBlur=0});
  parts.forEach(p=>{ctx.globalAlpha=Math.max(0,Math.min(1,p.l));ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,7);ctx.fill()});ctx.globalAlpha=1};
 const tick=now=>{if(!cv.isConnected)return;requestAnimationFrame(tick);const dt=Math.min(.033,(now-(lastT||now))/1000);lastT=now;
  parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=260*dt;p.l-=dt*1.4});parts=parts.filter(p=>p.l>0);
  if(!paused&&!over){place(now);
   if(keys.ArrowLeft&&state==='play')ptx=Math.max(pw/2,ptx-360*dt);if(keys.ArrowRight&&state==='play')ptx=Math.min(LW-pw/2,ptx+360*dt);
   wideT=Math.max(0,wideT-dt);slowT=Math.max(0,slowT-dt);pwT=wideT>0?126:84;pw+=(pwT-pw)*Math.min(1,dt*8);ptx=Math.max(pw/2,Math.min(LW-pw/2,ptx));
   px+=(ptx-px)*Math.min(1,dt*22);
   if(state==='aim'&&balls[0]){balls[0].x=px;balls[0].y=PY-BR-1}
   if(state==='play'){balls=balls.filter(bl=>{bl.tr.push([bl.x,bl.y]);if(bl.tr.length>9)bl.tr.shift();return stepBall(bl,dt,now)});
    if(!balls.length&&!done&&!over){lives--;hud();sfx(200,.25);vib(20);if(lives<=0)lose();else{msg('La balle est tombée. Vise à nouveau.');resetBall()}}}
   caps=caps.filter(c=>{c.y+=110*dt;if(c.y>PY-6&&c.y<PY+16&&Math.abs(c.x-px)<pw/2+12){sfx(780,.08);burst(c.x,c.y,'#ffffff',10,80);
     if(c.k==='n'){net={x:Math.max(40,Math.min(LW-40,px)),w:72,t:performance.now(),br:0};pop('Petite plateforme')}else if(c.k==='w'){wideT=12;pop('Plateforme large')}else if(c.k==='s'){slowT=10;pop('Balle douce')}else if(balls[0]&&state==='play'){const b=balls[0],s=Math.hypot(b.vx,b.vy),a=Math.atan2(b.vx,-b.vy);[-.35,.35].forEach(d=>balls.push({x:b.x,y:b.y,vx:s*Math.sin(a+d),vy:-s*Math.cos(a+d),tr:[]}));pop('Trois balles !')}return false}return c.y<LH+20})}
  draw(now)};
 const rs=()=>{if(!cv.isConnected){removeEventListener('resize',rs);return}size()};addEventListener('resize',rs);
 window.__BKDBG={st:()=>({state,lives,left:goalLeft(),balls:balls.length,done}),net:()=>{net={x:px+120,w:72,t:performance.now(),br:0};state='play';balls=[{x:px+120,y:400,vx:0,vy:300,tr:[]}]},st2:()=>({net:net&&{...net},b:balls[0]&&{...balls[0],tr:0}}),clear:()=>{bricks.forEach(b=>{if(b.t!=='ice')b.dead=performance.now()});checkWin()}};
 size();fresh();
 msg({multi:'Trois balles partent ensemble.',ice:'Les briques grises sont en glace : elles ne cassent pas.',move:'Les rangées glissent doucement.',bomb:'Les briques rouges éclatent et cassent leurs voisines.',cry:'Libère seulement les cristaux.',down:'Les briques descendent un peu tous les 6 rebonds.'}[L.sp]||{2:'Nouveau bonus ×3 : attrape la capsule bleue pour trois balles.',7:'Nouveau bonus ↔ : la capsule verte élargit la plateforme.',14:'Nouveau bonus : la capsule jaune pose une petite plateforme en dessous, pour un rebond.',24:'Nouveau bonus ◔ : la capsule mauve ralentit la balle.'}[lv]||'Glisse pour viser, lâche pour tirer, puis glisse pour déplacer la plateforme.');
 requestAnimationFrame(tick);
}
