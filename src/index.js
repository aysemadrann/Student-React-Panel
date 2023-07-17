import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from './pages/Dashboard';
import StudentsPage from './pages/Students';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route path='/login' element={<App />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/students' element={<StudentsPage />} />
        <Route path='/student/:id' element={<StudentsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
