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
