import React,{useState} from "react"
import { useNavigate} from "react-router-dom"
import api from "../service/axios"

const RegisterUser = () => {
    // Initial state matching your UserRequest fields
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'STUDENT' // Default role
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});

    };

    const handleRegister = async (e)=>{
        e.preventDefault();

        try{
            const response = await api.post('/user/save',formData);

            if(response.data === "User saved Successfully"){
                setMessage("Registration Successful! Redirecting to Login...");
                setTimeout(()=> navigate('/login'),2000);

            }
            else{
                setMessage(response.data);
            }
        }
        catch(err){
            setMessage("Error: Could not connect to the server.");
            console.error(err);
        }
    }



    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
  <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-10 shadow-xl">
    <h2 className="mb-6 text-center text-3xl font-extrabold text-indigo-600">
      Create an Account
    </h2>

    <form onSubmit={handleRegister} className="flex flex-col gap-5">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-slate-700">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 p-3 outline-none transition-all focus:ring-2 focus:ring-indigo-500"
          placeholder="Choose a username"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-slate-700">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 p-3 outline-none transition-all focus:ring-2 focus:ring-indigo-500"
          placeholder="••••••••"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold text-slate-700">Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="STUDENT">Student</option>
          <option value="LIBRARIAN">Librarian</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-lg bg-indigo-600 py-3 font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95"
      >
        Register
      </button>
    </form>

    {message && (
      <p className="mt-4 text-center font-bold text-rose-500 animate-pulse">
        {message}
      </p>
    )}

    <p className="mt-6 text-center text-sm text-slate-600">
      Already have an account?{" "}
      <a href="/login" className="font-bold text-indigo-600 hover:underline">
        Login here
      </a>
    </p>
  </div>
</div>
    );
};


export default RegisterUser;