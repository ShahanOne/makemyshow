'use client';
import { useRouter } from 'next/navigation';
import MovieCard from '../../../components/MovieCard';
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';

const dashboard = () => {
  const [allMovies, setAllMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const res = await fetch('/api/movies')
          .then((response) => response.json())
          .then((data) => {
            setAllMovies(data);
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
      <div className="user_dashboard p-8">
        <div>
          <p>Listed Movies</p>
          <div className="grid grid-cols-4 gap-8 py-8">
            {allMovies.length &&
              allMovies.map((movie, index) => (
                <MovieCard
                  key={index}
                  info={() => router.replace(`/movie/${movie._id}`)}
                  book={() => ''}
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
