import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create instance of axios
const api = axios.create({
  baseURL: '/api'
});

// Create mock adapter
const mock = new MockAdapter(api, { delayResponse: 1000 });

// Mock data - initial students
const initialStudents = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    course: "CSE",
    enrollmentDate: "2023-01-15",
    gpa: 3.8,
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    course: "ECE",
    enrollmentDate: "2023-02-20",
    gpa: 3.9,
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    course: "CSE",
    enrollmentDate: "2023-01-10",
    gpa: 3.5,
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    course: "ECE",
    enrollmentDate: "2023-03-05",
    gpa: 4.0,
    image: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    course: "MECH",
    enrollmentDate: "2023-02-01",
    gpa: 3.7,
    image: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    course: "CIVIL",
    enrollmentDate: "2023-01-25",
    gpa: 3.6,
    image: "https://randomuser.me/api/portraits/women/6.jpg"
  }
];

// Setup mock endpoints
// GET all students
mock.onGet('/students').reply(config => {
  // Get course filter from request query params if any
  const course = config.params?.course;
  
  if (course && course !== 'ALL') {
    const filteredStudents = initialStudents.filter(student => student.course === course);
    return [200, filteredStudents];
  }
  
  return [200, initialStudents];
});

// GET student by ID
mock.onGet(/\/students\/\d+/).reply(config => {
  const id = config.url.split('/').pop();
  const student = initialStudents.find(s => s.id === id);
  
  if (student) {
    return [200, student];
  }
  return [404, { message: 'Student not found' }];
});

// POST new student
mock.onPost('/students').reply(config => {
  const newStudent = JSON.parse(config.data);
  
  // Generate a new ID
  newStudent.id = String(initialStudents.length + 1);
  
  // Add to our mock database
  initialStudents.push(newStudent);
  
  return [201, newStudent];
});

// Get available courses
mock.onGet('/courses').reply(200, [
  { id: 'CSE', name: 'Computer Science' },
  { id: 'ECE', name: 'Electronics & Communication' },
  { id: 'MECH', name: 'Mechanical Engineering' },
  { id: 'CIVIL', name: 'Civil Engineering' }
]);

export default api;