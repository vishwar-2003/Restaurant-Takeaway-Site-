import React, { useState } from "react";
import "./styles/SignInForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ updated

const SignInForm = ({ setToken, setName }) => {
  const [formType, setFormType] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  // const params = new URLSearchParams(location.search);


  // ✅ Get redirect query param (e.g. /signin?redirect=/reviews)
  const redirectTo = new URLSearchParams(location.search).get("redirect") || "/home";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (pw) => /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(pw);
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

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("customerId", res.data.customerId);

      if (setToken) setToken(res.data.token);
      if (setName) setName(res.data.name);

      toast.success("Logged in successfully!");

      // ✅ Redirect to where the user came from or default to /home
      navigate(redirectTo);
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
              Register now <br />& grab your{" "}
              <span className="food-highlight">Discount!</span>
            </>
          )}
        </h1>

        <div className="signin-info">
  {formType === "login" ? (
    <>
      <p>If you don't have an account</p>
      <button
        onClick={() => setFormType("register")}
        className="register-link"
      >
        Register here!
      </button>
    </>
  ) : (
    <>
      <p>Already have an account?</p>
      <button
        onClick={() => setFormType("login")}
        className="register-link"
      >
        Log in here!
      </button>
    </>
  )}
</div>

        <img
          src="../assets/img/images/illustration-2.png"
          alt="decoration"
          className="signin-illustration small"
        />
      </div>

      <motion.div
        className="signin-card-modern"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="signin-tab">
          <button
            onClick={() => setFormType("login")}
            className={formType === "login" ? "active-tab" : "inactive-tab"}
          >
            Sign In
          </button>
          <button
            onClick={() => setFormType("register")}
            className={formType === "register" ? "active-tab" : "inactive-tab"}
          >
            Register
          </button>
        </div>

        {/* LOGIN FORM */}
        {formType === "login" && (
          <form onSubmit={handleLogin} className="signin-form-modern">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="signin-input"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="signin-input"
            />
            <div className="signin-options">
              <span className="forgot-link">Forgot password?</span>
            </div>
            <button type="submit" className="signin-button-modern">
              Sign In
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {formType === "register" && (
          <form onSubmit={handleRegister} className="signin-form-modern">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="signin-input"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="signin-input"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="signin-input"
            />

            {form.password && (
              <div style={{ width: "100%", marginBottom: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <small className="text-muted">Password strength</small>
                  <span style={{ fontSize: "1.2rem" }}>
                    {getStrengthEmoji()}
                  </span>
                </div>
                <div
                  className="progress"
                  style={{ height: "8px", marginTop: "4px" }}
                >
                  <div
                    className={`progress-bar ${getStrengthClass()}`}
                    style={{
                      width: `${Math.min(form.password.length * 12, 100)}%`,
                      transition: "width 0.4s ease-in-out",
                    }}
                  ></div>
                </div>
              </div>
            )}

            <button type="submit" className="signin-button-modern">
              Register
            </button>
          </form>
        )}
      </motion.div>

      <img
        src="../assets/img/images/illustration-1.png"
        alt="character"
        className="signin-illustration main"
      />
    </div>
  );
};

export default SignInForm;
