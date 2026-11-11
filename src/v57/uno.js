/* ---------- Uno : contre des bots, ou à distance avec jusqu’à 3 amis (4 joueurs), 15 s par tour en ligne ----------
   Une partie en ligne = un document sc/<joueurs triés>_u (même règle de sécurité que le Scrabble et les échecs).
   L’hôte crée le salon ; chaque invité signale qu’il le rejoint dans son profil (champ un) ; l’hôte lance la partie.
   Celui dont c’est le tour écrit son coup ; l’hôte fait jouer les bots et les joueurs qui dépassent les 15 s
   (un autre joueur prend le relais si l’hôte n’est plus là). */
const UNCL=['r','y','g','b'],UNHX={r:'#e8605a',y:'#f0bd3e',g:'#45ad72',b:'#4a8be0',k:'#2b2a3d'},UNNM={r:'rouge',y:'jaune',g:'vert',b:'bleu'};
const UNBOT=[['Lapin','🐰'],['Renard','🦊'],['Hibou','🦉']],UNT=15000,UNRX=/^([rygb][0-9svd]|k[wf])$/;
const UN={scr:'',g:null,loc:false,me:0,room:'',m:'',pk:-1,uc:false,cfg:Object.assign({nb:2,bots:1,fr:[]},st.get('uno:cfg',{})),subs:{},G:{},got:{},err:{},busy:false,iv:0,drvN:-1,drvT:0,lastX:0};
UN.cfg.fr=[];
/* ---------- règles ---------- */
function unDeck(){const d=[];UNCL.forEach(c=>{d.push(c+'0');for(let v=1;v<=9;v++)d.push(c+v,c+v);['s','v','d'].forEach(x=>d.push(c+x,c+x))});for(let i=0;i<4;i++)d.push('kw','kf');return unShuf(d)}
function unShuf(d){for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]]}return d}
const unTop=S=>S.X[S.X.length-1];
const unOk=(S,c)=>c[0]==='k'||c[0]===S.c||c[1]===unTop(S)[1];
const unNx=(S,k=1)=>((S.t+S.d*k)%S.S.length+S.S.length)%S.S.length;
const unCp=S=>JSON.parse(JSON.stringify(S));
const unNm=(S,i)=>S.S[i].nm,unNmD=(S,i)=>unDN(S.S[i]);
const unCn=c=>{const v=c[1];return v==='s'?'Passe':v==='v'?'Inversion':v==='d'?'+2':v==='w'?'Joker':v==='f'?'+4':v};
const unCnf=c=>unCn(c)+(c[0]!=='k'?' '+UNNM[c[0]]:'');
function unNew(seats,extra){
 const D=unDeck(),H=seats.map((_,i)=>D.splice(0,(extra&&extra.hs&&extra.hs[i])||7)),k=D.findIndex(c=>/^[rygb]\d$/.test(c)),top=D.splice(k,1)[0];
 return Object.assign({},extra||{},{k:'uno',v:1,id:Math.random().toString(36).slice(2,10),n:(extra&&extra.n)||0,st:'play',S:seats,H,D,X:[top],c:top[0],t:Math.floor(Math.random()*seats.length),d:1,dr:0,w:-1,lg:'La partie commence',uc:seats.map(()=>0),to:seats.map(()=>0),dl:0,at:Date.now()})}
function unPick(S){if(!S.D.length){const top=S.X.pop();S.D=unShuf(S.X.slice());S.X=[top]}return S.D.pop()||null}
function unGive(S,i,k){for(let j=0;j<k;j++){const c=unPick(S);if(c)S.H[i].push(c)}}
function unPlay(S0,i,ix,col,uno){
 const S=unCp(S0),c=S.H[i].splice(ix,1)[0],vi=unNx(S,1);
 S.X.push(c);S.c=c[0]==='k'?(UNCL.includes(col)?col:'r'):c[0];S.dr=0;S.to[i]=0;
 let lg='^'+i+' {'+i+':joue|joues} '+unCn(c)+(c[0]==='k'?' · couleur '+UNNM[S.c]:' '+UNNM[c[0]]);
 if(!S.H[i].length){S.st='end';S.w=i;S.lg='^'+i+' {'+i+':a posé sa dernière carte|as posé ta dernière carte} !';S.dl=0;return S}
 if(S.H[i].length===1){if(uno){S.uc[i]=1;lg+=' · « Uno ! »'}else{unGive(S,i,2);S.uc[i]=0;lg+=' · oubli du « Uno ! » : +2'}}else S.uc[i]=0;
 const v=c[1],n=S.S.length;
 if(v==='s'){lg+=' · ^'+vi+' {'+vi+':passe son tour|passes ton tour}';S.t=unNx(S,2)}
 else if(v==='v'){if(n===2){S.t=unNx(S,2);lg+=' · {'+i+':et rejoue|et rejoues}'}else{S.d=-S.d;S.t=unNx(S,1);lg+=' · sens inversé'}}
 else if(v==='d'){unGive(S,vi,2);S.uc[vi]=0;lg+=' · ^'+vi+' {'+vi+':pioche 2|pioches 2}';S.t=unNx(S,2)}
 else if(v==='f'){unGive(S,vi,4);S.uc[vi]=0;lg+=' · ^'+vi+' {'+vi+':pioche 4|pioches 4}';S.t=unNx(S,2)}
 else S.t=unNx(S,1);
 S.lg=lg;return S}
function unDrawA(S0,i){
 const S=unCp(S0),c=unPick(S);if(c)S.H[i].push(c);S.uc[i]=0;S.to[i]=0;
 S.lg='^'+i+' {'+i+':pioche une carte|pioches une carte}';
 if(c&&unOk(S,c))S.dr=1;else{S.dr=0;S.t=unNx(S,1);S.lg+=' {'+i+':et passe|et passes}'}
 return S}
function unPass(S0,i){const S=unCp(S0);S.dr=0;S.t=unNx(S,1);S.lg='^'+i+' {'+i+':garde sa carte et passe|gardes ta carte et passes}';return S}
/* temps écoulé : pioche et passe ; après 3 fois de suite, un bot prend la place */
function unAuto(S0,i){
 let S=S0.dr?unPass(S0,i):unDrawA(S0,i);if(S.dr){S.dr=0;S.t=unNx(S,1)}
 S.to[i]=(S0.to[i]||0)+1;S.lg='^'+i+' {'+i+':n’a pas joué à temps|n’as pas joué à temps} : une carte en plus';
 if(S.to[i]>=3&&!S.S[i].b){S.S[i].b=1;S.S[i].ab=1;S.lg='^'+i+' {'+i+':semble absent : un bot joue à sa place|sembles absent : un bot joue à ta place}'}
 return S}
/* les bots : gardent les jokers pour plus tard, attaquent quand le suivant n’a presque plus de cartes */
function unBotMove(S0,i){
 let S=S0;
 if(!S.dr&&!S.H[i].some(c=>unOk(S,c))){S=unDrawA(S,i);if(!S.dr)return S}
 const H=S.H[i],cand=S.dr?[H.length-1]:H.map((c,k)=>unOk(S,c)?k:-1).filter(k=>k>=0),thr=S.H[unNx(S,1)].length<=2;
 const sc=k=>{const c=H[k];let s;if(c[0]==='k')s=c[1]==='f'?(thr?60:4):(thr?30:9);else if(/\d/.test(c[1]))s=20+ +c[1];else s=thr?50:24;if(c[0]===S.c)s+=3;return s+Math.random()*5};
 cand.sort((a,b)=>sc(b)-sc(a));const k=cand[0],c=H[k];
 let col=S.c;if(c[0]==='k'){const cnt={r:0,y:0,g:0,b:0};H.forEach((x,j)=>{if(j!==k&&x[0]!=='k')cnt[x[0]]++});col=UNCL.reduce((a,b)=>cnt[b]>cnt[a]?b:a,UNCL[Math.floor(Math.random()*4)])}
 return unPlay(S,i,k,col,H.length===2&&Math.random()<.85)}
