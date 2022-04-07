import axios, { AxiosError, AxiosResponse } from "axios";
import { IItem } from "../../model";
import { IItemCreatePayload, IItemUpdatePayload } from "../../model";

export const fetchItems = (): Promise<Array<IItem>> => {
  return new Promise<Array<IItem>>((resolve, reject) =>
    axios
      .get<Array<IItem>>("/items?_sort=itemName&_order=asc")
      .then((res: AxiosResponse) => res.data)
      .then((items: Array<IItem>) => resolve(items))
      .catch((error: AxiosError) => reject(error))
  );
};

export const createItem = (item: IItemCreatePayload): Promise<IItem> => {
  return new Promise<IItem>((resolve, reject) =>
    axios
      .post<IItem>("/items", item)
      .then((res: AxiosResponse) => res.data)
      .then((data: IItem) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );
};

export const deleteItem = (id: number): Promise<any> => {
  return new Promise<IItem>((resolve, reject) =>
    axios
      .delete<IItem>(`/items/${id}`)
      .then((res: AxiosResponse) => res.data)
      .then((data: IItem) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );
};

export const updateItem = (item: IItemUpdatePayload): Promise<IItem> => {
  return new Promise<IItem>((resolve, reject) =>
    axios
      .put<IItem>(`/items/${item.id}`, item)
      .then((res: AxiosResponse) => res.data)
      .then((data: IItem) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );
};
