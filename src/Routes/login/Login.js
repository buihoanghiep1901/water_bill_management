
// @ts-nocheck
import React, { useState } from "react";
import { signInWithEmailAndPassword} from "firebase/auth";
import { Form, Button, Alert,Row, Col} from "react-bootstrap";
import BackgroundImage from "../../assets/images/signin.jpg";
import "./login.css";

import { auth } from "../../config/firebase_config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const Navigate=useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(1000);

    signInWithEmailAndPassword(auth, inputUsername, inputPassword)
      .then((userCredential) => {
        const user = userCredential;
        console.log('Login success, user is : '+JSON.stringify(user));
        Navigate("/main")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('This is err from Login: '+errorCode + errorMessage)
        error&&setShow(true);
      });

    setLoading(false);
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return (
    <div>
      <Row className="bg-white ">
        <Col className="login__image" sm={8} style={{ backgroundImage: `url(${BackgroundImage})` }}></Col>
        
        <Col sm={4} className="p-0 form__wrapper">
          <div className="w-100">
            <h1 className="text-primary fs-2 mb-5 text-center  ">Water bill management</h1>
            <h1 className="text-primary fs-4 text-start ps-5 ">Nice to see you again</h1>
            <Form className="p-5" onSubmit={handleSubmit}>

              <Form.Group controlId="form-group-id" className="mb-3" >
                <Form.Label className="fw-bold text-primary justify-content-start d-flex" required  >Email</Form.Label>
                <Form.Control 
                  type="text" 
                  value={inputUsername} 
                  onChange={e=>{setInputUsername(e.target.value)}} 
                  placeholder="Enter your email here" />         
              </Form.Group>

              <Form.Group controlId="form-group-id" className="mb-5">
                <Form.Label className="fw-bold text-primary justify-content-start d-flex"  required>Password</Form.Label>
                <Form.Control  
                  type="password" 
                  value={inputPassword}
                  onChange={e=>{setInputPassword(e.target.value)}}
                  placeholder="Enter password" />
              </Form.Group>

              {!loading ? (
                <Button className="w-100" variant="primary" type="submit">
                  Log In
                </Button>
              ) : (
                <Button className="w-100" variant="primary" type="submit" disabled>
                  Logging In...
                </Button>
              )}
              
              {show && (
                <Alert
                  className="mt-2"
                  variant="danger"
                  onClose={() => setShow(false)}
                  dismissible
                >
                  Incorrect username or password.
                </Alert>
              )}
            </Form>
          </div>
        </Col>
      </Row>
    </div>
    );
  };
  
  export default Login;