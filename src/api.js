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

