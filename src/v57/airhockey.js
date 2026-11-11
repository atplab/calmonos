/* ---------- Air hockey : contre l’IA (20 niveaux), à deux sur le même écran, ou en ligne avec un ami ----------
   Table en unités : largeur 1, hauteur AHH. Le joueur du bas est « moi » (ou l’hôte en ligne).
   En ligne : invitation par le profil (champ ah = {g:code, w:ami, t}), puis salle temps réel « ah-<code> ».
   L’hôte calcule la partie ; l’invité envoie la position de son maillet ; chacun publie son état par la présence. */
const AHN=20,AHH=1.7,AHR=.042,AHM=.072,AHG=[.32,.68],AHMAX=3.4;
const AH={mode:'',lv:0,raf:0,cv:null,x:null,W:0,S:null,ptr:{},room:null,nr:null,code:'',fr:'',role:'',last:0,hp:null,hpT:0,ended:false,cd:0,unsub:null,pt:0,msg:''};
const ahTo=()=>AH.mode==='lv'?5:7;
const ahLvAI=L=>({spd:.85+L*.13,rx:Math.max(.05,.32-L*.014),err:Math.max(.01,.13-L*.0062),agg:Math.min(.95,.35+L*.032)});
window.ahInv=()=>{try{if(!SO.uid)return[];const no=st.get('ah:no',[]),now=Date.now();return Object.entries(SO.P).filter(([id,p])=>id!==SO.uid&&p&&p.ah&&p.ah.w===SO.uid&&p.ah.g&&now-(+p.ah.t||0)<15*6e4&&!no.includes(p.ah.g)).map(([id,p])=>({id,g:p.ah.g,nm:scrNm(id)}))}catch(e){return[]}};
function ahMark(g,w){const M=st.get('soc:me',null);if(!M)return;M.ah={g,w:w||'',t:Date.now()};st.set('soc:me',M);if(typeof socLater==='function')socLater()}
function ahHub(){
 ahActs();ahStop();cur='airhockey';nv('games');theme('airhockey');
 const d=st.get('ah:d',[]),nx=[...Array(AHN).keys()].find(i=>!d.includes(i)),M=st.get('soc:me',null);
 const ids=M&&M.fr?Object.keys(M.fr).filter(i=>M.fr[i]>0&&SO.P[i]).sort((a,b)=>scrNm(a).localeCompare(scrNm(b),'fr')):[],inv=ahInv(),can=!!(window.claude&&window.claude.use);
 const online=!can?'<p class="note" style="margin:0">Le jeu en ligne est offert dans l’app Claude.</p>':!SO.uid?'<p class="note" style="margin:0">Active ton profil dans l’onglet Amis pour jouer en ligne.</p>':
  (ids.length?`<p class="note" style="margin:0 0 6px">Invite un ami : la partie commence dès qu’il accepte.</p>${ids.map(id=>`<div class="fr-i"><span class="fr-o">${socAv(id)}<span class="fr-t"><b>${esc(scrNm(id))}</b></span></span><div class="fr-b"><button class="sb buy" data-a="ahAsk" data-v="${esc(id)}">Inviter</button></div></div>`).join('')}`:'<p class="note" style="margin:0">Ajoute des amis dans l’onglet Amis pour les défier.</p>');
 const g=ALL.find(x=>x.id==='airhockey')||{t:'Air hockey',s:'',ic:'🏒'},dn=d.length,tg=nx===undefined?AHN-1:nx,AR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',chev='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
 app.innerHTML=`<div class="top stk">${bk('home')}<div class="chip">❄ ${FLX()}</div></div><section class="glass story pt-airhockey"><i>${g.ic}</i><h2>${g.t}</h2><p>Glisse ton maillet du bout du doigt et envoie la rondelle dans le but d’en face. Contre l’IA, le premier à 5 buts gagne ; à deux ou en ligne, le premier à 7.</p></section>
 <div class="opts">${inv.map(x=>`<section class="rc pt-airhockey" data-g="🏒"><div class="rc-ic">${socAv(x.id)}</div><div class="rc-t"><small>Invitation</small><b>${esc(x.nm)}</b><span>t’invite à une partie en ligne</span></div><button class="rc-go" data-a="ahJoin" data-v="${esc(x.g)}">Jouer${AR}</button><button class="ahx" data-a="ahNo" data-v="${esc(x.g)}" aria-label="Refuser l’invitation de ${esc(x.nm)}">✕</button></section>`).join('')}
 <section class="rc pt-airhockey" data-g="🏒"><div class="rc-ic">🏒</div><div class="rc-t"><small>${dn?'Continuer':'Commencer'}</small><b>${nx===undefined?'Rejouer le niveau '+AHN:'Niveau '+(tg+1)}</b><span>${nx===undefined?'Tous les niveaux sont gagnés':dn+' sur '+AHN+' gagnés · contre l’IA'}</span></div><button class="rc-go" data-a="ahLv" data-v="${tg}">Jouer${AR}</button></section>
 <section class="rc" data-g="⇅"><div class="rc-ic">👥</div><div class="rc-t"><small>Sur cet écran</small><b>À deux</b><span>Posez le téléphone à plat entre vous</span></div><button class="rc-go" data-a="ahLoc">Jouer${AR}</button></section>
 <div class="dd pt-airhockey${AH.onOpen?' open':''}" id="ahdd2"><button class="dd-h" data-a="ahOnT" aria-expanded="${!!AH.onOpen}" aria-controls="ahonl"><span><b>En ligne avec un ami</b><small>${inv.length?inv.length+' invitation'+(inv.length>1?'s':''):'Invite un ami à jouer'}</small></span>${chev}</button><div class="dd-l" id="ahonl"><div class="dd-i soc-i">${online}</div></div></div>
 <div class="dd pt-airhockey${lvOpen?' open':''}" id="ahdd"><button class="dd-h" data-a="ahDd" aria-expanded="${lvOpen}" aria-controls="lvl"><span><b>Choisir un niveau</b><small>${dn} / ${AHN} gagnés</small></span>${chev}</button><div class="dd-l" id="lvl"><div class="dd-i"><div class="lvg">${[...Array(AHN).keys()].map(i=>{const o=d.includes(i);return`<button class="lv ${o?'d':i===nx?'nx':'far'}" data-a="ahLv" data-v="${i}" aria-label="Niveau ${i+1}${o?', gagné':''}">${i+1}</button>`}).join('')}</div></div></div></div></div>`;
 window.scrollTo(0,0)}
