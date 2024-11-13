import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../style/SignUp.module.css';
import logo from '../assets/logo.jpg';

const SignUp: React.FC = () => {
  return (
    <section className={styles.signUp}>
      <Container className={styles.contain}>
        <Card className={styles.card}>
          <Card.Body className={styles.formBody}> 
          <img src={logo} alt="Steeze logo" className={styles.logo}/>
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
                className={styles.button}
              >
                Sign Up
              </Button>
            </Form>

            <div className="links">
              <Link to="/login" className={styles.link}>
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
