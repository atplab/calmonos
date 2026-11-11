/* ---------- Échecs : écrans, parties, amis ----------
   Trois façons de jouer : contre l’ordinateur (trois niveaux), sur le même appareil, ou à distance contre un ami.
   Partie à distance : même collection que le Scrabble (sc/<id1>_<id2>_c), donc aucune règle Firebase de plus.
   La durée (sans limite ou 1 à 30 minutes par joueur) se choisit à la création, sauf contre l’ordinateur (toujours sans limite). Les pendules démarrent après le premier coup de chaque camp. */
const CHTC=[0,1,3,5,10,15,30],CHLV=[{n:'Lapereau',e:'🐇',d:'Il apprend encore'},{n:'Renard',e:'🦊',d:'Malin et prudent'},{n:'Hibou',e:'🦉',d:'Réfléchit longtemps'}];
const CH={scr:'',cfg:Object.assign({op:'ai',lv:2,col:0,tc:0},st.get('ch:cfg',{})),g:null,fl:null,sel:-1,lg:[],pr:null,think:false,busy:false,m:'',cf:'',cft:0,t0:0,tick:0,fgT:0,flg:false,subs:{},G:{},got:{},err:{},ec:{},slow:0,fid:'',rc:null,pay:'',nw:false};
const chGid=f=>scrGid(f)+'_c';
const chNm=f=>scrNm(f);
const chTcT=n=>n?n+' min':'Sans limite';
const chFmt=v=>{v=Math.max(0,Math.ceil(v/1000));return Math.floor(v/60)+':'+String(v%60).padStart(2,'0')};
/* les pièces : dessinées à la main, couleurs données par la feuille de style */
const CHSV=['',
'<circle cx="22.5" cy="13" r="5.3"/><path d="M22.5 19.2c-3.4 0-5.4 1.8-5.4 4.1 0 1.9 1.1 3.3 2.5 4.4-4 2-7.2 5.6-7.2 10.3h20.2c0-4.7-3.2-8.3-7.2-10.3 1.4-1.1 2.5-2.5 2.5-4.4 0-2.3-2-4.1-5.4-4.1z"/>',
'<path d="M11.5 38c-.5-9.5 1.5-16 7.5-20.2-1.6-.6-3-1.6-4.2-3.1 1.4-2.2 3.2-3.6 5.6-4.3L21.2 7l3.6 2.5c8.2 1.2 13.7 8.2 13.7 17.5V38z"/><path class="dt" d="M17.5 21.5c1.8-1.2 3.2-2.8 3.8-5"/><circle class="ey" cx="23" cy="14.2" r="1.3"/>',
'<circle cx="22.5" cy="7.6" r="2.5"/><path d="M22.5 11c5.4 3.5 8.6 7.7 8.6 12.1 0 2.9-1.6 5-3.6 6.6h-10c-2-1.6-3.6-3.7-3.6-6.6 0-4.4 3.2-8.6 8.6-12.1z"/><path d="M11.5 38.2c0-3.3 2.8-5.6 6-5.6h10c3.2 0 6 2.3 6 5.6z"/><path class="dt" d="M19.8 21.8l5.4-5.6"/>',
'<path d="M11 38v-4.6l3.2-2.6V19l-3.2-2.8V8.6h5.8v3.9h3.8V8.6h3.8v3.9h3.8V8.6H34v7.6L30.8 19v11.8l3.2 2.6V38z"/><path class="dt" d="M14.2 21.5h16.6M14.2 30h16.6"/>',
'<circle cx="9.6" cy="14.2" r="2.3"/><circle cx="16.1" cy="11.4" r="2.3"/><circle cx="22.5" cy="10.4" r="2.3"/><circle cx="28.9" cy="11.4" r="2.3"/><circle cx="35.4" cy="14.2" r="2.3"/><path d="M9.6 16.5l4.8 14L16.1 13.7l4.6 15.6 1.8-17.6 1.8 17.6 4.6-15.6 1.7 16.8 4.8-14-2.6 19.7H12.2z"/><path d="M11.6 38.4h21.8v-3.3H11.6z"/>',
'<path class="cx" d="M22.5 4.8v8.2M18.7 8.7h7.6"/><path d="M22.5 14c-5.6 0-9.2 3.4-9.2 7.6 0 2.5 1.4 4.3 3.1 5.7-3.6 2-5.8 5.1-5.8 9.7h23.8c0-4.6-2.2-7.7-5.8-9.7 1.7-1.4 3.1-3.2 3.1-5.7 0-4.2-3.6-7.6-9.2-7.6z"/><path class="dt" d="M16.5 27.3h12"/>'];
const CHSK=[{id:'f',n:'Forêt',p:0,d:'Les pièces de la clairière'},{id:'h',n:'Hiver',p:50,d:'Tuques, écharpes et neige'},{id:'o',n:'Océan',p:350,d:'Coquillages, bulles et trident'},{id:'e',n:'Espace',p:600,d:'Casques, anneaux et étoiles'}];
const CHSC='<path class="x1" d="M13.2 31.2q9.3 3.2 18.6 0l.5 3.6q-9.8 3.2-19.6 0z"/><path class="dt2" d="M16.4 32.4l.7 3.5M21 33.2l.6 3.6M26 33.2l.5 3.6M30.3 32.4l.5 3.4"/><path class="x1" d="M27.6 35l3.6 5.8-3.8.8-2.2-5.2z"/>';
const CHSTAR=(x,y,s)=>`<path class="x2" transform="translate(${x} ${y}) scale(${s})" d="M0 -3.2l1 2.1 2.3.3-1.7 1.6.5 2.3L0 2.2l-2.1 1.1.5-2.3-1.7-1.6 2.3-.3z"/>`;
const CHX={
h:['',
 '<path class="x1" d="M16.9 13.2c0-3.8 2.4-6.2 5.6-6.2s5.6 2.4 5.6 6.2z"/><rect class="x2" x="16.2" y="12.2" width="12.6" height="2.6" rx="1.3"/><circle class="x2" cx="22.5" cy="6.2" r="2"/>',
 '<path class="x1" d="M17.2 15.4c-.8-4.8 1.8-8.6 5.8-9.2 2.2-.2 3.8.6 4.8 2.4l-1.4 7z"/><rect class="x2" x="16.4" y="14.6" width="11.6" height="2.6" rx="1.3" transform="rotate(-6 22 16)"/><circle class="x2" cx="21.4" cy="5.6" r="2"/>',
 '<path class="x1" d="M17.2 18.4c0-4 2.2-6.8 5.3-8.2 3.1 1.4 5.3 4.2 5.3 8.2z"/><rect class="x2" x="16.4" y="17.4" width="12.2" height="2.6" rx="1.3"/><circle class="x2" cx="22.5" cy="8.6" r="2.2"/>',
 '<path class="sn" d="M10.4 12.2V8.8q1.2-3 4.6-2.6 2-1.8 4.6-.6 2.6-1.6 5.2-.2 3.6-.6 4.8 2.8v4z"/><circle class="sn" cx="13.8" cy="13.4" r="1.5"/><circle class="sn" cx="22.4" cy="13.8" r="1.3"/><circle class="sn" cx="30.6" cy="13.4" r="1.5"/>',
 CHSC,
 CHSC.replace(/M13.2 31.2q9.3 3.2 18.6 0l.5 3.6q-9.8 3.2-19.6 0z/,'M14.2 26.6q8.3 3.2 16.6 0l.5 3.6q-8.8 3.2-17.6 0z').replace('M16.4 32.4l.7 3.5M21 33.2l.6 3.6M26 33.2l.5 3.6M30.3 32.4l.5 3.4','M17 27.8l.6 3.4M21.4 28.6l.5 3.5M25.5 28.6l.4 3.5M29.3 27.8l.4 3.4').replace('M27.6 35l3.6 5.8-3.8.8-2.2-5.2z','M27.4 30.4l3.6 5.4-3.8.8-2.2-4.8z')],
o:['',
 '<path class="x1" d="M16.6 12.8q5.9-9.6 11.8 0z"/><path class="dt2" d="M22.5 12.6V6.2M19.4 12.4l-1.5-4.2M25.6 12.4l1.5-4.2"/>',
 '<path class="x1" d="M33.2 14.2c3.2.8 5.6 2.8 6.8 6-2.6-.8-4.6-.6-6 .4 2.4 1 4 2.6 4.8 5.2-2.8-1-5-.8-7 .4z"/><circle class="bb" cx="15.4" cy="22.6" r="1.4"/>',
 '<circle class="bb" cx="22.5" cy="6.4" r="3.2"/><circle class="bb" cx="27.2" cy="3.4" r="1.5"/><circle class="bb" cx="21.4" cy="22.4" r="1.5"/><circle class="bb" cx="24.6" cy="19" r="1.1"/>',
 '<path class="dt2" d="M14 24q2.2-2.6 4.2 0t4.2 0 4.2 0 4.2 0"/><path class="dt2" d="M14 32.4q2.2-2.6 4.2 0t4.2 0 4.2 0 4.2 0"/><path class="x1" d="M12 38.4q-2-3 0-5.6 1 2 .6 3.4 1.2-1.6 2.4-1.8-.2 2.6-1.2 4z"/>',
 '<circle class="x2" cx="14" cy="32.4" r="1.5"/><circle class="x2" cx="18.1" cy="33.5" r="1.5"/><circle class="x2" cx="22.5" cy="33.9" r="1.5"/><circle class="x2" cx="26.9" cy="33.5" r="1.5"/><circle class="x2" cx="31" cy="32.4" r="1.5"/><path class="x1" d="M22.5 18.4l1.5 3.2 3.5.4-2.6 2.3.8 3.4-3.2-1.9-3.2 1.9.8-3.4-2.6-2.3 3.5-.4z"/>',
 '<path class="tz" d="M22.5 3.4v10M18.4 4.4v3.6a4.1 4.1 0 0 0 8.2 0V4.4"/><path class="x1" d="M13.6 28.6q4.5-2.4 8.9 0t8.9 0l.4 2.4q-4.8 2.4-9.3 0t-9.3 0z"/>'],
e:['',
 '<circle class="gl" cx="22.5" cy="13" r="7.6"/>'+CHSTAR(22.5,30.6,1.2),
 '<path class="dt2" d="M24.4 8l2.8-3.8"/><circle class="x1" cx="27.6" cy="3.8" r="1.9"/>'+CHSTAR(27.4,29.4,1.2),
 '<ellipse class="rg" cx="22.5" cy="22.4" rx="12.6" ry="3.4" transform="rotate(-16 22.5 22.4)"/>',
 '<circle class="gl" cx="22.5" cy="24.6" r="3.2"/><path class="x1" d="M11 33.4l-4.4 6.8 4.4-.8zM34 33.4l4.4 6.8-4.4-.8z"/>',
 '<ellipse class="rg" cx="22.5" cy="21.4" rx="16.4" ry="4.4" transform="rotate(-7 22.5 21.4)"/>'+CHSTAR(22.5,29.8,1.1),
 '<ellipse class="rg" cx="22.5" cy="9.2" rx="8.8" ry="2.4"/>'+CHSTAR(22.5,32,1.3)]};
