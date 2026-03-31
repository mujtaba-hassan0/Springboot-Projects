import { Navigate } from 'react-router-dom';
import { getUserRoleFromToken } from './auth';

const RoleRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userRole = getUserRoleFromToken();

    // 1. If not logged in at all
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 2. If logged in but doesn't have the right role
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to={userRole === 'STUDENT' ? '/dashboard' : '/admin'} replace />;
    }

    // 3. Authorized
    return children;
};

export default RoleRoute;