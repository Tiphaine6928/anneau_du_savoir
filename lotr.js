// ---------- Sections dépliables ----------
// Boutons +/− des biographies (.toggle-btn) et boutons Synopsis / Acteurs /
// Équipe technique des films (.toggle-button). Chaque bouton indique le bloc
// qu'il contrôle avec aria-controls, et son état avec aria-expanded
// (lu par les lecteurs d'écran).

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Ouvre ou ferme un bloc avec une animation de hauteur
function animateContent(content, open) {
    // Arrête une animation en cours (clics rapides)
    content.getAnimations().forEach(function (animation) {
        animation.cancel();
    });

    content.style.display = 'block';

    if (prefersReducedMotion.matches) {
        content.style.display = open ? 'block' : 'none';
        return;
    }

    // Hauteur et marges réelles du bloc ouvert
    const style = getComputedStyle(content);
    const opened = {
        height: content.scrollHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) + 'px',
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        marginTop: style.marginTop,
        opacity: 1
    };
    const closed = { height: '0px', paddingTop: '0px', paddingBottom: '0px', marginTop: '0px', opacity: 0 };

    const animation = content.animate(open ? [closed, opened] : [opened, closed], {
        duration: open ? 300 : 200,
        easing: 'ease-out'
    });

    if (!open) {
        animation.onfinish = function () {
            content.style.display = 'none';
        };
    }
}

function setExpanded(button, open) {
    const content = document.getElementById(button.getAttribute('aria-controls'));
    if (!content || (button.getAttribute('aria-expanded') === 'true') === open) {
        return;
    }

    button.setAttribute('aria-expanded', open);
    if (button.classList.contains('toggle-btn')) {
        button.textContent = open ? '−' : '+';
    }
    animateContent(content, open);
}

// Boutons +/− des biographies
document.querySelectorAll('.toggle-btn').forEach(function (button) {
    const title = button.closest('h4');
    // Nom lu par les lecteurs d'écran : le titre de la section plutôt que "+"
    button.setAttribute('aria-label', title.textContent.replace(/[+−-]\s*$/, '').trim());

    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Évite un double déclenchement via le titre
        setExpanded(button, button.getAttribute('aria-expanded') !== 'true');
    });

    // Cliquer sur le titre de la section fonctionne aussi
    title.addEventListener('click', function () {
        button.click();
    });
});

// Boutons des films : ouvrir un bloc referme les autres
const filmButtons = document.querySelectorAll('.toggle-button');
filmButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const open = button.getAttribute('aria-expanded') !== 'true';
        if (open) {
            filmButtons.forEach(function (other) {
                if (other !== button) {
                    setExpanded(other, false);
                }
            });
        }
        setExpanded(button, open);
    });
});

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

// Bouton "retour en haut" : créé ici pour qu'il soit présent sur toutes les pages.
// Il apparaît une fois que l'on a fait défiler la page de 400 px.
const backToTop = document.createElement('button');
backToTop.id = 'back-to-top';
backToTop.type = 'button';
backToTop.setAttribute('aria-label', 'Remonter en haut de la page');
backToTop.title = 'Remonter en haut de la page';
backToTop.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">'
    + '<path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="3" '
    + 'stroke-linecap="round" stroke-linejoin="round"/></svg>';
document.body.appendChild(backToTop);

function updateBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

backToTop.addEventListener('click', function () {
    // Défilement fluide, sauf si l'utilisateur a demandé à réduire les animations
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});
