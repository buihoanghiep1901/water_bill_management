
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
        const user = userCredential.user;
        console.log('Login success, user is'+user);
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
  // <div
  //   className="sign-in__wrapper"
  //   style={{ backgroundImage: `url(${BackgroundImage})` }}
  // >
  //   {/* Overlay */}
  //   {/* <div className="sign-in__backdrop"></div> */}
  //   <div></div>
  //   {/* Form */}
  //   <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
  //     {/* Header */}
  //     <img
  //       className="img-thumbnail mx-auto d-block mb-2"
  //       src={Logo}
  //       alt="logo"
  //     />
  //     <div className="h4 mb-2 text-center">Sign In</div>
  //     {/* ALert */}
  //     {show ? (
  //       <Alert
  //         className="mb-2"
  //         variant="danger"
  //         onClose={() => setShow(false)}
  //         dismissible
  //       >
  //         Incorrect username or password.
  //       </Alert>
  //     ) : (
  //       <div />
  //     )}

  //     <Form.Group className="mb-2" controlId="username">
  //       <Form.Label>Username</Form.Label>
  //       <Form.Control
  //         type="text"
  //         value={inputUsername}
  //         placeholder="Username"
  //         onChange={(e) => setInputUsername(e.target.value)}
  //         required
  //       />
  //     </Form.Group>

  //     <Form.Group className="mb-2" controlId="password">
  //       <Form.Label>Password</Form.Label>
  //       <Form.Control
  //         type="password"
  //         value={inputPassword}
  //         placeholder="Password"
  //         onChange={(e) => setInputPassword(e.target.value)}
  //         required
  //       />
  //     </Form.Group>

  //     <Form.Group className="mb-2" controlId="checkbox">
  //       <Form.Check type="checkbox" label="Remember me" />
  //     </Form.Group>
      
  //     {!loading ? (
  //       <Button className="w-100" variant="primary" type="submit">
  //         Log In
  //       </Button>
  //     ) : (
  //       <Button className="w-100" variant="primary" type="submit" disabled>
  //         Logging In...
  //       </Button>
  //     )}
  //     <div className="d-grid justify-content-end">
  //       <Button
  //         className="text-muted px-0"
  //         variant="link"
  //         onClick={handlePassword}
  //       >
  //         Forgot password?
  //       </Button>
  //     </div>
  //   </Form>
    
  //   {/* Footer */}
  //   <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
  //     Made by Hendrik C | &copy;2022
  //   </div>
  // </div>
