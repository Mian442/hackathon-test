import { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import EmptyList from '../components/Common/EmptyList';
import ItemSections from '../components/ItemSection';
import { ICategory } from '../Interface/ManageCategory';
import { RootState } from '../store/store';

export default function DashBoard() {
  const { category } = useSelector((state: RootState) => state.category);
  const _renderItem: ListRenderItem<ICategory> = useCallback(({ item }) => {
    return <ItemSections id={item.id} name={item.name} />;
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={category}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: ICategory) => item.id}
        renderItem={_renderItem}
        ListEmptyComponent={<EmptyList title='Data' />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
