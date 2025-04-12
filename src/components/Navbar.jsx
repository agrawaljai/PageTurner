import React, { useState, useEffect, useRef } from "react";
import { useFirebase } from '../context/Firebase';
import { useNavigate, Link } from "react-router-dom";

const MyNavbar = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);
    
    const user = firebase.user;
    
    const handleLogout = async() => {
        await firebase.logout().then(() => {
            navigate("/login");
        });  
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${encodeURIComponent(searchTerm)}`);
            setIsSearchVisible(false);
        }
    };
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target) && isSearchVisible) {
                setIsSearchVisible(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchVisible]);

    return (
        <nav style={{
            backgroundColor: 'white',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 1rem',
                maxWidth: '1200px',
                margin: '0 auto',
                height: '70px',
            }}>
                {/* Logo */}
                <Link to="/" style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'var(--primary, #333)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <span style={{
                        color: 'var(--accent, #4a90e2)',
                        marginRight: '4px'
                    }}>Page</span>
                    Turner
                </Link>
                
                {/* Mobile Menu Button */}
                <div 
                    style={{
                        display: 'none',
                        cursor: 'pointer',
                        '@media (max-width: 768px)': {
                            display: 'block',
                        }
                    }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        style={{ color: '#333' }}
                    >
                        {isMenuOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        )}
                    </svg>
                </div>
                
                {/* Desktop Navigation */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    '@media (max-width: 768px)': {
                        display: isMenuOpen ? 'flex' : 'none',
                        position: 'absolute',
                        top: '70px',
                        left: 0,
                        right: 0,
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        padding: '1rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        zIndex: 50,
                    }
                }}>
                    <ul style={{
                        display: 'flex',
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        '@media (max-width: 768px)': {
                            flexDirection: 'column',
                            width: '100%',
                        }
                    }}>
                        <li>
                            <Link to="/" style={{
                                color: '#333',
                                textDecoration: 'none',
                                padding: '0.75rem 1rem',
                                display: 'block',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                transition: 'color 0.2s',
                                ':hover': {
                                    color: 'var(--accent, #4a90e2)',
                                }
                            }}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="#all-books" style={{
                                color: '#333',
                                textDecoration: 'none',
                                padding: '0.75rem 1rem',
                                display: 'block',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                transition: 'color 0.2s',
                                ':hover': {
                                    color: 'var(--accent, #4a90e2)',
                                }
                            }}>
                                Categories
                            </Link>
                        </li>
                        {firebase.isLoggedIn && (
                            <>
                                <li>
                                    <Link to="/book/list" style={{
                                        color: '#333',
                                        textDecoration: 'none',
                                        padding: '0.75rem 1rem',
                                        display: 'block',
                                        fontSize: '0.95rem',
                                        fontWeight: '500',
                                        transition: 'color 0.2s',
                                        ':hover': {
                                            color: 'var(--accent, #4a90e2)',
                                        }
                                    }}>
                                        Add Listing
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/books/orders" style={{
                                        color: '#333',
                                        textDecoration: 'none',
                                        padding: '0.75rem 1rem',
                                        display: 'block',
                                        fontSize: '0.95rem',
                                        fontWeight: '500',
                                        transition: 'color 0.2s',
                                        ':hover': {
                                            color: 'var(--accent, #4a90e2)',
                                        }
                                    }}>
                                        Orders
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    
                    {/* Search Icon - Desktop */}
                    <div 
                        ref={searchRef} 
                        style={{
                            position: 'relative',
                            marginLeft: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            '@media (max-width: 768px)': {
                                marginLeft: 0,
                                width: '100%',
                                marginTop: '0.5rem',
                                marginBottom: '0.5rem',
                            }
                        }}
                    >
                        {/* On mobile, show full search bar instead of icon */}
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            '@media (min-width: 769px)': {
                                width: 'auto',
                            }
                        }}>
                            {/* Desktop search icon */}
                            <button 
                                onClick={() => setIsSearchVisible(!isSearchVisible)} 
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    color: '#333',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '@media (max-width: 768px)': {
                                        display: 'none',
                                    }
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                            
                            {/* Mobile search bar */}
                            <form 
                                onSubmit={handleSearch}
                                style={{
                                    display: 'none',
                                    '@media (max-width: 768px)': {
                                        display: 'flex',
                                        width: '100%',
                                    }
                                }}
                            >
                                <input 
                                    type="text"
                                    placeholder="Search books..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        padding: '0.75rem',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '4px 0 0 4px',
                                        width: '100%',
                                        fontSize: '0.9rem',
                                    }}
                                />
                                <button 
                                    type="submit"
                                    style={{
                                        background: 'var(--accent, #4a90e2)',
                                        border: 'none',
                                        color: 'white',
                                        padding: '0 0.75rem',
                                        borderRadius: '0 4px 4px 0',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                            </form>
                        </div>
                        
                        {/* Desktop search dropdown */}
                        {isSearchVisible && (
                            <form 
                                onSubmit={handleSearch}
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: '0',
                                    backgroundColor: 'white',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '4px',
                                    padding: '0.5rem',
                                    width: '260px',
                                    zIndex: 100,
                                    display: 'flex',
                                    '@media (max-width: 768px)': {
                                        display: 'none',
                                    }
                                }}
                            >
                                <input 
                                    type="text"
                                    placeholder="Search books..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        padding: '0.75rem',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '4px',
                                        width: '100%',
                                        fontSize: '0.9rem',
                                    }}
                                    autoFocus
                                />
                                <button 
                                    type="submit"
                                    style={{
                                        background: 'var(--accent, #4a90e2)',
                                        border: 'none',
                                        color: 'white',
                                        padding: '0 0.75rem',
                                        borderRadius: '4px',
                                        marginLeft: '0.5rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                            </form>
                        )}
                    </div>
                    
                    {/* User Authentication Section */}
                    <div style={{
                        marginLeft: '1rem',
                        position: 'relative',
                        '@media (max-width: 768px)': {
                            marginLeft: 0,
                            width: '100%',
                        }
                    }} ref={dropdownRef}>
                        {firebase.isLoggedIn ? (
                            <>
                                <button 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#333',
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        padding: '0.5rem 0.75rem',
                                        borderRadius: '4px',
                                        fontSize: '0.95rem',
                                        fontWeight: '500',
                                        transition: 'background-color 0.2s',
                                        ':hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                        },
                                        '@media (max-width: 768px)': {
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            borderTop: '1px solid #edf2f7',
                                            marginTop: '0.5rem',
                                            paddingTop: '1rem',
                                        }
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        overflow: 'hidden',
                                    }}>
                                        {(
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                backgroundColor: 'var(--accent, #4a90e2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '0.75rem',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                flexShrink: 0,
                                            }}>
                                                {user?.email?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <span style={{
                                            maxWidth: '120px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            '@media (max-width: 768px)': {
                                                maxWidth: '200px',
                                            }
                                        }}>
                                            {user?.displayName || user?.email}
                                        </span>
                                    </div>
                                    <svg 
                                        width="16" 
                                        height="16" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        style={{ marginLeft: '0.5rem', flexShrink: 0 }}
                                    >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                
                                {isDropdownOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: 0,
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        borderRadius: '4px',
                                        minWidth: '180px',
                                        zIndex: 100,
                                        '@media (max-width: 768px)': {
                                            position: 'relative',
                                            boxShadow: 'none',
                                            width: '100%',
                                            marginTop: '0.5rem',
                                        }
                                    }}>
                                        <Link to="/account" style={{
                                            display: 'block',
                                            padding: '0.75rem 1rem',
                                            color: '#333',
                                            textDecoration: 'none',
                                            borderBottom: '1px solid #f1f5f9',
                                            fontSize: '0.9rem',
                                            ':hover': {
                                                backgroundColor: '#f8fafc',
                                            }
                                        }}>
                                            My Account
                                        </Link>
                                        <Link to="/my-books" style={{
                                            display: 'block',
                                            padding: '0.75rem 1rem',
                                            color: '#333',
                                            textDecoration: 'none',
                                            borderBottom: '1px solid #f1f5f9',
                                            fontSize: '0.9rem',
                                            ':hover': {
                                                backgroundColor: '#f8fafc',
                                            }
                                        }}>
                                            My Books
                                        </Link>
                                        <button 
                                            onClick={handleLogout}
                                            style={{
                                                display: 'block',
                                                width: '100%',
                                                textAlign: 'left',
                                                padding: '0.75rem 1rem',
                                                color: '#e53e3e',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                ':hover': {
                                                    backgroundColor: '#f8fafc',
                                                }
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{
                                display: 'flex',
                                gap: '0.5rem',
                                '@media (max-width: 768px)': {
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    marginTop: '1rem',
                                    borderTop: '1px solid #edf2f7',
                                    paddingTop: '1rem',
                                }
                            }}>
                                <Link 
                                    to="/login"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        border: '1px solid var(--accent, #4a90e2)',
                                        borderRadius: '4px',
                                        color: 'var(--accent, #4a90e2)',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        transition: 'all 0.2s',
                                        ':hover': {
                                            backgroundColor: 'rgba(74, 144, 226, 0.1)',
                                        },
                                        '@media (max-width: 768px)': {
                                            flex: 1,
                                            textAlign: 'center',
                                        }
                                    }}
                                >
                                    Sign In
                                </Link>
                                <Link 
                                    to="/register"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        backgroundColor: 'var(--accent, #4a90e2)',
                                        borderRadius: '4px',
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        transition: 'all 0.2s',
                                        ':hover': {
                                            backgroundColor: '#3a7bc2',
                                        },
                                        '@media (max-width: 768px)': {
                                            flex: 1,
                                            textAlign: 'center',
                                        }
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;