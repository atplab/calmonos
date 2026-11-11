
/* ================= Déménagement 2 : onze pièces à emménager, à la manière d’Unpacking =================
   Architecture : DIT (objets dessinés) · DOK (où chaque objet est bien / acceptable) · meubles (dNew + o.zone + dStore)
   · DRM (une pièce = un niveau) · pDemen2 (le jeu : cartons, glisser-déposer, tiroirs, zoom, validation). */
Object.assign(DIT,{
 bottle:['Biberon','<rect x="11" y="10" width="10" height="18" rx="4" fill="#eef6ff" stroke="#9cc3e6"/><rect x="11.5" y="18" width="9" height="9.5" rx="3" fill="#ffe7b0"/><rect x="10" y="7" width="12" height="4" rx="1.5" fill="#7fc0ee"/><path d="M13.5 7Q16 1 18.5 7z" fill="#f2c79a"/><path d="M13 14h3M13 17h3M13 20h3" stroke="#9cc3e6" stroke-width="1"/>'],
 diapers:['Couches','<rect x="5" y="9" width="22" height="18" rx="3" fill="#bfe3ff"/><rect x="5" y="9" width="22" height="6" rx="3" fill="#e9f6ff"/><circle cx="16" cy="19.5" r="4.2" fill="#ffd36b"/><path d="M14 19q2 2 4 0" stroke="#c98a2a" stroke-width="1" fill="none"/><circle cx="14.6" cy="18" r=".6" fill="#7a4a1a"/><circle cx="17.4" cy="18" r=".6" fill="#7a4a1a"/>'],
 onesie:['Pyjama de bébé','<path d="M11 4h10l5 5-3 4-2-1v6l3 8h-6l-2-4-2 4H8l3-8v-6l-2 1-3-4z" fill="#f4b6c9"/><path d="M13 4q3 3 6 0" fill="#f8d3df"/><circle cx="16" cy="12" r="1.2" fill="#fff"/><circle cx="16" cy="16" r="1.2" fill="#fff"/><path d="M8.5 24h5M18.5 24h5" stroke="#e892ae" stroke-width="1.4"/>'],
 rattle:['Hochet','<rect x="15" y="14" width="4" height="14" rx="2" fill="#7fc0ee" transform="rotate(-35 17 21)"/><circle cx="12" cy="11" r="7" fill="#ffd36b"/><circle cx="12" cy="11" r="4.2" fill="#ff9ab8"/><circle cx="10.5" cy="9.5" r="1.4" fill="#fff" opacity=".8"/><circle cx="24.5" cy="26" r="3" fill="#ffd36b"/>'],
 coat:['Manteau','<path d="M16 3.5a2 2 0 1 1 2 2L16 7" fill="none" stroke="#8a8f9a" stroke-width="1.4"/><path d="M8.5 10 16 7l7.5 3L26 28H6z" fill="#c9734a"/><path d="M16 7v21" stroke="#9a5232" stroke-width="1.2"/><path d="M12 8.6l4 5 4-5" fill="#e09a70"/><circle cx="17.6" cy="15" r="1" fill="#f2d39a"/><circle cx="17.6" cy="20" r="1" fill="#f2d39a"/><path d="M9 19h4M19.5 19h4" stroke="#9a5232" stroke-width="1.2"/>'],
 hat:['Tuque','<path d="M7 22q0-14 9-14t9 14z" fill="#d9555f"/><path d="M11 12v8M16 9v11M21 12v8" stroke="#b8414b" stroke-width="1.2"/><rect x="5.5" y="20" width="21" height="6" rx="3" fill="#f4efe6"/><circle cx="16" cy="7" r="3.5" fill="#f4efe6"/>'],
 scarf:['Foulard','<path d="M6 8q10 6 20 0v5q-10 6-20 0z" fill="#5fae8a"/><path d="M19 12l2 15h-5l-1-14z" fill="#4f9a78"/><path d="M16.5 27v3M18.5 27v3M20.5 27v3" stroke="#4f9a78" stroke-width="1.2"/><path d="M9 10l2 3M13 11.5l1 3M23 10l-2 3" stroke="#e8f4ec" stroke-width="1.4"/>'],
 boots:['Bottes','<path d="M5 4h8v16l6 3q3 1.5 3 5H5z" fill="#7a5236"/><path d="M5 8h8" stroke="#5c3c26" stroke-width="1.4"/><path d="M14 6h7v14l5 2.6q3 1.4 3 4.4H14z" fill="#8f6242"/><path d="M14 10h7" stroke="#6a4630" stroke-width="1.4"/><rect x="4.6" y="27" width="17.6" height="2.4" rx="1" fill="#3e2a1e"/><rect x="13.6" y="26.4" width="15.8" height="2.4" rx="1" fill="#3e2a1e"/>'],
 sneakers:['Espadrilles','<path d="M3 18q0-6 6-6 3 0 5 3l6 2q9 2 9 7v2H3z" fill="#f4f4f8"/><path d="M3 24h26v3H3z" fill="#7fc0ee"/><path d="M9 14l2 3M12 15l2 3M15 16l1 2" stroke="#7fc0ee" stroke-width="1.4"/><path d="M20 19q4 1 6 3" stroke="#e86a6a" stroke-width="2" fill="none"/>'],
 umbrella:['Parapluie','<path d="M4 15q12-16 24 0q-3-2-6 0-3-2-6 0-3-2-6 0-3-2-6 0z" fill="#6f86d9"/><path d="M10 13q6-9 12 0" fill="#8fa2e8"/><path d="M16 3.5v1.5" stroke="#555" stroke-width="1.6"/><path d="M16 14v11q0 3 3 3t3-3" stroke="#6b4a35" stroke-width="1.8" fill="none" stroke-linecap="round"/>'],
 keys:['Clés','<circle cx="11" cy="12" r="6" fill="none" stroke="#e2b84a" stroke-width="3"/><path d="M15 16l10 10M21 22l3-3M24 25l2-2" stroke="#e2b84a" stroke-width="3" stroke-linecap="round"/><circle cx="21" cy="9" r="4" fill="#e86a6a"/><circle cx="21" cy="9" r="1.4" fill="#fff" opacity=".6"/>'],
 bag:['Sac à main','<path d="M11 12V9a5 5 0 0 1 10 0v3" fill="none" stroke="#7a4a32" stroke-width="2"/><path d="M6 12h20l-2 15H8z" fill="#c98a5a"/><path d="M6.4 15h19.2" stroke="#a96e42" stroke-width="1.2"/><rect x="14" y="16" width="4" height="3" rx="1" fill="#f2d39a"/>'],
 letters:['Courrier','<rect x="4" y="10" width="20" height="14" rx="1.5" fill="#f4efe6" transform="rotate(-8 14 17)"/><rect x="8" y="12" width="20" height="14" rx="1.5" fill="#fff" stroke="#d9cfbd"/><path d="M8 12l10 8 10-8" fill="none" stroke="#d9cfbd" stroke-width="1.2"/><rect x="23" y="14" width="3.5" height="4" fill="#e86a6a"/>'],
 pens:['Pot à crayons','<path d="M12 12V4l1.5-2 1.5 2v8" fill="#ffd36b"/><path d="M16.5 12V6l1.5-2 1.5 2v6" fill="#e86a6a"/><path d="M19.5 12V7.5h2.2V12" fill="#5fae8a"/><path d="M10 12h12l-1.5 16h-9z" fill="#7fc0ee"/><path d="M10.3 15h11.4" stroke="#5fa2d4" stroke-width="1.2"/>'],
 folder:['Classeur','<rect x="7" y="4" width="16" height="24" rx="1.5" fill="#5f86d9"/><rect x="21" y="4" width="3" height="24" fill="#3e5fae"/><rect x="10" y="7" width="10" height="5" rx="1" fill="#fff"/><circle cx="15" cy="21" r="2.4" fill="none" stroke="#3e5fae" stroke-width="1.4"/>'],
 notebook:['Cahier','<rect x="7" y="4" width="18" height="24" rx="2" fill="#f2b84a"/><path d="M10 4v24" stroke="#c98a2a" stroke-width="1.6"/><rect x="13" y="9" width="9" height="4" rx="1" fill="#fff8e6"/><path d="M5 8h4M5 13h4M5 18h4M5 23h4" stroke="#8a8f9a" stroke-width="1.4"/>'],
 earth:['Globe terrestre','<circle cx="16" cy="13" r="9" fill="#7fc0ee"/><path d="M11 8q3 2 2 5t3 4q1 3-1 5M19 6q-1 3 2 4t3 3" fill="none" stroke="#5fae6a" stroke-width="3" stroke-linecap="round"/><path d="M7 13a9 9 0 0 0 18 0" fill="none" stroke="#c98a5a" stroke-width="1.4"/><path d="M16 22v5M11 28h10" stroke="#8a5a36" stroke-width="2.2" stroke-linecap="round"/>'],
 scooter:['Trottinette','<path d="M22 4v20M19 4h6" stroke="#e86a6a" stroke-width="2.6" stroke-linecap="round"/><path d="M6 24h17" stroke="#555a6a" stroke-width="3" stroke-linecap="round"/><circle cx="7" cy="26" r="3" fill="#3e4352"/><circle cx="23" cy="26" r="3" fill="#3e4352"/>'],
 truck:['Camion jouet','<path d="M3 12l3-4h10l3 4" fill="#f2c24a"/><rect x="3" y="12" width="16" height="10" rx="2" fill="#ffd36b"/><path d="M19 15h5l4 4v3h-9z" fill="#e86a6a"/><rect x="21" y="16" width="3" height="3" fill="#bfe3ff"/><circle cx="8" cy="24" r="3" fill="#3e4352"/><circle cx="23" cy="24" r="3" fill="#3e4352"/>'],
 kite:['Cerf-volant','<path d="M16 2l9 10-9 12-9-12z" fill="#ff9ab8"/><path d="M16 2 25 12H16zM16 24 7 12h9z" fill="#ffc2d6"/><path d="M16 2v22M7 12h18" stroke="#fff" stroke-width="1.2"/><path d="M16 24q-3 2 0 3t0 4" stroke="#7a8896" stroke-width="1" fill="none"/>'],
 bowl:['Bols','<path d="M4 15h24q-1 10-12 10T4 15z" fill="#a9d6c8"/><ellipse cx="16" cy="15" rx="12" ry="3" fill="#cdeee4"/><path d="M8 19q8 4 16 0" stroke="#7fbfae" stroke-width="1.2" fill="none"/>'],
 spices:['Épices','<rect x="4" y="12" width="7" height="15" rx="2" fill="#e8946c"/><rect x="12.5" y="10" width="7" height="17" rx="2" fill="#5fae6a"/><rect x="21" y="13" width="7" height="14" rx="2" fill="#f2c24a"/><rect x="4" y="9" width="7" height="4" rx="1" fill="#7a5236"/><rect x="12.5" y="7" width="7" height="4" rx="1" fill="#7a5236"/><rect x="21" y="10" width="7" height="4" rx="1" fill="#7a5236"/><path d="M5.5 18h4M14 17h4M22.5 19h4" stroke="#fff" stroke-width="1.4" opacity=".7"/>'],
 board:['Planche à découper','<rect x="4" y="9" width="22" height="16" rx="4" fill="#d9a066"/><circle cx="23" cy="13" r="1.6" fill="#8a5a36"/><path d="M8 14h11M8 18h13M8 22h9" stroke="#c48a52" stroke-width="1"/>'],
 hairdryer:['Séchoir','<rect x="12" y="18" width="5" height="11" rx="2" fill="#a46ae0"/><path d="M5 9h15a6 6 0 0 1 0 12H5z" fill="#c58aff"/><circle cx="20" cy="15" r="3" fill="#ead9ff"/><path d="M2 12h3M2 15h3M2 18h3" stroke="#a46ae0" stroke-width="1.4"/>'],
 cream:['Crème','<rect x="7" y="14" width="18" height="12" rx="3" fill="#ffd3e0"/><rect x="6" y="10" width="20" height="5" rx="2" fill="#f2a6c0"/><path d="M11 20h10" stroke="#fff" stroke-width="1.6"/>'],
 toothpaste:['Dentifrice','<path d="M4 12h18l4 3v2l-4 3H4z" fill="#f4f8ff" stroke="#9cc3e6"/><path d="M8 12v8M12 12v8" stroke="#e86a6a" stroke-width="2"/><rect x="26" y="14" width="3" height="4" rx="1" fill="#7fc0ee"/>'],
 laundry:['Linge à laver','<path d="M4 24q2-8 8-8t6 4q3-6 8-3t2 9z" fill="#9cc3e6"/><path d="M8 20q4-6 10-2" fill="#f2b84a"/><path d="M14 18q6-4 10 2" fill="#e86a6a" opacity=".85"/><rect x="4" y="24" width="24" height="3" rx="1.5" fill="#7fa6c8"/>']
});
/* où ranger : c = bien rangé, a = acceptable (tout le reste : pas à sa place) */
const DOK={
 pillow:{c:['bed'],a:['sofa']},teddy:{c:['bed'],a:['wshelf','shelf','dresser','side','toybox']},lamp:{c:['side','desk'],a:['dresser','wshelf','shelf','tv','console']},
 clock:{c:['side','wshelf'],a:['desk','dresser','shelf']},books:{c:['shelf','wshelf'],a:['desk','side','dresser','coffee']},computer:{c:['desk'],a:[]},
 shirt:{c:['wardrobe'],a:[]},cshirt:{c:['wardrobe'],a:[]},dress:{c:['wardrobe'],a:[]},sweater:{c:['wardrobe','drawer'],a:[]},socks:{c:['drawer'],a:['wardrobe']},
 poster:{c:['wall'],a:[]},frame:{c:['wall'],a:['shelf','wshelf','side','dresser','console','desk']},mirror:{c:['wall'],a:[]},
 plant:{c:['wshelf','shelf','side','dresser','console','table'],a:['floor','desk','coffee','tv','counter','sink']},
 toothbrush:{c:['sink'],a:['wshelf']},toothpaste:{c:['sink'],a:['wshelf','bcab']},soap:{c:['sink','tub'],a:['wshelf']},towel:{c:['rail'],a:['hook']},
 shampoo:{c:['tub'],a:['wshelf','sink']},paper:{c:['toilet'],a:['rail','bcab']},duck:{c:['tub','toybox'],a:['wshelf','shelf','sink']},bathmat:{c:['floor'],a:[]},
 hairdryer:{c:['bcab'],a:['sink','wshelf']},cream:{c:['wshelf','sink'],a:['bcab']},perfume:{c:['dresser','wshelf','sink'],a:['side','bcab']},laundry:{c:['hamper'],a:[]},
 pot:{c:['cab','stove'],a:[]},pan:{c:['stove','cab'],a:[]},plate:{c:['ucab'],a:['cab','table']},mug:{c:['ucab','desk'],a:['counter','table','side','coffee','wshelf']},
 bowl:{c:['ucab'],a:['cab','table']},cutlery:{c:['kdrawer'],a:['table']},spatula:{c:['kdrawer'],a:['counter']},kettle:{c:['stove','counter'],a:[]},
 toaster:{c:['counter'],a:['table']},fruit:{c:['table'],a:['counter']},magnet:{c:['fridge'],a:[]},spices:{c:['wshelf','ucab'],a:['counter']},board:{c:['counter'],a:['kdrawer','cab']},
 tv:{c:['tv'],a:[]},gamepad:{c:['tv'],a:['coffee','sofa']},remote:{c:['coffee'],a:['sofa','tv','side']},book:{c:['shelf','coffee','side'],a:['wshelf','desk','sofa','bed','dresser']},
 cushion:{c:['sofa'],a:['bed']},blanket:{c:['sofa','bed'],a:[]},vase:{c:['side','wshelf'],a:['coffee','shelf','tv','console','table']},quilt:{c:['bed'],a:[]},jewel:{c:['dresser'],a:['side']},
 bottle:{c:['change'],a:['shelf','wshelf','side']},diapers:{c:['bdrawer'],a:['change','shelf']},onesie:{c:['bdrawer'],a:['change']},rattle:{c:['toybox'],a:['bed','shelf']},
 blocks:{c:['toybox'],a:['shelf','floor']},nightlight:{c:['wshelf','shelf'],a:['change','side']},horse:{c:['floor'],a:[]},
 coat:{c:['hook'],a:[]},hat:{c:['hook'],a:['bench','console']},scarf:{c:['hook'],a:['bench']},boots:{c:['shoes'],a:['floor']},sneakers:{c:['shoes'],a:['floor']},
 umbrella:{c:['ustand'],a:['hook']},keys:{c:['console'],a:['bench']},bag:{c:['hook','bench'],a:['console']},letters:{c:['console'],a:['bench']},
 pens:{c:['desk'],a:['odrawer','wshelf']},folder:{c:['files'],a:['shelf','odrawer']},notebook:{c:['odrawer'],a:['desk','shelf']},earth:{c:['wshelf','shelf'],a:['desk']},
 ball:{c:['floor'],a:['sandbox']},bucket:{c:['sandbox'],a:['floor']},shovel:{c:['sandbox'],a:['floor']},truck:{c:['sandbox'],a:['floor']},can:{c:['flowerbed'],a:['ptable','floor']},
 flowerpot:{c:['ptable','flowerbed'],a:['floor']},bike:{c:['shed'],a:['floor']},scooter:{c:['shed'],a:['floor']},kite:{c:['shed'],a:['ptable']},chair:{c:['floor'],a:[]},train:{c:['floor','sandbox'],a:[]}
};
Object.entries(DOK).forEach(([k,v])=>{if(DIT[k])DIT[k][2]=v.c});
/* taille des objets dans la pièce (px du décor) */
const DSZ={tv:34,plant:30,horse:34,bike:38,chair:32,scooter:30,coat:30,lamp:28,computer:30,mirror:28,poster:28,frame:24,umbrella:28,bathmat:30,quilt:32,blanket:30,
 toothbrush:18,soap:18,keys:18,letters:20,pens:20,rattle:20,remote:19,gamepad:22,magnet:16,cutlery:20,spatula:20,clock:22,perfume:20,jewel:22,toothpaste:20,cream:20,socks:22,nightlight:20,mug:20,spices:22,bottle:20,duck:20,earth:24,notebook:22};
