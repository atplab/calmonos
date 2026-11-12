/* ---------- Cherche et trouve : retrouver le petit bonhomme et les objets qui l’aideront à rentrer chez lui ----------
   Un niveau = un univers, une grande scène plein écran qu’on fait glisser et qu’on agrandit (pincer, molette, + / −).
   Il faut toucher le bonhomme et les objets cachés parmi des dizaines d’éléments. Pas de pénalité, pas de chrono. */
const CHW=1000,CHH=1400;
const chRnd=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
/* n : nom · hz : hauteur de l’horizon · sky / gr : couleurs du ciel et des collines · se / ge : éléments du ciel / du sol · it : objets à trouver [emoji, nom, nom court] */
const CHU=[
{n:'La forêt des lucioles',bc:['#cfe8d4','#a8d2b4','#1d4a3a'],hz:.28,sky:['#232c6b','#4a5aa6'],gr:['#2f6b52','#235642','#173f33'],se:['⭐','✨','🌙','🦇','☁️','🌟'],ge:['🌲','🌲','🌳','🍄','🌿','🪵','🦉','🦊','🐿️','🐇','🌰','🍂','🪨','🌱','🐞','🐛','🦔','🕯️'],
 it:[['🔦','la lampe de poche','lampe'],['🧭','la boussole','boussole'],['🥾','les bottes','bottes']],
 s:'Une nuit, le petit bonhomme a glissé de son étoile filante et il est tombé dans la forêt des lucioles. Retrouve-le entre les arbres. Pour rentrer chez lui, il aura aussi besoin de sa lampe de poche, de sa boussole et de ses bottes.',
 w:'Le bonhomme te serre dans ses petits bras. Avec sa lampe, sa boussole et ses bottes, il repart sur le chemin.'},
{n:'La plage aux coquillages',bc:['#fcebbd','#a6dff2','#1b5a7a'],hz:.38,sky:['#7fd0f0','#cdeefc'],gr:['#f3dd9f','#ead08a','#dcbf75'],se:['☁️','🐦','☀️','🕊️','☁️'],ge:['🐚','🦀','⭐','🌴','🏖️','🪣','🐢','🌊','🦩','🍹','🐠','🪼','🏝️','🦞','🐟','🌺'],
 it:[['🗺️','la carte','carte'],['🔭','la longue-vue','longue-vue'],['🪢','la corde','corde']],
 s:'Le vent a poussé le petit bonhomme jusqu’à une plage tranquille, où le sable est tiède. Cherche-le parmi les coquillages. Il a perdu sa carte, sa longue-vue et sa corde : retrouve-les aussi.',
 w:'Avec sa carte et sa longue-vue, le bonhomme sait maintenant dans quelle direction se trouve la maison.'},
{n:'Le village sous la neige',bc:['#f4f8ff','#cfdcf5','#35508a'],hz:.35,sky:['#7a8cc8','#dfe8ff'],gr:['#f4f7ff','#e3ebfb','#cfdaf2'],se:['❄️','☁️','⭐','🌨️','🌙','❄️'],ge:['🏠','🏡','🌲','⛄','🎄','🧊','🦌','🐧','🕯️','🍪','☃️','🎁','🪵','🐇','🦊','🍵'],
 it:[['🧣','l’écharpe','écharpe'],['🧤','les moufles','moufles'],['🛷','la luge','luge']],
 s:'Le bonhomme a atterri dans un village où il neige doucement. Il a froid ! Retrouve-le au milieu des maisons, puis son écharpe, ses moufles et sa luge pour descendre la colline.',
 w:'Bien au chaud dans son écharpe, le bonhomme descend la colline en luge, tout content.'},
{n:'Le jardin des fleurs',bc:['#ffdce9','#cdeec3','#3f6a37'],hz:.33,sky:['#9ad8ff','#e8f8ff'],gr:['#8fd18a','#6dbb72','#4fa35e'],se:['☁️','🦋','🐝','🌈','🕊️','☀️'],ge:['🌸','🌷','🌻','🌼','🌹','🌺','🪻','🍓','🐛','🐞','🐝','🦋','🍄','🌿','🌱','🥕','🐌'],
 it:[['🪜','l’échelle','échelle'],['🔑','la clé','clé'],['🧺','le panier','panier']],
 s:'Le bonhomme s’est caché dans un immense jardin fleuri. Retrouve-le entre les pétales. Il lui faut aussi une échelle, une clé et un panier pour franchir la grande barrière.',
 w:'L’échelle contre la barrière, la clé dans la serrure : le jardin n’a plus de secrets pour lui.'},
{n:'Le grand ciel étoilé',bc:['#c9c3ff','#8f86e6','#241b6b'],hz:.12,sky:['#0b0f2e','#2a2a6e'],gr:['#3a2f7a','#2c2563','#1f1a4d'],se:['⭐','✨','🌟','🪐','☄️','🌙'],ge:['🪐','🌑','🌕','🛸','👽','🚀','☄️','⭐','🌟','🛰️','🌍','💫','✨','🌙'],
 it:[['🔋','la pile','pile'],['📡','l’antenne','antenne'],['🔧','la clé à molette','clé à molette']],
 s:'Le bonhomme flotte au milieu des planètes ! Retrouve-le dans le ciel étoilé. Sa fusée a besoin d’une pile, d’une antenne et d’une clé à molette pour repartir.',
 w:'La fusée ronronne de nouveau. Le bonhomme t’adresse un grand signe de la main.'},
{n:'La fête foraine',bc:['#ffd0e0','#ffe3a6','#8a2f55'],hz:.3,sky:['#ff9ec4','#ffe1a8'],gr:['#f2a25a','#e48a4a','#c96d3c'],se:['🎈','🎈','🎆','🎇','☁️','🎈'],ge:['🎪','🎡','🎠','🎢','🍿','🍭','🤡','🍬','🎨','🧁','🎁','🎈','🧸','🎯','🎲','🍩','🍦'],
 it:[['🎟️','le billet','billet'],['🪁','le cerf-volant','cerf-volant'],['🥁','le tambour','tambour']],
 s:'Quelle fête ! Le bonhomme s’est glissé parmi les manèges et les ballons. Retrouve-le, ainsi que son billet, son cerf-volant et son tambour.',
 w:'Le tambour résonne doucement : le bonhomme défile fièrement jusqu’à la sortie.'},
{n:'Le désert doré',bc:['#ffe2ab','#f0be72','#7a4a14'],hz:.36,sky:['#ffcf8a','#ffefc7'],gr:['#f0c27a','#e3b062','#cf9a4c'],se:['☀️','☁️','🦅','🌤️'],ge:['🌵','🐪','🏜️','🦂','🐍','🦎','🪨','🌴','🔥','🏺','🧱','🐫','🌵','🪲'],
 it:[['🧢','la casquette','casquette'],['🕶️','les lunettes','lunettes'],['🪔','la lampe magique','lampe magique']],
 s:'Le soleil brille sur les dunes et le bonhomme se repose à l’ombre d’un cactus. Retrouve-le. Il aura besoin de sa casquette, de ses lunettes et d’une lampe magique pour traverser le désert.',
 w:'Un petit nuage de poussière dorée, et la lampe magique l’emmène de l’autre côté des dunes.'},
{n:'Les profondeurs',bc:['#a8e3f5','#5ab6dc','#0b3e68'],hz:.1,sky:['#0a4a7a','#1a86b5'],gr:['#1d6fa0','#165a8a','#0f4670'],se:['🫧','🫧','🐟','🫧'],ge:['🐠','🐟','🐡','🐙','🦑','🦀','🪸','🐢','🐬','🦈','🪼','🌿','🫧','⭐','🦞','🐋'],
 it:[['⚓','l’ancre','ancre'],['🐚','le coquillage','coquillage'],['🔱','le trident','trident']],
 s:'Plouf ! Le bonhomme est tombé dans l’océan. Retrouve-le parmi les poissons. L’ancre, le coquillage et le trident l’aideront à remonter.',
 w:'Tenu par l’ancre, soufflé par une bulle, le bonhomme remonte lentement vers la lumière.'},
{n:'Le château endormi',bc:['#d7dcfb','#aab2e6','#2e3584'],hz:.32,sky:['#6f7ad8','#d3d9ff'],gr:['#9aa0b8','#7f86a2','#636a88'],se:['🏰','☁️','🦅','🐉','⭐','☁️'],ge:['🏰','🛡️','🏹','🐴','🐉','🏇','🦄','🏺','🕯️','🪙','🍷','🦢','🌹','🗡️'],
 it:[['👑','la couronne','couronne'],['🗝️','la vieille clé','vieille clé'],['📜','le parchemin','parchemin']],
 s:'Dans un château silencieux, tout le monde dort… sauf le bonhomme. Retrouve-le dans les tours. Pour ouvrir la grande porte, il lui faut la couronne, la vieille clé et le parchemin.',
 w:'La grande porte s’ouvre sans un bruit, et le bonhomme passe sur la pointe des pieds.'},
{n:'La jungle',bc:['#c8efb0','#8fd08a','#1c5a2c'],hz:.25,sky:['#2f8f6a','#bff0a0'],gr:['#2e8b4f','#1f7040','#165a33'],se:['🦜','🦋','☁️','🐒','🌤️'],ge:['🌴','🌿','🦜','🐒','🐍','🦎','🐅','🐘','🦧','🌺','🍃','🐸','🦋','🪲','🐜','🍌'],
 it:[['🥥','la noix de coco','noix de coco'],['🪶','la plume','plume'],['🪵','le tronc','tronc']],
 s:'Les feuilles sont immenses et le bonhomme joue à cache-cache. Retrouve-le dans la jungle. Une noix de coco, une plume et un tronc l’aideront à traverser la rivière.',
 w:'Un tronc pour traverser, une plume pour se faire un chapeau : la rivière est derrière lui.'},
{n:'La ville la nuit',bc:['#d3d6f5','#a5aae0','#252a72'],hz:.3,sky:['#141a45','#3a3f86'],gr:['#2a2f5e','#212551','#181c40'],se:['🌙','⭐','✨','☁️','🦇','⭐'],ge:['🏢','🏙️','🚕','🚌','🚦','🚲','🛵','💡','🏪','☕','🍕','🐈','🐀','🚏','⛲'],
 it:[['🧳','la valise','valise'],['🎫','le ticket','ticket'],['☂️','le parapluie','parapluie']],
 s:'Les fenêtres s’allument une à une. Le bonhomme se promène dans la ville, perdu. Retrouve-le, ainsi que sa valise, son ticket et son parapluie.',
 w:'Valise en main, ticket en poche, il monte dans le dernier bus de la nuit.'},
{n:'Le champ de lavande',ar:3,bc:['#ecdcff','#c6a8f0','#4a2a7a'],hz:.33,sky:['#c9a3f2','#fde7ff'],gr:['#9a7ad8','#8466c4','#6f52ae'],se:['☀️','🦋','☁️','🐝'],ge:['🪻','🌸','🐝','🦋','🌼','🧺','🏡','🌻','🐞','🌳','🐌','🍯','🌷','🪨'],
 it:[['🧺','le panier de fleurs','panier'],['🎨','la palette','palette'],['🍯','le miel de lavande','miel']],
 s:'Un champ de lavande parfumé s’étend jusqu’à l’horizon. Le bonhomme y peint les abeilles. Trouve-le, puis son panier, sa palette et son miel.',
 w:'Le bonhomme range ses pinceaux : ce champ violet restera dans son carnet pour toujours.'},
{n:'La ferme du matin',ar:3,bc:['#fff0c7','#cde8a8','#6a4a1a'],hz:.32,sky:['#ffd9a8','#cfeefc'],gr:['#9fd17a','#86bd63','#6fa64e'],se:['☁️','🐦','☀️','🕊️'],ge:['🐄','🐖','🐑','🐓','🐥','🌾','🚜','🌻','🥕','🥚','🪣','🐴','🐐','🌽','🍎','🐈'],
 it:[['🧺','le panier','panier'],['🪵','le bâton','bâton'],['🥖','la baguette','baguette']],
 s:'Le petit bonhomme s’est réveillé dans une ferme, au milieu des poules. Retrouve-le entre les animaux, puis son panier, son bâton et sa baguette de pain pour la route.',
 w:'Le coq chante, le bonhomme rit : panier au bras, il reprend son chemin avec du bon pain.'},
{n:'La banquise',bc:['#eef8ff','#b8def2','#1d4f7a'],hz:.3,sky:['#8fc9ef','#e6f6ff'],gr:['#f2f9ff','#dceefb','#c4e2f6'],se:['☁️','❄️','🌨️','🕊️'],ge:['🐧','🐻‍❄️','🦭','🐟','🧊','❄️','⛄','🐋','🦊','🐾','🎣','⛺','🪨','🐳'],
 it:[['🧤','les moufles','moufles'],['🛶','le kayak','kayak'],['🎣','la canne à pêche','canne']],
 s:'Une banquise immense, toute blanche. Le bonhomme y joue à cache-cache avec les pingouins. Trouve-le, ainsi que ses moufles, son kayak et sa canne à pêche.',
 w:'Bien au chaud dans ses moufles, le bonhomme pagaie vers la suite du voyage.'},
{n:'La savane',ar:6,bc:['#ffe6ad','#e8c070','#7a4a14'],hz:.34,sky:['#ffb978','#ffe7b0'],gr:['#e8c779','#d9b463','#c79e4c'],se:['☀️','🦅','☁️'],ge:['🦁','🦒','🐘','🦓','🦏','🌳','🌿','🪨','🐆','🦛','🐊','🦩','🌾','🐃'],
 it:[['🎒','le sac à dos','sac'],['📷','l’appareil photo','appareil'],['👒','le chapeau','chapeau']],
 s:'Sous le soleil doré de la savane, le bonhomme observe les girafes. Retrouve-le, puis son sac à dos, son appareil photo et son chapeau.',
 w:'Clic ! Le bonhomme garde une photo des éléphants et repart, le chapeau bien vissé.'},
{n:'Le verger d’automne',bc:['#ffe0bf','#f2b77a','#7a3a14'],hz:.3,sky:['#f5a96b','#fde2b8'],gr:['#c98f4c','#b47a3a','#9a652c'],se:['🍂','🐦','☁️','🍁'],ge:['🍎','🍐','🍂','🍁','🌰','🐿️','🦔','🍄','🧺','🪵','🎃','🦉','🌳','🐛'],
 it:[['🪜','l’échelle','échelle'],['🧥','le manteau','manteau'],['🍯','le pot de miel','miel']],
 s:'Les feuilles rousses tombent dans le verger. Le bonhomme ramasse des pommes. Trouve-le, avec son échelle, son manteau et son pot de miel.',
 w:'Les poches pleines de pommes, le bonhomme enfile son manteau et file sous les feuilles.'},
{n:'Le port de pêche',bc:['#d9f1ff','#9fd0ea','#1f4f6e'],hz:.36,sky:['#86c9ef','#e2f5ff'],gr:['#5a9cc8','#4a8ab6','#3d78a2'],se:['☁️','🐦','☀️'],ge:['⛵','🚤','🐟','🦀','⚓','🛟','🐙','🦐','🪝','🐚','🐠','🦑','🏝️','🌊'],
 it:[['⚓','l’ancre','ancre'],['🧭','la boussole marine','boussole'],['🛟','la bouée','bouée']],
 s:'Au port, les bateaux dansent sur l’eau. Le bonhomme veut embarquer. Trouve-le, puis son ancre, sa boussole marine et sa bouée.',
 w:'Larguez les amarres ! Le bonhomme salue les mouettes depuis le pont.'},
{n:'La planète lointaine',ar:4,bc:['#d6ccff','#9f8af0','#2a1e6e'],hz:.14,sky:['#120c3a','#3a2a8a'],gr:['#5a3fa8','#4a3192','#3a257a'],se:['⭐','🪐','🌟','☄️','✨'],ge:['👽','🛸','🪐','🌑','🚀','🛰️','💫','🌌','🔭','🧑‍🚀','🌕','⭐','🌠','🪨'],
 it:[['🔭','le télescope','télescope'],['🧑‍🚀','le casque','casque'],['📡','l’antenne','antenne']],
 s:'Une fusée a déposé le bonhomme sur une planète lointaine. Retrouve-le parmi les étoiles, puis son télescope, son casque et son antenne.',
 w:'Bip bip ! L’antenne capte la maison : le bonhomme reprend la route des étoiles.'},
{n:'Le récif de corail',ar:7,bc:['#c9f3f0','#7fd6d0','#0b4e5e'],hz:.1,sky:['#0f6b8a','#3ab5c8'],gr:['#1d8aa8','#167594','#106280'],se:['🫧','🐠','🫧'],ge:['🐠','🐡','🪸','🐢','🦈','🐙','🦑','🐚','⭐','🪼','🐬','🦀','🐟','🐋'],
 it:[['🤿','le masque','masque'],['🧜','la nageoire','nageoire'],['💎','la perle','perle']],
 s:'Sous la mer, le récif brille de mille couleurs. Le bonhomme nage avec les tortues. Trouve-le, avec son masque, sa nageoire et une perle brillante.',
 w:'Une bulle, deux bulles : le bonhomme remonte à la surface avec sa perle.'},
{n:'La maison des étoiles',bc:['#e7d8ff','#cdb6f2','#3d2a85'],hz:.3,sky:['#1a1550','#7a5bb8'],gr:['#5a4a9a','#46397d','#332a63'],se:['⭐','🌟','✨','🌙','💫','☁️'],ge:['🏡','🌲','🛋️','🪑','📚','🧶','🍪','🥛','🐈','🐕','🧦','🖼️','🪟','🌙','⭐','🍲'],
 it:[['🕯️','la bougie','bougie'],['🛏️','le lit','lit'],['🔑','la clé','clé'],['🧸','l’ourson','ourson']],
 s:'Le petit bonhomme pousse la porte de la maison des étoiles et soupire d’aise : ici, il se sent enfin chez lui. La cheminée ronronne, le plaid l’attend. Retrouve-le, puis ses affaires : la bougie, le lit, la clé et l’ourson.',
 w:'La clé tourne, la bougie s’allume, l’ourson l’attend sur le lit. Le petit bonhomme est enfin chez lui, et il s’y sent si bien. Merci de l’avoir ramené.'},
{n:'Le marché aux lanternes',bc:['#f6d8ee','#d79bc9','#4a1a5a'],hz:.3,sky:['#2a1450','#8a3a7a'],gr:['#6a2f6a','#552556','#401a44'],se:['🏮','✨','🌙','🎆','⭐','🏮'],ge:['🏮','🍜','🥟','🍢','🧧','🎎','🐉','🥢','🍡','🛍️','🎏','🧿','🍵','🥠'],
 it:[['🎐','le carillon','carillon'],['🪭','l’éventail','éventail'],['🥢','les baguettes','baguettes'],['🧧','l’enveloppe rouge','enveloppe']],
 s:'Le petit bonhomme se promène entre les étals du marché aux lanternes. Retrouve-le dans la foule, ainsi que son carillon, son éventail, ses baguettes et son enveloppe rouge.',
 w:'Les lanternes se balancent doucement. Le bonhomme repart avec ses trouvailles, un sourire jusqu’aux oreilles.'},
{n:'La montagne et ses chalets',ar:2,bc:['#e4f1ff','#a9cdef','#1f4a7a'],hz:.3,sky:['#7fb6ef','#e6f3ff'],gr:['#eaf2fb','#d4e3f4','#bcd0e8'],se:['☁️','🦅','☀️','🌨️'],ge:['🏔️','⛰️','🌲','🏠','🦌','🐐','🪵','⛷️','🧗','🍲','🌿','🪨','🐿️','🏂'],
 it:[['🎿','les skis','skis'],['🪢','la corde','corde'],['⛺','la tente','tente'],['🥽','les lunettes de ski','lunettes']],
 s:'Là-haut, entre les sapins et les chalets, le bonhomme prépare une grande randonnée. Retrouve-le, ainsi que ses skis, sa corde, sa tente et ses lunettes de ski.',
 w:'Skis aux pieds, tente sur le dos, le bonhomme s’élance sur la pente, tout sourire.'},
{n:'Le marais aux grenouilles',bc:['#dcf2d2','#9ccf9a','#24562e'],hz:.3,sky:['#8fcf9a','#e6f7c8'],gr:['#5a9a5a','#3f7f48','#2c6638'],se:['☁️','🦋','🪰','☀️','🌿'],ge:['🐸','🪷','🌾','🐊','🦆','🪲','🐛','🍃','🐢','🌿','🦋','🪨','🐍','🦗'],
 it:[['🛶','la barque','barque'],['🎣','la canne à pêche','canne'],['☂️','le parapluie','parapluie'],['🪣','le seau','seau']],
 s:'Plic, ploc ! Le bonhomme est tombé dans le marais, parmi les nénuphars et les grenouilles. Retrouve-le, puis sa barque, sa canne à pêche, son parapluie et son seau.',
 w:'La barque glisse sur l’eau calme. Le bonhomme salue les grenouilles, qui coassent en chœur.'},
{n:'L’observatoire',ar:4,bc:['#d0d4ff','#8f96e6','#1a1f6b'],hz:.14,sky:['#0a0f3a','#3a3f96'],gr:['#3a3a6a','#2c2c58','#1f1f45'],se:['⭐','🌙','🪐','☄️','🌟','✨'],ge:['🔭','🏛️','🌌','📖','🌍','🦉','🧪','🕰️','🌠','🔬','🪐','💫','🌑','🛰️'],
 it:[['📐','la règle','règle'],['🗺️','la carte du ciel','carte du ciel'],['⏱️','le chronomètre','chronomètre'],['📓','le carnet','carnet']],
 s:'Dans l’observatoire, le bonhomme compte les étoiles filantes. Retrouve-le parmi les télescopes, puis sa règle, sa carte du ciel, son chronomètre et son carnet.',
 w:'Le carnet se remplit d’étoiles. Le bonhomme a noté toutes celles qui ont traversé le ciel cette nuit.'},
{n:'La bibliothèque enchantée',bc:['#f3e1c8','#d3a874','#4a2a14'],hz:.2,sky:['#3a2a1a','#b8864a'],gr:['#8a5a30','#6f4626','#573619'],se:['✨','🕯️','🌙','⭐','🦉'],ge:['📚','📖','🕯️','🦉','🧙','🔮','📜','🗝️','🐈','🪶','🪄','🧪','🕰️','🖋️'],
 it:[['🪄','la baguette','baguette'],['📜','le parchemin','parchemin'],['🔮','la boule de cristal','boule'],['🪶','la plume','plume']],
 s:'Les livres chuchotent dans la bibliothèque enchantée, et le bonhomme s’y est perdu. Retrouve-le entre les piles de livres, ainsi que sa baguette, son parchemin, sa boule de cristal et sa plume.',
 w:'La plume écrit toute seule la fin de l’histoire : le bonhomme referme le grand livre avec un clin d’œil.'},
{n:'La cabane dans les arbres',bc:['#d6f0c8','#8fd08a','#1f5a2a'],hz:.28,sky:['#9ad8ff','#e8f8ff'],gr:['#6dbb72','#4fa35e','#3a8a4a'],se:['☁️','🦜','🐦','☀️','🍃'],ge:['🌳','🌲','🪜','🏠','🐿️','🦜','🍃','🍎','🪵','🐒','🐦','🌿','🍂','🐛'],
 it:[['🔨','le marteau','marteau'],['🪚','la scie','scie'],['🪜','l’échelle','échelle'],['🚩','le drapeau','drapeau']],
 s:'Le bonhomme construit sa cabane tout là-haut, dans les branches. Retrouve-le dans le feuillage, ainsi que son marteau, sa scie, son échelle et son drapeau.',
 w:'Le drapeau flotte au sommet. La cabane est terminée, et le bonhomme y fait déjà la sieste.'},
{n:'Le temple sous la pluie',bc:['#e0f0ec','#9fcfc4','#1f4a4a'],hz:.3,sky:['#6a8a9a','#c8dce4'],gr:['#4f8a7a','#3f7466','#2f5e52'],se:['🌧️','☁️','☔','🌧️','🐦'],ge:['⛩️','🏯','🎋','🐉','🪷','🌸','🎏','🐟','🌿','🍵','🪨','🎍','🐸','🌾'],
 it:[['🍵','la théière','théière'],['📿','les perles','perles'],['🎋','le bambou','bambou'],['🪷','le lotus','lotus']],
 s:'La pluie tambourine doucement sur les toits du temple. Retrouve le bonhomme qui s’y abrite, puis sa théière, ses perles, son bambou et son lotus.',
 w:'La pluie s’arrête. Le bonhomme sirote son thé, au chaud, sous le grand toit du temple.'},
{n:'La forge du village',bc:['#f3dccb','#d29a72','#4a2410'],hz:.3,sky:['#7a5a4a','#e8b88a'],gr:['#9a6a4a','#7f5538','#664328'],se:['☁️','🔥','🐦','☀️'],ge:['⚒️','🔥','🛡️','⚔️','🪓','🐴','🏰','🪨','🧱','🍖','🐓','🌾','🛖','🪵'],
 it:[['⚙️','l’engrenage','engrenage'],['🪝','le crochet','crochet'],['🔗','la chaîne','chaîne'],['🧲','l’aimant','aimant']],
 s:'Clang, clang ! Dans la forge du village, le bonhomme aide le forgeron. Retrouve-le au milieu des enclumes, puis un engrenage, un crochet, une chaîne et un aimant.',
 w:'Tout est rangé sur l’établi. Le forgeron félicite le bonhomme pour son bon coup de main.'},
{n:'Le phare dans la tempête',bc:['#cfd8ea','#8a9ac4','#1a2a4a'],hz:.28,sky:['#1a2a4a','#5a6a9a'],gr:['#2a4a6a','#1f3a58','#162c46'],se:['🌩️','☁️','⚡','🌧️','🌙'],ge:['🌊','🚢','⛵','🦀','🐚','🐟','🐦','🪨','⚓','🐙','🪸','🐬','🌊','🌫️'],
 it:[['💡','l’ampoule','ampoule'],['📻','la radio','radio'],['🧥','l’imperméable','imperméable'],['🪙','la pièce','pièce']],
 s:'Le vent souffle fort autour du phare. Le bonhomme veille pour guider les bateaux. Retrouve-le, ainsi que son ampoule, sa radio, son imperméable et sa pièce porte-bonheur.',
 w:'La grande lumière balaie la mer. Les bateaux rentrent au port, grâce au bonhomme.'},
{n:'La fête des lumières',bc:['#ecd9f6','#b98ad8','#3a1a5a'],hz:.3,sky:['#1a1250','#8a4aa8'],gr:['#5a3a8a','#472d72','#36215a'],se:['🎆','🎇','✨','🌟','⭐','🎇'],ge:['🏮','🎈','🎁','🍰','🥳','🎶','🎺','🧁','🍾','🪅','🎊','🎉','🕯️','🎂'],
 it:[['🎻','le violon','violon'],['🎷','le saxophone','saxophone'],['🎩','le chapeau','chapeau'],['🪘','le tambour','tambour']],
 s:'Ce soir, tout le village fête les lumières ! Retrouve le bonhomme au milieu des guirlandes, puis son violon, son saxophone, son chapeau et son tambour.',
 w:'Les feux d’artifice éclatent. Le bonhomme danse, content d’avoir retrouvé ses instruments.'},
{n:'Le départ vers le Nord',x:1,ar:2,bc:['#eef6ff','#bcd6f0','#2a4a7a'],hz:.35,sky:['#1f2f6a','#6a86c8'],gr:['#eef5ff','#d6e6f8','#bed4ee'],se:['❄️','⭐','🌙','✨'],ge:['🎄','⛄','🏠','❄️','🦌','🕯️','🧣','🧤','🛷','🔔','🍪','🌟','🐿️','🌲'],
 it:[['🗺️','la carte du Nord','carte'],['🏮','la lanterne','lanterne'],['🧣','l’écharpe','écharpe']],
 s:'Zeni a pris une grande décision : il ira jusqu’au pôle Nord pour trouver le cadeau parfait pour ses deux enfants et sa compagne. Il les leur offrira, s’il les revoit un jour. Retrouve Zeni dans le village, puis sa carte du Nord, sa lanterne et son écharpe.',
 w:'La carte dépliée, la lanterne allumée : Zeni prend la route du grand Nord, le cœur plein d’espoir.'},
{n:'La toundra glacée',x:1,bc:['#e8f4ff','#b0cfe8','#23476e'],hz:.32,sky:['#5f86c0','#cfe3f6'],gr:['#e3eefa','#cddcee','#b5c9e2'],se:['❄️','🌨️','☁️','🦅'],ge:['🦌','🐺','❄️','🌲','🪨','🦊','🐾','⛺','🔥','🐇','🧊','🌨️','🦉','🌬️'],
 it:[['🔥','le feu de camp','feu'],['🥾','les bottes fourrées','bottes'],['🫖','la gourde chaude','gourde']],
 s:'La route traverse la toundra, où souffle un vent glacé. Zeni avance à petits pas. Retrouve-le, puis le feu de camp, ses bottes fourrées et sa gourde chaude.',
 w:'Réchauffé près du feu, Zeni pense au sourire de ses enfants et repart vers le Nord.'},
{n:'Le pôle Nord',x:1,bc:['#f2fbff','#c4e4f6','#1b4a74'],hz:.3,sky:['#9ccdee','#eef9ff'],gr:['#f6fbff','#e3f0fb','#cfe4f6'],se:['❄️','☁️','🌨️'],ge:['🐻‍❄️','🐧','🧊','❄️','⛄','🦭','🐾','🚩','🛷','🌨️','🦊','🐋','⛺','🧭'],
 it:[['🚩','le drapeau','drapeau'],['🧭','la boussole du pôle','boussole'],['🛷','la luge','luge']],
 s:'Le voici au pôle Nord ! Tout est blanc et silencieux. Zeni cherche déjà des idées de cadeaux. Retrouve-le, puis un drapeau, la boussole du pôle et une luge.',
 w:'Sur sa luge, Zeni suit la boussole : on raconte qu’un village se cache derrière les collines.'},
{n:'Les aurores boréales',x:1,ar:4,bc:['#d8f7ec','#8fd8c4','#173a5a'],hz:.2,sky:['#0f1f4a','#2f8f86'],gr:['#dbe9f6','#c3d6ea','#a9c2de'],se:['✨','🌟','⭐','🌌','💫'],ge:['🦌','❄️','🌲','⛄','🦉','🐺','🌨️','🦊','🪨','🐾','🏔️','🔭','🕯️','🌙'],
 it:[['🔭','la longue-vue','longue-vue'],['🌟','l’étoile polaire','étoile'],['🕯️','la bougie','bougie']],
 s:'Le ciel s’illumine de vert et de rose : ce sont les aurores boréales. Zeni s’arrête pour les admirer. Retrouve-le, puis sa longue-vue, l’étoile polaire et une bougie.',
 w:'Guidé par l’étoile polaire, Zeni aperçoit enfin des lumières : le village du Père Noël !'},
{n:'Le village du Père Noël',x:1,ar:2,bc:['#fff1f1','#f2c6c6','#7a1f2a'],hz:.35,sky:['#2a2f6e','#8a7ac8'],gr:['#f5f9ff','#e2ecf8','#ccdcf0'],se:['❄️','⭐','🌙','✨'],ge:['🎅','🤶','🧝','🎄','🏠','🎁','🍪','🔔','🦌','⛄','🍬','🕯️','🧦','🛷'],
 it:[['🔔','la cloche','cloche'],['🍪','le biscuit','biscuit'],['🧦','la chaussette','chaussette']],
 s:'Des maisons en pain d’épices, des lutins pressés, des guirlandes partout : Zeni est arrivé au village du Père Noël. Retrouve-le dans la foule, puis une cloche, un biscuit et une chaussette.',
 w:'Un lutin chuchote à Zeni : « Les plus beaux cadeaux naissent à l’usine à jouets. » Il y court.'},
{n:'La boulangerie des lutins',x:1,ar:2,bc:['#fff3dc','#f2d2a0','#7a4a1a'],hz:.35,sky:['#3a2f6e','#b08ac8'],gr:['#f4ecdf','#e6d8c2','#d6c2a4'],se:['❄️','⭐','✨'],ge:['🧝','🍪','🥐','🧁','🍰','🥛','🍫','🍭','🍬','🎂','🥨','☕','🧇','🍩'],
 it:[['🥛','le verre de lait','lait'],['🧁','le petit gâteau','gâteau'],['🍫','le chocolat','chocolat']],
 s:'Avant l’usine, Zeni passe par la boulangerie des lutins, qui sent le chocolat chaud. Retrouve-le, puis un verre de lait, un petit gâteau et du chocolat.',
 w:'Le ventre plein et les mains chaudes, Zeni remercie les lutins et file vers l’usine.'},
{n:'L’usine à jouets',x:1,ar:5,bc:['#ffe3ec','#ffc8a8','#7a2a3a'],hz:.3,sky:['#6a2f5e','#f09ab8'],gr:['#f2d0c0','#e6b9a6','#d49f8a'],se:['⭐','✨','🎈'],ge:['🧸','🪀','🪁','🚂','🎲','🧩','🪆','🤖','🎨','🪅','🛴','⚽','🎺','🧝','🚁','🎮'],
 it:[['🔧','la clé à molette','clé'],['🎨','le pot de peinture','peinture'],['🧵','la bobine de fil','bobine']],
 s:'Dans l’usine à jouets, les machines chantent et les jouets défilent sur les tapis. Zeni cherche le cadeau parfait. Retrouve-le, puis une clé à molette, un pot de peinture et une bobine de fil.',
 w:'Les jouets sont beaux, mais aucun n’est encore « le » bon. Zeni continue vers l’atelier d’emballage.'},
{n:'L’atelier d’emballage',x:1,ar:5,bc:['#fff0f6','#f6c4dc','#7a1f4a'],hz:.3,sky:['#4a2a6e','#d08ac8'],gr:['#f6dbe8','#ecc6d8','#dcaec4'],se:['⭐','✨','🎀'],ge:['🎁','🎀','📦','✂️','🧝','🏷️','🎄','🧸','🪀','🎊','🔔','🧦','🍬','🪅'],
 it:[['🎀','le ruban','ruban'],['✂️','les ciseaux','ciseaux'],['🏷️','l’étiquette','étiquette']],
 s:'Des montagnes de paquets, des rubans de toutes les couleurs : c’est l’atelier d’emballage. Retrouve Zeni, puis un ruban, des ciseaux et une étiquette.',
 w:'Un vieux lutin sourit : « Les cadeaux les plus précieux attendent dans le traîneau. » Zeni rejoint l’écurie.'},
{n:'L’écurie des rennes',x:1,ar:2,bc:['#f6efe6','#d9c3a6','#5a3a1a'],hz:.34,sky:['#26306a','#7a6ab0'],gr:['#efe6d8','#dccfb8','#c6b496'],se:['❄️','⭐','🌙'],ge:['🦌','🥕','🌾','🪵','🔔','🛷','❄️','🏠','🧝','🍎','🪣','🐴','⛄','🎄'],
 it:[['🥕','la carotte','carotte'],['🔔','le grelot','grelot'],['🌾','la botte de foin','foin']],
 s:'À l’écurie, les rennes se reposent avant la grande nuit. Zeni leur apporte des carottes. Retrouve-le, puis une carotte, un grelot et une botte de foin.',
 w:'Le renne au nez rouge pousse Zeni du museau vers le traîneau, qui brille au fond de l’écurie.'},
{n:'Le traîneau du Père Noël',x:1,ar:11,bc:['#ffe9e9','#f2b8b8','#7a1a24'],hz:.3,sky:['#141a4a','#4a3a8a'],gr:['#e8eefa','#d2dcf0','#b9c8e6'],se:['⭐','🌟','✨','🌙','💫'],ge:['🛷','🎁','🦌','🎅','🔔','🎄','⭐','🧸','🍪','🕯️','🎀','❄️','🧦','🌙'],
 it:[['🧸','l’ourson pour sa fille','ourson'],['🚂','le petit train pour son fils','train'],['🧣','l’écharpe brodée pour sa compagne','écharpe']],
 s:'Le voici devant le traîneau du Père Noël, chargé de paquets. Au milieu, trois cadeaux semblent l’attendre. Retrouve Zeni, puis l’ourson pour sa fille, le petit train pour son fils et l’écharpe brodée pour sa compagne.',
 w:'Zeni serre ses trois cadeaux contre lui. Il est tellement heureux : il a trouvé le cadeau parfait pour chacun. Il a hâte de revoir sa famille pour les leur offrir, et cette pensée le réchauffe plus que tous les feux du Nord.'}

];
function chScene(u,li,sd){
 const R=chRnd(sd),W=CHW,H=CHH,hz=u.hz*H,A=chArt(CHART[li]?li:(u.ar!=null?u.ar:-1),sd,W,H,hz),gy=A.gy||0,av=(x,y)=>A.avoid.some(a=>((x-a[0])/a[2])**2+((y-a[1])/a[3])**2<1),dif=u.x?4+(li-30)*1.1:li<20?li:19+(li-19)*.4,TS=Math.round(40-dif*.8),N=215+dif*8,nt=u.it.length+1;
 const rr=(a,b)=>a+R()*(b-a),pick=a=>a[Math.floor(R()*a.length)];
 const bad=new Set(u.it.map(x=>x[0]));
 const se=u.se.filter(e=>!bad.has(e)),ge=u.ge.filter(e=>!bad.has(e));
 /* fond : ciel + trois collines */
 const wave=(y0,amp,ph)=>{let d=`M0 ${H}L0 ${y0.toFixed(1)}`;for(let x=0;x<=W;x+=40)d+=`L${x} ${(y0+Math.sin(x/130+ph)*amp+Math.sin(x/47+ph*2)*amp*.3).toFixed(1)}`;return d+`L${W} ${H}Z`};
 const gh=H-hz,cx=rr(180,820),cy=rr(60,Math.max(100,hz*.7));
 const bg=`<svg class="hbg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${u.sky[0]}"/><stop offset="1" stop-color="${u.sky[1]}"/></linearGradient><radialGradient id="chg"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="url(#chs)"/><circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="190" fill="url(#chg)"/>${A.back}${u.gr.map((c,i)=>`<path d="${wave(hz+i*gh*.22-28,16+i*6,R()*6)}" fill="${c}"/>`).join('')}${A.front}</svg>`;
 /* les cibles : le bonhomme d’abord, puis les objets ; bien écartées les unes des autres */
 const T=[];let guard=0,gap=nt>4?215:250;
 while(T.length<nt&&guard++<4000){
  const x=rr(70,W-70),y=rr(Math.max(130,gy),H-70);
  if(T.some(t=>Math.hypot(t.x-x,t.y-y)<gap))continue;
  if(!T.length&&y<hz*.8&&u.hz>.2)continue;/* le bonhomme est sur le sol */
  T.push({x,y});
  if(guard>3000&&T.length<nt)gap=150;
 }
 while(T.length<nt)T.push({x:rr(70,W-70),y:rr(Math.max(130,gy),H-70)});
 T.forEach((t,i)=>{if(!i){t.k='g';t.e='';t.n=u.x?'Zeni':'le petit bonhomme';t.s=u.x?'Zeni':'bonhomme';t.r=TS*.85}else{const o=u.it[i-1];t.k='o';t.e=o[0];t.n=o[1];t.s=o[2];t.r=TS*.78}});
 /* décor : plus bas = plus grand et dessiné plus tard ; rien ne cache une cible en entier */
 const D=[];
 const keepClear=(x,y,s)=>T.every(t=>Math.hypot(t.x-x,t.y-y)>=s*.5+TS*.14);
 let tries=0;
 while(D.length<N&&tries++<N*8){
  const sky=hz>240&&R()<.3&&!gy,y=sky?rr(50,hz-10):rr(Math.max(hz-10,gy),H-30),x=rr(10,W-10);
  let s=rr(24,44)*(.72+.5*(y/H));if(R()<.06)s*=1.7;
  if(!keepClear(x,y,s)||av(x,y))continue;
  D.push({e:pick(sky?se:ge),x,y,s,a:rr(-16,16),f:R()<.5?-1:1});
 }
 /* quelques éléments posés en partie devant chaque cible : on la voit, mais il faut chercher */
 T.forEach(t=>{const k=2+Math.floor(R()*2);for(let j=0;j<k;j++){const an=rr(0,Math.PI*2),d=TS*rr(.6,.82),s=TS*rr(1.05,1.4);D.push({e:pick(t.y<hz-10&&se.length?se:ge),x:t.x+Math.cos(an)*d,y:t.y+Math.abs(Math.sin(an))*d*.6+3,s,a:rr(-10,10),f:R()<.5?-1:1})}});
 /* décor lointain : grandes silhouettes pâles au fond, et mille petits détails au sol */
 A.extra.forEach(e=>D.push({e:e.e,x:e.x,y:e.y,s:e.s,a:0,f:1}));
 const FAR=[];for(let j=0;j<16;j++){const sky=hz>240&&R()<.3&&!gy,y=sky?rr(80,hz-20):rr(Math.max(hz-70,gy-40),Math.max(hz+60,gy+50)),s=rr(70,130);const x=rr(0,W);if(!keepClear(x,y,s*1.1)||av(x,y)){continue}FAR.push({e:pick(sky?se:ge),x,y,s,a:rr(-8,8),f:R()<.5?-1:1})}
 for(let j=0,k=0;j<110&&k<900;k++){const y=rr(Math.max(hz+10,gy),H-20),x=rr(10,W-10),s=rr(13,20);if(!keepClear(x,y,s)||av(x,y))continue;D.push({e:pick(ge),x,y,s,a:rr(-25,25),f:R()<.5?-1:1});j++}
 const L=[...FAR.map(d=>({y:-1000+d.y,h:`<span class="ht far" style="left:${d.x.toFixed(1)}px;top:${d.y.toFixed(1)}px;font-size:${d.s.toFixed(1)}px;transform:translate(-50%,-50%) rotate(${d.a.toFixed(1)}deg) scaleX(${d.f})">${d.e}</span>`})),...D.map(d=>({y:d.y,h:`<span class="ht" style="left:${d.x.toFixed(1)}px;top:${d.y.toFixed(1)}px;font-size:${d.s.toFixed(1)}px;transform:translate(-50%,-50%) rotate(${d.a.toFixed(1)}deg) scaleX(${d.f})">${d.e}</span>`})),
  ...T.map((t,i)=>({y:t.y,h:t.k==='g'?`<span class="ht g" data-t="${i}" style="left:${t.x.toFixed(1)}px;top:${t.y.toFixed(1)}px;width:${(TS*1.05).toFixed(1)}px">${qzGuy('ask')}</span>`:`<span class="ht o" data-t="${i}" style="left:${t.x.toFixed(1)}px;top:${t.y.toFixed(1)}px;font-size:${TS}px">${t.e}</span>`}))];
 L.sort((a,b)=>a.y-b.y);
 return{html:bg+L.map(l=>l.h).join(''),T};
}
function pCherche(r){
 const li=Math.min(lv,CHU.length-1),u=CHU[li],sd=r&&Number.isInteger(r.sd)?r.sd:(Math.random()*1e9|0),S=chScene(u,li,sd),T=S.T;
 let found=r&&Array.isArray(r.f)?[...new Set(r.f.filter(i=>Number.isInteger(i)&&i>=0&&i<T.length))]:[],intro=!r,fin=false;
 snap=()=>({sd,f:found});
 const al=()=>playing&&cur==='cherche'&&document.body.contains($('#hv'));
 const tray=()=>T.map((t,i)=>{const ok=found.includes(i);return`<div class="hti${ok?' ok':''}" data-t="${i}"><span class="hte">${t.k==='g'?qzGuy(ok?'ok':'ask'):t.e}</span><small>${t.s}</small>${ok?'<b>✓</b>':''}</div>`}).join('');
 $('#nav').hidden=true;mt='m';keep();
 app.innerHTML=`<div class="hf" id="hf" style="--bc1:${u.bc[0]};--bc2:${u.bc[1]};--bink:${u.bc[2]};--bem:'${[...u.ge.filter(e=>e.length<=4).slice(0,7)].join(' ')}  '"><div class="hv" id="hv"><div class="hw" id="hw" style="width:${CHW}px;height:${CHH}px">${S.html}</div></div>
<div class="htb"></div>
<div class="hhd"><button class="back" data-a="back" data-v="hub">‹ Retour</button><span class="hsp"></span><button class="hb skh" data-a="skip">Passer</button><button class="hb hintb" data-a="hint" aria-label="Indice : coûte 1 flocon">${HBI(1)}</button><div class="chip">❄ ${FLX()}</div></div>
<p class="m hmsg" id="m" role="status" aria-live="polite"></p>
<div class="skw" id="skw"></div>
<div class="hbar"><button class="hzb" data-a="chz" data-v="-1" aria-label="Rétrécir">−</button><div class="htr" id="htr" aria-label="À trouver">${tray()}</div><button class="hzb" data-a="chz" data-v="1" aria-label="Agrandir">+</button></div>
${intro?`<div class="hov" id="hov"><div class="hcd glass"><h2>${u.n}</h2><p>${u.s}</p><div class="hli">${T.map(t=>`<span>${t.k==='g'?'<i class="hg">'+qzGuy('ask')+'</i>':'<i>'+t.e+'</i>'}<em>${t.n}</em></span>`).join('')}</div><button class="btn" data-a="chgo">C’est parti</button></div></div>`:''}</div>`;
 const hv=$('#hv'),hw=$('#hw');
 let s=1,tx=0,ty=0,vw=0,vh=0,smin=.5,smax=3;
 const clamp=()=>{s=Math.max(smin,Math.min(smax,s));const w=CHW*s,h=CHH*s;tx=vw>=w?(vw-w)/2:Math.min(0,Math.max(vw-w,tx));ty=vh>=h?(vh-h)/2:Math.min(0,Math.max(vh-h,ty))};
 /* rendu fluide : la scène reste sur sa propre couche (le glissement ne la redessine jamais) ; après un zoom, on la redessine nette une seule fois */
 let rs=0,lt=0;const crisp=()=>{if(Math.abs(s-rs)<1e-4)return;rs=s;hw.style.willChange='auto';requestAnimationFrame(()=>{hw.style.willChange='transform'})};
 const put=()=>{clamp();hw.style.transform=`translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${s.toFixed(4)})`;if(Math.abs(s-rs)>1e-4){clearTimeout(lt);lt=setTimeout(crisp,350)}};
 const fit=()=>{const f=s<=smin*1.001;vw=hv.clientWidth||innerWidth;vh=hv.clientHeight||innerHeight;smin=Math.max(vw/CHW,vh/CHH);smax=Math.max(smin*3.2,2.6);if(f||!hw.style.transform)s=smin*1.12;put()};
 fit();tx=(vw-CHW*s)/2;ty=0;put();rs=s;
 const zoomAt=(cx,cy,ns)=>{ns=Math.max(smin,Math.min(smax,ns));const wx=(cx-tx)/s,wy=(cy-ty)/s;s=ns;tx=cx-wx*s;ty=cy-wy*s;put()};
 const onRs=()=>{if(!document.body.contains(hv))return removeEventListener('resize',onRs);hb=null;fit()};addEventListener('resize',onRs);
 /* gestes : un doigt fait glisser la scène, deux doigts la zooment, un appui court cherche sous le doigt */
 const P=new Map();let g0=null,mv=false;
 let hb=null;const pt=e=>{const b=hb||(hb=hv.getBoundingClientRect());return[e.clientX-b.left,e.clientY-b.top]};
 hv.addEventListener('pointerdown',e=>{if(intro||fin)return;hb=null;try{hv.setPointerCapture(e.pointerId)}catch(_){}const[x,y]=pt(e);P.set(e.pointerId,{x,y,sx:x,sy:y,t:Date.now()});mv=false;
  if(P.size===2){const[a,b]=[...P.values()];g0={d:Math.hypot(a.x-b.x,a.y-b.y)||1,s,mx:(a.x+b.x)/2,my:(a.y+b.y)/2,wx:((a.x+b.x)/2-tx)/s,wy:((a.y+b.y)/2-ty)/s};mv=true}});
 hv.addEventListener('pointermove',e=>{const p=P.get(e.pointerId);if(!p)return;const[x,y]=pt(e);
  if(P.size===2&&g0){p.x=x;p.y=y;const[a,b]=[...P.values()],d=Math.hypot(a.x-b.x,a.y-b.y)||1,mx=(a.x+b.x)/2,my=(a.y+b.y)/2;s=Math.max(smin,Math.min(smax,g0.s*d/g0.d));tx=mx-g0.wx*s;ty=my-g0.wy*s;put();return}
  if(P.size===1){if(!mv&&Math.hypot(x-p.sx,y-p.sy)>8)mv=true;if(mv){tx+=x-p.x;ty+=y-p.y;put()}p.x=x;p.y=y}});
 const up=e=>{const p=P.get(e.pointerId);if(!p)return;P.delete(e.pointerId);if(P.size<2)g0=null;
  if(!mv&&P.size===0&&Date.now()-p.t<600)tap(p.x,p.y);if(P.size===1){const q=[...P.values()][0];q.sx=q.x;q.sy=q.y;mv=true}};
 hv.addEventListener('pointerup',up);hv.addEventListener('pointercancel',up);
 hv.addEventListener('wheel',e=>{e.preventDefault();hb=null;const[x,y]=pt(e);zoomAt(x,y,s*(e.deltaY<0?1.18:1/1.18))},{passive:false});
 const ripple=(x,y)=>{const d=document.createElement('i');d.className='hrp';d.style.left=x+'px';d.style.top=y+'px';hw.appendChild(d);setTimeout(()=>d.remove(),600)};
 const tap=(cx,cy)=>{
  const x=(cx-tx)/s,y=(cy-ty)/s;let b=-1,bd=1e9;
  T.forEach((t,i)=>{if(found.includes(i))return;const d=Math.hypot(t.x-x,t.y-y),rad=Math.max(t.r,26/s);if(d<=rad&&d<bd){bd=d;b=i}});
  if(b<0){ripple(x,y);sfx(330,.06);return}
  got(b)};
 const got=i=>{
  if(found.includes(i))return;found.push(i);keep();
  const t=T[i],el=hw.querySelector(`.ht[data-t="${i}"]`);if(el)el.classList.add('f');
  const tr=$('#htr');if(tr)tr.innerHTML=tray();
  sfx(i?740:880,.35);setTimeout(()=>sfx(i?988:1175,.45),130);vib(i?20:[20,40,20]);
  if(found.length>=T.length){fin=true;msg('Tout est trouvé !');const m=$('.hmsg');if(m)m.classList.add('big');setTimeout(()=>{if(al())win()},1700);[523,659,784,1047].forEach((f,k)=>setTimeout(()=>sfx(f,.6),500+k*160));if(el)confetti(el);return}
  msg(t.k==='g'?(u.x?'Tu as retrouvé Zeni ! Cherche encore les objets.':'Tu as retrouvé le petit bonhomme ! Cherche encore ses affaires.'):'Trouvé : '+t.n+' !');
 };
 /* les messages s’effacent seuls après 5 secondes */
 {const hm=$('.hmsg');let to=0;if(hm)new MutationObserver(()=>{clearTimeout(to);if(hm.textContent&&!fin)to=setTimeout(()=>{hm.textContent=''},5000)}).observe(hm,{childList:true,characterData:true,subtree:true})}
 act.chz=v=>{if(fin)return;hw.classList.add('sm');zoomAt(vw/2,vh/2,s*(+v>0?1.4:1/1.4));setTimeout(()=>hw.classList.remove('sm'),450)};
 act.chgo=()=>{intro=false;const o=$('#hov');if(o)o.remove();msg('Fais glisser la scène, pince pour agrandir, touche ce que tu trouves.');};
 act.hint=()=>{
  if(intro||fin)return;const left=T.map((t,i)=>i).filter(i=>!found.includes(i));if(!left.length||!spend(1))return;
  const i=left[Math.floor(Math.random()*left.length)],t=T[i];
  hw.classList.add('sm');s=Math.max(s,smin*1.7);tx=vw/2-t.x*s;ty=vh/2-t.y*s;put();setTimeout(()=>hw.classList.remove('sm'),700);
  const ox=(Math.random()-.5)*60,oy=(Math.random()-.5)*60,d=document.createElement('i');d.className='hrg';d.style.left=(t.x+ox)+'px';d.style.top=(t.y+oy)+'px';hw.appendChild(d);setTimeout(()=>d.remove(),3600);
  msg('Indice : ce que tu cherches est dans le cercle qui brille.');
 };
 if(found.length>=T.length&&r)setTimeout(()=>{if(al())win()},300);
 found.forEach(i=>{const el=hw.querySelector(`.ht[data-t="${i}"]`);if(el)el.classList.add('f')});
}
/* ---------- Cherche et trouve : décors dessinés (chalet, patinoire, resort, château…) sous les petits éléments ---------- */
const CHK={
 cloud:(x,y,s,c='#fff',o=.85)=>`<g fill="${c}" opacity="${o}"><ellipse cx="${x}" cy="${y}" rx="${s}" ry="${s*.34}"/><ellipse cx="${x-s*.5}" cy="${y+s*.08}" rx="${s*.55}" ry="${s*.27}"/><ellipse cx="${x+s*.55}" cy="${y+s*.1}" rx="${s*.5}" ry="${s*.25}"/><ellipse cx="${x-s*.05}" cy="${y-s*.2}" rx="${s*.48}" ry="${s*.3}"/></g>`,
 mount:(x,y,w,h,c,cap)=>`<path d="M${x-w/2} ${y}L${x-w*.08} ${y-h}L${x+w*.1} ${y-h*.84}L${x+w*.5} ${y}Z" fill="${c}"/>`+(cap?`<path d="M${x-w*.08} ${y-h}L${x-w*.2} ${y-h*.72}L${x-w*.12} ${y-h*.77}L${x-w*.04} ${y-h*.66}L${x+w*.03} ${y-h*.77}L${x+w*.1} ${y-h*.84}Z" fill="${cap}"/>`:''),
 pine:(x,y,s,c1='#1f5a3c',c2='#2c7a52',sn)=>{let g=`<rect x="${x-s*.04}" y="${y-s*.14}" width="${s*.08}" height="${s*.14}" fill="#5a3a22"/>`;for(let i=0;i<3;i++){const yy=y-s*.1-i*s*.26,w=s*.5*(1-i*.22);g+=`<path d="M${x-w/2} ${yy}L${x} ${yy-s*.44}L${x+w/2} ${yy}Z" fill="${i%2?c2:c1}"/>`;if(sn)g+=`<path d="M${x-w*.3} ${yy-s*.2}L${x} ${yy-s*.44}L${x+w*.3} ${yy-s*.2}Q${x} ${yy-s*.12} ${x-w*.3} ${yy-s*.2}Z" fill="#fff" opacity=".93"/>`}return g},
 rtree:(x,y,s,c1='#3f9a4a',c2='#56b45c')=>`<rect x="${x-s*.05}" y="${y-s*.4}" width="${s*.1}" height="${s*.4}" fill="#6b4528"/><circle cx="${x}" cy="${y-s*.62}" r="${s*.3}" fill="${c1}"/><circle cx="${x-s*.2}" cy="${y-s*.48}" r="${s*.22}" fill="${c1}"/><circle cx="${x+s*.2}" cy="${y-s*.5}" r="${s*.22}" fill="${c1}"/><circle cx="${x-s*.06}" cy="${y-s*.7}" r="${s*.18}" fill="${c2}"/>`,
 win:(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" stroke="#3a2418" stroke-opacity=".6" stroke-width="1.6"/><path d="M${x+w/2} ${y}v${h}M${x} ${y+h/2}h${w}" stroke="#3a2418" stroke-opacity=".45" stroke-width="1.2"/>`,
 smoke:(x,y,s)=>`<g fill="#fff" opacity=".55"><circle cx="${x}" cy="${y}" r="${s*.07}"/><circle cx="${x+s*.05}" cy="${y-s*.12}" r="${s*.1}"/><circle cx="${x+s*.13}" cy="${y-s*.26}" r="${s*.13}"/></g>`,
 chalet:(x,y,w,o={})=>{const h=w*.5,b=o.body||'#a8703f',rf=o.roof||'#6b3f2a',lit=o.lit||'#ffd36b';let g=`<ellipse cx="${x}" cy="${y+3}" rx="${w*.62}" ry="${w*.07}" fill="#000" opacity=".16"/><rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="${b}"/>`;for(let i=1;i<6;i++)g+=`<path d="M${x-w/2} ${y-h+i*h/6}h${w}" stroke="#4a2a14" stroke-opacity=".3" stroke-width="2"/>`;g+=`<rect x="${x+w*.2}" y="${y-h-w*.36}" width="${w*.1}" height="${w*.22}" fill="#8a7a72"/><rect x="${x+w*.18}" y="${y-h-w*.38}" width="${w*.14}" height="${w*.04}" fill="#fff"/>`+CHK.smoke(x+w*.25,y-h-w*.44,w)+`<path d="M${x-w*.64} ${y-h+4}L${x} ${y-h-w*.38}L${x+w*.64} ${y-h+4}Z" fill="${rf}"/>`;if(o.snow!==false)g+=`<path d="M${x-w*.64} ${y-h+4}L${x} ${y-h-w*.38}L${x+w*.64} ${y-h+4}L${x+w*.55} ${y-h+4}L${x} ${y-h-w*.28}L${x-w*.55} ${y-h+4}Z" fill="#fff" opacity=".95"/><ellipse cx="${x}" cy="${y-h-w*.37}" rx="${w*.05}" ry="${w*.02}" fill="#fff"/>`;g+=`<rect x="${x-w*.07}" y="${y-h*.62}" width="${w*.14}" height="${h*.62}" fill="#5a3320"/><circle cx="${x+w*.04}" cy="${y-h*.3}" r="2.5" fill="#f3d27a"/>`+CHK.win(x-w*.36,y-h*.74,w*.16,h*.36,lit)+CHK.win(x+w*.2,y-h*.74,w*.16,h*.36,lit);return g+`<rect x="${x-w*.5}" y="${y-5}" width="${w}" height="9" rx="4" fill="#fff" opacity=".9"/>`},
 rink:(x,y,w)=>{const a=w/2,b=w*.2;let g=`<ellipse cx="${x}" cy="${y+7}" rx="${a+9}" ry="${b+7}" fill="#6b4a2e"/><ellipse cx="${x}" cy="${y}" rx="${a+9}" ry="${b+7}" fill="#8a5f3a"/><ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="url(#chice)"/>`;g+=`<g fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="1.6" stroke-linecap="round"><path d="M${x-a*.7} ${y+b*.2}Q${x-a*.2} ${y-b*.6} ${x+a*.3} ${y+b*.1}"/><path d="M${x-a*.5} ${y+b*.55}Q${x} ${y+b*.1} ${x+a*.7} ${y+b*.4}"/><path d="M${x-a*.3} ${y-b*.4}Q${x+a*.2} ${y-b*.8} ${x+a*.6} ${y-b*.3}"/></g><path d="M${x} ${y-b}V${y+b}" stroke="#d94a4a" stroke-opacity=".55" stroke-width="3"/><ellipse cx="${x}" cy="${y}" rx="${a*.14}" ry="${b*.28}" fill="none" stroke="#3a78d8" stroke-opacity=".6" stroke-width="2.5"/><ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="none" stroke="#c99560" stroke-width="2"/>`;for(const s of[-1,1]){const px=x+s*(a+22);g+=`<rect x="${px-1.5}" y="${y-b*.5-26}" width="3" height="40" fill="#5a4a40"/><circle cx="${px}" cy="${y-b*.5-28}" r="6" fill="#ffe08a"/><circle cx="${px}" cy="${y-b*.5-28}" r="16" fill="#ffe08a" opacity=".25"/>`}return g},
 parasol:(x,y,s,c)=>`<ellipse cx="${x}" cy="${y+2}" rx="${s*.55}" ry="${s*.1}" fill="#000" opacity=".12"/><path d="M${x} ${y}V${y-s*1.05}" stroke="#7a5a3a" stroke-width="${s*.05}"/><path d="M${x-s*.62} ${y-s}Q${x} ${y-s*1.7} ${x+s*.62} ${y-s}Q${x+s*.31} ${y-s*1.08} ${x} ${y-s} Q${x-s*.31} ${y-s*1.08} ${x-s*.62} ${y-s}Z" fill="${c}"/><path d="M${x-s*.2} ${y-s*1.06}Q${x} ${y-s*1.58} ${x+s*.2} ${y-s*1.06}Q${x} ${y-s*1.12} ${x-s*.2} ${y-s*1.06}Z" fill="#fff" opacity=".9"/>`,
 lounger:(x,y,s,c)=>`<ellipse cx="${x+s*.4}" cy="${y+2}" rx="${s*.65}" ry="${s*.08}" fill="#000" opacity=".12"/><path d="M${x} ${y-s*.12}L${x+s*.95} ${y-s*.12}L${x+s*.9} ${y-s*.02}L${x+s*.02} ${y-s*.02}Z" fill="${c}"/><path d="M${x} ${y-s*.12}L${x-s*.26} ${y-s*.5}L${x-s*.14} ${y-s*.54}L${x+s*.14} ${y-s*.14}Z" fill="${c}"/><path d="M${x+s*.1} ${y-s*.02}v${s*.08}M${x+s*.85} ${y-s*.02}v${s*.08}" stroke="#fff" stroke-width="2"/>`,
 palm:(x,y,s)=>{let g=`<path d="M${x} ${y}Q${x+s*.14} ${y-s*.5} ${x+s*.06} ${y-s}" stroke="#8a5a2a" stroke-width="${s*.07}" fill="none" stroke-linecap="round"/>`;const tx=x+s*.06,ty=y-s;for(const a of[-175,-140,-105,-75,-40,-5]){const r=a*Math.PI/180;g+=`<path d="M${tx} ${ty}Q${tx+Math.cos(r)*s*.28} ${ty+Math.sin(r)*s*.42} ${tx+Math.cos(r)*s*.52} ${ty+Math.sin(r)*s*.28+s*.14}" stroke="#2f9a4a" stroke-width="${s*.075}" fill="none" stroke-linecap="round"/>`}return g+`<circle cx="${tx-3}" cy="${ty+5}" r="${s*.04}" fill="#6b4a22"/><circle cx="${tx+4}" cy="${ty+6}" r="${s*.04}" fill="#6b4a22"/>`},
 bld:(R,x,y,w,h,c,lc='#ffd66b')=>{let g=`<rect x="${x}" y="${y-h}" width="${w}" height="${h}" fill="${c}"/>`,p='';for(let wy=y-h+10;wy<y-14;wy+=20)for(let wx=x+7;wx<x+w-10;wx+=15)if(R()<.55)p+=`M${wx} ${wy}h7v10h-7z`;return g+`<path d="${p}" fill="${lc}"/>`},
 cren:(x,y,w,c)=>{let p='';for(let i=0;i<w;i+=10)p+=`M${x+i} ${y}h5v-6h-5z`;return `<path d="${p}" fill="${c}"/>`},
 tower:(x,y,w,h,c,rf)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="${c}"/>`+CHK.cren(x-w/2-1,y-h,w+2,c)+`<path d="M${x-w*.62} ${y-h-6}L${x} ${y-h-w*1.3}L${x+w*.62} ${y-h-6}Z" fill="${rf}"/><path d="M${x} ${y-h-w*1.3}v-18" stroke="#444" stroke-width="2"/><path d="M${x} ${y-h-w*1.3-18}l14 5-14 5z" fill="#e0496e"/><path d="M${x-w*.1} ${y-h*.6}h${w*.2}v${w*.34}h-${w*.2}z" fill="#ffd66b"/>`,
 castle:(x,y,w,c='#c9cdf2',rf='#6a58b8')=>{const h=w*.5;let g=`<rect x="${x-w/2}" y="${y-h*.5}" width="${w}" height="${h*.5}" fill="${c}" stroke="#000" stroke-opacity=".12"/>`+CHK.cren(x-w/2,y-h*.5,w,c);g+=CHK.tower(x-w*.42,y,w*.14,h*.95,c,rf)+CHK.tower(x+w*.42,y,w*.14,h*.95,c,rf)+CHK.tower(x-w*.17,y-h*.2,w*.13,h*.85,c,rf)+CHK.tower(x+w*.17,y-h*.2,w*.13,h*.85,c,rf)+CHK.tower(x,y-h*.35,w*.2,h*1.05,c,rf);return g+`<path d="M${x-w*.07} ${y}V${y-h*.22}Q${x} ${y-h*.34} ${x+w*.07} ${y-h*.22}V${y}Z" fill="#3a2a5a"/>`},
 stars:(R,n,x0,y0,x1,y1,c='#fff')=>{let p='';for(let i=0;i<n;i++){const x=x0+R()*(x1-x0),y=y0+R()*(y1-y0),r=.8+R()*1.8;p+=`<circle cx="${x}" cy="${y}" r="${r}"/>`}return `<g fill="${c}" opacity=".85">${p}</g>`},
 planet:(x,y,r,c,ring)=>`<g>`+(ring?`<ellipse cx="${x}" cy="${y}" rx="${r*1.9}" ry="${r*.45}" fill="none" stroke="${ring}" stroke-width="${r*.16}" opacity=".7" transform="rotate(-18 ${x} ${y})"/>`:'')+`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x-r*.28}" cy="${y-r*.28}" r="${r*.7}" fill="#fff" opacity=".13"/><path d="M${x-r*.9} ${y+r*.2}Q${x} ${y+r*.5} ${x+r*.9} ${y+r*.1}" stroke="#000" stroke-opacity=".12" stroke-width="${r*.12}" fill="none"/>`+(ring?`<path d="M${x-r*1.9} ${y+r*.45}Q${x} ${y+r*1.1} ${x+r*1.9} ${y-r*.45}" fill="none" stroke="${ring}" stroke-width="${r*.16}" opacity=".7" clip-path="none" transform="rotate(0)" display="none"/>`:'')+`</g>`,
 flowers:(R,n,x0,y0,x1,y1,cols)=>{let g='';for(let i=0;i<n;i++){const x=x0+R()*(x1-x0),y=y0+R()*(y1-y0),c=cols[Math.floor(R()*cols.length)];g+=`<path d="M${x} ${y}v7" stroke="#2f7a3a" stroke-width="1.6"/><circle cx="${x}" cy="${y}" r="3.6" fill="${c}"/><circle cx="${x}" cy="${y}" r="1.4" fill="#ffe27a"/>`}return g},
 fence:(x,y,w,c='#fff')=>{let g=`<path d="M${x} ${y-14}h${w}M${x} ${y-6}h${w}" stroke="${c}" stroke-width="3"/>`;for(let i=0;i<=w;i+=14)g+=`<path d="M${x+i-3} ${y}v-20l3-4 3 4v20z" fill="${c}"/>`;return g},
 lamp:(x,y,h,c='#ffe08a')=>`<rect x="${x-1.5}" y="${y-h}" width="3" height="${h}" fill="#4a4250"/><circle cx="${x}" cy="${y-h}" r="6" fill="${c}"/><circle cx="${x}" cy="${y-h}" r="20" fill="${c}" opacity=".22"/>`,
 tent:(x,y,w,h,c1,c2)=>{let g=`<rect x="${x-w/2}" y="${y-h*.45}" width="${w}" height="${h*.45}" fill="${c2}"/>`;const n=6,s=w/n;for(let i=0;i<n;i+=2)g+=`<rect x="${x-w/2+i*s}" y="${y-h*.45}" width="${s}" height="${h*.45}" fill="${c1}"/>`;for(let i=0;i<n;i++)g+=`<path d="M${x} ${y-h}L${x-w*.55+i*w*1.1/n} ${y-h*.45}L${x-w*.55+(i+1)*w*1.1/n} ${y-h*.45}Z" fill="${i%2?c2:c1}"/>`;return g+`<path d="M${x} ${y-h}v-16" stroke="#555" stroke-width="2"/><path d="M${x} ${y-h-16}l12 4-12 4z" fill="#ffd34a"/><path d="M${x-w*.1} ${y}v${-h*.3}h${w*.2}v${h*.3}z" fill="#3a2a2a" opacity=".6"/>`},
 wheel:(x,y,r)=>{let g=`<path d="M${x-r*.5} ${y+r*1.35}L${x} ${y}L${x+r*.5} ${y+r*1.35}" stroke="#7a3a5a" stroke-width="${r*.06}" fill="none"/>`;for(let i=0;i<12;i++){const a=i*Math.PI/6,ex=x+Math.cos(a)*r,ey=y+Math.sin(a)*r;g+=`<path d="M${x} ${y}L${ex} ${ey}" stroke="#d9d0e0" stroke-width="2.4"/><rect x="${ex-r*.08}" y="${ey-r*.03}" width="${r*.16}" height="${r*.15}" rx="3" fill="${['#ff5a7a','#ffc23a','#4ac2ff','#7ad65a'][i%4]}"/>`}return g+`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#e8def0" stroke-width="${r*.045}"/><circle cx="${x}" cy="${y}" r="${r*.7}" fill="none" stroke="#e8def0" stroke-width="2"/><circle cx="${x}" cy="${y}" r="${r*.08}" fill="#ffd34a"/>`}
};
/* chaque univers : { back (derrière les collines), front (devant), avoid (zones sans petits éléments), extra (éléments posés exprès), gy (début du sol) } */
const CHART=[
/* 0 – forêt des lucioles */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK;let b=`<circle cx="${r(620,860)}" cy="120" r="110" fill="#fff6c8" opacity=".12"/><circle cx="${r(620,860)}" cy="120" r="46" fill="#fff6c8"/>`+K.stars(R,40,0,10,W,hz*.7)+K.mount(250,hz,520,170,'#1a2a58')+K.mount(760,hz,560,140,'#1c3260');for(let x=-10;x<W+30;x+=r(22,34))b+=K.pine(x,hz+r(-4,8),r(70,120),'#12382c','#17483a');
 let f=`<path d="M470 ${H}C420 ${hz+520} 640 ${hz+380} 560 ${hz+250}S720 ${hz+170} 760 ${hz+120}" stroke="#d8b878" stroke-opacity=".35" stroke-width="52" fill="none" stroke-linecap="round"/><ellipse cx="260" cy="${hz+330}" rx="170" ry="48" fill="#27507c"/><ellipse cx="240" cy="${hz+326}" rx="120" ry="30" fill="#3f78a8" opacity=".6"/><circle cx="300" cy="${hz+322}" r="14" fill="#fff6c8" opacity=".7"/>`+K.chalet(760,hz+150,110,{body:'#6a4630',roof:'#2d4a40',lit:'#ffcf5a'});
 for(let i=0;i<5;i++)f+=K.pine(r(10,150),hz+r(60,520),r(160,230),'#133f31','#1b5642');for(let i=0;i<5;i++)f+=K.pine(r(850,990),hz+r(60,520),r(160,230),'#133f31','#1b5642');
 for(let i=0;i<70;i++){const x=r(10,990),y=r(hz+20,H-20);f+=`<circle cx="${x}" cy="${y}" r="9" fill="#fff7a0" opacity=".2"/><circle cx="${x}" cy="${y}" r="2.6" fill="#fff7a0"/>`}
 f+=`<ellipse cx="500" cy="${hz+60}" rx="520" ry="22" fill="#fff" opacity=".07"/><ellipse cx="400" cy="${hz+430}" rx="520" ry="26" fill="#fff" opacity=".06"/>`;
 return{back:b,front:f,avoid:[[260,hz+330,170,48],[760,hz+120,70,50]],extra:[]}},
