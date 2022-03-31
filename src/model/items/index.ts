export interface IItem {
  id: number;
  itemName: string;
  itemPrice: number;
  itemQuentity: number;
}

export interface IItemCreatePayload {
  itemName: string;
  itemPrice: number;
  itemQuentity: number;
}

export interface IItemUpdatePayload {
  id: number;
  itemName: string;
  itemPrice: number;
  itemQuentity: number;
}
