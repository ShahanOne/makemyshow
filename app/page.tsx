'use client';
import { useRouter } from 'next/navigation';
import MovieCard from '../components/MovieCard';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TrendingMovie from '../components/TrendingMovie';

export default function Home() {
  const [allMovies, setAllMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const userType =
    typeof window !== 'undefined' && localStorage.getItem('__ut');
  const userId = typeof window !== 'undefined' && localStorage.getItem('__uid');

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const res = await fetch('/api/movies');
        const data = await res.json();
        setAllMovies(data);

        // Assuming trending movies are filtered by some criteria
        const trending = data.filter((movie) => movie.isTrending); // Use your condition
        setTrendingMovies(trending);
      } catch (err) {
        console.log(err);
      }
    };
    getAllMovies();
  }, []);

  let signInStatus;
  if (userType && userId) {
    signInStatus = 'Out';
  } else {
    signInStatus = 'In';
  }

  const handleSignOrOut = () => {
    if (userType && userId) {
      typeof window !== 'undefined' && localStorage.removeItem('__uid');
      typeof window !== 'undefined' && localStorage.removeItem('__ut');
      router.push('/');
    } else {
      router.push('/login');
    }
  };
  // console.log(trendingMovies);

  return (
    <>
      <Navbar
        userId={userId}
        userType={userType}
        signStatus={signInStatus}
        signInOrOut={handleSignOrOut}
      />
      <div className="home p-8">
        <div className="flex gap-2 justify-center text-center py-8">
          <input
            className="search rounded-full shadow w-3/5 p-4 text-lg text-pink-500 outline-none"
            placeholder="Search for a movie or show..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 text-lg italic rounded-full">
            find
          </button>
        </div>

        {/* Trending Movies Carousel */}
        <div className="trending-movies py-8">
          <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
          {trendingMovies.map((movie, index) => (
            <div key={index}>
              <TrendingMovie
                name={movie.name}
                poster={movie.poster}
                releaseDate={movie.releaseDate}
              />
            </div>
          ))}
        </div>

        {/* All Movies */}
        <div>
          <p className="text-xl font-bold mb-4">All Movies</p>
          <div className="grid grid-cols-5 gap-8 py-8">
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

// 'use client';
// import { useRouter } from 'next/navigation';
// import MovieCard from '../components/MovieCard';
// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';

// export default function Home() {
//   const [allMovies, setAllMovies] = useState([]);
//   const [search, setSearch] = useState<string>('');
//   const router = useRouter();
//   const userType =
//     typeof window !== 'undefined' && localStorage.getItem('__ut');
//   const userId = typeof window !== 'undefined' && localStorage.getItem('__uid');

//   useEffect(() => {
//     const getAllMovies = async () => {
//       try {
//         const res = await fetch('/api/movies')
//           .then((response) => response.json())
//           .then((data) => {
//             setAllMovies(data);
//           });
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getAllMovies();
//   }, []);
//   let signInStatus;
//   if (userType && userId) {
//     signInStatus = 'Out';
//   } else {
//     signInStatus = 'In';
//   }

//   const handleSignOrOut = () => {
//     if (userType && userId) {
//       // router.push(`${userType}/${userId}`);
//       typeof window !== 'undefined' && localStorage.removeItem('__uid');
//       typeof window !== 'undefined' && localStorage.removeItem('__ut');
//       router.push('/');
//     } else {
//       router.push('/login');
//     }
//   };
//   return (
//     <>
//       <Navbar
//         userId={userId}
//         userType={userType}
//         signStatus={signInStatus}
//         signInOrOut={handleSignOrOut}
//       />
//       <div className="home p-8">
//         <div className="flex gap-2 justify-center text-center py-8">
//           <input
//             className="search rounded-full shadow w-3/5 p-4 text-lg text-pink-500 outline-none"
//             placeholder="Search for a movie or show..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button className="bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 text-lg italic rounded-full">
//             find
//           </button>
//         </div>
//         <div>
//           <p>All Movies</p>
//           <div className="grid grid-cols-4 gap-8 py-8">
//             {allMovies.length &&
//               allMovies.map((movie, index) => (
//                 <MovieCard
//                   key={index}
//                   info={() => router.replace(`/movie/${movie._id}`)}
//                   book={() => ''}
//                   name={movie.name}
//                   poster={movie.poster}
//                   duration={movie.duration}
//                   releaseDate={movie.releaseDate}
//                   numberOfTickets={movie.numberOfTickets}
//                 />
//               ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
