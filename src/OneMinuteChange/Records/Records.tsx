import { Styles } from '../../Styles/Styles';
import { View } from 'react-native';
import React from 'react';
import { RecordList } from './RecordList';
import { RecordInput } from './RecordInput';
import { useRecordsDataContext } from '../../Data/RecordsDataContext';
import { ChordSelector } from './ChordSelector';
import { ChordEditor } from './ChordEditor';

export const Records = () => {
  const {
    getRecords,
    setRecords,
    getChords,
    setChords,
  } = useRecordsDataContext();

  const [chordA, setChordA] = React.useState('');
  const [chordB, setChordB] = React.useState('');
  const [recordsList, setRecordsList] = React.useState<number[]>([]);
  const [chordList, setChordList] = React.useState<string[]>([]);
  const [showChordEdit, setShowChordEdit] = React.useState(false);

  React.useEffect(() => {
    getChords(setChordList);
  }, [getChords]);

  React.useEffect(() => {
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

  const updateChords = React.useCallback(
    (chords: string[]) => {
      setChords(chords);
      setChordList(chords);
      setShowChordEdit(false);
    },
    [setChords]
  );

  const openChordEdit = React.useCallback(() => setShowChordEdit(true), []);

  return (
    <View style={Styles.container}>
      {showChordEdit && <ChordEditor chords={chordList} save={updateChords} />}
      <ChordSelector
        chord={chordA}
        setChord={setChordA}
        chordList={chordList}
        openChordEdit={openChordEdit}
      />
      <ChordSelector
        chord={chordB}
        setChord={setChordB}
        chordList={chordList}
        openChordEdit={openChordEdit}
      />
      <View style={Styles.container}>
        <RecordInput addRecord={addRecord} clearRecords={clearRecords} />
        <RecordList records={recordsList} />
      </View>
    </View>
  );
};
