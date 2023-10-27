import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

// Top Chart Component
const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex flex-row  items-center
  cursor-pointer hover:bg-[#523224ef] py-2 p-4 rounded"
  >
    <h3 className="font-bold text-base text-white mr-3">
      {i + 1}
    </h3>
    <div className="flex flex-1 flex-row justify-between
    items-center"
    >
      <img
        src={song?.images?.coverart}
        alt={song?.title}
        className="w-20 aspect-square h-auto rounded-lg"
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song?.key}`}>
          <p className="font-bold text-xl text-white">
            {song?.title}
          </p>
        </Link>
        <Link to={`/songs/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300">
            {song?.subtitle}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery({
    genre: 'POP',
    limit: '10',
  });
  const divRef = useRef(null);

  useEffect(() => {
    // scrolls top chart section into view upon reload
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlays = data?.tracks.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <section
      ref={divRef}
      className="flex flex-col ml-0 xl:ml-6 mb-6 flex-1 max-w-full xl:max-w-[500px]"
    >
      {/* Top Charts Section  */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl text-white font-bold">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base
            cursor-pointer"
            >
              See More
            </p>
          </Link>
        </div>

        <div className="flex flex-col mt-4 gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      {/* Top Artists Swipe Section  */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl text-white font-bold">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base
              cursor-pointer"
            >
              See More
            </p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {
            topPlays?.map((song, i) => (
              <SwiperSlide
                key={song?.key}
                style={{ width: '25%', height: 'auto' }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img
                    src={song?.images.background}
                    alt="name"
                    className="w-full rounded-full object-cover"
                  />
                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>

    </section>
  );
};
export default TopPlay;
