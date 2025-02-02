import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });

      if (response.data.success) {
        setIsLoggedIn(true);
        setMessage('You are logged in!');
      } else {
        setMessage('Account does not exist. Please sign up.');
      }
    } catch (error) {
      setMessage('Account does not exist. Please sign up.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Login</button>
        </form>

        {/* Popup pour afficher les messages */}
        {message && (
          <div className="popup">
            <p>{message}</p>
            {!isLoggedIn && (
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;