/* aquarium : chaque animal nage au hasard, sans jamais refaire le même parcours (un nouveau trajet est tiré à chaque fin de trajet) */
const AQW={};
function aqWan(f,q,du,k,st){
 const R=Math.random,id=f.id,m=AQW[id]||(AQW[id]={n:0});m.f=f;m.q=q;m.k=k;const n0=st?++m.n:0;
 const vert=id==='hippo'||id==='meduse',slow=id==='tortue'||id==='lune'||id==='meduse'||id==='hippo',sp=(slow?2.8:4.6)*(.75+R()*.5),wd=96-15*f.sz,n=4+Math.floor(R()*5);
 const P=[];let x=st?st[0]:.14+R()*.72,y=st?st[1]:10+R()*60,z=st?st[2]:R();
 P.push([x,y,z]);
 for(let i=1;i<n;i++){let nx=vert?x+(R()*2-1)*.3:.14+R()*.72,ny=vert?y+(R()*2-1)*34:9+R()*64;if(Math.abs(nx-x)<.1)nx+=(nx<.5?.12:-.12);x=Math.min(.86,Math.max(.14,nx));y=Math.min(72,Math.max(8,ny));z=R();P.push([x,y,z])}
 const T=[0];for(let i=1;i<P.length;i++){const dx=(P[i][0]-P[i-1][0])*wd,dy=(P[i][1]-P[i-1][1])*.8;T.push(T[i-1]+Math.max(3.5,Math.hypot(dx,dy,(P[i][2]-P[i-1][2])*22)/sp))}
 const D=T[T.length-1];let dir=m.dir||1,fl='',kf='';
 for(let i=0;i<P.length;i++){const p=(T[i]/D*100).toFixed(2);
  kf+=`${p}%{translate:calc(var(--tx)*${P[i][0].toFixed(3)}) 0;top:${(P[i][1]+(P[i][2]-.5)*16).toFixed(1)}%;scale:${(.78+P[i][2]*.9).toFixed(2)};--aqz:${P[i][2].toFixed(2)};animation-timing-function:ease-in-out}`;
  if(i<P.length-1){const dx=(P[i+1][0]-P[i][0])*wd;if(Math.abs(dx)>1.5)dir=dx>0?1:-1;if(i===0)fl+=`0%{transform:scaleX(${dir})}`;else fl+=`${p}%{transform:scaleX(${dir})}`}}
 fl+=`100%{transform:scaleX(${dir})}`;m.dir=dir;m.end=P[P.length-1];
 const sel=`.tank .fx[data-id="${id}"]`,nm=n0?'-'+n0:'',dl=st?'0s':-(R()*D*.9).toFixed(2)+'s';
 return{D:+D.toFixed(2),dl,css:`@keyframes swx-${id}${nm}{${kf}}@keyframes flp-${id}${nm}{${fl}}${sel}{animation:swx-${id}${nm} ${D.toFixed(2)}s linear ${dl} infinite}${sel} .fi{animation:flp-${id}${nm} ${D.toFixed(2)}s steps(1,end) ${dl} infinite}@media(prefers-reduced-motion:reduce){${sel},${sel} .fi{animation:none}}`}
}
document.addEventListener('animationiteration',e=>{
 const nm=e.animationName||'';if(nm.indexOf('swx-')!==0||e.target.className.indexOf('fx')<0)return;
 const el=e.target,id=el.dataset.id,m=AQW[id],s=el.previousElementSibling;if(!m||!s||s.tagName!=='STYLE')return;
 const W=aqWan(m.f,m.q,0,m.k,m.end);s.textContent=W.css;el.style.setProperty('--d',W.D+'s');el.style.setProperty('--dl','0s');
});
