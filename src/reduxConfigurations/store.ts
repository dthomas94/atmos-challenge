import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import homesReducer, { fetchHomePlans } from "./homes/homesSlice";
import lotsReducer, { fetchLots } from "./lots/lotsSlice";
import combinationsReducer, {
  fetchCombinations,
} from "./combinations/combinationsSlice";

export const store = configureStore({
  reducer: {
    lots: lotsReducer,
    homes: homesReducer,
    combinations: combinationsReducer,
  },
  preloadedState: {
    lots: { value: fetchLots() },
    homes: { value: fetchHomePlans() },
    combinations: { value: fetchCombinations() },
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
