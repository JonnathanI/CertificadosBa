// src/components/TrainersList.tsx
import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import axiosInstance from '../api/apiClient';
import TopBar from './TopBar'; // Importa TopBar

const { Title } = Typography;

interface Trainer {
  id: number;
  name: string;
  area: string;
}

const TrainersList: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axiosInstance.get('/trainer');
        setTrainers(response.data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };
    fetchTrainers();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Área', dataIndex: 'area', key: 'area' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <TopBar />
      <div style={{ flex: 1, padding: '20px', paddingTop: '130px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#0094A2' }}>
          Lista de Disertadores
        </Title>
        <Table dataSource={trainers} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default TrainersList;