// Test "Quel personnage es-tu ?" : une question à la fois, puis le résultat.
// Les questions, les points et les descriptions sont dans personnage-data.js.

(function () {
    const ecrans = {
        intro: document.getElementById('perso-intro'),
        question: document.getElementById('perso-question'),
        resultat: document.getElementById('perso-result')
    };
    const etape = document.getElementById('perso-step');
    const barre = document.getElementById('perso-bar');
    const titre = document.getElementById('perso-title');
    const listeReponses = document.getElementById('perso-answers');
    const boutonRetour = document.getElementById('perso-back');
    const messagePartage = document.getElementById('perso-share-message');

    const ids = Object.keys(PERSONNAGES);
    let reponses = [];      // Index de la réponse choisie pour chaque question
    let ordreReponses = []; // Ordre mélangé des réponses de chaque question
    let resultat = null;
    let dernierScores = {}; // Points de chaque personnage à la dernière partie

    // Mélange de Fisher-Yates : renvoie une copie mélangée du tableau
    function melanger(tableau) {
        const copie = [...tableau];
        for (let i = copie.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copie[i], copie[j]] = [copie[j], copie[i]];
        }
        return copie;
    }

    // Espaces insécables de la typographie française : "?" ne se retrouve jamais seul sur une ligne
    function typo(texte) {
        return texte.replace(/ ([?!:;»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
    }

    function afficher(nom) {
        Object.entries(ecrans).forEach(function ([cle, ecran]) {
            ecran.hidden = cle !== nom;
        });
    }

    function commencer() {
        reponses = [];
        // Les réponses changent de place à chaque partie, pour ne pas répondre "par habitude"
        ordreReponses = QUESTIONS.map(function (q) {
            return melanger(q.reponses.map(function (_, index) { return index; }));
        });
        messagePartage.textContent = '';
        afficher('question');
        afficherQuestion(0);
    }

    function afficherQuestion(numero) {
        const question = QUESTIONS[numero];
        etape.textContent = 'Question ' + (numero + 1) + ' / ' + QUESTIONS.length;
        barre.max = QUESTIONS.length;
        barre.value = numero;
        barre.setAttribute('aria-label', 'Progression : question ' + (numero + 1) + ' sur ' + QUESTIONS.length);
        titre.textContent = typo(question.question);

        listeReponses.replaceChildren();
        ordreReponses[numero].forEach(function (index) {
            const item = document.createElement('li');
            const bouton = document.createElement('button');
            bouton.type = 'button';
            bouton.className = 'perso-answer';
            bouton.textContent = typo(question.reponses[index].texte);
            // Réponse déjà choisie (retour à une question précédente)
            if (reponses[numero] === index) {
                bouton.classList.add('perso-answer-chosen');
                bouton.setAttribute('aria-pressed', 'true');
            }
            bouton.addEventListener('click', function () {
                reponses[numero] = index;
                if (numero + 1 < QUESTIONS.length) {
                    afficherQuestion(numero + 1);
                } else {
                    afficherResultat();
                }
            });
            item.appendChild(bouton);
            listeReponses.appendChild(item);
        });

        boutonRetour.hidden = numero === 0;
        boutonRetour.onclick = function () {
            afficherQuestion(numero - 1);
        };

        // Le lecteur d'écran lit la nouvelle question, le clavier repart d'ici
        titre.focus();
    }

    // Additionne les points de chaque personnage selon les réponses choisies
    function calculerScores() {
        const scores = {};
        const questionsMarquees = {};
        ids.forEach(function (id) {
            scores[id] = 0;
            questionsMarquees[id] = 0;
        });
        reponses.forEach(function (index, numero) {
            Object.entries(QUESTIONS[numero].reponses[index].points).forEach(function ([id, points]) {
                scores[id] += points;
                questionsMarquees[id]++;
            });
        });
        // Classement : le plus de points, puis des points venant du plus de questions différentes
        dernierScores = scores;
        return ids.slice().sort(function (a, b) {
            return scores[b] - scores[a]
                || questionsMarquees[b] - questionsMarquees[a]
                || ids.indexOf(a) - ids.indexOf(b);
        });
    }

    function afficherResultat() {
        const classement = calculerScores();
        resultat = classement[0];
        const perso = PERSONNAGES[resultat];

        const image = document.getElementById('perso-result-image');
        image.src = perso.image;
        image.alt = perso.nom;
        // Majuscule en début de titre : "Un Ent !" (le nom reste "un Ent" dans les phrases)
        document.getElementById('perso-result-name').textContent = perso.nom.charAt(0).toUpperCase() + perso.nom.slice(1) + '\u00a0!';
        document.getElementById('perso-result-description').textContent = typo(perso.description);

        const traits = document.getElementById('perso-result-traits');
        traits.replaceChildren(...perso.traits.map(function (trait) {
            const li = document.createElement('li');
            li.textContent = trait;
            return li;
        }));

        // "de Frodon", mais "d'Aragorn", "d'Éowyn" devant une voyelle
        // "de Frodon", "d'Aragorn", "d'un Ent" : élision devant une voyelle ou "un"
        const deNom = function (id) {
            const nom = PERSONNAGES[id].nom;
            return (/^[aeiouyéèêàâîôû]/i.test(nom) ? 'd\'' : 'de ') + nom;
        };
        // Les deux suivants du classement, seulement s'ils ont vraiment marqué des points
        const aussi = classement.slice(1, 3).filter(function (id) { return dernierScores[id] > 0; }).map(deNom);
        const ligneAussi = document.getElementById('perso-result-also');
        ligneAussi.textContent = aussi.length ? 'Tu as aussi un peu ' + aussi.join(' et ') + '.' : '';
        ligneAussi.hidden = !aussi.length;

        // Personnage : sa biographie ; créature : sa fiche du bestiaire
        const lienFiche = document.getElementById('perso-result-bio');
        lienFiche.href = perso.lien || 'biographies.html#' + resultat;
        lienFiche.textContent = perso.lien ? 'Voir sa fiche du bestiaire' : 'Lire sa biographie';
        messagePartage.textContent = '';

        afficher('resultat');
        window.scrollTo({ top: 0 });
        document.getElementById('perso-result-name').focus();
    }

    // Partage : menu de partage du téléphone si disponible, sinon copie du texte
    async function partager() {
        const perso = PERSONNAGES[resultat];
        const adresse = window.location.href.split('#')[0];
        const texte = 'Dans « Quel personnage es-tu ? » sur L\'Anneau du Savoir, je suis ' + perso.nom + ' ! Et toi ?';

        if (navigator.share) {
            try {
                await navigator.share({ title: 'Quel personnage es-tu ?', text: texte, url: adresse });
                return;
            } catch (erreur) {
                if (erreur.name === 'AbortError') {
                    return; // L'utilisateur a fermé le menu de partage
                }
            }
        }

        try {
            await navigator.clipboard.writeText(texte + ' ' + adresse);
            messagePartage.textContent = 'Texte copié ! Tu peux le coller où tu veux.';
        } catch (erreur) {
            messagePartage.textContent = texte + ' ' + adresse;
        }
    }

    document.getElementById('perso-start').addEventListener('click', commencer);
    document.getElementById('perso-restart').addEventListener('click', function () {
        commencer();
    });
    document.getElementById('perso-share').addEventListener('click', partager);
})();
