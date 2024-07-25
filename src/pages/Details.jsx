import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useFirebase } from "../context/Firebase";
import Button from 'react-bootstrap/Button';


const BookDetail = () => {

    const params = useParams();
    const firebase = useFirebase();

    const [data, setData] = useState(null);
    const [url, setUrl] = useState(null);
    const [qty, setQty] = useState(1);


    useEffect(() => {
        firebase.getBookById(params.bookId).then(value => setData(value.data()));

    },[]);


    useEffect(() => {
        if(data) {
            const imageURL = data.imageURL;
            firebase.getImageUrl(imageURL).then((url) => setUrl(url));
        }

    },[]);

    const placeOrder = async() => {
        const result = await firebase.placeOrder(params.bookId, qty, data.price);
    }

    if(data == null) return <h1>Loading...</h1>;

    return (
        
       <div className="container mt-5">
        <h1>{data.name}</h1>
        <img src={url} style={{width: '500px', borderRadius: '10px'}}  />
        <h1>Details - </h1>
        <h4>Price: Rs. {data.price}</h4>
        <input onChange={(e) => setQty(e.target.value)} value={qty} type="number" />
        <h1>Owner Details - </h1>
        <p>Name - {data.displayName}</p>
        <p>Email - {data.userEmail}</p>
        <Button onClick={placeOrder} variant="success">Buy Now</Button>
       </div> 
    );
}


export default BookDetail;
