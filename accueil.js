// Page d'accueil : citation et personnage à l'honneur tirés au hasard.
//
// Sans JavaScript, la page affiche simplement la citation de Gandalf et Gandalf à l'honneur
// (écrits directement dans lotr.html). Les citations et les résumés viennent des biographies.

// Citations : [texte, personnage, identifiant de sa biographie]
const CITATIONS = [
    [
        "Tout ce que nous avons à décider, c'est ce que nous devons faire du temps qui nous est imparti.",
        "Gandalf",
        "gandalf"
    ],
    [
        "Un magicien n'est jamais en retard, ni en avance d'ailleurs. Il arrive précisément à l'heure prévue.",
        "Gandalf",
        "gandalf"
    ],
    [
        "Même la plus petite personne peut changer le cours du futur.",
        "Galadriel",
        "galadriel"
    ],
    [
        "Il y a du bon en ce monde, Monsieur Frodon, et il faut se battre pour cela.",
        "Sam",
        "sam"
    ],
    [
        "Je ne peux pas le porter pour vous, mais je peux vous porter, vous !",
        "Sam",
        "sam"
    ],
    [
        "Je vais jusqu'au bout, même si personne ne peut m'accompagner.",
        "Frodon",
        "frodon"
    ],
    [
        "Je ne peux pas choisir le chemin qui m'a été tracé, mais je peux le suivre avec courage.",
        "Aragorn",
        "aragorn"
    ],
    [
        "Si plus de gens accordaient de la valeur à la maison et à l'amour plutôt qu'à l'or, le monde serait un endroit plus heureux.",
        "Thorin",
        "thorin"
    ],
    [
        "Personne ne frappe un nain sur la tête et s'en tire à si bon compte.",
        "Gimli",
        "gimli"
    ],
    [
        "Je ne suis pas un homme !",
        "Éowyn",
        "eowyn"
    ],
    [
        "Je suis en retard, en retard pour une aventure !",
        "Bilbon",
        "bilbon"
    ],
    [
        "Mon précieux…",
        "Gollum",
        "gollum"
    ]
];