const CHPN=['','pion','cavalier','fou','tour','dame','roi'];
const chPc=(p,k)=>{const a=p<0?-p:p;k=k||CH.sk;return`<svg class="chp ${p>0?'w':'b'}${k!=='f'&&CHX[k]?' sk-'+k:''}" viewBox="0 0 45 45" aria-hidden="true">${CHSV[a]}${k!=='f'&&CHX[k]?CHX[k][a]:''}</svg>`};
const CHTH={f:['#7fb88a','#2b5f45'],h:['#9cc7e8','#2a4f7a'],o:['#3fc0cc','#0e4f78'],e:['#9a86e8','#2a1f66']};
function chTheme(){const t=CHTH[CH.sk]||CHTH.f,b=document.body;b.style.setProperty('--a',t[0]);b.style.setProperty('--b',t[1]);b.dataset.chsk=CH.sk}
function chSkin(){const s=st.get('ch:sk',null)||{},own=Object.assign({f:1},s.own&&typeof s.own==='object'?s.own:{});return{own,cur:CHSK.some(k=>k.id===s.cur&&own[k.id])?s.cur:'f'}}
CH.sk=chSkin().cur;
/* état d’une partie */
function chD(g){const k=g.id+':'+g.mv.join(' ');if(!CH.rc||CH.rc.k!==k){const R=chReplay(g.mv);R.k=k;R.st=chStatus(R.S,R.keys);CH.rc=R}return CH.rc}
const chRes=g=>g.r||chD(g).st;
const chTurn=g=>chD(g).S.t;
const chRun=g=>!!(g.tc&&g.mv.length>=2&&!chRes(g));
function chRem(g,c){let v=g.rm[c>0?0:1];if(chRun(g)&&chTurn(g)===c&&CH.scr==='game')v-=Date.now()-CH.t0;return v}
const chMy=g=>{if(g.k==='loc')return true;return chTurn(g)===g.me};
const chOpp=g=>g.k==='ai'?CHLV[g.lv-1]:null;
function chWho(g,c){
 if(g.k==='loc')return c>0?'Blancs':'Noirs';
 if(c===g.me)return'Toi';
 return g.k==='ai'?chOpp(g).n:chNm(g.f)}
