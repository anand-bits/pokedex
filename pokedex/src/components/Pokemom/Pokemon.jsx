// Pokemon.js
import React from 'react';

function Pokemon({ name, image }) {
  return (
    <div className="pokemon-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        onError={(e) => console.error('Image Error:', e, image)}
      />
    </div>
  );
}

export default Pokemon;
