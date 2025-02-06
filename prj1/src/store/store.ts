import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import loadingReducer from "./loadingSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
