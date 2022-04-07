import React, { useState } from "react";
import { IItem } from "../../../model";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { editCartItem } from "../../../slice/cartItem";
import { editRestItemQuentity } from "../../../slice/restItemQuentity";
import { selectAllItems } from "../../../slice/items/index";

interface cartItemProps {
  item: IItem;
}

const RenderCart = ({ item }: cartItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [newQuentityNum, setNewQuentityNum] = useState<number>(0);
  const allItems: Array<IItem> = useAppSelector(selectAllItems);
  const maxQuentity: number = Number(
    allItems.find((i) => i.id === item.id)?.itemQuentity
  );

  const changeQuentityButton = (): void => {
    newQuentityNum <= 0 || maxQuentity < newQuentityNum
      ? alert("Invalid number")
      : doUpdate();
  };

  const doUpdate = (): void => {
    const updateCartItemQ: IItem = {
      ...item,
      itemQuentity: newQuentityNum,
    };

    const updateQuentityNum: IItem = {
      ...item,
      itemQuentity: maxQuentity - item.itemQuentity,
    };

    dispatch(editCartItem(updateCartItemQ));
    dispatch(editRestItemQuentity(updateQuentityNum));
  };

  return (
    <tr>
      <td>{item.itemName}</td>
      <td>{item.itemPrice}</td>
      <td>{item.itemQuentity}</td>
      <td>
        <input
          type="number"
          placeholder="Change Quentity"
          onChange={(e) => {
            setNewQuentityNum(Number(e.target.value));
          }}
        />
        <button
          onClick={() => {
            changeQuentityButton();
          }}
        >
          Change
        </button>
      </td>
    </tr>
  );
};

export default RenderCart;
