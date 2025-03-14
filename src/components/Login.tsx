// src/components/Login.tsx
import React, { useState } from 'react';
import { Input, Button, Typography, Space, message } from 'antd';
import axiosInstance from '../api/apiClient';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar'; // Importa TopBar

const { Title } = Typography;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      });

      const token = response.data.jwt;
      localStorage.setItem('token', token);
      message.success('Inicio de sesión exitoso');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      message.error('Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <TopBar /> {/* Agrega TopBar */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, paddingTop: '130px' }}> {/* Añade paddingTop para compensar TopBar */}
        <div style={{ width: '350px', padding: '30px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)' }}> {/* Aumenta width, padding, borderRadius y boxShadow */}
          <Title level={2} style={{ textAlign: 'center', marginBottom: '25px', fontWeight: 'bold', color: '#0094A2', fontSize: '28px' }}> {/* Aumenta level, marginBottom y fontSize */}
            Iniciar Sesión
          </Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ border: '1px solid #ccc', borderRadius: '6px', padding: '12px' }} // Aumenta padding y borderRadius
            />
            <Input.Password
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ border: '1px solid #ccc', borderRadius: '6px', padding: '12px' }} // Aumenta padding y borderRadius
            />
            <Button type="primary" onClick={handleLogin} style={{ backgroundColor: '#0094A2', border: 'none', padding: '12px 24px', fontSize: '16px' }}> {/* Aumenta padding y fontSize */}
              Iniciar Sesión
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Login;