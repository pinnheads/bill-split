const baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models'

export const validateApiKey = async (keyToTest) => {
    if (!keyToTest) return false;

    const reqUrl = `${baseUrl}?key=${keyToTest}`;
    try {
        const response = await fetch(reqUrl);
        return response.ok;
    } catch (error) {
        console.error("API Key Validation request Failed:", error);
        return false;
    }
}

export const callVisionApi = async (base64Data, apiKey) => {
    const reqUrl = `${baseUrl}/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        "contents": [{
            "parts": [
                {
                    "text": `Analyze this receipt image. The receipt can be in any language with any decimal system (comma or period). Provide a JSON object with two keys: "currency" and "items". - For "currency", detect the currency and provide its three-letter ISO code (e.g., "EUR", "USD", "GBP"). - For "items", provide an array of objects. Each object must have a "name" (string) and a "price" (number, normalized to use a period for the decimal). Extract all line items, including discounts or returns as items with negative prices. Do not include sub-totals, taxes, or payment info. Ensure the final output is only the JSON object.`
                },
                {
                    "inline_data": {
                        "mime_type": "image/jpeg",
                        "data": base64Data
                    }
                }
            ]
        }]
    }

    const response = await fetch(reqUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error?.message || 'An unknown error occurred'}`);
    }

    const result = await response.json();
    console.log(result)
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error("The AI did not return any text. The receipt might be unclear or unreadable");
    }

    try {
        const jsonString = text.match(/```json\n([\s\S]*?)\n```/)[1];
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse JSON from AI response.", text);
        throw new Error("The AI returned a response in an invalid format. Please try scanning again");
    }

}

