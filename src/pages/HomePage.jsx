import React from 'react'
import navbar from "../component/navbar/Navbar"
import { Container, Row, Col } from "react-bootstrap";

function HomePage() {
  return (
    <div>
      <Navbar/>


      <Container className="my-5">
      <Row className="align-items-center">
        {/* Text Column */}
        <Col md={6} className="mb-4 mb-md-0">
          <h2 className="mb-3">Welcome to Our Platform</h2>
          <p>
            Discover the best services and products tailored to meet your needs.
            Our mission is to provide quality and reliability in everything we
            do. Join us today and experience excellence.
          </p>
        </Col>

        {/* Image Column */}
        <Col md={6}>
          <img
            src="https://via.placeholder.com/500" // Replace with your image URL or path
            alt="Description of the image"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
    </div>

    
  )
}

export default HomePage
