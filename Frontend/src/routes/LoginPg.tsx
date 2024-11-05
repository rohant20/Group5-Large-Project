import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/LoginPg.css';
import logo from '../assets/logo.jpg';

interface FormValues {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

const LoginPg: React.FC = () => {
  const initialValues: FormValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("Form submitted successfully:", formValues);
    }
  }, [formErrors, isSubmit, formValues]);

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  return (
    <section className="Login">
      <Container>
        <Card className="card">
          <Card.Body className="d-flex flex-column align-items-center"> 
            <img src={logo} alt="Steeze logo" className="logo" />

            <Form className="loginForm" onSubmit={handleSubmit}> 
              <Form.Group controlId="formUser" className="mb-3">
                <input
                  type="text" 
                  name="username"
                  placeholder="Username" 
                  className="form-control" 
                  value={formValues.username}
                  onChange={handleChange}
                />
              </Form.Group>
              {formErrors.username && <p className="error-text">{formErrors.username}</p>}

              <Form.Group controlId="formPassword" className="mb-4">
                <input
                  type="password"
                  name="password" 
                  placeholder="Password" 
                  className="form-control" 
                  value={formValues.password}
                  onChange={handleChange}
                />
              </Form.Group>
              {formErrors.password && <p className="error-text">{formErrors.password}</p>}

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 login-button"
                style={{
                  transition: 'background-color 0.3s, border-color 0.3s',
                  width: '6rem',
                  height: '2rem',
                  borderWidth: '2px',
                  borderColor: 'black',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'black';
                  e.currentTarget.style.color = 'white';
                }} 
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'black';
                }} 
              >
                Login
              </Button>
            </Form>
            
            <div className="links">
              <Link to="/signup" className="signup-link">
                Don’t have an account? Sign Up
              </Link>
              <Link to="/email" className="email-link">
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
