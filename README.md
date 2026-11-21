Mon site est centré sur les 3 films du Seigneur des Anneaux et les 3 films du Hobbit

Axes d'amélioration :
 - Gérer les photos autrement (par exemple créer une base de données et mettre les photos dedans)
 - Finir les biographies/mettre d'autres personnages

Améliorations réalisées :
 - Dans les biographies, l'utilisateur peut rechercher un personnage par son nom ou par le nom de l'acteur (sans tenir compte des majuscules ni des accents)
 - La liste des personnages de la recherche est lue directement dans la page : un nouveau personnage est trouvé automatiquement
 - Correction de bugs : la recherche "Bilbon" menait à Sam, une recherche vide menait à Frodon, erreurs JavaScript sur la page des films
 - Optimisation des images (format WebP, taille adaptée, chargement différé) : la page des biographies passe d'environ 11 Mo à 1 Mo
 - Suppression des fichiers et images inutilisés
 - Barre de navigation adaptée au mobile (menu burger), accueil et biographies lisibles sur téléphone
 - Flèche qui remonte en haut de la page, sur toutes les pages
 - Meilleure lisibilité : fonds bruns foncés derrière les textes clairs, tous les textes respectent le contraste minimum recommandé (WCAG)
 - Sections dépliables animées (biographies et films), accessibles au clavier et aux lecteurs d'écran
 - Quiz amélioré : questions et réponses mélangées à chaque partie, meilleur score sauvegardé dans le navigateur, questions oubliées signalées, correction lisible (couleurs contrastées et textes), score avec appréciation, bouton Recommencer
 - Barre de navigation commune à toutes les pages (fichier nav.js) : pour ajouter ou renommer une page du menu, il suffit de modifier la liste dans nav.js
 - Référencement : un titre principal (h1), un titre d'onglet et une description pour Google sur chaque page
 - Frise chronologique visuelle des événements : étapes numérotées, couleur différente pour le Seigneur des Anneaux et le Hobbit, adaptée au mobile
 - Biographies en galerie : vignettes, filtres par peuple et par film, recherche pendant la frappe, fiche complète dans une fenêtre avec personnage précédent/suivant et lien partageable (biographies.html#gimli)
 - Liens entre les pages : les personnages et les lieux cités dans les synopsis et les événements mènent à leur biographie ou à la carte, les bulles de la carte listent les événements du lieu, chaque biographie indique dans quels films le personnage apparaît (liste des liens dans liens.js)
 - Test « Quel personnage es-tu ? » (personnage.html) : 10 questions, résultat parmi les 15 personnages avec lien vers sa biographie et partage ; questions et points dans personnage-data.js
 - Page d'erreur 404 « Vous ne passerez pas ! » (404.html), affichée automatiquement par GitHub Pages quand une adresse n'existe pas
 - Protection anti-spoilers sur les pages Événements et Biographies : événements et sections « Spoiler » des biographies floutés jusqu'au clic sur « Révéler », bouton pour tout afficher ou tout flouter (choix commun aux deux pages, retenu par le navigateur ; sections protégées listées dans spoilers.js)
 - Carte enrichie : 23 lieux (contre 6), dont Bree, la Moria, la Lothlórien, Isengard, le Gouffre de Helm, Edoras, Lacville, la Forêt Noire, la Porte Noire et la Montagne du Destin, chacun relié aux événements qui s'y passent
