import * as React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { ICustomButton } from '../../Interface/FormComponents';

const Button: React.FC<ICustomButton> = ({
  title,
  onPress,
  style,
  color = Colors.PRIMARY,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { backgroundColor: color }, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 6,
    marginVertical: 8,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Button;
