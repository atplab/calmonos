/* ---------- Échecs : la clairière ----------
   Moteur : règles complètes (roque, prise en passant, promotion, pat, nulles), notation française, IA par alpha-bêta.
   Cases 0..63 : 0 = a8, 7 = h8, 56 = a1, 63 = h1. Pièces : 1 pion, 2 cavalier, 3 fou, 4 tour, 5 dame, 6 roi ; blancs > 0, noirs < 0. */
const CHN=[],CHKG=[],CHRY=[];
(()=>{for(let s=0;s<64;s++){const r=s>>3,c=s&7,n=[],k=[],ry=[];
 for(const[dr,dc]of[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]){const R=r+dr,C=c+dc;if(R>=0&&R<8&&C>=0&&C<8)n.push(R*8+C)}
 for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const R=r+dr,C=c+dc;if(R>=0&&R<8&&C>=0&&C<8)k.push(R*8+C)}
 for(const[dr,dc]of[[-1,0],[1,0],[0,1],[0,-1],[-1,1],[-1,-1],[1,1],[1,-1]]){const a=[];let R=r+dr,C=c+dc;while(R>=0&&R<8&&C>=0&&C<8){a.push(R*8+C);R+=dr;C+=dc}ry.push(a)}
 CHN.push(n);CHKG.push(k);CHRY.push(ry)}})();
const CH0=[-4,-2,-3,-5,-6,-3,-2,-4,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,4,2,3,5,6,3,2,4];
const CHV=[0,100,320,330,500,900,0],CHRM={60:3,63:1,56:2,4:12,7:4,0:8};
const chStart=()=>({b:Int8Array.from(CH0),t:1,c:15,ep:-1,hm:0});
function chAtk(b,sq,by){
 const r=sq>>3,c=sq&7;
 if(by>0){if(r<7){if(c>0&&b[sq+7]===1)return true;if(c<7&&b[sq+9]===1)return true}}
 else if(r>0){if(c>0&&b[sq-9]===-1)return true;if(c<7&&b[sq-7]===-1)return true}
 const N=CHN[sq],K=CHKG[sq],n2=2*by,k6=6*by;
 for(let i=0;i<N.length;i++)if(b[N[i]]===n2)return true;
 for(let i=0;i<K.length;i++)if(b[K[i]]===k6)return true;
 const R=CHRY[sq];
 for(let d=0;d<8;d++){const ry=R[d];for(let i=0;i<ry.length;i++){const p=b[ry[i]];if(p){const a=p*by;if(a>0&&(a===5||(d<4?a===4:a===3)))return true;break}}}
 return false}
function chGen(S){
 const b=S.b,t=S.t,out=[],add=(f,to)=>{out.push({f,t:to,p:0})},pro=(f,to)=>{for(const p of[5,4,3,2])out.push({f,t:to,p})};
 for(let f=0;f<64;f++){const p=b[f];if(!p||(p>0)!==(t>0))continue;const a=p<0?-p:p,c=f&7;
  if(a===1){const d=t>0?-8:8,r0=t>0?6:1,pr=t>0?0:7,f1=f+d,last=(f1>>3)===pr;
   if(!b[f1]){last?pro(f,f1):add(f,f1);if((f>>3)===r0&&!b[f1+d])add(f,f1+d)}
   for(const dc of[-1,1]){if(c+dc<0||c+dc>7)continue;const to=f1+dc,q=b[to];if((q&&(q>0)!==(t>0))||(!q&&to===S.ep))last?pro(f,to):add(f,to)}}
  else if(a===2||a===6){const L=a===2?CHN[f]:CHKG[f];for(let i=0;i<L.length;i++){const q=b[L[i]];if(!q||(q>0)!==(t>0))add(f,L[i])}
   if(a===6){
    if(t>0&&f===60){
     if((S.c&1)&&!b[61]&&!b[62]&&b[63]===4&&!chAtk(b,60,-1)&&!chAtk(b,61,-1)&&!chAtk(b,62,-1))add(60,62);
     if((S.c&2)&&!b[59]&&!b[58]&&!b[57]&&b[56]===4&&!chAtk(b,60,-1)&&!chAtk(b,59,-1)&&!chAtk(b,58,-1))add(60,58)}
    else if(t<0&&f===4){
     if((S.c&4)&&!b[5]&&!b[6]&&b[7]===-4&&!chAtk(b,4,1)&&!chAtk(b,5,1)&&!chAtk(b,6,1))add(4,6);
     if((S.c&8)&&!b[3]&&!b[2]&&!b[1]&&b[0]===-4&&!chAtk(b,4,1)&&!chAtk(b,3,1)&&!chAtk(b,2,1))add(4,2)}}}
  else{const R=CHRY[f],d0=a===3?4:0,d1=a===4?4:8;
   for(let d=d0;d<d1;d++){const ry=R[d];for(let i=0;i<ry.length;i++){const q=b[ry[i]];if(!q)add(f,ry[i]);else{if((q>0)!==(t>0))add(f,ry[i]);break}}}}}
 return out}
