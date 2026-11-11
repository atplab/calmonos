#!/bin/bash
set -e
cd /tmp/claude-0/-home-claude/3d7f4fc1-f8a6-597b-88d5-0c7ad635827d/scratchpad
python3 patch_v36.py && for d in remote*.diff; do patch -s -F3 --no-backup-if-mismatch /mnt/user-data/outputs/nuit-de-neige-2.html < "$d" || exit 1; done && python3 - <<'PY'
import re
h=open('/mnt/user-data/outputs/nuit-de-neige-2.html',encoding='utf-8').read()
# bouton Accueil sur les écrans de niveau terminé
ARR='<span class="nxi" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>'
GRD='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6.5" height="6.5" rx="1.8"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.8"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.8"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.8"/></svg>'
for o,n in [('<button class="btn" data-a="next" data-v="${lv+1}">Niveau suivant</button>','<button class="nxb" data-a="next" data-v="${lv+1}"><span>Niveau suivant</span>'+ARR+'</button>'),('<button class="btn alt" data-a="pick">Choisir un niveau</button>','<button class="pkb" data-a="pick">'+GRD+'Choisir un niveau</button>'),('<button class="btn" data-a="soNext">Niveau suivant</button>','<button class="nxb" data-a="soNext"><span>Niveau suivant</span>'+ARR+'</button>')]:
    assert o in h,o
    h=h.replace(o,n)
SEA=r'''document.body.classList.toggle('seabg',id==='match3');document.body.classList.toggle('felt',id==='uno');document.body.classList.toggle('chbg',id==='chess');if(id==='match3'&&!document.getElementById('seadeco')){const d=document.createElement('div');d.id='seadeco';d.className='m3sea seadeco';d.setAttribute('aria-hidden','true');d.innerHTML=[8,22,35,50,63,77,90].map((x,k)=>`<span class="m3bu" style="left:${x}%;--s:${6+k%3*4}px;--d:${5+k%4*1.7}s;animation-delay:-${k*1.3}s"></span>`).join('')+[['tortue','',20,34,0],['meduse',' r',52,26,-9],['raie','',80,30,-17]].map(f=>`<span class="m3fi${f[1]}" style="top:${f[2]}%;--t:${f[3]}s;animation-delay:${f[4]}s">${fishSVG(FISH.find(q=>q.id===f[0]))}</span>`).join('');document.body.appendChild(d)}'''
T0="document.body.classList.toggle('g',!!g);"
assert h.count(T0)==1,'theme introuvable'
h=h.replace(T0,T0+SEA,1)
AC_='<button class="hmb" data-a="tab" data-v="games" aria-label="Retour à l’accueil des jeux"><span class="hmi" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/></svg></span>Accueil</button>'
for o,n in [('data-a="pick">'+GRD+'Choisir un niveau</button></section>`;','data-a="pick">'+GRD+'Choisir un niveau</button>'+AC_+'</section>`;'),('data-a="soBk">Retour</button>','data-a="soBk">Retour</button>'+AC_),('data-a="cbBk">Retour</button>','data-a="cbBk">Retour</button>'+AC_),('data-a="cdBk">Retour</button>','data-a="cdBk">Retour</button>'+AC_)]:
    assert o in h,o
    h=h.replace(o,n)
