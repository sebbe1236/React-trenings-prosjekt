import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import AuthContext, { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Navigation() {
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  function logout() {
    setAuth(null);

    navigate("/");
  }

  return (
    <>
      <Navbar bg="dark" variant={"dark"} expand="lg">
        <Container>
          <Navbar.Brand href="/">Sports blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="text-center">
              <Link className="nav_links" to="/">
                Home
              </Link>
              <Link to="/products">Products</Link>
              {auth ? (
                <>
                  <Link to="/addpost">Add post</Link> | <Button onClick={logout}>Log Out</Button>
                </>
              ) : (
                <Link to="/login">Admin login</Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
