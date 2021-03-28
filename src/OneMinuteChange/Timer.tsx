import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Colors } from '../Styles/Colors';
import { Styles } from '../Styles/Styles';
import { RFValue } from 'react-native-responsive-fontsize';
import Slider from '@react-native-community/slider';
import { useSoundContext } from '../Contexts/SoundContext';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  countdown: {
    backgroundColor: Colors.background,
    color: Colors.text,
    position: 'absolute',
    bottom: '20%',
    width: '100%',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: RFValue(40),
    fontWeight: 'bold',
    paddingVertical: RFValue(5),
  },
  coutdownGreen: {
    color: Colors.green,
  },
  coutdownBlue: {
    color: Colors.blue,
  },
  coutdownRed: {
    color: Colors.red,
  },
  form: {},
});

const getCountdownColor = (value: number, sessionLength: number) => {
  if (value <= sessionLength / 4) return [styles.coutdownRed];
  if (value <= sessionLength / 2) return [styles.coutdownBlue];
  if (value <= sessionLength) return [styles.coutdownGreen];

  return [];
};

const sessionLength = 4;
const defaultWait = 3;
const waitBounds = { min: 1, max: 10 };

export const Timer = () => {
  const { playClick, playFinish } = useSoundContext();
  const [countdown, setCountdown] = React.useState(0);
  const [waitInSec, setWaitInSec] = React.useState(defaultWait);
  const [timer, setTimer] = React.useState<NodeJS.Timeout>();

  const toggleTimer = React.useCallback(() => {
    if (timer) {
      clearInterval(timer);
      setTimer(undefined);
    } else {
      setCountdown(sessionLength + waitInSec);
      const interval = setInterval(() => {
        setCountdown((v) => v - 1);
      }, 1000);
      setTimer(interval);
    }
  }, [timer, waitInSec]);

  React.useEffect(() => () => timer && clearInterval(timer), [timer]);

  if (timer) {
    if (
      countdown === sessionLength ||
      countdown === Math.round(sessionLength / 2)
    ) {
      playClick();
    }
    if (countdown === 0) {
      playFinish();
      clearInterval(timer);
      setTimer(undefined);
    }
  }

  const TanTanImage = React.useMemo(
    () => require('../../assets/tan_tan.gif'),
    []
  );

  return (
    <>
      {timer && (
        <View style={Styles.container}>
          <ImageBackground style={styles.image} source={TanTanImage}>
            <View style={styles.countdown}>
              <Text
                style={[
                  Styles.text,
                  styles.countdownText,
                  ...getCountdownColor(countdown, sessionLength),
                ]}
              >
                {countdown}
              </Text>
            </View>
          </ImageBackground>
        </View>
      )}
      {!timer && (
        <View style={styles.form}>
          <Text style={[Styles.text, Styles.textCenter]}>
            {waitInSec} delay
          </Text>
          <Slider
            style={Styles.slider}
            minimumValue={waitBounds.min}
            maximumValue={waitBounds.max}
            minimumTrackTintColor={Colors.mainActive}
            maximumTrackTintColor={Colors.text}
            thumbTintColor={Colors.main}
            step={1}
            value={waitInSec}
            onValueChange={setWaitInSec}
          />
          <TouchableHighlight
            underlayColor={Colors.mainActive}
            style={Styles.button}
            onPress={toggleTimer}
          >
            <Text style={Styles.buttonText}>{timer ? 'Stop' : 'Start'}</Text>
          </TouchableHighlight>
        </View>
      )}
    </>
  );
};
