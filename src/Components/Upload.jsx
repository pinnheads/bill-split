import React from "react";

import { fileToBase64, newId } from '../Utils/utils';

export default function Upload({ files, setFiles, processFiles }) {


  const removeFile = (fileName) => {
    setFiles(prev => prev.filter(p => p.name !== fileName))
  }

  const onPick = async (e) => {
    const originalFiles = Array.from(e.target.files);
    const base64List = await Promise.all(
      originalFiles.map(
        async (file) => ({
          id: newId(),
          name: file.name,
          data: await fileToBase64(file)
        })
      )
    )
    setFiles(prev => [...prev, ...base64List])
    e.target.value = ''
  }

  return (
    <>
      {/* File Upload */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold text-charcoal">2. Upload Receipt(s)</h2>
          <button onClick={processFiles} className="text-sm bg-yellow-green text-charcoal font-bold px-3 py-1 rounded-md hover:bg-charcoal/30">Scan</button>
        </div>
        <input onChange={onPick} type="file" accept="image/*" multiple className="block w-full p-4 rounded-sm text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-charcoal file:text-white hover:file:bg-opacity-90 cursor-pointer border border-dashed border-charcoal"></input>
        <p className='text-silver text-sm'>Once you're done adding file(s). Click on the Scan button to process files through AI.</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {files.length > 0 ?
            files.map(file =>
              <div key={file.id} className="bg-indian-red/20 text-indian-red text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2">
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
