import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import styles from '../style/PasswordReset.module.css';


const ResetPg: React.FC = () => {
  return (
    <section className={styles.Email}>
      <Container className={styles.contain}>
        <Card className={styles.card}>
          <Card.Body className={styles.formBody}> 
          <img src={logo} alt="Steeze logo" className={styles.logo}/>
            <Form className="loginForm"> 
              <Form.Group controlId="formEmail" className={styles.passForm}>
                <Form.Control 
                  type="password" 
                  placeholder="Enter password" 
                  className="form-control" 
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className={styles.passForm}>
                <Form.Control 
                  type="password" 
                  placeholder="Confirm password" 
                  className="form-control" 
                />
              </Form.Group>
              <Link to="/login">
              <Button 
                variant="primary" 
                type="submit" 
                className={styles.button}
              >
                Submit
              </Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}
export default ResetPg;
