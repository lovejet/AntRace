import {TextStyle} from 'react-native';
import {Colors, font} from '../../themes';

export const inputStyle: TextStyle = {
  height: 48,
  borderRadius: 4,
  paddingLeft: 12,
  paddingRight: 12,
  backgroundColor: Colors.inputBackground,
  borderColor: Colors.grey,
  borderWidth: 1,
  ...font(18, Colors.inputContent),
};

export const invalidStyle: TextStyle = {
  borderColor: 'red',
  borderWidth: 1,
};
