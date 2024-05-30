import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResultPage.css';
import logo from './assets/sonar-logo.png';  // Ensure the path is correct
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [query, setQuery] = useState('');
    const [relevantSections, setRelevantSections] = useState([]);
    const file = location.state?.file;

    useEffect(() => {
        const uploadFile = async () => {
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setResult(response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
                setResult('An error occurred while processing the file.');
            } finally {
                setLoading(false);
            }
        };

        uploadFile();
    }, [file]);

    const handleGoBack = () => {
        navigate('/');
    };

    const handleQuerySubmit = async () => {
        if (!query || !result) return;

        try {
            const response = await axios.post('http://127.0.0.1:5000/query', {
                query: query,
                sentences: result.Sentences
            });
            setRelevantSections(response.data);
        } catch (error) {
            console.error('Error processing query:', error);
        }
    };

    const formatResult = (data) => {
        let formattedResult = [];
        if (data["TOC Pages"]) {
            formattedResult.push(
                <tr key="toc">
                    <td>Table of Contents</td>
                    <td>{data["TOC Pages"]}</td>
                </tr>
            );
        }
        if (data["Sections"]) {
            formattedResult = formattedResult.concat(
                Object.entries(data["Sections"]).map(([key, value]) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                    </tr>
                ))
            );
        }
        return formattedResult;
    };

    return (
        <div className="result-page">
            {loading ? (
                <div className="loading-screen">
                    <img src={logo} alt="Sonar Logo" className="loading-logo" />
                    <p className="loading-text">is analyzing your file</p>
                </div>
            ) : (
                <div className="result-container fade-in">
                    <h2 className="result-title">{file?.name}</h2>
                    <table className="result-table">
                        <thead>
                            <tr>
                                <th>Section Name</th>
                                <th>Pages</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result && formatResult(result)}
                        </tbody>
                    </table>

                    <div className="query-section">
                        <label htmlFor="sector-query">Which sector / industry do you work in?</label>
                        <input
                            type="text"
                            id="sector-query"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button onClick={handleQuerySubmit}>Submit</button>
                    </div>

                    <div className="relevant-sections">
                        <h3>Sections that might be relevant to you</h3>
                        {relevantSections.length > 0 ? (
                            <ul>
                                {relevantSections.map((section, index) => (
                                    <ul key={index}>
                                        {section.sentence}, {section.page} 
                                    </ul>
                                ))}
                            </ul>
                        ) : (
                            <p>No relevant sections found.</p>
                        )}
                    </div>
                    <button className="back-button" onClick={handleGoBack}>Back</button>
                </div>
            )}
        </div>
    );
};

export default ResultPage;