function chAvOf(g,c){
 if(g.k==='loc')return`<span class="chav">${chPc(c>0?6:-6)}</span>`;
 if(c===g.me)return SO.uid&&st.get('soc:me',null)?socAv(SO.uid):'<span class="chav">🌲</span>';
 return g.k==='ai'?`<span class="chav">${chOpp(g).e}</span>`:socAv(g.f)}
function chMsg(g,r){
 const w=r.w,who=c=>chWho(g,c),win=who(w),lose=who(-w);
 const t={mat:'Échec et mat.',pat:'Pat : la partie est nulle.',ins:'Il ne reste pas assez de pièces : nulle.','50':'Règle des 50 coups : nulle.',rep:'Trois fois la même position : nulle.',acc:'Nulle d’un commun accord.',res:(lose==='Toi'?'Tu as abandonné':lose+' a abandonné')+'.',tmp:lose==='Toi'?'Ton temps est écoulé.':'Temps écoulé pour '+lose+'.'}[r.y]||'';
 const o=w===0?'':g.k==='loc'?win+' gagnent.':win==='Toi'?'Bravo, tu as gagné !':win+' gagne.';
 return(t+' '+o).trim()}
/* flocons : une seule fois par partie, et seulement si elle a duré */
function chPay(g){
 const r=chRes(g);if(!r||g.mv.length<10||g.paid)return;
 let n=0;
 if(g.k==='loc')n=5;
 else if(g.k==='ai'){const i=Math.max(0,Math.min(2,(g.lv|0)-1));n=r.w===0?[3,6,9][i]:r.w===g.me?[5,8,12][i]:[2,4,6][i]}
 else{const pd=Object.assign({},st.get('ch:paid',{})),k=chGid(g.f)+':'+g.id;if(pd[k])return;pd[k]=1;
  const ks=Object.keys(pd);if(ks.length>60)ks.slice(0,ks.length-60).forEach(x=>delete pd[x]);st.set('ch:paid',pd);
  n=r.w===0?7:r.w===g.me?10:5}
 g.paid=1;if(n>0){scrGain(n);CH.pay='+'+n+' ❄'}}
/* sauvegarde locale (ordinateur et même appareil) */
function chSave(){const g=CH.g;if(!g||g.k==='net')return;
 st.set('ch:g',chRes(g)?null:{k:g.k,id:g.id,mv:g.mv,tc:g.tc,rm:g.rm.map(Math.round),me:g.me,lv:g.lv||0,paid:g.paid||0})}
function chLoad(){const x=st.get('ch:g',null);if(!x||!['ai','loc'].includes(x.k)||!Array.isArray(x.mv)||typeof x.id!=='string')return null;
 const mv=x.mv.filter(s=>/^[a-h][1-8][a-h][1-8][nbrq]?$/.test(s)),tc=CHTC.includes(+x.tc)?+x.tc:0;
 return{k:x.k,id:x.id,mv,tc,rm:Array.isArray(x.rm)&&x.rm.length===2?x.rm.map(v=>Math.max(0,+v||0)):[tc*6e4,tc*6e4],me:x.me<0?-1:1,lv:Math.max(1,Math.min(3,+x.lv||2)),r:null,dr:0,paid:x.paid?1:0}}
/* partie à distance : lecture sûre d’un document */
function chClean(x){
 if(!x||typeof x!=='object'||x.k!=='chess'||!Array.isArray(x.p)||x.p.length!==2||!x.p.every(s=>typeof s==='string'&&SOK.test(s)))return null;
 if(typeof x.id!=='string'||!/^[a-z0-9]{1,16}$/.test(x.id)||typeof x.mv!=='string'||x.mv.length>8000||!/^([a-h][1-8][a-h][1-8][nbrq]?)?( [a-h][1-8][a-h][1-8][nbrq]?)*$/.test(x.mv))return null;
 const tc=CHTC.includes(+x.tc)?+x.tc:0,rm=Array.isArray(x.rm)&&x.rm.length===2?x.rm.map(v=>Math.max(0,Math.min(36e5,Math.floor(+v)||0))):[tc*6e4,tc*6e4];
 const r=Array.isArray(x.r)&&x.r.length===2&&[-1,0,1].includes(+x.r[0])&&/^[a-z0-9]{2,5}$/.test(String(x.r[1]))?{w:+x.r[0],y:String(x.r[1])}:null;
 return{k:'net',id:x.id,p:x.p.slice(),mv:x.mv?x.mv.split(' '):[],tc,rm,r,dr:[-1,1].includes(+x.dr)?+x.dr:0}}
const chDoc=g=>({k:'chess',v:1,id:g.id,p:g.p,mv:g.mv.join(' '),n:g.mv.length,tc:g.tc,rm:g.rm.map(v=>Math.round(Math.max(0,v))),r:g.r?[g.r.w,g.r.y]:0,dr:g.dr||0,at:Date.now()});
function chNet(f,x){x.f=f;x.me=x.p[0]===SO.uid?1:-1;return x}
/* abonnement à la partie avec un ami */
function chWatch(f){
 if(CH.subs[f]||!SO.uid||Object.keys(CH.subs).length>=24)return;
 const sub=CH.subs[f]={ref:null,un:null,t:0};
 sub.p=(async()=>{
  try{
   const db=await scrDb();if(!db)throw 0;
   const ref=sub.ref=db.collection('sc').doc(chGid(f));
   sub.t=setTimeout(()=>{if(!CH.got[f]){CH.slow=1;chRefresh()}},10000);
   sub.un=ref.onSnapshot(s=>{
    const m=s.metadata||{};if(m.fromCache&&!s.exists)return;
    clearTimeout(sub.t);
    let S=null;if(s.exists){try{S=chClean(s.data())}catch(e){}}
    if(S&&(S.p.indexOf(SO.uid)<0||chGid(f)!==S.p.slice().sort().join('_')+'_c'))S=null;
    if(S)chNet(f,S);
    CH.G[f]=S;CH.got[f]=true;CH.err[f]=0;
    if(S&&CH.scr==='game'&&CH.fid===f)chSyncGame(S);
    else if(S)chPay(S);
    chRefresh()
   },e=>{clearTimeout(sub.t);delete CH.subs[f];CH.err[f]=1;CH.ec[f]=scrWhy(e);chRefresh()});
  }catch(e){delete CH.subs[f];CH.err[f]=1;CH.ec[f]=scrWhy(e);chRefresh()}
 })();
}
function chSyncAll(){
 if(!SO.uid||!SO.got)return;const M=st.get('soc:me',null);if(!M||!M.fr)return;
 Object.keys(M.fr).filter(i=>M.fr[i]>0).slice(0,24).forEach(chWatch)}
