import React, { createContext, useContext, useEffect, useState } from "react"

const ApiKeyContext = createContext(undefined);

export function ApiKeyProvider({ children }) {
    const [apiKey, setApiKey] = useState(() => {
        try {
            return typeof window !== "undefined" ? localStorage.getItem("user_api_key") || "" : "";
        } catch {
            return "";
        }
    });

    useEffect(() => {
        try {
            if (apiKey) localStorage.setItem("user_api_key", apiKey);
            else localStorage.removeItem("user_api_key");
        } catch { }
    }, [apiKey]);

    const clearApiKey = () => setApiKey("");

    return (
        <ApiKeyContext.Provider value={{ apiKey, setApiKey, clearApiKey }}>
            {children}
        </ApiKeyContext.Provider>
    );
}

export function useApiKey() {
    const ctx = useContext(ApiKeyContext);
    if (!ctx) throw new Error("useAPIKey must be used within ApiKeyProvider");
    return ctx;
}
