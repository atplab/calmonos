/* ---------- Coloriage « dessins » (à la Zen Color / Happy Color) ----------
   Chaque dessin est une scène générée (même graine = même dessin) : des zones fermées (formes vectorielles) avec un trait
   d’encre par-dessus. Chaque zone porte le numéro de sa couleur ; la palette compte de 10 à 50 couleurs selon le niveau.
   Glisser = se déplacer, pincer = zoomer, toucher une fois = colorier la zone touchée (si c’est la bonne couleur). */
const CDN=40,CDW=1000,CDH=1300;
const cdRng=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
function cdHex(h,s,l){h=((h%360)+360)%360;s=Math.max(0,Math.min(100,s))/100;l=Math.max(0,Math.min(100,l))/100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,9-k(n),1));return'#'+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('')}
const cdF=v=>(Math.round(v*10)/10);
const CP={
 poly:P=>'M'+P.map((v,i)=>cdF(v)+(i%2?(i<P.length-1?'L':''):' ')).join('')+'Z',
 ell:(cx,cy,rx,ry,rot=0)=>{const k=.5523,c=Math.cos(rot),s=Math.sin(rot),T=(x,y)=>cdF(cx+x*c-y*s)+' '+cdF(cy+x*s+y*c);return`M${T(rx,0)}C${T(rx,ry*k)} ${T(rx*k,ry)} ${T(0,ry)}C${T(-rx*k,ry)} ${T(-rx,ry*k)} ${T(-rx,0)}C${T(-rx,-ry*k)} ${T(-rx*k,-ry)} ${T(0,-ry)}C${T(rx*k,-ry)} ${T(rx,-ry*k)} ${T(rx,0)}Z`},
 blob:(cx,cy,rx,ry,R,n=9,irr=.22)=>{const p=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2,f=1+(R()-.5)*2*irr;p.push([cx+Math.cos(a)*rx*f,cy+Math.sin(a)*ry*f])}let d='';for(let i=0;i<n;i++){const a=p[i],b=p[(i+1)%n],m=[(a[0]+b[0])/2,(a[1]+b[1])/2];d+=(i?'Q':'M'+cdF((p[n-1][0]+a[0])/2)+' '+cdF((p[n-1][1]+a[1])/2)+'Q')+cdF(a[0])+' '+cdF(a[1])+' '+cdF(m[0])+' '+cdF(m[1])}return d+'Z'},
 band:(y,amp,fr,ph,yb,x0=0,x1=CDW)=>{let d='M'+x0+' '+cdF(yb);for(let i=0;i<=28;i++){const x=x0+(x1-x0)*i/28;d+='L'+cdF(x)+' '+cdF(y+Math.sin(x/CDW*Math.PI*2*fr+ph)*amp)}return d+'L'+x1+' '+cdF(yb)+'Z'},
 petal:(cx,cy,a,len,w)=>{const c=Math.cos(a),s=Math.sin(a),T=(u,v)=>cdF(cx+u*c-v*s)+' '+cdF(cy+u*s+v*c);return`M${T(0,0)}C${T(len*.3,w)} ${T(len*.8,w*.8)} ${T(len,0)}C${T(len*.8,-w*.8)} ${T(len*.3,-w)} ${T(0,0)}Z`},
 half:(cx,cy,a,len,w,side)=>{const c=Math.cos(a),s=Math.sin(a),T=(u,v)=>cdF(cx+u*c-v*s)+' '+cdF(cy+u*s+v*c),k=side;return`M${T(0,0)}C${T(len*.3,w*k)} ${T(len*.8,w*.8*k)} ${T(len,0)}L${T(0,0)}Z`},
 rect:(x,y,w,h)=>CP.poly([x,y,x+w,y,x+w,y+h,x,y+h]),
 sector:(cx,cy,r1,r2,a1,a2)=>{const P=[],n=Math.max(3,Math.ceil((a2-a1)/.12));for(let i=0;i<=n;i++){const a=a1+(a2-a1)*i/n;P.push(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2)}for(let i=n;i>=0;i--){const a=a1+(a2-a1)*i/n;P.push(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1)}return CP.poly(P)},
 star:(cx,cy,r1,r2,n,rot=-Math.PI/2)=>{const P=[];for(let i=0;i<n*2;i++){const a=rot+i*Math.PI/n,r=i%2?r2:r1;P.push(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}return CP.poly(P)},
 line:P=>'M'+P.map((v,i)=>cdF(v)+(i%2?(i<P.length-1?'L':''):' ')).join(''),
 curve:(x1,y1,cx,cy,x2,y2)=>`M${cdF(x1)} ${cdF(y1)}Q${cdF(cx)} ${cdF(cy)} ${cdF(x2)} ${cdF(y2)}`
};
const cdMp2=(d,f)=>d.replace(/([MLCQ])([^MLCQZ]*)/g,(m,c,r)=>{const n=r.trim().split(/\s+/).map(Number);return c+n.map((v,i)=>cdF(f(v,i%2))).join(' ')});
function cdBx2(S,n0){let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(let i=n0;i<S.length;i++){const n=(S[i].d||'').match(/-?\d+\.?\d*/g);if(!n)continue;for(let k=0;k+1<n.length;k+=2){const x=+n[k],y=+n[k+1];if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}}return[x0,y0,x1,y1]}
/* un objet entier doit tenir dans le cadre : on le décale vers l’intérieur */
function cdFt2(S,n0){if(S.length<=n0)return;const[x0,y0,x1,y1]=cdBx2(S,n0),P=8;if(x0>1e8)return;let dx=0,dy=0;
 if(x1-x0>CDW-2*P)dx=(CDW-x1-x0)/2;else if(x0<P)dx=P-x0;else if(x1>CDW-P)dx=CDW-P-x1;
 if(y1-y0>CDH-2*P)dy=(CDH-y1-y0)/2;else if(y0<P)dy=P-y0;else if(y1>CDH-P)dy=CDH-P-y1;
 if(!dx&&!dy)return;for(let i=n0;i<S.length;i++)if(S[i].d)S[i].d=cdMp2(S[i].d,(v,k)=>v+(k?dy:dx))}
