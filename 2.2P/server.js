const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Express API!' });
});

app.get('/api/time', (req, res) => {
    res.json({ 
        currentTime: new Date().toISOString(),
        timestamp: Date.now()
    });
});

app.post('/api/echo', (req, res) => {
    res.json({ 
        received: req.body,
        message: 'Echo successful'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
