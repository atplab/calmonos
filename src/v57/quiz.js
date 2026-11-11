/* ---------- Quiz : le bonhomme pose une question de culture générale ----------
   Un niveau = une question à 4 réponses. Bonne réponse : +1 ❄ (la première fois) et le bonhomme est content.
   Mauvaise réponse : la bonne est montrée, le bonhomme est déçu, et on passe quand même à la suite. */
const QZ=[
['Quelle est la capitale de l’Australie ?',['Canberra','Sydney','Melbourne','Perth'],'Canberra a été choisie comme compromis entre Sydney et Melbourne.'],
['Quel est le plus grand océan du monde ?',['L’océan Pacifique','L’océan Atlantique','L’océan Indien','L’océan Arctique'],'Il couvre environ un tiers de la surface de la Terre.'],
['Qui a peint la Joconde ?',['Léonard de Vinci','Michel-Ange','Raphaël','Botticelli'],'Elle est exposée au musée du Louvre, à Paris.'],
['Quelle planète est surnommée la planète rouge ?',['Mars','Vénus','Jupiter','Mercure'],'Sa couleur vient de l’oxyde de fer présent à sa surface.'],
['Combien de côtés a un hexagone ?',['6','5','7','8'],''],
['Quel est le plus long fleuve de France ?',['La Loire','La Seine','Le Rhône','La Garonne'],'La Loire mesure environ 1 000 km.'],
['Dans quel pays se trouve le Machu Picchu ?',['Le Pérou','Le Mexique','La Bolivie','Le Chili'],'Cette cité inca est perchée dans les Andes.'],
['Quel gaz les plantes absorbent-elles pour la photosynthèse ?',['Le dioxyde de carbone','L’oxygène','L’azote','L’hélium'],'Elles captent le CO₂ et rejettent de l’oxygène.'],
['Qui a écrit « Le Petit Prince » ?',['Antoine de Saint-Exupéry','Jules Verne','Victor Hugo','Albert Camus'],''],
['Quel est l’animal terrestre le plus rapide ?',['Le guépard','Le lion','L’antilope','Le cheval'],'Il peut dépasser 100 km/h sur de courtes distances.'],
['En quelle année l’être humain a-t-il marché sur la Lune pour la première fois ?',['1969','1965','1972','1959'],'Neil Armstrong a posé le pied sur la Lune en juillet 1969.'],
['Quelle langue compte le plus de locuteurs natifs dans le monde ?',['Le mandarin','L’anglais','L’espagnol','Le hindi'],''],
['Combien de joueurs une équipe de soccer aligne-t-elle sur le terrain ?',['11','10','9','12'],''],
['Quel est le symbole chimique de l’or ?',['Au','Or','Ag','Fe'],'Au vient du mot latin « aurum ».'],
['Quelle ville est surnommée la Ville lumière ?',['Paris','Lyon','Rome','Vienne'],''],
['Combien de touches compte un piano standard ?',['88','76','92','100'],'52 touches blanches et 36 touches noires.'],
['Quel est le plus grand mammifère du monde ?',['La baleine bleue','L’éléphant d’Afrique','La girafe','Le requin-baleine'],'Elle peut mesurer près de 30 mètres.'],
['Quel pays a la forme d’une botte ?',['L’Italie','L’Espagne','La Grèce','Le Portugal'],''],
['Qui a atteint l’Amérique en 1492 pour le compte de l’Espagne ?',['Christophe Colomb','Magellan','Vasco de Gama','Jacques Cartier'],''],
['Combien de cordes a une guitare classique ?',['6','4','5','7'],''],
['À quelle température l’eau bout-elle au niveau de la mer ?',['100 °C','90 °C','110 °C','120 °C'],'C’est à la pression atmosphérique normale.'],
['Quel peintre a réalisé « La Nuit étoilée » ?',['Vincent van Gogh','Claude Monet','Paul Cézanne','Pablo Picasso'],'Il l’a peinte en 1889.'],
['Quel est le plus petit pays du monde ?',['Le Vatican','Monaco','Saint-Marin','Le Liechtenstein'],'Il couvre à peine plus de 0,4 km².'],
['Quelle est la capitale du Canada ?',['Ottawa','Toronto','Montréal','Québec'],'Ottawa se trouve en Ontario, juste en face du Québec.'],
['Combien d’os compte le squelette d’un adulte ?',['206','186','226','256'],''],
['Qui a écrit « Les Misérables » ?',['Victor Hugo','Émile Zola','Alexandre Dumas','Gustave Flaubert'],'Le roman a été publié en 1862.'],
['Quelle planète est connue pour ses anneaux spectaculaires ?',['Saturne','Mars','Mercure','Vénus'],''],
['Quel est le plus vaste désert chaud du monde ?',['Le Sahara','Le Gobi','Le Kalahari','L’Atacama'],'Il s’étend sur environ 9 millions de km².'],
['En quelle année a débuté la Révolution française ?',['1789','1799','1769','1815'],'La prise de la Bastille a eu lieu le 14 juillet 1789.'],
['Quel est le plus grand organe du corps humain ?',['La peau','Le foie','Le cerveau','Les poumons'],''],
['Quelle est la monnaie du Japon ?',['Le yen','Le won','Le yuan','Le baht'],''],
['Quelle est la plus haute montagne du monde ?',['L’Everest','Le K2','Le mont Blanc','Le Kilimandjaro'],'Elle culmine à environ 8 849 mètres.'],
['Quel animal pond des œufs tout en allaitant ses petits ?',['L’ornithorynque','Le kangourou','La chauve-souris','Le pingouin'],''],
['Combien de minutes compte une journée ?',['1 440','1 240','1 640','1 340'],'24 heures × 60 minutes.'],
['Quel fleuve traverse Le Caire ?',['Le Nil','Le Tigre','Le Congo','Le Niger'],''],
['Quel est l’élément chimique le plus abondant de l’univers ?',['L’hydrogène','L’hélium','L’oxygène','Le carbone'],''],
['Quel peintre est célèbre pour ses séries de nymphéas ?',['Claude Monet','Édouard Manet','Auguste Renoir','Edgar Degas'],'Il les a peints dans son jardin de Giverny.'],
['Quelle feuille figure sur le drapeau du Canada ?',['L’érable','Le chêne','Le bouleau','Le peuplier'],'C’est une feuille d’érable à onze pointes.'],
['Quel est le plus grand récif corallien du monde ?',['La Grande Barrière de corail','Le récif de Belize','Le récif de la mer Rouge','Le récif de Floride'],'Il se trouve au large de l’Australie et mesure plus de 2 000 km.']
];
const QZX=[
['Quels animaux tirent le traîneau du père Noël ?',['Des rennes','Des chevaux','Des loups','Des bœufs'],''],
['Dans quel pays est née la tradition du sapin de Noël décoré ?',['L’Allemagne','La France','L’Italie','L’Espagne'],''],
['Combien de branches principales ont en général les cristaux de neige ?',['6','4','8','5'],'Les cristaux de glace s’organisent en hexagone.'],
['Où vivent les manchots empereurs ?',['En Antarctique','Au Groenland','En Alaska','En Sibérie'],''],
['Quel dessert de Noël a la forme d’un tronc d’arbre ?',['La bûche','Le Paris-Brest','Le saint-honoré','Le mille-feuille'],''],
['Quelle plante aux feuilles piquantes et aux baies rouges décore Noël ?',['Le houx','Le lierre','Le laurier','L’if'],''],
['Quel pays offre chaque année un grand sapin à Londres, à Trafalgar Square ?',['La Norvège','La Suède','La Finlande','Le Danemark'],'C’est un remerciement pour l’aide reçue pendant la guerre.'],
['Quelle saison commence vers le 21 décembre dans l’hémisphère nord ?',['L’hiver','L’automne','Le printemps','L’été'],'C’est le solstice d’hiver, la nuit la plus longue de l’année.'],
['Quel phénomène lumineux colore le ciel près des pôles ?',['L’aurore boréale','L’arc-en-ciel','La comète','L’éclipse'],'Elle naît de particules du Soleil qui rencontrent l’atmosphère.'],
['Quelle grande île est couverte de glace à environ 80 % ?',['Le Groenland','L’Islande','Madagascar','Bornéo'],'']
];
const qzFr=s=>String(s).replace(/ ([?!:;»])/g,' $1').replace(/« /g,'« ');
/* le bonhomme : content (ok), déçu (no) ou en attente (ask) */
const qzGuy=m=>{
 const ok=m==='ok',no=m==='no',ey='stroke="#4a4290" stroke-width="1.9" fill="none" stroke-linecap="round"';
 const ant=no?`<path d="M1 -38Q9 -42 12 -36" stroke="#a79bdc" stroke-width="2" fill="none" stroke-linecap="round"/><polygon points="${sStar(13,-34,4.8,2.3)}" fill="#ddd7f7" stroke="#b9acec" stroke-width="1.2" stroke-linejoin="round"/>`
  :`<path d="M1 -38Q6 -46 4 -52" stroke="#a79bdc" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="4" cy="-55" r="9" fill="url(#qzg)"/><polygon points="${sStar(4,-55,5.8,2.8)}" fill="url(#qzs)" stroke="#ffc83d" stroke-width="1.6" stroke-linejoin="round"/>`;
 const hands=ok?[[-17.6,-27],[17.6,-27]]:no?[[-13.6,-5.5],[13.6,-5.5]]:[[-14.8,-10],[14.8,-10]];
 const face=ok?`<path d="M-9.2 -21.4q3.4 -4.2 6.8 0M2.4 -21.4q3.4 -4.2 6.8 0" ${ey}/><path d="M-4.6 -17.6Q0 -9.4 4.6 -17.6Z" fill="#b8456a" stroke="#b8456a" stroke-width="1" stroke-linejoin="round"/><path d="M-2.2 -13.4q2.2 -2.2 4.4 0q-2.2 1.8 -4.4 0z" fill="#ff8fa8"/><ellipse cx="-11" cy="-16.6" rx="2.7" ry="1.7" fill="#ff9db8" opacity=".7"/><ellipse cx="11" cy="-16.6" rx="2.7" ry="1.7" fill="#ff9db8" opacity=".7"/>`
  :no?`<ellipse cx="-5.8" cy="-21" rx="1.9" ry="2.6" fill="#4a4290"/><ellipse cx="5.8" cy="-21" rx="1.9" ry="2.6" fill="#4a4290"/><circle cx="-5.2" cy="-22" r=".75" fill="#fff"/><circle cx="6.4" cy="-22" r=".75" fill="#fff"/><path d="M-10.4 -24.2L-3.6 -27.4M10.4 -24.2L3.6 -27.4" ${ey}/><path d="M-3.8 -13Q0 -17.2 3.8 -13" stroke="#7a6cc0" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M-9.8 -17.6q2.2 2.8 0 4.6q-2.2 -1.8 0 -4.6z" fill="#8fd0ff" stroke="#5aa8e0" stroke-width=".7"/>`
  :`<ellipse cx="-5.8" cy="-23" rx="2.1" ry="2.9" fill="#4a4290"/><ellipse cx="5.8" cy="-23" rx="2.1" ry="2.9" fill="#4a4290"/><circle cx="-5.1" cy="-24.2" r=".85" fill="#fff"/><circle cx="6.5" cy="-24.2" r=".85" fill="#fff"/><path d="M-2.8 -16.4q2.8 2.6 5.6 0" stroke="#7a6cc0" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
 const spk=ok?`<path class="qzsp" d="M-21 -44l1.2 2.8 2.8 1.2-2.8 1.2-1.2 2.8-1.2-2.8-2.8-1.2 2.8-1.2z" fill="#ffe27a"/><path class="qzsp s2" d="M22 -36l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z" fill="#ffe27a"/><path class="qzsp s3" d="M20 -8l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9z" fill="#fff6c8"/>`:'';
 return`<svg viewBox="-28 -66 56 68" aria-hidden="true"><defs><radialGradient id="qzb" cx=".36" cy=".26" r=".98"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#ece6ff"/><stop offset="1" stop-color="#b9acec"/></radialGradient><radialGradient id="qzs" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff6c2"/><stop offset="1" stop-color="#ffc83d"/></radialGradient><radialGradient id="qzg"><stop offset="0" stop-color="#fff3c0" stop-opacity=".85"/><stop offset="1" stop-color="#fff3c0" stop-opacity="0"/></radialGradient></defs><ellipse cx="0" cy="-1" rx="12" ry="2.2" fill="rgba(0,0,0,.2)"/>${ant}<path d="M0 -39C10 -39 15.5 -29 15.5 -19C15.5 -8 9 -2 0 -2C-9 -2 -15.5 -8 -15.5 -19C-15.5 -29 -10 -39 0 -39Z" fill="url(#qzb)"/><ellipse cx="-6.4" cy="-30" rx="3.2" ry="5.4" fill="#fff" opacity=".6" transform="rotate(18 -6.4 -30)"/>${face}<g fill="#efb63e"><circle cx="-11.8" cy="-18.4" r="1.1"/><circle cx="-9.6" cy="-16" r="1.1"/><circle cx="-12.6" cy="-15.2" r=".9"/><circle cx="11.8" cy="-18.4" r="1.1"/><circle cx="9.6" cy="-16" r="1.1"/><circle cx="12.6" cy="-15.2" r=".9"/></g>${hands.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.6" fill="#e6defc" stroke="#c7bbf0" stroke-width="1"/>`).join('')}${spk}</svg>`};
/* questions tirées au hasard, dans un ordre propre à chaque joueur : on ne revoit une question qu’après avoir fait le tour */
const qzPool=()=>QZ.length+(xmasOn()?QZX.length:0),qzAt=i=>i<QZ.length?QZ[i]:QZX[i-QZ.length];
function qzDeck(){
 const n=qzPool();let d=st.get('qz:d',null);
 if(!d||!Array.isArray(d.o)||d.n!==n||!Number.isInteger(d.i)||d.i<0||d.i>=d.o.length){
  const prev=d&&Array.isArray(d.o)&&d.o.length?d.o[Math.min(d.o.length-1,Math.max(0,(d.i||0)-1))]:-1;
  d={n,i:0,o:sh([...Array(n).keys()])};if(n>1&&d.o[0]===prev)d.o.push(d.o.shift());st.set('qz:d',d)}
 return d}
function pQuiz(r){
 const dk=qzDeck(),qi=r&&Number.isInteger(r.i)&&r.i>=0&&r.i<qzPool()?r.i:dk.o[dk.i],q=qzAt(qi),o=r&&Array.isArray(r.o)&&r.o.length===4&&[0,1,2,3].every(i=>r.o.includes(i))?r.o:sh([0,1,2,3]),ci=o.indexOf(0);
 let done=false,good=false,pick=-1,say='',gain=0;
 snap=()=>({o,i:qi});
 const L='ABCD';
 const d=()=>{
  const mood=!done?'ask':good?'ok':'no';
  frame(`<div class="qz"><div class="qz-h"><div class="qz-m ${mood}">${qzGuy(mood)}</div><div class="qz-bub"><small>${done?say:qi>=QZ.length?'Question de fêtes':'Question'}</small><p class="qz-q">${qzFr(q[0])}</p></div></div><div class="qz-ch" role="group" aria-label="Réponses">${o.map((k,i)=>`<button class="qz-b${done?(i===ci?' ok':i===pick?' no':' dim'):''}" data-a="qa" data-v="${i}"${done?' disabled':''}><i>${L[i]}</i><span>${qzFr(q[1][k])}</span></button>`).join('')}</div><p class="qz-fb" id="qzfb" role="status" aria-live="polite">${!done?'':good?'Bonne réponse ! +1 ❄':'La bonne réponse : <b>'+qzFr(q[1][0])+'</b>'}${done&&q[2]?`<span class="qz-e">${qzFr(q[2])}</span>`:''}</p>${done?`<button class="btn qz-next" data-a="qn">Question suivante</button>`:''}</div>`);
  if(done){const b=$('.qz-next');if(b)b.focus({preventScroll:true})}
 };
 act.qa=v=>{
  if(done)return;const i=+v;if(!(i>=0&&i<4))return;
  done=true;pick=i;good=i===ci;
  gain=0;
  if(good){fl+=1;st.set('fl',fl);styGain(1);gain=1}
  const k=qzDeck();k.i=Math.min(k.o.length,k.i+1);st.set('qz:d',k);
  st.set('p:quiz:0',null);st.set('last',{g:'quiz',daily:false,lv:0,date:today,done:0});snap=null;
  const A=good?['Bravo !','Exact !','Bien joué !','Parfait !']:['Oh non…','Dommage…','Aïe…','Presque…'];say=A[Math.floor(Math.random()*A.length)];
  d();
  if(good){[523,659,784].forEach((f,k)=>setTimeout(()=>sfx(f,.5),k*130));vib([20,40,20]);const m=$('.qz-m');if(m)confetti(m)}
  else{sfx(262,.35);setTimeout(()=>sfx(196,.5),180);vib(60)}
 };
 act.qn=()=>{if(!done)return;start('quiz',false,0)};
 d();
}
