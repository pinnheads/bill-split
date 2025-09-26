import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApiKeyProvider } from './ApiKeyProvider.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ApiKeyProvider>
            <App />
        </ApiKeyProvider>
    </StrictMode>,
)
