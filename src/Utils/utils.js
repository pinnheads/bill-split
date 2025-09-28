export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = (error) => {
            console.error("Error reading file: ", error);
            reject(new Error("Failed to read the file."));
        }
    })
}

export const newId = () => {
    return (window.crypto?.randomUUID?.() ?? String(Date.now()));
}

