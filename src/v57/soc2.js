/* ---------- Social : mon profil, photo de profil ----------
   Profil : av = { k: 'p' (photo réduite en JPEG) | 'e' (personnage) | '' (initiale), v, t }, la dernière modification gagne. */
const SOAV=['🦊','🐻','🦉','🐧','⛄','🐰','🦌','🐱','🐶','🐟','🐙','🐢','🌙','⭐','❄️','🌲','🍄','🦋','🐳','🧸'];
function socAv(id){
 const M=st.get('soc:me',null),p=id===SO.uid?M:SO.P[id],a=p&&p.av,nm=(p&&p.name)||'?';
 let h=0;for(const c of id)h=(h*31+c.charCodeAt(0))%360;
 if(a&&a.k==='p')return`<span class="fr-av ph" aria-hidden="true"><img src="${a.v}" alt=""></span>`;
 if(a&&a.k==='e')return`<span class="fr-av em" style="--h:${h}" aria-hidden="true">${a.v}</span>`;
 return`<span class="fr-av" style="--h:${h}" aria-hidden="true">${esc(([...nm][0]||'?').toUpperCase())}</span>`}
/* mon propre profil, avec les données du moment */
const socSelf=M=>Object.assign(socMerge(M,null),{g:Object.assign(socProg(),{t:Date.now()}),w:socWord(),q:socAq()});
function socAvEd(M){
 const a=M.av&&M.av.k?M.av:null;
 return`<div class="sy-h">Photo de profil</div><div class="pf-ed"><div class="pf-big">${socAv(SO.uid)}</div><div class="pf-eb"><label class="btn alt" for="soc-ph" role="button">Choisir une photo</label><input type="file" id="soc-ph" accept="image/*" hidden>${a?'<button class="lnk" data-a="socAvX">Revenir à l’initiale</button>':''}</div></div><p class="note" style="margin:12px 0 8px">Ou choisis un personnage :</p><div class="pf-em" role="group" aria-label="Personnages">${SOAV.map(e=>`<button class="pf-e${a&&a.k==='e'&&a.v===e?' on':''}" data-a="socAvE" data-v="${e}" aria-pressed="${!!(a&&a.k==='e'&&a.v===e)}" aria-label="Personnage ${e}">${e}</button>`).join('')}</div>${SO.ms?`<p class="m${SO.mse?' err':''}" role="status">${esc(SO.ms)}</p>`:''}`}
function socSetAv(k,v){
 const M=st.get('soc:me',null);if(!M||!SO.can)return;
 M.av={k,v,t:Math.max(Date.now(),((M.av&&M.av.t)||0)+1)};st.set('soc:me',M);
 SO.ms='';SO.mse=false;SO.h='';socLater();socRefresh()}
/* photo choisie : recadrée au carré, réduite à 96 px, JPEG léger */
async function socPhoto(inp){
 const f=inp.files&&inp.files[0];inp.value='';if(!f)return;
 try{
  let im=null;try{im=await createImageBitmap(f)}catch(e){}
  if(!im)im=await new Promise((ok,ko)=>{const i=new Image(),u=URL.createObjectURL(f);i.onload=()=>{URL.revokeObjectURL(u);ok(i)};i.onerror=ko;i.src=u});
  const w=im.width||im.naturalWidth,h=im.height||im.naturalHeight,s=Math.min(w,h),c=document.createElement('canvas');c.width=c.height=96;
  const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,96,96);x.drawImage(im,(w-s)/2,(h-s)/2,s,s,0,0,96,96);
  let q=.78,d=c.toDataURL('image/jpeg',q);while(d.length>9000&&q>.3){q-=.12;d=c.toDataURL('image/jpeg',q)}
  if(!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]{20,14000}$/.test(d))throw 0;
  socSetAv('p',d)
 }catch(e){SO.ms='Cette image n’a pas pu être utilisée : essaie une autre photo.';SO.mse=true;SO.h='';socRefresh()}}
document.addEventListener('change',e=>{if(e.target&&e.target.id==='soc-ph')socPhoto(e.target)});
