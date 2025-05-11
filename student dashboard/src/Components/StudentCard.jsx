import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Square,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function StudentCard({ student }) {
  const { currentUser } = useAuth();
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
  return (
    <Flex
      width="100%"
      alignItems="center"
      borderBottom="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      py={2}
      px={3}
      _hover={{ bg: hoverBg }}
      transition="background-color 0.2s"
    >
      {/* Selection box column */}
      <Box width="40px" textAlign="center">
       
      </Box>
      
      {/* Name column */}
      <Box flex="1" minWidth="180px">
        <Text fontWeight="medium">{student.name}</Text>
      </Box>
      
      {/* Email column */}
      <Box flex="1.5" minWidth="200px">
        <Text color="blue.500">{student.email}</Text>
      </Box>
      
      {/* Course column */}
      <Box flex="1" minWidth="150px">
        <Badge colorScheme="blue">{student.course}</Badge>
      </Box>
      
      {/* Enrollment date column */}
      <Box flex="1" minWidth="120px">
        <Text fontSize="sm">{new Date(student.enrollmentDate).toLocaleDateString()}</Text>
      </Box>
      
      {/* GPA column */}
      <Box width="80px" textAlign="center">
        <Text fontSize="sm">{student.gpa}</Text>
      </Box>
      
      {/* Actions column */}
      {currentUser && (
        <Box width="120px" textAlign="right">
          <Button
            as={RouterLink}
            to={`/students/${student.id}`}
            size="xs"
            colorScheme="blue"
            variant="outline"
          >
            View Details
          </Button>
        </Box>
      )}
    </Flex>
  );
}