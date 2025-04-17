import React, { useState } from 'react'; // Importing React and useState hook for managing state
import '../styles/admin/AdminLogin.css'; // Import the custom CSS for the login page
import { FaEye, FaEyeSlash, FaUser, FaLock, FaIdCard } from 'react-icons/fa'; // Importing necessary icons

/**
 * AdminLogin component handles the admin login functionality.
 * It includes form inputs for username, password, and an optional admin ID.
 * It also includes a password visibility toggle and error handling.
 */
const AdminLogin = () => {
    // State to toggle password visibility (show/hide)
    const [showPassword, setShowPassword] = useState(false);

    // State to manage form input data
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        adminId: ''
    });

    // State to manage error message display
    const [errorMessage, setErrorMessage] = useState(null);

    /**
     * Handle input changes for form fields.
     * It updates the respective input field in the formData state.
     * @param {Object} e - The event object for the input change
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value // Dynamically updating the input fields in state
        }));
    };

    /**
     * Handle form submission for login.
     * It sends a POST request with the form data to the backend for authentication.
     * @param {Object} e - The form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await fetch('http://localhost:5000/api/admin/auth/adminLogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), // Sending form data as JSON
            });

            const data = await response.json(); // Parsing the JSON response from the backend

            // If login is successful, store the token and redirect to the admin dashboard
            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                window.location.href = '/admin'; // Redirect to the admin dashboard page
            } else {
                setErrorMessage(data.message || 'Login failed'); // Display error message if login fails
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Login failed. Please try again.'); // Display error message in case of network or other issues
        }
    };

    /**
     * Toggle the visibility of the password.
     * Switch between 'password' and 'text' type for the password input field.
     */
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-overlay"></div> {/* Background overlay for the login page */}
            <div className="admin-login-form-container">
                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <h2>Admin Login</h2>

                    {/* Display error message if any */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {/* Username input field */}
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

                    {/* Password input field with a toggle for visibility */}
                    <div className="form-group">
                        <div className="input-icon-wrapper">
                            <FaLock className="input-icon" />
                            <input
                                type={showPassword ? "text" : "password"} // Toggle between password and text types
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            {/* Button to toggle password visibility */}
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Optional Admin ID input field */}
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

                    {/* Submit button to trigger login */}
                    <button type="submit" className="login-button">
                        Login
                    </button>

                    {/* Security message */}
                    <p className="security-message">
                        Only authorized users can access the admin panel
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
