// Données du test "Quel personnage es-tu ?" (utilisées par personnage.js).
//
// Chaque réponse donne des points à un ou plusieurs personnages : { sam: 2, bilbon: 1 }.
// À la fin, le personnage qui a le plus de points est le résultat.
// Les identifiants sont ceux des biographies (biographies.html#sam).

const PERSONNAGES = {
    frodon: {
        nom: 'Frodon Sacquet', image: 'images/frodon2.webp',
        description: 'Tu portes parfois sur tes épaules plus que ta part, sans jamais te plaindre. Discret et sensible, tu as pourtant un courage immense quand il s\'agit de protéger ceux que tu aimes.',
        traits: ['Courageux', 'Sensible', 'Persévérant']
    },
    sam: {
        nom: 'Sam Gamegie', image: 'images/sam.webp',
        description: 'Tu es l\'ami que tout le monde rêve d\'avoir : fidèle jusqu\'au bout, toujours là quand ça compte. Tu aimes les choses simples, un bon repas, un jardin… et tu ne lâches jamais rien.',
        traits: ['Loyal', 'Généreux', 'Tenace']
    },
    bilbon: {
        nom: 'Bilbon Sacquet', image: 'images/bilbon2.webp',
        description: 'Tu aimes ton confort, mais une petite voix te pousse toujours vers l\'aventure. Curieux, malicieux et plein d\'histoires à raconter, tu surprends toujours ceux qui te sous-estiment.',
        traits: ['Curieux', 'Malicieux', 'Débrouillard']
    },
    gandalf: {
        nom: 'Gandalf', image: 'images/gandalf2.webp',
        description: 'On vient te voir pour un conseil, et tu sais toujours quoi dire (même si c\'est parfois une énigme). Sage, un peu farceur, tu arrives toujours précisément quand il le faut.',
        traits: ['Sage', 'Bienveillant', 'Facétieux']
    },
    aragorn: {
        nom: 'Aragorn', image: 'images/aragorn.webp',
        description: 'Tu es un leader naturel, mais tu n\'aimes pas te mettre en avant. Tu protèges les autres, tu doutes parfois de toi, et pourtant tout le monde te suivrait jusqu\'au bout du monde.',
        traits: ['Protecteur', 'Humble', 'Meneur']
    },
    legolas: {
        nom: 'Legolas', image: 'images/legolas2.webp',
        description: 'Calme, précis et toujours attentif à ce qui t\'entoure, tu remarques ce que les autres ne voient pas. Tu gardes ton sang-froid quand tout s\'agite, avec une élégance naturelle.',
        traits: ['Attentif', 'Agile', 'Serein']
    },
    arwen: {
        nom: 'Arwen', image: 'images/arwen.webp',
        description: 'Douce en apparence mais d\'une force incroyable, tu fais tes choix avec le cœur et tu t\'y tiens, quoi qu\'il en coûte. Pour ceux que tu aimes, tu es prêt(e) à tout.',
        traits: ['Romantique', 'Déterminé(e)', 'Fidèle']
    },
    gollum: {
        nom: 'Gollum', image: 'images/gollum.webp',
        description: 'Tu as un côté solitaire et tu t\'attaches très fort à ce qui compte pour toi… peut-être un peu trop. Rusé et imprévisible, tu as aussi, au fond, une part de lumière qui ne demande qu\'à revenir.',
        traits: ['Rusé', 'Solitaire', 'Imprévisible']
    },
    thorin: {
        nom: 'Thorin', image: 'images/thorin2.webp',
        description: 'Fier, déterminé et loyal envers les tiens, tu te bats pour ce qui t\'appartient. Ta volonté est inébranlable… même si ton orgueil te joue parfois des tours.',
        traits: ['Fier', 'Déterminé', 'Loyal']
    },
    kili: {
        nom: 'Kili', image: 'images/kili.webp',
        description: 'Fonceur, charmeur et toujours partant, tu vis chaque aventure à fond. Tu agis parfois avant de réfléchir, mais ton enthousiasme entraîne tout le monde avec toi.',
        traits: ['Fougueux', 'Charmeur', 'Enthousiaste']
    },
    galadriel: {
        nom: 'Galadriel', image: 'images/galadriel.webp',
        description: 'Mystérieuse et lumineuse, tu sembles toujours en savoir plus que tu ne le dis. Les autres te font confiance d\'instinct, et tu sais résister aux tentations que d\'autres ne surmontent pas.',
        traits: ['Mystérieux(se)', 'Clairvoyant(e)', 'Inspirant(e)']
    },
    tauriel: {
        nom: 'Tauriel', image: 'images/tauriel.webp',
        description: 'Tu suis ton propre sens de la justice, même quand il faut désobéir. Guerrier(ère) dans l\'âme, tu n\'hésites pas à sortir des chemins tracés pour faire ce qui est juste.',
        traits: ['Rebelle', 'Juste', 'Intrépide']
    },
    sauron: {
        nom: 'Sauron', image: 'images/sauron.webp',
        description: 'Tu as de grandes ambitions et tu aimes que tout soit sous contrôle… vraiment tout. Rassure-toi : ce sont de belles qualités d\'organisateur, tant que tu n\'essaies pas de dominer la Terre du Milieu !',
        traits: ['Ambitieux', 'Organisé', 'Perfectionniste']
    },
    gimli: {
        nom: 'Gimli', image: 'images/gimli.webp',
        description: 'Bourru au premier abord, tu as un cœur en or et un humour à toute épreuve. Tu aimes les défis (et gagner les concours), et tu es d\'une fidélité absolue envers tes amis.',
        traits: ['Drôle', 'Loyal', 'Compétitif']
    },
    eowyn: {
        nom: 'Éowyn', image: 'images/eowyn.webp',
        description: 'Tu refuses qu\'on décide à ta place de ce dont tu es capable. Courageux(se) et indépendant(e), tu te bats pour prouver ta valeur, et tu surprends tout le monde quand ça compte vraiment.',
        traits: ['Indépendant(e)', 'Courageux(se)', 'Déterminé(e)']
    },
    // Créatures du bestiaire : "lien" mène à leur fiche, "nom" s'affiche après "Tu es…"
    ents: {
        nom: 'un Ent', image: 'images/bestiaire-ents.webp', lien: 'bestiaire.html#ents',
        description: 'Tu prends le temps de réfléchir avant d\'agir… parfois beaucoup de temps ! Calme et profondément attaché(e) à la nature, tu deviens pourtant une force irrésistible quand on s\'en prend à ce que tu aimes.',
        traits: ['Patient(e)', 'Sage', 'Protecteur(trice)']
    },
    aigles: {
        nom: 'un Grand Aigle', image: 'images/bestiaire-aigles.webp', lien: 'bestiaire.html#aigles',
        description: 'Tu as toujours une vue d\'ensemble et tu arrives exactement quand on a besoin de toi. Noble et indépendant(e), tu n\'aimes pas te mêler de tout, mais tu ne laisses jamais tomber tes amis.',
        traits: ['Noble', 'Indépendant(e)', 'Secourable']
    },
    mearas: {
        nom: 'Gripoil', image: 'images/bestiaire-mearas.webp', lien: 'bestiaire.html#mearas',
        description: 'Rapide, libre et fier(ère), tu ne te laisses pas facilement apprivoiser… mais quand tu choisis quelqu\'un, c\'est pour la vie. Tu es toujours là au bon moment, et aucune course ne te fait peur.',
        traits: ['Libre', 'Rapide', 'Fidèle']
    },
    balrog: {
        nom: 'un Balrog', image: 'images/bestiaire-balrog.webp', lien: 'bestiaire.html#balrog',
        description: 'Tu as un tempérament de feu ! Impressionnant(e) et plein(e) d\'énergie, tu ne passes jamais inaperçu(e)… Attention simplement à ne pas tout brûler sur ton passage quand tu te mets en colère.',
        traits: ['Passionné(e)', 'Impressionnant(e)', 'Explosif(ve)']
    },
    trolls: {
        nom: 'un Troll', image: 'images/bestiaire-trolls.webp', lien: 'bestiaire.html#trolls',
        description: 'Tu as une force incroyable et un appétit à la hauteur ! Tu n\'aimes pas trop te lever tôt (le soleil, très peu pour toi), mais on peut toujours compter sur toi pour soulever des montagnes.',
        traits: ['Costaud', 'Gourmand(e)', 'Lève-tard']
    },
    nazgul: {
        nom: 'un Nazgûl', image: 'images/bestiaire-nazgul.webp', lien: 'bestiaire.html#nazgul',
        description: 'Discret(ète), mystérieux(se) et redoutablement déterminé(e), tu ne lâches jamais une piste. Quand tu as un objectif en tête, rien ne peut t\'arrêter… sauf peut-être une rivière.',
        traits: ['Mystérieux(se)', 'Déterminé(e)', 'Persévérant(e)']
    }
};

