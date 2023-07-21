import { renderPage } from './main.js';
export function render(data) {
  const container = document.createElement('div');
  container.classList.add(
    'container',
    'd-flex',
    'justify-content-between',
    'flex-wrap',
    'py-4'
  );

  for (const episode of data.result) {
    const episodeCard = document.createElement('div');
    const episodeBody = document.createElement('div');
    const title = document.createElement('h3');
    const numberEpisode = document.createElement('p');
    const detailsButton = document.createElement('a');

    episodeCard.style.width = '30%';
    episodeCard.classList.add('card', 'my-2');
    episodeBody.classList.add('card-body');
    title.classList.add('card-title');
    numberEpisode.classList.add('card-text');
    detailsButton.classList.add('btn', 'btn-primary');

    episodeCard.append(episodeBody);

    episodeBody.append(
      numberEpisode,
      title,
      detailsButton
    );
    title.textContent = episode.properties.title;
    numberEpisode.textContent = episode.uid;
    detailsButton.textContent = `Go to episode ${episode.uid}`;
    detailsButton.href = `?episodeId=${episode.uid}`;

    container.append(episodeCard);

    detailsButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.pushState(null, '', `?episodeId=${episode.uid}`);
      renderPage(
        './episode-details.js',
        `https://www.swapi.tech/api/films/${episode.uid}`,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'

        );
    });
  }
  return container;
}
