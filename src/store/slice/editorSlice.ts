import { createSlice } from '@reduxjs/toolkit';
import { editorState } from 'src/mocks/data/editorState';

const initialState = { ...editorState };

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
      state.startDay = initialState.startDay;
      state.endDay = initialState.endDay;
      state.useEndDay = false;
      state.repeatDayOfWeek = [];
      state.task = { ...initialState.task };
    },

    updateEditorTaskWorks(state, action) {
      state.task.works = action.payload.text;
    },

    updateEditorTaskStartDay(state, action) {
      state.startDay = action.payload;
    },

    updateEditorTaskCycle(state, action) {
      state.repeatCycle = action.payload;
    },

    updateEditorEndDay(state, action) {
      state.endDay = action.payload;
    },

    toggleEditorUseEndDay(state) {
      const newState = !state.useEndDay;
      state.useEndDay = newState;
    },

    toggleEditorRepeatDayOfWeek(state, action) {
      const newState = [...state.repeatDayOfWeek];
      const newDayOfWeek = action.payload;

      if (newState.includes(newDayOfWeek)) {
        const index = newState.findIndex((dayOfWeek) => dayOfWeek === newDayOfWeek);
        newState.splice(index, 1);
        state.repeatDayOfWeek = [...newState];
        return;
      }

      state.repeatDayOfWeek = [...newState, newDayOfWeek];
    },
  },
});

export const {
  toggleEditor,
  resetEditorTask,
  updateEditorTaskWorks,
  updateEditorTaskStartDay,
  updateEditorTaskCycle,
  updateEditorEndDay,
  toggleEditorUseEndDay,
  toggleEditorRepeatDayOfWeek,
} = editorSlice.actions;
export default editorSlice.reducer;
