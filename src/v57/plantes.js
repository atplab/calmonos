/* Plantes marines de l’aquarium : achat, repas tous les 2 jours, croissance lente (2× plus lente quand elles ont faim) */
const AQPD=2*864e5,AQPW=12*36e5;
const AQPT=[
 {id:'ulve',n:'Laitue de mer',p:60,d:5,h:130,w:19,x:0,s:'Feuilles tendres et froissées'},
 {id:'caulerpa',n:'Raisin de mer',p:90,d:7,h:150,w:20,x:12,s:'Petites perles vertes en grappes'},
 {id:'halimeda',n:'Halimède',p:130,d:9,h:140,w:19,x:24,s:'Disques clairs empilés'},
 {id:'zostere',n:'Zostère marine',p:170,d:11,h:190,w:23,x:34,s:'Herbier de longues lames'},
 {id:'dulse',n:'Dulse',p:220,d:14,h:180,w:22,x:47,s:'Algue rouge aux lobes souples'},
 {id:'sargasse',n:'Sargasse',p:280,d:16,h:220,w:23,x:58,s:'Rameaux et flotteurs dorés'},
 {id:'posidonie',n:'Posidonie',p:350,d:18,h:250,w:24,x:70,s:'Grandes lames sombres'},
 {id:'laminaire',n:'Laminaire',p:450,d:21,h:300,w:26,x:78,s:'Forêt de kelp ondulant'}];
const aqpO=a=>a.pl||(a.pl={});
const aqpR=(i,s)=>{const x=Math.sin(i*127.1+s*311.7)*43758.5453;return x-Math.floor(x)};
const aqpS=n=>{let h=0;for(const c of n)h=(h*31+c.charCodeAt(0))>>>0;return h};
const aqpG=(o,P,now=Date.now())=>{if(now<=o.t)return o.g;const r=1/(P.d*864e5),a=Math.max(0,Math.min(now,o.f+AQPD)-o.t),b=now-o.t-a;return Math.min(1,o.g+a*r+b*r/2)};
const aqpHg=(o,now=Date.now())=>now>o.f+AQPD,aqpCan=(o,now=Date.now())=>o.f+AQPD-now<=AQPW;
const aqpL=g=>.1+.9*Math.pow(g,.85);
const aqpPt=(x0,y0,cx,cy,x1,y1,t)=>[(1-t)*(1-t)*x0+2*(1-t)*t*cx+t*t*x1,(1-t)*(1-t)*y0+2*(1-t)*t*cy+t*t*y1];
const aqpF=n=>n.toFixed(1);
/* ruban courbe de largeur variable : a,b = largeur au pied / à la pointe, g = renflement, r = froissé, v = ondulation */
function aqpRib(x0,y0,cx,cy,x1,y1,o){const N=16,Lp=[],Rp=[];
 for(let i=0;i<=N;i++){const t=i/N,p=aqpPt(x0,y0,cx,cy,x1,y1,t),a=aqpPt(x0,y0,cx,cy,x1,y1,Math.min(1,t+.02)),b=aqpPt(x0,y0,cx,cy,x1,y1,Math.max(0,t-.02));
  let dx=a[0]-b[0],dy=a[1]-b[1];const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;const nx=-dy,ny=dx,
  w=Math.max(.4,((o.a||1)+((o.b||1)-(o.a||1))*t+(o.g||0)*Math.pow(Math.sin(Math.PI*t),.7))*(1+(o.r||0)*Math.sin(t*(o.f||10)))),
  off=(o.v||0)*Math.sin(t*(o.f||10)*.6)*t;
  Lp.push([p[0]+nx*(w+off),p[1]+ny*(w+off)]);Rp.push([p[0]-nx*(w-off),p[1]-ny*(w-off)])}
 const f=q=>aqpF(q[0])+' '+aqpF(q[1]);return'M'+Lp.map(f).join('L')+'L'+Rp.reverse().map(f).join('L')+'Z'}
