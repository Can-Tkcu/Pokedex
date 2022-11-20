let allPokemon = [];

let offset = 0;

let limit = 30;

const getDoc = function (id) {
  return document.getElementById(`${id}`);
};

async function loadAllPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}=&limit=${limit}`;
  let response = await fetch(url);
  let loadedPokemon = await response.json();
  for (let i = 0; i < loadedPokemon["results"].length; i++) {
    let pokeURL = loadedPokemon["results"][i]["url"];
    let pokeResponse = await fetch(pokeURL);
    let currentPokemon = await pokeResponse.json();
    allPokemon.push(currentPokemon);
    renderPokemonCards(currentPokemon);
  }
  console.log(allPokemon);
}


function renderPokemonCards(pokemon) {
  let cardDeck = getDoc("pokemon-container");
  cardDeck.innerHTML += /*html*/ `
        <div id="pokemon_card_wrapper" style="background: #${pokemonColor(
          pokemon.types[0].type.name
        )}">
          <div id="pokemon_card">
              <div id="pokemon_card_header">
                  <h1 class="fm-electro-400" id="pokemon_name">${
                    pokemon.name
                  }</h1>
                   <b>
                    <span class="fm-electro-400" id="pokemon_id">#${pokemon.id
                      .toString()
                      .padStart(3, "0")}
                    </span>
                  </b>
              </div>
              <div id="pokemon_img_wrapper">
                <div id="pokemon_type_wrapper">
                  <span class="fm-electro-400" id="pokemon_type_name">${
                    pokemon.types[0].type.name
                  }</span>
                  <span class="fm-electro-400" id="pokemon_type_name">${
                    pokemon.types[0].type.name
                  }</span>
                </div>
                <img id="pokemon_img" src="${
                  pokemon.sprites.other.dream_world.front_default
                }">
              </div>
              <span id=""></span>
          </div>
        </div>
      `;
}


function stopProp(event) {
  event.stopPropagation();
}


window.onscroll = async function () {
  if (window.scrollY + window.innerHeight >= document.body.clientHeight - 2) {
    offset = offset + 30;
    await loadAllPokemon();
  }
};
