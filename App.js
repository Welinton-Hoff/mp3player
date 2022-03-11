import RNFS from 'react-native-fs';
import React, {useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const trackPlayerInit = async () => {
  await TrackPlayer.setupPlayer();

  await TrackPlayer.add({
    id: '2',
    album: 'Chosic',
    artist: 'desconhecido',
    title: 'Raindrops on window sill',
    url: `${RNFS.DocumentDirectoryPath}/test.mp3`,
    artwork: 'https://picsum.photos/id/10/200/300',
  });

  return true;
};

export default function mp3player() {
  const [hasMp3, setMp3] = useState(false);
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);

  function playerMp3() {
    if (hasMp3) {
      return TrackPlayer.play();
    }

    return console.log('Por favor, efetue o download do mp3!');
  }

  function download() {
    const options = {
      fromUrl:
        'https://ve49.aadika.xyz/download/Z5bqNO0805M/mp3/320/1643076339/8f3c4bbd4fda236a1a3cdfd37097c03b8dd6ac8be943d96ecfef437f9de07ad4/1?f=y2meta.com',
      toFile: `${RNFS.DocumentDirectoryPath}/test.mp3`,
    };

    RNFS.downloadFile(options)
      .promise.then(res => console.log('downloadFile ==> ', res))
      .catch(err => console.log('downloadFile Error ==> ', err.message));
  }

  function readFile() {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(res => {
        setMp3(true);
        console.log('readDir ==> ', res);
      })
      .catch(err => {
        setMp3(false);
        console.log('readDir Error ==> ', err.message);
      });
  }

  useEffect(() => {
    readFile();

    const startPlayer = async () => {
      let isInit = await trackPlayerInit();
      console.log('isInit ==> ', isInit);

      setIsTrackPlayerInit(isInit);
    };

    startPlayer();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dowloadButton} onPress={download}>
        <Text style={styles.textColor}>Donwload!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={playerMp3}
        style={styles.playButton}
        disabled={!isTrackPlayerInit}>
        <Text style={styles.textColor}>Play me!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.readDirButton} onPress={readFile}>
        <Text style={styles.textColor}>Read Dir!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dowloadButton: {
    width: 150,
    height: 54,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1897EE',
  },
  playButton: {
    width: 150,
    height: 54,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#03A185',
  },
  readDirButton: {
    width: 150,
    height: 54,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FE9213',
  },
  textColor: {
    color: '#fff',
  },
});
