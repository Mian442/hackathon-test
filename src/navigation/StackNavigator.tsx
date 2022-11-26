import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';
import ManageCategory from '../screens/ManageCategory';
import Items from '../screens/Items';
import DashBoard from '../screens/DashBoard';
import { RootNavigationProp, RootStackParamList } from '../Types/Navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = ({ navigation }: { navigation: RootNavigationProp }) => {
  const headerLeft = (props: any) => {
    return (
      <Pressable onPress={() => navigation.openDrawer()}>
        <Ionicons name='menu' color={props.tintColor} size={28} />
      </Pressable>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft,
      }}
    >
      <Stack.Screen name='Dashboard' component={DashBoard} />
      <Stack.Screen name='Manage Category' component={ManageCategory} />
      <Stack.Screen name='Items' component={Items} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
