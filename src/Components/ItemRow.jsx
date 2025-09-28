import React from 'react';

export default function ItemRow({ item, people, onUpdate, onRemove }) {
    if (!item) {
        return null
    }

    return (
        <div className='flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-md'>
            {/* Input for the item name */}
            <input
                type='text'
                value={item.name}
                onChange={(e) => onUpdate(item.id, { name: e.target.value })}
                placeholder='Item Name'
                className='flex-grow w-full sm:w-auto bg-gray-100 rounded px-2 py-1 border border-yellow-green focus:outline-none focus:ring-1 focus:ring-yellow-green'
            />
            {/* Input for the item price */}
            <input
                type='number'
                value={item.price}
                onChange={(e) => onUpdate(item.id, { price: e.target.value })}
                placeholder='0.00'
                className='w-24 bg-gray-100 rounded px-2 py-1 border border-yellow-green text-right focus:outline-none focus:ring-1 focus:ring-yellow-green'
            />
            {/* Dropdown to assign the item to a person */}
            <select
                value={item.assignedTo || ''}
                onChange={(e) => onUpdate(item.id, { assignedTo: e.target.value })}
                className='w-full sm:w-32 bg-gray-100 rounded px-2 py-1 border border-yellow-green focus:outline-none focus:ring-1 focus:ring-yellow-green'
            >
                <option value="">Assign to...</option>
                <option value="common">Common</option>
                {people.map(person => (
                    <option key={person.id} value={person.name}>{person.name}</option>
                ))}
            </select>
            {/* Button to remove the item */}
            <button onClick={() => onRemove(item.id)} className='bg-indian-red/20 rounded text-indian-red/90 hover:text-indian-red font-bold text-xl px-2'>
                ×
            </button>
        </div>
    )
}