const chOnProfiles=()=>{if(CH.scr==='hub'&&CH.cfg.op==='net')chSyncAll();chRefresh()};
/* un état arrivé du serveur pendant que la partie est ouverte */
function chSyncGame(S){
 const old=CH.g,same=old&&old.id===S.id&&old.mv.length===S.mv.length;
 if(CH.busy&&same)return;
 CH.g=S;
 if(!same){CH.t0=Date.now();CH.sel=-1;CH.lg=[];CH.pr=null;CH.m='';CH.cf='';if(old&&old.id===S.id&&S.mv.length>old.mv.length){sfx(300,.1);vib(10)}}
 chPay(S);chDraw();chAfter()}
const chRefresh=()=>{if($('#chh'))chHubDraw()};
/* ---------- accueil des échecs ---------- */
function chHub(){
 chInstall();cur='chess';nv('games');theme('chess');chTheme();CH.scr='hub';CH.fid='';CH.g=null;CH.nw=false;
 app.innerHTML=`<div class="top stk">${bk('home')}<div class="chip">❄ ${FLX()}</div></div><section class="glass story pt-chess"><i>♞</i><h2>La clairière</h2><p>Une partie d’échecs au calme, sous les sapins. Joue contre le Lapereau, le Renard ou le Hibou, à deux sur le même appareil, ou à distance contre un ami. Contre un ami ou sur le même appareil, tu choisis la durée au début : sans limite, ou de 1 à 30 minutes par joueur. Chaque partie un peu longue rapporte des ❄, que tu peux dépenser plus bas en apparences pour tes pièces.</p></section><div id="chh"></div>`;
 if(CH.cfg.op==='net')chNetInit();
 chHubDraw();window.scrollTo(0,0)}
function chNetInit(){if(!SO.col&&SO.st!=='conn')socInit();chSyncAll()}
const chChip=(k,v,t,on,x)=>`<button class="chc${on?' on':''}" data-a="chcfg" data-v="${k}:${v}" aria-pressed="${on?'true':'false'}">${x||''}${t}</button>`;
function chStat(f){
 const S=CH.G[f];
 if(CH.err[f])return{k:'err',t:'Partie injoignable pour l’instant'};
 if(!S)return CH.got[f]||!CH.subs[f]?{k:'new',t:'Pas encore de partie'}:{k:'load',t:'…'};
 const r=chRes(S);
 if(r)return{k:'end',t:r.w===0?'Partie nulle':r.w===S.me?'Gagné':'Perdu'};
 const tc=S.tc?' · '+S.tc+' min':'';
 return chTurn(S)===S.me?{k:'me',t:'À toi de jouer'+tc}:{k:'them',t:'Au tour de '+chNm(f)+tc}}
function chHubDraw(){
 const root=$('#chh');if(!root)return;const c=CH.cfg,sx=window.scrollX,sy=window.scrollY;
 const sv=chLoad(),M=st.get('soc:me',null);
 let h='';
 if(sv){const d=chReplay(sv.mv);h+=`<section class="glass play chres"><h2>Partie en cours</h2><p class="note" style="margin:0 0 12px">${sv.k==='ai'?'Contre le '+CHLV[sv.lv-1].n:'À deux, même appareil'} · ${Math.ceil(d.ms.length/2)} coup${d.ms.length>2?'s':''}${sv.k==='ai'?'':' · '+chTcT(sv.tc)}</p><div class="chrow"><button class="btn" data-a="chRes">Reprendre</button><button class="btn alt" data-a="chDrop">Laisser tomber</button></div></section>`}
 h+=`<section class="glass play chnew"><h2>Nouvelle partie</h2>
 <div class="chgr"><div class="chl">Adversaire</div><div class="chq">${chChip('op','ai','L’ordinateur',c.op==='ai')}${chChip('op','net','Un ami',c.op==='net')}${chChip('op','loc','Même appareil',c.op==='loc')}</div></div>
 ${c.op==='ai'?`<div class="chgr"><div class="chl">Niveau</div><div class="chq">${CHLV.map((l,i)=>chChip('lv',i+1,l.n,c.lv===i+1,'<span class="chem">'+l.e+'</span>')).join('')}</div><p class="note chdn">${CHLV[c.lv-1].d}.</p></div>`:''}
 ${c.op!=='loc'?`<div class="chgr"><div class="chl">Ta couleur</div><div class="chq">${chChip('col',1,'Blancs',c.col===1)}${chChip('col',-1,'Noirs',c.col===-1)}${chChip('col',0,'Au hasard',c.col===0)}</div></div>`:''}
 ${c.op==='ai'?'':`<div class="chgr"><div class="chl">Durée de la partie <span class="chs2">par joueur</span></div><div class="chq">${CHTC.map(n=>chChip('tc',n,chTcT(n),c.tc===n)).join('')}</div></div>`}
 ${c.op==='net'?'':`<button class="btn chgo" data-a="chStart">Commencer la partie</button>`}</section>`;
 if(c.op==='net')h+=chFriends(M);
 h+=chSkinUI();
 root.innerHTML=h;window.scrollTo(sx,sy)}
function chSkinUI(){
 const S=chSkin();
 return`<section class="glass play chsk"><h2>Apparence des pièces</h2><p class="note" style="margin:0 0 10px">Les ❄ gagnés en jouant servent à habiller tes pièces.</p>${CHSK.map(k=>{const o=!!S.own[k.id],on=S.cur===k.id;
  return`<div class="chski${on?' on':''}"><div class="chsp">${chPc(1,k.id)}${chPc(5,k.id)}${chPc(-2,k.id)}${chPc(-6,k.id)}</div><div class="chst"><b>${k.n}</b><small>${k.d}</small></div><button class="sb${o||UNL()?'':' buy'}" data-a="chsk" data-v="${k.id}"${on?' disabled':''}>${on?'Choisi':o?'Choisir':UNL()?'Choisir':k.p+' ❄'}</button></div>`}).join('')}</section>`}
