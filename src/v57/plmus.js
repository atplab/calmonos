/* musique en arrière-plan : la sortie audio passe par un <audio> (écran éteint) ; coupure douce sinon ; lecteur de musique */
const bgOn=()=>!!(prefs().bg||PLK);
function acHold(){if(!AC||!mg||AC.__md)return;try{const d=AC.createMediaStreamDestination(),a=new Audio();a.srcObject=d.stream;a.setAttribute('playsinline','');mg.connect(d);mg.disconnect(AC.destination);AC.__md=a;a.play().catch(acFree);
 }catch(e){AC.__md=null}}
function acFree(){if(!AC||!AC.__md)return;try{mg.connect(AC.destination);AC.__md.pause();AC.__md.srcObject=null}catch(e){}AC.__md=null}
document.addEventListener('visibilitychange',()=>{try{if(PLK&&PLPA)plApply()}catch(e){}try{if(!AC)return;if(document.hidden){if(bgOn())return;mg.gain.cancelScheduledValues(AC.currentTime);mg.gain.setTargetAtTime(0,AC.currentTime,.025);clearTimeout(window.__acT);window.__acT=setTimeout(()=>{if(document.hidden&&!bgOn())AC.suspend()},200)}else{clearTimeout(window.__acT);if(AC.state==='suspended')AC.resume().then(apply,apply);else apply()}}catch(e){}});
const PLT=[
 ['m3','Marée d’étoiles','Constellations',()=>m3Mus,'#3fc0cc','#0e4f78'],
 ['tetris','Blocs de glace','Tèconta',()=>ttMus,'#8fd8ff','#3d4fa0'],
 ['colorie','Pinceaux d’hiver','Coloriage',()=>cbMus,'#ffb36b','#a23d8a'],
 ['uno','Table de velours','Uno',()=>unMus,'#2a9d68','#0d3b29'],
 ['cherche','Jardin sous la neige','Cherche et trouve',()=>chMus,'#9ad98a','#2b6a4a'],
 ['sudoku','Chiffres au calme','Sudoku',()=>lfMus,'#9a86e8','#2a1f66'],
 ['chess','La clairière','Échecs',()=>ecMus,'#7fb88a','#2b5f45'],
 ['airhockey','Glisse sur la glace','Air hockey',()=>ahMus,'#bfe8ff','#3a5aa8'],
 ['brick','Rue du givre','Casse-briques',()=>bkMus,'#c8adff','#3f3a8f'],
 ['flow','Fils de lumière','Fils de couleur',()=>fiMus,'#ff8fb8','#5a3a9a']];
