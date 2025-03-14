// src/components/StudentSearch.tsx
import React, { useState, useEffect } from 'react';
import { Input, Button, List, Modal, Typography, Space, Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axiosInstance from '../api/apiClient';
import { Course, StudentWithCourses } from '../types/student';
import TopBar from './TopBar';

const { Title, Text } = Typography;

const StudentSearch: React.FC = () => {
    const [dni, setDni] = useState('');
    const [studentData, setStudentData] = useState<StudentWithCourses | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [showLoginLinkBelowButton, setShowLoginLinkBelowButton] = useState(true);
    const [certificateDate, setCertificateDate] = useState<string | null>(null);

    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/student/student-details/${dni}`);
            setStudentData(response.data);
            setDni('');
            setShowLoginLinkBelowButton(false);
        } catch (error) {
            console.error('Error fetching student data:', error);
            setStudentData(null);
            setShowLoginLinkBelowButton(true);
        }
    };

    const handleCourseClick = (course: Course) => {
        setSelectedCourse(course);
        setModalVisible(true);
    };

    const handleDownloadClick = (e: React.MouseEvent, course: Course) => {
        e.stopPropagation();
        console.log(`Descargando certificado para ${course.name}`);
    };

    useEffect(() => {
        if (selectedCourse && selectedCourse.id) {
            axiosInstance.get(`/course/details/${selectedCourse.id}`)
                .then(response => {
                    setCertificateDate(response.data?.certificateDate || null);
                })
                .catch(error => {
                    console.error('Error fetching certificate date:', error);
                    setCertificateDate(null);
                });
        } else {
            setCertificateDate(null);
        }
    }, [selectedCourse]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
            <TopBar />
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingTop: '130px' }}>
                <div style={{ width: '100%', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
                    <Title level={2} style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                        CERTIFICADOS
                    </Title>
                    <Text style={{ fontSize: '16px', marginBottom: '20px', color: '#0094A2' }}>
                        Búsqueda de certificados por cédula de identidad
                    </Text>

                    <div style={{ marginTop: '20px' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Input
                                placeholder="Cédula"
                                value={dni}
                                onChange={(e) => setDni(e.target.value)}
                                style={{
                                    maxWidth: '300px',
                                    margin: '0 auto',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                }}
                            />
                            <Button
                                type="primary"
                                onClick={handleSearch}
                                style={{
                                    maxWidth: '300px',
                                    margin: '0 auto',
                                    padding: '10px 20px',
                                    backgroundColor: '#0094A2',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                }}
                            >
                                Buscar
                            </Button>
                        </Space>

                        {showLoginLinkBelowButton && (
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <Text>Eres personal Autorizado</Text>
                                <a href="/login" style={{ marginLeft: '10px', color: '#0094A2' }}>Ingrese aquí</a>
                            </div>
                        )}
                    </div>

                    {studentData === null && dni && (
                        <Text style={{ marginTop: '20px', display: 'block' }}>Búsqueda sin resultados</Text>
                    )}

                    {studentData && (
                        <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '4px' }}>
                            <h2>{studentData.student.name}</h2>
                            <p>DNI: {studentData.student.dni}</p>

                            <h3>Cursos:</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {studentData.courses.map((course) => (
                                    <Card
                                        key={course.id}
                                        onClick={() => handleCourseClick(course)}
                                        style={{
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                            padding: '10px 15px',
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ flex: 1 }}>{course.name}</span>
                                            <Button
                                                type="primary"
                                                icon={<DownloadOutlined />}
                                                size="large"
                                                style={{ backgroundColor: '#1B8989', color: 'white', border: 'none' }}
                                                onClick={(e) => handleDownloadClick(e, course)}
                                            />
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {!showLoginLinkBelowButton && studentData && (
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <Text>Eres personal Autorizado</Text>
                            <a href="/Login" style={{ marginLeft: '10px', color: '#0094A2' }}>Ingrese aquí</a>
                        </div>
                    )}
                </div>

                <Modal
                    title={<div style={{ textAlign: 'center' }}>{selectedCourse?.name || "Certificado"}</div>}
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                    style={{ top: 20, width: '80%' }}
                    bodyStyle={{ backgroundColor: '#e0f7fa', padding: '20px' }}
                >
                    {selectedCourse && (
                        <Space direction="vertical" style={{ width: '100%', height: '100%' }}>

                            <Text><b>Cédula:</b> {selectedCourse.students.dni}</Text>
                            <Text><b>Nombre:</b> {selectedCourse.students.name}</Text>
                            <Text><b>Link:</b> {selectedCourse.link}</Text>
                            <Text><b>Participación como:</b> {selectedCourse.rol}</Text>
                            <Text><b>Curso del área de:</b>  {selectedCourse.name}</Text>
                            <Text><b>Realizado del:</b> {certificateDate || selectedCourse.contents}</Text>
                            <Text><b>Capacitador:</b> {selectedCourse.trainer?.name || 'No especificado'}</Text>
                            <Text><b>Código:</b> {selectedCourse.code}</Text>
                            <Text><b>Objetivo:</b> {selectedCourse.aim}</Text>
                            <Text><b>Contenido:</b> {selectedCourse.contents}</Text>

                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <Button onClick={() => setModalVisible(false)}>Regresar</Button>
                            </div>
                        </Space>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default StudentSearch;