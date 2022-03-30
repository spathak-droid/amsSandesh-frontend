import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteDevice, displayDevice } from "../backend";
import Base from "../Base";

function DisplayDevice() {
  const [proList, setProList] = useState([]);
  const [userLength, setUserLength] = useState(0);
  const [count1, setCount1] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    displayDevice()
      .then(res => {
        if (res.StatusCOde === 200) {
          console.log(res);
          setProList(res.data);
        } else {
          setError(res.error);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [count1]);

  const handledelete = deviceID => {
    deleteDevice(deviceID)
      .then(res => {
        if (res.StatusCOde === 200) {
          setMessage(res.message);
          setUserLength(userLength - 1);
          setCount1(count1 - 1);
        } else {
          setError(res.error);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Base>
      <Container fluid="md">
        <Row>
          {message && <Alert variant="danger">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Col>
            {proList && (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>ID</th>
                    <th>Device Name</th>
                    <th>Operating System</th>
                    <th>Manufacturer</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <thead></thead>
                <tbody>
                  {proList.map((device, index) => {
                    return (
                      <tr key={device.id}>
                        <td>{index + 1}</td>
                        <td>{device.id}</td>
                        <td>
                          {device.checkedOut === false ? (
                            <Link to={`/checkin/${device.id}`}>
                              {device.device}
                            </Link>
                          ) : (
                            `${device.device}`
                          )}
                        </td>
                        <td>{device.os}</td>
                        <td>{device.manufacturer}</td>
                        <td>
                          {/* <Link to = {`/update/product/${device.id}`}><Button variant="outline-info">Update</Button></Link> */}
                          <Button
                            variant="outline-danger"
                            onClick={() => handledelete(device.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default DisplayDevice;
