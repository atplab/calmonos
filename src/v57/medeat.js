/* la méduse attrape le grain avec ses tentacules et l’amène sous son ombrelle, dans sa bouche */
window.aqMedEat=el=>{try{
 const s=el.querySelector('.fi svg')||el.querySelector('svg');if(!s)return;const g=s.querySelector('g');if(!g)return;
 const N='http://www.w3.org/2000/svg',c=document.createElementNS(N,'circle');
 c.setAttribute('r','3');c.setAttribute('fill','#f6c46a');c.setAttribute('stroke','#fff3cf');c.setAttribute('stroke-width','1');
 s.insertBefore(c,g.nextSibling);
 s.classList.remove('mgr');void s.getBoundingClientRect();s.classList.add('mgr');
 const x0=9,y0=27,x1=53,y1=24,T=1100,t0=performance.now(),e=q=>q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2;
 const st=n=>{const k=Math.min(1,(n-t0)/T);let x=x0,y=y0,r=3;
  if(k>.18){const q=e(Math.min(1,(k-.18)/.56));x=x0+(x1-x0)*q;y=y0+(y1-y0)*q+Math.sin(q*Math.PI*2)*2.2}
  if(k>.74){x=x1;y=y1;r=3*(1-(k-.74)/.26)}
  c.setAttribute('cx',x.toFixed(1));c.setAttribute('cy',y.toFixed(1));c.setAttribute('r',Math.max(0,r).toFixed(2));
  if(k<1)requestAnimationFrame(st);else{c.remove();s.classList.remove('mgr')}};
 requestAnimationFrame(st);
}catch(e){}};
