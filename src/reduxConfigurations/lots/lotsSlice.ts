import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../../api/mock";

export interface LotsState {
  value: Array<Lot & { saved: boolean }>;
}

const initialState: LotsState = {
  value: [],
};

export const fetchLots = () => {
  let lots = API.getLots();
  lots = lots.map((lot) => ({ ...lot, saved: false }));
  return lots as Array<Lot & { saved: boolean }>;
};

export const lotsSlice = createSlice({
  name: "lots",
  initialState,
  reducers: {
    saveLot: (state, action: PayloadAction<Lot>) => {
      state.value = state.value.map((lot) => {
        if (lot.lotId === action.payload.lotId) {
          lot.saved = true;
        }

        return lot;
      });
    },
    unsaveLot: (state, action: PayloadAction<Lot>) => {
      state.value = state.value.map((lot) => {
        if (lot.lotId === action.payload.lotId) {
          lot.saved = false;
        }

        return lot;
      });
    },
  },
});

export const { saveLot, unsaveLot } = lotsSlice.actions;

export default lotsSlice.reducer;