function chFriends(M){
 const crd=(t,b,btn)=>`<section class="glass play soc-i"><h2>${t}</h2><p class="note" style="margin:0">${b}</p>${btn?`<button class="btn" style="margin-top:14px" data-a="chSoc">${btn}</button>`:''}</section>`;
 if(SO.st==='na')return crd('Une connexion est nécessaire','Jouer contre un ami demande d’être connecté(e) et d’avoir ajouté cet ami : tout se passe dans l’onglet Social.','Ouvrir Social');
 if(!SO.uid||!SO.got||!M||!M.code){const w=SO.st==='slow'||SO.st==='err';return crd(w?'Pas de réponse pour l’instant':'Un instant…',w?'Tes amis se chargeront dès que possible.':'Tes amis arrivent.')}
 const ids=Object.keys(M.fr).filter(i=>M.fr[i]>0&&SO.P[i]);
 if(!ids.length)return crd('Il te faut un ami','Ajoute un ami avec son code ami, dans l’onglet Social : vous pourrez alors jouer ensemble.','Ouvrir Social');
 const rk={me:0,them:1,new:2,load:2,err:3,end:2};
 const L=ids.sort((a,b)=>rk[chStat(a).k]-rk[chStat(b).k]||chNm(a).localeCompare(chNm(b),'fr'));
 const row=id=>{const s=chStat(id),act2=s.k==='new'||s.k==='end'?'chInv':'chOpen',lab=s.k==='me'?'Jouer':s.k==='them'?'Voir':s.k==='err'?'Ouvrir':'Inviter';
  return`<div class="fr-i"><button class="fr-o" data-a="${s.k==='end'?'chOpen':act2}" data-v="${esc(id)}">${socAv(id)}<span class="fr-t"><b>${esc(chNm(id))}</b><small${s.k==='me'?' class="scgo"':''}>${esc(s.t)}</small></span></button><div class="fr-b"><button class="sb${s.k==='me'?' buy':''}" data-a="${act2}" data-v="${esc(id)}">${lab}</button></div></div>`};
 return`<section class="glass play soc-i"><h2 class="s" style="margin-top:0">Inviter un ami</h2><p class="note" style="margin:0 0 8px">Ta couleur et la durée ci-dessus seront utilisées pour la nouvelle partie.</p>${L.map(row).join('')}</section>`}
/* ---------- la partie ---------- */
function chBegin(g,f){
 CH.g=g;CH.fid=f||'';CH.scr='game';CH.fl=null;CH.sel=-1;CH.lg=[];CH.pr=null;CH.m='';CH.cf='';CH.pay='';CH.busy=false;CH.think=false;CH.t0=Date.now();CH.rc=null;CH.flg=false;
 const nm=g.k==='ai'?'Contre le '+chOpp(g).n:g.k==='net'?chNm(f):'À deux';
 theme('chess');chTheme();$('#nav').hidden=true;
 app.innerHTML=`<div class="top stk"><button class="back" data-a="chBk">‹ Échecs</button><span class="tl">${esc(nm)}</span><div class="tr"><div class="chip">❄ ${FLX()}</div></div></div><section class="glass play pg-chess" id="chg" aria-label="Partie d’échecs"></section>`;
 chDraw();chAfter();window.scrollTo(0,0)}
function chOpenNet(f){
 chInstall();if(!SO.uid)return chHub();
 chWatch(f);const S=CH.G[f];
 CH.scr='game';CH.fid=f;
 if(S)return chBegin(S,f);
 /* pas encore de document : on attend l’abonnement */
 CH.g=null;theme('chess');chTheme();$('#nav').hidden=true;
 app.innerHTML=`<div class="top stk"><button class="back" data-a="chBk">‹ Échecs</button><span class="tl">${esc(chNm(f))}</span><div class="tr"><div class="chip">❄ ${FLX()}</div></div></div><section class="glass play pg-chess" id="chg"><p class="note">Un instant…</p></section>`;
 const t0=Date.now(),w=setInterval(()=>{if(CH.scr!=='game'||CH.fid!==f||$('#chg')===null){clearInterval(w);return}
  if(CH.G[f]){clearInterval(w);chBegin(CH.G[f],f)}else if(CH.err[f]||Date.now()-t0>9000){clearInterval(w);$('#chg').innerHTML=`<h2 style="margin:0 0 6px">Partie injoignable</h2><p class="note" style="margin:0 0 14px">${esc(CH.ec[f]||'Pas de réponse du serveur.')} Ton ami doit aussi t’avoir ajouté dans Social.</p><button class="btn" data-a="chBk">Retour</button>`}},300)}
function chNewGame(o){
 const c=CH.cfg,col=c.col||(Math.random()<.5?1:-1),id=Math.random().toString(36).slice(2,10),tc=o&&o.k==='ai'?0:c.tc,rm=[tc*6e4,tc*6e4];
 return Object.assign({id,mv:[],tc,rm,r:null,dr:0,paid:0,me:col,lv:c.lv},o)}
function chAfter(){
 const g=CH.g;if(!g||CH.scr!=='game')return;
 if(g.k==='ai'&&!chRes(g)&&chTurn(g)!==g.me&&!CH.think){
  CH.think=true;chDraw();const n=g.mv.length,t=Date.now();
  setTimeout(()=>{
   if(CH.g!==g||g.mv.length!==n){CH.think=false;return}
   const m=chSearch(chD(g).S,g.lv),wait=Math.max(0,700-(Date.now()-t));
   setTimeout(()=>{CH.think=false;if(CH.g===g&&g.mv.length===n&&m&&!chRes(g))chPlay(m);else chDraw()},wait)},60)}
 chTickOn()}
function chTickOn(){if(CH.tick)return;CH.tick=setInterval(()=>{if(CH.scr!=='game'||!$('#chg')){clearInterval(CH.tick);CH.tick=0;return}chClk()},250)}
function chClk(){
 const g=CH.g;if(!g||!g.tc)return;
 for(const c of[1,-1]){const e=$('#chg .chk[data-c="'+c+'"]');if(e){const v=chRem(g,c);e.textContent=chFmt(v);e.classList.toggle('lo',v<30000);e.classList.toggle('on',chRun(g)&&chTurn(g)===c)}}
 if(chRun(g)&&!CH.flg&&!CH.busy&&Date.now()>CH.fgT){const c=chTurn(g),v=chRem(g,c);
  if(v<=0&&(g.k!=='net'||c===g.me||v<=-3000))chFlag(c)}}
