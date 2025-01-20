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

    await fetch(`https://api.cloudinary.com/v1_1/dimzcf9j8/image/upload`, {
      method: 'post',
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPosterUrl(data.url);
        setUploadStatus(true);
        toast.success('Poster uploaded successfully!');
      })
      .catch(() => {
        toast.error('Failed to upload poster. Please try again.');
      });
  };

  const addMovie = async () => {
    if (!name || !duration || !numberOfTickets || !releaseDate || !posterUrl) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            name,
            duration,
            distributerId,
            numberOfTickets,
            releaseDate,
            poster: posterUrl,
            availableFor,
          },
        ]),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.movie) {
            toast.success('Movie added successfully!');
            router.push('/distributer/dashboard');
          } else {
            toast.error('Failed to add movie.');
          }
        });
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while adding the movie.');
    }
  };

  useEffect(() => {
    setPosterUrl(customPosterUrl);
  }, [customPosterUrl]);

  return (
    <div className="p-12 grid grid-cols-3 gap-8">
      <div className="bg-white col-span-2 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Movie
        </h1>

        {/* Movie Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            Movie Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter movie name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-sky-300"
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="duration"
          >
            Duration (in minutes)
          </label>
          <input
            id="duration"
            type="number"
            placeholder="Enter duration"
            value={duration || ''}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-sky-300"
          />
        </div>

        {/* Number of Tickets */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="tickets"
          >
            Number of Tickets
          </label>
          <input
            id="tickets"
            type="number"
            placeholder="Enter number of tickets"
            value={numberOfTickets || ''}
            onChange={(e) => setNumberOfTickets(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-sky-300"
          />
        </div>

        {/* Release Date */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="releaseDate"
          >
            Release Date
          </label>
          <input
            id="releaseDate"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-sky-300"
          />
        </div>

        {/* Available for Days */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="availableFor"
          >
            Available for (in days)
          </label>
          <input
            id="availableFor"
            type="number"
            placeholder="Enter availability duration"
            value={availableFor || ''}
            onChange={(e) => setAvailableFor(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-sky-300"
          />
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Poster */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Poster</label>
          <input
            type="file"
            accept="image/*"
            disabled={!!customPosterUrl}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setPoster(file);
              if (file) {
                setPosterUrl(URL.createObjectURL(file)); // Create preview URL for the file
              }
            }}
            className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring focus:ring-sky-300"
          />
          <button
            onClick={
              poster ? uploadImage : () => toast.info('Please select a file')
            }
            disabled={uploadStatus}
            className={`w-full py-3 mb-4 text-white font-medium rounded-lg ${
              uploadStatus ? 'bg-red-500' : 'bg-sky-500 hover:bg-sky-600'
            } transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-sky-300`}
          >
            {uploadStatus ? 'Poster Uploaded' : 'Upload Poster'}
          </button>
          <div className="text-center text-gray-600">OR</div>
          <input
            type="text"
            placeholder="Enter poster URL"
            value={customPosterUrl}
            onChange={(e) => {
              setCustomPosterUrl(e.target.value);
              setPosterUrl(e.target.value); // Set the URL as the poster preview
            }}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-sky-300"
          />
        </div>

        {/* Image Preview */}
        {posterUrl && (
          <div className="mb-4">
            <p className="text-gray-700 font-medium mb-2">Poster Preview:</p>
            <img
              src={posterUrl}
              alt="Poster Preview"
              className="w-full max-h-64 object-contain border rounded-lg"
            />
          </div>
        )}

        <button
          onClick={addMovie}
          className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-200 ease-in-out focus:outline-none focus:ring focus:ring-red-300"
        >
          Add Movie
        </button>
      </div>
    </div>
  );
};

export default AddMovie;
