import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRoleFromToken } from '../utils/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const role = getUserRoleFromToken();

    const handleLogout = () => {
        // 1. Clear the security token
        localStorage.removeItem('token');
        
        // 2. Redirect to login
        navigate('/login');
        
        // 3. Optional: Force a page reload to clear any cached states
        window.location.reload();
    };

    return (
        <nav className="bg-white border-b border-slate-100 px-8 py-4 sticky top-0 z-50 shadow-sm">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-indigo-200 shadow-lg group-hover:rotate-12 transition-transform">
                        BL
                    </div>
                    <span className="text-xl font-black text-slate-800 tracking-tight">
                        BookLoop
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {/* Common Link */}
                    <Link to={role === 'STUDENT' ? '/dashboard' : '/admin'} className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors">
                        Home
                    </Link>

                    {/* Admin Only Links */}
                    {(role === 'LIBRARIAN' || role === 'ADMIN') && (
                        <>
                            <Link to="/admin/users" className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors">
                                Manage Users
                            </Link>
                            <Link to="/dashboard/book" className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors">
                                Add Books
                            </Link>
                        </>
                    )}

                    {/* Student Only Links */}
                    {role === 'STUDENT' && (
                        <Link to="/my-books" className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors">
                            My Borrowed Books
                        </Link>
                    )}
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest leading-none">
                            {role}
                        </span>
                    </div>
                    
                    <button 
                        onClick={handleLogout}
                        className="bg-rose-50 text-rose-600 px-5 py-2 rounded-lg font-bold hover:bg-rose-600 hover:text-white transition-all active:scale-95"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;