import json as _j
_G='gen/'
# Jeu de mots : 60 → 99
_M=open(_G+'mots.txt').read().strip('\n')
RR("arène rêne née ère are\n","arène rêne née ère are\n"+_M+"\n")
RR("const NLS={mots:60,","const NLS={mots:99,croises:49,")
# Mots croisés : 8 → 49
_i=h.index('const CW=[')+9;_d=0;_k=_i
while True:
    if h[_k]=='[':_d+=1
    elif h[_k]==']':
        _d-=1
        if not _d:break
    _k+=1
_cw=_j.loads(h[_i:_k+1]);assert len(_cw)==18
_cw=_cw[:8]+_j.load(open(_G+'cw.json'))+_cw[8:]
h=h[:_i]+_j.dumps(_cw,ensure_ascii=False,separators=(',',':'))+h[_k+1:]
# Sudoku : 40 → 70 (images 41 à 70 nouvelles, fêtes après)
RR("sudoku:40,","sudoku:70,")
RR(",22,22,22,22,22,22,22,22,22,22,22,22][Math.min(39,",",22,22,22,22,22,22,22,22,22,22,22,22"+",22"*30+"][Math.min(69,")
_p=open(_G+'px.txt').read().strip().split('\n');_px=[]
for _a in range(0,len(_p),2):
    _r=_p[_a+1].split();assert len(_r)==9 and all(len(x)==9 for x in _r),_p[_a];_px.append([_p[_a],_r])
assert len(_px)==30
_i=h.index('SDPX=[')+5;_d=0;_k=_i
while True:
    if h[_k]=='[':_d+=1
    elif h[_k]==']':
        _d-=1
        if not _d:break
    _k+=1
_sx=_j.loads(h[_i:_k+1]);assert len(_sx)==50
_sx=_sx[:40]+_px+_sx[40:]
h=h[:_i]+_j.dumps(_sx,ensure_ascii=False)+h[_k+1:]
# Coloriage : 40 → 60 dessins (les 40 premiers inchangés)
RR("const CDN=40,","const CDN=60,")
RR("q=l/(CDN-1),th=l%10","q=Math.min(1,l/39),th=l%10")
assert h.count("l*40/(CDN-1)")>=1;h=h.replace("l*40/(CDN-1)","l*40/39")
# fêtes : la progression glisse
RR("mv('tournade',24,38,'mig:tn38');mv('sudoku',28,40,'mig:sd40')","mv('tournade',24,38,'mig:tn38');mv('sudoku',28,40,'mig:sd40');mv('sudoku',40,70,'mig:sd70');mv('mots',60,99,'mig:mo99');mv('croises',8,49,'mig:cw49')")

# Déménagement : dix pièces de fêtes refaites
RR("function pDemen2(r){",open('v57/demx.js').read()+"\nfunction pDemen2(r){")
RR("R=DRM[i]||DRM[0],ids=X?DXI[i%DXI.length]:R.items,sc=dScene(DRM[i]?i:0)","R=X?DXR[i%DXR.length]:(DRM[i]||DRM[0]),ids=R.items,sc=X?dSceneX(R):dScene(DRM[i]?i:0)")
RR("if(!r&&!X&&dStory[lv]&&!st.get(ckey('demenage')+':'+lv,false))dmOv(`<small>${dStory[lv][0]}</small><p class=\"sfq\">${dStory[lv][1]}</p>`,'Ouvrir les cartons');","if(!r&&X&&!st.get(ckey('demenage')+':'+lv,false))dmOv(`<small>Fêtes · ${R.n}</small><p class=\"sfq\">${R.s}</p>`,'Ouvrir les cartons');else if(!r&&!X&&dStory[lv]&&!st.get(ckey('demenage')+':'+lv,false))dmOv(`<small>${dStory[lv][0]}</small><p class=\"sfq\">${dStory[lv][1]}</p>`,'Ouvrir les cartons');")
# Labyrinthe : 30 → 50 niveaux
_mz=_j.load(open(_G+'mz.json'))
import re as _re
for _k,_v in [('MZS',_mz['S']),('MZB',_mz['B']),('MZP',_mz['P']),('MZK',_mz['K'])]:
    _m=_re.search(_k+r'=(\[[^\n]*?\]\]|\[[^\[\]\n]*\])',h);_a=_j.loads(_re.sub(r'(?<![0-9])\.',r'0.',_m.group(1)));assert len(_a)==40,_k
    _a=_a[:30]+_v+_a[30:];h=h[:_m.start(1)]+_j.dumps(_a,separators=(',',':'))+h[_m.end(1):]
