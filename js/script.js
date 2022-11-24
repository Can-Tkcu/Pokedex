let loadedData = [];

let loadedSpecies = [];

let loadedText = [];

let loadedLocations = [];

let offset = 0;

let currentCard;

const getDoc = function (id) {
  return document.getElementById(`${id}`);
};

async function init() {
  await loadAllPokemon();
}
////////////////////////////////////////////////////////////////////////////////////// -- CARD DECK --

async function loadAllPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}=&limit=30`;
  let response = await fetch(url);
  let loadedPokemon = await response.json();
  for (let i = 0; i < (await loadedPokemon["results"].length); i++) {
    await loadData(loadedPokemon["results"][i]);
  }
  renderPokemonCards();
  console.log(loadedData);
}

async function loadData(loadedPokemon) {
  let pokeURL = loadedPokemon["url"];
  let pokeResponse = await fetch(pokeURL);
  let currentPokemon = await pokeResponse.json();
  await loadLocation(currentPokemon);
  await loadSpecies(currentPokemon);
  loadedData.push(currentPokemon);
}

async function loadLocation(currentPokemon) {
  let locationURL = currentPokemon.location_area_encounters;
  let locationResponse = await fetch(locationURL);
  let currentPokemonLocation = await locationResponse.json();
  let locations = currentPokemonLocation[0];
  loadedLocations.push(locations);
}

async function loadSpecies(currentPokemon) {
  let speciesURL = currentPokemon.species.url;
  let speciesResponse = await fetch(speciesURL);
  let currentPokemonSpecies = await speciesResponse.json();
  let genus = currentPokemonSpecies.genera[7].genus;
  let flavorText = currentPokemonSpecies.flavor_text_entries[3].flavor_text;

  loadedText.push(flavorText);
  loadedSpecies.push(genus);
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

////////////////////////////////////////////////////////////////////////////////////// -- CARD DECK END --

function stopProp(event) {
  event.stopPropagation();
}

async function openPokemonCard(ID) {
  currentCard = ID;
  let pokemon = loadedData[ID - 1];
  let genus = loadedSpecies[ID - 1];
  let popupContainer = getDoc("pokemon-popup-container");

  popupContainer.classList.remove("d-none");
  popupContainer.innerHTML = "";

  if (pokemon.types.length == 2) {
    popupContainer.innerHTML += generatePokeCardPopupTwoTypes(pokemon, genus);

    await includeHTML();
    selectTab("aboutS");
    showCard();

    console.log(pokemon);
  } else {
    popupContainer.innerHTML += generatePokeCardPopup(pokemon, genus);

    await includeHTML();
    showCard();
    selectTab("aboutS");

    console.log(pokemon);
  }
}

function showCard() {
  let popupCard = getDoc("pokemon_card_popup_wrapper");
  setTimeout(function () {
    popupCard.classList.add("scale");
  }, 125);
}

function generatePokeCardPopupTwoTypes(pokemon, genus) {
  return /*html*/ `
    <div onclick="stopProp(event)" id="pokemon_card_popup_wrapper" style="background: #${pokemonColor(
      pokemon.types[0].type.name
    )}">
      <div id="pokemon_popup_card">
          <div id="pokemon_popup_img_wrapper">
            <div id="pokemon_popup_type_wrapper">
            <div id="pokemon_popup_header_exit"><img onclick="closePopup()" src="./img/back-arrow.png"></div>
                <div id="pokemon_popup_card_header">
                  <h1 class="fm-electro-400" id="pokemon_popup_name">${
                    pokemon.name
                  }</h1>
                  <b>
                    <span class="fm-electro-400" id="pokemon_popup_id">#${pokemon.id
                      .toString()
                      .padStart(3, "0")}
                    </span>
                  </b>
              </div>
              <div id="pokemon_popup_types">
                <div id="type_wrapper">        
                  <span class="fm-electro-400" id="pokemon_popup_type_name" style="background: #${pokemonColor(
                    pokemon.types[0].type.name
                  )}">${pokemon.types[0].type.name}</span>
                  <span class="fm-electro-400" id="pokemon_popup_type_name" style="background: #${pokemonColor(
                    pokemon.types[1].type.name
                  )}">${pokemon.types[1].type.name}</span>
                </div>
                <span class="fm-electro-400" id="pokemon_genus">${genus}</span>
              </div>
            </div>
            <img id="pokemon_popup_img" src="${
              pokemon.sprites.other.dream_world.front_default
            }">
          </div>
      </div>
      <div id="pokemon_popup_detail" style="background: #${pokemonColor(
        pokemon.types[0].type.name
      )}">
        <div w3-include-html="templates/detail_header.html"></div>
        <div id="detail-content">
          
        </div>
    </div>
  </div>