# pas de zoom : viewport verrouillé + gestes de pincement, double-tap et ctrl+molette bloqués
h=h.replace('initial-scale=1, viewport-fit=cover','initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',1)
h=h.replace('</head>','<style>html,body{touch-action:manipulation;-webkit-text-size-adjust:100%}</style><script>["gesturestart","gesturechange","gestureend"].forEach(function(t){document.addEventListener(t,function(e){e.preventDefault()},{passive:false})});document.addEventListener("touchmove",function(e){if(e.touches.length>1)e.preventDefault()},{passive:false});document.addEventListener("wheel",function(e){if(e.ctrlKey)e.preventDefault()},{passive:false});document.addEventListener("keydown",function(e){if((e.ctrlKey||e.metaKey)&&["+","-","=","0"].indexOf(e.key)>-1)e.preventDefault()})</script></head>',1)
# retouches après les diffs distants
for a,c in [("music.gain.setTargetAtTime(p.music?(","music.gain.setTargetAtTime(p.music&&!(PLK&&(!PLPA||document.hidden))?("),
  ("function sHudPos(){","function sHudPos(){try{const k=$('.shb[data-a=sbook]');if(k)document.body.style.setProperty('--pby',k.getBoundingClientRect().top.toFixed(0)+'px')}catch(e){}"),
  ("let AC,mg,music;","let AC,mg,music,PLK=null,PLPA=false;"+open('v57/plmus.js').read()),
  ("function apply(){if(!AC||!music)return;","function apply(){if(!AC||!music)return;try{bgOn()?acHold():acFree()}catch(e){}"),
  ("const DEF={vol:60,music:true,sfx:true,vib:true,snow:true,breath:false,kbd:'qwerty',sky:'auto'}","const DEF={vol:60,music:true,sfx:true,vib:true,snow:true,breath:false,kbd:'qwerty',sky:'auto',bg:false}"),
  ("${tg('breath',","${tg('bg','Musique en arrière-plan','La musique continue quand tu quittes l’application')}${tg('breath',"),
  ("SKY_B=[17,18]","SKY_B=[15.75,16.75]"),("const follow=y0=>{if(sc)return;","const follow=y0=>{return;if(sc)return;"),
  ("function pCross(r){",open('v57/ana2d.js').read()+open('v57/ana2.js').read()+"function pCross(r){"),
  ("m3Mus(id==='match3'&&!x&&!xa);","m3Mus(id==='match3'&&!x&&!xa);ttMus(id==='tetris'&&!x&&!xa);cbMus(id==='colorie'&&!x&&!xa);unMus(id==='uno'&&!x&&!xa);chMus(id==='cherche'&&!x&&!xa);lfMus(id==='sudoku'&&!x&&!xa);ecMus(id==='chess'&&!x&&!xa);ahMus(id==='airhockey'&&!x&&!xa);bkMus(id==='brick'&&!x&&!xa);fiMus(id==='flow'&&!x&&!xa);"),
  ("(typeof aqMu==='object'&&aqMu.on)||(typeof xmMu==='object'&&xmMu.on)?.08:.6","(typeof aqMu==='object'&&aqMu.on)||(typeof xmMu==='object'&&xmMu.on)||(typeof ttMu==='object'&&ttMu.on)||(typeof cbMu==='object'&&cbMu.on)||(typeof unMu==='object'&&unMu.on)||(typeof chMu==='object'&&chMu.on)||(typeof lfMu==='object'&&lfMu.on)||(typeof ecMu==='object'&&ecMu.on)||(typeof ahMu==='object'&&ahMu.on)||(typeof bkMu==='object'&&bkMu.on)||(typeof fiMu==='object'&&fiMu.on)?.08:.6"),
  ("if(typeof xmMu==='object')xmMu.vol(p.music)","if(typeof xmMu==='object')xmMu.vol(p.music);if(typeof ttMu==='object')ttMu.vol(p.music);if(typeof cbMu==='object')cbMu.vol(p.music);if(typeof unMu==='object')unMu.vol(p.music);if(typeof chMu==='object')chMu.vol(p.music);if(typeof lfMu==='object')lfMu.vol(p.music);if(typeof ecMu==='object')ecMu.vol(p.music);if(typeof ahMu==='object')ahMu.vol(p.music);if(typeof bkMu==='object')bkMu.vol(p.music);if(typeof fiMu==='object')fiMu.vol(p.music)"),
  ("ana:pAna,","ana:pAna2,flow:pFlow,g2048:p2048,tetris:pTetris,brick:pBrick,"),
  ("function pCross(r){",open('v57/flow.js').read()+open('v57/g2048.js').read()+open('v57/tetris.js').read()+open('v57/brick.js').read()+open('v57/ttmus.js').read()+open('v57/cbmus.js').read()+open('v57/unmus.js').read()+open('v57/chmus.js').read()+open('v57/lfmus.js').read()+open('v57/ecmus.js').read()+open('v57/ahmus.js').read()+open('v57/bkmus.js').read()+open('v57/fimus.js').read()+"function pCross(r){"),
  ("\n];\nconst SP=[",",\n{id:'flow',n:'Relie les points',ic:'◍',a:'#ff8fb8',b:'#5a3a9a',t:'Les fils de couleur',s:'Relie chaque paire de points de même couleur avec un fil, sans croiser les autres fils. Remplis toute la grille pour terminer.',w:'Tous les fils sont reliés, la grille brille de toutes ses couleurs.'},\n{id:'g2048',n:'2048',ic:'❆',a:'#9fd3ff',b:'#3a5aa8',t:'Les flocons qui s’assemblent',s:'Fais glisser la grille : tous les flocons partent ensemble, et deux flocons pareils se rejoignent pour doubler. Fais naître le flocon objectif du niveau.',w:'Le grand flocon est né, il scintille au-dessus de la grille.'},\n{id:'tetris',n:'Tèconta',ic:'▦',a:'#8fd8ff',b:'#3d4fa0',t:'Les blocs de glace',s:'Des blocs de glace tombent doucement. Range-les pour remplir des lignes entières : elles fondent en flocons. Fais le nombre de lignes du niveau.',w:'Toutes les lignes ont fondu en une pluie de flocons.'},\n{id:'brick',n:'Casse-briques',ic:'▬',a:'#c8adff',b:'#3f3a8f',t:'Les briques de glace',s:'Glisse pour viser, lâche pour lancer la balle, puis glisse pour déplacer la plateforme. Ne laisse pas tomber la balle et casse toutes les briques.',w:'Toutes les briques ont fondu en poussière de neige.'}\n];\nconst SP=["),
  ("'quiz','cherche'],GD=","'quiz','cherche','flow','g2048','tetris','brick'],GD="),
  ("sudoku:40,ana:46}","sudoku:40,ana:50,flow:75,g2048:50,tetris:66,brick:50}"),
  ("Utilise-les toutes, sans en oublier une, pour retrouver le mot caché. Parfois, plusieurs mots se cachent dans les mêmes lettres.","Relie-les pour retrouver tous les mots qui s’entremêlent dans la grille. Les autres mots trouvés rapportent des flocons.")]:
    assert h.count(a)==1,a
    h=h.replace(a,c)
import re as _re
n0=h.count("!document.hidden&&prefs().music)")
assert n0>=10,n0
h=h.replace("!document.hidden&&prefs().music)","(!document.hidden||bgOn())&&prefs().music)")
h,nn=_re.subn(r"(\w+Mus)\(id==='(\w+)'&&!x&&!xa\)",lambda m:m.group(1)+"((PLK&&!PLPA)?PLK==='"+m.group(2)+"':id==='"+m.group(2)+"'&&!x&&!xa)",h)
assert nn==10,nn
B='<button class="shb" data-a="sbook"'
PB='<button class="plfab${PLK?\' on\':\'\'}" data-a="plr" aria-label="Lecteur de musique"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg></button>'
SB='return`<div class="sbar" id="sbar">'
assert h.count(SB)==2
h=h.replace(SB,'return`'+PB+'<div class="sbar" id="sbar">')
open('/mnt/user-data/outputs/nuit-de-neige-2.html','w',encoding='utf-8').write(h)
s=re.findall(r'<script[^>]*>(.*?)</script>',h,re.S)
open('v12/chk.js','w').write('\n'.join(x for x in s if len(x)>1000))
PY
node --check v12/chk.js && echo SYNTAX_OK
