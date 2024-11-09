import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './page';
import Login from './pages/login/page';
import Cadastro from './pages/cadastro/page';
import MeusIngressos from './pages/meus-ingressos/page';
import AdminEventos from './pages/admin/eventos/page';
import AdminLogin from './pages/admin/login/page';
import Suporte from './suporte/page';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/meus-ingressos" element={<MeusIngressos />} />
          <Route path="/admin/eventos" element={<AdminEventos />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/suporte" element={<Suporte />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
