console.log('functions ready');

//En esta página voy  a hacer solo las funcionalidades de JS 

//1º Traer del html lo que necesite, en este caso me tengo que fijar en las clases que he puesto con set atribute

const searchBtn = document.querySelector('.js-search-btn');
const searchField = document.querySelector('.js-search-input');
const resetBtn = document.querySelector('.js-reset-btn');
const drinksList = document.querySelector('.js-drinks-list');
const warning = document.querySelector('.js-search-warning');
const favDrinksList = document.querySelector('.js-fav-drinks-list');




//1.Declaro dos variables: la que será el array de bebidas y la que será el array de las bebidas fav

let drinks = [];
let favDrinks = [];


const deleteFavDrink = (event) => {
    const clickedDrinkId = event.currentTarget.parentElement.id;
    const favDrinksIndex = favDrinks.findIndex(
        (drink) => drink.idDrink === clickedDrinkId
    );
    favDrinks.splice(favDrinksIndex, 1);
    renderFavDrinksList(favDrinks);
    localStorage.setItem('favUserDrinks', JSON.stringify(favDrinks));
};

//6.He intentado renderizar los favoritos con el mismo render de las otras bebidas pero me lia y queda un código muy raro. Renden para las bebidas fav que responde al click en la cruz para borrarlos

const renderFavDrinksList = () => {
favDrinksList.innerHTML = '';
for (const drink of favDrinks){
    const drinkName = drink.strDrink;
    const drinkImg = drink.strDrinkThumb;
    const drinkId = drink.idDrink;
    favDrinksList.innerHTML += `
        <li class="drinks__section--item js-drink" id="${drinkId}">
            <span class="drink__delete js-delete"><i class="fas fa-times"></i></span>
            <img class="drink__img" src="${drinkImg}" alt="${drinkName}">
            <h3 class="drinks__name">${drinkName}</h3>
        </li>
    `;
    }
    const deleteCross = document.querySelectorAll('.js-delete');
    deleteCross.forEach(cross => {
        cross.addEventListener('click', deleteFavDrink);
    });
};


//5.Una vez que los datos están por pantalla, la usuaria tiene que poder seleccionar un fav que se va a pintar en otra lista, sin borrarse de la principal. Tengo que poner la función de añadir favorito antes que render porque luego la tengo que llamar para el click encima de cada li

const addFavDrink = (event) => {
    console.log(event.currentTarget.id);
    const clickedDrink = event.currentTarget.id;
    const drink = drinks.find((drink) => drink.idDrink === clickedDrink);
    const favDrinksIndex = favDrinks.findIndex(
        (drink) => drink.idDrink === clickedDrink
    );
    if(favDrinksIndex !== -1){
        const deleteFavDrink = document.querySelector('.js-delete');
        deleteFavDrink.addEventListener('click', deleteFavDrink);
        // favDrinks.splice(favDrinksIndex, 1); //Aquí debe quitarse la clase hidden a la crucecita 
    } else {
        //Aquí tengo que hacer que se cambie el color del borde y la fuente para que se note que es un cocktail favorito, y que también se quede pintado en la lista normal
        favDrinks.push(drink);
    }
        renderFavDrinksList(favDrinks);
        localStorage.setItem('favUserDrinks', JSON.stringify(favDrinks));
};
 

//4.Saco los datos por pantalla con una función render (hago una que tenga el li dentro del bucle para no hacer dos funciones):

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
    const drinksLi = document.querySelectorAll('.js-drink');
    drinksLi.forEach(li => {
        li.addEventListener('click', addFavDrink);
    });
     
};



//2.Traigo los datos de la api y ya los dejo guardados en local storage

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
    });
};

// 3.Hay que renderizar depués de buscar las bebidas, así que preparo el botón de buscar que va a comprobar que se haya escrito algo, y cuando se haya escrito lo paso todo a minúscula para evitar errores. Después ya llamo a render, a getapi 

const handleSearch = (event) => {
    event.preventDefault();
    const searchValue = searchField.value;
    if(searchValue === ''){
        warning.classList.remove('hidden');
        warning.innerHTML = 'Ups, parece que no has elegido un cocktail.<br>Introduce en el buscador el nombre de tu cocktail favorito.';
    } else {
        warning.classList.add('hidden'); 
        //Tengo que hacer una lista de las bebidas que salgan por la búsqueda
        const searchedDrinks = drinks.filter((drink) =>  
        drink.strDrink.toLowerCase().includes(searchValue.toLowerCase()));
        renderDrinksList(searchedDrinks);
        console.log(searchedDrinks);
        getApiData();  //Super importante llamar aquí a get api para que no me de error
    };
};

const handleReset = (event) => {
    event.preventDefault();
};


const init = () => {
    const favUserDrinks = JSON.parse(localStorage.getItem('favUserDrinks'));
    if(favUserDrinks !== null){
        favDrinks = favUserDrinks;
        renderFavDrinksList(favDrinks);
    }

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .then(response => response.json())
        .then((dataApi) => {
            const margaritaDrinks = dataApi.drinks;
            console.log(margaritaDrinks);
            renderDrinksList(margaritaDrinks);
        });
};

//Aqui va lo que se tiene que ejecutar cuando el usuario abra la página (algo que me pinte solo los margarita y los botones)

init();
searchBtn.addEventListener('click', handleSearch);
resetBtn.addEventListener('click', handleReset);


