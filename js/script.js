let loadedData = [];

let offset = 0;

const getDoc = function (id) {
  return document.getElementById(`${id}`);
};

async function loadAllPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}=&limit=30`;
  let response = await fetch(url);
  let loadedPokemon = await response.json();
  for (let i = 0; i < (await loadedPokemon["results"].length); i++) {
    let pokeURL = loadedPokemon["results"][i]["url"];
    let pokeResponse = await fetch(pokeURL);
    let currentPokemon = await pokeResponse.json();
    loadedData.push(currentPokemon);
  }
  renderPokemonCards();
  console.log(loadedData);
}

function renderPokemonCards() {
  let cardDeck = getDoc("pokemon-container");
  for (let i = offset; i < loadedData.length; i++) {
    const pokemon = loadedData[i];
    if (pokemon.types.length == 2) {
      cardDeck.innerHTML += generatePokeCardsWith2ndType(pokemon);
    } else {
      cardDeck.innerHTML += generatePokeCards(pokemon);
    }
  }
}

function stopProp(event) {
  event.stopPropagation();
}

function openPokemonCard(ID) {
  let popupContainer = getDoc("pokemon-popup-container");
  let pokemon = loadedData[ID - 1];
  popupContainer.classList.remove("d-none");
  popupContainer.innerHTML = "";
  if (pokemon.types.length == 2) {
    popupContainer.innerHTML += generatePokeCardPopupTwoTypes(pokemon);
  } else {
    popupContainer.innerHTML += generatePokeCardPopup(pokemon);
  }
}

function generatePokeCardPopupTwoTypes(pokemon) {
  return /*html*/ ` 
  <div onclick="openPokemonCard(${
    pokemon.id
  })" id="pokemon_card_wrapper" style="background: #${pokemonColor(
    pokemon.types[0].type.name
  )}">
    <div id="pokemon_card">
        <div id="pokemon_card_header">
            <h1 class="fm-electro-400" id="pokemon_name">${pokemon.name}</h1>
             <b>
              <span class="fm-electro-400" id="pokemon_id">#${pokemon.id
                .toString()
                .padStart(3, "0")}
              </span>
            </b>
        </div>
        <div id="pokemon_img_wrapper">
          <div id="pokemon_type_wrapper">
            <span class="fm-electro-400" id="pokemon_type_name" style="background: #${pokemonColor(
              pokemon.types[0].type.name
            )}">${pokemon.types[0].type.name}</span>
            <span class="fm-electro-400" id="pokemon_type_name" style="background: #${pokemonColor(
              pokemon.types[1].type.name
            )}">${pokemon.types[1].type.name}</span>
          </div>
          <img id="pokemon_img" src="${
            pokemon.sprites.other.dream_world.front_default
          }">
        </div>
    </div>
  </div>
`;
}

function generatePokeCardPopup(pokemon) {
  return /*html*/ ` 
  <div onclick="openPokemonCard(${
    pokemon.id
  })" id="pokemon_card_wrapper" style="background: #${pokemonColor(
    pokemon.types[0].type.name
  )}">
    <div id="pokemon_card">
        <div id="pokemon_card_header">
            <h1 class="fm-electro-400" id="pokemon_name">${pokemon.name}</h1>
             <b>
              <span class="fm-electro-400" id="pokemon_id">#${pokemon.id
                .toString()
                .padStart(3, "0")}
              </span>
            </b>
        </div>
        <div id="pokemon_img_wrapper">
          <div id="pokemon_type_wrapper">
            <span class="fm-electro-400" id="pokemon_type_name" style="background: #${pokemonColor(
              pokemon.types[0].type.name
            )}">${pokemon.types[0].type.name}</span>
          </div>
          <img id="pokemon_img" src="${
            pokemon.sprites.other.dream_world.front_default
          }">
        </div>
    </div>
  </div>
`;
}

function closePopup() {
  let popupContainer = getDoc("pokemon-popup-container");
  popupContainer.classList.add("d-none");
}

window.onscroll = function (ev) {
  if (
    window.innerHeight + window.pageYOffset >=
    document.body.offsetHeight - 1
  ) {
    offset = offset + 30;
    loadAllPokemon();
  }
};

function generatePokeCards(pokemon) {
  return /*html*/ ` 
  <div onclick="openPokemonCard(
    ${pokemon.id}
  )" id="pokemon_card_wrapper" style="background: #${pokemonColor(
    pokemon.types[0].type.name
  )}">
    <div id="pokemon_card">
        <div id="pokemon_card_header">
            <h1 class="fm-electro-400" id="pokemon_name">${pokemon.name}</h1>
             <b>
              <span class="fm-electro-400" id="pokemon_id">#${pokemon.id
                .toString()
                .padStart(3, "0")}
              </span>
            </b>
        </div>
        <div id="pokemon_img_wrapper">
          <div id="pokemon_type_wrapper">
            <span class="fm-electro-400" id="pokemon_type_name" style="background: #${pokemonColor(
              pokemon.types[0].type.name
            )}">${pokemon.types[0].type.name}</span>
          </div>
          <img id="pokemon_img" src="${
            pokemon.sprites.other.dream_world.front_default
          }">
        </div>
    </div>
  </div>
`;
}

function generatePokeCardsWith2ndType(pokemon) {
  return /*html*/ ` 
  <div onclick="openPokemonCard(
    ${pokemon.id}
  )" id="pokemon_card_wrapper" style="background: #${pokemonColor(
    pokemon.types[0].type.name
  )}">
    <div id="pokemon_card">
        <div id="pokemon_card_header">
            <h1 class="fm-electro-400" id="pokemon_name">${pokemon.name}</h1>
             <b>
              <span class="fm-electro-400" id="pokemon_id">#${pokemon.id
                .toString()
                .padStart(3, "0")}
              </span>
            </b>
        </div>
        <div id="pokemon_img_wrapper">
          <div id="pokemon_type_wrapper">
            <span class="fm-electro-400" id="pokemon_type_name" style="background: #${pokemonColor(
              pokemon.types[0].type.name
            )}">${pokemon.types[0].type.name}</span>
            <span class="fm-electro-400" id="pokemon_type_name" style="background: #${pokemonColor(
              pokemon.types[1].type.name
            )}">${pokemon.types[1].type.name}</span>
          </div>
          <img id="pokemon_img" src="${
            pokemon.sprites.other.dream_world.front_default
          }">
        </div>
    </div>
  </div>
`;
}
