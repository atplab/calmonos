/* ---------- Constellations : un jeu d’alignements (match-3) ----------
   4 alignés → une lune (efface sa ligne) · carré de 4 → une étoile (explose autour) · 5 alignés → un soleil (échangé avec un élément, efface tous ceux-là) */
const M3KX=['#3fae6a','#e3534f','#b8742f','#f4ead2','#d9a066','#f2c14e'],M3W=['Bien !','Super !','Magnifique !','Splendide !','Incroyable !'];
const M3P=['20,2 37,15 20,38 3,15','20,2 35,11 35,29 20,38 5,29 5,11','c','h','r','12,3 28,3 37,12 37,28 28,37 12,37 3,28 3,12'];
const M3SF=[...Array(10)].map((_,i)=>{const a=(-90+i*36)*Math.PI/180,r=i%2?8.8:18.5;return(20+r*Math.cos(a)).toFixed(1)+','+(21+r*Math.sin(a)).toFixed(1)}).join(' ');
const M3SD=[...Array(5)].map((_,i)=>{const a=(-90+i*72)*Math.PI/180;return`<circle cx="${(20+11*Math.cos(a)).toFixed(1)}" cy="${(21+11*Math.sin(a)).toFixed(1)}" r="1.3"/>`}).join('');
let M3XM=false;
const m3GemN=t=>{const k=t%6,hl='<ellipse cx="14" cy="12" rx="6.5" ry="3.4" transform="rotate(-35 14 12)" class="gh"/>';let b;
 if(k===0)b=`<polygon fill="rgba(25,10,50,.55)" stroke="rgba(25,10,50,.55)" stroke-width="8.6" stroke-linejoin="round" points="20.0,5.5 23.9,15.2 34.3,15.9 26.3,22.5 28.8,32.6 20.0,27.1 11.2,32.6 13.7,22.5 5.7,15.9 16.1,15.2"/><polygon style="fill:var(--c);stroke:var(--c)" stroke-width="5.4" stroke-linejoin="round" points="20.0,5.5 23.9,15.2 34.3,15.9 26.3,22.5 28.8,32.6 20.0,27.1 11.2,32.6 13.7,22.5 5.7,15.9 16.1,15.2"/><polygon fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.07)" stroke-width="2.4" stroke-linejoin="round" points="20.0,5.5 23.9,15.2 34.3,15.9 26.3,22.5 28.8,32.6 20.0,27.1 11.2,32.6 13.7,22.5 5.7,15.9 16.1,15.2" transform="translate(-.6 -1.2) scale(.97)"/><path d="M20.0 20.5 L20.0 7.3M20.0 20.5 L32.6 16.4M20.0 20.5 L27.8 31.2M20.0 20.5 L12.2 31.2M20.0 20.5 L7.4 16.4" fill="none" stroke="rgba(255,255,255,.42)" stroke-width="1.7" stroke-linecap="round"/><g fill="rgba(255,255,255,.8)"><circle cx="20.0" cy="13.7" r="1.15"/><circle cx="20.0" cy="10.3" r="1.15"/><circle cx="26.5" cy="18.4" r="1.15"/><circle cx="29.7" cy="17.3" r="1.15"/><circle cx="24.0" cy="26.0" r="1.15"/><circle cx="26.0" cy="28.8" r="1.15"/><circle cx="16.0" cy="26.0" r="1.15"/><circle cx="14.0" cy="28.8" r="1.15"/><circle cx="13.5" cy="18.4" r="1.15"/><circle cx="10.3" cy="17.3" r="1.15"/><circle cx="20" cy="20.5" r="2.8"/></g>`;
 else if(k===1)b=`<path class="gb" d="M20 35 7 22Q3 12 9.5 7.5Q15 4 20 6Q25 4 30.5 7.5Q37 12 33 22z"/><path class="gb" d="M15 34.4h10l-1.6 3.4h-6.8z"/><g class="gr"><path d="M20 34 9.5 9M20 34 14.5 6.5M20 34V6M20 34l5.5-27.5M20 34 30.5 9"/></g>${hl}`;
 else if(k===2)b=`<circle class="gb" cx="20" cy="20" r="15.5"/><circle cx="18" cy="18" r="11" fill="rgba(255,255,255,.3)"/><circle cx="14.5" cy="13.5" r="4.4" fill="rgba(255,255,255,.9)"/><path d="M31 5l1.3 3.2 3.2 1.3-3.2 1.3L31 14l-1.3-3.2-3.2-1.3 3.2-1.3z" fill="#fff"/>`;
 else if(k===3)b=`<g class="go"><path d="M20 36V21M20 27 11 18V9M20 22 29 14V6M11 18 5 14M29 14l6-4M20 22V11"/></g><g class="gc"><path d="M20 36V21M20 27 11 18V9M20 22 29 14V6M11 18 5 14M29 14l6-4M20 22V11"/></g><g class="gl"><path d="M18.4 33V22M10.2 16V10"/></g>`;
 else if(k===5)b=`<g class="go" style="stroke-width:6.4"><path d="M12.5 24Q9 29 12.5 33T11.5 38M20 25Q16.5 30 20 34T19 38.5M27.5 24Q31 29 27.5 33T28.5 38"/></g><g class="gc" style="stroke-width:3"><path d="M12.5 24Q9 29 12.5 33T11.5 38M20 25Q16.5 30 20 34T19 38.5M27.5 24Q31 29 27.5 33T28.5 38"/></g><path class="gb" d="M6.5 21Q6.5 4.5 20 4.5Q33.5 4.5 33.5 21Q33.5 24.5 30 24Q26.5 26.5 23 24Q20 26 17 24Q13.5 26.5 10 24Q6.5 24.5 6.5 21z"/><path d="M11 18Q11 9 20 9" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="15" r="1.8" fill="rgba(255,255,255,.55)"/><circle cx="28" cy="19.5" r="1.3" fill="rgba(255,255,255,.45)"/>${hl}`;
 else if(k===4)b=`<ellipse class="gb" cx="9" cy="13" rx="5.2" ry="2.9" transform="rotate(-35 9 13)"/><ellipse class="gb" cx="31" cy="13" rx="5.2" ry="2.9" transform="rotate(35 31 13)"/><ellipse class="gb" cx="10" cy="29" rx="4.4" ry="2.6" transform="rotate(35 10 29)"/><ellipse class="gb" cx="30" cy="29" rx="4.4" ry="2.6" transform="rotate(-35 30 29)"/><path class="gb" d="M17.6 33 20 38.5 22.4 33z"/><ellipse class="gb" cx="20" cy="7" rx="4.1" ry="4.4"/><ellipse class="gb" cx="20" cy="20.5" rx="11.2" ry="12.6"/><path d="M20 13 25 16.5V23.5L20 27 15 23.5V16.5z" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.55)" stroke-width="1.3" stroke-linejoin="round"/><path d="M25 16.5 30 13.5M25 23.5 30 27.5M20 27 20 32M15 23.5 10 27.5M15 16.5 10 13.5M20 13 20 9" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.2" stroke-linecap="round"/><path d="M12.5 15Q14 10.5 18 9.5" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.8" stroke-linecap="round"/>`;
 else{const s=M3P[k],f=s==='r'?'<rect x="4" y="4" width="32" height="32" rx="10"/>':`<polygon points="${s}"/>`;b=`<g class="gb">${f}</g><g class="gf">${f}</g>${hl}<circle cx="28" cy="29" r="1.8" class="gh2"/>`}
 return`<svg viewBox="0 0 40 40" aria-hidden="true">${b}</svg>`};
