// src/Register.js
import React, { useState } from "react";
import api from '../api'; // Import the custom Axios instance
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';

function Register() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [user_name, setUserName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState(null); // State to store error messages
    const [success, setSuccess] = useState(null); // State to store success messages


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await api.post("/register", {
                first_name,
                last_name,
                user_name,
                phone,
                email,
                password,
                password_confirmation
            });

            console.log("Registration successful:", response.data);
            setSuccess("Registration successful!");
            window.location.reload(); 
        } catch (error) {
            console.error("There was an error registering!", error);
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Registration failed. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <h1 className="text-center">Register</h1>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={first_name} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="last_name">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={last_name} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="user_name">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={user_name} 
                                        onChange={(e) => setUserName(e.target.value)} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={phone} 
                                        onChange={(e) => setPhone(e.target.value)} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password_confirmation">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        value={password_confirmation} 
                                        onChange={(e) => setPasswordConfirmation(e.target.value)} 
                                        required 
                                    />
                                </Form.Group>
                                <Button type="submit" className="w-100">Register</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;