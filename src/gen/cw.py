import random,json
T="""SATURNE|Planète aux célèbres anneaux;COMETE|Astre chevelu à longue queue;ORBITE|Trajectoire d’un satellite autour d’une planète;GALAXIE|La Voie lactée en est une;ECLIPSE|La Lune y cache le Soleil;MARS|La planète rouge
VIOLON|Instrument à cordes joué avec un archet;MOZART|Compositeur de « La Flûte enchantée »;OPERA|Spectacle où les acteurs chantent;PIANO|Instrument à 88 touches;SOLFEGE|Apprentissage de la lecture des notes;HARPE|Grand instrument à cordes pincées
PHARE|Il guide les marins la nuit;MAREE|Montée et descente de la mer;CORAIL|Il forme des récifs dans les mers chaudes;BALEINE|Le plus grand des mammifères marins;ECUME|Mousse blanche des vagues;ANCRE|On la jette pour immobiliser le bateau
SOMMET|Point le plus haut d’une montagne;GLACIER|Fleuve de glace;CHAMOIS|Agile animal des Alpes;REFUGE|Abri pour randonneurs en altitude;EVEREST|Plus haut sommet du monde;COL|Passage entre deux montagnes
PALETTE|Le peintre y mélange ses couleurs;PICASSO|Peintre de « Guernica »;TOILE|Support tendu du tableau;PINCEAU|Outil du peintre;LOUVRE|Musée parisien de la Joconde;CHEVALET|Support du tableau en cours
CREPE|Fine galette de la Chandeleur;FOUR|On y cuit le gâteau;SOUFFLE|Plat qui gonfle à la cuisson;FOUET|Ustensile pour monter les blancs en neige;RECETTE|Liste d’étapes pour préparer un plat;SEL|Il relève les plats
CHENE|Arbre dont le fruit est le gland;ECUREUIL|Rongeur roux qui cache des noisettes;MOUSSE|Elle tapisse les troncs humides;SENTIER|Petit chemin dans les bois;CHAMPIGNON|Il pousse sous les arbres après la pluie;HIBOU|Rapace nocturne aux aigrettes
HUGO|Auteur des « Misérables »;ROMAN|Long récit de fiction;MOLIERE|Auteur du « Malade imaginaire »;POEME|Texte écrit en vers;FABLE|Court récit de La Fontaine avec une morale;VERNE|Auteur de « Vingt Mille Lieues sous les mers »
NIL|Fleuve d’Égypte;AMAZONE|Fleuve d’Amérique du Sud;SAHARA|Grand désert d’Afrique;ISLANDE|Île des volcans et des geysers;ANDES|Chaîne de montagnes d’Amérique du Sud;OCEAN|Vaste étendue d’eau salée
TULIPE|Fleur emblème des Pays-Bas;RATEAU|Outil pour ramasser les feuilles;ARROSOIR|Il donne à boire aux plantes;POTAGER|Jardin des légumes;GRAINE|On la sème pour faire pousser une plante;ROSE|Fleur à épines
SKI|Glisse sur deux lattes;LUGE|Petit traîneau pour descendre les pentes;PATIN|On le chausse pour glisser sur la glace;SLALOM|Descente entre des piquets;BIATHLON|Ski de fond et tir à la carabine;CURLING|On y fait glisser des pierres sur la glace
VACHE|Elle donne du lait;COCHON|Animal rose qui aime la boue;POULE|Elle pond des œufs;MOUTON|On le tond pour sa laine;CHEVAL|On le monte au galop;ANE|Cousin du cheval aux longues oreilles
ATOME|Plus petite partie d’un élément;NEWTON|Savant de la pomme et de la gravitation;CURIE|Marie …, deux fois prix Nobel;AIMANT|Il attire le fer;MICROSCOPE|Instrument pour voir l’infiniment petit;ENERGIE|Capacité à produire un travail
CENDRILLON|Elle perd sa pantoufle de verre;LOUP|Il veut manger le Petit Chaperon rouge;PERRAULT|Auteur des « Contes de ma mère l’Oye »;FEE|Personnage à baguette magique;OGRE|Géant qui dévore les enfants dans les contes;DRAGON|Créature qui crache du feu
SEINE|Fleuve qui traverse Paris;EIFFEL|Gustave …, ingénieur de la célèbre tour;METRO|Train souterrain;MONTMARTRE|Colline parisienne du Sacré-Cœur;PONT|Il enjambe la rivière;ARC|… de Triomphe
NUAGE|Il cache le soleil;ORAGE|Il gronde avec éclairs et tonnerre;BRUME|Léger brouillard;GRELE|Pluie de glace;VENT|Il souffle fort pendant la tempête;TONNERRE|Bruit qui suit l’éclair
COEUR|Il bat dans la poitrine;CERVEAU|Organe de la pensée;SQUELETTE|Ensemble des os;POUMON|Organe de la respiration;GENOU|Articulation au milieu de la jambe;DENT|On la brosse matin et soir
TROMPETTE|Cuivre à pistons;FLUTE|Instrument à vent en bois ou en métal;TAMBOUR|On le frappe avec des baguettes;CHEF|… d’orchestre;GUITARE|Instrument à six cordes;ORGUE|Grand instrument d’église
NAPOLEON|Empereur des Français en 1804;BASTILLE|Prison prise le 14 juillet 1789;GAULOIS|Ancien peuple de la Gaule;CHATEAU|Demeure fortifiée du seigneur;ROI|Louis XIV en était un;PYRAMIDE|Tombeau des pharaons
VALISE|On y range ses affaires pour partir;PASSEPORT|Document pour voyager à l’étranger;AVION|Il vole d’un aéroport à l’autre;GARE|On y attend le train;CARTE|Elle montre le chemin;BOUSSOLE|Son aiguille indique le nord
MESANGE|Petit oiseau à tête bleue ou noire;AIGLE|Rapace des montagnes;HIRONDELLE|Elle annonce le printemps;PIE|Oiseau noir et blanc qui aime ce qui brille;NID|Maison des oisillons;PLUME|Elle couvre l’oiseau
FLOCON|Petit cristal de neige;IGLOO|Maison de glace;ECHARPE|On l’enroule autour du cou;GIVRE|Il blanchit les vitres;BONNET|Il garde la tête au chaud;MOUFLE|Gant sans doigts séparés
FEUILLE|Elle tombe en automne;CITROUILLE|Grosse courge orange;CHATAIGNE|Fruit à bogue qu’on fait griller;PLUIE|Elle mouille les trottoirs;OCTOBRE|Dixième mois de l’année;CEPE|Champignon prisé des cueilleurs
BOURGEON|Il éclot sur la branche;AVRIL|Mois des poissons farceurs;JONQUILLE|Fleur jaune du printemps;ABEILLE|Elle fabrique le miel;PAQUES|Fête des œufs en chocolat;LILAS|Arbuste aux grappes mauves parfumées
PLAGE|On y bronze au bord de la mer;SOLEIL|Astre qui nous éclaire;GLACE|Dessert froid en cornet;VACANCES|Période sans école;PARASOL|Il protège du soleil sur le sable;JUILLET|Mois de la fête nationale
ZEUS|Roi des dieux grecs;ATHENA|Déesse grecque de la sagesse;ULYSSE|Héros de l’« Odyssée »;HERCULE|Héros aux douze travaux;OLYMPE|Montagne des dieux grecs;MINOTAURE|Monstre du labyrinthe de Crète
CAMERA|Elle filme les scènes;ACTEUR|Il joue un rôle;CHAPLIN|Charlie …, le créateur de Charlot;LUMIERE|Les frères … ont inventé le cinématographe;CESAR|Récompense du cinéma français;ECRAN|On y projette le film
CACAO|Fève du chocolat;TARTE|Pâte garnie de fruits;MACARON|Petit gâteau rond aux amandes;CARAMEL|Sucre fondu et doré;VANILLE|Gousse parfumée;MIEL|Les abeilles le fabriquent
CERISE|Petit fruit rouge à noyau;ANANAS|Fruit tropical à couronne;POIRE|Fruit en forme de goutte;KIWI|Fruit poilu à chair verte;MANGUE|Fruit tropical à gros noyau plat;FRAISE|Fruit rouge du printemps
BOULANGER|Il fait le pain;MEDECIN|Il soigne les malades;FACTEUR|Il distribue le courrier;POMPIER|Il éteint les incendies;PILOTE|Il conduit l’avion;JUGE|Il rend la justice
GRENIER|Pièce sous le toit;CUISINE|On y prépare les repas;FENETRE|On l’ouvre pour aérer;ESCALIER|Il relie les étages;TOIT|Il couvre la maison;CAVE|Pièce sous la maison
ECHECS|Jeu du roi et de la reine sur 64 cases;DAMES|Jeu de pions sur un damier;PUZZLE|Jeu de pièces à assembler;DOMINO|Pièce à points qu’on aligne;CARTES|On les bat puis on les distribue;BILLE|Petite boule de verre qu’on fait rouler
PAPILLON|Il sort de la chrysalide;FOURMI|Insecte travailleur de la fourmilière;LIBELLULE|Insecte aux ailes fines près des étangs;COCCINELLE|Petite bête rouge à points noirs;GRILLON|Il chante dans l’herbe l’été;GUEPE|Insecte rayé qui pique
SAPIN|Arbre de Noël;BOULEAU|Arbre à l’écorce blanche;SAULE|Arbre … pleureur;ERABLE|Sa feuille orne le drapeau canadien;PALMIER|Arbre des plages tropicales;OLIVIER|Arbre méditerranéen, symbole de paix
INDIGO|Bleu profond;ROUGE|Couleur des coquelicots;VIOLET|Mélange de rouge et de bleu;ORANGE|Couleur et fruit;TURQUOISE|Bleu-vert des lagons;GRIS|Couleur de la souris
VELO|Il a deux roues et des pédales;TRAMWAY|Train qui roule dans les rues;VOILIER|Bateau poussé par le vent;FUSEE|Elle décolle vers l’espace;CAMION|Gros véhicule de livraison;TAXI|Voiture qu’on hèle dans la rue
ALPHABET|De A à Z;ACCENT|Il se pose parfois sur le e;VIRGULE|Signe de ponctuation pour une petite pause;LETTRE|On la poste dans une enveloppe;STYLO|Il écrit à l’encre;CAHIER|On y écrit en classe
VOLCAN|Montagne qui crache de la lave;LAVE|Roche en fusion;SEISME|Tremblement de terre;CRATERE|Bouche du volcan;ETNA|Volcan de Sicile;GEYSER|Jet d’eau chaude jaillissant du sol
OREILLER|On y pose la tête pour dormir;REVE|Histoire qu’on vit en dormant;LUNE|Elle brille la nuit;COUETTE|Couverture moelleuse;BERCEUSE|Chanson pour endormir;ETOILE|Elle scintille dans le ciel nocturne
COLOMB|Christophe …, arrivé en Amérique en 1492;MAGELLAN|Navigateur du premier tour du monde;POLO|Marco …, voyageur jusqu’en Chine;CARAVELLE|Navire des grandes découvertes;ARMSTRONG|Premier homme à marcher sur la Lune;COUSTEAU|Commandant explorateur des océans
CASTOR|Rongeur bâtisseur de barrages;LOUTRE|Elle nage sur le dos;ROSEAU|Plante qui plie mais ne rompt pas;CYGNE|Grand oiseau blanc au long cou;BARQUE|Petit bateau à rames;TRUITE|Poisson des rivières fraîches"""
MAXR=MAXC=10
def place(ws,rnd):
    G={};P=[]
    def ok(w,r,c,h):
        if h and c+len(w)>MAXC+20:return False
        cr=0
        for k,ch in enumerate(w):
            rr,cc=(r,c+k) if h else (r+k,c)
            g=G.get((rr,cc))
            if g:
                if g[0]!=ch or h in g[1]:return False
                cr+=1
            else:
                # side neighbours
                n1=(rr-1,cc) if h else (rr,cc-1);n2=(rr+1,cc) if h else (rr,cc+1)
                if n1 in G or n2 in G:return False
        b=(r,c-1) if h else (r-1,c);a=(r,c+len(w)) if h else (r+len(w),c)
        if b in G or a in G:return False
        return cr
    def put(w,r,c,h):
        for k,ch in enumerate(w):
            rr,cc=(r,c+k) if h else (r+k,c)
            G.setdefault((rr,cc),[ch,set()])[1].add(h)
        P.append((w,r,c,h))
    order=sorted(ws,key=lambda w:-len(w)) if rnd.random()<.5 else rnd.sample(ws,len(ws))
    put(order[0],0,0,rnd.random()<.5)
    for w in order[1:]:
        opts=[]
        for (rr,cc),(ch,ds) in list(G.items()):
            for k,x in enumerate(w):
                if x!=ch:continue
                for h in (True,False):
                    if h in ds:continue
                    r,c=(rr,cc-k) if h else (rr-k,cc)
                    cr=ok(w,r,c,h)
                    if cr:
                        rs=[p for p in G]+[(r,c+i) if h else (r+i,c) for i in range(len(w))]
                        R=max(x[0] for x in rs)-min(x[0] for x in rs)+1;C=max(x[1] for x in rs)-min(x[1] for x in rs)+1
                        if R<=MAXR and C<=MAXC:opts.append((cr,rnd.random(),r,c,h))
        if not opts:return None
        opts.sort(reverse=True);_,_,r,c,h=opts[0] if rnd.random()<.6 else rnd.choice(opts);put(w,r,c,h)
    r0=min(p[1] for p in P);c0=min(p[2] for p in P)
    return [(w,r-r0,c-c0,h) for w,r,c,h in P]
out=[]
for li,line in enumerate(T.split('\n')):
    items=[x.split('|') for x in line.split(';')];ws=[a for a,b in items];cl=dict(items)
    rnd=random.Random(li*97+5);best=None
    for t in range(4000):
        p=place(ws,rnd)
        if p:
            R=max(r+(1 if h else len(w)) for w,r,c,h in p);C=max(c+(len(w) if h else 1) for w,r,c,h in p)
            sc=R*C
            if not best or sc<best[0]:best=(sc,p,R,C)
    assert best,ws
    out.append([[w,cl[w],r,c,'h' if h else 'v'] for w,r,c,h in best[1]])
    print(li,best[2],best[3])
json.dump(out,open('cw.json','w'),ensure_ascii=False)
