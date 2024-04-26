console.log('>> Ready :)');

const mainPage = document.querySelector('.js-page');
const mainTitle = document.createElement('h1');
const form = document.createElement('form');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
const resetButton = document.createElement('button');


mainTitle.setAttribute('class', 'main__page--title');
mainTitle.textContent = `La cocktelería de Lucía`;
mainPage.appendChild(mainTitle);

form.setAttribute('class', 'main__page--form');
mainPage.appendChild(form);

searchInput.setAttribute('type', 'text');
searchInput.setAttribute('id', 'search');
searchInput.setAttribute('placeholder', 'Introduce el nombre del cocktail');
searchInput.setAttribute('name', 'search');
searchInput.setAttribute('class', 'main__page--search');
form.appendChild(searchInput);

searchButton.setAttribute('id', 'searchBtn');
searchButton.textContent = 'Buscar';
form.appendChild(searchButton);

resetButton.setAttribute('id', 'searchBtn');
resetButton.textContent = 'Reset';
form.appendChild(resetButton);






