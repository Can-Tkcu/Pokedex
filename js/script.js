let loadedData = [];

let loadedSpecies = [];

let loadedText = [];

let loadedLocations = [];

let loadedStats = [];

let loadedEvolutionChains = [];

let filteredPokemon = [];

let offset = 0;

let currentCard;

//variables for base_stats
let hp;
let attack;
let defense;
let special_attack;
let special_defense;
let speed;

// variables for evolutions
let interval = 0;
let first;
let second;
let third;

const getDoc = function (id) {
  return document.getElementById(`${id}`);
};

async function init() {
  await loadAllPokemon();
}

// window.addEventListener("load", function(){
//   loader.style.display = "none";
// })

////////////////////////////////////////////////////////////////////////////////////// -- LOAD FUNCTIONS --

async function loadAllPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}=&limit=30`;
  let response = await fetch(url);
  let loadedPokemon = await response.json();
  for (let i = 0; i < (await loadedPokemon["results"].length); i++) {
    showLoadingScreen();
    await loadData(loadedPokemon["results"][i]);
    hideLoadingScreen();
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

  let evolutionChainURL = currentPokemonSpecies.evolution_chain.url;
  let evolutionResponse = await fetch(evolutionChainURL);
  let pokemonEvolutionData = await evolutionResponse.json();

  setVariables(currentPokemonSpecies, pokemonEvolutionData);
}

function setVariables(currentPokemonSpecies, pokemonEvolutionData) {
  let genus = currentPokemonSpecies.genera[7].genus;
  let flavorText = currentPokemonSpecies.flavor_text_entries[3].flavor_text;
  let evolutionChain = pokemonEvolutionData.chain;
  pushResults(genus, flavorText, evolutionChain);
}

function pushResults(genus, flavorText, evolutionChain) {
  loadedText.push(flavorText);
  loadedSpecies.push(genus);
  loadedEvolutionChains.push(evolutionChain);
}

////////////////////////////////////////////////////////////////////////////////////// -- LOAD FUNCTIONS END --

////////////////////////////////////////////////////////////////////////////////////// -- RENDERS --

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

function renderMoves(pokemon, detailContainer) {
  detailContainer.innerHTML = `<div id="moves_content"></div>`;
  for (let i = 0; i < pokemon.moves.length; i++) {
    const element = pokemon.moves[i].move.name;
    moves_content.innerHTML += `
      <span class="fm-electro-400" id="move">${element}</span> 
    `;
  }
}

function renderFilteredPokemon(cardDeck) {
  for (let i = 0; i < filteredPokemon.length; i++) {
    const pokemon = filteredPokemon[i];
    if (pokemon.types.length == 2) {
      cardDeck.innerHTML += generatePokeCardsWith2ndType(pokemon);
    } else {
      cardDeck.innerHTML += generatePokeCards(pokemon);
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////// -- RENDERS END --

////////////////////////////////////////////////////////////////////////////////////// -- UTILITY FUNCTIONS -- // Functions that handle basic HTML/CSS/JS

function stopProp(event) {
  event.stopPropagation();
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

function clearStyles() {
  getDoc("aboutS").style = "";
  getDoc("base_statsS").style = "";
  getDoc("evolutionS").style = "";
  getDoc("movesS").style = "";
}

function nextPokemon(currentCard) {
  currentCard++;
  openPokemonCard(currentCard);
}

function prevPokemon(currentCard) {
  if (currentCard == 1) {
    openPokemonCard(currentCard);
  } else {
    currentCard--;
    openPokemonCard(currentCard);
  }
}

function showLoadingScreen() {
  let loader = getDoc("loader");
  loader.style.display = "block";
}

function hideLoadingScreen() {
  let loader = getDoc("loader");
  loader.style.display = "none";
}

function markCurrentTab(tabID) {
  getDoc(tabID).style = "background: white";
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

function pokemonImg(param) {
  loadedData.find((pokemon) => {
    if (pokemon.name === param) {
      if (interval == 0) {
        first = pokemon.id;
      }
      if (interval == 1) {
        second = pokemon.id;
      }
      if (interval == 2) {
        third = pokemon.id;
      }
      interval++;
    }
  });
}

function clearCard() {
  popupContainer.classList.remove("d-none");
  popupContainer.innerHTML = "";
}

async function setDefaultTab() {
  await includeHTML();
  showCard();
  selectTab("aboutS");
}

////////////////////////////////////////////////////////////////////////////////////// -- UTILITY FUNCTIONS END --

////////////////////////////////////////////////////////////////////////////////////// -- FILTER --

function filterPokemon(searchInput) {
  filteredPokemon = loadedData.filter((pokemon) =>
    pokemon.name.includes(searchInput.value.toLowerCase())
  );
}

function searchPokemon() {
  let cardDeck = getDoc("pokemon_container");
  let searchInput = getDoc("search_pokemon");
  cardDeck.innerHTML = "";
  filterPokemon(searchInput);
  if (searchInput.value == " ") {
    cardDeck.innerHTML = "";
    renderPokemonCards();
  } else {
    cardDeck.innerHTML = "";
    renderFilteredPokemon(cardDeck);
  }
}

////////////////////////////////////////////////////////////////////////////////////// -- FILTER END -- 

////////////////////////////////////////////////////////////////////////////////////// -- CARD LOGIC --

async function openPokemonCard(ID) {
  currentCard = ID;
  let pokemon = loadedData[ID - 1];
  let genus = loadedSpecies[ID - 1];
  let popupContainer = getDoc("pokemon_popup_container");
  clearCard();
  if (pokemon.types.length == 2) {
    popupContainer.innerHTML += generatePokeCardPopupTwoTypes(pokemon, genus);
    setDefaultTab();
  } else {
    popupContainer.innerHTML += generatePokeCardPopup(pokemon, genus);
    setDefaultTab();
  }
}

function selectTab(tabID) {
  let ID = currentCard;
  let pokemon = loadedData[ID - 1];
  let flavorText = loadedText[ID - 1];
  let location = loadedLocations[ID - 1];
  let evolution = loadedEvolutionChains[ID - 1];
  let detailContainer = getDoc("detail-content");
  clearStyles();
  markCurrentTab(tabID);
  //The section below generates all the HTML and JS for each card and displays the data
  generateAboutTab(tabID, location, flavorText, pokemon, detailContainer);
  generateBaseStatsTab(tabID, detailContainer);
  generateEvosTab(tabID, evolution, detailContainer);
  generateMovesTab(tabID, pokemon, detailContainer);
}

function generateMovesTab(tabID, pokemon, detailContainer) {
  if (tabID == "movesS") {
    detailContainer.innerHTML = "";
    renderMoves(pokemon, detailContainer);
  }
}

function generateEvosTab(tabID, evolution, detailContainer) {
  if (tabID == "evolutionS") {
    if (evolution.evolves_to[0].evolves_to.length == 0) {
      generateEvolutionsTwoEvos(evolution, detailContainer);
    } else {
      generateEvolutionsThreeEvos(evolution, detailContainer);
    }
  }
}

function generateBaseStatsTab(tabID, detailContainer) {
  baseStatVariables();
  if (tabID == "base_statsS") {
    detailContainer.innerHTML = generateBaseStatsTabHTML();
  }
}

function generateAboutTab(
  tabID,
  location,
  flavorText,
  pokemon,
  detailContainer
) {
  if (location == undefined) {
    location = "location is unknown";
  } else {
    location = location.location_area.name;
  }
  if (tabID == "aboutS") {
    detailContainer.innerHTML = generateAboutTabHTML(
      flavorText,
      pokemon,
      location
    );
  }
}

window.onscroll = async function (ev) {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    offset = offset + 30;
    await loadAllPokemon();
  }
};

////////////////////////////////////////////////////////////////////////////////////// -- CARD LOGIC END --
