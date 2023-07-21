const cssPromises = {};

function loadResourse(src) {
  // или Java script module
  if (src.endsWith('.js')) {
    return import(src);
  }
  // или css файл
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;

      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }

    return cssPromises[src];
  }
  // данные с сервера
  return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(location.search);
const episodeId = searchParams.get('episodeId');

export function renderPage(moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css]
  .map(src => loadResourse(src))).then(([pageModule, data]) => {
    appContainer.innerHTML = '';
    appContainer.append(pageModule.render(data));
    console.log(data)
  });
}

if (episodeId) {

  // детальная страница
  renderPage(
    './episode-details.js',
    `https://www.swapi.tech/api/films/${episodeId}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'

    );
} else {
  renderPage(
    // главная
    './episode-list.js',
    'https://www.swapi.tech/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
  );
}