async function chFlag(c){
 const g=CH.g;if(!g)return;CH.flg=true;
 const prev={rm:g.rm.slice(),r:g.r,dr:g.dr};
 g.rm[c>0?0:1]=0;g.r={w:-c,y:'tmp'};g.dr=0;CH.rc=null;
 const ok=await chCommit(prev);CH.flg=false;if(!ok)CH.fgT=Date.now()+5000}
/* un coup joué : mise à jour des pendules, enregistrement, envoi */
async function chPlay(m){
 const g=CH.g;if(!g||CH.busy||chRes(g))return false;
 const c=chTurn(g),prev={mv:g.mv.slice(),rm:g.rm.slice(),dr:g.dr,r:g.r};
 if(g.tc&&g.mv.length>=2)g.rm[c>0?0:1]=Math.max(0,chRem(g,c));
 const cap=chD(g).S.b[m.t];
 g.mv.push(chUci(m));g.dr=0;CH.t0=Date.now();CH.sel=-1;CH.lg=[];CH.pr=null;CH.m='';CH.cf='';CH.rc=null;
 const ok=await chCommit(prev);
 if(ok){const r=chRes(g);sfx(r?523:cap?240:330,r?.4:.1);vib(r?25:cap?14:8)}
 return ok}
async function chCommit(prev){
 const g=CH.g;
 if(g.k==='net'){if(!await chSend(g)){if(prev){Object.assign(g,prev);CH.rc=null}chDraw();return false}}
 else chSave();
 chPay(g);chDraw();chAfter();return true}
async function chSend(g){
 const sub=CH.subs[g.f];
 if(!sub||!sub.ref){CH.m='La partie n’est pas encore prête : réessaie dans un instant.';return false}
 if(CH.busy)return false;
 CH.busy=true;chDraw();
 try{await sub.ref.set(chDoc(g))}catch(e){CH.busy=false;CH.m='Ton coup n’est pas parti. '+scrWhy(e);return false}
 CH.busy=false;CH.G[g.f]=g;CH.got[g.f]=true;return true}
const chCf=k=>{if(CH.cf===k){clearTimeout(CH.cft);CH.cf='';return true}CH.cf=k;clearTimeout(CH.cft);CH.cft=setTimeout(()=>{CH.cf='';chDraw()},3500);chDraw();return false};
/* toucher une case, ou la déposer */
function chTry(f,t){
 const g=CH.g;if(!g||CH.busy||CH.think||chRes(g)||!chMy(g)||CH.pr)return false;
 const S=chD(g).S,ms=chLegal(S).filter(m=>m.f===f&&m.t===t);
 if(!ms.length)return false;
 if(ms.length>1){CH.pr={f,t};chDraw();return true}
 chPlay(ms[0]);return true}
function chSel(sq){
 const g=CH.g;if(!g||CH.busy||CH.think||chRes(g)||!chMy(g))return;
 const S=chD(g).S,p=S.b[sq];CH.pr=null;CH.m='';
 if(CH.sel>=0&&CH.sel!==sq&&chTry(CH.sel,sq))return;
 if(p&&(p>0)===(S.t>0)&&sq!==CH.sel){CH.sel=sq;CH.lg=chLegal(S).filter(m=>m.f===sq)}else{CH.sel=-1;CH.lg=[]}
 chDraw()}
