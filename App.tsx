import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InvoiceGenerator from './components/InvoiceGenerator';
import InvoiceHistory from './components/InvoiceHistory';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
                <div className="container mx-auto p-4 md:p-8">
                    <header className="text-center mb-8 relative">
                        <div className="absolute right-0 top-0 flex items-center gap-4">
                            <nav className="flex gap-4">
                                <Link to="/" className="text-emerald-700 dark:text-emerald-500 hover:underline font-medium">Generator</Link>
                                <Link to="/history" className="text-emerald-700 dark:text-emerald-500 hover:underline font-medium">History</Link>
                            </nav>
                            <ThemeToggle />
                        </div>
                        <h1 className="text-4xl font-bold text-emerald-700 dark:text-emerald-500">Invoice Generator</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Create and print invoices for Global Village Academy</p>
                    </header>

                    <Routes>
                        <Route path="/" element={<InvoiceGenerator />} />
                        <Route path="/history" element={<InvoiceHistory />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
