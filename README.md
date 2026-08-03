# Support CRM System

A full-stack customer support ticketing system built with the MERN stack (MongoDB, Express, React, Node.js). Create tickets, search and filter them, view details, update status, and add internal notes.

## Features

- Create tickets with customer name, email, subject, and description
- Auto-generated ticket IDs (e.g. `TKT-001`) and timestamps
- List view showing ID, customer, subject, status, and date
- Search across name, email, ID, and description (debounced, live search)
- Filter tickets by status: Open / In Progress / Closed
- Detail view per ticket — update status, add notes/comments
- Clean, responsive UI

## Tech Stack

**Frontend**
- React 19 (Vite)
- React Router v7
- Axios (all API calls centralized in `src/api.js`)
- Plain CSS with design tokens (no UI framework)

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- CORS, dotenv

## Project Structure

```
support-crm/
├── backend/
│   ├── models/
│   │   ├── Ticket.js
│   │   └── Note.js
│   ├── index.js            # Express app, all routes
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api.js           # centralized API client
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   ├── components/
    │   │   ├── TicketList.jsx
    │   │   └── SearchFilterBar.jsx
    │   └── pages/
    │       ├── Home.jsx
    │       ├── NewTicket.jsx
    │       └── TicketDetail.jsx
    ├── index.html
    ├── .env.example
    └── package.json
```

## API Endpoints

| Method | Endpoint                  | Description                              |
|--------|----------------------------|-------------------------------------------|
| POST   | `/api/tickets`             | Create a new ticket                       |
| GET    | `/api/tickets`             | List tickets (`?status=`, `?search=`)     |
| GET    | `/api/tickets/:ticket_id`  | Get ticket details + notes                |
| PUT    | `/api/tickets/:ticket_id`  | Update status and/or add a note           |

## Getting Started

### Prerequisites
- Node.js ≥ 24
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repo
```bash
git clone https://github.com/mitengala51/Support-CRM-System.git
cd Support-CRM-System
```

### 2. Backend setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
Runs on `http://localhost:5000`.

> **Note:** `.env.example` already contains working values — no need to fill anything in, just copy it to `.env` and you're ready to go.

### 3. Frontend setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Runs on `http://localhost:5173`.

## Deployment (Render)

**Backend — Web Service**
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Env vars: `MONGO_URI`, `CLIENT_URL`, `PORT`

**Frontend — Static Site**
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Env vars: `VITE_API_URL` (set to your deployed backend URL)

## Possible Improvements

- Authentication for staff/agents
- Pagination on the ticket list
- Optimistic UI updates for status changes
- Email notifications on ticket creation

## License

MIT
