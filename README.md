# Social Backend API

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-Docs-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=black)

A REST API backend for a social media application. It supports authentication, posts, likes, comments, PostgreSQL storage, JWT protected routes, Swagger documentation, and Render deployment.

> Status: deployed on Render and ready for API testing.

## Table of Contents

- [Live API](#live-api)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Swagger Documentation](#swagger-documentation)
- [API Endpoints](#api-endpoints)
- [API Testing Docs](#api-testing-docs)
- [Authentication](#authentication)
- [Database](#database)
- [Render Deployment](#render-deployment)
- [Available Scripts](#available-scripts)

## Live API

Local API:

```text
http://localhost:3000
```

Render API:

```text
https://social-backend-qrfn.onrender.com
```

Live Swagger Docs:

```text
https://social-backend-qrfn.onrender.com/api-docs
```

## Features

- User registration and login
- Secure password hashing with bcrypt
- JWT based authentication
- Create and list posts
- Like and unlike posts
- Add and fetch comments
- PostgreSQL database connection
- Swagger UI API documentation
- Render-ready deployment using `npm start`

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js |
| Server | Express.js |
| Database | PostgreSQL |
| Authentication | JWT, bcrypt |
| API Docs | Swagger UI Express |
| Deployment | Render |

## Project Structure

```text
social-backend/
|-- server.js
|-- package.json
`-- src/
    |-- app.js
    |-- config/
    |   |-- db.js
    |   `-- swagger.json
    |-- controllers/
    |-- middleware/
    |-- repositories/
    |-- routes/
    `-- services/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Create a `.env` file in the project root:

```env
PORT=3000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

For production on Render, set these values in the Render service environment variables. `NODE_ENV` should be set to `production` so the PostgreSQL SSL configuration is enabled.

### 3. Run the server locally

```bash
npm run dev
```

Or run it without nodemon:

```bash
npm start
```

## Swagger Documentation

Swagger UI is available at:

```text
http://localhost:3000/api-docs
```

For the Render deployment:

```text
https://social-backend-qrfn.onrender.com/api-docs
```

Swagger lets viewers inspect all available APIs directly in the browser and test requests from the documentation page.

Swagger config file:

```text
src/config/swagger.json
```

## API Endpoints

### Health Check

| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| GET | `/` | No | Check if the API is running |

### Auth

| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive a JWT token |

### Posts

| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| GET | `/api/posts` | No | Get posts |
| POST | `/api/posts` | Yes | Create a post |

### Likes

| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| POST | `/api/likes/:postId` | Yes | Like a post |
| DELETE | `/api/likes/:postId` | Yes | Unlike a post |

### Comments

| Method | Endpoint | Auth Required | Description |
| --- | --- | --- | --- |
| POST | `/api/comments/:postId` | Yes | Add a comment to a post |
| GET | `/api/comments/:postId` | No | Get comments for a post |

## API Testing Docs

You can test the APIs using Swagger UI, Thunder Client, Postman, or any REST client.

Use this base URL for local testing:

```text
http://localhost:3000
```

Use this base URL for deployed Render testing:

```text
https://social-backend-qrfn.onrender.com
```

### Thunder Client Setup

1. Install the Thunder Client extension in VS Code.
2. Create a new request.
3. Select the HTTP method.
4. Enter the full API URL.
5. For protected APIs, add the `Authorization` header.
6. Send the request and check the JSON response.

Recommended Thunder Client environment variable:

| Variable | Value |
| --- | --- |
| `base_url` | `https://social-backend-qrfn.onrender.com` |

After creating this environment variable, you can use `{{base_url}}` in every request below.

### 1. Check API Health

```http
GET {{base_url}}/
```

Live URL:

```text
https://social-backend-qrfn.onrender.com/
```

Expected response:

```text
API Running
```

### 2. Register User

```http
POST {{base_url}}/api/auth/register
Content-Type: application/json
```

Live URL:

```text
https://social-backend-qrfn.onrender.com/api/auth/register
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Login User

```http
POST {{base_url}}/api/auth/login
Content-Type: application/json
```

Live URL:

```text
https://social-backend-qrfn.onrender.com/api/auth/login
```

Body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Copy the `token` from the login response. Use it for protected routes.

### 4. Create Post

```http
POST {{base_url}}/api/posts
Content-Type: application/json
Authorization: Bearer your_jwt_token
```

Live URL:

```text
https://social-backend-qrfn.onrender.com/api/posts
```

Body:

```json
{
  "content": "My first post",
  "image_url": "https://example.com/image.jpg"
}
```

### 5. Get Posts

```http
GET {{base_url}}/api/posts
```

Live URL:

```text
https://social-backend-qrfn.onrender.com/api/posts
```

### 6. Like Post

```http
POST {{base_url}}/api/likes/1
Authorization: Bearer your_jwt_token
```

Live URL:

```text
https://social-backend-qrfn.onrender.com/api/likes/1
```

Replace `1` with the real post id.

### 7. Unlike Post

```http
DELETE {{base_url}}/api/likes/1
Authorization: Bearer your_jwt_token
```

Live URL:

```text
https://social-backend-qrfn.onrender.com/api/likes/1
```

Replace `1` with the real post id.

### 8. Add Comment

```http
POST {{base_url}}/api/comments/1
Content-Type: application/json
Authorization: Bearer your_jwt_token
```

Live URL:

```text
https://social-backend-qrfn.onrender.com/api/comments/1
```

Body:

```json
{
  "content": "Nice post!"
}
```

Replace `1` with the real post id.

### 9. Get Comments

```http
GET {{base_url}}/api/comments/1
```

Live URL:

```text
https://social-backend-qrfn.onrender.com/api/comments/1
```

Replace `1` with the real post id.

## Authentication

Protected routes require a JWT token in the `Authorization` header:

```text
Authorization: Bearer your_jwt_token
```

The token is returned by the login endpoint.

## Database

The app uses PostgreSQL through the `pg` package. Database access is handled in the repository layer under `src/repositories`.

Expected tables based on the current code:

- `users`
- `posts`
- `likes`
- `comments`

## Render Deployment

This backend is deployed on Render.

Recommended Render settings:

| Setting | Value |
| --- | --- |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Environment | Node |

Required Render environment variables:

```env
DATABASE_URL=your_render_postgresql_url
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

Render provides the `PORT` automatically, and the server reads it from `process.env.PORT`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the production server |
| `npm run dev` | Starts the development server with nodemon |
| `npm test` | Currently no test suite is configured |
