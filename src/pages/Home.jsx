import React, { useEffect, useState } from "react";
import { useFirebase } from '../context/Firebase';
import BookCard from "../components/Card";

const Homepage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortOption, setSortOption] = useState("default");

    // Load all books initially
    useEffect(() => {
        firebase.listAllBooks().then((books) => {
            const allBooks = books.docs;
            setBooks(allBooks);
            setFilteredBooks(allBooks);
            
            // Get a few random books for featured section
            if (allBooks.length > 3) {
                const randomBooks = [...allBooks].sort(() => 0.5 - Math.random()).slice(0, 4);
                setFeaturedBooks(randomBooks);
            } else {
                setFeaturedBooks(allBooks);
            }
            
            setIsLoading(false);
        }).catch(err => {
            console.error("Error fetching books:", err);
            setIsLoading(false);
        });
    }, [firebase]);

    // Handle search
    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!searchTerm.trim()) {
            // If search is empty, reset to all books or current category
            if (activeCategory === "All") {
                setFilteredBooks(books);
            } else {
                const categoryBooks = await firebase.getBooksByCategory(activeCategory);
                setFilteredBooks(categoryBooks);
            }
            return;
        }
        
        setIsLoading(true);
        try {
            const searchResults = await firebase.searchBooks(searchTerm);
            // If category is active, filter search results by category too
            if (activeCategory !== "All") {
                const filteredResults = searchResults.filter(
                    book => book.data().category === activeCategory
                );
                setFilteredBooks(filteredResults);
            } else {
                setFilteredBooks(searchResults);
            }
        } catch (error) {
            console.error("Error searching books:", error);
        }
        setIsLoading(false);
    };

    // Handle category filter
    const handleCategoryClick = async (category) => {
        setActiveCategory(category);
        setIsLoading(true);
        
        try {
            if (category === "All") {
                // Reset to all books (but respect search if present)
                if (searchTerm.trim()) {
                    const searchResults = await firebase.searchBooks(searchTerm);
                    setFilteredBooks(searchResults);
                } else {
                    setFilteredBooks(books);
                }
            } else {
                // Get books by category
                const categoryBooks = await firebase.getBooksByCategory(category);
                
                // Apply search filter if there's a search term
                if (searchTerm.trim()) {
                    const searchTermLower = searchTerm.toLowerCase();
                    const filteredCategoryBooks = categoryBooks.filter(book => {
                        const data = book.data();
                        return data.name.toLowerCase().includes(searchTermLower) || 
                               data.isbn.toLowerCase().includes(searchTermLower) ||
                               (data.displayName && data.displayName.toLowerCase().includes(searchTermLower));
                    });
                    setFilteredBooks(filteredCategoryBooks);
                } else {
                    setFilteredBooks(categoryBooks);
                }
            }
        } catch (error) {
            console.error("Error filtering by category:", error);
        }
        
        setIsLoading(false);
    };

    // Handle sorting
    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        setSortOption(sortValue);
        
        const booksCopy = [...filteredBooks];
        
        switch(sortValue) {
            case "price-low":
                booksCopy.sort((a, b) => parseFloat(a.data().price) - parseFloat(b.data().price));
                break;
            case "price-high":
                booksCopy.sort((a, b) => parseFloat(b.data().price) - parseFloat(a.data().price));
                break;
            case "newest":
                booksCopy.sort((a, b) => {
                    const dateA = a.data().createdAt || "0";
                    const dateB = b.data().createdAt || "0";
                    return dateB.localeCompare(dateA);
                });
                break;
            default:
                // Return to original order
                break;
        }
        
        setFilteredBooks(booksCopy);
    };

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading collection...</p>
            </div>
        );
    }

    return (
        <div className="homepage">
            {/* Hero Banner */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Discover Your Next Great Read</h1>
                    <p>Browse our curated collection of books for every reader</p>
                    <form className="search-bar" onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder="Search by title, author, or ISBN" 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </section>

            {/* Featured Section */}
            <section className="featured-section">
                <div className="section-header">
                    <h2>Featured Books</h2>
                    <a href="#all-books" className="view-all">View All</a>
                </div>
                
                <div className="featured-books">
                    {featuredBooks.map(book => (
                        <BookCard 
                            link={`/book/view/${book.id}`}
                            key={book.id} 
                            id={book.id} 
                            {...book.data()} 
                        />
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <h2>Browse Categories</h2>
                <div className="categories">
                    <div 
                        className={`category ${activeCategory === "All" ? 'active-category' : ''}`}
                        onClick={() => handleCategoryClick("All")}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="category-icon fiction"></div>
                        <h3>All Books</h3>
                    </div>
                    <div 
                        className={`category ${activeCategory === "Fiction" ? 'active-category' : ''}`}
                        onClick={() => handleCategoryClick("Fiction")}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="category-icon fiction"></div>
                        <h3>Fiction</h3>
                    </div>
                    <div 
                        className={`category ${activeCategory === "Non-Fiction" ? 'active-category' : ''}`}
                        onClick={() => handleCategoryClick("Non-Fiction")}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="category-icon non-fiction"></div>
                        <h3>Non-Fiction</h3>
                    </div>
                    <div 
                        className={`category ${activeCategory === "Mystery" ? 'active-category' : ''}`}
                        onClick={() => handleCategoryClick("Mystery")}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="category-icon mystery"></div>
                        <h3>Mystery</h3>
                    </div>
                    <div 
                        className={`category ${activeCategory === "Sci-Fi & Fantasy" ? 'active-category' : ''}`}
                        onClick={() => handleCategoryClick("Sci-Fi & Fantasy")}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="category-icon scifi"></div>
                        <h3>Sci-Fi & Fantasy</h3>
                    </div>
                    <div 
                        className={`category ${activeCategory === "Biography" ? 'active-category' : ''}`}
                        onClick={() => handleCategoryClick("Biography")}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="category-icon biography"></div>
                        <h3>Biography</h3>
                    </div>
                </div>
            </section>

            {/* All Books Section */}
            <section className="all-books-section" id="all-books">
                <div className="section-header">
                    <h2>{activeCategory === "All" ? "All Books" : activeCategory} {searchTerm ? `matching "${searchTerm}"` : ""}</h2>
                    <div className="filters">
                        <select value={sortOption} onChange={handleSortChange}>
                            <option value="default">Sort By</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                </div>
                
                {filteredBooks.length > 0 ? (
                    <div className="books-grid">
                        {filteredBooks.map(book => (
                            <BookCard 
                                link={`/book/view/${book.id}`}
                                key={book.id} 
                                id={book.id} 
                                {...book.data()} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-books-message">
                        <p>No books found. Try a different search or category.</p>
                    </div>
                )}
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <div className="benefit">
                    <div className="benefit-icon shipping"></div>
                    <div className="benefit-info">
                        <h3>Free Shipping</h3>
                        <p>On all orders over $35</p>
                    </div>
                </div>
                <div className="benefit">
                    <div className="benefit-icon returns"></div>
                    <div className="benefit-info">
                        <h3>Easy Returns</h3>
                        <p>30-day return policy</p>
                    </div>
                </div>
                <div className="benefit">
                    <div className="benefit-icon secure"></div>
                    <div className="benefit-info">
                        <h3>Secure Payment</h3>
                        <p>Safe & encrypted checkout</p>
                    </div>
                </div>
                <div className="benefit">
                    <div className="benefit-icon support"></div>
                    <div className="benefit-info">
                        <h3>24/7 Support</h3>
                        <p>We're here to help</p>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter-section">
                <div className="newsletter-content">
                    <h2>Join Our Newsletter</h2>
                    <p>Stay updated with our latest releases and special offers</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Your email address" />
                        <button>Subscribe</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Homepage;