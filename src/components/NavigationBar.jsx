import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    navigate('/')
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Hospital Salvador</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/team">Nuestro equipo</Nav.Link>
          <Nav.Link as={Link} to="/appointments">Agenda tu cita</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"} id="navbarScrollingDropdown">
            {isLoggedIn ? (
              <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
            ) : (
              <>
                <NavDropdown.Item as={Link} to="/login">Iniciar sesión</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">Registrarse</NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
