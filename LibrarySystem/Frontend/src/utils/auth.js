import { jwtDecode } from "jwt-decode";

export const getUserRoleFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
        const decoded = jwtDecode(token);
        // This matches the "role" key you set in your Java JwtService
        return decoded.role; 
    } catch (error) {
        return null;
    }
};

export const getUsernameFromToken = () =>{

    const token = localStorage.getItem('token');
    if(!token) return null;

    try{
        const decode = jwtDecode(token);
        return decode.sub; // "sub" is the standard claim for username in JWT
    }
    catch(error){
        return null;
    }
};