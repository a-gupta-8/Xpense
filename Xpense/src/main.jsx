import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="bg-mauve-300 min-h-screen flex items-center justify-center ">
     <App />
    </div>
  </StrictMode>,
)
