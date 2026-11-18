/* ---------- Bowling : IA, variantes, deux joueurs et salons en ligne ---------- */
const BW={mode:'',lv:1,raf:0,cv:null,x:null,W:0,S:null,room:'',role:'',subs:null,queue:false,iv:0,m:'',ended:false};
const bwCode=()=>Math.random().toString(36).slice(2,7).toUpperCase().replace(/[^A-HJKMNP-Z2-9]/g,'')+'X'.slice(0,1);
const bwPinN=()=>10;
const bwAI=L=>Math.max(.28,1-Math.min(.72,(L-1)*.018));
const bwVariant=L=>L%9===0?'vent':(L%7===0?'gliss':(L%5===0?'sans-goutiere':'normal'));

function bwHub(){
 bwActs();if(BW.raf)cancelAnimationFrame(BW.raf);
 cur='bowling';nv('games');theme('bowling');
 const d=st.get('bw:d',[]),nx=Math.max(1,d.length+1),g=ALL.find(x=>x.id==='bowling')||{ic:'🎳',t:'Bowling'};
 app.innerHTML=`<div class="top stk">${bk('home')}<div class="chip">❄ ${FLX()}</div></div>
 <section class="glass story pt-bowling"><i>${g.ic}</i><h2>${g.t}</h2><p>Viser, régler la puissance et lancer. Chaque partie complète contient dix frames. Fais mieux que l’IA, puis monte à l’infini : les quilles, la glace et le vent rendent les niveaux plus imprévisibles.</p></section>
 <section class="rc rcx pt-bowling" data-g="🎳"><div class="rc-ic">🎳</div><div class="rc-t"><small>${d.length?'Suite de l’aventure':'Commencer l’aventure'}</small><b>Niveau ${nx}</b><span>${d.length?'Partie contre l’IA':'Les variantes apparaissent avec les niveaux'}</span></div><button class="rc-go" data-a="bwLv" data-v="${nx}">Jouer <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></section>
 <section class="rc" data-g="⇅"><div class="rc-ic">👥</div><div class="rc-t"><small>Sur cet écran</small><b>À deux</b><span>Une même piste, chacun son tour</span></div><button class="rc-go" data-a="bwLocal">Jouer <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></section>
 <div class="dd pt-bowling" id="bwonline"><button class="dd-h" data-a="bwOnT" aria-expanded="false" aria-controls="bwonl"><span><b>En ligne</b><small>Amis ou joueurs inconnus</small></span><span>⌄</span></button>
 <div class="dd-l" id="bwonl"><div class="dd-i">
 ${SO.uid?`<button class="btn" data-a="bwCreate">Créer un salon</button><div class="chrow"><input id="bwcode" class="in" maxlength="5" placeholder="CODE" aria-label="Code du salon" autocomplete="off"><button class="btn alt" data-a="bwJoin">Entrer</button></div><button class="btn chgo" data-a="bwMatch">Trouver un joueur</button>`:`<p class="note" style="margin:0">Connecte-toi dans l’onglet Amis pour jouer en ligne.</p>`}
 </div></div></div>
 <div class="dd pt-bowling" id="bwlevels"><button class="dd-h" data-a="bwDd" aria-expanded="false"><span><b>Choisir un niveau</b><small>${d.length} niveau${d.length>1?'x':''} gagné${d.length>1?'s':''}</small></span><span>⌄</span></button><div class="dd-l"><div class="dd-i"><div class="lvg">${[...Array(Math.max(20,nx)).keys()].map(i=>{const n=i+1,o=d.includes(n);return`<button class="lv ${o?'d':n===nx?'nx':'far'}" data-a="bwLv" data-v="${n}"${n>nx&&n>20?' disabled':''}>${n}</button>`}).join('')}</div></div></div></div>`;
 window.scrollTo(0,0)}