const dSz=id=>DSZ[id]||26;

/* ---- meubles supplémentaires ---- */
const dMx=(p,q,t)=>[p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];
/* étagère murale : mur R (plan y=0, u suit x) ou mur L (plan x=0, u suit y) */
const dWallShelf=(o,wall,u0,u1,z,c=dWood)=>{const b=wall==='R'?o.box(u0,0,z,u1-u0,.6,.12,c):o.box(0,u0,z,.6,u1-u0,.12,c);
 const k=wall==='R'?[o.P(u0+.15,.05,z),o.P(u0+.15,.05,z-.35),o.P(u1-.15,.05,z),o.P(u1-.15,.05,z-.35)]:[o.P(.05,u0+.15,z),o.P(.05,u0+.15,z-.35),o.P(.05,u1-.15,z),o.P(.05,u1-.15,z-.35)];
 o.ln(k[0],k[1],dSh(c,.6),1.4);o.ln(k[2],k[3],dSh(c,.6),1.4);
 const top=wall==='R'?[o.P(u0,0,z+.12),o.P(u1,0,z+.12),o.P(u1,.6,z+.12),o.P(u0,.6,z+.12)]:[o.P(0,u0,z+.12),o.P(.6,u0,z+.12),o.P(.6,u1,z+.12),o.P(0,u1,z+.12)];
 o.zone('wshelf',top,dHull([...b.hull,...(wall==='R'?[o.P(u0,0,z+1.1),o.P(u1,0,z+1.1)]:[o.P(0,u0,z+1.1),o.P(0,u1,z+1.1)])]))};
