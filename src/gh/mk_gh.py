import os,sys
SRC=os.environ.get('SRC','/mnt/user-data/outputs/nuit-de-neige-2.html')
OUT=os.environ.get('OUT','/tmp/claude-0/-home-claude/3d7f4fc1-f8a6-597b-88d5-0c7ad635827d/scratchpad/gh/index.html')
D=os.path.dirname(os.path.abspath(__file__))
h=open(SRC,encoding='utf-8').read()
shim=open(D+'/fb-shim.js',encoding='utf-8').read()
def rep(a,b,n=1):
    global h
    c=h.count(a)
    assert c==n,(a[:70],c)
    h=h.replace(a,b)
i=h.index('<script>');h=h[:i]+'<script>\n'+shim+'</script>\n'+h[i:]
rep("na:'Indisponible ici : ouvre la page connecté(e) à Claude. En attendant, utilise le code.'","na:'Connecte-toi (bouton ci-dessous) pour synchroniser ta progression sur tes appareils. En attendant, utilise le code.'")
rep('<p class="note" id="accs" style="margin-top:8px">${accText()}</p>','<p class="note" id="accs" style="margin-top:8px">${accText()}</p>${window.__fb?`<button class="btn alt" data-a="${window.__fb.u?\'fbOut\':\'fbIn\'}">${window.__fb.u?\'Me déconnecter (\'+esc(window.__fb.u)+\')\':\'Se connecter ou créer un compte\'}</button>`:\'\'}')
rep("syAcc:()=>{const on=!st.get('sync:acc',false);st.set('sync:acc',on);if(on)accInit();else accOff();prefScreen()},","fbIn:()=>window.__fb&&window.__fb.open(),fbOut:()=>window.__fb&&window.__fb.out(),\n syAcc:()=>{const on=!st.get('sync:acc',false);st.set('sync:acc',on);if(on){accInit();if(window.__fb&&window.__fb.ready&&!window.__fb.u)window.__fb.open()}else accOff();prefScreen()},")
rep("if(st.get('sync:acc',false))setTimeout(accInit,0);","window.__fbDone=()=>{st.set('sync:acc',true);location.reload()};window.__fbOut=()=>{st.set('sync:acc',false);accOff();location.reload()};\nif(st.get('sync:acc',false))setTimeout(accInit,0);")
rep("if(SO.st==='na')return crd('Une connexion est nécessaire','Ouvre cette page connecté(e) à Claude, avec un accès en écriture (rôle Contributeur ou plus), pour ajouter des amis et leur offrir des flocons.');","if(SO.st==='na')return crd('Une connexion est nécessaire','Connecte-toi pour ajouter des amis et leur offrir des flocons.<br><button class=\"btn\" style=\"margin-top:12px\" data-a=\"fbIn\">Se connecter ou créer un compte</button>');")
rep("""  const hit=Object.keys(SO.P).find(id=>id!==SO.uid&&SO.P[id].code===c);
  if(!hit)return bad('Aucun ami avec ce code. Vérifie-le, et demande-lui d’ouvrir d’abord l’onglet Social.');
  const r=socAddId(hit),n=SO.P[hit].name;
  if(r==='dup')return bad(n+' est déjà dans tes amis.');
  if(r==='max')return bad('Tu as atteint la limite de '+SMAX+' amis.');
  SO.in='';SO.m=n+' ajouté(e) à tes amis ✓';SO.merr=false;SO.h='';socRefresh()},""","""  const fin=hit=>{
   if(!hit)return bad('Aucun ami avec ce code. Vérifie-le, et demande-lui d’ouvrir d’abord l’onglet Social.');
   const r=socAddId(hit),n=(SO.P[hit]&&SO.P[hit].name)||'Ton ami';
   if(r==='dup')return bad(n+' est déjà dans tes amis.');
   if(r==='max')return bad('Tu as atteint la limite de '+SMAX+' amis.');
   SO.in='';SO.m=n+' ajouté(e) à tes amis ✓';SO.merr=false;SO.h='';socRefresh()};
  const hit0=Object.keys(SO.P).find(id=>id!==SO.uid&&SO.P[id].code===c);
  if(hit0||!(window.__fb&&window.__fb.lookup))return fin(hit0);
  SO.m='Recherche…';SO.merr=false;socRefresh();
  return window.__fb.lookup(c).then(id=>fin(id&&id!==SO.uid?id:null),()=>bad('Recherche impossible pour l’instant : réessaie dans un moment.'))},""")

# ---------- PWA : manifeste, icônes, service worker
head='<link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#0e0f34"><link rel="icon" type="image/png" href="icon-192.png"><link rel="apple-touch-icon" href="apple-touch-icon.png"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Calmos"><meta name="apple-mobile-web-app-status-bar-style" content="default">\n'
rep('<meta charset="utf-8">','<meta charset="utf-8">\n'+head)
rep('</body>',"<script>if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{})});</script>\n</body>")
import hashlib,shutil
ver=hashlib.sha1(h.encode()).hexdigest()[:10]
OD=os.path.dirname(OUT)
for f in os.listdir(D+'/pwa'):
    if f=='sw.js':open(OD+'/sw.js','w').write(open(D+'/pwa/sw.js').read().replace('__VERSION__',ver))
    else:shutil.copy(D+'/pwa/'+f,OD+'/'+f)
open(OUT,'w',encoding='utf-8').write(h)
print(len(h))
