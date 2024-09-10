import { useFirebase } from "../context/Firebase";
import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";


const BookCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [url, setURL] = useState(null);

    useEffect(() => {
        firebase.getImageUrl(props.imageURL).then((Url) => setURL(Url));
    }, []);

    const handleDelete = async(e) => {
        return await firebase.handleDeleteListing(e);
    }
    return (
        

        <Card className="CardtoDisplay mt-4" style={{ width: '18rem', maxWidth: '30vw', border: '.5px', borderRadius: '2vh', maxHeight: '200%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', margin: '6px',transition: 'transform .2s', }}>
            <Card.Img style={{width: '100%', height: '40%', objectFit: 'cover', borderTopLeftRadius: '2vh', borderTopRightRadius: '2vh'}} variant="top" src={url} />
            <Card.Body>
                <Card.Title style={{color: 'white', fontSize: '3vh'}}>{props.name}</Card.Title>
                <Card.Text style={{color: 'white', fontSize: '2vh'}}>
                    This book is sold by {props.displayName} and cost of this book is Rs.{props.price}.
                </Card.Text>
                
            </Card.Body>
            <button style={{borderBottomLeftRadius: '2vh', borderBottomRightRadius: '2vh', backgroundColor: '#222831', color: 'white', border: '0px', padding: '1vh'}} onClick={e => navigate(props.link)} >View</button>
            <button style={{borderBottomLeftRadius: '2vh', borderBottomRightRadius: '2vh', backgroundColor: '#222831', color: 'white', border: '0px', padding: '1vh'}} onClick={e => handleDelete(props.id)} >Delete</button>
        </Card>
    );
}

export default BookCard;