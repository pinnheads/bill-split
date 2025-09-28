import React from 'react';

export default function ResultsModal({ results, onClose }) {
    if (!results) {
        return null;
    }

    const totalBill = Object.values(results).reduce((sum, value) => sum + value, 0);

    return (
        <div className="fixed inset-0 bg-charcoal/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
            {/* Modal content */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-silver-400 hover:text-gray-600 text-3xl font-light"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-center mb-6 text-charcoal">Bill Split Results</h2>

                <div className="space-y-3">
                    {Object.entries(results).map(([person, total]) => (
                        <div key={person} className="flex justify-between items-center text-lg p-3 rounded-md even:bg-silver-50">
                            <span className="font-semibold text-silver-700">{person} owes:</span>
                            <span className="font-bold text-charcoal">{total.toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <hr className="my-4 border-t-2 border-silver-200" />

                <div className="flex justify-between items-center text-xl p-2 font-bold">
                    <span className="text-charcoal">Total Bill:</span>
                    <span className="text-yellow-green">{totalBill.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
