import {StyleSheet} from 'react-native';
import {Colors, font} from '../../themes';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
  },
  containerPrimary: {
    backgroundColor: Colors.accent,
  },
  containerPrimaryDisabled: {
    backgroundColor: Colors.accentDisabled,
  },
  containerSecondary: {
    backgroundColor: Colors.accent2,
  },
  containerSubtle: {},
  text: {
    margin: 15,
    textAlign: 'center',
  },
  textPrimary: {
    ...font(16, Colors.contentContrast),
  },
  textSecondary: {
    ...font(16, Colors.contentContrast),
  },
  textSubtle: {
    ...font(14, Colors.accent),
  },
});
