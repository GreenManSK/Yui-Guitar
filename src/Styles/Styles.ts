import { StyleSheet } from 'react-native';
import { Colors } from './Colors';
import { RFValue } from 'react-native-responsive-fontsize';

export const DefaultFontSize = RFValue(20);

export const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  text: {
    color: Colors.text,
    fontSize: DefaultFontSize,
  },
  bold: {
    fontWeight: 'bold',
  },
  inputLine: {
    backgroundColor: Colors.inputBackground,
    height: RFValue(40),
    marginTop: RFValue(20),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.main,
  },
  textInput: {
    color: Colors.text,
    fontSize: DefaultFontSize,
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.text,
    fontSize: DefaultFontSize,
  },
});