// Personnages à l'honneur : ceux qui ont un vrai portrait (pas une carte provisoire)
const PERSONNAGES_HONNEUR = [
    {
        "id": "frodon",
        "nom": "Frodon Sacquet",
        "acteur": "Elijah Wood",
        "image": "images/frodon2.webp",
        "resume": "Frodon Sacquet est un hobbit de la Comté qui se voit confier la tâche de détruire l'Anneau Unique."
    },
    {
        "id": "sam",
        "nom": "Sam",
        "acteur": "Sean Astin",
        "image": "images/sam.webp",
        "resume": "Sam est un hobbit de la Comté, fidèle jardinier et ami de Frodon, qui l'accompagne dans sa quête pour détruire l'Anneau Unique."
    },
    {
        "id": "bilbon",
        "nom": "Bilbon Sacquet",
        "acteur": "Martin Freeman",
        "image": "images/bilbon2.webp",
        "resume": "Bilbon Sacquet est un hobbit de la Comté qui part à l'aventure avec une compagnie de nains pour reprendre leur royaume et trésor volé par le dragon Smaug."
    },
    {
        "id": "gandalf",
        "nom": "Gandalf le Gris",
        "acteur": "Ian McKellen",
        "image": "images/gandalf2.webp",
        "resume": "Gandalf est un puissant sorcier qui guide et conseille la Communauté de l'Anneau."
    },
    {
        "id": "aragorn",
        "nom": "Aragorn",
        "acteur": "Viggo Mortensen",
        "image": "images/aragorn.webp",
        "resume": "Aragorn est un rôdeur du Nord, héritier de Gondor, qui joue un rôle crucial dans la lutte contre Sauron."
    },
    {
        "id": "legolas",
        "nom": "Legolas",
        "acteur": "Orlando Bloom",
        "image": "images/legolas2.webp",
        "resume": "Legolas est un elfe de la Forêt Noire, expert en tir à l'arc, qui rejoint la Communauté de l'Anneau pour détruire l'Anneau Unique."
    },
    {
        "id": "arwen",
        "nom": "Arwen",
        "acteur": "Liv Tyler",
        "image": "images/arwen.webp",
        "resume": "Arwen est une elfe de Fondcombe, fille d'Elrond, qui renonce à son immortalité pour épouser Aragorn et soutenir la lutte contre Sauron."
    },
    {
        "id": "gollum",
        "nom": "Gollum",
        "acteur": "Andy Serkis",
        "image": "images/gollum.webp",
        "resume": "Gollum est une créature corrompue par l'Anneau Unique, qui guide Frodon et Sam vers le Mont Destin tout en cherchant à récupérer l'Anneau pour lui-même."
    },
    {
        "id": "thorin",
        "nom": "Thorin",
        "acteur": "Richard Armitage",
        "image": "images/thorin2.webp",
        "resume": "Thorin est un nain du peuple de Durin, qui se voit confier la tâche de reconquérir Erebor et son trésor des griffes du dragon Smaug."
    },
    {
        "id": "kili",
        "nom": "Kili",
        "acteur": "Aidan Turner",
        "image": "images/kili.webp",
        "resume": "Kili est un jeune nain courageux qui rejoint la quête de son oncle Thorin pour reconquérir Erebor et son trésor."
    },
    {
        "id": "galadriel",
        "nom": "Galadriel",
        "acteur": "Cate Blanchett",
        "image": "images/galadriel.webp",
        "resume": "Galadriel est une elfe de Lothlórien, dotée d'une grande sagesse et de pouvoirs magiques, qui aide la Communauté de l'Anneau dans leur quête."
    },
    {
        "id": "tauriel",
        "nom": "Tauriel",
        "acteur": "Evangeline Lilly",
        "image": "images/tauriel.webp",
        "resume": "Tauriel est une elfe sylvestre, capitaine des gardes de la Forêt Noire, qui se distingue par son courage et son attachement à Kili, l'un des nains."
    },
    {
        "id": "sauron",
        "nom": "Sauron",
        "acteur": "Sala Baker",
        "image": "images/sauron.webp",
        "resume": "Sauron est un seigneur des ténèbres qui forge l'Anneau Unique pour dominer la Terre du Milieu et cherche à le récupérer pour restaurer son pouvoir."
    },
    {
        "id": "gimli",
        "nom": "Gimli",
        "acteur": "John Rhys-Davies",
        "image": "images/gimli.webp",
        "resume": "Gimli est un nain de la lignée de Durin qui rejoint la Communauté de l'Anneau, combattant avec loyauté et forgeant une amitié improbable avec l'elfe Legolas."
    },
    {
        "id": "eowyn",
        "nom": "Éowyn",
        "acteur": "Miranda Otto",
        "image": "images/eowyn.webp",
        "resume": "Éowyn est une noble du Rohan, déterminée et courageuse, qui se déguise en homme pour combattre au côté des siens et vaincre le Roi-Sorcier d'Angmar."
    }
];

(function () {
    // Tire un élément au hasard, différent du précédent
    function auHasard(liste, precedent) {
        if (liste.length < 2) {
            return liste[0];
        }
        let choix;
        do {
            choix = liste[Math.floor(Math.random() * liste.length)];
        } while (choix === precedent);
        return choix;
    }

    // ---------- Citation ----------
    const texte = document.getElementById('citation-texte');
    const auteur = document.getElementById('citation-auteur');
    const boutonCitation = document.getElementById('citation-suivante');
    let citation = null;

    function afficherCitation() {
        citation = auHasard(CITATIONS, citation);
        texte.textContent = '« ' + citation[0].replace(/ ([?!:;])/g, '\u00a0$1') + '\u00a0»';
        auteur.textContent = citation[1];
        auteur.href = 'biographies.html#' + citation[2];
    }

    // ---------- Personnage à l'honneur ----------
    const image = document.getElementById('honneur-image');
    const nom = document.getElementById('honneur-nom');
    const acteur = document.getElementById('honneur-acteur');
    const resume = document.getElementById('honneur-resume');
    const lien = document.getElementById('honneur-lien');
    const boutonHonneur = document.getElementById('honneur-suivant');
    let personnage = null;

    function afficherPersonnage() {
        personnage = auHasard(PERSONNAGES_HONNEUR, personnage);
        image.src = personnage.image;
        image.alt = personnage.nom;
        nom.textContent = personnage.nom;
        acteur.textContent = personnage.acteur;
        resume.textContent = personnage.resume;
        lien.href = 'biographies.html#' + personnage.id;
    }

    afficherCitation();
    afficherPersonnage();
    boutonCitation.hidden = false;
    boutonHonneur.hidden = false;
    boutonCitation.addEventListener('click', afficherCitation);
    boutonHonneur.addEventListener('click', afficherPersonnage);
})();
