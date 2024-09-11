import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import CardGroup from 'react-bootstrap/CardGroup';

const ViewOrdersPage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    


    useEffect(() => {
        if(firebase.isLoggedIn) {
            firebase.fetchMyBooks(firebase.user.uid).then(books => setBooks(books.docs));
        }
    }, [firebase]);

    if(!firebase.isLoggedIn) return <h1> Please Log In to view orders</h1>;
   
    
    return (
        <div className="orders_map" style={{justifyContent: 'space-around'}}>
            <h2 style={{textAlign: 'center', fontWeight: 'bolder', color: 'white'}}>ORDERS</h2>
            <CardGroup>
                {
                    books.map(book => <BookCard link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />)
                }
            </CardGroup>
        </div>
    );
}


export default ViewOrdersPage;