/* minuteur du tour : bots ~1 s, joueurs 15 s en ligne, pas de limite en solo */
function unArm(S,prev,net){
 if(S.st!=='play'){S.dl=0;return S}
 if(prev&&prev.id===S.id&&prev.t===S.t&&S.dr&&prev.dl){S.dl=prev.dl;return S}
 const b=S.S[S.t].b;S.dl=b?Date.now()+(net?1950:1350+Math.random()*1050):net?Date.now()+UNT:0;return S}
/* ---------- dessin ---------- */
/* cartes « Nuit de neige » : dégradé givré, emblème rond, symboles dessinés, flocon dans le coin */
const UNFLW='<svg viewBox="-12 -12 24 24" aria-hidden="true"><ellipse cy="-5.6" rx="4.1" ry="5.6" fill="#e8605a"/><ellipse cx="5.6" rx="5.6" ry="4.1" fill="#4a8be0"/><ellipse cy="5.6" rx="4.1" ry="5.6" fill="#45ad72"/><ellipse cx="-5.6" rx="5.6" ry="4.1" fill="#f0bd3e"/><circle r="2.7" fill="#fff"/></svg>';
const UNSK='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.3" fill="none" stroke="currentColor" stroke-width="3.2"/><path d="M6.3 17.7L17.7 6.3" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/></svg>';
const UNRV='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 9.5h12.5l-3.4-3.4M19.5 14.5H7l3.4 3.4" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function unSym(c){const v=c[1];return v==='s'?UNSK:v==='v'?UNRV:v==='d'?'<b>+2</b>':v==='w'?UNFLW:v==='f'?UNFLW+'<b class="u4">+4</b>':'<b>'+v+'</b>'}
function unCard(c,cls){
 const col=c[0],v=c[1],sm=v==='w'||v==='f'?UNFLW:unSym(c);
 return`<span class="ucard u-${col}${cls?' '+cls:''}"><span class="ucn">${v==='f'?'<b>+4</b>':sm}</span><span class="uem">${unSym(c)}</span><span class="usf" aria-hidden="true">❄</span></span>`}
const unBack=cls=>`<span class="ucard uback${cls?' '+cls:''}"><span class="ubk"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M26 8a13 13 0 1 0 6 21A11 11 0 0 1 26 8z" fill="#fff4cf"/><circle cx="31" cy="10" r="1.2" fill="#fff"/><circle cx="9" cy="30" r="1" fill="#fff"/><circle cx="33" cy="33" r=".9" fill="#fff"/></svg></span></span>`;
/* vrais joueurs : leur nom et leur photo de profil (profil d’ami, ou lu une fois depuis la base) */
UN.pf={};
function unProf(u){
 if(!u||u===SO.uid)return st.get('soc:me',null);
 if(SO.P&&SO.P[u])return SO.P[u];
 if(!(u in UN.pf)){UN.pf[u]=null;(async()=>{try{const db=await scrDb();if(!db)return;const d=await db.collection('profiles').doc(u).get();if(d&&d.exists){const v=d.data();UN.pf[u]=typeof socMerge==='function'?socMerge(v,null):v;if($('#ung'))UN.g?unDraw():unRoomDraw()}}catch(e){}})()}
 return UN.pf[u]}
const unDN=s=>{if(!s)return'';if(s.b&&!s.ab)return s.nm;const p=s.u&&unProf(s.u);return(p&&p.name)||s.nm};
function unAv(s){
 if(s.b&&!s.ab)return`<span class="fr-av em" style="--h:${s.nm.length*47%360}" aria-hidden="true">${s.e||'🤖'}</span>`;
 const p=s.u&&unProf(s.u),a=p&&p.av,nm=unDN(s);let h=0;for(const ch of (s.u||nm))h=(h*31+ch.charCodeAt(0))%360;
 if(a&&a.k==='p'&&a.v)return`<span class="fr-av ph" aria-hidden="true"><img src="${a.v}" alt=""></span>`;
 if(a&&a.k==='e'&&a.v)return`<span class="fr-av em" style="--h:${h}" aria-hidden="true">${a.v}</span>`;
 return`<span class="fr-av" style="--h:${h}" aria-hidden="true">${esc(([...nm][0]||'?').toUpperCase())}</span>`}
function unDraw(){
 const root=$('#ung');if(!root||!UN.g)return;
 const S=UN.g,me=UN.me,n=S.S.length,my=S.H[me]||[],live=S.st==='play',myT=live&&S.t===me&&!S.S[me].b,net=!UN.loc;
 const hs=$('#unh'),sl=hs?hs.scrollLeft:0,flip=unHandPos(),myOn=myT&&!(UN.hit&&Date.now()<UN.hit.u);
 let op='';for(let r=1;r<n;r++){const i=(me+r)%n,s=S.S[i],h=S.H[i].length;
  const hit=UN.hit&&UN.hit.i===i&&Date.now()<UN.hit.u,hold=UN.hit&&Date.now()<UN.hit.u;op+=`<div class="unp${live&&S.t===i&&!hold?' on':''}${hit?' hit':''}" data-i="${i}">${hit?`<em class="unhb">${UN.hit.t}</em>`:''}<span class="unav">${unAv(s)}</span><b>${esc(unDN(s))}${s.ab?' <small>(bot)</small>':''}</b><span class="unbk">${'<i></i>'.repeat(Math.min(h,8))}</span><span class="unn">${h} carte${h>1?'s':''}${S.uc[i]&&h===1?' · <em>Uno !</em>':''}</span></div>`}
 /* la main : toujours entière à l’écran (chevauchement selon la largeur réelle, sur deux rangées si besoin) */
 const W=Math.max(200,(root.clientWidth||Math.min(innerWidth,440)-36)-16),cw=58,cap=1+Math.floor((W-cw)/17),rows=my.length>cap?[my.slice(0,Math.ceil(my.length/2)),my.slice(Math.ceil(my.length/2))]:[my];
 const ovOf=m=>m>1?Math.min(6,Math.floor((W-cw)/(m-1))-cw):0;
 const turn=!live?'':myT?'À toi de jouer':S.S[me].b&&S.S[me].ab?'Un bot joue à ta place':'Au tour de '+esc(unNmD(S,S.t));
 const w=S.st==='end'?S.w:-1,rw=w<0?'':UN.loc&&S.sty!==undefined?(S.rwd?'+'+S.rwd+' ❄':''):UN.loc?(w===me?'+'+(2+2*(n-1))+' ❄':'+1 ❄'):(S.S[me]&&S.S[me].u===SO.uid?(w===me?'+10 ❄':'+2 ❄'):'');
 const host=!UN.loc&&S.h===SO.uid;
 root.innerHTML=`<div class="top stk"><button class="back" data-a="unBk">‹ Uno</button>${S.sty!==undefined?`<span class="tl">Niveau ${S.sty+1}</span>`:''}<div class="chip">❄ ${FLX()}</div></div>
 <div class="unop">${op}</div>
 <div class="unc"><span class="unar l ${S.d>0?'up':'dn'}" aria-hidden="true"><svg viewBox="0 0 28 72"><path d="M20 66Q2 36 18 8"/><path d="M9 11l9-3 1 9"/></svg></span><button class="btn ununo${UN.uc?' on':''}" data-a="unUno" ${myT&&my.length===2?'':'disabled'} aria-pressed="${UN.uc}">Uno !</button><button class="unk${myT&&!S.dr&&!UN.busy&&!my.some(c=>unOk(S,c))?' must':''}" data-a="unDraw" aria-label="Piocher" ${myT&&!S.dr?'':'disabled'}>${unBack()}<small>${S.D.length}</small><em class="unkm" aria-hidden="true">Pioche !</em></button><div class="untop" style="--cc:${UNHX[S.c]}">${S.X.length>1?`<span class="unund" style="${unJit(S.X.length-2)}" aria-hidden="true">${unCard(S.X[S.X.length-2],'big')}</span>`:''}<span style="${unJit(S.X.length-1)}" class="untc ${S.X.length!==UN.lastX&&wRM?'unpop':''}"${UN.flyX&&UN.flyX===S.X.length?' style="visibility:hidden"':''}>${unCard(unTop(S),'big'+(unTop(S)[0]==='k'?' ukc u-'+S.c:''))}</span></div><span class="unar r ${S.d>0?'dn':'up'}" aria-hidden="true"><svg viewBox="0 0 28 72"><path d="M20 66Q2 36 18 8"/><path d="M9 11l9-3 1 9"/></svg></span></div>
 <p class="unlg vh" role="status" aria-live="polite">${esc(unLg(S,me))}</p>
 <div class="unme${myT&&!(UN.hit&&Date.now()<UN.hit.u)?' on':''}${UN.hit&&UN.hit.i===me&&Date.now()<UN.hit.u?' hit':''}">${UN.hit&&UN.hit.i===me&&Date.now()<UN.hit.u?`<em class="unhb">${UN.hit.t}</em>`:''}<div class="unt"><b>${turn}</b>${net&&myT?'<span class="untb"><i id="untm"></i></span>':''}</div>
 <div class="unh" id="unh">${(()=>{let base=0;return rows.map(R=>{const b0=base;base+=R.length;return`<div class="unhr" style="--ov:${ovOf(R.length)}px">${R.map((c,j)=>{const k=b0+j;const ok=myT&&(S.dr?k===my.length-1&&unOk(S,c):unOk(S,c));return`<button class="ucd${ok&&myOn?' ok':''}${myOn&&!ok?' no':''}${myOn?'':' wt'}" data-a="unPlay" data-v="${k}" data-c="${c}" aria-label="${unCnf(c)}"${ok?'':' aria-disabled="true"'}>${unCard(c)}</button>`}).join('')}</div>`}).join('')})()}</div>
 ${myT&&S.dr?'<div class="unbt"><button class="btn alt" data-a="unPass">Garder et passer</button></div>':''}
 ${S.S[me]&&S.S[me].ab&&S.S[me].u===SO.uid&&live?'<button class="btn" style="margin-top:10px" data-a="unBackIn">Reprendre ma place</button>':''}
 ${UN.m?`<p class="note" style="text-align:center">${esc(UN.m)}</p>`:''}</div>
 ${w>=0?`<div class="unend"><section class="glass play"><h2>${w===me?'Tu as gagné !':esc(unNmD(S,w))+' a gagné'}</h2>${rw?`<p class="unrw">${rw}</p>`:''}<div class="chrow">${UN.loc||host?'<button class="btn" data-a="unAgain">'+(S.sty!==undefined&&w===me&&S.sty+1<UNN?'Niveau suivant':'Rejouer')+'</button>':'<p class="note">L’hôte peut relancer une partie.</p>'}<button class="btn alt" data-a="unBk">Retour</button></div></section></div>`:''}
 ${UN.pk>=0?`<div class="unpk${UN.pkS?'':' in'}"><section class="glass play"><h2>Choisis une couleur</h2><div class="unpc">${UNCL.map(c=>`<button data-a="unCol" data-v="${c}" style="background:${UNHX[c]}" aria-label="${UNNM[c]}"></button>`).join('')}</div><button class="lnk" data-a="unCol" data-v="">Annuler</button></section></div>`:''}`;
 UN.lastX=S.X.length;
 const h2=$('#unh');if(h2)h2.scrollLeft=sl;
 UN.pkS=UN.pk>=0;
 unTimers();unAnim(S);unUiAnim(S,myOn);unHandFlip(flip,S);unTurnAnim()}
