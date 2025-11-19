
import React from 'react';
import type { InvoiceItem, ReceiverInfo } from '../types';
import logo from '../gvalogo.png';

interface InvoicePreviewProps {
  invoiceNumber: string;
  invoiceDate: string;
  receiver: ReceiverInfo;
  paidBy: string;
  items: InvoiceItem[];
  totalAmount: number;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoiceNumber,
  invoiceDate,
  receiver,
  paidBy,
  items,
  totalAmount
}) => {
  return (
    <div id="invoice-preview" className="bg-white dark:bg-gray-800 print:bg-white p-8 md:p-12 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 print:border-gray-200 transition-colors duration-200">
      <header className="flex justify-between items-start pb-8 border-b-2 border-gray-100 dark:border-gray-700 print:border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 print:text-gray-800">INVOICE</h1>
          <p className="text-gray-500 mt-1">
            Invoice #: <span className="font-medium text-gray-700 dark:text-gray-300 print:text-gray-700">{invoiceNumber}</span>
          </p>
          <p className="text-gray-500 dark:text-gray-400 print:text-gray-500">
            Date: <span className="font-medium text-gray-700 dark:text-gray-300 print:text-gray-700">{invoiceDate}</span>
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end space-x-3">
            <img src={logo} alt="Global Village Academy" className="w-16 h-16 object-contain" />
            <h2 className="text-2xl font-semibold text-blue-600">Global Village Academy</h2>
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 print:text-gray-600">
            <p>Head Office: House-11 (2nd Floor), Block-J,</p>
            <p>Baridhara, Dhaka-1212, Bangladesh</p>
            <p>Tel: +88-02-226618469</p>
            <p>Email: info@globalvillagebd.com</p>
            <p>Whatsapp: +8801901519721 / +8801901519722</p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-8 my-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 print:text-gray-500 uppercase tracking-wider mb-2">Billed To</h3>
          <p className="font-bold text-gray-800 dark:text-gray-100 print:text-gray-800">{receiver.name || 'Receiver Name'}</p>
          <p className="text-gray-600 dark:text-gray-400 print:text-gray-600">{receiver.address || 'Receiver Address'}</p>
          <p className="text-gray-600 dark:text-gray-400 print:text-gray-600">{receiver.phone || 'Receiver Phone'}</p>
        </div>
        <div className="text-right">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 print:text-gray-500 uppercase tracking-wider mb-2">Paid By</h3>
          <p className="font-bold text-gray-800 dark:text-gray-100 print:text-gray-800">Paid By: <span className="font-medium">{paidBy || 'N/A'}</span></p>
        </div>
      </section>

      <section>
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700/50 print:bg-gray-50">
            <tr>
              <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 print:text-gray-600 uppercase tracking-wider">Description</th>
              <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 print:text-gray-600 uppercase tracking-wider text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 print:divide-gray-100">
            {items.length > 0 ? items.map(item => (
              <tr key={item.id}>
                <td className="p-3 text-gray-700 dark:text-gray-300 print:text-gray-700">{item.description}</td>
                <td className="p-3 text-gray-700 dark:text-gray-300 print:text-gray-700 text-right">৳{item.amount.toFixed(2)}</td>
              </tr>
            )) : (
              <tr>
                <td className="p-3 text-gray-500 italic" colSpan={2}>No items added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="mt-8 flex justify-end">
        <div className="w-full max-w-xs">
          <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 print:bg-gray-100 p-4 rounded-md">
            <span className="font-bold text-gray-800 dark:text-gray-100 print:text-gray-800 text-lg">Total</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400 print:text-emerald-700 text-xl">৳{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <section className="mt-12 grid grid-cols-2 gap-8">
        <div className="text-center">
          <div className="h-20 border-b border-gray-400 dark:border-gray-500 print:border-gray-400"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 print:text-gray-600">Payer Signature</p>
        </div>
        <div className="text-center">
          <div className="h-20 border-b border-gray-400 dark:border-gray-500 print:border-gray-400"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 print:text-gray-600">Receiver Signature</p>
        </div>
      </section>

      <footer className="mt-8 pt-6 border-t-2 border-gray-100 dark:border-gray-700 print:border-gray-100 text-center text-gray-500 dark:text-gray-400 print:text-gray-500">
        <p>Thank you from Global Village Academy</p>
      </footer>
    </div>
  );
};

export default InvoicePreview;
