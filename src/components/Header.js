import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router";
import { authenticateUser } from "./backend";

function Header() {
  const history = useHistory();
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("checkin");
      localStorage.removeItem("count");
      localStorage.removeItem("checkoutCount");
      history.push("/");
    }
  };

  const isAuthenticated = authenticateUser();
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Navbar.Brand href="/" className="navbar__brand">
          Sandesh
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {!isAuthenticated && <Nav.Link href="/login">Login</Nav.Link>}

            {isAuthenticated && (
              <NavDropdown title="Device" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/device/all">
                  Show all Devices
                </NavDropdown.Item>
                <NavDropdown.Item href="/device/create">
                  Add Device
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {isAuthenticated && (
              <>
                <Nav.Link href="/history">User History</Nav.Link>
              </>
            )}

            {isAuthenticated && (
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          {isAuthenticated && (
            <p style={{ color: "#C370F1", marginLeft: "10px" }}>
              {localStorage.getItem("user")}
            </p>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
