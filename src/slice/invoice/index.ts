import { createSlice } from "@reduxjs/toolkit";
import { IInvoice } from "../../model";

export interface IInvoiceState {
  allInvoices: Array<IInvoice>;
}

const initialState = {};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
});
