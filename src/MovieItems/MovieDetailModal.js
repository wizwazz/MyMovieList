import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

const MovieDetailModal = ({selectedMovie, closeModal}) => {
  if (!selectedMovie) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={selectedMovie !== null}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={closeModal}>
            <Text>X</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`,
            }}
            style={styles.poster}
          />
          <Text style={styles.movieInfo}>
            {selectedMovie.title} ({selectedMovie.release_date.slice(0, 4)})
          </Text>
          <Text style={styles.movieInfo}>
            Rating: {selectedMovie.vote_average}
          </Text>
          <Text style={styles.movieInfo}>
            Overview: {selectedMovie.overview}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  poster: {
    width: '100%',
    height: 300,
  },
  movieInfo: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default MovieDetailModal;
