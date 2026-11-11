/* la nuit, les lumières achetées éclairent l’aquarium */
const GLW={
 guirlande:()=>{const C=['#ff6b6b','#ffd66b','#6bd4ff','#8dff9c','#d08bff'],o=[];let k=0;for(let i=0;i<4;i++)[.25,.5,.75].forEach(t=>{o.push([i*25+2*(1-t)*t*12.5+t*t*25,(1-t)*(1-t)+2*(1-t)*t*15+t*t*2,26,C[k%5]]);k++});return o},
 lampions:()=>[[20,33,110,'#ffb86b'],[50,49,110,'#ff8aa8'],[80,29,110,'#ffe08a']],
 lanterne:()=>[[50,52,330,'#ffcf7a']],
 meduse:()=>[[50,42,260,'#c9a8ff']],
 cristal:()=>[[50,50,300,'#bfe8ff']]
};
function aqGlowEl(d,q){
 const g=GLW[d.id];if(!g)return'';
 const L=g(),cs=[...new Set(L.map(l=>l[3]))];
 return`<svg class="dc lgo ${d.k||''}" viewBox="${d.vb||'0 0 100 100'}" style="left:${q.x}%;width:${d.w}%;bottom:${q.b}%;aspect-ratio:${d.ar||1};${d.k==='float'?'animation-delay:'+(-(hs(d.id)%7))+'s':''}" aria-hidden="true"><defs>${cs.map(c=>`<radialGradient id="lg${c.slice(1)}"><stop offset="0" stop-color="${c}" stop-opacity=".62"/><stop offset=".4" stop-color="${c}" stop-opacity=".22"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join('')}</defs>${L.map(([x,y,r,c])=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="url(#lg${c.slice(1)})"/>`).join('')}</svg>`;
}
/* un animal qui passe près d’une lumière est éclairé : il retrouve un peu ses couleurs du jour */
function aqLit(){
 if(document.hidden)return;
 const t=document.querySelector('#tank');if(!t)return;
 const sun=parseFloat(getComputedStyle(t).getPropertyValue('--sun')),fs=[...t.querySelectorAll('.fx')];
 const L=isNaN(sun)||sun>.97?[]:[...t.querySelectorAll('.lgo circle')].map(c=>{const r=c.getBoundingClientRect(),m=/lg([0-9a-f]{6})/i.exec(c.getAttribute('fill')||'');return{x:r.left+r.width/2,y:r.top+r.height/2,r:r.width*.34,c:m?'#'+m[1]:'#ffd98a'}});
 fs.forEach(f=>{
  let best=0,bc='';
  if(L.length&&!f._qt){const r=f.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;L.forEach(l=>{const v=Math.max(0,1-Math.hypot(x-l.x,y-l.y)/l.r);if(v>best){best=v;bc=l.c}})}
  const v=best?(Math.min(1,best*1.25)*(1-sun)).toFixed(2):'0';
  if(f._lit!==v){f._lit=v;f.style.setProperty('--lit',v);if(bc)f.style.setProperty('--litc',bc)}
 });
}
setInterval(aqLit,140);
