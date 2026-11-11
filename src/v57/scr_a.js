/* ---------- Scrabble entre amis : moteur (sans DOM) ----------
   Plateau 15×15 en chaîne de 225 caractères : '.' vide, lettre majuscule = tuile, minuscule = joker joué comme cette lettre.
   Chevalet et sac : chaînes de lettres, '?' = joker. Une partie = un document sc/<id1>_<id2> (identifiants triés). */
const SCP={A:1,E:1,I:1,L:1,N:1,O:1,R:1,S:1,T:1,U:1,D:2,G:2,M:2,B:3,C:3,P:3,F:4,H:4,V:4,J:8,Q:8,K:10,W:10,X:10,Y:10,Z:10,'?':0},
 SCQ={A:9,B:2,C:2,D:3,E:15,F:2,G:2,H:2,I:8,J:1,K:1,L:5,M:3,N:6,O:6,P:2,Q:1,R:6,S:6,T:6,U:6,V:2,W:1,X:1,Y:1,Z:1,'?':2};
/* cases bonus : l = lettre ×2, L = lettre ×3, m = mot ×2, M = mot ×3 */
const SCB=(()=>{const a=Array(225).fill('.'),put=(l,c)=>l.forEach(([r,k])=>{a[r*15+k]=c});
 const tw=[],dw=[[7,7]];
 [0,7,14].forEach(r=>[0,7,14].forEach(c=>{if(r!==7||c!==7)tw.push([r,c])}));
 [1,2,3,4,10,11,12,13].forEach(r=>{dw.push([r,r],[r,14-r])});
 put([[0,3],[0,11],[2,6],[2,8],[3,0],[3,7],[3,14],[6,2],[6,6],[6,8],[6,12],[7,3],[7,11],[8,2],[8,6],[8,8],[8,12],[11,0],[11,7],[11,14],[12,6],[12,8],[14,3],[14,11]],'l');
 put([[1,5],[1,9],[5,1],[5,5],[5,9],[5,13],[9,1],[9,5],[9,9],[9,13],[13,5],[13,9]],'L');
 put(dw,'m');put(tw,'M');return a})();
const scrShuf=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const scrVal=s=>[...s].reduce((n,c)=>n+(SCP[c]||0),0);
/* mot formé par la case i dans la direction d (1 = horizontal, 15 = vertical), plateau B + lettres posées « at » */
function scrRun(B,at,i,d){
 const f=x=>at.has(x)||B[x]!=='.';let a=i,b=i;
 if(d===1){while(a%15>0&&f(a-1))a--;while(b%15<14&&f(b+1))b++}
 else{while(a-15>=0&&f(a-15))a-=15;while(b+15<225&&f(b+15))b+=15}
 const c=[];for(let x=a;x<=b;x+=d)c.push(x);return c}
/* Vérifie et compte un coup. pl = [[case, lettre A–Z, joker?], …]. has(mot) = présence au dictionnaire (facultatif).
   Renvoie { e: message d’erreur ou '', words: [{w, p}], bad: [mots inconnus], total, ok } */