const cdKeep=S=>S.forEach(s=>{if(!s.d)return;const n=(s.d.match(/-?\d+\.?\d*/g)||[]).map(Number);if(n.every((v,i)=>i%2?v>=0&&v<=CDH:v>=0&&v<=CDW))return;s.d=cdMp2(s.d,(v,k)=>Math.max(0,Math.min(k?CDH:CDW,v)))});
/* ---------- les 10 thèmes (4 variantes chacun, de plus en plus fournies) ---------- */
function cdScene(l){
 const R=cdRng(l*7919+13),q=l/(CDN-1),th=l%10,S=[],L=[],add=(d,c)=>S.push({d,c}),ln=(d,w=3)=>S.push({d,w,ln:1}),jit=(h,s,li,j=6)=>cdHex(h+(R()-.5)*j,s+(R()-.5)*j,li+(R()-.5)*j),rn=(a,b)=>a+R()*(b-a),ri=(a,b)=>Math.floor(rn(a,b+1));
 const sky=(n,h1,h2,l1,l2,s=45)=>{for(let i=0;i<n;i++){const t=i/n;add(CP.band(i?CDH*(.02+t*.45):-30,rn(4,18),rn(.6,1.6),rn(0,6),CDH),cdHex(h1+(h2-h1)*t,s,l1+(l2-l1)*t))}};
 const mounts=(n,y0,h,hu,li)=>{for(let k=0;k<n;k++){const y=y0+k*h*.35,P=[0,CDH];let x=0;P.push(0,y+rn(-30,30));while(x<CDW){x+=rn(60,170);P.push(Math.min(CDW,x),y-rn(0,h)*(1-k*.12))}P.push(CDW,CDH);add(CP.poly(P),jit(hu,30,li-k*6))}};
 const lotus0=(cx,cy,sz,hu)=>{const n=ri(5,7);for(let i=0;i<n;i++){const a=Math.PI+(i+.5)/n*Math.PI;add(CP.petal(cx,cy,a,sz,sz*.32),jit(hu,62,80-i%2*8))}for(let i=0;i<n-1;i++){const a=Math.PI+(i+1)/n*Math.PI;add(CP.petal(cx,cy+sz*.05,a,sz*.8,sz*.28),jit(hu,66,68))}add(CP.ell(cx,cy-sz*.12,sz*.22,sz*.12),jit(52,80,62));for(let i=0;i<3;i++)add(CP.petal(cx,cy+sz*.08,-Math.PI/2+(i-1)*.5,sz*.62,sz*.24),jit(hu,70,58+i*5))};
 const leafP0=(x,y,a,len,w,hu,li)=>{add(CP.half(x,y,a,len,w,1),jit(hu,45,li));add(CP.half(x,y,a,len,w,-1),jit(hu,48,li-9));ln(CP.line([x,y,x+Math.cos(a)*len,y+Math.sin(a)*len]),2);for(let k=1;k<4;k++){const u=len*k/4.4,bx=x+Math.cos(a)*u,by=y+Math.sin(a)*u;[1,-1].forEach(sd=>ln(CP.line([bx,by,bx+Math.cos(a+sd*.7)*w*.7,by+Math.sin(a+sd*.7)*w*.7]),1.4))}};
 const pine0=(x,y,h,hu,li)=>{add(CP.rect(x-h*.05,y-h*.18,h*.1,h*.2),jit(25,40,30));const k=ri(3,4);for(let i=0;i<k;i++){const yy=y-h*.15-i*h*.25,w=h*(.42-i*.08);add(CP.poly([x-w,yy,x,yy-h*.42,x+w,yy]),jit(hu,40,li+i*4))}};
 const house0=(x,y,w,h,hu)=>{add(CP.rect(x,y-h,w,h),jit(hu,45,62));add(CP.poly([x-w*.1,y-h,x+w/2,y-h-w*.55,x+w*1.1,y-h]),jit(hu+180,35,40));add(CP.poly([x-w*.1,y-h,x+w/2,y-h-w*.55,x+w*1.1,y-h,x+w*1.02,y-h+8,x+w/2,y-h-w*.42,x-w*.02,y-h+8]),'#f4f6fb');add(CP.rect(x+w*.38,y-h*.5,w*.24,h*.5),jit(25,45,32));add(CP.rect(x+w*.1,y-h*.8,w*.2,h*.2),jit(48,90,68));add(CP.rect(x+w*.7,y-h*.8,w*.2,h*.2),jit(48,90,64));ln(CP.line([x+w*.2,y-h*.8,x+w*.2,y-h*.6]),1.6);ln(CP.line([x+w*.8,y-h*.8,x+w*.8,y-h*.6]),1.6)};
 const flower0=(cx,cy,r,hu,n)=>{for(let i=0;i<n;i++)add(CP.petal(cx,cy,i/n*Math.PI*2+rn(0,.2),r,r*.42),jit(hu,65,70-(i%2)*8));add(CP.ell(cx,cy,r*.28,r*.28),jit(45,85,58));add(CP.ell(cx-r*.06,cy-r*.06,r*.1,r*.1),jit(45,85,74))};
 const cloud0=(x,y,w,li)=>{add(CP.blob(x,y,w,w*.38,R,10,.18),cdHex(220,30,li));add(CP.blob(x-w*.3,y+w*.08,w*.45,w*.25,R,8,.15),cdHex(220,25,li-6))};
 const berry0=(cx,cy,r,hu)=>{const P=[];const n=ri(9,14);for(let i=0;i<n;i++){const a=R()*Math.PI*2,d=R()*r*.75;P.push([cx+Math.cos(a)*d,cy+Math.sin(a)*d*1.15])}P.sort((a,b)=>a[1]-b[1]);P.forEach(([x,y])=>{const rr=r*rn(.24,.3);add(CP.ell(x,y,rr,rr),jit(hu,45,30+rn(0,18)));add(CP.ell(x-rr*.35,y-rr*.35,rr*.3,rr*.22),jit(hu,30,70))})};
 const fish0=(x,y,s,hu,dir)=>{add(CP.poly([x-dir*s*.9,y,x-dir*s*1.4,y-s*.4,x-dir*s*1.4,y+s*.4]),jit(hu,70,50));add(CP.ell(x,y,s,s*.5),jit(hu,75,60));for(let k=0;k<3;k++)add(CP.rect(x-s*.5+k*s*.35,y-s*.45,s*.12,s*.9),jit(hu+30,40,92));add(CP.petal(x,y-s*.4,-Math.PI/2-dir*.6,s*.5,s*.18),jit(hu,70,45));add(CP.ell(x+dir*s*.55,y-s*.1,s*.1,s*.1),'#ffffff');add(CP.ell(x+dir*s*.58,y-s*.1,s*.05,s*.05),'#26243a')};
 const balloon0=(x,y,r,hues)=>{const n=hues.length;for(let i=0;i<n;i++){const a1=-Math.PI/2-Math.PI/2+i*Math.PI/n,a2=a1+Math.PI/n;add(CP.sector(x,y,0,r,a1+Math.PI/2-Math.PI/2,a2),'#000')}};
 const G=f=>(...a)=>{const n0=S.length,r=f(...a);cdFt2(S,n0);return r},lotus=G(lotus0),leafP=G(leafP0),pine=G(pine0),house=G(house0),flower=G(flower0),cloud=G(cloud0),berry=G(berry0),fish=G(fish0),balloon=G(balloon0);
 const C={};
 if(th===0){ /* étang aux lotus */
  sky(3+Math.round(q*4),150,190,86,94,30);add(CP.ell(CDW*rn(.35,.6),CDH*.36,rn(240,300),rn(240,300)),jit(140,30,86));mounts(2+Math.round(q*2),CDH*.5,160,200,78);
  for(let i=0;i<4+Math.round(q*5);i++)add(CP.band(CDH*(.6+i*.05),6,rn(1,3),rn(0,6),CDH),jit(195,40,82-i*3));
  const LT=l===10?[[rn(210,330),rn(CDH*.68,CDH*.74)],[rn(650,790),rn(CDH*.8,CDH*.88)]]:[],PD=[];for(let i=0;i<3+Math.round(q*5)+(l===10?3:0);i++){let x=rn(80,920),y=rn(CDH*.68,CDH*.95);const r=rn(50,90);if(l===10)for(let t=0;t<80&&(LT.some(p=>Math.hypot(p[0]-x,p[1]-y)<250)||PD.some(p=>Math.hypot(p[0]-x,p[1]-y)<200));t++){x=rn(80,920);y=rn(CDH*.66,CDH*.97)}PD.push([x,y]);add(CP.sector(x,y,0,r,.3,Math.PI*2-.05).replace(/^M/,'M'),jit(110,42,48));ln(CP.line([x,y,x+r*.9,y]),1.5)}
  const nl=1+Math.round(q*2);for(let i=0;i<nl;i++){if(l===10&&i<2)lotus(LT[i][0],LT[i][1],rn(170,230)/(1+i*.25),rn(330,350));else lotus(rn(280,720),rn(CDH*.64,CDH*.8),rn(200,280)/(1+i*.25),rn(330,350))}
  for(let i=0;i<2;i++)ln(CP.curve(rn(300,700),rn(200,400),rn(300,700),rn(150,350),rn(300,700),rn(200,400)),2)}
 else if(th===1){ /* baies */
  sky(2+Math.round(q*3),200,215,90,96,35);for(let i=0;i<3;i++)cloud(rn(150,850),rn(150,600),rn(90,150),94);
  add(CP.poly([0,CDH*.16,CDW*.6,CDH*.2,CDW,CDH*.08,CDW,CDH*.12,CDW*.6,CDH*.25,0,CDH*.22]),jit(30,40,38));
  for(let i=0;i<4+Math.round(q*5);i++)leafP(rn(60,940),rn(CDH*.12,CDH*.45),rn(0,Math.PI*2),rn(120,200),rn(40,60),rn(95,125),46);
  const nb=2+Math.round(q*3);for(let i=0;i<nb;i++){const x=rn(200,800),y=CDH*(.4+i*.42/nb)+rn(0,60);add(CP.line([x,y-140,x,y]),'#00000000');ln(CP.line([x,y-150,x+rn(-20,20),y-60]),3);berry(x,y,rn(170,230),rn(270,345))}
  for(let i=0;i<2+Math.round(q*2);i++)add(CP.band(CDH*(.88+i*.03),5,1.2,rn(0,6),CDH),jit(100,30,80-i*6))}
 else if(th===2){ /* pierres zen */
  sky(2+Math.round(q*2),90,120,92,96,25);
  for(let i=0;i<3+Math.round(q*3);i++){const x=rn(20,980),w=rn(40,60);for(let y=-20;y<CDH*.8;y+=rn(160,240)){add(CP.rect(x,y,w,rn(150,230)),jit(100,45,52));ln(CP.line([x-4,y,x+w+4,y]),3)}}
  for(let i=0;i<5+Math.round(q*6);i++){const x=rn(0,1000),y=rn(0,CDH*.4);add(CP.petal(x,y,rn(0,Math.PI*2),rn(90,150),rn(14,22)),jit(115,45,45))}
  for(let i=0;i<4+Math.round(q*4);i++)add(CP.ell(CDW/2,CDH*.86,CDW*(.7-i*.08),CDH*(.12-i*.012)),jit(195,30,80-i*3));
  const ns=3+Math.round(q*2);let y=CDH*.82;for(let i=0;i<ns;i++){const w=rn(220,300)*(1-i*.12),h=w*.42;add(CP.ell(CDW*.42,y-h*.5,w,h*.55),jit(30,8,62-i*4));add(CP.ell(CDW*.42-w*.3,y-h*.7,w*.3,h*.15),jit(30,8,75));y-=h*.95}
  add(CP.rect(CDW*.75,CDH*.66,100,130),jit(40,40,88));add(CP.ell(CDW*.75+50,CDH*.66,50,14),jit(40,30,80));add(CP.petal(CDW*.75+50,CDH*.655,-Math.PI/2,70,18),jit(40,95,60));add(CP.petal(CDW*.75+50,CDH*.655,-Math.PI/2,40,9),jit(30,95,52));
  flower(CDW*.2,CDH*.68,110,rn(0,40),5)}
 else if(th===3){ /* montagnes au couchant */
  sky(5+Math.round(q*6),10,45,62,86,75);add(CP.ell(CDW*rn(.3,.7),CDH*.4,rn(90,140),rn(90,140)),jit(45,95,70));mounts(3+Math.round(q*3),CDH*.42,220,260,52);
  for(let i=0;i<3+Math.round(q*3);i++)add(CP.band(CDH*(.72+i*.035),4,rn(1,3),rn(0,6),CDH),jit(230,35,50+i*4));
  for(let i=0;i<4+Math.round(q*8);i++)pine(rn(30,970),rn(CDH*.8,CDH*1.02),rn(240,420),rn(130,160),24)}
 else if(th===4){ /* village d’hiver la nuit */
  sky(4+Math.round(q*4),230,260,22,40,45);add(CP.ell(CDW*.78,CDH*.14,80,80),jit(50,70,86));add(CP.ell(CDW*.81,CDH*.13,70,70),cdHex(240,45,26));
  for(let i=0;i<6+Math.round(q*10);i++)add(CP.star(rn(30,970),rn(30,CDH*.35),rn(10,18),rn(4,7),4),jit(50,80,88));
  for(let i=0;i<3;i++)add(CP.band(CDH*(.5+i*.06),20,rn(.8,1.6),rn(0,6),CDH),jit(215,25,90-i*4));
  const nh=3+Math.round(q*4),HS=[];for(let i=0;i<nh;i++){const w=rn(170,250)/(1+i*.12),hx=rn(0,CDW-w),hy=rn(CDH*.66,CDH*.92),hh=w*rn(.7,.95),hu=rn(0,360);HS.push([hx-w*.12,hx+w*1.12]);house(hx,hy,w,hh,hu)}
  const PP=[];for(let i=0;i<3+Math.round(q*4);i++){let px=rn(30,970);if(l===4){const bad=()=>HS.some(h=>px>h[0]-70&&px<h[1]+70)||PP.some(z=>Math.abs(px-z)<120);for(let t=0;t<200&&bad();t++)px=rn(30,970);if(bad())continue}PP.push(px);pine(px,rn(CDH*.7,CDH),rn(140,220),150,30)}}
 else if(th===5){ /* mandala */
  add(CP.rect(0,0,CDW,CDH),jit(260,30,90));const cx=CDW/2,cy=CDH/2,rg=5+Math.round(q*4),hu=rn(0,360);let r=70;add(CP.ell(cx,cy,r,r),jit(hu,70,60));
  for(let k=0;k<rg;k++){const n=8+2*ri(0,4),r2=r+(430-70)/rg*rn(.85,1.1);for(let i=0;i<n;i++){const a1=i/n*Math.PI*2,a2=(i+1)/n*Math.PI*2;if(k%2)add(CP.petal(cx+Math.cos(a1)*r,cy+Math.sin(a1)*r,a1+Math.PI/n,(r2-r)*1.2,(r2-r)*.35),jit(hu+k*28,60,70-k*3));else{add(CP.sector(cx,cy,r,r2,a1,a2),jit(hu+k*28+(i%2)*14,55,62+(i%2)*10));add(CP.ell(cx+Math.cos((a1+a2)/2)*(r+r2)/2,cy+Math.sin((a1+a2)/2)*(r+r2)/2,(r2-r)*.18,(r2-r)*.18),jit(hu+180,50,80))}}r=r2}
  for(let i=0;i<4;i++){const x=i%2?CDW-60:60,y=i<2?60:CDH-60;flower(x,y,50,hu+90,6)}}
 else if(th===6){ /* jardin aux papillons */
  sky(3+Math.round(q*3),190,210,80,92,45);for(let i=0;i<2;i++)cloud(rn(150,850),rn(120,300),rn(90,140),95);
  for(let i=0;i<4+Math.round(q*3);i++)add(CP.band(CDH*(.62+i*.06),12,rn(1,3),rn(0,6),CDH),jit(100,45,60-i*4));
  for(let i=0;i<4+Math.round(q*6);i++){const x=rn(60,940),y=rn(CDH*.66,CDH*.95);ln(CP.line([x,y,x,y+120]),3);flower(x,y,rn(60,110),rn(0,360),ri(5,8))}
  const nb=1+Math.round(q*2);for(let b=0;b<nb;b++){const x=rn(280,720),y=CDH*(.22+b*.15),s=rn(200,270)/(1+b*.3),hu=rn(0,360),a=rn(-.3,.3);
   [1,-1].forEach(sd=>{add(CP.petal(x,y,-Math.PI/2+sd*1.0+a,s,s*.55),jit(hu,70,60));add(CP.petal(x,y,Math.PI/2+sd*.6+a,s*.7,s*.35),jit(hu+20,70,55));add(CP.ell(x+sd*s*.5,y-s*.45,s*.12,s*.12),jit(hu+180,60,85));add(CP.ell(x+sd*s*.3,y+s*.4,s*.08,s*.08),jit(hu+180,60,80))});add(CP.ell(x,y,s*.07,s*.42),jit(30,30,25))}
  if(l===6)for(let i=0;i<10;i++){const fx=60+(i+rn(.1,.9))*(CDW-120)/10,fy=rn(CDH*.76,CDH*.95);ln(CP.line([fx,fy,fx,fy+70]),3);flower(fx,fy,rn(34,58),rn(0,360),ri(5,7))}}
 else if(th===7){ /* récif de corail */
  for(let i=0;i<5+Math.round(q*4);i++)add(CP.band(CDH*(i*.1),10,rn(1,2),rn(0,6),CDH),jit(195,65,72-i*4));add(CP.band(CDH*.82,18,1.3,1,CDH),jit(40,55,78));add(CP.band(CDH*.9,12,2,2,CDH),jit(38,50,72));
  const nc=4+Math.round(q*5);for(let i=0;i<nc;i++){const x=l===7?40+(i+rn(.15,.85))*(CDW-80)/nc:rn(40,960),y=CDH*(l===7?rn(.9,.97):rn(.78,.92)),hu=rn(-20,30),sp=l===7?34:60;for(let k=0;k<ri(3,5);k++)add(CP.blob(x+rn(-sp,sp),y-(l===7?rn(0,60):rn(20,200)),rn(25,45),rn(50,90),R,9,.3),jit(hu,70,62))}
  for(let i=0;i<3+Math.round(q*4);i++){const x=rn(30,970);add(CP.band(0,0,1,0,0),'#00000000');add(CP.petal(x,CDH*.92,-Math.PI/2+rn(-.2,.2),rn(220,380),rn(18,28)),jit(130,45,40))}
  for(let i=0;i<3+Math.round(q*5);i++)fish(rn(160,840),rn(CDH*.12,CDH*.7),rn(80,130),rn(0,60),R()<.5?1:-1);
  for(let i=0;i<5+Math.round(q*6);i++){const r=rn(8,18);add(CP.ell(rn(30,970),rn(30,CDH*.6),r,r),cdHex(195,60,92))}}
 else if(th===8){ /* montgolfières */
  sky(4+Math.round(q*5),200,30,82,90,55);for(let i=0;i<3+Math.round(q*2);i++)cloud(rn(100,900),rn(150,CDH*.6),rn(80,140),96);
  for(let i=0;i<3+Math.round(q*2);i++)add(CP.band(CDH*(.8+i*.05),25,rn(.6,1.4),rn(0,6),CDH),jit(110,40,58-i*5));
  const nb=2+Math.round(q*3);for(let b=0;b<nb;b++){const x=rn(220,780),y=CDH*(.2+b*.45/nb),r=rn(150,220)/(1+b*.2),hs=[rn(0,360),rn(0,360),rn(0,360)],n=6;
   for(let i=0;i<n;i++){const t1=-1+i*2/n,t2=-1+(i+1)*2/n,P=[];for(let k=0;k<=10;k++){const a=-Math.PI*.95+k/10*Math.PI*1.9,t=t1+(t2-t1)*0;}
    const xs=k=>x+r*Math.sin(k),P2=[];for(let k=0;k<=12;k++){const a=-Math.PI/2+k/12*Math.PI,ca=Math.cos(a);P2.push(x+r*t1*ca,y+r*Math.sin(a))}for(let k=12;k>=0;k--){const a=-Math.PI/2+k/12*Math.PI,ca=Math.cos(a);P2.push(x+r*t2*ca,y+r*Math.sin(a))}
    add(CP.poly(P2),jit(hs[i%3],70,60+(i%2)*8))}
   add(CP.poly([x-r*.35,y+r*.95,x+r*.35,y+r*.95,x+r*.2,y+r*1.2,x-r*.2,y+r*1.2]),jit(hs[0],60,50));add(CP.rect(x-r*.18,y+r*1.35,r*.36,r*.25),jit(30,45,40));ln(CP.line([x-r*.2,y+r*1.2,x-r*.16,y+r*1.35]),2);ln(CP.line([x+r*.2,y+r*1.2,x+r*.16,y+r*1.35]),2)}}
 else { /* l’heure du thé */
  add(CP.rect(0,0,CDW,CDH*.6),jit(35,50,88));add(CP.rect(CDW*.15,CDH*.06,CDW*.7,CDH*.34),jit(205,55,78));add(CP.rect(CDW*.15,CDH*.06,CDW*.7,CDH*.12),jit(205,55,84));ln(CP.line([CDW*.5,CDH*.06,CDW*.5,CDH*.4]),5);ln(CP.line([CDW*.15,CDH*.23,CDW*.85,CDH*.23]),5);
  const cs=8+Math.round(q*6),cw=CDW/cs;for(let r=0;r<Math.ceil(CDH*.4/cw);r++)for(let c=0;c<cs;c++)add(CP.rect(c*cw,CDH*.6+r*cw,cw,cw),(r+c)%2?jit(0,60,62):jit(0,30,92));
  const tx=CDW*.36,ty=CDH*.64;add(CP.ell(tx,ty,200,160),jit(rn(0,360),45,62));add(CP.ell(tx-40,ty-50,80,40),jit(0,0,95));add(CP.poly([tx+180,ty-20,tx+300,ty-120,tx+310,ty-100,tx+200,ty+40]),jit(rn(0,360),45,55));add(CP.ell(tx,ty-160,90,26),jit(30,40,50));add(CP.ell(tx,ty-190,22,22),jit(30,40,45));
  for(let i=0;i<2+Math.round(q*2);i++){const x=CDW*rn(.62,.85),y=CDH*rn(.72,.92);add(CP.ell(x,y+40,110,26),jit(0,0,92));add(CP.poly([x-70,y-60,x+70,y-60,x+55,y+40,x-55,y+40]),jit(rn(0,360),55,60));add(CP.ell(x,y-60,70,18),jit(25,55,35));ln(CP.curve(x-20,y-90,x,y-140,x-10,y-190),3)}
  for(let i=0;i<3+Math.round(q*3);i++){const x=rn(80,920),y=CDH*rn(.88,.97),r=rn(40,60);add(CP.ell(x,y,r,r*.9),jit(32,60,60));for(let k=0;k<4;k++)add(CP.ell(x+rn(-r*.5,r*.5),y+rn(-r*.4,r*.4),8,8),jit(25,60,25))}}
 cdKeep(S);
 return{A:S.filter(s=>s.ln||(s.c!=='#00000000'&&s.c!=='#000')),get S(){return this.A.filter(s=>!s.ln)},L:[]}}
