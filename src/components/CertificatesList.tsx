import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import axiosInstance from '../api/apiClient';
import TopBar from './TopBar';
import axios from 'axios';

const { Title } = Typography;

interface Certificate {
    id: number;
    hours: string;
    date: string;
}

const CertificatesList: React.FC = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axiosInstance.get('/certificate');
                setCertificates(response.data);
                console.log("Datos de la API (Certificates):", response.data);
            } catch (error) {
                console.error('Error fetching certificates:', error);
                if (axios.isAxiosError(error) && error.response) {
                    console.error('Axios error details:', error.response.data);
                    setError(`Error al obtener los certificados: ${error.response.data.message || 'Detalles no disponibles'}`);
                } else {
                    setError('Error al obtener los certificados. Por favor, inténtelo de nuevo más tarde.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Horas', dataIndex: 'hours', key: 'hours' },
        { title: 'Fecha', dataIndex: 'date', key: 'date' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
            <TopBar />
            <div style={{ flex: 1, padding: '20px', paddingTop: '130px' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#0094A2' }}>
                    Lista de Certificados
                </Title>
                {loading && <p style={{ textAlign: 'center' }}>Cargando certificados...</p>}
                {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
                {!loading && !error && <Table dataSource={certificates} columns={columns} rowKey="id" />}
            </div>
        </div>
    );
};

export default CertificatesList;