# Startup Benefits Platform

Full-stack platform providing exclusive SaaS deals for startups, founders, and indie hackers. Built with Next.js, TypeScript, Express, and MongoDB.

## Tech Stack

**Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Three.js

**Backend:** Node.js, Express, MongoDB, JWT Authentication

## Features

- User authentication and authorization
- Browse and search deals by category
- Locked deals for verified users
- Deal claiming system with status tracking
- User dashboard with claimed deals
- Premium UI with animations and 3D elements

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/startup-benefits
JWT_SECRET=your_secret_key
```

```bash
node seed.js
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

**Frontend:** http://localhost:3000

**Backend:** http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Deals
- `GET /api/deals` - Get all deals
- `GET /api/deals/:id` - Get single deal
- `POST /api/deals` - Create deal (protected)

### Claims
- `POST /api/claims` - Claim a deal (protected)
- `GET /api/claims/my-claims` - Get user claims (protected)

## Project Structure

```
backend/
├── models/          # MongoDB schemas
├── controllers/     # Business logic
├── routes/          # API routes
├── middleware/      # Auth & error handling
└── server.js

frontend/
├── app/            # Next.js pages
├── components/     # Reusable components
├── contexts/       # React context
└── types/          # TypeScript types
```

## License

MIT
