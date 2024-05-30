import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import FileUpload from './FileUpload';
import ResultPage from './ResultPage';
import LogoAnimation from './LogoAnimation';
import './Homepage.css';

const App = () => {
    const [animationComplete, setAnimationComplete] = useState(false);

    return (
        <Router>
            {!animationComplete ? (
                <LogoAnimation onComplete={() => setAnimationComplete(true)} />
            ) : (
                <Routes>
                    <Route exact path="/" element={<Homepage />} />
                    <Route path="/upload" element={<FileUpload />} />
                    <Route path="/result" element={<ResultPage />} />
                </Routes>
            )}
        </Router>
    );
};

export default App;
