import { useDispatch, useSelector } from 'react-redux';
import { Error, SongCard, SkeletonLoader } from '../components';
import { genres } from '../assets/constants';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery({
    genre: `${genreListId || 'POP'}`,
    limit: '30',
  });

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  if (isFetching) return <SkeletonLoader />;

  if (error) return <Error />;

  return (
    <section className="flex flex-col">
      <div
        className="w-full flex flex-col
            sm:flex-row justify-between items-center mt-4 mb-10 "
      >
        <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'pop'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
        </select>
      </div>

      <div
        className="flex flex-wrap sm:justify-start
            justify-center gap-8"
      >
        {data.tracks?.map((song, index) => (
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

export default Discover;
