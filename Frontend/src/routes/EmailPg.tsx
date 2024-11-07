import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import '../style/EmailPg.css';


const EmailPg: React.FC = () => {
  return (
    <section className="Email">
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
                Submit
              </Button>
            </Form>
            
            {/* Add Sign Up link */}
            <div className="links">
              <Link to="/signup" className="signup-link">
                Don’t have an account? Sign Up
              </Link>
              <Link to="/login" className="login-link">
                Have an account? Login here
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}
export default EmailPg;