/* ---------- écran de jeu ---------- */
function ahNewState(){return{p:{x:.5,y:AHH*.5,vx:0,vy:0},a:{x:.5,y:AHH-.2,vx:0,vy:0,tx:.5,ty:AHH-.2},b:{x:.5,y:.2,vx:0,vy:0,tx:.5,ty:.2},s:[0,0],st:'play',pause:0,ai:{t:0,tx:.5,ty:.2,mode:'home'},fl:0,fls:0}}
function ahScreen(sub){
 ahActs();ahStop();cur='airhockey';nv('games');theme('airhockey');
 const ttl=AH.mode==='lv'?'Niveau '+(AH.lv+1):AH.mode==='loc'?'À deux':'En ligne';
 app.innerHTML=`<div class="ahs"><div class="top stk"><button class="back" data-a="ahBk">‹ Air hockey</button><b class="sott">${ttl}</b><div class="chip">❄ ${FLX()}</div></div><div class="ahw" id="ahw"><canvas id="ahc" aria-label="Table d’air hockey"></canvas><div class="ahov" id="ahov" hidden></div></div><p class="m" id="m" role="status" aria-live="polite">${sub?esc(sub):''}</p></div>`;
 const cv=AH.cv=$('#ahc');AH.x=cv.getContext('2d');ahSize();AH.ptr={};
 cv.addEventListener('pointerdown',ahPD);cv.addEventListener('pointermove',ahPM);['pointerup','pointercancel','lostpointercapture'].forEach(e=>cv.addEventListener(e,ahPU));
 addEventListener('resize',ahSize);AH.last=0;AH.raf=requestAnimationFrame(ahLoop);window.scrollTo(0,0)}