/* palette : on fusionne les teintes les plus proches jusqu’au nombre voulu (10 à 50) */
function cdPal(S,K){
 const rgb=h=>{const n=parseInt(h.slice(1),16);return[n>>16,n>>8&255,n&255]},cs=[...new Set(S.map(s=>s.c))].map(h=>({h,v:rgb(h),n:S.filter(s=>s.c===h).length,m:[h]}));
 const D=(a,b)=>{const r=(a.v[0]+b.v[0])/2;return Math.sqrt((2+r/256)*(a.v[0]-b.v[0])**2+4*(a.v[1]-b.v[1])**2+(2+(255-r)/256)*(a.v[2]-b.v[2])**2)};
 while(cs.length>K){let bi=0,bj=1,bd=1e9;for(let i=0;i<cs.length;i++)for(let j=i+1;j<cs.length;j++){const d=D(cs[i],cs[j]);if(d<bd){bd=d;bi=i;bj=j}}const a=cs[bi],b=cs[bj],w=a.n+b.n;a.v=a.v.map((x,k)=>(x*a.n+b.v[k]*b.n)/w);a.n=w;a.m=a.m.concat(b.m);cs.splice(bj,1)}
 cs.forEach(c=>{c.h='#'+c.v.map(x=>Math.round(x).toString(16).padStart(2,'0')).join('');const[r,g,b]=c.v.map(x=>x/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let hu=0;if(mx!==mn){const d=mx-mn;hu=mx===r?(g-b)/d%6:mx===g?(b-r)/d+2:(r-g)/d+4}c.k=(mx-mn<.08?1000:Math.round((hu*60+360)%360/30)*10)+l});
 cs.sort((a,b)=>a.k-b.k);const map={};cs.forEach((c,i)=>c.m.forEach(h=>map[h]=i+1));return{pal:cs.map(c=>c.h),map}}
function cdBuild(l){
 const sc=cdScene(l),K=Math.min(50,10+Math.round(l*40/(CDN-1))),{pal,map}=cdPal(sc.S,K),R=[],DR=[];sc.A.forEach(s=>{if(s.ln)DR.push({p:new Path2D(s.d),w:s.w});else{DR.push({r:R.length});R.push({p:new Path2D(s.d),c:map[s.c],d:s.d})}});
 /* tampon d’identifiants : zones visibles, position et taille des numéros */
 const bw=Math.round(CDW/2),bh=Math.round(CDH/2),cv=document.createElement('canvas');cv.width=bw;cv.height=bh;const x=cv.getContext('2d',{willReadFrequently:true});x.setTransform(.5,0,0,.5,0,0);
 const code=i=>((i+1)*2654435761>>>0)%16777215+1,inv=new Map();R.forEach((r,i)=>{const k=code(i);inv.set(k,i);x.fillStyle='#'+k.toString(16).padStart(6,'0');x.fill(r.p)});
 const im=x.getImageData(0,0,bw,bh).data,id=new Int32Array(bw*bh).fill(-1);for(let i=0;i<bw*bh;i++){const k=im[i*4]<<16|im[i*4+1]<<8|im[i*4+2],v=inv.get(k);if(v!==undefined)id[i]=v}
 const ds=new Float32Array(bw*bh);for(let i=0;i<bw*bh;i++)ds[i]=id[i]<0?0:1e9;
 const sm=(i,j,w)=>{if(ds[j]+w<ds[i])ds[i]=ds[j]+w};
 for(let y=0;y<bh;y++)for(let xx=0;xx<bw;xx++){const i=y*bw+xx;if(!ds[i])continue;const v=id[i];if(xx===0||y===0||id[i-1]!==v||id[i-bw]!==v){ds[i]=1;continue}sm(i,i-1,1);sm(i,i-bw,1);sm(i,i-bw-1,1.414);if(xx<bw-1)sm(i,i-bw+1,1.414)}
 for(let y=bh-1;y>=0;y--)for(let xx=bw-1;xx>=0;xx--){const i=y*bw+xx;if(!ds[i])continue;const v=id[i];if(xx===bw-1||y===bh-1||id[i+1]!==v||id[i+bw]!==v){ds[i]=1;continue}sm(i,i+1,1);sm(i,i+bw,1);sm(i,i+bw+1,1.414);if(xx>0)sm(i,i+bw-1,1.414)}
 const best=R.map(()=>({d:0,i:-1,n:0}));for(let i=0;i<bw*bh;i++){const v=id[i];if(v<0)continue;const b=best[v];b.n++;if(ds[i]>b.d){b.d=ds[i];b.i=i}}
 R.forEach((r,i)=>{const b=best[i];r.n=b.n;if(b.i>=0){r.lx=(b.i%bw+.5)*2;r.ly=(Math.floor(b.i/bw)+.5)*2;r.fs=Math.min(110,b.d*2*1.15)}r.pre=b.n<30||r.fs<9});
 return{R,DR,pal,id,bw,bh}}
const CD={l:0,M:null,f:null,sel:1,cv:null,x:null,z:1,ox:0,oy:0,fit:1,pt:{},pz:null,tap:null,ok:false,hl:null,pat:null};
function cdSave(){if(!CD.M)return;let s='';for(let i=0;i<CD.f.length;i+=5){let v=0;for(let k=0;k<5;k++)if(CD.f[i+k])v|=1<<k;s+=v.toString(32)}st.set('cd:sv:'+CD.l,s)}
function cdLoad(){const n=CD.M.R.length,f=CD.M.R.map(r=>!!r.pre),s=st.get('cd:sv:'+CD.l,'');if(typeof s==='string'&&s.length===Math.ceil(n/5))for(let i=0;i<n;i++){if(parseInt(s[Math.floor(i/5)],32)>>(i%5)&1)f[i]=true}return f}
function cdLeft(k){let n=0;CD.M.R.forEach((r,i)=>{if(r.c===k&&!CD.f[i])n++});return n}
function cdTotal(k){let n=0;CD.M.R.forEach(r=>{if(r.c===k)n++});return n}
function cdThumb(l){const sc=cdScene(l),K=Math.min(50,10+Math.round(l*40/(CDN-1))),{pal,map}=cdPal(sc.S,K),c=document.createElement('canvas');c.width=60;c.height=78;const x=c.getContext('2d');x.scale(60/CDW,78/CDH);sc.S.forEach(s=>{x.fillStyle=pal[map[s.c]-1];x.fill(new Path2D(s.d))});return c.toDataURL()}
function cdScreen(){
 cbActs();cur='colorie';nv('games');theme('colorie');{const n=$('#nav');if(n)n.hidden=true}
 const M=CD.M;
 app.innerHTML=`<div class="cds"><div class="top stk"><button class="back" data-a="cdBk">‹ Retour</button><button class="tl tlk" data-a="cSkip" data-v="cd" aria-label="Niveau ${CD.l+1} : toucher pour passer ce niveau"><span class="tlf">Niveau</span><span class="tls">Niv.</span>&nbsp;${CD.l+1}<i aria-hidden="true">⏭</i></button><div class="tr"><button class="hb hintb" data-a="cdHint" aria-label="Indice : coûte 1 flocon">${HBI(1)}</button><div class="chip">❄ ${FLX()}</div></div></div><div id="skw" class="skw"></div>
 <div class="cdw" id="cdw"><canvas id="cdc" aria-label="Dessin à colorier : glisse pour te déplacer, pince pour zoomer, touche une zone pour la colorier"></canvas><div class="cdz"><button data-a="cdZ" data-v="1" aria-label="Zoomer">+</button><button data-a="cdZ" data-v="-1" aria-label="Dézoomer">−</button></div></div>
 <div class="cdpal" id="cdpal" role="radiogroup" aria-label="Couleurs">${M.pal.map((c,i)=>`<button class="cdsw${cbLight(c)?' lt':''}" role="radio" data-a="cdSel" data-v="${i+1}" style="--c:${c}" aria-label="Couleur ${i+1}"><b>${i+1}</b></button>`).join('')}</div>
 <p class="m" id="m" role="status" aria-live="polite"></p></div>`;
 const cv=CD.cv=$('#cdc');CD.x=cv.getContext('2d');
 const pc=document.createElement('canvas');pc.width=pc.height=16;const px=pc.getContext('2d');px.fillStyle='#e3e1ec';px.fillRect(0,0,16,16);px.fillStyle='#c9c6d6';px.fillRect(0,0,8,8);px.fillRect(8,8,8,8);CD.pat=CD.x.createPattern(pc,'repeat');try{CD.pat.setTransform(new DOMMatrix().scale(1.4))}catch(e){}
 cdSizeC(true);
 cv.addEventListener('pointerdown',cdPD);cv.addEventListener('pointermove',cdPM);['pointerup','pointercancel'].forEach(e=>cv.addEventListener(e,cdPU));
 cv.addEventListener('wheel',e=>{e.preventDefault();const r=cv.getBoundingClientRect();cdZoomAt(CD.z*(e.deltaY<0?1.15:1/1.15),e.clientX-r.left,e.clientY-r.top)},{passive:false});
 addEventListener('resize',cdSizeC);
 if(CD.f.every(Boolean))CD.ok=true;
 cdPick(cdNext(1)||1);window.scrollTo(0,0)}
function cdSizeC(first){const cv=CD.cv;if(!cv||!cv.isConnected){removeEventListener('resize',cdSizeC);return}
 const w=Math.min(($('#cdw')||cv).clientWidth||360,600),h=Math.max(260,innerHeight-cv.getBoundingClientRect().top-120),dpr=Math.min(2.5,devicePixelRatio||1);
 cv.style.width=w+'px';cv.style.height=h+'px';cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);CD.dpr=dpr;CD.w=w;CD.h=h;const fit=Math.min(w/CDW,h/CDH);
 if(first===true||!CD.fit){CD.fit=fit;CD.z=fit;CD.ox=(w-CDW*fit)/2;CD.oy=(h-CDH*fit)/2}else{CD.fit=fit;cdClamp()}cdDraw()}
