import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import axiosInstance from '../api/apiClient';
import TopBar from './TopBar';
import axios from 'axios'; // Importa axios para verificar si es un error de Axios

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
    const [loading, setLoading] = useState(true); // Agrega estado de carga
    const [error, setError] = useState<string | null>(null); // Agrega estado de error

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true); // Inicia la carga
            setError(null); // Resetea el error
            try {
                const response = await axiosInstance.get('/course');
                setCourses(response.data);
                console.log("Datos de la API:", response.data); // Verifica los datos
            } catch (error) {
                console.error('Error fetching courses:', error);
                if (axios.isAxiosError(error) && error.response) {
                    console.error('Axios error details:', error.response.data);
                    setError(`Error al obtener los cursos: ${error.response.data.message || 'Detalles no disponibles'}`);
                } else {
                    setError('Error al obtener los cursos. Por favor, inténtelo de nuevo más tarde.');
                }
            } finally {
                setLoading(false); // Finaliza la carga
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
                {loading && <p style={{ textAlign: 'center' }}>Cargando cursos...</p>}
                {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
                {!loading && !error && <Table dataSource={courses} columns={columns} rowKey="id" />}
            </div>
        </div>
    );
};

export default CoursesList;