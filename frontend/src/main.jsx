import {StrictMode} from "react";
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import './index.css'
import App from './App.jsx'

// Import our custom CSS

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>

  </StrictMode>,
)
