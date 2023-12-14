import { useEffect, useState } from "react";
import axios from "axios";

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
      console.log(pokemonData)


      //setPokemonList

      // Extract the relevant data from each response
      const updatedPokemonList = pokemonData.map((pokeData) => {
        const pokemon=pokeData.data;
        return {
            name:pokemon.name,
            image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
            types:pokemon.types
        }
      });
      console.log(updatedPokemonList)
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

  return (
    <div className="pokemon-list-wrapper">
      <h1>Pokemon List</h1>
      {isLoading ? 'Loading....' : "Data Is Downloaded"}
      {/* Display Pokemon data here */}
      {pokemonList.map((pokemon) => (
        <div key={pokemon.id}>
          <p>{pokemon.name}</p>
          {/* Add more details based on your needs */}
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
