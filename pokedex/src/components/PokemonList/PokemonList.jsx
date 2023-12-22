import React, { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemom/Pokemon";
import "./PokemonList.css"; // Import the CSS file with the correct name

function PokemonList() {
  // Combine multiple state variables into a single state object
  const [state, setState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    nextUrl: '',
    prevUrl: '',
  });

  async function downloadPokemons(url) {
    try {
      // Update state to indicate loading
      setState((prevState) => ({ ...prevState, isLoading: true }));
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

      // Update state with the fetched data
      setState((prevState) => ({
        ...prevState,
        pokemonList: updatedPokemonList,
        isLoading: false,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      // Update state to indicate loading is complete with an error
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }

  useEffect(() => {
    // Trigger the initial download of Pokemon data
    downloadPokemons(state.pokedexUrl);
  }, [state.pokedexUrl]);

  const handlePrevClick = () => {
    if (state.prevUrl) {
      // Update state to navigate to the previous page
      setState((prevState) => ({ ...prevState, pokedexUrl: state.prevUrl }));
    }
  };

  const handleNextClick = () => {
    if (state.nextUrl) {
      // Update state to navigate to the next page
      setState((prevState) => ({ ...prevState, pokedexUrl: state.nextUrl }));
    }
  };

  return (
    <div className="pokemon-card-container">
      <h1>Pokemon List</h1>
      {state.isLoading ? (
        <p className="loading-message">Loading....</p>
      ) : (
        <div className="pokemon-wrapper">
          {state.pokemonList.map((p) => (
            <div className="pokemon-card" key={p.id}>
              <Pokemon name={p.name} image={p.image} id={p.id} />
            </div>
          ))}
        </div>
      )}

      <div className="controls">
        {/* Disable the "Prev" button if there is no previous page */}
        <button disabled={state.prevUrl == null} onClick={handlePrevClick}>Prev</button>
        {/* Disable the "Next" button if there is no next page */}
        <button disabled={state.nextUrl == null} onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}

export default PokemonList;
