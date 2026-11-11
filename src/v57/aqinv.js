/* Inventaire : ranger / sortir poissons et décors, placer les décors */
function aqInv(){
 const a=aqRead(),el=$('#aql');if(!el)return;
 const nm=aqNames(a),fo=FISH.filter(f=>a.f[f.id]),dO=DECO.filter(d=>a.d[d.id]!==undefined);
 const fr=fo.map(f=>{const on=a.f[f.id].on;return`<div class="ai"><div class="ap">${fishSVG(f)}</div><div class="atx"><b>${esc(nm[f.id])}</b><small>${esc(f.n)} · ${on?'Dans l’aquarium':'Rangé'}</small></div><button class="sb" data-a="aqtg" data-v="${f.id}">${on?'Ranger':'Sortir'}</button></div>`}).join('');
 const dr=dO.map(d=>{const on=a.d[d.id];return`<div class="ai"><div class="ap sq"><svg viewBox="${d.vb||'0 0 100 100'}" aria-hidden="true">${d.svg}</svg></div><div class="atx"><b>${d.n}</b><small>${on?'Dans l’aquarium':'Rangé'}</small></div><button class="sb" data-a="aqdt" data-v="${d.id}">${on?'Ranger':'Sortir'}</button></div>`}).join('');
 el.innerHTML=`<p class="aqc">Poissons dans l’aquarium : <b>${aqOn(a).length} / ${MAXF}</b> · décors : <b>${dO.filter(d=>a.d[d.id]).length} / ${dO.length}</b></p>`
 +`<div class="aqf aqed"><div><b>Placer les décors</b><small>Déplace tes décors où tu veux dans l’aquarium.</small></div><button class="btn" data-a="aqed">Déplacer</button></div>`
 +(Object.keys(a.p).length?'<button class="lnk" data-a="aqpr">Remettre les décors à leur place</button>':'')
 +`<h3 class="aqh">Poissons</h3>`+(fr||'<p class="aqc">Aucun poisson pour l’instant : va faire un tour à la boutique.</p>')
 +`<h3 class="aqh">Décors</h3>`+(dr||'<p class="aqc">Aucun décor pour l’instant : va faire un tour à la boutique.</p>');
}
function aqPanel(){
 const tc=$('.aqtc');if(tc)tc.textContent=aqTab==='inv'?'Inventaire':'Entretien';
 if(aqTab==='inv')return aqInv();
 if(!DECO_G.some(g=>g[0]==='float')){DECO_G.splice(1,0,['float','Flottants']);DECO.forEach(d=>{if(!d.g&&d.k==='float')d.g='float'})}
 aqPanel0();
 const el=$('#aql');if(!el)return;
 /* à la boutique, ce qu’on possède se gère dans l’inventaire */
 el.querySelectorAll('[data-a=aqtg],[data-a=aqdt]').forEach(b=>{const s=document.createElement('span');s.className='aqown';s.textContent='Possédé ✓';b.replaceWith(s)});
 el.querySelectorAll('.aqed,[data-a=aqpr]').forEach(b=>b.remove());
 /* objets de Noël : verrouillés tant que Zeni n’a pas atteint l’étape demandée ; les fonds gratuits s’« obtiennent » */
 const A0=aqRead();
 /* poissons rangés par sections, comme les décors */
 if(aqTab==='fish'){const rows=[...el.querySelectorAll(':scope > .ai')];if(rows.length===FISH.length){AQFG.forEach(([g,t])=>{const rs=rows.filter((r,i)=>aqFC(FISH[i])===g);if(!rs.length)return;const h=document.createElement('h3');h.className='aqh';h.textContent=t;el.appendChild(h);rs.forEach(r=>el.appendChild(r))})}}
 el.querySelectorAll('[data-a=aqbuy]').forEach(b=>{const[k,id]=b.dataset.v.split(':'),L=(k==='f'?FISH:k==='d'?DECO:WATER).find(x=>x.id===id);if(!L)return;
  const r=b.closest('.ai'),sil=()=>{if(!r)return;r.classList.add('xlk','sil');const nb=r.querySelector('.atx b');if(nb)nb.textContent='???'};
  if(k==='d'&&aqHid(L,k,A0)){if(r)r.remove();return}
  const tn=aqTL(L,k,A0);
  if(k==='f'&&id==='gardien'&&!A0.f.hockey){sil();const sm=r&&r.querySelector('small');if(sm)sm.textContent='Se débloque après ???';b.outerHTML='<button class="sb lkb" disabled>🔒 ???</button>'}
  else if(tn){sil();const sm=r&&r.querySelector('small');if(sm)sm.textContent='Se débloque avec l’aquarium '+tn;b.outerHTML='<button class="sb lkb" disabled>🔒 Aquarium '+tn+'</button>'}
  else if(aqXL(L)){sil();const sm=r&&r.querySelector('small');if(sm)sm.textContent='Un noël pour Zeni : étape '+L.lk;b.outerHTML='<button class="sb lkb" disabled>🔒 Étape '+L.lk+'</button>'}
  else if(!L.p)b.textContent='Obtenir'});
 /* boutique : les éléments à acheter défilent en carrousel (à acheter d’abord, déjà possédés ensuite) */
 if(aqTab==='fish'||aqTab==='deco'){
  let grp=[];const flush=()=>{if(!grp.length)return;const c=document.createElement('div');c.className='aqcar';grp[0].before(c);[...grp.filter(r=>r.querySelector('.buy')),...grp.filter(r=>r.classList.contains('xlk')),...grp.filter(r=>!r.querySelector('.buy')&&!r.classList.contains('xlk'))].forEach(r=>c.appendChild(r));grp=[]};
  [...el.children].forEach(ch=>{if(ch.classList.contains('ai'))grp.push(ch);else flush()});flush();
  /* une section vide (ex. Hiver avant le 10 janvier) disparaît */
  el.querySelectorAll('h3.aqh').forEach(h=>{const n=h.nextElementSibling;if(!n||!n.classList.contains('aqcar'))h.remove()});
 }
}
/* ---------- Niveaux d’aquarium : deux barres (poissons, décors) remplies par les achats ----------
   Aquarium 2 : 830 ❄ dépensés en poissons et 530 ❄ en décors · Aquarium 3 : 2150 ❄ et 1200 ❄ (totaux depuis le début).
   Dans chaque barre : +5 ❄ au premier tiers, +10 ❄ au deuxième. Le mode illimité débloque tout. */
