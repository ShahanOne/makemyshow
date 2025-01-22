'use client';
import ReviewCard from '../../../components/ReviewCard';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Modal } from 'antd';
import formatDate from '../../../lib/functions/formatDate';

interface MovieData {
  name: string;
  releaseDate: string;
  poster: string;
  duration: string;
  availableFor: string;
  distributer: {
    username: string;
  } | null;
  reviews: Review[];
  description: string;
}

interface Review {
  user: string;
  stars: number;
  review: string;
}

const Movie = () => {
  const [movieData, setMovieData] = useState<MovieData>({
    name: '',
    releaseDate: '',
    poster: '',
    duration: '',
    availableFor: '',
    distributer: null,
    reviews: [],
    description: '',
  });
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [theme, setTheme] = useState<string>('light');

  const router = useRouter();
  const pathname = usePathname();
  const movieId = pathname.split('/').pop();
  const userType =
    typeof window !== 'undefined' && localStorage.getItem('__ut');
  const userId = typeof window !== 'undefined' && localStorage.getItem('__uid');

  let signInStatus: boolean;
  if (userType && userId) {
    signInStatus = true;
  } else {
    signInStatus = false;
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
    const getMovieData = async () => {
      try {
        const res = await fetch('/api/movies/get-movie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([
            {
              movieId: movieId,
            },
          ]),
        })
          .then((response) => response.json())
          .then((data) => {
            setMovieData(data?.movie);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getMovieData();
  }, []);

  const postReview = async () => {
    try {
      const res = await fetch('/api/movies/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            userId: userId,
            movieId: movieId,
            review: review,
            stars: stars,
          },
        ]),
      })
        .then((response) => response.json())
        .then((data) => {
          setMovieData(data?.movie);
        });
    } catch (err) {
      toast.error('Error posting review');
    }
  };

  const addToWishlist = async () => {
    try {
      const res = await fetch('/api/user/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            userId: userId,
            movieId: movieId,
          },
        ]),
      })
        .then((response) => response.json())
        .then((data) => {
          data?.user && toast.success('Added to Wishlist');
        });
    } catch (err) {
      toast.error('Error posting review');
    }
  };
  const handleStarClick = (index) => {
    setStars(stars === index ? 0 : index);
  };

  const changeTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Navbar
        userId={userId}
        userType={userType}
        isSignedIn={signInStatus}
        changeTheme={changeTheme}
        signInOrOut={handleSignOrOut}
      />
      <div
        className={`grid grid-cols-3 gap-8 p-4 bg-gradient-to-br ${
          theme === 'light'
            ? 'from-indigo-300 to-orange-300'
            : 'from-rose-950 to-gray-900'
        }`}
      >
        <div
          className={`col-span-2 rounded-lg ${
            theme === 'light' ? 'bg-gray-50' : 'bg-zinc-900'
          } shadow-lg p-6 min-h-screen`}
        >
          {/* Movie Info Section */}
          <div className="info_div">
            <p
              className={`text-3xl font-semibold ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-300'
              }`}
            >
              {movieData?.name}
            </p>
            <div className="grid grid-cols-2 py-6 gap-4">
              <p
                className={`text-sm font-medium ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                Release Date:{' '}
                <span
                  className={`text-base font-semibold ${
                    theme === 'light' ? 'text-gray-800' : 'text-gray-300'
                  }`}
                >
                  {formatDate(movieData?.releaseDate)}
                </span>
              </p>
              <p
                className={`text-sm font-medium ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                Duration:{' '}
                <span
                  className={`text-base font-semibold ${
                    theme === 'light' ? 'text-gray-800' : 'text-gray-300'
                  }`}
                >
                  {movieData?.duration} minutes
                </span>
              </p>
              <p
                className={`text-sm font-medium ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                Distributor/Studio:{' '}
                <span
                  className={`text-base font-semibold ${
                    theme === 'light' ? 'text-gray-800' : 'text-gray-300'
                  }`}
                >
                  {movieData?.distributer?.username}
                </span>
              </p>
              <p
                className={`text-sm font-medium ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                Expiring In:{' '}
                <span
                  className={`text-base font-semibold ${
                    theme === 'light' ? 'text-gray-800' : 'text-gray-300'
                  }`}
                >
                  {movieData?.availableFor} Days
                </span>
              </p>
            </div>
            <div className="py-4">
              <p
                className={`text-lg font-semibold ${
                  theme === 'light' ? 'text-gray-800' : 'text-gray-300'
                }`}
              >
                Description:
              </p>
              <p
                className={`italic text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                } pt-2`}
              >
                {movieData?.description?.length > 0
                  ? movieData?.description
                  : 'No description provided.'}
              </p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="reviews_div pt-6">
            <div
              className={`${
                theme === 'light'
                  ? 'bg-pink-50 border-pink-200'
                  : 'bg-zinc-800 border-zinc-800'
              } border rounded-lg shadow p-4`}
            >
              <p
                className={`italic ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}
              >
                Watched the movie? Post a review.
              </p>
              <div className="py-2">
                <p
                  className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  } font-medium`}
                >
                  Stars:
                </p>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <span
                      key={index}
                      className={`cursor-pointer text-yellow-400 text-2xl`}
                      onClick={() => handleStarClick(index)}
                    >
                      {index <= stars ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <textarea
                  rows={1}
                  placeholder="Write your review..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring focus:ring-pink-300 text-sm"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <button
                  onClick={() => {
                    userType === 'user'
                      ? stars > 0 && review.length
                        ? postReview()
                        : toast.info('Please select stars and enter a review')
                      : toast.error('Distributors cannot post reviews!');
                  }}
                  className="rounded-lg shadow-md px-4 py-2 text-white bg-pink-500 hover:bg-pink-400 transition duration-200 ease-in-out"
                >
                  Post
                </button>
              </div>
            </div>

            <p
              className={`text-xl font-semibold ${
                theme === 'light' ? 'text-gray-800' : 'text-gray-300'
              } pt-6`}
            >
              Reviews:
            </p>
            <div className="flex gap-4 py-4 overflow-x-auto">
              {movieData?.reviews?.length > 0 ? (
                movieData?.reviews?.map((review, index) => (
                  <ReviewCard
                    key={index}
                    user={review.user}
                    stars={review.stars}
                    review={review.review}
                    upvote={() => ''}
                    downvote={() => ''}
                  />
                ))
              ) : (
                <p className="text-gray-600 italic">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
        <div className="img_div space-y-4">
          <img
            className="w-full h-[30rem] rounded-lg shadow-md object-fill"
            src={movieData?.poster}
            alt="Movie Poster"
          />
          <button
            onClick={() => setOpenBuyModal(true)}
            className="bg-[#EF5A6F] hover:bg-[#fa5d72] text-white w-full rounded-lg shadow-lg py-3 font-medium transition duration-200 ease-in-out"
          >
            Book Tickets
          </button>
          <button
            onClick={() => addToWishlist()}
            className="bg-gray-50 hover:bg-gray-100 w-full rounded-lg shadow-md py-3 font-medium text-gray-700 transition duration-200 ease-in-out"
          >
            Save for Later
          </button>
        </div>
      </div>{' '}
      <Modal
        centered
        title={
          <div style={{ textAlign: 'center', fontWeight: '400' }}>
            Buy Tickets
          </div>
        }
        open={openBuyModal}
        onCancel={() => {
          setOpenBuyModal(false);
        }}
        footer={
          <button className="bg-[#EF5A6F] hover:bg-[#fa5d72] my-2 text-white rounded-lg shadow-lg p-2">
            confirm
          </button>
        }
      >
        Bruh
      </Modal>
      <Footer />
    </>
  );
};

export default Movie;