function ahSize(){const cv=AH.cv;if(!cv||!cv.isConnected)return;const w0=Math.min(($('#ahw')||cv).clientWidth||360,440),h0=Math.max(300,innerHeight-170);let w=w0,h=w*AHH;if(h>h0){h=h0;w=h/AHH}
 const dpr=Math.min(2.5,devicePixelRatio||1);cv.style.width=w+'px';cv.style.height=h+'px';cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);AH.W=w;AH.dpr=dpr}
const ahFlip=()=>AH.mode==='net'&&AH.role==='g';
function ahPos(e){const r=AH.cv.getBoundingClientRect();let x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height*AHH;if(ahFlip()){x=1-x;y=AHH-y}return{x,y}}
function ahPD(e){if(!AH.S)return;const q=ahPos(e);let side;
 if(AH.mode==='loc')side=q.y>AHH/2?'a':'b';else side=AH.mode==='net'&&AH.role==='g'?'b':'a';
 if(Object.values(AH.ptr).includes(side))return;AH.ptr[e.pointerId]=side;try{AH.cv.setPointerCapture(e.pointerId)}catch(x){}ahAim(side,q);e.preventDefault()}
function ahPM(e){const s=AH.ptr[e.pointerId];if(s){ahAim(s,ahPos(e));e.preventDefault()}}
function ahPU(e){delete AH.ptr[e.pointerId]}
function ahAim(side,q){const m=AH.S[side],lo=side==='a'?AHH/2+AHM:AHM,hi=side==='a'?AHH-AHM:AHH/2-AHM;m.tx=Math.max(AHM,Math.min(1-AHM,q.x));m.ty=Math.max(lo,Math.min(hi,q.y));
 if(AH.mode==='net'&&AH.role==='g'&&AH.nr){const now=performance.now();if(now-AH.pt>30){AH.pt=now;AH.nr.presence({r:'g',m:[+m.tx.toFixed(4),+m.ty.toFixed(4)]}).catch(()=>{})}}}
/* déplacement d’un maillet vers sa cible, vitesse limitée ; vitesse mesurée pour le choc */
function ahMove(m,dt,vmax){const dx=m.tx-m.x,dy=m.ty-m.y,d=Math.hypot(dx,dy),st=Math.min(d,vmax*dt);const nx=d?m.x+dx/d*st:m.x,ny=d?m.y+dy/d*st:m.y;m.vx=(nx-m.x)/dt;m.vy=(ny-m.y)/dt;m.x=nx;m.y=ny}
function ahHit(p,m){const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy),R=AHR+AHM;if(d>=R||d===0)return false;const nx=dx/d,ny=dy/d;p.x=m.x+nx*R;p.y=m.y+ny*R;
 const rvx=p.vx-m.vx,rvy=p.vy-m.vy,vn=rvx*nx+rvy*ny;if(vn<0){p.vx-=1.85*vn*nx;p.vy-=1.85*vn*ny}const s=Math.hypot(p.vx,p.vy);if(s>AHMAX){p.vx*=AHMAX/s;p.vy*=AHMAX/s}return vn<-.3}
