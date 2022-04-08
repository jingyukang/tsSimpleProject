import React from "react";
import { IInvoice, IItem } from "../../../model";
import { useAppDispatch } from "../../../app/hooks";
import {
  deleteInvoiceAsync,
  getInvoicesAsync,
} from "../../../slice/invoice/index";

interface invoiceProps {
  invoice: IInvoice;
  i: number;
}

const InvoiceList = ({ invoice, i }: invoiceProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const invoiceItems: Array<IItem> = invoice.items;

  const deleteInvoiceButton = (): void => {
    dispatch(deleteInvoiceAsync(invoice.id));
    dispatch(getInvoicesAsync());
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <h2>{i + 1} Invoice</h2>
            </td>
          </tr>
          <tr>
            <td>Invoice Id :</td>
            <td>{invoice.id}</td>
          </tr>
          <tr>
            <td>Created date :</td>
            <td>{invoice.date}</td>
            <td></td>
          </tr>
          {invoiceItems.map((i) => (
            <tr key={i.id}>
              <td>{i.itemName}</td>
              <td>{i.itemPrice}</td>
              <td>{i.itemQuentity}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
              <button onClick={deleteInvoiceButton}>Delete Invoice</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;