const AQPD_={
 ulve:(g,H,A)=>{const k=aqpL(g),n=2+Math.round(g*4),B=H-3;
  for(let i=0;i<n;i++){const u=i/(n-1),x=24+u*52+(aqpR(i,1)-.5)*8,h=(.5+aqpR(i,2)*.35)*H*k*(1-.35*Math.abs(u-.5)*2),ln=(u-.5)*26+(aqpR(i,3)-.5)*10;
   A(i,`<path d="${aqpRib(x,B,x+ln*.2,B-h*.55,x+ln,B-h,{a:1.5,b:.8,g:9+aqpR(i,4)*3,r:.14,f:16,v:2})}" fill="${i%2?'#6cc46f':'#58b862'}" stroke="#3d8f4b" stroke-width=".7" stroke-linejoin="round"/><path d="M${aqpF(x)} ${B}Q${aqpF(x+ln*.2)} ${aqpF(B-h*.55)} ${aqpF(x+ln*.95)} ${aqpF(B-h*.92)}" stroke="#a6e3a2" stroke-width=".8" fill="none" opacity=".6"/>`)}},
 caulerpa:(g,H,A)=>{const k=aqpL(g),n=2+Math.round(g*3),B=H-3;
  A(0,`<path d="M8 ${B}Q50 ${B-5} 92 ${B}" stroke="#2f7d3c" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="${aqpF(.4+.6*k)}"/>`);
  for(let i=0;i<n;i++){const x=18+i*64/(n-1)+(aqpR(i,1)-.5)*6,h=(.55+aqpR(i,2)*.4)*H*k,ln=(aqpR(i,3)-.5)*18,m=Math.max(2,Math.round(11*k*h/(H*.7)));
   let s=`<path d="M${aqpF(x)} ${B}Q${aqpF(x+ln)} ${aqpF(B-h*.5)} ${aqpF(x+ln*.6)} ${aqpF(B-h)}" stroke="#2f7d3c" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
   for(let j=1;j<=m;j++){const t=j/(m+1),p=aqpPt(x,B,x+ln,B-h*.5,x+ln*.6,B-h,t),sd=j%2?-1:1,r=3.6-t*1.3,cx=p[0]+sd*6,cy=p[1]-2.4;
    s+=`<path d="M${aqpF(p[0])} ${aqpF(p[1])}l${sd*4} -2" stroke="#2f7d3c" stroke-width="1"/><circle cx="${aqpF(cx)}" cy="${aqpF(cy)}" r="${aqpF(r)}" fill="#6fcb72" stroke="#3f9a4e" stroke-width=".6"/><circle cx="${aqpF(cx-.9)}" cy="${aqpF(cy-.9)}" r="${aqpF(r*.35)}" fill="#d4f5cf" opacity=".7"/>`}
   const e=aqpPt(x,B,x+ln,B-h*.5,x+ln*.6,B-h,1);s+=`<circle cx="${aqpF(e[0])}" cy="${aqpF(e[1]-2)}" r="2.6" fill="#7fd882" stroke="#3f9a4e" stroke-width=".6"/>`;A(i,s)}},
 halimeda:(g,H,A)=>{const k=aqpL(g),n=2+Math.round(g*2),B=H-3;
  for(let i=0;i<n;i++){const x=26+i*48/(n-1),h=(.5+aqpR(i,2)*.4)*H*k,ln=(aqpR(i,3)-.5)*26,m=Math.max(3,Math.round(h/7));let s='';
   for(let j=0;j<m;j++){const t=(j+.5)/m,p=aqpPt(x,B,x+ln*.4,B-h*.55,x+ln,B-h,t),dx=2*(1-t)*(ln*.4)+2*t*(ln*.6),dy=2*(1-t)*(-h*.55)+2*t*(-h*.45),w=7.5-4.5*t;
    s+=`<ellipse cx="${aqpF(p[0])}" cy="${aqpF(p[1])}" rx="${aqpF(w)}" ry="3.2" transform="rotate(${aqpF(Math.atan2(dy,dx)*180/Math.PI+90)} ${aqpF(p[0])} ${aqpF(p[1])})" fill="${j%2?'#bfe5a8':'#a9d995'}" stroke="#7fb878" stroke-width=".6"/>`}
   A(i,s)}},
 zostere:(g,H,A)=>{const k=aqpL(g),n=4+Math.round(g*8),B=H-3;
  A(0,`<path d="M12 ${B}L88 ${B}" stroke="#8a7a52" stroke-width="2" stroke-linecap="round" opacity="${aqpF(.3+.5*k)}"/>`);
  for(let i=0;i<n;i++){const u=i/(n-1),x=16+u*68+(aqpR(i,1)-.5)*6,h=(.55+aqpR(i,2)*.4)*H*k,ln=(u-.5)*22+(aqpR(i,3)-.5)*14;
   A(i,`<path d="M${aqpF(x)} ${B}Q${aqpF(x+ln*.3+(aqpR(i,5)-.5)*10)} ${aqpF(B-h*.55)} ${aqpF(x+ln)} ${aqpF(B-h)}" stroke="${i%3?'#4fb36b':'#7bd88f'}" stroke-width="${aqpF(2.2+aqpR(i,4)*1.2)}" fill="none" stroke-linecap="round"/>`)}},
 dulse:(g,H,A)=>{const k=aqpL(g),n=2+Math.round(g*2),B=H-3;
  for(let i=0;i<n;i++){const u=i/(n-1),x=28+u*44,h=(.5+aqpR(i,2)*.35)*H*k,ln=(u-.5)*40;
   let s=`<path d="${aqpRib(x,B,x+ln*.3,B-h*.5,x+ln,B-h,{a:1.4,b:2,g:12,r:.1,f:12})}" fill="#a83a58" stroke="#7a2640" stroke-width=".7"/><path d="M${aqpF(x)} ${B}Q${aqpF(x+ln*.3)} ${aqpF(B-h*.5)} ${aqpF(x+ln*.95)} ${aqpF(B-h*.95)}" stroke="#d98aa0" stroke-width=".8" fill="none" opacity=".6"/>`;
   if(k>.4){const p=aqpPt(x,B,x+ln*.3,B-h*.5,x+ln,B-h,.55),sd=i%2?-1:1;s+=`<path d="${aqpRib(p[0],p[1],p[0]+ln*.3+sd*12,p[1]-h*.25,p[0]+sd*22+ln*.3,p[1]-h*.45*k,{a:1,b:1.6,g:7,r:.1,f:10})}" fill="#c4566f" stroke="#7a2640" stroke-width=".6"/>`}
   A(i,s)}},
 sargasse:(g,H,A)=>{const k=aqpL(g),B=H-3,h=H*.92*k,nn=Math.max(2,Math.round(3+8*g)),cx=64,x1=44;
  A(0,`<path d="M50 ${B}Q${cx} ${aqpF(B-h*.5)} ${x1} ${aqpF(B-h)}" stroke="#7d6a25" stroke-width="3" fill="none" stroke-linecap="round"/>`);
  for(let j=0;j<nn;j++){const t=.22+.78*(j+.5)/nn,p=aqpPt(50,B,cx,B-h*.5,x1,B-h,t),sd=j%2?-1:1,bl=(10+aqpR(j,1)*10)*(1.1-t*.5)*Math.min(1,k*1.4),ex=p[0]+sd*bl,ey=p[1]-bl*.5,bx=p[0]+sd*bl*.55,by=p[1]-bl*.1+2.5;
   A(j+1,`<path d="M${aqpF(p[0])} ${aqpF(p[1])}Q${aqpF(p[0]+sd*bl*.5)} ${aqpF(p[1]-bl*.1)} ${aqpF(ex)} ${aqpF(ey)}" stroke="#7d6a25" stroke-width="1.3" fill="none"/><path d="${aqpRib(ex,ey,ex+sd*5,ey-6,ex+sd*8,ey-14*Math.min(1,k*1.3),{a:.8,b:.4,g:3.2,r:.1,f:9})}" fill="#9a8a30" stroke="#6f5f1c" stroke-width=".5"/><circle cx="${aqpF(bx)}" cy="${aqpF(by)}" r="2.7" fill="#d2a843" stroke="#9c7a24" stroke-width=".6"/><circle cx="${aqpF(bx-.8)}" cy="${aqpF(by-.9)}" r=".8" fill="#f6e8b0"/>`)}},
 posidonie:(g,H,A)=>{const k=aqpL(g),n=4+Math.round(g*6),B=H-3;
  A(0,`<path d="M30 ${B}Q50 ${B-5} 70 ${B}" stroke="#6b5a3a" stroke-width="5" stroke-linecap="round" fill="none"/>`);
  for(let i=0;i<n;i++){const u=i/(n-1),x=24+u*52+(aqpR(i,1)-.5)*6,h=(.55+aqpR(i,2)*.4)*H*k,ln=(u-.5)*30+(aqpR(i,3)-.5)*10;
   A(i,`<path d="${aqpRib(x,B,x+ln*.2,B-h*.6,x+ln,B-h,{a:2.3,b:1.8,g:.8})}" fill="${i%2?'#2f8a55':'#3f9f62'}" stroke="#256c43" stroke-width=".5"/>`)}},
 laminaire:(g,H,A)=>{const k=aqpL(g),B=H-3,n=1+Math.round(g*2);let rt='';
  for(let i=0;i<7;i++){const x=34+i*5.4;rt+=`<path d="M${aqpF(x)} ${B}q${aqpF((i-3)*1.6)} -7 ${aqpF((i-3)*2.4)} -12" stroke="#7a5a22" stroke-width="2" fill="none" stroke-linecap="round"/>`}A(0,rt);
  for(let i=0;i<n;i++){const x=n>1?38+i*24/(n-1):50,sh=H*(.3+aqpR(i,2)*.06)*k,top=B-12-sh,ln=(i-(n-1)/2)*18+(aqpR(i,3)-.5)*8,bh=H*(.45+aqpR(i,4)*.1)*k,sd=i%2?-1:1;
   A(i+1,`<path d="M${aqpF(x)} ${B-8}Q${aqpF(x+ln*.3)} ${aqpF(B-12-sh*.5)} ${aqpF(x+ln)} ${aqpF(top)}" stroke="#8a6a2a" stroke-width="${aqpF(3.4*(.5+.5*k))}" fill="none" stroke-linecap="round"/><path d="${aqpRib(x+ln,top,x+ln+8*sd,top-bh*.5,x+ln+4*sd,top-bh,{a:2,b:1,g:10,r:.18,f:15,v:3})}" fill="#b0842e" stroke="#7d5c1c" stroke-width=".6" stroke-linejoin="round"/><path d="M${aqpF(x+ln)} ${aqpF(top)}Q${aqpF(x+ln+8*sd)} ${aqpF(top-bh*.5)} ${aqpF(x+ln+4*sd)} ${aqpF(top-bh*.95)}" stroke="#dcb866" stroke-width=".8" fill="none" opacity=".6"/>`)}}
};
/* dessin d’une plante à l’avancement g (0 à 1) : deux groupes qui ondulent à contretemps */
function aqpSVG(P,g){const A=['',''];AQPD_[P.id](g,P.h,(i,s)=>{A[i%2]+=s});return`<g class="s1">${A[0]}</g><g class="s2">${A[1]}</g>`}
function aqPlHTML(a,now){return AQPT.filter(P=>aqpO(a)[P.id]).map(P=>{const o=a.pl[P.id],g=aqpG(o,P,now),hg=aqpHg(o,now);
 return`<svg class="pl${hg?' hg':''}" data-id="${P.id}" data-q="${Math.round(g*80)+(hg?'h':'')}" viewBox="0 0 100 ${P.h}" style="left:${P.x}%;width:${P.w}%;aspect-ratio:100/${P.h};--sd:${(5+aqpS(P.id)%4).toFixed(1)}s" role="img" aria-label="${P.n}"><g class="pg">${aqpSVG(P,g)}</g></svg>`}).join('')}
function aqPl(){
 const el=$('#aql');if(!el)return;const a=aqRead(),now=Date.now(),pl=aqpO(a);
 const own=AQPT.filter(P=>pl[P.id]),oth=AQPT.filter(P=>!pl[P.id]);
 const pv=(P,g,hg)=>{const c=Math.min(P.h,170);return`<svg viewBox="0 ${P.h-c} 100 ${c}" class="plv${hg?' hg':''}" aria-hidden="true">${aqpSVG(P,g)}</svg>`};
 const row=P=>{const o=pl[P.id],g=aqpG(o,P,now),hg=aqpHg(o,now),can=aqpCan(o,now),pc=Math.floor(g*100),done=g>=1,sat=o.f+AQPD-now,left=(1-g)*P.d*864e5*(hg?2:1);
  const info=done?(hg?'Adulte · elle a faim':'Adulte · épanouie'):(hg?'A faim · pousse 2× moins vite':'Rassasiée')+' · '+pc+' % · ~'+aqFmtD(left);
  const btn=can?`<button class="sb buy" data-a="aqpf" data-v="${P.id}">Nourrir</button>`:`<button class="sb" disabled>Dans ${aqFmtD(sat-AQPW)}</button>`;
  return`<div class="ai${hg?' plh':''}"><div class="ap sq plp">${pv(P,g,hg)}</div><div class="atx"><b>${P.n}</b><small>${info}</small><div class="aqm-bar"><i style="width:${pc}%"></i></div></div>${btn}</div>`};
 const nf=own.filter(P=>aqpCan(pl[P.id],now)).length;
 el.dataset.ps=AQPT.map(P=>{const o=pl[P.id];return o?Math.floor(aqpG(o,P,now)*100)+(aqpHg(o,now)?'h':'')+(aqpCan(o,now)?'c':''):'-'}).join(',');
 el.innerHTML=`<p class="aqc">Les plantes poussent lentement : de 5 jours à 3 semaines selon l’espèce. Nourris-les une fois tous les 2 jours ; si elles ont faim, elles poussent 2 fois plus lentement.</p>`
 +(own.length?`<h3 class="aqh">Mes plantes</h3>`+(nf>1?`<button class="btn aqpa" data-a="aqpa">Nourrir toutes (${nf})</button>`:'')+own.map(row).join(''):'')
 +(oth.length?`<h3 class="aqh">Boutique</h3><div class="aqcar">`+oth.map(P=>`<div class="ai"><div class="ap sq plp">${pv(P,1,0)}</div><div class="atx"><b>${P.n}</b><small>${P.s} · adulte en ${P.d} j</small></div><button class="sb buy ${!UNL()&&fl<P.p?'low':''}" data-a="aqpb" data-v="${P.id}">Acheter · ${P.p} ❄</button></div>`).join('')+`</div>`:'');
}
function aqPlBuy(v){const P=AQPT.find(x=>x.id===v),a=aqRead();mt='m-aq';if(!P||aqpO(a)[v])return;if(!spend(P.p))return;const n=Date.now();a.pl[v]={g:.03,t:n,f:n};aqSave(a);msg(P.n+' plantée ! Nourris-la tous les 2 jours.');sfx(660,.18);aquaRefresh()}
function aqPlFeed(id){const a=aqRead(),now=Date.now();let n=0;mt='m-aq';
 AQPT.forEach(P=>{const o=aqpO(a)[P.id];if(!o||(id&&id!==P.id)||!aqpCan(o,now))return;o.g=aqpG(o,P,now);o.t=now;o.f=now;n++});
 if(!n)return;aqSave(a);sfx(600,.15);msg(n>1?'Tes plantes sont nourries.':'Plante nourrie : elle reprend son rythme.');aquaRefresh();
 document.querySelectorAll('.tank .pl').forEach(e=>{if(!id||e.dataset.id===id){e.classList.add('fd');setTimeout(()=>e.classList.remove('fd'),1600)}})}
function aqPlTick(){const a=aqRead(),now=Date.now();let hn=0;
 document.querySelectorAll('.tank .pl').forEach(e=>{const P=AQPT.find(x=>x.id===e.dataset.id),o=P&&aqpO(a)[P.id];if(!o)return;const g=aqpG(o,P,now),hg=aqpHg(o,now),q=Math.round(g*80)+(hg?'h':'');e.classList.toggle('hg',hg);if(e.dataset.q!==q){e.dataset.q=q;const pg=e.querySelector('.pg');if(pg)pg.innerHTML=aqpSVG(P,g)}});
 AQPT.forEach(P=>{const o=aqpO(a)[P.id];if(o&&aqpHg(o,now))hn++});
 if(hn){const d=$('#nav .ndot');if(d)d.hidden=false}
 const el=$('#aql');if(aqTab==='plant'&&el&&el.dataset.ps){const sg=AQPT.map(P=>{const o=aqpO(a)[P.id];return o?Math.floor(aqpG(o,P,now)*100)+(aqpHg(o,now)?'h':'')+(aqpCan(o,now)?'c':''):'-'}).join(',');if(el.dataset.ps!==sg)aqPl()}}
const aqStatus1=aqStatus;aqStatus=function(){aqStatus1();try{aqPlTick()}catch(e){}};
