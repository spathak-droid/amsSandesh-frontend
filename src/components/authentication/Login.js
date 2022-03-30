import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import { createUser } from "../backend";
import Base from "../Base";

function Login() {
  const [loginUser, setLoginUser] = useState({
    name: "",
    password: ""
  });

  const [doRidirect, setDoRidirect] = useState(false);
  var count = 0;
  const [user, setUser] = useState({
    name: "",
    count: ""
  });

  const handleName = e => {
    const name = e.target.value;
    setLoginUser({ ...loginUser, name: name });
  };

  const handlePassword = e => {
    const pass = e.target.value;
    setLoginUser({ ...loginUser, password: pass });
  };

  const handleClick = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", loginUser.name);
      setDoRidirect(true);
    }
    setUser((user.count = count), (user.name = localStorage.getItem("user")));
    createUser(user)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };
  const performRidirect = () => {
    return <Redirect to="/"></Redirect>;
  };
  return (
    <Base>
      <div className="app-login">
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              {doRidirect && performRidirect()}
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleName}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handlePassword}
                  />
                </Form.Group>

                <Button variant="primary" type="button" onClick={handleClick}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
}

export default Login;
