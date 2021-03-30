import { Styles } from '../../Styles/Styles';
import { View } from 'react-native';
import React from 'react';
import { RecordList } from './RecordList';
import { RecordInput } from './RecordInput';
import { useRecordsDataContext } from '../../Data/RecordsDataContext';

export const Records = () => {
  const chordA = 'E';
  const chordB = 'A';

  const { getRecords, setRecords } = useRecordsDataContext();

  const [recordsList, setRecordsList] = React.useState<number[]>([]);

  React.useEffect(() => {
    getRecords(chordA, chordB, setRecordsList);
  }, [chordA, chordB, getRecords]);
  
  const addRecord = React.useCallback(
    (value: number) => {
      const newRecords = [value, ...recordsList];
      setRecordsList(newRecords);
      setRecords(chordA, chordB, newRecords);
    },
    [recordsList, setRecords, chordA, chordB]
  );

  const clearRecords = React.useCallback(() => {
    setRecordsList([]);
    setRecords(chordA, chordB, []);
  }, [setRecords, chordA, chordB]);

  return (
    <View style={Styles.container}>
      <RecordInput addRecord={addRecord} clearRecords={clearRecords} />
      <RecordList records={recordsList} />
    </View>
  );
};
