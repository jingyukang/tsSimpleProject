import React, { useState } from "react";
import { IItem, IItemUpdatePayload } from "../../../model";
import { useAppDispatch } from "../../../app/hooks";
import {
  deleteItemAsync,
  getItemsAsync,
  updateItemAsync,
} from "../../../slice/items";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/material/Input";

interface storageItemProps {
  item: IItem;
}

const RenderStorageItems = ({ item }: storageItemProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [updateName, setUpdateName] = useState<string | void>();
  const [updatePrice, setUpdatePrice] = useState<number | void>();
  const [updateTotalQuentity, setUpdateTotalQuentity] = useState<
    number | void
  >();
  const [updateQuentity, setUpdateQuentity] = useState<number | void>();

  const deleteItemButton = () => {
    dispatch(deleteItemAsync(item.id));
    dispatch(getItemsAsync());
  };

  const updateItemButton = (): void => {
    const payload: IItemUpdatePayload = {
      ...item,
      itemName: !updateName ? item.itemName : updateName,
      itemPrice: !updatePrice ? item.itemPrice : updatePrice,
      itemQuentity: !updateTotalQuentity
        ? item.itemQuentity
        : updateTotalQuentity,
    };

    Number(updatePrice) < 0 || Number(updateTotalQuentity) < 0
      ? alert("Invalid number")
      : !updateName && !updatePrice && !updateTotalQuentity
      ? alert("Edit something")
      : dispatch(updateItemAsync(payload));
  };

  const updatePlus = (): void => {
    const payload: IItemUpdatePayload = {
      ...item,
      itemQuentity: !updateQuentity
        ? item.itemQuentity
        : item.itemQuentity + updateQuentity,
    };
    Number(updateQuentity) < 0
      ? alert("Invalid number")
      : dispatch(updateItemAsync(payload));
  };
  const updateMinus = (): void => {
    const payload: IItemUpdatePayload = {
      ...item,
      itemQuentity: !updateQuentity
        ? item.itemQuentity
        : item.itemQuentity - updateQuentity,
    };
    Number(updateQuentity) < 0 || Number(updateQuentity) > item.itemQuentity
      ? alert("Invalid number")
      : dispatch(updateItemAsync(payload));
  };

  return (
    <>
      <tr>
        <td>{item.itemName}</td>
        <td>${item.itemPrice}</td>
        <td>{item.itemQuentity}</td>
        <td>
          <Button
            size="small"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={deleteItemButton}
          >
            Delete
          </Button>
        </td>
      </tr>
      <tr>
        <td>
          <Input
            type="text"
            placeholder="Item name change"
            onChange={(e) => {
              setUpdateName(e.target.value);
            }}
          />
        </td>
        <td>
          <Input
            type="number"
            placeholder="Number of Price"
            onChange={(e) => {
              setUpdatePrice(Number(e.target.value));
            }}
          />
        </td>
        <td>
          <Input
            type="number"
            placeholder="Total Quentity Change"
            onChange={(e) => {
              setUpdateTotalQuentity(Number(e.target.value));
            }}
          />
        </td>
        <td>
          <Button
            size="small"
            startIcon={<SendIcon />}
            variant="outlined"
            color="secondary"
            onClick={updateItemButton}
          >
            Update
          </Button>
        </td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td>
          <Input
            type="number"
            placeholder={`Num for '${item.itemName}'`}
            onChange={(e) => {
              setUpdateQuentity(Number(e.target.value));
            }}
          />
        </td>
        <td>
          <Button variant="outlined" size="small" onClick={updatePlus}>
            +
          </Button>
          <Button
            color="error"
            variant="outlined"
            size="small"
            onClick={updateMinus}
          >
            -
          </Button>
        </td>
      </tr>
    </>
  );
};

export default RenderStorageItems;
