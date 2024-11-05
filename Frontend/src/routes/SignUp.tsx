import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/SignUp.css';

const SignUp: React.FC = () => {
  return (
    <section className="SignUp">
      <Container>
        <Card className="card">
          <Card.Body className="d-flex flex-column align-items-center"> 
            <Card.Title className="card-title text-center mb-4">
              Steeze
            </Card.Title>
            <Form className="SignUpForm"> 
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="Enter username" 
                  className="form-control" 
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  className="form-control" 
                />
              </Form.Group>

              <Form.Group controlId="formEmailConfirm" className="mb-3">
                <Form.Control 
                  type="email" 
                  placeholder="Confirm email" 
                  className="form-control" 
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control 
                  type="password" 
                  placeholder="Enter password" 
                  className="form-control" 
                />
              </Form.Group>

              <Form.Group controlId="formPasswordConfirm" className="mb-4">
                <Form.Control 
                  type="password" 
                  placeholder="Confirm password" 
                  className="form-control" 
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="signUp-button"
              >
                Sign Up
              </Button>
            </Form>

            <div className="links">
              <Link to="/login" className="login-link">
                Already have an account? Log In
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default SignUp;
