/* ---- meubles : chacun dessine ses pavés et déclare ses zones d’accueil ---- */
const dWood='#c58a54',dDark='#8a5a36',dWhite='#f1f2f7';
const dWinR=(o,x0,x1,z0,z1,sky='#a9d6f2')=>{o.pg(o.qR(x0-.12,x1+.12,z0-.12,z1+.12),'#f4f1ea','#cfc8b8');o.pg(o.qR(x0,x1,z0,z1),sky);const m=(x0+x1)/2,zm=(z0+z1)/2;o.ln(o.P(m,0,z0),o.P(m,0,z1),'#f4f1ea',1.6);o.ln(o.P(x0,0,zm),o.P(x1,0,zm),'#f4f1ea',1.6);o.pg([o.P(x0,0,z0),o.P(x0+(x1-x0)*.45,0,z0),o.P(x0+(x1-x0)*.2,0,z1),o.P(x0,0,z1)],'#fff',null);o.s=o.s.replace(/(<polygon [^>]*fill="#fff"\/>)$/,'<g opacity=".35">$1</g>')};
const dWinL=(o,y0,y1,z0,z1,sky='#a9d6f2')=>{o.pg(o.qL(y0-.12,y1+.12,z0-.12,z1+.12),'#f4f1ea','#cfc8b8');o.pg(o.qL(y0,y1,z0,z1),sky);const m=(y0+y1)/2,zm=(z0+z1)/2;o.ln(o.P(0,m,z0),o.P(0,m,z1),'#f4f1ea',1.6);o.ln(o.P(0,y0,zm),o.P(0,y1,zm),'#f4f1ea',1.6)};
const dDoorR=(o,x0,x1,h,c)=>{o.pg(o.qR(x0-.1,x1+.1,0,h+.1),dSh(c,.7));o.pg(o.qR(x0,x1,0,h),c,dSh(c,.7));const g=o.P(x1-.25,0,h*.48);o.s+=`<circle cx="${g[0].toFixed(1)}" cy="${g[1].toFixed(1)}" r="2.2" fill="#e8d9a8"/>`};
const dRug=(o,x,y,w,d,c)=>{o.pg([o.P(x,y),o.P(x+w,y),o.P(x+w,y+d),o.P(x,y+d)],c,dSh(c,.8),1);o.pg([o.P(x+.25,y+.25),o.P(x+w-.25,y+.25),o.P(x+w-.25,y+d-.25),o.P(x+.25,y+d-.25)],dSh(c,1.12))};
const dBed=(o,x,y,w,d,blank,hb='#a9744a',lin='#f3f0fa')=>{
 o.box(x,y-.1,0,w,.3,1.9,hb);
 const f=o.box(x,y,0,w,d,.6,hb),m=o.box(x+.1,y+.2,.6,w-.2,d-.3,.45,lin,{t:dSh(lin,1.04)});
 const b=o.box(x+.06,y+d*.4,1.05,w-.12,d*.6-.08,.16,blank,{t:dSh(blank,1.1)});
 o.zone('bed',m.top,dHull([...f.hull,...m.hull,...b.hull]));
};
const dDesk=(o,x,y,w,d,c=dWood)=>{
 o.box(x+.05,y,0,.22,d,2.0,dSh(c,.8));o.box(x+w-.27,y,0,.22,d,2.0,dSh(c,.8));
 const t=o.box(x,y,2.0,w,d,.24,c);o.zone('desk',t.top,dHull([...t.hull,...o.box(x,y,0,.01,.01,.01,c,{noL:1,noR:1}).hull,o.P(x+.05,y+d,0),o.P(x+w-.05,y+d,0)]));
};
const dChairOf=(o,x,y,c='#6f8fd8')=>{o.box(x+.35,y+.35,0,.2,.2,.8,'#555a6a');o.box(x,y,.8,1,1,.25,c);o.box(x,y,1.05,1,.2,.9,dSh(c,.9))};
const dWard=(o,x,y,w,d,h,c,face='R')=>{
 const b=o.box(x,y,0,w,d,h,c),F=face==='R'?b.R:b.L;
 const a=F[0],bb=F[1],cc=F[2],dd=F[3],mx=(p,q,t)=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];
 o.ln(mx(a,bb,.5),mx(dd,cc,.5),dSh(c,.55),1.2);const k=mx(mx(a,bb,.44),mx(dd,cc,.44),.5),k2=mx(mx(a,bb,.56),mx(dd,cc,.56),.5);o.s+=`<circle cx="${k[0].toFixed(1)}" cy="${k[1].toFixed(1)}" r="1.3" fill="#e8d9a8"/><circle cx="${k2[0].toFixed(1)}" cy="${k2[1].toFixed(1)}" r="1.3" fill="#e8d9a8"/>`;
 const q=F.map((p,i)=>mx(mx(p,F[(i+2)%4],.12),p,0));o.zone('wardrobe',F.map(p=>[p[0],p[1]]),b.hull,'c');
};
const dShelf=(o,x,y,w,d,h,c=dWood,face='R')=>{
 const b=o.box(x,y,0,w,d,h,c,{t:dSh(c,1.12)}),F=face==='R'?b.R:b.L,mx=(p,q,t)=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];
 for(let k=1;k<4;k++){const t=k/4;o.ln(mx(F[0],F[3],t),mx(F[1],F[2],t),dSh(c,.55),1.6)}
 const bk=[['#d96f6f','#6f9fd9','#7fc48a'],['#e8c24a','#a98fe0','#d96f6f']];
 o.zone('shelf',F.map(p=>[p[0],p[1]]),b.hull,'b');
};
const dSide=(o,x,y,w,d,h=1.25,c=dWood)=>{const b=o.box(x,y,0,w,d,h,c);o.zone('side',b.top,b.hull)};
const dDresser=(o,x,y,w,d,h=1.7,c=dWood,face='L')=>{const b=o.box(x,y,0,w,d,h,c),F=face==='R'?b.R:b.L,mx=(p,q,t)=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];for(let k=1;k<3;k++){const t=k/3;o.ln(mx(F[0],F[3],t),mx(F[1],F[2],t),dSh(c,.55),1.2)}o.zone('dresser',b.top,b.hull)};
const dTable=(o,x,y,w,d,h,c=dWood,k='table')=>{[[0,0],[w-.22,0],[0,d-.22],[w-.22,d-.22]].forEach(([a,b])=>o.box(x+a,y+b,0,.22,.22,h,dSh(c,.8)));const t=o.box(x,y,h,w,d,.22,c);o.zone(k,t.top,t.hull)};
const dSofa=(o,x,y,w,d,c,faceR=true)=>{
 o.box(x,y,0,.5,d,1.7,c);const s=o.box(x+.5,y,0,w-.5,d,.9,dSh(c,1.05));o.box(x+.5,y,0,w-.5,.4,1.4,dSh(c,.95),{noL:1});o.box(x+.5,y+d-.4,0,w-.5,.4,1.3,dSh(c,.9));
 const st=[o.P(x+.5,y+.4,.9),o.P(x+w,y+.4,.9),o.P(x+w,y+d-.4,.9),o.P(x+.5,y+d-.4,.9)];o.zone('sofa',st,dHull([...s.hull,o.P(x,y+d,1.7),o.P(x,y,1.7)]));
};
const dTV=(o,x,y,w,d,h=1.1,c='#5b4636')=>{const b=o.box(x,y,0,w,d,h,c);o.zone('tv',b.top,b.hull)};
const dCounter=(o,x,y,w,d,h=1.9,c='#e8e4da',k='counter',base='#7a8896')=>{const b=o.box(x,y,0,w,d,h,base,{t:c});o.box(x-.03,y-.03,h,w+.06,d+.06,.18,c);const T=o.box(x,y,h+.18,.001,.001,.001,c,{noL:1,noR:1});const top=[o.P(x,y,h+.18),o.P(x+w,y,h+.18),o.P(x+w,y+d,h+.18),o.P(x,y+d,h+.18)];o.zone(k,top,b.hull);return top};
const dStove=(o,x,y,w,d,h=1.9)=>{const b=o.box(x,y,0,w,d,h,'#4a4f5c',{t:'#2e323c'});const T=[o.P(x,y,h),o.P(x+w,y,h),o.P(x+w,y+d,h),o.P(x,y+d,h)];
 [[.28,.28],[.72,.28],[.28,.72],[.72,.72]].forEach(([a,c])=>{const p=o.P(x+w*a,y+d*c,h);o.s+=`<ellipse cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" rx="6" ry="3" fill="#1a1c22" stroke="#555b6c" stroke-width=".8"/>`});
 const F=b.L,mx=(p,q,t)=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];o.pg([mx(mx(F[0],F[3],.2),mx(F[1],F[2],.2),.15),mx(mx(F[0],F[3],.2),mx(F[1],F[2],.2),.85),mx(mx(F[0],F[3],.7),mx(F[1],F[2],.7),.85),mx(mx(F[0],F[3],.7),mx(F[1],F[2],.7),.15)],'#6b7385','#2e323c');
 o.zone('stove',T,b.hull)};
