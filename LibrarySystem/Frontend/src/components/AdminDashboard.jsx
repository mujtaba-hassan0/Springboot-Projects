import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../service/axios';
import useBackToLogout from '../hook/BackToLogin';

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await API.get('/dashboard/books');
            setBooks(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanent Delete: Are you sure?")) {
            try {
                await API.delete(`/dashboard/book/${id}`);
                setBooks(books.filter(book => book.id !== id));
            } catch (error) {
                alert("Delete failed. Check permissions.");
            }
        }
    };

    useBackToLogout();

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Admin Console</h1>
                        <p className="text-indigo-600 font-medium text-sm">Library Management Mode</p>
                    </div>
                    <button 
                        onClick={() => navigate('/dashboard/book')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all active:scale-95"
                    >
                        + Add New Book
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-indigo-600 font-bold">Loading Library Data...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <div key={book.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-indigo-500">
                                <div className="flex justify-between items-start" onClick={() => navigate(`/dashboard/book/${book.id}`)} style={{cursor: 'pointer'}}>
                                    <h3 className="text-xl font-bold text-slate-800">{book.title}</h3>
                                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">ID: {book.id}</span>
                                </div>
                                <p className="text-indigo-600 text-sm mb-4">{book.author}</p>
                                <div className="flex gap-2 mt-6 pt-4 border-t border-slate-50">
                                    <button 
                                        onClick={() => navigate(`/dashboard/edit/${book.id}`)}
                                        className="flex-1 text-slate-600 hover:bg-slate-100 py-2 rounded-lg font-semibold transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(book.id)} 
                                        className="flex-1 text-red-500 hover:bg-red-50 py-2 rounded-lg font-semibold transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;