/* citations que seuls les poissons de hockey disent */
const AQHK=['On rate cent pour cent des tirs qu’on ne prend pas. Alors je tire, même dans l’océan.','Garde la tête haute et la palette sur la glace : le reste suit.','Un bon arrêt vaut un but. Un grand arrêt vaut une soirée entière.','Ce n’est pas la rondelle qui fait l’équipe, c’est chaque passe qu’on se fait.','Tombe, relève-toi, patine encore. C’est ça, le hockey. C’est ça, la vie.','Le plus beau son du monde ? Une rondelle qui frappe le fond du filet.','Respire, place-toi, fais confiance à tes réflexes : le filet est à toi.','Les meilleures parties se gagnent dans le troisième tiers… et les meilleures journées aussi.','Une patinoire gelée, des amis, une rondelle : l’hiver ne demande rien de plus.','On ne compte pas les buts, on compte les sourires après la partie.'];
/* toucher un animal : un petit sursaut dans le sens où il regarde (sans quitter sa route) */
function aqDash(el){
 if(wRM||!el||!el.isConnected||el._dsh||el._qt)return;
 const fr=el.querySelector('.fr'),fi=el.querySelector('.fi');if(!fi)return;
 const m=getComputedStyle(fi).transform,nat=m&&m!=='none'?Math.sign(parseFloat(m.slice(m.indexOf('(')+1)))||1:1,face=nat*(fr&&fr.classList.contains('x')?-1:1);
 el._dsh=1;
 const an=el.animate([{transform:'translateX(0)'},{transform:'translateX('+face*30+'px)',offset:.3,easing:'ease-in-out'},{transform:'translateX(0)'}],{duration:850,easing:'ease-out'});
 an.onfinish=an.oncancel=()=>{el._dsh=0};
}
/* de temps à autre, un animal s’approche de l’écran, dit une citation 5 s, puis reprend sa route */
let aqQT=0;
function aqQuoteSched(){clearTimeout(aqQT);aqQT=setTimeout(()=>{try{aqQuoteGo()}catch(e){}aqQuoteSched()},30000+Math.random()*45000)}
async function aqQuoteGo(){
 const t=document.querySelector('#tank');
 if(!t||!t.isConnected||document.hidden||wRM||t.classList.contains('ed')||t.querySelector('.aqq')||aqBusy>Date.now()||(AQS&&Object.values(AQS.F||{}).some(f=>f.mode!=='done')))return;
 const fs=[...t.querySelectorAll('.fx')].filter(e=>!e._dsh&&e.querySelector('.fi svg'));if(!fs.length)return;
 const el=fs[Math.floor(Math.random()*fs.length)],tb=t.getBoundingClientRect(),r=el.getBoundingClientRect(),fr=el.querySelector('.fr'),fi=el.querySelector('.fi'),
  m=getComputedStyle(fi).transform,nat=m&&m!=='none'?Math.sign(parseFloat(m.slice(m.indexOf('(')+1)))||1:1,face=nat*(fr&&fr.classList.contains('x')?-1:1),
  S=Math.min(2.3,tb.width*.3/r.width),dx=tb.width/2-(r.left-tb.left+r.width/2),dy=tb.height*.68-(r.top-tb.top+r.height/2),
  c=document.createElement('div'),b=document.createElement('div'),sl=ms=>new Promise(o=>setTimeout(o,ms)),
  qt=(['hockey','gardien'].includes(el.dataset.id)&&Math.random()<.75)?AQHK[Math.floor(Math.random()*AQHK.length)]:Q[Math.floor(Math.random()*Q.length)];
 c.className='aqq';c.style.cssText=`left:${r.left-tb.left}px;top:${r.top-tb.top}px;width:${r.width}px;height:${r.height}px`;
 c.innerHTML=`<div style="transform:scaleX(${face})">${el.querySelector('.fi svg').outerHTML}</div>`;
 b.className='aqb';b.textContent=qt;if(qt.length>90)b.style.fontSize='13px';
 const fh=r.height*S,ft=tb.height*.68-fh/2;b.style.bottom=(tb.height-ft+12)+'px';b.style.setProperty('--tl',face*r.width*S*.22+'px');
 t.appendChild(c);t.appendChild(b);el._qt=1;el.style.visibility='hidden';
 const ok=()=>t.isConnected&&c.isConnected;
 try{
  await c.animate([{transform:'none'},{transform:`translate(${dx}px,${dy}px) scale(${S})`}],{duration:1100,easing:'cubic-bezier(.3,.8,.3,1)',fill:'forwards'}).finished;
  if(!ok())throw 0;
  b.classList.add('on');
  c.firstChild.animate([{translate:'0 -3px'},{translate:'0 3px'}],{duration:1300,iterations:Infinity,direction:'alternate',easing:'ease-in-out'});
  c.firstChild.firstChild.animate([{scale:'1 1'},{scale:'1.05 .96'}],{duration:340,iterations:14,direction:'alternate',easing:'ease-in-out'});
  await sl(5000);if(!ok())throw 0;
  b.classList.remove('on');
  /* retour : on vise la position, la taille et le sens ACTUELS du poisson (il continue de nager) */
  const cx0=r.left-tb.left+r.width/2,cy0=r.top-tb.top+r.height/2,a1=c.getAnimations()[0];
  c.style.transform=`translate(${dx}px,${dy}px) scale(${S})`;if(a1)a1.cancel();
  const faceNow=()=>{const m=getComputedStyle(fi).transform,n=m&&m!=='none'?Math.sign(parseFloat(m.slice(m.indexOf('(')+1)))||1:1;return n*(fr&&fr.classList.contains('x')?-1:1)};
  await new Promise(res=>{const t0=performance.now(),D=1100;
   const tick=()=>{if(!ok())return res();
    const p=Math.min(1,(performance.now()-t0)/D),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2,
     r2=el.getBoundingClientRect(),t2=t.getBoundingClientRect(),
     tx=r2.left-t2.left+r2.width/2-cx0,ty=r2.top-t2.top+r2.height/2-cy0,ts=r2.width/r.width||1,
     px=dx+(tx-dx)*e,py=dy+(ty-dy)*e,sc=S+(ts-S)*e;
    c.style.transform=`translate(${px}px,${py}px) scale(${sc})`;
    if(p>.6)c.firstChild.style.transform=`scaleX(${faceNow()})`;
    p<1?requestAnimationFrame(tick):res()};
   requestAnimationFrame(tick)});
 }catch(e){}
 el.style.visibility='';el._qt=0;c.remove();b.remove();
}
aqQuoteSched();