function ahStep(S,dt){
 const p=S.p,N=4,h=dt/N;let snd=0;
 for(let i=0;i<N;i++){
  p.x+=p.vx*h;p.y+=p.vy*h;
  if(p.x<AHR){p.x=AHR;p.vx=Math.abs(p.vx)*.9;snd=1}else if(p.x>1-AHR){p.x=1-AHR;p.vx=-Math.abs(p.vx)*.9;snd=1}
  const inG=p.x>AHG[0]&&p.x<AHG[1];
  if(!inG){if(p.y<AHR){p.y=AHR;p.vy=Math.abs(p.vy)*.9;snd=1}else if(p.y>AHH-AHR){p.y=AHH-AHR;p.vy=-Math.abs(p.vy)*.9;snd=1}}
  else for(const gx of AHG)for(const gy of [0,AHH]){const dx=p.x-gx,dy=p.y-gy,d=Math.hypot(dx,dy);if(d<AHR&&d>0){const nx=dx/d,ny=dy/d,vn=p.vx*nx+p.vy*ny;p.x=gx+nx*AHR;p.y=gy+ny*AHR;if(vn<0){p.vx-=1.8*vn*nx;p.vy-=1.8*vn*ny}snd=1}}
  if(ahHit(p,S.a)||ahHit(p,S.b))snd=2;
  if(p.y<-AHR*1.2)return'a';if(p.y>AHH+AHR*1.2)return'b';
 }
 const f=Math.pow(.992,dt*60);p.vx*=f;p.vy*=f;
 if(snd===2)sfx(520+Math.random()*80,.04);else if(snd===1&&Math.hypot(p.vx,p.vy)>.6)sfx(260,.03);
 return''}
/* IA : défend entre la rondelle et son but, attaque quand la rondelle est de son côté */
function ahAI(S,dt){
 const P=ahLvAI(AH.lv),b=S.b,p=S.p,A=S.ai;A.t-=dt;
 if(A.t<=0){A.t=P.rx*(.7+Math.random()*.6);const e=(Math.random()-.5)*2*P.err;
  if(p.y<AHH/2&&(p.vy>-1.2||p.y<b.y)){
   if(p.y<b.y+.02){A.mode='back';A.tx=p.x+(p.x<.5?.12:-.12);A.ty=Math.max(AHM,p.y-.16)}
   else{const gx=.5+e*3,gy=AHH,dx=gx-p.x,dy=gy-p.y,d=Math.hypot(dx,dy)||1,ux=dx/d,uy=dy/d,near=Math.hypot(b.x-(p.x-ux*(AHR+AHM)),b.y-(p.y-uy*(AHR+AHM)))<.05;
    if(near||Math.random()<P.agg*.25){A.mode='hit';A.tx=p.x+ux*.18;A.ty=p.y+uy*.18}else{A.mode='set';A.tx=p.x-ux*(AHR+AHM)*1.05;A.ty=p.y-uy*(AHR+AHM)*1.05}}}
  else{A.mode='home';let px=p.x;if(p.vy<-.1){const t=(p.y-.22)/-p.vy;px=p.x+p.vx*t;for(let k=0;k<4;k++){if(px<AHR)px=2*AHR-px;else if(px>1-AHR)px=2*(1-AHR)-px}}
   A.tx=.5+(px-.5)*(.45+P.agg*.4)+e;A.ty=.17+e*.3}}
 b.tx=Math.max(AHM,Math.min(1-AHM,A.tx));b.ty=Math.max(AHM,Math.min(AHH/2-AHM,A.ty))}
function ahGoal(S,who){
 S.s[who==='a'?0:1]++;S.fl=1;S.fls=who==='a'?1:0;sfx(who==='a'?880:330,.22);try{vib(20)}catch(e){}
 const p=S.p;p.vx=p.vy=0;p.x=.5;p.y=who==='a'?AHH*.3:AHH*.7;S.pause=1;
 if(S.s[0]>=ahTo()||S.s[1]>=ahTo()){S.st='end';S.pause=0;setTimeout(()=>ahEnd(S.s[0]>S.s[1]),700)}}
