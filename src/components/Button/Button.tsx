import React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import {styles} from './Button.style';

interface Props extends TouchableOpacityProps {
  type?: 'primary' | 'secondary' | 'subtle';
  text: string;
}

export default function Button({
  text,
  type = 'primary',
  style,
  ...props
}: Props): React.ReactElement {
  let containerStyle: ViewStyle;
  let textStyle: TextStyle;

  switch (type) {
    case 'primary':
      containerStyle = styles.containerPrimary;
      textStyle = styles.textPrimary;
      break;
    case 'secondary':
      containerStyle = styles.containerSecondary;
      textStyle = styles.textSecondary;
      break;
    case 'subtle':
      containerStyle = styles.containerSubtle;
      textStyle = styles.textSubtle;
      break;
  }

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={[
        style,
        styles.container,
        containerStyle,
        props.disabled && type !== 'subtle'
          ? styles.containerPrimaryDisabled
          : undefined,
      ]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}
