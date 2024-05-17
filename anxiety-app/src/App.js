import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Journal from './components/Journal';
import AnxietyLevels from './components/AnxietyLevels';
import BreathingExercise from './components/BreathingExercise';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/anxiety-levels" element={<AnxietyLevels />} />
        <Route path="/breathing-exercise" element={<BreathingExercise />} />
      </Routes>
    </Router>
  );
};

export default App;
