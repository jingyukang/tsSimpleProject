import React from "react";
import { IItem } from "../../model";
import { selectAllItems } from "../../slice/items/index";
import { useAppSelector } from "../../app/hooks";
import { selectAllCartItems } from "../../slice/cartItem";
import RenderList from "./RenderList";
import RenderCart from "./RenderCart";

const ItemList = (): JSX.Element => {
  const allItems: Array<IItem> = useAppSelector(selectAllItems);

  const allCartItems = useAppSelector(selectAllCartItems);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h2>Item List</h2>
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
            {allItems.map((item: IItem) =>
              item.itemQuentity > 0 ? (
                <RenderList key={item.id} item={item} />
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Cart</h2>
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
            {allCartItems.map((item: IItem) =>
              item.itemQuentity > 0 ? (
                <RenderCart key={item.id} item={item} />
              ) : null
            )}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button onClick={() => {}}>Get invoice</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemList;
