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