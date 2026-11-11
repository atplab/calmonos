/* ---------- Histoire de Noël : « Un noël pour Zeni » ----------
   Les niveaux de Noël donnent des boules de Noël (au lieu de poussière d’étoile) ; 10 boules = 1 sapin (au lieu du fragment d’étoile).
   1 sapin = 1 étape ; 20 étapes ; un bout d’histoire toutes les 2 étapes = 10 chapitres. Se choisit en haut de l’écran Histoire (après l’étape 3 du voyage). */
const XCH=['La veille de Noël','La vitrine','Le banc sous la neige','La nuit la plus longue','La petite lumière','Le sapin tordu','Le petit pain chaud','L’horloge de la place','Minuit','Le plus beau cadeau','Le matin blanc','La boulangerie','Le sapin de tout le monde','La dernière nuit de l’année','Une année à vivre'];
const XPRO='C’est la veille de Noël. Il neige doucement sur la ville et, partout, des fenêtres s’allument. Zeni, le petit bonhomme, n’a pas de fenêtre. Pas de maison, pas de table, personne qui l’attende. Il marche, les mains dans ses manches, et regarde passer les autres avec leurs paquets. Pour avancer, il lui faut des sapins : dix boules de Noël en font un, et chaque niveau de Noël en fait tomber quelques-unes.';
const XSTORY={
2:'Les rues sentent la cannelle et les marrons chauds. Des enfants courent en tirant leurs parents par la manche, des guirlandes clignotent aux balcons. Zeni longe les murs pour ne gêner personne. Chaque pas qu’il fait résonne un peu plus fort que le précédent : ce soir, la ville est pleine, et lui est tout seul.',
4:'Au détour d’une rue, une fenêtre éclairée. Autour d’une grande table, une famille rit, passe les plats, se dispute la dernière papillote. Zeni pose son front contre la vitre froide. Il y a une chaise de trop, là-dedans, mais ce n’est pas pour lui. Sa gorge se serre, et la buée de son souffle efface la scène.',
6:'Il finit par s’asseoir sur un banc, la neige lui montant aux genoux. Pas de maison, pas de cadeau, pas de nom sur aucune étiquette. « À quoi bon continuer à marcher ? » murmure-t-il. Noël lui semble une fête pour les autres, un grand spectacle dont il n’a pas le billet. Il n’a jamais été aussi désespéré, ni aussi fatigué d’espérer.',
8:'La nuit s’allonge. Zeni compte ce qu’il a perdu : les matins où il attendait d’aller mieux, les soirs où il attendait d’être prêt, les jours qu’il a laissés passer, bien emballés, sans jamais les ouvrir. « Combien en ai-je gâché ? » Plus il compte, plus son sac est lourd. C’est le moment le plus sombre du voyage, et pourtant, tout au fond de lui, quelque chose frémit.',
10:'Au bout d’une ruelle, une guirlande oubliée sur une branche. Toutes ses ampoules sont éteintes, sauf une : une toute petite lumière rouge, têtue, qui clignote dans le vent. Elle ne demande rien à personne. Elle brille, c’est tout. Zeni la regarde longtemps. Quelque chose de tiède se pose sur ses épaules, et il se lève, sans trop savoir pourquoi.',
12:'Sur un terrain vague, un sapin de travers, trop maigre pour qu’on l’ait jamais choisi. Personne ne l’a décoré, et pourtant il est là, vert sous la neige, tourné vers le ciel. Zeni lui accroche sa première boule. « Tu n’as pas besoin qu’on te regarde pour être un sapin », dit-il, et il comprend que la phrase lui était aussi un peu destinée.',
14:'Une boulangère baisse son rideau de fer. Elle voit Zeni, ne pose aucune question et lui glisse dans la main un petit pain encore brûlant : « Joyeux Noël. » C’est tout. Zeni mange, assis sur le trottoir, et la chaleur descend jusqu’à ses orteils. Il y a des cadeaux qui ne s’emballent pas : un geste, un sourire, un matin qui sent bon le pain.',
16:'Sur la place, la grande horloge approche de minuit. Zeni la regarde tourner. Chaque jour qui passe est un cadeau, pense-t-il, qu’on déballe ou qu’on laisse dans son papier. Il en a laissé tant sans les ouvrir ! Mais celui d’aujourd’hui est encore là, entier, avec ses flocons et son petit pain chaud. Il décide de ne plus rien remettre à plus tard.',
18:'Les cloches sonnent. Zeni se met à courir, les bras grands ouverts, il dessine un ange dans la neige, glisse sur les pavés gelés, rit tout seul, puis rit plus fort. Il n’a ni maison ni invité, mais il a ce soir, tout entier, et pour la première fois depuis longtemps il n’en laisse pas une miette. Il est vivant, et ça se voit à ses joues rouges.',
20:'En haut de la colline, il retrouve le sapin tordu, que le vent a rempli de neige scintillante. Zeni y accroche sa dernière boule. Il sait maintenant que le plus beau cadeau n’était ni une maison ni quelqu’un pour l’attendre : c’était d’être là, de vivre pleinement chaque jour, sans regretter aucun de ceux qui passent. Autour de lui, les fenêtres brillent. Demain, peut-être, l’une d’elles s’ouvrira. Mais ce soir, il est déjà comblé. Joyeux Noël, Zeni.',
22:'Le lendemain, la ville dort sous une neige toute neuve. Zeni se réveille sur son banc, un peu transi mais étrangement léger. Pour la première fois, il ne compte pas ce qui lui manque : il compte les flocons sur sa manche, les petites traces d’oiseaux, la fumée qui monte des cheminées. Le jour est neuf, et il est à lui.',
24:'Il retourne voir la boulangère, rien que pour lui dire merci. Elle lui tend un tablier : « J’ai besoin de bras pour les fêtes. » Zeni pétrit, rit, se brûle un doigt, recommence. Le soir venu, il a de la farine jusqu’aux oreilles et le cœur tout plein. Il n’a rien attendu : il a simplement dit oui.',
26:'Avec les enfants du quartier, il décore le sapin tordu du terrain vague. Chacun apporte quelque chose : un ruban, un bouchon brillant, une étoile en papier. Le sapin n’a jamais été aussi beau, ni aussi bancal. Zeni comprend que la joie se partage comme les biscuits : plus on en donne, plus il en reste.',
28:'La veille du Nouvel An, la ville compte à rebours. Zeni n’a toujours pas de maison, mais il connaît maintenant des prénoms, des sourires, une porte où frapper. Sur un bout de papier, il écrit tout ce qu’il a vécu de beau depuis Noël, et la liste déborde de la feuille.',
30:'Minuit sonne et des feux d’artifice s’ouvrent au-dessus du fleuve. Zeni ne fait pas de vœu pour plus tard : il promet seulement de vivre chaque jour pleinement, les lumineux comme les gris, sans en regretter un seul. Quelqu’un lui prend la main, puis un autre. Une nouvelle année commence, et Zeni l’ouvre comme on ouvre un cadeau.'
};
const XR=3;let xFr=0;
const xmAll=()=>{try{return sxOn()}catch(e){return false}};
const sxOk=Y=>xmasOn()&&(Y.p>=10||UNL());
const sxOn=()=>st.get('sty:s','main')==='xm'&&sxOk(styRead());
const xDust=y=>UNL()?1e6:(y.xe||0)-(y.xp||0)*XDU;
const xGain=(n=1)=>{const y=styRead();y.xe=(y.xe||0)+Math.max(1,n|0);styWrite(y)};
const xFragH=n=>`<small>Chapitre ${n/2} · ${XCH[n/2-1]}</small><p class="sfq">${XSTORY[n]}</p>`;
/* le chemin : une rue qui serpente de bas en haut, 21 étapes (0 à 20) */
let XG=null;
function xGeo(){
 if(XG)return XG;const H=XR*SH+SPRE,NXY=[],pts=[],nodeIx=[],S=12;
 for(let i=0;i<=XMX;i++){const t=i/XMX;NXY.push([195+Math.sin(t*Math.PI*4.4+.5)*105*(1-.12*t),(H-175)-(H-175-300)*t])}
 const cr=(a,b,c,d,t)=>.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t);
 for(let i=0;i<XMX;i++){const p0=NXY[Math.max(i-1,0)],p1=NXY[i],p2=NXY[i+1],p3=NXY[Math.min(i+2,XMX)];nodeIx[i]=pts.length;for(let k=0;k<S;k++){const t=k/S;pts.push([cr(p0[0],p1[0],p2[0],p3[0],t),cr(p0[1],p1[1],p2[1],p3[1],t)])}}
 nodeIx[XMX]=pts.length;pts.push(NXY[XMX]);return XG={H,NXY,pts,nodeIx};
}
function xMapSVG(Y,m){
 const n=m==='n',G=xGeo(),{H,NXY,pts,nodeIx}=G,P=Y.xp||0,rn=i=>{const s=Math.sin(i*127.1+311.7)*43758.5453;return s-Math.floor(s)};
 SGY={pts,nodeIx,NXY,vb0:0,R:XR,cur:[NXY[P][0],NXY[P][1]]};
 const sk=n?['#5a3563','#2b2655','#141840','#0c0f2e']:['#fff2d8','#efdcea','#cbd6ec','#a9b6d6'],snow=n?'#b9c4ee':'#ffffff',snow2=n?'#8f9ddb':'#dbe7f8';
 const xAt=y=>{for(let i=0;i<XMX;i++){const a=NXY[i],b=NXY[i+1];if(y<=a[1]&&y>=b[1])return a[0]+(b[0]-a[0])*(a[1]-y)/(a[1]-b[1])}return 195};
 let s=`<defs><linearGradient id="xsk${m}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sk[0]}"/><stop offset=".38" stop-color="${sk[1]}"/><stop offset=".72" stop-color="${sk[2]}"/><stop offset="1" stop-color="${sk[3]}"/></linearGradient><radialGradient id="xgl${m}"><stop offset="0" stop-color="#ffd27a" stop-opacity="${n?.55:.5}"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs><rect width="390" height="${H}" fill="url(#xsk${m})"/><rect y="${H-1}" width="390" height="520" fill="${sk[3]}"/><ellipse cx="195" cy="${H+60}" rx="300" ry="90" fill="${snow2}" opacity=".6"/><circle cx="${NXY[XMX][0]}" cy="${NXY[XMX][1]-60}" r="340" fill="url(#xgl${m})"/>`;
 if(n){for(let i=0;i<110;i++){const y=rn(i+.3)*H*.7;s+=`<circle cx="${(rn(i)*390).toFixed(0)}" cy="${y.toFixed(0)}" r="${(.8+rn(i+9)*1.5).toFixed(1)}" fill="#fff" opacity="${(.45+rn(i+5)*.5).toFixed(2)}"/>`}s+=`<circle cx="318" cy="150" r="60" fill="#fff6d8" opacity=".12"/><circle cx="318" cy="150" r="30" fill="#fff6d8"/>`}
 else{s+=`<circle cx="316" cy="150" r="26" fill="#fff8dc" opacity=".9"/>`;for(let i=0;i<9;i++)s+=CHK.cloud(rn(i)*390,200+i*210+rn(i+3)*60,50+rn(i+7)*40,'#fff',.55)}
 for(let i=0,y=420;y<H;i++,y+=250){const l=i%2===0;s+=`<ellipse cx="${l?-30:420}" cy="${y}" rx="190" ry="70" fill="${snow2}" opacity=".55"/><ellipse cx="${l?-10:400}" cy="${y+20}" rx="150" ry="52" fill="${snow}" opacity=".75"/>`}
 const d=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('');
 s+=sRibbon(d,{p:n?['#aab6ea','#7684c8','#cfd8f8']:['#ffffff','#cfe0f5','#f6faff']},n);
 if(P>0)s+=`<path d="${pts.slice(0,nodeIx[P]+1).map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('')}" fill="none" stroke="${n?'#ffd86b':'#ffc83d'}" stroke-width="5.5" stroke-dasharray="0.1 12" stroke-linecap="round"/>`;
 /* décor posé le long de la rue : plus bas = devant */
 const it=[];
 for(let k=0,y=H-110;y>120;k++,y-=62+rn(k)*34){const px=xAt(y),sd=rn(k+2)<.5?-1:1;let x=px+sd*(105+rn(k+4)*55);if(x<18||x>372)x=px-sd*(105+rn(k+4)*55);x=Math.max(16,Math.min(374,x));const sz=82+rn(k+6)*52;it.push({y,h:CHK.pine(x,y,sz,n?'#143a3a':'#2f6d5e',n?'#1c4a46':'#3d8470',1)})}
 for(let k=0,y=H-330;y>300;k++,y-=300){const px=xAt(y),sd=k%2?-1:1;let x=px+sd*(120+rn(k+11)*20);x=Math.max(46,Math.min(344,x));const w=64+rn(k+13)*18;it.push({y:y+4,h:CHK.chalet(x,y,w,{body:n?'#4b3a6a':'#c79a78',roof:n?'#2a2a55':'#8a5a6a',lit:'#ffd36b'})})}
 for(let k=0,y=H-250;y>200;k++,y-=190){const px=xAt(y),sd=k%2?1:-1,x=Math.max(14,Math.min(376,px+sd*58));it.push({y,h:CHK.lamp(x,y,74)})}
 it.sort((a,b)=>a.y-b.y);s+=it.map(q=>q.h).join('');
 /* le grand sapin tout en haut, décoré */
 {const [tx,ty]=NXY[XMX],c=['#e8434f','#f2b632','#3b9be0','#ffffff','#e8434f','#f2b632'];let b='';for(let i=0;i<18;i++){const lv=i%3,t=.2+rn(i+20)*.5,yy=-12-lv*31.2-52.8*t,hw=(30-lv*6.6)*(1-t)*.8;b+=`<circle cx="${((rn(i+40)*2-1)*hw).toFixed(1)}" cy="${yy.toFixed(1)}" r="4.2" fill="${c[i%6]}"/>`}
  s+=`<g transform="translate(${tx} ${ty+12}) scale(2.1)">${CHK.pine(0,0,120,n?'#1a4a42':'#2a6a56',n?'#235a50':'#37806a',1)}${b}<polygon points="${sStar(0,-132,11,5)}" fill="#ffd45a" stroke="#ffe9a0" stroke-width="2.4" stroke-linejoin="round"/><circle cx="0" cy="-132" r="26" fill="#ffd45a" opacity=".25"/></g>`}
 /* le départ : un banc */
 {const [bx,by]=NXY[0];s+=`<g><ellipse cx="${bx}" cy="${by+6}" rx="34" ry="8" fill="#000" opacity=".15"/><rect x="${bx-30}" y="${by-26}" width="60" height="6" rx="3" fill="#8a5a3a"/><rect x="${bx-30}" y="${by-14}" width="60" height="7" rx="3" fill="#a06a42"/><path d="M${bx-24} ${by-7}v12M${bx+24} ${by-7}v12" stroke="#4a3220" stroke-width="3"/><path d="M${bx-30} ${by-26}Q${bx} ${by-34} ${bx+30} ${by-26}" fill="${snow}"/></g>`}
 /* les étapes : des boules de Noël */
 const COL=['#e8434f','#f2b632','#3b9be0','#3fb36b','#c25be0'];
 for(let i=0;i<=XMX;i++){const [x,y]=NXY[i],done=i<=P,cur=i===P,ch=i>0&&i%2===0,r=ch?17:13,cy=y-r-8,col=done?COL[i%5]:(n?'#4d5690':'#aab4d4');
  s+=`<g><ellipse cx="${x}" cy="${y+3}" rx="${r+6}" ry="5" fill="#000" opacity=".16"/>${cur?`<circle cx="${x}" cy="${cy}" r="${r+17}" fill="#fff3b0" opacity="${n?.5:.42}" class="spulse"/>`:''}${ch?`<circle cx="${x}" cy="${cy}" r="${r+8}" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="0.1 6.4" stroke-linecap="round" opacity=".95"/>`:''}<path d="M${x} ${cy-r-1}v-6" stroke="#caa648" stroke-width="2"/><rect x="${x-5}" y="${cy-r-6}" width="10" height="7" rx="2" fill="#e3c25a"/><circle cx="${x}" cy="${cy}" r="${r}" fill="${col}" stroke="${done?'#fff':(n?'#7e8bd0':'#8f9bc6')}" stroke-width="2.2" stroke-opacity=".7"/>${done?`<path d="M${x-r+1} ${cy+2}Q${x} ${cy+r*.55} ${x+r-1} ${cy+2}" fill="none" stroke="#fff" stroke-width="2.4" opacity=".55"/>`:''}<ellipse cx="${x-r*.34}" cy="${cy-r*.4}" rx="${r*.3}" ry="${r*.18}" fill="#fff" opacity=".6" transform="rotate(-30 ${x-r*.34} ${cy-r*.4})"/>${sPill(x,y+5,i?i:'Départ',done,i?22:50,m)}</g>`;
  if(ch){const t=done?XCH[i/2-1]:'Chapitre '+i/2,w=Math.round(t.length*6.1+18),sd=x<195?1:-1,x0=sd>0?x+r+12:x-r-12-w;s+=`<g><rect x="${x0}" y="${cy-9}" width="${w}" height="18" rx="9" fill="${n?'#161a4a':'#fff'}" opacity="${n?.82:.93}"/><text x="${x0+w/2}" y="${cy+4}" text-anchor="middle" font-size="10" font-weight="700" fill="${done?(n?'#ffd86b':'#9a6200'):(n?'#aab6f0':'#6a74a6')}">${t}</text></g>`}}
 s+='';
 return`<svg id="${n?'smapn':'smap'}" class="${n?'smn':'smd'}" viewBox="0 0 390 ${H}" style="overflow:visible"${n?' aria-hidden="true"':` role="img" aria-label="Carte de Noël : étape ${P} sur ${XMX}"`}>${s}</svg>`;
}
function xHud(Y){
 const p=Y.xp||0;
 return`<header class="top shud"><div class="shc" data-a="sstory" role="button" tabindex="0" aria-label="Changer d’histoire"><h1>Histoire</h1><small>Un noël pour Zeni · étape ${p} / ${XMX} ▾</small><span class="sty-bar"><b style="width:${(p/XMX*100).toFixed(1)}%"></b></span></div><div class="sht"><div class="chip" title="Flocons">❄ ${FLX()}</div>${ntBell()}<button class="shb" data-a="sbook" aria-label="Relire l’histoire"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5z"/><path d="M5 20.5A2.5 2.5 0 0 0 7.5 23H19v-5"/><path d="M9 8h6"/></svg></button></div></header>`;
}
function xBar(Y){
 const d=xDust(Y),end=(Y.xp||0)>=XMX,fr=Math.floor(d/XDU),rm=d%XDU,
  pips=`<span class="orb xm" aria-hidden="true"><i>🎄</i>${UNL()?'':`<span class="ring">${Array.from({length:rm},(_,i)=>`<u class="on" style="--a:${i*360/rm}deg"></u>`).join('')}</span>`}</span>`;
 return`<div class="sbar" id="sbar"><div class="sbi"><span class="sdr">${pips}<b role="img" aria-label="${UNL()?'sapins illimités':fr+' sapin'+(fr>1?'s':'')+', '+rm+' boule'+(rm>1?'s':'')+' de Noël sur '+XDU+' pour le suivant'}">${UNL()?'∞':fr}<em>${UNL()?'':fr>1?'sapins':'sapin'}</em></b></span>${end?'<small>Joyeux Noël</small>':''}</div><button class="btn${!end&&d<XDU?' low':''}" data-a="sgo" ${end||sBusy?'disabled':''}>Avancer</button></div>`;
}
function xGo(){
 if(sBusy)return;const Y=styRead();mt='m';
 if((Y.xp||0)>=XMX)return sMsg('Joyeux Noël, Zeni.');
 if(xDust(Y)<XDU){const q=XDU-xDust(Y)%XDU;return sMsg('Il faut un sapin (10 boules de Noël) : encore '+q+' boule'+(q>1?'s':'')+'. Termine des niveaux de Noël dans les jeux.')}
 sBusy=true;const a=Y.xp||0;Y.xp=a+1;styWrite(Y);
 const b=$('#sbar button');if(b)b.disabled=true;
 sWalk(a,Y.xp,()=>xArrive(Y.xp));
}
/* arrivée sur l’étape n : +1 ❄ ; toutes les 2 étapes, un chapitre et +5 ❄ (+20 ❄ à la fin) */
function xArrive(n){
 sBusy=false;const ch=n%2===0,g=1+(ch?(n===XMX?19:4):0);
 fl+=g;st.set('fl',fl);
 if(!$('#smap')){if(ch)xFr=n;return}
 sfx(ch?784:660,.5);vib([20,40,20]);
 dayScreen();
 const ul={10:'Les décorations de Noël sont débloquées dans la boutique de l’aquarium.',20:'Le Poisson Père Noël t’attend dans la boutique de l’aquarium.',30:'Le fond « Nuit de Noël » est débloqué pour l’aquarium.'}[n];
 if(ch)sOv(xFragH(n)+`<p class="sfr-g">+${g} ❄</p>`+(ul?`<p class="sfr-g">🎁 ${ul}</p>`:''));
 else{mt='m';sMsg('+1 ❄ · étape '+n)}
}
/* le choix de l’histoire, en touchant l’en-tête */
act.sstory=()=>{
 const Y=styRead(),X=sxOn(),ok=sxOk(Y);
 sOv(`<small>Choisir l’histoire</small><div class="sch"><button class="sck${X?'':' on'}" data-a="spick" data-v="main"><b>Le voyage du petit bonhomme</b><small>${CHP[sCh(Y.p)].t} · étape ${Y.p} / ${SMX}</small></button><button class="sck${X?' on':''}" data-a="spick" data-v="xm"${ok?'':' disabled'}><b>🎄 Un noël pour Zeni</b><small>${ok?'Étape '+(Y.xp||0)+' / '+XMX:!xmasOn()?'🔒 Disponible le 1er décembre':'Se débloque à l’étape 10 du voyage (tu es à l’étape '+Y.p+')'}</small></button></div>`,'Fermer');
};
act.spick=v=>{if(v==='xm'&&!sxOk(styRead()))return;st.set('sty:s',v==='xm'?'xm':'main');dayScreen()};
/* le livre de Noël : dix chapitres */
const xVig=c=>{const t=c/(XMX/2-1),a=scMix('#1b2150','#8a5070',t),b=scMix('#2a2f70','#e8a868',t),id='xv'+c;let p='';for(let i=0;i<14;i++)p+=`<circle cx="${(Math.sin(i*91.7)*.5+.5)*300|0}" cy="${(Math.sin(i*37.3)*.5+.5)*70|0}" r="1.3" fill="#fff" opacity=".8"/>`;
 return`<svg class="bkv" viewBox="0 0 300 96" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="300" height="96" rx="14" fill="url(#${id})"/>${p}<ellipse cx="150" cy="104" rx="190" ry="30" fill="#f4f8ff"/><g>${CHK.pine(70,92,64,'#1d4a44','#2a6a5c',1)}${CHK.pine(235,94,76,'#1d4a44','#2a6a5c',1)}${CHK.pine(160,96,48,'#1d4a44','#2a6a5c',1)}</g><circle cx="${70+t*160}" cy="${60-t*10}" r="${3+t*5}" fill="#ffd45a" opacity="${.35+t*.65}"/></svg>`};