/* le joueur dont c’est le tour s’allume en douceur ; celui d’avant s’éteint */
function unTurnAnim(){
 const on=$('.unp.on'),me=$('.unme.on'),k=on?on.dataset.i:me?'me':'',P=UN.pTurn;UN.pTurn=k;if(P===undefined||P===k||wRM)return;
 if(on)on.animate([{transform:'translateY(0) scale(1)',filter:'saturate(.25) brightness(.75)',boxShadow:'0 0 0 0 rgba(255,216,107,0)'},{transform:'translateY(-6px) scale(1.09)',filter:'saturate(1.1) brightness(1.08)',offset:.6},{transform:'translateY(-3px) scale(1.05)',filter:'none'}],{duration:480,easing:'ease-out'});
 if(me){const t=me.querySelector('.unt b');if(t)t.animate([{opacity:0,transform:'translateY(6px) scale(.9)'},{opacity:1,transform:'none'}],{duration:380,easing:'ease-out'})}
 if(P&&P!=='me'){const e=$(`.unp[data-i="${P}"]`);if(e&&!e.classList.contains('on')&&!e.classList.contains('hit'))e.animate([{transform:'translateY(-3px) scale(1.05)',filter:'brightness(1.15) saturate(1.3) sepia(.5)'},{transform:'none',filter:'none'}],{duration:420,easing:'ease-in-out'})}}
/* distribution au début de la partie : 7 cartes à chacun, une à la fois, autour de la table, puis la première carte du jeu */
function unDeal(S){
 const me=UN.me,n=S.S.length,T=1700+Math.random()*500,FD=380,step=(T-FD-320)/(7*n),R=e=>e?e.getBoundingClientRect():null,src=R($('.unk .ucard')||$('.unk'));
 UN.dealT=Date.now()+T+80;const root=$('#ung');if(root)root.classList.add('undeal');unCs('shuffle',0);
 const cs=[...document.querySelectorAll('#unh .ucd')];cs.forEach(e=>e.style.visibility='hidden');
 const tg=$('.untop>.untc'),ud=$('.untop>.unund');if(tg)tg.style.visibility='hidden';if(ud)ud.style.visibility='hidden';
 for(let k=0;k<7;k++)for(let p=0;p<n;p++){const i=(me+1+p)%n,dl=(k*n+p)*step;
  if(i===me){const el=cs[k];if(!el)continue;unFly(unCard(S.H[me][k]),src,R(el),dl,()=>{el.style.visibility=''},null,FD)}
  else{const st=$(`.unp[data-i="${i}"] .unbk i:last-child`)||$(`.unp[data-i="${i}"] .unav`);unFly(unBack(),src,R(st),dl,null,null,FD)}}
 if(tg){const tr=tg.style.transform;tg.style.transform='none';const r=R(tg.firstElementChild||tg);tg.style.transform=tr;
  unFly(unCard(unTop(S),'big'+(unTop(S)[0]==='k'?' ukc u-'+S.c:'')),src,r,T-320,()=>{const t2=$('.untop>.untc');if(t2)t2.style.visibility=''},unJ(0),320)}
 setTimeout(()=>{const r2=$('#ung');if(r2)r2.classList.remove('undeal');document.querySelectorAll('#unh .ucd').forEach(e=>e.style.visibility='')},T+80)}
/* la main se resserre en glissant quand une carte part (ou s’écarte quand une carte arrive) */
function unHandPos(){const m={},n={};document.querySelectorAll('#unh .ucd').forEach(e=>{const c=e.dataset.c;if(!c)return;n[c]=(n[c]||0)+1;const r=e.getBoundingClientRect();m[c+'#'+n[c]]=[r.left,r.top]});return{m,id:UN.g&&UN.g.id}}
function unHandFlip(F,S){if(!F||F.id!==S.id||wRM)return;const n={};
 document.querySelectorAll('#unh .ucd').forEach(e=>{const c=e.dataset.c;if(!c)return;n[c]=(n[c]||0)+1;const o=F.m[c+'#'+n[c]];if(!o)return;const r=e.getBoundingClientRect(),dx=o[0]-r.left,dy=o[1]-r.top;
  if(Math.abs(dx)<1&&Math.abs(dy)<1)return;const k=e.querySelector('.ucard');if(k)k.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'translate(0,0)'}],{duration:340,easing:'cubic-bezier(.3,.7,.3,1)'})})}
