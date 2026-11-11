/* ---------- Déménagement : le livre de l’histoire vécue (même livre que celui du mode Histoire) ---------- */
const DBT=['La chambre','La salle de bain','La cuisine','Le condo','La chambre des parents','Ta chambre','La salle de bain','La cuisine','Le salon','La cour'];
function demBook(){
 const g=G.find(x=>x.id==="demenage"),N0=DRM.length,ks=[...Array(N0).keys()].filter(i=>st.get(ckey('demenage')+':'+i,false)),nx=[...Array(N0).keys()].find(i=>!ks.includes(i));
 const P=[{k:'cov'},{k:'pro'},...ks.map(n=>({k:'fr',n})),nx!==undefined?{k:'lk',n:nx}:{k:'end'}];
 const hs=`<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true"><path d="M8 32 32 10l24 22" fill="none" stroke="#ffe9a0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 30v24h36V30" fill="#e8b98a" stroke="#ffe9a0" stroke-width="3" stroke-linejoin="round"/><rect x="26" y="38" width="12" height="16" rx="3" fill="#9a5f3a"/></svg>`;
 storyBook({ks,P,pg:(q,i,f)=>{
  if(q.k==='cov')return`<div class="bki">${hs}<h2>Le déménagement</h2><p>l’histoire d’une maison qui se remplit</p><p class="bkh">Fais glisser ou touche un bord pour ouvrir</p></div>`;
  if(q.k==='pro')return`<div class="bki"><span class="bke">Prologue</span><p class="bkt">${g.s}</p>${f}</div>`;
  if(q.k==='fr')return`<div class="bki"><span class="bke">Niveau ${q.n+1} · ${DBT[q.n]}</span><p class="bkt">${g.wl[q.n]}</p>${f}</div>`;
  if(q.k==='lk')return`<div class="bki"><span class="bke">Niveau ${q.n+1}</span><p class="bkt" style="margin-top:34px">Cette page s’écrira quand tu auras rangé cette pièce.</p>${f}</div>`;
  return`<div class="bki"><span class="bke">La maison est complète</span><p class="bkt" style="margin-top:34px">Tout est rangé. Bonne nuit, et bienvenue chez toi.</p>${f}</div>`}})}
