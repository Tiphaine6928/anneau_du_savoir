// Protection anti-spoilers (pages Événements et Biographies).
//
// Les passages qui révèlent l'histoire sont floutés jusqu'à ce qu'on clique sur
// "Révéler". Un bouton en haut de la page affiche ou floute tout d'un coup ; ce
// choix est commun aux deux pages et retenu dans le navigateur du visiteur.
// Sans JavaScript, tout est simplement affiché.

// Sections des biographies considérées comme des spoilers (début du titre de la section)
const SECTIONS_SPOILERS = [
    'Chronologie Personnelle',
    'Évolution du Personnage',
    'Rôle dans la quête',
    'Anecdotes et Faits Divers',
    'Rencontres importantes' // Bestiaire
];

(function () {
    const CLE_PREFERENCE = 'anneauDuSavoir.spoilers';

    // ---------- Ce qui est protégé sur chaque page ----------
    const pages = [
        {
            // Page Événements : chaque carte de la frise (titre compris)
            trouver: function () {
                return Array.from(document.querySelectorAll('.frise > .event'));
            },
            texteBouton: 'Révéler l\'événement',
            focusApres: function (cible) { return cible.querySelector('h3'); },
            messages: {
                masque: 'Les événements sont floutés pour ne rien vous gâcher. Cliquez sur « Révéler » pour découvrir un événement.',
                visible: 'Tous les événements sont affichés. Attention, cette page raconte toute l\'histoire !',
                afficher: 'Afficher tous les événements',
                flouter: 'Flouter à nouveau les événements'
            }
        },
        {
            // Page Biographies : le contenu des sections listées dans SECTIONS_SPOILERS
            trouver: function () {
                return Array.from(document.querySelectorAll('.bio-section')).filter(function (section) {
                    const titre = section.querySelector('h4');
                    return titre && SECTIONS_SPOILERS.some(function (debut) {
                        return titre.textContent.trim().startsWith(debut);
                    });
                }).map(function (section) {
                    // Badge "Spoiler" à côté du titre de la section
                    const badge = document.createElement('span');
                    badge.className = 'spoiler-badge';
                    badge.textContent = 'Spoiler';
                    section.querySelector('h4 .toggle-btn').before(badge);
                    return section.querySelector('.content');
                });
            },
            texteBouton: 'Révéler le spoiler',
            focusApres: function (cible) { return cible.querySelector('.spoiler-contenu'); },
            messages: {
                masque: 'Les passages qui dévoilent la suite de l\'histoire (marqués « Spoiler ») sont floutés. Cliquez sur « Révéler » pour les lire.',
                visible: 'Tous les spoilers sont affichés.',
                afficher: 'Afficher tous les spoilers',
                flouter: 'Flouter à nouveau les spoilers'
            }
        }
    ];

    let page = null;
    let cibles = [];
    for (const candidate of pages) {
        cibles = candidate.trouver();
        if (cibles.length) {
            page = candidate;
            break;
        }
    }
    if (!page) {
        return;
    }

    function lirePreference() {
        try {
            return localStorage.getItem(CLE_PREFERENCE) !== 'visibles';
        } catch (erreur) {
            return true; // Stockage indisponible : on protège par défaut
        }
    }

    function enregistrerPreference(masquer) {
        try {
            localStorage.setItem(CLE_PREFERENCE, masquer ? 'masques' : 'visibles');
        } catch (erreur) {
            // Stockage indisponible : le choix vaut seulement pour cette visite
        }
    }

    // ---------- Préparation de chaque passage protégé ----------
    // Le contenu est regroupé dans un bloc qu'on peut flouter et rendre inactif
    // (inert : ni lien atteignable au clavier, ni lecture par les lecteurs d'écran)
    cibles.forEach(function (cible) {
        cible.classList.add('spoiler-cible');

        const contenu = document.createElement('div');
        contenu.className = 'spoiler-contenu';
        contenu.append(...cible.childNodes);
        cible.appendChild(contenu);

        const aFocaliser = page.focusApres(cible);
        if (aFocaliser) {
            aFocaliser.setAttribute('tabindex', '-1'); // Pour y placer le focus après la révélation
        }

        const bouton = document.createElement('button');
        bouton.type = 'button';
        bouton.className = 'spoiler-reveal';
        bouton.textContent = page.texteBouton;
        bouton.addEventListener('click', function () {
            reveler(cible);
            if (aFocaliser) {
                aFocaliser.focus();
            }
        });
        cible.appendChild(bouton);
    });

    function masquer(cible) {
        cible.classList.add('spoiler-masque');
        cible.querySelector('.spoiler-contenu').inert = true;
        cible.querySelector('.spoiler-reveal').hidden = false;
    }

    function reveler(cible) {
        cible.classList.remove('spoiler-masque');
        cible.querySelector('.spoiler-contenu').inert = false;
        cible.querySelector('.spoiler-reveal').hidden = true;
    }

    // ---------- Bouton "tout afficher / tout flouter" ----------
    const controles = document.createElement('div');
    controles.className = 'spoiler-controles';

    const explication = document.createElement('p');
    const boutonTout = document.createElement('button');
    boutonTout.type = 'button';
    boutonTout.className = 'perso-button';
    controles.append(explication, boutonTout);
    // Sous l'en-tête de la page (titre et introduction), ou à défaut sous le titre
    (document.querySelector('.page-entete') || document.querySelector('h1')).after(controles);

    let modeMasque = lirePreference();

    function appliquerMode() {
        cibles.forEach(modeMasque ? masquer : reveler);
        explication.textContent = modeMasque ? page.messages.masque : page.messages.visible;
        boutonTout.textContent = modeMasque ? page.messages.afficher : page.messages.flouter;
        boutonTout.setAttribute('aria-pressed', String(!modeMasque));
        revelerCibleVisee();
    }

    boutonTout.addEventListener('click', function () {
        modeMasque = !modeMasque;
        enregistrerPreference(modeMasque);
        appliquerMode();
    });

    // ---------- Lien direct vers un événement (evenements.html#le-conseil-d-elrond) ----------
    function revelerCibleVisee() {
        const id = decodeURIComponent(window.location.hash.slice(1));
        const visee = cibles.find(function (cible) { return id && cible.id === id; });
        if (visee) {
            reveler(visee);
        }
    }

    window.addEventListener('hashchange', revelerCibleVisee);
    appliquerMode();
})();
