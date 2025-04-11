import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useFirebase } from "../context/Firebase";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const BookDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [data, setData] = useState(null);
    const [url, setUrl] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [orderPlacing, setOrderPlacing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const bookData = await firebase.getBookById(params.bookId);
                if (bookData.exists()) {
                    setData(bookData.data());
                } else {
                    setError("Book not found");
                }
            } catch (err) {
                setError("Error loading book details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBook();
    }, [firebase, params.bookId]);

    useEffect(() => {
        if (data && data.imageURL) {
            firebase.getImageUrl(data.imageURL)
                .then(url => setUrl(url))
                .catch(err => console.error("Error loading image:", err));
        }
    }, [firebase, data]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQty(value);
        }
    };

    const placeOrder = async () => {
        try {
            setOrderPlacing(true);
            await firebase.placeOrder(params.bookId, qty, data.price);
            navigate('/orders'); // Navigate to orders page after successful placement
        } catch (err) {
            setError("Failed to place order. Please try again.");
            console.error(err);
        } finally {
            setOrderPlacing(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading book details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message" style={{ maxWidth: '800px', margin: '3rem auto', padding: '2rem' }}>
                <h3>Error</h3>
                <p>{error}</p>
                <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
            </div>
        );
    }

    return (
        <div className="orders_map">
            <div className="details">
                {/* Book Header */}
                <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '3rem',
                    position: 'relative'
                }}>
                    <h1 style={{ 
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: 'var(--white)',
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }}>
                        {data.name}
                    </h1>
                    
                    {data.category && (
                        <div style={{
                            backgroundColor: 'var(--accent)',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            marginBottom: '2rem'
                        }}>
                            {data.category}
                        </div>
                    )}
                </div>

                {/* Book Content */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    {/* Book Image */}
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '0',
                            paddingBottom: '120%',
                            overflow: 'hidden',
                            borderRadius: '12px',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            <img 
                                src={url || '/placeholder-book.png'} 
                                alt={data.name} 
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '0',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    </div>

                    {/* Book Info */}
                    <div style={{ flex: '1.5', minWidth: '300px' }}>
                        {/* Price and Purchase Section */}
                        <div style={{
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            padding: '2rem',
                            borderRadius: '8px',
                            marginBottom: '2rem'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between',
                                marginBottom: '1.5rem'
                            }}>
                                <h2 style={{ 
                                    fontSize: '2rem', 
                                    fontWeight: '700', 
                                    margin: '0',
                                    color: 'var(--white)' 
                                }}>
                                    Rs. {data.price}
                                </h2>
                                {data.originalPrice && data.originalPrice > data.price && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ 
                                            textDecoration: 'line-through',
                                            color: 'var(--gray-300)',
                                            fontSize: '1.2rem'
                                        }}>
                                            Rs. {data.originalPrice}
                                        </span>
                                        <span style={{ 
                                            backgroundColor: 'var(--accent)',
                                            color: 'white',
                                            padding: '0.25rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            fontWeight: '500'
                                        }}>
                                            SAVE {Math.round(((data.originalPrice - data.price) / data.originalPrice) * 100)}%
                                        </span>
                                    </div>
                                )}
                            </div>
                            
                            {data.inStock !== false && (
                                <div style={{ 
                                    color: '#22c55e', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.9rem'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                    <span>In Stock</span>
                                </div>
                            )}

                            <div style={{ marginBottom: '2rem' }}>
                                <label htmlFor="quantity" style={{ 
                                    display: 'block', 
                                    marginBottom: '0.5rem',
                                    color: 'var(--gray-300)',
                                    fontSize: '0.9rem'
                                }}>
                                    Quantity:
                                </label>
                                <div style={{ display: 'flex', maxWidth: '150px' }}>
                                    <button 
                                        onClick={() => qty > 1 && setQty(qty - 1)}
                                        style={{
                                            width: '40px',
                                            border: 'none',
                                            backgroundColor: 'rgba(0,0,0,0.2)',
                                            color: 'white',
                                            borderRadius: '4px 0 0 4px',
                                            fontSize: '1.2rem'
                                        }}
                                    >
                                        -
                                    </button>
                                    <input 
                                        id="quantity"
                                        type="number" 
                                        min="1" 
                                        value={qty} 
                                        onChange={handleQuantityChange}
                                        style={{
                                            flex: '1',
                                            border: 'none',
                                            backgroundColor: 'rgba(0,0,0,0.1)',
                                            color: 'white',
                                            padding: '0.75rem',
                                            textAlign: 'center',
                                            fontSize: '1rem',
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'textfield'
                                        }}
                                    />
                                    <button 
                                        onClick={() => setQty(qty + 1)}
                                        style={{
                                            width: '40px',
                                            border: 'none',
                                            backgroundColor: 'rgba(0,0,0,0.2)',
                                            color: 'white',
                                            borderRadius: '0 4px 4px 0',
                                            fontSize: '1.2rem'
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div style={{ 
                                display: 'flex', 
                                gap: '1rem',
                                flexWrap: 'wrap'
                            }}>
                                <Button 
                                    variant="success" 
                                    size="lg"
                                    onClick={placeOrder}
                                    disabled={orderPlacing}
                                    style={{
                                        flex: '1',
                                        minWidth: '200px',
                                        backgroundColor: 'var(--accent)',
                                        borderColor: 'var(--accent)',
                                        fontWeight: '600',
                                        padding: '0.75rem 1.5rem'
                                    }}
                                >
                                    {orderPlacing ? 
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                style={{ marginRight: '0.5rem' }}
                                            /> 
                                            Processing...
                                        </> : 
                                        'Buy Now'
                                    }
                                </Button>
                                
                                <Button 
                                    variant="outline-light" 
                                    size="lg"
                                    style={{
                                        flex: '1',
                                        minWidth: '150px',
                                        fontWeight: '600',
                                        padding: '0.75rem 1.5rem'
                                    }}
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </Button>
                            </div>
                        </div>

                        {/* Book Details */}
                        <div>
                            <h3 style={{ 
                                fontSize: '1.5rem', 
                                marginBottom: '1rem', 
                                color: 'var(--white)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                </svg>
                                Book Details
                            </h3>
                            
                            <div style={{
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                fontSize: '1rem'
                            }}>
                                <div style={{ 
                                    display: 'grid', 
                                    gridTemplateColumns: 'auto 1fr',
                                    gap: '0.75rem 2rem',
                                    color: 'var(--gray-300)'
                                }}>
                                    {data.author && (
                                        <>
                                            <span style={{ color: 'var(--white)' }}>Author:</span>
                                            <span>{data.author}</span>
                                        </>
                                    )}
                                    
                                    {data.publisher && (
                                        <>
                                            <span style={{ color: 'var(--white)' }}>Publisher:</span>
                                            <span>{data.publisher}</span>
                                        </>
                                    )}
                                    
                                    {data.isbn && (
                                        <>
                                            <span style={{ color: 'var(--white)' }}>ISBN:</span>
                                            <span>{data.isbn}</span>
                                        </>
                                    )}
                                    
                                    {data.language && (
                                        <>
                                            <span style={{ color: 'var(--white)' }}>Language:</span>
                                            <span>{data.language}</span>
                                        </>
                                    )}
                                    
                                    {data.category && (
                                        <>
                                            <span style={{ color: 'var(--white)' }}>Category:</span>
                                            <span>{data.category}</span>
                                        </>
                                    )}
                                    
                                    {data.condition && (
                                        <>
                                            <span style={{ color: 'var(--white)' }}>Condition:</span>
                                            <span>{data.condition}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Owner Details */}
                <div>
                    <h3 style={{ 
                        fontSize: '1.5rem', 
                        marginBottom: '1rem', 
                        color: 'var(--white)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Seller Information
                    </h3>
                    <div style={{
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        fontSize: '1rem'
                    }}>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'auto 1fr',
                            gap: '0.75rem 2rem',
                            color: 'var(--gray-300)'
                        }}>
                            <span style={{ color: 'var(--white)' }}>Name:</span>
                            <span>{data.displayName}</span>
                            
                            <span style={{ color: 'var(--white)' }}>Email:</span>
                            <span>{data.userEmail}</span>
                            
                            {data.location && (
                                <>
                                    <span style={{ color: 'var(--white)' }}>Location:</span>
                                    <span>{data.location}</span>
                                </>
                            )}
                            
                            {data.phone && (
                                <>
                                    <span style={{ color: 'var(--white)' }}>Phone:</span>
                                    <span>{data.phone}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Book Description if available */}
                {data.description && (
                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ 
                            fontSize: '1.5rem', 
                            marginBottom: '1rem', 
                            color: 'var(--white)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6"></line>
                                <line x1="8" y1="12" x2="21" y2="12"></line>
                                <line x1="8" y1="18" x2="21" y2="18"></line>
                                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                <line x1="3" y1="18" x2="3.01" y2="18"></line>
                            </svg>
                            Description
                        </h3>
                        <div style={{
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            color: 'var(--gray-300)'
                        }}>
                            {data.description}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookDetail;