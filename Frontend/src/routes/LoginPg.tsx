import React, { useState, useContext } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import '../style/LoginPg.css';
import { useNavigate } from 'react-router-dom';

import { PathContext } from '../utils/PathProvider';
import { AuthContext } from '../utils/AuthProvider';

const LoginPg: React.FC = () => {
  //Context hook that grabs environemnt path
  const serverPath: string = useContext(PathContext);

  const authInfo = useContext(AuthContext);

  if (!authInfo) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  const { login } = authInfo;

  //useNavigate hook
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Username and password state handlers
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    console.log(email);
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    console.log(password);
  }

  //Form submission
  function submitCredentials(e: React.FormEvent) {
    e.preventDefault();

    //temporary user object that is used to interact with the API
    const tempUser = {
      email: email,
      password: password
    }

    //Fetch function call
    loginUser(tempUser).then(data => {
      console.log(data);
      login(data.username, data._id);

      //React-router-dom navigation
      navigate("/");
    }).catch(err => {
      console.log(err);
    });
  }

  //Async fetch call to login
  async function loginUser(currUser: object) {
    console.log(currUser);
    //Make sure to change the url when it goes on the server
    const apiURL = serverPath + "login"
    //stores the response from the api in a variable
    const resp = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currUser)
    });

    const userInfo = await resp.json();
    //If the resp did not send back the expected data it throws an error
    //otherwise it will return the response
    if (resp.status == 500) {
      throw new Error(userInfo.message);
    } else {
      return userInfo;
    }
  }

  return (
    <section className="Login">
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
            <Form className="loginForm" onSubmit={submitCredentials}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  onChange={handleEmail}
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

              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Control
                  onChange={handlePassword}
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

export default LoginPg;