/* patères : une barre et des crochets au mur */
const dHooks=(o,wall,u0,u1,z,c='#8a5a36')=>{const n=Math.max(3,Math.round((u1-u0)/.6));
 if(wall==='R'){o.pg(o.qR(u0,u1,z-.12,z+.22),c,dSh(c,.7));for(let i=0;i<n;i++){const u=u0+(i+.5)*(u1-u0)/n,a=o.P(u,.05,z),b=o.P(u,.35,z-.1);o.ln(a,b,'#d9c08a',2)}o.zone('hook',o.qR(u0-.1,u1+.1,z-1.8,z+.4),null,'c')}
 else{o.pg(o.qL(u0,u1,z-.12,z+.22),c,dSh(c,.7));for(let i=0;i<n;i++){const u=u0+(i+.5)*(u1-u0)/n,a=o.P(.05,u,z),b=o.P(.35,u,z-.1);o.ln(a,b,'#d9c08a',2)}o.zone('hook',o.qL(u0-.1,u1+.1,z-1.8,z+.4),null,'c')}};
/* banc d’entrée : assise + étagère à chaussures dessous (face R : contre le mur de gauche) */
const dBench=(o,x,y,w,d,c='#b98a5a')=>{o.box(x,y,0,w,.15,1.3,dSh(c,.85));o.box(x,y+d-.15,0,w,.15,1.3,dSh(c,.85));const lo=o.box(x,y+.15,.12,w,d-.3,.1,dSh(c,.95));
 const sh=[o.P(x+w,y+.2,.22),o.P(x+w,y+d-.2,.22),o.P(x+w,y+d-.2,.95),o.P(x+w,y+.2,.95)];o.zone('shoes',sh,dHull([...lo.hull,...sh]),'b');
 const t=o.box(x,y,1.3,w,d,.16,c);o.box(x,y,1.46,.25,d,1.4,dSh(c,.9));o.zone('bench',t.top,t.hull)};
