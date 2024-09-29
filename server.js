const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB setup (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/jobboard', { useNewUrlParser: true, useUnifiedTopology: true });

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    company: String,
});

const Job = mongoose.model('Job', jobSchema);

// API endpoint to get jobs
app.get('/jobs', async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

// API endpoint to post a job
app.post('/jobs', async (req, res) => {
    const job = new Job(req.body);
    await job.save();
    res.json(job);
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
