import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import styles from "../style/PasswordReset.module.css";

import { PathContext } from "../utils/PathProvider";

const ResetPg: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const serverPath: string = useContext(PathContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [isPasswordMatchValid, setIsPasswordMatchValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFormValid = isPasswordValid && isPasswordMatchValid;

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid or missing reset token. Please check your link.");
    }
  }, [token]);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (regex.test(value)) {
      setIsPasswordValid(true);
      setPasswordError("");
    } else {
      setIsPasswordValid(false);
      setPasswordError("Password must have 8 characters with 1 number and 1 special character.");
    }

    if (value === confirmPassword) {
      setIsPasswordMatchValid(true);
      setPasswordMatchError("");
    } else {
      setIsPasswordMatchValid(false);
      setPasswordMatchError("Passwords must match.");
    }
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value === password) {
      setIsPasswordMatchValid(true);
      setPasswordMatchError("");
    } else {
      setIsPasswordMatchValid(false);
      setPasswordMatchError("Passwords must match.");
    }
  };

  const resetPass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tempPassword = {
        newPassword: password,
        token,
      };

      const response = await sendToken(tempPassword);
      console.log(response);
      navigate("/login");
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const sendToken = async (currUser: object) => {
    const apiURL = `${serverPath}api/resetPassword/${token}`;
    const resp = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currUser),
    });

    const stat = await resp.json();
    if (!resp.ok) {
      throw new Error(stat.message || "Failed to reset password.");
    }
    return stat;
  };

  return (
    <section className={styles.Email}>
      <Container className={styles.contain}>
        <Card className={styles.card}>
          <Card.Body className={styles.formBody}>
            <img src={logo} alt="Steeze logo" className={styles.logo} />
            <Form onSubmit={resetPass}>
              <Form.Group controlId="formPassword" className={styles.passForm}>
                <Form.Control
                  onChange={handlePassword}
                  type="password"
                  placeholder="Enter password"
                />
                <small style={{ color: isPasswordValid ? "#00FF00" : "white" }}>
                  {passwordError}
                </small>
              </Form.Group>
              <Form.Group controlId="formPasswordConfirm" className={styles.passForm}>
                <Form.Control
                  onChange={handleConfirmPassword}
                  type="password"
                  placeholder="Confirm password"
                />
                <small style={{ color: isPasswordMatchValid ? "#00FF00" : "white" }}>
                  {passwordMatchError}
                </small>
              </Form.Group>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <Button
                variant="primary"
                type="submit"
                className={styles.button}
                disabled={!isFormValid}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default ResetPg;
