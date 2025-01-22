'use client';
import { useRouter } from 'next/navigation';
import MovieCard from '../../../components/MovieCard';
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import TrendingMovie from '../../../components/TrendingMovie';

const Home = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [theme, setTheme] = useState<string>('light');
  const [search, setSearch] = useState<string>('');

  const router = useRouter();

  const userType =
    typeof window !== 'undefined' && localStorage.getItem('__ut');
  const userId = typeof window !== 'undefined' && localStorage.getItem('__uid');

  let signInStatus: boolean;
  useEffect(() => {
    if (userType && userId) {
      signInStatus = true;
      router.push(`/${userType}/home`);
    } else {
      signInStatus = false;
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
        const res = await fetch('/api/movies')
          .then((response) => response.json())
          .then((data) => {
            setAllMovies(data);
            const trending = data.filter((movie) => movie.isTrending); // Use your condition
            setTrendingMovies(trending);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getAllMovies();
  }, []);

  const changeTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  return (
    <>
      <Navbar
        userId={userId}
        userType={userType}
        theme={theme}
        changeTheme={changeTheme}
        isSignedIn={signInStatus}
        signInOrOut={handleSignOrOut}
      />
      <div
        className={`home ${
          theme === 'light' ? 'bg-gray-50' : 'bg-zinc-900'
        } p-8 min-h-screen transition duration-200 ease-in-out`}
      >
        {/* Search Section */}
        <div className="flex flex-col items-center gap-4 py-12">
          <h1 className="text-4xl font-extrabold text-rose-500">
            Discover Your Next Favorite Movie
          </h1>
          <div className="flex gap-4 w-full max-w-4xl">
            <input
              className="search rounded-full shadow w-full p-4 text-lg text-gray-700 outline-none border-2 border-rose-200 focus:border-rose-500 transition duration-200"
              placeholder="Search for a movie or show..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 text-lg rounded-full shadow-lg transition duration-200">
              Find
            </button>
          </div>
        </div>

        {/* Trending Movies Carousel */}
        <div
          className={`trending-movies py-6 rounded-lg px-4 mb-8 ${
            theme === 'light' ? 'bg-gray-100' : 'bg-zinc-950'
          } transition duration-200 ease-in-out`}
        >
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold text-rose-500 mb-12">
              Trending Movies
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-scroll no-scrollbar">
            {trendingMovies.map((movie, index) => (
              <div key={index} className="flex-shrink-0">
                <TrendingMovie
                  name={movie.name}
                  poster={movie.poster}
                  info={() => router.replace(`/movie/${movie._id}`)}
                  releaseDate={movie.releaseDate}
                />
              </div>
            ))}
          </div>
        </div>

        {/* All Movies Section */}
        <div
          className={`all-movies ${
            theme === 'light' ? 'bg-gray-100' : 'bg-zinc-950'
          } rounded-lg px-4 py-12 transition duration-200 ease-in-out`}
        >
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold text-rose-500 mb-6">
              All Movies
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {allMovies.length > 0 &&
              allMovies.map((movie, index) => (
                <MovieCard
                  key={index}
                  info={() => router.replace(`/movie/${movie._id}`)}
                  book={() => ''}
                  theme={theme}
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
      <Footer />
    </>
  );
};

export default Home;