function scrEval(B,pl,has){
 const R={e:'',words:[],bad:[],total:0,ok:false};
 if(!pl.length){R.e='Pose au moins une lettre.';return R}
 const at=new Map();
 for(const [i,c,j] of pl){if(!(i>=0&&i<225)||B[i]!=='.'||at.has(i)||!/^[A-Z]$/.test(c)){R.e='Cette case est déjà occupée.';return R}at.set(i,[c,!!j])}
 const rs=pl.map(p=>(p[0]/15)|0),cs=pl.map(p=>p[0]%15),sr=rs.every(r=>r===rs[0]),sc=cs.every(c=>c===cs[0]);
 if(!sr&&!sc){R.e='Place tes lettres sur une seule ligne, ou une seule colonne.';return R}
 const f=x=>at.has(x)||B[x]!=='.',first=!/[A-Za-z]/.test(B);
 if(pl.length>1){const d=sr?1:15,ix=pl.map(p=>p[0]).sort((a,b)=>a-b);for(let x=ix[0];x<=ix[ix.length-1];x+=d)if(!f(x)){R.e='Les lettres doivent se suivre, sans trou.';return R}}
 const W=[],seen=new Set(),add=(i,d)=>{const c=scrRun(B,at,i,d);if(c.length<2)return;const k=c[0]+':'+d;if(seen.has(k))return;seen.add(k);W.push({c,d})};
 if(pl.length>1){const d=sr?1:15;add(pl[0][0],d);pl.forEach(p=>add(p[0],d===1?15:1))}
 else{add(pl[0][0],1);add(pl[0][0],15)}
 if(first){if(!at.has(112)){R.e='Le premier mot passe par l’étoile, au centre.';return R}if(pl.length<2){R.e='Le premier mot compte au moins deux lettres.';return R}}
 else if(!W.some(w=>w.c.some(x=>!at.has(x)))){R.e='Ton mot doit toucher une lettre déjà posée.';return R}
 let tot=0;
 for(const w of W){
  let s=0,m=1,str='';
  for(const x of w.c){const n=at.get(x),ch=n?n[0]:B[x].toUpperCase(),jk=n?n[1]:B[x]!==B[x].toUpperCase(),v=jk?0:(SCP[ch]||0);str+=ch;
   if(n){const p=SCB[x];s+=p==='l'?v*2:p==='L'?v*3:v;if(p==='m')m*=2;else if(p==='M')m*=3}else s+=v}
  tot+=s*m;R.words.push({w:str,p:s*m});if(has&&!has(str))R.bad.push(str)}
 if(pl.length===7)tot+=50;
 R.words.sort((a,b)=>b.w.length-a.w.length);
 R.total=tot;R.ok=!R.bad.length;return R}
/* nouvelle partie : celui qui la lance commence */
function scrNew(me,fid,pv){
 const bag=[];Object.keys(SCQ).forEach(c=>{for(let i=0;i<SCQ[c];i++)bag.push(c)});scrShuf(bag);
 const p=[me,fid].sort(),cr=p.indexOf(me),r=[bag.splice(0,7).join(''),bag.splice(0,7).join('')];
 return{v:1,id:Math.random().toString(36).slice(2,10),p,cr,n:0,t:cr,b:'.'.repeat(225),g:bag.join(''),r,s:[0,0],ps:0,h:[],lm:[],e:0,w:-1,rs:-1,pv:pv||null,at:Date.now()}}
/* un document inconnu ou abîmé est ignoré */
function scrClean(x){
 if(!x||typeof x!=='object'||!Array.isArray(x.p)||x.p.length!==2||!x.p.every(s=>typeof s==='string'&&SOK.test(s)))return null;
 const ok=(s,re)=>typeof s==='string'&&re.test(s),ar=(a,f)=>Array.isArray(a)&&a.length===2&&a.every(f);
 if(!ok(x.id,/^[a-z0-9]{1,16}$/)||!ok(x.b,/^[.A-Za-z]{225}$/)||!ok(x.g,/^[A-Z?]{0,110}$/)||!ar(x.r,s=>ok(s,/^[A-Z?]{0,7}$/))||!ar(x.s,n=>Number.isFinite(n)&&Math.abs(n)<5000))return null;
 const q=(v,a,b)=>Math.max(a,Math.min(b,Math.floor(+v)||0)),pv=x.pv&&typeof x.pv==='object'&&ok(x.pv.id,/^[a-z0-9]{1,16}$/)?{id:x.pv.id,w:q(x.pv.w,-1,1),rs:q(x.pv.rs,-1,1),n:q(x.pv.n,0,9999)}:null;
 return{v:1,id:x.id,p:x.p.slice(),cr:q(x.cr,0,1),n:q(x.n,0,9999),t:q(x.t,0,1),b:x.b,g:x.g,r:x.r.slice(),s:x.s.map(Math.round),ps:q(x.ps,0,9),
  h:(Array.isArray(x.h)?x.h:[]).filter(s=>ok(s,/^[01]\|[A-Z~\-x]{1,15}\|-?\d{1,4}$/)).slice(-30),lm:(Array.isArray(x.lm)?x.lm:[]).filter(i=>Number.isInteger(i)&&i>=0&&i<225).slice(0,7),
  e:x.e?1:0,w:q(x.w,-1,1),rs:q(x.rs,-1,1),pv,at:+x.at||0}}
