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

export interface IChordEditorProps {
  chords: string[];
  save: (chords: string[]) => void;
}

export const ChordEditor = ({ chords, save }: IChordEditorProps) => {
  const [inputValue, setInputValue] = React.useState(chords.join(', '));
  React.useEffect(() => setInputValue(chords.join(', ')), [chords]);

  const saveCallback = React.useCallback(() => {
    const chords = inputValue.split(',').map((c) => c.trim());
    save(chords);
    Keyboard.dismiss();
  }, [inputValue, save]);

  return (
    <View style={[Styles.inputLine, styles.form]}>
      <TextInput
        style={[Styles.textInput, styles.input]}
        allowFontScaling={true}
        keyboardAppearance="dark"
        placeholderTextColor={Colors.placeholderText}
        onChangeText={setInputValue}
        onSubmitEditing={saveCallback}
        returnKeyType="done"
        value={inputValue}
      />
      <TouchableHighlight
        underlayColor={Colors.mainActive}
        style={[Styles.button, styles.button]}
        onPress={saveCallback}
      >
        <Text style={Styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
  );
};
