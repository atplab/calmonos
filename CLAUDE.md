# Nuit de neige 2 (app française, un seul fichier HTML)
- Artifact : https://claude.ai/artifact/YFpsSRQqiraMLeA46ZZeZ7 (publier avec url + label "vNNN …"). Dernière version : v296.
- Sources : src/ (modules JS dans src/v57/*.js, assemblés par src/build36.sh + src/patch_v36.py ; remote*.diff = commits d'une autre session, appliqués avec patch -F3). Base : src/base-nuit-de-neige-2.html, sortie : /mnt/user-data/outputs/nuit-de-neige-2.html.
- Pour travailler : copier src/ dans le scratchpad, recréer /mnt/user-data/outputs/ si besoin, lancer ./build36.sh (doit afficher SYNTAX_OK).
- Livraison : python3 mk_gh.py -> gh/index.html + gh/sw.js, copier ici (index.html, sw.js), commit, git fetch avant push sur origin main. Fin de commit : Co-Authored-By + Claude-Session.
- Jeux : registre GUNL/GSTEP/GAV dans src/v57/gord.js ; chaque jeu = fonction pXxx(r) (frame(), act.*, snap(), spend(1) pour indice). Musiques : modules xxMu (aqMu, xmMu, ttMu, cbMu, unMu, chMu) dans src/v57/*mus.js.
- Étapes d'histoire : flow 0, g2048 20, tetris (Tèconta) 25, brick 30, quiz 40.
- Préférences : réponses brèves en français, peu de narration, peu d'appels d'outils.
