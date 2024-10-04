// src/components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import Link here
import styles from './Login.module.css';
import { validateEmail } from '../../hooks/useFormValidation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Retrieve users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user exists
    const user = existingUsers.find((user) => user.email === email && user.password === password);

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      // Simulate successful login by redirecting to upload page
      navigate('/upload');
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
