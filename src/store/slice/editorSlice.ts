import { createSlice } from '@reduxjs/toolkit';
import { editorState } from 'src/mocks/data/editorState';

const initialState = editorState;

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    toggleEditor(state) {
      if (state.firstEdit) {
        state.firstEdit = false;
      }

      const newState = !state.editing;
      state.editing = newState;
    },

    resetEditorTask(state) {
      state.repeatCycle = 'single';
      state.task = { ...initialState.task };
    },

    updateEditorTaskWorks(state, action) {
      state.task.works = action.payload.text;
    },
  },
});

export const { toggleEditor, resetEditorTask, updateEditorTaskWorks } = editorSlice.actions;
export default editorSlice.reducer;