
/* ---------- Cuisine : le Burger des Étoiles (1 à 10), le Hot-dog de la Lune (11 à 20) et le Sushi des Vagues (21 à 30) ----------
   Des petits personnages, cousins de Zeni, viennent commander au comptoir. On compose leur plat ingrédient par ingrédient,
   on cuit la viande ou la saucisse sur le grill, puis on les sert. Pas de chrono : seuls les gestes font patienter les clients. */
const CUN=30;
const kzRng=n=>{let s=n>>>0;return()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}};
/* ingrédients : k = rôle (b pain, p à griller, t garniture, s accompagnement) */
const KZI={
 bb:{n:'pain blanc',k:'b'},bn:{n:'pain brun',k:'b'},vi:{n:'viande',k:'p'},cr:{n:'croquette de poulet',k:'p'},
 la:{n:'laitue',k:'t'},to:{n:'tomate',k:'t'},fr:{n:'fromage',k:'t'},ke:{n:'ketchup',k:'t'},co:{n:'cornichons',k:'t'},ba:{n:'bacon',k:'t'},
 ph:{n:'pain à hot-dog',k:'b'},pb:{n:'pain brioché',k:'b'},sa:{n:'saucisse',k:'p'},sv:{n:'saucisse végé',k:'p'},
 mo:{n:'moutarde',k:'t'},of:{n:'oignons frits',k:'t'},fx:{n:'fromage râpé',k:'t'},re:{n:'relish',k:'t'},
 ni:{n:'riz à sushi',k:'b'},mk:{n:'feuille d’algue',k:'b'},sm:{n:'saumon',k:'p'},th:{n:'thon',k:'p'},cv:{n:'crevette',k:'p'},
 wa:{n:'wasabi',k:'t'},av:{n:'avocat',k:'t'},oe:{n:'œufs de poisson',k:'t'},se:{n:'sésame',k:'t'},
 fries:{n:'frites',k:'s'},drink:{n:'boisson',k:'s'}
};
/* ce qui se débloque à chaque niveau (cumulatif dans chaque restaurant) */
const KZU=[['bb','vi'],['ke'],['la'],['to'],['fr'],['bn'],['cr'],['co'],['ba'],['fries'],
 ['ph','sa'],['ke'],['mo'],['of'],['fries'],['fx'],['pb'],['sv'],['re'],['drink'],
 ['ni','sm'],['wa'],['mk'],['th'],['fries'],['av'],['cv'],['oe'],['se'],['drink']];
