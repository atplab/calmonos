/* ---- les dix pièces : quatre au condo, six dans la petite maison ---- */
const dBath=p=>o=>{dWinR(o,3.3,5.5,2.3,4.5);dVanity(o,0,.3,1.6,2.2,p.cab);dTub(o,2.2,0,4.6,2.2);dRailAt(o);dToilet(o,0,3.6);};
const dRailAt=o=>dRail(o,3.4,5.2,3.0);
const DRM=[
 {h:'Condo',n:'La chambre',W:7,D:7,Hh:5.2,c:['#c9d3f0','#b7c3ea','#d8b58a'],b:o=>{dWinR(o,3.0,4.8,2.3,4.4);dRug(o,3.1,2.8,2.8,2.6,'#b9a6e0');dSide(o,0,.1,.9,.9);dBed(o,0,1.2,2.6,4.2,'#8f7fe0');dDesk(o,3.0,0,2.2,1.3);dChairOf(o,3.7,1.7);dWard(o,5.4,0,1.6,1.3,4.2,'#d8c9ae','L');dShelf(o,0,5.7,1.1,1.3,3.4,dWood,'R')},
  items:['teddy','pillow','computer','lamp','books','shirt','poster','clock']},
 {h:'Condo',n:'La salle de bain',W:7,D:7,Hh:5.2,c:['#cfe6ee','#bcd9e4','#e6eef2','#cfdde4'],b:dBath({cab:'#a9825a'}),
  items:['toothbrush','soap','towel','shampoo','paper','duck','mirror','bathmat']},
 {h:'Condo',n:'La cuisine',W:7,D:7,Hh:5.2,c:['#efe6d2','#e2d8c2','#b98a5a'],b:o=>{dWinL(o,2.3,4.5,2.0,4.3);dUpper(o,.4,3.3);dUpper(o,3.3,5.2);dRug(o,1.6,3.0,3.6,3.2,'#e9c9b0');dCounter(o,.4,0,1.5,1.3);dStove(o,1.9,0,1.4,1.3);dCounter(o,3.3,0,1.9,1.3);dFridge(o,5.4,0,1.4,1.3);dChairOf(o,1.3,3.6,'#e8946c');dTable(o,2.5,3.3,2.0,1.8,1.7);dChairOf(o,4.9,3.6,'#e8946c')},
  items:['pot','kettle','toaster','mug','fruit','plate','magnet','plant']},
 {h:'Condo',n:'Le salon',W:7,D:7,Hh:5.2,c:['#e8d9c4','#dccbb2','#b08e6a'],b:o=>{dWinR(o,2.9,4.9,2.4,4.4);dRug(o,2.4,2.0,3.6,3.4,'#8fb0c9');dSide(o,0,.2,1,1);dSofa(o,0,1.8,2.1,3.8,'#6f86a8');dTV(o,2.4,0,2.8,1.2);dShelf(o,5.6,0,1.4,1.0,3.4,dWood,'L');dTable(o,3.3,2.7,1.6,1.7,.9,dWood,'coffee')},
  items:['tv','gamepad','remote','book','cushion','plant','lamp','frame']},
 {h:'Maison',n:'La chambre des parents',W:7,D:7,Hh:5.2,c:['#d8e6d8','#c5d8c8','#d3ae82'],b:o=>{dWinR(o,2.8,4.6,2.6,4.5);dRug(o,3.6,2.8,3,3,'#e0bfa0');dSide(o,0,.3,.9,1.1);dBed(o,0,1.6,3.2,4.2,'#7fb8c9','#8a5a36');dDresser(o,2.6,0,2.2,1.1);dWard(o,5.3,0,1.7,1.3,4.2,'#c8b08c','L')},
  items:['pillow','quilt','lamp','clock','perfume','jewel','shirt','frame','cshirt','dress','sweater','socks']},
 {h:'Maison',n:'Ta chambre',W:7,D:7,Hh:5.2,c:['#f6d9e4','#eecbda','#e7cfae'],b:o=>{dWinR(o,5.2,6.6,2.4,4.4);dRug(o,2.6,2.4,3.2,3.2,'#b9d9a0');dSide(o,0,.2,.9,.9);dBed(o,0,1.2,2.2,3.2,'#7fb8c9','#f4efe6');dShelf(o,2.8,0,2.4,.9,2.8,'#f1e6d4','L');dChest(o,5.0,4.8,1.6,1.1)},
  items:['teddy','blocks','ball','train','horse','book','nightlight','duck','pillow','poster']},
 {h:'Maison',n:'La salle de bain',W:7,D:7,Hh:5.2,c:['#e9dff4','#d9cdeb','#efe9f6','#dcd2ea'],b:dBath({cab:'#8b6fb0'}),
  items:['toothbrush','soap','towel','shampoo','paper','duck','bathmat','plant','mirror','perfume']},
 {h:'Maison',n:'La cuisine',W:7,D:7,Hh:5.2,c:['#f3e4c6','#e8d6b0','#c59a68'],b:o=>{dWinL(o,2.3,4.5,2.0,4.3);dUpper(o,.4,3.3,'#8a6a4a');dUpper(o,3.3,5.2,'#8a6a4a');dRug(o,1.6,3.0,3.6,3.2,'#d98c63');dCounter(o,.4,0,1.5,1.3,1.9,'#d9cdb6','counter','#8a6a4a');dStove(o,1.9,0,1.4,1.3);dCounter(o,3.3,0,1.9,1.3,1.9,'#d9cdb6','counter','#8a6a4a');dFridge(o,5.4,0,1.4,1.3);dChairOf(o,1.3,3.6,'#5fa9a0');dTable(o,2.5,3.3,2.0,1.8,1.7);dChairOf(o,4.9,3.6,'#5fa9a0')},
  items:['pot','pan','mug','plate','fruit','kettle','magnet','book','toaster','plant']},
 {h:'Maison',n:'Le salon',W:7,D:7,Hh:5.2,c:['#e4e8f4','#d4daea','#a98d6c'],b:o=>{dWinR(o,2.9,4.9,2.4,4.4);dRug(o,2.4,2.0,3.6,3.4,'#e0a99a');dSide(o,0,.2,1,1);dSofa(o,0,1.8,2.1,3.8,'#c97b6a');dTV(o,2.4,0,2.8,1.2);dShelf(o,5.6,0,1.4,1.0,3.4,dWood,'L');dTable(o,3.3,2.7,1.6,1.7,.9,dWood,'coffee')},
  items:['tv','remote','cushion','blanket','vase','book','plant','frame','gamepad','lamp']},
 {h:'Maison',n:'La cour',W:7,D:7,Hh:2.2,yard:1,c:['#d9c8a6','#cdbb98','#8fcf8a'],b:o=>{
   const fz=(F,k)=>{};
   for(let k=.25;k<7;k+=.5){o.ln(o.P(0,k,.05),o.P(0,k,2.0),'#b9a782',1.1);o.ln(o.P(k,0,.05),o.P(k,0,2.0),'#b9a782',1.1)}
   dRug(o,1.0,3.0,3.2,3.4,'#cfc4ae');
   const fb=o.box(.5,.5,0,3.0,1.1,.5,'#6b4a35',{t:'#5a3d2c'});const fl=[o.P(.7,.7,.5),o.P(3.3,.7,.5),o.P(3.3,1.4,.5),o.P(.7,1.4,.5)];o.pg(fl,'#4a3426');[[1,1],[1.6,1.1],[2.2,.95],[2.8,1.15]].forEach(([a,c],k)=>{const q=o.P(a,c,.5);o.s+=`<circle cx="${q[0].toFixed(1)}" cy="${(q[1]-4).toFixed(1)}" r="3" fill="${['#f08aa8','#f4c24a','#fff','#a98fe0'][k]}"/>`});o.zone('flowerbed',fl,fb.hull);
   const sh=o.box(5.0,.4,0,1.8,1.7,2.4,'#b98a5a');o.pg([o.P(4.9,.3,2.4),o.P(6.9,.3,2.4),o.P(6.9,2.2,2.4),o.P(4.9,2.2,2.4)].map(p=>p),'#8a4a3a','#6a3a2a');o.zone('shed',sh.L,dHull([...sh.hull]),'c');
   dTable(o,1.4,3.5,1.6,1.4,1.5,'#b98a5a','ptable');
   const sb=o.box(4.4,4.2,0,2.2,2.2,.55,'#c9a36a');const sd=[o.P(4.55,4.35,.55),o.P(6.45,4.35,.55),o.P(6.45,6.25,.55),o.P(4.55,6.25,.55)];o.pg(sd,'#f0d9a0');o.zone('sandbox',sd,sb.hull)},
  items:['ball','bucket','shovel','can','flowerpot','bike','chair','book','train','blocks']}
];
const dPool=['tree','gift','gift2','garland','stocking','wreath','globe','candle','cocoa'];
const DXI=DRM.map((_,i)=>dPool.filter((_,j)=>j!==i%9));
G.find(g=>g.id==='demenage').wl=['La chambre est prête. Le lit attend déjà ses premières nuits.','La salle de bain sent le savon frais. Le canard a trouvé son bain.','La cuisine est rangée. Ça sent presque le café du matin.','Le condo est prêt : quatre pièces, et déjà un chez-soi. Mais le temps passe vite…','La chambre des parents est prête. Un grand lit, une fenêtre, un peu de silence.','Ta chambre est prête. Le toutou veille déjà sur tes premières nuits.','La salle de bain est en place, avec un tapis tout doux pour tes petits pieds.','La cuisine fume déjà de promesses : des repas, des rires, des matins.','Le salon est prêt. On y fera des câlins, des histoires et des siestes.','La cour est prête. Les ballons, le sable et les fleurs t’attendent. La petite maison est complète !'];
function dScene(i,w){
 const R=DRM[i],o=dNew(R.W,R.D,R.Hh,R.c[0],R.c[1],R.yard?R.c[2]:R.c[2],R.c[3]);
 if(R.yard){}
 R.b(o);return o;
}
const dStory={0:['Année 1 · Le condo','Tes parents emménagent dans leur tout premier condo : quatre pièces, beaucoup de boîtes et la douce lumière de la fin d’été. Toi, tu n’existes pas encore… mais déjà, cet endroit pense à toi. Range chaque objet là où il va.'],4:['Année 3 · La petite maison','Deux ans ont passé, et te voilà : tu viens de naître. Le condo est devenu trop petit pour une famille qui grandit. Tes parents choisissent une petite maison, avec deux chambres, un salon, une cuisine, une salle de bain… et une petite cour. Ta toute première chambre t’attend.']};
function dmOv(h,b){const e=$('#dmo');if(e)e.remove();const d=document.createElement('div');d.className='sfr';d.id='dmo';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.innerHTML=`<div class="glass sfc">${h}<button class="btn" data-a="dmx">${b||'Commencer'}</button></div>`;app.appendChild(d)}
function pDemen(r){
 const X=isX('demenage',lv),i=X?xn('demenage',lv)-1:lv,R=DRM[i],ids=X?DXI[i]:R.items,sc=dScene(i);
 let placed=r&&r.p?r.p.filter(q=>ids.includes(q[0])):[],selId=null,hintT=0,done=false,bad=new Set();
 snap=()=>({p:placed});act.dmx=()=>{const d=$('#dmo');if(d)d.remove()};
 const left=()=>ids.filter(id=>!placed.some(q=>q[0]===id));
 const sp=(id,x,y,c,cls='')=>`<svg class="dmp ${cls}" data-id="${id}" x="${(x-13.5).toFixed(1)}" y="${(y-(c==='c'?13.5:25.3)).toFixed(1)}" width="27" height="27" viewBox="0 0 32 32"><title>${DIT[id][0]}</title>${DIT[id][1]}</svg>`;
 const layer=()=>{const rr=$('#dmr');if(rr)rr.classList.toggle('hb',bad.size>0);const g=$('#dml');if(g)g.innerHTML=placed.slice().sort((a,b)=>a[2]-b[2]).map(q=>sp(q[0],q[1],q[2],q[3],(q[4]?'pop':'')+(bad.has(q[0])?' bad':''))).join('')};
 const tray=()=>{const t=$('#dmt'),n=left();if(!t)return;const K=Math.max(3,Math.floor(((t.clientWidth||320)-12+6)/62)),vis=n.slice(0,K);if(selId&&!vis.includes(selId))selId=null;t.innerHTML=vis.map(id=>`<button class="dmi${selId===id?' sel':''}" data-id="${id}" aria-label="${DIT[id][0]}"><span>${dSpr(id,32)}</span><small>${DIT[id][0]}</small></button>`).join('')||(bad.size?'<p class="note" style="margin:0;text-align:center">Touche un objet en surbrillance pour le reprendre et le ranger au bon endroit.</p>':'<p class="note" style="margin:0;text-align:center">La boîte est vide.</p>');const c=$('#dmn');if(c)c.textContent=n.length?n.length+' objet'+(n.length>1?'s':'')+' à ranger':bad.size?bad.size+' objet'+(bad.size>1?'s':'')+' à replacer':'Boîte vide ✓'};
 frame(`<div class="dm"><p class="lit">${X?'Fêtes · ':R.h+' · '}${R.n}</p><div class="dmw"><svg id="dmr" viewBox="0 0 ${sc.vw} ${sc.vh}" role="img" aria-label="${R.n}">${sc.s}<g id="dml"></g><g id="dmh"></g></svg></div><div class="dmb"><div class="dmc"><i>📦</i><b id="dmn"></b></div><div class="dmt" id="dmt"></div></div></div>`,3);
 const svg=$('#dmr'),ptr=e=>{const m=svg.getScreenCTM();if(!m)return null;const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse());return[p.x,p.y]};
 const alive=()=>$('#dmr')===svg&&playing;
 const put=(id,pt)=>{
  const z=[...sc.zs].reverse().find(z=>dIn(pt,z.hull));
  if(!z){msg('Pose-le dans la pièce.');return false}
  const a=dClamp(pt,z.top);placed.push([id,+a[0].toFixed(1),+a[1].toFixed(1),z.a,1,z.k]);selId=null;msg('');sfx(520,.2);vib(8);bad.delete(id);layer();tray();placed.forEach(q=>q[4]=0);sv();
  if(!left().length)setTimeout(()=>{if(alive())verify()},350);
  return true;
 };
 /* fin de niveau : on regarde si chaque objet est au bon endroit */
 const okAt=q=>{let k=q[5];if(!k){const z=[...sc.zs].reverse().find(z=>dIn([q[1],q[2]],z.hull));k=z&&z.k}return!k||DIT[q[0]][2].includes(k)};
 const verify=()=>{if(left().length||done)return;bad=new Set(placed.filter(q=>!okAt(q)).map(q=>q[0]));layer();tray();
  if(bad.size){msg(bad.size>1?bad.size+' objets ne sont pas au bon endroit : touche-les pour les replacer.':'Un objet n’est pas au bon endroit : touche-le pour le replacer.');vib(14);sfx(260,.25);return}
  done=true;confetti($('#dmr'));setTimeout(()=>{if(alive())win()},900)};
 /* toucher ou glisser */
 let dr=null;
 const ghost=(id,x,y)=>{let g=$('#dmg');if(!g){g=document.createElement('div');g.id='dmg';g.className='dmg';document.body.appendChild(g)}g.innerHTML=dSpr(id,40);g.style.left=x+'px';g.style.top=y+'px'};
 const noGhost=()=>{const g=$('#dmg');if(g)g.remove()};
 const tt=$('#dmt');
 const mvH=e=>{if(!dr)return;if(!dr.mv&&Math.hypot(e.clientX-dr.x,e.clientY-dr.y)>8){dr.mv=true;selId=dr.id;tt.querySelectorAll('.dmi').forEach(b=>b.classList.toggle('sel',b.dataset.id===selId))}if(dr.mv)ghost(dr.id,e.clientX,e.clientY)};
 const up=e=>{document.removeEventListener('pointermove',mvH);document.removeEventListener('pointerup',up);document.removeEventListener('pointercancel',cn);if(!dr)return;const d=dr;dr=null;noGhost();
  if(d.mv){const r0=svg.getBoundingClientRect();if(e.clientX>=r0.left&&e.clientX<=r0.right&&e.clientY>=r0.top&&e.clientY<=r0.bottom){const p=ptr(e);if(p&&!put(d.id,p)){selId=null;tray()}}else{selId=null;tray()}}
  else{selId=selId===d.id?null:d.id;tray();msg(selId?'Touche l’endroit où le ranger.':'')}};
 const cn=()=>{document.removeEventListener('pointermove',mvH);document.removeEventListener('pointerup',up);document.removeEventListener('pointercancel',cn);dr=null;noGhost()};
 tt.addEventListener('pointerdown',e=>{const b=e.target.closest('.dmi');if(!b)return;dr={id:b.dataset.id,x:e.clientX,y:e.clientY,mv:false};document.addEventListener('pointermove',mvH);document.addEventListener('pointerup',up);document.addEventListener('pointercancel',cn)});
 svg.addEventListener('pointerdown',e=>{const s=e.target.closest&&e.target.closest('.dmp.bad');if(!s||dr)return;e.preventDefault();const id=s.dataset.id,k=placed.findIndex(q=>q[0]===id);if(k<0)return;placed.splice(k,1);bad.delete(id);selId=null;layer();tray();sv();dr={id,x:e.clientX,y:e.clientY,mv:false};document.addEventListener('pointermove',mvH);document.addEventListener('pointerup',up);document.addEventListener('pointercancel',cn)});
 svg.addEventListener('pointerup',e=>{if(!selId||dr)return;const p=ptr(e);if(p)put(selId,p)});
 act.hint=()=>{const id=selId||left()[0]||[...bad][0];if(!id||!spend(3))return;const h=$('#dmh');if(!h)return;h.innerHTML=sc.zs.filter(z=>DIT[id][2].includes(z.k)&&z.k!=='wall'&&z.k!=='floor'||DIT[id][2].includes(z.k)&&(z.k==='wall'||z.k==='floor')).map(z=>`<polygon class="dmhz" points="${z.hull.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')}"/>`).join('');msg(`Indice : « ${DIT[id][0]} » se range sur la zone qui brille.`);clearTimeout(hintT);hintT=setTimeout(()=>{const g=$('#dmh');if(g)g.innerHTML=''},3200)};
 layer();tray();
 if(!r&&!X&&dStory[lv]&&!st.get(ckey('demenage')+':'+lv,false))dmOv(`<small>${dStory[lv][0]}</small><p class="sfq">${dStory[lv][1]}</p>`,'Ouvrir les boîtes');
 else if(!r&&!left().length)setTimeout(()=>{if(alive())win()},300);
 if(r&&!left().length)setTimeout(()=>{if(alive())verify()},400);
}
