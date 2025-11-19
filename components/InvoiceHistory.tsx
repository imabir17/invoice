import React, { useEffect, useState } from 'react';
import { InvoiceItem, ReceiverInfo } from '../types';
import InvoicePreview from './InvoicePreview';
import { PrintIcon } from './icons';

interface SavedInvoice {
    id: number;
    invoiceNumber: string;
    date: string;
    receiverName: string;
    totalAmount: number;
    data: {
        receiver: ReceiverInfo;
        paidBy: string;
        items: InvoiceItem[];
        invoiceNumber: string;
        invoiceDate: string;
    };
}

const InvoiceHistory: React.FC = () => {
    const [invoices, setInvoices] = useState<SavedInvoice[]>([]);
    const [selectedInvoice, setSelectedInvoice] = useState<SavedInvoice | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/invoices');
            const result = await response.json();
            if (result.message === 'success') {
                setInvoices(result.data);
            }
        } catch (error) {
            console.error('Error fetching invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewInvoice = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3001/api/invoices/${id}`);
            const result = await response.json();
            if (result.message === 'success') {
                setSelectedInvoice(result.data);
            }
        } catch (error) {
            console.error('Error fetching invoice details:', error);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (selectedInvoice) {
        return (
            <div className="container mx-auto p-4">
                <button
                    onClick={() => setSelectedInvoice(null)}
                    className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    &larr; Back to History
                </button>
                <div className="mb-8">
                    <InvoicePreview
                        invoiceNumber={selectedInvoice.data.invoiceNumber}
                        invoiceDate={selectedInvoice.data.invoiceDate}
                        receiver={selectedInvoice.data.receiver}
                        paidBy={selectedInvoice.data.paidBy}
                        items={selectedInvoice.data.items}
                        totalAmount={selectedInvoice.totalAmount}
                    />
                </div>
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 flex justify-center print:hidden">
                    <button
                        onClick={handlePrint}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-transform transform hover:scale-105"
                    >
                        <PrintIcon className="h-6 w-6" />
                        <span>Print Invoice</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Invoice History</h2>
            {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Invoice #</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Receiver</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{invoice.invoiceNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{invoice.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{invoice.receiverName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">৳{invoice.totalAmount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleViewInvoice(invoice.id)}
                                            className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {invoices.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                        No invoices found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InvoiceHistory;
