// src/components/Dashboard.tsx
import React from 'react';
import { Card, Space, Typography, Tooltip } from 'antd';
import { UserOutlined, BookOutlined, TeamOutlined, FileTextOutlined, FileAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar'; // Importa TopBar

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <TopBar /> {/* Agrega TopBar */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: '20px', color: '#0094A2' }}>Panel de Control</Title>
          <Space size="large">
            <Tooltip title="Estudiantes">
              <Card hoverable style={{ textAlign: 'center', width: 150, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onClick={() => handleNavigate('/students')}>
                <UserOutlined style={{ fontSize: '3em', marginBottom: '10px', color: '#1B8989' }} />
                Estudiantes
              </Card>
            </Tooltip>
            <Tooltip title="Cursos">
              <Card hoverable style={{ textAlign: 'center', width: 150, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onClick={() => handleNavigate('/courses')}>
                <BookOutlined style={{ fontSize: '3em', marginBottom: '10px', color: '#1B8989' }} />
                Cursos
              </Card>
            </Tooltip>
            <Tooltip title="Disertadores">
              <Card hoverable style={{ textAlign: 'center', width: 150, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onClick={() => handleNavigate('/disertadores')}>
                <TeamOutlined style={{ fontSize: '3em', marginBottom: '10px', color: '#1B8989' }} />
                Disertadores
              </Card>
            </Tooltip>
            <Tooltip title="Certificados">
              <Card hoverable style={{ textAlign: 'center', width: 150, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onClick={() => handleNavigate('/certificados')}>
                <FileTextOutlined style={{ fontSize: '3em', marginBottom: '10px', color: '#1B8989' }} />
                Certificados
              </Card>
            </Tooltip>
            <Tooltip title="Generar Certificados">
              <Card hoverable style={{ textAlign: 'center', width: 150, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} onClick={() => handleNavigate('/generar-certificados')}>
                <FileAddOutlined style={{ fontSize: '3em', marginBottom: '10px', color: '#1B8989' }} />
                Generar Certificados
              </Card>
            </Tooltip>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;