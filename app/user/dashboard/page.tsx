'use client';
import { useRouter } from 'next/navigation';
import MovieCard from '../../../components/MovieCard';
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';

const Dashboard = () => {
  const [allMovies, setAllMovies] = useState([]);
  const router = useRouter();

  const userType =
    typeof window !== 'undefined' && localStorage.getItem('__ut');
  const userId = typeof window !== 'undefined' && localStorage.getItem('__uid');
  let signInStatus;
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
      <Navbar
        userId={userId}
        userType={userType}
        signStatus={signInStatus}
        signInOrOut={handleSignOrOut}
      />
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
                  theme={'theme'}
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

export default Dashboard;
