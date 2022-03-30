import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import {
  displayDevicebyId,
  displayUser,
  updateDeviceByID,
  updateUserByID
} from "../backend";
import Base from "../Base";

function Checkin(props) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [device, setDevice] = useState([]);
  const [disable, setDisable] = React.useState(false);
  var count = 0;
  const [user, setUser] = useState({
    name: localStorage.getItem("user"),
    count: ""
  });
  const [dev, setDev] = useState({
    device: "",
    os: "",
    manufacturer: "",
    lastCheckedOutDate: "",
    lastCheckedOutBy: localStorage.getItem("user")
  });

  useEffect(() => {
    setMessage("");
    setError("");
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (today.getHours() <= 9 || today.getHours() >= 17) {
      setDisable(true);
      setError("CheckOut Only available from 9:00am - 5:00pm");
    }
    displayUser(localStorage.getItem("user")).then(res => {
      if (res.data.count > 10) {
        setDisable(true);
        setError("Only 10 devices are allowed in Garage");
      }
    });
    localStorage.setItem("checkin", date + "T" + time);
    displayDevicebyId(props.match.params.deviceid)
      .then(res => {
        if (res.StatusCOde === 200) {
          setDevice(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    setMessage("");
    setError("");
    var today = new Date();
    setDisable(true);
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    localStorage.setItem(
      "checkin",
      localStorage.getItem("checkin") + "-" + time
    );
    setDev(
      (dev.device = device.device),
      (dev.os = device.os),
      (dev.manufacturer = device.manufacturer),
      (dev.lastCheckedOutDate = localStorage.getItem("checkin"))
    );
    updateDeviceByID(dev, props.match.params.deviceid)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
    setMessage("Successfully Checked Out");

    displayUser(localStorage.getItem("user")).then(res => {
      count = res.data.count + 1;
      setUser((user.count = count));
      updateUserByID(user, res.data.id).then(res1 => {});
    });
  };

  return (
    <Base>
      <div>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Card
          border="primary"
          style={{ width: "30rem", height: "30rem", textAlign: "center" }}
        >
          <Card.Img
            variant="top"
            src="https://media.istockphoto.com/vectors/human-hand-holding-smartphone-phone-holding-flat-icon-vector-vector-id1086008982?k=20&m=1086008982&s=612x612&w=0&h=FplzbdzksEJEvR-ml3v4xo2QyaX3ecbCvTmNiXm-vnM="
          />
          <Card.Body>
            <Card.Title>{device.device}</Card.Title>
            <hr />
            <p>OS : {device.os}</p>
            <p>Manufacturer : {device.manufacturer}</p>
            <Button disabled={disable} variant="primary" onClick={handleClick}>
              CheckOut
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Base>
  );
}

export default Checkin;
