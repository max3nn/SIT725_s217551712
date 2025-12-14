const express = require('express');
const app = express();
const calculator = require('./utils/calculator');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// REST API Endpoint: Add two numbers
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Parameters must be valid numbers' });
    }

    const result = calculator.add(num1, num2);
    res.json({ result: result });
});

const PORT = 3000;
// Only start the server if this file is run directly, not when imported for testing
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
