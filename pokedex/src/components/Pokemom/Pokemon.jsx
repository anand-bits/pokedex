import React from 'react';
import './Pokemon.css'; // Update the import to match the CSS file name

function Pokemon({ name, image }) {
  return (
    <div className="pokemon-image">
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
