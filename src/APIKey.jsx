import React, { useEffect } from "react";
import { useState } from "react";
import { useApiKey } from "./ApiKeyProvider";

export default function ApiKey() {

    const { apiKey, setApiKey, clearApiKey } = useApiKey();
    const [key, setKey] = useState(apiKey || "");

    const handleSubmit = () => {
        setApiKey(key.trim());
    }

    useEffect(() => {
        setKey(apiKey || "");
    }, [apiKey]);

    return (
        <>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h2 className="text-xl font-semibold text-charcoal">Enter Your API Key</h2>
                <p className="text-silver text-sm"  >You need a Google AI API Key to proceed. Get one from
                    <a href="https://aistudio.google.com/" target="_blank" className="text-blue-500 hover:underline"> Google AI Studio</a>.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input value={key} onChange={(e) => {
                        setKey(e.target.value)
                    }} className="flex-grow bg-white text-silver placeholder-silver rounded-md px-4 py-2 border border-charcoal focus:outline-none focus:ring-2 focus:ring-yellow-green" type="password" placeholder="Enter Google AI Api Key"></input>
                    <button className="bg-yellow-green text-charcoal font-bold px-6 py-2 rounded-md hover:bg-opacity-90 hover:transition-colors" onClick={handleSubmit} type="submit">Submit</button>
                    <button className="bg-indian-red/20 text-indian-red font-bold px-6 py-2 rounded-md hover:bg-opacity-90 hover:transition-colors" onClick={clearApiKey} type="submit">Clear</button>
                </div>
            </div>
        </>
    )
}
