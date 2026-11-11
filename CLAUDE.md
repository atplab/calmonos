# Nuit de neige 2 (app française, un seul fichier HTML)
- Artifact : https://claude.ai/artifact/YFpsSRQqiraMLeA46ZZeZ7 (publier avec url + label "vNNN …"). Dernière version : v306 (voir git log).
- Sources : src/ (modules JS dans src/v57/*.js, assemblés par src/build36.sh + src/patch_v36.py ; remote*.diff = commits d'une autre session, appliqués avec patch -F3). Base : src/base-nuit-de-neige-2.html, sortie : /mnt/user-data/outputs/nuit-de-neige-2.html.
- Pour travailler : copier src/ dans le scratchpad, recréer /mnt/user-data/outputs/ si besoin, lancer ./build36.sh (doit afficher SYNTAX_OK).
- Livraison : ./build36.sh ; node src/min.js IN OUT (npm i terser clean-css@5) pour minifier. Publier le .min.html. PWA : python3 mk_gh.py sur la version NON minifiée (SRC par défaut), puis minifier gh/index.html -> copier ici (index.html, sw.js), commit, git pull --rebase avant push sur origin main. Fin de commit : Co-Authored-By + Claude-Session.
- Jeux : registre GUNL/GSTEP/GAV dans src/v57/gord.js ; chaque jeu = fonction pXxx(r) (frame(), act.*, snap(), spend(1) pour indice). Musiques : modules xxMu (aqMu, xmMu, ttMu, cbMu, unMu, chMu, lfMu sudoku, ecMu échecs, ahMu air hockey, bkMu casse-briques) dans src/v57/*mus.js.
- Étapes d'histoire : flow 0, g2048 20, tetris (Tèconta) 25, brick 30, quiz 40.
- Préférences : réponses brèves en français, peu de narration, peu d'appels d'outils.
