import React, { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser } from '../api'; // Import the necessary API functions
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Button, Table, Form, InputGroup } from 'react-bootstrap'; // Import React Bootstrap components
import './UserManagementPage.css';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editedUser, setEditedUser] = useState(null); // For editing user details
  const [newName, setNewName] = useState(''); // To update the user's name
  const [newEmail, setNewEmail] = useState(''); // To update the user's email
  const [newRole, setNewRole] = useState(''); // To update the user's role
  const [saving, setSaving] = useState(false); // For saving state

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const data = await getUsers(token);
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle user update (name, email, role)
  const handleUpdateUser = async (userId) => {
    setSaving(true); // Start saving process
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      
      // Conditionally update name, email, and role
      const updatedUser = {
        name: newName || undefined,  // If newName is provided, use it; otherwise, leave it unchanged
        email: newEmail || undefined, // If newEmail is provided, use it; otherwise, leave it unchanged
        role: newRole || undefined,   // If newRole is provided, use it; otherwise, leave it unchanged
      };

      // Remove undefined values from updatedUser object to avoid overwriting with undefined
      const filteredUpdatedUser = Object.fromEntries(
        Object.entries(updatedUser).filter(([_, value]) => value !== undefined)
      );

      const data = await updateUser(userId, filteredUpdatedUser, token);

      // Optimistically update the user data
      setUsers(users.map((user) => (user._id === userId ? { ...user, ...filteredUpdatedUser } : user)));
      setEditedUser(null); // Reset the editing form
      setNewName('');
      setNewEmail('');
      setNewRole('');

      // Show success SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'User Updated',
        text: 'User details have been successfully updated.',
      });
    } catch (err) {
      setError('Failed to update user details');

      // Show error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an error updating the user details. Please try again.',
      });
    } finally {
      setSaving(false); // Stop saving process
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      await deleteUser(userId, token);

      // Optimistically remove the deleted user
      setUsers(users.filter((user) => user._id !== userId));

      // Show success SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'User Deleted',
        text: 'The user has been successfully deleted.',
      });
    } catch (err) {
      setError('Failed to delete user');

      // Show error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: 'There was an error deleting the user. Please try again.',
      });
    }
  };

  return (
    <div>
      <h2>User Management</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {editedUser && editedUser._id === user._id ? (
                    <InputGroup>
                      <Form.Control
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="New Name"
                      />
                    </InputGroup>
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editedUser && editedUser._id === user._id ? (
                    <InputGroup>
                      <Form.Control
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="New Email"
                      />
                    </InputGroup>
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editedUser && editedUser._id === user._id ? (
                    <Form.Control
                      as="select"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </Form.Control>
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editedUser && editedUser._id === user._id ? (
                    <Button
                      variant="primary"
                      onClick={() => handleUpdateUser(user._id)}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                  ) : (
                    <Button variant="warning"  onClick={() => setEditedUser(user)}>
                      Edit
                    </Button>
                  )}
                  <Button variant="danger"className='mx-1' onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserManagementPage;
