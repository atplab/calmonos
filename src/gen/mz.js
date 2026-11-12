const h=require('fs').readFileSync('/mnt/user-data/outputs/nuit-de-neige-2.html','utf8');
const cut=(a,b)=>{const i=h.indexOf(a);return h.slice(i,h.indexOf(b,i))};
eval(cut('const rng=n=>{','\n').replace('const rng','var rng'));
eval(cut('const mzO=','const mzN=').replace('const mzO','var mzO'));
eval(cut('const mzN=','\n').replace('const mzN','var mzN'));
let src=cut('function mzBuild(l){','\nfunction ');src=src.replace('(l>=30?l-10:l)','l');eval(src.replace('function mzBuild','var mzBuild=function'));
var MZS={},MZB={},MZP={},MZK={},MZC={};
const out={S:[],B:[],P:[],K:[]};
for(let k=0;k<20;k++){const l=30+k,S=[11,24+Math.floor(k/7)],B=9+Math.floor(k/7),P=+(0.45-k*0.003).toFixed(3);MZS[l]=S;MZB[l]=B;MZP[l]=P;let best=-1,bk=0;
 for(let K=0;K<3000;K++){MZK[l]=K;delete MZC[l];const M=mzBuild(l);if(M.len>best){best=M.len;bk=K}}
 out.S.push(S);out.B.push(B);out.P.push(P);out.K.push(bk);console.error(l,S,bk,best)}
console.log(JSON.stringify(out));