function ahLoop(n){
 const cv=AH.cv;if(!cv||!cv.isConnected){ahStop();return}
 const dt=Math.min(.033,AH.last?(n-AH.last)/1000:.016);AH.last=n;const S=AH.S;
 if(S){
  if(AH.mode==='net'&&AH.role==='g')ahGuest(dt);
  else{
   if(S.st==='play'||S.st==='cd'){
    ahMove(S.a,dt,7);
    if(AH.mode==='lv')ahAI(S,dt);
    if(AH.mode==='lv')ahMove(S.b,dt,ahLvAI(AH.lv).spd);else ahMove(S.b,dt,7);
    if(S.st==='cd'){S.cd-=dt;if(S.cd<=0)S.st='play'}
    else if(S.pause>0)S.pause-=dt;else{const g=ahStep(S,dt);if(g)ahGoal(S,g)}
   }
   if(S.fl>0)S.fl=Math.max(0,S.fl-dt*1.6);
   if(AH.mode==='net'&&AH.nr){const now=performance.now();if(now-AH.pt>30){AH.pt=now;const r=v=>+v.toFixed(4);AH.nr.presence({r:'h',st:S.st,cd:+(S.cd||0).toFixed(2),s:S.s,a:[r(S.a.x),r(S.a.y)],b:[r(S.b.x),r(S.b.y)],p:[r(S.p.x),r(S.p.y),r(S.p.vx),r(S.p.vy)],fl:+S.fl.toFixed(2),fs:S.fls}).catch(()=>{})}
    if(AH.hpT&&now-AH.hpT>6000&&S.st!=='end')ahLost()}
  }
  ahDraw()}
 AH.raf=requestAnimationFrame(ahLoop)}
/* invité : il suit l’état publié par l’hôte (rondelle prolongée selon sa vitesse) et pilote son propre maillet */
function ahGuest(dt){
 const S=AH.S,h=AH.hp;if(!h)return;const now=performance.now(),age=Math.min(.12,(now-AH.hpT)/1000);
 S.s=h.s;S.st=h.st;S.cd=h.cd;S.fl=h.fl;S.fls=h.fs;S.a.x=h.a[0];S.a.y=h.a[1];
 const px=h.p[0]+h.p[2]*age,py=h.p[1]+h.p[3]*age;S.p.x+=(px-S.p.x)*.6;S.p.y+=(py-S.p.y)*.6;if(Math.hypot(px-S.p.x,py-S.p.y)>.2){S.p.x=px;S.p.y=py}
 const b=S.b;b.x+=(b.tx-b.x)*Math.min(1,dt*20);b.y+=(b.ty-b.y)*Math.min(1,dt*20);
 if(now-AH.hpT>6000&&S.st!=='end')ahLost();
 if(S.st==='end'&&!AH.ended){AH.ended=true;setTimeout(()=>ahEnd(S.s[1]>S.s[0]),500)}}
