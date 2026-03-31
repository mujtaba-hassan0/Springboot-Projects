import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useBackToLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Push a dummy state so there is something to "go back" from
        window.history.pushState(null, null, window.location.pathname);

        const handleBackButton = (event) => {
            // Prevent the actual back navigation
            event.preventDefault();
            
            // 2. The Logic: Clear storage and kill the session
            console.log("Back button detected: Logging out...");
            const confirmLogout = window.confirm("Are you sure you want to log out?");
            if (!confirmLogout) {
                return;
            }
            localStorage.removeItem('token'); 
            
            // 3. Force move to login
            navigate('/login', { replace: true });
        };

        // Listen for the popstate (back button)
        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [navigate]);
};

export default useBackToLogout;