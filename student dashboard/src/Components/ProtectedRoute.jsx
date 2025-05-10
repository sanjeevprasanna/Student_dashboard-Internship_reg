import { Navigate, replace, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Center, Spinner } from '@chakra-ui/react';

export default function ProtectedRoute({ children }) {
    const {currentUser,isLoading}= useAuth();
    const location = useLocation();

    if(isLoading){
        return (
            <Center h="100vh">
                <Spinner size="xl" />
            </Center>
        )
    }

    if(!currentUser){
        return <Navigate to="/login" state={{from:location}} replace />;
    }
    return children;
}
