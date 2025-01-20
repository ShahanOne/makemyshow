import Image from 'next/image';
import React from 'react';
import formatDate from '../lib/functions/formatDate';

interface TrendingMovieProps {
  name: string;
  poster: string;
  releaseDate: any;
}
const TrendingMovie = ({ name, releaseDate, poster }: TrendingMovieProps) => {
  return (
    <div className="card rounded-lg shadow-lg cursor-pointer relative">
      <img className="h-80 w-full rounded-lg my-2" src={poster} alt="poster" />
      <div className="p-4 absolute text-white bg-[#d0939339] bottom-0 w-full">
        <p className="text-2xl italic">{name}</p>
        <p>
          Release date:{' '}
          <span className="text-lg">{formatDate(releaseDate)}</span>
        </p>
      </div>
    </div>
  );
};

export default TrendingMovie;
