import React, { useState } from "react";
import "./styles/SignInForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const SignInForm = ({ setToken, setName }) => {
  const [formType, setFormType] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect query param (e.g. /signin?redirect=/reviews)
  const redirectTo =
    new URLSearchParams(location.search).get("redirect") || "/home";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (pw) => /^(?=.[A-Z])(?=.\d).{6,}$/.test(pw);
  const isPasswordStrong = () => validatePassword(form.password);

  const getStrengthClass = () => {
    if (form.password.length >= 8) return "bg-success";
    if (form.password.length >= 5) return "bg-warning";
    return "bg-danger";
  };

  const getStrengthEmoji = () => {
    if (form.password.length >= 8) return "🔥";
    if (form.password.length >= 5) return "😊";
    return "😐";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      // Store the user data in local storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("customerId", res.data.customerId);

      // Update state if necessary
      if (setToken) setToken(res.data.token);
      if (setName) setName(res.data.name);

      toast.success("Logged in successfully!");

      // First, navigate to the correct page
      navigate(redirectTo);

      // Then force a page refresh
      window.location.reload();
    } catch {
      toast.error("Invalid email or password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isPasswordStrong()) {
      toast.error(
        "Password must be at least 6 characters, include an uppercase letter and a number."
      );
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Registration successful! You can now log in.");
      setFormType("login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="signin-page-layout">
      <div className="signin-left">
        <h1 className="signin-heading">
          {formType === "login" ? (
            <>
              Sign In to <br />
              get your <span className="food-highlight">Food</span>
            </>
          ) : (
            <>
              Register now <br />
              & grab your <span className="food-highlight">Food!</span>
            </>
          )}
        </h1>

        <div className="signin-info">
          {formType === "login" ? (
            <>
              <p>If you don't have an account</p>
              <motion.button
                onClick={() => setFormType("register")}
                className="register-link"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Register here!
              </motion.button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>
              <motion.button
                onClick={() => setFormType("login")}
                className="register-link"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Log in here!
              </motion.button>
            </>
          )}
        </div>
      </div>

      <motion.div
        className="signin-card-modern"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <motion.div
          className="signin-tab"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => setFormType("login")}
            className={formType === "login" ? "active-tab" : "inactive-tab"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
          <motion.button
            onClick={() => setFormType("register")}
            className={formType === "register" ? "active-tab" : "inactive-tab"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </motion.div>

        {formType === "login" && (
          <motion.form
            onSubmit={handleLogin}
            className="signin-form-modern"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Username/Email"
                required
                className="signin-input"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="signin-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </motion.div>
            <motion.button
              type="submit"
              className="register-link"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Sign In
            </motion.button>
          </motion.form>
        )}

        {formType === "register" && (
          <motion.form
            onSubmit={handleRegister}
            className="signin-form-modern"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="signin-input"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="signin-input"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="signin-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </motion.div>
            <motion.button
              type="submit"
              className="register-link"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Register
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default SignInForm;
