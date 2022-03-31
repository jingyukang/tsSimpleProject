import React from "react";
import { IItem } from "../../model";
import { selectAllItems } from "../../slice/items/index";
import { useAppSelector } from "../../app/hooks";

const ItemList = (): JSX.Element => {
  const allItems: Array<IItem> = useAppSelector(selectAllItems);

  const renderList = allItems.map((item: IItem) => (
    <tr key={item.itemCode}>
      <td>{item.itemName}</td>
      <td>{item.itemPrice}</td>
      <td>{item.itemQuentity}</td>
    </tr>
  ));

  return (
    <>
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
              <h3>Quentiiy</h3>
            </td>
          </tr>
          {renderList}
        </tbody>
      </table>
    </>
  );
};

export default ItemList;
