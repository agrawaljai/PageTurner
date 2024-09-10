import React, { useEffect, useState } from "react";
import { useFirebase } from '../context/Firebase';
import BookCard from "../components/Card";
import CardGroup from 'react-bootstrap/CardGroup';
import Alert from 'react-bootstrap/Alert';


const Homepage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    useEffect(() => {
        firebase.listAllBooks().then((books) => setBooks(books.docs));

    },);



    return (
        <div>
            <div id="first">
                <h1 className="text1">Welcome to</h1>
                <h1 className="text2">Bookstore</h1>
            </div>
            <div className="home">
            <h2 style={{textAlign: 'center', fontWeight: 'bolder', color: 'white'}}>LISTINGS</h2>
                <CardGroup>
                    {books.map(book => <BookCard link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} />)}
                </CardGroup>
            </div>
        </div>
    );
}

export default Homepage;