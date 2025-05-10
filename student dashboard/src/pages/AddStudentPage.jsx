import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Select,
  VStack,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useStudents } from '../contexts/StudentContext';

export default function AddStudentPage() {
  const initialFormState = {
    name: '',
    email: '',
    course: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    gpa: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { courses, addStudent, error: apiError } = useStudents();
  const navigate = useNavigate();
  const toast = useToast();
  
  // Filter out the "ALL" option from courses
  const availableCourses = courses.filter(course => course.id !== 'ALL');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate course
    if (!formData.course) {
      newErrors.course = 'Course is required';
    }
    
    // Validate GPA
    if (formData.gpa) {
      const gpa = parseFloat(formData.gpa);
      if (isNaN(gpa) || gpa < 0 || gpa > 4.0) {
        newErrors.gpa = 'GPA must be between 0.0 and 4.0';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Format the student data
      const studentData = {
        ...formData,
        gpa: formData.gpa ? parseFloat(formData.gpa) : 0,
        image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 10) + 1}.jpg`
      };
      
      const result = await addStudent(studentData);
      
      if (result) {
        toast({
          title: 'Success',
          description: 'Student has been added successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add student',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl">Add New Student</Heading>
      </Box>

      {apiError && (
        <Alert status="error" mb={6} borderRadius="md">
          <AlertIcon />
          {apiError}
        </Alert>
      )}

      <Box 
        as="form" 
        onSubmit={handleSubmit}
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="md"
      >
        <VStack spacing={4}>
          <FormControl isInvalid={errors.name} isRequired>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email} isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.course} isRequired>
            <FormLabel htmlFor="course">Course</FormLabel>
            <Select
              id="course"
              name="course"
              placeholder="Select course"
              value={formData.course}
              onChange={handleChange}
            >
              {availableCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.course}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="enrollmentDate">Enrollment Date</FormLabel>
            <Input
              id="enrollmentDate"
              name="enrollmentDate"
              type="date"
              value={formData.enrollmentDate}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isInvalid={errors.gpa}>
            <FormLabel htmlFor="gpa">GPA (0.0 - 4.0)</FormLabel>
            <Input
              id="gpa"
              name="gpa"
              type="number"
              step="0.1"
              min="0"
              max="4.0"
              value={formData.gpa}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.gpa}</FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            width="full"
            isLoading={isSubmitting}
          >
            Add Student
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}