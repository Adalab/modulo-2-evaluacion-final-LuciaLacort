console.log('functions ready');

//En esta página voy  a hacer solo las funcionalidades de JS 

//1º Traer del html lo que necesite, en este caso me tengo que fijar en las clases que he puesto con set atribute

const searchBtn = document.querySelector('.js-search-btn');
const searchField = document.querySelector('.js-search-input');
const resetBtn = document.querySelector('.js-reset-btn');
const drinksList = document.querySelector('.js-drinks-list');
const warning = document.querySelector('.js-search-warning');




//Declaro dos variables: la que será el array de bebidas y la que será el array de las bebidas fav

let drinks = [];
let favDrinks = [];

//Tengo que poner la función de añadir favorito antes porque luego la tengo que llamar para el click encima de cada li

const addFavDrink = (event) => {
    console.log(event.currentTarget.id);
    const clickedDrink = event.currentTarget.id;
    const drink = drinks.find((drink) => drink.idDrink === drinkId);
    favDrinks.push(drink);
}


//Saco los datos por pantalla con una función render (hago una que tenga el li dentro del bucle para no hacer dos funciones):


const renderDrinksList = (array) => {
    drinksList.innerHTML = '';
    for (const drink of array){
        const drinkName = drink.strDrink;
        const drinkImg = drink.strDrinkThumb;
        const drinkId = drink.idDrink;
        drinksList.innerHTML += `
        <li class="drinks__section--item js-drink" id="${drinkId}">
            <img class="drink__img" src="${drinkImg}" alt="${drinkName}">
            <h3 class="drinks__name">${drinkName}</h3>
        </li>
        `;
    }
}



//Traigo los datos de la api y ya los dejo guardados en local storage

const getApiData = () => {

    const searchWord = searchField.value;
    fetch (
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchWord}`

    )
    .then(response => response.json())
    .then((dataApi) => {
        drinks = dataApi.drinks;
        console.log(drinks);
        renderDrinksList(drinks);
        localStorage.setItem('drinks', JSON.stringify(drinks));
    })
};

const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = searchField.value;
    if(searchValue === ''){
        warning.classList.remove('hidden');
        warning.innerHTML = 'Ups, parece que no has elegido un cocktail.<br>Introduce en el buscador el nombre de tu cocktail favorito.';
    } else {
        warning.classList.add('hidden');
        const searchedDrinks = drinks.filter((drink) => 
        drink.strDrink.toLowerCase().includes(searchValue.toLowerCase()));
        renderDrinksList(searchedDrinks);
        console.log(searchedDrinks);
        getApiData();
    }
}

const handleReset = (event) => {
    event.preventDefault();
}

const init = () => {
    drinks = JSON.parse(localStorage.getItem('drinks'));
    renderDrinksList(drinks);
}

//Aqui va lo que se tiene que ejecutar cuando el usuario abra la página (algo que me pinte solo los margarita y los botones)

init();
searchBtn.addEventListener('click', handleSearch);
resetBtn.addEventListener('click', handleReset);


