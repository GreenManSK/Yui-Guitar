import { Styles } from '../../Styles/Styles';
import { View } from 'react-native';
import React from 'react';
import { RecordList } from './RecordList';
import { RecordInput } from './RecordInput';
import { useRecordsDataContext } from '../../Data/RecordsDataContext';
import { ChordSelector } from './ChordSelector';

export const Records = () => {
  const { getRecords, setRecords, getChords } = useRecordsDataContext();

  const [chordA, setChordA] = React.useState('');
  const [chordB, setChordB] = React.useState('');
  const [recordsList, setRecordsList] = React.useState<number[]>([]);
  const [chordList, setChordList] = React.useState<string[]>([]);

  React.useEffect(() => {
    getChords(setChordList);
  }, [getChords]);

  React.useEffect(() => {
    // TODO: remeber selected chords
    setChordA(chordList[0]);
    setChordB(chordList[1]);
  }, [chordList]);

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
      <ChordSelector
        chord={chordA}
        setChord={setChordA}
        chordList={chordList}
      />
      <ChordSelector
        chord={chordB}
        setChord={setChordB}
        chordList={chordList}
      />
      <View style={Styles.container}>
        <RecordInput addRecord={addRecord} clearRecords={clearRecords} />
        <RecordList records={recordsList} />
      </View>
    </View>
  );
};
