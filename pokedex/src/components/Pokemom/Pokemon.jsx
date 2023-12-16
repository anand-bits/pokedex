import React from 'react';
import './Pokemon.css'; // Update the import to match the CSS file name
import { Link } from 'react-router-dom';

function Pokemon({ id, name, image }) {
  return (
    <div className='pokemon'>
      <Link to={`/pokemon/${id}`}>
        <div className='pokemon-name'>
          {name}
        </div>
        <div>
          <img className='pokemon-image' 
               src={image}
               alt={name}  // Don't forget alt attribute for accessibility
          />
        </div>
      </Link>
    </div>
  );
}

export default Pokemon;
