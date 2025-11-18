
import React, { useState, useMemo, useEffect } from 'react';
import type { InvoiceItem, ReceiverInfo } from './types';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { PrintIcon } from './components/icons';

const App: React.FC = () => {
    const [receiver, setReceiver] = useState<ReceiverInfo>({
        name: '',
        address: '',
        phone: '',
    });
    const [paidBy, setPaidBy] = useState<string>('');
    const [items, setItems] = useState<InvoiceItem[]>([]);

    const [basePrefix] = useState(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `GVA-${year}${month}${day}-${hours}${minutes}${seconds}`;
    });

    const [invoiceNumber, setInvoiceNumber] = useState<string>('');
    const [usedSuffixes, setUsedSuffixes] = useState<Set<string>>(new Set());

    const persistUsed = (set: Set<string>) => {
        try {
            localStorage.setItem('usedInvoiceSuffixes', JSON.stringify(Array.from(set)));
        } catch (e) {
            // ignore storage errors
        }
    };

    const buildInvoice = (suffix: string) => `${basePrefix}-${suffix}`;

    useEffect(() => {
        // load used suffixes from localStorage
        const raw = localStorage.getItem('usedInvoiceSuffixes');
        const arr: string[] = raw ? JSON.parse(raw) : [];
        const initialSet = new Set(arr);
        setUsedSuffixes(initialSet);

        // helper to generate a unique 6-digit suffix given a set
        const genUnique = (set: Set<string>) => {
            if (set.size >= 1000000) throw new Error('Exhausted all invoice suffixes');
            let s: string;
            do {
                s = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            } while (set.has(s));
            const next = new Set(set);
            next.add(s);
            persistUsed(next);
            setUsedSuffixes(next);
            return s;
        };

        // generate initial invoice number only if not set
        if (!invoiceNumber) {
            const suffix = genUnique(initialSet);
            setInvoiceNumber(buildInvoice(suffix));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [invoiceDate] = useState(() => {
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }) + ' ' + now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    });

    const totalAmount = useMemo(() => {
        return items.reduce((sum, item) => sum + (item.amount || 0), 0);
    }, [items]);
    
    const handlePrint = () => {
        // generate a new unique 6-digit suffix and update the invoice number before printing
        if (usedSuffixes.size >= 1000000) {
            // fallback: still trigger print if exhausted
            window.print();
            return;
        }

        let suffix: string;
        do {
            suffix = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        } while (usedSuffixes.has(suffix));

        const next = new Set(usedSuffixes);
        next.add(suffix);
        try { localStorage.setItem('usedInvoiceSuffixes', JSON.stringify(Array.from(next))); } catch (e) {}
        setUsedSuffixes(next);

        setInvoiceNumber(buildInvoice(suffix));

        // give React a tick to update DOM with new invoice number, then print
        setTimeout(() => window.print(), 50);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <div className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-emerald-700">Invoice Generator</h1>
                    <p className="text-gray-600 mt-2">Create and print invoices for Global Village Academy</p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="lg:sticky lg:top-8">
                      <InvoiceForm
                          receiver={receiver}
                          setReceiver={setReceiver}
                          paidBy={paidBy}
                          setPaidBy={setPaidBy}
                          items={items}
                          setItems={setItems}
                      />
                    </div>
                    <div>
                        <InvoicePreview
                            invoiceNumber={invoiceNumber}
                            invoiceDate={invoiceDate}
                            receiver={receiver}
                            paidBy={paidBy}
                            items={items}
                            totalAmount={totalAmount}
                        />
                    </div>
                </main>
            </div>
            <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 flex justify-center print:hidden">
                 <button
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-2 w-full max-w-md px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-transform transform hover:scale-105"
                >
                    <PrintIcon className="h-6 w-6" />
                    <span>Print Invoice</span>
                </button>
            </div>
        </div>
    );
};

export default App;
