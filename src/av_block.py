RR("else if(!k)o.av={k:'',v:'',t}","else if(k==='f'&&typeof v==='string'&&/^[a-z0-9]{1,16}$/.test(v))o.av={k,v,t};else if(!k)o.av={k:'',v:'',t}")
RR(" if(a&&a.k==='e')return`<span class=\"fr-av em\""," if(a&&a.k==='f'){const f=FISH.find(x=>x.id===a.v);if(f)return`<span class=\"fr-av fi\" style=\"--h:${h};--fb:${f.b}\" aria-hidden=\"true\">${fishSVG(f)}</span>`}\n if(a&&a.k==='e')return`<span class=\"fr-av em\"")
RR("aria-label=\"Personnage ${e}\">${e}</button>`).join('')}</div>${SO.ms?","aria-label=\"Personnage ${e}\">${e}</button>`).join('')}</div>${socFishAv(a)}${SO.ms?")
RR("function socSetAv(k,v){",r'''function socFishAv(a){const A=aqRead(),n=FISH.filter(f=>A.f[f.id]).length;
 return`<p class="note" style="margin:14px 0 8px">Ou choisis un poisson ou animal marin de ton aquarium (${n} / ${FISH.length}) :</p><div class="pf-em pf-fi" role="group" aria-label="Poissons">${FISH.map(f=>{const ok=!!A.f[f.id],on=!!(a&&a.k==='f'&&a.v===f.id);return`<button class="pf-e pf-f${on?' on':''}${ok?'':' lk'}" data-a="socAvF" data-v="${f.id}" aria-pressed="${on}" aria-label="${esc(f.n)}${ok?'':' (à débloquer dans l’aquarium)'}"${ok?'':' disabled'}>${fishSVG(f)}${ok?'':'<i aria-hidden="true">🔒</i>'}</button>`}).join('')}</div>`}
function socSetAv(k,v){''')
RR("socAvX:()=>socSetAv('',''),","socAvX:()=>socSetAv('',''),socAvF:v=>{if(FISH.some(f=>f.id===v)&&aqRead().f[v])socSetAv('f',v)},")