const QUESTIONS = [
    {
        question: 'Quel serait ton week-end idéal ?',
        reponses: [
            { texte: 'Un bon repas, mon jardin et mes amis', points: { sam: 2, frodon: 1, trolls: 1 } },
            { texte: 'Partir à l\'aventure sans prévenir personne', points: { bilbon: 2, kili: 1, mearas: 2 } },
            { texte: 'Lire de vieux livres au calme', points: { gandalf: 2, arwen: 1 } },
            { texte: 'M\'entraîner au combat', points: { eowyn: 2, tauriel: 1, balrog: 1 } },
            { texte: 'Une très, très longue promenade en forêt, sans me presser', points: { ents: 2 } }
        ]
    },
    {
        question: 'Face à un danger, tu…',
        reponses: [
            { texte: 'Protèges les autres avant toi-même', points: { aragorn: 2, sam: 1, aigles: 1 } },
            { texte: 'Fonces sans trop réfléchir', points: { kili: 2, gimli: 1, mearas: 1 } },
            { texte: 'Observes et attends le bon moment pour agir', points: { legolas: 2, galadriel: 1, ents: 1 } },
            { texte: 'Te caches et trouves une ruse pour t\'en sortir', points: { gollum: 2, bilbon: 1 } },
            { texte: 'Fais trembler la terre en rugissant', points: { balrog: 2, trolls: 1 } }
        ]
    },
    {
        question: 'Quel est ton plus grand défaut ?',
        reponses: [
            { texte: 'Je suis têtu(e) et fier(ère)', points: { thorin: 2, gimli: 1, trolls: 1 } },
            { texte: 'Je suis trop curieux(se)', points: { bilbon: 2, frodon: 1 } },
            { texte: 'Je veux que tout soit sous mon contrôle', points: { sauron: 2, thorin: 1, nazgul: 1 } },
            { texte: 'Je n\'écoute que mon cœur, même quand il ne faut pas', points: { tauriel: 2, arwen: 1 } },
            { texte: 'Je mets très (très) longtemps à me décider', points: { ents: 2 } }
        ]
    },
    {
        question: 'Choisis un objet pour partir en voyage :',
        reponses: [
            { texte: 'Une épée héritée de mes ancêtres', points: { aragorn: 2, eowyn: 1 } },
            { texte: 'Un arc et des flèches', points: { legolas: 2, tauriel: 1, kili: 1 } },
            { texte: 'Une bonne hache', points: { gimli: 2, thorin: 1, trolls: 1 } },
            { texte: 'Un simple anneau en or…', points: { gollum: 1, sauron: 1, frodon: 1, nazgul: 1 } },
            { texte: 'Rien du tout : mes ailes me suffisent', points: { aigles: 2 } }
        ]
    },
    {
        question: 'Tes amis te décrivent comme quelqu\'un de…',
        reponses: [
            { texte: 'Loyal(e), quoi qu\'il arrive', points: { sam: 2, gimli: 1, mearas: 1 } },
            { texte: 'Sage et de bon conseil', points: { gandalf: 2, galadriel: 1, ents: 1 } },
            { texte: 'Mystérieux(se)', points: { legolas: 2, galadriel: 1, balrog: 1 } },
            { texte: 'Romantique', points: { arwen: 2, kili: 1 } },
            { texte: 'Rapide et libre comme le vent', points: { mearas: 2, aigles: 1 } }
        ]
    },
    {
        question: 'Où aimerais-tu vivre ?',
        reponses: [
            { texte: 'Dans un trou de hobbit douillet', points: { frodon: 2, sam: 1, bilbon: 1 } },
            { texte: 'Dans une forêt elfique', points: { tauriel: 2, legolas: 1, galadriel: 1, ents: 1 } },
            { texte: 'Sous une montagne, entouré(e) de trésors', points: { thorin: 2, gimli: 1 } },
            { texte: 'Dans une tour qui domine tout le pays', points: { sauron: 2 } },
            { texte: 'Dans une grotte sombre, bien à l\'abri du soleil', points: { trolls: 2, balrog: 1 } }
        ]
    },
    {
        question: 'Le pouvoir, pour toi, c\'est…',
        reponses: [
            { texte: 'Un fardeau à porter pour protéger les autres', points: { frodon: 2, aragorn: 1 } },
            { texte: 'Une tentation à refuser, même si c\'est difficile', points: { galadriel: 2, gandalf: 1, aigles: 1 } },
            { texte: 'Un moyen de réaliser de grandes choses', points: { sauron: 2, thorin: 1 } },
            { texte: '« Mon précieux… »', points: { gollum: 3 } },
            { texte: 'Le feu et l\'ombre', points: { balrog: 3, nazgul: 1 } }
        ]
    },
    {
        question: 'Qu\'est-ce qui te motive le plus ?',
        reponses: [
            { texte: 'Prouver ma valeur, même quand on me dit non', points: { eowyn: 2, tauriel: 1, mearas: 1 } },
            { texte: 'Retrouver ce qui m\'appartient', points: { thorin: 2, gollum: 1 } },
            { texte: 'L\'amour', points: { arwen: 2, kili: 1 } },
            { texte: 'La paix pour tout le monde', points: { aragorn: 2, frodon: 1, ents: 1, aigles: 1 } },
            { texte: 'Servir mon maître, quoi qu\'il arrive', points: { nazgul: 2, trolls: 1 } }
        ]
    },
    {
        question: 'On t\'organise une fête surprise. Tu…',
        reponses: [
            { texte: 'Fais un discours… puis disparais d\'un coup', points: { bilbon: 2, gandalf: 1 } },
            { texte: 'Lances un concours de celui qui boit le plus', points: { gimli: 2, legolas: 1, trolls: 1 } },
            { texte: 'Danses jusqu\'au bout de la nuit', points: { kili: 2, tauriel: 1 } },
            { texte: 'Restes dans un coin à tout observer', points: { sauron: 1, galadriel: 1, gollum: 1, nazgul: 1 } },
            { texte: 'Arrives au dernier moment, quand plus personne ne t\'attendait', points: { aigles: 2, mearas: 2 } }
        ]
    },
    {
        question: 'Quelle phrase te ressemble le plus ?',
        reponses: [
            { texte: '« Tout ce que nous avons à décider, c\'est ce que nous devons faire du temps qui nous est imparti. »', points: { gandalf: 2, galadriel: 1 } },
            { texte: '« Je ne peux pas le porter pour vous, mais je peux vous porter ! »', points: { sam: 2 } },
            { texte: '« Je ne suis pas un homme ! »', points: { eowyn: 3 } },
            { texte: '« Je préfère partager une vie avec toi plutôt que d\'affronter seule tous les âges de ce monde. »', points: { arwen: 2, aragorn: 1 } },
            { texte: '« Sacquet… La Comté… »', points: { nazgul: 2 } }
        ]
    }
];
