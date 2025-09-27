import React from "react";

import ItemRow from "./ItemRow";

export default function Items({ items, setItems, people }) {

    const newManualItem = {
        name: '',
        price: '',
        assignedTo: ''
    }

    const newId = () => {
        return (window.crypto?.randomUUID?.() ?? String(Date.now()));
    }

    const addItem = ({ name, price, assignedTo }) => {
        setItems(prev => [...prev, { id: newId(), name, price, assignedTo }])
    }

    const updateItem = (idToUpdate, updatedField) => {
        setItems(
            currentItems =>
                currentItems.map(item =>
                    item.id == idToUpdate ? { ...item, ...updatedField } : item
                )
        )
    }

    const removeItem = (idToDelete) => {
        setItems(prev => prev.filter(p => p.id !== idToDelete))
    }

    return (
        <>
            {/* Item List */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-charcoal">3. Add Items</h2>
                    <button onClick={() => addItem(newManualItem)} className="text-sm bg-yellow-green text-charcoal font-bold px-3 py-1 rounded-md hover:bg-charcoal/30">+</button>
                </div>
                {items.length ?
                    items.map(item => <ItemRow item={item} people={people} onUpdate={updateItem} onRemove={removeItem} />)
                    :
                    <>
                        <div className="space-y-3">
                            <p className="text-gray-400 text-center py-4">Items will appear here after scanning a reciept</p>
                        </div>
                    </>
                }
            </div>
        </>
    )
}
