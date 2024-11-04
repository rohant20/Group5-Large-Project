import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import "../style/SignUpPg.css";

const App: React.FC = () => {
  return (
    <section className="SignUp">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{
          height: '45vh',
          display: 'flex'
        }}
      >
        <Card
          style={{
            width: '36rem',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            background: 'linear-gradient(to bottom, black, gray)',
            borderRadius: '25px',
            border: '2px solid black',
          }}
        >
          <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title className="text-center mb-4" style={{ color: 'white', fontWeight: 'bold', fontSize: '4rem' }}>
              Steeze
            </Card.Title>
            <Form className="loginForm">
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderColor: 'white',
                    margin: '20px',
                    height: '3vh',
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control
                  type="name"
                  placeholder="Enter username"
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderColor: 'white',
                    margin: '20px',
                    height: '3vh',
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderColor: 'white',
                    margin: '20px',
                    height: '3vh'
                  }}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                style={{
                  backgroundColor: 'white',
                  transition: 'background-color 0.3s',
                  width: '8rem',
                  height: '3rem',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: 'black'
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
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};


export default App
