import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem } from "../../model";
import { RootState } from "../../app/store";

export interface cartItemState {
  allCartItems: Array<IItem>;
}

const initialState: cartItemState = {
  allCartItems: [],
};

const cartItemSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<IItem>) => {
      state.allCartItems = [...state.allCartItems, action.payload];
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.allCartItems = state.allCartItems.filter(
        (i) => i.id !== action.payload
      );
    },
    editCartItem: (state, action: PayloadAction<IItem>) => {
      state.allCartItems = state.allCartItems.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    },
  },
});

export const { addCartItem, removeCartItem, editCartItem } =
  cartItemSlice.actions;

export const selectAllCartItems = (state: RootState): Array<IItem> =>
  state.cartItem.allCartItems;

export default cartItemSlice.reducer;