/* formes des plateaux (# = case jouable) */
const m3Gem=t=>M3XM?m3GemX(t):m3GemN(t);
const m3GemX=t=>{const k=t%6,hl='<ellipse cx="13" cy="12" rx="5" ry="2.6" transform="rotate(-35 13 12)" class="gh" opacity=".55"/>';let b;
 const D='stroke="rgba(25,10,50,.5)" stroke-width="1.2" stroke-linejoin="round"';
 /* sapin */
 if(k===0)b=`<rect x="17" y="31" width="6" height="6.5" rx="1" fill="#8a5a33" ${D}/><path class="gb" d="M20 12 32.5 33H7.5z"/><path class="gb" d="M20 6 30.5 24H9.5z"/><path class="gb" d="M20 2.5 28 15H12z"/><path d="M20 2.2l1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6-3 1.6.6-3.4-2.5-2.4 3.4-.5z" fill="#ffd94d" ${D}/><circle cx="16" cy="28" r="2.1" fill="#e3534f"/><circle cx="25" cy="22.5" r="1.9" fill="#ffd94d"/><circle cx="20" cy="15.5" r="1.6" fill="#e3534f"/><circle cx="26.5" cy="30" r="1.8" fill="#6fb6ff"/><circle cx="14.5" cy="21" r="1.6" fill="#6fb6ff"/>`;
 /* cadeau */
 else if(k===1)b=`<rect class="gb" x="6.5" y="17" width="27" height="19" rx="2.2"/><rect class="gb" x="4.5" y="12.5" width="31" height="7.5" rx="2.2"/><rect x="17.7" y="12.5" width="4.6" height="23.5" fill="#ffd94d" ${D}/><path d="M20 12C13 12 9 4.5 14 4.5 18 4.5 20 9 20 12ZM20 12C27 12 31 4.5 26 4.5 22 4.5 20 9 20 12Z" fill="#ffd94d" ${D}/><circle cx="20" cy="12.2" r="2.6" fill="#f2b81e" ${D}/>${hl}`;
 /* dinde rôtie */
 else if(k===2)b=`<ellipse cx="20" cy="32" rx="17.5" ry="5.6" fill="#eef2fa" ${D}/><ellipse cx="20" cy="31" rx="12.5" ry="3" fill="#dde4f2"/><g transform="rotate(-38 9 23)"><ellipse class="gb" cx="9" cy="23" rx="3.8" ry="6.8"/><circle cx="9" cy="16.2" r="2.1" fill="#fff6e6" ${D}/></g><g transform="rotate(38 31 23)"><ellipse class="gb" cx="31" cy="23" rx="3.8" ry="6.8"/><circle cx="31" cy="16.2" r="2.1" fill="#fff6e6" ${D}/></g><ellipse class="gb" cx="20" cy="21.5" rx="12" ry="10.2"/><path d="M12 19Q20 12.5 28 19M13 24Q20 19 27 24" fill="none" stroke="rgba(120,60,10,.45)" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="15" cy="16.6" rx="4.4" ry="2.1" transform="rotate(-25 15 16.6)" fill="rgba(255,255,255,.4)"/><g fill="#4fae5f"><ellipse cx="6" cy="31.5" rx="2.4" ry="1.3" transform="rotate(-20 6 31.5)"/><ellipse cx="34" cy="31.5" rx="2.4" ry="1.3" transform="rotate(20 34 31.5)"/></g><circle cx="9" cy="33" r="1.1" fill="#e3534f"/><circle cx="31.5" cy="33" r="1.1" fill="#e3534f"/>`;
 /* chandelle */
 else if(k===3)b=`<path d="M20 3.5C24.5 9 26 12 26 14.5A6 6 0 0 1 14 14.5C14 12 15.5 9 20 3.5Z" fill="#ffb72e" ${D}/><path d="M20 8.5C22.4 11.5 23 13 23 14.4A3 3 0 0 1 17 14.4C17 13 17.6 11.5 20 8.5Z" fill="#fff0a8"/><path d="M20 20.5V17.5" stroke="#3a2a22" stroke-width="1.4" stroke-linecap="round"/><rect class="gb" x="13.5" y="20.5" width="13" height="14" rx="2.2"/><path d="M13.5 24Q16 27 18.5 24T23.5 24 26.5 25" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="20" cy="35.5" rx="10.5" ry="3" fill="#d8a838" ${D}/><path d="M7 33Q10 29.5 14 33Q10.5 35.6 7 33ZM33 33Q30 29.5 26 33Q29.5 35.6 33 33Z" fill="#3fae6a" ${D}/><circle cx="20" cy="36" r="1.7" fill="#e3534f"/><circle cx="23" cy="35.7" r="1.4" fill="#e3534f"/>${hl}`;
 /* biscuit de Noël (bonhomme en pain d'épices) */
 else if(k===4)b=`<path class="gb" d="M20 3.2C23.5 3.2 26 5.7 26 9C26 11.6 24.6 13.4 23 14.4L33.5 12.8C36.2 12.4 38 14.4 37.6 17C37.2 19.6 35 20.8 32.6 21L26.5 21.4 32.2 32.6C33.4 35 32 37.6 29.4 38C27 38.4 25.2 36.8 24.2 35L20 28 15.8 35C14.8 36.8 13 38.4 10.6 38C8 37.6 6.6 35 7.8 32.6L13.5 21.4 7.4 21C5 20.8 2.8 19.6 2.4 17C2 14.4 3.8 12.4 6.5 12.8L17 14.4C15.4 13.4 14 11.6 14 9C14 5.7 16.5 3.2 20 3.2Z"/><g fill="none" stroke="#fff8ea" stroke-width="1.5" stroke-linecap="round"><path d="M6.5 16.6Q9 18.4 11.5 16.6M33.5 16.6Q31 18.4 28.5 16.6M10 33.5Q12 35 13.8 33.4M30 33.5Q28 35 26.2 33.4"/><path d="M17.3 11.4Q20 13.6 22.7 11.4"/></g><circle cx="17.6" cy="7.8" r="1.1" fill="#4a2a18"/><circle cx="22.4" cy="7.8" r="1.1" fill="#4a2a18"/><circle cx="20" cy="19" r="1.9" fill="#e3534f"/><circle cx="20" cy="24.2" r="1.9" fill="#3fae6a"/>`;
 /* cloche */
 else b=`<path d="M14 6Q20 -.5 26 6" fill="none" stroke="#e3534f" stroke-width="2.4" stroke-linecap="round"/><path class="gb" d="M20 4.5C26.2 4.5 29 9.6 29 16.5C29 24 32 27 34.5 30.5H5.5C8 27 11 24 11 16.5C11 9.6 13.8 4.5 20 4.5Z"/><circle cx="20" cy="34" r="3.2" fill="#d99a1c" ${D}/><path d="M12.8 12.5Q14.6 8 19 6.8" fill="none" stroke="rgba(255,255,255,.7)" stroke-width="2" stroke-linecap="round"/><path d="M11.6 28H28.4" stroke="rgba(120,70,0,.3)" stroke-width="1.5"/><path d="M20 5.5C17 3 14 4.5 15 7 16.5 7.5 18.5 7 20 5.5ZM20 5.5C23 3 26 4.5 25 7 23.5 7.5 21.5 7 20 5.5Z" fill="#e3534f" ${D}/>`;
 return`<svg viewBox="0 0 40 40" aria-hidden="true">${b}</svg>`};
