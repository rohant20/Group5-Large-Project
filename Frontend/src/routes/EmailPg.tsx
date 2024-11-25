import React, { useState, useContext } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import styles from '../style/EmailPg.module.css';

import { PathContext } from '../utils/PathProvider';

const EmailPg: React.FC = () => {

  const serverPath: string = useContext(PathContext);

  const [email,setEmail] = useState("");//password state handlers
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccesMessage] = useState<string | null>(null);
  
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    console.log(email);
  }

  function submitEmail(e: React.FormEvent) {
    e.preventDefault();

    //temporary user object that is used to interact with the API
    const tempEmail = {
      email: email
    }

    //Fetch function call
    sendEmail(tempEmail).then(data => {
      console.log(data);
      setSuccesMessage("Email successfully set!")
    }).catch(err => {
      setErrorMessage(err.message);
    });


  }

  async function sendEmail(currUser: object) {
    console.log(currUser);
    //Make sure to change the url when it goes on the server
    const apiURL = serverPath + "api/forgotPassword"
    //stores the response from the api in a variable
    const resp = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currUser)
    });

    const stat = await resp.json();
    //If the resp did not send back the expected data it throws an error
    //otherwise it will return the response
    if (resp.status == 500) {
      throw new Error("Invalid Email");
    } else {
      return stat;
    }
  }


  return (
    <section className={styles.Email}>
      <Container className={styles.contain}>
        <Card className={styles.card}>
          <Card.Body className={styles.formBody}> 
          <img src={logo} alt="Steeze logo" className={styles.logo}/>
            <Form className="loginForm" onSubmit={submitEmail}> 
              <Form.Group controlId="formEmail" className={styles.emailForm}>
                <Form.Control 
                  onChange={handleEmail}
                  type="email" 
                  placeholder="Enter email" 
                  className="form-control" 
                />
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                {successMessage && <p className={styles.success}>{successMessage}</p>}
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
