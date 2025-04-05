import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginForm = ({ setToken, setName, switchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('name', res.data.name);
            setToken(res.data.token);
            setName(res.data.name);
            toast.success('Logged in successfully!');   
        } catch {
            toast.error('Invalid email or password');
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="card shadow-sm p-4 w-100" style={{ maxWidth: '450px' }}>
                <h4 className="text-center mb-3">Login to Leave a Review</h4>
                <form onSubmit={login}>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    <button className="btn btn-primary w-100 mb-2">Login</button>
                </form>

                <div className="text-center">
                    <small>
                        Don’t have an account?{' '}
                        <button
                            className="btn btn-link p-0 align-baseline"
                            onClick={switchToRegister}
                            style={{ fontSize: '0.9rem' }}
                        >
                            Sign up
                        </button>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
