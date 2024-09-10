import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from '../context/Firebase';
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(firebase.isLoggedIn) {
            navigate("/");
        }
    } ,[firebase, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Signing up a userEvent...");
        const result = await firebase.signupUserWithEmailAndPassword(email, password);
        console.log("user signup successful", result);
    }
    return (
        <div className="register mt-4">
            <h2 style={{textAlign: 'center', fontWeight: 'bolder', marginBottom: '10%'}}>SIGN UP</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                </Form.Group>
           
                <Button style={{marginLeft: '20%', width: '60%', marginTop: '10%', marginBottom: '5%' }} onClick={handleSubmit} variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    );
}

export default RegisterPage;