import Image from 'next/image';
import React from 'react';
import formatDate from '../lib/functions/formatDate';

interface MovieCardProps {
  name: string;
  poster: string;
  duration: string;
  releaseDate: any;
  theme: string;
  numberOfTickets: number;
  book?: () => void;
  info?: () => void;
}

const MovieCard = ({
  name,
  duration,
  numberOfTickets,
  releaseDate,
  theme,
  poster,
  book,
  info,
}: MovieCardProps) => {
  return (
    <div
      className={`card max-w-xs rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${
        theme === 'light' ? 'bg-white' : 'bg-zinc-900'
      }`}
    >
      {/* Poster Image */}
      <img className="h-60 w-full object-cover" src={poster} alt="poster" />

      {/* Content Section */}
      <div
        className={`p-4 ${
          theme === 'light' ? 'text-gray-800' : 'text-gray-200'
        }`}
      >
        {/* Movie Title */}
        <h3 className="text-lg font-bold mb-2">{name}</h3>

        {/* Movie Details */}
        <div className="text-sm space-y-1">
          <p>
            <span className="font-semibold">Runtime:</span> {duration} mins
          </p>
          <p>
            <span className="font-semibold">Release Date:</span>{' '}
            {formatDate(releaseDate)}
          </p>
          <p>
            <span className="font-semibold">Tickets Left:</span>{' '}
            {numberOfTickets}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-between gap-2">
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-lg shadow hover:bg-rose-600 transition"
            onClick={() => info?.()}
          >
            Info
          </button>
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-600 transition"
            onClick={() => book?.()}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
