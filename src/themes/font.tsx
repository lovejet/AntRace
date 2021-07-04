import {TextStyle} from 'react-native';
import Color from './colors';

export function font(size: number, color: string = Color.content): TextStyle {
  return {
    fontSize: size,
    color,
  };
}
