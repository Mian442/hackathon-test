import { ILayout } from './../../Interface/Layout';
import { createSlice } from '@reduxjs/toolkit';
import { Dimensions } from 'react-native';

const initialState: ILayout = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  isLandscape:
    Dimensions.get('window').width > Dimensions.get('window').height ||
    Dimensions.get('window').width > 768
      ? 2
      : 1,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    updateLayout: (state, { payload }) => {
      return payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLayout } = layoutSlice.actions;

export default layoutSlice.reducer;
