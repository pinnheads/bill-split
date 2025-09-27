import './App.css'
import APIKey from './APIKey'
import Calculator from './Calculator'
import NotificationModal from './NotificationModal'
import { useApiKey } from './ApiKeyProvider'
import { NotificationProvider } from './NotificationProvider'

function App() {
    const { apiKey } = useApiKey();
    return (
        <NotificationProvider>
            <header className="text-center">
                <h1 className="text-4xl font-bold text-indian-red ">Smart Bill Splitter</h1>
                <p className="text-xl text-silver mt-1">Upload a receipt, let AI extract the items, and split the cost effortlessly.</p>
            </header>

            {!apiKey ? <APIKey /> : <Calculator />}
            <NotificationModal />
        </NotificationProvider>
    )
}

export default App