function chDraw(){
 const root=$('#chg');if(!root||CH.scr!=='game')return;
 const g=CH.g;if(!g)return;
 const d=chD(g),S=d.S,res=chRes(g),turn=S.t,mine=chMy(g);
 const flip=CH.fl!==null?CH.fl:g.k==='loc'?false:g.me<0,bot=flip?-1:1,top=-bot;
 const last=d.ms.length?d.ms[d.ms.length-1]:null,ks=chChk(S)&&!res?chKing(S.b,turn):-1;
 /* pièces prises */
 const ct={};for(let i=0;i<64;i++)if(S.b[i])ct[S.b[i]]=(ct[S.b[i]]||0)+1;
 const ST={1:8,2:2,3:2,4:2,5:1};let mat=0;
 const caps=c=>{let s='';for(const a of[5,4,3,2,1]){const n=Math.max(0,ST[a]-(ct[-c*a]||0));for(let k=0;k<n;k++)s+=chPc(-c*a)}return s};
 for(const a of[1,2,3,4,5])mat+=CHV[a]/100*((ct[a]||0)-(ct[-a]||0));
 const strip=c=>{const df=Math.round(mat*c);return`<div class="chpl${!res&&turn===c?' on':''}">${chAvOf(g,c)}<span class="chn"><b>${esc(chWho(g,c))}</b><span class="chcap" aria-hidden="true">${caps(c)}${df>0?'<em>+'+df+'</em>':''}</span></span>${g.tc?`<span class="chk${chRun(g)&&turn===c?' on':''}${chRem(g,c)<30000?' lo':''}" data-c="${c}">${chFmt(chRem(g,c))}</span>`:''}</div>`};
 let sq='';
 for(let i=0;i<64;i++){const s=flip?63-i:i,p=S.b[s],r=s>>3,c=s&7,k=['chs',(r+c)&1?'d':'l'];
  if(CH.sel===s)k.push('sel');if(last&&(s===last.f||s===last.t))k.push('lm');if(s===ks)k.push('ck');
  if(CH.lg.some(m=>m.t===s))k.push(p||(CH.sel>=0&&Math.abs(S.b[CH.sel])===1&&s===S.ep)?'cp':'mv');
  const lb=(i%8===0?`<i class="cr">${8-r}</i>`:'')+(i>=56?`<i class="cf">${CHF[c]}</i>`:'');
  sq+=`<div class="${k.join(' ')}" role="gridcell" data-a="chq" data-v="${s}" aria-label="${chSq(s)}${p?', '+CHPN[p<0?-p:p]+(p>0?' blanc':' noir'):''}">${lb}${p?chPc(p):''}</div>`}
 const pr=CH.pr?`<div class="chpr" role="dialog" aria-label="Choisir la pièce"><b>Promotion</b><div>${[5,4,3,2].map(a=>`<button data-a="chpr" data-v="${a}" aria-label="${CHPN[a]}">${chPc(turn>0?a:-a)}</button>`).join('')}</div></div>`:'';
 /* texte d’état */
 let msg;
 if(res)msg=chMsg(g,res);
 else if(CH.m)msg=CH.m;
 else if(CH.think)msg='Le '+chOpp(g).n+' réfléchit…';
 else{const ck=chChk(S)?'Échec au roi. ':'';
  msg=g.k==='loc'?ck+(turn>0?'Aux blancs de jouer.':'Aux noirs de jouer.'):mine?ck+'À toi de jouer.':ck+'Au tour de '+chWho(g,turn)+'.'}
 /* notation */
 let mv='';for(let i=0;i<d.sans.length;i++){mv+=(i%2?'':`<span class="chnb">${i/2+1}.</span>`)+`<span class="chmv${i===d.sans.length-1?' last':''}">${esc(d.sans[i])}</span>`}
 /* actions */
 let ac=`<button class="sb" data-a="chfl">⇅ Retourner</button>`;
 if(!res){
  if(g.k!=='net'&&!g.tc&&g.mv.length)ac+=`<button class="sb" data-a="chUndo">↶ Reprendre le coup</button>`;
  if(g.k==='net'&&g.mv.length>=2&&!g.dr)ac+=`<button class="sb" data-a="chDraw">Proposer nulle</button>`;
  if(g.k==='net'&&g.dr===g.me)ac+=`<button class="sb" disabled>Nulle proposée…</button>`;
  if(g.k==='loc'&&g.mv.length>=2)ac+=`<button class="sb${CH.cf==='draw'?' buy':''}" data-a="chDraw">${CH.cf==='draw'?'Confirmer la nulle':'Nulle'}</button>`;
  ac+=`<button class="sb${CH.cf==='res'?' buy':''}" data-a="chQuit">${CH.cf==='res'?'Confirmer l’abandon':'Abandonner'}</button>`}
 const of=!res&&g.k==='net'&&g.dr===-g.me?`<div class="chof"><b>${esc(chNm(g.f))} propose la nulle.</b><div class="chrow"><button class="btn" data-a="chAcc">Accepter</button><button class="btn alt" data-a="chRef">Refuser</button></div></div>`:'';
 const en=res?`<div class="chend"><b>${esc(msg)}</b>${CH.pay?`<span class="chpay">${CH.pay}</span>`:''}<div class="chrow"><button class="btn" data-a="chRev"${CH.busy?' disabled':''}>Revanche</button><button class="btn alt" data-a="chBk">Menu</button></div></div>`:'';
 const bw=$('#chmv');const sx=bw?bw.scrollLeft:0;
 root.innerHTML=`${en}${strip(top)}<div class="chbw sk-${CH.sk}${CH.think?' th':''}"><div class="chb${flip?' fl':''}" role="grid" aria-label="Échiquier">${sq}</div>${pr}</div>${strip(bot)}${res?'':`<p class="m chm" id="chm" role="status" aria-live="polite">${esc(msg)}</p>`}${of}<div class="chmvs" id="chmv" aria-label="Coups joués">${mv||'<span class="note">Les coups apparaîtront ici.</span>'}</div><div class="cha">${ac}</div>`;
 const m2=$('#chmv');if(m2){m2.scrollLeft=bw&&sx<m2.scrollWidth-m2.clientWidth-40?sx:m2.scrollWidth}}
