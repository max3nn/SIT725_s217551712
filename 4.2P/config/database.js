const mysql = require('mysql2');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password', // Empty password - update this with your actual MySQL password
  database: 'locate_a_socket',
  port: 3307
};

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Open the connection
connection.connect(error => {
  if (error) {
    console.error('Database connection error:', error);
    // In a real app, you might want to handle this error more gracefully
    // For now, we'll just log it so the app doesn't crash if DB is missing
    console.warn("Database connection failed. Ensure MySQL is running and config is correct.");
    return;
  }
  console.log('Successfully connected to the database.');
});

module.exports = connection;
module.exports.dbConfig = dbConfig;