const dConsole=(o,x,y,w,d,c='#8a5a36')=>{[[.05,.05],[w-.2,.05],[.05,d-.2],[w-.2,d-.2]].forEach(([a,b])=>o.box(x+a,y+b,0,.15,.15,1.9,dSh(c,.8)));o.box(x+.05,y+.05,.5,w-.1,d-.1,.08,dSh(c,.9));const t=o.box(x,y,1.9,w,d,.16,c);o.zone('console',t.top,t.hull)};
const dUStand=(o,x,y,c='#5f86a8')=>{o.cyl(x,y,0,.32,1.3,c);const q=o.P(x,y,1.3),rx=.32*DU*1.41;o.zone('ustand',[[q[0]-rx,q[1]-28],[q[0]+rx,q[1]-28],[q[0]+rx,q[1]+4],[q[0]-rx,q[1]+4]],[[q[0]-rx-2,q[1]-34],[q[0]+rx+2,q[1]-34],[q[0]+rx+2,q[1]+1.3*DZ+8],[q[0]-rx-2,q[1]+1.3*DZ+8]],'b')};
/* table à langer : matelas sur le dessus, deux tiroirs */
const dChanging=(o,x,y,w,d,c='#f4efe6',face='L')=>{const h=2.0,b=o.box(x,y,0,w,d,h,c);const m=o.box(x+.1,y+.1,h,w-.2,d-.2,.18,'#bfe6da',{t:'#d4f2e8'});o.zone('change',m.top,dHull([...b.hull,...m.hull]));
 dStore(o,x,y,w,d,face,c,[{t:'drawer',k:'bdrawer',a:.05,b:.95,z0:h/2+.05,z1:h-.08,cap:2},{t:'drawer',k:'bdrawer',a:.05,b:.95,z0:.1,z1:h/2-.05,cap:2}])};
