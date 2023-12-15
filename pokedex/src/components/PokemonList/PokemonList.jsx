import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemom/Pokemon";
import "./PokemonList.css"; // Import the CSS file with the correct name

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function downloadPokemons() {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      const pokemonResult = response.data.results;

      const pokemonResultPromise = pokemonResult.map((pokemon) =>
        axios.get(pokemon.url)
      );

      const pokemonData = await axios.all(pokemonResultPromise);

      // Extract the relevant data from each response
      const updatedPokemonList = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: (pokemon.sprites.other)
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          types: pokemon.types
        };
      });

      console.log("Updated Pokemon List:", updatedPokemonList);

      setPokemonList(updatedPokemonList);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    downloadPokemons();
  }, []);

  console.log("Render - Pokemon List:", pokemonList);

  return (
    <div className="pokemon-card-container"> {/* Updated class name */}
      <h1>Pokemon List</h1>
      {isLoading ? (
        <p className="loading-message">Loading....</p>
      ) : (
        <div className="pokemon-wrapper" > 
          {pokemonList.map((p) => (
            <div className="pokemon-card" key={p.id}>
              <Pokemon name={p.name} image={p.image} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonList;
