import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import MovieDetail from '../MovieItems/MovieDetail';

const DiscoverScreen = ({route}) => {
  const {playlists} = route.params || [];
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = search
          ? `https://api.themoviedb.org/3/search/movie?api_key=API_KEY&query=${debouncedSearch}`
          : 'https://api.themoviedb.org/3/movie/popular?api_key=API_KEY&language=en-US&page=1';
        const response = await axios.get(url);
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [debouncedSearch, search]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timerId);
  }, [search]);

  const handleAddToPlaylist = async playlist => {
    try {
      const updatedPlaylist = {
        ...playlist,
        movies: [...playlist.movies, selectedMovie],
      };
      onAddToPlaylist(updatedPlaylist);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => setSelectedMovie(null);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => setSelectedMovie(item)}>
      <Text style={styles.movieTitle}>{`${item.title} (${(
        item.release_date || 'N/A'
      ).slice(0, 4)})`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setSearch}
        value={search}
        placeholder="Search for movies"
        placeholderTextColor="#000"
      />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Modal animationType="slide" transparent visible={!!selectedMovie}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <MovieDetail
              selectedMovie={selectedMovie}
              playlists={playlists}
              addToPlaylist={handleAddToPlaylist}
              closeModal={closeModal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
});

export default DiscoverScreen;