function ahDraw(){
 const c=AH.x,S=AH.S,dpr=AH.dpr,k=AH.W*dpr,Hp=AHH*k,fl=ahFlip();c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,k,Hp);
 c.setTransform(fl?-k:k,0,0,fl?-k:k,fl?k:0,fl?Hp:0);
 const g=c.createLinearGradient(0,0,0,AHH);g.addColorStop(0,'#dff3ff');g.addColorStop(.5,'#f4fbff');g.addColorStop(1,'#dff3ff');c.fillStyle=g;c.beginPath();c.roundRect(0,0,1,AHH,.06);c.fill();
 c.fillStyle='rgba(80,140,190,.16)';for(let y=.06;y<AHH;y+=.07)for(let x=.06+(Math.round(y/.07)%2)*.035;x<1;x+=.07){c.beginPath();c.arc(x,y,.0045,0,7);c.fill()}
 c.lineWidth=.008;c.strokeStyle='rgba(214,54,63,.55)';c.beginPath();c.moveTo(0,AHH/2);c.lineTo(1,AHH/2);c.stroke();
 c.strokeStyle='rgba(60,110,200,.45)';c.beginPath();c.arc(.5,AHH/2,.16,0,7);c.stroke();c.beginPath();c.arc(.5,0,.2,0,Math.PI);c.stroke();c.beginPath();c.arc(.5,AHH,.2,Math.PI,2*Math.PI);c.stroke();
 if(S&&S.fl>0){c.fillStyle=`rgba(${S.fls?'255,210,90':'120,170,255'},${S.fl*.35})`;c.fillRect(0,S.fls?0:AHH/2,1,AHH/2)}
 c.lineWidth=.03;c.strokeStyle='#2c3e66';c.lineCap='round';c.beginPath();c.moveTo(.0,0);c.lineTo(AHG[0],0);c.moveTo(AHG[1],0);c.lineTo(1,0);c.moveTo(0,AHH);c.lineTo(AHG[0],AHH);c.moveTo(AHG[1],AHH);c.lineTo(1,AHH);c.moveTo(0,0);c.lineTo(0,AHH);c.moveTo(1,0);c.lineTo(1,AHH);c.stroke();
 c.fillStyle='#16213d';c.fillRect(AHG[0],-.02,AHG[1]-AHG[0],.03);c.fillRect(AHG[0],AHH-.01,AHG[1]-AHG[0],.03);
 if(!S)return;
 const mal=(m,col,dk)=>{c.fillStyle='rgba(0,0,0,.15)';c.beginPath();c.arc(m.x+.008,m.y+.012,AHM,0,7);c.fill();const gr=c.createRadialGradient(m.x-.02,m.y-.02,.01,m.x,m.y,AHM);gr.addColorStop(0,col);gr.addColorStop(1,dk);c.fillStyle=gr;c.beginPath();c.arc(m.x,m.y,AHM,0,7);c.fill();
  c.fillStyle=dk;c.beginPath();c.arc(m.x,m.y,AHM*.45,0,7);c.fill();c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.arc(m.x-.01,m.y-.012,AHM*.22,0,7);c.fill()};
 mal(S.b,'#7fb0ff','#2f5fc4');mal(S.a,'#ff8a8f','#c9323d');
 const p=S.p;c.fillStyle='rgba(0,0,0,.18)';c.beginPath();c.arc(p.x+.006,p.y+.009,AHR,0,7);c.fill();c.fillStyle='#22283a';c.beginPath();c.arc(p.x,p.y,AHR,0,7);c.fill();c.strokeStyle='#4b5470';c.lineWidth=.006;c.beginPath();c.arc(p.x,p.y,AHR*.62,0,7);c.stroke();
 c.setTransform(1,0,0,1,0,0);c.save();c.globalAlpha=.2;c.fillStyle='#16213d';c.font=`800 ${Math.round(k*.17)}px Fraunces,Georgia,serif`;c.textAlign='center';c.textBaseline='middle';
 {const lo=fl?S.s[1]:S.s[0],hi=fl?S.s[0]:S.s[1];c.fillText(String(lo),k*.86,Hp*.6);c.save();c.translate(k*.86,Hp*.4);if(AH.mode==='loc')c.rotate(Math.PI);c.fillText(String(hi),0,0);c.restore()}c.restore();
 if(S.st==='cd'&&S.cd>0){c.save();c.fillStyle='rgba(22,33,61,.75)';c.font=`800 ${Math.round(k*.22)}px Fraunces,Georgia,serif`;c.textAlign='center';c.textBaseline='middle';c.fillText(String(Math.ceil(S.cd)),k/2,Hp/2);c.restore()}}