function unUiAnim(S,myT){
 const same=UN.pUi&&UN.pUi.id===S.id,P=UN.pUi||{},cds=[...document.querySelectorAll('#unh .ucd')];
 UN.pUi={id:S.id,myT,d:S.d,ok:cds.map(e=>e.classList.contains('ok')),no:cds.map(e=>e.classList.contains('no'))};
 if(!same||wRM)return;
 if(P.myT!==myT){cds.forEach((e,i)=>{const dl=i*28,c=e.querySelector('.ucard');
   if(myT){if(e.classList.contains('ok'))e.animate([{transform:'translateY(0)'},{transform:'translateY(-15px)',offset:.7},{transform:'translateY(-12px)'}],{duration:380,delay:dl,easing:'ease-out',fill:'backwards'});
    if(c)c.animate([{filter:'saturate(.75) brightness(.9)'},{filter:e.classList.contains('no')?'saturate(.5) brightness(.8)':'saturate(1) brightness(1)'}],{duration:350,delay:dl,fill:'backwards'})}
   else{if(P.ok[i])e.animate([{transform:'translateY(-12px)'},{transform:'translateY(0)'}],{duration:320,delay:dl,easing:'ease-in-out',fill:'backwards'});
    if(c)c.animate([{filter:P.no[i]?'saturate(.5) brightness(.8)':'saturate(1) brightness(1)'},{filter:'saturate(.75) brightness(.9)'}],{duration:320,delay:dl,fill:'backwards'})}})}
 if(P.d!==undefined&&P.d!==S.d)unCs('rev',250);
 if(P.d!==undefined&&P.d!==S.d)document.querySelectorAll('.unar').forEach(e=>e.animate([{transform:'scale(1) rotate(0)',opacity:1},{transform:'scale(.2) rotate(-180deg)',opacity:.2,offset:.5},{transform:'scale(1.15) rotate(-360deg)',opacity:1,offset:.8},{transform:'scale(1) rotate(-360deg)',opacity:1}],{duration:700,easing:'ease-in-out'}))}
/* animations : la carte jouée part de la main du joueur vers le talon ; les cartes piochées partent de la pioche vers le joueur */
const unJ=i=>{const h=Math.abs(Math.sin(i*12.9898+4.1)*43758.5453)%1,g=Math.abs(Math.sin(i*78.233+1.7)*12543.11)%1,k=Math.abs(Math.sin(i*39.425+.3)*9871.7)%1;return{r:(h-.5)*12,x:(g-.5)*8,y:(k-.5)*6}};
const unJit=i=>{const j=unJ(i);return`--jr:${j.r.toFixed(1)}deg;--jx:${j.x.toFixed(1)}px;--jy:${j.y.toFixed(1)}px`};
/* bruits de cartes : glissement, carte posée, mélange au début de la donne */
function unCs(k,dl){try{if(typeof AC==='undefined'||!AC||!mg||!prefs().sfx)return;const a=AC,t=a.currentTime+(dl||0)/1000;
 if(!unCs.B){const n=a.sampleRate*.5,b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;unCs.B=b}
 const nz=(t0,f0,f1,q,v,att,dec,type)=>{const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=unCs.B;f.type=type||'bandpass';f.Q.value=q;f.frequency.setValueAtTime(f0,t0);f.frequency.exponentialRampToValueAtTime(f1,t0+att+dec);
  g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(v,t0+att);g.gain.exponentialRampToValueAtTime(.0001,t0+att+dec);s.connect(f);f.connect(g);g.connect(mg);s.start(t0,Math.random()*.3);s.stop(t0+att+dec+.03)};
 const thud=(t0,v)=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(160,t0);o.frequency.exponentialRampToValueAtTime(80,t0+.06);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(v,t0+.01);g.gain.exponentialRampToValueAtTime(.0001,t0+.09);o.connect(g);g.connect(mg);o.start(t0);o.stop(t0+.08)};
 /* sons de cartes : frottement net, petit « toc » boisé, rondeur douce */
 const wood=(t0,f,v,d)=>{[[1,1],[2.3,.35]].forEach(([m,k])=>{const o=a.createOscillator(),g=a.createGain();o.type=m>1?'triangle':'sine';o.frequency.setValueAtTime(f*m*1.25,t0);o.frequency.exponentialRampToValueAtTime(f*m,t0+.03);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(v*k,t0+.003);g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g);g.connect(mg);o.start(t0);o.stop(t0+d+.02)})};
 const tone=(t0,f0,f1,v,d)=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(f0,t0);o.frequency.exponentialRampToValueAtTime(f1,t0+d);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(v,t0+.015);g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g);g.connect(mg);o.start(t0);o.stop(t0+d+.02)};
 /* tour passé : deux petites notes qui descendent ; changement de sens : un souffle qui tourne et deux notes qui montent */
 if(k==='skip'){tone(t,620,560,.05,.12);tone(t+.11,440,390,.045,.18)}
 else if(k==='rev'){nz(t,500,2200,.8,.03,.12,.14);nz(t+.2,2200,600,.8,.025,.04,.2);tone(t+.05,392,400,.035,.14);tone(t+.2,523,530,.04,.22)}
 else if(k==='slide'){nz(t,900,2600,.9,.028,.025,.09);nz(t,3000,3000,.5,.0055,.03,.07,'highpass')}
 else if(k==='place'){nz(t,2000,1400,1.2,.032,.002,.03)}
 else if(k==='deal'){nz(t,2400,1800,1.3,.07,.002,.028);wood(t,300,.05,.06)}
 else if(k==='shuffle'){let x=t;for(let i=0;i<16;i++){nz(x,2200+Math.random()*900,1800,1.5,.045+Math.random()*.02,.002,.02);x+=.03-i*.0009}nz(x+.02,800,2800,.8,.06,.05,.12);wood(x+.2,220,.1,.1)}
}catch(e){}}
function unFly(html,a,b,dl,done,J,du){J=J||{r:0,x:0,y:0};
 if(!a||!b||!b.width){done&&done();return}
 const deal=document.querySelector('#ung.undeal');unCs(deal?'deal':'slide',dl);
 const e=document.createElement('div');e.className='unfly';e.innerHTML=html;document.body.appendChild(e);
 const c=e.firstElementChild,nw=c.offsetWidth||58,nh=c.offsetHeight||87,s1=b.width/nw,s0=Math.max(.15,Math.min(a.width/nw,a.height/nh)),
  bx=b.left+b.width/2-nw/2,by=b.top+b.height/2-nh/2,dx=a.left+a.width/2-nw/2-bx,dy=a.top+a.height/2-nh/2-by;
 e.style.left=bx+'px';e.style.top=by+'px';
 const an=e.animate([{transform:`translate(${dx}px,${dy}px) scale(${s0}) rotate(0deg)`,opacity:.9},{transform:`translate(${dx*.45}px,${dy*.45-14}px) scale(${(s0+s1)/2*1.05}) rotate(${(J.r*.5).toFixed(1)}deg)`,opacity:1,offset:.55},{transform:`translate(${J.x}px,${J.y}px) scale(${s1}) rotate(${J.r}deg)`,opacity:1}],{duration:du||520,delay:dl,easing:'cubic-bezier(.33,.1,.3,1)',fill:'backwards'});
 an.onfinish=()=>{e.remove();if(!deal)unCs('place');done&&done()};an.oncancel=()=>{e.remove();done&&done()}}
