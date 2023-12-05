import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './routes/Login.jsx';
import Dashboard from './routes/Dashboard';
import Cliente from './routes/Cliente';
import VendasGeral from './routes/VendasGeral';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cliente/:id" element={<Cliente/>} />
        <Route path="/vendas" element={<VendasGeral />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;