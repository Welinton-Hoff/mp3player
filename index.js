import App from './App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() =>
  require('./src/services/TrackPlayerService'),
);
