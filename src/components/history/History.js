import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { displayCheckedDevice } from "../backend";
import Base from "../Base";

function History() {
  const [proList, setProList] = useState([]);

  useEffect(() => {
    displayCheckedDevice()
      .then(res => {
        if (res.StatusCOde === 200) {
          setProList(res.data);
        } else {
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Base>
      <Container fluid="md">
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>ID</th>
                  <th>Device Name</th>
                  <th>Operating System</th>
                  <th>Manufacturer Name</th>
                  <th>Checked Out Date</th>
                  <th>Last User to check-Out Device</th>
                </tr>
              </thead>
              <thead></thead>
              <tbody>
                {proList.map((history, index) => {
                  return (
                    <tr key={history.id}>
                      <td>{index + 1}</td>
                      <td>{history.id}</td>
                      <td>{history.device}</td>
                      <td>{history.os}</td>
                      <td>{history.manufacturer}</td>
                      <td>{history.lastCheckedOutDate}</td>
                      <td>{history.lastCheckedOutBy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default History;
