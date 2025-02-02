import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends, FaBriefcase, FaEnvelope, FaBell } from 'react-icons/fa'; // Import des icônes
import './styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        {/* Logo et nom du projet */}
        <Link className="navbar-brand" to="/">
          Click & Fit 
        </Link>

        {/* Bouton pour le mode mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Liens de la navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome className="nav-icon" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/network">
                <FaUserFriends className="nav-icon" /> My Network
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/jobs">
                <FaBriefcase className="nav-icon" /> Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/messaging">
                <FaEnvelope className="nav-icon" /> Messaging
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notifications">
                <FaBell className="nav-icon" /> Notifications
              </Link>
            </li>
            {/* Boutons "Sign Up" et "Login" */}
            <li className="nav-item">
              <Link to="/signup" className="btn btn-yellow ms-3">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="btn btn-yellow ms-2">Login</Link>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;