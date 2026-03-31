import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../service/axios';
import { getUsernameFromToken, getUserRoleFromToken } from '../utils/auth';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    
    
    const currentUsername = getUsernameFromToken();
    const role = getUserRoleFromToken();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await API.get(`/dashboard/book/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
                alert("Book not found!");
                navigate(-1);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id, navigate]);

    const handleBorrow = async () => {
        try {
            const response = await API.post(`dashboard/book/borrow/${id}`);
            alert(response.data.message || "Borrow request successful!");
            navigate(-1); // Go back after success
        } catch (error) {
            alert(error.response?.data?.message || "Failed to borrow book.");
        }
    };

    const handleReturn = async () => {
        try {
            const response = await API.post(`dashboard/book/return/${id}`);
            alert(response.data.message || "Book returned successfully!");
            navigate(-1); // Go back after success
        } catch (error) {
            alert(error.response?.data?.message || "Failed to return book.");
        }
    };

    if (loading) return <div className="p-10 text-center font-bold text-indigo-600">Loading details...</div>;
    if (!book) return null;

    
    const isAvailable = book.status === 'AVAILABLE';
    const isMyBook = book.borrowerUsername === currentUsername;

    return (
        <div className="min-h-screen bg-slate-50 p-8 flex justify-center">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
                
                {/* Visual Placeholder for Book Cover */}
                <div className="md:w-1/3 bg-indigo-600 flex items-center justify-center p-12 text-white relative">
                    <div className="text-6xl font-black opacity-20 select-none">BOOK</div>
                    {isMyBook && (
                        <div className="absolute top-4 left-4 bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-black shadow-lg">
                            IN YOUR POSSESSION
                        </div>
                    )}
                </div>

                
                <div className="md:w-2/3 p-10">
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-slate-400 hover:text-indigo-600 mb-6 flex items-center gap-2 font-medium transition-colors"
                    >
                        ← Back to Library
                    </button>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                        isAvailable ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                        {book.status}
                    </span>

                    <h1 className="text-4xl font-black text-slate-800 mt-4 leading-tight">
                        {book.title}
                    </h1>
                    <p className="text-xl text-indigo-600 font-semibold mt-2">
                        by {book.author}
                    </p>

                    <div className="mt-8">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Description</h3>
                        <p className="text-slate-600 mt-2 leading-relaxed text-lg italic">
                            "{book.description || 'No description available for this masterpiece.'}"
                        </p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Owner</p>
                            <p className="text-slate-800 font-bold">{book.ownerUsername?.toUpperCase() || 'Library Admin'}</p>
                        </div>
                        
          

    
    {role === 'STUDENT' && (
        <>
            {isAvailable ? (
                <button 
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
                    onClick={handleBorrow}
                >
                    Borrow Book
                </button>
            ) : isMyBook ? (
                <button 
                    className="bg-rose-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-600 shadow-lg shadow-rose-100 transition-all active:scale-95"
                    onClick={handleReturn}
                >
                    Return Book
                </button>
            ) : (
                <div className="text-right">
                    <p className="text-xs text-slate-400 font-bold uppercase">Currently with</p>
                    <p className="text-amber-600 font-bold">{book.borrowerUsername}</p>
                </div>
            )}
        </>
    )}

   
{(role === 'ADMIN' || role === 'LIBRARIAN') && (
    <div className="text-right">
        {isAvailable ? (
            <>
                <p className="text-xs text-slate-400 font-bold uppercase">Status</p>
                <p className="text-green-600 font-bold">READY FOR BORROWING</p>
            </>
        ) : (
            <>
                <p className="text-xs text-slate-400 font-bold uppercase">Borrowed by</p>
                <p className="text-indigo-600 font-bold">{book.borrowerUsername}</p>
            </>
        )}
    </div>
)}
</div>
                    </div>
                </div>
            </div>
        
    );
};

export default BookDetails;