/* 1 – plage */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK,sh=hz+110;let b=`<circle cx="${r(180,420)}" cy="${hz*.4}" r="46" fill="#fff6b0"/><circle cx="${r(180,420)}" cy="${hz*.4}" r="120" fill="#fff6b0" opacity=".25"/>`+K.cloud(760,90,70)+K.cloud(240,190,56)+K.cloud(560,60,48);
 let sea=`M0 ${hz-30}H${W}V${sh}`;for(let x=W;x>=0;x-=40)sea+=`L${x} ${sh+Math.sin(x/70)*12+8}`;sea+='Z';
 let f=`<defs><linearGradient id="chsea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a9fd6"/><stop offset="1" stop-color="#7fe0e8"/></linearGradient></defs><path d="${sea}" fill="url(#chsea)"/>`;
 for(let i=0;i<26;i++){const x=r(10,990),y=r(hz-10,sh-10);f+=`<path d="M${x} ${y}h${r(14,32)}" stroke="#fff" stroke-opacity=".5" stroke-width="2.5" stroke-linecap="round"/>`}
 f+=`<g transform="translate(300 ${hz+20})"><path d="M-30 0L30 0L20 16L-20 16Z" fill="#c9482e"/><path d="M0 0V-70L38 -8Z" fill="#fff"/><path d="M-4 -6V-60L-30 -6Z" fill="#fff" opacity=".85"/></g><g transform="translate(790 ${hz-4})"><path d="M-10 0L-6 -80H6L10 0Z" fill="#fff"/><path d="M-8 -20h16M-7 -45h14" stroke="#d94a4a" stroke-width="10"/><rect x="-9" y="-92" width="18" height="12" fill="#ffd34a"/><path d="M-10 -92L0 -104 10 -92Z" fill="#d94a4a"/></g>`;
 let sf=`M0 ${sh+8}`;for(let x=0;x<=W;x+=40)sf+=`L${x} ${sh+Math.sin(x/70)*12+8}`;f+=`<path d="${sf}" fill="none" stroke="#fff" stroke-width="7" stroke-opacity=".85" stroke-linejoin="round"/><path d="${sf}" fill="none" stroke="#e9d49a" stroke-width="16" stroke-opacity=".45" transform="translate(0 14)"/>`;
 const ry=sh+130;f+=`<path d="M120 ${ry+10}h220v-150h-220z" fill="#fff3dc"/><path d="M340 ${ry+10}h46v-150h-46z" fill="#e6d3b0"/>`;
 for(let fl=0;fl<4;fl++)for(let c=0;c<4;c++)f+=`<rect x="${134+c*50}" y="${ry-132+fl*34}" width="30" height="20" fill="#5ec6d8"/><rect x="${130+c*50}" y="${ry-110+fl*34}" width="38" height="4" fill="#e8cf9c"/>`;
 f+=`<path d="M112 ${ry-142}h236l-12-20h-212z" fill="#d6704a"/><path d="M200 ${ry+10}v-46h60v46z" fill="#7a5a3a"/><path d="M196 ${ry-44}h68l-8-16h-52z" fill="#ff7a5a"/><path d="M215 ${ry-44}l-6 28M240 ${ry-44}l-6 28" stroke="#fff" stroke-width="5" opacity=".7"/>`;
 f+=`<rect x="420" y="${ry-40}" width="260" height="60" rx="26" fill="#d8c08a"/><rect x="428" y="${ry-34}" width="244" height="48" rx="22" fill="#38b8e0"/><path d="M450 ${ry-10}h200M450 ${ry+4}h200" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><path d="M640 ${ry-34}v-22M650 ${ry-34}v-22" stroke="#bbb" stroke-width="3"/>`;
 const cols=['#ff6a5a','#ffc23a','#4ac2ff','#ff8ad0','#7ad65a'];let i=0;
 for(const [px,py] of [[160,ry+130],[300,ry+170],[460,ry+120],[620,ry+175],[790,ry+130],[900,ry+200],[110,ry+260],[380,ry+300],[700,ry+320],[880,ry+380],[200,ry+420],[560,ry+450]]){f+=K.parasol(px,py,r(58,80),cols[i++%5])+K.lounger(px-26,py+18,34,cols[(i+2)%5])+K.lounger(px+24,py+18,34,cols[(i+3)%5])}
 for(const [px,py,s] of [[60,sh+150,200],[950,sh+130,210],[930,ry+330,240],[50,ry+380,230],[500,ry+280,170]])f+=K.palm(px,py,s);
 return{back:b,front:f,avoid:[[W/2,(hz+sh)/2-20,W/2,(sh-hz)/2+10],[230,ry-80,125,90],[550,ry-10,140,36]],extra:[{e:'🏊',x:520,y:ry-8,s:30},{e:'🏊',x:600,y:ry+2,s:26}],gy:sh+16}},
