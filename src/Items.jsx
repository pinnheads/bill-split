import React from "react";

import ItemRow from "./ItemRow";

export default function Items({ items, setItems, people }) {

    const addItem = ({ id, name, price, assignedTo }) => {
        setItems(prev => [...prev, { name, price, assignedTo }])
    }

    const removeItem = ({ id, name, price, assignedTo }) => {
        setItems(prev => prev.filter(p => p.name !== name))
    }

    return (
        <>
            {/* Item List */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-charcoal">3. Add Items</h2>
                    <button className="text-sm bg-yellow-green text-charcoal font-bold px-3 py-1 rounded-md hover:bg-charcoal/30">+</button>
                </div>
                <div className="space-y-3">
                    <p className="text-gray-400 text-center py-4">Items will appear here after scanning a reciept</p>
                </div>
                <ItemRow item={items} people={people} onUpdate={addItem} onRemove={removeItem} />
            </div>
        </>
    )
}
