import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Items: { id: string; name: string };
  Dashboard: undefined;
  'Manage Category': undefined;
};

export type RootDrawerParamList = {
  Root: NavigatorScreenParams<RootStackParamList>;
};

export type RootNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  DrawerNavigationProp<RootDrawerParamList>
>;

export type RootDrawerNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  DrawerNavigationProp<RootDrawerParamList>
>;

export type RootDrawerScreenProp = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList>,
  DrawerScreenProps<RootDrawerParamList>
>;

export type ItemsScreenProps = RouteProp<RootStackParamList, 'Items'>;
export type ItemsNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Items'
>;

export type ManageCategoryNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Manage Category'
>;
