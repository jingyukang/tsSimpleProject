import axios, { AxiosError, AxiosResponse } from "axios";
import {
  ICreateInvoicePayload,
  IInvoice,
  IUpdateInvoicePayload,
} from "../../model/invoice";

export const fetchInvoice = (): Promise<Array<IInvoice>> =>
  new Promise<Array<IInvoice>>((resolve, reject) =>
    axios
      .get<Array<IInvoice>>("/api/invoices")
      .then((res: AxiosResponse) => res.data)
      .then((invoices: Array<IInvoice>) => resolve(invoices))
      .catch((error: AxiosError) => reject(error))
  );

export const createInvoice = (
  invoice: ICreateInvoicePayload
): Promise<IInvoice> =>
  new Promise<IInvoice>((resolve, reject) =>
    axios
      .post<IInvoice>("/api/invoices", invoice)
      .then((res: AxiosResponse) => res.data)
      .then((data: IInvoice) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );

export const deleteInvoice = (id: number): Promise<any> =>
  new Promise<IInvoice>((resolve, reject) =>
    axios
      .delete<IInvoice>(`/api/invoices/${id}`)
      .then((res: AxiosResponse) => res.data)
      .then((data: IInvoice) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );

export const updateInvoice = (
  invoice: IUpdateInvoicePayload
): Promise<IInvoice> =>
  new Promise<IInvoice>((resolve, reject) =>
    axios
      .put<IInvoice>(`/api/invoices/${invoice.id}`, invoice)
      .then((res: AxiosResponse) => res.data)
      .then((data: IInvoice) => resolve(data))
      .catch((error: AxiosError) => reject(error))
  );
