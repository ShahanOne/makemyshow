import formatDate from '../lib/functions/formatDate';
import React from 'react';

const TicketCard = ({ movie }) => {
  return (
    <div className="flex gap-2 rounded shadow p-2">
      <img className="rounded" src={movie?.poster} alt="movie-poster" />
      <div>
        <p>{movie.name}</p>
        <p>{formatDate(movie.releaseDate)}</p>
      </div>
    </div>
  );
};

export default TicketCard;
