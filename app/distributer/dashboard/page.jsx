'use client';
import Navbar from '../../../components/Navbar';
import MovieCard from '../../../components/MovieCard';
import React, { useEffect, useState } from 'react';

const dashboard = () => {
  const [listedMovies, setListedMovies] = useState([]);
  const userType = localStorage.getItem('__ut');
  let distributerId;
  if (userType === 'distributer') {
    distributerId = localStorage.getItem('__uid');
  }
  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const res = await fetch('/api/distributer/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([
            {
              distributerId: distributerId.length && distributerId,
            },
          ]),
        })
          .then((response) => response.json())
          .then((data) => {
            setListedMovies(data);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getAllMovies();
  }, []);
  return (
    <>
      <Navbar />
      <div className="distributer_dashboard">
        <div>
          <p>Listed Movies</p>
          <div className="grid grid-cols-4 gap-4">
            {listedMovies.length &&
              listedMovies.map((movie, index) => (
                <MovieCard
                  key={index}
                  name={movie.name}
                  poster={movie.poster}
                  duration={movie.duration}
                  releaseDate={movie.releaseDate}
                  numberOfTickets={movie.numberOfTickets}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