function bwState(){
 return{id:Math.random().toString(36).slice(2,10),turn:0,frame:0,throws:0,rolls:[[ ],[ ]],scores:[0,0],pins:Array(bwPinN()).fill(1),fallen:[],st:'play',lv:BW.lv,names:['Joueur','IA'],m:''};
}
function bwNewState(local){
 const s=bwState();if(local)s.names=['Joueur 1','Joueur 2'];return s;
}
function bwScreen(sub){
 bwActs();cur='bowling';nv('games');theme('bowling');
 app.innerHTML=`<div class="bws"><div class="top stk"><button class="back" data-a="bwBk">‹ Bowling</button><b class="sott">${BW.mode==='lv'?'Niveau '+BW.lv:BW.mode==='loc'?'À deux':'En ligne'}</b><div class="chip">❄ ${FLX()}</div></div>
 <div class="bww"><canvas id="bwc" aria-label="Piste de bowling"></canvas><div class="bwscore" id="bwscore"></div></div><p class="m" id="m" role="status" aria-live="polite">${esc(sub||'Visée : fais glisser puis relâche.')}</p></div>`;
 BW.cv=$('#bwc');BW.x=BW.cv.getContext('2d');bwResize();BW.cv.addEventListener('pointerdown',bwAim);BW.cv.addEventListener('pointermove',bwAim);BW.cv.addEventListener('pointerup',bwRoll);addEventListener('resize',bwResize);
 BW.aim={x:.5,power:.15,angle:0};BW.rolling=false;BW.raf=requestAnimationFrame(bwLoop);window.scrollTo(0,0)}
function bwResize(){const c=BW.cv;if(!c)return;const w=Math.min(440,c.parentElement.clientWidth||360),h=Math.max(360,Math.min(innerHeight-170,620));const dpr=Math.min(2.5,devicePixelRatio||1);c.style.width=w+'px';c.style.height=h+'px';c.width=w*dpr;c.height=h*dpr;BW.W=w;BW.dpr=dpr;BW.H=h}
function bwAim(e){if(BW.rolling||BW.mode==='net'&&BW.role==='g')return;const r=BW.cv.getBoundingClientRect();const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;BW.aim.x=Math.max(.15,Math.min(.85,x));BW.aim.power=Math.max(.08,Math.min(1,y));BW.aim.angle=(BW.aim.x-.5)*1.1;bwDraw()}
function bwRoll(e){if(BW.rolling)return;const s=BW.S;if(!s||s.st!=='play'||BW.mode==='lv'&&s.turn!==0)return;BW.rolling=true;BW.roll={t:0,angle:BW.aim.angle,power:Math.max(.35,BW.aim.power)};bwDraw()}
function bwStepRoll(){
 const s=BW.S,roll=BW.roll,L=s.lv||BW.lv,variant=bwVariant(L);let p=0;
 if(roll.power>.82)p-=.06*(roll.power-.82);
 p+=roll.angle*.95;
 if(variant==='vent')p+=Math.sin(performance.now()/480)*.12;
 if(variant==='gliss')p+=Math.sin(performance.now()/300)*(.04);
 const miss=Math.abs(p);
 let hit=Math.round(10-Math.min(9,miss*9-(roll.power>.72?.8:0)));
 if(variant==='sans-goutiere')hit=Math.max(1,hit);
 hit=Math.max(0,Math.min(s.pins.filter(v=>v).length,hit));
 return hit;
}
function bwApplyHit(hit){
 const s=BW.S,standing=s.pins.filter(v=>v).length;
 let hitN=Math.min(hit,standing);const idx=s.pins.map((v,i)=>v?i:-1).filter(i=>i>=0);
 const pick=[];for(let i=0;i<hitN;i++){const j=Math.floor(Math.random()*idx.length);pick.push(idx.splice(j,1)[0])}pick.forEach(i=>s.pins[i]=0);
 s.rolls[s.turn].push(hitN);s.scores[s.turn]+=hitN;
 const spare=hitN===standing&&s.throws===1,strike=hitN===standing&&s.throws===0;
 s.throws++;
 if(strike||spare||s.throws>=2||s.frame>=9){
  s.throws=0;s.pins=Array(10).fill(1);
  if(s.frame>=9){s.frame=10;bwSync();bwFinish();return}
  s.frame++;s.turn=(s.turn+1)%2;
 }
 bwSync();
}
function bwLoop(n){
 if(!BW.cv||!BW.cv.isConnected)return;
 if(BW.rolling){BW.roll.t+=.05;if(BW.roll.t>1){BW.rolling=false;const hit=bwStepRoll();bwApplyHit(hit);if(BW.mode==='lv'&&BW.S.turn===1)setTimeout(bwAIRoll,650)}}
 if(BW.mode==='lv'&&BW.S&&BW.S.st==='play'&&BW.S.turn===1&&!BW.rolling&&BW.S._ait<=n){BW.S._ait=n+900;setTimeout(bwAIRoll,500)}
 bwDraw();BW.raf=requestAnimationFrame(bwLoop)}
