import React, { useState, useContext } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../style/LoginPg.module.css';
import logo from '../assets/logo.jpg';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


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
      setErrorMessage(err.message);
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
      throw new Error("Invalid login credentials. Please check your email and password.");
    } else {
      return userInfo;
    }
  }

  return (
    <section className={styles.login}>
      <Container className={styles.contain}>
        <Card className={styles.card}>
          <Card.Body className={styles.formBody}> 
            <img src={logo} alt="Steeze logo" className={styles.logo} />

            <Form className = "d-flex flex-column align-items-center" onSubmit={submitCredentials}> 
              <Form.Group className={styles.emailForm} controlId="formUser">
              <Form.Control
                  onChange={handleEmail}
                  type="email"
                  placeholder="Enter email"
               />
              </Form.Group>

              <Form.Group className={styles.passForm} controlId="formPassword">
              <Form.Control
                  onChange={handlePassword}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              

              {errorMessage && <p className="error-text">{errorMessage}</p>}

              <Button 
                variant="primary" 
                type="submit" 
                className={styles.button}
              >
                Login
              </Button>
            </Form>
            
            <div className="d-flex flex-column align-items-center">
              <Link to="/signup" className={styles.link}>
                Don’t have an account? Sign Up
              </Link>
              <Link to="/email" className={styles.link}>
                Forgot your password?
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default LoginPg;
