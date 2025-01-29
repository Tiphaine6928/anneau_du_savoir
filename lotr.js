document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.toggle-button');
    
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            var content = this.nextElementSibling;
            var allContents = document.querySelectorAll('.content');
            
            allContents.forEach(function (el) {
                if (el !== content) {
                    el.style.display = 'none'; // Masquer tous les autres contenus
                }/* else {
                    el.style.display = 'block';
                }*/
                console.error("Ceci est une erreur");
            });
            
            /*if(content.style.display === 'block') {
                content.style.display = 'none'
            } else {
                content.style.display = "block"
            }*/
            content.style.display = (content.style.display === 'block') ? 'none' : 'block';
        });
    });
});

document.getElementById('search-input').addEventListener('keypress', function(event) {
    // Vérifie si l'utilisateur appuie sur la touche "Entrée"
    if (event.key === 'Enter') {
        const filter = this.value.toLowerCase();

        // Associe chaque terme de recherche à une ancre sur la page Biographies
        const biographyLinks = {
            'frodon': 'biographies.html#frodon',
            'sam': 'biographies.html#sam',
            'bilbon': "biographies.html#sam",
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

        // Vérifie si le texte de recherche correspond à un personnage
        for (const name in biographyLinks) {
            if (name.includes(filter)) {
                // Redirige vers la page Biographies avec l'ancre correspondante
                window.location.href = biographyLinks[name];
                break;
            }
        }
    }
});

document.getElementById('search-button').addEventListener('click', function() {
    const filter = document.getElementById('search-input').value.toLowerCase();
    
    // Mêmes liens de biographie que précédemment
    const biographyLinks = {
        'frodon': 'biographies.html#frodon',
        'sam': 'biographies.html#sam',
        'bilbon': "biographies.html#sam",
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

    for (const name in biographyLinks) {
        if (name.includes(filter)) {
            window.location.href = biographyLinks[name];
            break;
        }
    }
});

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