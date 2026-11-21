// Galerie des biographies : vignettes, filtres, recherche et fiche en fenêtre.
//
// Les fiches complètes restent écrites dans biographies.html (une <div class="character">
// par personnage). Ce script construit la galerie à partir d'elles : pour ajouter un
// personnage, il suffit d'ajouter sa fiche avec ses attributs, par exemple
//     <div id="merry" class="character" data-peuple="hobbit" data-films="sda">
// Sans JavaScript, la page affiche simplement toutes les fiches les unes sous les autres.

// Libellés des filtres. Les clés correspondent aux attributs data-peuple et data-films.
const PEUPLES = {
    hobbit: 'Hobbits',
    elfe: 'Elfes',
    nain: 'Nains',
    homme: 'Hommes',
    magicien: 'Magiciens',
    autre: 'Autres'
};

const FILMS = {
    sda: 'Le Seigneur des Anneaux',
    hobbit: 'Le Hobbit'
};

// Partie de la page "Description des films" consacrée à chaque trilogie
const FILMS_LIENS = {
    sda: 'synopsis.html#seigneur-des-anneaux',
    hobbit: 'synopsis.html#le-hobbit'
};

// Réglages de la galerie. Par défaut : la page Biographies. Une autre page (le Bestiaire)
// peut définir window.GALERIE_CONFIG avant de charger ce script pour changer les libellés.
const GALERIE = Object.assign({
    categories: PEUPLES,        // Valeurs possibles de l'attribut data-peuple
    libelleCategorie: 'Peuple', // Nom du premier filtre
    singulier: 'personnage',
    pluriel: 'personnages',
    rechercheSur: 'personnage ni acteur', // "Aucun … ne correspond à « … »"
    aucun: 'Aucun', // "Aucune" pour un mot féminin
    tous: 'tous'    // "toutes" pour un mot féminin
}, window.GALERIE_CONFIG || {});

