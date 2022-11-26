import { ListRenderItem, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import Button from '../../components/Common/CustomButton';
import {
  addItem,
  deleteItem,
  updateItem,
} from '../../store/features/itemsSlice';
import { v4 as uuidv4 } from 'uuid';
import Item from '../../components/Card/Item';
import { ICategory, IInputField } from '../../Interface/ManageCategory';
import { IItem } from '../../Interface/Items';
import { FlatList } from 'react-native-gesture-handler';
import EmptyList from '../../components/Common/EmptyList';
import moment from 'moment';
import { ICardItemSection } from '../../Interface/Card';
import { TRenderTitle, TUpdateItem } from '../../Types/Item';

const ItemSections: React.FC<ICardItemSection> = ({ id, name }) => {
  const { category } = useSelector((state: RootState) => state.category);
  const { items } = useSelector((state: RootState) => state.items);
  const { isLandscape } = useSelector((state: RootState) => state.layout);
  const dispatch = useDispatch<AppDispatch>();

  const selectedCategory: ICategory = useCallback(
    category.find((item: ICategory) => item.id === id),
    [category, id]
  );

  const handleAddItem = () => {
    const temp: any = {};
    selectedCategory.inputFields.forEach((el: IInputField) => {
      temp[el.value] =
        el.type === 'Checkbox' ? false : el.type === 'Date' ? new Date() : '';
    });
    const data: IItem = {
      id: uuidv4(),
      parentCategoryId: selectedCategory.id,
      ...temp,
    };
    dispatch(addItem({ category: selectedCategory.id, data }));
  };

  const onRemoveItem = (id: string) => {
    dispatch(deleteItem({ category: selectedCategory.id, id }));
  };

  const onUpdateItem: TUpdateItem = (index, field, data) => {
    const d = [...items[selectedCategory.id]];
    d[index] = { ...d[index], [field]: data };
    dispatch(updateItem({ category: selectedCategory.id, data: d }));
  };

  const _renderTitle: TRenderTitle = useCallback((type, value, item) => {
    if (item[value] === '') {
      return 'Unnamed Field';
    }
    switch (type) {
      case 'Date':
        return moment(item[value]).format('L');
      case 'Checkbox':
        return `${value} ${item[value] ? 'Yes' : 'No'}`;
      default:
        return item[value];
    }
  }, []);

  const _renderItem: ListRenderItem<IItem> = useCallback(
    ({ item, index }) => {
      const value =
        selectedCategory.inputFields[selectedCategory.titleSelected].value;
      const type =
        selectedCategory.inputFields[selectedCategory.titleSelected].type;
      return (
        <React.Fragment>
          <Item
            title={_renderTitle(type, value, item)}
            inputs={selectedCategory.inputFields}
            data={item}
            onRemoveItem={onRemoveItem}
            onUpdateItem={(data, field) => onUpdateItem(index, field, data)}
          />
        </React.Fragment>
      );
    },
    [items[id], category]
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.headerTextView}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <Button
          style={styles.newItemBtn}
          title='Add New Item'
          onPress={handleAddItem}
        />
      </View>
      <FlatList
        data={items[id]}
        key={isLandscape === 2 ? 'LANDSCAPE' : 'PORTRAITS'}
        keyExtractor={(item: IItem) => item.id}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        numColumns={isLandscape}
        ListEmptyComponent={<EmptyList title='List' />}
      />
    </View>
  );
};

export default ItemSections;

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerView: { flexDirection: 'row' },
  headerTextView: { flex: 1 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  newItemBtn: {
    height: 35,
  },
});
