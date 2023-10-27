import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col group w-[250px] p-4 bg-white/5 bg-opacity-80
          backdrop-blur-sm animate-slideup rounded-xl cursor-pointer
          hover:bg-biltong transition-colors duration-300"
      onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}
    >
      <img
        src={track?.images?.background}
        alt="artist"
        className="w-full h-56 object-cover"
      />

      <p className="mt-4 font-semibold text-lg text-white
      truncate"
      >{track?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
