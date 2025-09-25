import './App.css'
import APIKey from './APIKey'

function App() {

    return (
        <>
            <header className="text-center">
                <h1 className="text-6xl font-bold text-indian-red ">Smart Bill Splitter</h1>
                <p className="text-silver mt-1">Upload a receipt, let AI extract the items, and split the cost effortlessly.</p>
            </header>

            <APIKey />
        </>
    )
}

export default App
