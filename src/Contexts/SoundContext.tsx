import React from 'react';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio/Sound';

interface ISoundContext {
  playClick: () => void;
  playFinish: () => void;
}

const SoundContext = React.createContext<ISoundContext>({
  playClick: () => null,
  playFinish: () => null,
});

const playSound = async (sound: Sound | undefined) => {
  await sound?.setPositionAsync(0);
  await sound?.playAsync();
};

export const SoundContextProvider: React.FunctionComponent = ({ children }) => {
  const [clickSound, setClickSound] = React.useState<Sound>();
  const [finishSound, setFinishSound] = React.useState<Sound>();

  const clickSoundFile = React.useMemo(
    () => require('../../assets/click.mp3'),
    []
  );
  const finishSoundFile = React.useMemo(
    () => require('../../assets/finish.mp3'),
    []
  );

  React.useEffect(() => {
    const loadSounds = async () => {
      console.log('Loading sounds');
      await Audio.setIsEnabledAsync(true);

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        shouldDuckAndroid: false,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });

      const { sound } = await Audio.Sound.createAsync(clickSoundFile);
      const { sound: sound2 } = await Audio.Sound.createAsync(finishSoundFile);
      setClickSound(sound);
      setFinishSound(sound2);
    };
    loadSounds();
    return () => {
      console.log('Unloading sounds');
      clickSound?.unloadAsync();
      finishSound?.unloadAsync();
    };
  }, [clickSoundFile, finishSoundFile]);

  const values = React.useMemo(
    () => ({
      playClick: () => playSound(clickSound),
      playFinish: () => playSound(finishSound),
    }),
    [clickSound, finishSound]
  );
  return (
    <SoundContext.Provider value={values}>{children}</SoundContext.Provider>
  );
};

export const useSoundContext = () => React.useContext(SoundContext);
