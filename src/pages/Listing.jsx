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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Early return if already submitting
        if (isSubmitting) return;

        if (!name || !isbn || !price || !coverImg) {
            setError("All fields are required");
            return;
        }

        if (isNaN(price) || price <= 0) {
            setError("Price must be a valid number greater than 0");
            return;
        }

        try {
            // Set local submitting state and show loading overlay immediately
            setIsSubmitting(true);
            setError("");
            
            await firebase.handleCreateNewListing(name, isbn, price, coverImg, category);
            navigate("/");
        } catch (error) {
            console.error("Error creating listing:", error);
            setError("Failed to create listing. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Use either the local or global submitting state
    const showLoading = isSubmitting || firebase.isSubmitting;

    return (
        <div className="listing">
            {showLoading && <LoadingOverlay message="Uploading your book listing..." />}

            <h1>List a Book for Sale</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Book Name</label>
                    <input
                        type="text"
                        placeholder="Enter book name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={showLoading}
                    />
                </div>

                <div className="form-group">
                    <label>ISBN</label>
                    <input
                        type="text"
                        placeholder="Enter ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        disabled={showLoading}
                    />
                </div>

                <div className="form-group">
                    <label>Price (INR)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        disabled={showLoading}
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={showLoading}
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
                        disabled={showLoading}
                    />
                    <p className="file-tip">Recommended size: 300x450 pixels</p>
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={showLoading}
                >
                    {showLoading ? 'Creating Listing...' : 'Create Listing'}
                </button>
            </form>
        </div>
    );
};

export default ListingForm;