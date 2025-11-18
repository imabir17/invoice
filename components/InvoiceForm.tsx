
import React from 'react';
import type { InvoiceItem, ReceiverInfo } from '../types';
import { TrashIcon } from './icons';

interface InvoiceFormProps {
    receiver: ReceiverInfo;
    setReceiver: React.Dispatch<React.SetStateAction<ReceiverInfo>>;
    paidBy: string;
    setPaidBy: (type: string) => void;
    items: InvoiceItem[];
    setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
    receiver,
    setReceiver,
    paidBy,
    setPaidBy,
    items,
    setItems,
}) => {

    const handleReceiverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReceiver(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
        const newItems = [...items];
        if (field === 'amount') {
            const amount = parseFloat(value as string);
            newItems[index][field] = isNaN(amount) ? 0 : amount;
        } else {
            newItems[index][field] = value as string;
        }
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { id: Date.now().toString(), description: '', amount: 0 }]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div className="p-8 space-y-8 bg-white rounded-lg shadow-sm">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Receiver Information</h2>
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={receiver.name}
                        onChange={handleReceiverChange}
                        placeholder="Receiver Name"
                        className="w-full px-3 py-2 bg-white text-gray-900 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                        type="text"
                        name="address"
                        value={receiver.address}
                        onChange={handleReceiverChange}
                        placeholder="Receiver Address"
                        className="w-full px-3 py-2 bg-white text-gray-900 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={receiver.phone}
                        onChange={handleReceiverChange}
                        placeholder="Receiver Phone Number"
                        className="w-full px-3 py-2 bg-white text-gray-900 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                    />
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Paid By</h2>
                <input
                    type="text"
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                    placeholder="Payer's name (e.g., John Doe)"
                    className="w-full px-3 py-2 bg-white text-gray-900 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                />
            </div>

            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Invoice Items</h2>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div key={item.id} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                placeholder="Description"
                                className="w-full px-3 py-2 bg-white text-gray-900 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                            />
                            <input
                                type="number"
                                value={item.amount === 0 ? '' : item.amount}
                                onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                                placeholder="Amount"
                                className="w-48 px-3 py-2 bg-white text-gray-900 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                            />
                            <button
                                onClick={() => removeItem(index)}
                                className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                aria-label="Remove item"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    onClick={addItem}
                    className="mt-4 w-full px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-md hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                    + Add Item
                </button>
            </div>
        </div>
    );
};

export default InvoiceForm;
