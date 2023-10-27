import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const artist = artistData?.data[0]?.attributes;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent
    to-black h-28 sm:h-48 rounded-xl"
      />

      <div className="flex absolute inset-0 items-center">
        <img
          alt="art"
          src={artistId ? artist?.artwork?.url.replace('{w}', '500').replace('{h}', '500')
            : songData?.images?.background}
          className="w-28 h-auto aspect-square sm:w-48 rounded-full
          object-cover border-2 shadow-xl shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold text-xl sm:text-3xl text-white">{artistId ? artist?.artistName : songData?.title }</p>
          {// if no artist id then render a link below with the song name
            !artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className="text-base text-gray-300 mt-2 ">{songData?.subtitle} </p>
            </Link>
            )

          }
          <p className="text-base text-gray-400 mt-2">
            {artistId ? artist?.genreNames[0]
              : songData?.genres?.primary}
          </p>
        </div>
      </div>

      <div className="w-full h-24 sm:h-42 " />
    </div>
  );
};

export default DetailsHeader;
