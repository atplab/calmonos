/* ---------- Blocs : des pièces de glace qui tombent doucement ---------- */
const TTP={I:[[0,1],[1,1],[2,1],[3,1]],O:[[1,0],[2,0],[1,1],[2,1]],T:[[1,0],[0,1],[1,1],[2,1]],S:[[1,0],[2,0],[0,1],[1,1]],Z:[[0,0],[1,0],[1,1],[2,1]],J:[[0,0],[0,1],[1,1],[2,1]],L:[[2,0],[0,1],[1,1],[2,1]]};
const TTC={I:'#7fdcf0',O:'#ffd97a',T:'#b49cf5',S:'#8fe3b0',Z:'#ff9db5',J:'#7ea8ff',L:'#ffb27a',G:'#a9bfdc',C:'#f6d7ff'};
const TTZ={I:4,O:4,T:3,S:3,Z:3,J:3,L:3};
const TTR={};for(const k in TTP){TTR[k]=[TTP[k]];for(let r=1;r<4;r++)TTR[k].push(k==='O'?TTP[k]:TTR[k][r-1].map(([x,y])=>[TTZ[k]-1-y,x]))}
/* niveau : lignes à faire, vitesse de chute (ms par case), rangées de glace au départ */
/* niveaux spéciaux (un niveau sur trois) : cr cristaux à libérer · w grille étroite · bag petit sac de pièces · zen pièces immobiles · rise marée de glace · mc lignes multiples */
/* pc : poser tel nombre de pièces sans que la pile touche le haut */
const TTS=[{cr:3,gb:4},{w:8,goal:10},{pc:30},{bag:'ILJO',goal:10},{zen:1,goal:15},{rise:10,goal:10},{mc:3},{pc:40,w:8},{cr:4,gb:5},{w:7,goal:12},{bag:'TSZ',goal:8},{pc:35,rise:8},{zen:1,goal:20,gb:4},
 {rise:8,goal:12},{mc:4},{pc:45,bag:'TSZ'},{cr:5,gb:6},{w:8,bag:'IO',goal:12},{zen:1,cr:4,gb:5},{pc:50,w:7},{rise:9,w:8,goal:12},{mc:5},{cr:6,gb:7},{pc:60},{bag:'ILJ',goal:14},{zen:1,goal:25}];
/* 66 niveaux : 40 classiques et 26 spéciaux répartis régulièrement */
const TTN=66,TTO=(()=>{const sp=new Set(TTS.map((_,k)=>Math.floor((k+.9)*TTN/TTS.length)));let n=0,s=0;return[...Array(TTN).keys()].map(f=>sp.has(f)?['s',s++]:['n',n++])})();
const ttLv=l=>{const f=l%TTN,k=Math.floor(l/TTN),[t,j]=TTO[f],i=t==='s'?Math.round(f*40/TTN):j;
 const b={goal:Math.min(30,10+Math.floor(i/4)*2),ms:Math.max(170,880-i*17-k*60),gb:t==='n'&&i%5===4?Math.min(8,3+Math.floor(i/8)):0};
 return t==='s'?Object.assign(b,TTS[j]):b};