const dFridge=(o,x,y,w,d,h=4.4)=>{const b=o.box(x,y,0,w,d,h,'#dfe6ee'),F=b.L,mx=(p,q,t)=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];o.ln(mx(F[3],F[2],0)&&mx(F[0],F[3],.62),mx(F[1],F[2],.62),'#9aa6b6',1.2);o.pg([mx(mx(F[0],F[3],.3),mx(F[1],F[2],.3),.1),mx(mx(F[0],F[3],.3),mx(F[1],F[2],.3),.14),mx(mx(F[0],F[3],.55),mx(F[1],F[2],.55),.14),mx(mx(F[0],F[3],.55),mx(F[1],F[2],.55),.1)],'#9aa6b6');o.zone('fridge',F.map(p=>[p[0],p[1]]),b.hull,'c')};
const dTub=(o,x,y,w,d,c='#f4f6fa')=>{const b=o.box(x,y,0,w,d,1.3,c);const T=[o.P(x+.22,y+.22,1.3),o.P(x+w-.22,y+.22,1.3),o.P(x+w-.22,y+d-.22,1.3),o.P(x+.22,y+d-.22,1.3)];o.pg(T,'#b9d9ec',dSh(c,.7));o.pg([o.P(x+.3,y+.3,1.3),o.P(x+w-.3,y+.3,1.3),o.P(x+w-.3,y+d*.55,1.3),o.P(x+.3,y+d*.55,1.3)],'#cfe8f6');
 const f=o.P(x+w-.4,y+.1,1.3);o.s+=`<rect x="${(f[0]-2).toFixed(1)}" y="${(f[1]-9).toFixed(1)}" width="4" height="9" rx="1.5" fill="#aab4c4"/><rect x="${(f[0]-6).toFixed(1)}" y="${(f[1]-11).toFixed(1)}" width="12" height="3" rx="1.5" fill="#aab4c4"/>`;o.zone('tub',T,b.hull)};
