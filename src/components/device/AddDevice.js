import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { createDevice } from "../backend";
import Base from "../Base";

function AddDevice() {
  const [device, setDevice] = useState({
    device: "",
    os: "",
    manufacturer: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleDeviceName = event => {
    const name = event.target.value;
    setDevice({ ...device, device: name });
  };

  const handleos = event => {
    const unit = event.target.value;
    setDevice({ ...device, os: unit });
  };

  const handlemanu = event => {
    const manu = event.target.value;
    setDevice({ ...device, manufacturer: manu });
  };

  const handleClick = () => {
    setError("");
    setMessage("");

    createDevice(device)
      .then(data => {
        if (data.StatusCOde === 201) {
          setMessage(data.message);
        } else if (data.StatusCOde === 400) {
          setError(data.errors);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Base>
      <p></p>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {/* {loading} */}
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Device Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Device Name"
                  onChange={handleDeviceName}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Operating System</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Operating System"
                  onChange={handleos}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Manufacturer name"
                  onChange={handlemanu}
                />
              </Form.Group>

              <Button variant="success" type="button" onClick={handleClick}>
                ADD
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}
export default AddDevice;
