import { Routes, Route, Navigate } from 'react-router-dom';
import { useToast, Container, Box, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';

import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import StudentDetailsPage from './pages/StudentDetailsPage';
import AddStudentPage from './pages/AddStudentPage';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isLoading, authError } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (authError) {
      toast({
        title: 'Authentication Error',
        description: authError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [authError, toast]);

  if (isLoading) {
    return (
      <Container centerContent>
        <Box mt={10}>
          <Spinner size="xl" color="blue.500" />
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/students/:id" 
          element={
            <ProtectedRoute>
              <StudentDetailsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-student" 
          element={
            <ProtectedRoute>
              <AddStudentPage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;