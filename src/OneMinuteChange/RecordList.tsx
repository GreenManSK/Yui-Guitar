import React from 'react';
import {
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { DefaultFontSize, Styles } from '../Styles/Styles';
import { Colors } from '../Styles/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 2,
  },
  button: {
    flex: 1,
    height: '100%',
  },
  maximumText: {
    marginTop: DefaultFontSize,
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

const recordsKey = 'records';

export const RecordList = () => {
  const [records, setRecords] = React.useState<number[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    AsyncStorage.getItem(recordsKey).then((records) => {
      records && setRecords(JSON.parse(records));
    });
  }, [setRecords]);

  const addRecord = React.useCallback(() => {
    const parsedValue = parseInt(inputValue);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      const newRecords = [parsedValue, ...records];
      setRecords(newRecords);
      setInputValue('');
      AsyncStorage.setItem(recordsKey, JSON.stringify(newRecords));
    }
    Keyboard.dismiss();
  }, [inputValue, records]);

  const clearRecords = React.useCallback(() => {
    setRecords([]);
    AsyncStorage.setItem(recordsKey, JSON.stringify([]));
  }, []);

  const max = Math.max(...records, 0);

  return (
    <View style={Styles.container}>
      <View style={[Styles.inputLine, styles.form]}>
        <TextInput
          style={[Styles.textInput, styles.input]}
          allowFontScaling={true}
          keyboardAppearance="dark"
          keyboardType="number-pad"
          placeholder="0"
          placeholderTextColor={Colors.placeholderText}
          onChangeText={setInputValue}
          onSubmitEditing={addRecord}
          returnKeyType="done"
          value={inputValue}
        />
        <TouchableHighlight
          underlayColor={Colors.mainActive}
          style={[Styles.button, styles.button]}
          onPress={addRecord}
          onLongPress={clearRecords}
        >
          <Text style={Styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.maximumText}>
        <Text style={Styles.text}>
          <Text>Your maximum this session is </Text>
          <Text style={Styles.bold}>{max}</Text>
        </Text>
        <FlatList data={transformRecordsToData(records)} renderItem={Record} />
      </View>
    </View>
  );
};
