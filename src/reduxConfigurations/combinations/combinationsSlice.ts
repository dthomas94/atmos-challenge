import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../../api/mock";

export interface CombinationsState {
  value: Array<Combination & { compatible: boolean }>;
}

const initialState: CombinationsState = {
  value: [],
};

export const fetchCombinations = () => {
  let combinations = API.getCombinations();
  combinations = combinations.map((combo) => ({ ...combo, compatible: false }));
  return combinations as Array<Combination & { compatible: boolean }>;
};

export const combinationsSlice = createSlice({
  name: "combinations",
  initialState,
  reducers: {
    getCompatibleEntities: (
      state,
      action: PayloadAction<{ id: number; entityType: "homePlan" | "lot" }>
    ) => {
      if (action.payload.entityType === "homePlan") {
        state.value = state.value.map((combo) => {
          if (combo.homePlanId === action.payload.id) {
            combo.compatible = true;
          } else {
            combo.compatible = false;
          }
          return combo;
        });
      } else {
        state.value = state.value.map((combo) => {
          if (combo.lotId === action.payload.id) {
            combo.compatible = true;
          } else {
            combo.compatible = false;
          }
          return combo;
        });
      }
    },
  },
});

export const { getCompatibleEntities } = combinationsSlice.actions;

export default combinationsSlice.reducer;