const dToyBox=(o,x,y,w,d,c='#7fc0ee')=>{const b=o.box(x,y,0,w,d,1.0,c);const T=[o.P(x+.1,y+.1,1.0),o.P(x+w-.1,y+.1,1.0),o.P(x+w-.1,y+d-.1,1.0),o.P(x+.1,y+d-.1,1.0)];o.pg(T,dSh(c,.55));
 const s=o.P(x+w*.5,y+d,.5);o.s+=`<circle cx="${s[0].toFixed(1)}" cy="${s[1].toFixed(1)}" r="5" fill="#ffd36b"/><circle cx="${(s[0]+9).toFixed(1)}" cy="${(s[1]+4).toFixed(1)}" r="3.4" fill="#ff9ab8"/>`;o.zone('toybox',T,b.hull)};
const dRocker=(o,x,y,c='#e8c9a0')=>{o.s+=`<path d="M${o.P(x,y,0)[0].toFixed(1)} ${o.P(x,y,0)[1].toFixed(1)}Q${o.P(x+.6,y+.6,-.3)[0].toFixed(1)} ${o.P(x+.6,y+.6,-.3)[1].toFixed(1)} ${o.P(x+1.2,y+1.2,0)[0].toFixed(1)} ${o.P(x+1.2,y+1.2,0)[1].toFixed(1)}" stroke="${dSh(c,.6)}" stroke-width="2.4" fill="none"/>`;o.box(x+.1,y+.1,.2,1,1,.7,dSh(c,.9));o.box(x+.1,y+.1,.9,1,1,.22,c);o.box(x+.1,y+.1,1.12,.22,1,1.3,dSh(c,.95))};
const dFiling=(o,x,y,w,d,c='#9aa6b8',face='R')=>{const h=2.7,b=o.box(x,y,0,w,d,h,c);o.zone('side',b.top,b.hull);dStore(o,x,y,w,d,face,c,[2,1,0].map(k=>({t:'drawer',k:'files',a:.06,b:.94,z0:k*h/3+.08,z1:(k+1)*h/3-.08,cap:2})))};
/* bureau avec caisson à tiroirs (contre le mur de droite) */
const dDeskO=(o,x,y,w,d,c=dWood)=>{o.box(x+.05,y,0,.22,d,2.0,dSh(c,.8));const pd=o.box(x+w-1.1,y,0,1.05,d,2.0,dSh(c,.92));const t=o.box(x,y,2.0,w,d,.2,c);
 o.zone('desk',t.top,dHull([...t.hull,o.P(x+.05,y+d,0)]));dStore(o,x+w-1.1,y,1.05,d,'L',dSh(c,.92),[{t:'drawer',k:'odrawer',a:.06,b:.94,z0:1.05,z1:1.92,cap:2},{t:'drawer',k:'odrawer',a:.06,b:.94,z0:.1,z1:.97,cap:2}])};
/* armoires hautes de cuisine qui s’ouvrent */
const dUpperC=(o,x0,x1,c='#e8e4da')=>{const b=o.box(x0,0,3.2,x1-x0,.8,1.4,c);const n=Math.max(1,Math.round((x1-x0)/.95));
 dStore(o,x0,0,x1-x0,.8,'L',c,[...Array(n)].map((_,i)=>({t:'door',k:'ucab',a:i/n+.02,b:(i+1)/n-.02,z0:3.28,z1:4.52,hg:i%2?'r':'l',cap:2})))};
