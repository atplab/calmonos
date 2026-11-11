def RR(a,c):
    global h
    assert h.count(a)==1,a
    h=h.replace(a,c)
RR("if(x.av&&typeof x.av==='object'){const t=+x.av.t||0","if(x.fv&&typeof x.fv==='object'&&Array.isArray(x.fv.l)&&(+x.fv.t||0)>((o.fv&&o.fv.t)||0))o.fv={l:x.fv.l.filter(i=>typeof i==='string'&&/^[a-z0-9]{1,16}$/.test(i)).slice(0,12),t:+x.fv.t||0};\n  if(x.av&&typeof x.av==='object'){const t=+x.av.t||0")
RR("o.av,Object.entries(o.sg).sort()","o.av,o.fv&&o.fv.l,Object.entries(o.sg).sort()")
RR("M.w=socWord();M.q=socAq()}","M.w=socWord();M.q=socAq();{const l=favs().slice(0,12);if(!M.fv||JSON.stringify(M.fv.l)!==JSON.stringify(l))M.fv={l,t:Date.now()}}}")
RR("av:M.av||{k:'',v:'',t:0},g:Object.assign","av:M.av||{k:'',v:'',t:0},fv:M.fv||{l:[],t:0},g:Object.assign")
RR('<div class="sy-h">Progression</div>${pr}<div class="sy-h">Aquarium</div>','<div class="sy-h">Progression</div>${pr}${socFv(id,self?M.fv:p&&p.fv,self)}<div class="sy-h">Aquarium</div>')
RR("function socProfile(id,M,p,av,nameOf){","""function socFv(id,fv,self){
 const l=((fv&&fv.l)||[]).map(i=>ALL.find(g=>g.id===i)).filter(g=>g&&!gHid(g.id));
 let o='<div class="sy-h">Jeux favoris</div>'+(l.length?`<div class="fvl">${l.map(g=>`<span class="fvc"><i>${g.ic||''}</i>${esc(g.n||g.t)}</span>`).join('')}</div>`:'<p class="note" style="margin:0">'+(self?'Tes jeux favoris (étoile ★) apparaîtront ici.':'Aucun jeu favori pour l’instant.')+'</p>');
 if(!self)o+='<div class="sy-h">Jouer ensemble</div><div class="fvp">'+[['scrabble','Scrabble'],['chess','Échecs'],['uno','Uno'],['airhockey','Air hockey']].map(([k,t])=>{const g=ALL.find(x=>x.id===k);return`<button class="btn alt" data-a="socPlay" data-v="${k}:${esc(id)}">${g?g.ic:''} ${t}</button>`}).join('')+'</div>';
 return o}
function socProfile(id,M,p,av,nameOf){""")
