import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import categorySlice from './features/categorySlice';
import itemsSlice from './features/itemsSlice';
import layoutSlice from './features/layoutSlice';

const reducers: any = combineReducers({
  category: categorySlice,
  items: itemsSlice,
  layout: layoutSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['layout'],
};

const persistedReducers = persistReducer(persistConfig, reducers);

export const store: any = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
