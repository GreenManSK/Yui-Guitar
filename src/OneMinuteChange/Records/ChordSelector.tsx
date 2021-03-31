import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Styles } from '../../Styles/Styles';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../Styles/Colors';

export interface IChordSelectorProps {
  chord: string;
  chordList: string[];
  setChord: (value: string) => void;
  openChordEdit: () => void;
}

type ChordData = {
  id: string;
  selected: boolean;
  setChord: (value: string) => void;
  openChordEdit: () => void;
};

const transformFromChordsToData = (
  selectedChord: string,
  chordList: string[],
  setChord: (value: string) => void,
  openChordEdit: () => void
): ChordData[] =>
  chordList.map((chord) => ({
    id: chord,
    selected: chord == selectedChord,
    setChord,
    openChordEdit,
  }));

const Chord = ({ item: chord }: ListRenderItemInfo<ChordData>) => (
  <TouchableHighlight
    underlayColor={Colors.mainActive}
    style={[
      Styles.selectButton,
      ...(chord.selected ? [Styles.selectButtonActive] : []),
    ]}
    onPress={() => chord.setChord(chord.id)}
    onLongPress={chord.openChordEdit}
  >
    <Text style={Styles.text}>{chord.id}</Text>
  </TouchableHighlight>
);

export const ChordSelector = ({
  chord,
  chordList,
  setChord,
  openChordEdit,
}: IChordSelectorProps) => {
  return (
    <View>
      <FlatList
        style={Styles.inputLine}
        data={transformFromChordsToData(
          chord,
          chordList,
          setChord,
          openChordEdit
        )}
        renderItem={Chord}
        horizontal={true}
        fadingEdgeLength={RFValue(50)}
      />
    </View>
  );
};
