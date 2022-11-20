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

function pokemonColor(type) {
  if (type == "electric") {
    return "FFD76F";
  }
  if (type == "grass") {
    return "49D0B0";
  }
  if (type == "water") {
    return "76BEFE";
  }
  if (type == "fire") {
    return "F18788";
  }
  if (type == "bug") {
    return "99d893";
  }
  if (type == "normal") {
    return "d2bd90";
  }
  if (type == "poison") {
    return "c087bf";
  }
  if (type == "ground") {
    return "dd9e66";
  }
  if (type == "fairy") {
    return "f0c2e9";
  }
  if (type == "fighting") {
    return "ffbd62";
  }
  if (type == "rock") {
    return "9d9e92";
  }
  if (type == "psychic") {
    return "ff76e4";
  }
  if (type == "ghost") {
    return "af5feb";
  }
  if (type == "ice") {
    return "b8deff";
  }
  if (type == "dragon") {
    return "2b9cfd";
  }
  if (type == "dark") {
    return "2b9cfd";
  }
  if (type == "steel") {
    return "b1beca";
  }
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
