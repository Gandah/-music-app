import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData,
    isFetching: isFetchingArtistDetails, error,
  } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) { return <Loader title="Fetching artist data" />; }

  if (error) return <Error />;

  // console.log(artistData?.data)

  return (
    <section className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={artistData?.data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
      />
    </section>
  );
};

export default ArtistDetails;

