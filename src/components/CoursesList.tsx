// src/components/CoursesList.tsx
import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import axiosInstance from '../api/apiClient';
import TopBar from './TopBar'; // Importa TopBar

const { Title } = Typography;

interface Course {
  id: number;
  name: string;
  rol: string;
  link: string;
  code: string;
  aim: string;
  contents: string;
}

const CoursesList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/course');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Rol', dataIndex: 'rol', key: 'rol' },
    { title: 'Link', dataIndex: 'link', key: 'link' },
    { title: 'Código', dataIndex: 'code', key: 'code' },
    { title: 'Objetivo', dataIndex: 'aim', key: 'aim' },
    { title: 'Contenido', dataIndex: 'contents', key: 'contents' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <TopBar />
      <div style={{ flex: 1, padding: '20px', paddingTop: '130px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#0094A2' }}>
          Lista de Cursos
        </Title>
        <Table dataSource={courses} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default CoursesList;