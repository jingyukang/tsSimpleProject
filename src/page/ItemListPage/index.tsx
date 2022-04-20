import React from "react";
import { IItem } from "../../model";
import { selectAllItems, updateItemAsync } from "../../slice/items";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { emptyCart, selectAllCartItems } from "../../slice/cartItem";
import RenderList from "./RenderList";
import RenderCart from "./RenderCart";
import { createInvoiceAsync } from "../../slice/invoice";
import { ICreateInvoicePayload } from "../../model/invoice";

const ItemListPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const allItems: Array<IItem> = useAppSelector(selectAllItems);

  const allCartItems: Array<IItem> = useAppSelector(selectAllCartItems);

  const buttonGetInvoice = (): void => {
    let totalPrice: number = 0;

    allCartItems.map(
      (i: IItem) => (totalPrice += i.itemPrice * i.itemQuentity)
    );

    const newInvoice: ICreateInvoicePayload = {
      // date: new Date().toISOString().slice(0, 10),
      date: (new Date(), "dd-Mon-yyyy"),
      items: allCartItems,
      total: totalPrice,
    };

    dispatch(createInvoiceAsync(newInvoice));

    allItems.map((item) => {
      allCartItems.map(async (i) => {
        const updateQuentityPayload: IItem = {
          ...item,
          itemQuentity: item.itemQuentity - i.itemQuentity,
        };

        if (i.id === item.id) {
          await dispatch(updateItemAsync(updateQuentityPayload));
        }
      });
    });

    dispatch(emptyCart());
  };

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
                <button
                  disabled={allCartItems.length <= 0}
                  onClick={buttonGetInvoice}
                >
                  Get invoice
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemListPage;