const dToilet=(o,x,y,c='#f6f8fb')=>{o.box(x,y+.15,0,.7,1.3,1.9,c);const b=o.box(x+.7,y,0,1.0,1.6,.9,c);const T=[o.P(x+.82,y+.12,.9),o.P(x+1.58,y+.12,.9),o.P(x+1.58,y+1.48,.9),o.P(x+.82,y+1.48,.9)];o.pg(T,'#dfe6ee',dSh(c,.7));const q=o.P(x+1.2,y+.8,.9);o.s+=`<ellipse cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" rx="9" ry="5" fill="#c9d4e0"/>`;const tt=[o.P(x,y+.15,1.9),o.P(x+.7,y+.15,1.9),o.P(x+.7,y+1.45,1.9),o.P(x,y+1.45,1.9)];o.zone('toilet',tt,dHull([...b.hull,...tt]))};
const dVanity=(o,x,y,w,d,c='#9a7050',top='#f1f2f7')=>{const b=o.box(x,y,0,w,d,1.9,c,{t:top});const T=[o.P(x,y,1.9),o.P(x+w,y,1.9),o.P(x+w,y+d,1.9),o.P(x,y+d,1.9)];const q=o.P(x+w/2,y+d/2,1.9);o.s+=`<ellipse cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" rx="10" ry="5" fill="#cfd9e4" stroke="#aab4c4" stroke-width=".8"/>`;o.zone('sink',T,b.hull)};
const dRail=(o,y0,y1,z)=>{o.ln(o.P(.08,y0,z),o.P(.08,y1,z),'#aab4c4',2.2);o.zone('rail',o.qL(y0-.1,y1+.1,z-1.2,z+.3),null,'c')};
const dRailR=(o,x0,x1,z)=>{o.ln(o.P(x0,.08,z),o.P(x1,.08,z),'#aab4c4',2.2);o.zone('rail',o.qR(x0-.1,x1+.1,z-1.2,z+.3),null,'c')};
const dUpper=(o,x0,x1,c='#e8e4da')=>{const b=o.box(x0,0,3.2,x1-x0,.8,1.4,c);const F=b.L,mx=(p,q,t)=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];const n=Math.max(1,Math.round((x1-x0)/1.3));for(let k=1;k<n;k++)o.ln(mx(F[0],F[1],k/n),mx(F[3],F[2],k/n),dSh(c,.6),1)};
const dCrib=(o,x,y,w,d)=>{const f=o.box(x,y,0,w,d,.6,'#f4efe6'),m=o.box(x+.1,y+.2,.6,w-.2,d-.3,.4,'#dfeaf6');const b=o.box(x+.06,y+d*.45,.98,w-.12,d*.55-.08,.14,'#a9d6c8',{t:'#bfe6da'});o.box(x,y-.1,0,w,.25,1.5,'#f4efe6');o.zone('bed',m.top,dHull([...f.hull,...m.hull,...b.hull]))};
const dChest=(o,x,y,w,d,c='#5fa9e0')=>{const b=o.box(x,y,0,w,d,.9,c);o.zone('shelf',b.top,b.hull)};