const AQT=[[830,530],[2150,1200]],AQR3=[5,10];
const aqWinter=()=>UNL()||Date.now()>=new Date(2027,0,10).getTime();
const aqFC=f=>f.lk||f.ev?'ev':['hippo','raie','tortue','meduse'].includes(f.id)?'mar':'fish';
const AQFG=[['fish','Poissons'],['mar','Animaux marins'],['ev','Événements']];
function aqSpent(a){let f=0,d=0;FISH.forEach(x=>{if(a.f[x.id])f+=x.p});DECO.forEach(x=>{if(a.d[x.id]!==undefined)d+=x.p});return{f,d}}
function aqTier(a){if(UNL())return 3;const s=aqSpent(a);let t=1;for(const[F,D]of AQT){if(s.f>=F&&s.d>=D)t++;else break}return t}
/* palier demandé pour acheter un objet (0 = libre) */
function aqNeed(L,k){if(!L||UNL()||L.lk)return 0;if(k==='f'){if(['hippo','discus','raie','lune','tortue','hockey','gardien'].includes(L.id))return 2;if(L.id==='royal')return 3;if(L.id==='meduse')return Date.now()<new Date(2026,10,16).getTime()?0:3}return 0}
const aqTL=(L,k,a)=>{const n=aqNeed(L,k);return n&&aqTier(a||aqRead())<n?n:0};
const aqHid=(L,k,a)=>k==='d'&&L.g==='winter'&&!aqWinter()&&(a||aqRead()).d[L.id]===undefined;
/* récompenses des tiers : versées une seule fois */
function aqRewards(a){const s=aqSpent(a),r=a.lr||{};let g=0,ch=false;
 [[0,0,s.f],[0,1,s.d],[1,0,s.f],[1,1,s.d]].forEach(([t,b,v])=>{const lo=t?AQT[t-1][b]:0,hi=AQT[t][b];[1,2].forEach(q=>{const k=t+''+b+q;if(!r[k]&&v>=lo+(hi-lo)*q/3){r[k]=1;ch=true;if(!UNL())g+=AQR3[q-1]}})});
 if(ch){const t0=a.lt||1,t1=aqTier(a);a.lr=r;a.lt=t1;aqSave(a);if(g){fl+=g;st.set('fl',fl);const c=document.querySelector('.aqhd .chip');if(c)c.textContent='❄ '+FLX()}
  mt='m-aq';if(t1>t0)msg('✦ Aquarium '+t1+' débloqué ! De nouveaux poissons t’attendent à la boutique.'+(g?' +'+g+' ❄':''));else if(g){const tx='✦ Palier atteint : +'+g+' ❄';msg(tx);setTimeout(()=>{const m=$('#m-aq');if(m&&m.textContent===tx)m.textContent=''},5000)}if(g||t1>t0){sfx(880,.3);setTimeout(()=>sfx(1175,.4),140)}}}