`;
}

function generatePokeCardPopup(pokemon, genus) {
  return /*html*/ ` 
  <div onclick="stopProp(event)" id="pokemon_card_popup_wrapper" style="background: #${pokemonColor(
    pokemon.types[0].type.name
  )}">
      <div id="pokemon_popup_card">
          <div id="pokemon_popup_img_wrapper">
            <div id="pokemon_popup_type_wrapper">
            <div id="pokemon_popup_header_exit"><img onclick="closePopup()" src="./img/back-arrow.png"></div>
                <div id="pokemon_popup_card_header">
                  <h1 class="fm-electro-400" id="pokemon_popup_name">${
                    pokemon.name
                  }</h1>
                  <b>
                    <span class="fm-electro-400" id="pokemon_popup_id">#${pokemon.id
                      .toString()
                      .padStart(3, "0")}
                    </span>
                  </b>
              </div>
              <div id="pokemon_popup_types">
                <div id="type_wrapper">        
                  <span class="fm-electro-400" id="pokemon_popup_type_name" style="background: #${pokemonColor(
                    pokemon.types[0].type.name
                  )}">${pokemon.types[0].type.name}</span>
                </div>
                <span class="fm-electro-400" id="pokemon_genus">${genus}</span>
              </div>
            </div>
            <img id="pokemon_popup_img" src="${
              pokemon.sprites.other.dream_world.front_default
            }">
          </div>
      </div>
      <div id="pokemon_popup_detail" style="background: #${pokemonColor(
        pokemon.types[0].type.name
      )}">
        <div w3-include-html="templates/detail_header.html"></div>
        <div id="detail-content">
          
        </div>
    </div>
  </div>
`;
}

async function closePopup() {
  let popupContainer = getDoc("pokemon-popup-container");
  let popupCard = getDoc("pokemon_card_popup_wrapper");
  popupCard.classList.remove("scale");
  setTimeout(function () {
    popupContainer.classList.add("d-none");
  }, 225);
}

window.onscroll = async function (ev) {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    offset = offset + 30;
    await loadAllPokemon();
  }
};

function selectTab(tabID) {
  let ID = currentCard;
  let pokemon = loadedData[ID - 1];
  let flavorText = loadedText[ID - 1];
  let location = loadedLocations[ID - 1];
  let detailContainer = getDoc("detail-content");

  clearStyles();

  if (location == undefined) {
    location = "location is unknown";
  } else {
    location = location.location_area.name;
  }

  getDoc(tabID).style = "background: white";

  if (tabID == "aboutS") {
    detailContainer.innerHTML = `
  <div class="fm-electro-400" id="about_content">
    <span id="flavor_text">${flavorText
      .replace("\f", "\n")
      .replace("\u00ad\n", "")
      .replace("\u00ad", "")
      .replace(" -\n", " - ")
      .replace("-\n", "-")
      .replace("\n", " ")}</span>
      <span id="pokemon_height">Pokemon height:  ${pokemon.height / 10}m</span>
      <span id="pokemon_height">Pokemon weight:  ${pokemon.weight / 10}kg</span>
      <span id="pokemon_height">Pokemon location: ${location}</span>
   </div>
  `;
  }

  if (tabID == "base_statsS") {
    detailContainer.innerHTML = `1`;
  }

  if (tabID == "evolutionS") {
    detailContainer.innerHTML = `2`;
  }

  if (tabID == "movesS") {
    detailContainer.innerHTML = `3`;
  }
}

function clearStyles() {
  getDoc("aboutS").style = "";
  getDoc("base_statsS").style = "";
  getDoc("evolutionS").style = "";
  getDoc("movesS").style = "";
}