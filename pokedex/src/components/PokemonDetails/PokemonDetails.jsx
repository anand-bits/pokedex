import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    weight: 0,
    height: "",
    types: [],
  });

  async function downloadPokemon() {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      console.log(response.data);
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
      });
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, [id]);

  return (
    <div className="pokemon-details-wrapper2">
      <div className="pokemon-name2">Name: {pokemon.name}</div>
      <img className="pokemon-image2" src={pokemon.image} alt={pokemon.name} />
      <div><h1>Height: {pokemon.height}</h1></div>
      <div><h1>Weight: {pokemon.weight}</h1></div>
      <div className="pokemon-types2">
        <h1>Types:
        {pokemon.types.map((t, index) => (
          <div key={index}>{t}</div>
        ))}
      </h1></div>
    </div>
  );
}

export default PokemonDetails;
