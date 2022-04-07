import { IItem } from "../items/index";

export interface IInvoice {
  id: number;
  date: Date;
  items: Array<IItem>;
}
