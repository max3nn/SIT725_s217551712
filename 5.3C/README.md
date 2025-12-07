# Books Catalog - Task 5.3C

A Books catalog application built with Node.js, Express, MongoDB, and MVC architecture.

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- MongoDB (via Docker)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB using Docker Compose

```bash
docker-compose up -d
```

This will start a MongoDB container on `localhost:27017` with the database name `books_catalog`.

### 3. Seed the Database

```bash
npm run seed
```

This will populate the database with 5 sample books.

### 4. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will run on `http://localhost:3000`.

## API Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book by ID
- `GET /api/integrity-check42` - Health check endpoint (returns 204 No Content)

## Features

- **Books Grid View**: Displays all books in a responsive card layout
- **Search Functionality**: Search books by title, author, or genre
- **Book Details Modal**: Click on any book title to view full details including summary
- **Price Display**: Shows book prices in AUD (stored as Decimal128 in MongoDB)

## Database Schema

Books are stored with the following fields:
- `title` (String, required)
- `author` (String, required)
- `year` (Number, required)
- `genre` (String, required)
- `summary` (String, required)
- `price` (Decimal128, required) - Price in AUD

## Stop MongoDB

```bash
docker-compose down
```

To remove the data volume as well:

```bash
docker-compose down -v
```

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB (via Docker)
- **ODM**: Mongoose
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Architecture**: MVC Pattern
