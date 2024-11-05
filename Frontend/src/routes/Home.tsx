import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import styles from "../style/Home.module.css"

const Home: React.FC = () => {
    return (
        <>
            <Navbar className={styles.navBar} expand="lg" >
                <Container>
                    <Navbar.Brand href="#home">Steezee</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={`me-auto ${styles.navContent}`}>
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Listing Tool</Nav.Link>
                            <Nav.Link href="#link">My closet</Nav.Link>
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Account Info</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Linked Platforms
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Analytics</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <section className={styles.sectionBg}><h1>hi</h1></section>
        </>
    );
};

export default Home;
