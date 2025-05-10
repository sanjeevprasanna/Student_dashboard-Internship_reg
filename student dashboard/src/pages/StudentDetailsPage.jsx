import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  Button,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useStudents } from '../contexts/StudentContext';

export default function StudentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { fetchStudentById } = useStudents();
  
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudentDetails = async () => {
      setLoading(true);
      
      try {
        const data = await fetchStudentById(id);
        if (data) {
          setStudent(data);
        } else {
          setError('Student not found');
          toast({
            title: 'Error',
            description: 'Student not found',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (err) {
        setError('Failed to load student details');
        toast({
          title: 'Error',
          description: 'Failed to load student details',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    getStudentDetails();
  }, [id, fetchStudentById, toast]);

  if (loading) {
    return (
      <Center h="50vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (error || !student) {
    return (
      <Container maxW="container.md" py={8}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error || 'Student not found'}
        </Alert>
        <Button 
          leftIcon={<ArrowBackIcon />} 
          mt={4} 
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <Box mb={5}>
        <Button 
          leftIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/')}
          variant="outline"
        >
          Back to Home
        </Button>
      </Box>

      <Box 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden"
        boxShadow="lg"
        bg="white"
      >
        <Box p={6}>
          <HStack spacing={6} alignItems="flex-start">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={student.image || `https://randomuser.me/api/portraits/lego/1.jpg`}
              alt={`Photo of ${student.name}`}
              objectFit="cover"
            />
            
            <VStack align="flex-start" spacing={4} flex="1">
              <Heading as="h1" size="xl">{student.name}</Heading>
              
              <Badge colorScheme="blue" fontSize="md">
                {student.course}
              </Badge>
              
              <VStack align="flex-start" spacing={2} w="full">
                <Text fontWeight="bold">Email:</Text>
                <Text>{student.email}</Text>
                
                <Text fontWeight="bold">Enrollment Date:</Text>
                <Text>{new Date(student.enrollmentDate).toLocaleDateString()}</Text>
                
                <Text fontWeight="bold">GPA:</Text>
                <Text>{student.gpa}</Text>
              </VStack>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Container>
  );
}
