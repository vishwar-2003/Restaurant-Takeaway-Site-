import React, { useState } from 'react';
import './AdminLogin.css';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaIdCard } from 'react-icons/fa';

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        adminId: ''
    });
    const [errorMessage, setErrorMessage] = useState(null); // To show error messages

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Change the URL to point to the correct backend server port (5000)
            const response = await fetch('http://localhost:5000/api/admin/auth/adminLogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('Login Response:', data);  // Log the response from backend

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);  // Save token in localStorage
                window.location.href = '/admin'; // Redirect to dashboard
            } else {
                alert(data.message);  // Show error message
            }
        } catch (error) {
            console.error('Login failed:', error);  // Log any errors
            alert('Login failed');
        }
    };




    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-overlay"></div>
            <div className="admin-login-form-container">
                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <h2>Admin Login</h2>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <div className="form-group">
                        <div className="input-icon-wrapper">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username/Email"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-icon-wrapper">
                            <FaLock className="input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-icon-wrapper">
                            <FaIdCard className="input-icon" />
                            <input
                                type="text"
                                name="adminId"
                                placeholder="Admin ID (Optional)"
                                value={formData.adminId}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>

                    <p className="security-message">
                        Only authorized users can access the admin panel
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
