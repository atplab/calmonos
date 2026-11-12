
/* ---------- Cuisine : le salon de thé de Givre ----------
   Pas de chrono : chaque geste (poser, cuire, servir, patienter) compte pour une étape, et les clients patientent un peu à chaque étape.
   Le défi : organiser son plan de travail et ses cuissons pour servir tout le monde. */
const CUN=40;
const cuRng=n=>{let s=n>>>0;return()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}};
const CUI={
 tasse:{e:'☕',n:'tasse',b:1},assiette:{e:'🍽️',n:'assiette',b:1},bol:{e:'🥣',n:'bol',b:1},
 choco:{e:'🍫',n:'chocolat'},lait:{e:'🥛',n:'lait'},the:{e:'🌿',n:'thé'},miel:{e:'🍯',n:'miel'},citron:{e:'🍋',n:'citron'},
 chantilly:{e:'🍦',n:'chantilly'},fraise:{e:'🍓',n:'confiture'},beurre:{e:'🧈',n:'beurre'},
 crepe:{e:'🥞',n:'crêpe',raw:{e:'🥚',n:'pâte à crêpe'},st:'poele',t:2},
 tartine:{e:'🍞',n:'tartine',raw:{e:'🥖',n:'pain'},st:'grill',t:1},
 cookie:{e:'🍪',n:'cookie',raw:{e:'🌰',n:'pâte à cookie'},st:'four',t:3},
 veloute:{e:'🍲',n:'velouté',raw:{e:'🎃',n:'potiron'},st:'marmite',t:3}
};
const CUSTN={poele:{e:'🍳',n:'Poêle'},grill:{e:'♨️',n:'Grill'},four:{e:'🔥',n:'Four'},marmite:{e:'🫕',n:'Marmite'}};
const CUR=[
 {id:'choc',n:'Chocolat chaud',c:['tasse','choco','lait'],l:0},
 {id:'thmi',n:'Thé au miel',c:['tasse','the','miel'],l:0},
 {id:'thci',n:'Thé au citron',c:['tasse','the','citron'],l:2},
 {id:'vien',n:'Chocolat viennois',c:['tasse','choco','lait','chantilly'],l:3},
 {id:'crmi',n:'Crêpe au miel',c:['assiette','crepe','miel'],l:5},
 {id:'crch',n:'Crêpe au chocolat',c:['assiette','crepe','choco'],l:6},
 {id:'crfr',n:'Crêpe confiture',c:['assiette','crepe','fraise'],l:8},
 {id:'tabe',n:'Tartine beurrée',c:['assiette','tartine','beurre'],l:10},
 {id:'tafr',n:'Tartine confiture',c:['assiette','tartine','beurre','fraise'],l:12},
 {id:'cook',n:'Deux cookies',c:['assiette','cookie','cookie'],l:15},
 {id:'velo',n:'Velouté crémeux',c:['bol','veloute','lait'],l:19},
 {id:'velt',n:'Velouté et tartine',c:['bol','veloute','tartine'],l:23},
 {id:'gout',n:'Grand goûter',c:['assiette','crepe','cookie','fraise'],l:28},
 {id:'cccc',n:'Chocolat gourmand',c:['tasse','choco','lait','chantilly','cookie'],l:33}
];
const CUA=[['🦊','Renard'],['🐰','Lapine'],['🐻','Ourson'],['🦉','Chouette'],['🐿️','Écureuil'],['🦌','Biche'],['🐧','Pingouin'],['🐱','Chaton'],['🐶','Chiot'],['🦔','Hérisson'],['🐼','Panda'],['🐨','Koala']];
const cuSteps=c=>c.reduce((a,x)=>a+(CUI[x].st?2+CUI[x].t:1),0)+1;
function cuLv(l){
 const L=Math.max(0,Math.min(CUN-1,l)),R=cuRng(L*7919+101),av=CUR.filter(x=>x.l<=L),top=Math.max(...av.map(x=>x.l)),nw=av.filter(x=>x.l===top);
 const nc=Math.min(12,3+Math.floor(L/3.5)),seats=L<2?1:L<8?2:L<22?3:4,po=L<4?2:L<20?3:4,k=L<10?2:L<25?1.7:1.5,allow=L<30?1:0;
 const Q=[];for(let i=0;i<nc;i++){const pool=R()<.35?nw:av,rc=pool[Math.floor(R()*pool.length)];Q.push({r:rc.id,a:Math.floor(R()*CUA.length),p:Math.round(cuSteps(rc.c)*k+5+(seats-1)*4)})}
 const ing=[...new Set(av.flatMap(x=>x.c))].sort((a,b)=>(CUI[b].b?2:0)-(CUI[a].b?2:0)||(CUI[a].st?1:0)-(CUI[b].st?1:0));
 const stn=[...new Set(ing.filter(i=>CUI[i].st).map(i=>CUI[i].st))];
 return{L,Q,seats,po,allow,burn:L>=10,nc,ing,stn}
}
function pCuis(r){
 const C=cuLv(lv),rc=id=>CUR.find(x=>x.id===id);
 let S=r&&r.v===1&&r.S&&Array.isArray(r.S.post)?r.S:{q:C.Q.map(x=>({...x})),seat:Array(C.seats).fill(null),post:Array.from({length:C.po},()=>[]),sel:0,stn:{},sv:0,ms:0,n:0};
 let hn=null,over=false,nh=C.L===0&&!st.get('cu:t',0);
 const fill=()=>{for(let i=0;i<S.seat.length;i++)if(!S.seat[i]&&S.q.length){const c=S.q.shift();S.seat[i]={...c,m:c.p}}};
 fill();
 snap=()=>over?null:({v:1,S});
 frame(`<div class="cu" id="cu"></div>`,1);
 const nm=c=>CUA[c.a][1];
 const lose=()=>{snap=null;try{st.set('p:'+cur+':'+lv,null)}catch(e){}
  $('#cu').innerHTML=`<section class="glass story cuend"><h2>Le salon ferme ses portes</h2><p>${S.ms} client${S.ms>1?'s sont repartis':' est reparti'} sans être servi${S.ms>1?'s':''}. ${C.allow?'Un seul départ est permis à ce niveau.':'À ce niveau, chaque client doit être servi.'}</p><p class="note">Astuce : lance les cuissons tôt, et prépare plusieurs commandes à la fois sur tes plans de travail.</p><button class="btn" data-a="cuR">Recommencer</button></section>`};
 const chkEnd=()=>{if(S.q.length||S.seat.some(x=>x))return;over=true;const ok=S.ms<=C.allow;setTimeout(()=>{if(!playing||cur!=='cuisine')return;if(ok)win();else lose()},800)};
 const tick=()=>{S.n++;
  for(const k in S.stn){const s=S.stn[k];if(!s||s.b)continue;s.p++;if(C.burn&&s.p>=CUI[s.i].t+5){s.b=1;msg('Oh ! '+(CUI[s.i].n)+' a brûlé : vide '+(k==='four'?'le four':k==='grill'?'le grill':'la '+CUSTN[k].n.toLowerCase())+'.')}}
  for(let i=0;i<S.seat.length;i++){const c=S.seat[i];if(!c)continue;c.p--;if(c.p<=0){S.ms++;S.seat[i]=null;msg(CUA[c.a][0]+' '+nm(c)+' est reparti sans être servi…');sfx(220,.3)}}
  fill();chkEnd()};
 const stLbl=k=>k==='four'?'le four':k==='grill'?'le grill':'la '+CUSTN[k].n.toLowerCase();
 Object.assign(act,{
  cuR:()=>{st.set('p:'+cur+':'+lv,null);pCuis(undefined)},
  cuX:()=>{nh=false;st.set('cu:t',1);d()},
  cuP:v=>{S.sel=Math.max(0,Math.min(S.post.length-1,+v||0));d()},
  cuW:()=>{if(over)return;hn=null;tick();d()},
  cuT:()=>{if(over)return;const P=S.post[S.sel];if(!P.length)return msg('Ce plan de travail est déjà vide.');S.post[S.sel]=[];hn=null;sfx(300,.15);tick();d()},
  cuI:v=>{if(over)return;const g=CUI[v];if(!g||!C.ing.includes(v))return;
   if(g.st){const k=g.st,s=S.stn[k];if(s)return msg(s.b?'Vide d’abord '+stLbl(k)+' : touche-le.':stLbl(k)[0].toUpperCase()+stLbl(k).slice(1)+' est déjà occupé'+(k==='four'||k==='grill'?'':'e')+'.');S.stn[k]={i:v,p:0};sfx(440,.15);hn=null;tick();return d()}
   const P=S.post[S.sel];
   if(g.b){if(P.length)return msg('Ce plan de travail est occupé : choisis-en un libre.');P.push(v)}
   else{if(!P.length)return msg('Pose d’abord une tasse, une assiette ou un bol.');P.push(v)}
   sfx(520,.12);hn=null;tick();d()},
  cuK:k=>{if(over)return;const s=S.stn[k];if(!s)return msg(stLbl(k)[0].toUpperCase()+stLbl(k).slice(1)+' est libre : touche un ingrédient à cuire.');
   if(s.b){S.stn[k]=null;hn=null;tick();return d()}
   const t=CUI[s.i].t;if(s.p<t)return msg('Encore '+(t-s.p)+' étape'+(t-s.p>1?'s':'')+' de cuisson : prépare autre chose, ou patiente.');
   const P=S.post[S.sel];if(!P.length)return msg('Pose d’abord une assiette ou un bol pour y mettre '+(s.i==='cookie'?'le cookie':s.i==='veloute'?'le velouté':s.i==='tartine'?'la tartine':'la crêpe')+'.');
   P.push(s.i);S.stn[k]=null;sfx(620,.15);hn=null;tick();d()},
  cuS:v=>{if(over)return;const c=S.seat[+v];if(!c)return;const P=S.post[S.sel],R0=rc(c.r);
   if(!P.length)return msg(nm(c)+' voudrait : '+R0.n.toLowerCase()+'.');
   if(R0.c.slice().sort().join()!==P.slice().sort().join())return msg('Ce n’est pas tout à fait ma commande…');
   S.post[S.sel]=[];S.seat[+v]=null;S.sv++;sfx(784,.3);vib(15);msg('✦ Merci ! '+CUA[c.a][0]);hn=null;tick();d()},
  hint:()=>{if(over)return;const h=cuHint();if(!h)return msg('Patiente un peu : les cuissons avancent.');if(!spend(1))return;hn=h;d()}
 });
 /* indice : la prochaine chose utile pour le client le plus pressé */
 const cuHint=()=>{const cs=S.seat.map((c,i)=>c&&{c,i}).filter(Boolean).sort((a,b)=>a.c.p-b.c.p);
  for(const{c,i}of cs){const need=rc(c.r).c;
   const sub=P=>{const m=need.slice();for(const x of P){const j=m.indexOf(x);if(j<0)return null;m.splice(j,1)}return m};
   let pi=-1,miss=null;S.post.forEach((P,j)=>{if(!P.length)return;const m=sub(P);if(m&&(!miss||m.length<miss.length)){pi=j;miss=m}});
   if(pi<0){pi=S.post.findIndex(P=>!P.length);if(pi<0)continue;miss=need.slice()}
   S.sel=pi;if(!miss.length)return'S'+i;
   const b=miss.find(x=>CUI[x].b);if(b)return'I'+b;
   const pl=miss.find(x=>!CUI[x].st);
   for(const x of miss.filter(x=>CUI[x].st)){const s=S.stn[CUI[x].st];if(s&&!s.b&&s.i===x&&s.p>=CUI[x].t)return'K'+CUI[x].st;if(!s)return'I'+x;if(s.b)return'K'+CUI[x].st}
   if(pl)return'I'+pl;return'W'}
  return null};
 const d=()=>{const el=$('#cu');if(!el)return;const H=k=>hn===k?' hn':'';
  const left=S.q.length+S.seat.filter(Boolean).length;
  el.innerHTML=`${nh?`<div class="dnote" role="note"><span>Pose une tasse ou une assiette, ajoute les ingrédients de la commande, puis touche le client pour le servir. Pas de chrono : chaque geste fait juste patienter un peu les clients.</span><button data-a="cuX" aria-label="Fermer">OK</button></div>`:''}
<p class="cust"><span>Servis <b>${S.sv}</b> / ${C.nc}</span><span>En attente <b>${left}</b></span><span>${C.allow?`Départ permis <b>${Math.max(0,C.allow-S.ms)}</b>`:'Aucun départ permis'}</span></p>
<div class="cuss" style="--n:${S.seat.length}">${S.seat.map((c,i)=>c?`<button class="cuc${c.p/c.m<.34?' lo':''}${H('S'+i)}" data-a="cuS" data-v="${i}" aria-label="${nm(c)} : ${rc(c.r).n}"><span class="cua">${CUA[c.a][0]}</span><b>${rc(c.r).n}</b><span class="cui">${rc(c.r).c.map(x=>`<i>${CUI[x].e}</i>`).join('')}</span><span class="cupt"><i style="width:${Math.max(0,c.p/c.m*100).toFixed(0)}%"></i></span></button>`:`<div class="cuc e"><span class="cua">🪑</span><small>${S.q.length?'':'—'}</small></div>`).join('')}</div>
${C.stn.length?`<div class="cuks">${C.stn.map(k=>{const s=S.stn[k],t=s?CUI[s.i].t:0,rd=s&&!s.b&&s.p>=t,bn=C.burn&&rd?CUI[s.i].t+5-s.p:0;return`<button class="cuk${rd?' rd':''}${s&&s.b?' bu':''}${H('K'+k)}" data-a="cuK" data-v="${k}"><small>${CUSTN[k].e} ${CUSTN[k].n}</small><span class="cue">${s?(s.b?'💨':rd?CUI[s.i].e:CUI[s.i].raw.e):'·'}</span><span class="cud">${s&&!s.b?Array.from({length:t},(_,j)=>`<i class="${j<s.p?'on':''}"></i>`).join(''):''}</span><small class="cus2">${s?(s.b?'brûlé, à vider':rd?(bn&&bn<=3?'prêt ! vite ('+bn+')':'prêt !'):'cuit…'):'libre'}</small></button>`}).join('')}</div>`:''}
<div class="cups">${S.post.map((P,i)=>`<button class="cpo${S.sel===i?' on':''}" data-a="cuP" data-v="${i}" aria-pressed="${S.sel===i}" aria-label="Plan de travail ${i+1}${P.length?' : '+P.map(x=>CUI[x].n).join(', '):', libre'}">${P.length?P.map(x=>`<span>${CUI[x].e}</span>`).join(''):'<small>libre</small>'}</button>`).join('')}</div>
<div class="cuac"><button class="btn alt${H('W')}" data-a="cuW">⏳ Patienter</button><button class="btn alt" data-a="cuT">🗑 Vider le plan</button></div>
<div class="cpa">${C.ing.map(id=>{const g=CUI[id];return`<button class="cpi${g.b?' b':''}${g.st?' r':''}${H('I'+id)}" data-a="cuI" data-v="${id}"><span>${g.raw?g.raw.e:g.e}</span><small>${g.raw?g.raw.n:g.n}</small></button>`}).join('')}</div>`};
 d();
}
