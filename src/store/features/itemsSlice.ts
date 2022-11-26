import { createSlice } from '@reduxjs/toolkit';
import { IItem } from '../../Interface/Items';
import { ItemState } from '../../Types/Item';

const initialState: ItemState = {
  items: {},
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, { payload }) => {
      if (!state.items[payload.category]) {
        state.items[payload.category] = [payload.data];
      } else state.items[payload.category].push(payload.data);
    },
    deleteItem: (state, { payload }) => {
      state.items[payload.category] = state.items[payload.category].filter(
        (item: IItem) => item.id !== payload.id
      );
    },
    deleteAllCategoryItem: (state, { payload }) => {
      state.items = payload;
    },
    updateItem: (state, { payload }) => {
      state.items[payload.category] = payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, deleteItem, updateItem, deleteAllCategoryItem } =
  itemsSlice.actions;

export default itemsSlice.reducer;