const chMine=()=>CH.scr==='game'&&CH.g?CH.g:null;
const CHA={
 chSoc:()=>socScreen(),
 chsk:v=>{const k=CHSK.find(x=>x.id===v);if(!k)return;const S=chSkin();
  if(!S.own[k.id]){if(!spend(k.p))return;S.own[k.id]=1}
  S.cur=k.id;st.set('ch:sk',S);CH.sk=k.id;chTheme();const c=$('.chip');if(c)c.textContent='❄ '+FLX();chHubDraw()},
 chcfg:v=>{const[k,x]=v.split(':'),n=+x;
  if(k==='op'&&['ai','net','loc'].includes(x))CH.cfg.op=x;
  else if(k==='lv'&&n>=1&&n<=3)CH.cfg.lv=n;
  else if(k==='col'&&[1,-1,0].includes(n))CH.cfg.col=n;
  else if(k==='tc'&&CHTC.includes(n))CH.cfg.tc=n;
  st.set('ch:cfg',CH.cfg);if(CH.cfg.op==='net')chNetInit();chHubDraw()},
 chStart:()=>{const c=CH.cfg;if(c.op==='net')return;
  const g=c.op==='ai'?chNewGame({k:'ai'}):chNewGame({k:'loc',me:1});
  if(g.k==='ai')g.lv=c.lv;
  st.set('ch:g',null);chBegin(g);chSave()},
 chRes:()=>{const g=chLoad();if(!g)return;chBegin(g)},
 chDrop:()=>{st.set('ch:g',null);chHubDraw()},
 chOpen:f=>chOpenNet(f),
 chInv:async f=>{
  if(!SO.uid||CH.nw)return;chWatch(f);const sub=CH.subs[f];if(!sub)return;CH.nw=true;
  try{await sub.p}catch(e){}
  const old=CH.G[f];if(old&&!chRes(old)){CH.nw=false;return chOpenNet(f)}
  const c=CH.cfg,col=c.col||(Math.random()<.5?1:-1),g=chNewGame({k:'net',f,me:col,p:col>0?[SO.uid,f]:[f,SO.uid]});
  CH.scr='game';CH.fid=f;CH.g=g;
  if(!sub.ref){CH.nw=false;CH.m='La partie n’est pas encore prête : réessaie dans un instant.';return chOpenNet(f)}
  CH.busy=false;
  try{await sub.ref.set(chDoc(g))}catch(e){CH.nw=false;CH.scr='hub';CH.g=null;const r=$('#chh');if(r)r.insertAdjacentHTML('afterbegin',`<section class="glass play soc-i"><p class="note" style="margin:0">Invitation non envoyée. ${esc(scrWhy(e))}</p></section>`);return}
  CH.nw=false;CH.G[f]=g;CH.got[f]=true;chBegin(g,f)},
 chBk:()=>{CH.scr='hub';chHub()},
 chq:v=>chSel(+v),
 chpr:v=>{const g=CH.g,p=CH.pr;if(!g||!p)return;const m=chLegal(chD(g).S).find(x=>x.f===p.f&&x.t===p.t&&x.p===+v);CH.pr=null;if(m)chPlay(m);else chDraw()},
 chfl:()=>{const g=CH.g;if(!g)return;const cur=CH.fl!==null?CH.fl:g.k==='loc'?false:g.me<0;CH.fl=!cur;chDraw()},
 chUndo:()=>{const g=CH.g;if(!g||g.k==='net'||g.tc||CH.think||!g.mv.length)return;
  const n=g.k==='ai'?(chTurn(g)===g.me?2:1):1;g.mv.splice(Math.max(0,g.mv.length-n));g.r=null;CH.rc=null;CH.sel=-1;CH.lg=[];CH.pr=null;CH.m='';chSave();chDraw();chAfter()},
 chDraw:async()=>{const g=CH.g;if(!g||chRes(g)||CH.busy)return;
  if(g.k==='loc'){if(!chCf('draw'))return;g.r={w:0,y:'acc'};CH.rc=null;CH.cf='';chSave();chDraw();return}
  if(g.k==='net'&&!g.dr){const prev={dr:g.dr};g.dr=g.me;CH.m='Nulle proposée à '+chNm(g.f)+'.';if(!await chSend(g)){Object.assign(g,prev)}chDraw()}},
 chAcc:async()=>{const g=CH.g;if(!g||g.k!=='net'||g.dr!==-g.me||chRes(g)||CH.busy)return;const prev={r:g.r,dr:g.dr};g.r={w:0,y:'acc'};g.dr=0;CH.rc=null;await chCommit(prev)},
 chRef:async()=>{const g=CH.g;if(!g||g.k!=='net'||g.dr!==-g.me||CH.busy)return;const prev={dr:g.dr};g.dr=0;if(!await chSend(g))Object.assign(g,prev);chDraw()},
 chQuit:async()=>{const g=CH.g;if(!g||chRes(g)||CH.busy)return;if(!chCf('res'))return;
  const c=g.k==='loc'?chTurn(g):g.me,prev={r:g.r,dr:g.dr};g.r={w:-c,y:'res'};g.dr=0;CH.rc=null;CH.cf='';await chCommit(prev)},
 chRev:async()=>{const g=CH.g;if(!g||!chRes(g)||CH.busy)return;
  CH.pay='';
  if(g.k==='net'){const f=g.f,sub=CH.subs[f];if(!sub||!sub.ref)return;
   const n=chNewGame({k:'net',f,me:-g.me,p:[g.p[1],g.p[0]],tc:g.tc,rm:[g.tc*6e4,g.tc*6e4]});
   CH.busy=true;chDraw();
   try{await sub.ref.set(chDoc(n))}catch(e){CH.busy=false;CH.m='La revanche n’est pas partie. '+scrWhy(e);chDraw();return}
   CH.busy=false;CH.G[f]=n;chBegin(n,f);return}
  const n=chNewGame({k:g.k,me:g.k==='loc'?1:-g.me,lv:g.lv,tc:g.tc,rm:[g.tc*6e4,g.tc*6e4]});
  st.set('ch:g',null);chBegin(n);chSave()}
};
const chInstall=()=>{chDragInit();Object.assign(act,CHA)};
/* glisser une pièce */
let CHD=null,CHDt=0;
const chDragInit=()=>{if(window.__chd)return;window.__chd=1;
 const sqAt=(x,y)=>{const e=document.elementFromPoint(x,y);return e&&e.closest?e.closest('#chg .chs[data-v]'):null};
 const clr=()=>{document.querySelectorAll('.chs.dh').forEach(n=>n.classList.remove('dh'))};
 const end=()=>{if(CHD){if(CHD.g)CHD.g.remove();if(CHD.t)CHD.t.classList.remove('dg')}clr();CHD=null};
 document.addEventListener('pointerdown',e=>{
  if(CHD)end();
  const t=e.target.closest&&e.target.closest('#chg .chs[data-v]');
  if(!t||(e.pointerType==='mouse'&&e.button!==0))return;
  const g=chMine();if(!g||CH.busy||CH.think||chRes(g)||!chMy(g)||CH.pr)return;
  const sq=+t.dataset.v,S=chD(g).S,p=S.b[sq];
  if(!p||(p>0)!==(S.t>0))return;
  CHD={t,id:e.pointerId,x0:e.clientX,y0:e.clientY,on:false,sq}},true);
 document.addEventListener('pointermove',e=>{
  const d=CHD;if(!d||e.pointerId!==d.id)return;
  if(!d.on){if(Math.hypot(e.clientX-d.x0,e.clientY-d.y0)<8)return;
   const g=chMine();if(!g)return end();
   d.on=true;const S=chD(g).S;CH.sel=d.sq;CH.lg=chLegal(S).filter(m=>m.f===d.sq);chDraw();
   const t2=document.querySelector('#chg .chs[data-v="'+d.sq+'"]');d.t=t2;
   const gh=document.createElement('div');gh.className='chgh';gh.innerHTML=t2?t2.innerHTML.replace(/<i[^>]*>.*?<\/i>/g,''):'';
   const w=t2?t2.getBoundingClientRect().width:48;gh.style.width=gh.style.height=w*1.15+'px';
   document.body.appendChild(gh);d.g=gh;if(t2)t2.classList.add('dg');vib&&vib(6)}
  e.preventDefault();
  const w=parseFloat(d.g.style.width)||48;d.g.style.left=(e.clientX-w/2)+'px';d.g.style.top=(e.clientY-w*.8)+'px';
  clr();const c=sqAt(e.clientX,e.clientY);if(c&&CH.lg.some(m=>m.t===+c.dataset.v))c.classList.add('dh')},{passive:false});
 const up=e=>{
  const d=CHD;if(!d||e.pointerId!==d.id)return;
  if(!d.on){CHD=null;return}
  CHDt=Date.now();
  const c=e.type==='pointerup'?sqAt(e.clientX,e.clientY):null,to=c?+c.dataset.v:-1,f=d.sq;
  end();
  if(to>=0&&to!==f&&chTry(f,to))return;
  CH.sel=to===f?f:-1;if(CH.sel<0)CH.lg=[];chDraw()};
 document.addEventListener('pointerup',up);document.addEventListener('pointercancel',up);
 window.addEventListener('click',e=>{if(Date.now()-CHDt<80){e.stopPropagation();e.preventDefault()}},true);
 document.addEventListener('dragstart',e=>{if(CHD)e.preventDefault()})};
