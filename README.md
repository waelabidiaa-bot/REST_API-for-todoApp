# Todo REST API with JWT Authentication

A secure RESTful API for managing todo lists, built with **Node.js**, **Express**, and **JSON Web Tokens (JWT)** for authentication. Users can register, log in, and perform CRUD operations on their own todos.

## Features

- User registration with password hashing (bcrypt)
- User login with JWT token generation
- Protected routes requiring valid JWT
- Todo CRUD operations scoped to the authenticated user
- Input validation (optional – implement as needed)
- Environment variable configuration

## Tech Stack

- **Node.js** – runtime
- **Express** – web framework
- **jsonwebtoken** – token creation/verification
- **bcryptjs** – password hashing
- **dotenv** – environment variables
- **cookie-parser** (optional) – for cookie-based token storage

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A database (MongoDB, PostgreSQL, MySQL, or even in‑memory for testing) – adapt the code to your DB

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/waelabidiaa-bot/REST_API-for-todoApp
   cd todo-api"# REST_API-for-todoApp" 
"# REST_API-for-todoApp" 

## API Endpoints

### User Routes
- `POST /users/register` - Register new user
- `POST /users/login` - Login user

### Todo Routes (Protected)
- `POST /todos` - Create todo
- `GET /todos` - Get all user's todos
- `GET /todos/:id` - Get single todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo
