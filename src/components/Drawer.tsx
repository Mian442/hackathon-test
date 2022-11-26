import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { ICategory } from '../Interface/ManageCategory';
import { RootState } from '../store/store';

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { category } = useSelector((state: RootState) => state.category);
  return (
    <DrawerContentScrollView
      contentContainerStyle={{ flex: 1 }}
      {...props}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.drawerContent}>
        <TouchableOpacity
          style={{ paddingVertical: '5%' }}
          onPress={() => {
            props.navigation.navigate('Dashboard');
          }}
        >
          <Text>Dashboard</Text>
        </TouchableOpacity>
        {category.map((item: ICategory, i: number) => {
          return (
            <TouchableOpacity
              key={i}
              style={{ paddingVertical: '5%' }}
              onPress={() => {
                props.navigation.navigate('Items', {
                  name: item.name,
                  id: item.id,
                });
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={{ paddingVertical: '5%' }}
          onPress={() => {
            props.navigation.navigate('Manage Category');
          }}
        >
          <Text>Manage Category</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    margin: 12,
  },
});
