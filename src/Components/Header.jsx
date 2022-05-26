import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import logo from "../logo.png";
import { House, Gear, Power } from "react-bootstrap-icons";
const Header = () => {
  return (
    <div className="header_top">
      <Container>
        <Row className="align-items-center justify-content-center">
          <Col lg={10} className="mt-4">
            <Card border="dark" bg="dark" text="white">
              <Card.Body className="text-center pb-0">
                <img src={logo} alt="logo" height={50} />
                <Card.Title className="text-center text-yellow mt-3">
                  <strong className="text-white">AdvWish </strong>
                  Dashboard
                  <Nav className="text-center justify-content-center mt-2">
                    <Nav.Item>
                      <Link
                        className="text-decoration-none text-white small text-sm"
                        to="/dashboard"
                      >
                        <small>
                          <House className="me-1 text-yellow" />
                          Dashboard
                        </small>
                      </Link>
                    </Nav.Item>
                    <Nav.Item className="ms-3">
                      <Link
                        className="text-decoration-none text-white small text-sm"
                        to="/home"
                      >
                        <small>
                          <Gear className="me-1 text-yellow" /> Settings
                        </small>
                      </Link>
                    </Nav.Item>
                    <Nav.Item className="ms-3">
                      <Link
                        className="text-decoration-none text-white small text-sm"
                        to="/logout"
                      >
                        <small>
                          <Power className="me-1 text-yellow" />
                          Logout
                        </small>
                      </Link>
                    </Nav.Item>
                  </Nav>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