function ahOv(h){const o=$('#ahov');if(!o)return;if(!h){o.hidden=true;o.innerHTML='';return}o.innerHTML=`<div class="glass ahbox">${h}</div>`;o.hidden=false}
function ahEnd(win){
 const S=AH.S;if(!S||!$('#ahov'))return;S.st='end';let r=0,t='';
 if(AH.mode==='lv'){if(win){const d=st.get('ah:d',[]),first=!d.includes(AH.lv);if(first){d.push(AH.lv);st.set('ah:d',d)}r=first?2+Math.floor(AH.lv/5):1}}
 else if(AH.mode==='net'&&win)r=2;
 if(r){fl+=r;st.set('fl',fl);const ch=$('.chip');if(ch)ch.textContent='❄ '+FLX()}
 if(AH.mode==='loc')t=`<h2>${S.s[0]>S.s[1]?'Rouge':'Bleu'} gagne !</h2><p class="note">${S.s[0]} à ${S.s[1]}</p><div class="chrow"><button class="btn" data-a="ahLoc">Rejouer</button><button class="btn alt" data-a="ahBk">Terminer</button></div>`;
 else{const me=AH.role==='g'?S.s[1]:S.s[0],ot=AH.role==='g'?S.s[0]:S.s[1];
  t=`<h2>${win?'Victoire !':'Défaite'}</h2><p class="note">${me} à ${ot}${r?` · +${r} ❄`:''}</p><div class="chrow">${AH.mode==='lv'?(win&&AH.lv<AHN-1?`<button class="btn" data-a="ahLv" data-v="${AH.lv+1}">Niveau suivant</button>`:`<button class="btn" data-a="ahLv" data-v="${AH.lv}">Rejouer</button>`):''}<button class="btn alt" data-a="ahBk">Terminer</button></div>`}
 sfx(win?990:220,.3);ahOv(t);if(AH.mode==='net'){if(AH.role==='h')setTimeout(()=>{if(AH.S===S)ahNetEnd()},3500);else ahNetEnd()}}
function ahLost(){if(AH.ended)return;AH.ended=true;if(AH.S)AH.S.st='end';ahOv('<h2>Connexion perdue</h2><p class="note">Ton ami n’est plus là.</p><div class="chrow"><button class="btn alt" data-a="ahBk">Terminer</button></div>');ahNetEnd()}
function ahStop(){cancelAnimationFrame(AH.raf);AH.raf=0;removeEventListener('resize',ahSize);if(AH.mode==='net'||AH.nr)ahNetEnd()}
function ahNetEnd(){const nr=AH.nr;AH.nr=null;if(AH.unsub){try{AH.unsub()}catch(e){}AH.unsub=null}if(nr)nr.leave().catch(()=>{});if(AH.role==='h'&&AH.code){const M=st.get('soc:me',null);if(M&&M.ah&&M.ah.g===AH.code)ahMark('','')}}
/* ---------- en ligne ---------- */
async function ahRoom(code){
 try{const room=await window.claude.use('room');if(!room)return null;return await room.join('ah-'+code)}catch(e){return null}}
async function ahHost(fr){
 const code=Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-4);
 AH.mode='net';AH.role='h';AH.code=code;AH.fr=fr;AH.ended=false;AH.S=ahNewState();AH.S.st='wait';AH.hp=null;AH.hpT=0;
 ahScreen('');ahOv(`<h2>Invitation envoyée</h2><p class="note">En attente de ${esc(scrNm(fr))}…</p><div class="chrow"><button class="btn alt" data-a="ahBk">Annuler</button></div>`);
 ahMark(code,fr);const nr=await ahRoom(code);if(!nr||AH.code!==code){if(AH.code===code)ahOv('<h2>Jeu en ligne indisponible</h2><p class="note">La salle n’a pas pu être ouverte. Réessaie plus tard.</p><div class="chrow"><button class="btn alt" data-a="ahBk">Retour</button></div>');return}
 AH.nr=nr;nr.presence({r:'h',st:'wait'}).catch(()=>{});
 AH.unsub=nr.onPeers(ch=>{const g=ch.peers.find(p=>!p.isMe&&p.presence&&p.presence.r==='g'&&(!p.by||p.by===fr));
  if(g){AH.hpT=performance.now();const m=g.presence.m;if(Array.isArray(m)&&m.length===2&&isFinite(m[0])&&isFinite(m[1])){AH.S.b.tx=Math.max(AHM,Math.min(1-AHM,+m[0]));AH.S.b.ty=Math.max(AHM,Math.min(AHH/2-AHM,+m[1]))}
   if(AH.S.st==='wait'){AH.S.st='cd';AH.S.cd=3;ahOv('');ahMark('',fr)}}
  else if(AH.S.st!=='wait'&&AH.S.st!=='end'&&ch.left.some(p=>p.presence&&p.presence.r==='g'))ahLost()})}
