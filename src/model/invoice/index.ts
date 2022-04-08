import { IItem } from "../items";

export interface IInvoice {
  id: number;
  date: Date;
  items: Array<IItem>;
}

export interface ICreateInvoicePayload {
  date: string;
  items: Array<IItem>;
}
export interface IUpdateInvoicePayload {
  id: number;
  items: Array<IItem>;
}