function chMk(S,m){
 const b=S.b.slice(),f=m.f,to=m.t,p=b[f],cap=b[to],a=p<0?-p:p;let ep=-1,c=S.c,hm=S.hm+1;
 if(a===1||cap)hm=0;
 b[to]=p;b[f]=0;
 if(a===1){
  if(to===S.ep&&!cap)b[to+(p>0?8:-8)]=0;
  if((to>f?to-f:f-to)===16){const e=-p,x=to&7;if((x>0&&b[to-1]===e)||(x<7&&b[to+1]===e))ep=(f+to)/2}
  if(m.p)b[to]=p>0?m.p:-m.p}
 else if(a===6&&(to>f?to-f:f-to)===2){if(to>f){b[f+1]=b[f+3];b[f+3]=0}else{b[f-1]=b[f-4];b[f-4]=0}}
 c&=~(CHRM[f]||0)&~(CHRM[to]||0);
 return{b,t:-S.t,c,ep,hm}}
function chKing(b,t){const k=6*t;for(let i=0;i<64;i++)if(b[i]===k)return i;return -1}
function chLegal(S){const out=[],t=S.t;for(const m of chGen(S)){const n=chMk(S,m),k=chKing(n.b,t);if(k>=0&&!chAtk(n.b,k,-t))out.push(m)}return out}
const chChk=S=>chAtk(S.b,chKing(S.b,S.t),-S.t);
const chKey=S=>S.b.join('')+S.t+S.c+S.ep;
function chInsuf(b){let m=0;for(let i=0;i<64;i++){const p=b[i]<0?-b[i]:b[i];if(p===1||p===4||p===5)return false;if(p===2||p===3)m++}return m<2}
const CHF='abcdefgh',chSq=i=>CHF[i&7]+(8-(i>>3)),chIdx=s=>(8-(+s[1]))*8+CHF.indexOf(s[0]);
const chUci=m=>chSq(m.f)+chSq(m.t)+(m.p?'  nbrq'[m.p]:'');
/* notation française : R roi, D dame, T tour, F fou, C cavalier */
function chSan(S,m,lg){
 const p=Math.abs(S.b[m.f]);let s;
 if(p===6&&Math.abs(m.t-m.f)===2)s=m.t>m.f?'O-O':'O-O-O';
 else{const cap=S.b[m.t]||(p===1&&m.t===S.ep);
  if(p===1)s=(cap?CHF[m.f&7]+'x':'')+chSq(m.t)+(m.p?'='+'  CFTD'[m.p]:'');
  else{s='  CFTDR'[p];const o=lg.filter(x=>x!==m&&x.t===m.t&&Math.abs(S.b[x.f])===p);
   if(o.length){const sf=o.some(x=>(x.f&7)===(m.f&7)),sr=o.some(x=>(x.f>>3)===(m.f>>3));s+=!sf?CHF[m.f&7]:!sr?(8-(m.f>>3)):chSq(m.f)}
   s+=(cap?'x':'')+chSq(m.t)}}
 const n=chMk(S,m);if(chChk(n))s+=chLegal(n).length?'+':'#';
 return s}
/* rejoue une liste de coups (« e2e4 », « e7e8q »…) depuis le début */
function chReplay(mv){
 let S=chStart();const keys=[chKey(S)],sans=[],ms=[];
 for(const u of mv){const lg=chLegal(S),m=lg.find(x=>chUci(x)===u);if(!m)break;sans.push(chSan(S,m,lg));ms.push(m);S=chMk(S,m);keys.push(chKey(S))}
 return{S,keys,sans,ms}}
/* fin de partie par les règles : {w: 1 blancs gagnent | -1 noirs gagnent | 0 nulle, y: motif} ou null */
function chStatus(S,keys){
 if(!chLegal(S).length)return chChk(S)?{w:-S.t,y:'mat'}:{w:0,y:'pat'};
 if(chInsuf(S.b))return{w:0,y:'ins'};
 if(S.hm>=100)return{w:0,y:'50'};
 const k=keys[keys.length-1];let c=0;for(const x of keys)if(x===k)c++;
 return c>=3?{w:0,y:'rep'}:null}

