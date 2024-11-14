import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import styles from '../style/EmailPg.module.css';


const EmailPg: React.FC = () => {
  return (
    <section className={styles.Email}>
      <Container className={styles.contain}>
        <Card className={styles.card}>
          <Card.Body className={styles.formBody}> 
          <img src={logo} alt="Steeze logo" className={styles.logo}/>
            <Form className="loginForm"> 
              <Form.Group controlId="formEmail" className={styles.emailForm}>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  className="form-control" 
                />
              </Form.Group>
              <Button 
                variant="primary" 
                type="submit" 
                className={styles.button}
              >
                Submit
              </Button>
            </Form>
            <div className="d-flex flex-column align-items-center">
              <Link to="/signup" className={styles.link}>
                Don’t have an account? Sign Up
              </Link>
              <Link to="/login" className={styles.link}>
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