function cdClamp(){const f=CD.fit;CD.z=Math.max(f*.5,Math.min(f*14,CD.z));const W=CDW*CD.z,H=CDH*CD.z,mx=CD.w*.75,my=CD.h*.75;CD.ox=Math.min(mx,Math.max(CD.w-mx-W,CD.ox));CD.oy=Math.min(my,Math.max(CD.h-my-H,CD.oy))}
function cdZoomAt(z,mx,my){const wx=(mx-CD.ox)/CD.z,wy=(my-CD.oy)/CD.z;CD.z=Math.max(CD.fit*.5,Math.min(CD.fit*14,z));CD.ox=mx-wx*CD.z;CD.oy=my-wy*CD.z;cdClamp();cdDraw()}
function cdNext(from){const K=CD.M.pal.length;for(let j=0;j<K;j++){const k=(from-1+j)%K+1;if(cdLeft(k))return k}return 0}
function cdPick(k){CD.sel=k;document.querySelectorAll('.cdsw').forEach(b=>{const v=+b.dataset.v,left=cdLeft(v),t=cdTotal(v)||1;b.classList.toggle('on',v===k);b.classList.toggle('ok',!left);b.setAttribute('aria-checked',v===k);b.style.setProperty('--pr',(1-left/t)*360+'deg')});
 const b=$(`.cdsw[data-v="${k}"]`);if(b)b.scrollIntoView({behavior:wRM?'auto':'smooth',inline:'center',block:'nearest'});cdDraw()}
