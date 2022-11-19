let url = "https://pokeapi.co/api/v2/pokemon/ditto";

let currentPokemon;

const getDoc = function (id) {
    return document.getElementById(`${id}`);
  }

async function loadAllPokemon() {
    let response = await fetch(url);
    let currentPokemon = await response.json();

    console.log(currentPokemon);
    renderPokemonCards(currentPokemon);
}

function renderPokemonCards(pokemon) {
    let cardDeck = getDoc('pokemon-container');

    cardDeck.innerHTML = "";
    //for loop
    cardDeck.innerHTML += /*html*/`
        <div id="pokemon_card">
            <h1 id="pokemon_name">${pokemon['name']}</h1>
            <img id="pokemon_img" src="${pokemon['sprites']['other']['official-artwork']['front_default']}">

        </div>
    `;
}

function stopProp(event) {
    event.stopPropagation();
}