import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AddMovie = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState();
  const [numberOfTickets, setNumberOfTickets] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const [poster, setPoster] = useState();
  const [posterUrl, setPosterUrl] = useState();
  const [availableFor, setAvailableFor] = useState();

  const [uploadStatus, setUploadStatus] = useState(false);

  const router = useRouter();
  const userType = localStorage.getItem('__ut');
  let distributerId;
  if (userType === 'distributer') {
    distributerId = localStorage.getItem('__uid');
  }

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', poster);
    data.append('upload_preset', 'poster_upload');
    data.append('cloud_name', 'dimzcf9j8');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${'dimzcf9j8'}/image/upload`,
      {
        method: 'post',
        body: data,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        setPosterUrl(data.url);
        setUploadStatus(true);
        toast.success('poster uploaded');
      });
  };
  // console.log(posterUrl);

  const addMovie = async () => {
    try {
      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            name: name,
            duration: duration,
            distributerId: distributerId,
            numberOfTickets: numberOfTickets,
            releaseDate: releaseDate,
            poster: posterUrl,
            availableFor: availableFor,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) =>
          data?.movie
            ? toast.success('Movie uploaded')
            : toast.error('Cannot upload movie')
        );
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
          type="number"
          onChange={(e) => setDuration(e.target.value)}
          id="duration"
        />
      </div>{' '}
      <div>
        <label htmlFor="ticketNumber">Number of Tickets</label>
        <input
          className="rounded p-2 bg-orange-100 text-amber-700 outline-none m-2"
          value={numberOfTickets}
          type="number"
          onChange={(e) => setNumberOfTickets(e.target.value)}
          id="ticketNumber"
        />
      </div>{' '}
      <div>
        <label htmlFor="releaseDate">Date of Release</label>
        <input
          className="rounded p-2 bg-orange-100 text-amber-700 outline-none m-2"
          type="date"
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
          type="number"
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
        onClick={() =>
          poster ? uploadImage() : toast.info('please choose a file first')
        }
        disabled={uploadStatus}
        className="bg-orange-400 text-white px-4 py-2 rounded"
      >
        {uploadStatus ? 'Uploaded' : 'Upload'}
      </button>
      <button
        onClick={() => addMovie()}
        disabled={!uploadStatus}
        className="bg-orange-400 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
};

export default AddMovie;
