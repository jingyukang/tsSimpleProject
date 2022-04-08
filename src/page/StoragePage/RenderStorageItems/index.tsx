import React, { useState } from "react";
import { IItem, IItemUpdatePayload } from "../../../model";
import { useAppDispatch } from "../../../app/hooks";
import {
  deleteItemAsync,
  getItemsAsync,
  updateItemAsync,
} from "../../../slice/items";

interface storageItemProps {
  item: IItem;
}

const RenderStorageItems = ({ item }: storageItemProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [updateName, setUpdateName] = useState<string | void>();
  const [updatePrice, setUpdatePrice] = useState<number | void>();
  const [updateQuentity, setUpdateQuentity] = useState<number | void>();

  const resetPageState = (): void => {
    setUpdateName();
    setUpdatePrice();
    setUpdateQuentity();
  };

  const deleteItemButton = () => {
    dispatch(deleteItemAsync(item.id));
    dispatch(getItemsAsync());
  };

  const updateItemButton = () => {
    const payload: IItemUpdatePayload = {
      ...item,
      itemName: !updateName ? item.itemName : updateName,
      itemPrice: !updatePrice ? item.itemPrice : updatePrice,
      itemQuentity: !updateQuentity ? item.itemQuentity : updateQuentity,
    };

    Number(updatePrice) < 0 || Number(updateQuentity) < 0
      ? alert("Invalid number")
      : !updateName && !updatePrice && !updateQuentity
      ? alert("Edit something")
      : dispatch(updateItemAsync(payload));

    resetPageState();
  };

  return (
    <>
      <tr>
        <td>{item.itemName}</td>
        <td>{item.itemPrice}</td>
        <td>{item.itemQuentity}</td>
        <td>
          <button onClick={deleteItemButton}>delete</button>
        </td>
      </tr>
      <tr>
        <td>
          <input
            type="text"
            placeholder="Item name change"
            onChange={(e) => {
              setUpdateName(e.target.value);
            }}
          />
        </td>
        <td>
          <input
            type="number"
            placeholder="Number of Price"
            onChange={(e) => {
              setUpdatePrice(Number(e.target.value));
            }}
          />
        </td>
        <td>
          <input
            type="number"
            placeholder="Total Quentity Change"
            onChange={(e) => {
              setUpdateQuentity(Number(e.target.value));
            }}
          />
        </td>
        <td>
          <button onClick={updateItemButton}>Update</button>
        </td>
      </tr>
    </>
  );
};

export default RenderStorageItems;
