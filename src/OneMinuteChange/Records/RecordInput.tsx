import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { Colors } from '../../Styles/Colors';
import { Styles } from '../../Styles/Styles';

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
});

export interface IRecordInputProps {
  addRecord: (value: number) => void;
  clearRecords: () => void;
}

export const RecordInput = ({ addRecord, clearRecords }: IRecordInputProps) => {
  const [inputValue, setInputValue] = React.useState('');

  const addRecordCallback = React.useCallback(() => {
    const parsedValue = parseInt(inputValue);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      addRecord(parsedValue);
      setInputValue('');
    }
    Keyboard.dismiss();
  }, [inputValue, addRecord]);

  return (
    <View style={[Styles.inputLine, styles.form]}>
      <TextInput
        style={[Styles.textInput, styles.input]}
        allowFontScaling={true}
        keyboardAppearance="dark"
        keyboardType="number-pad"
        placeholder="0"
        placeholderTextColor={Colors.placeholderText}
        onChangeText={setInputValue}
        onSubmitEditing={addRecordCallback}
        returnKeyType="done"
        value={inputValue}
      />
      <TouchableHighlight
        underlayColor={Colors.mainActive}
        style={[Styles.button, styles.button]}
        onPress={addRecordCallback}
        onLongPress={clearRecords}
      >
        <Text style={Styles.buttonText}>Add</Text>
      </TouchableHighlight>
    </View>
  );
};
