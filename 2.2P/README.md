# 2.2P Express Application

A simple Express.js web application with API endpoints.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the application:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

- `GET /` - Home page
- `GET /api/hello` - Returns a hello message
- `GET /api/time` - Returns current server time
- `POST /api/echo` - Echoes back the request body

## Project Structure

```
2.2P/
├── server.js          # Main Express server
├── package.json       # Project dependencies
├── public/            # Static files
│   ├── index.html    # Home page
│   ├── styles.css    # Styles
│   └── script.js     # Client-side JavaScript
└── README.md         # This file
```
