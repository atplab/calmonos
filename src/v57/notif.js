/* ---------- Notifications : un centre dans l’Histoire (cloche), un point sur l’onglet, un aperçu bref à l’arrivée ---------- */
(()=>{
 const q=s=>document.querySelector(s),LOGK='nt:log',MAX=50;
 const log=()=>{const l=st.get(LOGK,[]);return Array.isArray(l)?l:[]};
 /* plus d’avis « ton poisson a faim » : on retire aussi les anciens */
 try{const l=log(),f=l.filter(x=>!String(x.id||'').startsWith('aqf'));if(f.length!==l.length)st.set(LOGK,f)}catch(e){}
 /* jeux multijoueurs : une pastille quand c’est à toi de jouer (onglet Jeux + tuile du jeu) */
 const turns=()=>{const T=new Set();
  try{if(Object.values(SC.G||{}).some(S=>S&&!S.e&&S.t===S.p.indexOf(SO.uid)))T.add('scrabble')}catch(e){}
  try{if(Object.keys(CH.G||{}).some(f=>CH.G[f]&&chStat(f).k==='me'))T.add('chess')}catch(e){}
  try{if(unMine().some(([g,S])=>S.st==='play'&&S.S&&S.S[S.t]&&S.S[S.t].u===SO.uid))T.add('hoho')}catch(e){}
  return T};
 const tdots=()=>{const T=turns(),tab=q('#nav [data-v=games]');
  if(tab){let d=tab.querySelector('.tdot');if(!d){tab.insertAdjacentHTML('beforeend','<i class="ndot tdot" hidden></i>');d=tab.querySelector('.tdot')}d.hidden=!T.size}
  ['scrabble','chess','hoho'].forEach(id=>document.querySelectorAll('.tile.pt-'+id).forEach(t=>{let d=t.querySelector('.tdot');if(T.has(id)&&!d)t.insertAdjacentHTML('beforeend','<i class="ndot tdot" aria-label="À toi de jouer"></i>');else if(!T.has(id)&&d)d.remove()}))};
 setInterval(tdots,1500);setTimeout(tdots,300);
 const games=()=>{const L=[];
  try{Object.entries(SC.G||{}).forEach(([f,S])=>{if(S&&!S.e)L.push({g:'scrabble',ic:'Ⓢ',n:'Scrabble',w:'contre '+scrNm(f),me:S.t===S.p.indexOf(SO.uid)})})}catch(e){}
  try{Object.keys(CH.G||{}).forEach(f=>{const S=CH.G[f],k=S&&chStat(f).k;if(S&&(k==='me'||k==='them'))L.push({g:'chess',ic:'♞',n:'Échecs',w:'contre '+chNm(f),me:k==='me'})})}catch(e){}
  try{unMine().forEach(([g,S])=>{if(S.st==='play'||S.st==='lobby')L.push({g:'hoho',ic:'🃏',n:'HoHo',w:S.st==='lobby'?'salon en attente':(S.S||[]).length+' joueurs',me:S.st==='play'&&S.S&&S.S[S.t]&&S.S[S.t].u===SO.uid})})}catch(e){}
  try{(window.ahInv?ahInv():[]).forEach(x=>L.push({g:'airhockey',ic:'🏒',n:'Air hockey',w:'invitation de '+x.nm,me:true}))}catch(e){}
  return L};
 window.mpLink=()=>{const L=games(),m=L.filter(x=>x.me).length;return`<button class="mplk" data-a="mpOpen">Parties en cours${m?` <b>${m}</b>`:''}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>`};
 Object.assign(act,{mpOpen:()=>{const L=games(),e=q('#mpo');if(e)e.remove();const d=document.createElement('div');d.className='sfr';d.id='mpo';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');
   d.innerHTML=`<div class="glass sfc"><h2 style="margin:0">Parties en cours</h2>${L.length?`<div class="mpl">${L.map(x=>`<button data-a="mpGo" data-v="${x.g}"><i>${x.ic}</i><span><b>${esc(x.n)}</b><small>${esc(x.w)}</small></span><em class="${x.me?'':'w'}">${x.me?'À toi':'En attente'}</em></button>`).join('')}</div>`:'<p class="note" style="margin:14px 0">Aucune partie multijoueur en cours. Lance une partie de Scrabble, d’Échecs ou de HoHo avec tes amis.</p>'}<button class="btn alt" data-a="mpx">Fermer</button></div>`;document.body.appendChild(d)},
  mpx:()=>{const e=q('#mpo');if(e)e.remove()},mpGo:v=>{const e=q('#mpo');if(e)e.remove();act.open(v)}});
 /* conditions « tout ou rien » (faim, entretien, histoire) : une nouvelle notification à chaque fois qu’elles redeviennent vraies */
 const edge=(k,on)=>{const E=st.get('nt:e',{});if(on){if(!E[k]){E[k]=k+':'+Date.now();st.set('nt:e',E)}return E[k]}if(E[k]){E[k]='';st.set('nt:e',E)}return''};
 function items(){
  const L=[],add=(id,ic,t,x,a,v)=>{if(id)L.push({id,ic,t,x,a,v:v||''})};
  try{const a=aqRead(),late=aqMt(a).late&&aqOn(a).length,n=aqHg(a).length;
   add(edge('aqc',!!late),'🫧','Aquarium','Ton aquarium a besoin d’entretien','aqua');}catch(e){}
  try{const Y=styRead();
   [[10,'Les décorations de Noël sont débloquées dans l’aquarium'],[20,'Le Poisson Père Noël est débloqué dans l’aquarium'],[30,'Le fond « Nuit de Noël » est débloqué dans l’aquarium']].forEach(([n,t])=>add(edge('xu'+n,(Y.xp|0)>=n),'🎄','Aquarium de Noël',t,'aqua'));
   if(sxOk(Y))add(edge('stx',(Y.xp||0)<XMX&&xDust(Y)>=XDU&&!UNL()),'🎄','Un noël pour Zeni','Un sapin est prêt : Zeni peut avancer','day')}catch(e){}
  try{const s=st.get('soc:seen',{});Object.entries(SO.rec||{}).forEach(([id,n])=>{if(n>(+s[id]||0))add('gift:'+id+':'+n,'🎁','Cadeau',((SO.P[id]&&SO.P[id].name)||'Un ami')+' t’a offert des ❄','soc')})}catch(e){}
  try{Object.entries(SC.G||{}).forEach(([f,S])=>{if(S&&!S.e&&S.t===S.p.indexOf(SO.uid))add('scr:'+S.id+':'+S.n,'Ⓢ','Scrabble','À toi de jouer contre '+scrNm(f),'scr')})}catch(e){}
  try{Object.keys(CH.G||{}).forEach(f=>{const S=CH.G[f];if(S&&chStat(f).k==='me')add('ch:'+S.id+':'+S.mv.length,'♞','Échecs','À toi de jouer contre '+chNm(f),'chess')})}catch(e){}
  try{unMine().forEach(([g,S])=>{const hn=(S.nms&&S.nms[S.h])||scrNm(S.h);
   if(S.st==='lobby'&&S.h!==SO.uid&&!unJoined(S,g,SO.uid))add('hoho:inv:'+S.id,'🃏','HoHo',hn+' t’invite à une partie','hoho',g);
   else if(S.st==='play'&&S.S.some(s=>s.u===SO.uid)&&!(UN.scr==='room'&&UN.room===g))add('hoho:go:'+S.id,'🃏','HoHo','La partie de HoHo a commencé','hoho',g)})}catch(e){}
  return L}
 const ago=t=>{const m=Math.round((Date.now()-t)/6e4);return m<1?'à l’instant':m<60?'il y a '+m+' min':m<1440?'il y a '+Math.round(m/60)+' h':'il y a '+Math.round(m/1440)+' j'};
 const unread=()=>log().filter(x=>!x.r).length;
 window.ntBell=()=>{const n=unread();return`<button class="shb ntb" data-a="ntOpen" aria-label="Notifications${n?' : '+n+' nouvelle'+(n>1?'s':''):''}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>${n?`<b class="ntc">${n>9?'9+':n}</b>`:''}</button>`};
 function marks(){
  const n=unread(),tab=q('#nav [data-v=daily]');
  if(tab){let d=tab.querySelector('.ntdot');if(!d){tab.insertAdjacentHTML('beforeend','<i class="ndot ntdot" hidden></i>');d=tab.querySelector('.ntdot')}d.hidden=!n}
  const b=q('.ntb');if(b)b.outerHTML=ntBell()}
 function toast(x){
  let d=q('#ntt');if(!d){d=document.createElement('button');d.id='ntt';d.className='ntt';d.type='button';document.body.appendChild(d);d.addEventListener('click',()=>{d.classList.remove('on');go(d.dataset.a,d.dataset.v)})}
  d.dataset.a=x.a;d.dataset.v=x.v||'';d.innerHTML=`<i>${x.ic}</i><span><b>${esc(x.t)}</b><small>${esc(x.x)}</small></span>`;
  d.classList.remove('on');void d.offsetWidth;d.classList.add('on');clearTimeout(d._t);d._t=setTimeout(()=>d.classList.remove('on'),4800);
  try{sfx(880,.12)}catch(e){}}
 function go(a,v){
  closeP();
  if(a==='aqua'){const t=q('#nav [data-v=aqua]');if(t)t.click()}
  else if(a==='day')dayScreen();
  else if(a==='soc')socScreen();
  else if(a==='scr')scrHub();
  else if(a==='chess')chHub();
  else if(a==='hoho'){if(v)unRoom(v);else unHub()}}
 function poll(){
  const L=log(),ids=new Set(L.map(x=>x.id)),fresh=items().filter(x=>!ids.has(x.id));
  if(fresh.length){const now=Date.now();fresh.forEach(x=>{x.at=now;x.r=0});st.set(LOGK,[...fresh.reverse(),...L].slice(0,MAX));toast(fresh[0]);if(q('#ntp'))drawP()}
  marks()}
 function drawP(){
  const p=q('#ntp');if(!p)return;const L=log();
  p.innerHTML=`<section class="glass ntps" role="dialog" aria-label="Notifications"><div class="ntph"><h2>Notifications</h2><button class="lnk" data-a="ntClr"${L.length?'':' hidden'}>Tout effacer</button><button class="shb" data-a="ntClose" aria-label="Fermer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
  <div class="ntl">${L.length?L.map((x,i)=>`<button class="nti${x.r?'':' nw'}" data-a="ntGo" data-v="${i}"><i>${x.ic}</i><span><b>${esc(x.t)}</b><small>${esc(x.x)}</small><em>${ago(x.at)}</em></span></button>`).join(''):'<p class="note" style="text-align:center;margin:24px 0">Aucune notification pour l’instant.<br>Les invitations, les poissons qui ont faim et les cadeaux arriveront ici.</p>'}</div></section>`}
 function closeP(){const p=q('#ntp');if(p)p.remove()}
 Object.assign(act,{
  ntOpen:()=>{closeP();const p=document.createElement('div');p.id='ntp';p.className='ntp';p.addEventListener('click',e=>{if(e.target===p)closeP()});document.body.appendChild(p);drawP();
   const L=log();if(L.some(x=>!x.r)){setTimeout(()=>{st.set(LOGK,log().map(x=>Object.assign(x,{r:1})));marks()},1200)}},
  ntClose:closeP,
  ntClr:()=>{st.set(LOGK,[]);drawP();marks()},
  ntGo:v=>{const x=log()[+v];if(x)go(x.a,x.v)}
 });
 setTimeout(poll,2500);setInterval(poll,4000);
})();
