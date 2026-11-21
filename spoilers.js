// Protection anti-spoilers de la page Événements.
//
// Chaque événement de la frise est flouté jusqu'à ce qu'on clique sur "Révéler".
// Un bouton en haut de la page affiche ou masque tout d'un coup ; ce choix est
// retenu dans le navigateur du visiteur pour ses prochaines visites.
// L'événement visé par un lien (evenements.html#le-conseil-d-elrond) est révélé
// directement. Sans JavaScript, tous les événements sont simplement affichés.

(function () {
    const CLE_PREFERENCE = 'anneauDuSavoir.spoilers';
    const evenements = Array.from(document.querySelectorAll('.frise > .event'));
    if (!evenements.length) {
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

    // ---------- Préparation de chaque événement ----------
    // Le contenu est regroupé dans un bloc qu'on peut flouter et rendre inactif
    // (inert : ni lien cliquable au clavier, ni lecture par les lecteurs d'écran)
    evenements.forEach(function (evenement) {
        const contenu = document.createElement('div');
        contenu.className = 'event-contenu';
        contenu.append(...evenement.childNodes);
        evenement.appendChild(contenu);

        const titre = contenu.querySelector('h3');
        if (titre) {
            titre.setAttribute('tabindex', '-1'); // Pour y placer le focus après la révélation
        }

        const bouton = document.createElement('button');
        bouton.type = 'button';
        bouton.className = 'spoiler-reveal';
        bouton.textContent = 'Révéler l\'événement';
        bouton.addEventListener('click', function () {
            reveler(evenement);
            if (titre) {
                titre.focus();
            }
        });
        evenement.appendChild(bouton);
    });

    function masquer(evenement) {
        evenement.classList.add('spoiler-masque');
        evenement.querySelector('.event-contenu').inert = true;
        evenement.querySelector('.spoiler-reveal').hidden = false;
    }

    function reveler(evenement) {
        evenement.classList.remove('spoiler-masque');
        evenement.querySelector('.event-contenu').inert = false;
        evenement.querySelector('.spoiler-reveal').hidden = true;
    }

    // ---------- Bouton "tout afficher / tout masquer" ----------
    const controles = document.createElement('div');
    controles.className = 'spoiler-controles';

    const explication = document.createElement('p');
    const boutonTout = document.createElement('button');
    boutonTout.type = 'button';
    boutonTout.className = 'perso-button';
    controles.append(explication, boutonTout);
    document.querySelector('h1').after(controles);

    let modeMasque = lirePreference();

    function appliquerMode() {
        evenements.forEach(modeMasque ? masquer : reveler);
        explication.textContent = modeMasque
            ? 'Les événements sont floutés pour ne rien vous gâcher. Cliquez sur « Révéler » pour découvrir un événement.'
            : 'Tous les événements sont affichés. Attention, cette page raconte toute l\'histoire !';
        boutonTout.textContent = modeMasque ? 'Afficher tous les événements' : 'Flouter à nouveau les événements';
        boutonTout.setAttribute('aria-pressed', String(!modeMasque));
        revelerEvenementVise();
    }

    boutonTout.addEventListener('click', function () {
        modeMasque = !modeMasque;
        enregistrerPreference(modeMasque);
        appliquerMode();
    });

    // ---------- Lien direct vers un événement ----------
    function revelerEvenementVise() {
        const id = decodeURIComponent(window.location.hash.slice(1));
        const vise = evenements.find(function (evenement) { return evenement.id === id; });
        if (vise) {
            reveler(vise);
        }
    }

    window.addEventListener('hashchange', revelerEvenementVise);
    appliquerMode();
})();
