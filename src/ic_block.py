for _a,_b in [('<i>${g.ic}</i>','<i>${gSv(g)}</i>'),('<div class="rc-ic">${g.ic}</div>','<div class="rc-ic">${gSv(g)}</div>'),('<div class="guni">${g.ic}</div>','<div class="guni">${gSv(g)}</div>'),('<i>${g.ic||\'\'}</i>','<i>${gSv(g)}</i>'),("${g?g.ic:''} ${t}","${g?gSv(g):''} ${t}")]:
    assert h.count(_a)>=1,_a
    h=h.replace(_a,_b)

RR("<h2>${id==='ana'||id==='mots'?'Jeu de mots':g.t}</h2><p>${g.s}</p></section>","<h2>${id==='ana'||id==='mots'?'Jeu de mots':g.t}</h2><p>${id==='ana'?ALL.find(x=>x.id==='mots').s:g.s}</p></section>")
for _a,_b in [(" · +${rw('ana')} ❄",""),(" terminés · +'+rw(id)+' ❄'"," terminés'"),("t’attend · +'+rw(id)+' ❄'","t’attend'"),(" · +${rw('uno')} ❄ à la première victoire","")]:
    assert h.count(_a)>=1,_a
    h=h.replace(_a,_b)
RR("rw=id=>RWD[id]||5","rw=(id,l)=>{let b=RWD[id]||5;if(id==='caches'&&l>=0)b+=caTier(l);return b}")
RR("first=!st.get(lk,false),r=first?rw(cur):1;","first=!st.get(lk,false),r=first?rw(cur,lv):1;")
RR("""<p class="note" style="text-align:center">Les mots se lisent à l’horizontale, à la verticale${lv>=14?' ou en diagonale':''}, dans les deux sens. Glisse ton doigt sur le mot, ou touche sa première puis sa dernière lettre.</p>""","")
RR("Retrouve-les un à un.',w:'Tous les mots sont sortis","Retrouve-les un à un. Les mots se lisent à l’horizontale, à la verticale ou en diagonale, dans les deux sens : glisse ton doigt sur le mot, ou touche sa première puis sa dernière lettre.',w:'Tous les mots sont sortis")
RR("if(id==='caches'&&l>=0)b+=caTier(l);return b}","if(id==='caches'&&l>=0){if(caOn()&&l>=99)return l===99?10:6;b+=caTier(l)}return b}")
_s=h.index('<div class="opts"><section class="rc rcx pt-${id}"')
_m="infArea(id):''}</section>"
_e1=h.index(_m,_s)+len(_m)-len('</section>')
_card=h[_s+len('<div class="opts">'):_e1]
_bs=_e1+len('</section>')
_xs=h.index("${xon?`<section class=\"rc xm\"",_bs)
_ds=h.index('<div class="dd pt-${id}${lvOpen',_xs)
_de="}).join('')}</div></div></div></div></div>"
_dz=h.index(_de,_ds)
_book=h[_bs:_xs]
_xm=h[_xs:_ds]
_dd=h[_ds:_dz]+"}).join('')}</div></div></div></div>"
_xa_s=_xm.index('`')+1
_xa_e=_xm.index('`:(!g.soon')
_xmA=_xm[_xa_s:_xa_e]
_xl_s=_xm.index('`',_xa_e+3)+1
_xl_e=_xm.rindex("`:'')}")
_xmB=_xm[_xl_s:_xl_e]
_new='<div class="opts">${xon&&xdn<NLX?`'+_xmA+"`:''}"+_card+_dd+'</section>'+_book+"${xon?(xdn>=NLX?`"+_xmA+"`:''):''}</div>"
h=h[:_s]+_new+h[_dz+len(_de):]
RR("ic:'⇄',a:'#c9a2f0',b:'#6b4aa8'","ic:'✦',a:'#a99cf0',b:'#5458AB'")
RR("const gSv=g=>GSV[g.id]?","const gSv=g=>(g.id==='ana'&&(g=ALL.find(x=>x.id==='mots')),GSV[g.id])?")
RR("""<section class="glass story pt-${id}"><i>${gSv(g)}</i><h2>${id==='ana'||id==='mots'?'Jeu de mots':g.t}</h2><p>${id==='ana'?ALL.find(x=>x.id==='mots').s:g.s}</p></section>""","""<details class="glass story pt-${id} gdet"${window.GDO!==false?' open':''}><summary><i>${gSv(g)}</i><h2>${id==='ana'||id==='mots'?'Jeu de mots':g.t}</h2><span class="gdc" aria-hidden="true"></span></summary><p>${id==='ana'?ALL.find(x=>x.id==='mots').s:g.s}</p></details>""")
RR("</script>\n</body>","document.addEventListener('toggle',e=>{if(e.target.classList&&e.target.classList.contains('gdet'))window.GDO=e.target.open},true);\n</script>\n</body>")
# --- Uno : carte Histoire au même format ---
_a=h.index('return`<section class="glass play unst">')
_b=h.index('</section>`}',_a)+len('</section>`}')
_arw='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
_u='''return`<section class="rc rcx pt-uno" data-g="🃏"><div class="rc-ic">${gSv(ALL.find(x=>x.id==='uno'))}</div><div class="rc-t"><small>${dn?'Continuer':'Commencer'} · Histoire</small><b>Niveau ${nx+1}</b><span>${esc(T[0])} · ${dn} sur ${UNN} terminés</span></div><button class="rc-go" data-a="unSt" data-v="${nx}">Jouer'''+_arw+'''</button><div class="rcx-b"><p class="note" style="margin:0">${esc(T[1])} Tu as ${c.hm} cartes, ${c.nb>1?'les '+c.nb+' bots en ont':'le bot en a'} ${c.hb}.</p></div><div class="dd pt-uno${lvOpen?' open':''}"><button class="dd-h" data-a="dd" aria-expanded="${lvOpen}" aria-controls="unlvl"><span><b>Choisir un niveau</b><small>${dn} / ${UNN} terminés</small></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><div class="dd-l" id="unlvl"><div class="dd-i"><div class="lvg">${[...Array(UNN).keys()].map(i=>`<button class="lv ${unSDone(i)?'d':i===nx?'nx':'far'}" data-a="unSt" data-v="${i}"${i>nx?' disabled':''} aria-label="Niveau ${i+1}${unSDone(i)?', terminé':''}">${i+1}</button>`).join('')}</div></div></div></div></section>`}'''
h=h[:_a]+_u+h[_b:]
# --- Air hockey : carte Commencer + Choisir un niveau fusionnées ---
_c0='<section class="rc pt-airhockey" data-g="🏒"><div class="rc-ic">🏒</div><div class="rc-t"><small>${dn?\'Continuer\':\'Commencer\'}'
assert h.count(_c0)==1
_i=h.index(_c0)
_e='Jouer${AR}</button></section>'
_j=h.index(_e,_i)+len(_e)-len('</section>')
_d0=h.index('<div class="dd pt-airhockey${lvOpen',_j)
_de="}).join('')}</div></div></div></div></div>`;"
_dz=h.index(_de,_d0)
_dd=h[_d0:_dz]+"}).join('')}</div></div></div></div>"
h=h[:_i]+h[_i:_j].replace('class="rc pt-airhockey"','class="rc rcx pt-airhockey"',1)+_dd+h[_j:_d0]+"</div>`;"+h[_dz+len(_de):]
# --- Uno : Histoire / Contre des bots / Avec des amis = modes ---
RR("unCfg:v=>{const[k,x]=v.split(':');","unMode:v=>{if(!/^(story|bots|fr)$/.test(v))return;st.set('uno:mode',v);unHubDraw()},unCfg:v=>{const[k,x]=v.split(':');")
RR("function unHubDraw(){","""function unMSeg(m){const L=[['story','Histoire'],['bots','Bots'],['fr','Amis']];return`<section class="glass play unmd"><div class="rcx-t"><small>Mode de jeu</small></div><div class="plseg unseg" role="group" aria-label="Mode de jeu">${L.map(x=>`<button class="${m===x[0]?'on':''}" data-a="unMode" data-v="${x[0]}" aria-pressed="${m===x[0]}">${x[1]}</button>`).join('')}</div></section>`}
function unHubDraw(){""")
RR("let h='';\n h+=unRooms();\n h+=unStoryCard();","let h='';const md=st.get('uno:mode','story');\n h+=unRooms();")
_a=h.index('h+=`<section class="glass play"><h2>Contre des bots</h2>')
_b=h.index('</section>`;',_a)+len('</section>`;')
_blk=h[_a:_b]
h=h[:_a]+"h+=unMSeg(md);if(md==='story')h+=unStoryCard();if(md==='bots')"+_blk+h[_b:]
RR("h+=unFriends();","if(md==='fr')h+=unFriends();")
RR("""<section class="glass play"><h2>Partie en cours</h2><p class="note" style="margin:0 0 12px">Contre ${sv.S.length-1} bot${sv.S.length>2?'s':''} · ${sv.H[0].length} carte${sv.H[0].length>1?'s':''} en main</p>""","""<section class="glass play"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin:0 0 12px"><h2 style="margin:0">Partie en cours</h2>${sv.sty!=null?'<small class="note" style="margin:0">Mode histoire</small>':''}</div>${sv.sty!=null?'':`<p class="note" style="margin:0 0 12px">Contre ${sv.S.length-1} bot${sv.S.length>2?'s':''}</p>`}""")
RR("cherche:20,tournade:40","cherche:30,tournade:40")
RR("</script>\n</body>","""/* Cherche et trouve : 10 nouveaux niveaux (21 à 30) ; les arts suivent les niveaux, les niveaux de fêtes passent à 31-40 */
try{if(CHART.length===30&&!window.__chfix){window.__chfix=1;[CHART[11],CHART[19]]=[CHART[19],CHART[11]];CHART.splice(20,0,...CHN30);CHU.forEach(u=>{if(u.ar===11)u.ar=19})}}catch(e){}
try{if(!st.get('chm30',0)){st.set('chm30',1);for(let i=9;i>=0;i--){const a=20+i,b=30+i;for(const pre of ['c:cherche:','k:cherche:','p:cherche:']){const v=st.get(pre+a,undefined);if(v!==undefined&&v!==null&&v!==false&&v!==''){st.set(pre+b,v);st.set(pre+a,pre==='p:cherche:'?null:false)}}}}}catch(e){}
</script>
</body>""")
RR("""${sv.sty!=null?'<small class="note" style="margin:0">Mode histoire</small>':''}</div>${sv.sty!=null?'':`<p class="note" style="margin:0 0 12px">Contre ${sv.S.length-1} bot${sv.S.length>2?'s':''}</p>`}""","""<small class="note" style="margin:0">${sv.sty!=null?'Mode histoire':'Contre '+(sv.S.length-1)+' bot'+(sv.S.length>2?'s':'')}</small></div>""")
# --- nouveau jeu : Cuisine (salon de thé) ---
RR("function pCross(r){",open('v57/cuisine.js').read()+"\nfunction pCross(r){")
RR("flow:pFlow,g2048:p2048,","flow:pFlow,cuisine:pCuis,g2048:p2048,")
RR("\n{id:'flow',n:'Relie les points'","\n{id:'cuisine',n:'Cuisine',ic:'🍔',a:'#ff9a8a',b:'#7a3a8a',nox:1,t:'Le Burger des Étoiles',s:'Des petits voisins de Zeni viennent manger au restaurant. Compose chaque burger, hot-dog ou plateau de sushis comme ils le demandent, puis sers-les. Pas de chrono : seuls tes gestes les font patienter. En mode arcade, les plats sont déjà prêts : sers vite le bon, avant la fin du temps.',w:'Tout le monde est reparti le ventre plein, avec un grand sourire.'},\n{id:'flow',n:'Relie les points'")
RR("'brick','planetes'],GD=","'brick','planetes','cuisine'],GD=")
RR("ana:50,flow:75,","ana:50,cuisine:30,flow:75,")
RR("cherche:4},rw=","cherche:4,cuisine:4},rw=")
RR("const gSv=g=>","GSV.cuisine='<path d=\"M4 11q0-6 8-6t8 6z\"/><path d=\"M3.5 14h17\"/><path d=\"M4 17h16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z\"/><path d=\"M9 8h.01M13 7.5h.01\"/>';const gSv=g=>")
# --- Cuisine : musiques ---
RR("function pCross(r){",open('v57/kzmus.js').read()+"\nfunction pCross(r){")
RR("(typeof fiMu==='object'&&fiMu.on)?.08:.6)","(typeof fiMu==='object'&&fiMu.on)||(typeof kzMu==='object'&&kzMu.on)?.08:.6)")
RR("if(typeof fiMu==='object')fiMu.vol(p.music)}","if(typeof fiMu==='object')fiMu.vol(p.music);if(typeof kzMu==='object')kzMu.vol(p.music)}")
RR("fiMus((PLK&&!PLPA)?PLK==='flow':id==='flow'&&!x&&!xa);","fiMus((PLK&&!PLPA)?PLK==='flow':id==='flow'&&!x&&!xa);kzMus((id==='cuisine'||id==='peche')&&!x&&!xa);")
RR("const GSTEP={flow:0,","const GSTEP={cuisine:50,flow:0,")
# --- Cuisine : mode arcade ---
RR("function pCross(r){",open('v57/kzarc.js').read()+"\nfunction pCross(r){")
RR("${INFN[id]||id==='mots'||id==='ana'?infArea(id):''}","${INFN[id]||id==='mots'||id==='ana'?infArea(id):''}${id==='cuisine'?kzModeArea():''}")
RR('<section class="rc rcx pt-${id}"','<section class="rc rcx pt-${id}${id===\'cuisine\'?\' kzc\'+(st.get(\'kz:mode\',\'\')===\'arc\'?\' kzarc\':\'\'):\'\'}"')

