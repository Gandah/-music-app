import SongBar from './SongBar';

const RelatedSongs = ({ data, isPlaying, activeSong, handlePauseClick,
  handlePlayClick, artistId }) => (
    <div className="flex flex-col">
      <h1 className="font-bold text-white text-3xl">Related Songs</h1>

      <div className="flex flex-col mt-6 w-full">
        {data?.tracks
          ? data?.tracks.map((song, index) => (
            <SongBar
              key={`${song.key}-${artistId}`}
              song={song}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
              i={index}
            />
          ))
          : data?.map((song, index) => (
            <SongBar
              key={`${artistId}-${index}`}
              song={song}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
              i={index}
            />
          ))}
      </div>
    </div>
);

export default RelatedSongs;
