import React, { useContext } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthProvider';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import styles from "./NavTop.module.css"
import logo from '../../assets/logo.jpg';

const NavTop: React.FC = () => {
    const navigateTo = useNavigate();

    const userInfo = useContext(AuthContext);

    if (!userInfo) {
        throw new Error("useContext must be used within an AuthProvider");
    }

    const { auth } = userInfo;
    const { logout } = userInfo;


    function handleLogOut() {
        logout();
        navigateTo("/login");
    }

    return (
        <Navbar className={styles.navBar}>
            <Link to="/">
                <Navbar.Brand href="#home">
                    <img src={logo} alt="logo" className={styles.logo} />
                </Navbar.Brand>
            </Link>

            <Nav className={styles.navContent}>
                <Link to="/">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Link>
                <Link to="/inventory">
                    <Nav.Link href="#link">Listing Tool</Nav.Link>
                </Link>
                <Link to="/inventory">
                    <Nav.Link href="#link">Inventory</Nav.Link>
                </Link>
                <Link to="/profile">
                    <Nav.Link href="#link">Profile</Nav.Link>
                </Link>
            </Nav >
            <Navbar.Collapse className={styles.profile}>
                <Navbar.Text>
                    Signed in as: <a href="#profile">{auth.username}</a>
                </Navbar.Text>
                <button className={styles.button} onClick={handleLogOut}>Log Out</button>
            </Navbar.Collapse>
        </Navbar >
    );
}

export default NavTop;
