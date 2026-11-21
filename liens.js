// Liens automatiques vers les biographies et la carte.
//
// Dans les blocs de texte choisis plus bas (synopsis, acteurs, événements), le nom
// d'un personnage devient un lien vers sa biographie, et le nom d'un lieu un lien
// vers la carte. Seule la première mention dans chaque bloc devient un lien, pour
// que le texte reste lisible.
//
// Pour ajouter un personnage ou un lieu, il suffit de compléter la liste LIENS.
// Mettre les noms les plus longs en premier ("Frodon Sacquet" avant "Frodon").

const LIENS = [
    // Personnages -> biographies.html#id (la fiche s'ouvre directement)
    { noms: ['Frodon Sacquet', 'Frodon'], url: 'biographies.html#frodon', titre: 'Biographie de Frodon' },
    { noms: ['Samsagace Gamegie', 'Sam Gamegie', 'Sam'], url: 'biographies.html#sam', titre: 'Biographie de Sam' },
    { noms: ['Bilbon Sacquet', 'Bilbon'], url: 'biographies.html#bilbon', titre: 'Biographie de Bilbon' },
    { noms: ['Gandalf'], url: 'biographies.html#gandalf', titre: 'Biographie de Gandalf' },
    { noms: ['Aragorn', 'Grands-Pas'], url: 'biographies.html#aragorn', titre: 'Biographie d\'Aragorn' },
    { noms: ['Legolas'], url: 'biographies.html#legolas', titre: 'Biographie de Legolas' },
    { noms: ['Arwen'], url: 'biographies.html#arwen', titre: 'Biographie d\'Arwen' },
    { noms: ['Gollum', 'Sméagol'], url: 'biographies.html#gollum', titre: 'Biographie de Gollum' },
    { noms: ['Thorin'], url: 'biographies.html#thorin', titre: 'Biographie de Thorin' },
    { noms: ['Kíli', 'Kili'], url: 'biographies.html#kili', titre: 'Biographie de Kili' },
    { noms: ['Galadriel'], url: 'biographies.html#galadriel', titre: 'Biographie de Galadriel' },
    { noms: ['Tauriel'], url: 'biographies.html#tauriel', titre: 'Biographie de Tauriel' },
    { noms: ['Sauron'], url: 'biographies.html#sauron', titre: 'Biographie de Sauron' },
    { noms: ['Gimli'], url: 'biographies.html#gimli', titre: 'Biographie de Gimli' },
    { noms: ['Éowyn', 'Eowyn'], url: 'biographies.html#eowyn', titre: 'Biographie d\'Éowyn' },
    { noms: ['Meriadoc Brandebouc', 'Meriadoc', 'Merry'], url: 'biographies.html#merry', titre: 'Biographie de Merry' },
    { noms: ['Peregrin Touque', 'Peregrin', 'Pippin'], url: 'biographies.html#pippin', titre: 'Biographie de Pippin' },
    { noms: ['Boromir'], url: 'biographies.html#boromir', titre: 'Biographie de Boromir' },
    { noms: ['Faramir'], url: 'biographies.html#faramir', titre: 'Biographie de Faramir' },
    { noms: ['Saroumane'], url: 'biographies.html#saroumane', titre: 'Biographie de Saroumane' },
    { noms: ['Elrond'], url: 'biographies.html#elrond', titre: 'Biographie d\'Elrond' },
    { noms: ['Théoden'], url: 'biographies.html#theoden', titre: 'Biographie de Théoden' },
    { noms: ['Bard'], url: 'biographies.html#bard', titre: 'Biographie de Bard' },
    { noms: ['Smaug'], url: 'biographies.html#smaug', titre: 'Biographie de Smaug' },
    { noms: ['Thranduil'], url: 'biographies.html#thranduil', titre: 'Biographie de Thranduil' },

    // Créatures -> bestiaire.html#id
    { noms: ['Uruk-hai'], url: 'bestiaire.html#uruk-hai', titre: 'Bestiaire : les Uruk-hai' },
    { noms: ['Grand Gobelin', 'Gobelins', 'gobelins'], url: 'bestiaire.html#gobelins', titre: 'Bestiaire : les Gobelins' },
    { noms: ['Orques', 'orques', 'Orque', 'orque'], url: 'bestiaire.html#orques', titre: 'Bestiaire : les Orques' },
    { noms: ['Trolls', 'trolls', 'troll'], url: 'bestiaire.html#trolls', titre: 'Bestiaire : les Trolls' },
    { noms: ['Wargs', 'wargs'], url: 'bestiaire.html#wargs', titre: 'Bestiaire : les Wargs' },
    { noms: ['Nazgûl', 'Cavaliers noirs', 'Roi-Sorcier'], url: 'bestiaire.html#nazgul', titre: 'Bestiaire : les Nazgûl' },
    { noms: ['Balrog'], url: 'bestiaire.html#balrog', titre: 'Bestiaire : le Balrog' },
    { noms: ['Arachne', 'araignées', 'Araignées'], url: 'bestiaire.html#araignees', titre: 'Bestiaire : les Araignées géantes' },
    { noms: ['Mûmakil', 'Oliphants', 'oliphants', 'oliphant'], url: 'bestiaire.html#mumakil', titre: 'Bestiaire : les Mûmakil' },
    { noms: ['Ents', 'Ent'], url: 'bestiaire.html#ents', titre: 'Bestiaire : les Ents' },
    { noms: ['Aigles', 'aigles'], url: 'bestiaire.html#aigles', titre: 'Bestiaire : les Grands Aigles' },
    { noms: ['Gripoil'], url: 'bestiaire.html#mearas', titre: 'Bestiaire : les Mearas' },
    { noms: ['Armée des Morts', 'armée des Morts', 'armée des morts'], url: 'bestiaire.html#armee-des-morts', titre: 'Bestiaire : l\'Armée des Morts' },

    // Lieux -> carte.html#id (la carte se centre sur le lieu)
    { noms: ['Fondcombe'], url: 'carte.html#fondcombe', titre: 'Voir Fondcombe sur la carte' },
    { noms: ['Montagne Solitaire', 'Erebor'], url: 'carte.html#montagne-solitaire', titre: 'Voir la Montagne Solitaire sur la carte' },
    { noms: ['Minas Tirith'], url: 'carte.html#minas-tirith', titre: 'Voir Minas Tirith sur la carte' },
    { noms: ['Mordor'], url: 'carte.html#mordor', titre: 'Voir le Mordor sur la carte' },
    { noms: ['Gondor'], url: 'carte.html#gondor', titre: 'Voir le Gondor sur la carte' },
    { noms: ['Comté'], url: 'carte.html#comte', titre: 'Voir la Comté sur la carte' },
    { noms: ['Montagne du Destin'], url: 'carte.html#montagne-du-destin', titre: 'Voir la Montagne du Destin sur la carte' },
    { noms: ['Gouffre de Helm'], url: 'carte.html#gouffre-de-helm', titre: 'Voir le Gouffre de Helm sur la carte' },
    { noms: ['Porte Noire'], url: 'carte.html#porte-noire', titre: 'Voir la Porte Noire sur la carte' },
    { noms: ['Monts Brumeux'], url: 'carte.html#monts-brumeux', titre: 'Voir les Monts Brumeux sur la carte' },
    { noms: ['Forêt Noire'], url: 'carte.html#foret-noire', titre: 'Voir la Forêt Noire sur la carte' },
    { noms: ['Havres Gris'], url: 'carte.html#havres-gris', titre: 'Voir les Havres Gris sur la carte' },
    { noms: ['Lothlórien'], url: 'carte.html#lothlorien', titre: 'Voir la Lothlórien sur la carte' },
    { noms: ['Isengard'], url: 'carte.html#isengard', titre: 'Voir Isengard sur la carte' },
    { noms: ['Lacville'], url: 'carte.html#lacville', titre: 'Voir Lacville sur la carte' },
    { noms: ['Moria'], url: 'carte.html#moria', titre: 'Voir la Moria sur la carte' },
    { noms: ['Bree'], url: 'carte.html#bree', titre: 'Voir Bree sur la carte' }
];

