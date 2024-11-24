import React, { useState, useEffect } from 'react';
import { getTutorials, createTutorial, updateTutorial, deleteTutorial } from '../api';
import Swal from 'sweetalert2';

const TutorialManagementPage = () => {
  const [tutorials, setTutorials] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editingTutorial, setEditingTutorial] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  // Get the user and role information from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;
  const role = user ? user.role : null;  // Assuming role is part of user object

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const data = await getTutorials(token);
        setTutorials(data);
      } catch (err) {
        Swal.fire('Error', 'Failed to fetch tutorials', 'error');
      }
    };
    fetchTutorials();
  }, [token]);

  const handleCreateTutorial = async () => {
    try {
      const data = await createTutorial({ title: newTitle, content: newContent }, token);
      setTutorials([...tutorials, data]);
      setNewTitle('');
      setNewContent('');
      Swal.fire('Success', 'Tutorial added successfully!', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to add tutorial', 'error');
    }
  };

  const handleEditTutorial = async (tutorialId) => {
    try {
      const updatedData = await updateTutorial(
        tutorialId,
        { title: editedTitle, content: editedContent },
        token
      );
      setTutorials(
        tutorials.map((tutorial) =>
          tutorial._id === tutorialId ? updatedData.tutorial : tutorial
        )
      );
      setEditingTutorial(null);
      setEditedTitle('');
      setEditedContent('');
      Swal.fire('Success', 'Tutorial updated successfully!', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to update tutorial', 'error');
    }
  };

  const handleDeleteTutorial = async (tutorialId) => {
    try {
      await deleteTutorial(tutorialId, token);
      setTutorials(tutorials.filter((tutorial) => tutorial._id !== tutorialId));
      Swal.fire('Success', 'Tutorial deleted successfully!', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to delete tutorial', 'error');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tutorial Management</h2>

      {/* Only show the tutorial creation section if the user is an admin or superadmin */}
      {role === 'admin' || role === 'superadmin' ? (
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter Tutorial Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Enter Tutorial Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleCreateTutorial}>
            Add Tutorial
          </button>
        </div>
      ) : null}

      {/* If the user is admin or superadmin, show tutorials in a table */}
      {(role === 'admin' || role === 'superadmin') && (
        <table className="table table-bordered table-striped mt-4">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutorials.map((tutorial) => (
              <tr key={tutorial._id}>
                <td>
                  {editingTutorial === tutorial._id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    tutorial.title
                  )}
                </td>
                <td>
                  {editingTutorial === tutorial._id ? (
                    <textarea
                      className="form-control"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                  ) : (
                    tutorial.content
                  )}
                </td>
                <td>
                  {editingTutorial === tutorial._id ? (
                    <>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleEditTutorial(tutorial._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary mt-1"
                        onClick={() => setEditingTutorial(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => {
                          setEditingTutorial(tutorial._id);
                          setEditedTitle(tutorial.title);
                          setEditedContent(tutorial.content);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mt-1"
                        onClick={() => handleDeleteTutorial(tutorial._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* If the user is a regular user, show tutorials in a card layout */}
      {(role !== 'admin' && role !== 'superadmin') && (
        <div className="row mt-4">
          {tutorials.length > 0 ? (
            tutorials.map((tutorial) => (
              <div className="col-md-4 mb-4" key={tutorial._id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{tutorial.title}</h5>
                    <p className="card-text">{tutorial.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No tutorials available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TutorialManagementPage;