function unAnim(S){
 const P=UN.pv,N={id:S.id,top:unTop(S),X:S.X.length,H:S.H.map(h=>h.length),t:S.t};UN.pv=N;const fr=UN.fromR;UN.fromR=null;
 if((!P||P.id!==S.id)&&!wRM&&S.st==='play'&&S.X.length===1&&S.H.every(h=>h.length===7)){unDeal(S);return}
 if(!P||P.id!==S.id||P.H.length!==N.H.length||wRM)return;
 const me=UN.me,R=e=>e?e.getBoundingClientRect():null,seat=i=>i===me?$('#unh'):($(`.unp[data-i="${i}"] .unbk i:last-child`)||$(`.unp[data-i="${i}"] .unav`)||$(`.unp[data-i="${i}"]`));
 const played=N.X>P.X||P.top!==N.top,pl=played?P.t:-1;let dl=0;
 if(pl>=0){const tg=$('.untop>.untc');if(tg){tg.style.visibility='hidden';const from=pl===me&&fr?fr:R(seat(pl)),fx=UN.flyX=N.X;
  const tr=tg.style.transform;tg.style.transform='none';const tgr=R(tg.firstElementChild||tg);tg.style.transform=tr;
  unFly(unCard(N.top,'big'+(N.top[0]==='k'?' ukc u-'+S.c:'')),from,tgr,0,()=>{if(UN.flyX===fx)UN.flyX=0;const t2=$('.untop>.untc');if(t2)t2.style.visibility=''},unJ(N.X-1));dl=330}}
 if(pl>=0&&['s','d','f'].includes(N.top[1])){const n=S.S.length,v=((pl+S.d)%n+n)%n;if(v!==pl){UN.hit={i:v,u:Date.now()+750+dl,t:N.top[1]==='s'?'Passe !':N.top[1]==='d'?'+2':'+4'};if(N.top[1]==='s')unCs('skip',dl+60);setTimeout(()=>{const e=v===me?$('.unme'):$(`.unp[data-i="${v}"]`);if(e&&!e.classList.contains('hit')){e.classList.add('hit');e.insertAdjacentHTML('afterbegin',`<em class="unhb">${UN.hit.t}</em>`)}},dl);document.querySelectorAll('.unp.on,.unme.on').forEach(e=>e.classList.remove('on'));document.querySelectorAll('.ucd').forEach(e=>{e.classList.remove('ok','no');e.classList.add('wt')});setTimeout(()=>{document.querySelectorAll('.unp.hit,.unme.hit').forEach(e=>e.classList.remove('hit'));document.querySelectorAll('.unhb').forEach(e=>e.remove());if($('#ung')&&UN.g)unDraw()},dl+760)}}
 const src=R($('.unk .ucard')||$('.unk'));
 N.H.forEach((h,i)=>{const k=Math.min(4,h-P.H[i]+(i===pl?1:0));if(k<=0)return;
  for(let j=0;j<k;j++){
   if(i===me){const cs=[...document.querySelectorAll('#unh .ucd')],el=cs[cs.length-k+j];if(!el)continue;el.style.visibility='hidden';const c=S.H[me][S.H[me].length-k+j];
    unFly(unCard(c),src,R(el),dl+j*150,()=>{el.style.visibility='';
     /* la carte piochée arrive en couleur, puis s’assombrit doucement si elle ne peut pas être jouée */
     const cs2=[...document.querySelectorAll('#unh .ucd')],e2=el.isConnected?el:cs2[cs2.length-k+j],cd=e2&&e2.querySelector('.ucard');
     if(cd&&(e2.classList.contains('wt')||e2.classList.contains('no')))cd.animate([{filter:'saturate(1) brightness(1)'},{filter:e2.classList.contains('no')?'saturate(.5) brightness(.8)':'saturate(.75) brightness(.9)'}],{duration:450,easing:'ease-in-out',fill:'backwards'})})}
   else unFly(unBack(),src,R(seat(i)),dl+j*150)}
  dl+=k*150})}
document.addEventListener('pointerdown',e=>{const b=e.target&&e.target.closest&&e.target.closest('#unh .ucd');if(b)UN.fromR=b.getBoundingClientRect()},true);

const unLg=(S,me)=>String(S.lg||'').replace(/\^(\d)/g,(m,i)=>+i===me?'Tu':unNmD(S,+i)).replace(/\{(\d):([^|}]*)\|([^}]*)\}/g,(m,i,a,b)=>+i===me?b:a);
function unTimers(){
 const S=UN.g;if(!S||UN.loc)return;const now=Date.now(),f=S.st==='play'&&S.dl&&!S.S[S.t].b?Math.max(0,Math.min(1,(S.dl-now)/UNT)):0;
 document.querySelectorAll('.unp').forEach(p=>{p.style.setProperty('--p',+p.dataset.i===S.t?f:0)});
 const b=$('#untm');if(b)b.style.width=(f*100).toFixed(1)+'%'}
/* ---------- solo ---------- */
function unSolo(nb){
 const seats=[{u:SO.uid||'me',nm:'Toi',b:0}];UNBOT.slice(0,nb).forEach(([nm,e])=>seats.push({u:'',nm,e,b:1}));
 UN.loc=true;UN.me=0;UN.uc=false;UN.pk=-1;UN.m='';UN.room='';
 const S=unNew(seats);unArm(S,null,false);UN.g=S;unSave();unScreen()}
/* mode histoire : 24 niveaux contre les bots, de plus en plus serrés */
const UNN=24,UNTI=[['Le petit salon','Zeni t’invite près du poêle : Lapin voudrait une partie. Tu commences avec peu de cartes, le temps de te réchauffer.'],['La veillée','Renard rejoint la table. La veillée s’allonge et les cartes s’empilent.'],['Le grand tournoi','Hibou organise un tournoi. Trois adversaires, et des mains bien garnies.'],['La nuit des cartes','Dernière nuit : les bots ont peu de cartes en main. Garde ton sang-froid !']];
const unSL=l=>{const t=Math.floor(l/6),k=l%6;return{t,k,nb:[1,2,3,3][t],hm:Math.min(9,4+k+t),hb:Math.max(4,7-t)}};
const unSDone=i=>st.get(ckey('uno')+':'+i,false),unSNext=()=>{for(let i=0;i<UNN;i++)if(!unSDone(i))return i;return UNN-1};
function unStory(l){
 const c=unSL(l),seats=[{u:SO.uid||'me',nm:'Toi',b:0}];UNBOT.slice(0,c.nb).forEach(([nm,e])=>seats.push({u:'',nm,e,b:1}));
 UN.loc=true;UN.me=0;UN.uc=false;UN.pk=-1;UN.m='';UN.room='';
 const S=unNew(seats,{sty:l,hs:seats.map((x,i)=>i?c.hb:c.hm)});unArm(S,null,false);UN.g=S;unSave();unScreen()}
function unStoryCard(){
 const nx=unSNext(),dn=[...Array(UNN).keys()].filter(unSDone).length,c=unSL(nx),T=UNTI[c.t];
 return`<section class="glass play unst"><h2>Histoire</h2><p class="note" style="margin:0 0 4px"><b>${esc(T[0])}</b> · niveau ${nx+1} sur ${UNN}</p><p class="note" style="margin:0 0 12px">${esc(T[1])} Tu as ${c.hm} cartes, ${c.nb>1?'les '+c.nb+' bots en ont':'le bot en a'} ${c.hb}.</p><button class="btn chgo" data-a="unSt" data-v="${nx}">${dn?'Continuer':'Commencer'} · niveau ${nx+1}</button><div class="unsl" role="group" aria-label="Niveaux">${[...Array(UNN).keys()].map(i=>`<button class="${unSDone(i)?'ok':i===nx?'nx':''}" data-a="unSt" data-v="${i}" ${i>nx?'disabled':''} aria-label="Niveau ${i+1}${unSDone(i)?' terminé':''}">${unSDone(i)?'✓':i+1}</button>`).join('')}</div><p class="note" style="margin:10px 0 0">${dn} sur ${UNN} terminés · +${rw('uno')} ❄ à la première victoire</p></section>`}
function unSave(){if(!UN.loc)return;st.set('uno:sv',UN.g&&UN.g.st==='play'?UN.g:null)}
function unScreen(){
 unActs(); cur='uno';nv('games');theme('uno');UN.scr='game';
 app.innerHTML='<div id="ung" class="ung"></div>';UN.lastX=-1;unDraw();
 clearInterval(UN.iv);UN.iv=setInterval(unTick,350);window.scrollTo(0,0)}
/* un coup : en solo, enregistré ; en ligne, envoyé */
async function unCommit(S){
 const prev=UN.g;UN.m='';
 if(UN.loc){UN.g=unArm(S,prev,false);unSave();unAfter(prev);unDraw();return true}
 S=unArm(S,prev,true);S.n=(prev?prev.n:0)+1;S.at2=Date.now();
 const sub=UN.subs[UN.room];if(!sub||!sub.ref){UN.m='Connexion à la partie en cours…';unDraw();return false}
 UN.busy=true;UN.g=S;unAfter(prev);unDraw();
 try{await sub.ref.set(S)}catch(e){UN.busy=false;UN.g=prev;UN.m='Le coup n’est pas parti. '+scrWhy(e);unDraw();return false}
 UN.busy=false;UN.G[UN.room]=S;return true}
function unAfter(prev){
 const S=UN.g;if(!S)return;
 if(S.st==='end'&&(!prev||prev.st!=='end'||prev.id!==S.id)){unPay(S);const won=S.w===UN.me;sfx(won?784:330,won?.7:.3);vib(won?[20,40,20]:15);if(won)try{confetti()}catch(e){}}
 else if(prev&&prev.X.length!==S.X.length){vib(8)}}
