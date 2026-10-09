import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const NoPlaylists = () => (
  <View style={styles.noPlaylistsContainer}>
    <Text style={styles.noPlaylistsText}>
      You don't have any playlists yet.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  noPlaylistsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPlaylistsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NoPlaylists;
