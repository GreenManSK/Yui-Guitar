import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DefaultFontSize, Styles } from '../../Styles/Styles';

export interface IRecordListProps {
  records: number[];
}

const styles = StyleSheet.create({
  maximumText: {
    alignItems: 'center',
  },
});

type RecordData = {
  id: string;
  value: number;
};

export const transformRecordsToData = (records: number[]): RecordData[] =>
  records.map((value, id) => ({
    id: `${id}`,
    value,
  }));

const Record = (item: ListRenderItemInfo<RecordData>) => (
  <Text style={Styles.text}>{item.item.value}</Text>
);

export const RecordList = ({ records }: IRecordListProps) => {
  const max = Math.max(...records, 0);
  return (
    <View style={styles.maximumText}>
      <Text style={Styles.text}>
        <Text>Your maximum this session is </Text>
        <Text style={Styles.bold}>{max}</Text>
      </Text>
      <FlatList data={transformRecordsToData(records)} renderItem={Record} />
    </View>
  );
};
