import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/pages/create-conference.css"; 
import Sidebar from "../Components/Sidebar";

function CreateConference() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);


  useEffect(() => {
    document.body.classList.add("review-page");

    return () => {
      document.body.classList.remove("review-page");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/conferences', { name, description, date, location });
      setName('');
      setDescription('');
      setDate('');
      setLocation('');
      alert('Conferința a fost creată cu succes!'); // Afișare alertă în loc de mesaj
    } catch (error) {
      alert(error.response?.data?.message || 'Eroare la crearea conferinței.');
    }
  };

  return (
    <div className="dashboard-container page">
    <Sidebar role="organizer" />
    <div className="main-content">
      <h1>Creare Conferință</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-left">
            <div>
            <label htmlFor="name">Nume Conferință</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Data Conferinței</label>
            <input
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="location">Locație</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
    <label htmlFor="topics">Alege persoanele care vor oferi recenzie articolelelor:</label>
    <select
      id="reviewers"
      multiple
      value={selectedTopics}
      onChange={(e) =>
        setSelectedTopics(Array.from(e.target.selectedOptions, option => option.value))
      }
      required>
    </select>
  </div>
        </div>
        <div className="form-right">
          <label htmlFor="description">Descriere</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="description-textarea"
            placeholder="Write the description here..."
          ></textarea>
        </div>
      </div>
      <button type="submit">Creează Conferința</button>
     </form>

    </div>
    </div>
  );
}

export default CreateConference;
