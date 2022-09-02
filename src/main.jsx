import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'

import { JournalApp } from './JournalApp'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <JournalApp />
        </BrowserRouter>
    </React.StrictMode>
)
