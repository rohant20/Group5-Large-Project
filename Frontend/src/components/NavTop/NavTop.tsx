import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthProvider';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import styles from "./NavTop.module.css"

const NavTop: React.FC = () => {
    const navigateTo = useNavigate();

    const userInfo = useContext(AuthContext);

    if (!userInfo) {
        throw new Error("useContext must be used within an AuthProvider");
    }

    const { logout } = userInfo;


    function handleLogOut() {

        logout();
        navigateTo("/login");
    }

    return (
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
                            <NavDropdown.Item>
                                <button onClick={handleLogOut}>
                                    Log Out
                                </button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavTop;
