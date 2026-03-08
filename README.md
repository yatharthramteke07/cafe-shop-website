# BrewMaster Coffee Shop (MERN)

Full-stack coffee shop app with React frontend and Express/MongoDB backend.

## Stack

- Frontend: React, React Router, Axios, Lucide icons
- Backend: Node.js, Express, Mongoose, JWT auth
- Database: MongoDB

## Project Structure

```text
cofee-shop-website/
|- frontend/
|  |- public/
|  |- src/
|  |  |- components/
|  |  |- context/
|  |  |- services/
|  |  `- styles/
|  |- .env.example
|  `- package.json
|- backend/
|  |- models/
|  |- routes/
|  |- .env.example
|  |- server.js
|  `- package.json
`- README.md
```

## Quick Start

1. Install dependencies:

```bash
cd backend && npm install
cd ../frontend && npm install
```

2. Configure environment files:

- `backend/.env` from `backend/.env.example`
- `frontend/.env.local` from `frontend/.env.example`

3. Start backend:

```bash
cd backend
npm run dev
```

4. Start frontend:

```bash
cd frontend
npm start
```

Frontend runs on `http://localhost:3000` and backend on `http://localhost:5000` by default.

## Environment Variables

Backend (`backend/.env`):

- `PORT=5000`
- `NODE_ENV=development`
- `MONGODB_URI=...`
- `JWT_SECRET=...`

Frontend (`frontend/.env.local`):

- `REACT_APP_API_URL=http://localhost:5000/api`

## API Base URL Behavior

`frontend/src/services/api.js` uses:

- `process.env.REACT_APP_API_URL` when provided
- fallback to `/api` for same-origin deployments

## Production Notes

- Backend serves `frontend/build` when `NODE_ENV=production`.
- Build frontend with:

```bash
cd frontend
npm run build
```

Then run backend:

```bash
cd backend
npm start
```
