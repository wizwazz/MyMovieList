import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  Image,
} from 'react-native';
import NoPlaylists from '../MovieItems/NoPlaylists';

const PlaylistScreen = ({
  playlists,
  onCreatePlaylist,
  onAddToPlaylist,
  selectedMovie,
}) => {
  const [newPlaylist, setNewPlaylist] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addPlaylist = () => {
    if (playlists.some(playlist => playlist.name === newPlaylist)) {
      setErrorMsg('Playlist name already exists');
    } else {
      onCreatePlaylist({
        id: Date.now().toString(),
        name: newPlaylist,
        movies: [],
      });
      setNewPlaylist('');
    }
  };

  const addMovieToPlaylist = playlist => {
    const updatedPlaylist = {
      ...playlist,
      movies: [...playlist.movies, selectedMovie],
    };
    onAddToPlaylist(updatedPlaylist);
    setSelectedPlaylist(null);
  };

  const showPlaylist = playlist => {
    setSelectedPlaylist(playlist);
    setModalVisible(true);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.playlist}
      onPress={() => showPlaylist(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderMovieItem = ({item}) => (
    <View style={styles.movieItem}>
      <Image
        style={styles.poster}
        source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
      />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setNewPlaylist}
        value={newPlaylist}
        placeholder="New Playlist"
        placeholderTextColor="#000"
      />
      <TouchableOpacity style={styles.button} onPress={addPlaylist}>
        <Text style={styles.buttonText}>Add Playlist</Text>
      </TouchableOpacity>
      {playlists.length > 0 ? (
        <FlatList
          data={playlists}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <NoPlaylists />
      )}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedPlaylist && (
            <>
              <Text style={styles.modalTitle}>{selectedPlaylist.name}</Text>
              <FlatList
                data={selectedPlaylist.movies}
                renderItem={renderMovieItem}
                keyExtractor={(item, index) => index.toString()}
              />
              {selectedMovie && (
                <TouchableOpacity
                  style={styles.movie}
                  onPress={() => addMovieToPlaylist(selectedPlaylist)}>
                  <Text>Add Selected Movie to Playlist</Text>
                </TouchableOpacity>
              )}
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </>
          )}
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
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 12,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  playlist: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 40, // added top padding
    padding: 16,
    backgroundColor: '#D3D3D3',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold', // added bold font weight
    backgroundColor: '#007BFF', // added background color
    color: '#FFFFFF', // added font color
    padding: 8, // added padding
    borderRadius: 4, // added border radius
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
  },
  movie: {
    fontSize: 18,
    marginBottom: 12,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  errorMsg: {
    color: 'red',
    marginBottom: 12,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 12,
  },
  movieTitle: {
    fontSize: 18,
  },
});

export default PlaylistScreen;
