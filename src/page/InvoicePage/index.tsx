import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAllInvoices } from "../../slice/invoice";
import InvoiceList from "./InvoiceList";
import { IInvoice } from "../../model/invoice";

const InvoicePage = (): JSX.Element => {
  const allInvoices: Array<IInvoice> = useAppSelector(selectAllInvoices);

  return (
    <>
      {allInvoices.length > 0 ? (
        allInvoices.map((invoice) => (
          <InvoiceList key={invoice.id} invoice={invoice} />
        ))
      ) : (
        <div>
          <h2>No Invoice to list</h2>
        </div>
      )}
    </>
  );
};

export default InvoicePage;