/* 2 – village sous la neige */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK;let b=K.cloud(260,100,70,'#fff',.7)+K.cloud(760,160,60,'#fff',.6)+K.mount(170,hz,460,300,'#7f93c8','#fff')+K.mount(560,hz,560,360,'#8aa0d4','#fff')+K.mount(900,hz,420,260,'#7488c0','#fff');for(let x=-10;x<W+30;x+=r(26,38))b+=K.pine(x,hz+r(-2,8),r(60,100),'#3f6a78','#4f8290',1);
 let f='';f+=`<defs><linearGradient id="chice" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2fbff"/><stop offset="1" stop-color="#b9dcf2"/></linearGradient></defs>`;
 for(const [x,y,w] of [[430,hz+70,64],[580,hz+50,56],[880,hz+90,70]])f+=K.chalet(x,y,w,{body:'#c98a58',roof:'#b24a3a'});
 const cy=hz+270;f+=K.chalet(220,cy,210,{})+K.fence(80,cy+22,290)+K.rink(700,hz+340,340);
 for(const [x,y,s] of [[60,cy-30,150],[360,cy-40,130],[390,cy+60,100],[940,hz+190,140],[520,hz+470,110]])f+=K.pine(x,y,s,'#2d5a48','#3a7058',1);
 f+=`<path d="M340 ${H}C380 ${hz+640} 500 ${hz+520} 560 ${hz+380}" stroke="#dbe6f8" stroke-width="46" fill="none" stroke-linecap="round" opacity=".8"/>`;
 for(let i=0;i<60;i++)f+=`<circle cx="${r(0,W)}" cy="${r(hz,H)}" r="${r(1,2.4)}" fill="#fff" opacity=".9"/>`;
 return{back:b,front:f,avoid:[[700,hz+340,185,82],[220,cy-52,125,55],[430,hz+50,38,30],[580,hz+32,34,26],[880,hz+70,40,32]],extra:[{e:'⛸️',x:650,y:hz+335,s:28},{e:'⛸️',x:735,y:hz+352,s:26},{e:'🏒',x:700,y:hz+318,s:24}]}},
