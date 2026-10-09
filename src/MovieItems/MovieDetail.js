import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const MovieDetail = ({selectedMovie, playlists, addToPlaylist}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    if (selectedPlaylist) {
      addToPlaylist(selectedPlaylist);
      setSelectedPlaylist(null);
    }
  }, [selectedPlaylist, addToPlaylist]);

  return selectedMovie ? (
    <>
      <Image
        style={styles.poster}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`,
        }}
      />
      <Text style={styles.movieTitle}>{selectedMovie.title}</Text>
      <Text style={styles.movieInfo}>{selectedMovie.overview}</Text>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Add to playlist:</Text>
        <RNPickerSelect
          style={styles.dropdown}
          value={selectedPlaylist}
          onValueChange={value => setSelectedPlaylist(value)}
          placeholder={{
            label: 'Select a playlist',
            value: null,
          }}
          items={
            playlists
              ? playlists.map(playlist => ({
                  label: playlist.name,
                  value: playlist,
                }))
              : []
          }
        />
      </View>
    </>
  ) : null;
};

const styles = StyleSheet.create({
  poster: {
    width: '100%',
    height: 300,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieInfo: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  dropdownContainer: {
    marginTop: 20,
  },
  dropdownLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdown: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#333',
  },
});

export default MovieDetail;
