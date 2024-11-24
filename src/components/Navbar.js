import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Swal from 'sweetalert2';

const NavigationBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
        Swal.fire('Logged out', 'You have been successfully logged out.', 'success');
      }
    });
  };
  

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">RBAC App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                {(user.role === 'admin' || user.role === 'superadmin') && (
                    <>
                <Nav.Link as={Link} to="/dashboard" activeclassname="active">
                  Dashboard
                </Nav.Link>
                  <Nav.Link as={Link} to="/users" activeclassname="active">
                    User Management
                  </Nav.Link>
                </>
                )}
                <Nav.Link as={Link} to="/" activeclassname="active">
                  Tutorials
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" activeclassname="active">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" activeclassname="active">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <Navbar.Text className="text-white me-3">
                  Hello, {user.name || 'User'}!
                </Navbar.Text>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
