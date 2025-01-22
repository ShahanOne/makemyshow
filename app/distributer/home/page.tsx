'use client';
import Navbar from '../../../components/Navbar';
import MovieCard from '../../../components/MovieCard';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [listedMovies, setListedMovies] = useState([]);
  const router = useRouter();

  const userType =
    typeof window !== 'undefined' && localStorage.getItem('__ut');
  const userId = typeof window !== 'undefined' && localStorage.getItem('__uid');

  let distributerId;
  if (userType === 'distributer') {
    distributerId =
      typeof window !== 'undefined' && localStorage.getItem('__uid');
  }
  let signInStatus: boolean;
  useEffect(() => {
    if (userType && userId) {
      signInStatus = true;
    } else {
      signInStatus = false;
      router.push('/');
    }
  }, [userType, userId]);

  const handleSignOrOut = () => {
    if (userType && userId) {
      // router.push(`${userType}/${userId}`);
      typeof window !== 'undefined' && localStorage.removeItem('__uid');
      typeof window !== 'undefined' && localStorage.removeItem('__ut');
      router.push('/');
    } else {
      router.push('/login');
    }
  };
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
      <Navbar
        userId={userId}
        userType={userType}
        signInOrOut={handleSignOrOut}
        isSignedIn={signInStatus}
      />
      <div className="distributer_home p-8">
        <div>
          <a
            href="/distributer/addMovie"
            className="rounded-full bg-rose-500 text-white shadow p-2 m-2"
          >
            Add Movie
          </a>
          <p>Listed Movies</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {' '}
            {listedMovies.length &&
              listedMovies.map((movie, index) => (
                <MovieCard
                  key={index}
                  name={movie.name}
                  info={() => router.replace(`/movie/${movie._id}`)}
                  book={() => ''}
                  theme={'theme'}
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

export default Home;
