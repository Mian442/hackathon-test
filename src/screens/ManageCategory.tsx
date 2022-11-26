import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { v4 as uuidv4 } from 'uuid';
import { addCategory, deleteCategory } from '../store/features/categorySlice';
import { ICategory } from '../Interface/ManageCategory';
import Category from '../components/Card/Category';
import Button from '../components/Common/CustomButton';
import EmptyList from '../components/Common/EmptyList';

import { useCallback } from 'react';
import { deleteAllCategoryItem } from '../store/features/itemsSlice';

const ManageCategory = () => {
  const { category } = useSelector((state: RootState) => state.category);
  const { items } = useSelector((state: RootState) => state.items);
  const { isLandscape } = useSelector((state: RootState) => state.layout);

  const dispatch = useDispatch();

  const addNewCategory = () => {
    const data: ICategory = {
      id: uuidv4(),
      name: 'New Category',
      inputFields: [{ type: 'Text', value: '', id: uuidv4() }],
      titleSelected: 0,
    };
    dispatch(addCategory(data));
  };

  const onRemoveCategory = (id: string) => {
    let temp = { ...items };
    delete temp[id];
    dispatch(deleteAllCategoryItem(temp));
    dispatch(deleteCategory(id));
  };

  const RenderCategoryItem: ListRenderItem<ICategory> = useCallback(
    ({ item, index }) => {
      return (
        <Category
          index={index}
          data={item}
          removeCategory={() => onRemoveCategory(item.id)}
        />
      );
    },
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={isLandscape === 2 ? 'LANDSCAPE' : 'PORTRAITS'}
        data={category}
        numColumns={isLandscape}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        keyExtractor={(item: ICategory) => item.id}
        renderItem={RenderCategoryItem}
        ListEmptyComponent={<EmptyList title='Category' />}
      />
      <Button title='Add New Category' onPress={addNewCategory} />
    </View>
  );
};

export default ManageCategory;

const styles = StyleSheet.create({
  container: {
    flex: 0.98,
    margin: 10,
  },
  contentContainer: {
    flexDirection: 'column',
  },
});
