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

// Associe chaque terme de recherche à une ancre sur la page Biographies
const biographyLinks = {
    'frodon': 'biographies.html#frodon',
    'sam': 'biographies.html#sam',
    'bilbon': 'biographies.html#bilbon',
    'gandalf': 'biographies.html#gandalf',
    'aragorn': 'biographies.html#aragorn',
    'legolas': 'biographies.html#legolas',
    'arwen': 'biographies.html#arwen',
    'gollum': 'biographies.html#gollum',
    'thorin': 'biographies.html#thorin',
    'kili': 'biographies.html#kili',
    'galadriel': 'biographies.html#galadriel',
    'tauriel': 'biographies.html#tauriel',
    'sauron': 'biographies.html#sauron',
    'gimli': 'biographies.html#gimli',
    'eowyn': 'biographies.html#eowyn'
};

// Met en minuscules et retire les accents ("Éowyn" -> "eowyn", "Kíli" -> "kili")
function normalizeText(text) {
    return text.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
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
        showSearchMessage('Veuillez saisir le nom d\'un personnage.');
        return;
    }

    for (const name in biographyLinks) {
        if (name.includes(filter)) {
            showSearchMessage('');
            // Redirige vers la page Biographies avec l'ancre correspondante
            window.location.href = biographyLinks[name];
            return;
        }
    }

    showSearchMessage('Aucun personnage trouvé pour « ' + input.value.trim() + ' ».');
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
