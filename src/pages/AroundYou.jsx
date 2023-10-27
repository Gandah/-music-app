import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  //   console.log(country);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${import.meta.env.VITE_GEO_API_KEY}`);
        setCountry(response?.data?.location.country);
      } catch (err) {
        console.error(err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [country]);

  if (isFetching && loading) return <Loader title="Fetching local songs" />;

  if (error && country) return <Error />;

  return (

    <section className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left
        mt-4 mb-10"
      >
        Around You:
        <span className="font-black ml-2">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start
      justify-center gap-8"
      >
        {data?.map((song, index) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={index}
          />
        ))}

      </div>

    </section>

  );
};

export default AroundYou;
