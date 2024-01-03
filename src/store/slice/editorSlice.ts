import { createSlice } from '@reduxjs/toolkit';
import { getEditorDataWithTask } from 'src/api/editorAPI/getEditorDataWithTask';
import { initialEditorState } from 'src/mocks/data/editorState';
import { getNextDayNumber } from 'src/utills/calendarUtils';

const initialState = { ...initialEditorState };

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    toggleEditor(state) {
      if (state.firstEdit) state.firstEdit = false;

      const newState = !state.editing;
      state.editing = newState;
    },

    triggerEditorWithTask(state, action) {
      const { task, cycle } = action.payload;
      const editorData = getEditorDataWithTask({ task, cycle });

      const newState = { ...state, firstEdit: false, editing: true, ...editorData };
      return newState;
    },

    triggerEditorWithDateNumber(state, action) {
      if (state.firstEdit) state.firstEdit = false;

      const date = action.payload;
      state.editing = true;
      state.startDay = date;
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
      const startDay = action.payload;
      state.startDay = startDay;

      if (startDay >= state.endDay) {
        const endDay = getNextDayNumber(startDay);
        state.endDay = endDay;
      }
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
  triggerEditorWithTask,
  triggerEditorWithDateNumber,
  resetEditorTask,
  updateEditorTaskWorks,
  updateEditorTaskStartDay,
  updateEditorTaskCycle,
  updateEditorEndDay,
  toggleEditorUseEndDay,
  toggleEditorRepeatDayOfWeek,
} = editorSlice.actions;
export default editorSlice.reducer;
