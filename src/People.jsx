import React, { useState } from 'react';

import { newId } from './utils';

export default function People({ people, setPeople }) {

    const newPerson = { name: "" }
    const [person, setPerson] = useState(newPerson);

    const handleAddPerson = () => {
        const name = person.name.trim();
        if (!name) return;

        setPeople(prev => {
            const next = [...prev, { id: newId(), name }];
            return next;
        })
        setPerson(newPerson)
    }

    const removePerson = (personId) => {
        setPeople(prev => prev.filter(p => p.id !== personId))
    }

    return (
        <>
            {/* People Management */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h2 className="text-xl font-semibold text-charcoal">1. Add People</h2>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input value={person.name} onChange={(event) => {
                        setPerson({ name: event.target.value })
                    }} type="text" placeholder="Enter a name" className="flex-grow bg-white text-charcoal placeholder-silver rounded-md px-4 py-2 border border-charcoal focus:outline-none focus:ring-2 focus:ring-yellow-green"></input>
                    <button onClick={handleAddPerson} className="bg-yellow-green text-charcoal font-bold px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">Add Person</button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                    {people?.length ? (
                        people.map((p) => (
                            <div key={p.id} className="capitalize bg-indian-red/20 text-indian-red text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2">
                                <span>{p.name}</span>
                                <button type="button" onClick={() => removePerson(p.id)}>×</button>
                            </div>))
                    ) : <></>
                    }
                </div>
            </div>
        </>
    )
}
