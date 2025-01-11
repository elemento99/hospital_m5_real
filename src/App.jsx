import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HospitalContextProvider } from './context/HospitalContext';
import NavigationBar from './components/NavigationBar';
import Home from './assets/pages/Home';
import Login from './assets/pages/Login';
import NotFound from './assets/pages/NotFound';
import Team from './assets/pages/Team';
import Appointments from './assets/pages/Appointments';
import Register from './assets/pages/Register';
import Admin from './assets/pages/Admin';

function App() {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Asumimos que el rol está guardado en el localStorage

  return (
    <HospitalContextProvider>
      <NavigationBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Ruta protegida para Admin */}
          <Route 
            path="/admin" 
            element={token && userRole === 'admin' ? <Admin /> : <Navigate to="/login" />} 
          />

          {/* Otras rutas */}
          <Route path="/appointments" element={<Appointments />} />
          
          {/* Ruta no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </HospitalContextProvider>
  );
}

export default App;