/* ---------- IA ---------- */
const CHT=[null,
[0,0,0,0,0,0,0,0,50,50,50,50,50,50,50,50,10,10,20,30,30,20,10,10,5,5,10,25,25,10,5,5,0,0,0,20,20,0,0,0,5,-5,-10,0,0,-10,-5,5,5,10,10,-20,-20,10,10,5,0,0,0,0,0,0,0,0],
[-50,-40,-30,-30,-30,-30,-40,-50,-40,-20,0,0,0,0,-20,-40,-30,0,10,15,15,10,0,-30,-30,5,15,20,20,15,5,-30,-30,0,15,20,20,15,0,-30,-30,5,10,15,15,10,5,-30,-40,-20,0,5,5,0,-20,-40,-50,-40,-30,-30,-30,-30,-40,-50],
[-20,-10,-10,-10,-10,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,10,10,5,0,-10,-10,5,5,10,10,5,5,-10,-10,0,10,10,10,10,0,-10,-10,10,10,10,10,10,10,-10,-10,5,0,0,0,0,5,-10,-20,-10,-10,-10,-10,-10,-10,-20],
[0,0,0,0,0,0,0,0,5,10,10,10,10,10,10,5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,0,0,0,5,5,0,0,0],
[-20,-10,-10,-5,-5,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,5,5,5,5,0,-10,-5,0,5,5,5,5,0,-5,0,0,5,5,5,5,0,-5,-10,5,5,5,5,5,0,-10,-10,0,5,0,0,0,0,-10,-20,-10,-10,-5,-5,-10,-10,-20],
[-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-30,-40,-40,-50,-50,-40,-40,-30,-20,-30,-30,-40,-40,-30,-30,-20,-10,-20,-20,-20,-20,-20,-20,-10,20,20,0,0,0,0,20,20,20,30,10,0,0,10,30,20],
[-50,-40,-30,-20,-20,-30,-40,-50,-30,-20,-10,0,0,-10,-20,-30,-30,-10,20,30,30,20,-10,-30,-30,-10,30,40,40,30,-10,-30,-30,-10,30,40,40,30,-10,-30,-30,-10,20,30,30,20,-10,-30,-30,-30,0,0,0,0,-30,-30,-50,-30,-30,-30,-30,-30,-30,-50]];
function chEval(b){
 let s=0,np=0;
 for(let i=0;i<64;i++){const p=b[i];if(p){const a=p<0?-p:p;if(a>1&&a<6)np+=CHV[a]}}
 const end=np<2400;
 for(let i=0;i<64;i++){const p=b[i];if(!p)continue;const w=p>0,a=w?p:-p,j=w?i:i^56,v=CHV[a]+CHT[a===6&&end?7:a][j];s+=w?v:-v}
 return s}
function chOrd(S,ms){
 const b=S.b;
 for(const m of ms){const c=b[m.t],a=b[m.f]<0?-b[m.f]:b[m.f];let s=0;
  if(c)s=1000+10*CHV[c<0?-c:c]-CHV[a];else if(a===1&&m.t===S.ep)s=1100;
  if(m.p)s+=800+CHV[m.p];m.s=s}
 ms.sort((x,y)=>y.s-x.s)}
function chSearch(S,lv){
 const cf=[null,{d:1,ms:250,nz:110,full:1},{d:3,ms:900,nz:20,full:1},{d:6,ms:2000,nz:8,full:0}][lv]||{d:2,ms:400,nz:20,full:1};
 let nodes=0,stop=false;const dl=Date.now()+cf.ms;
 function q(S,a,b,d){
  nodes++;const e=chEval(S.b)*S.t;if(d<=0||e>=b)return e;if(e>a)a=e;
  const ms=chGen(S).filter(m=>S.b[m.t]||m.p||(Math.abs(S.b[m.f])===1&&m.t===S.ep));chOrd(S,ms);
  for(const m of ms){const n=chMk(S,m);if(chAtk(n.b,chKing(n.b,S.t),-S.t))continue;const v=-q(n,-b,-a,d-1);if(v>=b)return v;if(v>a)a=v}
  return a}
 function ab(S,d,a,b,ply){
  if((++nodes&1023)===0&&Date.now()>dl)stop=true;
  if(stop)return 0;if(S.hm>=100)return 0;
  if(d<=0)return q(S,a,b,4);
  const ms=chGen(S);chOrd(S,ms);let best=-1e9,any=false;
  for(const m of ms){const n=chMk(S,m);if(chAtk(n.b,chKing(n.b,S.t),-S.t))continue;any=true;
   const v=-ab(n,d-1,-b,-a,ply+1);if(stop)return 0;
   if(v>best)best=v;if(v>a)a=v;if(a>=b)break}
  if(!any)return chChk(S)?-30000+ply:0;
  return best}
 const root=chLegal(S);if(!root.length)return null;if(root.length===1)return root[0];
 chOrd(S,root);let best=root[0],sc=new Map();
 for(let d=1;d<=cf.d;d++){
  const res=[];let a=-1e9,bm=null;
  for(const m of root){const n=chMk(S,m);
   const v=-ab(n,d-1,-1e9,cf.full?1e9:-a,1);
   if(stop)break;res.push([m,v]);if(v>a){a=v;if(!cf.full)bm=m}}
  if(stop||res.length<root.length)break;
  res.forEach(([m,v])=>sc.set(m,v));
  if(cf.full){let bs=-1e9;for(const[m,v]of res){const w=v+Math.random()*cf.nz;if(w>bs){bs=w;best=m}}}else best=bm;
  root.sort((x,y)=>(sc.get(y)||0)-(sc.get(x)||0));
  if(Math.abs(sc.get(root[0]))>20000||Date.now()>dl)break}
 return best}
