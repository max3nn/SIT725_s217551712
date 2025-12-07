const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const { dbConfig } = require('./config/database');

// Create a connection without specifying database (since we're creating it)
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  port: dbConfig.port,
  multipleStatements: true // Allow multiple SQL statements
});

// Read the SQL file
const sqlPath = path.join(__dirname, 'database.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

// Connect and execute the SQL
connection.connect(error => {
  if (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
  
  console.log('Connected to MySQL server');
  
  // Execute the SQL statements
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error executing SQL:', error);
      connection.end();
      process.exit(1);
    }
    
    console.log('Database seeded successfully!');
    console.log('Database "locate_a_socket" created and populated with sample data.');
    
    connection.end();

    results.forEach((result, index) => {
      if (Array.isArray(result)) {
        console.log(`Result set ${index + 1}:`, result);
      } else {
        console.log(`Statement ${index + 1} affected rows:`, result.affectedRows);
      }
    });
  })
});