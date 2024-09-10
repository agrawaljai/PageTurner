import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from '../context/Firebase';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

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
        console.log("logging in a userEvent...");
        const result = await firebase.signinUserWithEmailAndPassword(email, password).catch(e => alert("Invalid Credentials"));
        console.log("user login successful", result);
    }
    return (
        <div className="login">
            <h2 style={{textAlign: 'center', fontWeight: 'bolder'}}>SIGN IN</h2>
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
                
                <Button style={{marginLeft: '20%', width: '60%', marginTop: '5%', }} onClick={handleSubmit} variant="primary" type="submit">
                    login
                </Button>
            </Form>
            <h4 style={{textAlign: 'center', fontWeight: 'bold', margin: '5vh'}}>OR</h4>
            <Button style={{marginLeft: '20%', width: '60%'}} onClick={firebase.signinWithGoogle} variant="danger">Signin with Google</Button>
        </div>
    );
}

export default LoginPage;