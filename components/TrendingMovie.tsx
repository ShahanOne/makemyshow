import Image from 'next/image';
import React from 'react';
import formatDate from '../lib/functions/formatDate';

interface TrendingMovieProps {
  name: string;
  poster: string;
  releaseDate: any;
  info: () => void;
}
const TrendingMovie = ({
  name,
  releaseDate,
  poster,
  info,
}: TrendingMovieProps) => {
  return (
    <div
      onClick={() => info()}
      className="card rounded-lg shadow-lg cursor-pointer relative hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <img className="h-80 w-full rounded-lg my-2" src={poster} alt="poster" />
      <div className="p-4 absolute text-white rounded-b-lg bg-[#eebbd63a] bottom-0 w-full">
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