function pTetris(r){
 const L=ttLv(lv),W=L.w||10,H=20,R0=rng((lv+5)*40503+9),GT=L.pc?'p':L.cr?'c':L.mc?'m':'l',G=L.pc||L.cr||L.mc||L.goal,UN={p:'pièces posées',c:'cristaux',m:'coups multiples',l:'lignes'}[GT];
 let pcs=0,crs=0,mcs=0,placed=0,Bd,cur=null,nxt=[],hold=null,held=false,lines=0,score=0,acc=0,lockT=0,lockN=0,soft=false,done=false,over=false,paused=false,clr=null,combo=-1;
 let vx=0,vy=0,fadeIn=0,rotT=0,trail=null,parts=[],flash=[],rowOff=null,hintP=null,lastT=0,cell=24,dpr=Math.min(2,devicePixelRatio||1);
 snap=()=>({});
 const bag=()=>{const a=L.bag?[...L.bag,...L.bag]:Object.keys(TTP);for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
 const fresh=()=>{Bd=[...Array(H)].map(()=>Array(W).fill(null));
  for(let g=0;g<L.gb;g++){const y=H-1-g,h=R0()*W|0;for(let x=0;x<W;x++)if(x!==h&&R0()<.86)Bd[y][x]='G'}
  /* cristaux pris dans la glace, un par rangée autant que possible */
  if(L.cr){const rs=[...Array(L.gb).keys()].sort(()=>R0()-.5);for(let c=0;c<L.cr;c++){const y=H-1-rs[c%rs.length],xs=[...Array(W).keys()].filter(x=>Bd[y][x]==='G');if(xs.length)Bd[y][xs[R0()*xs.length|0]]='C'}}
  nxt=[...bag(),...bag()];hold=null;held=false;lines=0;pcs=0;crs=0;mcs=0;placed=0;score=0;combo=-1;parts=[];flash=[];clr=null;rowOff=null;hintP=null;over=false;spawn()};
 frame(`<div class="tth"><button class="ttbx" data-a="ttHold" aria-label="Garder la pièce"><small>Garde</small><canvas id="tthc"></canvas></button>
  <div class="ttmid"><div class="ttl"><span id="ttln">0</span> / ${G} ${UN}</div><div class="ttbar"><i id="ttbr"></i></div><div class="tts"><span id="ttsc">0</span> pts</div></div>
  <div class="ttbx ttnx"><small>Suivante</small><canvas id="ttnc"></canvas></div></div>
  <div class="ttrow"><div class="ttc ttcl"><button data-k="l" aria-label="Gauche"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><button data-k="t" aria-label="Tourner"><svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg></button><button data-k="g" aria-label="Garder ou échanger la pièce"><svg viewBox="0 0 24 24"><path d="M7 7h11l-3-3M17 17H6l3 3"/></svg></button></div><div class="ttw" id="ttw"><canvas id="ttcv" class="ttcv"></canvas><div class="ttpop" id="ttpop"></div><div class="ttov" id="ttov" hidden></div>
   <button class="ttpz" data-a="ttPause" aria-label="Pause"><svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg></button></div>
  <div class="ttc ttcr"><button data-k="r" aria-label="Droite"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button><button data-k="d" aria-label="Descendre"><svg viewBox="0 0 24 24"><path d="M12 5v13M6 12l6 6 6-6"/></svg></button><button data-k="h" aria-label="Faire tomber"><svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg></button></div></div>`,1);
 const cv=$('#ttcv'),ctx=cv.getContext('2d'),wr=$('#ttw'),hc=$('#tthc'),nc=$('#ttnc');
 /* tailles */
 const ctl=()=>st.get('tt:ctl',''),applyCtl=()=>{const r=$('.ttrow');if(r)r.classList.toggle('nob',ctl()==='g')};
 const size=()=>{applyCtl();const avW=Math.min(($('.ttrow')||wr.parentElement).clientWidth||320,520)-(ctl()==='g'?4:2*(Math.min(50,Math.max(40,innerWidth*.105))+6)+6),rw=$('.ttrow'),rt=rw?rw.getBoundingClientRect().top:168,tl=rw?[...rw.parentElement.children].filter(e=>rw.compareDocumentPosition(e)&4).reduce((s,e)=>s+(e.offsetHeight||0)+6,0):0,avH=Math.max(200,innerHeight-rt-tl-22);cell=Math.max(14,Math.floor(Math.min(avW/W,avH/H)));
  cv.width=W*cell*dpr;cv.height=H*cell*dpr;cv.style.width=W*cell+'px';cv.style.height=H*cell+'px';
  const s=Math.max(8,Math.round(cell*.42));hc.width=4*s*dpr;hc.height=2.4*s*dpr;hc.style.width=4*s+'px';hc.style.height=2.4*s+'px';
  nc.width=4*s*dpr;nc.height=2.4*s*dpr;nc.style.width=4*s+'px';nc.style.height=2.4*s+'px';SP={};side()};
 /* petites images de bloc, prêtes à dessiner */
 let SP={};const spr=(k,c)=>{const id=k+c;if(SP[id])return SP[id];const o=document.createElement('canvas'),s=Math.ceil(c*dpr);o.width=o.height=s;const g=o.getContext('2d'),col=TTC[k],p=s*.06,rr=s*.22;
  g.beginPath();g.roundRect(p,p,s-2*p,s-2*p,rr);const gr=g.createLinearGradient(0,0,0,s);gr.addColorStop(0,'#ffffff');gr.addColorStop(.18,col);gr.addColorStop(1,col);g.fillStyle=gr;g.globalAlpha=.95;g.fill();
  g.globalAlpha=1;g.fillStyle=col;g.beginPath();g.roundRect(p+s*.04,p+s*.12,s-2*p-s*.08,s-2*p-s*.16,rr*.8);g.fill();
  g.fillStyle='rgba(255,255,255,.45)';g.beginPath();g.roundRect(p+s*.14,p+s*.12,s*.36,s*.12,s*.06);g.fill();
  g.strokeStyle='rgba(0,0,0,.12)';g.lineWidth=s*.04;g.beginPath();g.roundRect(p,p,s-2*p,s-2*p,rr);g.stroke();
  if(k==='C'){const m=s/2;g.fillStyle='#fff';g.shadowColor='#ffe38a';g.shadowBlur=s*.25;g.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,rd=i%2?s*.1:s*.3;g.lineTo(m+Math.cos(a)*rd,m+Math.sin(a)*rd)}g.closePath();g.fill();g.shadowBlur=0}
  return SP[id]=o};
 const cellsOf=(k,ro,x,y)=>TTR[k][ro&3].map(([a,b])=>[x+a,y+b]);
 const fits=(k,ro,x,y)=>cellsOf(k,ro,x,y).every(([a,b])=>a>=0&&a<W&&b<H&&(b<0||!Bd[b][a]));
 const dropY=p=>{let y=p.y;while(fits(p.k,p.r,p.x,y+1))y++;return y};
 function spawn(){if(nxt.length<8)nxt.push(...bag());const k=nxt.shift();cur={k,r:0,x:Math.floor((W-TTZ[k])/2),y:k==='I'?-1:0};held=false;hintP=null;
  vx=cur.x;vy=cur.y-.7;fadeIn=0;lockT=0;lockN=0;acc=0;side();if(!fits(cur.k,0,cur.x,cur.y))lose()}
 const touch=()=>{if(lockN<15){lockT=0;lockN++}};
 const mv=dx=>{if(!cur||clr||done||over||paused)return false;if(fits(cur.k,cur.r,cur.x+dx,cur.y)){cur.x+=dx;touch();return true}
  wr.classList.remove('nl','nr');void wr.offsetWidth;wr.classList.add(dx<0?'nl':'nr');return false};
 const rot=d=>{if(!cur||clr||done||over||paused||cur.k==='O')return;const nr=(cur.r+d+4)&3;
  for(const [kx,ky] of [[0,0],[-1,0],[1,0],[0,-1],[-2,0],[2,0],[-1,-1],[1,-1]])if(fits(cur.k,nr,cur.x+kx,cur.y+ky)){cur.r=nr;cur.x+=kx;cur.y+=ky;rotT=performance.now();touch();sfx(520,.03);return}};
 const down=()=>{if(!cur||clr||done||over||paused)return false;if(fits(cur.k,cur.r,cur.x,cur.y+1)){cur.y++;acc=0;score+=soft?1:0;return true}return false};
 const hard=()=>{if(!cur||clr||done||over||paused)return;const y0=cur.y,y1=dropY(cur);score+=2*(y1-y0);
  trail={cs:cellsOf(cur.k,cur.r,cur.x,y0),d:y1-y0,k:cur.k,t:performance.now()};cur.y=y1;vy=y1;lock(true)};
 const doHold=()=>{if(!cur||held||clr||done||over||paused)return;const k=cur.k;if(hold){cur={k:hold,r:0,x:Math.floor((W-TTZ[hold])/2),y:hold==='I'?-1:0};vx=cur.x;vy=cur.y-.7;fadeIn=0;lockT=0;lockN=0}else spawn();hold=k;held=true;hintP=null;side();sfx(440,.04)};
 function lock(hd){const now=performance.now();let top=false;cellsOf(cur.k,cur.r,cur.x,cur.y).forEach(([a,b])=>{if(b<0)top=true;else{Bd[b][a]=cur.k;flash.push([a,b,now])}});
  if(hd){wr.classList.remove('bump');void wr.offsetWidth;wr.classList.add('bump');sfx(170,.07);vib(6)}else sfx(230,.04);
  cur=null;hintP=null;placed++;pcs++;if(top)return lose();
  const full=[];for(let y=0;y<H;y++)if(Bd[y].every(Boolean))full.push(y);
  if(full.length){clr={rows:full,t:now};combo++;const n=full.length;score+=[0,100,300,500,800][n]*(1+Math.floor(lv/10))+Math.max(0,combo)*50;
   sfx(480+n*90,.22);vib(10+n*6);
   full.forEach(y=>{for(let x=0;x<W;x++)for(let q=0;q<2;q++)parts.push({x:x+.5,y:y+.5,vx:(Math.random()-.5)*9,vy:-Math.random()*7-1,l:1,c:TTC[Bd[y][x]],s:.12+Math.random()*.16})});
   const nc=full.reduce((s,y)=>s+Bd[y].filter(c=>c==='C').length,0);
   if(nc)full.forEach(y=>Bd[y].forEach((c,x)=>{if(c==='C')for(let q=0;q<14;q++)parts.push({x:x+.5,y:y+.5,vx:(Math.random()-.5)*12,vy:-Math.random()*10-2,l:1.4,c:q%2?'#ffe38a':'#ffffff',s:.08+Math.random()*.12})}));
   pop(nc?(nc>1?nc+' cristaux libérés !':'Cristal libéré !'):n===4?'Quatre lignes !':n===3?'Triple !':n===2?'Double !':combo>0?'Enchaînement ×'+(combo+1):'',nc?4:n);
  }else{combo=-1;hud();if(prog()>=G)return winNow();next()}hud()}
 /* marée de glace : une rangée monte du fond toutes les quelques pièces */
 function next(){if(L.rise&&placed>=L.rise){placed=0;if(Bd[0].some(Boolean))return lose();Bd.shift();const h=Math.random()*W|0;Bd.push([...Array(W)].map((_,x)=>x===h?null:'G'));rowOff={o:Array(H).fill(-1),t:performance.now()};sfx(150,.12);vib(8)}spawn()}
 const finishClear=()=>{const rows=clr.rows;clr=null;const keep=Bd.filter((_,y)=>!rows.includes(y)),n=rows.length;
  /* les rangées du dessus descendent en glissant */
 const ncr=rows.reduce((s,y)=>s+Bd[y].filter(c=>c==='C').length,0);crs+=ncr;if(n>=2)mcs++;
  const off=Array(H).fill(0);let k=H-1;for(let y=H-1;y>=0;y--){if(rows.includes(y))continue;off[k]=rows.filter(q=>q>y).length;k--}
  Bd=[...Array(n)].map(()=>Array(W).fill(null)).concat(keep);rowOff={o:off,t:performance.now()};
  lines+=n;hud();if(prog()>=G){winNow();return}next()};
 function prog(){return GT==='p'?pcs:GT==='c'?crs:GT==='m'?mcs:lines}
 const pop=(t,n)=>{if(!t)return;const e=$('#ttpop');e.textContent=t;e.className='ttpop';void e.offsetWidth;e.className='ttpop on'+(n>=4?' big':'')};
 const hud=()=>{const v=prog();$('#ttln').textContent=Math.min(v,G);$('#ttsc').textContent=score;$('#ttbr').style.width=Math.min(100,v*100/G)+'%'};
 const lose=()=>{over=true;cur=null;sfx(200,.3);const o=$('#ttov');o.hidden=false;o.innerHTML=`<div><b>La pile touche le ciel</b><p>${prog()} ${UN} sur ${G}.</p><button class="btn" data-a="ttCont">Continuer · 1 ❄</button><button class="btn alt" data-a="ttRe">Recommencer</button></div>`;requestAnimationFrame(()=>o.classList.add('on'))};
 const hideOv=()=>{const o=$('#ttov');o.classList.remove('on');o.hidden=true};
 const winNow=()=>{done=true;cur=null;const now=performance.now();for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(Bd[y][x]){flash.push([x,y,now+(H-y)*25]);if(Math.random()<.5)parts.push({x:x+.5,y:y+.5,vx:(Math.random()-.5)*6,vy:-Math.random()*8-2,l:1.3,c:'#ffffff',s:.1+Math.random()*.12})}
  pop('Bravo !',4);setTimeout(win,1600)};
 act.ttHold=doHold;
 act.ttPause=()=>{if(done||over)return;paused=!paused;const o=$('#ttov');if(paused){o.hidden=false;o.innerHTML=`<div><b>Pause</b><p>Les flocons attendent.</p><button class="btn" data-a="ttPause">Reprendre</button><button class="btn alt" data-a="ttCtl" data-v="${ctl()==='g'?'b':'g'}">${ctl()==='g'?'Jouer avec les boutons':'Jouer au doigt seulement'}</button></div>`;requestAnimationFrame(()=>o.classList.add('on'))}else hideOv()};
 act.ttCont=()=>{if(!over||!spend(1))return;for(let y=0;y<10;y++)Bd[y].fill(null);
  /* la moitié haute s’envole en flocons */
  hideOv();over=false;for(let i=0;i<40;i++)parts.push({x:Math.random()*W,y:Math.random()*10,vx:(Math.random()-.5)*4,vy:-Math.random()*5,l:1,c:'#ffffff',s:.1+Math.random()*.1});spawn()};
 act.ttRe=()=>{hideOv();fresh();hud()};
 /* indice : la meilleure place pour la pièce s’entoure d’or */
 act.hint=()=>{if(!cur||clr||done||over||paused)return;let best=null;
  for(let ro=0;ro<4;ro++)for(let x=-2;x<W;x++){if(!fits(cur.k,ro,x,cur.y)&&!fits(cur.k,ro,x,0))continue;let y=fits(cur.k,ro,x,cur.y)?cur.y:0;if(!fits(cur.k,ro,x,y))continue;while(fits(cur.k,ro,x,y+1))y++;
   const G=Bd.map(rw=>rw.slice());let ok=true;cellsOf(cur.k,ro,x,y).forEach(([a,b])=>{if(b<0)ok=false;else G[b][a]=1});if(!ok)continue;
   const G2=G.filter(rw=>!rw.every(Boolean)),cl=H-G2.length;while(G2.length<H)G2.unshift(Array(W).fill(null));
   let ag=0,ho=0,bu=0,hs=[];for(let c=0;c<W;c++){let h=0,seen=false;for(let q=0;q<H;q++){if(G2[q][c]){if(!seen){h=H-q;seen=true}}else if(seen)ho++}hs.push(h);ag+=h}
   for(let c=0;c<W-1;c++)bu+=Math.abs(hs[c]-hs[c+1]);const sc=.76*cl-.51*ag-.36*ho*1.6-.18*bu;if(!best||sc>best.sc)best={sc,ro,x,y}}
  if(!best||!spend(1))return;hintP={k:cur.k,r:best.ro,x:best.x,y:best.y,t:performance.now()};msg('La place dorée est la plus douce pour cette pièce.')};
 /* commandes : boutons (appui long répété), gestes sur la grille, clavier */
 const rep={};
 document.querySelectorAll('.ttc button').forEach(b=>{const k=b.dataset.k;
  const fire=()=>{if(k==='l')mv(-1);else if(k==='r')mv(1);else if(k==='t')rot(1);else if(k==='d'){soft=true;down()}else if(k==='h')hard();else if(k==='g')doHold()};
  b.addEventListener('pointerdown',e=>{e.preventDefault();b.classList.add('on');fire();if('lrd'.includes(k)){clearTimeout(rep[k]);rep[k]=setTimeout(function f(){fire();rep[k]=setTimeout(f,k==='d'?45:55)},170)}});
  const up=()=>{b.classList.remove('on');clearTimeout(rep[k]);if(k==='d')soft=false};['pointerup','pointerleave','pointercancel'].forEach(t=>b.addEventListener(t,up))});
 /* jeu au doigt sur tout l’écran : toucher = tourner, glisser à gauche/droite = déplacer (case par case), glisser vers le bas = tout en bas, vers le haut = garder */
 let g0=null;
 const gd=e=>{if(!cv.isConnected){document.removeEventListener('pointerdown',gd,true);return}
  if(e.button>0||done||over||paused||!$('#ttw'))return;const t=e.target;if(t.closest&&t.closest('button,a,input,.top,.ttov,.nav,nav,dialog'))return;
  e.preventDefault();g0={x:e.clientX,y:e.clientY,t:performance.now(),ax:0,ax0:0,m:false,v:false,id:e.pointerId,hd:false};
  /* maintenir le doigt sans bouger : la pièce descend plus vite */
  const g1=g0;clearTimeout(g0.ht);g0.ht=setTimeout(()=>{if(g0===g1&&!g1.m&&!g1.v&&cv.isConnected){g1.hd=true;soft=true}},260)};
 const gm=e=>{if(!g0||e.pointerId!==g0.id)return;if(!cv.isConnected){g0=null;return}const c=Math.max(18,cell*.9),DX=e.clientX-g0.x,DY=e.clientY-g0.y;
  if(!g0.m&&!g0.v&&!g0.hd&&Math.hypot(DX,DY)>10)g0.v=Math.abs(DY)>Math.abs(DX)*1.2;
  if(g0.v)return;let dx=DX/c-g0.ax;while(dx>=1){mv(1);g0.ax++;dx--;g0.m=true}while(dx<=-1){mv(-1);g0.ax--;dx++;g0.m=true}};
 const gu=e=>{if(!g0||e.pointerId!==g0.id)return;const dt=performance.now()-g0.t,dx=e.clientX-g0.x,dy=e.clientY-g0.y,v=g0.v,hd=g0.hd;clearTimeout(g0.ht);g0=null;if(hd){soft=false;return}if(!cv.isConnected)return;
  if(v&&dy>30)hard();else if(v&&dy<-40)doHold();else if(Math.hypot(dx,dy)<12&&dt<350)rot(1)};
 document.addEventListener('pointerdown',gd,true);
 const gM=e=>{if(!gclean())gm(e)},gU=e=>{if(!gclean())gu(e)},gc=()=>{if(g0){clearTimeout(g0.ht);if(g0.hd)soft=false}g0=null;gclean()};
 const gclean=()=>{if(!cv.isConnected){document.removeEventListener('pointermove',gM);document.removeEventListener('pointerup',gU);document.removeEventListener('pointercancel',gc);return true}};
 document.addEventListener('pointermove',gM);document.addEventListener('pointerup',gU);document.addEventListener('pointercancel',gc);
 const kd=e=>{if(!cv.isConnected){removeEventListener('keydown',kd);removeEventListener('keyup',ku);return}
  const m={ArrowLeft:()=>mv(-1),ArrowRight:()=>mv(1),ArrowUp:()=>rot(1),x:()=>rot(1),z:()=>rot(-1),ArrowDown:()=>{soft=true;down()},' ':()=>hard(),c:doHold,Shift:doHold,p:act.ttPause,Escape:act.ttPause}[e.key];
  if(m){e.preventDefault();m()}};
 const ku=e=>{if(e.key==='ArrowDown')soft=false};
 addEventListener('keydown',kd);addEventListener('keyup',ku);
 /* côtés : pièce gardée et pièces suivantes */
 function side(){const s=hc.width/4;const dp=(g,k,ox,oy,a)=>{if(!k)return;const cs=TTR[k][0],mx=Math.min(...cs.map(c=>c[0])),Mx=Math.max(...cs.map(c=>c[0])),my=Math.min(...cs.map(c=>c[1])),My=Math.max(...cs.map(c=>c[1]));
   const w=(Mx-mx+1)*s,h=(My-my+1)*s,im=spr(k,s/dpr);g.globalAlpha=a;cs.forEach(([x,y])=>g.drawImage(im,ox-w/2+(x-mx)*s,oy-h/2+(y-my)*s,s,s));g.globalAlpha=1};
  let g=hc.getContext('2d');g.clearRect(0,0,hc.width,hc.height);dp(g,hold,hc.width/2,hc.height/2,held?.4:1);
  g=nc.getContext('2d');g.clearRect(0,0,nc.width,nc.height);dp(g,nxt[0],nc.width/2,nc.height/2,1)}
 /* boucle de dessin */
 const ease=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),3);
 const draw=now=>{const c=cell*dpr;ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,cv.width,cv.height);
  ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;ctx.beginPath();for(let x=1;x<W;x++){ctx.moveTo(x*c+.5,0);ctx.lineTo(x*c+.5,H*c)}for(let y=1;y<H;y++){ctx.moveTo(0,y*c+.5);ctx.lineTo(W*c,y*c+.5)}ctx.stroke();
  let ro=null;if(rowOff){const t=(now-rowOff.t)/170;if(t>=1)rowOff=null;else ro=rowOff.o.map(o=>o*(1-ease(t)))}
  for(let y=0;y<H;y++){const cl=clr&&clr.rows.includes(y),oy=ro?ro[y]:0;
   for(let x=0;x<W;x++){const k=Bd[y][x];if(!k)continue;
    if(cl){const t=(now-clr.t)/220,sc=1-ease(t),cx=(x+.5)*c,cy=(y+.5)*c;ctx.globalAlpha=Math.max(0,1-t*.6);ctx.drawImage(spr(k,cell),cx-c*sc/2,cy-c*sc/2,c*sc,c*sc);
     ctx.globalAlpha=Math.max(0,.8-t);ctx.fillStyle='#fff';ctx.fillRect(x*c,y*c,c,c);ctx.globalAlpha=1;continue}
    ctx.drawImage(spr(k,cell),x*c,(y-oy)*c,c,c)}}
  /* éclat des blocs qui viennent de se poser */
  flash=flash.filter(([x,y,t])=>now-t<260);flash.forEach(([x,y,t])=>{const a=now<t?0:.55*(1-(now-t)/260);if(a<=0)return;ctx.globalAlpha=a;ctx.fillStyle='#fff';ctx.beginPath();ctx.roundRect(x*c+c*.06,y*c+c*.06,c*.88,c*.88,c*.2);ctx.fill();ctx.globalAlpha=1});
  /* traînée de la chute rapide */
  if(trail){const t=(now-trail.t)/200;if(t>=1)trail=null;else{const cols={};trail.cs.forEach(([a,b])=>{cols[a]=Math.min(cols[a]??99,b)});
   for(const a in cols){const y0=cols[a]*c,y1=(cols[a]+trail.d)*c,gr=ctx.createLinearGradient(0,y0,0,y1);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(1,TTC[trail.k]);ctx.globalAlpha=.45*(1-t);ctx.fillStyle=gr;ctx.fillRect(a*c+c*.2,y0,c*.6,Math.max(0,y1-y0));ctx.globalAlpha=1}}}
  if(cur){const gy=dropY(cur);
   /* ombre */
   ctx.globalAlpha=.22;cellsOf(cur.k,cur.r,cur.x,gy).forEach(([a,b])=>{if(b>=0)ctx.drawImage(spr(cur.k,cell),a*c,b*c,c,c)});ctx.globalAlpha=1;
   if(hintP&&hintP.k===cur.k){ctx.strokeStyle='#ffd34d';ctx.lineWidth=c*.1;ctx.globalAlpha=.6+.4*Math.sin(now/220);cellsOf(hintP.k,hintP.r,hintP.x,hintP.y).forEach(([a,b])=>{if(b>=0){ctx.beginPath();ctx.roundRect(a*c+c*.1,b*c+c*.1,c*.8,c*.8,c*.2);ctx.stroke()}});ctx.globalAlpha=1}
   const rt=(now-rotT)/140,sc=rt<1?1+.1*(1-ease(rt)):1,cs=cellsOf(cur.k,cur.r,0,0),mx=cs.reduce((s,q)=>s+q[0],0)/4+.5,my=cs.reduce((s,q)=>s+q[1],0)/4+.5;
   ctx.globalAlpha=Math.min(1,fadeIn);ctx.save();ctx.translate((vx+mx)*c,(vy+my)*c);ctx.scale(sc,sc);
   cs.forEach(([a,b])=>{if(vy+b>-1)ctx.drawImage(spr(cur.k,cell),(a-mx)*c,(b-my)*c,c,c)});ctx.restore();ctx.globalAlpha=1}
  /* flocons et éclats */
  parts.forEach(p=>{ctx.globalAlpha=Math.max(0,Math.min(1,p.l));ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x*c,p.y*c,p.s*c,0,7);ctx.fill()});ctx.globalAlpha=1};
 const tick=now=>{if(!cv.isConnected)return;requestAnimationFrame(tick);const dt=Math.min(50,now-(lastT||now));lastT=now;
  parts.forEach(p=>{p.x+=p.vx*dt/1000;p.y+=p.vy*dt/1000;p.vy+=14*dt/1000;p.l-=dt/900});parts=parts.filter(p=>p.l>0&&p.y<H+2);
  if(clr&&now-clr.t>=220)finishClear();
  if(cur&&!paused&&!clr&&!over&&!done){fadeIn+=dt/120;
   acc+=dt;const sp=soft?Math.min(45,L.ms):L.ms;
   if(fits(cur.k,cur.r,cur.x,cur.y+1)){lockT=0;if(L.zen&&!soft)acc=0;else while(acc>=sp){acc-=sp;if(!down())break}}else{acc=0;lockT+=dt;if(lockT>=480)lock(false)}}
  if(cur){vx+=(cur.x-vx)*Math.min(1,dt/45);vy+=(cur.y-vy)*Math.min(1,dt/55);if(Math.abs(cur.x-vx)<.01)vx=cur.x;if(Math.abs(cur.y-vy)<.01)vy=cur.y}
  draw(now)};
 const rs=()=>{if(!cv.isConnected){removeEventListener('resize',rs);return}size()};addEventListener('resize',rs);
 window.__TTDBG={fill:()=>{const cs=cellsOf(cur.k,cur.r,cur.x,0),my=Math.max(...cs.map(c=>c[1]));for(let x=0;x<W;x++)Bd[H-1][x]=cs.some(c=>c[0]===x&&c[1]===my)?null:'T'},st:()=>({lines,clr:!!clr,cur:cur&&{...cur},done})};
 /* au premier lancement : choisir de jouer avec ou sans boutons */
 act.ttCtl=v=>{st.set('tt:ctl',v==='g'?'g':'b');size();if(paused){paused=false;hideOv()}};
 fresh();size();hud();requestAnimationFrame(()=>{if(cv.isConnected)size()});
 if(!ctl()){paused=true;const o=$('#ttov');o.hidden=false;o.innerHTML='<div><b>Comment veux-tu jouer ?</b><p>Tu pourras changer plus tard dans la pause.</p><button class="btn" data-a="ttCtl" data-v="b">Avec les boutons</button><button class="btn alt" data-a="ttCtl" data-v="g">Au doigt seulement</button><p class="ttch">Au doigt : touche pour tourner, glisse à gauche ou à droite pour déplacer, glisse vers le bas pour lâcher, vers le haut pour garder.</p></div>';requestAnimationFrame(()=>o.classList.add('on'))}
msg(L.pc?'Défi : pose '+L.pc+' pièces sans que la pile touche le haut.':L.cr?'Des cristaux dorment dans la glace : libère-les en effaçant leurs rangées.':L.zen?'Neige immobile : les pièces ne tombent pas toutes seules. Prends ton temps.':L.rise?'Marée de glace : une rangée monte du fond toutes les '+L.rise+' pièces.':L.mc?'Efface au moins 2 lignes d’un coup, '+L.mc+' fois.':L.bag?'Petit sac : seules ces pièces tombent ('+[...L.bag].join(', ')+').':L.w?'Grille étroite : les lignes se remplissent plus vite.':L.gb?'Des rangées de glace attendent au fond : creuse jusqu’à elles.':'');requestAnimationFrame(tick);
}
