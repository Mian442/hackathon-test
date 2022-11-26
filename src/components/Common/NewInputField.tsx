import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { ICategoryNewInputField } from '../../Interface/FormComponents';
import Colors from '../../constants/Colors';

const NewInputField: React.FC<ICategoryNewInputField> = ({
  value,
  onChange,
  fieldType,
  handleRemove,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode='outlined'
        style={styles.textField}
        label='Field'
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
      />
      <View style={styles.textView}>
        <Text style={styles.text}>{fieldType.toUpperCase()}</Text>
      </View>
      <View style={styles.iconView}>
        <MaterialIcons
          name='delete'
          size={24}
          color={Colors.DELETE}
          onPress={handleRemove}
        />
      </View>
    </View>
  );
};
export default NewInputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  textField: { marginVertical: '1%', flex: 0.6 },
  textView: { flex: 0.4 },
  text: { textAlign: 'center', fontSize: 16, color: Colors.SECONDARY },
  iconView: { flex: 0.1 },
});