/* 3 – jardin des fleurs */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK;let b='';for(const [i,c] of ['#ff7a7a','#ffb35a','#ffe56a','#7ad68a','#5ab6ff','#a78aff'].entries())b+=`<path d="M${540-i*14} ${hz+10}A${220-i*14} ${220-i*14} 0 0 1 ${980+i*0-i*14} ${hz+10}" transform="translate(0 0)" fill="none" stroke="${c}" stroke-width="14" opacity=".55"/>`;b+=K.cloud(220,110,70)+K.cloud(520,60,50)+K.cloud(840,200,58);
 let f=`<g transform="translate(120 ${hz+14})"><rect x="-4" y="-120" width="8" height="120" fill="#8a6a4a"/><g stroke="#f5efe0" stroke-width="12" stroke-linecap="round"><path d="M0 -120L-70 -170M0 -120L70 -70M0 -120L-60 -60M0 -120L70 -170"/></g></g>`;
 f+=`<path d="M470 ${H}C380 ${hz+560} 700 ${hz+400} 520 ${hz+250}S660 ${hz+120} 600 ${hz+80}" stroke="#e8d3a0" stroke-width="58" fill="none" stroke-linecap="round" opacity=".75"/><ellipse cx="780" cy="${hz+390}" rx="170" ry="52" fill="#4fa8d8"/><ellipse cx="760" cy="${hz+386}" rx="120" ry="30" fill="#7fcdee" opacity=".6"/><ellipse cx="710" cy="${hz+392}" rx="20" ry="8" fill="#3f9a4a"/><ellipse cx="830" cy="${hz+380}" rx="16" ry="6" fill="#3f9a4a"/><circle cx="830" cy="${hz+377}" r="4" fill="#ff8ad0"/>`;
 f+=K.chalet(300,hz+130,170,{body:'#f7e6c6',roof:'#b2553a',snow:false,lit:'#bfe6ff'})+K.fence(130,hz+156,340);
 for(const [x,y,s] of [[60,hz+250,190],[930,hz+210,200],[560,hz+90,110],[40,hz+560,230],[960,hz+640,240]])f+=K.rtree(x,y,s);
 f+=K.flowers(R,150,10,hz+170,990,H-10,['#ff6a8a','#ffd34a','#ff9a3a','#fff','#c58aff','#ff8ad0','#6ab6ff']);
 return{back:b,front:f,avoid:[[780,hz+390,170,52],[300,hz+90,100,70]],extra:[]}},
/* 4 – ciel étoilé */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK;let b=`<defs><radialGradient id="chn1"><stop offset="0" stop-color="#9a4aff" stop-opacity=".45"/><stop offset="1" stop-color="#9a4aff" stop-opacity="0"/></radialGradient><radialGradient id="chn2"><stop offset="0" stop-color="#2aa8ff" stop-opacity=".4"/><stop offset="1" stop-color="#2aa8ff" stop-opacity="0"/></radialGradient></defs><ellipse cx="300" cy="${hz+330}" rx="420" ry="220" fill="url(#chn1)"/><ellipse cx="760" cy="${hz+760}" rx="420" ry="260" fill="url(#chn2)"/><ellipse cx="500" cy="${hz+520}" rx="520" ry="70" fill="#fff" opacity=".07" transform="rotate(-24 500 ${hz+520})"/>`+K.stars(R,170,0,0,W,H)+K.planet(150,hz+250,76,'#e08a4a','#f1d19a')+K.planet(820,hz+110,48,'#6a9ae8')+K.planet(700,hz+900,64,'#7ac28a','#d6f1c4')+K.planet(180,hz+1020,34,'#e86a8a');
 let f='';for(let i=0;i<9;i++){const x=r(40,960),y=r(hz+20,H-30),rx=r(30,80);f+=`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx*.32}" fill="#000" opacity=".16"/><ellipse cx="${x}" cy="${y-2}" rx="${rx}" ry="${rx*.3}" fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="3"/>`}
 f+=`<g transform="translate(860 ${hz+80})"><path d="M-40 0A40 40 0 0 1 40 0Z" fill="#d8dcf5"/><path d="M-40 0h80" stroke="#8a8ab8" stroke-width="5"/><path d="M0 -40v-26" stroke="#d8dcf5" stroke-width="3"/><circle cx="0" cy="-68" r="5" fill="#ff6a8a"/></g>`;
 return{back:b,front:f,avoid:[],extra:[]}},
/* 5 – fête foraine */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK;let b=K.cloud(180,100,60,'#fff',.55)+K.cloud(760,60,50,'#fff',.5)+K.wheel(690,hz-90,150)+K.tent(250,hz+14,230,170,'#e84a7a','#fff');
 let f=`<path d="M40 ${H}C140 ${hz+700} 300 ${hz+420} 520 ${hz+300}S860 ${hz+160} 1000 ${hz+150}" stroke="#f6dcb0" stroke-width="120" fill="none" opacity=".7"/>`;
 f+=K.tent(130,hz+280,200,150,'#4ac2ff','#fff')+K.tent(880,hz+330,220,160,'#ffc23a','#e84a7a')+K.tent(760,hz+150,150,110,'#7ad65a','#fff');
 for(const [y0,sag] of [[hz+110,40],[hz+500,60]]){let p=`M0 ${y0}`;for(let x=0;x<=W;x+=250)p+=`Q${x+125} ${y0+sag} ${x+250} ${y0}`;f+=`<path d="${p}" stroke="#555" stroke-width="2" fill="none"/>`;for(let x=20;x<W;x+=48){const t=(x%250)/250,y=y0+sag*2*t*(1-t);f+=`<circle cx="${x}" cy="${y+5}" r="6" fill="${['#ffd34a','#ff5a7a','#4ac2ff','#7ad65a'][(x/48|0)%4]}"/><circle cx="${x}" cy="${y+5}" r="14" fill="#ffe08a" opacity=".22"/>`}}
 for(const [x,y,c] of [[60,hz+420,'#ff5a7a'],[200,hz+620,'#4ac2ff'],[820,hz+540,'#ffd34a'],[950,hz+760,'#7ad65a'],[480,hz+700,'#c58aff']])f+=`<path d="M${x} ${y}V${y-70}" stroke="#777"/><ellipse cx="${x}" cy="${y-98}" rx="24" ry="30" fill="${c}"/><ellipse cx="${x-7}" cy="${y-108}" rx="6" ry="9" fill="#fff" opacity=".4"/>`;
 return{back:b,front:f,avoid:[[130,hz+240,110,60],[880,hz+290,115,65],[760,hz+120,80,45]],extra:[]}},
/* 6 – désert */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK;let b=`<circle cx="720" cy="${hz*.55}" r="130" fill="#fff3c0" opacity=".35"/><circle cx="720" cy="${hz*.55}" r="64" fill="#fff8d6"/>`+K.cloud(200,110,60,'#fff',.5)+K.mount(200,hz,300,80,'#d99a58')+K.mount(900,hz,340,100,'#cf8f50');
 for(const [x,s] of [[420,200],[560,150],[300,110]])b+=`<path d="M${x-s} ${hz+8}L${x} ${hz-s*.8}L${x+s} ${hz+8}Z" fill="#e8b668"/><path d="M${x} ${hz-s*.8}L${x+s} ${hz+8}L${x+s*.2} ${hz+8}Z" fill="#c68c48"/>`;
 let f='';for(const [x,y,w,h] of [[200,hz+120,520,90],[800,hz+210,560,110],[300,hz+420,640,130],[760,hz+640,700,150],[260,hz+860,720,160]])f+=`<path d="M${x-w/2} ${y+h}Q${x-w*.1} ${y-h} ${x+w/2} ${y+h}Z" fill="#d9a65a" opacity=".55"/><path d="M${x-w/2} ${y+h}Q${x-w*.1} ${y-h*.9} ${x+w*.02} ${y+h*.1}Q${x+w*.06} ${y+h*.5} ${x+w*.12} ${y+h}Z" fill="#fff0c8" opacity=".25"/>`;
 f+=`<ellipse cx="740" cy="${hz+360}" rx="150" ry="44" fill="#d7b66a"/><ellipse cx="740" cy="${hz+360}" rx="118" ry="32" fill="#46b8d4"/>`+K.palm(660,hz+350,160)+K.palm(830,hz+345,190)+K.palm(780,hz+330,130);
 f+=K.tent(230,hz+270,190,120,'#b8472e','#f1d6a0');
 for(let i=0;i<14;i++){const x=r(20,980),y=r(hz+30,H-10);f+=`<path d="M${x} ${y}h${r(30,70)}" stroke="#b8803a" stroke-opacity=".3" stroke-width="2" stroke-linecap="round"/>`}
 return{back:b,front:f,avoid:[[740,hz+360,150,44],[230,hz+215,100,60]],extra:[]}},
/* 7 – profondeurs */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK;let b='';for(let i=0;i<6;i++){const x=r(40,960);b+=`<path d="M${x-30} 0L${x+30} 0L${x+r(80,170)} ${H*.8}L${x-r(80,170)} ${H*.8}Z" fill="#fff" opacity=".055"/>`}
 let f=`<path d="M0 ${H*.86}Q250 ${H*.8} 500 ${H*.86}T1000 ${H*.84}V${H}H0Z" fill="#d8c48a" opacity=".55"/><path d="M0 ${H*.93}Q300 ${H*.88} 600 ${H*.94}T1000 ${H*.92}V${H}H0Z" fill="#e8d69c" opacity=".7"/>`;
 f+=`<g transform="translate(270 ${H*.7}) rotate(-12)"><path d="M-150 0L150 0L110 60H-110Z" fill="#4a3a30"/><path d="M-20 0V-170M60 0V-130" stroke="#3a2c24" stroke-width="9"/><path d="M-20 -150L50 -110L-20 -60Z" fill="#8a7a68" opacity=".7"/><circle cx="-60" cy="22" r="8" fill="#a6e8f0" opacity=".6"/><circle cx="0" cy="22" r="8" fill="#a6e8f0" opacity=".6"/><circle cx="60" cy="22" r="8" fill="#a6e8f0" opacity=".6"/></g>`;
 for(let i=0;i<12;i++){const x=r(10,990),y=H*r(.62,.94);let p=`M${x} ${y}`;const h=r(90,190);for(let k=1;k<=4;k++)p+=`Q${x+(k%2?16:-16)} ${y-h*k/4+h/8} ${x} ${y-h*k/4}`;f+=`<path d="${p}" stroke="#2f9a5a" stroke-width="9" fill="none" stroke-linecap="round" opacity=".85"/>`}
 for(let i=0;i<9;i++){const x=r(20,980),y=H*r(.7,.96),c=['#ff7a9a','#ffa04a','#ff5a6a','#c58aff'][i%4];f+=`<path d="M${x} ${y}v-40M${x} ${y-24}l-22 -26M${x} ${y-34}l22 -28M${x} ${y-40}v-34" stroke="${c}" stroke-width="9" stroke-linecap="round" fill="none"/>`}
 for(let i=0;i<30;i++)f+=`<circle cx="${r(10,990)}" cy="${r(hz,H)}" r="${r(2,8)}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.6"/>`;
 return{back:b,front:f,avoid:[],extra:[]}},
/* 8 – château */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK;let b=K.cloud(180,100,66,'#fff',.5)+K.cloud(820,150,56,'#fff',.5)+K.mount(130,hz,420,240,'#8d93d8','#fff')+K.mount(900,hz,480,280,'#8288cf','#fff')+K.castle(500,hz+10,420);
 let f=`<ellipse cx="500" cy="${hz+110}" rx="360" ry="38" fill="#5a9ae0"/><ellipse cx="500" cy="${hz+110}" rx="320" ry="28" fill="#7ab8f0" opacity=".6"/><rect x="456" y="${hz+80}" width="88" height="62" fill="#9a7048"/><path d="M456 ${hz+92}h88M456 ${hz+104}h88M456 ${hz+116}h88M456 ${hz+128}h88" stroke="#6a4a2a" stroke-width="2"/>`;
 f+=`<path d="M430 ${hz+140}L570 ${hz+140}L720 ${H}L280 ${H}Z" fill="#d8c8a0" opacity=".55"/>`;
 f+=K.tent(150,hz+330,180,130,'#d94a6a','#fff')+K.tent(850,hz+380,190,140,'#4a7ad9','#fff')+K.tent(210,hz+560,160,115,'#ffc23a','#d94a6a');
 for(const [x,y,s] of [[70,hz+170,130],[920,hz+190,140],[620,hz+260,100],[380,hz+250,100],[60,hz+720,220],[960,hz+700,230]])f+=K.rtree(x,y,s,'#5a6ab8','#7a86d0');
 for(let i=0;i<5;i++){const x=r(100,900),y=r(hz+420,H-40);f+=`<path d="M${x} ${y}v-80" stroke="#6a5a48" stroke-width="3"/><path d="M${x} ${y-80}l40 12-40 14z" fill="${['#e0496e','#4a7ad9','#ffc23a'][i%3]}"/>`}
 return{back:b,front:f,avoid:[[500,hz+110,360,38],[430,hz+300,200,150]],extra:[]}},
/* 9 – jungle */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK;let b=K.cloud(260,90,70,'#fff',.35)+K.mount(250,hz,500,260,'#4aa66a')+K.mount(760,hz,560,300,'#3f9a5e')+`<path d="M640 ${hz-230}V${hz}" stroke="#e8fbff" stroke-width="16" opacity=".85"/><path d="M630 ${hz-200}V${hz}M652 ${hz-210}V${hz}" stroke="#fff" stroke-width="3" opacity=".7"/><ellipse cx="641" cy="${hz+4}" rx="46" ry="12" fill="#fff" opacity=".5"/>`;
 let f=`<path d="M-20 ${hz+210}C240 ${hz+130} 300 ${hz+330} 520 ${hz+300}S760 ${hz+470} 1020 ${hz+420}" stroke="#6a4a2a" stroke-width="96" fill="none" opacity=".35"/><path d="M-20 ${hz+210}C240 ${hz+130} 300 ${hz+330} 520 ${hz+300}S760 ${hz+470} 1020 ${hz+420}" stroke="#3ab0c8" stroke-width="80" fill="none"/><path d="M-20 ${hz+210}C240 ${hz+130} 300 ${hz+330} 520 ${hz+300}S760 ${hz+470} 1020 ${hz+420}" stroke="#9de4ee" stroke-width="10" fill="none" stroke-dasharray="26 40" opacity=".7"/>`;
 for(const [x,y] of [[40,hz+560],[960,hz+640],[20,hz+80],[980,hz+120]]){f+=`<path d="M${x} ${y+60}V${y-330}" stroke="#5a3a22" stroke-width="40" stroke-linecap="round"/>`;for(let k=0;k<5;k++){const a=-90+(k-2)*38,L=r(110,160),ex=x+Math.cos(a*Math.PI/180)*L,ey=y-330+Math.sin(a*Math.PI/180)*L*.7;f+=`<ellipse cx="${(x+ex)/2}" cy="${(y-330+ey)/2}" rx="${L/2}" ry="26" fill="${k%2?'#2f9a4a':'#3fb25a'}" transform="rotate(${a+90} ${(x+ex)/2} ${(y-330+ey)/2})" opacity=".95"/>`}}
 for(let i=0;i<16;i++){const x=r(0,W),y=r(hz+30,H),a=r(-60,60);f+=`<ellipse cx="${x}" cy="${y}" rx="${r(40,80)}" ry="16" fill="#2c8a48" opacity=".6" transform="rotate(${a} ${x} ${y})"/>`}
 f+=K.flowers(R,50,10,hz+300,990,H-10,['#ff5a7a','#ffd34a','#ff9a3a','#fff']);
 return{back:b,front:f,avoid:[[160,hz+215,160,50],[520,hz+300,150,50],[800,hz+445,150,55]],extra:[]}},
