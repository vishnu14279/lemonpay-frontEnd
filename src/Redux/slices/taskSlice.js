import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "tasks",
    initialState: {
      tasks: [],
    },
    reducers: {
      setTasks: (state, action) => {
        state.tasks = action.payload;
      },
      addTask: (state, action) => {
        state.tasks.push(action.payload);
      },
      editTask: (state, action) => {
        const { id, updatedTask } = action.payload;
        const index = state.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...updatedTask };
        }
      },
      deleteTask: (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      },
    },
  });
  
  export const { setTasks, addTask, editTask, deleteTask } = taskSlice.actions;
  export default taskSlice.reducer;
  