import { 
  Box, 
  Flex, 
  Button, 
  Stack, 
  Text,
  IconButton,
  useDisclosure,
  Collapse,
  useToast
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Success',
        description: 'You have been logged out',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log out',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Flex
        bg="blue.600"
        color="white"
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor="blue.700"
        align="center"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            as={RouterLink}
            to="/"
            textAlign={{ base: 'center', md: 'left' }}
            fontFamily="heading"
            fontWeight="bold"
            color="white"
          >
            Student Dashboard
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Stack direction="row" spacing={4} align="center">
              <Box
                as={RouterLink}
                to="/"
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: 'blue.500',
                }}
              >
                Home
              </Box>
              {currentUser && (
                <Box
                  as={RouterLink}
                  to="/add-student"
                  px={2}
                  py={1}
                  rounded="md"
                  _hover={{
                    textDecoration: 'none',
                    bg: 'blue.500',
                  }}
                >
                  Add Student
                </Box>
              )}
            </Stack>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          {currentUser ? (
            <>
              <Text display={{ base: 'none', md: 'flex' }} alignItems="center">
                {currentUser.email}
              </Text>
              <Button
                as={RouterLink}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="blue.400"
                _hover={{
                  bg: 'blue.300',
                }}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              as={RouterLink}
              to="/login"
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="blue.400"
              _hover={{
                bg: 'blue.300',
              }}
            >
              Sign In
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg="blue.700"
          p={4}
          display={{ md: 'none' }}
        >
          <Stack spacing={4}>
            <Box
              as={RouterLink}
              to="/"
              px={2}
              py={1}
              rounded="md"
              _hover={{
                textDecoration: 'none',
                bg: 'blue.500',
              }}
            >
              Home
            </Box>
            {currentUser && (
              <Box
                as={RouterLink}
                to="/add-student"
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: 'blue.500',
                }}
              >
                Add Student
              </Box>
            )}
            {currentUser ? (
              <Button
                w="full"
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="blue.400"
                _hover={{
                  bg: 'blue.300',
                }}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                as={RouterLink}
                to="/login"
                w="full"
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="blue.400"
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Sign In
              </Button>
            )}
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  );
}
