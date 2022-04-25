import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IItem } from "../../../model";
import { addCartItem, editCartItem } from "../../../slice/cartItem";
import { selectAllCartItems } from "../../../slice/cartItem";
import {
  addRestItemQuentity,
  editRestItemQuentity,
} from "../../../slice/restItemQuentity";
// import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Input, Button } from "@mui/material";

interface listProps {
  item: IItem;
}

const RenderList = ({ item }: listProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const allCartItems: Array<IItem> = useAppSelector(selectAllCartItems);
  const preItemQ: number | undefined = allCartItems.find(
    (i) => i.id === item.id
  )?.itemQuentity;

  const showedQuentityNum: number =
    typeof preItemQ === "number"
      ? item.itemQuentity - preItemQ
      : item.itemQuentity;
  const [numOfQuentity, setNumOfQuentity] = useState<number>(0);
  const ariaLabel = { "aria-label": "description" };

  const addToCartButton = (): void => {
    numOfQuentity <= 0 || showedQuentityNum < numOfQuentity
      ? alert("Invalid number")
      : allCartItems.find((i) => i.id === item.id)
      ? doUpdate()
      : doCreate();
  };

  const doCreate = (): void => {
    const newCartItem: IItem = {
      ...item,
      itemQuentity: numOfQuentity,
    };
    const newRestQuentityNum: IItem = {
      ...item,
      itemQuentity: showedQuentityNum - numOfQuentity,
    };
    dispatch(addCartItem(newCartItem));
    dispatch(addRestItemQuentity(newRestQuentityNum));
  };

  const doUpdate = (): void => {
    const preCartQuentity: number = Number(
      allCartItems.find((i) => i.id === item.id)?.itemQuentity
    );

    const editCartNum: IItem = {
      ...item,
      itemQuentity: preCartQuentity + numOfQuentity,
    };
    const editRestQuentityNum: IItem = {
      ...item,
      itemQuentity: showedQuentityNum - numOfQuentity,
    };
    dispatch(editCartItem(editCartNum));
    dispatch(editRestItemQuentity(editRestQuentityNum));
  };

  return (
    <tr>
      <td>{item.itemName}</td>
      <td>${item.itemPrice}</td>
      <td>{showedQuentityNum}</td>
      <td>
        <Input
          type="number"
          placeholder="Number of quentity"
          inputProps={ariaLabel}
          onChange={(e) => {
            setNumOfQuentity(Number(e.target.value));
          }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            addToCartButton();
          }}
        >
          <AddShoppingCartIcon />
          Add to cart
        </Button>
      </td>
    </tr>
  );
};

export default RenderList;
