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
const plHe=(k,f)=>`<button class="plhe${f.includes(k)?' on':''}" data-a="plfv" data-v="${k}" aria-label="${f.includes(k)?'Retirer des favoris':'Ajouter aux favoris'}" aria-pressed="${f.includes(k)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"/></svg></button>`;
function plDraw(){let o=document.getElementById('plo');const sy=o?o.scrollTop:0;if(!o){o=document.createElement('div');o.id='plo';o.className='plo';document.body.appendChild(o)}
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
Object.assign(act,{plr:plDraw,plx:()=>{const o=document.getElementById('plo');if(o)o.remove()},
 plp:v=>{const i=PLT.findIndex(t=>t[0]===v);if(PLK===v&&!PLPA){PLC=i;act.plpa();return}plStart(i)},
 plpl:()=>{if(!PLK)return plStart(PLC);if(PLPA){PLPA=false;PLT0=Date.now()-PLE*1000;audio();plApply();plSess();plDraw()}else act.plpa()},
 plpa:()=>{if(!PLK)return;PLE=plEl();PLPA=true;plApply();plSess();plDraw()},
 plfv:v=>{const f=plFav(),i=f.indexOf(v);if(i<0)f.push(v);else f.splice(i,1);st.set('pl:fav',f);plDraw()},
 plnx:v=>plStart(PLC+(+v||1)),
 pls:()=>{PLK=null;PLPA=false;PLE=0;plApply();plSess();plDraw()}});