async function ahGuestJoin(code){
 AH.mode='net';AH.role='g';AH.code=code;AH.ended=false;AH.S=ahNewState();AH.S.st='wait';AH.hp=null;AH.hpT=0;
 const inv=ahInv().find(x=>x.g===code);AH.fr=inv?inv.id:'';
 ahScreen('');ahOv('<h2>Connexion…</h2><p class="note">On rejoint la table de ton ami.</p><div class="chrow"><button class="btn alt" data-a="ahBk">Annuler</button></div>');
 const nr=await ahRoom(code);if(!nr||AH.code!==code){if(AH.code===code)ahOv('<h2>Jeu en ligne indisponible</h2><p class="note">La salle n’a pas pu être rejointe.</p><div class="chrow"><button class="btn alt" data-a="ahBk">Retour</button></div>');return}
 AH.nr=nr;const b=AH.S.b;nr.presence({r:'g',m:[b.tx,b.ty]}).catch(()=>{});
 AH.unsub=nr.onPeers(ch=>{const h=ch.peers.find(p=>!p.isMe&&p.presence&&p.presence.r==='h'&&(!p.by||!AH.fr||p.by===AH.fr));
  if(h){const q=h.presence;if(Array.isArray(q.p)&&q.p.length===4&&Array.isArray(q.a)&&Array.isArray(q.s)){if(!AH.hp)ahOv('');AH.hp={s:[+q.s[0]||0,+q.s[1]||0],st:String(q.st||'play'),cd:+q.cd||0,a:[+q.a[0],+q.a[1]],p:q.p.map(Number),fl:+q.fl||0,fs:+q.fs||0};AH.hpT=performance.now()}}
  else if(AH.hp&&ch.left.length&&!AH.ended)ahLost()});
 const st0=Date.now(),iv=setInterval(()=>{if(AH.code!==code||AH.hp){clearInterval(iv);return}if(Date.now()-st0>20000){clearInterval(iv);ahOv('<h2>Ton ami n’est plus là</h2><p class="note">L’invitation a expiré.</p><div class="chrow"><button class="btn alt" data-a="ahBk">Retour</button></div>');ahNetEnd()}},1000)}
let ahAO=false;
function ahActs(){if(ahAO)return;ahAO=true;Object.assign(act,{
 ahBk:()=>{ahStop();AH.mode='';AH.code='';AH.S=null;ahHub()},
 ahLv:v=>{AH.mode='lv';AH.lv=+v;AH.role='';AH.S=ahNewState();AH.S.st='cd';AH.S.cd=3;ahScreen('')},
 ahLoc:()=>{AH.mode='loc';AH.role='';AH.S=ahNewState();AH.S.st='cd';AH.S.cd=3;ahScreen('Rouge en bas, bleu en haut.')},
 ahAsk:v=>{if(SO.P[v])ahHost(v)},
 ahJoin:v=>{if(/^[a-z0-9]{4,20}$/.test(v))ahGuestJoin(v)},
 ahDd:()=>{const d=$('#ahdd');lvOpen=d.classList.toggle('open');d.querySelector('.dd-h').setAttribute('aria-expanded',lvOpen)},
 ahOnT:()=>{const d=$('#ahdd2');AH.onOpen=d.classList.toggle('open');d.querySelector('.dd-h').setAttribute('aria-expanded',AH.onOpen)},
 ahNo:v=>{const no=st.get('ah:no',[]);no.push(v);st.set('ah:no',no.slice(-30));ahHub()}
})}
