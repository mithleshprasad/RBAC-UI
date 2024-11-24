import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getUsers, getTutorials } from '../api'; // Import API functions
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom';

const DashboardPage = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingTutorials, setLoadingTutorials] = useState(true);
  const [error, setError] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch users and tutorials when the component mounts
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        // const data = await getUsers(token);
        const usersData = await getUsers(token);
        setUsers(usersData);
        setLoadingUsers(false);
      } catch (error) {
        setError('Failed to load users.');
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error',
        //   text: 'Failed to fetch users data',
        // });
      }

      try {
        const token = JSON.parse(localStorage.getItem('user')).token;

        const tutorialsData = await getTutorials(token);
        setTutorials(tutorialsData);
        setLoadingTutorials(false);
      } catch (error) {
        setError('Failed to load tutorials.');
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Error',
        //   text: 'Failed to fetch tutorials data',
        // });
      }
    };

    fetchData();
  }, [token]);

//   if (loadingUsers || loadingTutorials) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <Spinner animation="border" />
//       </div>
//     );
//   }

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      {error && <Alert variant="danger">{error}</Alert>} {/* Show error alert if any */}

      <Row>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>Manage {users.length} users in the application.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Tutorials</Card.Title>
              <Card.Text>View and manage {tutorials.length} tutorials.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Reports</Card.Title>
              <Card.Text>View reports and analytics.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
