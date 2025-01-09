import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AddMovie = () => {
  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<number | undefined>();
  const [numberOfTickets, setNumberOfTickets] = useState<number | undefined>();
  const [releaseDate, setReleaseDate] = useState<string>('');
  const [poster, setPoster] = useState<File | null>(null);
  const [posterUrl, setPosterUrl] = useState<string>('');
  const [customPosterUrl, setCustomPosterUrl] = useState<string>('');
  const [availableFor, setAvailableFor] = useState<number | undefined>();
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);

  const router = useRouter();
  const userType =
    typeof window !== 'undefined' && localStorage.getItem('__ut');
  let distributerId;
  if (userType === 'distributer') {
    distributerId =
      typeof window !== 'undefined' && localStorage.getItem('__uid');
  }

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', poster);
    data.append('upload_preset', 'poster_upload');
    data.append('cloud_name', 'dimzcf9j8');

    await fetch(`https://api.cloudinary.com/v1_1/${'dimzcf9j8'}/image/upload`, {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPosterUrl(data.url);
        setUploadStatus(true);
        toast.success('Poster uploaded');
      });
  };

  const addMovie = async () => {
    try {
      await fetch('/api/movies', {
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

  useEffect(() => {
    setPosterUrl(customPosterUrl);
  }, [customPosterUrl]);

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl text-center mb-6">Add Movie</h1>

      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-gray-800 font-semibold mb-1"
        >
          Name
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Enter movie name"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="duration"
          className="block text-gray-800 font-semibold mb-1"
        >
          Duration (minutes)
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          value={duration}
          type="number"
          onChange={(e) => setDuration(parseInt(e.target.value))}
          id="duration"
          placeholder="Enter duration"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="ticketNumber"
          className="block text-gray-800 font-semibold mb-1"
        >
          Number of Tickets
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          value={numberOfTickets}
          type="number"
          onChange={(e) => setNumberOfTickets(parseInt(e.target.value))}
          id="ticketNumber"
          placeholder="Enter number of tickets"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="releaseDate"
          className="block text-gray-800 font-semibold mb-1"
        >
          Release Date
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          id="releaseDate"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="availableFor"
          className="block text-gray-800 font-semibold mb-1"
        >
          Available for (Days)
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          value={availableFor}
          type="number"
          onChange={(e) => setAvailableFor(parseInt(e.target.value))}
          id="availableFor"
          placeholder="Enter available days"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="poster"
          className="block text-gray-800 font-semibold mb-1"
        >
          Poster
        </label>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          type="file"
          disabled={!!customPosterUrl}
          accept="image/png, image/jpeg,image/jpg,image/webp"
          onChange={(e) => setPoster(e.target.files[0])}
          id="poster"
        />
        <div className="flex justify-center py-4">
          <p>OR</p>
        </div>
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          value={posterUrl}
          disabled={!!posterUrl}
          onChange={(e) => setCustomPosterUrl(e.target.value)}
          id="posterurl"
          placeholder="Enter poster url"
        />
      </div>

      <button
        onClick={() =>
          poster ? uploadImage() : toast.info('Please choose a file first')
        }
        disabled={uploadStatus}
        className={`w-full py-3 mb-4 rounded-lg text-white ${
          uploadStatus ? 'bg-green-600' : 'bg-pink-500 hover:bg-pink-600'
        } focus:outline-none focus:ring focus:ring-blue-300`}
      >
        {uploadStatus ? 'Poster Uploaded' : 'Upload Poster'}
      </button>

      <button
        onClick={() => addMovie()}
        // disabled={!uploadStatus}
        className="w-full py-3 rounded-lg bg-[#EF5A6F] text-white hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300"
      >
        Add Movie
      </button>
    </div>
  );
};

export default AddMovie;
