import { renderPage } from './main.js';

async function getData(url) {
  let request = await fetch(url),
    info = await request.json();
  return info;
}
export function render(data) {
  const container = document.createElement('div');
  container.classList.add(
    'container',
    'py-4'
  );

  const episodeTitle = document.createElement('h1');
  const backButton = document.createElement('button');
  const description = document.createElement('p');
  backButton.classList.add('btn-info', 'btn');
  description.classList.add('lead', 'py-20');

  episodeTitle.style.color = 'blue';
  episodeTitle.classList.add('text-center', 'py-20')
  episodeTitle.textContent = data.result.properties.title;
  backButton.textContent = 'Back to episodes';
  description.textContent = data.result.properties.opening_crawl;

  backButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.back();
    renderPage(
      './episode-list.js',
      'https://www.swapi.tech/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css'
    );
  });
  container.append(
    episodeTitle,
    backButton,
    description
  );
  function preloaderCreate() {
    const preloaderBox = document.createElement('div');
    const preloader = document.createElement('div');
    const loader = document.createElement('span');
    preloader.classList.add('spinner-border','text-primary');
    preloader.role = "status";
    preloaderBox.classList.add('text-center');
    loader.textContent = 'Load...';
    loader.classList.add('visually-hidden');
    preloader.append(loader);
    preloaderBox.append(preloader)
    return preloaderBox;
  }
  const planetTitle = document.createElement('h2');
  planetTitle.classList.add('card-title', 'text-center', 'py-4');
  planetTitle.textContent = 'Planets';

  container.append(planetTitle);

  const planetList = document.createElement('ul');
  planetList.classList.add('list-group', 'list-group-flush');
  planetList.append(preloaderCreate());

  let planetPageList = [];
  const planetsUrl = data.result.properties.planets;

  for (let planet of planetsUrl) {
    planetPageList.push(planet)
  }

  Promise.all(planetPageList
  .map(page => getData(page)))
  .then(planetData => {
    planetList.querySelector('div').remove();
    planetData.forEach(planet => {
      const planetElement = document.createElement('li');
      planetElement.classList.add('list-group-item');
      planetElement.textContent = planet.result.properties.name;
      planetList.append(planetElement);

    })
  })
  container.append(planetList);

  const speciesTitle = document.createElement('h2');
  speciesTitle.classList.add('card-title', 'text-center');
  speciesTitle.textContent = 'Species';
  container.append(speciesTitle);

  const speciesList = document.createElement('ul');
  speciesList.classList.add('list-group', 'list-group-flush');
  speciesList.append(preloaderCreate());

  let speciesPageList = [];
  const speciesUrl = data.result.properties.species;

  for (let species of speciesUrl) {
    speciesPageList.push(species);
  }
  Promise.all(speciesPageList
    .map(page => getData(page)))
    .then(speciesData => {
      speciesList.querySelector('div').remove();
      speciesData.forEach(species => {
        const speciesElement = document.createElement('li');
        speciesElement.classList.add('list-group-item');
        speciesElement.textContent = species.result.properties.name;
        speciesList.append(speciesElement);

      })
    })
    container.append(speciesList);
  const starshipsTitle = document.createElement('h2');
  starshipsTitle.classList.add('card-title', 'text-center');
  starshipsTitle.textContent = 'Starships';

  container.append(starshipsTitle);

  const starshipList = document.createElement('ul');
  starshipList.classList.add('list-group', 'list-group-flush');
  starshipList.append(preloaderCreate());

  const starshipPageList = [];
  const starshipsUrl = data.result.properties.starships;

  for (let starship of starshipsUrl) {
    starshipPageList.push(starship);
  }

  Promise.all(starshipPageList
    .map(page => getData(page)))
    .then(starshipData => {
      starshipList.querySelector('div').remove();
      starshipData.forEach(starship => {
        const starshipElement = document.createElement('li');
        starshipElement.classList.add('list-group-item');
        starshipElement.textContent = starship.result.properties.name;
        starshipList.append(starshipElement);
      })
    })
    container.append(starshipList);

  return container;
}