function bwAIRoll(){if(BW.mode!=='lv'||BW.rolling)return;const s=BW.S;if(s.turn!==1||s.st!=='play')return;BW.rolling=true;BW.roll={t:0,angle:(Math.random()-.5)*(1-bwAI(s.lv||BW.lv))*1.2,power:.45+Math.random()*.5}}
function bwDraw(){
 const c=BW.x;if(!c||!BW.S)return;const dpr=BW.dpr,W=BW.W,H=BW.H;c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,W,H);
 const g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,'#dff1ed');g.addColorStop(.5,'#9fd0c4');g.addColorStop(1,'#edf9f6');c.fillStyle=g;c.fillRect(0,0,W,H);
 const laneW=W*.7,lx=(W-laneW)/2;c.fillStyle='#d69b63';c.fillRect(lx,10,laneW,H-20);c.fillStyle='rgba(255,255,255,.35)';
 for(let y=30;y<H;y+=28)c.fillRect(lx,y,laneW,2);
 c.strokeStyle='#8a6542';c.lineWidth=2;c.strokeRect(lx,10,laneW,H-20);
 c.strokeStyle='rgba(255,255,255,.8)';for(const x of [.25,.5,.75]){c.beginPath();c.moveTo(lx+laneW*x,20);c.lineTo(lx+laneW*x,H-30);c.stroke()}
 const px=lx+laneW*BW.aim.x,py=H-70;c.fillStyle='#2d4f64';c.beginPath();c.arc(px,py,16,0,7);c.fill();c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=3;c.beginPath();c.moveTo(px,py);c.lineTo(px+BW.aim.angle*laneW*.45,H*.45);c.stroke();
 const rows=[{y:.78,n:1,s:4.5},{y:.69,n:2,s:3.5},{y:.60,n:3,s:2.5},{y:.51,n:4,s:1.5}],cy=H*.43;
 let idx=0;for(const r of rows){for(let i=0;i<r.n;i++){let x=W/2+(i-(r.n-1)/2)*r.s*11;const fallen=!BW.S.pins[idx];c.fillStyle=fallen?'rgba(255,255,255,.18)':'#fff';c.beginPath();c.ellipse(x,cy-(r.y-.51)*H*.14,10,17,0,0,7);c.fill();c.fillStyle=fallen?'transparent':'#d64d50';c.beginPath();c.arc(x,cy-(r.y-.51)*H*.14-5,4,0,7);c.fill();idx++}}
 bwHUD()}
function bwHUD(){
 const root=$('#bwscore');if(!root||!BW.S)return;const s=BW.S;root.innerHTML=`<div class="bwhud"><span><small>${esc(s.names[0])}</small><b>${s.scores[0]}</b></span><i>${s.frame+1}/10</i><span><small>${esc(s.names[1])}</small><b>${s.scores[1]}</b></span></div><p class="bwvar">${bwVariant(s.lv||BW.lv)==='normal'?'Piste classique':bwVariant(s.lv||BW.lv)==='vent'?'Vent de glace':bwVariant(s.lv||BW.lv)==='gliss'?'Quilles mouvantes':'Sans gouttières'}</p>`}
function bwSync(){if(BW.mode==='net'&&BW.ref&&BW.canWrite)BW.ref.set(bwDoc()).catch(()=>{})}
function bwDoc(){return{j:JSON.stringify({k:'bowling',v:1,id:BW.S.id,p:BW.p||[],s:BW.S,n:+BW.S.frame,at:Date.now()})}}
function bwFinish(){
 const s=BW.S;if(!s)return;s.st='end';let win=s.scores[0]>s.scores[1];
 if(BW.mode==='lv'){const d=st.get('bw:d',[]);if(win&&!d.includes(BW.lv))d.push(BW.lv);st.set('bw:d',d)}
 const r=win?2:0;if(r){fl+=r;st.set('fl',fl)}
 const m=$('#m');if(m)m.textContent=win?'Victoire !':'Défaite';
 const o=document.createElement('div');o.className='ahov';o.innerHTML=`<div class="glass ahbox"><h2>${win?'Victoire !':'Défaite'}</h2><p class="note">${s.scores[0]} à ${s.scores[1]}${r?' · +'+r+' ❄':''}</p><div class="chrow">${BW.mode==='lv'?`<button class="btn" data-a="bwLv" data-v="${BW.lv+1}">Niveau suivant</button>`:'<button class="btn" data-a="bwAgain">Rejouer</button>'}<button class="btn alt" data-a="bwBk">Terminer</button></div></div>`;$('.bws').appendChild(o)}

