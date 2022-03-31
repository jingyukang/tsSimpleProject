import { useState, FormEvent, Fragment } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addItem,
  editItem,
  removeItem,
  selectAllItems,
} from "../../slice/items";
import { IItem } from "../../model/items/index";

const Storage = (): JSX.Element => {
  const allItems: Array<IItem> = useAppSelector(selectAllItems);
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quentity, setQuentity] = useState<number>(0);
  const [updatePrice, setUpdatePrice] = useState<number>(0);
  const [updateQuentity, setUpdateQuentity] = useState<number>(0);

  const addItemButton = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addItem(item, price, quentity));
  };

  const deleteItemButton = (code: string) => {
    dispatch(removeItem(code));
  };

  const updateItemButton = (payload: IItem) => {
    dispatch(editItem(payload));
  };

  const renderItems = allItems.map((item: IItem) => (
    <Fragment key={item.itemCode}>
      <tr>
        <td>{item.itemName}</td>
        <td>{item.itemPrice}</td>
        <td>{item.itemQuentity}</td>
        <td>
          <button
            onClick={() => {
              deleteItemButton(item.itemCode);
            }}
          >
            delete
          </button>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input
            type="text"
            onChange={(e) => {
              setUpdatePrice(Number(e.target.value));
            }}
          />
        </td>
        <td>
          <input
            type="text"
            onChange={(e) => {
              setUpdateQuentity(Number(e.target.value));
            }}
          />
        </td>
        <td>
          <button
            onClick={() => {
              const payload: IItem = {
                ...item,
                itemCode: item.itemCode,
                itemPrice: updatePrice,
                itemQuentity: updateQuentity,
              };
              updateItemButton(payload);
            }}
          >
            Update
          </button>
        </td>
      </tr>
    </Fragment>
  ));

  return (
    <div>
      <div>
        <h2>Storage</h2>
      </div>

      <form>
        <div>
          <label htmlFor="item">Item:</label>
          <input
            type="text"
            name="item"
            onChange={(e) => {
              setItem(e.target.value);
            }}
          />
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
          />
          <label htmlFor="quentity">Quentity:</label>
          <input
            type="text"
            name="quentity"
            onChange={(e) => {
              setQuentity(Number(e.target.value));
            }}
          />
          <button onClick={addItemButton}>Add Item</button>
        </div>
      </form>
      <table>
        <tbody>
          <tr>
            <td>
              <h3>Item</h3>
            </td>
            <td>
              <h3>Price</h3>
            </td>
            <td>
              <h3>Quentity</h3>
            </td>
            <td>
              <h3>Action</h3>
            </td>
          </tr>
          {renderItems}
        </tbody>
      </table>
    </div>
  );
};

export default Storage;
