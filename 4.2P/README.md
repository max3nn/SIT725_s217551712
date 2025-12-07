# Locate a Socket - EV Charging Station Locator

A web application for finding EV charging stations, built with Express.js and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (local installation or Docker)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure database credentials in `config/database.js` (default: root/password)

## Database Setup

### Option A: Using Docker (Recommended)
```bash
docker-compose up -d
```

### Option B: Using Local MySQL
```bash
npm run db:seed
```

## Running the Application

Start the server:
```bash
npm start
```

The application will be available at: **http://localhost:3000**

## Project Structure

```
4.2P/
├── app.js              # Main application file
├── config/
│   └── database.js     # Database configuration
├── routes/
│   └── stations.js     # API endpoints for charging stations
├── public/             # Frontend assets
│   ├── index.html
│   ├── css/
│   └── js/
└── database.sql        # Database schema and seed data
```

## API Endpoints

- `GET /api/stations` - Retrieve all charging stations
  - **URL:** http://localhost:3000/api/stations
  - **Response:** JSON array of charging station objects