// src/components/GenerateCertificate.tsx
import React, { useState } from 'react';
import { Input, Button, Typography, Space, Select, message } from 'antd';
import axiosInstance from '../api/apiClient';
import TopBar from './TopBar';
import FileSaver from 'file-saver';

const { Title } = Typography;
const { Option } = Select;

const GenerateCertificate: React.FC = () => {
    const [dni, setDni] = useState('');
    const [student, setStudent] = useState<any>(null);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [hours, setHours] = useState('');

    const handleSearchStudent = async () => {
        try {
            const response = await axiosInstance.get(`/student/student-details/${dni}`);
            setStudent(response.data);
            setDni(''); // Limpia el campo DNI después de la búsqueda exitosa
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching student:', error);
            message.error('Estudiante no encontrado');
        }
    };

    const handleCourseChange = (value: any, option: any) => {
        setSelectedCourse(option.course);
        setHours(option.course.hours);
    };

    const handleGenerateCertificate = async () => {
        if (!student || !selectedCourse) {
            message.error('Por favor, busca un estudiante y selecciona un curso.');
            return;
        }

        try {
            const response = await axiosInstance.get(
                `/api/certificado/generate/${student.student.name}/${selectedCourse.name}/${hours}`,
                { responseType: 'blob' }
            );
            FileSaver.saveAs(response.data, 'certificate.pdf');
            message.success('Certificado generado y descargado.');
        } catch (error) {
            console.error('Error generating certificate:', error);
            message.error('Error al generar el certificado.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
            <TopBar />
            <div style={{ flex: 1, padding: '20px', paddingTop: '130px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#0094A2' }}>
                    Generar Certificado
                </Title>
                <Space direction="vertical" style={{ width: '300px' }}>
                    <Input placeholder="DNI del estudiante" value={dni} onChange={(e) => setDni(e.target.value)} />
                    <Button type="primary" onClick={handleSearchStudent}>Buscar Estudiante</Button>

                    {student && (
                        <>
                            <div>
                                <h3>Estudiante: {student.student.name}</h3>
                            </div>
                            <Select
                                placeholder="Seleccionar Curso"
                                onChange={handleCourseChange}
                                style={{ width: '100%' }}
                            >
                                {student.courses.map((course: any) => (
                                    <Option key={course.id} value={course.id} course={course}>
                                        {course.name}
                                    </Option>
                                ))}
                            </Select>
                            <Input placeholder="Horas" value={hours} disabled />
                            <Button type="primary" onClick={handleGenerateCertificate}>Generar Certificado</Button>
                        </>
                    )}
                </Space>
            </div>
        </div>
    );
};

export default GenerateCertificate;