function cdDraw(){
 const c=CD.x,M=CD.M;if(!c||!M)return;const dpr=CD.dpr,z=CD.z,fin=CD.ok;
 c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,CD.cv.width,CD.cv.height);c.setTransform(dpr*z,0,0,dpr*z,CD.ox*dpr,CD.oy*dpr);
 c.fillStyle='#ffffff';c.fillRect(0,0,CDW,CDH);
 c.lineJoin='round';c.lineCap='round';c.strokeStyle='#2a2838';c.lineWidth=Math.max(1.2,1.6/z*.9);
 const lw0=c.lineWidth;M.DR.forEach(o=>{if(o.r===undefined){c.lineWidth=Math.max(.8,o.w*.6);c.stroke(o.p);c.lineWidth=lw0;return}const i=o.r,r=M.R[i];if(fin||CD.f[i])c.fillStyle=M.pal[r.c-1];else if(CD.hl&&CD.hl.has(i))c.fillStyle='#ffe27a';else if(r.c===CD.sel){c.fillStyle=CD.pat}else c.fillStyle='#ffffff';c.fill(r.p);c.stroke(r.p)});
 if(fin)return;
 const x0=-CD.ox/z,y0=-CD.oy/z,x1=x0+CD.w/z,y1=y0+CD.h/z;c.textAlign='center';c.textBaseline='middle';c.fillStyle='#3a3750';
 M.R.forEach((r,i)=>{if(CD.f[i]||!r.lx)return;const fs=Math.min(r.fs*.6,44/z),sc=fs*z;if(sc<7||r.lx<x0-50||r.lx>x1+50||r.ly<y0-50||r.ly>y1+50)return;c.font=`${r.c===CD.sel?800:500} ${fs}px "Nunito Sans",system-ui,sans-serif`;c.fillText(r.c,r.lx,r.ly)})}