function xBookS(){
 const Y=styRead(),ks=[];for(let n=2;n<=(Y.xp||0);n+=2)ks.push(n);const nx=ks.length<XMX/2?(ks.length+1)*2:0,
  P=[{k:'cov'},{k:'pro'},...ks.map(n=>({k:'fr',n})),nx?{k:'lk',n:nx}:{k:'end'}];
 return{ks,P,tab:'daily',bk:bk('day'),pg:(q,i,f)=>{
  if(q.k==='cov')return`<div class="bki"><svg viewBox="-32 -34 64 68" width="64" height="68" aria-hidden="true"><path d="M0 -30L-20 -4H-9L-24 18H-6V28H6V18H24L9 -4H20Z" fill="#2f8a62" stroke="#bfe9cf" stroke-width="2.4" stroke-linejoin="round"/><circle cx="-6" cy="2" r="3.4" fill="#e8434f"/><circle cx="8" cy="12" r="3.4" fill="#f2b632"/><polygon points="${sStar(0,-32,7,3.2)}" fill="#ffd45a"/></svg><h2>Un noël pour Zeni</h2><p>quinze chapitres, de Noël au Nouvel An</p><p class="bkh">Fais glisser ou touche un bord pour ouvrir</p></div>`;
  if(q.k==='pro')return`<div class="bki"><span class="bke">Prologue</span>${xVig(0)}<p class="bkt">${XPRO}</p>${f}</div>`;
  if(q.k==='fr')return`<div class="bki"><span class="bke">Chapitre ${q.n/2} · ${XCH[q.n/2-1]}</span>${xVig(q.n/2-1)}<p class="bkt">${XSTORY[q.n]}</p>${f}</div>`;
  if(q.k==='lk')return`<div class="bki"><span class="bke">Chapitre ${q.n/2}</span><p class="bkt" style="margin-top:34px">Cette page s’écrira plus loin dans la nuit, quand Zeni y sera arrivé.</p>${f}</div>`;
  return`<div class="bki"><span class="bke">Joyeux Noël</span><p class="bkt" style="margin-top:34px">Bonne nuit, Zeni. Chaque jour est un cadeau : celui-ci, tu l’as ouvert tout entier.</p>${f}</div>`}}}
