import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Journal.css'; // Import the CSS file for styling

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await axios.get('/journal_entries', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEntries(response.data);
    };
    fetchEntries();
  }, []);

  const handleAddEntry = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/journal_entries', { title, content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEntries([...entries, response.data]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  return (
    <div className="journal-container">
      <h1>Journal</h1>
      <form onSubmit={handleAddEntry} className="journal-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="journal-input"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          className="journal-textarea"
        />
        <button type="submit" className="journal-button">Add Entry</button>
      </form>
      <ul className="journal-entries">
        {entries.map((entry) => (
          <li key={entry.id} className="journal-entry">
            <strong>{entry.title}:</strong> {entry.content}
          </li>
        ))}
      </ul>
      <div className="cat-gif">
        <img src="https://media.giphy.com/media/pZjSXmyqFHGVi/giphy.gif" alt="Cat GIF" />
      </div>
    </div>
  );
};

export default Journal;
