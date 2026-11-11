_T='''MARTEAU SCIE CLOU VIS ETABLI PINCE RABOT LIME EQUERRE
POELE LOUCHE FOUET PASSOIRE BOL ASSIETTE VERRE TASSE PLAT
RUE PONT PLACE MAIRIE MARCHE GARE QUAI SQUARE FONTAINE
PLAGE DUNE GALET VAGUE SABLE RIVAGE FALAISE MAREE ECUME
GENOU COUDE EPAULE POIGNET CHEVILLE TALON NUQUE MENTON HANCHE
PERE MERE FRERE SOEUR ONCLE TANTE COUSIN NEVEU NIECE
CRAYON CAHIER GOMME REGLE CARTABLE TABLEAU CRAIE TROUSSE LECON
NEIGE GRELE ORAGE TONNERRE ECLAIR VERGLAS BRUINE AVERSE RAFALE
ROSE LILAS PIVOINE IRIS MUGUET VIOLETTE ORCHIDEE PENSEE DAHLIA
MERLE PIGEON MOINEAU FAUCON CYGNE PINSON CORBEAU MESANGE CHOUETTE
PEINTRE PLOMBIER MACON MEDECIN PILOTE FACTEUR CUISINIER AVOCAT BERGER
BRIE COMTE CHEVRE ROQUEFORT CAMEMBERT MUNSTER REBLOCHON CANTAL BEAUFORT
TRAIN METRO TRAMWAY BATEAU VELO CAMION AVION SCOOTER FERRY
CHENE HETRE SAPIN ERABLE TILLEUL BOULEAU PEUPLIER FRENE SAULE
CAROTTE POIREAU NAVET COURGE CHOUX RADIS ENDIVE ARTICHAUT FENOUIL
DRAGON LICORNE SIRENE FEE GEANT TROLL SPHINX CENTAURE PHENIX
FRANCE ITALIE ESPAGNE SUEDE NORVEGE GRECE BRESIL CANADA JAPON
ATOME MOLECULE CELLULE ENERGIE GRAVITE PRISME LASER FOSSILE MICROBE
LIANE SAVANE OASIS CACTUS JUNGLE TOUCAN SINGE JAGUAR MIRAGE
HORLOGE SECONDE MINUTE SEMAINE SAISON CALENDRIER AUBE MIDI SOIREE'''
_L=[x.split()[:8 if i<10 else 9] for i,x in enumerate(_T.split('\n'))]
assert len(_L)==20
_N=[10,11,10,11,10,10,11,10,11,10,10,11,10,11,11,10,11,10,11,11]
RR("11,7,7,9,8,8,9,9,9,9,9];","11,"+",".join(map(str,_N))+",7,7,9,8,8,9,9,9,9,9];")
RR("/* niveaux de fêtes */\n ['NOEL'","".join(" "+repr(x)+",\n" for x in _L)+" /* niveaux de fêtes */\n ['NOEL'")
RR("caches:100,phrase:40,maze:30","caches:120,phrase:40,maze:30")
RR("DG=l>=14,dirs=","DG=l>=14,HD=l>=100&&l<120,OW=l>=100&&l<120?12:5,dirs=")
RR("let tot=0;for(const x of C)tot+=1+x[3]*5;let pk=rnd()*tot,ch=C[C.length-1];for(const x of C){pk-=1+x[3]*5;","let tot=0;for(const x of C)tot+=1+x[3]*OW;let pk=rnd()*tot,ch=C[C.length-1];for(const x of C){pk-=1+x[3]*OW;")
RR("for(const need of [2,1,0]){for(let k=0;k<25&&!res;k++)","for(const need of HD?[6,5,4,3,2,1,0]:[2,1,0]){for(let k=0;k<(HD?12:25)&&!res;k++)")
RR("const {WS,g,pos}=res,AL='ABCDEFGHILMNOPRSTUV';",r'''const {WS,g,pos}=res,AL='ABCDEFGHILMNOPRSTUV',DC=[];
 /* niveaux difficiles : faux amis (mots presque identiques) et lettres leurres (lettres des mots, surtout leurs initiales) */
 let lure=null;
 if(HD){const all=WS.join(''),ini=WS.map(w=>w[0]).join('');lure=()=>rnd()<.55?ini[Math.floor(rnd()*ini.length)]:all[Math.floor(rnd()*all.length)];
  const nd=l<110?2:3;
  for(const w of [...WS].filter(x=>x.length>=5).sort(()=>rnd()-.5).slice(0,nd)){
   let v='';for(let t=0;t<40&&!v;t++){const i=1+Math.floor(rnd()*(w.length-1)),c=all[Math.floor(rnd()*all.length)];if(c!==w[i]){const x=w.slice(0,i)+c+w.slice(i+1);if(!WS.includes(x))v=x}}
   if(!v)continue;
   const C=[];
   for(let r0=0;r0<N;r0++)for(let c0=0;c0<N;c0++)for(const dd of dirs){
    const r1=r0+dd[0]*(v.length-1),c1=c0+dd[1]*(v.length-1);if(r1<0||r1>=N||c1<0||c1>=N)continue;
    let ov=0,bad=false;for(let k=0;k<v.length;k++){const ch=g[r0+dd[0]*k][c0+dd[1]*k];if(ch){if(ch===v[k])ov++;else{bad=true;break}}}
    if(!bad&&ov<v.length)C.push([r0,c0,dd]);
   }
   if(!C.length)continue;
   const[r0,c0,dd]=C[Math.floor(rnd()*C.length)];
   for(let k=0;k<v.length;k++)g[r0+dd[0]*k][c0+dd[1]*k]=v[k];
   DC.push(v);
  }}''')
RR("g[a][b]=AL[Math.floor(rnd()*AL.length)];","g[a][b]=lure?lure():AL[Math.floor(rnd()*AL.length)];")
RR("return msP={l,N,WS,g,pos};","return msP={l,N,WS,g,pos,DC};")
RR("const {N,WS,g,pos}=msBuild(lv),F=","const {N,WS,g,pos,DC}=msBuild(lv),F=")
RR("let nw=lv>=14&&!st.get('dgn',0);if(nw)st.set('dgn',1);","let nw=lv>=14&&!st.get('dgn',0);if(nw)st.set('dgn',1);let nh=lv>=100&&lv<120&&!st.get('hdn',0);if(nh)st.set('hdn',1);act.dhx=()=>{nh=false;d()};")
RR("frame(`${nw?`<div class=\"dnote\"","frame(`${nh?`<div class=\"dnote\" role=\"note\"><span>Niveaux difficiles : mots qui se chevauchent, faux amis (mots presque identiques), lettres leurres et plus de mots à trouver.</span><button data-a=\"dhx\" aria-label=\"Fermer\">OK</button></div>`:''}${nw?`<div class=\"dnote\"")
RR("else{d();msg('Pas ici…')}};","else{d();msg(DC.includes(str)||DC.includes([...str].reverse().join(''))?'Faux ami !':'Pas ici…')}};")
