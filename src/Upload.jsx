import React from 'react';

export default function Upload({ files, setFiles }) {
    const removeFile = (fileName) => {
        setFiles(prev => prev.filter(p => p.name !== fileName))
    }

    const onPick = (e) => {
        setFiles(Array.from(e.target.files || []))
    }

    return (
        <>
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
        </>
    )
}
