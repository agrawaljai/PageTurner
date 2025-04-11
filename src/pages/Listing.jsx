import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";

const ListingForm = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [isbn, setIsbn] = useState("");
    const [price, setPrice] = useState("");
    const [coverImg, setCoverImg] = useState(null);
    const [category, setCategory] = useState("Fiction");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!name || !isbn || !price || !coverImg) {
            setError("All fields are required");
            return;
        }
        
        if (isNaN(price) || price <= 0) {
            setError("Price must be a valid number greater than 0");
            return;
        }
        
        try {
            await firebase.handleCreateNewListing(name, isbn, price, coverImg, category);
            // Navigate to home or books list after successful submission
            navigate("/");
        } catch (error) {
            console.error("Error creating listing:", error);
            setError("Failed to create listing. Please try again.");
        }
    };

    return (
        <div className="listing">
            {firebase.isSubmitting && <LoadingOverlay message="Uploading your book listing..." />}
            
            <h1>List a Book for Sale</h1>
            
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Book Name</label>
                    <input
                        type="text"
                        placeholder="Enter book name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label>ISBN</label>
                    <input
                        type="text"
                        placeholder="Enter ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label>Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
                        <option value="Biography">Biography</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label>Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImg(e.target.files[0])}
                    />
                    <p className="file-tip">
                        Recommended size: 300x450 pixels
                    </p>
                </div>
                
                <button
                    type="submit"
                    className="submit-button"
                >
                    Create Listing
                </button>
            </form>
        </div>
    );
};

export default ListingForm;