async function bwDb(){try{const db=await scrDb();return db||null}catch(e){return null}}
async function bwCreate(){
 if(!SO.uid)return;const code=Math.random().toString(36).slice(2,7).toUpperCase().replace(/[^A-HJKMNP-Z2-9]/g,'A').slice(0,5);if(code.length<5)return bwCreate();
 BW.mode='net';BW.role='h';BW.room=code;BW.p=[SO.uid];BW.S=bwNewState(false);BW.S.names=['Toi','Invité'];bwScreen('Salon '+code+' — en attente d’un joueur.');
 const db=await bwDb();if(!db)return;BW.ref=db.collection('cc').doc(code);BW.canWrite=true;await BW.ref.set(bwDoc());BW.subs=BW.ref.onSnapshot(s=>bwRemote(s));
}
async function bwJoin(){
 const code=($('#bwcode')&&$('#bwcode').value||'').trim().toUpperCase();if(!/^[A-HJKMNP-Z2-9]{5}$/.test(code))return bwToast('Code invalide.');
 BW.mode='net';BW.role='g';BW.room=code;BW.p=[SO.uid];BW.canWrite=false;BW.S=bwNewState(false);bwScreen('Connexion au salon '+code+'…');
 const db=await bwDb();if(!db)return;BW.ref=db.collection('cc').doc(code);BW.canWrite=true;BW.subs=BW.ref.onSnapshot(s=>bwRemote(s));
}
function bwClean(x){
 if(!x||typeof x!=='object'||typeof x.j!=='string'||x.j.length>30000)return null;
 try{const y=JSON.parse(x.j);if(!y||y.k!=='bowling'||!y.s||y.s.frame>10)return null;return y}catch(e){return null}
}
function bwRemote(s){if(!s.exists)return;const x=bwClean(s.data());if(!x)return;BW.S=x.s;BW.p=x.p;BW.ended=false;bwHUD();if(BW.S.st==='end'&&!BW.ended){BW.ended=true;bwFinish()}}
async function bwMatch(){
 if(!SO.uid)return;const db=await bwDb();if(!db)return;
 BW.mode='net';BW.role='m';BW.queue=true;bwScreen('Recherche d’un joueur…');
 const mm=db.collection('mm').doc(SO.uid);await mm.set({t:Date.now(),n:(st.get('soc:me',null)||{}).name||'Joueur'}).catch(()=>{});clearInterval(BW.iv);
 BW.iv=setInterval(async()=>{
 if(!BW.queue)return;const q=await db.collection('mm').limit(20).get().catch(()=>null);if(!q)return;
 const u=q.docs.map(d=>d.id).filter(id=>id&&id!==SO.uid).sort()[0];if(!u)return;
 const pair=[SO.uid,u].sort(),gid=pair.join('_')+'_bw';BW.queue=false;clearInterval(BW.iv);BW.role=pair[0]===SO.uid?'h':'g';BW.p=pair;BW.room=gid;BW.ref=db.collection('sc').doc(gid);BW.canWrite=BW.role==='h';BW.S=bwNewState(false);BW.S.names=['Toi','Adversaire'];
 await BW.ref.set(bwDoc()).catch(()=>{});BW.subs=BW.ref.onSnapshot(s=>{if(s.exists)bwRemote(s)});await mm.delete().catch(()=>{});await db.collection('mm').doc(u).delete().catch(()=>{});
},1200)}
function bwStop(){if(BW.raf)cancelAnimationFrame(BW.raf);BW.raf=0;clearInterval(BW.iv);BW.queue=false;if(BW.subs){try{BW.subs()}catch(e){}}BW.subs=null;removeEventListener('resize',bwResize)}
function bwToast(t){const m=$('#m');if(m)m.textContent=t}
let bwAO=false;
function bwActs(){if(bwAO)return;bwAO=true;Object.assign(act,{
 bwLv:v=>{bwStop();BW.mode='lv';BW.role='';BW.lv=+v||1;BW.S=bwNewState(false);BW.S.lv=BW.lv;BW.S.names=['Toi','IA '+BW.lv];bwScreen('Batte mieux que l’IA.')},
 bwLocal:()=>{bwStop();BW.mode='loc';BW.role='';BW.lv=1;BW.S=bwNewState(true);bwScreen('Joueur 1 commence.')},
 bwBk:()=>{bwStop();BW.mode='';BW.room='';bwHub()},
 bwAgain:()=>{if(BW.mode==='loc')act.bwLocal();else if(BW.mode==='net')bwCreate();else act.bwLv(BW.lv)},
 bwCreate:()=>bwCreate(),
 bwJoin:()=>bwJoin(),
 bwMatch:()=>bwMatch(),
 bwDd:()=>{$('#bwlevels').classList.toggle('open');},
 bwOnT:()=>{$('#bwonline').classList.toggle('open');}
})}