# --- nouveau jeu : Pêche ---
RR("function pCross(r){",open('v57/peche.js').read()+"\nfunction pCross(r){")
RR("const SP=[{id:'scrabble'","const SP=[{id:'peche',n:'Pêche',ic:'🎣',a:'#5aa8d8',b:'#2a3a7a',t:'Le lac aux étoiles',s:'Sur le ponton, Zeni lance sa ligne dans le lac endormi. Pêche tranquillement, vends tes prises contre des flocons… et peut-être croiseras-tu un poisson légendaire.',sp:''},{id:'scrabble'")
RR("v==='airhockey'?ahHub():","v==='airhockey'?ahHub():v==='peche'?pePlay():")
RR("const gSv=g=>","GSV.peche='<path d=\"M3 13c3-4 9-4 12 0-3 4-9 4-12 0z\"/><path d=\"M15 13l4-3v6z\"/><path d=\"M18 3v4a2 2 0 0 1-4 0\"/>';const gSv=g=>")
RR("FISH.push({id:'noel',n:'Poisson Père Noël',p:520,sh:'std',b:'#e8434f',f:'#ffd2d2',sp:'#fff',sa:1,sz:1.12,lk:20});","FISH.push({id:'noel',n:'Poisson Père Noël',p:520,sh:'std',b:'#e8434f',f:'#ffd2d2',sp:'#fff',sa:1,sz:1.12,lk:20});PEF.filter(f=>f.aq).forEach(f=>FISH.push({...f,p:2000,pe:1}));")
RR(""":`<button class="sb buy ${!UNL()&&fl<f.p?'low':''}" data-a="aqbuy" data-v="f:${f.id}">Acheter · ${f.p} ❄</button>`""",""":f.pe?`<span class="sb lk">Légendaire · à pêcher</span>`:`<button class="sb buy ${!UNL()&&fl<f.p?'low':''}" data-a="aqbuy" data-v="f:${f.id}">Acheter · ${f.p} ❄</button>`""")
RR("aqBuy=function(v){const[k,id]=v.split(':'),a","aqBuy=function(v){if(/^f:/.test(v)&&(FISH.find(x=>'f:'+x.id===v)||{}).pe)return;const[k,id]=v.split(':'),a")
# --- Pêche : dessins uniques des deux légendaires ---
_star=lambda x,y,r,c:'<path d="M%s %sl%s %s %s %s -%s %s -%s %s -%s -%s -%s -%s %s -%sz" fill="%s"/>'%(x,y-r,r*.3,r*.7,r*.7,r*.3,r*.7,r*.3,r*.3,r*.7,r*.3,r*.7,r*.7,r*.3,r*.7,r*.3,c)
_koi=('<ellipse cx="44" cy="24" rx="42" ry="28" fill="#ffe9a0" opacity=".16"/>'
 '<path d="M24 24C12 4 3 0-3 6 4 14 7 20 5 24 7 28 4 34-3 42 3 48 12 44 24 24Z" fill="#ffd27a" opacity=".85"/>'
 '<path d="M24 24C15 10 8 7 3 10 9 16 11 21 10 24 11 27 9 32 3 38 8 41 15 38 24 24Z" fill="#fff3d0" opacity=".7"/>'
 '<path d="M42 12Q50-2 64 10Z" fill="#ffd27a" opacity=".75"/><path d="M48 34q6 12 14 6Z" fill="#ffd27a" opacity=".7"/>'
 '<path d="M20 24C26 12 50 8 66 12 78 15 84 20 84 24 84 28 78 33 66 36 50 40 26 36 20 24Z" fill="#f8f6ff"/>'
 '<ellipse cx="48" cy="17" rx="10" ry="4.6" fill="#ff6a3a"/><ellipse cx="35" cy="29" rx="7" ry="3.6" fill="#ff6a3a"/><ellipse cx="58" cy="30" rx="5" ry="2.6" fill="#ff8a5a"/>'
 '<path d="M70 14a6 6 0 1 0 2 9a4.5 4.5 0 1 1 -2 -9z" fill="#ffd27a"/>'
 +_star(30,15,3.2,'#ffd27a')+_star(56,33,2.6,'#ffd27a')+_star(12,6,3,'#fff3d0')+_star(6,40,2.4,'#fff3d0')+
 '<circle cx="77" cy="21" r="2.5" fill="#fff"/><circle cx="77.6" cy="21.2" r="1.4" fill="#1b1b2f"/>'
 '<path d="M83 26q6 4 4 10M82 27q3 6-1 10" stroke="#ffd27a" stroke-width="1.2" fill="none" stroke-linecap="round"/>')