/* formes des plateaux (# = case jouable) */
const M3SHAPES={
n_sq:['########','########','########','########','########','########','########','########'],
n_diamond:['...##...','..####..','.######.','########','########','.######.','..####..','...##...'],
n_circle:['..####..','.######.','########','########','########','########','.######.','..####..'],
n_fish:['........','..####.#','.#######','########','########','.#######','..####.#','........'],
n_coral:['.#..#...','.#..#.#.','.#..#.#.','##.###.#','##.###.#','########','########','########'],
n_heart:['.##..##.','########','########','########','.######.','..####..','...##...','........'],
n_tree:['...##...','..####..','.######.','..####..','.######.','########','...##...','...##...'],
n_star:['...##...','...##...','########','.######.','..####..','..####..','.##..##.','.#....#.'],
n_moon:['..####..','.####...','####....','####....','####....','####....','.####...','..####..'],
n_jelly:['..####..','.######.','########','########','.######.','.#.##.#.','.#.##.#.','.#....#.'],
tree:['...##...','..####..','.######.','..####..','.######.','########','########','...##...'],
gift:['.##..##.','.######.','########','########','########','########','########','########'],
star:['...##...','...##...','########','########','.######.','..####..','.######.','.##..##.'],
candle:['...##...','...##...','..####..','..####..','..####..','..####..','########','########'],
bell:['...##...','..####..','.######.','.######.','.######.','########','########','...##...'],
hat:['......##','.....###','....####','...#####','..######','.#######','########','########'],
beard:['########','###..###','.######.','.######.','..####..','..####..','...##...','...##...'],
stocking:['.#####..','.####...','.####...','.####...','.####...','.#######','.#######','..#####.'],
snowman:['..####..','..####..','...##...','.######.','########','########','########','.######.'],
sleigh:['......##','#.....##','##...###','########','########','.######.','########','#......#'],
reindeer:['#.#..#.#','.##..##.','.######.','.######.','.######.','..####..','...##...','...##...'],
elf:['...##...','..####..','.######.','..####..','########','.######.','..####..','.##..##.'],
ginger:['..####..','..####..','########','########','..####..','..####..','.##..##.','.##..##.'],
wreath:['..####..','.######.','###..###','##....##','##....##','###..###','.######.','..####..'],
heart:['.##..##.', '########', '########', '########', '.######.', '.######.', '..####..', '...##...'],
moon:['..#####.', '.#####..', '#####...', '####....', '####....', '#####...', '.#####..', '..#####.'],
house:['...##...', '..####..', '.######.', '########', '########', '###..###', '###..###', '###..###'],
igloo:['..####..', '.######.', '########', '########', '########', '########', '###..###', '###..###'],
plus:['..####..', '..####..', '########', '########', '########', '########', '..####..', '..####..'],
mitten:['.####...', '.####...', '.####.##', '.#######', '.#######', '.######.', '.######.', '..####..'],
mug:['#####...', '######..', '#####.##', '#####.##', '#####.##', '######..', '#####...', '.###....'],
diamond:['...##...', '..####..', '.######.', '########', '########', '.######.', '..####..', '...##...'],
crown:['#..##..#', '#..##..#', '##.##.##', '########', '########', '########', '.######.', '.######.'],
rocket:['...##...', '..####..', '..####..', '..####..', '..####..', '.######.', '########', '.##..##.'],
fish:['..##....', '.####..#', '######.#', '########', '########', '######.#', '.####..#', '..##....'],
butterfly:['##....##', '###..###', '########', '.######.', '.######.', '########', '###..###', '##....##'],
mushroom:['..####..', '.######.', '########', '########', '..####..', '..####..', '..####..', '.######.'],
owl:['#......#', '##....##', '########', '##.##.##', '########', '.######.', '.######.', '.##..##.'],
cat:['##....##', '###..###', '########', '##.##.##', '########', '.######.', '..####..', '.######.'],
arrow:['...##...', '..####..', '.######.', '########', '...##...', '...##...', '..####..', '..####..'],
hourglass:['########', '.######.', '..####..', '...##...', '...##...', '..####..', '.######.', '########'],
castle:['#.#..#.#', '########', '########', '##.##.##', '########', '########', '###..###', '###..###'],
boat:['...#....', '...##...', '...###..', '...####.', '...#....', '########', '.######.', '..####..'],
sun:['...##...', '.######.', '.######.', '########', '########', '.######.', '.######.', '...##...']};
const M3SHL=['tree','gift','star','candle','bell','hat','beard','stocking','snowman','sleigh','reindeer','elf','ginger','wreath','tree','gift','bell','hat','star','snowman','heart','moon','house','igloo','plus','mitten','mug','diamond','crown','rocket','fish','butterfly','mushroom','owl','cat','arrow','hourglass','castle','boat','sun'];
const M3SHN=['sq','diamond','circle','fish','coral','sq','heart','tree','star','moon','jelly'],M3SHC=['diamond','circle','fish','coral','heart','tree','star','moon','jelly'];
const m3Shape=(li,x)=>!x&&li>=20?M3SHAPES[M3SHL[li]]:x?M3SHAPES[M3SHL[li%M3SHL.length]]:M3SHAPES['n_'+(M3SHN[li]||M3SHC[li%9])];
const M3N=8,M3E=['❄️','🌲','🔔','🍄','🧣','🍪'],M3XE=['🎄','🎁','🦃','🕯️','🍪','🔔'],M3K=['#7db9ee','#a98fe0','#f0c15c','#e3706a','#5fbf84','#f089b8'],M3S={z:`<svg viewBox="0 0 40 40" aria-hidden="true"><g transform="translate(0 0)"><polygon fill="#f2a91e" stroke="#8a4f08" stroke-width="2.4" stroke-linejoin="round" points="18.5,12 3,3 12,18.5 17,24 24,17"/><polygon fill="#ffe680" points="17,14.5 6.5,6.5 14.5,17 19,20 20,19"/><polygon fill="#f2a91e" stroke="#8a4f08" stroke-width="2.6" stroke-linejoin="round" points="15.5,21.0 19.0,15.0 27.0,14.0 34.0,19.5 34.5,28.0 28.0,34.5 19.5,33.0 15.0,27.5"/><polygon fill="#ffe680" points="25,24.5 15.5,21.0 19.0,15.0"/><polygon fill="#f2a91e" points="25,24.5 19.0,15.0 27.0,14.0"/><polygon fill="#ffe680" points="25,24.5 27.0,14.0 34.0,19.5"/><polygon fill="#f2a91e" points="25,24.5 34.0,19.5 34.5,28.0"/><polygon fill="#ffe680" points="25,24.5 34.5,28.0 28.0,34.5"/><polygon fill="#f2a91e" points="25,24.5 28.0,34.5 19.5,33.0"/><polygon fill="#ffe680" points="25,24.5 19.5,33.0 15.0,27.5"/><polygon fill="#f2a91e" points="25,24.5 15.0,27.5 15.5,21.0"/><circle cx="29.5" cy="28.5" r="2" fill="#f2a91e" stroke="#8a4f08" stroke-width=".8"/><circle cx="22" cy="29.5" r="1.3" fill="#f2a91e"/><path d="M31 5l1.2 2.8 2.8 1.2-2.8 1.2L31 13l-1.2-2.8-2.8-1.2 2.8-1.2z" fill="#fff" stroke="none"/></g></svg>`,m:`<svg viewBox="0 0 40 40" aria-hidden="true"><g transform="translate(3.95 -.65)"><path d="M18.83 4.50A15.5 15.5 0 1 0 32.57 26.49A13 13 0 0 1 18.83 4.50z" fill="#f2a91e" stroke="#8a4f08" stroke-width="2.6" stroke-linejoin="round"/><path d="M18.83 4.50A15.5 15.5 0 1 0 32.57 26.49A13 13 0 0 1 18.83 4.50z" fill="#ffe680" transform="translate(18 20) scale(.86) translate(-18 -20) translate(-1.6 -.6)"/><circle cx="14.5" cy="22" r="1.5" fill="#fff6c8"/><path d="M31 5l1.2 2.8 2.8 1.2-2.8 1.2L31 13l-1.2-2.8-2.8-1.2 2.8-1.2z" fill="#fff" stroke="none"/></g></svg>`,s:`<svg viewBox="0 0 40 40" aria-hidden="true"><g transform="translate(0 .9)"><polygon fill="#f2a91e" stroke="#8a4f08" stroke-width="2.6" stroke-linejoin="round" points="20.0,2.3 24.9,13.7 37.3,14.9 28.0,23.1 30.7,35.2 20.0,28.9 9.3,35.2 12.0,23.1 2.7,14.9 15.1,13.7"/><polygon fill="#ffe680" points="20,20.5 15.1,13.7 20.0,2.3"/><polygon fill="#f2a91e" points="20,20.5 20.0,2.3 24.9,13.7"/><polygon fill="#ffe680" points="20,20.5 24.9,13.7 37.3,14.9"/><polygon fill="#f2a91e" points="20,20.5 37.3,14.9 28.0,23.1"/><polygon fill="#ffe680" points="20,20.5 28.0,23.1 30.7,35.2"/><polygon fill="#f2a91e" points="20,20.5 30.7,35.2 20.0,28.9"/><polygon fill="#ffe680" points="20,20.5 20.0,28.9 9.3,35.2"/><polygon fill="#f2a91e" points="20,20.5 9.3,35.2 12.0,23.1"/><polygon fill="#ffe680" points="20,20.5 12.0,23.1 2.7,14.9"/><polygon fill="#f2a91e" points="20,20.5 2.7,14.9 15.1,13.7"/><circle cx="20" cy="20.5" r="2.4" fill="#fff6c8"/><path d="M31 5l1.2 2.8 2.8 1.2-2.8 1.2L31 13l-1.2-2.8-2.8-1.2 2.8-1.2z" fill="#fff" stroke="none"/></g></svg>`,x:`<svg viewBox="0 0 40 40" aria-hidden="true"><g transform="translate(.4 -.9)"><polygon fill="#f2a91e" stroke="#8a4f08" stroke-width="2.6" stroke-linejoin="round" points="20.0,2.1 23.0,9.3 29.2,4.6 28.2,12.3 35.9,11.3 31.2,17.5 38.4,20.5 31.2,23.5 35.9,29.7 28.2,28.7 29.2,36.4 23.0,31.7 20.0,38.9 17.0,31.7 10.8,36.4 11.8,28.7 4.1,29.7 8.8,23.5 1.6,20.5 8.8,17.5 4.1,11.3 11.8,12.3 10.8,4.6 17.0,9.3"/><polygon fill="#ffe680" points="20,20.5 17.0,9.3 20.0,2.1"/><polygon fill="#f2a91e" points="20,20.5 20.0,2.1 23.0,9.3"/><polygon fill="#ffe680" points="20,20.5 23.0,9.3 29.2,4.6"/><polygon fill="#f2a91e" points="20,20.5 29.2,4.6 28.2,12.3"/><polygon fill="#ffe680" points="20,20.5 28.2,12.3 35.9,11.3"/><polygon fill="#f2a91e" points="20,20.5 35.9,11.3 31.2,17.5"/><polygon fill="#ffe680" points="20,20.5 31.2,17.5 38.4,20.5"/><polygon fill="#f2a91e" points="20,20.5 38.4,20.5 31.2,23.5"/><polygon fill="#ffe680" points="20,20.5 31.2,23.5 35.9,29.7"/><polygon fill="#f2a91e" points="20,20.5 35.9,29.7 28.2,28.7"/><polygon fill="#ffe680" points="20,20.5 28.2,28.7 29.2,36.4"/><polygon fill="#f2a91e" points="20,20.5 29.2,36.4 23.0,31.7"/><polygon fill="#ffe680" points="20,20.5 23.0,31.7 20.0,38.9"/><polygon fill="#f2a91e" points="20,20.5 20.0,38.9 17.0,31.7"/><polygon fill="#ffe680" points="20,20.5 17.0,31.7 10.8,36.4"/><polygon fill="#f2a91e" points="20,20.5 10.8,36.4 11.8,28.7"/><polygon fill="#ffe680" points="20,20.5 11.8,28.7 4.1,29.7"/><polygon fill="#f2a91e" points="20,20.5 4.1,29.7 8.8,23.5"/><polygon fill="#ffe680" points="20,20.5 8.8,23.5 1.6,20.5"/><polygon fill="#f2a91e" points="20,20.5 1.6,20.5 8.8,17.5"/><polygon fill="#ffe680" points="20,20.5 8.8,17.5 4.1,11.3"/><polygon fill="#f2a91e" points="20,20.5 4.1,11.3 11.8,12.3"/><polygon fill="#ffe680" points="20,20.5 11.8,12.3 10.8,4.6"/><polygon fill="#f2a91e" points="20,20.5 10.8,4.6 17.0,9.3"/><circle cx="20" cy="20.5" r="8.4" fill="#ffc533" stroke="#8a4f08" stroke-width="1.6"/><circle cx="20" cy="20.5" r="5.3" fill="#ffe680"/><ellipse cx="17.6" cy="18" rx="2.2" ry="1.3" transform="rotate(-35 17.6 18)" fill="#fff"/><path d="M31 5l1.2 2.8 2.8 1.2-2.8 1.2L31 13l-1.2-2.8-2.8-1.2 2.8-1.2z" fill="#fff" stroke="none"/></g></svg>`};
const M3G=[{mv:24,k:4,c:{0:10}},{mv:24,k:4,p:600},{mv:24,k:5,c:{0:12,1:12}},{mv:22,k:5,m:{m:2}},{mv:24,k:5,c:{2:16}},{mv:24,k:5,p:1000},{mv:24,k:5,c:{1:14,3:14}},{mv:22,k:5,m:{s:1}},{mv:26,k:5,c:{0:16,4:14}},{mv:24,k:5,m:{m:2,s:1}},
{mv:26,k:5,p:1500},{mv:24,k:5,c:{2:18,3:18}},{mv:24,k:5,m:{x:1}},{mv:28,k:5,c:{0:15,1:15,2:15}},{mv:26,k:6,p:1800},{mv:26,k:6,c:{4:18,5:18}},{mv:26,k:6,m:{m:2,s:2}},{mv:28,k:6,c:{0:16,2:16,5:16}},{mv:28,k:6,p:2400},{mv:30,k:6,m:{x:1,m:1,s:1},c:{3:20}},
{mv:26,k:6,c:{0:18,1:18}},{mv:26,k:6,p:2400},{mv:26,k:6,m:{m:3}},{mv:28,k:6,c:{2:20,4:20}},{mv:26,k:6,m:{s:2,m:1}},{mv:28,k:6,p:2900},{mv:28,k:6,c:{1:18,3:18,5:18}},{mv:26,k:6,m:{x:1,s:1}},{mv:28,k:6,c:{0:20,5:20}},{mv:28,k:6,p:2800},
{mv:28,k:6,m:{m:3,s:2}},{mv:30,k:6,c:{2:20,3:20,4:20}},{mv:28,k:6,m:{x:2}},{mv:30,k:6,p:3400},{mv:30,k:6,c:{0:24,1:24}},{mv:28,k:6,m:{x:1,m:2,s:1}},{mv:30,k:6,c:{3:20,5:20},m:{s:1}},{mv:30,k:6,p:3600},{mv:32,k:6,c:{0:16,2:16,4:16,5:16}},{mv:32,k:6,m:{x:2,m:2,s:2},c:{1:20}},
/* 40-49 : résidus de sable sous les pièces */
{mv:24,k:5,rz:'bot2',sh:'n_sq'},{mv:24,k:5,rz:'mid',sh:'diamond'},{mv:26,k:5,rz:'ring',sh:'n_circle'},{mv:26,k:6,rz:'chk',sh:'heart'},{mv:26,k:6,rz:'bot3',c:{2:16},sh:'igloo'},{mv:28,k:6,rz:'x',sh:'plus'},{mv:28,k:6,rz:'core',sh:'castle'},{mv:28,k:6,rz:'bot2d',sh:'crown'},{mv:30,k:6,rz:'all',sh:'n_sq'},{mv:30,k:6,rz:'ring2',sh:'butterfly'},
/* 50-59 : pièces prises dans les algues */
{mv:24,k:5,al:4,sh:'n_sq'},{mv:26,k:5,al:6,c:{1:14},sh:'n_circle'},{mv:26,k:6,al:6,rz:'bot2',sh:'igloo'},{mv:26,k:6,al:7,sh:'diamond'},{mv:28,k:6,al:8,m:{m:2},sh:'plus'},{mv:28,k:6,al:8,rz:'ring',sh:'castle'},{mv:28,k:6,al:10,sh:'n_sq'},{mv:30,k:6,al:9,rz:'mid',sh:'crown'},{mv:30,k:6,al:10,p:2400,sh:'heart'},{mv:32,k:6,al:12,rz:'chk',sh:'n_circle'},
/* 60-64 : petits animaux marins à sauver (les faire descendre jusqu’en bas) */
{mv:26,k:5,an:2,sh:'n_sq'},{mv:28,k:5,an:3,c:{0:12},sh:'n_circle'},{mv:28,k:6,an:3,rz:'bot2',sh:'diamond'},{mv:30,k:6,an:4,al:5,sh:'castle'},{mv:32,k:6,an:5,sh:'n_sq'},
/* 65-69 : défis mêlés */
{mv:28,k:6,an:3,c:{2:16},sh:'heart'},{mv:30,k:6,rz:'ring',al:6,sh:'n_circle'},{mv:30,k:6,an:4,m:{s:2},sh:'crown'},{mv:32,k:6,rz:'x',al:8,c:{0:18},sh:'castle'},{mv:34,k:6,an:5,rz:'chk',al:6,sh:'n_sq'}];
const M3AN=['🐠','🦀','🐙','🐡','🦐','🐬'];
/* ordre de jeu : les niveaux à résidus (dès le 25) et à algues (dès le 40) s’intercalent parmi les anciens */
const M3ORD=[...Array(24).keys(),40,24,25,41,26,27,42,28,29,43,30,31,44,32,45,50,33,46,51,34,52,47,35,53,36,54,48,37,55,56,38,49,57,39,58,59];M3ORD.splice(54,0,60,61,62,63,64);{const o=M3ORD.slice(55,65);M3ORD.splice(55,10,o[4],o[0],o[5],o[6],o[1],o[7],o[2],o[8],o[9],o[3])}M3ORD.push(65,66,67,68,69);
/* résidus : 0 rien, 1 une couche, 2 deux couches */
function m3RZ(k,A){const N=M3N,P=i=>i>=0&&i<N*N&&A[i],bd=i=>{const r=(i/N)|0,c=i%N;return r===0||r===N-1||c===0||c===N-1||!P(i-1)||!P(i+1)||!P(i-N)||!P(i+N)};
 return A.map((a,i)=>{if(!a)return 0;const r=(i/N)|0,c=i%N;switch(k){case'bot2':return r>=6?1:0;case'bot3':return r>=5?1:0;case'bot2d':return r>=6?2:r===5?1:0;case'mid':return r===3||r===4?1:0;case'ring':return bd(i)?1:0;case'ring2':return bd(i)?2:0;case'core':return bd(i)?0:1;case'chk':return(r+c)%2?0:1;case'x':return r===c||r+c===N-1?1:0;case'all':return 1}return 0})}
