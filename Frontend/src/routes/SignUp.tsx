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

  //Username functions
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("Special characters are not allowed.");
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  //Email functions
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("Please enter a valid email address.");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailMatchError, setEmailMatchError] = useState("Emails must match.");
  const [isEmailMatchValid, setIsEmailMatchValid] = useState(false);

  //Password functions
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("Password must have 8 characters with 1 number and 1 special character.");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("Passwords must match.");
  const [isPasswordMatchValid, setIsPasswordMatchValid] = useState(false);

  //Disables the button until all the isValids have been met
  const isFormValid = isUsernameValid && isEmailValid && isEmailMatchValid && isPasswordValid && isPasswordMatchValid;


  //Username and password state handlers
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(regex.test(value)){
      setIsEmailValid(true);
      setEmailError("Email is valid!");
    } else {
      setIsEmailValid(false);
      setEmailError("Please enter a valid email address.");
    }

    if(value === confirmEmail){
      setEmailMatchError("Emails match!");
      setIsEmailMatchValid(true);
    }else {
      setEmailMatchError("Emails must match.");
      setIsEmailMatchValid(false);
    }

  }

  function handleConfirmEmail(e: React.ChangeEvent<HTMLInputElement>){
    const value = e.target.value;
    setConfirmEmail(value);

    if(value === email){
      setEmailMatchError("Emails match!");
      setIsEmailMatchValid(true);
    } else {
      setEmailMatchError("Emails must match.");
      setIsEmailMatchValid(false);
    }
  }



  //Username and password state handlers
  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9]*$/;

    if(regex.test(value)){
      setUsername(value);
      setIsUsernameValid(true);
      setUsernameError("Username looks good!");
      console.log(value);
    } else {
      setIsUsernameValid(false);
      setUsernameError("Special characters are not allowed.");
    }

    
    
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setPassword(value);
    console.log(value);
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

    if(regex.test(value)){
      setIsPasswordValid(true);
      setPasswordError("Password is valid!");
    } else {
      setIsPasswordValid(false);
      setPasswordError("Password must have 8 characters with 1 number and 1 special character.");
    }

    if(value === confirmPassword){
      setPasswordMatchError("Passwords match!");
      setIsPasswordMatchValid(true);
    }else {
      setPasswordMatchError("Passwords must match.");
      setIsPasswordMatchValid(false);
    }
  }

  function handleConfirmPassword(e: React.ChangeEvent<HTMLInputElement>){
    const value = e.target.value;
    setConfirmPassword(value);

    if(value === password){
      setPasswordMatchError("Passwords match!");
      setIsPasswordMatchValid(true);
    } else {
      setPasswordMatchError("Passwords must match.");
      setIsPasswordMatchValid(false);
    }
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
      console.log(err);

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
                <small style={{color: isUsernameValid ? "#00FF00" : "white", width: "300px"}}>{usernameError}</small>
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
                  onChange={handleConfirmEmail}
                  type="email"
                  placeholder="Confirm email"
                  className="form-control"
                />
                <small style={{color: isEmailValid ? "#00FF00" : "white", display: "block", width: "300px"}}>{emailError}</small>
                <small style={{color: isEmailMatchValid ? "#00FF00" : "white", display: "block", width: "300px"}}>{emailMatchError}</small>
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
                  onChange={handleConfirmPassword}
                  type="password"
                  placeholder="Confirm password"
                  className="form-control"
                />
                <small style={{color: isPasswordValid ? "#00FF00" : "white", display: "block", width: "300px"}}>{passwordError}</small>
                <small style={{color: isPasswordMatchValid ? "#00FF00" : "white", display: "block", width: "300px"}}>{passwordMatchError}</small>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={styles.button}
                disabled={!isFormValid}
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
