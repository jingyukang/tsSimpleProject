import { useState, FormEvent, Fragment } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  createItemAsync,
  deleteItemAsync,
  getItemsAsync,
  selectAllItems,
  updateItemAsync,
} from "../../slice/items";
import { IItem, IItemCreatePayload, IItemUpdatePayload } from "../../model";

const Storage = (): JSX.Element => {
  const allItems: Array<IItem> = useAppSelector(selectAllItems);
  const dispatch = useAppDispatch();

  const [item, setItem] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quentity, setQuentity] = useState<number>(0);

  const [updateName, setUpdateName] = useState<string>("");
  const [updatePrice, setUpdatePrice] = useState<number>(0);
  const [updateQuentity, setUpdateQuentity] = useState<number>(0);

  const addItemButton = (e: FormEvent): void => {
    e.preventDefault();
    const newItem: IItemCreatePayload = {
      itemName: item,
      itemPrice: price,
      itemQuentity: quentity,
    };

    !allItems.find((i) => i.itemName === newItem.itemName)
      ? dispatch(createItemAsync(newItem))
      : alert("The Item is already on the List");
  };

  const deleteItemButton = (id: number) => {
    dispatch(deleteItemAsync(id));
    dispatch(getItemsAsync());
  };

  const updateItemButton = (item: IItem) => {
    const payload: IItemUpdatePayload = {
      ...item,
      itemName: updateName === "" ? item.itemName : updateName,
      itemPrice: updatePrice === 0 ? item.itemPrice : updatePrice,
      itemQuentity: updateQuentity === 0 ? item.itemQuentity : updateQuentity,
    };

    updateName === "" && updatePrice === 0 && updateQuentity === 0
      ? alert("Edit something")
      : dispatch(updateItemAsync(payload));
  };

  const renderItems = allItems.map((item: IItem) => (
    <Fragment key={item.id}>
      <tr>
        <td>{item.itemName}</td>
        <td>{item.itemPrice}</td>
        <td>{item.itemQuentity}</td>
        <td>
          <button
            onClick={() => {
              deleteItemButton(item.id);
            }}
          >
            delete
          </button>
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
          <button
            onClick={() => {
              updateItemButton(item);
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
