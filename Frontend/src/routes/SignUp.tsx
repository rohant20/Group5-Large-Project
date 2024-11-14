import React, { useState, useContext } from 'react';
import { PathContext } from '../utils/PathProvider';
import { AuthContext } from '../utils/AuthProvider';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../style/SignUp.module.css';
import logo from '../assets/logo.jpg';

const SignUp: React.FC = () => {
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);


  //Username and password state handlers
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    console.log(email);
  }

  //Username and password state handlers
  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
    console.log(username);
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
      username: username,
      password: password
    }

    //Fetch function call
    signupUser(tempUser).then(data => {

      login(username, data._id);

      //React-router-dom navigation
      navigate("/");
    }).catch(err => {
      //Add error message code
    });
  }

  //Async fetch call to login
  async function signupUser(currUser: object) {
    console.log(currUser);
    //Make sure to change the url when it goes on the server
    const apiURL = serverPath + "signup"
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
    <section className={styles.signUp}>
      <Container className={styles.contain}>
        <Card className={styles.card}>
          <Card.Body className={styles.formBody}>
            <img src={logo} alt="Steeze logo" className={styles.logo} />
            <Form className="SignUpForm" onSubmit={submitCredentials}
            >
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Control
                  onChange={handleUsername}
                  type="text"
                  placeholder="Enter username"
                  className="form-control"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  onChange={handleEmail}

                  placeholder="Enter email"
                  type="email"
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
                  onChange={handlePassword}
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
