import React, { useContext } from 'react';

import { useNavigate, Link } from 'react-router-dom';
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
                <Link to="/">
                    <Navbar.Brand href="/">Steezee</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={`me-auto ${styles.navContent}`}>
                        <Link to="/inventory">
                            <Nav.Link href="#link">My closet</Nav.Link>
                        </Link>
                        <Nav.Link href="#link">Listing Tool</Nav.Link>
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <Link to="/profile">
                                <NavDropdown.Item href="#link">Account Info</NavDropdown.Item>
                            </Link>
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