_raie=('<defs><linearGradient id="raGr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7affd0"/><stop offset=".5" stop-color="#8a8aff"/><stop offset="1" stop-color="#ff9ad5"/></linearGradient></defs>'
 '<ellipse cx="50" cy="24" rx="36" ry="28" fill="#9affe0" opacity=".14"/>'
 '<path d="M38 24C24 25 12 18 1 27" stroke="url(#raGr)" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+_star(1,27,4,'#fff6d0')+
 '<path d="M82 24C72 9 54-4 18 0 30 11 34 19 36 24 34 29 30 37 18 48 54 52 72 39 82 24Z" fill="url(#raGr)"/>'
 '<path d="M18 0q-4-6 4-7M18 48q-4 6 4 7" stroke="#c9a3ff" stroke-width="2" fill="none" stroke-linecap="round"/>'
 '<path d="M78 24C68 17 54 11 42 11 48 17 51 21 52 24 51 27 48 31 42 37 54 37 68 31 78 24Z" fill="#fff" opacity=".28"/>'
 '<g stroke="#fff" stroke-opacity=".7" stroke-width=".8" fill="none"><path d="M30 8 44 13 56 9 64 15M30 40 44 35 56 39 64 33"/></g>'
 '<g fill="#fff6d0">'+''.join('<circle cx="%s" cy="%s" r="1.6"/>'%(x,y) for x,y in [(30,8),(44,13),(56,9),(64,15),(30,40),(44,35),(56,39),(64,33)])+'</g>'
 '<path d="M82 24 88 20.5 85 24 88 27.5Z" fill="#c9a3ff"/>'
 '<circle cx="75" cy="17" r="2.6" fill="#fff"/><circle cx="75.7" cy="17.2" r="1.4" fill="#1b1b2f"/><circle cx="75" cy="31" r="2.6" fill="#fff"/><circle cx="75.7" cy="31.2" r="1.4" fill="#1b1b2f"/>')
