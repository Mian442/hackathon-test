import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, TextInput, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  addInputFields,
  deleteInputFields,
  updateCategoryName,
  updateInputFieldsValue,
  updateSelectedTitle,
} from '../../store/features/categorySlice';
import { AppDispatch, RootState } from '../../store/store';
import NewInputField from '../Common/NewInputField';
import Button from '../Common/CustomButton';
import { v4 as uuidv4 } from 'uuid';
import { ICardCategory } from '../../Interface/Card';
import { TInputFieldType } from '../../Types/ManageCategory';
import { IInputField } from '../../Interface/ManageCategory';
import Colors from '../../constants/Colors';

const types = ['Text', 'Checkbox', 'Date', 'Number'];

const Category: React.FC<ICardCategory> = ({ removeCategory, data, index }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<boolean>(false);
  const { isLandscape } = useSelector((state: RootState) => state.layout);

  const dispatch = useDispatch<AppDispatch>();

  const onAddInput = (item: TInputFieldType) => {
    const newlyAddedValue: IInputField = {
      type: item,
      value: '',
      id: uuidv4(),
    };
    dispatch(addInputFields({ index, data: newlyAddedValue }));
    setModal(false);
  };

  const onRemoveInput = (id: string) => {
    if (data.inputFields.length === 1) {
      dispatch(updateSelectedTitle({ index, data: -1 }));
    }
    dispatch(deleteInputFields({ index, inputId: id }));
  };

  const handleChange = (text: string, i: number) => {
    let inputData = [...data.inputFields];
    inputData[i] = { ...inputData[i], value: text };
    dispatch(updateInputFieldsValue({ index, data: inputData }));
  };

  const handleSetTitleField = (i: number) => {
    dispatch(updateSelectedTitle({ index, data: i }));
    setTitleModal(false);
  };

  const toggleFieldModal = () => setModal(!modal);
  const toggleTitleModal = () => setTitleModal(!titleModal);

  const handleChangeTitle = (text: string) => {
    dispatch(updateCategoryName({ index, data: text }));
  };

  return (
    <View style={[styles.container, { flex: 1 / isLandscape }]}>
      <Title style={styles.title}>{data.name}</Title>
      <View>
        <TextInput
          label='Category Name'
          mode='outlined'
          value={data.name}
          onChangeText={handleChangeTitle}
        />
      </View>

      {data.inputFields.map((data: IInputField, i: number) => {
        return (
          <NewInputField
            key={i}
            value={data.value}
            onChange={(text: string) => handleChange(text, i)}
            fieldType={data.type}
            handleRemove={() => onRemoveInput(data.id)}
            placeholder={data.type}
          />
        );
      })}
      <Menu
        visible={titleModal}
        onDismiss={toggleTitleModal}
        anchor={
          <Button
            title={`Title Field ${
              data.titleSelected === -1
                ? ':Unnamed Fields'
                : data.inputFields[data.titleSelected]?.value
                ? ':' + data.inputFields[data.titleSelected].value
                : ':' + 'Unnamed Fields'
            }`}
            onPress={toggleTitleModal}
            color={Colors.SECONDARY}
          />
        }
      >
        {data.inputFields.map((item: IInputField, i: number) => (
          <Menu.Item
            key={i}
            onPress={() => handleSetTitleField(i)}
            title={item.value ? item.value : 'Unnamed Fields ' + (i + 1)}
          />
        ))}
      </Menu>
      <View style={styles.btnGroup}>
        <Menu
          visible={modal}
          onDismiss={toggleFieldModal}
          anchor={<Button title={'Add New Field'} onPress={toggleFieldModal} />}
        >
          {types.map((item: TInputFieldType, i: number) => (
            <Menu.Item key={i} onPress={() => onAddInput(item)} title={item} />
          ))}
        </Menu>

        <Button
          title={'Remove Category'}
          onPress={removeCategory}
          color={Colors.DELETE}
        />
      </View>
    </View>
  );
};

export default Category;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },
  title: { fontSize: 22, marginVertical: 8 },
  contentContainer: {
    flexDirection: 'column',
    paddingBottom: '10%',
  },
  btnGroup: { flexDirection: 'row', justifyContent: 'space-evenly' },
});