/* comptoir avec façade au choix (face L : mur de droite ; face R : mur de gauche) */
const dCounterF=(o,x,y,w,d,face='L',c='#e8e4da',base='#7a8896')=>{const h=1.9,b=o.box(x,y,0,w,d,h,base,{t:c});o.box(x-.03,y-.03,h,w+.06,d+.06,.18,c);const top=[o.P(x,y,h+.18),o.P(x+w,y,h+.18),o.P(x+w,y+d,h+.18),o.P(x,y+d,h+.18)];o.zone('counter',top,b.hull);
 const L=face==='L'?w:d;dStore(o,x,y,w,d,face,base,[{t:'drawer',k:'kdrawer',a:.04,b:.96,z0:h-.5,z1:h-.06,cap:2},...(L>=1.7?[{t:'door',k:'cab',a:.04,b:.5,z0:.1,z1:h-.6,hg:'l',cap:2},{t:'door',k:'cab',a:.5,b:.96,z0:.1,z1:h-.6,hg:'r',cap:2}]:[{t:'door',k:'cab',a:.04,b:.96,z0:.1,z1:h-.6,hg:'l',cap:2}])])};
/* meuble-lavabo avec armoire dessous (contre le mur de gauche) */
const dVanityC=(o,x,y,w,d,c,top='#f1f2f7')=>{dVanity(o,x,y,w,d,c,top);dStore(o,x,y,w,d,'R',c,[{t:'door',k:'bcab',a:.05,b:.5,z0:.12,z1:1.65,hg:'l',cap:2},{t:'door',k:'bcab',a:.5,b:.95,z0:.12,z1:1.65,hg:'r',cap:2}])};
const dHamper=(o,x,y,c='#d9c08a')=>{const b=o.box(x,y,0,.9,.9,1.3,c);for(let k=1;k<4;k++){const t=k/4;o.ln(dMx(b.L[0],b.L[3],t),dMx(b.L[1],b.L[2],t),dSh(c,.7),1);o.ln(dMx(b.R[0],b.R[3],t),dMx(b.R[1],b.R[2],t),dSh(c,.6),1)}o.pg([o.P(x+.08,y+.08,1.3),o.P(x+.82,y+.08,1.3),o.P(x+.82,y+.82,1.3),o.P(x+.08,y+.82,1.3)],dSh(c,.5));o.zone('hamper',b.top,b.hull)};
/* petits détails de décor (non interactifs) */
const dBase=(o,c)=>{o.ln(o.P(0,0,.12),o.P(0,o.D,.12),dSh(c,.8),2.2);o.ln(o.P(0,0,.12),o.P(o.W,0,.12),dSh(c,.8),2.2)};
const dArtR=(o,x0,x1,z0,z1,cs)=>{o.pg(o.qR(x0-.1,x1+.1,z0-.1,z1+.1),'#f4efe6','#c9bfae');o.pg(o.qR(x0,x1,z0,z1),cs[0]);o.pg([o.P(x0,0,z0),o.P(x1,0,z0),o.P(x1,0,z0+(z1-z0)*.45),o.P((x0+x1)/2,0,z0+(z1-z0)*.7),o.P(x0,0,z0+(z1-z0)*.4)],cs[1]);const s=o.P(x0+(x1-x0)*.72,0,z0+(z1-z0)*.75);o.s+=`<circle cx="${s[0].toFixed(1)}" cy="${s[1].toFixed(1)}" r="2.4" fill="${cs[2]}"/>`};
const dArtL=(o,y0,y1,z0,z1,cs)=>{o.pg(o.qL(y0-.1,y1+.1,z0-.1,z1+.1),'#f4efe6','#c9bfae');o.pg(o.qL(y0,y1,z0,z1),cs[0]);o.pg([o.P(0,y0,z0),o.P(0,y1,z0),o.P(0,y1,z0+(z1-z0)*.4),o.P(0,(y0+y1)/2,z0+(z1-z0)*.7),o.P(0,y0,z0+(z1-z0)*.45)],cs[1]);const s=o.P(0,y0+(y1-y0)*.3,z0+(z1-z0)*.75);o.s+=`<circle cx="${s[0].toFixed(1)}" cy="${s[1].toFixed(1)}" r="2.4" fill="${cs[2]}"/>`};
const dPotPlant=(o,x,y,s=1,c='#d98c63')=>{o.cyl(x,y,0,.32*s,.7*s,c);o.ch[o.ch.length-1].h=2.2*s;const q=o.P(x,y,.7*s);o.s+=`<g transform="translate(${q[0].toFixed(1)} ${q[1].toFixed(1)}) scale(${s})"><path d="M0 0C-12 -6-14-22-4-30C-6-18 0-10 0 0Z" fill="#5fae6a"/><path d="M0 0C12 -6 16-20 6-30C8-18 2-10 0 0Z" fill="#4f9a5a"/><path d="M0 0C-3-12 0-24 2-36C6-24 4-10 0 0Z" fill="#6fc07a"/></g>`};
const dCurtR=(o,x0,x1,z0,z1,c)=>{[[x0-.45,x0+.05],[x1-.05,x1+.45]].forEach(([a,b])=>{o.pg(o.qR(a,b,z0-.6,z1+.25),c,dSh(c,.8));o.ln(o.P((a+b)/2,0,z0-.5),o.P((a+b)/2,0,z1+.2),dSh(c,.85),1)});o.ln(o.P(x0-.6,.04,z1+.35),o.P(x1+.6,.04,z1+.35),'#8a6a4a',2)};
const dCurtL=(o,y0,y1,z0,z1,c)=>{[[y0-.45,y0+.05],[y1-.05,y1+.45]].forEach(([a,b])=>{o.pg(o.qL(a,b,z0-.6,z1+.25),c,dSh(c,.8));o.ln(o.P(0,(a+b)/2,z0-.5),o.P(0,(a+b)/2,z1+.2),dSh(c,.85),1)});o.ln(o.P(.04,y0-.6,z1+.35),o.P(.04,y1+.6,z1+.35),'#8a6a4a',2)};
const dLampF=(o,x,y)=>{o.box(x+.15,y+.15,0,.3,.3,.08,'#7a6a5a');o.box(x+.27,y+.27,.08,.06,.06,3.1,'#8a7a6a',{noL:0});o.cyl(x+.3,y+.3,3.0,.38,.6,'#ffe2a8')};
const dClockW=(o,wall,u,z)=>{const q=wall==='R'?o.P(u,0,z):o.P(0,u,z);o.s+=`<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="7" fill="#f4efe6" stroke="#8a6a4a" stroke-width="1.6"/><path d="M${q[0].toFixed(1)} ${(q[1]-4.5).toFixed(1)}V${q[1].toFixed(1)}h3.4" stroke="#5a4a3a" stroke-width="1.2" fill="none" stroke-linecap="round"/>`};
const dSlide=(o,x,y)=>{o.box(x,y,0,.15,.15,2.6,'#e86a6a');o.box(x+.85,y,0,.15,.15,2.6,'#e86a6a');o.box(x,y,2.4,1,.9,.15,'#ffd36b');o.pg([o.P(x,y+.9,2.45),o.P(x+1,y+.9,2.45),o.P(x+1,y+3,0),o.P(x,y+3,0)],'#7fc0ee','#5fa2d4')};

