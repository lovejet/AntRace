import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

import {Colors} from '../../themes';

import {inputStyle, invalidStyle} from './Input.style';

interface InputProps extends TextInputProps {
  valid?: boolean;
}

export default function Input({
  style,
  valid = true,
  ...props
}: InputProps): React.ReactElement {
  return (
    <TextInput
      style={[style, inputStyle, !valid ? invalidStyle : null]}
      {...props}
      placeholderTextColor={Colors.inputPlaceholder}
    />
  );
}