function aqLvHTML(a){const t=aqTier(a),s=aqSpent(a),mx=t>AQT.length,lim=AQT[Math.min(t,AQT.length)-1],lo=t>1?AQT[Math.min(t,AQT.length)-2]:[0,0];
 const bar=(ic,v,b)=>{const L=lo[b],H=lim[b],p=mx?1:Math.max(0,Math.min(1,(v-L)/(H-L)));return`<div class="aqlb"><i>${ic}</i><div class="aqlt"><span style="width:${(p*100).toFixed(1)}%"></span><em style="left:33.3%" class="${p>=1/3?'ok':''}"></em><em style="left:66.6%" class="${p>=2/3?'ok':''}"></em></div><small>${mx?'max':v+' ❄'}</small></div>`};
 return`<b class="aqln">Aquarium ${Math.min(t,3)}${mx?' · niveau max':''}</b>${bar('🐟',s.f,0)}${bar('🪸',s.d,1)}`}
const aqStatus0=aqStatus;
aqStatus=function(){aqStatus0();const a=aqRead();aqRewards(a);
 /* la méduse nourrie s’illumine quelques minutes */
 try{const m=a.f.meduse,g=m&&m.on&&m.gl&&Date.now()-m.gt<3*6e4&&Date.now()-m.gt>=0?Math.min(3,m.gl):0;document.querySelectorAll('.tank .fx[data-id=meduse]').forEach(e=>{e.classList.toggle('glow',g>0);if(g)e.dataset.gl=g;else delete e.dataset.gl})}catch(e){}
const st0=$('.aqst');if(!st0)return;st0.classList.toggle('open',!!window.AQLV);{const h1=$('.aqh1');if(h1){h1.classList.toggle('on',!!window.AQLV);h1.setAttribute('aria-expanded',window.AQLV?'true':'false')}}let l=st0.querySelector('.aqlv');if(!l){l=document.createElement('div');l.className='aqlv';st0.appendChild(l)}const h=aqLvHTML(a);if(l.dataset.h!==h){l.innerHTML=h;l.dataset.h=h}};
const aqBuy0=aqBuy;
aqBuy=function(v){const[k,id]=v.split(':'),a=aqRead(),L=(k==='f'?FISH:k==='d'?DECO:WATER).find(x=>x.id===id);mt='m-aq';
 if(L&&aqHid(L,k,a))return;if(k==='f'&&id==='gardien'&&!a.f.hockey)return msg('Se débloque après ???.');const n=L&&aqTL(L,k,a);if(n)return msg('Se débloque avec l’aquarium '+n+'.');aqBuy0(v)};

