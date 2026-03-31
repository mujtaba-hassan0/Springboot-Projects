import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import AddBook from './components/AddBook';
import RoleRoute from './utils/RoleRoute';
import BookDetails from './components/BookDetails';

function App() {
    return (
        <Router>
            
            <Navbar /> 
            
            <div className="min-h-screen bg-slate-50">
                <Routes>
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/save" element={<RegisterUser />} />

                    
                    <Route path="/admin" element={
                        <RoleRoute allowedRoles={['LIBRARIAN', 'ADMIN']}>
                            <AdminDashboard />
                        </RoleRoute>
                    } />
                    
                    <Route path="/dashboard/book" element={
                        <RoleRoute allowedRoles={['LIBRARIAN', 'ADMIN']}>
                            <AddBook />
                        </RoleRoute>
                    } />

                    <Route path="/dashboard/edit/:id" element={
                        <RoleRoute allowedRoles={['LIBRARIAN', 'ADMIN']}>
                            <AddBook />
                        </RoleRoute>
                    } />

                    
                    <Route path="/dashboard" element={
                        <RoleRoute allowedRoles={['STUDENT']}>
                            <UserDashboard />
                        </RoleRoute>
                    } />

                    <Route path="/dashboard/book/:id" element={<BookDetails />} />

                    
                    <Route path="/" element={<RootRedirect />} />
                </Routes>
            </div>
        </Router>
    );
}


const RootRedirect = () => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/login" />;
    
    const role = getUserRoleFromToken();
    return role === 'STUDENT' ? <Navigate to="/dashboard" /> : <Navigate to="/admin" />;
};

export default App;