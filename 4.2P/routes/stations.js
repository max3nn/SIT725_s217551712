var express = require('express');
var router = express.Router();
var db = require('../config/database');

/* GET stations listing. */
router.get('/', function(req, res, next) {
  // If DB is connected, query it
  if (db && db.state !== 'disconnected') {
      db.query('SELECT * FROM stations', (err, results) => {
        if (err) {
            // If table doesn't exist or other error, return mock data for demonstration
            console.error("Database error:", err);
            res.json({statusCode: 200, data: getMockStations(), message:"Success (Mock Data - DB Error)"});
        } else {
            res.json({statusCode: 200, data: results, message:"Success"});
        }
      });
  } else {
      // Fallback to mock data if DB not connected
      res.json({statusCode: 200, data: getMockStations(), message:"Success (Mock Data - No DB Connection)"});
  }
});

function getMockStations() {
    return [
        {
            id: 1,
            name: "Central Park Charger",
            location: "Central Park, NY",
            type: "Type 2",
            availability: "Available",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            name: "Downtown Fast Charge",
            location: "123 Main St",
            type: "CCS",
            availability: "Occupied",
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            name: "Mall Station",
            location: "Shopping Mall L2",
            type: "CHAdeMO",
            availability: "Available",
            image: "https://images.unsplash.com/photo-1565514020176-dbf2277f1c77?auto=format&fit=crop&w=600&q=80"
        }
    ];
}

module.exports = router;