import React from 'react';
import { RecordList } from './RecordList';
import { Timer } from './Timer';
import { View } from 'react-native';
import { Styles } from '../Styles/Styles';
import { Separator } from '../Utils/Separator';
import { Orientation, useScreenContext } from '../Contexts/ScreenContext';
import { VerticalSeparator } from '../Utils/VerticalSeparator';

const OneMinuteChangePortrait = () => (
  <View style={Styles.container}>
    <Timer />
    <Separator />
    <RecordList />
  </View>
);

const OneMinuteChangeLandscape = () => (
  <View style={Styles.landscapeContainer}>
    <Timer />
    <VerticalSeparator />
    <RecordList />
  </View>
);

export const OneMinuteChange = () => {
  const { orientation } = useScreenContext();
  return orientation == Orientation.portrait ? (
    <OneMinuteChangePortrait />
  ) : (
    <OneMinuteChangeLandscape />
  );
};
