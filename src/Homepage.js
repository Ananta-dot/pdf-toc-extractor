import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import logo from './assets/sonar-logo.png';
import screenshot1 from './assets/upload_ss.png';
import screenshot2 from './assets/upload_ss1.png';
import screenshot3 from './assets/upload_ss2.png';
import icon1 from './assets/icon1.png';
import icon2 from './assets/icon2.png';
import icon3 from './assets/icon3.png';

const Homepage = () => {
    const navigate = useNavigate();

    const navigateToUpload = () => {
        navigate('/upload');
    };

    return (
        <div className="homepage-container">
            <div className="menu-bar">
                <div className="logo-container">
                    <img src={logo} alt="Sonar Logo" className="homepage-logo" />
                </div>
            </div>
            <div className="content">
                <h1>AI-Powered PDF Segmentation for construction documents</h1>
                <p>Click the button below to start uploading and segmenting your PDF files.</p>
                <div className="button-container">
                    <button className="demo-button" onClick={navigateToUpload}>Try our interactive demo</button>
                </div>
                <div className="section-divider"></div>
                <h2>How it works</h2>
                <div className="steps-container">
                    <div className="step">
                        <img src={screenshot1} alt="Upload Document" className="screenshot" />
                        <h3>1. Upload Document</h3>
                        <p>Simply drag and drop your files into our platform to get started. Upload large PDF documents, regardless of size or complexity.</p>
                    </div>
                    <div className="step">
                        <img src={screenshot2} alt="Model Processes PDF" className="screenshot" />
                        <h3>2. Our model goes through the PDF</h3>
                        <p>Our model will process your PDFs and extract all relevant information required.</p>
                    </div>
                    <div className="step">
                        <img src={screenshot3} alt="Find Segments" className="screenshot" />
                        <h3>3. Find the segments, which matter to you</h3>
                        <p>Once your PDF has been processed, it will automatically be segmented into the relevant sections.</p>
                    </div>
                </div>
                <div className="section-divider"></div>
                <h2>Designed for construction professionals</h2>
                <div className="features-container">
                    <div className="feature">
                        <img src={icon1} alt="Feature 1" className="feature-icon" />
                        <h3>Trained and tested on thousands of documents</h3>
                        <p>Trained, tested, and fine-tuned, on thousands of documents, to cover all the types of documents you might use.</p>
                    </div>
                    <div className="feature">
                        <img src={icon2} alt="Feature 2" className="feature-icon" />
                        <h3>Lightning fast segmentation</h3>
                        <p>Get all the relevant sections of a pdf, no matter how big, in a matter of minutes, perfect for construction professionals.</p>
                    </div>
                    <div className="feature">
                        <img src={icon3} alt="Feature 3" className="feature-icon" />
                        <h3>Jump to exact page</h3>
                        <p>Effortlessly navigate to precise sections based on your requirements, enhancing productivity and workflow.</p>
                    </div>
                </div>
                <div className="section-divider"></div>
                <div className="get-started-container">
                    <h2>Start by uploading your first PDF!</h2>
                    <div className="button-container">
                        <button className="get-started-button" onClick={navigateToUpload}>Try our interactive demo</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
