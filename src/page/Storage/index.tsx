import { useState, FormEvent, Fragment, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  createItemAsync,
  deleteItemAsync,
  getItemsAsync,
  selectAllItems,
  updateItemAsync,
} from "../../slice/items";
import {
  IItem,
  IItemCreatePayload,
  IItemUpdatePayload,
} from "../../model/items/index";

const Storage = (): JSX.Element => {
  const allItems: Array<IItem> = useAppSelector(selectAllItems);
  const dispatch = useAppDispatch();

  const [item, setItem] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quentity, setQuentity] = useState<number>(0);

  const [updatePrice, setUpdatePrice] = useState<number>(0);
  const [updateQuentity, setUpdateQuentity] = useState<number>(0);

  useEffect(() => {
    dispatch(getItemsAsync());
  }, [dispatch]);

  const addItemButton = (e: FormEvent): void => {
    e.preventDefault();
    const newItem: IItemCreatePayload = {
      itemName: item,
      itemPrice: price,
      itemQuentity: quentity,
    };
    dispatch(createItemAsync(newItem));
  };

  const deleteItemButton = (id: number) => {
    dispatch(deleteItemAsync(id));
    dispatch(getItemsAsync());
  };

  const updateItemButton = (item: IItem) => {
    const payload: IItemUpdatePayload = {
      ...item,
      itemPrice: updatePrice,
      itemQuentity: updateQuentity,
    };
    dispatch(updateItemAsync(payload));
  };

  // const updateItemButton = (payload: IItem) => {
  //   dispatch(editItem(payload));
  // };

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
              updateItemButton(item);
            }}
          >
            Update
          </button>
          {/* <button
            onClick={() => {
              const payload: IItem = {
                ...item,
                id: item.id,
                itemPrice: updatePrice,
                itemQuentity: updateQuentity,
              };
              updateItemButton(payload);
            }}
          >
            Update
          </button> */}
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
