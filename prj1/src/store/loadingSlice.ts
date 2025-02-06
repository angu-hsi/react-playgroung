import { createSlice, Action } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AsyncThunkAction extends Action {
  type: string;
  meta?: {
    skipLoading?: boolean;
    requestStatus?: "pending" | "fulfilled" | "rejected";
    arg?: unknown;
    requestId?: string;
  };
}

interface LoadingState {
  pendingRequests: number;
}

const initialState: LoadingState = {
  pendingRequests: 0,
};

// Helper per verificare se l'azione è un thunk pending che deve mostrare il loading
const isPendingAction = (action: AsyncThunkAction): boolean => {
  return action.type.endsWith("/pending") && !action.meta?.skipLoading;
};

// Helper per verificare se l'azione è un thunk fulfilled/rejected che aveva mostrato il loading
const isFinishedAction = (action: AsyncThunkAction): boolean => {
  // Verifichiamo che sia un'azione fulfilled/rejected E che non fosse stata saltata in pending
  return (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")) && !action.meta?.skipLoading;
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, (state) => {
        state.pendingRequests++;
      })
      .addMatcher(isFinishedAction, (state) => {
        state.pendingRequests = Math.max(0, state.pendingRequests - 1);
      });
  },
});

export const selectIsLoading = (state: RootState) => state.loading.pendingRequests > 0;
export default loadingSlice.reducer;
