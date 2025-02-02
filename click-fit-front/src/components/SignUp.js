import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isHuman, setIsHuman] = useState(false); // État pour la vérification humaine
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Vérifie que les mots de passe correspondent
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Vérifie que l'utilisateur a confirmé qu'il est humain
    if (!isHuman) {
      setMessage('Please confirm that you are not a robot.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/signup', {
        email,
        password,
      });

      if (response.data.message === "User created successfully") {
        setMessage('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // Redirige vers la page de login après 2 secondes
        }, 2000);
      } else {
        setMessage(response.data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={isHuman}
                onChange={(e) => setIsHuman(e.target.checked)}
                required
              />
              I am not a robot
            </label>
          </div>
          <button type="submit" className="btn-signup">Sign Up</button>
        </form>

        {/* Affiche un message de succès ou d'erreur */}
        {message && (
          <div className="popup">
            <p>{message}</p>
            {message.includes("already exists") && (
              <Link to="/login" className="btn-login">Login</Link>
            )}
          </div>
        )}

        {/* Lien vers la page de login */}
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
}

export default SignUp;