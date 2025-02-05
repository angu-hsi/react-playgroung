import { Todo } from "../models/todo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  currentTodo: Todo | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
  currentTodo: null,
};

export const fetchTodos = createAsyncThunk<Todo[]>("todos/fetchTodos", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
  return response.data;
});

export const addTodo = createAsyncThunk<Todo, string>("todos/addTodo", async (title) => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/todos", {
    title,
    completed: false,
  });
  return response.data;
});

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<Todo>) => {
      console.log(action.payload);
      const index = state.todos.findIndex((item) => item.id == action.payload.id);
      console.log("indice", index);
      if (index >= 0) state.todos.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Errore sconosciuto";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
export const { remove } = todoSlice.actions;

export default todoSlice.reducer;
