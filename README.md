# Amazon-lite (Node + TypeScript)

A minimal Express API with JWT authentication and MongoDB (Mongoose).

## Tech Stack
- Node.js, TypeScript, Express
- Mongoose (MongoDB Atlas/local)
- JWT (jsonwebtoken)
- bcryptjs (password hashing)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas URI (recommended) or local MongoDB

### Setup
1) Install dependencies
```bash
npm install
```

2) Configure environment variables
Create a `.env` file in the project root:
```bash
MONGO_URI=your-mongodb-uri
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
```

3) Run the server (dev)
```bash
npm run dev
```
Server starts at `http://localhost:5000` and connects to MongoDB using `.env`.

### Health Check
- GET `/` → returns `OK`

## Auth Endpoints
- POST `/api/auth/register`
  - Body: `{ "name": string, "email": string, "password": string }`
  - Returns `{ user, accessToken, refreshToken }`

- POST `/api/auth/login`
  - Body: `{ "email": string, "password": string }`
  - Returns `{ user, accessToken, refreshToken }`

- POST `/api/auth/refresh`
  - Body: `{ "refreshToken": string }`
  - Returns `{ accessToken }`

- GET `/api/users` (protected)
  - Header: `Authorization: Bearer <accessToken>`

## What’s Implemented
- Fixed malformed `package.json` and aligned TS CommonJS setup
- Added Node/TS config and type fixes for runtime
- MongoDB connection helper (`src/config/db.ts`) with dotenv
- `User` model with secure password hashing
- JWT auth (access + refresh), controllers, routes, and middleware
- Root health route `/`
- `.gitignore` to exclude env, build, and editor artifacts
- Meaningful commits pushed to `main`

## Scripts
- `npm run dev` — start with `ts-node`
- `npm run build` — compile TypeScript to `dist`
- `npm start` — run compiled app from `dist`
- `npm run lint` — lint and auto-fix

## Folder Structure
```
src/
├── config/
│   └── db.ts
├── controllers/
│   ├── authController.ts
│   └── userController.ts
├── middleware/
│   └── auth.ts
├── models/
│   └── User.ts
├── routes/
│   ├── auth.ts
│   └── index.ts
└── index.ts
```
