import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [jobs, setJobs] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await axios.get('/jobs');
            setJobs(response.data);
        };
        fetchJobs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/jobs', {
            title: jobTitle,
            description: jobDescription,
        });
        setJobTitle('');
        setJobDescription('');
        // Reload the job list
        const response = await axios.get('/jobs');
        setJobs(response.data);
    };

    return (
        <div className="App">
            <h1>Job Board</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    value={jobTitle} 
                    onChange={(e) => setJobTitle(e.target.value)} 
                    placeholder="Job Title" 
                    required 
                />
                <textarea 
                    value={jobDescription} 
                    onChange={(e) => setJobDescription(e.target.value)} 
                    placeholder="Job Description" 
                    required 
                />
                <button type="submit">Post Job</button>
            </form>
            <h2>Job Listings</h2>
            <ul>
                {jobs.map((job, index) => (
                    <li key={index}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