function unPay(S){
 if(UN.loc&&S.sty!==undefined){const k=ckey('uno')+':'+S.sty,first=!st.get(k,false);let r=0;if(S.w===UN.me){st.set(k,true);r=first?rw('uno'):1}else r=0;S.rwd=r;if(r)scrGain(r);return}
 if(UN.loc){const n=S.S.length,r=S.w===UN.me?2+2*(n-1):1;scrGain(r);return}
 unPayN(S)}
function unPayN(S){
 const me=S.S.findIndex(s=>s.u===SO.uid);if(me<0)return;
 const pd=st.get('uno:paid',[]);if(pd.includes(S.id))return;pd.push(S.id);st.set('uno:paid',pd.slice(-60));
 scrGain(S.w===me?10:2)}
function unTick(){
 if(!$('#ung')){clearInterval(UN.iv);UN.iv=0;return}
 unTimers();
 const S=UN.g;if(!S||S.st!=='play'||UN.busy||UN.pk>=0&&UN.loc)return;
 if(UN.dealT&&Date.now()<UN.dealT){if(UN.loc&&S.dl&&S.S[S.t].b&&S.dl<UN.dealT+500)S.dl=UN.dealT+500+Math.random()*600;return}
 const now=Date.now(),i=S.t,s=S.S[i];
 if(UN.loc){if(s.b&&S.dl&&now>=S.dl)unCommit(unBotMove(S,i));return}
 if(UN.drvN===S.n&&now-UN.drvT<4000)return;
 const host=S.h===SO.uid,hum=S.S.filter(x=>!x.b&&x.u).map(x=>x.u),rk=hum.indexOf(SO.uid);
 const go=T=>{UN.drvN=S.n;UN.drvT=now;unCommit(T)};
 if(i===UN.me&&!s.b){if(S.dl&&now>=S.dl){UN.pk=-1;go(unAuto(S,i))}return}
 const lag=host?0:rk<0?9e9:4500+rk*2500;
 if(s.b){if(now>=S.dl+lag)go(unBotMove(S,i))}
 else if(now>=S.dl+1500+lag)go(unAuto(S,i))}
/* ---------- accueil ---------- */
function unHub(){
 unActs(); cur='uno';nv('games');theme('uno');UN.scr='hub';UN.g=null;UN.room='';clearInterval(UN.iv);UN.iv=0;
 app.innerHTML=`<div class="top stk">${bk('home')}<div class="chip">❄ ${FLX()}</div></div><section class="glass story pt-uno"><i>🃏</i><h2>Le salon de cartes</h2><p>Débarrasse-toi de toutes tes cartes avant les autres : pose une carte de la même couleur ou du même symbole, et sers-toi des cartes spéciales. Contre des bots, ou à distance avec jusqu’à 3 amis.</p></section><div id="unhb"></div>`;
 if(!SO.col&&SO.st!=='conn'&&typeof socInit==='function')socInit();
 unSync();unHubDraw();window.scrollTo(0,0)}
function unHubDraw(){
 const root=$('#unhb');if(!root)return;const c=UN.cfg,sx=window.scrollX,sy=window.scrollY,sv=st.get('uno:sv',null);
 let h='';
 h+=unRooms();
 h+=unStoryCard();
 if(sv&&sv.k==='uno'&&sv.st==='play')h+=`<section class="glass play"><h2>Partie en cours</h2><p class="note" style="margin:0 0 12px">Contre ${sv.S.length-1} bot${sv.S.length>2?'s':''} · ${sv.H[0].length} carte${sv.H[0].length>1?'s':''} en main</p><div class="chrow"><button class="btn" data-a="unRes">Reprendre</button><button class="btn alt" data-a="unDrop">Laisser tomber</button></div></section>`;
 h+=`<section class="glass play"><h2>Contre des bots</h2><div class="chgr"><div class="chl">Nombre de bots</div><div class="chq">${[1,2,3].map(n=>`<button class="chc${c.nb===n?' on':''}" data-a="unCfg" data-v="nb:${n}" aria-pressed="${c.nb===n}">${UNBOT.slice(0,n).map(b=>b[1]).join('')} ${n}</button>`).join('')}</div></div><p class="note" style="margin:6px 0 14px">Sans minuteur : prends ton temps.</p><button class="btn chgo" data-a="unGo">Commencer la partie</button></section>`;
 h+=unFriends();
 h+=`<section class="glass play unrl"><h2>Les cartes</h2><div class="unrg">${['r5','gs','bv','yd','kw','kf'].map(x=>unCard(x,'sm')).join('')}</div><p class="note" style="margin:10px 0 0"><b>Passe</b> : le suivant passe son tour. <b>Inversion</b> : le sens change. <b>+2</b> : le suivant pioche 2 et passe. <b>Joker</b> : tu choisis la couleur. <b>+4</b> : tu choisis la couleur, le suivant pioche 4 et passe. Quand il te reste 2 cartes, touche <b>Uno !</b> avant de jouer, sinon tu pioches 2 cartes.</p></section>`;
 root.innerHTML=h;window.scrollTo(sx,sy)}
function unFriends(){
 const crd=(t,b,btn)=>`<section class="glass play soc-i"><h2>Avec des amis</h2><p class="note" style="margin:0"><b>${t}</b><br>${b}</p>${btn?`<button class="btn" style="margin-top:14px" data-a="chSoc">${btn}</button>`:''}</section>`;
 if(SO.st==='na')return crd('Une connexion est nécessaire','Jouer avec des amis demande d’être connecté(e) et de les avoir ajoutés : tout se passe dans l’onglet Social.','Ouvrir Social');
 const M=st.get('soc:me',null);
 if(!SO.uid||!SO.got||!M||!M.code){const w=SO.st==='slow'||SO.st==='err';return crd(w?'Pas de réponse pour l’instant':'Un instant…',w?'Tes amis se chargeront dès que possible.':'Tes amis arrivent.')}
 const ids=Object.keys(M.fr).filter(i=>M.fr[i]>0&&SO.P[i]).sort((a,b)=>scrNm(a).localeCompare(scrNm(b),'fr'));
 if(!ids.length)return crd('Il te faut un ami','Ajoute un ami avec son code ami, dans l’onglet Social : vous pourrez alors jouer ensemble.','Ouvrir Social');
 const sel=UN.cfg.fr.filter(i=>ids.includes(i)),k=sel.length,full=k>=3;
 return`<section class="glass play soc-i"><h2>Avec des amis</h2><p class="note" style="margin:0 0 6px">Choisis jusqu’à 3 amis (4 joueurs en tout). 15 secondes par tour.</p>${ids.map(id=>{const on=sel.includes(id);return`<div class="fr-i"><button class="fr-o" data-a="unFr" data-v="${esc(id)}">${socAv(id)}<span class="fr-t"><b>${esc(scrNm(id))}</b><small>${on?'Invité':'Toucher pour inviter'}</small></span></button><div class="fr-b"><button class="sb${on?' buy':''}" data-a="unFr" data-v="${esc(id)}" aria-pressed="${on}"${!on&&full?' disabled':''}>${on?'✓':'Inviter'}</button></div></div>`}).join('')}
 ${k&&k<3?`<div class="chgr"><div class="chl">Compléter avec des bots jusqu’à 4 joueurs</div><div class="chq"><button class="chc${UN.cfg.bots?' on':''}" data-a="unCfg" data-v="bots:1" aria-pressed="${!!UN.cfg.bots}">Oui</button><button class="chc${UN.cfg.bots?'':' on'}" data-a="unCfg" data-v="bots:0" aria-pressed="${!UN.cfg.bots}">Non</button></div></div>`:''}
 <button class="btn chgo" style="margin-top:14px" data-a="unMake" ${k?'':'disabled'}>${k?'Créer le salon ('+(k+1+(UN.cfg.bots&&k<3?3-k:0))+' joueurs)':'Choisis au moins un ami'}</button></section>`}
/* salons et invitations visibles dans l’accueil */
function unMine(){
 const L=[];Object.entries(UN.G).forEach(([g,S])=>{if(!S||S.p.indexOf(SO.uid)<0)return;if(S.st==='end'||S.st==='off')return;if(Date.now()-(S.at||0)>8*36e5)return;L.push([g,S])});return L}