/* douche vitrée dans un coin (contre les deux murs) : bac = zone « tub » */
const dShower=(o,x,y,w,d)=>{const b=o.box(x,y,0,w,d,.22,'#f4f6fa');const T=[o.P(x+.12,y+.12,.22),o.P(x+w-.12,y+.12,.22),o.P(x+w-.12,y+d-.12,.22),o.P(x+.12,y+d-.12,.22)];o.pg(T,'#dfe9f2','#b8c6d4');
 for(let i=1;i<6;i++){o.ln(o.P(x+.12+i*(w-.24)/6,y+.12,.23),o.P(x+.12+i*(w-.24)/6,y+d-.12,.23),'#c9d6e2',.8)}
 const hd=o.P(x+.15,y+d*.5,3.9);o.ln(o.P(.04,y+d*.5,3.1),o.P(.04,y+d*.5,3.95),'#aab4c4',2);o.s+=`<ellipse cx="${(hd[0]+5).toFixed(1)}" cy="${(hd[1]+1).toFixed(1)}" rx="5" ry="2.4" fill="#aab4c4"/>`;
 o.zone('tub',T,dHull([...b.hull,o.P(x,y+d,2.2),o.P(x+w,y,2.2),o.P(x+w,y+d,2.2)]));
 const gl=(a)=>{o.pg(a,'rgba(190,225,245,.32)','#9fb3c4',1.2)};
 gl([o.P(x,y+d,.22),o.P(x+w,y+d,.22),o.P(x+w,y+d,3.9),o.P(x,y+d,3.9)]);gl([o.P(x+w,y,.22),o.P(x+w,y+d,.22),o.P(x+w,y+d,3.9),o.P(x+w,y,3.9)]);
 o.ln(o.P(x+w,y+d,.22),o.P(x+w,y+d,3.9),'#9fb3c4',2.2);o.ln(o.P(x,y+d,3.9),o.P(x+w,y+d,3.9),'#9fb3c4',1.6);o.ln(o.P(x+w,y,3.9),o.P(x+w,y+d,3.9),'#9fb3c4',1.6);
 o.ln(o.P(x+w*.55,y+d,1.6),o.P(x+w*.55,y+d,2.4),'#e8eef4',2.4);o.ch.push({at:o.s.length,x,y,z:0,w,d,h:3.9})};
/* meuble-lavabo double contre le mur de droite (façade L) */
const dVanityL=(o,x,y,w,d,c,top='#f4f4f6')=>{const b=o.box(x,y,0,w,d,1.9,c,{t:top});[.28,.72].forEach(t=>{const q=o.P(x+w*t,y+d*.5,1.9);o.s+=`<ellipse cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" rx="9" ry="4.4" fill="#dfe7ee" stroke="#b8c6d4"/>`;const f=o.P(x+w*t,y+.12,1.9);o.s+=`<rect x="${(f[0]-1.5).toFixed(1)}" y="${(f[1]-8).toFixed(1)}" width="3" height="8" rx="1.2" fill="#aab4c4"/>`});
 o.zone('sink',[o.P(x,y,1.9),o.P(x+w,y,1.9),o.P(x+w,y+d,1.9),o.P(x,y+d,1.9)],b.hull);
 dStore(o,x,y,w,d,'L',c,[{t:'door',k:'bcab',a:.03,b:.26,z0:.12,z1:1.7,hg:'l',cap:1},{t:'door',k:'bcab',a:.26,b:.5,z0:.12,z1:1.7,hg:'r',cap:1},{t:'door',k:'bcab',a:.5,b:.74,z0:.12,z1:1.7,hg:'l',cap:1},{t:'door',k:'bcab',a:.74,b:.97,z0:.12,z1:1.7,hg:'r',cap:1}])};
/* balançoire contre la clôture de gauche */
const dSwing=(o,x,y,len)=>{const H=2.6,c='#e86a6a';o.ch.push({at:o.s.length,x,y,z:0,w:1,d:len,h:H});
 [[y],[y+len]].forEach(([yy])=>{o.ln(o.P(x,yy,0),o.P(x+.5,yy,H),dSh(c,.8),4);o.ln(o.P(x+1,yy,0),o.P(x+.5,yy,H),c,4)});
 o.box(x+.44,y-.05,H-.08,.12,len+.1,.14,'#c9523f');
 [y+len*.3,y+len*.7].forEach(yy=>{o.ln(o.P(x+.5,yy-.2,H-.05),o.P(x+.5,yy-.2,.75),'#8a8f9a',1.2);o.ln(o.P(x+.5,yy+.2,H-.05),o.P(x+.5,yy+.2,.75),'#8a8f9a',1.2);o.box(x+.3,yy-.28,.62,.4,.56,.1,'#ffd36b')});
 o.ln(o.P(x,y,0),o.P(x,y,0),c,1)};

