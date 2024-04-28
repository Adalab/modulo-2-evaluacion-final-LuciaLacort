console.log('pages ready');

//Tengo que crear el html desde aquí, entonces primero voy a decir las etiquetas que quiero crear:

const mainPage = document.querySelector('.js-page');
const mainTitle = document.createElement('h1');
const form = document.createElement('form');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
const resetButton = document.createElement('button');
const section = document.createElement('section');
const createFavUl = document.createElement('ul');
const createUl = document.createElement('ul');
const searchWarning = document.createElement('p');
const sectionFav = document.createElement('section');
// const createLi = document.createElement('li');


//Despues, una por una, tengo que ir metiendo los atributos que normalmente les pondría en la etiqueta de apertura. Después, tengo que ponerle contenido (si tienen) y decir quien es su madre para que se coloquen dentro:


mainTitle.setAttribute('class', 'main__page--title');
mainTitle.textContent = `Las margaritas de Lucía`;
mainPage.appendChild(mainTitle);

form.setAttribute('class', 'main__page--form');
mainPage.appendChild(form);

searchInput.setAttribute('type', 'text');
searchInput.setAttribute('id', 'search');
searchInput.setAttribute('placeholder', 'Introduce el nombre del cocktail');
searchInput.setAttribute('name', 'search');
searchInput.setAttribute('class', 'js-search-input');
searchInput.classList.add('main__page--search');
form.appendChild(searchInput);

searchButton.setAttribute('id', 'searchBtn');
searchButton.setAttribute('class', 'js-search-btn');
searchButton.classList.add('search__button');
searchButton.textContent = 'Buscar';
form.appendChild(searchButton);

resetButton.setAttribute('id', 'resetBtn');
resetButton.setAttribute('class', 'js-reset-btn');
resetButton.classList.add('reset__button');
resetButton.textContent = 'Reset';
form.appendChild(resetButton);

searchWarning.setAttribute('class', 'js-search-warning');
searchWarning.classList.add('search__warning');
searchWarning.classList.add('hidden');

mainPage.appendChild(searchWarning);

section.setAttribute('class', 'js-section');
section.classList.add('drinks__section');
mainPage.appendChild(section);

createFavUl.setAttribute('class', 'js-fav-drinks-list');
createFavUl.classList.add('favdrinks__section--list');
section.appendChild(createFavUl);

createUl.setAttribute('class', 'js-drinks-list');
createUl.classList.add('drinks__section--list');
section.appendChild(createUl);



// createLi.setAttribute('class', 'drinks__item');
// createLi.setAttribute('class', 'js-drink');
// createUl.appendChild(createLi);











