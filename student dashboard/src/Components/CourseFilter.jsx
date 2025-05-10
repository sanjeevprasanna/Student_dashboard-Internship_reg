import { 
  Box, 
  Select, 
  FormControl, 
  FormLabel, 
  useColorModeValue 
} from '@chakra-ui/react';

export default function CourseFilter({ 
  courses, 
  currentFilter, 
  onFilterChange 
}) {
  const handleChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <Box 
      bg={useColorModeValue('white', 'gray.700')}
      p={4}
      borderRadius="md"
      boxShadow="sm"
      mb={5}
    >
      <FormControl>
        <FormLabel htmlFor="course-filter">Filter by Course</FormLabel>
        <Select
          id="course-filter"
          value={currentFilter}
          onChange={handleChange}
          bg={useColorModeValue('white', 'gray.600')}
        >
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
