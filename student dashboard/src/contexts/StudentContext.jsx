import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/mockApi';

const StudentContext = createContext();

export function useStudents() {
  return useContext(StudentContext);
}

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('ALL');

  // Fetch all students
  const fetchStudents = async (courseFilter = currentFilter) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = courseFilter !== 'ALL' ? { course: courseFilter } : {};
      const response = await api.get('/students', { params });
      setStudents(response.data);
      setCurrentFilter(courseFilter);
    } catch (err) {
      setError('Failed to fetch students');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single student by ID
  const fetchStudentById = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (err) {
      setError('Failed to fetch student details');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Add a new student
  const addStudent = async (studentData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/students', studentData);
      // Refresh the students list
      await fetchStudents();
      return response.data;
    } catch (err) {
      setError('Failed to add student');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch available courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses([{ id: 'ALL', name: 'All Courses' }, ...response.data]);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }
    };
    
    fetchCourses();
  }, []);

  // Initial fetch of students
  useEffect(() => {
    fetchStudents();
  }, []);

  const value = {
    students,
    courses,
    loading,
    error,
    currentFilter,
    fetchStudents,
    fetchStudentById,
    addStudent
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}
