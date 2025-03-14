// src/components/StudentsList.tsx
import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import axiosInstance from '../api/apiClient';
import TopBar from './TopBar'; // Importa TopBar

const { Title } = Typography;

interface Student {
  id: number;
  name: string;
  dni: string;
}

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get('/student');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'DNI', dataIndex: 'dni', key: 'dni' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <TopBar />
      <div style={{ flex: 1, padding: '20px', paddingTop: '130px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#0094A2' }}>
          Lista de Estudiantes
        </Title>
        <Table dataSource={students} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default StudentsList;