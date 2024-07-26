import Image from 'next/image';
import React from 'react';
import formatDate from '../lib/functions/formatDate';
const MovieCard = ({
  name,
  duration,
  numberOfTickets,
  releaseDate,
  poster,
  book,
  info,
  //   availableFor,
}) => {
  return (
    <div className="card rounded-lg shadow-lg cursor-pointer">
      <img
        className="h-48 w-full rounded-lg"
        src={poster}
        alt="poster"
        //   width={200} height={100}
      />
      <div className="hover:bg-[#EF5A6F] rounded-lg">
        <div className="bg-slate-100 hover:bg-[#EF5A6F] rounded-lg p-2 text-sm hover:text-white">
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
        </div>
        <div className="flex justify-between gap-4 p-2 hover:hover:bg-[#EF5A6F] rounded-lg">
          <button
            className="bg-slate-200 hover:bg-pink-500 w-full rounded-lg shadow hover:text-white"
            onClick={() => info()}
          >
            Info
          </button>
          <button
            className="bg-slate-200 hover:bg-pink-500 w-full rounded-lg shadow hover:text-white"
            onClick={() => book()}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
