import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import 'leaflet/dist/leaflet.css'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="dark"
      toastStyle={{
        background: '#1a1a2e',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
      }}
    />
  </StrictMode>,
)
