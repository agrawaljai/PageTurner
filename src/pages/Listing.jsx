import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';

const ListingForm = () => {

    const firebase = useFirebase();

    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState('');
    const [coverPic, setCoverPic] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);

    };
    return (
        <div className="container mt-4">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Book Name</Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter Book Title" />
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN Number</Form.Label>
                    <Form.Control onChange={(e) => setIsbnNumber(e.target.value)} value={isbnNumber} type="number" placeholder="Enter ISBN Number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder="Enter Price" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control onChange={(e) => setCoverPic(e.target.files[0])} type="file" />
                </Form.Group>
                
                <Button onClick={handleSubmit} variant="primary" type="submit">
                    List
                </Button>
            </Form>
        </div>
    );
};

export default ListingForm;