function cdHit(e){const r=CD.cv.getBoundingClientRect(),mx=(e.clientX-r.left-CD.ox)/CD.z,my=(e.clientY-r.top-CD.oy)/CD.z;if(mx<0||my<0||mx>=CDW||my>=CDH)return -1;
 const c=CD.x;c.setTransform(1,0,0,1,0,0);for(let i=CD.M.R.length-1;i>=0;i--)if(c.isPointInPath(CD.M.R[i].p,mx,my))return i;return -1}
function cdTapAt(e){
 if(CD.ok)return;const i=cdHit(e);if(i<0)return;const r=CD.M.R[i];if(CD.f[i])return;
 if(r.c!==CD.sel){vib(12);sfx(220,.05);const m=$('#m');if(m)m.textContent='Cette zone porte le numéro '+r.c+'.';return}
 CD.f[i]=true;if(CD.hl)CD.hl.delete(i);sfx(520+Math.random()*80,.05);const m=$('#m');if(m)m.textContent='';
 const left=cdLeft(r.c),b=$(`.cdsw[data-v="${r.c}"]`);if(b){b.style.setProperty('--pr',(1-left/(cdTotal(r.c)||1))*360+'deg');b.classList.toggle('ok',!left)}
 if(Math.random()<.35)cdSave();
 if(!left){sfx(780,.14);vib(10);cdSave();if(CD.f.every(Boolean))return cdWin();return cdPick(cdNext(r.c))}
 cdDraw()}
