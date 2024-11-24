import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './pages/ProfilePage/UserProfile'; // Adjust the path as needed

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<UserProfile />} />
            </Routes>
        </Router>
    );
};

export default App;
