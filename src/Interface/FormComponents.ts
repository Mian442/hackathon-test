import { StyleProp, ViewStyle } from 'react-native';

export interface ICustomButton {
  title: string;
  onPress(): void;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

export interface IEmptyList {
  title: string;
}

export interface ICategoryNewInputField {
  value: string;
  onChange(text: string): void;
  fieldType: string;
  handleRemove(): void;
  placeholder?: string;
}
