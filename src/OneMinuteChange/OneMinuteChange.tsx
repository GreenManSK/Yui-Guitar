import React from 'react';
import { RecordList } from './RecordList';
import { Timer } from './Timer';
import { View } from 'react-native';
import { Styles } from '../Styles/Styles';
import { Separator } from '../Utils/Separator';
import { Orientation, useScreenContext } from '../Contexts/ScreenContext';
import { VerticalSeparator } from '../Utils/VerticalSeparator';

export const OneMinuteChange = () => {
  const { orientation } = useScreenContext();
  const isPortrait = orientation == Orientation.portrait;
  return (
    <View style={isPortrait ? Styles.container : Styles.landscapeContainer}>
      <Timer />
      {isPortrait ? <Separator /> : <VerticalSeparator />}
      <RecordList />
    </View>
  );
};
