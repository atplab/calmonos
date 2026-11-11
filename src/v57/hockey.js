
/* Poisson hockeyeur : au repas, des rondelles et un but tombent ; il tire ses rondelles dans le but avec son bâton */
window.aqAnc=(el,t,a)=>{try{const s=el.querySelector('.fi svg')||el.querySelector('svg'),m=s.getScreenCTM();if(!m)return null;const q=new DOMPoint(a[0],a[1]).matrixTransform(m),r=t.getBoundingClientRect();return{x:q.x-r.left-t.clientLeft,y:q.y-r.top-t.clientTop}}catch(e){return null}};
window.aqHockey=function(lab){
 const t=$('#tank');if(!t)return false;const el=t.querySelector('.fx[data-id=hockey]');if(!el)return false;
 if(AQS&&AQS.t!==t)aqStop();
 const S=AQS||(AQS={t,P:[],F:{},raf:0,last:0});if(S.F.hockey&&S.F.hockey.mode!=='done')return true;
 const tw=t.clientWidth,th=t.clientHeight,tb=t.getBoundingClientRect(),r=el.getBoundingClientRect();
 const f=S.F.hockey={el,fr:el.querySelector('.fr'),fi:el.querySelector('.fi'),px:r.left-tb.left,py:r.top-tb.top,fw:r.width,fh:r.height,mode:'hk',tg:null,eaten:99,max:0,dir:1,face:0,rt:0,et:0,lab:true,k:0,vmax:180};
 const ys=Math.round(th*.8-f.fh*.09-2),gs=f.px+f.fw/2<tw/2?1:-1,gw=Math.round(Math.min(78,Math.max(54,tw*.16))),gh=Math.round(gw*.7),gx=gs>0?tw-gw-6:6;
 f.dir=gs;el.classList.add('hkon');
 const G=document.createElement('div');G.className='hkg'+(gs<0?' l':'');G.style.cssText=`width:${gw}px;height:${gh}px;left:${gx}px;top:${ys-gh+4}px`;
 G.innerHTML=`<svg viewBox="0 0 70 50" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="hkm" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 0L6 6M6 0L0 6" stroke="#fff" stroke-width=".8" opacity=".75"/></pattern></defs><g class="hkn"><path d="M6 6H40Q62 10 66 48H6Z" fill="url(#hkm)"/><path d="M6 6H40Q62 10 66 48" fill="rgba(255,255,255,.12)"/></g><path d="M6 48V6H40Q62 10 66 48" fill="none" stroke="#d6363f" stroke-width="3.4" stroke-linejoin="round"/><path d="M3 48H68" stroke="#d6363f" stroke-width="3" stroke-linecap="round"/></svg>`;
 t.appendChild(G);
 G.animate([{transform:`translateY(${-(ys+30)}px) rotate(${-6*gs}deg)`,easing:'cubic-bezier(.45,0,.9,.6)'},{transform:'translateY(0) rotate(0)',offset:.78,easing:'ease-out'},{transform:'translateY(-7px) rotate(1deg)',offset:.9,easing:'ease-in'},{transform:'translateY(0)'}],{duration:1500});
 const lo=gs>0?tw*.12:gx+gw+34,hi=gs>0?gx-40:tw*.88,P=[];
 for(let i=0;i<3;i++){const e=document.createElement('i');e.className='hkp';const x=lo+(hi-lo)*((i+.5)/3+(Math.random()-.5)*.18);t.appendChild(e);
  const p={e,x,y:ys,ok:false,done:false};P.push(p);e.style.transform=`translate(${x.toFixed(1)}px,${ys}px)`;
  const a=e.animate([{transform:`translate(${x.toFixed(1)}px,-14px) rotate(0)`,easing:'cubic-bezier(.4,0,.85,.7)'},{transform:`translate(${(x+6).toFixed(1)}px,${ys*.5}px) rotate(${200*gs}deg)`,offset:.5},{transform:`translate(${x.toFixed(1)}px,${ys}px) rotate(360deg)`,offset:.85,easing:'ease-out'},{transform:`translate(${x.toFixed(1)}px,${ys-4}px) rotate(360deg)`,offset:.93},{transform:`translate(${x.toFixed(1)}px,${ys}px) rotate(360deg)`}],{duration:1500,delay:250+i*380,fill:'backwards'});
  a.onfinish=()=>{p.ok=true}}
 const BL=[79,51];let st='wait',cur=null,tt=0,T0=performance.now(),last=0,goals=0,shot=0;
 const say=()=>{const b=document.createElement('div');b.className='hkt';b.textContent='But !';b.style.left=(gx+gw/2)+'px';b.style.top=(ys-gh-8)+'px';t.appendChild(b);setTimeout(()=>b.remove(),1100)};
 const shoot=p=>{shot++;const gx2=gs>0?gx+gw*.62:gx+gw*.38,d=Math.abs(gx2-p.x),du=Math.max(320,d/380*1000);
  const a=p.e.animate([{transform:`translate(${p.x.toFixed(1)}px,${ys}px)`},{transform:`translate(${(gx2-4*gs).toFixed(1)}px,${ys-2}px)`,offset:.92},{transform:`translate(${gx2.toFixed(1)}px,${ys}px)`}],{duration:du,easing:'cubic-bezier(.15,.7,.35,1)',fill:'forwards'});
  a.onfinish=()=>{goals++;const n=G.querySelector('.hkn');if(n)n.animate([{transform:'none'},{transform:`translateX(${3*gs}px) scaleX(1.05)`},{transform:`translateX(${-1*gs}px)`},{transform:'none'}],{duration:420,easing:'ease-out'});
   say();sfx(820+goals*80,.18);try{vib(12)}catch(e){}if(goals===1&&lab)aqLab(t,el,0);
   p.e.animate([{opacity:1},{opacity:0}],{duration:500,delay:350,fill:'forwards'}).onfinish=()=>p.e.remove()}};
 const fin=()=>{st='end';el.classList.remove('hks');setTimeout(()=>{el.classList.remove('hkon');if(f.mode==='hk'){f.bk=0;f.mode='back';if(!S.raf&&AQS===S)S.raf=requestAnimationFrame(aqStep)}
   G.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateY(14px)'}],{duration:800,delay:900,fill:'forwards'}).onfinish=()=>G.remove();P.forEach(p=>{if(!p.done)p.e.remove()})},700)};
 const step=n=>{if(!t.isConnected||AQS!==S||f.mode!=='hk'){G.remove();P.forEach(p=>p.e.remove());el.classList.remove('hkon','hks');return}
  const dt=Math.min(.05,last?(n-last)/1000:.016);last=n;
  if(n-T0>20000&&st!=='end'){fin()}
  if(st==='wait'){const c=P.filter(p=>p.ok&&!p.done);if(c.length){const B=aqAnc(el,t,BL)||{x:f.px,y:f.py};c.sort((a,b)=>Math.hypot(a.x-B.x,a.y-B.y)-Math.hypot(b.x-B.x,b.y-B.y));cur=c[0];st='go';f.rt=0}else if(P.every(p=>p.done))fin()}
  else if(st==='go'){f.dir=gs;const B=aqAnc(el,t,BL);if(B){const tx=cur.x-5*gs-B.x,ty=ys-1-B.y,d=Math.hypot(tx,ty);f.rt+=dt;const v=f.vmax*Math.min(1,.3+f.rt/.5);
    if(d<3){st='shoot';tt=0;el.classList.remove('hks');void el.offsetWidth;el.classList.add('hks')}else{const m=Math.min(d,v*dt);f.px+=tx/d*m;f.py+=ty/d*m}}}
  else if(st==='shoot'){tt+=dt;if(tt>=.28&&!cur.done){cur.done=true;shoot(cur)}if(tt>=.62){el.classList.remove('hks');cur=null;st='wait'}}
  if(st!=='end')requestAnimationFrame(step)};
 requestAnimationFrame(step);if(!S.raf)S.raf=requestAnimationFrame(aqStep);return true};
const aqFx0=aqFx;
aqFx=function(ids,hg){try{if(!wRM&&ids.includes('hockey')&&(hg||ids).includes('hockey')&&$('#tank .fx[data-id=hockey]')){const r=ids.filter(i=>i!=='hockey');if(r.length)aqFx0(r,hg);aqHockey(true);return}}catch(e){}return aqFx0(ids,hg)};
