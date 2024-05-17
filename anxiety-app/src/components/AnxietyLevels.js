import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnxietyLevels = () => {
  const [levels, setLevels] = useState([]);
  const [level, setLevel] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchLevels = async () => {
      const response = await axios.get('/anxiety_levels', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setLevels(response.data);
    };
    fetchLevels();
  }, []);

  const handleAddLevel = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/anxiety_levels', { level, date }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setLevels([...levels, response.data]);
      setLevel('');
      setDate('');
    } catch (error) {
      console.error('Error adding level:', error);
    }
  };

  return (
    <div>
      <h1>Anxiety Levels</h1>
      <form onSubmit={handleAddLevel}>
        <input type="number" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Level" min="1" max="10" required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button type="submit">Add Level</button>
      </form>
      <ul>
        {levels.map((lvl) => (
          <li key={lvl.id}>{lvl.date}: {lvl.level}</li>
        ))}
      </ul>
    </div>
  );
};

export default AnxietyLevels;
