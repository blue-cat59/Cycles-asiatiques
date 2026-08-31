/* =========================================================
   Cinémas d'Asie de l'Est — logique de rendu partagée
   Ne pas modifier ce fichier pour ajouter des films :
   les films se rajoutent dans data-*.js
   ========================================================= */

// Un simple trait de pinceau réutilisé comme séparateur d'époque
function traitPinceau() {
  return `<svg class="era-stroke" viewBox="0 0 72 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M1 6.5C10 2 18 8.5 27 5C36 1.5 44 8 53 4.5C60 2 66 6 71 3.5"
      stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

function echapper(str) {
  const d = document.createElement('div');
  d.textContent = str ?? '';
  return d.innerHTML;
}

// Un seul endroit où sont déclarés les 4 cycles : id -> {nom de la page, tableau de données}
const CYCLES = {
  'japon':    { page: 'japon.html',           get films() { return typeof FILMS_JAPON !== 'undefined' ? FILMS_JAPON : null; } },
  'coree':    { page: 'coree.html',           get films() { return typeof FILMS_COREE !== 'undefined' ? FILMS_COREE : null; } },
  'chine-hk': { page: 'chine-hongkong.html',  get films() { return typeof FILMS_CHINE_HK !== 'undefined' ? FILMS_CHINE_HK : null; } },
  'taiwan':   { page: 'taiwan.html',          get films() { return typeof FILMS_TAIWAN !== 'undefined' ? FILMS_TAIWAN : null; } },
};

// Construit l'URL vers la page de détail d'un film, pour un cycle donné
function lienFilm(cycleId, film) {
  return `film.html?cycle=${encodeURIComponent(cycleId)}&titre=${encodeURIComponent(film.titre)}`;
}

function carteFilm(film, cycleId) {
  const note = film.note ? `<p class="note">${echapper(film.note)}</p>` : '';
  const lien = film.lien
    ? `<a class="lien" href="${echapper(film.lien)}" target="_blank" rel="noopener">Voir sur Letterboxd ↗</a>`
    : '';
  const titreHTML = cycleId
    ? `<a href="${lienFilm(cycleId, film)}">${echapper(film.titre)}</a>`
    : echapper(film.titre);
  return `
    <article class="film">
      <div class="film-row">
        <h3>${titreHTML} <span class="realisateur">— ${echapper(film.realisateur)}</span></h3>
        <span class="sorti">sorti en ${echapper(String(film.annee))}</span>
      </div>
      ${note}
      ${lien}
    </article>`;
}

/**
 * Affiche la frise d'un cycle dans #timeline.
 * `films` doit être trié dans l'ordre chronologique NARRATIF
 * (l'ordre du tableau = l'ordre d'affichage, pas l'année de sortie).
 */
function renderCycle(films, cycleId) {
  const container = document.getElementById('timeline');
  if (!container) return;

  let html = '';
  let dernierePeriode = null;

  films.forEach((film) => {
    if (film.epoque !== dernierePeriode) {
      html += `
        <section class="era">
          ${traitPinceau()}
          <h2>${echapper(film.epoque)}</h2>
        </section>`;
      dernierePeriode = film.epoque;
    }
    html += carteFilm(film, cycleId);
  });

  container.innerHTML = html || '<p>Aucun film pour le moment — ajoutez-en dans le fichier de données.</p>';
}

/**
 * Affiche la page de détail d'un film (film.html) en lisant les
 * paramètres ?cycle=...&titre=... dans l'URL.
 */
function renderFicheFilm() {
  const container = document.getElementById('fiche-film');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const cycleId = params.get('cycle');
  const titre = params.get('titre');
  const cycle = CYCLES[cycleId];
  const film = cycle && cycle.films ? cycle.films.find((f) => f.titre === titre) : null;

  if (!cycle || !film) {
    container.innerHTML = `<p>Film introuvable. <a href="index.html">Retour à l'accueil</a>.</p>`;
    return;
  }

  const critiqueHTML = film.critique
    ? film.critique.split(/\n\s*\n/).map((p) => `<p>${echapper(p)}</p>`).join('')
    : `<p class="note">Pas encore de critique rédigée pour ce film — ajoutez le champ <code>critique</code> dans ${cycleId === 'chine-hk' ? 'data-chine-hk.js' : `data-${cycleId}.js`}.</p>`;

  const lien = film.lien
    ? `<a class="lien" href="${echapper(film.lien)}" target="_blank" rel="noopener">Voir sur Letterboxd ↗</a>`
    : '';

  document.title = `${film.titre} — ${film.realisateur}`;

  container.innerHTML = `
    <a class="back-link film-back" href="${cycle.page}">← Retour au cycle</a>
    <span class="eyebrow">${echapper(film.epoque)}</span>
    <h1>${echapper(film.titre)}</h1>
    <p class="film-meta">${echapper(film.realisateur)} — sorti en ${echapper(String(film.annee))}</p>
    <div class="critique">${critiqueHTML}</div>
    ${lien}
  `;
}

/**
 * Remplit les compteurs de films sur les cartes de la page d'accueil,
 * à partir des tableaux globaux chargés (FILMS_JAPON, etc.)
 */
function renderCompteurs() {
  const cycles = [
    { id: 'japon', data: typeof FILMS_JAPON !== 'undefined' ? FILMS_JAPON : null },
    { id: 'coree', data: typeof FILMS_COREE !== 'undefined' ? FILMS_COREE : null },
    { id: 'chine-hk', data: typeof FILMS_CHINE_HK !== 'undefined' ? FILMS_CHINE_HK : null },
    { id: 'taiwan', data: typeof FILMS_TAIWAN !== 'undefined' ? FILMS_TAIWAN : null },
  ];
  cycles.forEach(({ id, data }) => {
    const el = document.querySelector(`[data-count-for="${id}"]`);
    if (el && Array.isArray(data)) {
      el.textContent = `${data.length} film${data.length > 1 ? 's' : ''} au catalogue`;
    }
  });
}
