import React from 'react'
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';  
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt, FaFacebookF, FaInstagram } from 'react-icons/fa';
import logo from '../allimage/logo.png';
import { Link } from 'react-router-dom';

function CustomNavbar() { 
  return (
    <div className="p-0 topContainer">
      <Container fluid>
        <Row className="d-none d-lg-flex gx-0">
          {/* Left Side */}
          <Col lg={7} className="px-4 text-start text-white">
            <div className="d-inline-flex align-items-center me-4">
              <small>Your Premier Destination for Data, Airtime, Utility Bills, and More</small>
            </div>
          </Col>

          {/* Right Side */}
          <Col lg={5} className="px-5 text-end">
            <div className="d-inline-flex align-items-center me-4">
              <FaPhoneAlt className="text-white me-2" />
              <small style={{ color: 'rgb(232, 232, 232)' }}>+234 807 280 1879</small>
            </div>
            <div className="d-inline-flex align-items-center mx-n2">
              <a
                className="btn btn-square btn-link rounded-0 border-0 text-white border-end border-secondary"
                href="https://web.facebook.com/profile.php?id=61569335756917"
              >
                <FaFacebookF />
              </a>
              <a className="btn btn-square btn-link rounded-0 text-white" href="#">
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      <BootstrapNavbar expand="lg" className="px-4 navcolor">
        <BootstrapNavbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            width="220"
            height="50"
            className="d-inline-block align-top"
          />
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Button variant="outline-secondary" className="me-2" as={Link} to='/Login'>
              Login
            </Button>
            <Button
              variant="secondary"
              as={Link}
              to="/Register"
              style={{ backgroundColor: "rgb(10, 93, 103)", borderColor: "rgb(10, 93, 103)" }}
            >
              Register
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </div>
  );
}

export default CustomNavbar;
