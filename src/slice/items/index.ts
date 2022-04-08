import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IItem } from "../../model";
import { fetchItems, createItem, updateItem, deleteItem } from "../../api/item";
import { IItemCreatePayload, IItemUpdatePayload } from "../../model";

export interface IItemState {
  allItems: Array<IItem>;
}

const initialState: IItemState = {
  allItems: [],
};

export const getItemsAsync = createAsyncThunk(
  "items/fetchItems",
  async () => await fetchItems()
);

export const createItemAsync = createAsyncThunk(
  "items/createItem",
  async (item: IItemCreatePayload) => await createItem(item)
);

export const deleteItemAsync = createAsyncThunk(
  "items/deleteItem",
  async (id: number) => await deleteItem(id)
);

export const updateItemAsync = createAsyncThunk(
  "items/updateItem",
  async (item: IItemUpdatePayload) => await updateItem(item)
);

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IItem>) => {
      state.allItems = [...state.allItems, action.payload];
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.allItems = state.allItems.filter((i) => i.id !== action.payload);
    },
    changeItem: (state, action: PayloadAction<IItem>) => {
      state.allItems = state.allItems.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getItemsAsync.fulfilled, (state, action) => {
        state.allItems = action.payload;
      })
      .addCase(createItemAsync.fulfilled, (state, action) => {
        itemSlice.caseReducers.addItem(state, action);
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        itemSlice.caseReducers.removeItem(state, action);
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        itemSlice.caseReducers.changeItem(state, action);
      });
  },
});

export const { addItem, removeItem, changeItem } = itemSlice.actions;

export const selectAllItems = (state: RootState): Array<IItem> =>
  state.items.allItems;

export default itemSlice.reducer;
