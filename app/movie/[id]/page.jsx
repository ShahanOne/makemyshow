'use client';
import ReviewCard from '../../../components/ReviewCard';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Modal } from 'antd';
import formatDate from '../../../lib/functions/formatDate';
const Movie = () => {
  const [movieData, setMovieData] = useState({
    name: '',
    releaseDate: '',
    poster: '',
    duration: '',
    availableFor: '',
    distributer: '',
    reviews: '',
    description: '',
  });
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);

  const [openBuyModal, setOpenBuyModal] = useState(false);

  const pathname = usePathname();
  const movieId = pathname.split('/').pop();
  const userType = localStorage.getItem('__ut');
  const userId = localStorage.getItem('__uid');

  let signInStatus;
  if (userType && userId) {
    signInStatus = 'Out';
  } else {
    signInStatus = 'In';
  }

  const handleSignOrOut = () => {
    if (userType && userId) {
      // router.push(`${userType}/${userId}`);
      localStorage.removeItem('__uid');
      localStorage.removeItem('__ut');
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
  return (
    <>
      <Navbar
        userId={userId}
        userType={userType}
        signStatus={signInStatus}
        signInOrOut={handleSignOrOut}
      />
      <div className="grid grid-cols-3 gap-8 text-gray-700 p-4">
        <div className="col-span-2 rounded shadow p-4 min-h-screen">
          <div className="info_div pt-4">
            <p className="text-2xl">{movieData?.name}</p>
            <div className="grid grid-cols-2 py-4 gap-2">
              <p className="text-sm">
                Release Date:{' '}
                <span className="text-base">
                  {formatDate(movieData?.releaseDate)}
                </span>
              </p>{' '}
              <p className="text-sm">
                Duration:{' '}
                <span className="text-base">{movieData?.duration} minutes</span>{' '}
              </p>{' '}
              <p className="text-sm">
                Distributer/Studio:{' '}
                <span className="text-base">
                  {movieData?.distributer?.username}
                </span>
              </p>{' '}
              <p className="text-sm">
                Expiring In :{' '}
                <span className="text-base">
                  {movieData?.availableFor} Days
                </span>
              </p>
            </div>
            <div className="">
              <p className="text-lg">Description :</p>
              <p className="italic text-sm pt-4">
                {movieData?.description?.length > 0
                  ? movieData?.description
                  : 'No description provided.'}
              </p>
            </div>
          </div>
          <div className="reviews_div pt-4">
            <div className="py-4 rounded-lg shadow px-2 bg-pink-100">
              <p className="italic">Watched the movie? Post a review. </p>
              <p className="py-2 text-sm">
                Stars:{' '}
                {[1, 2, 3, 4, 5].map((index) => (
                  <span
                    key={index}
                    className={`cursor-pointer text-yellow-400 text-xl`}
                    onClick={() => handleStarClick(index)}
                  >
                    {index <= stars ? '★' : '☆'}
                  </span>
                ))}
              </p>
              <div className="flex gap-2">
                <textarea
                  rows={1}
                  className="w-full outline-none rounded-lg px-2 py-1"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <button
                  onClick={() => {
                    userType === 'user'
                      ? stars > 0 && review.length
                        ? postReview()
                        : toast.info('Please select stars and enter review')
                      : toast.error('Distributers cannot post reviews!');
                  }}
                  className="rounded-xl shadow-lg px-2 py-1 text-white bg-[#EF5A6F] hover:bg-[#fa5d72]"
                >
                  post
                </button>
              </div>
            </div>
            <p className="text-lg py-4">Reviews :</p>
            <div className="flex py-1 overflow-x-scroll">
              {movieData?.reviews.length > 0 &&
                movieData?.reviews?.map((review, index) => (
                  <ReviewCard
                    user={review.user}
                    stars={review.stars}
                    review={review.review}
                    upvote={() => ''}
                    downvote={() => ''}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="img_div">
          <img
            className="w-full h-[30rem] shadow"
            src={movieData?.poster}
            alt="poster"
          />
          <button
            onClick={() => setOpenBuyModal(true)}
            className="bg-[#EF5A6F] hover:bg-[#fa5d72] my-2 text-white w-full rounded-lg shadow-lg p-2"
          >
            Book Tickets
          </button>
          <button
            onClick={() => addToWishlist()}
            className="bg-gray-50 hover:bg-white my-2 w-full rounded-lg shadow p-2"
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
