#!/bin/bash
set -e
cd /tmp/claude-0/-home-claude/3d7f4fc1-f8a6-597b-88d5-0c7ad635827d/scratchpad
python3 patch_v36.py && for d in remote*.diff; do patch -s -F3 --no-backup-if-mismatch /mnt/user-data/outputs/nuit-de-neige-2.html < "$d" || exit 1; done && python3 - <<'PY'
import re
h=open('/mnt/user-data/outputs/nuit-de-neige-2.html',encoding='utf-8').read()
# retouches après les diffs distants
for a,c in [("const follow=y0=>{if(sc)return;","const follow=y0=>{return;if(sc)return;"),
  ("function pCross(r){",open('v57/ana2d.js').read()+open('v57/ana2.js').read()+"function pCross(r){"),
  ("m3Mus(id==='match3'&&!x&&!xa);","m3Mus(id==='match3'&&!x&&!xa);ttMus(id==='tetris'&&!x&&!xa);cbMus(id==='colorie'&&!x&&!xa);unMus(id==='uno'&&!x&&!xa);chMus(id==='cherche'&&!x&&!xa);"),
  ("(typeof aqMu==='object'&&aqMu.on)||(typeof xmMu==='object'&&xmMu.on)?.08:.6","(typeof aqMu==='object'&&aqMu.on)||(typeof xmMu==='object'&&xmMu.on)||(typeof ttMu==='object'&&ttMu.on)||(typeof cbMu==='object'&&cbMu.on)||(typeof unMu==='object'&&unMu.on)||(typeof chMu==='object'&&chMu.on)?.08:.6"),
  ("if(typeof xmMu==='object')xmMu.vol(p.music)","if(typeof xmMu==='object')xmMu.vol(p.music);if(typeof ttMu==='object')ttMu.vol(p.music);if(typeof cbMu==='object')cbMu.vol(p.music);if(typeof unMu==='object')unMu.vol(p.music);if(typeof chMu==='object')chMu.vol(p.music)"),
  ("ana:pAna,","ana:pAna2,flow:pFlow,g2048:p2048,tetris:pTetris,brick:pBrick,"),
  ("function pCross(r){",open('v57/flow.js').read()+open('v57/g2048.js').read()+open('v57/tetris.js').read()+open('v57/brick.js').read()+open('v57/ttmus.js').read()+open('v57/cbmus.js').read()+open('v57/unmus.js').read()+open('v57/chmus.js').read()+"function pCross(r){"),
  ("\n];\nconst SP=[",",\n{id:'flow',n:'Relie les points',ic:'◍',a:'#ff8fb8',b:'#5a3a9a',t:'Les fils de couleur',s:'Relie chaque paire de points de même couleur avec un fil, sans croiser les autres fils. Remplis toute la grille pour terminer.',w:'Tous les fils sont reliés, la grille brille de toutes ses couleurs.'},\n{id:'g2048',n:'2048',ic:'❆',a:'#9fd3ff',b:'#3a5aa8',t:'Les flocons qui s’assemblent',s:'Fais glisser la grille : tous les flocons partent ensemble, et deux flocons pareils se rejoignent pour doubler. Fais naître le flocon objectif du niveau.',w:'Le grand flocon est né, il scintille au-dessus de la grille.'},\n{id:'tetris',n:'Tèconta',ic:'▦',a:'#8fd8ff',b:'#3d4fa0',t:'Les blocs de glace',s:'Des blocs de glace tombent doucement. Range-les pour remplir des lignes entières : elles fondent en flocons. Fais le nombre de lignes du niveau.',w:'Toutes les lignes ont fondu en une pluie de flocons.'},\n{id:'brick',n:'Casse-briques',ic:'▬',a:'#c8adff',b:'#3f3a8f',t:'Les briques de glace',s:'Glisse pour viser, lâche pour lancer la balle, puis glisse pour déplacer la plateforme. Ne laisse pas tomber la balle et casse toutes les briques.',w:'Toutes les briques ont fondu en poussière de neige.'}\n];\nconst SP=["),
  ("'quiz','cherche'],GD=","'quiz','cherche','flow','g2048','tetris','brick'],GD="),
  ("sudoku:40,ana:46}","sudoku:40,ana:50,flow:75,g2048:50,tetris:66,brick:50}"),
  ("Utilise-les toutes, sans en oublier une, pour retrouver le mot caché. Parfois, plusieurs mots se cachent dans les mêmes lettres.","Relie-les pour retrouver tous les mots qui s’entremêlent dans la grille. Les autres mots trouvés rapportent des flocons.")]:
    assert h.count(a)==1,a
    h=h.replace(a,c)
open('/mnt/user-data/outputs/nuit-de-neige-2.html','w',encoding='utf-8').write(h)
s=re.findall(r'<script[^>]*>(.*?)</script>',h,re.S)
open('v12/chk.js','w').write('\n'.join(x for x in s if len(x)>1000))
PY
node --check v12/chk.js && echo SYNTAX_OK
