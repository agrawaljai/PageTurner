import { useFirebase } from "../context/Firebase";
import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [url, setURL] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
        firebase.getImageUrl(props.imageURL).then((Url) => setURL(Url));
    }, [firebase, props.imageURL]);
    
    const handleDelete = async(e) => {
        e.stopPropagation(); // Prevent card click when delete is clicked
        return await firebase.handleDeleteListing(props.id);
    }

    return (
        <Card 
            className="CardtoDisplay"
            onClick={() => navigate(props.link)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                cursor: 'pointer',
                position: 'relative',
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                transform: isHovered ? 'translateY(-8px)' : 'none',
                boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow)',
            }}
        >
            <div style={{ 
                position: 'relative',
                paddingTop: '140%', // Aspect ratio for image
                overflow: 'hidden',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
            }}>
                <Card.Img 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }} 
                    src={url || '/placeholder-book.png'} 
                    alt={props.name}
                />
            </div>
            
            <Card.Body style={{ padding: '1.25rem' }}>
                <Card.Title 
                    style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        marginBottom: '0.5rem',
                        color: 'var(--primary)',
                        lineHeight: '1.3',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {props.name}
                </Card.Title>
                
                <div style={{ 
                    fontSize: '0.9rem',
                    color: 'var(--text-light)',
                    marginBottom: '0.75rem'
                }}>
                    By {props.displayName}
                </div>
                
                <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'var(--accent)',
                    marginBottom: '0.75rem'
                }}>
                    Rs. {props.price}
                </div>
            </Card.Body>
            
            <div style={{
                display: 'flex',
                borderTop: '1px solid var(--gray-200)',
            }}>
                <button 
                    style={{
                        flex: '1',
                        padding: '0.75rem',
                        backgroundColor: 'var(--white)',
                        color: 'var(--primary)',
                        border: 'none',
                        borderRight: '1px solid var(--gray-200)',
                        borderBottomLeftRadius: '8px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s',
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(props.link);
                    }}
                >
                    View
                </button>
                
                <button 
                    style={{
                        flex: '1',
                        padding: '0.75rem',
                        backgroundColor: 'var(--white)',
                        color: 'var(--accent)',
                        border: 'none',
                        borderBottomRightRadius: '8px',
                        fontWeight: '500',
                        transition: 'background-color 0.2s',
                    }}
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </Card>
    );
}

export default BookCard;