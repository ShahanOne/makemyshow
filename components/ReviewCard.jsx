import React from 'react';

const ReviewCard = ({ user, review, stars, upvote, downvote }) => {
  return (
    <div className="card rounded-lg shadow p-4  bg-white text-gray-700">
      <div className="user_div flex">
        <img className="rounded-full h-2 w-2" src={user?.photo} alt="user" />
        <p className="text-sm">{user?.username}</p>
      </div>
      <div className="review_div py-4">
        <p className="text-2xl text-yellow-400">
          {[...Array(stars)].map((_, index) => (
            <span key={index}>★</span>
          ))}
        </p>
        <p className="review italic">{review}</p>
      </div>
      <div className="flex justify-between gap-2">
        <button
          onClick={() => upvote()}
          className="rounded-full shadow px-2 py-1 w-full bg-white hover:bg-[#EF5A6F] hover:text-white"
        >
          upvote
        </button>
        <button
          onClick={() => downvote()}
          className="rounded-full shadow px-2 py-1 w-full bg-white hover:bg-[#EF5A6F] hover:text-white"
        >
          downvote
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
