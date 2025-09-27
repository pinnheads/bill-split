import React, { useState } from "react";

import People from "./People";
import Upload from "./Upload.jsx";
import Items from "./Items.jsx";
import ResultsModal from "./ResultsModal.jsx";

import { useApiKey } from "./ApiKeyProvider.jsx";

export default function Calculator() {

    const [people, setPeople] = useState([]);
    const [files, setFiles] = useState([]);
    const [items, setItems] = useState([]);
    const [results, setResults] = useState(null);

    const { apiKey, clearApiKey } = useApiKey();
    const maskedKey = apiKey.length > 3
        ? "•".repeat(apiKey.length - 3) + apiKey.slice(-3) // hide everything except last 3
        : apiKey;

    const closeModal = () => {
        setResults(null)
    }

    const calculateSplit = () => {
        let totals = people.reduce((acc, person) => ({ ...acc, [person.name]: 0 }), {});
        let commonTotal = 0;
        // let unassignedItems = false;

        // Calculate totals from items in state
        items.forEach(item => {
            const price = parseFloat(item.price) || 0;
            if (item.assignedTo === 'common') {
                commonTotal += price;
            } else {
                if (totals.hasOwnProperty(item.assignedTo)) {
                    totals[item.assignedTo] += price;
                }
            }
        })
        // Calculate and add the common share
        const commonShare = people.length > 0 ? commonTotal / people.length : 0;
        Object.keys(totals).forEach(person => {
            totals[person] += commonShare;
        })

        setResults(totals);
    }

    return (
        <div className="space-y-6">
            <div className="border border-charcoal/20 text-charcoal justify-between font-semibold px-3 py-1 rounded-sm flex flex-wrap items-center gap-2">
                <span>Current API Key: {maskedKey}</span>
                <button type="button" className="bg-indian-red/20 text-indian-red p-1 text-sm rounded-sm" onClick={clearApiKey}>Clear</button>
            </div>
            <People people={people} setPeople={setPeople} />
            {apiKey ? <Upload files={files} setFiles={setFiles} /> : <></>}
            <Items items={items} setItems={setItems} people={people} />
            <div className="text-center">
                <button onClick={calculateSplit} className="w-full bg-indian-red/20 text-indian-red font-bold text-lg px-8 py-3 rounded-lg hover:bg-indian-red/30 transition-all">
                    Calculate Split
                </button>
            </div>
            <ResultsModal results={results} onClose={closeModal} />
        </div>
    )
}