function unJoined(S,g,u){if(u===S.h)return true;const p=u===SO.uid?st.get('soc:me',null):SO.P[u];return!!(p&&p.un&&p.un.g===g&&(+p.un.t||0)>=(S.at||0)-2000)}
function unRooms(){
 const L=unMine();if(!L.length)return'';
 return`<section class="glass play soc-i"><h2>Parties entre amis</h2>${L.map(([g,S])=>{const hn=unDN({u:S.h,nm:S.nms&&S.nms[S.h]||scrNm(S.h)}),me=S.h===SO.uid,j=unJoined(S,g,SO.uid);
  let t,b,a;
  if(S.st==='lobby'){t=me?'Ton salon':'Invitation de '+hn;b=me?'En attente des joueurs':j?'Tu as rejoint le salon':'Te propose une partie';a=me||j?['unOpen','Ouvrir']:['unJoin','Rejoindre']}
  else{const mi=S.S.findIndex(s=>s.u===SO.uid);t='Partie avec '+S.S.filter(s=>s.u!==SO.uid).map(unDN).join(', ');b=mi<0?'Tu regardes la partie':S.t===mi?'À toi de jouer':'En cours';a=['unOpen',mi===S.t?'Jouer':'Ouvrir']}
  return`<div class="fr-i"><button class="fr-o" data-a="${a[0]}" data-v="${esc(g)}"><span class="fr-av em" style="--h:10" aria-hidden="true">🃏</span><span class="fr-t"><b>${esc(t)}</b><small>${esc(b)}</small></span></button><div class="fr-b"><button class="sb buy" data-a="${a[0]}" data-v="${esc(g)}">${a[1]}</button></div></div>`}).join('')}</section>`}
const unTile=()=>{if(!SO.uid)return'Seul ou entre amis';const L=unMine().filter(([g,S])=>S.st==='lobby'?S.h!==SO.uid&&!unJoined(S,g,SO.uid):S.t===S.S.findIndex(s=>s.u===SO.uid));return L.length?(L[0][1].st==='lobby'?'Invitation au Uno':'À toi de jouer'):'Seul ou entre amis'};
function unTileUp(){const t=$('.tile.pt-uno small');if(t)t.textContent=unTile()}
/* ---------- en ligne : abonnements ---------- */
const unGid=p=>p.slice().sort().join('_')+'_u';
function unClean(x,g){
 if(!x||typeof x!=='object'||x.k!=='uno'||!Array.isArray(x.p)||x.p.length<2||x.p.length>4||!x.p.every(s=>typeof s==='string'&&SOK.test(s)))return null;
 if(unGid(x.p)!==g||x.p.indexOf(x.h)<0)return null;
 if(x.st==='lobby'||x.st==='off')return x;
 if(!Array.isArray(x.S)||x.S.length<2||x.S.length>4||!Array.isArray(x.H)||x.H.length!==x.S.length||!Array.isArray(x.X)||!x.X.length||!Array.isArray(x.D))return null;
 if(![...x.D,...x.X,...x.H.flat()].every(c=>UNRX.test(c)))return null;
 if(!UNCL.includes(x.c)||!(x.t>=0&&x.t<x.S.length))return null;
 return x}
async function unWatch(g){
 if(UN.subs[g]||!SO.uid||Object.keys(UN.subs).length>=8)return;
 const sub=UN.subs[g]={ref:null,un:null};
 try{
  const db=await scrDb();if(!db)throw 0;
  const ref=sub.ref=db.collection('sc').doc(g);
  sub.un=ref.onSnapshot(s=>{
   const m=s.metadata||{};if(m.fromCache&&!s.exists)return;
   let S=null;if(s.exists){try{S=unClean(s.data(),g)}catch(e){}}
   UN.G[g]=S;UN.got[g]=true;UN.err[g]=0;
   if(S&&S.st==='end')unPayNet(S);
   if(UN.scr==='room'&&UN.room===g)unRoomSync(S);
   else if(UN.scr==='hub')unHubDraw();
   unTileUp()
  },e=>{delete UN.subs[g];UN.err[g]=scrWhy(e);if(UN.scr==='room'&&UN.room===g){UN.m=UN.err[g];unRoomDraw()}});
 }catch(e){delete UN.subs[g];UN.err[g]=scrWhy(e)}}
function unPayNet(S){unPayN(S)}
function unSync(){
 if(!SO.uid||!SO.got)return;const ids=new Set(),M=st.get('soc:me',null),now=Date.now();
 if(M&&M.un&&M.un.g)ids.add(M.un.g);
 Object.entries(SO.P).forEach(([id,p])=>{if(id!==SO.uid&&p.un&&p.un.g&&p.un.g.split('_').includes(SO.uid)&&now-(+p.un.t||0)<8*36e5)ids.add(p.un.g)});
 [...ids].slice(0,8).forEach(unWatch)}
function unOnProfiles(){unSync();unTileUp();if(UN.scr==='hub')unHubDraw();else if(UN.scr==='room'&&UN.G[UN.room]&&UN.G[UN.room].st==='lobby')unRoomDraw()}
function unMark(g){const M=st.get('soc:me',null);if(!M)return;M.un={g,t:Date.now()};st.set('soc:me',M);if(typeof socLater==='function')socLater()}
/* ---------- en ligne : salon puis partie ---------- */
function unRoom(g){
 unActs(); cur='uno';nv('games');theme('uno');UN.scr='room';UN.room=g;UN.loc=false;UN.g=null;UN.m='';UN.pk=-1;UN.uc=false;
 app.innerHTML='<div id="ung" class="ung"></div>';UN.lastX=-1;unWatch(g);
 clearInterval(UN.iv);UN.iv=setInterval(unTick,350);unRoomSync(UN.G[g]);window.scrollTo(0,0)}
function unRoomSync(S){
 if(!S||S.st==='lobby'||S.st==='off'){UN.g=null;return unRoomDraw()}
 const old=UN.g;if(UN.busy&&old&&old.id===S.id&&S.n<old.n)return;
 if(old&&old.id===S.id&&S.n<old.n)return;
 if(!old||old.id!==S.id){UN.uc=false;UN.pk=-1;UN.lastX=-1}
 UN.g=S;UN.me=Math.max(0,S.S.findIndex(s=>s.u===SO.uid));
 if(old&&old.id===S.id&&old.n!==S.n)unAfter(old);else if(S.st==='end')unPayN(S);
 if(S.t!==UN.me)UN.pk=-1;
 unDraw()}
function unRoomDraw(){
 const root=$('#ung');if(!root)return;const g=UN.room,S=UN.G[g];
 const top=`<div class="top stk"><button class="back" data-a="unBk">‹ Uno</button><div class="chip">❄ ${FLX()}</div></div>`;
 if(!S){root.innerHTML=top+`<section class="glass play"><h2>${UN.err[g]?'Salon injoignable':'Connexion au salon…'}</h2><p class="note" style="margin:0">${esc(UN.err[g]||'Un instant.')}</p></section>`;return}
 if(S.st==='off'){root.innerHTML=top+`<section class="glass play"><h2>Salon fermé</h2><p class="note" style="margin:0">L’hôte a fermé ce salon.</p><button class="btn" style="margin-top:14px" data-a="unBk">Retour</button></section>`;return}
 const host=S.h===SO.uid,nm=u=>unDN({u,nm:(S.nms&&S.nms[u])||scrNm(u)}),j=u=>unJoined(S,g,u),ok=S.p.filter(j),nb=S.bt?Math.max(0,4-ok.length):0,tot=ok.length+nb;
 const row=u=>`<div class="fr-i"><span class="fr-o">${unAv({u,nm:nm(u)})}<span class="fr-t"><b>${esc(nm(u))}${u===S.h?' · hôte':''}</b><small>${j(u)?'✓ Dans le salon':'En attente…'}</small></span></span></div>`;
 root.innerHTML=top+`<section class="glass play soc-i"><h2>Salon de Uno</h2><p class="note" style="margin:0 0 6px">${host?'Lance la partie quand tes amis sont là. Ceux qui ne sont pas arrivés ne joueront pas.':'En attente que '+esc(nm(S.h))+' lance la partie.'}</p>${S.p.map(row).join('')}${nb?`<div class="fr-i"><span class="fr-o"><span class="fr-av em" style="--h:200" aria-hidden="true">🤖</span><span class="fr-t"><b>${nb} bot${nb>1?'s':''}</b><small>Complètent la table</small></span></span></div>`:''}
 ${host?`<div class="chrow" style="margin-top:14px"><button class="btn" data-a="unLaunch" ${tot>=2?'':'disabled'}>Lancer la partie (${tot} joueurs)</button><button class="btn alt" data-a="unClose">Fermer le salon</button></div>`:`<div class="chrow" style="margin-top:14px">${j(SO.uid)?'':'<button class="btn" data-a="unJoin" data-v="'+esc(g)+'">Rejoindre</button>'}<button class="btn alt" data-a="unBk">Retour</button></div>`}
 ${UN.m?`<p class="note">${esc(UN.m)}</p>`:''}</section>`}
