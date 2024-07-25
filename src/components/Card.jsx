import { useFirebase } from "../context/Firebase";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";


const BookCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getImageUrl(props.imageURL).then((Url) => setURL(Url));
    }, []);
    return (
        

        <Card className="CardtoDisplay mt-4" style={{ width: '18rem', maxWidth: '30vw', border: '.5px', maxHeight: '80vh', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', margin: '6px',transition: 'transform .2s', }}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    This book is sold by {props.displayName} and cost of this book is Rs.{props.price}.
                </Card.Text>
                <Button onClick={e => navigate(props.link)} variant="primary">View</Button>
            </Card.Body>
        </Card>
    );
}

export default BookCard;