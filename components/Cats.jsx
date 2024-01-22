import axios from 'axios';

const Cats =() => {
  const fetchSomething = async () => {
    try {
      const res = await axios.get('/api/cats');
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      Honka Bronka
      <button
        onClick={fetchSomething}
        className="bg-sky-500 p-4 border-none rounded-full"
      >
        Fetch
      </button>
    </div>
  );
}
export default Cats;