/* fin de partie : le premier à vider son chevalet (sac vide) gagne la valeur de celui de l’autre ; sinon chacun perd la valeur du sien */
function scrFinish(T,out){
 if(out>=0){const o=1-out,v=scrVal(T.r[o]);T.s[out]+=v;T.s[o]-=v}
 else{T.s[0]-=scrVal(T.r[0]);T.s[1]-=scrVal(T.r[1])}
 T.e=1;T.w=T.s[0]>T.s[1]?0:T.s[1]>T.s[0]?1:-1}
/* le joueur i pose pl (déjà vérifié par scrEval) : renvoie le nouvel état */
function scrPlay(S,i,pl,ev){
 const T=JSON.parse(JSON.stringify(S)),b=T.b.split('');
 pl.forEach(([k,c,j])=>{b[k]=j?c.toLowerCase():c});T.b=b.join('');
 const r=T.r[i].split('');pl.forEach(([k,c,j])=>{const q=r.indexOf(j?'?':c);if(q>=0)r.splice(q,1)});
 const nd=Math.min(7-r.length,T.g.length);T.r[i]=r.concat(T.g.slice(0,nd).split('')).join('');T.g=T.g.slice(nd);
 T.s[i]+=ev.total;T.ps=0;T.n++;T.lm=pl.map(p=>p[0]);T.h=T.h.concat(i+'|'+ev.words[0].w+'|'+ev.total).slice(-30);T.t=1-i;
 if(!T.r[i]&&!T.g)scrFinish(T,i);
 return T}
function scrPass(S,i){
 const T=JSON.parse(JSON.stringify(S));T.n++;T.ps++;T.lm=[];T.h=T.h.concat(i+'|-|0').slice(-30);T.t=1-i;
 if(T.ps>=4)scrFinish(T,-1);return T}
/* échange : sel = positions des lettres à rendre au sac (il faut au moins 7 lettres dans le sac) */
function scrSwap(S,i,sel){
 if(S.g.length<7||!sel.length)return null;
 const T=JSON.parse(JSON.stringify(S)),r=T.r[i].split(''),back=[];
 [...new Set(sel)].sort((a,b)=>b-a).forEach(k=>{if(k>=0&&k<r.length)back.push(r.splice(k,1)[0])});
 if(!back.length)return null;
 const bag=T.g.split('');scrShuf(bag);const nw=bag.splice(0,back.length);bag.push(...back);scrShuf(bag);
 T.r[i]=r.concat(nw).join('');T.g=bag.join('');T.n++;T.ps++;T.lm=[];T.h=T.h.concat(i+'|~|0').slice(-30);T.t=1-i;
 if(T.ps>=4)scrFinish(T,-1);return T}
function scrResign(S,i){
 const T=JSON.parse(JSON.stringify(S));T.n++;T.lm=[];T.h=T.h.concat(i+'|x|0').slice(-30);T.e=1;T.rs=i;T.w=1-i;return T}
/* flocons de fin de partie pour le joueur i : 10 au gagnant, 2 au perdant, 6 chacun en cas d’égalité */
const scrReward=(w,i)=>w<0?6:w===i?10:2;
/* dictionnaire : codé par préfixes communs puis compressé (gzip), décompressé au premier besoin */
let scrDic=null,scrDicP=null;
function scrLoad(){
 if(scrDicP)return scrDicP;
 return scrDicP=(async()=>{
  const bin=atob(SCRD),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  const t=await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('gzip'))).text(),S=new Set();let p='';
  for(const l of t.split('\n')){if(!l)continue;p=p.slice(0,l.charCodeAt(0)-48)+l.slice(1);S.add(p)}
  return scrDic=S})().catch(()=>{scrDic=false;return false})}
const scrHas=w=>scrDic?scrDic.has(w):true;
