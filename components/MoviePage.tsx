import React from 'react';

const MoviePage = ({
  name,
  releaseDate,
  poster,
  duration,
  availableFor,
  distributer,
  reviews,
}) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="info_div"></div>
        <div className="reviews_div flex overflow-x-scroll"></div>
      </div>
      <div className="img_div">
        <img className="w-full" src={poster} alt="poster" />
      </div>
    </div>
  );
};

export default MoviePage;
