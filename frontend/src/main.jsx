import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Menu from './components/Menu.jsx';
import App from './App.jsx'; 
import CuentasAhorro from './CuentasAhorro.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <div className="app-container d-flex">
        
        <Menu />

        <div className="content-container flex-grow-1">
          <Routes>
            <Route path="/" element={<App />} /> 
            <Route path="/cuentas-ahorro" element={<CuentasAhorro />} />
          </Routes>
        </div>
      </div>
    </Router>
  </StrictMode>
);
