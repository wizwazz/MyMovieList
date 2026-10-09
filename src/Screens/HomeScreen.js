import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import MovieDetailModal from '../MovieItems/MovieDetailModal';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchTrendingMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/trending/movie/day?api_key=API_KEY',
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=API_KEY&language=en-US&page=1',
      );
      setPopularMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
    fetchPopularMovies();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => setSelectedMovie(item)}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        }}
        style={styles.movieImage}
      />
      <Text numberOfLines={3} style={styles.movieTitle}>
        {item.title} ({(item.release_date || 'N/A').slice(0, 4)})
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending:</Text>
      <FlatList
        horizontal={true}
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <Text style={styles.title}>What's Popular:</Text>
      <FlatList
        horizontal={true}
        data={popularMovies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <MovieDetailModal
        selectedMovie={selectedMovie}
        closeModal={() => setSelectedMovie(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D3D3D3',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  movieContainer: {
    width: 150,
    marginRight: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  movieImage: {
    width: 150,
    height: 200,
    borderRadius: 5,
    marginBottom: 8,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
});

export default HomeScreen;
