// src/components/CertificatesList.tsx
import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import axiosInstance from '../api/apiClient';
import TopBar from './TopBar'; // Importa TopBar

const { Title } = Typography;

interface Certificate {
  id: number;
  hours: string;
  date: string;
  course: {
    id: number;
    name: string;
  };
}

const CertificatesList: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axiosInstance.get('/certificate');
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };
    fetchCertificates();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Horas', dataIndex: 'hours', key: 'hours' },
    { title: 'Fecha', dataIndex: 'date', key: 'date' },
    { title: 'Curso', dataIndex: ['course', 'name'], key: 'course' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <TopBar />
      <div style={{ flex: 1, padding: '20px', paddingTop: '130px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#0094A2' }}>
          Lista de Certificados
        </Title>
        <Table dataSource={certificates} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default CertificatesList;