'use client';
import { useRouter } from 'next/navigation';
import MovieCard from '../components/MovieCard';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  const [allMovies, setAllMovies] = useState([]);
  const router = useRouter();
  const userType = localStorage.getItem('__ut');
  const userId = localStorage.getItem('__uid');

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

  const handleSignOrOut = () => {
    if (userType && userId) {
      router.push(`${userType}/${userId}`);
    } else {
      router.push('/login');
    }
  };
  return (
    <>
      <Navbar signStatus={'In'} signInOrOut={handleSignOrOut} />
      <div className="home p-8">
        <div>
          <p>All Movies</p>
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
}
