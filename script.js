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

function carteFilm(film) {
  const note = film.note ? `<p class="note">${echapper(film.note)}</p>` : '';
  const lien = film.lien
    ? `<a class="lien" href="${echapper(film.lien)}" target="_blank" rel="noopener">Voir sur Letterboxd ↗</a>`
    : '';
  return `
    <article class="film">
      <div class="film-row">
        <h3>${echapper(film.titre)} <span class="realisateur">— ${echapper(film.realisateur)}</span></h3>
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
function renderCycle(films) {
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
    html += carteFilm(film);
  });

  container.innerHTML = html || '<p>Aucun film pour le moment — ajoutez-en dans le fichier de données.</p>';
}

/**
 * Remplit les compteurs de films sur les cartes de la page d'accueil,
 * à partir des tableaux globaux chargés (FILMS_JAPON, etc.)
 */
function renderCompteurs() {
  const cycles = [
    { id: 'japon', data: window.FILMS_JAPON },
    { id: 'coree', data: window.FILMS_COREE },
    { id: 'chine-hk', data: window.FILMS_CHINE_HK },
    { id: 'taiwan', data: window.FILMS_TAIWAN },
  ];
  cycles.forEach(({ id, data }) => {
    const el = document.querySelector(`[data-count-for="${id}"]`);
    if (el && Array.isArray(data)) {
      el.textContent = `${data.length} film${data.length > 1 ? 's' : ''} au catalogue`;
    }
  });
}
