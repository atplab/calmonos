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
