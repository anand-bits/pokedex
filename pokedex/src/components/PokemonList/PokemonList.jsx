import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemom/Pokemon";
import "./PokemonList.css"; // Import the CSS file with the correct name

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokedex_url, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  async function downloadPokemons(url) {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
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

      setPokemonList(updatedPokemonList);
      setIsLoading(false);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    downloadPokemons(pokedex_url);
  }, [pokedex_url]);

  const handlePrevClick = () => {
    if (prevUrl) {
      setPokedexUrl(prevUrl);
    }
  };

  const handleNextClick = () => {
    if (nextUrl) {
      setPokedexUrl(nextUrl);
    }
  };

  return (
    <div className="pokemon-card-container">
      <h1>Pokemon List</h1>
      {isLoading ? (
        <p className="loading-message">Loading....</p>
      ) : (
        <div className="pokemon-wrapper">
          {pokemonList.map((p) => (
            <div className="pokemon-card" key={p.id}>
              <Pokemon name={p.name} image={p.image} id={p.id} />
            </div>
          ))}
        </div>
      )}

      <div className="controls">
        
        <button disabled={prevUrl==null} onClick={handlePrevClick}>Prev</button>

        <button  disabled={nextUrl==null}  onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}

export default PokemonList;