/* 10 – ville la nuit */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK;let b=`<circle cx="760" cy="110" r="150" fill="#cfd6ff" opacity=".1"/><circle cx="760" cy="110" r="52" fill="#f1f3ff"/>`+K.stars(R,60,0,10,W,hz*.6);let x=-10;while(x<W){const w=r(54,90);b+=K.bld(R,x,hz+4,w,r(160,330),'#2b3070','#ffd66b');x+=w+r(0,6)}
 let f='';x=-20;while(x<W){const w=r(70,120);f+=K.bld(R,x,hz+150,w,r(110,230),'#3a3f86','#ffe08a');f+=`<rect x="${x+w*.35}" y="${hz+112}" width="${w*.3}" height="38" fill="#2a2f66"/><path d="M${x+w*.3} ${hz+150}h${w*.4}v-28h-${w*.4}z" fill="${['#e84a6a','#4ac2ff','#ffc23a','#7ad65a'][(x/80|0)%4]}" opacity=".85"/>`;x+=w+r(2,10)}
 const ry=hz+270;f+=`<rect y="${ry-30}" width="${W}" height="120" fill="#3a3f5a"/><rect y="${ry-34}" width="${W}" height="10" fill="#6a70a0"/><path d="M0 ${ry+30}H${W}" stroke="#ffe08a" stroke-width="4" stroke-dasharray="40 30" opacity=".85"/><rect y="${ry+90}" width="${W}" height="10" fill="#6a70a0"/>`;
 for(let cx=120;cx<W;cx+=320)for(let k=0;k<6;k++)f+=`<rect x="${cx+k*14}" y="${ry-28}" width="8" height="116" fill="#fff" opacity=".35"/>`;
 for(const [lx,ly] of [[60,ry-34],[360,ry-34],[660,ry-34],[950,ry-34],[200,ry+100],[520,ry+100],[820,ry+100]])f+=K.lamp(lx,ly,r(86,120));
 f+=`<rect y="${ry+100}" width="${W}" height="${H-ry-100}" fill="#2f3465"/>`;for(let i=0;i<18;i++)f+=`<rect x="${r(0,W-90)}" y="${r(ry+120,H-30)}" width="${r(40,90)}" height="3" fill="#6a70a0" opacity=".5"/>`;
 return{back:b,front:f,avoid:[],extra:[]}},
/* 11 – maison des étoiles */
(R,W,H,hz)=>{const r=(a,b)=>a+R()*(b-a),K=CHK;let b=`<circle cx="780" cy="130" r="180" fill="#fff0c8" opacity=".12"/><circle cx="780" cy="130" r="64" fill="#fff6d6"/><circle cx="760" cy="116" r="10" fill="#e8dcb0" opacity=".7"/><circle cx="800" cy="148" r="7" fill="#e8dcb0" opacity=".7"/>`+K.stars(R,80,0,10,W,hz*.9)+K.mount(220,hz,620,120,'#4a3a8a')+K.mount(800,hz,560,150,'#51429a');
 const hy=hz+180;let f=`<path d="M470 ${H}C420 ${hz+560} 600 ${hz+420} 520 ${hz+290}" stroke="#e8d8a8" stroke-opacity=".55" stroke-width="70" fill="none" stroke-linecap="round"/>`;
 f+=K.chalet(520,hy,260,{body:'#e8d6b0',roof:'#7a3a4a',snow:false,lit:'#ffd36b'})+`<circle cx="395" cy="${hy-60}" r="46" fill="#ffd36b" opacity=".16"/><circle cx="645" cy="${hy-60}" r="46" fill="#ffd36b" opacity=".16"/>`+K.fence(330,hy+34,380,'#f3ead8');
 for(const [x,y,s] of [[90,hz+210,150],[930,hz+240,170],[210,hz+620,230],[820,hz+700,240]])f+=K.pine(x,y,s,'#2c2a6a','#3a3680');
 f+=`<g transform="translate(700 ${hz+330})"><rect x="-2" y="-46" width="4" height="46" fill="#6a5a48"/><rect x="-14" y="-72" width="28" height="26" rx="4" fill="#d94a4a"/><rect x="-8" y="-62" width="16" height="3" fill="#fff"/></g>`;
 f+=K.flowers(R,60,300,hy+50,760,hy+260,['#ffd34a','#ff8ad0','#fff','#c58aff']);
 for(let i=0;i<10;i++){const x=r(40,960),y=r(hz+40,H-30);f+=`<circle cx="${x}" cy="${y}" r="14" fill="#ffe08a" opacity=".2"/><circle cx="${x}" cy="${y}" r="3" fill="#fff3b0"/>`}
 return{back:b,front:f,avoid:[[520,hy-70,150,80]],extra:[]}}
];
function chArt(li,sd,W,H,hz){const f=CHART[li];if(!f)return{back:'',front:'',avoid:[],extra:[]};const R=chRnd((sd^0x5bd1e995)|0),o=f(R,W,H,hz),n=s=>s.replace(/\d+\.\d{2,}/g,m=>(+m).toFixed(1));o.back=n(o.back);o.front=n(o.front);return o}

