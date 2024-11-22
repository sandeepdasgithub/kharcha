import React from 'react';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function Home() {
  const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };
  return (
    <div className="row justify-content-md-center mt-5">
       
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Home</h5>
              <p className="card-text">Welcome to the HomePage! Here you can find various statistics and information.</p>
              
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;