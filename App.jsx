import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/Screens/HomeScreen';
import PlaylistScreen from './src/Screens/PlaylistScreen';
import DiscoverScreen from './src/Screens/DiscoverScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
  const [playlists, setPlaylists] = useState([]);

  const handleAddToPlaylist = playlist => {
    setPlaylists(playlists => playlists.map(p =>
      p.id === playlist.id ? playlist : p,
    ));
  };

  const handleCreatePlaylist = playlist => {
    setPlaylists(playlists => [...playlists, playlist]);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Discover') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'MyMovieLists') {
              iconName = focused ? 'list' : 'list-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home">
          {props => <HomeScreen {...props} playlists={playlists} />}
        </Tab.Screen>
        <Tab.Screen name="Discover">
          {props => (
            <DiscoverScreen
              {...props}
              playlists={playlists}
              onAddToPlaylist={handleAddToPlaylist}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="MyMovieLists">
          {props => (
            <PlaylistScreen
              {...props}
              playlists={playlists}
              onCreatePlaylist={handleCreatePlaylist}
              onAddToPlaylist={handleAddToPlaylist}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