RR("function fishSVG(f){","FSH.koiciel=f=>'"+_koi.replace("'","\\'")+"';FSH.raieaur=f=>'"+_raie.replace("'","\\'")+"';\nfunction fishSVG(f){")
# --- déblocages : Cascade après le niveau 100 des Mots cachés ; Pêche avec l'aquarium niveau 2 ---
RR("""<button class="${m?'on':''}" data-a="caMode" data-v="cascade">Cascade</button>""","""<button class="${m?'on':''}${caUnl()?'':' lk'}" data-a="caMode" data-v="${caUnl()?'cascade':'lk'}">${caUnl()?'':'🔒 '}Cascade</button>""")
RR("function gLock(id){return ","function gLock(id){if(id==='peche'){try{return !UNL()&&aqTier(aqRead())<2}catch(e){return false}}return ")
RR("if(s)s.textContent='🔒 Étape '+GSTEP[id];","if(s)s.textContent=id==='peche'?'🔒 Aquarium niveau 2':'🔒 Étape '+GSTEP[id];")
RR("gLk:v=>{const g=ALL.find(x=>x.id===v),n=GSTEP[v]||0;gToast(","gLk:v=>{const g=ALL.find(x=>x.id===v),n=GSTEP[v]||0;if(v==='peche'){gToast('La pêche se débloque quand ton aquarium atteint le niveau 2.');return}gToast(")
RR("caMode=v=>{try{","caMode=v=>{if(v==='lk'){msg('Le mode Cascade se débloque après avoir terminé le niveau 100.');return}try{")
# --- Planète : fruits / orbite / sous l'eau ; nouveau jeu Blocs (caché pour l'instant) ---
RR("t:'Les planètes qui fusionnent',s:'Laisse tomber des planètes dans le bocal. Deux planètes identiques fusionnent en une plus grosse. Fais naître la planète de l’objectif sans dépasser la ligne.'","t:'Fruits, planètes et trésors marins',s:'Laisse tomber des fruits dans le bocal : deux pareils fusionnent en un plus gros. En mode Orbite, ce sont des planètes attirées vers le centre ; sous l’eau, des trésors marins qui remontent vers la surface. Fais naître celui de l’objectif sans dépasser la ligne.'")
RR("function pCross(r){",open('v57/blocs.js').read()+"\nfunction pCross(r){")
RR("flow:pFlow,cuisine:pCuis,","flow:pFlow,cuisine:pCuis,blocs:pBlocs,")
RR("\n{id:'cuisine',n:'Cuisine'","\n{id:'blocs',n:'Blocs',ic:'▦',a:'#5aa8ff',b:'#2a3a8a',nox:1,t:'Les blocs de couleur',s:'Glisse les pièces dans la grille de 8 × 8. Une ligne ou une colonne pleine disparaît. Trois pièces arrivent à la fois : elles rentrent toujours, mais il faut bien les placer. Atteins le score de l’objectif.',w:'La grille scintille de toutes ses couleurs.'},\n{id:'cuisine',n:'Cuisine'")
RR("'brick','planetes','cuisine'],GD=","'brick','planetes','cuisine','blocs'],GD=")
RR("ana:50,cuisine:30,","ana:50,cuisine:30,blocs:40,")
RR("const GAV={","const GAV={blocs:[2099,0,1],")
RR("const gSv=g=>","GSV.blocs='<rect x=\"4\" y=\"4\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"13\" y=\"4\" width=\"7\" height=\"7\" rx=\"1.5\"/><rect x=\"4\" y=\"13\" width=\"7\" height=\"7\" rx=\"1.5\"/>';const gSv=g=>")
RR("ckey=g=>'c:'+(g==='planetes'&&st.get('pl:mode','')==='orbite'?'planetes_o':","ckey=g=>'c:'+(g==='planetes'&&st.get('pl:mode','')==='orbite'?'planetes_o':g==='planetes'&&st.get('pl:mode','')==='eau'?'planetes_e':")