let PLC=0,PLT0=0,PLE=0,PLI=0;
/* illustrations (viewBox 100) */
function plArt(k){const t=PLT.find(x=>x[0]===k),id='pa'+k;let b='';
 const W='#fff';
 if(k==='m3')b=`<path d="M0 70q12-8 25 0t25 0 25 0 25 0v30H0z" fill="#fff" opacity=".18"/><path d="M0 82q12-8 25 0t25 0 25 0 25 0v18H0z" fill="#fff" opacity=".18"/><path d="M50 18l4.5 11 12 .8-9.3 7.6 3 11.6L50 42l-10.2 7 3-11.6-9.3-7.6 12-.8z" fill="#ffe9a8"/><ellipse cx="26" cy="64" rx="9" ry="5.5" fill="#ffd18a"/><path d="M35 64l7-5v10z" fill="#ffd18a"/><circle cx="72" cy="56" r="4" fill="none" stroke="#fff" stroke-width="1.4"/><circle cx="80" cy="42" r="2.4" fill="none" stroke="#fff" stroke-width="1.2"/><circle cx="18" cy="38" r="2.6" fill="none" stroke="#fff" stroke-width="1.2"/>`;
 else if(k==='tetris')b=`<g fill="#fff" opacity=".92"><rect x="30" y="26" width="18" height="18" rx="3"/><rect x="48" y="26" width="18" height="18" rx="3"/><rect x="66" y="26" width="18" height="18" rx="3"/><rect x="48" y="44" width="18" height="18" rx="3"/></g><g fill="#fff" opacity=".4"><rect x="12" y="66" width="18" height="18" rx="3"/><rect x="30" y="66" width="18" height="18" rx="3"/><rect x="48" y="66" width="18" height="18" rx="3"/><rect x="66" y="66" width="18" height="18" rx="3"/></g>`;
 else if(k==='colorie')b=`<circle cx="38" cy="42" r="22" fill="#ff5d7a" opacity=".85"/><circle cx="62" cy="42" r="22" fill="#ffd24a" opacity=".85"/><circle cx="50" cy="62" r="22" fill="#4fc3ff" opacity=".85"/><path d="M20 88L78 22" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M78 22l6-8" stroke="#5a2d1a" stroke-width="5" stroke-linecap="round"/>`;
 else if(k==='uno')b=`<g transform="rotate(-18 50 62)"><rect x="24" y="22" width="34" height="50" rx="5" fill="#e5464f"/></g><g transform="rotate(0 50 62)"><rect x="33" y="20" width="34" height="50" rx="5" fill="#ffd24a"/></g><g transform="rotate(18 50 62)"><rect x="42" y="22" width="34" height="50" rx="5" fill="#3f8cff"/></g><ellipse cx="50" cy="45" rx="9" ry="14" fill="#fff" transform="rotate(30 50 45)"/>`;
 else if(k==='cherche')b=`<g fill="#fff" opacity=".35"><circle cx="20" cy="76" r="8"/><circle cx="34" cy="84" r="6"/><circle cx="80" cy="30" r="7"/></g><circle cx="44" cy="44" r="22" fill="#fff" fill-opacity=".22" stroke="#fff" stroke-width="5"/><path d="M60 60l22 22" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M36 50q8-14 16-4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`;
 else if(k==='sudoku')b=`<g stroke="#fff" stroke-opacity=".6" stroke-width="1.4"><path d="M20 20h60v60H20zM40 20v60M60 20v60M20 40h60M20 60h60"/></g><g fill="#fff" font-family="Georgia,serif" font-size="14" text-anchor="middle"><text x="30" y="35">5</text><text x="50" y="55">3</text><text x="70" y="75">9</text><text x="70" y="35" opacity=".6">1</text><text x="30" y="75" opacity=".6">7</text></g>`;
 else if(k==='chess')b=`<path d="M0 100V78l10-16 8 10 10-24 12 22 8-10 14-26 16 30 8-8 14 20v24z" fill="#0b2e22" opacity=".55"/><text x="50" y="66" font-size="54" text-anchor="middle" fill="#fff">♞</text>`;
 else if(k==='airhockey')b=`<g stroke="#fff" stroke-opacity=".5" stroke-width="1.6" fill="none"><circle cx="50" cy="50" r="22"/><path d="M0 50h100"/></g><circle cx="38" cy="64" r="14" fill="#e5464f"/><circle cx="38" cy="64" r="6" fill="#a8222c"/><circle cx="66" cy="38" r="8" fill="#22283a"/>`;
 else if(k==='brick')b=`<g fill="#fff" opacity=".9"><rect x="10" y="16" width="24" height="10" rx="2"/><rect x="38" y="16" width="24" height="10" rx="2"/><rect x="66" y="16" width="24" height="10" rx="2"/></g><g fill="#fff" opacity=".55"><rect x="24" y="30" width="24" height="10" rx="2"/><rect x="52" y="30" width="24" height="10" rx="2"/></g><circle cx="58" cy="64" r="5" fill="#ffe9a8"/><rect x="34" y="84" width="34" height="7" rx="3.5" fill="#fff"/>`;
 else b=`<g fill="none" stroke-width="5" stroke-linecap="round"><path d="M22 74q14-40 30-20t26-22" stroke="#ffe9a8"/><path d="M22 28q22 6 28 26t28 14" stroke="#7fe0ff"/></g><g fill="#fff"><circle cx="22" cy="74" r="6"/><circle cx="78" cy="32" r="6"/><circle cx="22" cy="28" r="6"/><circle cx="78" cy="68" r="6"/></g>`;
 return`<svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t[4]}"/><stop offset="1" stop-color="${t[5]}"/></linearGradient></defs><rect width="100" height="100" fill="url(#${id})"/>${b}</svg>`}
