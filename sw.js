/* Calmos : service worker. Le jeu fonctionne sans réseau ; une nouvelle version est prise dès qu'elle est en ligne. */
const V='nds-inf1',FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n.startsWith('nds-')&&n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 const u=new URL(r.url);
 /* polices Google et bibliothèque Firebase : gardées en mémoire pour avoir la même allure hors ligne */
 if(/^(fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(u.hostname)||(u.hostname==='www.gstatic.com'&&u.pathname.startsWith('/firebasejs/'))){
  e.respondWith(caches.open('ndx-ext').then(c=>c.match(r).then(m=>{const n=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(()=>m);return m||n})));return}
 if(u.origin!==location.origin)return;
 /* réseau d'abord (version à jour), cache si hors ligne */
 e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):Response.error()))));
});