window.aqMedGl=n=>{try{const a=aqRead(),m=a.f.meduse;if(!m)return;m.gl=Math.min(3,n);m.gt=Date.now();aqSave(a);aqStatus()}catch(e){}};
/* la méduse attrape le grain avec une tentacule, la replie pour amener le grain sous son ombrelle, dans sa bouche */
window.aqMedEat=el=>{try{
 const s=el.querySelector('.fi svg')||el.querySelector('svg');if(!s)return;const g=s.querySelector('g');if(!g)return;
 const ps=g.querySelectorAll('path'),o=ps[3]||ps[ps.length-1];if(!o||s._mt)return;s._mt=1;
 const N='http://www.w3.org/2000/svg',c=document.createElementNS(N,'circle'),t=document.createElementNS(N,'path');
 c.setAttribute('r','3');c.setAttribute('fill','#f6c46a');c.setAttribute('stroke','#fff3cf');c.setAttribute('stroke-width','1');
 t.setAttribute('fill','none');t.setAttribute('stroke',o.getAttribute('stroke'));t.setAttribute('stroke-width','3');t.setAttribute('stroke-linecap','round');
 o.style.opacity='0';s.insertBefore(t,g.nextSibling);s.insertBefore(c,t.nextSibling);
 s.classList.remove('mgr');void s.getBoundingClientRect();s.classList.add('mgr');
 const B=[52,24],P0=[8,27],M=[53,25.5],T=1500,t0=performance.now(),e=q=>q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2,L=(a,b,q)=>a+(b-a)*q;
 const W=(x,y,w)=>{const dx=x-B[0],dy=y-B[1],d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d;
  return`M${B[0]} ${B[1]}C${(B[0]+dx*.33+nx*w).toFixed(1)} ${(B[1]+dy*.33+ny*w).toFixed(1)} ${(B[0]+dx*.66-nx*w).toFixed(1)} ${(B[1]+dy*.66-ny*w).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`};
 const st=n=>{const k=Math.min(1,(n-t0)/T);let x,y,r=3,tx,ty,w;
  if(k<.2){const q=e(k/.2);x=P0[0];y=P0[1];tx=L(6,x,q);ty=L(28,y,q);w=L(6,-3,q)}
  else if(k<.72){const q=e((k-.2)/.52);x=L(P0[0],M[0]-6,q);y=L(P0[1],M[1]+9,q)+Math.sin(q*Math.PI)*5;tx=x;ty=y;w=L(-3,-9,q)}
  else if(k<.84){const q=e((k-.72)/.12);x=L(M[0]-6,M[0],q);y=L(M[1]+9,M[1],q);tx=x;ty=y;w=-9;r=3*(1-q*.5)}
  else{const q=e((k-.84)/.16);x=M[0];y=M[1];r=1.5*(1-q);tx=L(M[0]-6,6,q);ty=L(M[1]+9,28,q);w=L(-9,6,q)}
  t.setAttribute('d',W(tx,ty,w));
  c.setAttribute('cx',x.toFixed(1));c.setAttribute('cy',y.toFixed(1));c.setAttribute('r',Math.max(0,r).toFixed(2));
  if(k<1)requestAnimationFrame(st);else{c.remove();t.remove();o.style.opacity='';s.classList.remove('mgr');s._mt=0}};
 requestAnimationFrame(st);
}catch(e){}};

