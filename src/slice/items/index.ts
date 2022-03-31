import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IItem } from "../../model";

export interface IItemState {
  allItems: Array<IItem>;
}

const initialState: IItemState = {
  allItems: [
    {
      itemCode: "a1",
      itemName: "banana",
      itemPrice: 2.5,
      itemQuentity: 20,
    },
    {
      itemCode: "a2",
      itemName: "apple",
      itemPrice: 3,
      itemQuentity: 10,
    },
  ],
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: {
      reducer(state, action: PayloadAction<IItem>) {
        !state.allItems.find((i) => i.itemName === action.payload.itemName)
          ? (state.allItems = [...state.allItems, action.payload])
          : alert("The Item is already on the List");
      },
      prepare(itemName: string, itemPrice: number, itemQuentity: number) {
        return {
          payload: {
            itemCode: nanoid(),
            itemName,
            itemPrice,
            itemQuentity,
          },
        };
      },
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.allItems = state.allItems.filter(
        (i) => i.itemCode !== action.payload
      );
    },
    editItem: (state, action: PayloadAction<IItem>) => {
      state.allItems = state.allItems.map((i) =>
        i.itemCode === action.payload.itemCode ? action.payload : i
      );
    },
  },
});

export const { addItem, removeItem, editItem } = itemSlice.actions;

export const selectAllItems = (state: RootState): Array<IItem> =>
  state.items.allItems;

export default itemSlice.reducer;