/* la petite cour : clôture, potager surélevé, cabanon qui s’ouvre, table de pique-nique, carré de sable */
const dYard2=o=>{
 for(let k=.35;k<7;k+=.5){o.ln(o.P(0,k,.05),o.P(0,k,2.0),'#b9a782',1.2);o.ln(o.P(k,0,.05),o.P(k,0,2.0),'#b9a782',1.2)}
 o.ln(o.P(0,0,1.75),o.P(0,7,1.75),'#a8966f',2);o.ln(o.P(0,0,1.75),o.P(7,0,1.75),'#a8966f',2);
 [[2.6,1.8],[3.3,2.5],[3.9,3.3],[4.3,4.2],[4.5,5.2],[4.6,6.2]].forEach(([x,y])=>{o.pg([o.P(x,y),o.P(x+.5,y),o.P(x+.5,y+.42),o.P(x,y+.42)],'#d9d2c2','#bdb4a0',.8)});
 const R=()=>Math.random();for(let i=0;i<26;i++){const x=.3+((i*37)%63)/10,y=.3+((i*53)%65)/10,q=o.P(x,y);o.s+=`<path d="M${q[0].toFixed(1)} ${q[1].toFixed(1)}l-2-5M${q[0].toFixed(1)} ${q[1].toFixed(1)}l0-6M${q[0].toFixed(1)} ${q[1].toFixed(1)}l2-5" stroke="#6fb46a" stroke-width="1.2" stroke-linecap="round"/>`}
 /* potager surélevé le long de la clôture du fond */
 const fb=o.box(.4,.15,0,3.2,1.1,.6,'#8a5a3a',{t:'#7a4e32'});const fl=[o.P(.5,.25,.6),o.P(3.5,.25,.6),o.P(3.5,1.15,.6),o.P(.5,1.15,.6)];o.pg(fl,'#5a3d2a');
 [[.9,.5],[1.4,.9],[1.9,.5],[2.4,.9],[2.9,.55],[3.2,.9]].forEach(([a,b],k)=>{const q=o.P(a,b,.6);o.s+=`<path d="M${q[0].toFixed(1)} ${q[1].toFixed(1)}v-7" stroke="#4f9a5a" stroke-width="1.4"/><circle cx="${q[0].toFixed(1)}" cy="${(q[1]-8).toFixed(1)}" r="3.2" fill="${['#f08aa8','#f4c24a','#fff','#a98fe0','#ff9a5a','#f08aa8'][k]}"/>`});
 o.zone('flowerbed',fl,fb.hull);
 /* cabanon de jardin (deux portes qui s’ouvrent) */
 const sx=4.3,sw=2.5,sd=1.7,sh=2.5,sb=o.box(sx,0,0,sw,sd,sh,'#c9a06a');for(let k=1;k<9;k++){const u=sx+k*sw/9;o.ln(o.P(u,sd,.05),o.P(u,sd,sh),'#b08a58',1)}
 o.pg([o.P(sx-.15,-.1,sh),o.P(sx+sw+.15,-.1,sh),o.P(sx+sw+.15,sd*.5,sh+.9),o.P(sx-.15,sd*.5,sh+.9)],'#8a4a3a','#6a3a2a');o.pg([o.P(sx-.15,sd*.5,sh+.9),o.P(sx+sw+.15,sd*.5,sh+.9),o.P(sx+sw+.15,sd+.15,sh),o.P(sx-.15,sd+.15,sh)],'#a85a46','#6a3a2a');
 o.pg([o.P(sx+sw,-.1,sh),o.P(sx+sw,sd+.15,sh),o.P(sx+sw+.15,sd+.15,sh),o.P(sx+sw+.15,sd*.5,sh+.9),o.P(sx+sw+.15,-.1,sh)],'#7a3e30');
 const wq=o.P(sx+sw,sd*.5,1.7);o.s+=`<rect x="${(wq[0]-4).toFixed(1)}" y="${(wq[1]-9).toFixed(1)}" width="8" height="8" fill="#bfe3ff" stroke="#8a6a4a" transform="skewY(-26.6)" transform-origin="${wq[0].toFixed(1)} ${wq[1].toFixed(1)}"/>`;
 dStore(o,sx,0,sw,sd,'L','#c9a06a',[{t:'door',k:'shed',a:.1,b:.5,z0:.05,z1:2.1,hg:'l',cap:2},{t:'door',k:'shed',a:.5,b:.9,z0:.05,z1:2.1,hg:'r',cap:2}]);
 /* table de pique-nique avec ses bancs */
 o.box(.7,3.0,0,1.8,.35,.8,'#a8784a');dTable(o,.7,3.5,1.8,1.3,1.5,'#b98a5a','ptable');o.box(.7,5.0,0,1.8,.35,.8,'#a8784a');
 /* carré de sable */
 const sbx=o.box(4.9,4.5,0,1.9,1.9,.5,'#c9a36a');const sd2=[o.P(5.05,4.65,.5),o.P(6.65,4.65,.5),o.P(6.65,6.25,.5),o.P(5.05,6.25,.5)];o.pg(sd2,'#f0d9a0');o.zone('sandbox',sd2,sbx.hull)};
