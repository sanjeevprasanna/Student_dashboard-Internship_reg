import {
  Box,
  Image,
  Text,
  Stack,
  Badge,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function StudentCard({ student }) {
  const { currentUser } = useAuth();
  
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow="md"
      transition="transform 0.3s"
      _hover={{ transform: 'scale(1.02)' }}
    >
      <Image 
        src={student.image || `https://randomuser.me/api/portraits/lego/1.jpg`} 
        alt={`Photo of ${student.name}`}
        objectFit="cover"
        w="100%"
        h="200px"
      />

      <Box p={6}>
        <Stack spacing={3}>
          <Text fontWeight="bold" fontSize="xl">
            {student.name}
          </Text>
          
          <Text fontSize="md" color="gray.500">
            {student.email}
          </Text>
          
          <Badge colorScheme="blue" alignSelf="flex-start">
            {student.course}
          </Badge>
          
          <Text fontSize="sm">
            Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
          </Text>
          
          <Text fontSize="sm">
            GPA: {student.gpa}
          </Text>

          {currentUser && (
            <Button
              as={RouterLink}
              to={`/students/${student.id}`}
              colorScheme="blue"
              size="sm"
              mt={2}
            >
              View Details
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
