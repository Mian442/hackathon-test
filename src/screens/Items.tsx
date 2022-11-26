import { StyleSheet, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ItemsScreenProps } from '../Types/Navigation';
import ItemSections from '../components/ItemSection';

const Items = () => {
  const { params } = useRoute<ItemsScreenProps>();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: params.name });
  }, [params.name]);
  return (
    <View style={styles.container}>
      <ItemSections id={params.id} name={params.name} />
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
