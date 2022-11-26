/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import DrawerContent from '../components/Drawer';
import StackNavigator from './StackNavigator';

const Navigation = () => {
  return <DrawerNavigator />;
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Root'
      defaultStatus='closed'
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name='Root' component={StackNavigator} />
    </Drawer.Navigator>
  );
};
export default Navigation;
