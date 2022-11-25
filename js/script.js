let loadedData = [];

let loadedSpecies = [];

let loadedText = [];

let loadedLocations = [];

let loadedStats = [];

let offset = 0;

let currentCard;

let hp;
let attack;
let defense;
let special_attack;
let special_defense;
let speed;

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
  await loadStats(currentPokemon);
  loadedData.push(currentPokemon);
}

async function loadStats(currentPokemon) {
  let stats = currentPokemon.stats;
  loadedStats.push(stats);
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
  let cardDeck = getDoc("pokemon_container");
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
  let popupContainer = getDoc("pokemon_popup_container");

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

async function closePopup() {
  let popupContainer = getDoc("pokemon_popup_container");
  let popupCard = getDoc("pokemon_card_popup_wrapper");
  popupCard.classList.remove("scale");
  setTimeout(function () {
    popupContainer.classList.add("d-none");
  }, 225);
}

function baseStatVariables() {
  stats = loadedStats[currentCard - 1];
  hp = stats[0];
  attack = stats[1];
  defense = stats[2];
  special_attack = stats[3];
  special_defense = stats[4];
  speed = stats[5];
}

function selectTab(tabID) {
  let ID = currentCard;
  let pokemon = loadedData[ID - 1];
  let flavorText = loadedText[ID - 1];
  let location = loadedLocations[ID - 1];

  baseStatVariables();

  let detailContainer = getDoc("detail-content");

  clearStyles();

  if (location == undefined) {
    location = "location is unknown";
  } else {
    location = location.location_area.name;
  }

  getDoc(tabID).style = "background: white";

  if (tabID == "aboutS") {
    detailContainer.innerHTML = generateAboutTabHTML(
      flavorText,
      pokemon,
      location
    );
  }

  if (tabID == "base_statsS") {
    detailContainer.innerHTML = generateBaseStatsHTML();
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

window.onscroll = async function (ev) {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    offset = offset + 30;
    await loadAllPokemon();
  }
};