const KZL=[ /* les clients : des cousins de Zeni */
 {n:'Pipo',c1:'#ffe9f2',c2:'#f29ac0',an:'heart',ac:'bow',ac2:'#ff6f9f'},
 {n:'Lumi',c1:'#e9fbff',c2:'#7fcde8',an:'moon',ac:'scarf',ac2:'#ffcf5a'},
 {n:'Tika',c1:'#efffe6',c2:'#8fd47a',an:'leaf',ac:'hat',ac2:'#5a8a3a'},
 {n:'Mio',c1:'#fff6df',c2:'#f2bf6a',an:'drop',ac:'glasses',ac2:'#6a4a8a'},
 {n:'Bulle',c1:'#f1ecff',c2:'#a99cf0',an:'flower',ac:'scarf',ac2:'#ff8fa8'},
 {n:'Noisette',c1:'#fff0e4',c2:'#d99a6a',an:'none',ac:'hat',ac2:'#a8452e'},
 {n:'Plume',c1:'#ffffff',c2:'#c8d2e8',an:'heart',ac:'glasses',ac2:'#3a6ab8'},
 {n:'Gazou',c1:'#fffbe0',c2:'#e8d45a',an:'leaf',ac:'bow',ac2:'#6aa8ff'},
 {n:'Nini',c1:'#ffe8e4',c2:'#ff9a8a',an:'moon',ac:'hat',ac2:'#3a4a8a'},
 {n:'Coco',c1:'#e6fff7',c2:'#6ad0b0',an:'flower',ac:'glasses',ac2:'#a84a6a'}
];
/* ---------- dessins ---------- */
function kzGuy(L,mood,id){
 const ey='stroke="#4a4290" stroke-width="1.9" fill="none" stroke-linecap="round"',g='kzb'+id;
 const an={heart:`<path d="M1 -38Q4 -45 3 -50" stroke="${L.c2}" stroke-width="2" fill="none"/><path d="M3 -50c-2-4-8-2-6 2l6 5 6-5c2-4-4-6-6-2z" fill="#ff7a9f"/>`,
  moon:`<path d="M1 -38Q5 -45 4 -51" stroke="${L.c2}" stroke-width="2" fill="none"/><path d="M7 -58a6 6 0 1 0 0 10a4.5 4.5 0 1 1 0 -10z" fill="#ffe27a"/>`,
  leaf:`<path d="M1 -38Q2 -45 -1 -50" stroke="${L.c2}" stroke-width="2" fill="none"/><path d="M-1 -50c-8-2-10-8-8-12c6 0 10 5 8 12z" fill="#6ad06a"/>`,
  drop:`<path d="M1 -38Q4 -44 3 -49" stroke="${L.c2}" stroke-width="2" fill="none"/><path d="M3 -59c-4 5-5 8-3 10c2 1.5 4 1.5 6 0c2-2 1-5-3-10z" fill="#7ac8ff"/>`,
  flower:`<path d="M1 -38Q3 -45 2 -50" stroke="${L.c2}" stroke-width="2" fill="none"/>${[0,72,144,216,288].map(a=>`<circle cx="${(2+Math.cos(a*Math.PI/180)*3.6).toFixed(1)}" cy="${(-53+Math.sin(a*Math.PI/180)*3.6).toFixed(1)}" r="2.8" fill="#ffb3cf"/>`).join('')}<circle cx="2" cy="-53" r="2.2" fill="#ffe27a"/>`,
  none:''}[L.an]||'';
 const ac={bow:`<path d="M-4 -37l-7 -4v8zM4 -37l7 -4v8z" fill="${L.ac2}"/><circle cx="0" cy="-37" r="2.2" fill="${L.ac2}"/>`,
  hat:`<path d="M-12 -34h24l-3 -3h-18z" fill="${L.ac2}"/><path d="M-8 -37v-7q8 -3 16 0v7z" fill="${L.ac2}"/><path d="M-8 -39h16" stroke="#fff" stroke-opacity=".5" stroke-width="1.6"/>`,
  scarf:`<path d="M-13 -9q13 6 26 0l1 4q-14 6 -28 0z" fill="${L.ac2}"/><path d="M7 -6l2 8 4 -1 -2 -8z" fill="${L.ac2}"/>`,
  glasses:`<circle cx="-5.8" cy="-23" r="4.4" fill="#fff" fill-opacity=".25" stroke="${L.ac2}" stroke-width="1.4"/><circle cx="5.8" cy="-23" r="4.4" fill="#fff" fill-opacity=".25" stroke="${L.ac2}" stroke-width="1.4"/><path d="M-1.4 -23h2.8" stroke="${L.ac2}" stroke-width="1.4"/>`,none:''}[L.ac]||'';
 const face=mood==='happy'?`<path d="M-9.2 -21.4q3.4 -4.2 6.8 0M2.4 -21.4q3.4 -4.2 6.8 0" ${ey}/><path d="M-4.6 -17.6Q0 -9.4 4.6 -17.6Z" fill="#b8456a"/><path d="M-2.2 -13.4q2.2 -2.2 4.4 0q-2.2 1.8 -4.4 0z" fill="#ff8fa8"/>`
  :mood==='sad'?`<ellipse cx="-5.8" cy="-21" rx="1.9" ry="2.6" fill="#4a4290"/><ellipse cx="5.8" cy="-21" rx="1.9" ry="2.6" fill="#4a4290"/><path d="M-3.8 -13Q0 -17.2 3.8 -13" stroke="#7a6cc0" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M-9.8 -17.6q2.2 2.8 0 4.6q-2.2 -1.8 0 -4.6z" fill="#8fd0ff"/>`
  :mood==='lo'?`<ellipse cx="-5.8" cy="-22" rx="2" ry="2.7" fill="#4a4290"/><ellipse cx="5.8" cy="-22" rx="2" ry="2.7" fill="#4a4290"/><path d="M-9.6 -27.4L-3.4 -25.8M9.6 -27.4L3.4 -25.8" ${ey}/><path d="M-3 -15.4h6" stroke="#7a6cc0" stroke-width="1.6" stroke-linecap="round"/>`
  :`<ellipse cx="-5.8" cy="-23" rx="2.1" ry="2.9" fill="#4a4290"/><ellipse cx="5.8" cy="-23" rx="2.1" ry="2.9" fill="#4a4290"/><circle cx="-5.1" cy="-24.2" r=".85" fill="#fff"/><circle cx="6.5" cy="-24.2" r=".85" fill="#fff"/><path d="M-2.8 -16.4q2.8 2.6 5.6 0" stroke="#7a6cc0" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
 const hands=mood==='happy'?[[-17.6,-27],[17.6,-27]]:[[-14.8,-10],[14.8,-10]];
 return`<svg viewBox="-28 -66 56 68" aria-hidden="true"><defs><radialGradient id="${g}" cx=".36" cy=".26" r=".98"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="${L.c1}"/><stop offset="1" stop-color="${L.c2}"/></radialGradient></defs><ellipse cx="0" cy="-1" rx="12" ry="2.2" fill="rgba(0,0,0,.2)"/>${an}<path d="M0 -39C10 -39 15.5 -29 15.5 -19C15.5 -8 9 -2 0 -2C-9 -2 -15.5 -8 -15.5 -19C-15.5 -29 -10 -39 0 -39Z" fill="url(#${g})"/><ellipse cx="-6.4" cy="-30" rx="3.2" ry="5.4" fill="#fff" opacity=".6" transform="rotate(18 -6.4 -30)"/>${face}<ellipse cx="-11" cy="-16.6" rx="2.7" ry="1.7" fill="#ff9db8" opacity=".75"/><ellipse cx="11" cy="-16.6" rx="2.7" ry="1.7" fill="#ff9db8" opacity=".75"/>${ac}${hands.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.6" fill="${L.c1}" stroke="${L.c2}" stroke-width="1"/>`).join('')}</svg>`}
/* un burger ou un hot-dog, couche par couche */
function kzDish(o){
 if(!o||!o.b)return'';
 if(o.b==='ni'||o.b==='mk')return kzSushi(o);
 const t=o.t||[];
 if(o.b==='ph'||o.b==='pb'){const br=o.b==='pb',bc=br?'#e09a3a':'#f0c27a',bd=br?'#b8702a':'#d29a52';
  let g=`<path d="M10 30q0 -12 12 -12h56q12 0 12 12z" fill="${bd}"/>`;
  if(o.p){const sc=o.p==='sv'?'#8a6a3a':'#c2563a';g+=`<rect x="6" y="21" width="88" height="13" rx="6.5" fill="${sc}"/><path d="M20 24l4 6M36 24l4 6M52 24l4 6M68 24l4 6" stroke="#000" stroke-opacity=".22" stroke-width="2"/><path d="M12 24h76" stroke="#fff" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/>`}
  if(t.includes('fx'))g+=[14,22,30,38,46,54,62,70,78].map((x,i)=>`<path d="M${x} ${20+i%2*2}l5 ${i%2?-3:3}" stroke="#ffd34a" stroke-width="2.4" stroke-linecap="round"/>`).join('');
  if(t.includes('ke'))g+=`<path d="M12 24l6 -4 6 4 6 -4 6 4 6 -4 6 4 6 -4 6 4 6 -4 6 4 6 -4 6 4" stroke="#e8352a" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
  if(t.includes('mo'))g+=`<path d="M14 27l6 -4 6 4 6 -4 6 4 6 -4 6 4 6 -4 6 4 6 -4 6 4 6 -4 6 4" stroke="#ffcf2a" stroke-width="2.6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
  if(t.includes('of'))g+=[18,30,44,58,72,82].map(x=>`<path d="M${x} 21q3 -4 6 0" stroke="#a8622a" stroke-width="2.6" fill="none" stroke-linecap="round"/>`).join('');
  if(t.includes('re'))g+=[16,26,40,50,64,76,86].map((x,i)=>`<circle cx="${x}" cy="${20+i%3}" r="1.8" fill="#4ab04a"/>`).join('');
  g+=`<path d="M4 30q0 12 14 12h64q14 0 14 -12q-4 4 -14 4h-64q-10 0 -14 -4z" fill="${bc}"/>`+(br?`<path d="M16 39h68" stroke="#fff" stroke-opacity=".45" stroke-width="2" stroke-linecap="round"/>`:'');
  return`<svg class="kzd" viewBox="0 6 100 40" aria-hidden="true">${g}</svg>`}
 const bc=o.b==='bn'?'#a8703f':'#f3cf8f',bk=o.b==='bn'?'#7a4a24':'#d9a85a';let y=76,g='';
 const L=(h,s)=>{y-=h;g+=s(y)};
 L(9,y=>`<path d="M14 ${y}h72q2 0 2 3v2q0 4 -6 4h-64q-6 0 -6 -4v-2q0 -3 2 -3z" fill="${bc}" stroke="${bk}" stroke-width="1"/>`);
 if(o.p==='vi')L(9,y=>`<rect x="10" y="${y}" width="80" height="10" rx="5" fill="#6b3a22"/><path d="M18 ${y+3}h16M44 ${y+6}h14M66 ${y+3}h14" stroke="#4a2414" stroke-width="2" stroke-linecap="round"/>`);
 if(o.p==='cr')L(10,y=>`<path d="M12 ${y+5}q0 -6 10 -6h56q10 0 10 6q0 6 -10 6h-56q-10 0 -10 -6z" fill="#e8a540"/>${[22,36,52,66,78].map((x,i)=>`<circle cx="${x}" cy="${y+3+i%2*3}" r="1.6" fill="#c2802a"/>`).join('')}`);
 if(t.includes('fr'))L(3,y=>`<path d="M10 ${y}h80l-6 6l-4 -3l-8 7l-6 -4l-10 5l-6 -5l-10 6l-8 -6l-8 4l-6 -5z" fill="#ffcf3a"/>`);
 if(t.includes('ba'))L(4,y=>`<path d="M12 ${y+2}q8 -4 16 0t16 0t16 0t16 0t14 0" stroke="#b8452a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M12 ${y+2}q8 -4 16 0t16 0t16 0t16 0t14 0" stroke="#f2a080" stroke-width="1.4" fill="none"/>`);
 if(t.includes('la'))L(4,y=>`<path d="M8 ${y+3}q5 -6 10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t6 0" stroke="#5ac04a" stroke-width="5" fill="none" stroke-linecap="round"/>`);
 if(t.includes('to'))L(5,y=>`<rect x="14" y="${y}" width="32" height="5" rx="2.5" fill="#e8402e"/><rect x="54" y="${y}" width="32" height="5" rx="2.5" fill="#e8402e"/><path d="M20 ${y+2.5}h20M60 ${y+2.5}h20" stroke="#ff9a8a" stroke-width="1" stroke-dasharray="2 3"/>`);
 if(t.includes('co'))L(3,y=>[22,40,58,74].map(x=>`<ellipse cx="${x}" cy="${y+1.5}" rx="7" ry="2.4" fill="#6aa83a"/><ellipse cx="${x}" cy="${y+1.5}" rx="4" ry="1.2" fill="#a8d86a"/>`).join(''));
 if(t.includes('ke'))L(2,y=>`<path d="M16 ${y+1}q6 4 12 0t12 0t12 0t12 0t12 0t8 0" stroke="#e8352a" stroke-width="3.4" fill="none" stroke-linecap="round"/>`);
 L(22,y=>`<path d="M12 ${y+22}q0 -22 38 -22q38 0 38 22z" fill="${bc}" stroke="${bk}" stroke-width="1"/><path d="M24 ${y+9}q12 -7 26 -6" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none" stroke-linecap="round"/>`+(o.b==='bn'?[30,42,56,66,48,38,60].map((x,i)=>`<ellipse cx="${x}" cy="${y+6+i%3*4}" rx="1.8" ry="1" fill="#f3e2b0"/>`).join(''):[32,46,60,52,40].map((x,i)=>`<ellipse cx="${x}" cy="${y+6+i%2*5}" rx="1.8" ry="1" fill="#fff6dc"/>`).join('')));
 return`<svg class="kzd" viewBox="0 ${y-2} 100 ${80-y}" aria-hidden="true">${g}</svg>`}
const kzFries=()=>KZR===2?kzMiso():`<svg viewBox="0 0 40 44" aria-hidden="true">${[8,13,18,23,28,32].map((x,i)=>`<rect x="${x}" y="${4+i%3*3}" width="4" height="22" rx="1.5" fill="#ffd34a" stroke="#e8a82a" stroke-width=".8" transform="rotate(${(i-2.5)*4} ${x} 26)"/>`).join('')}<path d="M6 18h28l-3 24h-22z" fill="#e8402e"/><path d="M14 26q6 6 12 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
const kzDrink=()=>KZR===2?kzTea():`<svg viewBox="0 0 40 44" aria-hidden="true"><path d="M22 2l-4 12" stroke="#ff6fa0" stroke-width="3" stroke-linecap="round"/><path d="M8 12h24l-3 30h-18z" fill="#fff"/><path d="M9 18h22l-2 22h-18z" fill="#7ac8ff"/><path d="M8 12h24" stroke="#c8d2e8" stroke-width="3" stroke-linecap="round"/><path d="M12 24h16" stroke="#fff" stroke-opacity=".6" stroke-width="2"/></svg>`;
/* icônes des bacs d’ingrédients */
function kzIco(id){if(KZR===2||'ni mk sm th cv wa av oe se'.split(' ').includes(id)){const v=kzIcoSu(id);if(v)return v}const s=b=>`<svg viewBox="0 0 40 40" aria-hidden="true">${b}</svg>`;
 return{bb:s(`<path d="M5 26q0 -18 15 -18q15 0 15 18z" fill="#f3cf8f" stroke="#d9a85a"/><rect x="5" y="27" width="30" height="7" rx="3" fill="#f3cf8f" stroke="#d9a85a"/><ellipse cx="15" cy="16" rx="1.6" ry="1" fill="#fff6dc"/><ellipse cx="23" cy="14" rx="1.6" ry="1" fill="#fff6dc"/>`),
  bn:s(`<path d="M5 26q0 -18 15 -18q15 0 15 18z" fill="#a8703f" stroke="#7a4a24"/><rect x="5" y="27" width="30" height="7" rx="3" fill="#a8703f" stroke="#7a4a24"/><ellipse cx="14" cy="17" rx="1.6" ry="1" fill="#f3e2b0"/><ellipse cx="22" cy="13" rx="1.6" ry="1" fill="#f3e2b0"/><ellipse cx="26" cy="19" rx="1.6" ry="1" fill="#f3e2b0"/>`),
  vi:s(`<ellipse cx="20" cy="22" rx="15" ry="9" fill="#e86a7a"/><path d="M10 20q5 -3 9 1M22 25q5 -3 9 0" stroke="#fff" stroke-opacity=".6" stroke-width="2" fill="none" stroke-linecap="round"/>`),
  cr:s(`<path d="M6 22q0 -9 14 -9q14 0 14 9q0 8 -14 8q-14 0 -14 -8z" fill="#f6dcae"/><circle cx="14" cy="20" r="1.4" fill="#e0b880"/><circle cx="24" cy="24" r="1.4" fill="#e0b880"/>`),
  la:s(`<path d="M20 34c-12 -2 -16 -14 -10 -24c4 4 8 3 10 -2c2 5 6 6 10 2c6 10 2 22 -10 24z" fill="#5ac04a"/><path d="M20 32v-20" stroke="#a8e890" stroke-width="2"/>`),
  to:s(`<circle cx="20" cy="22" r="12" fill="#e8402e"/><path d="M14 11l6 3 6 -3 -3 5h-6z" fill="#4aa83a"/><ellipse cx="15" cy="19" rx="3" ry="2" fill="#fff" opacity=".4"/>`),
  fr:s(`<path d="M5 30l15 -22 15 22z" fill="#ffcf3a"/><circle cx="18" cy="22" r="2" fill="#f2b42a"/><circle cx="24" cy="26" r="1.6" fill="#f2b42a"/>`),
  ke:s(`<rect x="13" y="12" width="14" height="24" rx="5" fill="#e8352a"/><path d="M17 12v-5h6v5z" fill="#fff"/><rect x="15" y="20" width="10" height="7" rx="1.5" fill="#fff" opacity=".8"/>`),
  mo:s(`<rect x="13" y="12" width="14" height="24" rx="5" fill="#ffcf2a"/><path d="M17 12v-5h6v5z" fill="#e8a82a"/><rect x="15" y="20" width="10" height="7" rx="1.5" fill="#fff" opacity=".8"/>`),
  co:s(`<path d="M10 30q-4 -10 6 -18q8 -6 14 0q4 6 -4 14q-8 8 -16 4z" fill="#6aa83a"/><circle cx="17" cy="20" r="1.4" fill="#a8d86a"/><circle cx="22" cy="17" r="1.4" fill="#a8d86a"/><circle cx="16" cy="26" r="1.4" fill="#a8d86a"/>`),
  ba:s(`<path d="M5 22q5 -6 10 0t10 0t10 0" stroke="#b8452a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M5 22q5 -6 10 0t10 0t10 0" stroke="#f2a080" stroke-width="2" fill="none"/>`),
  ph:s(`<rect x="3" y="18" width="34" height="12" rx="6" fill="#f0c27a"/><path d="M7 20h26" stroke="#d29a52" stroke-width="2"/>`),
  pb:s(`<rect x="3" y="18" width="34" height="12" rx="6" fill="#e09a3a"/><path d="M8 21h24" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/>`),
  sa:s(`<rect x="3" y="17" width="34" height="9" rx="4.5" fill="#ff9aa0"/><path d="M8 19h24" stroke="#fff" stroke-opacity=".5" stroke-width="1.6"/>`),
  sv:s(`<rect x="3" y="17" width="34" height="9" rx="4.5" fill="#b8a46a"/><path d="M10 20l3 3M20 20l3 3M30 20l-3 3" stroke="#6a8a3a" stroke-width="1.6"/>`),
  of:s(`<ellipse cx="20" cy="23" rx="12" ry="10" fill="#f2e2c8" stroke="#c9a070"/><path d="M20 13v-5" stroke="#6aa83a" stroke-width="2.4"/><path d="M14 22q6 -8 12 0" stroke="#c9a070" stroke-width="1.4" fill="none"/>`),
  fx:s(`${[8,13,18,23,28,12,20,26].map((x,i)=>`<path d="M${x} ${20+i%3*4}l5 ${i%2?-3:3}" stroke="#ffcf3a" stroke-width="3" stroke-linecap="round"/>`).join('')}`),
  re:s(`<path d="M11 12h18v22q0 3 -3 3h-12q-3 0 -3 -3z" fill="#fff" fill-opacity=".7" stroke="#c8d2e8"/><path d="M12 18h16v15h-16z" fill="#4ab04a"/><rect x="10" y="8" width="20" height="5" rx="2" fill="#e8402e"/>`),
  fries:s(`<path d="M10 14h20v22h-20z" fill="#d9c8a0"/><path d="M10 14l3 -5h14l3 5z" fill="#c9b080"/><path d="M14 22q6 4 12 0" stroke="#a88a50" stroke-width="2" fill="none"/>`),
  drink:s(`<path d="M10 10h20l-3 26h-14z" fill="#fff" stroke="#c8d2e8"/><path d="M14 18h12" stroke="#c8d2e8" stroke-width="2"/>`)}[id]||''}
/* ce qui cuit sur le grill */
function kzGrill(id,ok){if(KZSU[id])return kzGrillSu(id,ok);const c={vi:ok?'#6b3a22':'#e86a7a',cr:ok?'#e8a540':'#f6dcae',sa:ok?'#c2563a':'#ff9aa0',sv:ok?'#8a6a3a':'#b8a46a'}[id];
 return id==='vi'||id==='cr'?`<svg viewBox="0 0 40 30" aria-hidden="true"><ellipse cx="20" cy="16" rx="16" ry="10" fill="${c}"/>${ok?'<path d="M10 12l6 8M18 10l6 8M26 10l6 8" stroke="#000" stroke-opacity=".25" stroke-width="2"/>':''}</svg>`
  :`<svg viewBox="0 0 40 30" aria-hidden="true"><rect x="3" y="10" width="34" height="10" rx="5" fill="${c}"/>${ok?'<path d="M10 11l3 8M20 11l3 8M30 11l-3 8" stroke="#000" stroke-opacity=".25" stroke-width="2"/>':''}</svg>`}
/* décor des deux restaurants */
function kzBg(rs){if(rs===2)return kzBgSu();const hd=rs===1;
 const st=[...Array(26)].map((_,i)=>`<circle cx="${(i*73+29)%400}" cy="${(i*41+13)%(hd?150:110)}" r="${1+i%3*.5}" fill="#fff" opacity="${.5+i%2*.3}"/>`).join('');
 if(!hd)return`<svg class="kzbg" viewBox="0 -70 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="kzw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2160"/><stop offset="1" stop-color="#4b3a8c"/></linearGradient><linearGradient id="kzs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121848"/><stop offset="1" stop-color="#3a3a8a"/></linearGradient><radialGradient id="kzl"><stop offset="0" stop-color="#ffe2a0" stop-opacity=".55"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></radialGradient><clipPath id="kzc1"><rect x="16" y="70" width="110" height="120" rx="55"/></clipPath><clipPath id="kzc2"><rect x="274" y="70" width="110" height="120" rx="55"/></clipPath></defs>
<rect y="-70" width="400" height="400" fill="url(#kzw)"/>${[...Array(12)].map((_,i)=>`<path d="M${i*36} -70v400" stroke="#fff" stroke-opacity=".04" stroke-width="14"/>`).join('')}
<rect x="16" y="70" width="110" height="120" rx="55" fill="url(#kzs)"/><rect x="274" y="70" width="110" height="120" rx="55" fill="url(#kzs)"/>
<g clip-path="url(#kzc1)">${st}<circle cx="60" cy="104" r="14" fill="#fff6c8"/><path d="M16 170q30 -18 60 -6t50 -4v40h-110z" fill="#e8ecff"/></g>
<g clip-path="url(#kzc2)"><g transform="translate(258 0)">${st}</g><path d="M274 166q30 -14 60 -4t50 -6v40h-110z" fill="#e8ecff"/><path d="M330 150l10 -24 10 24z" fill="#3a6a5a"/></g>
<rect x="16" y="70" width="110" height="120" rx="55" fill="none" stroke="#8a7ad8" stroke-width="5"/><rect x="274" y="70" width="110" height="120" rx="55" fill="none" stroke="#8a7ad8" stroke-width="5"/>
<g transform="translate(0 -30)"><rect x="110" y="16" width="180" height="48" rx="14" fill="#1a1450" stroke="#ff8fc8" stroke-width="3"/><rect x="110" y="16" width="180" height="48" rx="14" fill="none" stroke="#ff8fc8" stroke-width="10" stroke-opacity=".18"/>
<text x="200" y="37" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-size="16" font-weight="700" fill="#ffd6ec">Burger</text><text x="200" y="55" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-size="11" fill="#ffe9a0" letter-spacing="2.5">DES ÉTOILES</text></g>
${[150,250].map(x=>`<path d="M${x} 34v56" stroke="#8a7ad8" stroke-width="2"/><path d="M${x-14} 98q14 -16 28 0z" fill="#ffcf6a"/><circle cx="${x}" cy="104" r="44" fill="url(#kzl)"/>`).join('')}
${[...Array(6)].map((_,i)=>`<circle cx="${160+i*16}" cy="174" r="5" fill="${['#ff8fc8','#ffe27a','#8fd8ff'][i%3]}" opacity=".85"/>`).join('')}<rect x="150" y="180" width="100" height="5" rx="2" fill="#8a7ad8"/>
<rect x="0" y="236" width="400" height="94" fill="#3a2c78"/></svg>`;
 return`<svg class="kzbg" viewBox="0 -70 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="kzn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e1240"/><stop offset="1" stop-color="#36307a"/></linearGradient></defs>
<rect y="-70" width="400" height="400" fill="url(#kzn)"/>${st}<path d="M330 40a20 20 0 1 0 0 34a15 15 0 1 1 0 -34z" fill="#fff3c0"/>
${[[0,120,60,130],[50,140,50,110],[96,110,70,140],[234,130,60,120],[300,126,60,124],[352,104,60,146]].map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#241e5a"/>${[...Array(6)].map((_,i)=>`<rect x="${x+8+(i%2)*(w/2-4)}" y="${y+10+Math.floor(i/2)*22}" width="10" height="12" fill="#ffd36b" opacity="${i%3?.85:.25}"/>`).join('')}`).join('')}
<path d="M0 -20q100 30 200 6t200 8" stroke="#3a3060" stroke-width="2" fill="none"/>${[...Array(13)].map((_,i)=>{const x=i*33+8,y=(-20+Math.sin(i*.9)*10+12).toFixed(1),c=['#ff8fc8','#ffe27a','#8fd8ff','#a8ff9a'][i%4];return`<circle cx="${x}" cy="${y}" r="9" fill="${c}" opacity=".25"/><circle cx="${x}" cy="${y}" r="3.6" fill="${c}"/>`}).join('')}
<path d="M70 96h260l-16 40h-228z" fill="#e8402e"/>${[...Array(8)].map((_,i)=>`<path d="M${86+i*28} 96h14l-2 40h-14z" fill="#fff3e0"/>`).join('')}<path d="M86 136q14 12 28 0t28 0t28 0t28 0t28 0t28 0t28 0t28 0z" fill="#e8402e"/>
<g transform="translate(0 -40)"><rect x="116" y="58" width="168" height="36" rx="12" fill="#2a1a10" stroke="#ffd34a" stroke-width="3"/><rect x="116" y="58" width="168" height="36" rx="12" fill="none" stroke="#ffd34a" stroke-width="10" stroke-opacity=".18"/><text x="200" y="82" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-size="15" font-weight="700" fill="#fff0b0">Hot-dog de la Lune</text></g>
<path d="M24 330v-160" stroke="#5a5480" stroke-width="5"/><circle cx="24" cy="166" r="8" fill="#ffe2a0"/><circle cx="24" cy="166" r="30" fill="#ffe2a0" opacity=".18"/>
<path d="M0 236q100 -14 200 -4t200 -6v104h-400z" fill="#e8ecff"/></svg>`}
function kzLv(l){
 const L=Math.max(0,Math.min(CUN-1,l)),rs=Math.floor(L/10),hd=rs===1,r=L%10,R=kzRng(L*7919+57),u=[];for(let i=rs*10;i<=L;i++)u.push(...KZU[i]);
 const by=k=>u.filter(x=>KZI[x].k===k),buns=by('b'),prot=by('p'),tops=by('t'),nw=KZU[L];
 const seats=r<1?1:r<4?2:3,plates=r<2?1:r<5?2:3,grills=r<5?2:3,nc=3+Math.floor(r*.6)+(rs?1:0),allow=r===9?0:1,k=(r<5?2:1.7)*(rs?.95:1);
 const pick=a=>a[Math.floor(R()*a.length)];
 const Q=[];for(let i=0;i<nc;i++){
  const nb=nw.find(x=>buns.includes(x)),np=nw.find(x=>prot.includes(x));
  const b=nb&&R()<.5?nb:pick(buns),p=np&&R()<.5?np:pick(prot);
  const mx=Math.min(tops.length,1+Math.floor(r/2.2)),n=tops.length?Math.floor(R()*(mx+1)):0,T=[],pool=tops.slice();
  const nt=nw.find(x=>tops.includes(x));if(nt&&n&&R()<.6){T.push(nt);pool.splice(pool.indexOf(nt),1)}
  while(T.length<n&&pool.length)T.push(pool.splice(Math.floor(R()*pool.length),1)[0]);
  const fries=u.includes('fries')&&R()<(nw.includes('fries')?.75:.5),drink=u.includes('drink')&&R()<.75;
  const steps=4+T.length+(fries?2:0)+(drink?2:0);
  Q.push({o:{b,p,t:T.sort()},fries,drink,lk:(L*7+i*3)%KZL.length,p:Math.round(steps*(k+(seats-1)*.8)+4)})}
 return{L,hd,rs,r,u,seats,plates,grills,nc,allow,Q}}
function pCuis(r){
 const C=kzLv(lv),hd=C.hd,su=C.rs===2;KZR=C.rs;KZI.fries.n=su?'soupe miso':'frites';KZI.drink.n=su?'thé vert':'boisson';try{kzMu.style(C.rs)}catch(e){}
 const S={q:C.Q.map((x,i)=>({...x,id:i})),seat:Array(C.seats).fill(null),pl:Array.from({length:C.plates},()=>null),sel:0,gr:Array(C.grills).fill(null),fr:{n:0,c:null},dr:{n:0,c:null},hold:null,sv:0,ms:0,n:0};
 let hn=null,over=false,nh=(C.L===0&&!st.get('kz:t',0))||(C.L===20&&!st.get('kz:t2',0)),last='';
 snap=()=>null;
 const T=(f,ms)=>setTimeout(()=>{if(playing&&cur==='cuisine'&&document.getElementById('kzg'))f()},ms);
 const arrive=i=>{if(S.seat[i]||!S.q.length||over)return;const c=S.q.shift();S.seat[i]={...c,m:c.p,got:{o:0,fries:0,drink:0},st:'in'};sfx(660,.08);d();T(()=>{const s=S.seat[i];if(s&&s.st==='in'){s.st='wait';d()}},950)};
 const desc=o=>[o.b,o.p,...o.t].filter(Boolean).map(x=>KZI[x].n).join(', ');
 const dname=o=>o.b==='ph'||o.b==='pb'?'un hot-dog':o.b==='ni'?'des nigiris':o.b==='mk'?'des makis':'un burger';
 const leave=(i,ok)=>{const c=S.seat[i];if(!c)return;c.st=ok?'out':'sad';d();T(()=>{S.seat[i]=null;d();chkEnd();T(()=>arrive(i),450)},ok?950:1150)};
 const chkEnd=()=>{if(S.q.length||S.seat.some(Boolean)||over)return;over=true;T(()=>{if(S.ms<=C.allow)win();else lose()},500)};
 const lose=()=>{const o=$('#kzov');if(!o)return;o.hidden=false;o.innerHTML=`<div class="kzbox"><h2>Le restaurant ferme</h2><p>${S.ms} client${S.ms>1?'s sont repartis':' est reparti'} le ventre vide. ${C.allow?'Un seul départ est permis à ce niveau.':'À ce niveau, chaque client doit être servi.'}</p><p class="kzsm">Astuce : lance la cuisson dès qu’un client arrive, et prépare plusieurs plats à la fois.</p><button class="btn" data-a="kzR">Recommencer</button></div>`};
 const tick=()=>{S.n++;S.seat.forEach((c,i)=>{if(!c||c.st!=='wait')return;c.p--;if(c.p<=0){S.ms++;msg(KZL[c.lk].n+' est reparti sans manger…');sfx(220,.3);leave(i,false)}})};
 const done=c=>c.got.o&&(!c.fries||c.got.fries)&&(!c.drink||c.got.drink);
 const plate=()=>S.pl[S.sel];
 Object.assign(act,{
  kzR:()=>pCuis(undefined),
  kzX:()=>{nh=false;st.set(C.L===20?'kz:t2':'kz:t',1);d()},
  kzP:v=>{S.sel=Math.max(0,Math.min(S.pl.length-1,+v||0));S.hold=null;d()},
  kzT:()=>{if(over)return;if(!plate())return msg('Cette assiette est déjà vide.');S.pl[S.sel]=null;S.hold=null;hn=null;sfx(260,.15);tick();d()},
  kzI:id=>{if(over||!C.u.includes(id))return;const g=KZI[id];
   if(g.k==='p'){const i=S.gr.findIndex(x=>!x);if(i<0)return msg(su?'La planche est pleine : utilise d’abord le poisson découpé.':'Le grill est plein : sers d’abord ce qui est cuit.');S.gr[i]={id,t0:Date.now()};hn=null;sfx(330,.2);tick();d();T(()=>d(),1650);return}
   if(id==='fries'){if(S.fr.c)return msg(su?'La soupe chauffe déjà.':'La friteuse est déjà en marche.');if(S.fr.n>=4)return msg(su?'Il y a déjà assez de bols de soupe.':'Le bac à frites est plein.');S.fr.c=1;hn=null;sfx(300,.2);tick();d();T(()=>{S.fr.c=null;S.fr.n=Math.min(4,S.fr.n+2);sfx(620,.15);d()},2000);return}
   if(id==='drink'){if(S.dr.c)return msg('La fontaine remplit déjà un verre.');if(S.dr.n>=3)return msg('Il y a déjà assez de boissons.');S.dr.c=1;hn=null;sfx(500,.15);tick();d();T(()=>{S.dr.c=null;S.dr.n++;d()},1500);return}
   const P=plate();S.hold=null;
   if(g.k==='b'){if(P)return msg('Cette assiette est occupée : touche une assiette vide.');S.pl[S.sel]={b:id,p:null,t:[]};last=S.sel+'';hn=null;sfx(520,.12);tick();return d()}
   if(!P)return msg(su?'Commence par du riz ou une feuille d’algue.':hd?'Commence par un pain à hot-dog.':'Commence par un pain à burger.');
   if(P.t.includes(id))return msg('Il y a déjà '+g.n+' sur ce plat.');
   P.t.push(id);P.t.sort();last=S.sel+'';hn=null;sfx(560,.12);tick();d()},
  kzG:v=>{if(over)return;const g=S.gr[+v];if(!g)return msg(su?'Touche un poisson dans les bacs pour le découper.':'Touche '+(hd?'une saucisse':'une viande')+' dans les bacs pour la mettre à cuire.');if(Date.now()-g.t0<1600)return msg(su?'Le couteau découpe de fines tranches…':'Encore un petit instant, ça grésille…');
   const P=plate();S.hold=null;if(!P)return msg(su?'Pose d’abord le riz ou l’algue sur l’assiette.':'Pose d’abord un pain sur l’assiette.');if(P.p)return msg(su?'Ce plat a déjà son poisson.':'Ce plat a déjà sa '+(hd?'saucisse':'viande')+'.');
   P.p=g.id;S.gr[+v]=null;last=S.sel+'';hn=null;sfx(620,.15);tick();d()},
  kzF:()=>{if(over)return;if(!S.fr.n)return msg(su?(S.fr.c?'La soupe chauffe…':'Touche le pot de miso pour préparer des bols.'):S.fr.c?'Les frites dorent…':'Touche le sac de frites pour en faire.');S.hold=S.hold==='fries'?null:'fries';d()},
  kzD:()=>{if(over)return;if(!S.dr.n)return msg(su?(S.dr.c?'Le thé infuse…':'Touche la théière pour servir un thé.'):S.dr.c?'Le verre se remplit…':'Touche le gobelet pour préparer une boisson.');S.hold=S.hold==='drink'?null:'drink';d()},
  kzC:v=>{if(over)return;const c=S.seat[+v];if(!c||c.st!=='wait')return;const nm=KZL[c.lk].n;
   if(S.hold){const k=S.hold,z=k==='fries'?S.fr:S.dr;if(!c[k]||c.got[k])return msg(nm+' n’a pas demandé '+(k==='fries'?(su?'de soupe':'de frites'):(su?'de thé':'de boisson'))+'.');c.got[k]=1;z.n--;if(!z.n)S.hold=null;sfx(700,.15)}
   else{const P=plate();if(!P)return msg(nm+' voudrait '+dname(c.o)+' : '+desc(c.o)+'.');if(c.got.o)return msg('Son plat est déjà servi.');
    if(!(P.b===c.o.b&&P.p===c.o.p&&P.t.join()===c.o.t.join()))return msg('Oups, ce n’est pas ma commande…');c.got.o=1;S.pl[S.sel]=null;sfx(784,.25)}
   hn=null;tick();if(done(c)){S.sv++;vib(15);sfx(880,.3);leave(+v,true)}else d()},
  hint:()=>{if(over)return;const h=kzHint();if(!h)return msg('Tout est en route : patiente un instant.');if(!spend(1))return;hn=h;d()}
 });
 /* indice : la prochaine chose utile pour le client le plus pressé */
 const kzHint=()=>{const cs=S.seat.map((c,i)=>c&&c.st==='wait'&&{c,i}).filter(Boolean).sort((a,b)=>a.c.p-b.c.p);
  for(const{c,i}of cs){
   if(!c.got.o){const o=c.o;let pi=S.pl.findIndex(P=>P&&P.b===o.b&&(!P.p||P.p===o.p)&&P.t.every(x=>o.t.includes(x)));if(pi<0)pi=S.pl.findIndex(P=>!P);if(pi<0)continue;S.sel=pi;S.hold=null;const P=S.pl[pi];
    if(!P)return'I'+o.b;if(!P.p){const g=S.gr.findIndex(x=>x&&x.id===o.p&&Date.now()-x.t0>=1600);if(g>=0)return'G'+g;if(!S.gr.some(x=>x&&x.id===o.p))return'I'+o.p}
    const m=o.t.find(x=>!P.t.includes(x));if(m)return'I'+m;if(P.p)return'C'+i;continue}
   if(c.fries&&!c.got.fries){if(S.fr.n){S.hold='fries';return'C'+i}if(!S.fr.c)return'Ifries';continue}
   if(c.drink&&!c.got.drink){if(S.dr.n){S.hold='drink';return'C'+i}if(!S.dr.c)return'Idrink';continue}}
  return null};
 app.innerHTML=`<div class="kzg ${['bu','hd','su'][C.rs]}" id="kzg"><div class="kzt"><button class="back" data-a="back" data-v="hub">‹ Cuisine</button><b>Niveau ${C.L+1}</b><div class="kztr"><button class="hb hintb" data-a="hint" aria-label="Indice : coûte 1 flocon">${HBI(1)}</button><div class="chip">❄ ${FLX()}</div></div></div><div class="kzsc">${kzBg(C.rs)}${kzAmb(C.rs,C.L*3)}<div class="kzcu" id="kzcu"></div><div class="kzct"></div></div><p class="m kzm" id="m" role="status" aria-live="polite"></p><div class="kzk" id="kzk"></div><div class="kzov" id="kzov" hidden></div></div>`;
 $('#nav').hidden=true;mt='m';
 const d=()=>{const cu=$('#kzcu'),kk=$('#kzk');if(!cu||!kk)return;const H=k=>hn===k?' hn':'',now=Date.now();
  cu.style.setProperty('--n',S.seat.length);
  cu.innerHTML=S.seat.map((c,i)=>{if(!c)return`<div class="kzs"></div>`;const L=KZL[c.lk],lo=c.st==='wait'&&c.p/c.m<.34,mood=c.st==='out'?'happy':c.st==='sad'?'sad':lo?'lo':'wait';
   return`<div class="kzs"><button class="kzp ${c.st}${lo?' lo':''}${H('C'+i)}" data-a="kzC" data-v="${i}" aria-label="${L.n} voudrait ${dname(c.o)} : ${desc(c.o)}${c.fries?', des frites':''}${c.drink?', une boisson':''}">
<span class="kzb${c.got.o?' ok':''}"><span class="kzbd">${kzDish(c.o)}</span><span class="kzbi">${[c.o.b,c.o.p,...c.o.t].map(x=>`<i>${kzIco(x)}</i>`).join('')}</span>${c.fries||c.drink?`<span class="kzbs">${c.fries?`<i class="${c.got.fries?'ok':''}">${kzFries()}</i>`:''}${c.drink?`<i class="${c.got.drink?'ok':''}">${kzDrink()}</i>`:''}</span>`:''}</span>
<span class="kzgy">${kzGuy(L,mood,c.id)}</span><span class="kzn">${L.n}</span><span class="kzpt"><i style="width:${Math.max(0,c.p/c.m*100).toFixed(0)}%"></i></span>${c.st==='out'?'<span class="kzh">♥</span><span class="kzh h2">♥</span>':''}</button></div>`}).join('');
  kk.innerHTML=`${nh?`<div class="kznote"><span>${su?'Bienvenue à bord ! Pose du riz ou une feuille d’algue sur l’assiette, puis touche un poisson : il se découpe sur la planche. Quand les tranches sont prêtes, touche-les, ajoute les garnitures et sers le client.':`Touche un pain pour le poser sur l’assiette, puis la viande pour la cuire sur le grill. Quand elle est dorée, touche-la, ajoute les garnitures demandées, puis touche le client pour le servir. Pas de chrono !`}</span><button data-a="kzX">OK</button></div>`:''}
<div class="kzst"><span>Servis <b>${S.sv}</b> / ${C.nc}</span><span>${C.allow?'Départ permis : <b>'+Math.max(0,C.allow-S.ms)+'</b>':'Aucun départ permis'}</span></div>
<div class="kzrow"><div class="kzgr">${S.gr.map((g,i)=>{const ok=g&&now-g.t0>=1600;return`<button class="kzgs${g?(ok?' ok':' ck'):''}${H('G'+i)}" data-a="kzG" data-v="${i}" aria-label="${su?'Planche':'Grill'} ${i+1}${g?(ok?' : '+KZI[g.id].n+' cuite':' : en cuisson'):' : libre'}">${g?kzGrill(g.id,ok):''}${g&&!ok?'<i class="kzsm1"></i><i class="kzsm1 s2"></i>':''}</button>`}).join('')}</div>
${C.u.includes('fries')?`<button class="kzfr${S.hold==='fries'?' on':''}${S.fr.c?' ck':''}" data-a="kzF" aria-label="${KZI.fries.n} prêtes : ${S.fr.n}"><span class="kzfi">${kzFries()}</span><b>${S.fr.n}</b></button>`:''}${C.u.includes('drink')?`<button class="kzfr${S.hold==='drink'?' on':''}${S.dr.c?' ck':''}" data-a="kzD" aria-label="${KZI.drink.n} prêtes : ${S.dr.n}"><span class="kzfi">${kzDrink()}</span><b>${S.dr.n}</b></button>`:''}</div>
<div class="kzpl">${S.pl.map((P,i)=>`<button class="kzpa${S.sel===i&&!S.hold?' on':''}" data-a="kzP" data-v="${i}" aria-label="Assiette ${i+1}${P?' : '+desc(P):' : vide'}"><span class="kzdi${last===i+''?' pop':''}">${P?kzDish(P):''}</span></button>`).join('')}<button class="kztr2" data-a="kzT" aria-label="Jeter le contenu de l’assiette">🗑</button></div>
<div class="kzin">${C.u.map(id=>`<button class="kzi k${KZI[id].k}${H('I'+id)}" data-a="kzI" data-v="${id}"><span>${kzIco(id)}</span><small>${KZI[id].n}</small></button>`).join('')}</div>`;
  last=''};
 d();S.seat.forEach((_,i)=>T(()=>arrive(i),350+i*650));
}
/* ---------- 3e restaurant : le Sushi des Vagues, sur un bateau la nuit (niveaux 21 à 30) ---------- */
var KZR=0;
const KZSU={sm:'#ff8a5a',th:'#d8304a',cv:'#ff9a6a'};
function kzSushi(o){const t=o.t||[];let g='';
 if(o.b==='ni'){[28,72].forEach(x=>{g+=`<ellipse cx="${x}" cy="36" rx="19" ry="9" fill="#fbf8f0" stroke="#e4dccb"/><path d="M${x-10} 36q2 -2 4 0M${x+2} 39q2 -2 4 0M${x-4} 41q2 -2 4 0" stroke="#e4dccb" stroke-width="1" fill="none"/>`;
   if(o.p){const c=KZSU[o.p];g+=`<path d="M${x-21} 31q21 -16 42 0q-6 6 -21 6t-21 -6z" fill="${c}"/>`+(o.p==='th'?`<path d="M${x-12} 28q12 -6 24 0" stroke="#ff7a8a" stroke-opacity=".5" stroke-width="2" fill="none"/>`:`<path d="M${x-14} 29l6 -6M${x-4} 27l6 -6M${x+6} 28l6 -5" stroke="#fff" stroke-opacity=".75" stroke-width="2" stroke-linecap="round"/>`)+(o.p==='cv'?`<path d="M${x+19} 30l7 -5 -1 8z" fill="#e8582e"/>`:'')}
   if(t.includes('av'))g+=`<path d="M${x-12} 24q12 -8 24 0q-12 4 -24 0z" fill="#9ad05a" stroke="#4a8a2a"/>`;
   if(t.includes('oe'))g+=[-8,-3,2,7,-5,0,5].map((d,i)=>`<circle cx="${x+d}" cy="${(i<4?22:19)-(t.includes('av')?3:0)}" r="2.4" fill="#ff7a2a" stroke="#d8501a" stroke-width=".5"/>`).join('');
   if(t.includes('se'))g+=[-10,-4,3,9].map((d,i)=>`<ellipse cx="${x+d}" cy="${30-i%2*2}" rx="1.3" ry=".8" fill="#fff6dc"/>`).join('')});
  if(t.includes('wa'))g+=`<path d="M46 44q4 -6 8 0q-4 3 -8 0z" fill="#8ad05a"/>`;
  return`<svg class="kzd" viewBox="0 8 100 42" aria-hidden="true">${g}</svg>`}
 [20,50,80].forEach(x=>{g+=`<ellipse cx="${x}" cy="40" rx="14" ry="4" fill="#000" opacity=".15"/><circle cx="${x}" cy="30" r="14" fill="#1f2a24"/><circle cx="${x}" cy="30" r="11" fill="#fbf8f0"/>`;
  if(o.p)g+=`<circle cx="${x-(t.includes('av')?2:0)}" cy="30" r="5" fill="${KZSU[o.p]}"/>`;
  if(t.includes('av'))g+=`<path d="M${x+2} 25q5 3 3 9l-3 -1z" fill="#9ad05a"/>`;
  if(t.includes('oe'))g+=[-6,-2,2,6].map(d=>`<circle cx="${x+d}" cy="17.5" r="2.3" fill="#ff7a2a"/>`).join('');
  if(t.includes('se'))g+=[-6,0,6].map(d=>`<ellipse cx="${x+d}" cy="${23+Math.abs(d)/3}" rx="1.2" ry=".7" fill="#e8d8a8"/>`).join('')});
 if(t.includes('wa'))g+=`<path d="M86 46q4 -6 8 0q-4 3 -8 0z" fill="#8ad05a"/>`;
 return`<svg class="kzd" viewBox="0 10 100 40" aria-hidden="true">${g}</svg>`}
const kzMiso=()=>`<svg viewBox="0 0 40 44" aria-hidden="true"><path d="M20 4q-3 4 0 8M26 6q-3 4 0 8" stroke="#fff" stroke-opacity=".6" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M4 20h32q-2 18 -16 18t-16 -18z" fill="#a8302a"/><ellipse cx="20" cy="20" rx="16" ry="4" fill="#d9a85a"/><rect x="12" y="18" width="5" height="3" fill="#fff"/><path d="M22 19h6" stroke="#4aa83a" stroke-width="2"/></svg>`;
const kzTea=()=>`<svg viewBox="0 0 40 44" aria-hidden="true"><path d="M17 6q-3 4 0 8M23 4q-3 4 0 8" stroke="#fff" stroke-opacity=".6" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M9 16h22l-2 22q-1 3 -4 3h-10q-3 0 -4 -3z" fill="#e8e0d0"/><ellipse cx="20" cy="17" rx="11" ry="3" fill="#8ac05a"/><path d="M11 26h18" stroke="#6a8aa8" stroke-width="2"/></svg>`;
const kzIcoSu=id=>{const s=b=>`<svg viewBox="0 0 40 40" aria-hidden="true">${b}</svg>`;return{
 ni:s(`<ellipse cx="20" cy="24" rx="15" ry="9" fill="#fbf8f0" stroke="#e4dccb"/><path d="M12 23q2 -2 4 0M20 27q2 -2 4 0M24 21q2 -2 4 0" stroke="#d8cfb8" fill="none"/>`),
 mk:s(`<rect x="7" y="9" width="26" height="22" rx="2" fill="#1f2a24"/><path d="M10 13h20M10 20h20M10 27h20" stroke="#3a4a3a" stroke-width="1.5"/>`),
 sm:s(`<path d="M5 26q15 -16 30 -4q-2 6 -15 7t-15 -3z" fill="#ff8a5a"/><path d="M12 24l5 -5M18 24l5 -5M24 25l5 -5" stroke="#fff" stroke-opacity=".75" stroke-width="2"/>`),
 th:s(`<rect x="6" y="14" width="28" height="15" rx="4" fill="#d8304a"/><path d="M10 19h20" stroke="#ff7a8a" stroke-opacity=".6" stroke-width="2"/>`),
 cv:s(`<path d="M8 26q2 -14 16 -14q8 0 8 6q0 4 -6 4q-6 0 -8 6z" fill="#ff9a6a"/><path d="M14 16l2 8M20 13l1 8M26 14l-1 6" stroke="#fff" stroke-opacity=".6" stroke-width="1.6"/><path d="M8 26l-4 4 6 1z" fill="#e8582e"/>`),
 wa:s(`<path d="M10 28q4 -16 10 -16t10 16q-10 4 -20 0z" fill="#8ad05a"/><path d="M16 22q4 -6 8 0" stroke="#bfe890" stroke-width="2" fill="none"/>`),
 av:s(`<path d="M20 6c9 0 13 12 13 18c0 7 -6 11 -13 11s-13 -4 -13 -11c0 -6 4 -18 13 -18z" fill="#4a8a2a"/><path d="M20 9c7 0 10 10 10 15c0 5 -4 8 -10 8s-10 -3 -10 -8c0 -5 3 -15 10 -15z" fill="#bfe08a"/><circle cx="20" cy="25" r="5" fill="#8a5a30"/>`),
 oe:s(`<path d="M6 22h28q-2 12 -14 12t-14 -12z" fill="#5a4a8a"/>${[[12,20],[17,18],[22,19],[27,20],[15,15],[20,14],[25,16]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#ff7a2a"/>`).join('')}`),
 se:s(`<path d="M10 14h20v18q0 3 -3 3h-14q-3 0 -3 -3z" fill="#fff" fill-opacity=".7" stroke="#c8d2e8"/>${[[15,24],[20,28],[25,22],[18,20],[23,30]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="1.8" ry="1" fill="#d9c08a"/>`).join('')}<rect x="9" y="9" width="22" height="5" rx="2" fill="#2a2a3a"/>`),
 fries:s(`<path d="M6 18h28q-2 14 -14 14t-14 -14z" fill="#a8302a"/><ellipse cx="20" cy="18" rx="14" ry="3.5" fill="#d9a85a"/>`),
 drink:s(`<path d="M8 12h24q0 12 -6 14l-2 8h-8l-2 -8q-6 -2 -6 -14z" fill="#3a6a5a"/><path d="M30 14q6 0 5 6t-6 4" stroke="#3a6a5a" stroke-width="3" fill="none"/>`)}[id]};
function kzGrillSu(id,ok){const c=KZSU[id];
 return ok?`<svg viewBox="0 0 40 30" aria-hidden="true">${[8,18,28].map((x,i)=>`<path d="M${x-7} ${19-i}q7 -8 14 0q-2 4 -7 4t-7 -4z" fill="${c}" stroke="#fff" stroke-opacity=".5"/>`).join('')}</svg>`
  :`<svg viewBox="0 0 40 30" aria-hidden="true"><path d="M4 18q16 -14 32 -2q-2 6 -16 7t-16 -5z" fill="${c}"/><path d="M10 16l4 -4M16 16l4 -4M22 17l4 -4" stroke="#fff" stroke-opacity=".6" stroke-width="1.6"/></svg>`}
function kzBgSu(){
 const st=[...Array(34)].map((_,i)=>`<circle cx="${(i*73+29)%400}" cy="${-60+(i*41+13)%200}" r="${.8+i%3*.5}" fill="#fff" opacity="${.45+i%2*.35}"/>`).join('');
 const lan=(x,y)=>`<path d="M${x} ${y-24}v10" stroke="#3a2a1a" stroke-width="2"/><circle cx="${x}" cy="${y}" r="30" fill="#ffc870" opacity=".16"/><circle cx="${x}" cy="${y}" r="14" fill="#ffcf7a"/><circle cx="${x-4}" cy="${y-4}" r="5" fill="#fff6d0" opacity=".8"/>`;
 const chou=(x,y)=>`<path d="M${x} ${y-16}v4" stroke="#3a2a1a" stroke-width="2"/><rect x="${x-9}" y="${y-12}" width="18" height="4" rx="1" fill="#2a1a10"/><ellipse cx="${x}" cy="${y+4}" rx="11" ry="14" fill="#e8402e"/><path d="M${x-10} ${y-2}h20M${x-11} ${y+4}h22M${x-10} ${y+10}h20" stroke="#b02a1e" stroke-width="1.2"/><rect x="${x-9}" y="${y+17}" width="18" height="4" rx="1" fill="#2a1a10"/><circle cx="${x}" cy="${y+4}" r="22" fill="#ff7a5a" opacity=".14"/>`;
 return`<svg class="kzbg" viewBox="0 -70 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="kzus" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1034"/><stop offset=".6" stop-color="#2a2a6a"/><stop offset="1" stop-color="#4a3a7a"/></linearGradient><linearGradient id="kzuw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a3a5a"/><stop offset="1" stop-color="#0c1c34"/></linearGradient><linearGradient id="kzut" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7af0e0" stop-opacity=".75"/><stop offset="1" stop-color="#2aa8b8" stop-opacity=".75"/></linearGradient></defs>
<rect y="-70" width="400" height="400" fill="url(#kzus)"/>${st}<circle cx="300" cy="10" r="16" fill="#fff3c8"/><circle cx="300" cy="10" r="40" fill="#fff3c8" opacity=".1"/>
<path d="M0 150l30 -26 22 10 26 -30 30 34 20 -8 20 20z" fill="#1c2a44"/><path d="M60 118q-6 -18 2 -26M62 96q-10 -4 -16 2M62 96q8 -6 14 0M62 96q0 -8 6 -12" stroke="#1c2a44" stroke-width="3" fill="none"/><path d="M250 150l40 -36 30 16 40 -24 40 44z" fill="#1c2a44"/><rect x="200" y="132" width="40" height="8" fill="#2a3a54"/><rect x="214" y="122" width="12" height="10" fill="#2a3a54"/><circle cx="220" cy="126" r="2" fill="#ffd36b"/>
<rect x="0" y="150" width="400" height="90" fill="url(#kzuw)"/>${[...Array(9)].map((_,i)=>`<path d="M${280+(i%3)*10-i*2} ${158+i*8}h${30-i*2}" stroke="#fff3c8" stroke-opacity="${.5-i*.04}" stroke-width="2.4" stroke-linecap="round"/>`).join('')}${[...Array(10)].map((_,i)=>`<path d="M${(i*47)%400} ${170+(i*23)%60}q8 -4 16 0" stroke="#7ab0d8" stroke-opacity=".35" stroke-width="1.6" fill="none"/>`).join('')}
<rect x="10" y="-70" width="16" height="306" fill="#5a3a24"/><rect x="374" y="-70" width="16" height="306" fill="#5a3a24"/><rect x="0" y="-34" width="400" height="20" fill="#7a4a2a"/><path d="M0 -14h400" stroke="#3a2414" stroke-width="3"/>${[...Array(16)].map((_,i)=>`<circle cx="${12+i*25}" cy="-8" r="2.4" fill="#ff7ac8"/><circle cx="${12+i*25}" cy="-8" r="6" fill="#ff7ac8" opacity=".25"/>`).join('')}
<path d="M165 -14v18M235 -14v18" stroke="#3a2a1a" stroke-width="2"/><rect x="150" y="4" width="100" height="26" rx="4" fill="#1a1020" stroke="#3a2a3a" stroke-width="2"/><text x="200" y="23" text-anchor="middle" font-family="monospace" font-size="15" font-weight="700" letter-spacing="3" fill="#ff5aa8">OUVERT</text><rect x="146" y="0" width="108" height="34" rx="6" fill="#ff5aa8" opacity=".12"/>
${lan(100,22)}${lan(300,22)}${chou(46,10)}${chou(354,10)}
<rect x="30" y="54" width="340" height="7" fill="#6a4228"/>${[...Array(18)].map((_,i)=>{const x=40+i*18,c=['#2a5a3a','#3a2a1a','#7a2a2a','#2a5a3a','#d8c87a'][i%5];return`<rect x="${x}" y="${36-i%3*3}" width="8" height="${18+i%3*3}" rx="2" fill="${c}"/><rect x="${x+2}" y="${30-i%3*3}" width="4" height="7" fill="${c}"/><rect x="${x+1}" y="${44}" width="6" height="6" fill="#f2e8d0" opacity=".85"/>`}).join('')}
<g transform="translate(28 74)"><text font-family="Fraunces,Georgia,serif" font-size="22" font-weight="700" fill="#8af0ff" opacity=".95">Sushi</text><text y="20" font-family="Fraunces,Georgia,serif" font-size="12" fill="#ffb3e0" letter-spacing="1.5">des Vagues</text></g>
<rect x="296" y="84" width="72" height="54" rx="4" fill="url(#kzut)" stroke="#bff6ff" stroke-width="2"/>${[[312,104,1],[340,120,-1],[350,96,1]].map(([x,y,d])=>`<path d="M${x} ${y}q${8*d} -6 ${16*d} 0q${-8*d} 6 ${-16*d} 0zM${x} ${y}l${-6*d} -4v8z" fill="#ff9a6a" opacity=".85"/>`).join('')}<path d="M300 92q30 -6 64 0" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>
<g opacity=".95">${[[372,-60,16],[352,-56,12],[388,-40,14],[360,-34,10],[338,-46,9],[392,-62,10]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#ffb3cf"/>`).join('')}<path d="M400 -50q-30 -4 -46 6" stroke="#4a2a2a" stroke-width="4" fill="none"/></g>
<rect x="0" y="236" width="400" height="94" fill="#6a4228"/>${[...Array(6)].map((_,i)=>`<path d="M0 ${246+i*14}h400" stroke="#4a2a18" stroke-width="2"/>`).join('')}
<path d="M0 226h400" stroke="#c9935a" stroke-width="4"/>${[...Array(11)].map((_,i)=>`<path d="M${i*40} 226v10" stroke="#c9935a" stroke-width="3"/>`).join('')}</svg>`}
function kzAmbSu(L0){
 const G=(k,m,id)=>`<span class="kzag">${kzGuy(KZL[(L0+k)%KZL.length],m,'a'+id)}</span>`,
  su=kzSushi({b:'mk',p:'sm',t:['av']}),ni=kzSushi({b:'ni',p:'th',t:[]}),
  tb=`<svg class="kzat" viewBox="0 0 80 40" aria-hidden="true"><rect x="2" y="4" width="76" height="8" rx="2" fill="#c9935a"/><path d="M14 12v26M66 12v26" stroke="#6a4228" stroke-width="4"/></svg>`,
  say=(t,d)=>`<span class="kztk" style="animation-delay:${d}s">${t}</span>`,food=(f,c)=>`<span class="kzaf ${c||''}">${f}</span>`;
 const cat=`<svg viewBox="0 0 50 30" aria-hidden="true"><path d="M8 22q0 -10 14 -10h12q8 0 8 6v6q0 3 -3 3h-28q-3 0 -3 -5z" fill="#2a2a3a"/><circle cx="40" cy="12" r="7" fill="#2a2a3a"/><path d="M35 7l1 -6 4 4zM42 6l4 -5 1 6z" fill="#2a2a3a"/><path d="M8 20q-8 -2 -6 -12" stroke="#2a2a3a" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="42" cy="12" r="1.2" fill="#ffd36b"/><path d="M14 27v3M22 27v3M32 27v3M38 27v3" stroke="#2a2a3a" stroke-width="3"/><path d="M10 18h30" stroke="#fff" stroke-opacity=".3" stroke-width="3"/></svg>`;
 const pet=[...Array(9)].map((_,i)=>`<i class="kzpe" style="left:${(i*37+11)%96}%;animation-delay:${-i*1.7}s;animation-duration:${9+i%4*2}s"></i>`).join('');
 return`<div class="kzam" aria-hidden="true">${pet}<div class="kzwk kzcat" style="bottom:calc(26px + 150px);animation-duration:40s"><span class="kzwb">${cat}</span></div>
<div class="kzaz z1">${tb}<div class="kzaw eat">${G(2,'happy',1)}${food(su)}</div><div class="kzaw eat d2 fl">${G(6,'wait',2)}${food(kzTea(),'dk')}</div>${say('…',1)}${say('Oishii !',6)}</div>
<div class="kzaz z2">${tb}<div class="kzaw eat d3">${G(9,'happy',3)}${food(ni)}</div><div class="kzaw eat fl">${G(4,'wait',4)}${food(su,'r')}</div>${say('♥',3.5)}${say('♪',8)}</div></div>`}

/* ---------- ambiance : des voisins qui mangent, bavardent et passent ---------- */
function kzAmb(rs,L0){if(rs===2)return kzAmbSu(L0);const hd=rs===1;
 const G=(k,m,id)=>`<span class="kzag">${kzGuy(KZL[(L0+k)%KZL.length],m,'a'+id)}</span>`,
  burg=kzDish({b:'bb',p:'vi',t:['la','to']}),dog=kzDish({b:'ph',p:'sa',t:['ke','mo']}),
  tb=`<svg class="kzat" viewBox="0 0 80 40" aria-hidden="true"><ellipse cx="40" cy="8" rx="36" ry="7" fill="${hd?'#c9935a':'#f2d8b0'}"/><ellipse cx="40" cy="8" rx="36" ry="7" fill="none" stroke="${hd?'#8a5a30':'#c9a070'}" stroke-width="2"/><path d="M40 14v24M28 38h24" stroke="${hd?'#6a4424':'#8a7ad8'}" stroke-width="4" stroke-linecap="round"/><ellipse cx="26" cy="7" rx="9" ry="3" fill="#fff"/><ellipse cx="54" cy="7" rx="9" ry="3" fill="#fff"/></svg>`,
  say=(t,d)=>`<span class="kztk" style="animation-delay:${d}s">${t}</span>`,
  food=(f,c)=>`<span class="kzaf ${c||''}">${f}</span>`;
 const a=hd?
  `<div class="kzaz z1"><span class="kzbench"></span><div class="kzaw eat">${G(1,'happy',1)}${food(dog)}</div><div class="kzaw eat d2">${G(4,'wait',2)}${food(dog,'r')}</div>${say('…',1)}${say('♪',5.5)}</div>
   <div class="kzaz z2">${tb}<div class="kzaw eat d3">${G(7,'happy',3)}${food(kzDrink(),'dk')}</div>${say('♥',3)}</div>
   <div class="kzwk" style="bottom:calc(26px + 150px);animation-duration:30s"><span class="kzwb">${G(2,'wait',4)}</span></div>
   <div class="kzwk rv" style="bottom:calc(26px + 158px);animation-duration:38s;animation-delay:-14s"><span class="kzwb">${G(9,'happy',5)}</span></div>`
 :`<div class="kzaz z1">${tb}<div class="kzaw eat">${G(1,'happy',1)}${food(burg)}</div><div class="kzaw eat d2 fl">${G(5,'wait',2)}${food(burg,'r')}</div>${say('…',1)}${say('Miam !',6)}</div>
   <div class="kzaz z2">${tb}<div class="kzaw eat d3">${G(3,'wait',3)}${food(kzFries())}</div><div class="kzaw eat fl">${G(8,'happy',4)}${food(burg,'r')}</div>${say('♥',3.5)}${say('…',8)}</div>
   <div class="kzwk" style="bottom:calc(26px + 152px);animation-duration:34s;animation-delay:-6s"><span class="kzwb">${G(6,'happy',5)}<span class="kzty">${burg}</span></span></div>`;
 return`<div class="kzam" aria-hidden="true">${a.split('\n').map(x=>x.trim()).sort((p,q)=>(q.startsWith('<div class="kzwk')?1:0)-(p.startsWith('<div class="kzwk')?1:0)).join('')}</div>`}
