/* Bouton retour du téléphone : remonte d’un écran dans le jeu au lieu de quitter l’application */
(()=>{
 const q=s=>document.querySelector(s);
 const toast=t=>{let d=q('#bkt');if(!d){d=document.createElement('div');d.id='bkt';d.style.cssText='position:fixed;left:50%;bottom:calc(96px + env(safe-area-inset-bottom,0px));translate:-50% 0;z-index:99999;padding:10px 16px;border-radius:99px;background:rgba(30,34,60,.9);color:#fff;font:600 13px system-ui,sans-serif;pointer-events:none;transition:opacity .3s;max-width:86vw;text-align:center';document.body.appendChild(d)}d.textContent=t;d.style.opacity='1';clearTimeout(d._t);d._t=setTimeout(()=>d.style.opacity='0',2200)};
 const goBack=()=>{
  const sh=q('#aqsh.open');if(sh){aqShut();return true}
  const ed=q('#app .aqfs');if(ed&&typeof aqEd!=='undefined'&&aqEd){act.aqed();return true}
  const b=q('#app [data-a=back],#app [data-a=chBk],#app [data-a=scrBk],#app [data-a=unBk],#app [data-a=soBk]');if(b){b.click();return true}
  const on=q('#nav button.on');if(on&&on.dataset.v!=='games'&&!q('#nav[hidden]')){q('#nav [data-v=games]').click();return true}
  return false;
 };
 const push=()=>{try{history.pushState({nb:1},'')}catch(e){}};
 try{history.replaceState({nb:0},'');push()}catch(e){}
 addEventListener('popstate',()=>{
  if(goBack()){push();return}
  toast('Appuie encore sur retour pour quitter');
  setTimeout(push,2400);
 });
})();
/* Mots cachés passe de 20 à 40 niveaux : la progression des niveaux de fêtes (21 à 30) glisse vers 41 à 50, une seule fois */
(()=>{try{if(st.get('mig:cach40',0))return;const P=[ckey('caches')+':','p:caches:','k:caches:'];
 for(let i=9;i>=0;i--)P.forEach(pf=>{const o=st.get(pf+(20+i),null);if(o){st.set(pf+(40+i),o);st.set(pf+(20+i),null)}});
 st.set('mig:cach40',1)}catch(e){}})();
/* Mots cachés passe de 40 à 60 niveaux : les niveaux de fêtes (41 à 50) glissent vers 61 à 70, une seule fois */
(()=>{try{if(st.get('mig:cach60',0))return;const P=[ckey('caches')+':','p:caches:','k:caches:'];
 for(let i=9;i>=0;i--)P.forEach(pf=>{const o=st.get(pf+(40+i),null);if(o){st.set(pf+(60+i),o);st.set(pf+(40+i),null)}});
 st.set('mig:cach60',1)}catch(e){}})();
/* Tournade passe de 8 à 24 niveaux : les niveaux de fêtes (9 à 18) glissent vers 25 à 34, une seule fois */
(()=>{try{if(st.get('mig:tn24',0))return;const P=[ckey('tournade')+':','p:tournade:','k:tournade:'];
 for(let i=9;i>=0;i--)P.forEach(pf=>{const o=st.get(pf+(8+i),null);if(o){st.set(pf+(24+i),o);st.set(pf+(8+i),null)}});
 st.set('mig:tn24',1)}catch(e){}})();
/* Social et synchronisation du compte : s’ils ne répondent pas, on relance la connexion tout seul (toutes les 20 s,
   au retour sur l’app et quand le réseau revient), et un bouton « Réessayer maintenant » le fait tout de suite */
(()=>{
 const socRe=()=>{if(!(SO.st==='slow'||SO.st==='err')||SO.got)return false;clearTimeout(SO.t10);try{SO.unsub&&SO.unsub()}catch(e){}SO.unsub=null;SO.col=null;SO.st='';socInit();return true};
 const accRe=()=>{if(!(Sy.state==='slow'||Sy.state==='err')||!st.get('sync:acc',false))return false;accOff();accInit();return true};
 const all=()=>{try{socRe()}catch(e){}try{accRe()}catch(e){}};
 act.socRetry=()=>{try{if(!SO.got){clearTimeout(SO.t10);try{SO.unsub&&SO.unsub()}catch(e){}SO.unsub=null;SO.col=null;SO.st='';socInit()}}catch(e){}try{accRe()}catch(e){}};
 setInterval(()=>{if(!document.hidden)all()},20000);
 addEventListener('online',all);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(all,800)});
})();
/* Sudoku passe de 8 à 28 niveaux : les niveaux de fêtes (9 à 18) glissent vers 29 à 38, une seule fois */
(()=>{try{if(st.get('mig:sd28',0))return;const P=[ckey('sudoku')+':','p:sudoku:','k:sudoku:'];
 for(let i=9;i>=0;i--)P.forEach(pf=>{const o=st.get(pf+(8+i),null);if(o){st.set(pf+(28+i),o);st.set(pf+(8+i),null)}});
 st.set('mig:sd28',1)}catch(e){}})();
