import Image from 'next/image';
import React from 'react';
import formatDate from '../lib/functions/formatDate';

interface MovieCardProps {
  name: string;
  poster: string;
  duration: string;
  releaseDate: any;
  numberOfTickets: number;
  book?: () => void;
  info?: () => void;
}
const MovieCard = ({
  name,
  duration,
  numberOfTickets,
  releaseDate,
  poster,
  book,
  info,
}: //   availableFor,
MovieCardProps) => {
  return (
    <div className="card bg-red-500 rounded-lg shadow-lg cursor-pointer ">
      <img className="h-52 w-full rounded-lg mb-2" src={poster} alt="poster" />
      <div className="bg-slate-50 flex items-center rounded-lg h-32">
        <div className="w-full p-2 text-sm ">
          <div className="flex justify-between">
            <p>
              Title: <b>{name}</b>
            </p>
            <p>
              Runtime: <b>{duration}</b> mins
            </p>
          </div>
          <div>
            <p>
              Release date: <b>{formatDate(releaseDate)}</b>
            </p>
            <p>Tickets remaining: {numberOfTickets}</p>
          </div>
          <div className="flex justify-between gap-4 p-2">
            <button
              className="bg-sky-500 w-full rounded-lg shadow text-white"
              onClick={() => info()}
            >
              Info
            </button>
            <button
              className="bg-sky-500 w-full rounded-lg shadow text-white"
              onClick={() => book()}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
