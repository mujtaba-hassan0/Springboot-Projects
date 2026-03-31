import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../service/axios';
import { getUsernameFromToken } from '../utils/auth';
import useBackToLogout from '../hook/BackToLogin';

const UserDashboard = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    
    const navigate = useNavigate();
    const currentUsername = getUsernameFromToken(); 

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await API.get('/dashboard/books');
            setBooks(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error loading library:", error);
        } finally {
            setLoading(false);
        }
    };

    
    const filteredBooks = books.filter((book) => {
        const titleMatch = book.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const authorMatch = book.author?.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || authorMatch;
    });

    const handleBorrow = async (id) => {
        try {
            const response = await API.post(`dashboard/book/borrow/${id}`);
            alert(response.data.message || "Book borrowed successfully!");
            fetchBooks(); 
        } catch (error) {
            alert(error.response?.data?.message || "Failed to borrow book.");
        }
    };

    const handleReturn = async (id) => {
        try {
            const response = await API.post(`dashboard/book/return/${id}`);
            alert(response.data.message || "Book returned successfully!");
            fetchBooks(); 
        } catch (error) {
            alert(error.response?.data?.message || "Failed to return book.");
        }
    };

    useBackToLogout();

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
                
                
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Student Library</h1>
                        <p className="text-slate-500">Welcome back, <span className="text-indigo-600 font-semibold">{currentUsername}</span></p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <input 
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none transition-all bg-white shadow-sm"
                        />
                        <span className="absolute left-4 top-3.5 grayscale opacity-50">🔍</span>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-indigo-600 font-bold animate-pulse">Opening the Stacks...</div>
                ) : (
                    <>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBooks.map((book) => {
                                const isMyBook = book.borrowerUsername === currentUsername;
                                const isAvailable = book.status === 'AVAILABLE';

                                return (
                                    <div key={book.id} className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                                                isAvailable ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {book.status}
                                            </span>
                                            {isMyBook && (
                                                <span className="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full font-bold animate-bounce">
                                                    YOURS
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{book.title}</h3>
                                        <p className="text-indigo-600 font-medium mb-3">{book.author}</p>
                                        <p className="text-slate-500 text-sm line-clamp-2 mb-6">{book.description}</p>
                                        
                                        <div className="space-y-2">
                                            {isAvailable && (
                                                <button 
                                                    onClick={() => handleBorrow(book.id)}
                                                    className="w-full py-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl font-bold transition-all shadow-sm active:scale-95"
                                                >
                                                    Borrow Book
                                                </button>
                                            )}

                                            {!isAvailable && isMyBook && (
                                                <button 
                                                    onClick={() => handleReturn(book.id)}
                                                    className="w-full py-3 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl font-bold transition-all shadow-sm active:scale-95"
                                                >
                                                    Return Book
                                                </button>
                                            )}

                                            {!isAvailable && !isMyBook && (
                                                <button 
                                                    disabled
                                                    className="w-full py-3 bg-slate-100 text-slate-400 rounded-xl font-bold cursor-not-allowed"
                                                >
                                                    Borrowed by {book.borrowerUsername}
                                                </button>
                                            )}
                                            
                                            <button 
                                                onClick={() => navigate(`book/${book.id}`)}
                                                className="w-full py-2 text-slate-500 hover:text-indigo-600 text-sm font-semibold transition-colors"
                                            >
                                                View Full Details
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 5. Show "Not Found" state if search has no matches */}
                        {filteredBooks.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="text-slate-400 text-lg">No matches found for "{searchTerm}"</p>
                                <button 
                                    onClick={() => setSearchTerm("")}
                                    className="mt-2 text-indigo-600 font-bold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;