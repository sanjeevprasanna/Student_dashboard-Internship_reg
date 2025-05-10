import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  
  // Get the page they were trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      toast({
        title: 'Login Successful',
        description: 'You have been logged in successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    
    try {
      await googleSignIn();
      toast({
        title: 'Login Successful',
        description: 'You have been logged in with Google!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: 'Google Login Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="md" py={12}>
      <Box 
        p={8} 
        bg="white" 
        boxShadow="lg" 
        borderRadius="lg"
      >
        <Stack spacing={4} mb={8}>
          <Heading textAlign="center">Login</Heading>
          <Text textAlign="center" color="gray.600">
            Login to access all features
          </Text>
        </Stack>

        {location.state?.from && (
          <Alert status="info" mb={4} borderRadius="md">
            <AlertIcon />
            Login required to access this page
          </Alert>
        )}
        
        <Box as="form" onSubmit={handleEmailLogin}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            
            <FormControl isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              fontSize="md"
              isLoading={isSubmitting}
            >
              Sign in
            </Button>
          </Stack>
        </Box>

        <Divider my={6} />
        
        <Button
          w="full"
          variant="outline"
          leftIcon={<FcGoogle />}
          onClick={handleGoogleLogin}
          isLoading={isSubmitting}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
}