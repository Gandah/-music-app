import { Error, Loader, ArtistCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery({
    genre: 'POP',
    limit: '25',
  });

  if (isFetching) return <Loader title="Fetching artist data" />;

  if (error) return <Error />;

  return (

    <section className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left
        mt-4 mb-10"
      >
        Top Artists
      </h2>

      <div className="flex flex-wrap sm:justify-start
      justify-center gap-8"
      >
        {data.tracks?.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}

      </div>

    </section>

  );
};

export default TopArtists;
