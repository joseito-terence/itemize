import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { SkImage } from '@shopify/react-native-skia';
import { Appearance } from 'react-native';

type TThemeState = {
  isDark: boolean;
  active: boolean;
  overlay1: null | SkImage;
  overlay2: null | SkImage;
};

const initialState: TThemeState = {
  isDark: Appearance.getColorScheme() === 'dark',
  active: false,
  overlay1: null,
  overlay2: null,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    toggleTheme: state => {
      state.isDark = !state.isDark;
    },
    setTransitionState: (
      state,
      action: PayloadAction<Omit<TThemeState, 'isDark'>>,
    ) => {
      state.active = action.payload.active;
      state.overlay1 = action.payload.overlay1;
      state.overlay2 = action.payload.overlay2;
    },
  },
});

export const { setActive, toggleTheme, setTransitionState } =
  themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
