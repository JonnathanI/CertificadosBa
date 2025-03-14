// src/types/student.ts
export interface Student {
    id: number;
    name: string;
    dni: string;
  }
  
  export interface Course {
    id: number;
    name: string;
    rol: string;
    link: string;
    code: string;
    aim: string;
    contents: string;
    students: Student;
    trainer: any; // Ajusta según tu tipo de Trainer
  }
  
  export interface StudentWithCourses {
    student: Student;
    courses: Course[];
  }