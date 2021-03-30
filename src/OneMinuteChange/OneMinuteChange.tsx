import React from 'react';
import { Timer } from './Timer';
import { View } from 'react-native';
import { Styles } from '../Styles/Styles';
import { Separator } from '../Utils/Separator';
import { Orientation, useScreenContext } from '../Contexts/ScreenContext';
import { VerticalSeparator } from '../Utils/VerticalSeparator';
import { Records } from './Records/Records';

export const OneMinuteChange = () => {
  const { orientation } = useScreenContext();
  const isPortrait = orientation == Orientation.portrait;
  return (
    <View style={isPortrait ? Styles.container : Styles.landscapeContainer}>
      <Timer />
      {isPortrait ? <Separator /> : <VerticalSeparator />}
      <Records />
    </View>
  );
};