// Met en minuscules et retire les accents ("Éowyn" -> "eowyn", "Kíli" -> "kili")
function normalizeText(text) {
    return text.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

(function () {
    const container = document.querySelector('.character-biography');
    const searchContainer = container.querySelector('.search-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // ---------- Lecture des fiches ----------
    // Titre de la forme "Frodon Sacquet - Incarné par Elijah Wood"
    const characters = Array.from(container.querySelectorAll('.character')).map(function (element) {
        const title = element.querySelector('h3');
        const parts = title.textContent.split(' - ');
        const actorMatch = (parts[1] || '').match(/par (.+)$/);
        const name = parts[0].trim();
        const actor = actorMatch ? actorMatch[1].trim() : (element.dataset.sousTitre || '');

        title.id = 'titre-' + element.id; // Sert de nom à la fenêtre de la fiche

        // Repère pour remettre la fiche à sa place quand la fenêtre se ferme
        const placeholder = document.createComment(' fiche ' + element.id + ' ');
        element.before(placeholder);

        const films = (element.dataset.films || '').split(' ').filter(Boolean);
        addFilmsLine(element, films);

        return {
            id: element.id,
            element: element,
            placeholder: placeholder,
            name: name,
            actor: actor,
            image: element.querySelector('img').getAttribute('src'),
            peuple: element.dataset.peuple || 'autre',
            films: films,
            search: normalizeText(name + ' ' + actor + ' ' + (element.dataset.alias || ''))
        };
    });

    // Ajoute sous le résumé de la fiche : "Apparaît dans : Le Seigneur des Anneaux et Le Hobbit"
    function addFilmsLine(element, films) {
        if (!films.length) {
            return;
        }
        const line = document.createElement('p');
        line.className = 'bio-films';
        line.append('Apparaît dans : ');
        films.forEach(function (film, index) {
            if (index > 0) {
                line.append(index === films.length - 1 ? ' et ' : ', ');
            }
            const link = document.createElement('a');
            link.href = FILMS_LIENS[film] || 'synopsis.html';
            link.textContent = FILMS[film] || film;
            line.appendChild(link);
        });
        const summary = element.querySelector('h3 + p');
        (summary || element.querySelector('h3')).after(line);
    }

    // ---------- Filtres ----------
    const state = { peuple: 'tous', film: 'tous', query: '' };

    function createFilterGroup(label, key, options) {
        const group = document.createElement('div');
        group.className = 'filter-group';
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', label);

        const title = document.createElement('span');
        title.className = 'filter-label';
        title.textContent = label + ' :';
        group.appendChild(title);

        Object.entries(Object.assign({ tous: 'Tous' }, options)).forEach(function ([value, text]) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'filter-button';
            button.textContent = text;
            button.dataset.key = key;
            button.dataset.value = value;
            button.setAttribute('aria-pressed', value === 'tous');
            button.addEventListener('click', function () {
                state[key] = value;
                group.querySelectorAll('.filter-button').forEach(function (other) {
                    other.setAttribute('aria-pressed', other === button);
                });
                render();
            });
            group.appendChild(button);
        });
        return group;
    }

    const filters = document.createElement('div');
    filters.className = 'gallery-filters';
    filters.append(createFilterGroup(GALERIE.libelleCategorie, 'peuple', GALERIE.categories), createFilterGroup('Films', 'film', FILMS));

    // Nombre de personnages affichés, annoncé aux lecteurs d'écran
    const status = document.createElement('p');
    status.className = 'gallery-status';
    status.setAttribute('aria-live', 'polite');

    // Message quand aucun personnage ne correspond
    const empty = document.createElement('div');
    empty.className = 'gallery-empty';
    empty.hidden = true;
    const emptyText = document.createElement('p');
    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.className = 'filter-button';
    resetButton.textContent = 'Afficher ' + GALERIE.tous + ' les ' + GALERIE.pluriel;
    resetButton.addEventListener('click', resetFilters);
    empty.append(emptyText, resetButton);

    function resetFilters() {
        state.peuple = 'tous';
        state.film = 'tous';
        state.query = '';
        searchInput.value = '';
        filters.querySelectorAll('.filter-button').forEach(function (button) {
            button.setAttribute('aria-pressed', button.dataset.value === 'tous');
        });
        render();
        searchInput.focus();
    }

    // ---------- Vignettes ----------
    const grid = document.createElement('ul');
    grid.className = 'gallery-grid';

    characters.forEach(function (character, index) {
        const item = document.createElement('li');
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'gallery-card';
        card.setAttribute('aria-haspopup', 'dialog');

        const img = document.createElement('img');
        img.src = character.image;
        img.alt = ''; // Le nom est écrit juste en dessous
        img.width = 300;
        img.height = 400;
        img.decoding = 'async';
        if (index > 5) {
            img.loading = 'lazy';
        }

        const name = document.createElement('span');
        name.className = 'gallery-name';
        name.textContent = character.name;

        const actor = document.createElement('span');
        actor.className = 'gallery-actor';
        actor.textContent = character.actor;

        const badge = document.createElement('span');
        badge.className = 'gallery-badge';
        badge.textContent = GALERIE.categories[character.peuple] || character.peuple;

        card.append(img, badge, name, actor);
        card.addEventListener('click', function () {
            openCharacter(character);
        });

        item.appendChild(card);
        grid.appendChild(item);
        character.item = item;
        character.card = card;
    });

    function matches(character) {
        return (state.peuple === 'tous' || character.peuple === state.peuple)
            && (state.film === 'tous' || character.films.includes(state.film))
            && (state.query === '' || character.search.includes(state.query));
    }

    function visibleCharacters() {
        return characters.filter(matches);
    }

    function render() {
        const visible = visibleCharacters();
        characters.forEach(function (character) {
            character.item.hidden = !visible.includes(character);
        });

        const count = visible.length;
        status.textContent = count === characters.length
            ? count + ' ' + GALERIE.pluriel
            : count + ' ' + (count > 1 ? GALERIE.pluriel : GALERIE.singulier) + ' sur ' + characters.length;

        empty.hidden = count > 0;
        if (count === 0) {
            emptyText.textContent = state.query
                ? GALERIE.aucun + ' ' + GALERIE.rechercheSur + ' ne correspond à « ' + searchInput.value.trim() + ' » avec ces filtres.'
                : GALERIE.aucun + ' ' + GALERIE.singulier + ' ne correspond à ces filtres.';
        }
    }

    // ---------- Recherche : filtre la galerie pendant la frappe ----------
    searchInput.addEventListener('input', function () {
        state.query = normalizeText(searchInput.value);
        render();
    });

    // Entrée ou "Go !" ouvre la fiche du premier personnage trouvé
    function openFirstResult() {
        const first = visibleCharacters()[0];
        if (first && state.query !== '') {
            openCharacter(first);
        }
    }

    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            // Sans cela, la touche Entrée "cliquerait" aussi sur le bouton Fermer,
            // qui reçoit le focus à l'ouverture de la fiche, et la refermerait aussitôt
            event.preventDefault();
            openFirstResult();
        }
    });
    searchButton.addEventListener('click', openFirstResult);

    // ---------- Fenêtre de la fiche ----------
    const dialog = document.createElement('dialog');
    dialog.className = 'bio-dialog';

    const toolbar = document.createElement('div');
    toolbar.className = 'bio-dialog-toolbar';

    function toolbarButton(className, label) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'bio-dialog-button ' + className;
        button.setAttribute('aria-label', label);
        return button;
    }

    const prevButton = toolbarButton('bio-prev', 'Fiche précédente');
    const nextButton = toolbarButton('bio-next', 'Fiche suivante');
    const closeButton = toolbarButton('bio-close', 'Fermer la fiche');
    closeButton.textContent = '✕';
    const position = document.createElement('span');
    position.className = 'bio-position';

    toolbar.append(prevButton, position, nextButton, closeButton);
    const dialogBody = document.createElement('div');
    // Même classe que la page : la fiche garde ses styles (fond, portrait, textes)
    dialogBody.className = 'bio-dialog-body character-biography';
    dialog.append(toolbar, dialogBody);
    document.body.appendChild(dialog);

    let current = null;
    let historyPushed = false; // La fiche a-t-elle ajouté une entrée à l'historique ?

    // Personnages parmi lesquels "précédent / suivant" navigue : ceux de la galerie
    // filtrée, ou tous si la fiche ouverte n'en fait pas partie (lien direct)
    function browsingList() {
        const visible = visibleCharacters();
        return current && visible.includes(current) ? visible : characters;
    }

    function updateToolbar() {
        const list = browsingList();
        const index = list.indexOf(current);
        const prev = list[(index - 1 + list.length) % list.length];
        const next = list[(index + 1) % list.length];
        const single = list.length < 2;

        prevButton.hidden = single;
        nextButton.hidden = single;
        prevButton.textContent = '← ' + prev.name;
        nextButton.textContent = next.name + ' →';
        prevButton.setAttribute('aria-label', 'Fiche précédente : ' + prev.name);
        nextButton.setAttribute('aria-label', 'Fiche suivante : ' + next.name);
        prevButton.onclick = function () { openCharacter(prev); };
        nextButton.onclick = function () { openCharacter(next); };
        position.textContent = (index + 1) + ' / ' + list.length;
    }

    function putBack(character) {
        character.placeholder.after(character.element);
    }

    function openCharacter(character, options) {
        const fromHistory = options && options.fromHistory;

        if (current && current !== character) {
            putBack(current);
        }
        current = character;
        dialogBody.replaceChildren(character.element);
        dialog.setAttribute('aria-labelledby', 'titre-' + character.id);
        updateToolbar();

        // L'adresse devient biographies.html#gimli : le lien peut être partagé,
        // et le bouton Retour du navigateur referme la fiche
        if (!fromHistory && window.location.hash !== '#' + character.id) {
            if (dialog.open) {
                history.replaceState(history.state, '', '#' + character.id);
            } else {
                history.pushState({ fiche: character.id }, '', '#' + character.id);
                historyPushed = true;
            }
        }

        if (!dialog.open) {
            dialog.showModal();
        }
        dialog.scrollTop = 0;
        closeButton.focus();
    }

    let closingFromHistory = false;

    dialog.addEventListener('close', function () {
        if (current) {
            putBack(current);
            const card = current.card;
            current = null;
            card.focus(); // Le clavier revient sur la vignette de la fiche fermée
        }

        if (closingFromHistory) {
            closingFromHistory = false;
        } else if (historyPushed) {
            historyPushed = false;
            history.back();
        } else if (window.location.hash) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    });

    closeButton.addEventListener('click', function () {
        dialog.close();
    });

    // Clic sur le fond sombre autour de la fiche : ferme la fenêtre
    dialog.addEventListener('click', function (event) {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    // Flèches gauche / droite : personnage précédent / suivant
    dialog.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft' && !prevButton.hidden) {
            prevButton.click();
        } else if (event.key === 'ArrowRight' && !nextButton.hidden) {
            nextButton.click();
        }
    });

    function findByHash() {
        const id = decodeURIComponent(window.location.hash.slice(1));
        return characters.find(function (character) { return character.id === id; });
    }

    // Boutons Précédent / Suivant du navigateur
    window.addEventListener('popstate', function () {
        const character = findByHash();
        if (character) {
            openCharacter(character, { fromHistory: true });
        } else if (dialog.open) {
            historyPushed = false;
            closingFromHistory = true;
            dialog.close();
        }
    });

    // ---------- Mise en place ----------
    searchContainer.after(filters, status, empty, grid);
    container.classList.add('gallery-ready');
    render();

    // Lien direct vers une fiche (biographies.html#gimli)
    const initial = findByHash();
    if (initial) {
        openCharacter(initial, { fromHistory: true });
    }
})();
