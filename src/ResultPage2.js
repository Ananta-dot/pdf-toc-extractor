import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResultPage.css';
import logo from './assets/sonar-logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [sector, setSector] = useState('');
    const [relevantSentences, setRelevantSentences] = useState([]);
    const [querySubmitted, setQuerySubmitted] = useState(false);
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

    const formatResult = (data) => {
        let formattedResult = [];
        if (data["Sections"]) {
            formattedResult = formattedResult.concat(
                Object.entries(data["Sections"]).map(([key, value]) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{value.replace(/Page\s+/g, '')}</td>
                    </tr>
                ))
            );
        }
        return formattedResult;
    };

    const handleSectorSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/relevant_sentences', { query: sector });
            setRelevantSentences(response.data.relevant_sentences);
            setQuerySubmitted(true);
        } catch (error) {
            console.error('Error fetching relevant sentences:', error);
        }
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
                    <button className="back-button" onClick={handleGoBack}>Back</button>
                    {!querySubmitted && (
                        <div className="sector-input-container">
                            <p>Which sector do you work in?</p>
                            <input
                                type="text"
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                            />
                            <button onClick={handleSectorSubmit}>Submit</button>
                        </div>
                    )}
                    {querySubmitted && (
                        <div className="relevant-sentences-container">
                            <h2>Relevant Sentences</h2>
                            <ul>
                                {relevantSentences.map(([sentence, score], index) => (
                                    <li key={index}>
                                        <strong>Score: {score.toFixed(4)}</strong> - {sentence}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResultPage;
