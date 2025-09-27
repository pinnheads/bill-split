import React, { useState } from "react";

import People from "./People";
import Upload from "./Upload.jsx";
import Items from "./Items.jsx";

export default function Calculator() {

    const [people, setPeople] = useState([]);

    const [files, setFiles] = useState([]);
    const [items, setItems] = useState([]);





    return (
        <div className="space-y-6">
            <People people={people} setPeople={setPeople} />
            <Upload files={files} setFiles={setFiles} />
            <Items items={items} setItems={setItems} people={people} />
        </div>
    )
}
