import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';


const EmailPg: React.FC = () => {
  return (
    <section className="Login">
      <Container>
        <Card className="card">
          <Card.Body className="d-flex flex-column align-items-center"> 
          <img src={logo} alt="Steeze logo" className='logo'/>
            <Form className="loginForm"> 
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  className="form-control" 
                />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100"
                style={{ 
                  backgroundColor: 'white',  
                  transition: 'background-color 0.3s',
                  width: '6rem',
                  height: '2rem',
                  borderWidth: '2px',
                  
                }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'black';
                  e.currentTarget.style.backgroundColor = 'white';
                }} 
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'white';
                  e.currentTarget.style.backgroundColor = 'white';
                }} 
              >
                Login
              </Button>
            </Form>
            
            {/* Add Sign Up link */}
            <div className="links">
              <Link to="/signup" className="signup-link">
                Don’t have an account? Sign Up
              </Link>
              <Link to="/email" className="email-link">
                Forgot your password?
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}
export default EmailPg;
