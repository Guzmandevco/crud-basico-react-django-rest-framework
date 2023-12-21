import { DataContextProvider } from './context/DataContext.jsx';
import { LoggingContextProvider } from './context/LogginContext.jsx';
// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoggingContextProvider>
  <DataContextProvider>
    <App />
  </DataContextProvider>
  </LoggingContextProvider>
)
