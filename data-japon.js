/* =========================================================
   CYCLE JAPON — données des films
   =========================================================
   Ajoutez vos ~600 films ici, DANS L'ORDRE CHRONOLOGIQUE
   NARRATIF (l'ordre dans lequel ils apparaissent dans ce
   tableau = l'ordre d'affichage sur la frise, pas l'année
   de sortie du film).

   Chaque film est un objet avec ces champs :
     titre        (obligatoire) — le titre du film
     realisateur  (obligatoire)
     annee        (obligatoire) — année de SORTIE du film
     epoque       (obligatoire) — le nom de la période
                  historique représentée. Deux films avec
                  la même valeur "epoque" restent groupés
                  sous le même en-tête ; changez-la pour
                  faire apparaître un nouveau séparateur.
     note         (optionnel)   — une courte phrase de contexte
     lien         (optionnel)   — URL Letterboxd du film
     critique     (optionnel)   — votre texte de critique complet.
                  Il s'affiche sur la fiche dédiée du film (accessible
                  en cliquant sur le titre depuis la frise). Pour un
                  saut de paragraphe, laissez une ligne vide entre
                  deux paragraphes, comme dans l'exemple ci-dessous.
   ========================================================= */

const FILMS_JAPON = [
  {
    titre: "Barberousse",
    realisateur: "Akira Kurosawa",
    annee: 1965,
    epoque: "Époque d'Edo (1603–1868)",
    note: "Un jeune médecin apprend son métier auprès d'un praticien intraitable, dans un Japon encore féodal.",
    lien: "https://letterboxd.com/film/red-beard/",
    critique: `Barberousse ouvre le cycle par un geste presque paradoxal : filmer l'Histoire depuis sa marge, dans un dispensaire de quartier plutôt que dans un château ou un champ de bataille.

C'est ce regard depuis le bas, vers ceux que l'Histoire officielle ignore, qui en fait un point de départ idéal — tout le reste du cycle peut se lire comme une suite de variations sur cette même question : qui raconte, et depuis où.`,
  },
  {
    titre: "Le Château de l'araignée",
    realisateur: "Akira Kurosawa",
    annee: 1957,
    epoque: "Époque d'Edo (1603–1868)",
    note: "Macbeth transposé dans le Japon des guerres claniques.",
  },
  {
    titre: "Le Jardin des femmes",
    realisateur: "Keisuke Kinoshita",
    annee: 1954,
    epoque: "Ère Meiji (1868–1912)",
    note: "Exemple — remplacez par un vrai film de votre liste si besoin.",
  },
  {
    titre: "La Ballade de Narayama",
    realisateur: "Shohei Imamura",
    annee: 1983,
    epoque: "Ère Meiji (1868–1912)",
  },
  {
    titre: "La Condition de l'homme",
    realisateur: "Masaki Kobayashi",
    annee: 1959,
    epoque: "Seconde guerre sino-japonaise et Seconde Guerre mondiale (1931–1945)",
    note: "Trilogie suivant un pacifiste japonais happé par la guerre en Mandchourie.",
  },
  {
    titre: "La Tombe des lucioles",
    realisateur: "Isao Takahata",
    annee: 1988,
    epoque: "Seconde guerre sino-japonaise et Seconde Guerre mondiale (1931–1945)",
  },
  {
    titre: "Pluie noire",
    realisateur: "Shohei Imamura",
    annee: 1989,
    epoque: "Occupation américaine et lendemains d'Hiroshima (1945–1952)",
  },
  {
    titre: "Departures",
    realisateur: "Yôjirô Takita",
    annee: 2008,
    epoque: "Japon contemporain (1990–aujourd'hui)",
    note: "Placé ici car son intrigue se déroule à l'époque contemporaine, malgré une sortie plus ancienne.",
  },
  {
    titre: "Drive My Car",
    realisateur: "Ryûsuke Hamaguchi",
    annee: 2021,
    epoque: "Japon contemporain (1990–aujourd'hui)",
    critique: `Un film sur le deuil et la parole empêchée, porté par une mise en scène d'une lenteur totalement maîtrisée.

Ce qui frappe surtout, c'est la façon dont le texte de Tchekhov infuse peu à peu la vie des personnages, jusqu'à devenir leur seul langage possible.`
  },
];
