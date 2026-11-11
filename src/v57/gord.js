const HBI=n=>`<svg class="hbi" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/></svg><span>${n} ❄</span>`;
/* ordre des jeux choisi par le joueur (les nouveaux jeux se rangent à la fin) */
const GUNL=['mots','caches','sudoku','match3','colorie','scrabble','croises','uno','cherche','chess','airhockey','demenage','memo','flow','maze','tournade','solitaire','phrase','g2048','tetris','brick','planetes','demineur','quiz'];
function gOrd(L){const O0=st.get('g:ord',[]),O=O0.length?O0:GUNL;const ix=g=>{const i=O.indexOf(g.id);return i<0?1e3+L.indexOf(g):i};return L.slice().sort((a,b)=>ix(a)-ix(b))}
function gOrdDraw(){const L=gOrd(GD.filter(g=>!g.soon&&!gHid(g.id))),e=$('#gordo .gorl');if(!e)return;
 e.innerHTML=L.map((g,i)=>`<li style="--a:${g.a};--b:${g.b}"><i>${g.ic}</i><b>${esc(g.n)}</b><button data-a="gMv" data-v="${g.id}:-1" aria-label="Monter ${esc(g.n)}"${i?'':' disabled'}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg></button><button data-a="gMv" data-v="${g.id}:1" aria-label="Descendre ${esc(g.n)}"${i<L.length-1?'':' disabled'}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button></li>`).join('')}
setTimeout(()=>Object.assign(act,{
 gOrd:()=>{const o=$('#gordo');if(o)o.remove();const d=document.createElement('div');d.className='sfr';d.id='gordo';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label','Ordre des jeux');
  d.innerHTML=`<div class="glass sfc gorc"><h2 style="margin:0 0 4px">Ordre des jeux</h2><p class="note" style="margin:0 0 10px">Monte ou descends chaque jeu avec les flèches.</p><ol class="gorl"></ol><div class="chrow"><button class="btn" data-a="gOrdX">Terminé</button><button class="btn alt" data-a="gOrdR">Ordre d’origine</button></div></div>`;
  document.body.appendChild(d);gOrdDraw()},
 gMv:v=>{const [id,dr]=v.split(':'),L=gOrd(GD.filter(g=>!g.soon&&!gHid(g.id))).map(g=>g.id),i=L.indexOf(id),j=i+(+dr);if(i<0||j<0||j>=L.length)return;[L[i],L[j]]=[L[j],L[i]];st.set('g:ord',L);gOrdDraw();
  const b=$(`#gordo [data-v="${id}:${dr}"]`);if(b&&!b.disabled)b.focus();if(cur===null&&typeof home==='function'){const y=scrollY;home();scrollTo(0,y)}},
 gOrdR:()=>{st.set('g:ord',[]);gOrdDraw();if(cur===null&&typeof home==='function'){const y=scrollY;home();scrollTo(0,y)}},
 gOrdX:()=>{const o=$('#gordo');if(o)o.remove()}
}));
/* jeux qui arrivent plus tard : cachés jusqu’à leur date (tout est visible en mode illimité) */
const GAV={airhockey:[2026,11,5],demenage:[2026,11,12]};
const gOpenAt=id=>{const a=GAV[id];return a?new Date(a[0],a[1],a[2]).getTime():0};
function gHid(id){return Date.now()<gOpenAt(id)&&!UNL()}
/* fête de déblocage : une seule fois par jeu, à la première visite de l’onglet Jeux après la date */
/* jeux tout juste débloqués : pastille « Nouveau » sur la tuile ; toucher la tuile lance la fête de déblocage */
function gFresh(){const seen=st.get('g:tap',[]),now=Date.now(),ids=[...new Set([...Object.keys(GAV),...Object.keys(GSTEP)])];return ids.filter(id=>now>=gOpenAt(id)&&(GSTEP[id]||0)<=gStepNow()&&ALL.some(x=>x.id===id&&!x.soon)&&!seen.includes(id))}
function gUnlockCheck(){const F=gFresh();document.querySelectorAll('.tile[data-a=open]').forEach(t=>{const id=t.dataset.v;if(!F.includes(id))return;t.classList.add('nw');t.dataset.a='gNew';if(!t.querySelector('.gnwb'))t.insertAdjacentHTML('beforeend','<em class="gnwb">Nouveau !</em>');const s=t.querySelector('small');if(s)s.textContent='Touche pour découvrir'})}
function gUnlockShow(id){
 if($('#gunl'))return;const seen=st.get('g:tap',[]),g=ALL.find(x=>x.id===id);if(!seen.includes(id))st.set('g:tap',[...seen,id]);if(!g)return;
 const d=document.createElement('div');d.id='gunl';d.className='gunl';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');d.setAttribute('aria-label','Nouveau jeu débloqué : '+g.n);
 d.innerHTML=`<div class="gunb" style="--a:${g.a};--b:${g.b}"><div class="gunr" aria-hidden="true">${'<i></i>'.repeat(12)}</div><small>Nouveau jeu débloqué !</small><div class="guni">${g.ic}</div><h2>${esc(g.n)}</h2><p>${esc(g.t||'')}</p><div class="chrow"><button class="btn" data-a="gUnlGo" data-v="${id}">Découvrir</button><button class="btn alt" data-a="gUnlX">Plus tard</button></div></div>`;
 document.body.appendChild(d);try{sfx(660,.12);setTimeout(()=>sfx(880,.12),130);setTimeout(()=>sfx(1175,.25),260);vib([15,30,15])}catch(e){}
 setTimeout(()=>{try{confetti(d.querySelector('.guni'))}catch(e){}},350)}
