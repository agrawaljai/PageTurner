import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useFirebase } from '../context/Firebase';
import { useNavigate } from "react-router-dom";


const MyNavbar = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    
    
    const user = firebase.user;

    const handleLogout = async() => {
      await firebase.logout().then(() => {
        navigate("/login");
      });   
    }

    

    if(firebase.isLoggedIn) return (
      <Navbar expand="lg" className="bg-body-tertiary"  bg="black" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="/">PageTurner</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/book/list">Add Listing</Nav.Link>
          <Nav.Link href="/books/orders">Orders</Nav.Link> 
          <NavDropdown title={user.email} id="navbarScrollingDropdown">
            <NavDropdown.Item onClick={handleLogout} >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          
        </Nav>
        
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )

  return  (
    <Navbar expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="/">PageTurner</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Add Listing</Nav.Link>
          <Nav.Link href="/login">Orders</Nav.Link> 
          <NavDropdown title="Sign up" href="/register" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/login" >
              sign in
            </NavDropdown.Item>
            <NavDropdown.Item href="/register" >
              sign up
            </NavDropdown.Item>
          </NavDropdown>
          
        </Nav>
        
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default MyNavbar;