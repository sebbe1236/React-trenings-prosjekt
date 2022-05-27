import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import AuthContext, { useAuth } from "../context/Authcontext";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "bootstrap";

function Navigation() {
  const [auth, setAuth] = useAuth();

  const history = useNavigate();

  function logout() {
    setAuth(null);
    history.push("/");
  }

  return (
    <>
      <Navbar bg="dark" variant={"dark"} expand="lg">
        <Container>
          <Navbar.Brand href="/">Sportss blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="text-center">
              <Link className="nav_links" to="/">
                Home
              </Link>
              {auth ? (
                <Link to="/blogs">Blogs</Link> | <Button onClick={logout}>Log Out</Button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