/* ---------- Cherche et trouve : décors des univers 13 à 30 (ferme, banquise… traîneau du Père Noël) ---------- */
Object.assign(CHK,{
 barn:(x,y,w,c='#c23a2e')=>{const h=w*.62;return `<ellipse cx="${x}" cy="${y+4}" rx="${w*.62}" ry="${w*.06}" fill="#000" opacity=".15"/><path d="M${x-w/2} ${y}V${y-h}L${x-w*.3} ${y-h-w*.22}H${x+w*.3}L${x+w/2} ${y-h}V${y}Z" fill="${c}"/><path d="M${x-w*.56} ${y-h+4}L${x-w*.32} ${y-h-w*.25}H${x+w*.32}L${x+w*.56} ${y-h+4}" stroke="#5a2a20" stroke-width="${w*.04}" fill="none"/><rect x="${x-w*.18}" y="${y-h*.62}" width="${w*.36}" height="${h*.62}" fill="#fff"/><rect x="${x-w*.15}" y="${y-h*.58}" width="${w*.3}" height="${h*.58}" fill="${c}"/><path d="M${x-w*.15} ${y-h*.58}L${x+w*.15} ${y}M${x+w*.15} ${y-h*.58}L${x-w*.15} ${y}" stroke="#fff" stroke-width="${w*.03}"/><rect x="${x-w*.08}" y="${y-h-w*.12}" width="${w*.16}" height="${w*.12}" fill="#fff"/><rect x="${x-w*.06}" y="${y-h-w*.1}" width="${w*.12}" height="${w*.08}" fill="#ffe08a"/>`},
 silo:(x,y,w,h)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="#d9dde4"/><path d="M${x-w/2} ${y-h}A${w/2} ${w*.45} 0 0 1 ${x+w/2} ${y-h}Z" fill="#9aa4b4"/>`+[...Array(5)].map((_,i)=>`<path d="M${x-w/2} ${y-h+(i+1)*h/6}h${w}" stroke="#a8b0bc" stroke-width="2"/>`).join(''),
 bale:(x,y,s)=>`<ellipse cx="${x}" cy="${y+2}" rx="${s*.7}" ry="${s*.12}" fill="#000" opacity=".12"/><rect x="${x-s*.6}" y="${y-s*.6}" width="${s*1.2}" height="${s*.6}" rx="${s*.12}" fill="#e8c35a"/><path d="M${x-s*.3} ${y-s*.6}v${s*.6}M${x+s*.3} ${y-s*.6}v${s*.6}" stroke="#b8902e" stroke-width="2"/>`,
 roll:(x,y,s)=>`<circle cx="${x}" cy="${y-s*.45}" r="${s*.45}" fill="#e2bd55"/><circle cx="${x}" cy="${y-s*.45}" r="${s*.3}" fill="none" stroke="#b8902e" stroke-width="2"/><circle cx="${x}" cy="${y-s*.45}" r="${s*.14}" fill="none" stroke="#b8902e" stroke-width="2"/>`,
 acacia:(x,y,s)=>`<path d="M${x} ${y}Q${x-s*.05} ${y-s*.4} ${x+s*.08} ${y-s*.7}M${x+s*.02} ${y-s*.45}Q${x-s*.2} ${y-s*.6} ${x-s*.3} ${y-s*.72}" stroke="#5a3a22" stroke-width="${s*.05}" fill="none" stroke-linecap="round"/><ellipse cx="${x+s*.08}" cy="${y-s*.78}" rx="${s*.5}" ry="${s*.11}" fill="#4f7a2e"/><ellipse cx="${x-s*.28}" cy="${y-s*.76}" rx="${s*.26}" ry="${s*.08}" fill="#5a8a36"/><ellipse cx="${x+s*.2}" cy="${y-s*.84}" rx="${s*.3}" ry="${s*.07}" fill="#6a9a40"/>`,
 igloo:(x,y,w)=>{let g=`<ellipse cx="${x}" cy="${y+3}" rx="${w*.62}" ry="${w*.08}" fill="#5a7aa0" opacity=".2"/><path d="M${x-w/2} ${y}A${w/2} ${w*.48} 0 0 1 ${x+w/2} ${y}Z" fill="#f4faff" stroke="#b6d0e6" stroke-width="2"/>`;for(let i=1;i<4;i++){const yy=y-i*w*.12,hw=w/2*Math.sqrt(1-(i*.12/.48)**2);g+=`<path d="M${x-hw} ${yy}H${x+hw}" stroke="#b6d0e6" stroke-width="2"/>`}return g+`<path d="M${x+w*.2} ${y}A${w*.16} ${w*.18} 0 0 1 ${x+w*.52} ${y}Z" fill="#e8f2fb" stroke="#b6d0e6" stroke-width="2"/><path d="M${x+w*.28} ${y}A${w*.08} ${w*.1} 0 0 1 ${x+w*.44} ${y}Z" fill="#2a3a5a"/>`},
 berg:(x,y,w,h)=>`<path d="M${x-w/2} ${y}L${x-w*.3} ${y-h*.6}L${x-w*.1} ${y-h}L${x+w*.12} ${y-h*.7}L${x+w*.3} ${y-h*.82}L${x+w/2} ${y}Z" fill="#f2faff"/><path d="M${x-w*.1} ${y-h}L${x+w*.02} ${y}H${x+w/2}L${x+w*.3} ${y-h*.82}L${x+w*.12} ${y-h*.7}Z" fill="#c8e2f4"/>`,
 floe:(x,y,w)=>`<ellipse cx="${x}" cy="${y+5}" rx="${w/2}" ry="${w*.12}" fill="#9cc8e2"/><ellipse cx="${x}" cy="${y}" rx="${w/2}" ry="${w*.12}" fill="#f4fbff"/>`,
 xtree:(x,y,s,R)=>{let g=CHK.pine(x,y,s,'#1f6a42','#2a8452',1);const c=['#ff4a5a','#ffd34a','#4ab6ff','#ff8ad0','#fff'];for(let i=0;i<18;i++){const t=R(),yy=y-s*.15-t*s*.75,hw=s*.24*(1-t*.8);g+=`<circle cx="${x+(R()*2-1)*hw}" cy="${yy}" r="${s*.025}" fill="${c[i%5]}"/>`}return g+`<path d="M${x} ${y-s*1.02}l${s*.03} ${s*.06}h${s*.06}l-${s*.05} ${s*.04}l${s*.02} ${s*.06}l-${s*.06}-${s*.035}l-${s*.06} ${s*.035}l${s*.02}-${s*.06}l-${s*.05}-${s*.04}h${s*.06}z" fill="#ffd34a"/>`},
 gift:(x,y,w,h,c,rb='#ffd34a')=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="${c}"/><rect x="${x-w*.55}" y="${y-h-h*.12}" width="${w*1.1}" height="${h*.16}" fill="${c}" stroke="#000" stroke-opacity=".12"/><path d="M${x} ${y}V${y-h*1.12}M${x-w/2} ${y-h*.5}H${x+w/2}" stroke="${rb}" stroke-width="${w*.1}"/><path d="M${x} ${y-h*1.12}c-${w*.25}-${h*.3}-${w*.35} ${h*.05}-${w*.02} 0c${w*.33} ${h*.05}${w*.23}-${h*.3}${w*.02} 0" fill="none" stroke="${rb}" stroke-width="${w*.07}"/>`,
 cane:(x,y,h)=>`<path d="M${x} ${y}V${y-h}a${h*.12} ${h*.12} 0 0 1 ${h*.24} 0" stroke="#fff" stroke-width="${h*.08}" fill="none" stroke-linecap="round"/><path d="M${x} ${y}V${y-h}a${h*.12} ${h*.12} 0 0 1 ${h*.24} 0" stroke="#e2343e" stroke-width="${h*.08}" fill="none" stroke-dasharray="${h*.06} ${h*.06}" stroke-linecap="butt"/>`,
 ginger:(x,y,w,R)=>{const h=w*.6,c=['#ff4a5a','#4ac27a','#ffd34a','#4ab6ff'];let g=`<ellipse cx="${x}" cy="${y+3}" rx="${w*.6}" ry="${w*.06}" fill="#000" opacity=".15"/><rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="#b8743a"/><path d="M${x-w*.6} ${y-h+2}L${x} ${y-h-w*.45}L${x+w*.6} ${y-h+2}Z" fill="#8a4a24"/><path d="M${x-w*.6} ${y-h+2}L${x} ${y-h-w*.45}L${x+w*.6} ${y-h+2}" stroke="#fff" stroke-width="${w*.06}" fill="none" stroke-linejoin="round"/><path d="M${x-w*.5} ${y-h+w*.04}q${w*.0625} ${w*.08} ${w*.125} 0t${w*.125} 0t${w*.125} 0t${w*.125} 0t${w*.125} 0t${w*.125} 0t${w*.125} 0t${w*.125} 0" stroke="#fff" stroke-width="${w*.03}" fill="none"/>`;g+=`<rect x="${x-w*.1}" y="${y-h*.5}" width="${w*.2}" height="${h*.5}" rx="${w*.1}" fill="#6a3a1a"/>`+CHK.win(x-w*.4,y-h*.75,w*.2,w*.18,'#ffd36b')+CHK.win(x+w*.2,y-h*.75,w*.2,w*.18,'#ffd36b');for(let i=0;i<7;i++)g+=`<circle cx="${x-w*.45+i*w*.15}" cy="${y-h+w*.12}" r="${w*.03}" fill="${c[i%4]}"/>`;return g+`<rect x="${x+w*.2}" y="${y-h-w*.36}" width="${w*.1}" height="${w*.2}" fill="#8a4a24"/><path d="M${x-w*.55} ${y-h*1.02}h0" />`+CHK.smoke(x+w*.25,y-h-w*.4,w*.8)},
 garland:(x0,y0,x1,y1,sag,R)=>{const c=['#ff4a5a','#ffd34a','#4ab6ff','#7ad65a','#ff8ad0'],mx=(x0+x1)/2,my=Math.max(y0,y1)+sag;let g=`<path d="M${x0} ${y0}Q${mx} ${my+sag} ${x1} ${y1}" stroke="#2a4a3a" stroke-width="1.6" fill="none"/>`;for(let i=1;i<12;i++){const t=i/12,x=(1-t)**2*x0+2*(1-t)*t*mx+t*t*x1,y=(1-t)**2*y0+2*(1-t)*t*(my+sag)+t*t*y1;g+=`<circle cx="${x}" cy="${y+3}" r="4" fill="${c[i%5]}"/><circle cx="${x}" cy="${y+3}" r="9" fill="${c[i%5]}" opacity=".25"/>`}return g},
 sleigh:(x,y,w)=>{const h=w*.42;return `<ellipse cx="${x}" cy="${y+6}" rx="${w*.62}" ry="${w*.05}" fill="#000" opacity=".18"/><path d="M${x-w*.55} ${y}H${x+w*.45}q${w*.12} 0 ${w*.12}-${w*.1}" stroke="#d9a63a" stroke-width="${w*.03}" fill="none" stroke-linecap="round"/><path d="M${x-w*.4} ${y}v-${h*.25}M${x+w*.3} ${y}v-${h*.25}" stroke="#d9a63a" stroke-width="${w*.025}"/><path d="M${x-w*.5} ${y-h*.25}H${x+w*.38}Q${x+w*.5} ${y-h*.25} ${x+w*.48} ${y-h*.55}L${x+w*.42} ${y-h*.7}Q${x+w*.2} ${y-h*.58} ${x-w*.1} ${y-h*.62}L${x-w*.4} ${y-h}Q${x-w*.6} ${y-h*1.05} ${x-w*.58} ${y-h*.8}Z" fill="#c8202e"/><path d="M${x-w*.5} ${y-h*.3}H${x+w*.38}" stroke="#ffd34a" stroke-width="${w*.02}"/><path d="M${x-w*.42} ${y-h*.95}Q${x-w*.5} ${y-h*.6} ${x-w*.3} ${y-h*.45}" stroke="#ffd34a" stroke-width="${w*.015}" fill="none"/>`},
 deer:(x,y,s,c='#7a4a2a')=>`<ellipse cx="${x}" cy="${y-s*.5}" rx="${s*.36}" ry="${s*.16}" fill="${c}"/><path d="M${x-s*.26} ${y-s*.4}v${s*.4}M${x-s*.14} ${y-s*.4}v${s*.4}M${x+s*.16} ${y-s*.4}v${s*.4}M${x+s*.28} ${y-s*.4}v${s*.4}" stroke="${c}" stroke-width="${s*.06}"/><path d="M${x+s*.28} ${y-s*.56}L${x+s*.42} ${y-s*.86}" stroke="${c}" stroke-width="${s*.12}" stroke-linecap="round"/><ellipse cx="${x+s*.5} " cy="${y-s*.88}" rx="${s*.12}" ry="${s*.07}" fill="${c}"/><path d="M${x+s*.4} ${y-s*.94}l-${s*.06}-${s*.2}m${s*.03} ${s*.1}l-${s*.1}-${s*.04}M${x+s*.46} ${y-s*.94}l${s*.04}-${s*.2}m-${s*.02} ${s*.1}l${s*.1}-${s*.05}" stroke="#4a2a14" stroke-width="${s*.03}" fill="none"/>`,
 gear:(x,y,r,c)=>{let p='';for(let i=0;i<10;i++){const a=i*Math.PI/5;p+=`<rect x="${x-r*.13}" y="${y-r*1.18}" width="${r*.26}" height="${r*.3}" fill="${c}" transform="rotate(${i*36} ${x} ${y})"/>`}return p+`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x}" cy="${y}" r="${r*.35}" fill="#000" opacity=".25"/>`},
 belt:(x0,x1,y,R)=>{const c=['#ff4a5a','#4ab6ff','#ffd34a','#7ad65a','#c58aff'];let g=`<rect x="${x0}" y="${y-10}" width="${x1-x0}" height="16" rx="8" fill="#4a4a5a"/>`;for(let x=x0+10;x<x1;x+=22)g+=`<circle cx="${x}" cy="${y-2}" r="5" fill="#8a8a9a"/>`;for(let x=x0+16;x<x1-20;x+=60+R()*30){const w=22+R()*14;g+=CHK.gift(x+w/2,y-10,w,w*.8,c[Math.floor(R()*5)],'#fff')}return g+`<path d="M${x0+20} ${y+6}v40M${x1-20} ${y+6}v40" stroke="#5a5a6a" stroke-width="6"/>`},
 lhouse:(x,y,h)=>`<path d="M${x-h*.1} ${y}L${x-h*.06} ${y-h}H${x+h*.06}L${x+h*.1} ${y}Z" fill="#fff"/><path d="M${x-h*.093} ${y-h*.2}H${x+h*.093}L${x+h*.087} ${y-h*.36}H${x-h*.087}ZM${x-h*.08} ${y-h*.52}H${x+h*.08}L${x+h*.074} ${y-h*.68}H${x-h*.074}Z" fill="#d94a4a"/><rect x="${x-h*.08}" y="${y-h*1.1}" width="${h*.16}" height="${h*.1}" fill="#ffe08a"/><path d="M${x-h*.1} ${y-h*1.1}L${x} ${y-h*1.2}L${x+h*.1} ${y-h*1.1}Z" fill="#d94a4a"/><path d="M${x} ${y-h*1.05}L${x-h*.6} ${y-h*1.15}V${y-h*.95}ZM${x} ${y-h*1.05}L${x+h*.6} ${y-h*1.15}V${y-h*.95}Z" fill="#fff6a0" opacity=".25"/>`,
 boat:(x,y,s,c)=>`<path d="M${x-s*.5} ${y-s*.2}H${x+s*.5}L${x+s*.36} ${y}H${x-s*.38}Z" fill="${c}"/><path d="M${x} ${y-s*.2}V${y-s*.9}" stroke="#6a4a2a" stroke-width="${s*.03}"/><path d="M${x+s*.03} ${y-s*.88}L${x+s*.4} ${y-s*.26}H${x+s*.03}Z" fill="#fff"/><path d="M${x-s*.03} ${y-s*.78}L${x-s*.32} ${y-s*.26}H${x-s*.03}Z" fill="#f3ead6"/>`,
 coral:(x,y,s,c)=>{let g='';const br=(x0,y0,a,l,d)=>{if(d>3)return;const x1=x0+Math.sin(a)*l,y1=y0-Math.cos(a)*l;g+=`<path d="M${x0} ${y0}L${x1} ${y1}" stroke="${c}" stroke-width="${s*.09*(1-d*.2)}" stroke-linecap="round"/>`;br(x1,y1,a-.45,l*.72,d+1);br(x1,y1,a+.45,l*.72,d+1)};br(x,y,0,s*.36,0);return g},
 weed:(x,y,h,c='#2f9a6a')=>`<path d="M${x} ${y}q-${h*.12} -${h*.25} 0 -${h*.5}t0 -${h*.5}" stroke="${c}" stroke-width="${h*.06}" fill="none" stroke-linecap="round"/><path d="M${x+h*.08} ${y}q${h*.12} -${h*.2} 0 -${h*.4}t0 -${h*.36}" stroke="${c}" stroke-width="${h*.05}" fill="none" stroke-linecap="round" opacity=".8"/>`,
 cypress:(x,y,s)=>`<ellipse cx="${x}" cy="${y-s*.5}" rx="${s*.12}" ry="${s*.5}" fill="#2a5a3a"/><ellipse cx="${x-s*.03}" cy="${y-s*.55}" rx="${s*.06}" ry="${s*.4}" fill="#3a7048"/>`,
 sign:(x,y,txt,c='#8a5a3a')=>`<rect x="${x-3}" y="${y-90}" width="6" height="90" fill="${c}"/><path d="M${x-6} ${y-86}h78l14 13-14 13h-78z" fill="#c98a4a" stroke="${c}" stroke-width="2"/><text x="${x+34}" y="${y-68}" font-size="15" font-family="sans-serif" font-weight="700" fill="#4a2a14" text-anchor="middle">${txt}</text>`,
 aurora:(R,W,y,c,o)=>{let d=`M-20 ${y}`;for(let x=0;x<=W+40;x+=80)d+=`Q${x+40} ${y+(R()-.5)*120} ${x+80} ${y+(R()-.5)*60}`;return `<path d="${d}" stroke="${c}" stroke-width="${60+R()*40}" fill="none" opacity="${o}" stroke-linecap="round" filter="url(#chblur)"/>`},
 stable:(x,y,w)=>{const h=w*.42;let g=`<ellipse cx="${x}" cy="${y+4}" rx="${w*.56}" ry="${w*.05}" fill="#000" opacity=".15"/><rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="#9a6a3a"/>`;for(let i=1;i<8;i++)g+=`<path d="M${x-w/2+i*w/8} ${y-h}v${h}" stroke="#6a4424" stroke-opacity=".45" stroke-width="2"/>`;g+=`<path d="M${x-w*.56} ${y-h+4}L${x} ${y-h-w*.22}L${x+w*.56} ${y-h+4}Z" fill="#6a3a24"/><path d="M${x-w*.56} ${y-h+2}L${x} ${y-h-w*.22}L${x+w*.56} ${y-h+2}" stroke="#fff" stroke-width="${w*.03}" fill="none"/>`;for(let i=0;i<3;i++){const sx=x-w*.36+i*w*.36;g+=`<rect x="${sx-w*.12}" y="${y-h*.72}" width="${w*.24}" height="${h*.72}" fill="#3a2414"/><path d="M${sx-w*.12} ${y-h*.4}h${w*.24}" stroke="#c98a4a" stroke-width="${w*.025}"/><path d="M${sx-w*.12} ${y-h*.4}l${w*.24} ${h*.4}M${sx+w*.12} ${y-h*.4}l-${w*.24} ${h*.4}" stroke="#c98a4a" stroke-width="${w*.015}"/>`}return g},
 lantern:(x,y,h)=>`<rect x="${x-1.5}" y="${y-h}" width="3" height="${h}" fill="#4a3a2a"/><path d="M${x} ${y-h}h16v6" stroke="#4a3a2a" stroke-width="3" fill="none"/><rect x="${x+10}" y="${y-h+6}" width="12" height="16" rx="3" fill="#ffd36b"/><circle cx="${x+16}" cy="${y-h+14}" r="22" fill="#ffd36b" opacity=".22"/>`
});
{const K=CHK,rn=R=>(a,b)=>a+R()*(b-a),snowf=(R,n,y0,y1,W)=>{let s='';for(let i=0;i<n;i++)s+=`<circle cx="${R()*W}" cy="${y0+R()*(y1-y0)}" r="${1+R()*1.6}" fill="#fff" opacity=".85"/>`;return s},
 path=(d,c,w,o)=>`<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" opacity="${o}"/>`,
 nsky=(R,W,hz)=>`<circle cx="790" cy="120" r="140" fill="#e8ecff" opacity=".1"/><circle cx="790" cy="120" r="48" fill="#f4f6ff"/><circle cx="772" cy="108" r="9" fill="#d8dcf0"/>`+K.stars(R,60,0,10,W,hz*.7);
CHART.push(
/* 12 – ferme du matin */
(R,W,H,hz)=>{const r=rn(R);let b=`<circle cx="${r(160,360)}" cy="${hz*.45}" r="54" fill="#fff2b0"/><circle cx="${r(160,360)}" cy="${hz*.45}" r="130" fill="#fff2b0" opacity=".25"/>`+K.cloud(700,110,70)+K.cloud(480,200,50);for(let x=-20;x<W+40;x+=r(60,90))b+=K.rtree(x,hz+r(-2,6),r(60,90),'#5a9a46','#6ab456');
 let f='';for(let i=0;i<6;i++){const y=hz+30+i*16;f+=`<path d="M560 ${y}H${W}" stroke="${i%2?'#d9b45a':'#8ab84e'}" stroke-width="12" opacity=".7"/>`}
 f+=K.barn(260,hz+230,230)+K.silo(430,hz+230,60,240)+K.fence(20,hz+270,470)+K.fence(560,hz+150,440);
 f+=path(`M520 ${H}C460 ${hz+600} 640 ${hz+420} 560 ${hz+250}`,'#d8b880',56,.75)+`<ellipse cx="800" cy="${hz+430}" rx="150" ry="46" fill="#5ab0d8"/><ellipse cx="780" cy="${hz+426}" rx="100" ry="26" fill="#8fd2ee" opacity=".6"/>`;
 for(const [x,y] of [[640,hz+220],[700,hz+240],[900,hz+260],[120,hz+520],[880,hz+640],[300,hz+760]])f+=K.roll(x,y,r(40,56));
 for(const [x,y] of [[80,hz+380],[420,hz+430]])f+=K.bale(x,y,40);
 for(const [x,y,s] of [[60,hz+230,150],[940,hz+380,180],[40,hz+700,220],[960,hz+820,230]])f+=K.rtree(x,y,s);
 f+=K.flowers(R,50,10,hz+300,990,H-10,['#fff','#ffd34a','#ff8a5a']);
 return{back:b,front:f,avoid:[[260,hz+130,135,110],[430,hz+110,35,125],[800,hz+430,150,46]],extra:[]}},
/* 13 – banquise */
(R,W,H,hz)=>{const r=rn(R);let b=K.cloud(220,90,70)+K.cloud(760,170,60)+`<circle cx="840" cy="${hz*.35}" r="40" fill="#fffbe0"/>`;b+=`<rect y="${hz-60}" width="${W}" height="70" fill="#3f8ac0"/>`;for(const [x,w,h] of [[120,200,150],[420,140,100],[680,260,190],[930,160,120]])b+=K.berg(x,hz,w,h);
 let f='';for(const [x,y,w] of [[200,hz+120,190],[620,hz+250,240],[300,hz+520,170],[820,hz+640,200],[480,hz+860,220]]){f+=`<ellipse cx="${x}" cy="${y}" rx="${w/2}" ry="${w*.18}" fill="#2f78ac"/><ellipse cx="${x}" cy="${y-4}" rx="${w/2-12}" ry="${w*.18-8}" fill="#4a98cc"/>`;for(let k=0;k<4;k++)f+=K.floe(x+r(-w*.3,w*.3),y+r(-10,6),r(20,36))}
 f+=K.igloo(760,hz+150,170)+K.igloo(160,hz+340,120);
 for(let i=0;i<14;i++){const x=r(20,980),y=r(hz+60,H-20);f+=`<path d="M${x} ${y}l${r(-30,30)} ${r(10,26)}l${r(-30,30)} ${r(8,20)}" stroke="#a8cce6" stroke-width="2" fill="none"/>`}
 f+=K.berg(70,hz+90,120,80)+K.berg(950,hz+460,110,90)+K.berg(60,hz+980,140,110)+snowf(R,40,hz,H,W);
 return{back:b,front:f,avoid:[[200,hz+120,95,34],[620,hz+250,120,43],[300,hz+520,85,30],[820,hz+640,100,36],[480,hz+860,110,40],[760,hz+110,85,50]],extra:[{e:'🐧',x:720,y:hz+160,s:30},{e:'🦭',x:600,y:hz+238,s:30}]}},
/* 14 – savane */
(R,W,H,hz)=>{const r=rn(R);let b=`<circle cx="500" cy="${hz-40}" r="150" fill="#ffd27a" opacity=".35"/><circle cx="500" cy="${hz-40}" r="80" fill="#ffc24a"/>`+K.mount(780,hz,420,200,'#c98a6a','#fff')+K.mount(200,hz,380,110,'#c9946a');for(let i=0;i<5;i++)b+=`<path d="M${r(0,900)} ${r(60,hz*.6)}q10-8 20 0q10-8 20 0" stroke="#4a2a14" stroke-width="2.5" fill="none"/>`;
 let f=`<ellipse cx="640" cy="${hz+330}" rx="200" ry="56" fill="#6aa0b8"/><ellipse cx="620" cy="${hz+324}" rx="140" ry="30" fill="#9ccbd8" opacity=".6"/>`;
 for(const [x,y,s] of [[120,hz+40,180],[420,hz+30,140],[880,hz+60,200],[220,hz+260,260],[900,hz+380,280],[100,hz+680,320],[520,hz+760,300],[920,hz+900,320]])f+=K.acacia(x,y,s);
 for(let i=0;i<90;i++){const x=r(0,W),y=r(hz+20,H);f+=`<path d="M${x} ${y}l-4-14M${x} ${y}l0-17M${x} ${y}l4-14" stroke="#b8902e" stroke-width="2" opacity=".7"/>`}
 for(const [x,y] of [[380,hz+460],[780,hz+560],[260,hz+940]])f+=`<ellipse cx="${x}" cy="${y}" rx="40" ry="22" fill="#a8906a"/><ellipse cx="${x-6}" cy="${y-6}" rx="26" ry="12" fill="#c4ae86"/>`;
 return{back:b,front:f,avoid:[[640,hz+330,200,56]],extra:[{e:'🦒',x:560,y:hz+280,s:38},{e:'🐘',x:740,y:hz+300,s:40}]}},
/* 15 – verger d’automne */
(R,W,H,hz)=>{const r=rn(R);let b=K.cloud(260,110,60,'#fff',.7)+K.cloud(760,70,50,'#fff',.6);for(let x=-20;x<W+40;x+=r(46,70))b+=K.rtree(x,hz+r(-2,6),r(60,90),'#c8742e','#e0943a');
 let f=K.barn(820,hz+200,180,'#a83a2a');const ap=['#e23a2e','#ffb42e','#d94a2a'];
 for(let row=0;row<4;row++)for(let c=0;c<5;c++){const x=80+c*190+(row%2)*90,y=hz+180+row*230,s=170+row*20;if(row==0&&c>3)continue;f+=K.rtree(x,y,s,'#c26a2a','#e08a3a');for(let k=0;k<7;k++)f+=`<circle cx="${x+r(-s*.3,s*.3)}" cy="${y-s*.55+r(-s*.18,s*.18)}" r="${s*.035}" fill="${ap[k%3]}"/>`}
 f+=`<g transform="translate(560 ${hz+330})"><rect x="-50" y="-34" width="100" height="34" fill="#9a6a3a"/><circle cx="-30" cy="4" r="14" fill="#5a3a22"/><circle cx="30" cy="4" r="14" fill="#5a3a22"/><path d="M50 -20l60 -10" stroke="#5a3a22" stroke-width="5"/>`+[...Array(8)].map((_,i)=>`<circle cx="${-40+i*11}" cy="-38" r="8" fill="${ap[i%3]}"/>`).join('')+`</g>`;
 for(let i=0;i<120;i++){const x=r(0,W),y=r(hz+20,H);f+=`<ellipse cx="${x}" cy="${y}" rx="6" ry="3" fill="${['#e07a2a','#c84a1a','#f0b03a'][i%3]}" opacity=".8" transform="rotate(${r(0,180)} ${x} ${y})"/>`}
 return{back:b,front:f,avoid:[[820,hz+120,95,90],[560,hz+310,60,30]],extra:[]}},
/* 16 – port de pêche */
(R,W,H,hz)=>{const r=rn(R);let b=K.cloud(220,100,60)+K.cloud(680,170,70)+`<rect y="${hz-50}" width="${W}" height="60" fill="#3a8ac0"/>`+K.lhouse(900,hz-20,230);for(let x=40;x<760;x+=r(110,160)){const w=r(80,120),h=r(60,110);b+=`<rect x="${x}" y="${hz-h}" width="${w}" height="${h}" fill="${['#e8a07a','#f2d08a','#9ac2d8','#e8e0d0'][Math.floor(r(0,4))]}"/><path d="M${x-6} ${hz-h}L${x+w/2} ${hz-h-30}L${x+w+6} ${hz-h}Z" fill="#b24a3a"/>`}
 let f='';const plank=(x,y,w,h)=>{let g=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#a8784a"/>`;for(let yy=y+14;yy<y+h;yy+=14)g+=`<path d="M${x} ${yy}h${w}" stroke="#7a5230" stroke-width="2"/>`;for(let xx=x+10;xx<x+w;xx+=60)g+=`<rect x="${xx}" y="${y+h}" width="10" height="40" fill="#6a4424"/>`;return g};
 f+=plank(0,hz+40,W,90)+plank(160,hz+130,90,520)+plank(640,hz+130,90,700);
 for(const [x,y,s,c] of [[80,hz+300,170,'#d94a4a'],[420,hz+260,200,'#3a7ab8'],[880,hz+330,180,'#f2b03a'],[380,hz+620,190,'#3aa86a'],[880,hz+760,200,'#c85a8a'],[100,hz+860,180,'#e8784a'],[460,hz+1000,170,'#5a6ad8']])f+=K.boat(x,y,s,c);
 for(let i=0;i<40;i++){const x=r(0,W),y=r(hz+140,H);f+=`<path d="M${x} ${y}h${r(14,30)}" stroke="#fff" stroke-opacity=".4" stroke-width="2.5" stroke-linecap="round"/>`}
 for(const [x,y] of [[60,hz+70],[300,hz+60],[520,hz+80],[800,hz+64]])f+=`<rect x="${x}" y="${y-30}" width="40" height="30" fill="#c8945a" stroke="#6a4424" stroke-width="2"/><path d="M${x} ${y-30}l40 30M${x+40} ${y-30}l-40 30" stroke="#6a4424" stroke-width="1.5"/>`;
 return{back:b,front:f,avoid:[[500,hz+85,500,40]],extra:[]}},
/* 17 – planète lointaine */
(R,W,H,hz)=>{const r=rn(R);let b=K.stars(R,90,0,0,W,hz)+K.planet(780,hz*.45,70,'#e88a5a','#f2c08a')+K.planet(200,hz*.3,34,'#5ac2c8')+K.planet(520,hz*.7,18,'#c58aff');
 let f='';for(const [x,y,w] of [[200,hz+200,170],[700,hz+350,220],[330,hz+640,160],[820,hz+820,190],[160,hz+1000,150],[560,hz+1040,130]])f+=`<ellipse cx="${x}" cy="${y}" rx="${w/2}" ry="${w*.2}" fill="#2a1a62"/><ellipse cx="${x+4}" cy="${y+4}" rx="${w/2-10}" ry="${w*.2-6}" fill="#3a2780"/><path d="M${x-w/2} ${y}A${w/2} ${w*.2} 0 0 1 ${x+w/2} ${y}" stroke="#7a5ad0" stroke-width="4" fill="none"/>`;
 f+=`<g transform="translate(520 ${hz+190})"><ellipse cx="0" cy="6" rx="130" ry="18" fill="#000" opacity=".2"/><path d="M-110 0A110 90 0 0 1 110 0Z" fill="#9ae0ff" opacity=".35" stroke="#cfefff" stroke-width="3"/><rect x="-40" y="-40" width="80" height="40" fill="#d8dcf0"/><rect x="-14" y="-26" width="28" height="26" fill="#5a4ab8"/><circle cx="-26" cy="-26" r="7" fill="#ffe08a"/><circle cx="26" cy="-26" r="7" fill="#ffe08a"/></g>`;
 f+=`<g transform="translate(880 ${hz+260})"><path d="M-22 0V-120Q0 -170 22 -120V0Z" fill="#f2f2fa"/><circle cx="0" cy="-90" r="12" fill="#5ab6ff" stroke="#8a8aa0" stroke-width="3"/><path d="M-22 0L-44 22V-30L-22 -50ZM22 0L44 22V-30L22 -50Z" fill="#e24a5a"/><path d="M-12 0L0 30L12 0Z" fill="#ffb03a"/></g>`;
 for(let i=0;i<40;i++)f+=`<circle cx="${r(0,W)}" cy="${r(hz+20,H)}" r="${r(3,8)}" fill="#7a5ad0" opacity=".5"/>`;
 return{back:b,front:f,avoid:[[520,hz+150,110,60],[880,hz+190,45,90]],extra:[]}},
/* 18 – récif de corail */
(R,W,H,hz)=>{const r=rn(R);let b='';for(let i=0;i<7;i++){const x=r(0,W);b+=`<path d="M${x} 0L${x+60} 0L${x+260} ${hz+400}L${x+140} ${hz+400}Z" fill="#fff" opacity=".07"/>`}
 let f=`<path d="M0 ${H-260}Q250 ${H-330} 500 ${H-280}T${W} ${H-300}V${H}H0Z" fill="#e8d8a0" opacity=".85"/><g transform="translate(700 ${H-330})" opacity=".85"><path d="M-160 0L-130 -70H120L160 0Z" fill="#5a4a3a"/><path d="M-30 -70V-190M40 -70V-160" stroke="#4a3a2a" stroke-width="10"/><path d="M-30 -180L30 -150L-30 -130Z" fill="#8a7a6a"/><circle cx="-80" cy="-36" r="10" fill="#2a1a10"/><circle cx="-30" cy="-36" r="10" fill="#2a1a10"/><circle cx="20" cy="-36" r="10" fill="#2a1a10"/></g>`;
 const cc=['#ff6a8a','#ff9a4a','#c58aff','#ffd34a','#ff5a5a'];
 for(let i=0;i<22;i++){const x=r(10,990),y=r(hz+200,H-30);f+=(i%2?K.coral(x,y,r(90,170),cc[i%5]):K.weed(x,y,r(90,170)))}
 for(const [x,y] of [[160,hz+420],[840,hz+560],[420,hz+820],[120,hz+980]])f+=`<ellipse cx="${x}" cy="${y}" rx="60" ry="30" fill="#7a6a8a"/><ellipse cx="${x-10}" cy="${y-8}" rx="40" ry="16" fill="#9a8aaa"/>`;
 for(let i=0;i<50;i++){const x=r(0,W),y=r(0,H);f+=`<circle cx="${x}" cy="${y}" r="${r(2,7)}" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>`}
 return{back:b,front:f,avoid:[[700,H-380,160,80]],extra:[]}},
/* 19 – champ de lavande */
(R,W,H,hz)=>{const r=rn(R);let b=`<circle cx="${r(650,850)}" cy="${hz*.5}" r="52" fill="#fff4c0"/>`+K.cloud(220,110,60,'#fff',.7)+K.mount(500,hz,900,90,'#9a86c8');
 let f=K.chalet(780,hz+90,170,{body:'#f2dcb4',roof:'#d4763a',snow:false,lit:'#bfe6ff'});for(const [x,y,s] of [[640,hz+100,170],[930,hz+110,190],[120,hz+70,130],[200,hz+80,150]])f+=K.cypress(x,y,s);
 for(let i=-8;i<=16;i++){const x0=500+i*14,x1=500+(i-4)*150;f+=`<path d="M${x0} ${hz+30}L${x1} ${H}" stroke="#7a52c0" stroke-width="${30}" opacity=".55"/><path d="M${x0} ${hz+30}L${x1} ${H}" stroke="#b08ae8" stroke-width="10" stroke-dasharray="6 10" opacity=".7"/>`}
 f+=`<g transform="translate(380 ${hz+260})"><rect x="-4" y="-80" width="8" height="80" fill="#6a4a2a"/><circle cx="0" cy="-90" r="40" fill="#5a8a3a"/></g>`;
 return{back:b,front:f,avoid:[[780,hz+40,95,70]],extra:[]}},
/* 20 – départ vers le Nord */
(R,W,H,hz)=>{const r=rn(R);let b=nsky(R,W,hz)+K.mount(250,hz,560,260,'#5a6aa8','#eef4ff')+K.mount(760,hz,600,320,'#6676b4','#eef4ff');for(let x=-10;x<W+30;x+=r(24,36))b+=K.pine(x,hz+r(-2,6),r(56,90),'#2a4a5a','#36606e',1);
 let f='';for(const [x,y,w] of [[160,hz+150,150],[420,hz+110,110],[760,hz+160,170],[900,hz+420,130],[120,hz+520,140]])f+=K.chalet(x,y,w,{body:'#a8703f',roof:'#7a2a2a'});
 f+=path(`M480 ${H}C420 ${hz+700} 640 ${hz+500} 560 ${hz+300}S600 ${hz+120} 520 ${hz+20}`,'#dbe6f8',60,.8)+K.sign(620,hz+330,'Nord ↑');
 for(const [x,y] of [[400,hz+420],[700,hz+560],[380,hz+800],[720,hz+980]])f+=K.lamp(x,y,100);
 for(const [x,y,s] of [[300,hz+240,120],[980,hz+260,150],[40,hz+330,150],[260,hz+700,180],[880,hz+780,200],[60,hz+940,210]])f+=K.pine(x,y,s,'#24504a','#2f6a5c',1);
 f+=K.garland(80,hz+100,240,hz+110,10,R)+K.garland(680,hz+80,840,hz+90,12,R)+snowf(R,70,0,H,W);
 return{back:b,front:f,avoid:[[160,hz+110,85,50],[760,hz+115,95,55],[620,hz+280,50,45]],extra:[]}},
/* 21 – toundra glacée */
(R,W,H,hz)=>{const r=rn(R);let b=K.cloud(240,100,80,'#e8f0fa',.8)+K.cloud(720,160,90,'#e8f0fa',.7);for(const [x,w,h] of [[120,400,90],[480,500,120],[860,420,100]])b+=K.mount(x,hz,w,h,'#8aa2c4','#f4f8ff');
 let f='';for(let i=0;i<14;i++)f+=K.pine(r(10,990),hz+r(30,900),r(50,110),'#3a5a5a','#4a6e6a',1);
 for(const [x,y] of [[200,hz+260],[760,hz+200],[600,hz+620],[160,hz+840],[860,hz+960]])f+=`<ellipse cx="${x}" cy="${y}" rx="${r(40,70)}" ry="24" fill="#7a8a9a"/><ellipse cx="${x-8}" cy="${y-12}" rx="30" ry="10" fill="#f4f8ff"/>`;
 f+=`<g transform="translate(460 ${hz+340})"><ellipse cx="0" cy="6" rx="120" ry="16" fill="#000" opacity=".15"/><path d="M-90 0L0 -120L90 0Z" fill="#c8743a"/><path d="M0 -120L30 0H-30Z" fill="#5a2a14"/><path d="M0 -120V-140" stroke="#6a4a2a" stroke-width="4"/></g><g transform="translate(620 ${hz+360})"><circle cx="0" cy="-20" r="50" fill="#ff9a3a" opacity=".2"/><path d="M-26 0l52-10M-26-10l52 10" stroke="#6a4424" stroke-width="8"/><path d="M-16 -6Q-10 -40 0 -50Q4 -30 16 -6Z" fill="#ff8a2a"/><path d="M-8 -6Q-4 -26 2 -32Q4 -18 8 -6Z" fill="#ffe05a"/></g>`;
 for(let i=0;i<30;i++){const x=r(0,W),y=r(hz+20,H);f+=`<path d="M${x} ${y}h${r(40,120)}" stroke="#fff" stroke-width="3" opacity=".6" stroke-linecap="round"/>`}
 return{back:b,front:f+snowf(R,90,0,H,W),avoid:[[460,hz+290,90,60],[620,hz+340,36,30]],extra:[]}},
/* 22 – pôle Nord */
(R,W,H,hz)=>{const r=rn(R);let b=K.cloud(220,90,60)+K.cloud(800,150,70)+`<circle cx="520" cy="${hz*.4}" r="40" fill="#fffbe0"/><rect y="${hz-50}" width="${W}" height="60" fill="#5a9ac8"/>`;for(const [x,w,h] of [[100,220,170],[400,160,110],[700,280,210],[950,180,140]])b+=K.berg(x,hz,w,h);
 let f=`<g transform="translate(500 ${hz+300})"><ellipse cx="0" cy="8" rx="80" ry="16" fill="#9cc8e2"/><rect x="-9" y="-260" width="18" height="260" fill="#fff"/>`+[...Array(9)].map((_,i)=>`<rect x="-9" y="${-260+i*30}" width="18" height="15" fill="#e2343e"/>`).join('')+`<circle cx="0" cy="-270" r="18" fill="#ffd34a"/><rect x="16" y="-220" width="130" height="40" rx="6" fill="#fff" stroke="#c8202e" stroke-width="3"/><text x="81" y="-193" font-size="20" font-family="sans-serif" font-weight="700" fill="#c8202e" text-anchor="middle">Pôle Nord</text></g>`;
 f+=K.igloo(200,hz+220,170)+K.igloo(820,hz+520,140);
 for(const [x,y,w] of [[760,hz+180,200],[260,hz+620,220],[640,hz+880,240]]){f+=`<ellipse cx="${x}" cy="${y}" rx="${w/2}" ry="${w*.16}" fill="#3a82b8"/>`;for(let k=0;k<3;k++)f+=K.floe(x+r(-w*.3,w*.3),y+r(-8,6),r(20,34))}
 for(let i=0;i<24;i++){const x=r(0,W),y=r(hz+40,H);f+=`<path d="M${x-60} ${y}Q${x} ${y-24} ${x+60} ${y}" fill="#fff" opacity=".7"/>`}
 return{back:b,front:f+snowf(R,50,0,H,W),avoid:[[500,hz+200,60,110],[200,hz+180,85,50],[760,hz+180,100,32],[260,hz+620,110,35],[640,hz+880,120,38]],extra:[{e:'🐻‍❄️',x:340,y:hz+300,s:36}]}},
/* 23 – aurores boréales */
(R,W,H,hz)=>{const r=rn(R);let b=`<defs><filter id="chblur"><feGaussianBlur stdDeviation="18"/></filter></defs>`+K.stars(R,90,0,0,W,hz)+K.aurora(R,W,hz*.35,'#5affb0',.5)+K.aurora(R,W,hz*.55,'#ff7ad0',.35)+K.aurora(R,W,hz*.2,'#7ae0ff',.4)+K.mount(220,hz,520,200,'#1a2a4a','#cfdcf0')+K.mount(760,hz,600,240,'#203252','#cfdcf0');
 let f=`<ellipse cx="520" cy="${hz+260}" rx="300" ry="70" fill="#1f3a5a"/><ellipse cx="520" cy="${hz+260}" rx="290" ry="62" fill="#2f6a7a" opacity=".7"/><path d="M300 ${hz+250}Q520 ${hz+230} 740 ${hz+260}" stroke="#7affc0" stroke-width="18" opacity=".25" fill="none"/><path d="M340 ${hz+275}Q520 ${hz+260} 700 ${hz+280}" stroke="#ff8ad8" stroke-width="12" opacity=".2" fill="none"/>`;
 for(let x=-10;x<W+30;x+=r(40,70))f+=K.pine(x,hz+r(40,110),r(90,150),'#12283a','#1a3448',1);
 for(const [x,y,s] of [[60,hz+500,220],[940,hz+560,230],[200,hz+900,250],[820,hz+1000,260]])f+=K.pine(x,y,s,'#1a3a4a','#24485a',1);
 f+=`<g transform="translate(700 ${hz+480})"><path d="M-60 0L0 -80L60 0Z" fill="#3a5a8a"/><path d="M0 -80L18 0H-18Z" fill="#ffd36b" opacity=".85"/></g>`;
 return{back:b,front:f+snowf(R,40,hz,H,W),avoid:[[520,hz+260,300,70],[700,hz+440,60,40]],extra:[]}},
/* 24 – village du Père Noël */
(R,W,H,hz)=>{const r=rn(R);let b=nsky(R,W,hz)+K.mount(500,hz,1100,180,'#7a6ab0','#f4f0ff');for(let x=-10;x<W+30;x+=r(26,38))b+=K.pine(x,hz+r(-2,6),r(50,80),'#2a4a5a','#36606e',1);
 let f='';for(const [x,y,w] of [[130,hz+170,160],[360,hz+120,130],[880,hz+170,170],[120,hz+560,150],[880,hz+620,160],[300,hz+900,150],[760,hz+1000,160]])f+=K.ginger(x,y,w,R);
 f+=K.xtree(600,hz+420,330,R)+`<ellipse cx="600" cy="${hz+425}" rx="120" ry="18" fill="#fff" opacity=".6"/>`+K.gift(540,hz+430,40,32,'#e2343e')+K.gift(660,hz+432,36,28,'#2a8a5a')+K.gift(600,hz+440,30,24,'#3a6ad8');
 for(const [x,y] of [[460,hz+250],[740,hz+250],[440,hz+600],[760,hz+620],[520,hz+1060]])f+=K.cane(x,y,90);
 f+=K.garland(130,hz+70,360,hz+50,20,R)+K.garland(360,hz+50,600,hz+40,24,R)+K.garland(600,hz+40,880,hz+70,20,R);
 for(const [x,y] of [[260,hz+330],[960,hz+380],[60,hz+760],[600,hz+800],[960,hz+860]])f+=K.lamp(x,y,100);
 return{back:b,front:f+snowf(R,60,0,H,W),avoid:[[600,hz+260,110,170],[130,hz+120,90,60],[880,hz+120,95,60]],extra:[{e:'🎅',x:680,y:hz+410,s:38}]}},
/* 25 – boulangerie des lutins */
(R,W,H,hz)=>{const r=rn(R);let b=nsky(R,W,hz);for(let x=-10;x<W+30;x+=r(26,38))b+=K.pine(x,hz+r(-2,6),r(50,80),'#2a4a5a','#36606e',1);
 const by=hz+280;let f=`<ellipse cx="500" cy="${by+6}" rx="380" ry="24" fill="#000" opacity=".15"/><rect x="170" y="${by-240}" width="660" height="240" fill="#f2d8b0"/><path d="M150 ${by-236}L500 ${by-370}L850 ${by-236}Z" fill="#8a3a2a"/><path d="M150 ${by-238}L500 ${by-372}L850 ${by-238}" stroke="#fff" stroke-width="14" fill="none" stroke-linejoin="round"/><rect x="700" y="${by-380}" width="50" height="90" fill="#9a5a3a"/>`+K.smoke(725,by-390,140);
 f+=`<rect x="300" y="${by-230}" width="400" height="44" rx="10" fill="#6a2a1a"/><text x="500" y="${by-200}" font-size="26" font-family="Georgia,serif" font-weight="700" fill="#ffe0a0" text-anchor="middle">Boulangerie des lutins</text>`;
 for(let i=0;i<8;i++)f+=`<path d="M${180+i*80} ${by-170}h80v24q-20 14-40 0q-20 14-40 0z" fill="${i%2?'#fff':'#e2343e'}"/>`;
 f+=`<rect x="210" y="${by-130}" width="200" height="110" fill="#ffe7a8" stroke="#6a3a1a" stroke-width="6"/><rect x="590" y="${by-130}" width="200" height="110" fill="#ffe7a8" stroke="#6a3a1a" stroke-width="6"/><rect x="450" y="${by-140}" width="100" height="140" rx="10" fill="#6a3a1a"/><circle cx="530" cy="${by-70}" r="6" fill="#ffd34a"/>`;
 for(const [x,c] of [[250,'#e8a05a'],[300,'#ff8ad0'],[350,'#8a4a2a'],[630,'#f2c26a'],[690,'#ff5a7a'],[750,'#c58a4a']])f+=`<ellipse cx="${x}" cy="${by-40}" rx="22" ry="12" fill="${c}"/><ellipse cx="${x}" cy="${by-48}" rx="16" ry="8" fill="#fff" opacity=".6"/>`;
 for(const [x,y] of [[160,hz+520],[520,hz+620],[860,hz+520],[300,hz+860],[740,hz+900]])f+=`<ellipse cx="${x}" cy="${y}" rx="70" ry="20" fill="#9a6a3a"/><ellipse cx="${x}" cy="${y-6}" rx="70" ry="20" fill="#c99a6a"/><path d="M${x-50} ${y}v50M${x+50} ${y}v50" stroke="#6a4424" stroke-width="6"/><circle cx="${x-20}" cy="${y-14}" r="9" fill="#fff"/><circle cx="${x+18}" cy="${y-12}" r="8" fill="#e8a05a"/>`;
 f+=K.garland(170,by-170,830,by-170,10,R)+snowf(R,40,0,H,W);
 return{back:b,front:f,avoid:[[500,by-170,340,200]],extra:[]}},
/* 26 – usine à jouets */
(R,W,H,hz)=>{const r=rn(R);let b=K.stars(R,40,0,0,W,hz*.7);
 const fy=hz+150;let f=`<rect x="60" y="${fy-200}" width="880" height="200" fill="#c84a5a"/>`;for(let i=0;i<6;i++)f+=`<path d="M${60+i*147} ${fy-200}l73-60l74 60z" fill="#a83a4a"/>`;
 for(const [x,h] of [[180,120],[420,160],[760,140]])f+=`<rect x="${x}" y="${fy-260-h}" width="44" height="${h+60}" fill="#7a2a3a"/><rect x="${x}" y="${fy-270-h}" width="44" height="14" fill="#ffd34a"/>`+K.smoke(x+22,fy-280-h,180);
 for(let i=0;i<8;i++)f+=`<rect x="${100+i*105}" y="${fy-150}" width="60" height="50" fill="#ffe08a" stroke="#5a1a2a" stroke-width="4"/>`;
 f+=`<rect x="420" y="${fy-80}" width="160" height="80" fill="#5a1a2a"/><text x="500" y="${fy-215}" font-size="30" font-family="Georgia,serif" font-weight="700" fill="#fff" text-anchor="middle" opacity=".0">.</text>`;
 f+=K.gear(120,fy+90,50,'#8a8aa0')+K.gear(190,fy+60,30,'#b0b0c4')+K.gear(880,fy+110,60,'#8a8aa0')+K.gear(800,fy+70,34,'#b0b0c4');
 for(const y of [fy+260,fy+560,fy+860])f+=K.belt(40,960,y,R);
 for(let i=0;i<20;i++)f+=`<circle cx="${r(0,W)}" cy="${r(fy+20,H)}" r="${r(4,9)}" fill="${['#ff4a5a','#ffd34a','#4ab6ff'][i%3]}" opacity=".5"/>`;
 return{back:b,front:f,avoid:[[500,fy-120,450,150],[500,fy+255,470,30],[500,fy+555,470,30],[500,fy+855,470,30]],extra:[]}},
/* 27 – atelier d’emballage */
(R,W,H,hz)=>{const r=rn(R);const cs=['#e2343e','#2a8a5a','#3a6ad8','#c58aff','#ff8ad0','#ffb03a'],rb=['#ffd34a','#fff','#ffd34a'];let b=K.stars(R,40,0,0,W,hz*.7);
 let f='';for(const [x0,n] of [[110,5],[880,6]]){let y=hz+40+n*70;for(let k=0;k<n;k++){const w=r(90,140);f+=K.gift(x0+r(-14,14),y,w,r(55,70),cs[Math.floor(r(0,6))],rb[k%3]);y-=r(60,74)}}
 for(const [x,y] of [[500,hz+120],[300,hz+500],[720,hz+560],[500,hz+880]])f+=`<rect x="${x-140}" y="${y-14}" width="280" height="22" fill="#b88a5a"/><path d="M${x-120} ${y+8}v70M${x+120} ${y+8}v70" stroke="#7a5230" stroke-width="8"/>`+K.gift(x-60,y-14,60,44,cs[Math.floor(r(0,6))])+K.gift(x+50,y-14,50,38,cs[Math.floor(r(0,6))],'#fff')+`<circle cx="${x+10}" cy="${y-30}" r="16" fill="#ff5a8a"/><circle cx="${x+10}" cy="${y-30}" r="6" fill="#fff"/>`;
 for(let i=0;i<10;i++){const x=r(40,960),y=r(hz+200,H-40),c=cs[i%6];f+=`<path d="M${x} ${y}q30-30 60 0t60 0" stroke="${c}" stroke-width="6" fill="none" opacity=".7"/>`}
 for(const [x,y,w] of [[160,hz+760,120],[860,hz+880,130],[140,hz+1100,110],[860,hz+1150,120]])f+=K.gift(x,y,w,w*.75,cs[Math.floor(r(0,6))],rb[Math.floor(r(0,3))]);
 f+=K.garland(0,hz-20,500,hz+10,20,R)+K.garland(500,hz+10,W,hz-20,20,R);
 return{back:b,front:f,avoid:[[110,hz+200,80,220],[880,hz+220,80,250]],extra:[]}},
/* 28 – écurie des rennes */
(R,W,H,hz)=>{const r=rn(R);let b=nsky(R,W,hz);for(let x=-10;x<W+30;x+=r(26,38))b+=K.pine(x,hz+r(-2,6),r(56,90),'#2a4a5a','#36606e',1);
 let f=K.stable(500,hz+260,640);
 f+=K.deer(330,hz+600,110)+K.deer(640,hz+700,120,'#8a5a3a')+K.deer(200,hz+940,110,'#6a3a1a')+`<circle cx="700" cy="${hz+594}" r="8" fill="#ff2a2a"/><circle cx="700" cy="${hz+594}" r="18" fill="#ff2a2a" opacity=".3"/>`;
 f+=K.fence(40,hz+430,920,'#a87a4a');
 for(const [x,y] of [[120,hz+360],[880,hz+380],[480,hz+520],[820,hz+900],[420,hz+1080]])f+=K.bale(x,y,50);
 for(const [x,y] of [[160,hz+280],[840,hz+280],[600,hz+980]])f+=K.lantern(x,y,120);
 for(let i=0;i<70;i++){const x=r(0,W),y=r(hz+300,H);f+=`<path d="M${x} ${y}l${r(-10,10)} -8" stroke="#d9b45a" stroke-width="2" opacity=".6"/>`}
 return{back:b,front:f+snowf(R,30,0,hz+100,W),avoid:[[500,hz+160,330,140]],extra:[]}},
/* 29 – traîneau du Père Noël */
(R,W,H,hz)=>{const r=rn(R);let b=nsky(R,W,hz)+K.mount(500,hz,1100,140,'#3a3a7a','#e8eaff');for(let x=-10;x<W+30;x+=r(28,40))b+=K.pine(x,hz+r(-2,6),r(50,80),'#1f3a4a','#2a4a5a',1);
 const sy=hz+360;let f='';for(let i=0;i<4;i++)f+=K.deer(860-i*0+ (i%2)*60,sy-40-Math.floor(i/2)*0+i*0,100,'#7a4a2a');
 f='';for(const [x,y] of [[760,sy-80],[880,sy-80],[740,sy-10],[860,sy-10]])f+=K.deer(x,y,100);f+=`<circle cx="${942}" cy="${sy-94}" r="7" fill="#ff2a2a"/><path d="M380 ${sy-120}L740 ${sy-60}M380 ${sy-110}L740 ${sy+10}" stroke="#8a4a2a" stroke-width="3"/>`;
 const cs=['#e2343e','#2a8a5a','#3a6ad8','#c58aff','#ffb03a'];let gp='';for(let k=0;k<9;k++)gp+=K.gift(180+(k%4)*60+r(-10,10),sy-140-Math.floor(k/4)*44,r(46,60),r(38,48),cs[k%5],k%2?'#fff':'#ffd34a');
 f+=`<ellipse cx="300" cy="${sy-150}" rx="150" ry="60" fill="#7a3a1a"/>`+gp+K.sleigh(300,sy,440);
 f+=`<circle cx="300" cy="${sy-200}" r="230" fill="#ffd36b" opacity=".08"/>`;
 for(const [x,y,s] of [[60,hz+560,200],[940,hz+620,220],[160,hz+950,240],[820,hz+1040,250]])f+=K.xtree(x,y,s,R);
 for(let i=0;i<8;i++)f+=K.gift(r(300,700),r(hz+520,H-60),r(34,50),r(28,40),cs[i%5]);
 return{back:b,front:f+snowf(R,70,0,H,W),avoid:[[300,sy-110,240,130],[820,sy-70,140,60]],extra:[]}}
);}

/* ---------- Cherche et trouve : décors des univers 21 à 30 (marché aux lanternes… fête des lumières) ---------- */
const CHN30=(()=>{
 const K=CHK,rn=R=>(a,b)=>a+R()*(b-a),sp=(d,c,w,o=1)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-opacity="${o}" stroke-linecap="round"/>`,
 qy=(y0,yc,y1,t)=>(1-t)*(1-t)*y0+2*(1-t)*t*yc+t*t*y1,
 string=(x0,y0,x1,y1,sag,n,cols,r)=>{const yc=(y0+y1)/2+sag*2;let g=sp(`M${x0} ${y0}Q${(x0+x1)/2} ${yc} ${x1} ${y1}`,'#3a2a30',2.4,.8);for(let i=1;i<=n;i++){const t=i/(n+1),x=x0+(x1-x0)*t,y=qy(y0,yc,y1,t),c=cols[i%cols.length];g+=`<circle cx="${x}" cy="${y+10}" r="22" fill="${c}" opacity=".22"/><ellipse cx="${x}" cy="${y+12}" rx="8" ry="11" fill="${c}"/><path d="M${x-4} ${y+2}h8" stroke="#3a2a30" stroke-width="2.4"/>`}return g},
 puddle=(x,y,w)=>`<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w*.22}" fill="#fff" opacity=".18"/><ellipse cx="${x}" cy="${y}" rx="${w*.55}" ry="${w*.11}" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.6"/>`,
 glow=(x,y,r,c,o=.35)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${o}"/>`,
 burst=(x,y,r,c,R)=>{let g='';for(let i=0;i<16;i++){const a=i/16*Math.PI*2,r2=r*(.8+R()*.3);g+=`<path d="M${x+Math.cos(a)*r*.25} ${y+Math.sin(a)*r*.25}L${x+Math.cos(a)*r2} ${y+Math.sin(a)*r2}" stroke="${c}" stroke-width="3" stroke-linecap="round"/><circle cx="${x+Math.cos(a)*r2}" cy="${y+Math.sin(a)*r2}" r="3.6" fill="#fff"/>`}return `<g opacity=".92">${g}</g>`+glow(x,y,r*.5,c,.12)};
 return[
/* 21 – marché aux lanternes */
(R,W,H,hz)=>{const r=rn(R);let b=K.stars(R,50,0,0,W,hz*.6)+`<circle cx="${r(700,880)}" cy="110" r="52" fill="#ffe9c0"/>`+glow(760,110,130,'#ffe9c0',.1);for(let x=-10;x<W;x+=r(70,100)){const w=r(60,96),h=r(110,230);b+=K.bld(R,x,hz+4,w,h,'#3a1f4e','#ffb36b')+`<path d="M${x-6} ${hz+4-h}L${x+w/2} ${hz+4-h-26}L${x+w+6} ${hz+4-h}Z" fill="#5a2a5e"/>`}
 b+=string(-20,150,1020,170,70,9,['#ff5a4a','#ffb340','#ff7ab0'],R)+string(-20,250,1020,230,60,8,['#ffb340','#ff5a4a','#7ad8ff'],R);
 let f=`<ellipse cx="500" cy="${hz+330}" rx="560" ry="230" fill="#c9a07a" opacity=".35"/>`;const st=[[150,hz+150,170,'#e24a4a','#fff0d0'],[500,hz+120,180,'#e8a23a','#fff0d0'],[850,hz+150,170,'#4a8ae2','#fff0d0'],[300,hz+430,190,'#d84a9a','#fff0d0'],[720,hz+450,190,'#3ab28a','#fff0d0']];const av=[];for(const[x,y,w,c1,c2]of st){f+=K.tent(x,y,w,w*.7,c1,c2)+glow(x,y-w*.3,w*.5,'#ffd070',.12);for(let i=0;i<4;i++){const c=['#ff8a3a','#ffd34a','#e0503a','#8ad05a'][i];f+=`<circle cx="${x-w*.3+i*w*.2}" cy="${y-6}" r="9" fill="${c}"/>`}av.push([x,y-30,w*.55,w*.35])}
 for(const x of[60,330,640,940])f+=K.lamp(x,hz+300,120,'#ffcf7a');f+=sp(`M470 ${H}C450 ${hz+700} 560 ${hz+520} 500 ${hz+300}`,'#e8d0a8',70,.4);
 return{back:b,front:f,avoid:av,extra:[{e:'🧒',x:240,y:hz+330,s:56},{e:'👵',x:610,y:hz+300,s:56},{e:'🐈',x:420,y:hz+560,s:44},{e:'🐕',x:800,y:hz+640,s:46},{e:'🧑',x:130,y:hz+560,s:56},{e:'🦋',x:560,y:hz+60,s:34}]}},
/* 22 – montagne et chalets */
(R,W,H,hz)=>{const r=rn(R);let b=`<circle cx="${r(700,860)}" cy="110" r="56" fill="#fff6c8"/>`+glow(780,110,150,'#fff6c8',.25)+K.cloud(200,120,80)+K.cloud(520,70,60)+K.cloud(860,200,52)+K.mount(240,hz+30,560,330,'#6f8fc4','#fff')+K.mount(720,hz+30,640,380,'#5a7ab4','#fff')+K.mount(500,hz+30,520,250,'#8fa8d4','#fff');for(let x=-10;x<W+30;x+=r(26,40))b+=K.pine(x,hz+r(10,30),r(90,130),'#1f5a46','#2a7058',1);
 let f=`<path d="M0 ${hz+300}C300 ${hz+240} 640 ${hz+330} ${W} ${hz+250}V${H}H0Z" fill="#fff" opacity=".35"/>`+sp(`M520 ${H}C400 ${hz+760} 700 ${hz+560} 560 ${hz+330}`,'#c9d8ee',70,.7);const av=[];for(const[x,y,w]of[[230,hz+200,170],[780,hz+240,200],[540,hz+420,150]]){f+=K.chalet(x,y,w,{body:'#b07a4a',roof:'#f4f6fb',lit:'#ffd36b'})+K.smoke(x+w*.25,y-w*.62,w);av.push([x,y-w*.2,w*.6,w*.4])}
 f+=K.fence(60,hz+620,300,'#e8d8c0')+K.fence(640,hz+700,300,'#e8d8c0');for(let i=0;i<8;i++)f+=K.pine(r(10,990),hz+r(280,820),r(140,230),'#1f5a46','#2a7058',1);f+=sp(`M860 ${hz+340}C760 ${hz+560} 700 ${hz+700} 760 ${H}`,'#8fb0dc',6,.7)+sp(`M880 ${hz+340}C780 ${hz+560} 720 ${hz+700} 780 ${H}`,'#8fb0dc',6,.7);
 return{back:b,front:f,avoid:av,extra:[{e:'⛷️',x:860,y:hz+520,s:54},{e:'🏂',x:300,y:hz+560,s:54},{e:'🦌',x:120,y:hz+420,s:56},{e:'🐐',x:640,y:hz+600,s:46},{e:'🐿️',x:420,y:hz+700,s:40},{e:'🦅',x:300,y:140,s:44}]}},
/* 23 – marais aux grenouilles */
(R,W,H,hz)=>{const r=rn(R);let b=glow(500,hz-40,240,'#fff6c0',.35);for(let x=-20;x<W+30;x+=r(50,76))b+=K.rtree(x,hz+r(0,24),r(110,170),'#2f6a3a','#3f8a4a');for(let i=0;i<12;i++){const x=r(20,980);b+=sp(`M${x} 0Q${x+r(-20,20)} ${r(60,120)} ${x+r(-12,12)} ${r(150,250)}`,'#4a7a4a',3,.55)}b+=`<ellipse cx="500" cy="${hz+30}" rx="620" ry="40" fill="#fff" opacity=".18"/>`;
 let f=`<ellipse cx="520" cy="${hz+330}" rx="420" ry="170" fill="#4a9a9a"/><ellipse cx="500" cy="${hz+320}" rx="330" ry="120" fill="#6ac0b8" opacity=".6"/><ellipse cx="260" cy="${hz+740}" rx="250" ry="110" fill="#4a9a9a"/><ellipse cx="260" cy="${hz+734}" rx="180" ry="70" fill="#6ac0b8" opacity=".6"/><ellipse cx="800" cy="${hz+600}" rx="210" ry="90" fill="#4a9a9a"/>`;const av=[[520,hz+330,300,110],[260,hz+740,190,80]];for(let i=0;i<14;i++){const x=r(120,900),y=r(hz+240,hz+800);f+=`<ellipse cx="${x}" cy="${y}" rx="${r(30,46)}" ry="${r(10,15)}" fill="#3f9a50"/><path d="M${x} ${y}l${r(10,18)} -3" stroke="#2f7a3a" stroke-width="2"/>`;if(i%3===0)f+=`<circle cx="${x+8}" cy="${y-6}" r="8" fill="#ff9ac4"/><circle cx="${x+8}" cy="${y-6}" r="3" fill="#ffe27a"/>`}
 for(let i=0;i<22;i++){const x=r(10,990),y=r(hz+150,H-30);f+=sp(`M${x} ${y}q${r(-8,8)} ${-r(40,80)} ${r(-14,14)} ${-r(80,130)}`,'#4a8a3a',4,.9)+`<ellipse cx="${x}" cy="${y-r(90,120)}" rx="5" ry="16" fill="#7a5a30"/>`}
 f+=`<rect x="60" y="${hz+560}" width="200" height="36" rx="16" fill="#7a5230"/><ellipse cx="62" cy="${hz+578}" rx="10" ry="18" fill="#c9a070"/>`;for(let i=0;i<30;i++){const x=r(20,980),y=r(hz+60,H-40);f+=glow(x,y,10,'#f6ff9a',.22)+`<circle cx="${x}" cy="${y}" r="2.4" fill="#f6ff9a"/>`}
 return{back:b,front:f,avoid:av,extra:[{e:'🐸',x:330,y:hz+260,s:46},{e:'🐸',x:700,y:hz+520,s:44},{e:'🦆',x:560,y:hz+400,s:48},{e:'🐢',x:150,y:hz+420,s:44},{e:'🦋',x:420,y:hz+150,s:34},{e:'🐸',x:860,y:hz+820,s:50},{e:'🪲',x:220,y:hz+900,s:30}]}},
/* 24 – observatoire */
(R,W,H,hz)=>{const r=rn(R);let b=K.stars(R,120,0,0,W,hz*2.2)+K.planet(780,120,60,'#d98a6a','#f2c8a0')+K.planet(170,200,34,'#7ab0e0')+`<circle cx="420" cy="90" r="46" fill="#f4f0d8"/><circle cx="436" cy="82" r="46" fill="#0b0f3a"/>`+sp('M900 40L720 150',  '#fff',4,.9)+sp('M860 70L760 128','#fff',2,.5);b+=K.mount(300,hz+120,560,130,'#1c1f58')+K.mount(760,hz+120,560,110,'#262a6c');
 let f=`<path d="M0 ${hz+170}C300 ${hz+110} 700 ${hz+230} ${W} ${hz+150}V${H}H0Z" fill="#2b2e70" opacity=".8"/>`;const cx=500,cy=hz+330;f+=`<rect x="${cx-170}" y="${cy-80}" width="340" height="190" fill="#c8cdf0"/><path d="M${cx-170} ${cy-80}A170 150 0 0 1 ${cx+170} ${cy-80}Z" fill="#8a94d8"/><path d="M${cx-24} ${cy-226}L${cx-44} ${cy-80}H${cx+44}L${cx+24} ${cy-226}Z" fill="#1c1f58"/><path d="M${cx+40} ${cy-150}l130 -80" stroke="#444a88" stroke-width="26" stroke-linecap="round"/><rect x="${cx-34}" y="${cy+20}" width="68" height="90" fill="#6a58b8"/>`+K.win(cx-130,cy-30,40,50,'#ffe08a')+K.win(cx+90,cy-30,40,50,'#ffe08a')+glow(cx,cy-120,200,'#8a94ff',.12);for(let i=0;i<7;i++)f+=`<path d="M${cx-60+i*8} ${cy+110+i*14}h${120-i*16}" stroke="#aeb4e8" stroke-width="10"/>`;f+=`<g transform="translate(180 ${hz+620})"><path d="M-40 70L0 0L40 70M0 0V70" stroke="#aeb4e8" stroke-width="7" fill="none"/><rect x="-14" y="-40" width="110" height="26" rx="8" fill="#c8cdf0" transform="rotate(-28)"/></g><g transform="translate(820 ${hz+660})"><path d="M-30 60L0 0L30 60" stroke="#aeb4e8" stroke-width="7" fill="none"/><rect x="-10" y="-34" width="80" height="22" rx="8" fill="#c8cdf0" transform="rotate(-40)"/></g>`;for(let i=0;i<5;i++)f+=K.pine(r(20,980),hz+r(560,1000),r(110,170),'#1a1e58','#262a76');
 return{back:b,front:f,avoid:[[cx,cy-20,200,190],[180,hz+640,80,60],[820,hz+680,80,60]],extra:[{e:'🦉',x:250,y:hz+240,s:46},{e:'🐈',x:700,y:hz+520,s:42},{e:'🌠',x:620,y:90,s:40},{e:'✨',x:300,y:130,s:34},{e:'🪐',x:120,y:70,s:36}]}},
/* 25 – bibliothèque enchantée */
(R,W,H,hz)=>{const r=rn(R),cols=['#c0392b','#2e86c1','#27ae60','#f1c40f','#8e44ad','#e67e22','#16a085','#d35400'];let b=`<rect x="0" y="0" width="${W}" height="${hz+60}" fill="#5a3a20"/>`;for(let y=40;y<hz+40;y+=84){b+=`<rect x="0" y="${y+60}" width="${W}" height="10" fill="#3a2410"/>`;for(let x=6;x<W;){const w=r(14,26),h=r(40,62);b+=`<rect x="${x}" y="${y+60-h}" width="${w}" height="${h}" fill="${cols[Math.floor(R()*cols.length)]}"/><path d="M${x+3} ${y+60-h+8}h${w-6}" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>`;x+=w+2}}for(const x of[230,770])b+=`<path d="M${x-70} ${hz+60}V${hz-150}A70 70 0 0 1 ${x+70} ${hz-150}V${hz+60}Z" fill="#1a1550"/>`+K.stars(R,8,x-50,hz-190,x+50,hz-60)+`<circle cx="${x+20}" cy="${hz-110}" r="22" fill="#f4f0d8"/>`;
 let f=`<rect x="0" y="${hz+60}" width="${W}" height="${H}" fill="#9a6a3a"/>`;for(let y=hz+60;y<H;y+=46)f+=`<path d="M0 ${y}H${W}" stroke="#6a4424" stroke-width="3" stroke-opacity=".7"/>`;f+=`<ellipse cx="500" cy="${hz+520}" rx="400" ry="190" fill="#8a2a3a"/><ellipse cx="500" cy="${hz+520}" rx="340" ry="150" fill="none" stroke="#e8c070" stroke-width="6"/><ellipse cx="500" cy="${hz+520}" rx="240" ry="100" fill="#a8384a"/>`;f+=`<rect x="80" y="${hz+220}" width="250" height="150" fill="#6a4424"/><rect x="80" y="${hz+200}" width="250" height="26" fill="#8a5a30"/><rect x="120" y="${hz+170}" width="70" height="40" fill="#f4e8c8"/>`+glow(250,hz+160,90,'#ffd070',.25)+`<path d="M250 ${hz+200}v-44" stroke="#f4e8c8" stroke-width="8"/><ellipse cx="250" cy="${hz+150}" rx="9" ry="14" fill="#ffb340"/>`;for(let i=0;i<4;i++)f+=`<rect x="${700+i*6}" y="${hz+330-i*30}" width="${150-i*14}" height="30" fill="${cols[i*2]}"/>`;f+=`<circle cx="860" cy="${hz+250}" r="46" fill="#3a8ab0"/><path d="M820 ${hz+270}Q860 ${hz+230} 900 ${hz+250}" stroke="#7ac07a" stroke-width="12" fill="none"/><path d="M860 ${hz+296}v40M830 ${hz+338}h60" stroke="#6a4424" stroke-width="8"/>`;
 f+=`<path d="M920 ${hz-120}L880 ${hz+250}" stroke="#a8742c" stroke-width="12"/><path d="M960 ${hz-120}L920 ${hz+250}" stroke="#a8742c" stroke-width="12"/>`;for(let i=0;i<8;i++)f+=`<path d="M${918-i*5} ${hz-80+i*40}l40 0" stroke="#a8742c" stroke-width="8"/>`;
 return{back:b,front:f,avoid:[[500,hz+520,330,140],[200,hz+240,150,100],[860,hz+280,80,80]],extra:[{e:'📚',x:150,y:hz+700,s:50},{e:'🕯️',x:600,y:hz+360,s:44},{e:'🦉',x:880,y:hz+520,s:48},{e:'🐈',x:380,y:hz+520,s:44},{e:'📖',x:700,y:hz+740,s:44},{e:'🧙',x:500,y:hz+760,s:60}]}},
/* 26 – cabane dans les arbres */
(R,W,H,hz)=>{const r=rn(R);let b=`<circle cx="${r(120,300)}" cy="120" r="52" fill="#fff6c0"/>`+K.cloud(600,100,70)+K.cloud(850,200,50);for(let x=-20;x<W+40;x+=r(60,90))b+=K.rtree(x,hz+r(0,18),r(80,120),'#4a9a52','#62b866');
 let f='';const av=[];for(const x of[170,780]){f+=`<path d="M${x-30} ${H}L${x-18} ${hz-40}H${x+18}L${x+30} ${H}Z" fill="#6b4528"/><path d="M${x-18} ${hz+140}C${x-80} ${hz+110} ${x-110} ${hz+60} ${x-140} ${hz+40}" stroke="#6b4528" stroke-width="22" fill="none" stroke-linecap="round"/>`;for(let i=0;i<9;i++)f+=`<circle cx="${x+r(-170,170)}" cy="${hz+r(-120,40)}" r="${r(60,100)}" fill="${i%2?'#3f9a4a':'#56b45c'}" opacity=".95"/>`}
 const hx=500,hy=hz+260;f+=`<path d="M${hx-120} ${H}L${hx-70} ${hy+60}H${hx+70}L${hx+120} ${H}Z" fill="#7a5230"/><rect x="${hx-170}" y="${hy-140}" width="340" height="200" fill="#c9985a"/><path d="M${hx-170} ${hy-60}H${hx+170}" stroke="#8a5a30" stroke-width="6"/>`+`<path d="M${hx-200} ${hy-140}L${hx} ${hy-260}L${hx+200} ${hy-140}Z" fill="#a8452e"/>`+K.win(hx-120,hy-110,60,60,'#ffe08a')+`<rect x="${hx+20}" y="${hy-110}" width="70" height="110" fill="#6a4424"/><path d="M${hx-190} ${hy+60}H${hx+190}" stroke="#6b4528" stroke-width="16"/><path d="M${hx+100} ${hy-260}v-70l60 20-60 20" fill="#e24a4a" stroke="#6b4528" stroke-width="4"/>`;av.push([hx,hy-60,200,150]);
 for(let i=0;i<9;i++)f+=`<path d="M${hx-60+i*0} ${hy+70+i*60}h${120-i*6}" stroke="#a87a44" stroke-width="7"/>`;f+=`<path d="M880 ${hz+60}v200" stroke="#6b4528" stroke-width="4"/><rect x="852" y="${hz+260}" width="56" height="10" rx="4" fill="#a8742c"/>`;for(let i=0;i<12;i++)f+=K.flowers(R,1,r(10,990),r(hz+520,H-20),0,0,['#ff7aa0','#ffd34a','#fff'])||'';
 return{back:b,front:f,avoid:av,extra:[{e:'🦜',x:300,y:hz+130,s:44},{e:'🐿️',x:90,y:hz+480,s:42},{e:'🐒',x:880,y:hz+420,s:50},{e:'🍎',x:700,y:hz+60,s:30},{e:'🐦',x:420,y:hz+10,s:32},{e:'🦋',x:640,y:hz+640,s:32},{e:'🐛',x:260,y:hz+760,s:30}]}},
/* 27 – temple sous la pluie */
(R,W,H,hz)=>{const r=rn(R);let b=K.cloud(180,70,90,'#8a9aa6',.9)+K.cloud(560,50,100,'#7a8a96',.9)+K.cloud(860,110,80,'#8a9aa6',.9)+K.mount(220,hz+40,520,260,'#8fb0a8')+K.mount(700,hz+40,560,300,'#7aa098')+K.mount(480,hz+40,420,180,'#a8c4bc');const pag=(x,y,s)=>{let g=`<rect x="${x-s*.3}" y="${y-s*.3}" width="${s*.6}" height="${s*.3}" fill="#a83a32"/>`;for(let i=0;i<4;i++){const w=s*(1-i*.17),yy=y-s*.3-i*s*.3;g+=`<path d="M${x-w/2} ${yy}Q${x} ${yy+s*.06} ${x+w/2} ${yy}L${x+w*.56} ${yy-s*.09}Q${x} ${yy-s*.02} ${x-w*.56} ${yy-s*.09}Z" fill="#3a4a58"/><rect x="${x-w*.3}" y="${yy-s*.24}" width="${w*.6}" height="${s*.15}" fill="#c24a3a"/>`}return g};b+=pag(250,hz+40,150);
 let f=`<ellipse cx="500" cy="${hz+520}" rx="500" ry="340" fill="#6a8a80" opacity=".4"/>`+pag(740,hz+300,260);f+=`<path d="M300 ${hz+540}V${hz+360}M440 ${hz+540}V${hz+360}" stroke="#c23a32" stroke-width="22"/><path d="M270 ${hz+360}Q370 ${hz+330} 470 ${hz+360}" stroke="#c23a32" stroke-width="22" fill="none"/><path d="M285 ${hz+410}H455" stroke="#c23a32" stroke-width="14"/>`;for(const x of[120,880])f+=`<rect x="${x-14}" y="${hz+420}" width="28" height="70" fill="#9aa4a0"/><rect x="${x-26}" y="${hz+392}" width="52" height="30" fill="#b4bcb8"/><path d="M${x-30} ${hz+392}L${x} ${hz+366}L${x+30} ${hz+392}Z" fill="#8a948f"/>`+glow(x,hz+407,36,'#ffd070',.35);
 f+=`<ellipse cx="300" cy="${hz+820}" rx="260" ry="110" fill="#5a98a8"/><ellipse cx="300" cy="${hz+814}" rx="190" ry="70" fill="#8cc4d0" opacity=".6"/>`;for(const[x,y]of[[220,hz+820],[340,hz+850],[400,hz+800]])f+=`<ellipse cx="${x}" cy="${y}" rx="40" ry="13" fill="#4a9a6a"/><circle cx="${x}" cy="${y-6}" r="9" fill="#ffaac8"/>`;f+=sp(`M520 ${H}C480 ${hz+800} 620 ${hz+640} 520 ${hz+540}`,'#b4bcb8',70,.5);for(const[x,y]of[[640,hz+720],[740,hz+900],[560,hz+960],[820,hz+560]])f+=puddle(x,y,r(50,80));for(let i=0;i<70;i++){const x=r(0,1000),y=r(0,H);f+=`<path d="M${x} ${y}l-8 22" stroke="#e8f4f8" stroke-opacity=".38" stroke-width="2"/>`}
 return{back:b,front:f,avoid:[[370,hz+440,120,120],[740,hz+260,150,160],[300,hz+820,220,90]],extra:[{e:'🐸',x:460,y:hz+880,s:42},{e:'🐟',x:260,y:hz+790,s:36},{e:'🐦',x:600,y:hz+60,s:32},{e:'🎍',x:900,y:hz+760,s:60},{e:'🌸',x:80,y:hz+640,s:44}]}},
/* 28 – forge du village */
(R,W,H,hz)=>{const r=rn(R);let b=glow(300,hz-20,260,'#ffd9a0',.3)+K.cloud(180,100,70,'#caa890',.8)+K.cloud(700,70,80,'#caa890',.8);for(let x=-10;x<W;x+=r(80,120))b+=K.chalet(x+40,hz+26,r(70,100),{body:'#b08a60',roof:'#7a4a32',lit:'#ffd36b'})+K.smoke(x+60,hz-20,80);b+=K.mount(780,hz+30,500,200,'#9a8a86');
 let f=`<path d="M0 ${hz+130}C300 ${hz+90} 700 ${hz+170} ${W} ${hz+120}V${H}H0Z" fill="#a98a62" opacity=".4"/>`;const fx=300,fy=hz+300;f+=`<rect x="${fx-190}" y="${fy-190}" width="380" height="190" fill="#8a6a50"/><path d="M${fx-190} ${fy-190}L${fx} ${fy-300}L${fx+190} ${fy-190}Z" fill="#5a3a2e"/><rect x="${fx+110}" y="${fy-360}" width="50" height="170" fill="#6a5448"/>`+K.smoke(fx+135,fy-370,160)+`<path d="M${fx-120} ${fy}V${fy-110}A60 60 0 0 1 ${fx} ${fy-110}V${fy}Z" fill="#2a1a14"/>`+glow(fx-60,fy-60,130,'#ff8a2a',.5)+`<path d="M${fx-90} ${fy}Q${fx-60} ${fy-70} ${fx-30} ${fy}Z" fill="#ffb340"/>`;
 f+=`<g transform="translate(700 ${hz+480})"><rect x="-60" y="-14" width="120" height="26" fill="#4a4a54"/><path d="M-60 -14H-90L-60 -2Z" fill="#4a4a54"/><rect x="-20" y="12" width="40" height="40" fill="#3a3a44"/></g>`+K.bale(850,hz+420,70)+K.bale(910,hz+470,60)+K.fence(80,hz+560,360,'#a87a50')+`<ellipse cx="150" cy="${hz+760}" rx="44" ry="14" fill="#000" opacity=".2"/><rect x="108" y="${hz+700}" width="84" height="64" rx="12" fill="#8a5a30"/><path d="M110 ${hz+720}h80M110 ${hz+744}h80" stroke="#4a2a14" stroke-width="5"/>`+K.wheel(600,hz+780,44)+sp(`M500 ${H}C470 ${hz+720} 560 ${hz+560} 460 ${fy+10}`,'#b8a078',64,.5);
 return{back:b,front:f,avoid:[[fx,fy-100,200,150],[700,hz+480,80,50],[880,hz+440,70,50]],extra:[{e:'🐴',x:560,y:hz+500,s:60},{e:'🐓',x:380,y:hz+640,s:42},{e:'🛡️',x:90,y:hz+380,s:40},{e:'⚔️',x:880,y:hz+640,s:38},{e:'🐕',x:230,y:hz+840,s:46},{e:'🌾',x:760,y:hz+780,s:44}]}},
/* 29 – phare dans la tempête */
(R,W,H,hz)=>{const r=rn(R);let b=K.cloud(150,80,110,'#3a4a68',.95)+K.cloud(520,40,140,'#2f3d5a',.95)+K.cloud(880,100,110,'#3a4a68',.95)+K.cloud(340,190,90,'#4a5a78',.9)+`<path d="M640 130L600 230L650 230L590 340" stroke="#fff6a8" stroke-width="7" fill="none" stroke-linejoin="round"/>`;for(let i=0;i<60;i++){const x=r(0,1000),y=r(0,hz);b+=`<path d="M${x} ${y}l-9 24" stroke="#c8d8f0" stroke-opacity=".35" stroke-width="2"/>`}
 let f=`<path d="M0 ${hz+120}`;for(let x=0;x<=W;x+=50)f+=`L${x} ${hz+120+Math.sin(x/60)*16}`;f+=`V${H}H0Z" fill="#2a5a82"/>`;for(let y=hz+170;y<H;y+=r(60,90)){let d=`M0 ${y}`;for(let x=0;x<=W;x+=40)d+=`L${x} ${y+Math.sin(x/50+y)*10}`;f+=sp(d,'#d8ecf8',3,.35)}
 const lx=730,ly=hz+560;f+=`<path d="M470 ${ly+40}C560 ${ly-80} 880 ${ly-100} 1000 ${ly-40}V${H}H400Z" fill="#4a4a58"/><path d="M${lx-60} ${ly}L${lx-34} ${ly-300}H${lx+34}L${lx+60} ${ly}Z" fill="#f4f4f4"/>`;for(let i=0;i<3;i++)f+=`<path d="M${lx-58+i*8} ${ly-60-i*90}H${lx+58-i*8}V${ly-100-i*90}H${lx-58+i*8}Z" fill="#d94a4a" opacity=".9"/>`;f+=`<rect x="${lx-40}" y="${ly-350}" width="80" height="50" fill="#ffe08a"/><path d="M${lx-52} ${ly-350}L${lx} ${ly-400}L${lx+52} ${ly-350}Z" fill="#d94a4a"/>`+`<path d="M${lx-40} ${ly-325}L-20 ${ly-420}V${ly-250}Z" fill="#fff6a8" opacity=".35"/>`+glow(lx,ly-325,120,'#fff6a8',.3);
 f+=`<g transform="translate(220 ${hz+300})"><path d="M-70 0L70 0L50 34L-50 34Z" fill="#7a3a2a"/><path d="M0 0V-140L74 -20Z" fill="#f4f4f4"/><path d="M-8 -10V-110L-60 -10Z" fill="#e8e8f0"/></g>`;for(let i=0;i<16;i++){const x=r(380,1000),y=r(ly-40,H-20);f+=`<ellipse cx="${x}" cy="${y}" rx="${r(20,40)}" ry="${r(10,18)}" fill="#5a5a68"/><ellipse cx="${x-6}" cy="${y-5}" rx="${r(10,18)}" ry="5" fill="#8a8a98" opacity=".6"/>`}for(let i=0;i<8;i++)f+=`<path d="M${r(380,900)} ${r(ly+20,H-30)}q15 -16 30 0q15 -16 30 0" stroke="#fff" stroke-width="4" fill="none" stroke-opacity=".7"/>`;
 return{back:b,front:f,avoid:[[lx,ly-150,90,230],[220,hz+290,90,60]],extra:[{e:'🌊',x:120,y:hz+700,s:60},{e:'🐟',x:300,y:hz+820,s:40},{e:'🐦',x:480,y:hz+170,s:36},{e:'🦀',x:850,y:ly+130,s:38},{e:'⚓',x:560,y:hz+420,s:40},{e:'🐙',x:150,y:hz+1000,s:50}]}},
/* 30 – fête des lumières */
(R,W,H,hz)=>{const r=rn(R);let b=K.stars(R,60,0,0,W,hz*.9)+burst(220,150,95,'#ff6aa0',R)+burst(560,110,80,'#ffd34a',R)+burst(830,190,105,'#6ad8ff',R)+burst(420,300,60,'#9aff8a',R);b+=string(-20,330,1020,350,50,10,['#ff5a8a','#ffd34a','#6ad8ff','#9aff8a'],R);for(let x=-10;x<W;x+=r(70,100))b+=K.bld(R,x,hz+4,r(60,90),r(90,190),'#2a1a50','#ffd070');
 let f=`<ellipse cx="500" cy="${hz+450}" rx="560" ry="260" fill="#c8a8e8" opacity=".25"/>`+K.wheel(780,hz+260,130)+glow(780,hz+260,190,'#ffd070',.12);const av=[[780,hz+300,150,180]];f+=K.tent(250,hz+240,260,190,'#e24a8a','#fff0d0')+glow(250,hz+130,170,'#ffd070',.14);av.push([250,hz+160,150,100]);f+=`<rect x="360" y="${hz+500}" width="280" height="40" rx="6" fill="#8a5a30"/><rect x="380" y="${hz+470}" width="240" height="32" fill="#a8742c"/><path d="M370 ${hz+500}V${hz+420}M630 ${hz+500}V${hz+420}" stroke="#6a4424" stroke-width="8"/><path d="M370 ${hz+430}Q500 ${hz+490} 630 ${hz+430}" stroke="#ffd34a" stroke-width="5" fill="none"/>`;av.push([500,hz+500,160,50]);const bc=['#ff5a8a','#ffd34a','#6ad8ff','#9aff8a','#c08aff'];for(let i=0;i<14;i++){const x=r(40,960),y=r(hz+80,hz+700);f+=`<path d="M${x} ${y+30}Q${x+r(-14,14)} ${y+70} ${x} ${y+110}" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none"/><ellipse cx="${x}" cy="${y}" rx="22" ry="29" fill="${bc[i%5]}"/><ellipse cx="${x-7}" cy="${y-9}" rx="5" ry="8" fill="#fff" opacity=".5"/>`}for(const x of[40,960])f+=K.lamp(x,hz+640,150,'#ffcf7a');for(let i=0;i<70;i++){const x=r(0,1000),y=r(hz+60,H);f+=`<rect x="${x}" y="${y}" width="6" height="${r(5,10)}" fill="${bc[i%5]}" opacity=".7" transform="rotate(${r(0,180)} ${x} ${y})"/>`}
 return{back:b,front:f,avoid:av,extra:[{e:'🥳',x:540,y:hz+420,s:56},{e:'🎊',x:150,y:hz+620,s:44},{e:'🎶',x:700,y:hz+580,s:40},{e:'🧁',x:410,y:hz+440,s:36},{e:'🎈',x:900,y:hz+420,s:48},{e:'🐕',x:240,y:hz+840,s:46},{e:'🎂',x:560,y:hz+800,s:40}]}}
 ]})();