const cdPts=()=>Object.values(CD.pt);
function cdPD(e){if(!CD.M)return;try{CD.cv.setPointerCapture(e.pointerId)}catch(x){}CD.pt[e.pointerId]={x:e.clientX,y:e.clientY};const P=cdPts();
 if(P.length===1)CD.tap={id:e.pointerId,x:e.clientX,y:e.clientY,ox:CD.ox,oy:CD.oy,mv:false,t:performance.now()};
 else if(P.length===2){CD.tap=null;const r=CD.cv.getBoundingClientRect(),a=P[0],b=P[1];CD.pz={d:Math.hypot(a.x-b.x,a.y-b.y)||1,z:CD.z,mx:(a.x+b.x)/2-r.left,my:(a.y+b.y)/2-r.top,ox:CD.ox,oy:CD.oy}}
 e.preventDefault()}
function cdPM(e){if(!CD.pt[e.pointerId])return;CD.pt[e.pointerId]={x:e.clientX,y:e.clientY};const P=cdPts();
 if(P.length>=2&&CD.pz){const r=CD.cv.getBoundingClientRect(),a=P[0],b=P[1],d=Math.hypot(a.x-b.x,a.y-b.y)||1,mx=(a.x+b.x)/2-r.left,my=(a.y+b.y)/2-r.top,Z=CD.pz,z=Math.max(CD.fit*.5,Math.min(CD.fit*14,Z.z*d/Z.d)),wx=(Z.mx-Z.ox)/Z.z,wy=(Z.my-Z.oy)/Z.z;CD.z=z;CD.ox=mx-wx*z;CD.oy=my-wy*z;cdClamp();cdDraw()}
 else if(CD.tap&&CD.tap.id===e.pointerId){const T=CD.tap,dx=e.clientX-T.x,dy=e.clientY-T.y;if(!T.mv&&Math.hypot(dx,dy)>8)T.mv=true;if(T.mv){CD.ox=T.ox+dx;CD.oy=T.oy+dy;cdClamp();cdDraw()}}
 e.preventDefault()}
function cdPU(e){delete CD.pt[e.pointerId];const T=CD.tap;if(T&&T.id===e.pointerId){if(!T.mv&&e.type==='pointerup')cdTapAt(e);CD.tap=null}if(cdPts().length<2)CD.pz=null}
function cdWin(){
 CD.ok=true;st.set('cd:sv:'+CD.l,'');const d=st.get('cd:d',[]),first=!d.includes(CD.l);if(first){d.push(CD.l);st.set('cd:d',d)}
 const r=first?3+Math.floor(CD.l/8):1;fl+=r;st.set('fl',fl);{const ch=$('.chip:not(.hintb)');if(ch)ch.textContent='❄ '+FLX()}
 const z0=CD.z,ox0=CD.ox,oy0=CD.oy,t0=performance.now(),D=700;CD.fit=Math.min(CD.w/CDW,CD.h/CDH);const zf=CD.fit,oxf=(CD.w-CDW*zf)/2,oyf=(CD.h-CDH*zf)/2;
 const st2=n=>{const k=Math.min(1,(n-t0)/D),e=1-Math.pow(1-k,3);CD.z=z0+(zf-z0)*e;CD.ox=ox0+(oxf-ox0)*e;CD.oy=oy0+(oyf-oy0)*e;cdDraw();if(k<1&&!wRM)requestAnimationFrame(st2);else{CD.z=zf;CD.ox=oxf;CD.oy=oyf;cdDraw()}};requestAnimationFrame(st2);
 document.querySelectorAll('.cdsw').forEach(b=>{b.classList.add('ok');b.style.setProperty('--pr','360deg')});
 sfx(784,.6);vib([20,40,20]);setTimeout(()=>{try{confetti(CD.cv)}catch(e){}},500);
 const nx=CD.l+1<CDN;setTimeout(()=>{const s=$('.cds');if(!s)return;s.insertAdjacentHTML('beforeend',`<div class="unend"><section class="glass play"><h2>Dessin ${CD.l+1}</h2><p class="note" style="margin:0 0 4px">Terminé !</p><p class="unrw">+${r} ❄</p><div class="chrow">${nx?`<button class="btn" data-a="cdLv" data-v="${CD.l+1}">Dessin suivant</button>`:''}<button class="btn alt" data-a="cdBk">Retour</button></div></section></div>`)},2200)}