RR("(l>=30?l-10:l)*7919","(l>=50?l-30:l)*7919")
RR("maze:30,","maze:50,")
RR("mv('croises',8,49,'mig:cw49')","mv('croises',8,49,'mig:cw49');mv('maze',30,50,'mig:mz50')")
# Modes calme / régulier
RR("const ALL=[...G,ANA,","""/* mode de jeu : calme (jeux stimulants cachés, niveaux ×1,5 flocon, jeux stimulants sans flocons) ou régulier */
const DMSTIM=['uno','airhockey','cuisine','tetris','brick'],APM=()=>st.get('app:mode','reg'),dmR=(id,v)=>APM()==='calm'?(DMSTIM.includes(id)?0:Math.round(v*1.5)):v;
function apMode(v){const H=new Set(st.get('g:hide',[]));DMSTIM.forEach(i=>v==='calm'?H.add(i):H.delete(i));st.set('g:hide',[...H]);st.set('app:mode',v)}
function apChoose(){if(document.getElementById('apm'))return;const d=document.createElement('div');d.className='sfr';d.id='apm';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');
 d.innerHTML=`<div class="glass sfc apmc"><small>Bienvenue</small><h2>Comment veux-tu jouer ?</h2><button class="apmo" data-a="apSet" data-v="calm"><b>🌙 Mode calme</b><span>Pour jouer en douceur, à ton rythme. Les jeux plus stimulants (Uno, air hockey, cuisine, Tèconta, casse-briques) sont cachés, et les niveaux donnent 1,5 fois plus de flocons.</span></button><button class="apmo" data-a="apSet" data-v="reg"><b>✦ Mode régulier</b><span>Tous les jeux, tels quels. Pour les joueurs réguliers.</span></button><p class="note">Tu pourras changer de mode dans les réglages.</p></div>`;document.body.appendChild(d)}
setTimeout(()=>{try{if(st.get('app:mode',null)===null)apChoose()}catch(e){}},700);
const ALL=[...G,ANA,""")
RR("r=first?rw(cur,lv):1;\n fl+=r;st.set('fl',fl);","r=first?rw(cur,lv):1,rf=dmR(cur,r);\n fl+=rf;st.set('fl',fl);")
RR("<p class=\"big\">${first?'+'+r+' flocons':'Niveau refait : +1 flocon'}</p>","<p class=\"big\">${rf?(first?'+'+rf+' flocons':'Niveau refait : +'+rf+' flocon'+(rf>1?'s':'')):'Mode calme : ce jeu ne donne pas de flocons'}</p>")
RR("r=first?3+Math.floor(SL.lv/10):1}else{st.set('sol:inf',st.get('sol:inf',0)+1);r=2}\n fl+=r;","r=first?3+Math.floor(SL.lv/10):1}else{st.set('sol:inf',st.get('sol:inf',0)+1);r=2}\n r=dmR('solitaire',r);fl+=r;")
RR("else if(AH.mode==='net'&&win)r=2;\n if(r){","else if(AH.mode==='net'&&win)r=2;\n r=dmR('airhockey',r);if(r){")
RR("const r=first?2+Math.floor(CB.l/8):1;fl+=r;","const r=dmR('colorie',first?2+Math.floor(CB.l/8):1);fl+=r;")
RR("const r=first?3+Math.floor(CD.l/8):1;fl+=r;","const r=dmR('colorie',first?3+Math.floor(CD.l/8):1);fl+=r;")
RR("S.rwd=r;if(r)scrGain(r);return}","r=dmR('uno',r);S.rwd=r;if(r)scrGain(r);return}")
RR("const n=S.S.length,r=S.w===UN.me?2+2*(n-1):1;scrGain(r);return}","const n=S.S.length,r=dmR('uno',S.w===UN.me?2+2*(n-1):1);if(r)scrGain(r);return}")
RR("scrGain(S.w===me?10:2)}","{const q=dmR('uno',S.w===me?10:2);if(q)scrGain(q)}}")
RR("${tg('breath','Respiration entre les niveaux'","<div class=\"tg pk\"><span>Mode de jeu<small>${APM()==='calm'?'Calme : jeux stimulants cachés, niveaux ×1,5 flocon':'Régulier : tous les jeux, tels quels'}</small></span><div class=\"seg\" role=\"radiogroup\" aria-label=\"Mode de jeu\">${[['calm','Calme'],['reg','Régulier']].map(([v,l])=>`<button role=\"radio\" aria-checked=\"${APM()===v}\" class=\"${APM()===v?'on':''}\" data-a=\"apPref\" data-v=\"${v}\">${l}</button>`).join('')}</div></div>${tg('breath','Respiration entre les niveaux'")
RR("function prefScreen(){","act.apSet=v=>{apMode(v==='calm'?'calm':'reg');const e=document.getElementById('apm');if(e)e.remove();if(!playing)home()};act.apPref=v=>{apMode(v==='calm'?'calm':'reg');prefScreen()};\nfunction prefScreen(){")
