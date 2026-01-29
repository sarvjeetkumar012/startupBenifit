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

## Application Flow

### User Journey
1. User lands on homepage → Views public deals
2. User registers/login → JWT token stored in localStorage
3. Browse deals with filters (category, locked status)
4. Click deal → View details → Claim deal
5. Backend validates auth & verification → Creates claim
6. User views claimed deals in dashboard

### Authentication Strategy
- **Registration**: Password hashed with bcryptjs → User created → JWT issued
- **Login**: Credentials verified → JWT token (7-day expiry)
- **Authorization**: JWT middleware protects routes → User attached to request
- **Verification Gate**: Locked deals require `isVerified: true`

## Deal Claiming Flow

1. **User Action**: Click "Claim Deal" button
2. **Frontend**: POST `/api/claims` with dealId and JWT token
3. **Backend Validation**:
   - Verify JWT → Extract user ID
   - Check deal exists and active
   - Verify user if deal is locked
   - Check claim limit not exceeded
   - Prevent duplicate claims (unique index)
4. **Claim Creation**:
   - Create Claim document
   - Status: 'approved' (public deals) or 'pending' (locked deals)
   - Generate claim code (if approved)
   - Increment deal claim counter
5. **Response**: Return claim with deal data → Update dashboard

## Frontend-Backend Interaction

### Authentication Flow
```
Frontend: localStorage.setItem('token', jwt)
API Calls: Headers: { Authorization: `Bearer ${token}` }
Backend: JWT middleware → Verify token → Attach user to req
```

### Data Flow
```
Frontend (React) → Fetch API → Backend (Express)
                             ↓
                         MongoDB (Mongoose)
                             ↓
                         JSON Response
                             ↓
Frontend State Update → UI Re-render
```

### State Management
- **Auth Context**: User state, login/logout functions
- **API Calls**: Standard fetch with error handling
- **Local Storage**: Token persistence

## Known Limitations

1. **Email Verification**: Not implemented - users cannot verify accounts
2. **Admin Dashboard**: No UI for approving claims or managing deals
3. **Rate Limiting**: API vulnerable to abuse
4. **Refresh Tokens**: No token refresh - users re-login after 7 days
5. **File Uploads**: Partner logos use external URLs only
6. **Error Boundaries**: Missing in frontend - app may crash on errors
7. **Offline Support**: No service worker or caching

## Production Improvements

### Critical
- Email verification system (SendGrid/Mailgun)
- Rate limiting (express-rate-limit)
- Admin dashboard for claim approval
- Database backups and monitoring
- Error tracking (Sentry)
- HTTPS and security headers (helmet.js)

### Recommended
- Refresh token implementation
- Image upload and optimization
- Advanced search (Algolia/ElasticSearch)
- Email notifications for deals
- Analytics dashboard
- Social authentication (Google/GitHub)

## UI and Performance

### Animations
- Framer Motion for page transitions and micro-interactions
- Three.js 3D hero element (600KB bundle - consider lazy loading)
- GPU-accelerated transforms for 60fps
- Reduced motion support

### Optimizations
- Next.js automatic code splitting
- Image optimization with next/image
- API pagination implemented
- Consider: Redis caching, CDN for assets, bundle size reduction

### Accessibility
- Semantic HTML and ARIA labels
- Keyboard navigation
- Color contrast AA standards
- Screen reader support needs improvement

## License

MIT