function cdOpen(l){if(!st.get('cd:fx1',0)){[4,6,7,10].forEach(i=>st.set('cd:sv:'+i,''));st.set('cd:fx1',1)}CD.l=Math.max(0,Math.min(CDN-1,+l||0));const m=$('#m');CD.M=cdBuild(CD.l);CD.f=cdLoad();CD.ok=false;CD.hl=null;CD.pt={};CD.pz=null;CD.tap=null;CD.fit=0;cdScreen()}
setTimeout(()=>Object.assign(act,{
 cdBk:()=>{cdSave();CD.M=null;cbHub()},
 cdLv:v=>cdOpen(v),
 cSkip:v=>{const w=$('#skw');if(w)w.innerHTML=`<span>Passer ce ${v==='cd'?'dessin':'pixel art'} sans récompense ? Tu pourras y revenir plus tard.</span><div><button class="skp y" data-a="cSkipY" data-v="${v}">Passer</button><button class="skp" data-a="skipn">Rester</button></div>`},
 cSkipY:v=>{if(v==='cd'){cdSave();if(CD.l<CDN-1){cdOpen(CD.l+1);msg('Dessin passé, sans flocons : tu pourras y revenir.')}else{CD.M=null;cbHub()}}else{cbSave();if(CB.l<CBN-1){act.cbLv(CB.l+1);msg('Pixel art passé, sans flocons : tu pourras y revenir.')}else{CB.G=null;cbHub()}}},
 cdSel:v=>cdPick(+v),
 cdZ:v=>cdZoomAt(CD.z*(+v>0?1.6:1/1.6),CD.w/2,CD.h/2),
 cdDd:()=>{const d=$('#cddd');CD.ddOpen=d.classList.toggle('open');d.querySelector('.dd-h').setAttribute('aria-expanded',CD.ddOpen)},
 cdHint:()=>{if(CD.ok||!CD.M)return;const k=CD.sel,ids=CD.M.R.map((r,i)=>i).filter(i=>CD.M.R[i].c===k&&!CD.f[i]);if(!ids.length)return;
  if(!UNL()){if(fl<1){const m=$('#m');if(m)m.textContent='Il te manque un flocon pour un indice.';return}fl-=1;st.set('fl',fl);const ch=$('.chip:not(.hintb)');if(ch)ch.textContent='❄ '+FLX()}
  const r=CD.M.R[ids.reduce((a,b)=>CD.M.R[a].n<=CD.M.R[b].n?a:b)];const zt=Math.max(CD.z,Math.min(CD.fit*14,24/(r.fs*.62||10))),tx=CD.w/2-r.lx*zt,ty=CD.h/2-r.ly*zt,z0=CD.z,ox0=CD.ox,oy0=CD.oy,t0=performance.now();
  CD.hl=new Set(ids);const an=n=>{const k=Math.min(1,(n-t0)/600),e=1-Math.pow(1-k,3);CD.z=z0+(zt-z0)*e;CD.ox=ox0+(tx-ox0)*e;CD.oy=oy0+(ty-oy0)*e;cdClamp();cdDraw();if(k<1)requestAnimationFrame(an)};requestAnimationFrame(an);
  setTimeout(()=>{CD.hl=null;cdDraw()},2200)}
}));

/* ---------- Album photo : tous les dessins terminés ---------- */
const cdPc={};
function cdPic(l,w){const k=l+':'+w;if(cdPc[k])return cdPc[k];const sc=cdScene(l),K=Math.min(50,10+Math.round(l*40/(CDN-1))),{pal,map}=cdPal(sc.S,K),c=document.createElement('canvas');c.width=w;c.height=Math.round(w*CDH/CDW);const x=c.getContext('2d');x.scale(w/CDW,w/CDW);x.lineJoin=x.lineCap='round';sc.A.forEach(s=>{const p=new Path2D(s.d);if(s.ln){x.strokeStyle='rgba(40,36,60,.45)';x.lineWidth=s.w;x.stroke(p)}else{x.fillStyle=pal[map[s.c]-1];x.fill(p)}});return cdPc[k]=c.toDataURL('image/jpeg',.9)}
function cdAlbum(){cbActs();cur='colorie';nv('games');theme('colorie');const d=[...st.get('cd:d',[])].sort((a,b)=>a-b);
 app.innerHTML=`<div class="top stk"><button class="back" data-a="cdAlbBk">‹ Retour</button><div class="tr"><div class="chip">❄ ${FLX()}</div></div></div><section class="glass story pt-colorie"><i>🖼️</i><h2>Album photo</h2><p>${d.length?`${d.length} sur ${CDN} dessins terminés. Touche un dessin pour le voir en grand.`:'Tes dessins terminés apparaîtront ici.'}</p></section>${d.length?`<div class="alb">${d.map(l=>`<button class="albi" data-a="cdAlbV" data-v="${l}" aria-label="Dessin ${l+1}"><img alt="" src="${cdPic(l,200)}"><span>Dessin ${l+1}</span></button>`).join('')}</div>`:''}`;window.scrollTo(0,0)}
function cdAlbV(l){l=+l;const d=[...st.get('cd:d',[])].sort((a,b)=>a-b),i=d.indexOf(l);if(i<0)return;let v=$('#albv');if(!v){v=document.createElement('div');v.id='albv';v.className='albv';v.setAttribute('role','dialog');v.setAttribute('aria-label','Dessin en grand');app.appendChild(v)}
 v.innerHTML=`<img alt="Dessin ${l+1}" src="${cdPic(l,640)}"><b>Dessin ${l+1}</b><div class="chrow">${i>0?`<button class="btn alt" data-a="cdAlbV" data-v="${d[i-1]}" aria-label="Dessin précédent">‹</button>`:''}${i<d.length-1?`<button class="btn alt" data-a="cdAlbV" data-v="${d[i+1]}" aria-label="Dessin suivant">›</button>`:''}<button class="btn" data-a="cdAlbX">Fermer</button></div>`}
setTimeout(()=>Object.assign(act,{cdAlb:()=>cdAlbum(),cdAlbBk:()=>cbHub(),cdAlbV:v=>cdAlbV(v),cdAlbX:()=>{const v=$('#albv');if(v)v.remove()}}));
