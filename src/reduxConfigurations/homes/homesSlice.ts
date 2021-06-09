import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../../api/mock";

export interface HomesState {
  value: Array<HomePlan & { saved: boolean }>;
}

const initialState: HomesState = {
  value: [],
};

export const fetchHomePlans = () => {
  let homePlans = API.getHomePlans();
  homePlans = homePlans.map((homePlan) => ({ ...homePlan, saved: false }));
  return homePlans as Array<HomePlan & { saved: boolean }>;
};

export const homesSlice = createSlice({
  name: "homes",
  initialState,
  reducers: {
    saveHome: (state, action: PayloadAction<HomePlan>) => {
      state.value = state.value.map((home) => {
        if (home.homePlanId === action.payload.homePlanId) {
          home.saved = true;
        }

        return home;
      });
    },
    unsaveHome: (state, action: PayloadAction<HomePlan>) => {
      state.value = state.value.map((home) => {
        if (home.homePlanId === action.payload.homePlanId) {
          home.saved = false;
        }

        return home;
      });
    },
  },
});

export const { saveHome, unsaveHome } = homesSlice.actions;

export default homesSlice.reducer;