async function unSetDoc(g,D){const sub=UN.subs[g];if(!sub||!sub.ref){await unWatch(g)}const s2=UN.subs[g];if(!s2||!s2.ref)throw new Error('unavailable');await s2.ref.set(D);UN.G[g]=D}
/* ---------- actions ---------- */
let unAO=false;
function unActs(){if(unAO)return;unAO=true;Object.assign(act,{
 unCfg:v=>{const[k,x]=v.split(':');UN.cfg[k]=+x;st.set('uno:cfg',{nb:UN.cfg.nb,bots:UN.cfg.bots});unHubDraw()},
 unGo:()=>unSolo(UN.cfg.nb),
 unSt:v=>{const l=+v;if(l>=0&&l<UNN&&l<=unSNext())unStory(l)},
 unRes:()=>{const sv=st.get('uno:sv',null);if(!sv)return unHubDraw();UN.loc=true;UN.me=0;UN.g=sv;UN.uc=false;UN.pk=-1;UN.m='';unArm(UN.g,null,false);unScreen()},
 unDrop:()=>{st.set('uno:sv',null);unHubDraw()},
 unBk:()=>{if(UN.loc)unSave();UN.pk=-1;unHub()},
 unAgain:async()=>{
  if(UN.loc&&UN.g&&UN.g.sty!==undefined){const l=UN.g.sty;return unStory(UN.g.w===UN.me&&l+1<UNN?l+1:l)}
  if(UN.loc)return unSolo(UN.g?UN.g.S.length-1:UN.cfg.nb);
  const S=UN.g;if(!S||S.h!==SO.uid)return;
  const seats=S.S.map(s=>s.ab?Object.assign({},s,{b:0,ab:0}):Object.assign({},s));
  const N=unNew(seats,{h:S.h,p:S.p,nms:S.nms,bt:S.bt,n:S.n});unArm(N,null,true);N.n=S.n+1;
  try{await unSetDoc(UN.room,N);UN.g=N;UN.uc=false;unDraw()}catch(e){UN.m='La nouvelle partie n’a pas pu démarrer. '+scrWhy(e);unDraw()}},
 unPlay:v=>{
  const S=UN.g,k=+v;if(!S||S.st!=='play'||S.t!==UN.me||S.S[UN.me].b||UN.busy)return;
  const my=S.H[UN.me],c=my[k];if(!c)return;
  const ok=S.dr?k===my.length-1&&unOk(S,c):unOk(S,c);
  if(!ok){UN.m=S.dr?'Tu peux poser la carte piochée, ou la garder.':'Cette carte ne va pas : même couleur ou même symbole.';vib(10);unDraw();return}
  if(c[0]==='k'){UN.pk=k;unDraw();return}
  const uno=UN.uc;UN.uc=false;unCommit(unPlay(S,UN.me,k,null,uno))},
 unCol:v=>{const S=UN.g,k=UN.pk;UN.pk=-1;if(!v||!S||k<0){unDraw();return}const uno=UN.uc;UN.uc=false;unCommit(unPlay(S,UN.me,k,v,uno))},
 unDraw:()=>{const S=UN.g;if(!S||S.st!=='play'||S.t!==UN.me||S.dr||S.S[UN.me].b||UN.busy)return;UN.uc=false;unCommit(unDrawA(S,UN.me))},
 unPass:()=>{const S=UN.g;if(!S||S.st!=='play'||S.t!==UN.me||!S.dr||UN.busy)return;unCommit(unPass(S,UN.me))},
 unUno:()=>{const S=UN.g;if(!S||S.t!==UN.me||S.H[UN.me].length!==2)return;UN.uc=!UN.uc;if(UN.uc){sfx(660,.1);vib(10)}unDraw()},
 unBackIn:()=>{const S=UN.g;if(!S)return;const T=unCp(S);T.S[UN.me].b=0;T.S[UN.me].ab=0;T.to[UN.me]=0;T.lg='^'+UN.me+' {'+UN.me+':reprend sa place|reprends ta place}';unCommit(T)},
 unFr:v=>{const a=UN.cfg.fr,i=a.indexOf(v);if(i>=0)a.splice(i,1);else if(a.length<3)a.push(v);unHubDraw()},
 unMake:async()=>{
  const sel=UN.cfg.fr.slice(0,3);if(!sel.length||!SO.uid)return;const M=st.get('soc:me',null)||{};
  const p=[SO.uid,...sel],g=unGid(p),nms={};nms[SO.uid]=(M.name||'Hôte').slice(0,20);sel.forEach(u=>nms[u]=scrNm(u).slice(0,20));
  const D={k:'uno',v:1,id:Math.random().toString(36).slice(2,10),n:0,st:'lobby',h:SO.uid,p:p.slice().sort(),nms,bt:sel.length<3&&UN.cfg.bots?1:0,at:Date.now()};
  try{await unSetDoc(g,D);unMark(g);UN.cfg.fr=[];unRoom(g)}catch(e){UN.m='';const r=$('#unhb');if(r)r.insertAdjacentHTML('afterbegin',`<p class="note">Le salon n’a pas pu être créé. ${esc(scrWhy(e))}</p>`)}},
 unJoin:v=>{const g=v||UN.room;unMark(g);if(UN.scr==='room'&&UN.room===g)unRoomDraw();else unRoom(g)},
 unOpen:v=>unRoom(v),
 unLaunch:async()=>{
  const g=UN.room,L=UN.G[g];if(!L||L.h!==SO.uid||L.st!=='lobby')return;
  const ok=[L.h,...L.p.filter(u=>u!==L.h&&unJoined(L,g,u))],seats=ok.map(u=>({u,nm:(L.nms&&L.nms[u])||scrNm(u),b:0}));
  if(L.bt)UNBOT.slice(0,Math.max(0,4-seats.length)).forEach(([nm,e])=>seats.push({u:'',nm,e,b:1}));
  if(seats.length<2)return;
  const N=unNew(seats,{h:L.h,p:L.p,nms:L.nms,bt:L.bt});unArm(N,null,true);N.n=1;
  try{await unSetDoc(g,N);unRoomSync(N)}catch(e){UN.m='La partie n’a pas pu démarrer. '+scrWhy(e);unRoomDraw()}},
 unClose:async()=>{const g=UN.room,L=UN.G[g];if(!L||L.h!==SO.uid)return;try{await unSetDoc(g,Object.assign({},L,{st:'off',at:Date.now()}))}catch(e){}unMark('');unHub()}
});
 const oc=act.unCol;act.unCol=v=>{const b=v&&$(`.unpk [data-a=unCol][data-v="${v}"]`);if(!b||wRM||UN.pkBusy)return oc(v);UN.pkBusy=true;b.animate([{transform:'scale(1)'},{transform:'scale(1.18)',offset:.45},{transform:'scale(.94)'}],{duration:230,easing:'ease-out',fill:'forwards'});const sc=$('.unpk section'),ov=$('.unpk');if(sc)sc.animate([{opacity:1,transform:'none'},{opacity:0,transform:'scale(.88)'}],{duration:200,delay:120,fill:'forwards'});if(ov)ov.animate([{opacity:1},{opacity:0}],{duration:200,delay:120,fill:'forwards'});setTimeout(()=>{UN.pkBusy=false;oc(v)},310)}}
