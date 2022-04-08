import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IInvoice } from "../../model";
import { RootState } from "../../app/store";
import {
  fetchInvoice,
  createInvoice,
  deleteInvoice,
  updateInvoice,
} from "../../api/invoice";
import {
  ICreateInvoicePayload,
  IUpdateInvoicePayload,
} from "../../model/invoice/index";

export interface IInvoiceState {
  allInvoices: Array<IInvoice>;
}

const initialState: IInvoiceState = {
  allInvoices: [],
};

export const getInvoicesAsync = createAsyncThunk(
  "/invoices/fetchInvoices",
  async () => await fetchInvoice()
);

export const createInvoiceAsync = createAsyncThunk(
  "invoices/createInvoices",
  async (invoice: ICreateInvoicePayload) => await createInvoice(invoice)
);

export const deleteInvoiceAsync = createAsyncThunk(
  "invoices/deleteInvoices",
  async (id: number) => await deleteInvoice(id)
);

export const updateInvoiceAsync = createAsyncThunk(
  "invoices/updateInvoiceAsync",
  async (invoice: IUpdateInvoicePayload) => await updateInvoice(invoice)
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<IInvoice>) => {
      state.allInvoices = [...state.allInvoices, action.payload];
    },
    removeInvoice: (state, action: PayloadAction<number>) => {
      state.allInvoices = state.allInvoices.filter(
        (i) => i.id !== action.payload
      );
    },
    changeInvoice: (state, action: PayloadAction<IInvoice>) => {
      state.allInvoices = state.allInvoices.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getInvoicesAsync.fulfilled, (state, action) => {
        state.allInvoices = action.payload;
      })
      .addCase(createInvoiceAsync.fulfilled, (state, action) => {
        invoiceSlice.caseReducers.addInvoice(state, action);
      })
      .addCase(deleteInvoiceAsync.fulfilled, (state, action) => {
        invoiceSlice.caseReducers.removeInvoice(state, action);
      })
      .addCase(updateInvoiceAsync.fulfilled, (state, action) => {
        invoiceSlice.caseReducers.changeInvoice(state, action);
      });
  },
});

export const { addInvoice, removeInvoice, changeInvoice } =
  invoiceSlice.actions;

export const selectAllInvoices = (state: RootState): Array<IInvoice> =>
  state.invoices.allInvoices;

export default invoiceSlice.reducer;
