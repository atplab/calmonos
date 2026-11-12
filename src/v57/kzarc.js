/* ---------- Cuisine, mode arcade : les plats sont déjà prêts, il faut servir le bon, le plus vite possible ---------- */
const KZAT=60000;
const kzReach=rs=>UNL()||!rs||st.get(ckey('cuisine')+':'+(rs*10-1),false);
function kzModeArea(){const m=st.get('kz:mode','');
 return`<div class="rcx-b"><div class="rcx-m"><div class="rcx-t"><small>Mode de jeu</small><span>${m==='arc'?'Sers les bons plats avant la fin du temps':'Prépare chaque commande'}</span></div><div class="plseg"><button class="${m?'':'on'}" data-a="kzMode" data-v="">Histoire</button><button class="${m==='arc'?'on':''}" data-a="kzMode" data-v="arc">Arcade</button></div></div>
${m==='arc'?`<div class="kzabs">${['Burger','Hot-dog','Sushi'].map((n,rs)=>{const ok=kzReach(rs),b=st.get('kz:ar'+rs,0);return`<button class="kzab${ok?'':' lk'}" data-a="kzA" data-v="${rs}"${ok?'':' aria-disabled="true"'}><b>${n}</b><small>${ok?(b?'Record : '+b:'Pas encore de record'):'🔒 Niveau '+(rs*10+1)}</small></button>`}).join('')}</div>`:''}</div>`}
function kzArcade(rs){
 if(!kzReach(rs))return msg('Termine d’abord le niveau '+(rs*10)+' en mode histoire.');
 cur='cuisine';daily=false;lv=rs*10;playing=true;try{INFG=''}catch(e){}snap=null;theme('cuisine');KZR=rs;KZI.fries.n=rs===2?'soupe miso':'frites';KZI.drink.n=rs===2?'thé vert':'boisson';try{kzMu.style(rs)}catch(e){}
 const u=[];for(let i=rs*10;i<rs*10+10;i++)u.push(...KZU[i]);const by=k=>[...new Set(u.filter(x=>KZI[x].k===k))],buns=by('b'),prot=by('p'),tops=by('t');
 const pick=a=>a[Math.floor(Math.random()*a.length)],key=o=>o.b+'|'+o.p+'|'+o.t.join(',');
 const S={T:KZAT,sc:0,cb:0,best:0,sv:0,seat:[null,null,null],tray:[],id:0,over:false,last:performance.now(),t0:0};
 const lvlN=()=>Math.min(4,1+Math.floor(S.sv/4));
 const order=()=>{const n=Math.min(tops.length,Math.floor(Math.random()*(lvlN()+1))),T=[],pool=tops.slice();while(T.length<n)T.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);return{b:pick(buns),p:pick(prot),t:T.sort()}};
 const decoy=o=>{for(let k=0;k<20;k++){const d={b:o.b,p:o.p,t:o.t.slice()},r=Math.random();
   if(r<.2&&buns.length>1)d.b=pick(buns.filter(x=>x!==o.b));else if(r<.4&&prot.length>1)d.p=pick(prot.filter(x=>x!==o.p));
   else if(r<.7&&d.t.length){d.t.splice(Math.floor(Math.random()*d.t.length),1)}else{const add=tops.filter(x=>!d.t.includes(x));if(add.length)d.t.push(pick(add));else if(d.t.length)d.t.pop()}
   d.t.sort();if(key(d)!==key(o))return d}return order()};
 const want=()=>S.seat.filter(c=>c&&c.st==='wait').map(c=>c.o);
 const refill=()=>{const W=want(),have=S.tray.filter(Boolean).map(key);
  W.forEach(o=>{if(!have.includes(key(o))){const i=S.tray.findIndex(x=>!x||!W.some(w=>key(w)===key(x)));if(i>=0){S.tray[i]={...o,t:o.t.slice(),id:S.id++,nw:1};have.push(key(o))}}});
  for(let i=0;i<6;i++)if(!S.tray[i]){const base=W.length?pick(W):order();S.tray[i]={...(Math.random()<.25?order():decoy(base)),id:S.id++,nw:1}}};
 const arrive=i=>{if(S.over||S.seat[i])return;const pt=Math.max(9000,15000-S.sv*250);S.seat[i]={o:order(),lk:Math.floor(Math.random()*KZL.length),p:pt,m:pt,st:'in',id:S.id++};refill();draw();setTimeout(()=>{const c=S.seat[i];if(c&&c.st==='in'){c.st='wait';refill();draw()}},700)};
 const leave=(i,ok)=>{const c=S.seat[i];if(!c)return;c.st=ok?'out':'sad';draw();setTimeout(()=>{if(S.seat[i]===c){S.seat[i]=null;draw();setTimeout(()=>arrive(i),500)}},ok?800:1000)};
 app.innerHTML=`<div class="kzg ${['bu','hd','su'][rs]}" id="kzg"><div class="kzt"><button class="back" data-a="back" data-v="hub">‹ Cuisine</button><b id="kzsco">Score 0</b><div class="kztr"><div class="chip" id="kzcb">Arcade</div></div></div>
<div class="kzsc">${kzBg(rs)}${kzAmb(rs,7)}<div class="kzcu" id="kzcu"></div><div class="kzct"></div><div class="kztm"><i id="kztm"></i></div></div><p class="m kzm" id="m" role="status" aria-live="polite">Touche le plat qui correspond à une commande.</p><div class="kzk"><div class="kzra" id="kzra"></div></div><div class="kzov" id="kzov" hidden></div></div>`;
 $('#nav').hidden=true;mt='m';
 const draw=()=>{const cu=$('#kzcu'),ra=$('#kzra');if(!cu||!ra)return;cu.style.setProperty('--n',3);
  cu.innerHTML=S.seat.map((c,i)=>{if(!c)return`<div class="kzs"></div>`;const L=KZL[c.lk],lo=c.st==='wait'&&c.p/c.m<.34,mood=c.st==='out'?'happy':c.st==='sad'?'sad':lo?'lo':'wait';
   return`<div class="kzs"><div class="kzp ${c.st}${lo?' lo':''}"><span class="kzb"><span class="kzbd">${kzDish(c.o)}</span><span class="kzbi">${[c.o.b,c.o.p,...c.o.t].map(x=>`<i>${kzIco(x)}</i>`).join('')}</span></span><span class="kzgy">${kzGuy(L,mood,'r'+c.id)}</span><span class="kzn">${L.n}</span><span class="kzpt"><i id="kzp${i}" style="width:${Math.max(0,c.p/c.m*100).toFixed(0)}%"></i></span>${c.st==='out'?'<span class="kzh">♥</span><span class="kzh h2">♥</span>':''}</div></div>`}).join('');
  ra.innerHTML=S.tray.map((o,i)=>o?`<button class="kzrd${o.nw?' nw':''}" data-a="kzR1" data-v="${i}" aria-label="${[o.b,o.p,...o.t].map(x=>KZI[x].n).join(', ')}"><span class="kzrp">${kzDish(o)}</span><span class="kzbi">${[o.b,o.p,...o.t].map(x=>`<i>${kzIco(x)}</i>`).join('')}</span></button>`:'<span class="kzrd e"></span>').join('');
  S.tray.forEach(o=>{if(o)o.nw=0});
  const sc=$('#kzsco');if(sc)sc.textContent='Score '+S.sc;const cb=$('#kzcb');if(cb)cb.textContent=S.cb>1?'Série ×'+S.cb:'Arcade'};
 const end=()=>{S.over=true;const k='kz:ar'+rs,b=st.get(k,0),nb=S.sc>b;if(nb)st.set(k,S.sc);sfx(nb?880:520,.4);
  const o=$('#kzov');if(!o)return;o.hidden=false;o.innerHTML=`<div class="kzbox"><h2>Le service est terminé</h2><p class="kzbig">${S.sc} points</p><p>${S.sv} plat${S.sv>1?'s':''} bien servi${S.sv>1?'s':''} · meilleure série ×${S.best}</p><p class="kzsm">${nb?'Nouveau record !':'Record : '+b}</p><div class="kzbr"><button class="btn" data-a="kzA" data-v="${rs}">Rejouer</button><button class="btn alt" data-a="back" data-v="hub">Retour</button></div></div>`};
 act.kzR1=v=>{if(S.over)return;const o=S.tray[+v];if(!o)return;
  const cs=S.seat.map((c,i)=>c&&c.st==='wait'&&key(c.o)===key(o)?{c,i}:null).filter(Boolean).sort((a,b)=>a.c.p-b.c.p);
  if(cs.length){const{i}=cs[0];S.cb++;S.best=Math.max(S.best,S.cb);S.sc+=10+(S.cb-1)*2;S.sv++;S.T=Math.min(KZAT,S.T+1000);S.tray[+v]=null;sfx(784,.2);vib(12);msg('✦ +'+(10+(S.cb-1)*2));leave(i,true);refill();draw()}
  else{S.cb=0;S.T-=2000;sfx(200,.25);vib(40);msg('Ce plat ne correspond à aucune commande : −2 s');const e=document.querySelector(`.kzrd[data-v="${v}"]`);if(e){e.classList.remove('no');void e.offsetWidth;e.classList.add('no')}draw()}};
 refill();draw();[0,1,2].forEach(i=>setTimeout(()=>arrive(i),300+i*500));
 const loop=()=>{if(!playing||cur!=='cuisine'||!document.getElementById('kzra')||S.over)return;const n=performance.now(),dt=Math.min(250,n-S.last);S.last=n;
  if(!document.hidden){S.T-=dt;S.seat.forEach((c,i)=>{if(!c||c.st!=='wait')return;c.p-=dt;const e=$('#kzp'+i);if(e)e.style.width=Math.max(0,c.p/c.m*100).toFixed(0)+'%';if(c.p<=0){S.cb=0;msg(KZL[c.lk].n+' est reparti…');leave(i,false);refill()}})}
  const tm=$('#kztm');if(tm){tm.style.width=Math.max(0,S.T/KZAT*100)+'%';tm.classList.toggle('lo',S.T<10000)}
  if(S.T<=0)return end();setTimeout(loop,100)};
 setTimeout(loop,100);window.scrollTo(0,0)}
setTimeout(()=>Object.assign(act,{kzA:v=>{const r=+v;if(r>=0&&r<3)kzArcade(r)},kzMode:v=>{st.set('kz:mode',v==='arc'?'arc':'');hub('cuisine')}}));
