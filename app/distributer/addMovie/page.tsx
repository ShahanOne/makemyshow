'use client';
import AddMovie from '../../../components/AddMovie';
import Navbar from '../../../components/Navbar';

import React from 'react';

const addMovie = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-indigo-300 to-orange-300 h-screen">
        <AddMovie />
      </div>
    </>
  );
};

export default addMovie;
