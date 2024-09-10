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
        
       <div className="details">
        <h1 style={{textAlign: 'center', fontWeight: 'bolder', color: 'white', margin: '4vh'}}>{data.name}</h1>
        <img src={url} style={{width: '40%', borderRadius: '5vh', display: 'block',marginTop: '2vh', margin: 'auto'}}  />
        <h1 style={{textAlign: 'left', color: 'white', marginTop: '4vh', marginBottom: '4vh'}}>Details - </h1>
        <p style={{fontSize: '4vh', marginLeft: '2vw'}}>Price: Rs. {data.price}</p>
        <p style={{fontSize: '4vh', marginLeft: '2vw'}}>Enter Quantity :-</p>
        <input style={{marginLeft: '2vw', width: '12vw'}} onChange={(e) => setQty(e.target.value)} value={qty} type="number"/>
        <h1 style={{textAlign: 'left', color: 'white', marginTop: '4vh', marginBottom: '4vh'}}>Owner Details - </h1>
        <p style={{fontSize: '4vh', marginLeft: '2vw'}}>Name - {data.displayName}</p>
        <p style={{fontSize: '4vh', marginLeft: '2vw'}}>Email - {data.userEmail}</p>
        <Button style={{marginLeft: '35vw', width: '20vw'}}  onClick={placeOrder} variant="success">Buy Now</Button>
       </div> 
    );
}


export default BookDetail;
