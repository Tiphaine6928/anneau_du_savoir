// Barre de navigation commune à toutes les pages.
//
// Pour ajouter, renommer ou retirer une page du menu, il suffit de modifier
// la liste ci-dessous : toutes les pages sont mises à jour en même temps.
//
// Chaque page inclut ce fichier à l'endroit où la barre doit apparaître :
//     <script src="nav.js"></script>
// Le script se remplace lui-même par la barre de navigation. Il s'exécute
// pendant le chargement de la page, donc la barre ne "clignote" pas.

const NAV_PAGES = [
    { href: 'lotr.html', label: 'Accueil' },
    { href: 'synopsis.html', label: 'Description des films' },
    { href: 'biographies.html', label: 'Biographies' },
    { href: 'carte.html', label: 'Carte' },
    { href: 'evenements.html', label: 'Événements Importants' },
    { href: 'quiz.html', label: 'Quiz' }
];

(function () {
    // Nom du fichier de la page actuelle ("carte.html"...) ; l'adresse du site
    // seule (".../") correspond à la page d'accueil
    const currentPage = window.location.pathname.split('/').pop() || NAV_PAGES[0].href;

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Navigation principale');

    const logo = document.createElement('a');
    logo.href = NAV_PAGES[0].href;
    logo.className = 'logo';
    logo.innerHTML = '<img src="images/anneau.webp" alt="L\'Anneau du Savoir - Accueil" width="128" height="85">';

    // Bouton du menu burger (petits écrans) : son fonctionnement est dans lotr.js
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-links');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    const list = document.createElement('ul');
    list.id = 'nav-links';

    NAV_PAGES.forEach(function (page) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = page.href;
        link.textContent = page.label;

        // Page actuelle : mise en évidence et annoncée aux lecteurs d'écran
        if (page.href === currentPage) {
            link.className = 'active';
            link.setAttribute('aria-current', 'page');
        }

        item.appendChild(link);
        list.appendChild(item);
    });

    nav.append(logo, toggle, list);
    document.currentScript.replaceWith(nav);
})();