/* position réelle de la bouche (ou du bout des tentacules pour la méduse), en tenant compte des retournements et du balancement */
const AQMO={std:[67,25],tall:[59,27],round:[65,25],long:[71,24],neon:[76,25],danio:[78,25],cardinal:[77,25],betta:[76,26],gourami:[70,26],globe:[64,25],hippo:[72,8],manta:[83,25],tortue:[83,29],meduse:[8,27],veil:[71,24]};
window.aqMouth=(el,t)=>{try{const f=FISH.find(x=>x.id===el.dataset.id),a=AQMO[f&&f.sh]||AQMO.std,s=el.querySelector('.fi svg')||el.querySelector('svg'),m=s.getScreenCTM();if(!m)return null;
 const q=new DOMPoint(a[0],a[1]).matrixTransform(m),r=t.getBoundingClientRect();return{x:q.x-r.left-t.clientLeft,y:q.y-r.top-t.clientTop}}catch(e){return null}};

act.aqlvt=()=>{window.AQLV=!window.AQLV;aqStatus()};

/* Poisson hockeyeur : au repas, des rondelles et un but tombent ; il tire ses rondelles dans le but avec son bâton */
window.aqAnc=(el,t,a)=>{try{const s=el.querySelector('.fi svg')||el.querySelector('svg'),m=s.getScreenCTM();if(!m)return null;const q=new DOMPoint(a[0],a[1]).matrixTransform(m),r=t.getBoundingClientRect();return{x:q.x-r.left-t.clientLeft,y:q.y-r.top-t.clientTop}}catch(e){return null}};
window.aqRink=function(sh,gk){
 const t=$('#tank');if(!t)return false;const eH=sh&&t.querySelector('.fx[data-id=hockey]'),eG=gk&&t.querySelector('.fx[data-id=gardien]');sh=!!eH;gk=!!eG;if(!sh&&!gk)return false;
 if(AQS&&AQS.t!==t)aqStop();
 const S=AQS||(AQS={t,P:[],F:{},raf:0,last:0});if((sh&&S.F.hockey&&S.F.hockey.mode!=='done')||(gk&&S.F.gardien&&S.F.gardien.mode!=='done'))return true;
 const tw=t.clientWidth,th=t.clientHeight,tb=t.getBoundingClientRect();
 const mk=(el,id)=>{const r=el.getBoundingClientRect();return S.F[id]={el,fr:el.querySelector('.fr'),fi:el.querySelector('.fi'),px:r.left-tb.left,py:r.top-tb.top,fw:r.width,fh:r.height,mode:'hk',tg:null,eaten:99,max:0,dir:1,face:0,rt:0,et:0,lab:true,k:0,vmax:240}};
 const f=sh?mk(eH,'hockey'):null,g=gk?mk(eG,'gardien'):null,ref=f||g;
 const ys=Math.round(th*.8-ref.fh*.09-2-th*.035),gs=sh?(f.px+f.fw/2<tw/2?1:-1):(g.px+g.fw/2<tw/2?-1:1),gw=Math.round(Math.min(78,Math.max(54,tw*.16))),gh=Math.round(gw*.7),gx=gs>0?tw-gw-24:24;
 if(f){f.dir=gs;eH.classList.add('hkon');eH.style.animationPlayState='paused'}if(g){g.dir=-gs;eG.classList.add('gkon');eG.style.animationPlayState='paused'}
 const G=document.createElement('div');G.className='hkg'+(gs<0?' l':'');G.style.cssText=`width:${gw}px;height:${gh}px;left:${gx}px;top:${ys-gh+4}px`;
 G.innerHTML=`<svg viewBox="0 0 70 50" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="hkm" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 0L6 6M6 0L0 6" stroke="#fff" stroke-width=".8" opacity=".75"/></pattern></defs><g class="hkn"><path d="M6 6H40Q62 10 66 48H6Z" fill="url(#hkm)"/><path d="M6 6H40Q62 10 66 48" fill="rgba(255,255,255,.12)"/></g><path d="M6 48V6H40Q62 10 66 48" fill="none" stroke="#d6363f" stroke-width="3.4" stroke-linejoin="round"/><path d="M3 48H68" stroke="#d6363f" stroke-width="3" stroke-linecap="round"/></svg>`;
 t.appendChild(G);let gOk=false;
 G.animate([{transform:`translateY(${-(ys+30)}px) rotate(${-6*gs}deg)`,easing:'cubic-bezier(.45,0,.9,.6)'},{transform:'translateY(0) rotate(0)',offset:.78,easing:'ease-out'},{transform:'translateY(-7px) rotate(1deg)',offset:.9,easing:'ease-in'},{transform:'translateY(0)'}],{duration:1500}).onfinish=()=>{gOk=true};
 const P=[];
 if(sh){const gsp=g?g.fw*.8+46:0,lo=gs>0?Math.max(tw*.1,f.fw+10):gx+gw+34+gsp,hi=gs>0?gx-40-gsp:Math.min(tw*.9,tw-f.fw-10);
  for(let i=0;i<3;i++){const e=document.createElement('i');e.className='hkp';const x=lo+(hi-lo)*((i+.5)/3+(Math.random()-.5)*.18);t.appendChild(e);
   const p={e,x,y:ys,ok:false,done:false};P.push(p);e.style.transform=`translate(${x.toFixed(1)}px,${ys}px)`;
   e.animate([{transform:`translate(${x.toFixed(1)}px,-14px) rotate(0)`,easing:'cubic-bezier(.4,0,.85,.7)'},{transform:`translate(${(x+6).toFixed(1)}px,${ys*.5}px) rotate(${200*gs}deg)`,offset:.5},{transform:`translate(${x.toFixed(1)}px,${ys}px) rotate(360deg)`,offset:.85,easing:'ease-out'},{transform:`translate(${x.toFixed(1)}px,${ys-4}px) rotate(360deg)`,offset:.93},{transform:`translate(${x.toFixed(1)}px,${ys}px) rotate(360deg)`}],{duration:1500,delay:250+i*380,fill:'backwards'}).onfinish=()=>{p.ok=true}}}
 const BL=[79,51],gmx=gs>0?gx+4-(g?g.fw*.8:0):gx+gw-4+(g?g.fw*.8:0);let st=sh?'wait':'solo',gst='go',gT=0,cur=null,tt=0,T0=performance.now(),last=0,goals=0;
 const say=(txt,c)=>{const b=document.createElement('div');b.className='hkt'+(c?' '+c:'');b.textContent=txt;b.style.left=(gx+gw/2)+'px';b.style.top=(ys-gh-8)+'px';t.appendChild(b);setTimeout(()=>b.remove(),1100)};
 const pop=(el,c)=>{el.classList.remove(c);void el.offsetWidth;el.classList.add(c);setTimeout(()=>el.classList.remove(c),700)};
 const goal=p=>{goals++;const n=G.querySelector('.hkn');if(n)n.animate([{transform:'none'},{transform:`translateX(${3*gs}px) scaleX(1.05)`},{transform:`translateX(${-1*gs}px)`},{transform:'none'}],{duration:420,easing:'ease-out'});
  say('But !');sfx(820+goals*80,.18);try{vib(12)}catch(e){}p.e.animate([{opacity:1},{opacity:0}],{duration:500,delay:350,fill:'forwards'}).onfinish=()=>p.e.remove()};
 const shoot=p=>{const gx2=gs>0?gx+gw*.62:gx+gw*.38;
  if(!gk){const du=Math.max(320,Math.abs(gx2-p.x)/380*1000);p.e.animate([{transform:`translate(${p.x.toFixed(1)}px,${ys}px)`},{transform:`translate(${(gx2-4*gs).toFixed(1)}px,${ys-2}px)`,offset:.92},{transform:`translate(${gx2.toFixed(1)}px,${ys}px)`}],{duration:du,easing:'cubic-bezier(.15,.7,.35,1)',fill:'forwards'}).onfinish=()=>goal(p);return}
  const B=aqAnc(eG,t,BL)||{x:gmx},gkx=B.x,save=Math.random()<.5,v=.42;
  if(save){const x1=gkx-6*gs,du=Math.max(260,Math.abs(x1-p.x)/v);
   setTimeout(()=>pop(eG,'gks'),Math.max(0,du-160));
   p.e.animate([{transform:`translate(${p.x.toFixed(1)}px,${ys}px)`},{transform:`translate(${x1.toFixed(1)}px,${ys}px)`}],{duration:du,easing:'linear',fill:'forwards'}).onfinish=()=>{
    say('Arrêt !','sv');sfx(300,.16);try{vib(8)}catch(e){}const x2=x1-gs*(38+Math.random()*20);
    p.e.animate([{transform:`translate(${x1.toFixed(1)}px,${ys}px) rotate(0)`},{transform:`translate(${((x1+x2)/2).toFixed(1)}px,${ys-12}px) rotate(${-180*gs}deg)`,offset:.4},{transform:`translate(${x2.toFixed(1)}px,${ys}px) rotate(${-300*gs}deg)`}],{duration:650,easing:'ease-out',fill:'forwards'}).onfinish=()=>p.e.animate([{opacity:1},{opacity:0}],{duration:450,delay:250,fill:'forwards'}).onfinish=()=>p.e.remove()}}
  else{const du=Math.max(340,Math.abs(gx2-p.x)/v),fr=Math.abs(gkx-p.x)/Math.abs(gx2-p.x);
   setTimeout(()=>pop(eG,'gkm'),Math.max(0,du*fr-260));
   p.e.animate([{transform:`translate(${p.x.toFixed(1)}px,${ys}px)`},{transform:`translate(${gx2.toFixed(1)}px,${ys}px)`}],{duration:du,easing:'linear',fill:'forwards'}).onfinish=()=>goal(p)}};
 const relax=(el,o,cls)=>{el.classList.remove(...cls);el.style.animationPlayState='';if(o&&o.mode==='hk'){o.bk=0;o.mode='back'}};
 const fin=()=>{st='end';if(eH)eH.classList.remove('hks');setTimeout(()=>{if(eH)relax(eH,f,['hkon']);if(eG)relax(eG,g,['gkon','gks','gkm']);if(!S.raf&&AQS===S)S.raf=requestAnimationFrame(aqStep);
   G.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateY(14px)'}],{duration:800,delay:900,fill:'forwards'}).onfinish=()=>G.remove();P.forEach(p=>{if(!p.done)p.e.remove()})},sh?900:300)};
 const bail=()=>{G.remove();P.forEach(p=>p.e.remove());if(eH)relax(eH,f,['hkon','hks']);if(eG)relax(eG,g,['gkon','gks','gkm']);if(AQS===S&&!S.raf)S.raf=requestAnimationFrame(aqStep)};
 setTimeout(()=>{if(st!=='end'){st='end';bail()}},26000);
 const mv=(o,el,tx0,ty0,dt)=>{const B=aqAnc(el,t,BL);if(!B)return 99;const tx=tx0-B.x,ty=ty0-B.y,d=Math.hypot(tx,ty);o.rt+=dt;const v=o.vmax*Math.min(1,.3+o.rt/.5);if(d>=2.5){const m=Math.min(d,v*dt);o.px+=tx/d*m;o.py+=ty/d*m}return d};
 const others=()=>Object.entries(S.F).some(([k,o])=>k!=='hockey'&&k!=='gardien'&&o.mode!=='done'&&o.mode!=='back');
 const step=n=>{if(!t.isConnected||AQS!==S||(f&&f.mode!=='hk')||(g&&g.mode!=='hk')){if(st!=='end'){st='end';bail()}return}try{
  const dt=Math.min(.05,last?(n-last)/1000:.016);last=n;
  if(n-T0>22000&&st!=='end'){fin()}
  if(g&&st!=='end'){g.dir=-gs;if(gst==='go'){if(gOk&&mv(g,eG,gmx,ys-1,dt)<2.5){gst='guard';gT=n}}else mv(g,eG,gmx,ys-1+Math.sin(n/380)*1.5,dt)}
  if(st==='solo'){if(gst==='guard'&&n-gT>5000&&!others())fin()}
  else if(st==='wait'){const c=P.filter(p=>p.ok&&!p.done);if(c.length){const B=aqAnc(eH,t,BL)||{x:f.px,y:f.py};c.sort((a,b)=>Math.hypot(a.x-B.x,a.y-B.y)-Math.hypot(b.x-B.x,b.y-B.y));cur=c[0];st='go';f.rt=0}else if(P.every(p=>p.done))fin()}
  else if(st==='go'){f.dir=gs;const d=mv(f,eH,cur.x-5*gs,ys-1,dt);if(d<2.5&&(!gk||gst==='guard')){st='shoot';tt=0;eH.classList.remove('hks');void eH.offsetWidth;eH.classList.add('hks')}}
  else if(st==='shoot'){tt+=dt;if(tt>=.28&&!cur.done){cur.done=true;shoot(cur)}if(tt>=.62){eH.classList.remove('hks');cur=null;st=gk?'pause':'wait';tt=0}}
  else if(st==='pause'){tt+=dt;if(tt>1.3)st='wait'}
  }catch(e){st='end';bail();return}if(st!=='end')requestAnimationFrame(step)};
 requestAnimationFrame(step);if(!S.raf)S.raf=requestAnimationFrame(aqStep);return true};
window.aqHockey=()=>aqRink(true,false);
const aqFx0=aqFx;
aqFx=function(ids,hg){try{const H=(hg||ids).includes('hockey')&&ids.includes('hockey')&&!!$('#tank .fx[data-id=hockey]'),K=(hg||ids).includes('gardien')&&ids.includes('gardien')&&!!$('#tank .fx[data-id=gardien]');
 if(!wRM&&(H||K)){const r=ids.filter(i=>!(H&&i==='hockey')&&!(K&&i==='gardien'));if(r.length)aqFx0(r,hg);aqRink(H,K);return}}catch(e){}return aqFx0(ids,hg)};

/* flocons gagnés : une seule mention, à gauche des flocons possédés, une fois que tout le monde a fini de manger */
let AQGN=0,AQGI=0,AQGT=0;
window.aqGainShow=g=>{AQGN+=g;clearInterval(AQGI);clearTimeout(AQGT);const t0=Date.now();const old=$('.aqgn');if(old)old.remove();
 AQGI=setInterval(()=>{const S=AQS,busy=S&&S.t&&S.t.isConnected&&(Object.values(S.F).some(f=>f.mode!=='done'&&f.mode!=='back')||S.P.some(p=>p.state!==2));
  if(busy&&Date.now()-t0<25000)return;clearInterval(AQGI);const n=AQGN;AQGN=0;const c=$('.aqhd .chip');if(!c||!n)return;
  const e=document.createElement('span');e.className='aqgn';e.setAttribute('role','status');e.textContent='+'+n+' ❄';c.insertAdjacentElement('beforebegin',e);
  AQGT=setTimeout(()=>{e.classList.add('out');setTimeout(()=>e.remove(),450)},5000)},200)};

/* le gardien ne nage jamais sans le poisson hockeyeur */
setTimeout(()=>{const t0=act.aqtg;act.aqtg=v=>{mt='m-aq';const a=aqRead(),g=a.f.gardien,h=a.f.hockey;
  if(v==='gardien'&&g&&!g.on&&!(h&&h.on))return msg('Le gardien a besoin du poisson hockeyeur dans l’aquarium.');
  if(v==='hockey'&&h&&h.on&&g&&g.on){h.on=0;g.on=0;aqSave(a);aquaRefresh();return msg('Le gardien suit le hockeyeur en réserve.')}
  return t0(v)};
 try{const a=aqRead();if(a.f.gardien&&a.f.gardien.on&&!(a.f.hockey&&a.f.hockey.on)){a.f.gardien.on=0;aqSave(a)}}catch(e){}},0);
