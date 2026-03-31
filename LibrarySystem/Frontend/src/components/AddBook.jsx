import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../service/axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const AddBook = ({ onBookAdded }) => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams(); // Get ID from URL if editing

    // 1. If ID exists, we are in EDIT mode. Fetch existing data.
    useEffect(() => {
        if (id) {
            fetchBookDetails();
        }
    }, [id]);

    const fetchBookDetails = async () => {
        try {
            // Assuming you have a GET /dashboard/book/{id} endpoint
            const response = await API.get(`/dashboard/book/${id}`);
            setBook(response.data);
        } catch (error) {
            alert("Failed to load book details");
            navigate('/admin');
        }
    };


    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if(id){
                await API.put(`/dashboard/update-book/${id}`,book)
                alert("Book updated successfully!");
                
            }
            else{
            // Matches @PostMapping("/dashboard/book")
            await API.post('/dashboard/book', book);
            alert("Book added successfully!");
            }
            
            // Clear form
            setBook({ title: '', author: '', description: '' });
            navigate( id ? '/admin' : '/dashboard') 
            // If you passed a refresh function from the parent (Dashboard)
            if (onBookAdded) onBookAdded();
        } catch (error) {
            console.error("Error adding book:", error);
            alert(error.response?.data || "Failed to add book");
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
                {id ? '✏️ Edit Book' : '📚 Add New Book'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-slate-600 mb-1">Book Title</label>
                    <input 
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                        className="border border-slate-200 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g. The Great Gatsby"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-slate-600 mb-1">Author</label>
                    <input 
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        required
                        className="border border-slate-200 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="e.g. F. Scott Fitzgerald"
                    />
                </div>

                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-slate-600 mb-1">Description</label>
                    <textarea 
                        name="description"
                        value={book.description}
                        onChange={handleChange}
                        rows="3"
                        className="border border-slate-200 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Briefly describe the book..."
                    />
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold shadow-lg transition-all 
                        ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700 active:scale-95'}`}
                    >
                       {isSubmitting ? 'Saving...' : (id ? 'Update Changes' : 'Save Book')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;