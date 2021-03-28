import React from 'react';
import { RecordList } from './RecordList';
import { Timer } from './Timer';
import { View } from 'react-native';
import { Styles } from '../Styles/Styles';
import { Separator } from '../Utils/Separator';

export const OneMinuteChange = () => {
  return (
    <View style={Styles.container}>
      <Timer />
      <Separator />
      <RecordList />
    </View>
  );
};
