import React, { useState } from 'react';
import './FileUpload.css';
import logo from './assets/sonar-logo.png';  // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return;
        navigate('/result', { state: { file } });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="file-upload-page">
            <div className="file-upload-menu-bar">
                <div className="logo-container centered">
                    <img src={logo} alt="Sonar Logo" className="logo" />
                </div>
            </div>
            <div className="file-upload-container">
                <h1>Segment PDF</h1>
                <form onSubmit={handleSubmit}>
                    <div 
                        className="dropzone"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{ display: 'none' }} 
                            onChange={handleFileChange} 
                        />
                        {file ? <p>{file.name}</p> : <p>Drag and drop a file here or click to select a file</p>}
                    </div>
                    <button type="submit" className="upload-button">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default FileUpload;
