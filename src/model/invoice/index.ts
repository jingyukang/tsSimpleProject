import { IItem } from "../items";

export interface IInvoice {
  id: number;
  date: Date;
  total: number;
  items: Array<IItem>;
}

export interface ICreateInvoicePayload {
  date: string;
  total: number;
  items: Array<IItem>;
}
export interface IUpdateInvoicePayload {
  id: number;
  total: number;
  items: Array<IItem>;
}
