import React,{useState} from "react"
import { Navigate, useNavigate } from "react-router-dom";
import api from "../service/axios"
import { getUserRoleFromToken } from "../utils/auth";

const Login=() => {

const [user,setUser] = useState({username:'' , password:''});
const navigate = useNavigate();

const handleChange =(e) => {
setUser({ ...user, [e.target.name]: e.target.value});
};

const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
        const response = await api.post('/user/token',user);
        localStorage.setItem('token',response.data);

        const role = getUserRoleFromToken();

        if( role==="ADMIN" || role === "LIBRARIAN"){
            navigate('/admin')
        }
        else{
            navigate('/dashboard')
        }
    } catch(err){
        alert("Login Failed: Check you credentials")
    }
};

const register = ()=>{
navigate('/save')
}

return(
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
            BookLoop Login
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <input 
                    name="username" 
                    placeholder="Username" 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
            </div>

            <div>
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
            </div>

            <div className="flex flex-col gap-3">
                
                <button 
                    type="submit" 
                    className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                    Sign In
                </button>

                
                <button 
                    type="button" 
                    onClick={register} 
                    className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                    Register User
                </button>
            </div>
        </form>
    </div>
</div>
);
};

export default Login;