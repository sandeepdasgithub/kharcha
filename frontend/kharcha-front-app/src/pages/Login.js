// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import api from '../api';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error message
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await api.post("/login", {
                email,
                password,
            });
            console.log("Login successful:", response.data);
            sessionStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("There was an error logging in!", error);
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <div className="row justify-content-md-center mt-5">
           
            <div className="col-4">
                <div className="card">
                <h1 className="text-center">Login</h1>
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">email</label>
                                <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;