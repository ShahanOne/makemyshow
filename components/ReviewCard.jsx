import React from 'react';

const ReviewCard = ({ user, review, stars }) => {
  return (
    <div className="card rounded-lg shadow-lg p-2 bg-gray-100 text-gray-700">
      <div className="user_div flex">
        <img className="rounded-full h-2 w-2" src={user?.photo} alt="user" />
        <p>{user?.username}</p>
      </div>
      <div className="review_div">
        <p>{stars}</p>
        <p className="review">{review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
