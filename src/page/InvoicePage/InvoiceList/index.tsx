import React from "react";
import { IInvoice, IItem } from "../../../model";
import { useAppDispatch } from "../../../app/hooks";
import {
  deleteInvoiceAsync,
  getInvoicesAsync,
} from "../../../slice/invoice/index";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

interface invoiceProps {
  invoice: IInvoice;
}

const InvoiceList = ({ invoice }: invoiceProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const invoiceItems: Array<IItem> = invoice.items;

  const deleteInvoiceButton = (): void => {
    dispatch(deleteInvoiceAsync(invoice.id));
    dispatch(getInvoicesAsync());
  };

  return (
    <div className="eachInvoice">
      <table>
        <tbody>
          <tr>
            <td>
              <h2>Invoice ID : {invoice.id}</h2>
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td>
              <b>Created date :</b>
            </td>
            <td>{invoice.date}</td>
            <td></td>
          </tr>
          <tr>
            <td>
              <b>Item</b>
            </td>
            <td>
              <b>Price</b>
            </td>
            <td>
              <b>Quentity</b>
            </td>
          </tr>
          {invoiceItems.map((i) => (
            <tr key={i.id}>
              <td>{i.itemName}</td>
              <td>${i.itemPrice}</td>
              <td>{i.itemQuentity}</td>
            </tr>
          ))}
          <tr>
            <td>
              <b>Total Price: </b>${invoice.total}
            </td>
            <td></td>
            <td>
              <Button onClick={deleteInvoiceButton}>
                <DeleteIcon />
                Delete Invoice
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
