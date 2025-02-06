import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos, addTodo } from "./todoSlice";
import { RootState } from "./store";

interface LoadingState {
  pendingRequests: number;
}

const initialState: LoadingState = {
  pendingRequests: 0,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Incrementa il contatore quando inizia una richiesta
      .addCase(fetchTodos.pending, (state) => {
        state.pendingRequests++;
      })
      // Decrementa il contatore quando la richiesta termina (con successo o errore)
      .addCase(fetchTodos.fulfilled, (state) => {
        state.pendingRequests--;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.pendingRequests--;
      });

    builder
      // Incrementa il contatore quando inizia una richiesta
      .addCase(addTodo.pending, (state) => {
        state.pendingRequests++;
      })
      // Decrementa il contatore quando la richiesta termina (con successo o errore)
      .addCase(addTodo.fulfilled, (state) => {
        state.pendingRequests--;
      })
      .addCase(addTodo.rejected, (state) => {
        state.pendingRequests--;
      });
  },
});

export const selectIsLoading = (state: RootState) => state.loading.pendingRequests > 0;
export default loadingSlice.reducer;
