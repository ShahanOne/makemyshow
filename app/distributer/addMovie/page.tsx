'use client';
import AddMovie from '../../../components/AddMovie';
import Navbar from '../../../components/Navbar';

import React from 'react';

const addMovie = () => {
  return (
    <>
      <Navbar />
      <div>
        <AddMovie />
      </div>
    </>
  );
};

export default addMovie;
