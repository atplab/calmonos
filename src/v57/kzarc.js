/* ---------- Cuisine, mode arcade : les plats sont déjà prêts, il faut servir le bon, le plus vite possible ---------- */
const KZAT=60000;
const kzReach=rs=>UNL()||st.get(ckey('cuisine')+':'+(rs*10+9),false);
function kzModeArea(){const m=st.get('kz:mode','');
 return`<div class="rcx-b"><div class="rcx-m"><div class="rcx-t"><small>Mode de jeu</small><span>${m==='arc'?'Sers les bons plats avant la fin du temps':'Prépare chaque commande'}</span></div><div class="plseg"><button class="${m?'':'on'}" data-a="kzMode" data-v="">Histoire</button><button class="${m==='arc'?'on':''}" data-a="kzMode" data-v="arc">Arcade</button></div></div>
${m==='arc'?`<div class="kzabs">${['Burger','Hot-dog','Sushi'].map((n,rs)=>{const ok=kzReach(rs),b=st.get('kz:ar'+rs,0);return`<button class="kzab${ok?'':' lk'}" data-a="kzA" data-v="${rs}"${ok?'':' aria-disabled="true"'}><b>${n}</b><small>${ok?(b?'Record : '+b:'Pas encore de record'):'🔒 Après le niveau '+(rs*10+10)}</small></button>`}).join('')}</div>`:''}</div>`}
var KZRUN=0;
function kzArcade(rs){
 if(!kzReach(rs))return msg('Termine d’abord le niveau '+(rs*10+10)+' en mode histoire.');
 const run=++KZRUN,ok=()=>run===KZRUN&&playing&&cur==='cuisine'&&!!document.getElementById('kzra');
 cur='cuisine';daily=false;lv=rs*10;playing=true;try{INFG=''}catch(e){}snap=null;theme('cuisine');KZR=rs;KZI.fries.n=rs===2?'soupe miso':'frites';KZI.drink.n=rs===2?'thé vert':'boisson';try{kzMu.style(rs)}catch(e){}
 const u=[];for(let i=rs*10;i<rs*10+10;i++)u.push(...KZU[i]);const by=k=>[...new Set(u.filter(x=>KZI[x].k===k))],buns=by('b'),prot=by('p'),tops=by('t');
 const pick=a=>a[Math.floor(Math.random()*a.length)],key=o=>o.b+'|'+o.p+'|'+o.t.join(','),T=(f,ms)=>setTimeout(()=>{if(ok())f()},ms);
 /* la carte du service : 6 plats fixes, tous proches les uns des autres */
 /* la carte du service : 6 plats fixes, chacun bien différent des autres (au moins 2 ou 3 éléments qui changent) */
 const dist=(a,b)=>(a.b!==b.b)+(a.p!==b.p)+a.t.filter(x=>!b.t.includes(x)).length+b.t.filter(x=>!a.t.includes(x)).length;
 const rnd=()=>{const n=1+Math.floor(Math.random()*Math.min(3,tops.length)),T=[],pool=tops.slice();while(T.length<n&&pool.length)T.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]);return{b:pick(buns),p:pick(prot),t:T.sort()}};
 const menu=[];{for(const D of[3,2,1]){for(let g=0;menu.length<6&&g<3000;g++){const d=rnd();if(menu.every(m=>dist(m,d)>=D))menu.push(d)}if(menu.length>=6)break}
  for(let i=menu.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[menu[i],menu[j]]=[menu[j],menu[i]]}}
 const S={T:KZAT,sc:0,cb:0,best:0,sv:0,seat:[null,null,null],id:0,over:false,last:performance.now(),bag:[]};
 /* chaque plat de la carte revient aussi souvent que les autres (tirage dans un sac), sans doublon au comptoir si possible */
 const nextDish=()=>{const busy=S.seat.filter(Boolean).map(c=>c.d);for(let k=0;k<2;k++){if(!S.bag.length)S.bag=[0,1,2,3,4,5].sort(()=>Math.random()-.5);const i=S.bag.findIndex(x=>!busy.includes(x));if(i>=0)return S.bag.splice(i,1)[0]}return S.bag.shift()};
 const arrive=i=>{if(S.over||S.seat[i])return;const pt=Math.max(9000,15000-S.sv*250),d=nextDish();S.seat[i]={d,o:menu[d],lk:Math.floor(Math.random()*KZL.length),p:pt,m:pt,st:'in',id:S.id++};draw();T(()=>{const c=S.seat[i];if(c&&c.st==='in'){c.st='wait';draw()}},700)};
 const leave=(i,good)=>{const c=S.seat[i];if(!c||c.st==='out'||c.st==='sad')return;c.st=good?'out':'sad';draw();T(()=>{if(S.seat[i]===c){S.seat[i]=null;draw();T(()=>arrive(i),450)}},good?800:1000)};
 app.innerHTML=`<div class="kzg ${['bu','hd','su'][rs]}" id="kzg"><div class="kzt"><button class="back" data-a="back" data-v="hub">‹ Cuisine</button><b id="kzsco">Score 0</b><div class="kztr"><div class="chip" id="kzcb">Arcade</div></div></div>
<div class="kzsc">${kzBg(rs)}${kzAmb(rs,7)}<div class="kzcu" id="kzcu"></div><div class="kzct"></div><div class="kztm"><i id="kztm"></i></div></div><p class="m kzm" id="m" role="status" aria-live="polite">Touche le plat qui correspond à une commande.</p><div class="kzk"><div class="kzra" id="kzra"></div></div><div class="kzov" id="kzov" hidden></div></div>`;
 $('#nav').hidden=true;mt='m';
 $('#kzra').innerHTML=menu.map((o,i)=>`<button class="kzrd" data-a="kzR1" data-v="${i}" aria-label="${[o.b,o.p,...o.t].map(x=>KZI[x].n).join(', ')}"><span class="kzrp">${kzDish(o)}</span><span class="kzbi">${[o.b,o.p,...o.t].map(x=>`<i>${kzIco(x)}</i>`).join('')}</span></button>`).join('');
 const draw=()=>{if(!ok())return;const cu=$('#kzcu');cu.style.setProperty('--n',3);
  cu.innerHTML=S.seat.map((c,i)=>{if(!c)return`<div class="kzs"></div>`;const L=KZL[c.lk],lo=c.st==='wait'&&c.p/c.m<.34,mood=c.st==='out'?'happy':c.st==='sad'?'sad':lo?'lo':'wait';
   return`<div class="kzs"><div class="kzp ${c.st}${lo?' lo':''}"><span class="kzb"><span class="kzbd">${kzDish(c.o)}</span><span class="kzbi">${[c.o.b,c.o.p,...c.o.t].map(x=>`<i>${kzIco(x)}</i>`).join('')}</span></span><span class="kzgy">${kzGuy(L,mood,'r'+c.id)}</span><span class="kzn">${L.n}</span><span class="kzpt"><i id="kzp${i}" style="width:${Math.max(0,c.p/c.m*100).toFixed(0)}%"></i></span>${c.st==='out'?'<span class="kzh">♥</span><span class="kzh h2">♥</span>':''}</div></div>`}).join('');
  $('#kzsco').textContent='Score '+S.sc;$('#kzcb').textContent=S.cb>1?'Série ×'+S.cb:'Arcade'};
 const end=()=>{if(S.over)return;S.over=true;const k='kz:ar'+rs,b=st.get(k,0),nb=S.sc>b;if(nb)st.set(k,S.sc);sfx(nb?880:520,.4);
  const o=$('#kzov');if(!o)return;o.hidden=false;o.innerHTML=`<div class="kzbox"><h2>Le service est terminé</h2><p class="kzbig">${S.sc} points</p><p>${S.sv} plat${S.sv>1?'s':''} bien servi${S.sv>1?'s':''} · meilleure série ×${S.best}</p><p class="kzsm">${nb?'Nouveau record !':'Record : '+b}</p><div class="kzbr"><button class="btn" data-a="kzA" data-v="${rs}">Rejouer</button><button class="btn alt" data-a="back" data-v="hub">Retour</button></div></div>`};
 act.kzR1=v=>{if(S.over||run!==KZRUN)return;const d=+v;if(!(d>=0&&d<6))return;
  const cs=S.seat.map((c,i)=>c&&c.st==='wait'&&c.d===d?{c,i}:null).filter(Boolean).sort((a,b)=>a.c.p-b.c.p);
  const e=document.querySelector(`.kzrd[data-v="${d}"]`);
  if(cs.length){const{i}=cs[0];S.cb++;S.best=Math.max(S.best,S.cb);const g=10+Math.min(5,S.cb-1)*2;S.sc+=g;S.sv++;sfx(784,.2);vib(12);msg('✦ +'+g);if(e){e.classList.remove('ok','no');void e.offsetWidth;e.classList.add('ok')}leave(i,true)}
  else{S.cb=0;S.T-=2000;sfx(200,.25);vib(40);msg('Ce plat ne correspond à aucune commande : −2 s');if(e){e.classList.remove('ok','no');void e.offsetWidth;e.classList.add('no')}draw()}};
 draw();[0,1,2].forEach(i=>T(()=>arrive(i),300+i*500));
 const loop=()=>{if(!ok()||S.over)return;const n=performance.now(),dt=Math.min(250,n-S.last);S.last=n;
  if(!document.hidden){S.T-=dt;S.seat.forEach((c,i)=>{if(!c||c.st!=='wait')return;c.p-=dt;const e=$('#kzp'+i);if(e)e.style.width=Math.max(0,c.p/c.m*100).toFixed(0)+'%';if(c.p<=0){S.cb=0;msg(KZL[c.lk].n+' est reparti…');leave(i,false)}})}
  const tm=$('#kztm');if(tm){tm.style.width=Math.max(0,S.T/KZAT*100)+'%';tm.classList.toggle('lo',S.T<10000)}
  if(S.T<=0)return end();setTimeout(loop,100)};
 setTimeout(loop,100);window.scrollTo(0,0)}
setTimeout(()=>Object.assign(act,{kzA:v=>{const r=+v;if(r>=0&&r<3)kzArcade(r)},kzMode:v=>{st.set('kz:mode',v==='arc'?'arc':'');hub('cuisine')}}));