setTimeout(()=>Object.assign(act,{gUnlX:()=>{const e=$('#gunl');if(!e)return;e.classList.add('out');setTimeout(()=>{e.remove();if(cur===null)home()},300)},gNew:v=>gUnlockShow(v),gUnlGo:v=>{const e=$('#gunl');if(e)e.remove();act.open(v)}}));

/* jeux débloqués au fil de l’histoire (étapes du voyage) ; tout est ouvert en mode illimité */
const GSTEP={flow:0,tetris:25,brick:30,planetes:0,tournade:5,solitaire:10,phrase:15,g2048:20,quiz:40};
const gStepNow=()=>{try{return styRead().p||0}catch(e){return 0}};
/* un jeu déjà débloqué (ou déjà ouvert) le reste, même si son étape a changé */
function gLock(id){return !UNL()&&(GSTEP[id]||0)>gStepNow()&&!st.get('g:unl',[]).includes(id)&&!st.get('g:tap',[]).includes(id)}
const xLvOn=()=>xmasOn()&&(UNL()||gStepNow()>=10);
function gLockTiles(){document.querySelectorAll('.tile[data-a=open]').forEach(t=>{const id=t.dataset.v;if(!gLock(id))return;t.classList.add('lk');t.dataset.a='gLk';const s=t.querySelector('small');if(s)s.textContent='🔒 Étape '+GSTEP[id];const f=t.parentNode&&t.parentNode.querySelector('.fv');if(f)f.remove()})}
function gToast(t){let e=$('#gtoast');if(e)e.remove();e=document.createElement('div');e.id='gtoast';e.className='gtoast';e.setAttribute('role','status');e.textContent=t;document.body.appendChild(e);setTimeout(()=>{e.classList.add('out');setTimeout(()=>e.remove(),400)},2600)}
setTimeout(()=>Object.assign(act,{gLk:v=>{const g=ALL.find(x=>x.id===v),n=GSTEP[v]||0;gToast((g?g.n:'Ce jeu')+' se débloque à l’étape '+n+' de l’histoire (tu es à l’étape '+gStepNow()+').');const t=$(`.tile[data-v="${v}"]`);if(t){t.classList.remove('shk');void t.offsetWidth;t.classList.add('shk')}}}));
/* au premier lancement de cette version, les jeux déjà ouverts ne refont pas la fête */
setTimeout(()=>{try{if(!st.get('g:unl0',false)){const s0=st.get('g:unl',[]);Object.keys(GSTEP).forEach(id=>{if(!gLock(id)&&!gHid(id)&&!s0.includes(id))s0.push(id)});st.set('g:unl',s0);st.set('g:unl0',true)}}catch(e){}},0);