const plFmt=x=>Math.floor(x/60)+':'+String(Math.floor(x%60)).padStart(2,'0');
const plEl=()=>PLK&&!PLPA?(Date.now()-PLT0)/1000:PLE;
function plSess(){const ms=navigator.mediaSession;if(!ms)return;try{const t=PLT[PLC];if(!PLK){ms.metadata=null;ms.playbackState='none';return}
 ms.playbackState=PLPA?'paused':'playing';
 const svg=plArt(t[0]).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" '),im=new Image();
 const set=src=>{ms.metadata=new MediaMetadata({title:t[1],artist:'Nuit de neige 2 · '+t[2],album:'Musiques des jeux',artwork:src?[{src,sizes:'512x512',type:'image/png'}]:[]})};
 set('');im.onload=()=>{try{const c=document.createElement('canvas');c.width=c.height=512;c.getContext('2d').drawImage(im,0,0,512,512);set(c.toDataURL('image/png'))}catch(e){}};im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
 [['play',()=>act.plpl()],['pause',()=>act.plpa()],['nexttrack',()=>act.plnx(1)],['previoustrack',()=>act.plnx(-1)]].forEach(([n,f])=>{try{ms.setActionHandler(n,f)}catch(e){}})}catch(e){}}
/* vraie piste audio (quasi inaudible, 25 Hz) lue en boucle par un <audio> : c’est elle qui fait reconnaître l’appli comme lecteur de musique (notification, écran verrouillé) */
let PLA=null;
function plTone(on){try{if(!on){if(PLA)PLA.pause();return}
 if(!PLA){const sr=8000,n=sr*60*2,u=new Uint8Array(44+n),dv=new DataView(u.buffer),w=(o,t)=>{for(let i=0;i<t.length;i++)dv.setUint8(o+i,t.charCodeAt(i))};
  w(0,'RIFF');dv.setUint32(4,36+n,true);w(8,'WAVEfmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,1,true);dv.setUint32(24,sr,true);dv.setUint32(28,sr*2,true);dv.setUint16(32,2,true);dv.setUint16(34,16,true);w(36,'data');dv.setUint32(40,n,true);
  for(let i=0;i<n/2;i++)dv.setInt16(44+i*2,Math.round(24*Math.sin(2*Math.PI*25*i/sr)),true);
  PLA=new Audio(URL.createObjectURL(new Blob([u],{type:'audio/wav'})));PLA.loop=true;PLA.setAttribute('playsinline','')}
 PLA.play().catch(()=>{})}catch(e){}}
function plApply(){plTone(!!PLK&&!PLPA);PLT.forEach(t=>{try{t[3]()(PLK&&!PLPA?t[0]===PLK:!(PLK&&document.hidden)&&typeof cur!=='undefined'&&cur===(t[0]==='m3'?'match3':t[0]))}catch(e){}});apply()}
function plTick(){const o=document.getElementById('plp');if(!o){clearInterval(PLI);PLI=0;return}const e=plEl(),a=document.getElementById('ple'),b=document.getElementById('plpb');if(a)a.textContent=plFmt(e);if(b)b.style.width=((e%240)/240*100).toFixed(1)+'%'}
const plFav=()=>{try{const f=st.get('pl:fav',[]);return Array.isArray(f)?f:[]}catch(e){return[]}};
const plHe=(k,f)=>`<button class="plhe${f.includes(k)?' on':''}" data-a="plfv" data-v="${k}" aria-label="${f.includes(k)?'Retirer des favoris':'Ajouter aux favoris'}" aria-pressed="${f.includes(k)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.6l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z"/></svg></button>`;
function plDraw(){let o=document.getElementById('plo');const sy=o?o.scrollTop:0;if(!o){o=document.createElement('div');o.id='plo';o.className='plo';document.body.appendChild(o);
  let y0=0,dy=0,dr=false;
  o.addEventListener('touchstart',e=>{dr=false;dy=0;if(o.scrollTop<=0&&e.touches.length===1&&!(e.target.closest&&e.target.closest('input'))){y0=e.touches[0].clientY;dr=null}},{passive:true});
  o.addEventListener('touchmove',e=>{if(dr===null||dr===true){const d=e.touches[0].clientY-y0;if(dr===null){if(d>8&&o.scrollTop<=0)dr=true;else if(d<-4){dr=false;return}}if(dr===true){e.preventDefault();dy=Math.max(0,d);o.style.transition='none';o.style.transform='translateY('+dy+'px)'}}},{passive:false});
  const en=()=>{if(dr===true){o.style.transition='transform .25s ease';if(dy>110)act.plx();else o.style.transform='';}dr=false};
  o.addEventListener('touchend',en);o.addEventListener('touchcancel',en)}
 const t=PLT[PLC],pl=!!PLK&&!PLPA,I=n=>`<svg viewBox="0 0 24 24" aria-hidden="true">${n}</svg>`,
  FV=plFav(),rw=r=>`<div class="plrw"><button class="plr${PLK===r[0]?' on':''}" data-a="plp" data-v="${r[0]}"><span class="plth">${plArt(r[0])}</span><span class="plrt"><b>${r[1]}</b><small>${r[2]}</small></span>${PLK===r[0]&&!PLPA?'<i class="pleq"><u></u><u></u><u></u></i>':''}</button>${plHe(r[0],FV)}</div>`,
  rows=PLT.map(rw).join(''),fvr=PLT.filter(r=>FV.includes(r[0])).map(rw).join('');
 o.innerHTML=`<div class="plp" id="plp" style="--c1:${t[4]};--c2:${t[5]}"><div class="plh"><button class="plcl" data-a="plx" aria-label="Fermer">${I('<path d="M6 9l6 6 6-6"/>')}</button><b>Lecteur de musique</b><span></span></div>
 <div class="plcv${pl?' pl':''}">${plArt(t[0])}</div><div class="plti"><div><b>${t[1]}</b><span>Nuit de neige 2 · ${t[2]}</span></div>${plHe(t[0],FV)}</div>
 <div class="plpbw"><div class="plpbr"><i id="plpb" style="width:0"></i></div><div class="plt"><span id="ple">${plFmt(plEl())}</span><span>en boucle</span></div></div>
 <div class="plct"><button data-a="plnx" data-v="-1" aria-label="Précédent">${I('<path d="M6 5v14M19 5L8 12l11 7z" fill="currentColor"/>')}</button><button class="plbig" data-a="plpl" aria-label="${pl?'Pause':'Lecture'}">${pl?I('<path d="M8 5v14M16 5v14" stroke-width="3.4"/>'):I('<path d="M8 5l12 7-12 7z" fill="currentColor"/>')}</button><button data-a="plnx" data-v="1" aria-label="Suivant">${I('<path d="M18 5v14M5 5l11 7-11 7z" fill="currentColor"/>')}</button></div>
 <label class="plvo">${I('<path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/>')}<input type="range" min="0" max="100" value="${prefs().vol}" data-r="vol" aria-label="Volume"><span id="vv" hidden></span></label>
 ${fvr?`<h3>Favoris</h3><div class="plls">${fvr}</div>`:''}<h3>Toutes les musiques</h3><div class="plls">${rows}</div>${PLK?'<button class="btn alt plsp" data-a="pls">Arrêter la lecture</button>':''}</div>`;
 if(!PLI)PLI=setInterval(plTick,1000);plTick();o.scrollTop=sy;
 document.querySelectorAll('.plfab').forEach(b=>b.classList.toggle('on',!!PLK&&!PLPA))}
function plStart(i){const p=prefs();if(!p.music){p.music=true;savePrefs()}PLC=(i+PLT.length)%PLT.length;PLK=PLT[PLC][0];PLPA=false;PLT0=Date.now();PLE=0;audio();plApply();plSess();plDraw()}
Object.assign(act,{plr:plDraw,plx:()=>{const o=document.getElementById('plo');if(!o||o.classList.contains('out'))return;o.classList.add('out');o.style.transition='transform .28s ease';o.style.transform='translateY(100%)';setTimeout(()=>{if(o.classList.contains('out'))o.remove()},290)},
 plp:v=>{const i=PLT.findIndex(t=>t[0]===v);if(PLK===v&&!PLPA){PLC=i;act.plpa();return}plStart(i)},
 plpl:()=>{if(!PLK)return plStart(PLC);if(PLPA){PLPA=false;PLT0=Date.now()-PLE*1000;audio();plApply();plSess();plDraw()}else act.plpa()},
 plpa:()=>{if(!PLK)return;PLE=plEl();PLPA=true;plApply();plSess();plDraw()},
 plfv:v=>{const f=plFav(),i=f.indexOf(v);if(i<0)f.push(v);else f.splice(i,1);st.set('pl:fav',f);plDraw()},
 plnx:v=>plStart(PLC+(+v||1)),
 pls:()=>{PLK=null;PLPA=false;PLE=0;plApply();plSess();plDraw()}});

act.plMode=v=>{if(v&&!plUnl(v))return msg(v==='eau'?'Le mode Sous l’eau se débloque après le niveau 20 des Fruits.':'Le mode Planètes se débloque après le niveau 50 des Fruits ou de Sous l’eau.');try{st.set('pl:mode',v||'')}catch(e){}hub('planetes')};

act.socPlay=v=>{const[k,f]=String(v).split(':');if(!f||!SO.P[f])return;const w=(fn,ms)=>setTimeout(fn,ms);
 if(k==='chess'){act.open('chess');w(()=>act.chInv(f),80)}
 else if(k==='scrabble'){act.scrOpen(f);w(()=>{const o=SC.G[f];if(SC.fid===f&&(!o||o.e))act.scNew()},1000)}
 else if(k==='uno'){act.open('uno');w(()=>{UN.cfg.fr=[f];act.unMake()},80)}
 else if(k==='airhockey'){act.open('airhockey');w(()=>act.ahAsk(f),80)}};

const INFN={g2048:1,tetris:1,planetes:1,caches:1,blocs:1};
const infKey=g=>g==='planetes'?(st.get('pl:mode','')==='orbite'?'o':st.get('pl:mode','')==='eau'?'u':'c'):'s';
const infKeyP=g=>g==='planetes'?'p'+infKey(g):g==='caches'?'ca':g==='blocs'?'bl':g;
const infTop=g=>{let a=null;try{a=(st.get('inf:'+g,{})||{})[infKey(g)]}catch(e){}if(typeof a==='number')a=[{s:a,t:0}];return Array.isArray(a)?a:[]};
const infBest=g=>(infTop(g)[0]||{s:0}).s;
const infAll=()=>{const k={};[['g2048','g2048','s'],['tetris','tetris','s'],['pc','planetes','c'],['po','planetes','o'],['ca','caches','s']].forEach(([q,g,m])=>{let a=null;try{a=(st.get('inf:'+g,{})||{})[m]}catch(e){}if(typeof a==='number')a=[{s:a}];const b=Array.isArray(a)&&a[0]?a[0].s:0;if(b>0)k[q]=b});return k};
const infAll5=()=>{const m={};[['g2048','g2048','s'],['tetris','tetris','s'],['pc','planetes','c'],['po','planetes','o'],['ca','caches','s']].forEach(([q,g,k])=>{let a=null;try{a=(st.get('inf:'+g,{})||{})[k]}catch(e){}if(typeof a==='number')a=[{s:a}];if(Array.isArray(a)&&a.length)m[q]=a.slice(0,30).map(x=>x.s).filter(n=>n>0)});return m};
const infSave=(g,s)=>{if(!(s>0))return false;let nw=false;try{const o=Object.assign({},st.get('inf:'+g,{})||{}),k=infKey(g);let a=infTop(g).slice();nw=!a.length||s>a[0].s;a.push({s,t:Date.now()});a.sort((x,y)=>y.s-x.s);o[k]=a.slice(0,30);st.set('inf:'+g,o)}catch(e){}
 try{socMine()}catch(e){}
 try{infLbSync()}catch(e){}
 return nw};
let infLB={},infLBp={},infLbBusy=false;
const infLbOn=()=>!!(window.__fb&&window.__fb.lbPut&&window.__fb.u);
async function infLbSync(){if(!infLbOn()||infLbBusy)return;infLbBusy=true;
 try{const sh=infShr(),k=sh==='p'?infAll():{},M=st.get('soc:me',null)||{},nm=(M.name||'Joueur').slice(0,24),done=Object.assign({},st.get('inf:ls',{})||{});
  for(const q of ['g2048','tetris','pc','po','ca']){const sig=k[q]?k[q]+'|'+nm:'',cu=done[q]||'';if(sig===cu)continue;
   try{if(sig)await window.__fb.lbPut(q,k[q],nm);else await window.__fb.lbDel(q);done[q]=sig;infLB={};infLBp={}}catch(e){}}
  st.set('inf:ls',done)}catch(e){}
 infLbBusy=false}
const IC_MP='<svg class="infic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c.4-3.4 3-5.2 6-5.2s5.6 1.8 6 5.2"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.4.2 3.8 1.8 4 4.5"/></svg>',IC_PL='<svg class="infic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><ellipse cx="12" cy="12" rx="10" ry="3.4" transform="rotate(-22 12 12)"/></svg>';
const IC_MD='<svg class="infic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="5"/><path d="M8.6 13.2 7 21l5-2.6 5 2.6-1.6-7.8"/></svg>',IC_LB='<svg class="infic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="12" width="5" height="8" rx="1"/><rect x="9.5" y="5" width="5" height="15" rx="1"/><rect x="16" y="14" width="5" height="6" rx="1"/></svg>';
const infShr=()=>{try{return st.get('inf:sh','')}catch(e){return''}};
function infDlg(inl){let d=$('#infd');if(!d){d=document.createElement('div');d.id='infd';if(inl){const h=document.querySelector('.rcx-b');if(h){d.className='infin';h.appendChild(d);return d}}d.className='infd';d.setAttribute('role','dialog');d.setAttribute('aria-modal','true');document.body.appendChild(d)}return d}
function infAsk(g){if(infShr()!==''||$('#infd'))return;const d=infDlg();d.dataset.t='ask';d.dataset.pg=g||'';
 d.innerHTML=`<div class="infb"><h2>Partager tes scores ?</h2><p>Tes records du mode infini peuvent apparaître dans les classements. Choisis qui peut les voir : tu pourras le changer plus tard dans les réglages.</p><button class="btn" data-a="infSh" data-v="p">Global (tout le monde)</button><button class="btn alt" data-a="infSh" data-v="f">Mes amis seulement</button><button class="btn alt" data-a="infSh" data-v="n">Ne pas partager</button></div>`}
function infRows(g,scope){const q=infKeyP(g),M=st.get('soc:me',null)||{},fr=M.fr||{},rows=[],sh=infShr();
 Object.entries(SO.P).forEach(([id,p])=>{const h=p&&p.hs;if(id===SO.uid||!h||!h.k||!h.k[q])return;if(scope==='w'){if(h.v==='p')rows.push([id,h.k[q]])}else if((h.v==='p'||h.v==='f')&&fr[id]>0)((h.m&&h.m[q])||[h.k[q]]).forEach(n=>rows.push([id,n]))});
 if(SO.uid&&(scope==='w'?sh==='p':sh==='p'||sh==='f')){if(scope==='w'){const mine=infBest(g);if(mine>0)rows.push([SO.uid,mine])}else infTop(g).forEach(x=>{if(x.s>0)rows.push([SO.uid,x.s])})}
 return rows.sort((a,b)=>b[1]-a[1]).slice(0,30)}
function infList(a){if(a.length<=6)return`<ol class="infl">${a.join('')}</ol>`;const n=Math.ceil(a.length/6);let p='';for(let i=0;i<n;i++)p+=`<ol class="infl infp">${a.slice(i*6,i*6+6).join('')}</ol>`;
 return`<div class="infpg">${p}</div><div class="infdots">${[...Array(n).keys()].map(i=>`<button class="${i?'':'on'}" data-a="infPg" data-v="${i}" aria-label="Page ${i+1}"></button>`).join('')}</div>`}
const infLbBtn=on=>document.querySelectorAll('.rcx-lb').forEach(b=>{b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
function infBoard(g,tab){const d=infDlg(true),M=st.get('soc:me',null)||{};if(d.dataset.t==='ask')return;
 const same=d.dataset.g===g&&d.dataset.t===tab;d.dataset.g=g;d.dataset.t=tab;if(!same)d.dataset.n='0';
 const N={g2048:'2048',tetris:'Tèconta',planetes:'Planètes · '+(infKey(g)==='o'?'Orbite':'Classique'),caches:'Mots cachés · Cascade'}[g];
 const tabs=[['m','Mes scores',IC_MD],['a','Amis',IC_MP],['w','Global',IC_PL]].map(([k,t,ic])=>`<button class="${k===tab?'on':''}" data-a="infTab" data-v="${g}:${k}">${ic}${t}</button>`).join('');
 let b='';
 if(tab==='m'){const a=infTop(g).slice(0,5);b=a.length?`${infList(a.map((x,i)=>`<li><i>${i+1}</i><span>${x.t?new Date(x.t).toLocaleDateString('fr',{day:'numeric',month:'short'}):'—'}</span><b>${x.s} pts</b></li>`))}`:'<p class="note">Aucun score pour l’instant : lance une partie infinie.</p>'}
 else if(tab==='w'&&window.__fb&&window.__fb.lbTop){infLbSync();const q=infKeyP(g),c=infLB[q];
  if(!window.__fb.u)b='<p class="note">Connecte-toi (menu du compte) pour voir le classement mondial.</p>';
  else if(!c||Date.now()-c.t>60000){b='<p class="note">Chargement du classement…</p>';if(!infLBp[q]){infLBp[q]=1;window.__fb.lbTop(q).then(r=>{infLB[q]={t:Date.now(),r}},()=>{infLB[q]={t:Date.now(),r:null}}).finally(()=>{infLBp[q]=0;const e=$('#infd');if(e&&e.dataset.g===g&&e.dataset.t==='w')infBoard(g,'w')})}}
  else if(!c.r)b='<p class="note">Classement indisponible pour l’instant.</p>';
  else b=c.r.length?`${infList(c.r.map((x,i)=>{let h=0;for(const ch of x.id)h=(h*31+ch.charCodeAt(0))%360;return`<li class="${x.id===SO.uid?'me':''}"><i>${i+1}</i><span class="fr-av em" style="--h:${h}" aria-hidden="true">${esc((x.n||'?')[0])}</span><span>${esc(x.n||'Joueur')}</span><b>${x.s} pts</b></li>`}))}`:'<p class="note">Aucun score public pour l’instant.</p>'}
 else if(!(window.claude&&window.claude.use)||SO.st==='na')b='<p class="note">Les classements sont offerts dans l’app Claude, connecté(e).</p>';
 else if(!SO.got){if(!SO.col&&SO.st!=='conn')socInit();b='<p class="note">Chargement du classement…</p>';const n=+d.dataset.n+1;d.dataset.n=n;if(n<10)setTimeout(()=>{const e=$('#infd');if(e&&e.dataset.g===g&&e.dataset.t===tab)infBoard(g,tab)},1200)}
 else{const rows=infRows(g,tab);b=rows.length?`${infList(rows.map(([id,s],i)=>`<li class="${id===SO.uid?'me':''}"><i>${i+1}</i>${socAv(id)}<span>${esc(id===SO.uid?(M.name||'Moi'):(SO.P[id]&&SO.P[id].name)||'Ami')}</span><b>${s} pts</b></li>`))}`:`<p class="note">${tab==='a'?'Aucun score d’ami à afficher pour l’instant.':'Aucun score public pour l’instant.'}</p>`}
 const sh=infShr();
 d.innerHTML=`<div class="infb"><button class="infx" data-a="infX" aria-label="Fermer">×</button><h2>${N}</h2><div class="plseg infs">${tabs}</div>${b}</div>`;const pg=d.querySelector('.infpg');if(pg)pg.addEventListener('scroll',()=>{const i=Math.round(pg.scrollLeft/(pg.clientWidth||1));d.querySelectorAll('.infdots button').forEach((x,k)=>x.classList.toggle('on',k===i))})}
Object.assign(act,{infBd:v=>{const d=$('#infd');if(d&&d.classList.contains('infin')&&d.dataset.g===v){d.remove();return infLbBtn(false)}if(d&&d.dataset.t!=='ask')d.remove();infBoard(v,'m');infLbBtn(true)},
 infPg:v=>{const p=$('#infd .infpg');if(p)p.scrollTo({left:+v*p.clientWidth,behavior:'smooth'})},infTab:v=>{const[g,t]=v.split(':');infBoard(g,t)},infX:()=>{const d=$('#infd');if(d)d.remove();infLbBtn(false)},
 infSh:v=>{if(!/^[pfn]$/.test(v))return;try{st.set('inf:sh',v);socMine()}catch(e){}try{infLbSync()}catch(e){}const d=$('#infd');if(!d)return;if(d.dataset.t==='ask'){const g=d.dataset.pg;d.remove();if(g)act.infGo(g)}else infBoard(d.dataset.g,d.dataset.t)},
 infSet:v=>{if(!/^[pfn]$/.test(v))return;try{st.set('inf:sh',v);socMine()}catch(e){}try{infLbSync()}catch(e){}prefScreen()}});
const infDone=g=>{let n=0;try{for(let l=0;l<nl(g);l++)if(st.get(ckey(g)+':'+l,false))n++}catch(e){}return n};
const infOk=g=>UNL()||g==='blocs'||infDone(g)>=20;
function infCard(g){const b=infBest(g);if(!infOk(g))return`<section class="rc plmode" data-g="🔒"><div class="rc-t"><small>Mode infini</small><b>Verrouillé</b><span>Termine 20 niveaux pour le débloquer (${infDone(g)} / 20).</span></div></section>`;
 return`<section class="rc plmode" data-g="∞"><div class="rc-t"><small>Mode infini</small><b>Sans fin</b><span>${g==='planetes'?'Avec le mode choisi ci-dessus. ':''}${b?'Record : '+b+' pts':'Pas encore de record'}</span></div><div class="infbt"><button class="btn" data-a="infGo" data-v="${g}">Jouer</button><button class="btn alt" data-a="infBd" data-v="${g}">${IC_LB}Classement</button></div></section>`}
function plModeSeg(){const m=plMd();
 return`<div class="rcx-m"><div class="rcx-t"><small>Mode de jeu</small><span>${m==='orbite'?'Planètes attirées vers le centre':m==='eau'?'Les objets remontent vers la surface':'Les fruits tombent au fond'}</span></div><div class="plseg"><button class="${m?'':'on'}" data-a="plMode" data-v="">Fruits</button><button class="${m==='eau'?'on':''}" data-a="plMode" data-v="eau">${plUnl('eau')?'':'🔒 '}Sous l’eau</button><button class="${m==='orbite'?'on':''}" data-a="plMode" data-v="orbite">${plUnl('orbite')?'':'🔒 '}Planètes</button></div></div>`}
function anaArea(){
 const N=nl('ana'),dn=[...Array(N).keys()].filter(i=>st.get(ckey('ana')+':'+i,false)).length;
 if(!anaOn()){const k=[...Array(60).keys()].findIndex(i=>!st.get(ckey('mots')+':'+i,false)&&!st.get('k:mots:'+i,false));
  return`<div class="rcx-b"><div class="rcx-r"><div class="rcx-t"><small>Mode Anagramme 🔒</small><span>Débloqué au niveau 12 · tu en es au niveau ${Math.max(1,k+1)}</span></div></div></div>`}
 return`<div class="rcx-b"><div class="rcx-r"><div class="rcx-t"><small>Mode Anagramme</small><span>${dn} sur ${N} terminés · +${rw('ana')} ❄</span></div><button class="rc-go" data-a="open" data-v="ana">${dn?'Continuer':'Jouer'}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div></div>`}
function wdArea(g){const ok=anaOn(),k=[...Array(60).keys()].findIndex(i=>!st.get(ckey('mots')+':'+i,false)&&!st.get('k:mots:'+i,false));
 return`<div class="rcx-b"><div class="rcx-m"><div class="rcx-t"><small>Mode de jeu</small><span>${g==='ana'?'Mots entremêlés':'Relie les lettres'}</span></div><div class="plseg"><button class="${g==='mots'?'on':''}" data-a="wdMode" data-v="mots">Roue des mots</button><button class="${g==='ana'?'on':''}" data-a="wdMode" data-v="ana">${ok?'':'🔒 '}Anagramme</button></div></div>${ok?'':`<p class="note" style="margin:0">Anagramme se débloque au niveau 12 de la Roue des mots (tu en es au niveau ${Math.max(1,k+1)}).</p>`}</div>`}
function infArea(g){if(g==='mots'||g==='ana')return wdArea(g);const ok=infOk(g),b=infBest(g);
 const row=ok?`<div class="rcx-r"><div class="rcx-t"><small>Mode infini</small><span>${b?'Record : '+b+' pts':'Pas encore de record'}</span></div><button class="rc-go" data-a="infGo" data-v="${g}">Jouer ∞</button><button class="rcx-lb" data-a="infBd" data-v="${g}" aria-label="Classement">${IC_LB}</button></div>`:`<div class="rcx-r"><div class="rcx-t"><small>Mode infini 🔒</small><span>Termine 20 niveaux (${infDone(g)} / 20)</span></div></div>`;
 return`<div class="rcx-b">${g==='planetes'?plModeSeg():g==='caches'?caSeg():''}${g==='caches'&&!caOn()?'':row}</div>`}
function caSeg(){const m=caOn();return`<div class="rcx-m"><div class="rcx-t"><small>Mode de jeu</small><span>${m?'Les lettres tombent':'Relie les lettres'}</span></div><div class="plseg"><button class="${m?'':'on'}" data-a="caMode" data-v="">Classique</button><button class="${m?'on':''}" data-a="caMode" data-v="cascade">Cascade</button></div></div>`}
act.caMode=v=>{try{st.set('ca:mode',v==='cascade'?'cascade':'')}catch(e){}hub('caches')};
act.wdMode=v=>{if(v==='mots'||v==='ana')hub(v)};
act.infGo=v=>{if(!INFN[v]||gLock(v)||gHid(v)||!infOk(v))return;if(infShr()===''&&window.claude&&window.claude.use)return infAsk(v);INFG=v;cur=v;daily=false;lv=0;playing=true;wsG=null;theme(v,false);({g2048:p2048,tetris:pTetris,planetes:pPlan,caches:pCasc,blocs:pBlocs})[v](undefined);window.scrollTo(0,0)};
