// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentSearch from './components/StudentSearch';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StudentsList from './components/StudentsList';
import CoursesList from './components/CoursesList';
import TrainersList from './components/TrainersList';
import CertificatesList from './components/CertificatesList';
import GenerateCertificate from './components/GenerateCertificate'; // Importa GenerateCertificate

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentsList />} />
        <Route path="/courses" element={<CoursesList />} />
        <Route path="/disertadores" element={<TrainersList />} />
        <Route path="/certificados" element={<CertificatesList />} />
        <Route path="/generar-certificados" element={<GenerateCertificate />} /> {/* Agrega la ruta para GenerateCertificate */}
      </Routes>
    </Router>
  );
}

export default App;