// Blocs dans lesquels les liens sont ajoutés (chaque bloc a ses propres "premières mentions")
const BLOCS_AVEC_LIENS = [
    '.film .content', // Synopsis, acteurs et équipe technique de chaque film
    '.event',         // Chaque événement de la frise
    '.bestiaire .content' // Sections des fiches du bestiaire
];

// Éléments dont le texte n'est jamais transformé en lien
const SANS_LIENS = 'a, h1, h2, h3, h4, u, button';

(function () {
    // Le nom doit être un mot entier : "Sam" ne doit pas toucher "Samsagace"
    const lettre = '\\p{L}';
    const regles = LIENS.map(function (lien) {
        const noms = lien.noms.map(function (nom) {
            return nom.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        });
        return {
            lien: lien,
            regex: new RegExp('(?<!' + lettre + ')(' + noms.join('|') + ')(?!' + lettre + ')', 'u')
        };
    });

    // Remplace la première mention trouvée dans le bloc par un lien
    function lierPremiereMention(bloc, regle) {
        const walker = document.createTreeWalker(bloc, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                return node.parentElement.closest(SANS_LIENS) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }
        });

        let node;
        while ((node = walker.nextNode())) {
            const match = regle.regex.exec(node.nodeValue);
            if (!match) {
                continue;
            }
            const motTrouve = node.splitText(match.index);
            motTrouve.splitText(match[0].length);

            const a = document.createElement('a');
            a.href = regle.lien.url;
            a.title = regle.lien.titre;
            a.className = 'lien-auto';
            motTrouve.replaceWith(a);
            a.appendChild(motTrouve);
            return;
        }
    }

    // Ne pas faire de lien vers la page sur laquelle on se trouve déjà
    const pageActuelle = window.location.pathname.split('/').pop();

    document.querySelectorAll(BLOCS_AVEC_LIENS.join(',')).forEach(function (bloc) {
        regles.forEach(function (regle) {
            if (regle.lien.url.split('#')[0] !== pageActuelle) {
                lierPremiereMention(bloc, regle);
            }
        });
    });
})();
