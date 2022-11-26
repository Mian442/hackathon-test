import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Checkbox, TextInput, Title } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import WbButton from '../Common/CustomButton';
import Colors from '../../constants/Colors';
import { IInputField } from '../../Interface/ManageCategory';
import { ICardItem } from '../../Interface/Card';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Item: React.FC<ICardItem> = ({
  data,
  title,
  inputs,
  onRemoveItem,
  onUpdateItem,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateInputKey, setDateInputKey] = useState('');
  const { isLandscape } = useSelector((state: RootState) => state.layout);

  const showDatePicker = (key: string) => {
    setDateInputKey(key);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onUpdateItem(date, dateInputKey);
    hideDatePicker();
  };

  return (
    <View
      style={[
        styles.itemViewContainer,
        {
          flex: 1 / isLandscape,
        },
      ]}
    >
      <Title>{title}</Title>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {inputs.map((item: IInputField) => {
        return (
          <View key={item.id}>
            {(item.type === 'Text' || item.type === 'Number') && (
              <TextInput
                value={data[item.value]}
                keyboardType={item.type === 'Number' ? 'number-pad' : 'default'}
                placeholder={item.value}
                mode={'outlined'}
                onChangeText={(text: string) => {
                  onUpdateItem(text, item.value);
                }}
              />
            )}
            {item.type === 'Date' && (
              <Pressable
                onPress={() => showDatePicker(item.value)}
                style={styles.dateView}
              >
                <Text style={{ fontSize: 16 }}>
                  {!data[item.value]
                    ? item.value
                    : moment(data[item.value]).format('L')}
                </Text>
              </Pressable>
            )}
            {item.type === 'Checkbox' && (
              <View style={styles.checkBox}>
                <Checkbox.Android
                  status={data[item.value] ? 'checked' : 'unchecked'}
                  onPress={() => {
                    onUpdateItem(!data[item.value], item.value);
                  }}
                />
                <View>
                  <Text>{item.value}</Text>
                </View>
              </View>
            )}
          </View>
        );
      })}
      <WbButton
        title='Remove Item'
        onPress={() => onRemoveItem(data.id)}
        color={Colors.DELETE}
      />
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  dateView: {
    backgroundColor: '#fffbfe',
    padding: 12,
    borderColor: '#79747e',
    borderWidth: 1,
    marginTop: 7,
    borderRadius: 4,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  itemViewContainer: {
    backgroundColor: 'white',
    padding: 8,
    margin: 8,
  },
});
