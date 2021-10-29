import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import {Nav, NavDropdown, Link} from 'react-bootstrap' 
//import { NavLink, Link, Redirect, useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'

//const isAdmin = true;

const Naavbar = () => {
  return (
    <>
  {/* <Navbar bg="dark" fixed="top">
    <Container>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar> */}
  {/* <h1>Hello</h1> */}
  <Navbar style={{backgroundColor:"#112D4E"}} expand="lg">
  <Container>
    <Navbar.Brand href="#home" style={{color:"#DBE2EF"}}>React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home" style={{color:"#DBE2EF"}}>Home</Nav.Link>
        <Nav.Link href="#link" style={{color:"#DBE2EF"}}>Link</Nav.Link>
        <Nav.Link href="#link" style={{color:"#DBE2EF"}}>Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</>
  );
};

export default Naavbar;