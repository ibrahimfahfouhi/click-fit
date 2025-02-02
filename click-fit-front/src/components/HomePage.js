import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/HomePage.css';

function HomePage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [fact, setFact] = useState(''); // État pour stocker le fait récupéré de l'API

  // Appel à l'API numbersapi.com après le chargement de la page
  useEffect(() => {
    axios.get('http://numbersapi.com/1/30/date?json')
      .then(response => {
        setFact(response.data.text); // Stocke le fait dans l'état
      })
      .catch(error => {
        console.error('Error fetching fact:', error);
      });
  }, []); // Le tableau vide [] signifie que cet effet ne s'exécute qu'une fois après le rendu initial

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data);
    } catch (error) {
      setMessage('Failed to upload image.');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome to Click Fit</h1>
      <p>Your destination for fitness and health.</p>

      {/* Affiche le fait récupéré de l'API */}
      {fact && (
        <div className="fact-section">
          <h2>Did you know?</h2>
          <p>{fact}</p>
        </div>
      )}

      <div className="upload-section">
        <h2>Upload Your Image</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} className="btn-yellow">Upload</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default HomePage;