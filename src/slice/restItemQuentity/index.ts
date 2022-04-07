import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../model";
import { RootState } from "../../app/store";

export interface restItemQuentityState {
  restItemQuentity: Array<IItem>;
}

const initialState: restItemQuentityState = {
  restItemQuentity: [],
};

const restItemQuentitySlice = createSlice({
  name: "restItemQuentity",
  initialState,
  reducers: {
    addRestItemQuentity: (state, action: PayloadAction<IItem>) => {
      state.restItemQuentity = [...state.restItemQuentity, action.payload];
    },
    removeRestItemQuentity: (state, action: PayloadAction<number>) => {
      state.restItemQuentity = state.restItemQuentity.filter(
        (i) => i.id !== action.payload
      );
    },
    editRestItemQuentity: (state, action: PayloadAction<IItem>) => {
      state.restItemQuentity = state.restItemQuentity.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    },
  },
});

export const {
  addRestItemQuentity,
  removeRestItemQuentity,
  editRestItemQuentity,
} = restItemQuentitySlice.actions;

export const selectAllRestItemQuentity = (state: RootState) =>
  state.restItemNum.restItemQuentity;

export default restItemQuentitySlice.reducer;
