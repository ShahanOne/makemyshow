import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddMovie = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState();
  const [numberOfTickets,setNumberOfTickets] = useState()
  const [releaseDate,setReleaseDate] = useState()
  const [poster,setPoster] = useState()
  const [posterUrl,setPosterUrl] = useState()
  const [availableFor,setAvailableFor] = useState()

  const router = useRouter();

const uploadImage = async()=> {
    const data = new FormData();
    data.append('file', poster);
    data.append('upload_preset', 'poster_upload');
    data.append('cloud_name', process.env.CLOUD_NAME);

    const res = await axios.post('https://api.cloudinary.com/v1_1/dimzcf9j8/image/upload',{ data})
  setPosterUrl(res.data.url)
  }
console.log(posterUrl);

  const addMovie = async () => {
    try {
      const res = await axios.post('/api/movies', {
       name: name,
  duration: duration,
  numberOfTickets: numberOfTickets,
  releaseDate: releaseDate,
  poster: posterUrl, 
  availableFor: availableFor, 
      });
      if (res.data) {
   console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-4 flex flex-col">
      <div>
        <label htmlFor="name">Name</label>
        <input
          className="rounded p-2 bg-orange-100 text-amber-700 outline-none m-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
      </div>
          <div>
        <label htmlFor="duration">Duration in minutes</label>
        <input
          className="rounded p-2 bg-orange-100 text-amber-700 outline-none m-2"
          value={duration}
          type='number'
          onChange={(e) => setDuration(e.target.value)}
          id="duration"
        />
      </div>     <div>
        <label htmlFor="ticketNumber">Number of Tickets</label>
        <input
          className="rounded p-2 bg-orange-100 text-amber-700 outline-none m-2"
          value={duration}
          type='number'
          onChange={(e) => setNumberOfTickets(e.target.value)}
          id="ticketNumber"
        />
      </div>     <div>
        <label htmlFor="releaseDate">Date of Release</label>
        <input
          className="rounded p-2 bg-orange-100 text-amber-700 outline-none m-2"
          type='date'
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          id="releaseDate"
        />
      </div>
      <div>
        <label htmlFor="availableFor">Movie in Theaters for (in Days)</label>
        <input
          className="rounded p-2 bg-orange-100 text-amber-700 outline-none m-2"
          value={availableFor}
          type='number'
          onChange={(e) => setAvailableFor(e.target.value)}
          id="availableFor"
        />
      </div>
            <div>
        {' '}
        <label htmlFor="poster">Poster</label>
        <input
          className="rounded p-2 bg-orange-100 text-amber-700 outline-none m-2"
          type="file"
          accept="image/png, image/jpeg,image/jpg,image/webp"
          onChange={(e) => setPoster(e.target.files[0])}
          id="poster"
        />
      </div>
           <button
        onClick={() => uploadImage()}
        className="bg-orange-400 text-white px-4 py-2 rounded"
      >
       Upload
      </button>

      <button
        onClick={() => addMovie()}
        className="bg-orange-400 text-white px-4 py-2 rounded"
      >
       Add
      </button>
    </div>
  );
};

export default AddMovie;
