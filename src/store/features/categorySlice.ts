import { createSlice } from '@reduxjs/toolkit';
import { IInputField } from '../../Interface/ManageCategory';
import { CategoryState } from '../../Types/ManageCategory';

const initialState: CategoryState = {
  category: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, { payload }) => {
      state.category.push(payload);
      return state;
    },
    deleteCategory: (state, { payload }) => {
      state.category = state.category.filter((item) => item.id !== payload);
      return state;
    },
    updateInputFieldsValue: (state, { payload }) => {
      state.category[payload.index].inputFields = payload.data;
      return state;
    },
    addInputFields: (state, { payload }) => {
      state.category[payload.index].inputFields.push(payload.data);
      return state;
    },
    deleteInputFields: (state, { payload }) => {
      state.category[payload.index].inputFields = state.category[
        payload.index
      ].inputFields.filter((item: IInputField) => item.id !== payload.inputId);
      return state;
    },
    updateSelectedTitle: (state, { payload }) => {
      state.category[payload.index].titleSelected = payload.data;
      return state;
    },
    updateCategoryName: (state, { payload }) => {
      state.category[payload.index].name = payload.data;
      return state;
    },
    resetCategory: (state) => {
      state.category = [];
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCategory,
  deleteCategory,
  resetCategory,
  updateInputFieldsValue,
  addInputFields,
  deleteInputFields,
  updateSelectedTitle,
  updateCategoryName,
} = categorySlice.actions;

export default categorySlice.reducer;
