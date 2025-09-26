import React, { useState } from "react";

export default function Calculator() {

    const [people, setPeople] = useState([]);
    const [name, setName] = useState("");

    const [files, setFiles] = useState([]);

    const handleAddPerson = () => {
        setPeople(prev => [...people, name])
        setName("")
    }

    const removePerson = (personName) => {
        setPeople(prev => prev.filter(p => p !== personName))
    }

    const removeFile = (fileName) => {
        setFiles(prev => prev.filter(p => p.name !== fileName))
    }

    const onPick = (e) => {
        setFiles(Array.from(e.target.files || []))
    }

    return (
        <div className="space-y-6">
            {/* People Management */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h2 className="text-xl font-semibold text-charcoal">1. Add People</h2>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input value={name} onChange={(event) => {
                        setName(event.target.value)
                    }} type="text" placeholder="Enter a name" className="flex-grow bg-white text-charcoal placeholder-silver rounded-md px-4 py-2 border border-charcoal focus:outline-none focus:ring-2 focus:ring-yellow-green"></input>
                    <button onClick={handleAddPerson} className="bg-yellow-green text-charcoal font-bold px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">Add Person</button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                    {people.length > 0 ?
                        people.map(name =>
                            <div key={name} className="capitalize bg-indian-red/20 text-indian-red text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2">
                                <span>{name}</span>
                                <button type="button" onClick={() => removePerson(name)}>×</button>
                            </div>
                        ) : <></>
                    }
                </div>
            </div>

            {/* File Upload */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h2 className="text-xl font-semibold text-charcoal">2. Upload Receipt(s)</h2>
                <input onChange={onPick} type="file" accept="image/*" multiple className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-green file:text-charcoal hover:file:bg-opacity-90 cursor-pointer "></input>
                <div className="flex flex-wrap gap-2 pt-2">
                    {files.length > 0 ?
                        files.map(file =>
                            <div key={file.name} className="bg-indian-red/20 text-indian-red text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2">
                                <span>{file.name}</span>
                                <button type="button" onClick={() => removeFile(file.name)}>×</button>
                            </div>
                        ) : <></>
                    }
                </div>
            </div>

            {/* Item List */}
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-charcoal">3. Add Items</h2>
                    <button className="text-sm bg-yellow-green text-charcoal font-bold px-3 py-1 rounded-md hover:bg-charcoal/30">+</button>
                </div>
                <div className="space-y-3">
                    <p className="text-gray-400 text-center py-4">Items will appear here after scanning a reciept</p>
                </div>
            </div>

        </div>
    )
}
