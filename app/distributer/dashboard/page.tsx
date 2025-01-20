'use client';
import Navbar from '../../../components/Navbar';
import MovieCard from '../../../components/MovieCard';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
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
  let signInStatus: string;
  if (userType && userId) {
    signInStatus = 'Out';
  } else {
    signInStatus = 'In';
  }

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
        signStatus={signInStatus}
      />
      <div className="distributer_dashboard p-8">
        <div>
          <p>Listed Movies</p>
          <div className="grid grid-cols-5 gap-8 py-8">
            {' '}
            {listedMovies.length &&
              listedMovies.map((movie, index) => (
                <MovieCard
                  key={index}
                  name={movie.name}
                  info={() => router.replace(`/movie/${movie._id}`)}
                  book={() => ''}
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

export default Dashboard;
