import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY } from '../../constants/API';

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    value: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      localStorage.setItem(LOCAL_STORAGE_KEY.darkmode, `${!state.value}`);
      state.value = !state.value;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;