const M3ALG='<svg viewBox="0 0 40 40" aria-hidden="true"><g fill="none" stroke-linecap="round"><path d="M6 40C2 30 12 26 7 16S10 4 8 0" stroke="#1f7a45" stroke-width="5"/><path d="M34 40C38 31 28 25 33 15S30 5 33 0" stroke="#1f7a45" stroke-width="5"/><path d="M2 26Q20 14 38 26M2 16Q20 26 38 14" stroke="#2fa35f" stroke-width="4.2"/><path d="M6 40C2 30 12 26 7 16S10 4 8 0M34 40C38 31 28 25 33 15S30 5 33 0" stroke="#6fd38f" stroke-width="1.6" opacity=".7"/></g></svg>';
let m3Tok=0;
/* alignements (3 et plus) et carrés de 2×2 dans une grille de types (-1 = vide ou soleil) */
function m3Runs(T){
 const N=M3N,runs=[],sq=[];
 for(let a=0;a<N;a++)for(const d of['h','v']){let c=0;while(c<N){const at=k=>d==='h'?T[a*N+k]:T[k*N+a],t=at(c);let e=c+1;if(t>=0)while(e<N&&at(e)===t)e++;if(t>=0&&e-c>=3)runs.push({d,c:Array.from({length:e-c},(_,k)=>d==='h'?a*N+c+k:(c+k)*N+a)});c=e}}
 for(let r=0;r<N-1;r++)for(let c=0;c<N-1;c++){const i=r*N+c,t=T[i];if(t>=0&&T[i+1]===t&&T[i+N]===t&&T[i+N+1]===t)sq.push([i,i+1,i+N,i+N+1])}
 return{runs,sq};
}
const m3Has=T=>{const q=m3Runs(T);return q.runs.length>0||q.sq.length>0};
/* y a-t-il un échange qui fait un alignement ? (retourne [a,b]) */
function m3Swap(T,LK){
 const N=M3N;
 for(let r=0;r<N;r++)for(let c=0;c<N;c++)for(const [dr,dc] of[[0,1],[1,0]]){const r2=r+dr,c2=c+dc;if(r2>=N||c2>=N)continue;const a=r*N+c,b=r2*N+c2;if(T[a]<0||T[b]<0||T[a]===T[b]||(LK&&(LK[a]||LK[b])))continue;[T[a],T[b]]=[T[b],T[a]];const ok=m3Has(T);[T[a],T[b]]=[T[b],T[a]];if(ok)return[a,b]}
 return null;
}
/* quelles cases deviennent des pièces spéciales ? pref = cases échangées par le joueur */
function m3Plan(T,pref,isSp){
 const{runs,sq}=m3Runs(T),cells=new Set(),mk=new Map();
 runs.forEach(r=>r.c.forEach(i=>cells.add(i)));sq.forEach(q=>q.forEach(i=>cells.add(i)));
 const pick=arr=>{const ok=i=>!mk.has(i)&&!isSp(i);let f=arr.find(i=>pref&&pref.includes(i)&&ok(i));if(f!==undefined)return f;const m=arr[arr.length>>1];if(ok(m))return m;f=arr.find(ok);return f};
 runs.filter(r=>r.c.length>=5).forEach(r=>{const i=pick(r.c);if(i!==undefined)mk.set(i,{s:'x'})});
 for(let i=0;i<M3N*M3N;i++){const t=T[i];if(t<0||mk.has(i)||isSp(i))continue;const N=M3N,r=(i/N)|0,c=i%N,e=d=>T[i+d]===t,hb=c>0&&c<N-1&&e(-1)&&e(1),vb=r>0&&r<N-1&&e(-N)&&e(N),up=r>1&&e(-N)&&e(-2*N),dn=r<N-2&&e(N)&&e(2*N),lf=c>1&&e(-1)&&e(-2),rt=c<N-2&&e(1)&&e(2);if((hb&&vb)||(hb&&(up||dn))||(vb&&(lf||rt))||((lf||rt)&&(up||dn)))mk.set(i,{s:'z'})}
 runs.filter(r=>r.c.length===4).forEach(r=>{const i=pick(r.c);if(i!==undefined)mk.set(i,{s:'m',o:r.d})});
 const cl=[];sq.forEach(q=>{const j=cl.filter(c=>q.some(i=>c.includes(i)));const m=[...new Set([].concat(q,...j))];j.forEach(c=>cl.splice(cl.indexOf(c),1));cl.push(m)});
 cl.forEach(c=>{const i=pick(c.sort((a,b)=>a-b));if(i!==undefined)mk.set(i,{s:'s'})});
 return{cells,mk};
}
function pMatch(r){
 const N=M3N,X=isX('match3',lv),li=X?10+xn('match3',lv)-1:(M3ORD[lv]??lv),L=M3G[li],A=(M3XM=X,X?m3Shape(li,X):L.sh?M3SHAPES[L.sh]:m3Shape(li,X)).join('').split('').map(h=>h==='#'),shaped=A.some(v=>!v),E=X?M3XE:M3E,K=X?M3KX:M3K,tok=++m3Tok;
 let g=Array(N*N).fill(null),mv=0,sc=0,pg={c:{},m:{m:0,s:0,x:0}},busy=false,sel=null,uid=0,hintT=0,over=false;
 if(r){pg.c=r.c||{};pg.m=Object.assign(pg.m,r.m||{});mv=r.n||0;sc=r.sc}
 const RZ0=L.rz?m3RZ(L.rz,A):null,RZ=RZ0?(r&&r.R?r.R.slice():RZ0.slice()):null,RZT=RZ0?RZ0.reduce((q,v)=>q+v,0):0,lk=()=>g.map(t=>!!(t&&t.a));
 snap=()=>({T:g.map(t=>t?[t.t,t.s||0,t.o||0,t.a||0,t.an||0]:null),n:mv,sc,c:pg.c,m:pg.m,R:RZ?RZ.slice():undefined});
 const ob=[];if(RZ)ob.push({k:'r',n:RZT});if(L.al)ob.push({k:'a',n:L.al});if(L.an)ob.push({k:'n',n:L.an});if(L.c)Object.entries(L.c).forEach(([t,n])=>ob.push({k:'c',t:+t,n}));if(L.p)ob.push({k:'p',n:L.p});if(L.m)Object.entries(L.m).forEach(([s,n])=>ob.push({k:'m',s,n}));
 const cur=o=>o.k==='r'?RZT-RZ.reduce((q,v)=>q+v,0):o.k==='a'?L.al-g.filter(t=>t&&t.a).length:o.k==='n'?pg.m.rs||0:o.k==='c'?pg.c[o.t]||0:o.k==='p'?sc:pg.m[o.s]||0,done=o=>cur(o)>=o.n,allDone=()=>ob.every(done);
 const oh=o=>`<span class="m3g${done(o)?' ok':''}">${o.k==='r'?'<i><span class="m3gr"></span></i>':o.k==='a'?`<i>${M3ALG}</i>`:o.k==='n'?'<i class="m3gn">🐠</i>':o.k==='c'?`<i style="--c:${K[o.t]}">${m3Gem(o.t)}</i>`:o.k==='p'?'<i>✦</i>':`<i>${M3S[o.s]}</i>`}<b>${done(o)?'✓':Math.min(cur(o),o.n)+' / '+o.n}</b></span>`;
 const hud=()=>{const a=$('#m3mv'),b=$('#m3sc'),c=$('#m3go');if(a)a.textContent=mv;if(b)b.textContent=sc;if(c)c.innerHTML=ob.map(oh).join('')};
 frame(`<div class="m3"><div class="m3sea" aria-hidden="true">${[8,22,35,50,63,77,90].map((x,k)=>`<span class="m3bu" style="left:${x}%;--s:${6+k%3*4}px;--d:${5+k%4*1.7}s;animation-delay:-${k*1.3}s"></span>`).join('')}<span class="m3fi" style="top:20%;--t:34s">${fishSVG(FISH.find(f=>f.id==='tortue'))}</span><span class="m3fi r" style="top:52%;--t:26s;animation-delay:-9s">${fishSVG(FISH.find(f=>f.id==='meduse'))}</span><span class="m3fi" style="top:80%;--t:30s;animation-delay:-17s">${fishSVG(FISH.find(f=>f.id==='raie'))}</span></div><div class="m3h"><div class="m3m"><b id="m3mv">${mv}</b><small>coups joués</small></div><div class="m3o" id="m3go"></div><div class="m3m"><b id="m3sc">${sc}</b><small>points</small></div></div><div class="m3b" id="m3b" role="application" aria-label="Plateau de jeu"></div></div>`,5);
 const bd=$('#m3b'),alive=()=>tok===m3Tok&&playing&&$('#m3b')===bd,wt=ms=>new Promise(res=>setTimeout(res,matchMedia('(prefers-reduced-motion: reduce)').matches?ms/3:ms));
 const pos=(t,r0,c0)=>{t.r=r0;t.c=c0;t.el.style.transform=`translate(${c0*100}%,${r0*100}%)`};
 let fxl=bd,tl=bd;
 if(shaped){bd.classList.add('sh');const cl=(k,r0,c0)=>{const e=document.createElement('i');e.className='m3c '+k;e.style.cssText=`left:${c0*12.5}%;top:${r0*12.5}%`;bd.appendChild(e)};
  ['f2','f1'].forEach(k=>A.forEach((a,i)=>{if(a)cl(k,(i/N)|0,i%N)}));A.forEach((a,i)=>{if(a)cl('c'+(((i/N|0)+i%N)%2),(i/N)|0,i%N)});
  tl=document.createElement('div');tl.className='m3tl';
  const sv=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" preserveAspectRatio="none">${A.map((a,i)=>a?`<rect x="${(i%N-.06).toFixed(2)}" y="${(((i/N)|0)-.06).toFixed(2)}" width="1.12" height="1.12"/>`:'').join('')}</svg>`,mu=`url("data:image/svg+xml,${encodeURIComponent(sv)}")`;
  tl.style.webkitMaskImage=mu;tl.style.maskImage=mu;bd.appendChild(tl);
  fxl=document.createElement('div');fxl.className='m3fx';bd.appendChild(fxl)}
 const rzE=[];if(RZ){const rl=document.createElement('div');rl.className='m3rz';A.forEach((a,i)=>{if(!a)return;const e=document.createElement('i');e.className='m3r';e.style.cssText=`left:${i%N*12.5}%;top:${((i/N)|0)*12.5}%`;rl.appendChild(e);rzE[i]=e});tl.appendChild(rl)}
 const rzLook=i=>{const e=rzE[i];if(e)e.dataset.n=RZ[i]};if(RZ)A.forEach((a,i)=>{if(a)rzLook(i)});
 const look=t=>{if(t.an){t.el.className='m3t an';t.el.dataset.t=-2;t.el.style.setProperty('--c','#bfe8ff');t.el.innerHTML=`<i class="m3an"><span>${M3AN[(t.an-1)%M3AN.length]}</span></i>`;return}t.el.className='m3t'+(t.s?' sp sp-'+t.s+(t.o?' o-'+t.o:''):'')+(t.a?' al':'');t.el.dataset.t=t.t;t.el.style.setProperty('--c',t.t>=0?K[t.t]:'#fff');t.el.innerHTML=(t.s?`<i><u>${M3S[t.s]}</u></i>`:`<i>${m3Gem(t.t)}</i>`)+(t.a?`<b class="m3al">${M3ALG}</b>`:'')};
 const mkT=(t,s,o,r0,c0)=>{const e=document.createElement('div'),x={id:++uid,t,s:s||0,o:o||0,el:e};e.setAttribute('role','img');e.setAttribute('aria-hidden','true');look(x);pos(x,r0,c0);tl.appendChild(e);return x};
 const types=()=>g.map(t=>t&&t.t>=0?t.t:-1);
 /* plateau de départ : aucun alignement, au moins un coup possible ; les algues tiennent quelques pièces */
 let ALK=null;const m3AlPick=()=>{const c=A.map((a,i)=>a?i:-1).filter(i=>i>=0&&i>=N),o=Array(N*N).fill(false);sh(c).slice(0,L.al).forEach(i=>o[i]=true);return o};
 if(r)r.T.forEach((q,i)=>{if(q&&A[i]){g[i]=mkT(q[4]?0:q[0],q[1],q[2],(i/N)|0,i%N);if(q[3]){g[i].a=1;look(g[i])}if(q[4]){g[i].an=q[4];g[i].t=-2;look(g[i])}}});
 else{let T;do{T=Array(N*N).fill(-1);for(let i=0;i<N*N;i++){if(!A[i])continue;let t,n=0;do{t=Math.floor(Math.random()*L.k);T[i]=t;n++}while(n<30&&m3Has(T.map((v,j)=>j<=i?v:-1)))}}while(m3Has(T)||!m3Swap(T,ALK=L.al?m3AlPick():null));T.forEach((t,i)=>{if(A[i]){g[i]=mkT(t,0,0,(i/N)|0,i%N);if(ALK&&ALK[i]){g[i].a=1;look(g[i])}}})}
 const rnd=()=>Math.floor(Math.random()*L.k);
 const anOn=()=>g.filter(t=>t&&t.an).length,mkAn=t=>{t.an=1+Math.floor(Math.random()*M3AN.length);t.t=-2;t.s=0;t.a=0;look(t)};
 if(L.an&&!r){const top=[];for(let q=0;q<3;q++)for(let c=0;c<N;c++){const i=q*N+c;if(A[i]&&g[i]&&!g[i].a)top.push(i)}sh(top).slice(0,Math.min(2,L.an)).forEach(i=>mkAn(g[i]));pg.m.sp=Math.min(2,L.an)}
 if(r)for(let i=0;i<N*N;i++)if(A[i]&&!g[i])g[i]=mkT(rnd(),0,0,(i/N)|0,i%N);
 const note=t=>{if(t.t>=0)pg.c[t.t]=(pg.c[t.t]||0)+1};
 const band=(kind,i)=>{if(kind==='diag'){[45,-45].forEach(a=>{const e=document.createElement('div');e.className='m3f diag';e.style.cssText=`left:${((i%N)+.5)*100/N-80}%;top:${(((i/N)|0)+.5)*100/N-6.25}%;rotate:${a}deg`;fxl.appendChild(e);setTimeout(()=>e.remove(),500)});return}const e=document.createElement('div');e.className='m3f '+kind;if(kind==='row')e.style.top=((i/N|0)*100/N)+'%';else if(kind==='col')e.style.left=(i%N*100/N)+'%';else{e.style.left=((i%N)-1)*100/N+'%';e.style.top=(((i/N)|0)-1)*100/N+'%'}fxl.appendChild(e);setTimeout(()=>e.remove(),500)};
 /* explosions en chaîne : renvoie les événements pour l’animation */
 const boom=set=>{
  const q=[...set].filter(i=>g[i]&&g[i].s),seen=new Set(),ev=[];
  while(q.length){const i=q.pop();if(seen.has(i))continue;seen.add(i);const t=g[i];if(!t||!t.s)continue;const r0=(i/N)|0,c0=i%N,add=[];
   if(t.s==='m'){if(t.o==='v')for(let k=0;k<N;k++)add.push(k*N+c0);else for(let k=0;k<N;k++)add.push(r0*N+k);ev.push({s:'m',i,o:t.o})}
   else if(t.s==='z'){add.push(i);for(let k=1;k<N;k++)for(const[a,b]of[[-1,-1],[-1,1],[1,-1],[1,1]]){const rr=r0+a*k,cc=c0+b*k;if(rr>=0&&rr<N&&cc>=0&&cc<N)add.push(rr*N+cc)}ev.push({s:'z',i})}
   else if(t.s==='s'){for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const rr=r0+a,cc=c0+b;if(rr>=0&&rr<N&&cc>=0&&cc<N)add.push(rr*N+cc)}ev.push({s:'s',i})}
   else{let col=t.col;if(col===undefined){const n={};g.forEach(u=>{if(u&&u.t>=0)n[u.t]=(n[u.t]||0)+1});col=+(Object.entries(n).sort((a,b)=>b[1]-a[1])[0]||[0])[0]}
    g.forEach((u,j)=>{if(u&&(t.all||u.t===col))add.push(j)});ev.push({s:'x',i})}
   add.forEach(j=>{if(!g[j])return;set.add(j);if(g[j].s&&!seen.has(j))q.push(j)})}
  return ev;
 };
 const burst=(i,col,n)=>{const r0=(i/N)|0,c0=i%N;for(let k=0;k<n;k++){const e=document.createElement('i'),a=Math.random()*6.283,d=22+Math.random()*34;e.className='m3sp'+(k%2?' b':'');e.style.cssText=`left:${(c0+.5)*100/N}%;top:${(r0+.5)*100/N}%;--c:${col};--dx:${Math.cos(a)*d}%;--dy:${Math.sin(a)*d}%`;bd.appendChild(e);setTimeout(()=>e.remove(),650)}};
 const pop=(txt,cls,cell)=>{const e=document.createElement('b');e.className='m3pt '+(cls||'');e.textContent=txt;if(cell!==undefined){e.style.left=((cell%N+.5)*100/N)+'%';e.style.top=(((cell/N|0)+.5)*100/N)+'%'}bd.appendChild(e);setTimeout(()=>e.remove(),1100)};
 const rays=(si,ts)=>{const cs=bd.getBoundingClientRect().width/N,cx=(si%N+.5)*cs,cy=((si/N|0)+.5)*cs;ts.forEach((j,k)=>{const t=g[j];if(!t)return;t.el.classList.add('zap');const x=(j%N+.5)*cs,y=((j/N|0)+.5)*cs,d=Math.hypot(x-cx,y-cy),e=document.createElement('i');e.className='m3ray';e.style.cssText=`left:${cx}px;top:${cy}px;width:${d}px;transform:rotate(${Math.atan2(y-cy,x-cx)}rad);--c:${t.t>=0?K[t.t]:'#fff6c8'};animation-delay:${Math.min(k*14,260)}ms`;bd.appendChild(e);setTimeout(()=>e.remove(),700)})};
 const removeSet=async(set,ev,ch,keep)=>{
  ev.forEach(e=>{e.s==='m'?band(e.o==='v'?'col':'row',e.i):e.s==='s'?band('blast',e.i):e.s==='z'?band('diag',e.i):0});
  [...set].forEach(i=>{if(g[i]&&g[i].an)set.delete(i)});
  let n=0;const fr=new Set();set.forEach(i=>{const t=g[i];if(t&&t.a){t.a=0;fr.add(i);t.el.classList.add('free');setTimeout(()=>{look(t)},200);burst(i,'#4fc77f',4);sfx(660,.2)}});fr.forEach(i=>set.delete(i));
  set.forEach(i=>{if(RZ&&RZ[i]>0&&g[i]){RZ[i]--;rzLook(i);const e=rzE[i];if(e){e.classList.remove('hit');void e.offsetWidth;e.classList.add('hit')}}});
  set.forEach(i=>{const t=g[i];if(!t)return;note(t);t.el.classList.add('out');if(ev.length)t.el.classList.add('boom');burst(i,t.t>=0?K[t.t]:'#fff6c8',set.size>14?2:4);n++});
  const gain=Math.round(n*10*(1+(ch-1)*.5));sc+=gain;sfx(440+Math.min(ch,6)*70,.18);vib(8);hud();if(n){const ar=[...set],mid=ar[ar.length>>1];pop('+'+gain,'pt',mid);if(ch>=2)setTimeout(()=>pop(M3W[Math.min(ch-2,M3W.length-1)],'w'),120);else if(n>=5&&!ev.length)setTimeout(()=>pop(M3W[0],'w'),120)}
  await wt(260);if(!alive())return;
  set.forEach(i=>{const t=g[i];if(t){t.el.remove();g[i]=null}});
 };
 const fall=async()=>{
  const hs=[];
  for(let c=0;c<N;c++){const R=[];for(let q=0;q<N;q++)if(A[q*N+c]&&!(g[q*N+c]&&g[q*N+c].a))R.push(q);if(!R.length)continue;
   let w=R.length-1;for(let j=R.length-1;j>=0;j--){const t=g[R[j]*N+c];if(t){if(j!==w){g[R[w]*N+c]=t;g[R[j]*N+c]=null;pos(t,R[w],c)}w--}}
   let k=0;for(let j=w;j>=0;j--){k++;const t=mkT(rnd(),0,0,R[0]-k,c);if(L.an&&(pg.m.sp||0)<L.an&&anOn()<2&&Math.random()<.35){mkAn(t);pg.m.sp=(pg.m.sp||0)+1}if(shaped)t.el.style.opacity=0;hs.push([t,R[j],c]);g[R[j]*N+c]=t}}
  void bd.offsetWidth;hs.forEach(([t,q,c])=>{pos(t,q,c);t.el.style.opacity=''});
  await wt(340);
 };
 /* sauvetage : un animal arrivé tout en bas de sa colonne nage vers le large */
 const bot=c=>{for(let q=N-1;q>=0;q--)if(A[q*N+c])return q*N+c;return -1};
 const rescue=async()=>{if(!L.an)return false;const R2=[];for(let c=0;c<N;c++){const i=bot(c);if(i>=0&&g[i]&&g[i].an)R2.push(i)}if(!R2.length)return false;
  R2.forEach(i=>{const t=g[i];t.el.classList.add('saved');pop('Sauvé !','w',i);burst(i,'#7fd8ff',6);pg.m.rs=(pg.m.rs||0)+1});sfx(990,.25);vib(15);hud();
  await wt(650);R2.forEach(i=>{const t=g[i];if(t){t.el.remove();g[i]=null}});return true};
 /* résout les alignements, enchaîne les cascades */
 const settle=async pref=>{
  let ch=0;
  while(alive()){
   const P=m3Plan(types(),pref,i=>!!(g[i]&&(g[i].s||g[i].a)));pref=null;
   if(!P.cells.size){if(await rescue()){await fall();continue}break}ch++;
   const set=new Set([...P.cells].filter(i=>!P.mk.has(i)));
   const ev=boom(set);
   const mk=[...P.mk].filter(([i])=>!set.has(i)&&g[i]);
   mk.forEach(([i])=>set.delete(i));
   await removeSet(set,ev,ch);if(!alive())return;
   mk.forEach(([i,m])=>{const t=g[i];if(!t)return;t.s=m.s;t.o=m.o||0;if(m.s==='x')t.t=-1;look(t);t.el.classList.add('born');pg.m[m.s]=(pg.m[m.s]||0)+1;sc+=40});
   if(mk.length)sfx(880,.3);
   await fall();
  }
 };
 const shuffle=async()=>{
  const ts=g.filter(t=>t&&!t.s&&!t.an);let ok=false;
  const bn=document.createElement('div');bn.className='m3sh';bn.innerHTML='<i>✦</i><b>Les pièces se mélangent…</b><i>✦</i>';bd.appendChild(bn);bd.classList.add('shw');
  const T=(t,a,s,f)=>`translate(350%,350%) rotate(${a}deg) translate(${(t.c-3.5)*100*f}%,${(t.r-3.5)*100*f}%) scale(${s})`,dl=t=>Math.hypot(t.c-3.5,t.r-3.5)*38,A=[];
  const run=(fn,du)=>Promise.all(ts.map(t=>{const an=t.el.animate(fn(t),{duration:du||620,delay:fn.d(t),easing:fn.e,fill:'both'});A.push(an);return an.finished.catch(()=>{})}));
  const vx=document.createElement('div');vx.className='m3vx';vx.innerHTML='<i></i><i></i><i></i>';bd.appendChild(vx);
  const end=()=>{A.forEach(x=>{try{x.cancel()}catch(e){}});bn.remove();vx.remove();bd.classList.remove('shw')};
  /* comme un bouchon qu’on enlève : l’eau jaillit du trou et retombe en pluie de pièces */
  const gush=()=>{vx.classList.add('out');const sp=document.createElement('div');sp.className='m3gu';let h='<b></b><b class="b2"></b>';const W=bd.getBoundingClientRect().width;for(let k=0;k<26;k++){const a=-90+(Math.random()-.5)*130,d=W*(.18+Math.random()*.32);h+=`<i style="--x:${(Math.cos(a*Math.PI/180)*d).toFixed(0)}px;--y:${(Math.sin(a*Math.PI/180)*d).toFixed(0)}px;--s:${(4+Math.random()*8).toFixed(1)}px;animation-delay:${(Math.random()*160).toFixed(0)}ms"></i>`}sp.innerHTML=h;bd.appendChild(sp);setTimeout(()=>sp.remove(),1400)};
  sfx(520,.3);
  if(!wRM){const f1=t=>[{transform:T(t,0,1,1)},{transform:T(t,440,.2,0),opacity:.85}];f1.d=dl;f1.e='cubic-bezier(.5,0,.85,.45)';await run(f1)}else await wt(500);
  if(!alive()){end();return}
  for(let k=0;k<80&&!ok;k++){const a=sh(ts.map(t=>t.t));ts.forEach((t,i)=>{t.t=a[i]});const Y=types();ok=!m3Has(Y)&&!!m3Swap(Y,lk())}
  ts.forEach(t=>look(t));sfx(780,.3);
  if(!wRM){gush();const f2=t=>{const hx=(t.c-3.5)*55+(Math.random()-.5)*60,hy=-120-Math.random()*110-(7-t.r)*14,sp=(Math.random()-.5)*540;return[{transform:`translate(350%,350%) rotate(-200deg) scale(.2)`,opacity:.85,easing:'cubic-bezier(.15,.75,.35,1)'},{offset:.42,transform:`translate(calc(350% + ${hx.toFixed(0)}%),calc(350% + ${hy.toFixed(0)}%)) rotate(${sp.toFixed(0)}deg) scale(.95)`,opacity:1,easing:'cubic-bezier(.55,0,.75,.4)'},{transform:T(t,0,1,1),opacity:1}]};f2.d=t=>Math.random()*140;f2.e='linear';A.length=0;ts.forEach(t=>t.el.getAnimations().forEach(x=>x.cancel()));await run(f2,1050)}
  end();
 };
 const finish=async()=>{
  hud();sv();
  if(allDone()){over=true;const c=$('#m3b');if(c)confetti(c);setTimeout(()=>{if(tok===m3Tok&&playing)win()},900);return}
  const T=types();if(!g.some(t=>t&&t.s)&&!m3Swap(T,lk()))await shuffle();
 };
 const swap=async(a,b)=>{
  if(busy||over)return;if((g[a]&&g[a].a)||(g[b]&&g[b].a)){unsel();msg('Cette pièce est prise dans les algues : aligne-la pour la libérer.');const e=(g[a]&&g[a].a?g[a]:g[b]).el;e.classList.remove('no');void e.offsetWidth;e.classList.add('no');setTimeout(()=>e.classList.remove('no'),260);return}busy=true;unsel();msg('');
  const A=g[a],B=g[b];
  const mvAB=()=>{const ra=A.r,ca=A.c;pos(A,B.r,B.c);pos(B,ra,ca);[g[a],g[b]]=[g[b],g[a]]};
  if(A.s==='x'||B.s==='x'){
   const S=A.s==='x'?A:B,O=S===A?B:A,si=S===A?a:b;mv++;hud();
   const set=new Set([si]);
   if(O.s==='x'){g.forEach((u,j)=>{if(u)set.add(j)});S.all=true}
   else{S.col=O.t;g.forEach((u,j)=>{if(u&&u.t===O.t)set.add(j)});set.add(a);set.add(b)}
   S.el.classList.add('sunfx');rays(si,[...set].filter(j=>j!==si));await wt(700);if(!alive())return;
   const ev=boom(set);ev.push({s:'x',i:si});await removeSet(set,ev,1);if(!alive())return;await fall();await settle();if(!alive())return;busy=false;return finish();
  }
  const sp2=u=>u.s==='m'||u.s==='s'||u.s==='z';
  if(sp2(A)||sp2(B)){
   mv++;hud();mvAB();await wt(210);if(!alive())return;
   const set=new Set();[a,b].forEach(i=>{const u=g[i];if(u&&sp2(u))set.add(i)});
   const ev=boom(set);await removeSet(set,ev,1);if(!alive())return;await fall();await settle();if(!alive())return;busy=false;return finish();
  }
  mvAB();await wt(210);if(!alive())return;
  const T=types();
  if(!m3Has(T)){mvAB();A.el.classList.add('no');B.el.classList.add('no');await wt(210);if(!alive())return;A.el.classList.remove('no');B.el.classList.remove('no');msg('Pas d’alignement ici.');busy=false;return}
  mv++;hud();await settle([a,b]);if(!alive())return;busy=false;finish();
 };
 const fire=async t=>{
  if(busy||over)return;busy=true;unsel();msg('');mv++;hud();
  const i=g.indexOf(t),set=new Set([i]),ev=boom(set);
  await removeSet(set,ev,1);if(!alive())return;await fall();await settle();if(!alive())return;busy=false;finish();
 };
 const unsel=()=>{if(sel)sel.el.classList.remove('sel');sel=null};
 const adj=(a,b)=>Math.abs(a.r-b.r)+Math.abs(a.c-b.c)===1;
 const tap=t=>{
  if(busy||over)return;
  if(sel&&sel!==t&&adj(sel,t))return swap(g.indexOf(sel),g.indexOf(t));
  if(sel===t)return unsel();
  if(t.s==='m'||t.s==='s'||t.s==='z')return fire(t);
  unsel();sel=t;t.el.classList.add('sel');
 };
 let dn=null;
 bd.addEventListener('pointerdown',e=>{const el=e.target.closest('.m3t');if(!el||busy)return;const t=g.find(u=>u&&u.el===el);if(!t)return;dn={t,x:e.clientX,y:e.clientY,mv:false};try{bd.setPointerCapture(e.pointerId)}catch(_){}e.preventDefault()});
 bd.addEventListener('pointermove',e=>{if(!dn||dn.mv)return;const cs=bd.getBoundingClientRect().width/N,dx=e.clientX-dn.x,dy=e.clientY-dn.y;if(Math.hypot(dx,dy)<cs*.4)return;dn.mv=true;const h=Math.abs(dx)>Math.abs(dy),r1=dn.t.r+(h?0:Math.sign(dy)),c1=dn.t.c+(h?Math.sign(dx):0);if(r1<0||r1>=N||c1<0||c1>=N)return;const o=g[r1*N+c1];if(o)swap(g.indexOf(dn.t),r1*N+c1)});
 const up=()=>{if(dn&&!dn.mv)tap(dn.t);dn=null};
 bd.addEventListener('pointerup',up);bd.addEventListener('pointercancel',()=>{dn=null});bd.addEventListener('contextmenu',e=>e.preventDefault());
 act.m3r=()=>{st.set(pkey(),null);start('match3',false,lv)};
 act.hint=()=>{if(busy||over)return;let h=null;const T=types();const s=m3Swap(T,lk());if(s)h=s;else{const k=g.findIndex(t=>t&&t.s);if(k>=0)h=[k]}
  if(!h||!spend(5))return;h.forEach(i=>g[i]&&g[i].el.classList.add('hint'));clearTimeout(hintT);hintT=setTimeout(()=>g.forEach(t=>t&&t.el.classList.remove('hint')),2200)};
 if(window.__M3DBG)window.__M3DBG({g:()=>g,look,swap,types,tap,shuffle});
 hud();
 if(!r&&lv===0&&!X)msg('Fais glisser une pièce vers sa voisine pour aligner 3 pièces identiques.');
 else if(!r&&!X&&L.an)msg('De petits animaux marins sont perdus parmi les étoiles : fais-les descendre tout en bas du plateau pour les sauver !');
 else if(!r&&!X&&L.al)msg('Des pièces sont prises dans les algues : aligne-les une fois pour les libérer, puis encore pour les faire disparaître.');
 else if(!r&&!X&&RZ)msg('Du sable s’est déposé sous certaines pièces : fais disparaître les pièces posées dessus pour le nettoyer.');
 else if(r&&allDone())setTimeout(()=>{if(tok===m3Tok&&playing)win()},400);
 else if(r)setTimeout(async()=>{if(tok!==m3Tok||!playing)return;busy=true;await settle();busy=false;if(alive())finish()},300);
}
