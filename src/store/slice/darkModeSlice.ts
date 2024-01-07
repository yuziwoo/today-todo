import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY } from '../../constants/API';

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    value: false,
  },
  reducers: {
    toggleDarkMode(state) {
      const newState = !state.value;

      localStorage.setItem(LOCAL_STORAGE_KEY.darkmode, `${newState}`);
      state.value = newState;
    },

    setDarkMode(state) {
      switch (localStorage.getItem(LOCAL_STORAGE_KEY.darkmode)) {
        case 'true': {
          state.value = true;
          break;
        }
        case 'false': {
          state.value = false;
          break;
        }
        default: {
          state.value = false;
          localStorage.setItem(LOCAL_STORAGE_KEY.darkmode, 'false');
        }
      }
    },
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
