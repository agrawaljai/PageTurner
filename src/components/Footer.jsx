import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="footer">
            {/* Footer Main Content */}
            <div className="footer-content" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '3rem 5% 2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
            }}>
                {/* Brand Section */}
                <div className="footer-brand">
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: 'var(--white)',
                        marginBottom: '1rem'
                    }}>
                        PageTurner
                    </h2>
                    <p style={{
                        color: '#adb5bd',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        marginBottom: '1.5rem'
                    }}>
                        Your destination for quality books at affordable prices. Buy, sell, and discover your next favorite read.
                    </p>
                    <div className="social-links" style={{
                        display: 'flex',
                        gap: '1rem'
                    }}>
                        {/* Social Icons */}
                        <a href="https://www.linkedin.com/in/jai-agrawal-601584253" 
                           aria-label="LinkedIn"
                           style={{
                               width: '36px',
                               height: '36px',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               borderRadius: '50%',
                               backgroundColor: 'rgba(255,255,255,0.1)',
                               color: 'var(--white)',
                               transition: 'all 0.2s ease'
                           }}
                           onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                           onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a href="https://github.com/agrawaljai" 
                           aria-label="GitHub"
                           style={{
                               width: '36px',
                               height: '36px',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               borderRadius: '50%',
                               backgroundColor: 'rgba(255,255,255,0.1)',
                               color: 'var(--white)',
                               transition: 'all 0.2s ease'
                           }}
                           onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                           onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                        <a href="mailto:agrawaljai399@gmail.com"
                           aria-label="Email"
                           style={{
                               width: '36px',
                               height: '36px',
                               display: 'flex',
                               alignItems: 'center',
                               justifyContent: 'center',
                               borderRadius: '50%',
                               backgroundColor: 'rgba(255,255,255,0.1)',
                               color: 'var(--white)',
                               transition: 'all 0.2s ease'
                           }}
                           onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                           onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: 'var(--white)',
                        marginBottom: '1.25rem'
                    }}>
                        Quick Links
                    </h3>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0
                    }}>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <Link to="/" style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#adb5bd'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                Home
                            </Link>
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <Link to="/orders" style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#adb5bd'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                My Orders
                            </Link>
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <Link to="/list" style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#adb5bd'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                Sell Book
                            </Link>
                        </li>
                        <li style={{ marginBottom: '0.75rem' }}>
                            <Link to="/books" style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                transition: 'color 0.2s',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#adb5bd'}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                                Books
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Categories */}
                <div className="footer-categories">
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: 'var(--white)',
                        marginBottom: '1.25rem'
                    }}>
                        Categories
                    </h3>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.75rem'
                    }}>
                        <li>
                            <a href="#fiction" style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#adb5bd'}>
                                Fiction
                            </a>
                        </li>
                        <li>
                            <a href="#non-fiction" style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#adb5bd'}>
                                Non-Fiction
                            </a>
                        </li>
                        <li>
                            <a href="#mystery" style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#adb5bd'}>
                                Mystery
                            </a>
                        </li>
                        <li>
                            <a href="#scifi" style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#adb5bd'}>
                                Sci-Fi
                            </a>
                        </li>
                        <li>
                            <a href="#biography" style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#adb5bd'}>
                                Biography
                            </a>
                        </li>
                        <li>
                            <a href="#academic" style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#adb5bd'}>
                                Academic
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-contact">
                    <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: 'var(--white)',
                        marginBottom: '1.25rem'
                    }}>
                        Contact Us
                    </h3>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0
                    }}>
                        <li style={{
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem'
                        }}>
                            <div style={{
                                minWidth: '18px',
                                marginTop: '3px',
                                color: 'var(--accent)'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <div style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                lineHeight: '1.5'
                            }}>
                                +91 7000904848
                            </div>
                        </li>
                        <li style={{
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem'
                        }}>
                            <div style={{
                                minWidth: '18px',
                                marginTop: '3px',
                                color: 'var(--accent)'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <div style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                lineHeight: '1.5'
                            }}>
                                agrawaljai399@gmail.com
                            </div>
                        </li>
                        <li style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem'
                        }}>
                            <div style={{
                                minWidth: '18px',
                                marginTop: '3px',
                                color: 'var(--accent)'
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div style={{
                                color: '#adb5bd',
                                fontSize: '0.95rem',
                                lineHeight: '1.5'
                            }}>
                                B421 Bhabha Bhavan, SVNIT
                                <br />Surat, Gujarat 395007
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom" style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1.5rem 5%',
                textAlign: 'center',
                color: '#8f959d',
                fontSize: '0.9rem'
            }}>
                <p style={{ margin: 0 }}>
                    © {currentYear} PageTurner. All rights reserved. Designed with 
                    <span style={{ color: '#e63946', margin: '0 4px' }}>♥</span> 
                    by Jai Agrawal
                </p>
            </div>
        </footer>
    );
};

export default Footer;