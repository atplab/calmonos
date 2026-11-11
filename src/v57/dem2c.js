
/* ---- le jeu : cartons à ouvrir, objets à glisser partout (et autant de fois qu’on veut), tiroirs, zoom ---- */
function pDemen2(r){
 const X=isX('demenage',lv),i=X?xn('demenage',lv)-1:lv,R=DRM[i]||DRM[0],ids=X?DXI[i%DXI.length]:R.items,sc=dScene(DRM[i]?i:0),P=sc.P,VW=sc.vw,VH=sc.vh;
 if(r&&r.v!==2)r=null;
 const f2=a=>a.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
 /* rangements : chaque porte ou tiroir est un compartiment */
 const CP=[];sc.st.forEach((S,si)=>S.parts.forEach((q,j)=>CP.push(Object.assign({id:si+'.'+j,si,S},q))));
 const SW=.34;CP.forEach(c=>{const F=c.S.fp,{u0,u1,z0,z1}=c,g={front:[F(u0,z0),F(u1,z0),F(u1,z1),F(u0,z1)]};
  if(c.t==='door'){const wd=(u1-u0)*.96,sg=c.hg==='l'?-1:1,uh=c.hg==='l'?u0:u1,an=c.hg==='l'?SW:1.15,du=sg*wd*Math.sin(an),de=wd*Math.cos(an);g.panel=[F(uh,z0),F(uh,z0,de,du),F(uh,z1,de,du),F(uh,z1)];g.zone=g.front;
   g.slots=[...Array(c.cap)].map((_,k)=>F((u0+u1)/2,z1-(k+.5)*(z1-z0)/c.cap));g.an='c'}
  else{const e=.8,zf=z0+.06;g.floor=[F(u0,zf),F(u1,zf),F(u1,zf,e),F(u0,zf,e)];g.fr=[F(u0,z0,e),F(u1,z0,e),F(u1,z1,e),F(u0,z1,e)];g.sl=[F(u0,z0),F(u0,z0,e),F(u0,z1,e),F(u0,z1)];g.sr=[F(u1,z0),F(u1,z0,e),F(u1,z1,e),F(u1,z1)];g.panel=g.fr;g.zone=dHull([...g.floor,...g.fr]);
   g.slots=[...Array(c.cap)].map((_,k)=>F(u0+(k+1)*(u1-u0)/(c.cap+1),zf,e*.5));g.an='b'}
  c.g=g});
 /* état : objets posés, compartiments ouverts, cartons */
 let placed=r&&r.p?r.p.filter(q=>ids.includes(q.id)&&(!q.c||CP.some(c=>c.id===q.c))):[];
 const op=new Set(r&&r.o?r.o.filter(id=>CP.some(c=>c.id===id)):[]);
 const rng=(q=>()=>{q=(q*1103515245+12345)&0x7fffffff;return q/0x7fffffff})(lv*7919+(X?77:13)),BW=1.05,BH=.8;
 const bHull=(x,y)=>dHull([P(x,y),P(x+BW,y),P(x+BW,y+BW),P(x,y+BW),P(x,y,BH),P(x+BW,y,BH),P(x+BW,y+BW,BH),P(x,y+BW,BH)]);
 const xH=(a,b)=>a.some(q=>dIn(q,b))||b.some(q=>dIn(q,a))||dIn(dCen(a),b);
 /* cartons : au sol, sans chevaucher les meubles, et rien devant qui cache le carton ou l’objet qui en sort */
 const frB=(C,O)=>{const e=.02,sx=C.x>=O.x+O.w-e,sy=C.y>=O.y+O.d-e,bx=C.x+C.w<=O.x+e,by=C.y+C.d<=O.y+e;if(sx&&!by)return true;if(sy&&!bx)return true;if((sx&&by)||(sy&&bx))return C.x+C.w/2+C.y+C.d/2>O.x+O.w/2+O.y+O.d/2;return false};
 const cH=c=>dHull([P(c.x,c.y,c.z),P(c.x+c.w,c.y,c.z),P(c.x+c.w,c.y+c.d,c.z),P(c.x,c.y+c.d,c.z),P(c.x,c.y,c.z+c.h),P(c.x+c.w,c.y,c.z+c.h),P(c.x+c.w,c.y+c.d,c.z+c.h),P(c.x,c.y+c.d,c.z+c.h)]);
 const iRect=(x,y,z0=0)=>{const c=P(x+BW/2,y+BW/2,BH+z0);return[[c[0]-17,c[1]-40],[c[0]+17,c[1]-40],[c[0]+17,c[1]+2],[c[0]-17,c[1]+2]]};
 const CHH=sc.ch.map(cH);
 const hidden=(x,y,others)=>{const O={x,y,w:BW,d:BW},bh=bHull(x,y),ir=iRect(x,y);
  if(sc.ch.some((c,j)=>frB(c,O)&&(xH(CHH[j],ir)||xH(CHH[j],bh))))return true;
  return others.some(([u,v])=>{const Q={x:u,y:v,w:BW,d:BW};return(frB(Q,O)&&(xH(bHull(u,v),ir)||xH(bHull(u,v),bh)))||(frB(O,Q)&&xH(bh,iRect(u,v)))})};
 const BX=(()=>{const nb=Math.min(3,Math.max(2,Math.ceil(ids.length/4))),zh=sc.zs.filter(z=>z.k!=='floor'&&z.k!=='wall').map(z=>z.hull).concat(CP.map(c=>dHull([...c.g.front,...c.g.panel,...(c.g.floor||[])]))),cand=[];
  for(let x=.2;x<=R.W-BW-.15;x+=.25)for(let y=.2;y<=R.D-BW-.15;y+=.25)cand.push([x,y,x+y+rng()*3]);cand.sort((a,b)=>b[2]-a[2]);
  const onF=(x,y)=>sc.ch.some(c=>c.z<.3&&c.x<x+BW&&c.x+c.w>x&&c.y<y+BW&&c.y+c.d>y);
  const ch=[];for(const pass of[0,1,2,3])for(const[x,y]of cand){if(ch.length>=nb)break;if(ch.some(([u,v])=>Math.abs(u-x)<1.3&&Math.abs(v-y)<1.3))continue;
   if(pass<3&&onF(x,y))continue;if(pass<2&&zh.some(h=>xH(bHull(x,y),h)))continue;if(pass<3&&hidden(x,y,ch))continue;if(pass===0&&ch.some(([u,v])=>Math.abs(u-x)<1.6&&Math.abs(v-y)<1.6))continue;ch.push([x,y])}
  return ch.sort((a,b)=>(a[0]+a[1])-(b[0]+b[1]))})();
 /* option de pièce : le carton le plus à droite est posé sur celui le plus à gauche */
 const BZ=BX.map(()=>0),ON={};if(R.stk&&BX.length>=2){const sx=k=>P(BX[k][0]+BW/2,BX[k][1]+BW/2)[0],ks=BX.map((_,k)=>k).sort((a,b)=>sx(a)-sx(b)),lo=ks[0],hi=ks[ks.length-1];BX[hi]=BX[lo].slice();BZ[hi]=BH;ON[lo]=hi}
 const bx=(()=>{if(r&&r.b&&r.b.length===BX.length&&r.b.flat().slice().sort().join()===ids.slice().sort().join())return r.b.map(a=>a.slice());const o=BX.map(()=>[]),s=ids.slice();for(let k=s.length-1;k>0;k--){const j=Math.floor(rng()*(k+1));[s[k],s[j]]=[s[j],s[k]]}s.forEach((id,k)=>o[k%BX.length].push(id));return o})();
 const bop=new Set(r&&r.bo?r.bo:[]);
 let sel=null,done=false,checked=false,fresh=-1,hintT=0;
 snap=()=>({v:2,p:placed,o:[...op],b:bx,bo:[...bop]});
 const isP=id=>placed.some(q=>q.id===id),left=()=>ids.filter(id=>!isP(id)),stk=k=>bx[k].filter(id=>!isP(id));
 const okA=id=>(DOK[id]&&DOK[id].a)||[],stOf=q=>DIT[q.id][2].includes(q.k)?2:okA(q.id).includes(q.k)?1:0;
 /* ---- dessin ---- */
 const CH=sc.ch,NS=CH.length;let html='',at=0;[...sc.st.map((S,si)=>({at:S.at,t:0,g:`<g id="dmst${si}"></g>`})),...CH.map((c,j)=>({at:c.at,t:1,g:`<g id="dmc${j}"></g>`}))].sort((a,b)=>a.at-b.at||a.t-b.t).forEach(m=>{html+=sc.s.slice(at,m.at)+m.g;at=m.at});html+=sc.s.slice(at)+`<g id="dmc${NS}"></g>`;
 /* profondeur : un objet au sol se dessine juste avant le premier meuble qui est devant lui */
 const fr=(C,O)=>{const e=.02,sx=C.x>=O.x+O.w-e,sy=C.y>=O.y+O.d-e,bx=C.x+C.w<=O.x+e,by=C.y+C.d<=O.y+e;if(sx&&!by)return true;if(sy&&!bx)return true;if((sx&&by)||(sy&&bx))return C.x+C.w/2+C.y+C.d/2>O.x+O.w/2+O.y+O.d/2;return false};
 const slotF=(fx,fy,fw,fd)=>{const O={x:fx,y:fy,w:fw,d:fd};let j=NS-1;while(j>=0&&!fr(O,CH[j]))j--;return j+1};
 const w2=(sx,sy)=>{const a=(sx-sc.OX)/DU,b=2*(sy-sc.OY)/DU;return[(a+b)/2,(b-a)/2]};
 const slotQ=q=>{const z=q.zi!=null?sc.zs[q.zi]:zAt([q.x,q.y-1]);if(!z||z.k==='floor'){const[x,y]=w2(q.x,q.y);return slotF(x-.3,y-.3,.6,.6)}if(z.k==='wall')return 0;return Math.min(NS,z.ci+1)};
 frame(`<div class="dm2"><div class="dmhud"><div class="dmhn"><b>${X?'Fêtes · ':''}${R.n}</b><div class="dmbar" aria-hidden="true"><i id="dmpb"></i></div><small id="dmbn"></small></div><span class="dmpc" id="dmpc"></span><div class="dmbt"><button class="dmib" data-a="dmz" data-v="-1" aria-label="Dézoomer">−</button><button class="dmib" data-a="dmz" data-v="1" aria-label="Zoomer">+</button><button class="dmib" data-a="dmpause" aria-label="Pause"><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="5" y="4" width="3.4" height="12" rx="1.4"/><rect x="11.6" y="4" width="3.4" height="12" rx="1.4"/></svg></button></div></div><div class="dmw2" id="dmw"><svg id="dmr" viewBox="0 0 ${VW} ${VH}" role="img" aria-label="${R.n}">${html}<g id="dmh"></g><g id="dmdg"></g><g id="dmfx"></g></svg></div></div>`,3);
 const svg=$('#dmr'),alive=()=>$('#dmr')===svg&&playing,ptr=e=>{const m=svg.getScreenCTM();if(!m)return null;const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse());return[p.x,p.y]};
 const it=(id,x,y,an,z,cls='')=>`<g class="dmit ${cls}" data-id="${id}">${an==='b'?`<ellipse cx="${x.toFixed(1)}" cy="${(y-.5).toFixed(1)}" rx="${(z*.34).toFixed(1)}" ry="${(z*.1).toFixed(1)}" fill="rgba(50,30,10,.2)"/>`:''}<rect class="dmhit" x="${(x-z*.4).toFixed(1)}" y="${(y-(an==='c'?z*.45:z*.9)).toFixed(1)}" width="${(z*.8).toFixed(1)}" height="${(z*.85).toFixed(1)}" fill="transparent"/><svg x="${(x-z/2).toFixed(1)}" y="${(y-(an==='c'?z/2:z*.94)).toFixed(1)}" width="${z}" height="${z}" viewBox="0 0 32 32"><title>${DIT[id][0]}</title>${DIT[id][1]}</svg></g>`;
 const cls=q=>(q.pop?'pop ':'')+(sel===q.id?'sel ':'')+(checked&&stOf(q)===0?'bad ':'')+(checked&&stOf(q)===1?'meh ':'')+(drag&&drag.mv&&drag.id===q.id?'lift':'');
 const knob=(p,c)=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="1.4" fill="#e8d9a8" stroke="${dSh(c,.5)}" stroke-width=".4"/>`;
 const mid=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t],ln=(a,b,c,w)=>`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
 const stores=()=>sc.st.forEach((S,si)=>{const h=$('#dmst'+si);if(!h)return;const cs=CP.filter(c=>c.si===si);let o='';
  [...cs.filter(c=>!op.has(c.id)),...cs.filter(c=>op.has(c.id)).sort((a,b)=>a.z0-b.z0)].forEach(c=>{const g=c.g,col=S.c,O=op.has(c.id);
   if(!O){o+=`<polygon class="dmd" data-c="${c.id}" points="${f2(g.front)}" fill="${dSh(col,c.t==='door'?.96:.92)}" stroke="${dSh(col,.55)}" stroke-width=".9" stroke-linejoin="round"/>`;
    if(c.t==='door'){const e=c.hg==='l'?mid(g.front[1],g.front[2],.5):mid(g.front[0],g.front[3],.5);o+=knob(mid(e,c.hg==='l'?mid(g.front[0],g.front[3],.5):mid(g.front[1],g.front[2],.5),.14),col)}
    else o+=ln(mid(mid(g.front[0],g.front[3],.5),mid(g.front[1],g.front[2],.5),.4),mid(mid(g.front[0],g.front[3],.5),mid(g.front[1],g.front[2],.5),.6),'#e8d9a8',1.8);return}
   const its=placed.filter(q=>q.c===c.id).map(q=>it(q.id,q.x,q.y,q.a,c.t==='door'?(c.k==='wardrobe'?20:c.k==='shed'?24:16):15,cls(q))).join('');
   if(c.t==='door'){o+=`<polygon points="${f2(g.front)}" fill="#3b2a20" stroke="${dSh(col,.5)}" stroke-width=".9"/>`;
    o+=c.k==='wardrobe'?ln(mid(g.front[0],g.front[3],.88),mid(g.front[1],g.front[2],.88),'#b9c3d2',1.6):`<polygon points="${f2([mid(g.front[0],g.front[3],.5),mid(g.front[1],g.front[2],.5),mid(g.front[1],g.front[2],.54),mid(g.front[0],g.front[3],.54)])}" fill="#6b4c38"/>`;
    o+=its+`<polygon class="dmd o" data-c="${c.id}" points="${f2(g.panel)}" fill="${dSh(col,1.05)}" stroke="${dSh(col,.55)}" stroke-width=".9" stroke-linejoin="round"/>`}
   else{o+=`<polygon points="${f2(g.front)}" fill="#2e2018"/><polygon points="${f2(g.sl)}" fill="${dSh(col,.7)}" stroke="${dSh(col,.5)}" stroke-width=".6"/><polygon points="${f2(g.floor)}" fill="#5a4030" stroke="${dSh(col,.5)}" stroke-width=".6"/>`+its+`<polygon points="${f2(g.sr)}" fill="${dSh(col,.8)}" stroke="${dSh(col,.5)}" stroke-width=".6"/><polygon class="dmd o" data-c="${c.id}" points="${f2(g.fr)}" fill="${dSh(col,.95)}" stroke="${dSh(col,.55)}" stroke-width=".9" stroke-linejoin="round"/>`+ln(mid(mid(g.fr[0],g.fr[3],.5),mid(g.fr[1],g.fr[2],.5),.4),mid(mid(g.fr[0],g.fr[3],.5),mid(g.fr[1],g.fr[2],.5),.6),'#e8d9a8',1.8)}});
  h.innerHTML=o});
 const boxes=()=>{const out=[];const cb='#c8955a';
  BX.forEach(([x,y],k)=>{const S=stk(k);if(!S.length)return;let o='';const z0=BZ[k],Pz=(u,v,w=0)=>P(u,v,w+z0);const T=[Pz(x,y,BH),Pz(x+BW,y,BH),Pz(x+BW,y+BW,BH),Pz(x,y+BW,BH)],Lf=[Pz(x,y+BW),Pz(x+BW,y+BW),Pz(x+BW,y+BW,BH),Pz(x,y+BW,BH)],Rf=[Pz(x+BW,y),Pz(x+BW,y+BW),Pz(x+BW,y+BW,BH),Pz(x+BW,y,BH)],pg=(a,f)=>`<polygon points="${f2(a)}" fill="${f}" stroke="${dSh(cb,.6)}" stroke-width=".8" stroke-linejoin="round"/>`,O=bop.has(k);
   const sh=Pz(x+BW/2,y+BW/2,0);o+=`<g class="dmbx${O?' op':''}${fresh===k?' fresh':''}" data-bx="${k}">${z0?'':`<ellipse cx="${sh[0].toFixed(1)}" cy="${(sh[1]+3).toFixed(1)}" rx="${(BW*DU*1.3).toFixed(1)}" ry="${(BW*DU*.55).toFixed(1)}" fill="rgba(50,30,10,.16)"/>`}`;
   if(!O){o+=pg(Lf,cb)+pg(Rf,dSh(cb,.82))+pg(T,dSh(cb,1.12))+ln(Pz(x+BW/2,y,BH),Pz(x+BW/2,y+BW,BH),'#e8d2a2',3)+ln(Pz(x+BW/2,y+BW,BH),Pz(x+BW/2,y+BW,BH-.32),'#e8d2a2',3);const lb=mid(Rf[0],Rf[2],.5);o+=`<rect x="${(lb[0]-4).toFixed(1)}" y="${(lb[1]-3).toFixed(1)}" width="8" height="5" rx="1" fill="#f4ead2" transform="skewY(-26.6)" transform-origin="${lb[0].toFixed(1)} ${lb[1].toFixed(1)}"/>`}
   else{/* rabats articulés sur chaque bord du dessus : ceux du fond se dressent vers l’arrière, ceux de devant retombent vers l’extérieur */
    const F=.46,up=[Math.cos(1.05)*F,Math.sin(1.05)*F],dn=[Math.cos(.45)*F,-Math.sin(.45)*F];
    const fBack1=[Pz(x,y,BH),Pz(x+BW,y,BH),Pz(x+BW,y-up[0],BH+up[1]),Pz(x,y-up[0],BH+up[1])],fBack2=[Pz(x,y,BH),Pz(x,y+BW,BH),Pz(x-up[0],y+BW,BH+up[1]),Pz(x-up[0],y,BH+up[1])];
    const fFr1=[Pz(x+BW,y,BH),Pz(x+BW,y+BW,BH),Pz(x+BW+dn[0],y+BW,BH+dn[1]),Pz(x+BW+dn[0],y,BH+dn[1])],fFr2=[Pz(x,y+BW,BH),Pz(x+BW,y+BW,BH),Pz(x+BW,y+BW+dn[0],BH+dn[1]),Pz(x,y+BW+dn[0],BH+dn[1])];
    o+=`<g class="fl">${pg(fBack2,dSh(cb,.9))+pg(fBack1,dSh(cb,1.04))}</g>`+pg(Lf,cb)+pg(Rf,dSh(cb,.82))+pg(T,'#5a3d22')+pg([Pz(x+.06,y+.06,BH),Pz(x+BW-.06,y+.06,BH),Pz(x+BW-.06,y+.06,BH-.25),Pz(x+.06,y+.06,BH-.25)],'#7a5434');
    const c0=Pz(x+BW/2,y+BW/2,BH),vis=S.slice(-1);vis.forEach((id,j)=>{const top=j===vis.length-1,z=top?Math.min(32,dSz(id)+4):22,cy=c0[1]+6-j*9;
     o+=`<g class="${top?'dmtop':'dmsk'}${top&&sel===id?' sel':''}${fresh===k?' rise':''}" data-id="${id}" style="${fresh===k?`animation-delay:${j*140+120}ms`:''}"><rect x="${(c0[0]-z*.45).toFixed(1)}" y="${(cy-z*.94).toFixed(1)}" width="${(z*.9).toFixed(1)}" height="${(z*.94).toFixed(1)}" fill="transparent"/><svg x="${(c0[0]-z/2).toFixed(1)}" y="${(cy-z*.94).toFixed(1)}" width="${z}" height="${z}" viewBox="0 0 32 32"><title>${DIT[id][0]}</title>${DIT[id][1]}</svg></g>`});
    o+=`<g class="fl">${pg(fFr1,dSh(cb,.88))+pg(fFr2,dSh(cb,1.08))}</g>`}
   o+='</g>';out.push([k,o])});fresh=-1;return out};
 const hud=()=>{const n=ids.length,ok=placed.length,lb=left().length,b=$('#dmpb'),c=$('#dmpc'),bn=$('#dmbn');if(b)b.style.width=(ok/n*100).toFixed(1)+'%';if(c)c.textContent=ok+' / '+n;if(bn)bn.textContent=lb?'📦 '+lb+' dans les cartons':'Cartons vides'};
 let slotH=[];const layer=()=>{stores();const S=[];const add=(j,y,h)=>{(S[j]=S[j]||[]).push([y,h])};
  boxes().forEach(([k,h])=>{const[x,y]=BX[k];add(slotF(x,y,BW,BW),P(x+BW,y+BW)[1]+BZ[k]*.01,h)});
  placed.filter(q=>!q.c).forEach(q=>add(slotQ(q),q.y,it(q.id,q.x,q.y,q.a,dSz(q.id),cls(q))));
  for(let j=0;j<=NS;j++){const h=(S[j]||[]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]).join('');if(slotH[j]!==h){const e=$('#dmc'+j);if(e)e.innerHTML=h;slotH[j]=h}}hud()};
 /* ---- placer ---- */
 const hitOrd=()=>sc.st.map((S,si)=>si).reverse().flatMap(si=>{const cs=CP.filter(c=>c.si===si);return[...cs.filter(c=>op.has(c.id)).sort((a,b)=>b.z0-a.z0),...cs.filter(c=>!op.has(c.id))]});
 const cAt=pt=>{for(const c of hitOrd()){const g=c.g,O=op.has(c.id);if(O&&dIn(pt,g.panel))return{c,panel:1};if(O&&dIn(pt,g.zone))return{c,inside:1};if(!O&&dIn(pt,g.front))return{c,closed:1}}return null};
 const zAt=pt=>[...sc.zs].reverse().find(z=>dIn(pt,z.hull));
 const toggle=(c,v)=>{if(v)op.add(c.id);else op.delete(c.id);sfx(v?420:330,.18);vib(6);layer();sv()};
 const chip=(q,s)=>{const fx=$('#dmfx');if(!fx||!s)return;const e=document.createElementNS('http://www.w3.org/2000/svg','text');e.setAttribute('x',q.x);e.setAttribute('y',q.y-(q.a==='c'?14:dSz(q.id)+2));e.setAttribute('class','dmchip '+(s===2?'ok':'mid'));e.textContent=s===2?'✓':'≈';fx.appendChild(e);setTimeout(()=>e.remove(),1100)};
 const put=(id,pt)=>{
  const h=cAt(pt);let q=null;
  if(h&&(h.inside||(h.panel&&h.c.t==='drawer'))){const c=h.c,used=new Set(placed.filter(o=>o.c===c.id&&o.id!==id).map(o=>o.s)),k=[...Array(c.cap).keys()].find(j=>!used.has(j));
   if(k===undefined){const tw=CP.find(o=>o.S===c.S&&o!==c&&o.t==='door'&&c.t==='door'&&!op.has(o.id));msg(tw?'Plus de place de ce côté : ouvre l’autre porte.':'Plus de place ici.');sfx(260,.2);return null}
   const s0=c.g.slots[k];q={id,x:+s0[0].toFixed(1),y:+s0[1].toFixed(1),a:c.g.an,k:c.k,c:c.id,s:k}}
  else if(h&&h.closed&&(DIT[id][2].includes(h.c.k)||okA(id).includes(h.c.k))){msg(h.c.t==='door'?'C’est fermé : touche la porte pour l’ouvrir.':'Touche le tiroir pour l’ouvrir.');return null}
  else{const z=zAt(pt);if(!z){msg('Pose-le dans la pièce.');return null}const a=dClamp(pt,z.top);q={id,x:+a[0].toFixed(1),y:+a[1].toFixed(1),a:z.a,k:z.k,c:'',s:0,zi:sc.zs.indexOf(z)}}
  placed=placed.filter(o=>o.id!==id);q.pop=1;placed.push(q);sel=null;msg('');
  sfx(560,.2);vib(8);layer();placed.forEach(o=>delete o.pop);sv();check();return q};
 /* ---- fin de pièce ---- */
 const check=()=>{if(done)return;if(left().length){if(checked){checked=false;layer()}return}
  const bad=placed.filter(q=>stOf(q)===0),meh=placed.filter(q=>stOf(q)===1);checked=true;layer();
  if(bad.length||meh.length){[...bad,...meh].forEach(q=>{if(q.c)op.add(q.c)});layer();const t=[];if(bad.length)t.push(bad.length+(bad.length>1?' objets ne sont pas à leur place (en rouge)':' objet n’est pas à sa place (en rouge)'));if(meh.length)t.push(meh.length+(meh.length>1?' pourraient être mieux rangés (en jaune)':' pourrait être mieux rangé (en jaune)'));msg(t.join(' et ')+(bad.length+meh.length>1?' : déplace-les.':' : déplace-le.'));sfx(300,.25);return}
  done=true;success()};
 const success=()=>{const fx=$('#dmfx');placed.forEach((q,k)=>setTimeout(()=>{if(!alive()||!fx)return;for(let j=0;j<5;j++){const e=document.createElementNS('http://www.w3.org/2000/svg','circle'),a=j*1.257+k,d=9+(j%2)*5;e.setAttribute('cx',q.x);e.setAttribute('cy',q.y-(q.a==='c'?0:dSz(q.id)/2));e.setAttribute('r',1.6);e.setAttribute('class','dmspk');e.style.setProperty('--dx',(Math.cos(a)*d).toFixed(1)+'px');e.style.setProperty('--dy',(Math.sin(a)*d).toFixed(1)+'px');fx.appendChild(e);setTimeout(()=>e.remove(),900)}sfx(660+k%5*90,.12)},k*90));
  const ex=placed.length,ac=0,w=$('#dmw');
  setTimeout(()=>{if(!alive())return;if(w){w.classList.add('dmdone');const b=document.createElement('div');b.className='dmwin';b.innerHTML=`<b>Pièce terminée ✦</b><small>${ex} parfaitement rangé${ex>1?'s':''}${ac?' · '+ac+' acceptable'+(ac>1?'s':''):''}</small>`;w.appendChild(b)}confetti(svg);[523,659,784,1047].forEach((f,k)=>setTimeout(()=>sfx(f,.5),k*150))},placed.length*90+200);
  setTimeout(()=>{if(alive())win()},placed.length*90+2600)};
 /* ---- zoom et déplacement de la vue ---- */
 const vb={x:0,y:0,w:VW,h:VH};
 const setVB=()=>{if(![vb.x,vb.y,vb.w].every(Number.isFinite)){vb.x=0;vb.y=0;vb.w=VW}vb.w=Math.max(VW/3.2,Math.min(VW,vb.w));vb.h=vb.w*VH/VW;vb.x=Math.max(0,Math.min(VW-vb.w,vb.x));vb.y=Math.max(0,Math.min(VH-vb.h,vb.y));svg.setAttribute('viewBox',`${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}`);const w=$('#dmw');if(w)w.classList.toggle('zm',vb.w<VW-1)};
 const zoomAt=(f,cx,cy)=>{const nw=Math.max(VW/3.2,Math.min(VW,vb.w/f)),k=nw/vb.w;vb.x=cx-(cx-vb.x)*k;vb.y=cy-(cy-vb.y)*k;vb.w=nw;setVB()};
 act.dmz=v=>zoomAt(+v>0?1.5:1/1.5,vb.x+vb.w/2,vb.y+vb.h/2);
 svg.addEventListener('wheel',e=>{e.preventDefault();const p=ptr(e);if(p)zoomAt(e.deltaY<0?1.15:1/1.15,p[0],p[1])},{passive:false});
 /* ---- doigts : objet (glisser / toucher), fond (toucher, déplacer la vue, pincer) ---- */
 let drag=null;const pts=new Map();let bg=null;
 /* l’objet suit le doigt, dans la pièce (même taille, même zoom) */
 const ghost=(id,e)=>{const g=$('#dmdg'),p=ptr(e);if(!g||!p)return;const z=Math.round(dSz(id)*1.12);let s=g.firstChild;if(!s||s.dataset.id!==id){g.innerHTML=`<g class="dmdrag" data-id="${id}"><ellipse class="dmds" rx="${(z*.3).toFixed(1)}" ry="${(z*.09).toFixed(1)}" fill="rgba(40,25,10,.22)"/><svg width="${z}" height="${z}" viewBox="0 0 32 32">${DIT[id][1]}</svg></g>`;s=g.firstChild}
  const sv=s.querySelector('svg'),sh=s.querySelector('ellipse'),lift=z*.35;sv.setAttribute('x',(p[0]-z/2).toFixed(1));sv.setAttribute('y',(p[1]-z*.94-lift).toFixed(1));sh.setAttribute('cx',p[0].toFixed(1));sh.setAttribute('cy',p[1].toFixed(1))};
 const noGhost=()=>{const g=$('#dmdg');if(g)g.innerHTML='';const o=$('#dmg');if(o)o.remove()};
 let hvT=0;const hover=e=>{cancelAnimationFrame(hvT);hvT=requestAnimationFrame(()=>{const h=$('#dmh');if(!h||!drag)return;const p=ptr(e);if(!p)return;const c=cAt(p);let a=null;if(c&&c.inside)a=c.c.g.zone;else if(c&&c.closed)a=c.c.g.front;else{const z=zAt(p);if(z&&z.k!=='floor'&&z.k!=='wall')a=z.hull}h.innerHTML=a?`<polygon class="dmhv" points="${f2(a)}"/>`:''})};
 const dmv=e=>{if(!drag)return;if(!drag.mv&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>6){drag.mv=true;sel=null;svg.querySelectorAll('.dmit.sel,.dmtop.sel').forEach(x=>x.classList.remove('sel'));svg.querySelectorAll(`[data-id="${drag.id}"]`).forEach(x=>{if(!x.classList.contains('dmdrag'))x.classList.add('lift')});sfx(480,.08)}if(drag.mv){e.preventDefault();ghost(drag.id,e);hover(e)}};
 const dup=e=>{document.removeEventListener('pointermove',dmv);document.removeEventListener('pointerup',dup);document.removeEventListener('pointercancel',dcn);const d=drag;drag=null;noGhost();slotH=[];const h=$('#dmh');if(h)h.innerHTML='';if(!d)return;
  if(d.mv){const r0=svg.getBoundingClientRect();if(e.clientX>=r0.left&&e.clientX<=r0.right&&e.clientY>=r0.top&&e.clientY<=r0.bottom){const p=ptr(e);if(p)put(d.id,p)}layer()}
  else{sel=sel===d.id?null:d.id;layer();msg(sel?'Touche l’endroit où poser « '+DIT[sel][0]+' ».':'');sfx(500,.1)}};
 const dcn=()=>{document.removeEventListener('pointermove',dmv);document.removeEventListener('pointerup',dup);document.removeEventListener('pointercancel',dcn);drag=null;noGhost();slotH=[];layer()};
 svg.addEventListener('pointerdown',e=>{
  let t=e.target.closest&&e.target.closest('.dmtop,.dmit');if(!t){const ob=e.target.closest&&e.target.closest('.dmbx.op');if(ob)t=ob.querySelector('.dmtop')}
  if(t&&!pts.size&&!done){e.preventDefault();e.stopPropagation();try{svg.setPointerCapture(e.pointerId)}catch(_){}drag={id:t.dataset.id,x:e.clientX,y:e.clientY,mv:false};document.addEventListener('pointermove',dmv);document.addEventListener('pointerup',dup);document.addEventListener('pointercancel',dcn);return}
  pts.set(e.pointerId,{x:e.clientX,y:e.clientY});try{svg.setPointerCapture(e.pointerId)}catch(_){}
  if(pts.size===1)bg={x:e.clientX,y:e.clientY,vx:vb.x,vy:vb.y,mv:false,tg:e.target};
  else if(pts.size===2){const[a,b]=[...pts.values()],m=ptr({clientX:(a.x+b.x)/2,clientY:(a.y+b.y)/2});bg={pinch:1,d0:Math.hypot(a.x-b.x,a.y-b.y),w0:vb.w,m0:m,mv:true}}});
 svg.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId)||!bg)return;pts.set(e.pointerId,{x:e.clientX,y:e.clientY});const rw=svg.getBoundingClientRect().width;
  if(bg.pinch&&pts.size===2){const[a,b]=[...pts.values()],d=Math.hypot(a.x-b.x,a.y-b.y),R0=svg.getBoundingClientRect();if(!bg.m0||!(bg.d0>0)||!R0.width)return;
   /* zoom et déplacement en même temps : le point pincé reste sous les doigts */
   const nw=Math.max(VW/3.2,Math.min(VW,bg.w0*bg.d0/d)),nh=nw*VH/VW,mx=((a.x+b.x)/2-R0.left)/R0.width,my=((a.y+b.y)/2-R0.top)/R0.height;vb.w=nw;vb.x=bg.m0[0]-mx*nw;vb.y=bg.m0[1]-my*nh;setVB();return}
  const dx=e.clientX-bg.x,dy=e.clientY-bg.y;if(!bg.mv&&Math.hypot(dx,dy)>7)bg.mv=true;if(bg.mv&&vb.w<VW-1){const k=vb.w/rw;vb.x=bg.vx-dx*k;vb.y=bg.vy-dy*k;setVB()}});
 const bgEnd=e=>{if(!pts.has(e.pointerId))return;pts.delete(e.pointerId);const b=bg;if(pts.size){const[q]=[...pts.values()];bg={x:q.x,y:q.y,vx:vb.x,vy:vb.y,mv:true};return}bg=null;if(!b||b.mv||b.pinch||e.type==='pointercancel'||done)return;
  const p=ptr(e);if(!p)return;const be=b.tg&&b.tg.closest&&b.tg.closest('.dmbx:not(.op)');
  if(be){const k=+be.dataset.bx;if(ON[k]!=null&&stk(ON[k]).length){msg('Vide d’abord le carton du dessus.');sfx(260,.15);return}bop.add(k);fresh=k;sfx(300,.2);setTimeout(()=>sfx(470,.18),110);vib(10);layer();sv();msg('Les objets sortent du carton : prends celui du dessus.');return}
  const h=cAt(p);
  if(h&&h.closed){toggle(h.c,true);if(!sel)msg(h.c.t==='door'?'La porte est ouverte.':'Le tiroir est ouvert.');return}
  if(h&&h.panel&&!sel){toggle(h.c,false);msg('');return}
  if(sel)put(sel,p)};
 svg.addEventListener('pointerup',bgEnd);svg.addEventListener('pointercancel',bgEnd);svg.addEventListener('contextmenu',e=>e.preventDefault());
 /* ---- pause, indice ---- */
 act.dmpause=()=>{const n=ids.length,ok=placed.length;const e=$('#dmo');if(e)e.remove();const d=document.createElement('div');d.className='sfr';d.id='dmo';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');
  d.innerHTML=`<div class="glass sfc dmps"><small>Pause</small><h2>${R.n}</h2><div class="dmbar big"><i style="width:${(ok/n*100).toFixed(1)}%"></i></div><p class="note">${ok} objet${ok>1?'s':''} sorti${ok>1?'s':''} des cartons sur ${n}</p><button class="btn" data-a="dmx">Reprendre</button><button class="btn alt" data-a="dmrst">Recommencer la pièce</button><button class="btn alt" data-a="dmlv">Choisir une pièce</button></div>`;app.appendChild(d)};
 act.dmx=()=>{const d=$('#dmo');if(d)d.remove()};
 act.dmrst=()=>{act.dmx();st.set(pkey(),null);start('demenage',false,lv)};
 act.dmlv=()=>{act.dmx();hub('demenage')};
 act.hint=()=>{const tops=bx.map((_,k)=>{const S=stk(k);return bop.has(k)&&S.length?S[S.length-1]:null}).filter(Boolean);const bad=checked?placed.filter(q=>stOf(q)<2).map(q=>q.id):[];
  const id=sel||bad[0]||tops[0];if(!id){if(left().length){msg('Ouvre un carton pour découvrir les objets.')}return}if(!spend(3))return;const h=$('#dmh');if(!h)return;const C=DIT[id][2];
  h.innerHTML=sc.zs.filter(z=>C.includes(z.k)).map(z=>`<polygon class="dmhz" points="${f2(z.hull)}"/>`).join('')+CP.filter(c=>C.includes(c.k)).map(c=>`<polygon class="dmhz" points="${f2(op.has(c.id)?c.g.zone:c.g.front)}"/>`).join('');
  msg(`Indice : « ${DIT[id][0]} » se range sur la zone qui brille.`);clearTimeout(hintT);hintT=setTimeout(()=>{const g=$('#dmh');if(g&&!drag)g.innerHTML=''},3200)};
 layer();setVB();
 if(window.__DMDBG)window.__DMDBG({sc,CP,op,bx,bop,stk,toggle,P,svg,placed:()=>placed,stOf,cAt,zAt});
 if(!r&&!X&&dStory[lv]&&!st.get(ckey('demenage')+':'+lv,false))dmOv(`<small>${dStory[lv][0]}</small><p class="sfq">${dStory[lv][1]}</p>`,'Ouvrir les cartons');
 if(!r)msg('Touche un carton pour l’ouvrir.');
 else setTimeout(()=>{if(alive())check()},300);
}
