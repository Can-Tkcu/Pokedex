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

function generateAboutTabHTML(flavorText, pokemon, location) {
  return `
    <div class="fm-electro-400" id="about_content">
      <span id="flavor_text">${flavorText
        .replace("\f", "\n")
        .replace("\u00ad\n", "")
        .replace("\u00ad", "")
        .replace(" -\n", " - ")
        .replace("-\n", "-")
        .replace("\n", " ")}
      </span>
      <div>
        <span>Pokemon height:  ${pokemon.height / 10}m</span>
        <span>Pokemon weight:  ${pokemon.weight / 10}kg</span>
        <span>Pokemon location: ${location}</span>
      </div>
   </div>`;
}

function generatePokeCardPopupTwoTypes(pokemon, genus) {
  return /*html*/ `
      <div onclick="stopProp(event)" id="pokemon_card_popup_wrapper" style="background: #${pokemonColor(
        pokemon.types[0].type.name
      )}">
        <div id="pokemon_popup_card">
        <img id="header_img" src="./img/pokeball.png">
            <div id="pokemon_popup_img_wrapper">
              <div id="pokemon_popup_type_wrapper">
              <div id="pokemon_popup_header_exit">
                <img onclick="closePopup()" src="./img/back-arrow.png">
                <div>
                  <span class="fm-electro-400" id="back" onclick="prevPokemon(currentCard)">BACK</span>
                  <span class="fm-electro-400" id="next" onclick="nextPokemon(currentCard)">NEXT</span>
                </div>
              </div>
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
        <img id="header_img" src="./img/pokeball.png">
            <div id="pokemon_popup_img_wrapper">
              <div id="pokemon_popup_type_wrapper">
              <div id="pokemon_popup_header_exit">
                <img onclick="closePopup()" src="./img/back-arrow.png">
                <div>
                  <span class="fm-electro-400" id="back" onclick="prevPokemon(currentCard)">BACK</span>
                  <span class="fm-electro-400" id="next" onclick="nextPokemon(currentCard)">NEXT</span>
                </div>
              </div>
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

function generateBaseStatsTabHTML() {
  return /*html*/ `
    <div id="base_stat_content">
      <span class="fm-electro-400">${hp.stat.name} / ${hp.base_stat}</span>
      <div id="progress_wrapper">
        <div id="progress_fill" style="width: ${hp.base_stat}%"></div>
      </div>
  
      <span class="fm-electro-400">${attack.stat.name} / ${attack.base_stat}</span>
      <div id="progress_wrapper">
        <div id="progress_fill" style="width: ${attack.base_stat}%"></div>
      </div>
  
      <span class="fm-electro-400">${defense.stat.name} / ${defense.base_stat}</span>
      <div id="progress_wrapper">
        <div id="progress_fill" style="width: ${defense.base_stat}%"></div>
      </div>
  
      <span class="fm-electro-400">${special_attack.stat.name} / ${special_attack.base_stat}</span>
      <div id="progress_wrapper">
        <div id="progress_fill" style="width: ${special_attack.base_stat}%"></div>
      </div>
  
      <span class="fm-electro-400">${special_defense.stat.name} / ${special_defense.base_stat}</span>
      <div id="progress_wrapper">
        <div id="progress_fill" style="width: ${special_defense.base_stat}%"></div>
      </div>
  
      <span class="fm-electro-400">${speed.stat.name} / ${speed.base_stat}</span>
      <div id="progress_wrapper">
        <div id="progress_fill" style="width: ${speed.base_stat}%"></div>
      </div>
    </div>
    `;
}

function generateEvolutionsThreeEvos(evolution, detailContainer) {
  interval = 0;
  pokemonImg(evolution.species.name);
  pokemonImg(evolution.evolves_to[0].species.name);
  pokemonImg(evolution.evolves_to[0].evolves_to[0].species.name);

  detailContainer.innerHTML = /*html*/ `
    <div id="evolutions_content">
      <!-- FIRST EVOLUTION -->
      <div id="evolution-container">
        <div>
          <span class="fm-electro-400">${evolution.species.name}</span>
          <img id="evolution_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${first}.svg">
        </div>
        <img id="evolve" src="./img/next.png">
        <div>
          <span class="fm-electro-400">${evolution.evolves_to[0].species.name}</span>
          <img id="evolution_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${second}.svg">
        </div>
      </div>
      <!-- SECOND EVOLUTION -->
      <div id="evolution-container">
        <div>
          <span class="fm-electro-400">${evolution.evolves_to[0].species.name}</span>
          <img id="evolution_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${second}.svg">
        </div>
        <img id="evolve" src="./img/next.png">
        <div>
          <span class="fm-electro-400">${evolution.evolves_to[0].evolves_to[0].species.name}</span>
          <img id="evolution_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${third}.svg">
        </div>
      </div>
    </div>
    `;
}

function generateEvolutionsTwoEvos(evolution, detailContainer) {
  interval = 0;
  pokemonImg(evolution.species.name);
  pokemonImg(evolution.evolves_to[0].species.name);

  detailContainer.innerHTML = /*html*/ `
  <div id="evolutions_content">
    <!-- FIRST EVOLUTION -->
    <div id="evolution-container">
      <div>
        <span class="fm-electro-400">${evolution.species.name}</span>
        <img id="evolution_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${first}.svg">
      </div>
      <img id="evolve" src="./img/next.png">
      <div>
        <span class="fm-electro-400">${evolution.evolves_to[0].species.name}</span>
        <img id="evolution_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${second}.svg">
      </div>
    </div>
  </div>
  `;
}