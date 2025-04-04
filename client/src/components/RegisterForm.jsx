import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegisterForm = ({ switchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (pw) => {
        const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // allows special characters too
        return regex.test(pw);
    };

    const getStrengthClass = () => {
        if (password.length >= 8) return 'bg-success';
        if (password.length >= 5) return 'bg-warning';
        return 'bg-danger';
    };

    const register = async (e) => {
        e.preventDefault();
        setError('');

        if (!validatePassword(password)) {
            const msg = "Password must be at least 6 characters, contain an uppercase letter and a number.";
            setError(msg);
            toast.error("Weak password. Please follow the rules.");
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password,
            });
            toast.success("Registration successful! You can now log in.");
            switchToLogin();
        } catch (err) {
            const errMsg = err.response?.data?.error || 'Registration failed.';
            setError(errMsg);
            toast.error(errMsg);
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '450px' }}>
                <h4 className="text-center mb-3">Sign Up to Leave a Review</h4>
                <form onSubmit={register}>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Password strength meter */}
                    {password && (
                        <div className="mb-2">
                            <div className="progress">
                                <div
                                    className={`progress-bar ${getStrengthClass()}`}
                                    role="progressbar"
                                    style={{
                                        width: `${Math.min(password.length * 12, 100)}%`,
                                        transition: 'width 0.3s ease',
                                    }}
                                ></div>
                            </div>
                            <small className="text-muted">Password strength</small>
                        </div>
                    )}

                    {error && <div className="text-danger mb-2">{error}</div>}

                    <button className="btn btn-success w-100 mb-2">Register</button>
                </form>

                <div className="text-center">
                    <small>
                        Already have an account?{" "}
                        <button
                            className="btn btn-link p-0 align-baseline"
                            onClick={switchToLogin}
                            style={{ fontSize: "0.9rem" }}
                        >
                            Log in
                        </button>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
