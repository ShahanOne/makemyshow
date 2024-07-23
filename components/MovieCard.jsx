import Image from 'next/image';
import React from 'react';

const MovieCard = ({
  name,
  duration,
  numberOfTickets,
  releaseDate,
  poster,
  //   availableFor,
}) => {
  return (
    <div className="card">
      <Image src={poster} alt="poster" />
      <div className="bg-slate-300 hover:bg-[#EF5A6F]">
        <div className="flex justify-between">
          <p>{name}</p>
          <p>{duration}</p>
        </div>
        <div>
          <p>{releaseDate}</p>
          <p>{numberOfTickets}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
