// Affiche ou masque un bloc de la page "Description des films"
// (synopsis, acteurs, équipe technique). Les autres blocs ouverts sont refermés.
function toggleContent(contentId) {
    const content = document.getElementById(contentId);
    if (!content) {
        return;
    }

    document.querySelectorAll('.content').forEach(function (el) {
        if (el !== content) {
            el.style.display = 'none'; // Masquer tous les autres contenus
        }
    });

    content.style.display = (content.style.display === 'block') ? 'none' : 'block';
}

// Affiche ou masque une section d'une biographie et met à jour le bouton +/-
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);
    const button = content.previousElementSibling.querySelector('.toggle-btn');

    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        button.textContent = "-";
    } else {
        content.style.display = "none";
        button.textContent = "+";
    }
}

// Met en minuscules et retire les accents ("Éowyn" -> "eowyn", "Kíli" -> "kili")
function normalizeText(text) {
    return text.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Construit la liste des personnages à partir des biographies présentes dans la page :
// un nouveau personnage ajouté dans biographies.html est donc trouvé automatiquement.
// Le titre a la forme "Frodon Sacquet - Incarné par Elijah Wood" :
// le nom est la partie avant " - " et l'acteur la partie après "par ".
function getCharacters() {
    return Array.from(document.querySelectorAll('.character')).map(function (element) {
        const title = element.querySelector('h3');
        const titleText = title ? title.textContent : element.id;
        const parts = titleText.split(' - ');
        const actorMatch = (parts[1] || '').match(/par (.+)$/);

        return {
            element: element,
            name: normalizeText(parts[0]),
            actor: actorMatch ? normalizeText(actorMatch[1]) : ''
        };
    });
}

function showSearchMessage(message) {
    const messageElement = document.getElementById('search-message');
    if (messageElement) {
        messageElement.textContent = message;
    }
}

function searchCharacter() {
    const input = document.getElementById('search-input');
    const filter = normalizeText(input.value);

    // Une recherche vide ne doit rien faire
    if (filter === '') {
        showSearchMessage('Veuillez saisir le nom d\'un personnage ou d\'un acteur.');
        return;
    }

    const characters = getCharacters();

    // On cherche d'abord parmi les noms de personnages, puis parmi les acteurs :
    // "sam" trouve donc Sam avant un acteur dont le nom contiendrait "sam".
    const found = characters.find(function (character) {
        return character.name.includes(filter);
    }) || characters.find(function (character) {
        return character.actor.includes(filter);
    });

    if (found) {
        showSearchMessage('');
        // Met à jour l'adresse (#frodon...) et fait défiler jusqu'à la biographie
        // (replaceState évite le saut brusque qu'entraînerait location.hash)
        history.replaceState(null, '', '#' + found.element.id);
        found.element.scrollIntoView({ behavior: 'smooth' });
    } else {
        showSearchMessage('Aucun personnage ni acteur trouvé pour « ' + input.value.trim() + ' ».');
    }
}

// La barre de recherche n'existe que sur la page Biographies
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

if (searchInput) {
    searchInput.addEventListener('keypress', function (event) {
        // Vérifie si l'utilisateur appuie sur la touche "Entrée"
        if (event.key === 'Enter') {
            searchCharacter();
        }
    });
}

if (searchButton) {
    searchButton.addEventListener('click', searchCharacter);
}

// Menu burger : ouvre/ferme la liste des pages sur petit écran
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
        navToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });
}
