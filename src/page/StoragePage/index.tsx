import { useState, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { createItemAsync, selectAllItems } from "../../slice/items";
import { IItem, IItemCreatePayload } from "../../model";
import RenderStorageItems from "./RenderStorageItems";

const StoragePage = (): JSX.Element => {
  const allItems: Array<IItem> = useAppSelector(selectAllItems);
  const dispatch = useAppDispatch();

  const [item, setItem] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quentity, setQuentity] = useState<number>(0);

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
          {allItems.map((item) => (
            <RenderStorageItems key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoragePage;
