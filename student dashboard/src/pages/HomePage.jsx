import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useStudents } from '../contexts/StudentContext';
import StudentCard from '../components/StudentCard';
import CourseFilter from '../components/CourseFilter';

export default function HomePage() {
  const { 
    students, 
    courses, 
    loading, 
    error, 
    currentFilter, 
    fetchStudents 
  } = useStudents();

  const handleFilterChange = (courseId) => {
    fetchStudents(courseId);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="xl" mb={2}>
          Student Dashboard
        </Heading>
        <Text color="gray.600">
          View and manage student information
        </Text>
      </Box>

      {courses.length > 0 && (
        <CourseFilter 
          courses={courses} 
          currentFilter={currentFilter} 
          onFilterChange={handleFilterChange} 
        />
      )}

      {error && (
        <Alert status="error" mb={5}>
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <Center py={10}>
          <Spinner size="xl" color="blue.500" />
        </Center>
      ) : (
        <>
          {students.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              No students found for the selected filter.
            </Alert>
          ) : (
            <SimpleGrid 
              columns={{ base: 1, sm: 2, md: 3, lg: 4 }} 
              spacing={6}
            >
              {students.map(student => (
                <StudentCard key={student.id} student={student} />
              ))}
            </SimpleGrid>
          )}
        </>
      )}
    </Container>
  );
}