/* Tournade 24 → 38 niveaux et Sudoku 28 → 40 niveaux : les niveaux de fêtes glissent d’autant, une seule fois */
(()=>{try{const mv=(g,from,to,flag)=>{if(st.get(flag,0))return;const P=[ckey(g)+':','p:'+g+':','k:'+g+':'];for(let i=9;i>=0;i--)P.forEach(pf=>{const o=st.get(pf+(from+i),null);if(o){st.set(pf+(to+i),o);st.set(pf+(from+i),null)}});st.set(flag,1)};
 mv('tournade',24,38,'mig:tn38');mv('sudoku',28,40,'mig:sd40')}catch(e){}})();
(()=>{try{if(st.get('mig:tn40',0))return;const P=[ckey('tournade')+':','p:tournade:','k:tournade:'];for(let i=9;i>=0;i--)P.forEach(pf=>{const o=st.get(pf+(38+i),null);if(o){st.set(pf+(40+i),o);st.set(pf+(38+i),null)}});st.set('mig:tn40',1)}catch(e){}})();
(()=>{try{if(st.get('mig:ph40',0))return;const P=[ckey('phrase')+':','p:phrase:','k:phrase:'];for(let i=9;i>=0;i--)P.forEach(pf=>{const o=st.get(pf+(20+i),null);if(o){st.set(pf+(40+i),o);st.set(pf+(20+i),null)}});st.set('mig:ph40',1)}catch(e){}})();

(()=>{try{if(st.get('mig:memo30',0))return;const P=[ckey('memo')+':','p:memo:','k:memo:'];for(let i=9;i>=0;i--)P.forEach(pf=>{const o=st.get(pf+(20+i),null);if(o){st.set(pf+(30+i),o);st.set(pf+(20+i),null)}});st.set('mig:memo30',1)}catch(e){}})();

(()=>{try{if(st.get('mig:mz30',0))return;const P=[ckey('maze')+':','p:maze:','k:maze:'];for(let i=9;i>=0;i--)P.forEach(pf=>{const o=st.get(pf+(20+i),null);if(o){st.set(pf+(30+i),o);st.set(pf+(20+i),null)}});st.set('mig:mz30',1)}catch(e){}})();

(()=>{try{if(st.get('mig:m340',0))return;const P=[ckey('match3')+':','p:match3:','k:match3:'];for(let i=9;i>=0;i--)P.forEach(pf=>{const o=st.get(pf+(20+i),null);if(o){st.set(pf+(40+i),o);st.set(pf+(20+i),null)}});st.set('mig:m340',1)}catch(e){}})();

(()=>{try{if(st.get('mig:m360',0))return;const P=[ckey('match3')+':','p:match3:','k:match3:'],mv=(a,b)=>P.forEach(pf=>{const o=st.get(pf+a,null);st.set(pf+b,o);st.set(pf+a,null)});
 for(let i=9;i>=0;i--)mv(40+i,60+i);
 const M={24:25,25:26,26:28,27:29,28:31,29:32,30:34,31:35,32:37,33:40,34:43,35:46,36:48,37:51,38:54,39:57};
 for(let i=39;i>=24;i--)mv(i,M[i]);
 const l=st.get('last',null);if(l&&l.g==='match3'&&!l.daily){if(l.lv>=40)l.lv+=20;else if(M[l.lv])l.lv=M[l.lv];st.set('last',l)}
 st.set('mig:m360',1)}catch(e){}})();
(()=>{try{if(st.get('mig:m365',0))return;const P=[ckey('match3')+':','p:match3:','k:match3:'],mv=(a,b)=>P.forEach(pf=>{const o=st.get(pf+a,null);st.set(pf+b,o);st.set(pf+a,null)});
 for(let i=9;i>=0;i--)mv(60+i,65+i);for(let i=59;i>=54;i--)mv(i,i+5);
 const l=st.get('last',null);if(l&&l.g==='match3'&&!l.daily&&l.lv>=54){l.lv+=5;st.set('last',l)}
 st.set('mig:m365',1)}catch(e){}})();
(()=>{try{if(st.get('mig:m370',0))return;const P=[ckey('match3')+':','p:match3:','k:match3:'],mv=(a,b)=>P.forEach(pf=>{const o=st.get(pf+a,null);st.set(pf+b,o);st.set(pf+a,null)});
 for(let i=9;i>=0;i--)mv(65+i,70+i);
 const M={59:55,55:56,60:57,61:58,56:59,62:60,57:61,63:62,64:63,58:64},V={};P.forEach(pf=>Object.keys(M).forEach(k=>{V[pf+k]=st.get(pf+k,null)}));P.forEach(pf=>Object.keys(M).forEach(k=>st.set(pf+M[k],V[pf+k])));
 const l=st.get('last',null);if(l&&l.g==='match3'&&!l.daily){if(l.lv>=65)l.lv+=5;else if(M[l.lv]!==undefined)l.lv=M[l.lv];st.set('last',l)}
 st.set('mig:m370',1)}catch(e){}})();

(()=>{try{if(st.get('mig:dm11',0))return;const P=[ckey('demenage')+':','p:demenage:','k:demenage:'];for(let i=9;i>=0;i--)P.forEach(pf=>{const o=st.get(pf+(10+i),null);st.set(pf+(11+i),o);st.set(pf+(10+i),null)});for(let i=0;i<10;i++)st.set('p:demenage:'+i,null);st.set('mig:dm11',1)}catch(e){}})();
