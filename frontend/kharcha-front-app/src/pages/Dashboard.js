import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // State to hold user data

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        console.log(response.data); // Log the response data
        setUsers(response.data.users); // Access the users array from the response
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="row justify-content-md-center mt-5">
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Dashboard</h5>
            <p className="card-text">Welcome to the dashboard! Here you can find various statistics and information.</p>
            <Button variant="primary" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>
      <div className="col-12 mt-4">
        <h5>User List</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name || ''}</td>
                <td>{user.user_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;