import React, {useState} from 'react';
import MovieDetail from './MovieDetail';
import PlaylistScreen from '../Screens/PlaylistScreen';

const Stuff = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const createPlaylist = playlist => {
    setPlaylists(prevPlaylists => [...prevPlaylists, playlist]);
  };

  const addToPlaylist = updatedPlaylist => {
    setPlaylists(prevPlaylists =>
      prevPlaylists.map(playlist =>
        playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist,
      ),
    );
  };

  // This function should handle selecting a movie, set the state for selectedMovie
  const handleSelectMovie = movie => {
    setSelectedMovie(movie);
  };

  return (
    <>
      {/* Render other components such as Search and Movie List here */}
      <PlaylistScreen
        playlists={playlists}
        onCreatePlaylist={createPlaylist}
        onAddToPlaylist={addToPlaylist}
        selectedMovie={selectedMovie}
      />
      <MovieDetail
        selectedMovie={selectedMovie}
        playlists={playlists}
        addToPlaylist={addToPlaylist}
      />
    </>
  );
};

export default Stuff;
