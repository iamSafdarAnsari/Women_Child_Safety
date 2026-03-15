# Women & Child Safety Platform

A full-stack safety platform with:

- A Node.js + Express backend API
- A React Native mobile app (Expo)
- A React admin dashboard (Vite)

The platform helps users send SOS alerts, track journeys, report unsafe areas, and visualize risk through maps/heatmap views.

## Project Overview

The Women & Child Safety Platform is designed to improve personal safety and incident visibility through real-time and report-based tools.

Core goals:

- Provide a one-tap SOS flow with live GPS coordinates
- Enable monitored journey tracking with overdue alert logic
- Collect unsafe area reports (harassment, unsafe road, suspicious activity)
- Surface incident patterns in map/heatmap views
- Give admins a central dashboard for users, alerts, and reports

## Technology Stack

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- bcryptjs for password hashing

### Mobile App

- React Native (Expo)
- React Navigation (bottom tabs)
- react-native-maps
- expo-location
- expo-notifications
- axios

### Admin Dashboard

- React
- Vite
- React Router
- Leaflet (OpenStreetMap tiles)
- axios

## Project Structure

```text
Women  Child Safety/
  backend/
  mobile-app/
  admin-dashboard/
  docs/
```

## Installation Instructions

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or cloud)
- Expo Go app (for physical mobile testing)

### 1) Clone and open project

```bash
git clone <your-repo-url>
cd "Women  Child Safety"
```

### 2) Install dependencies

Backend:

```bash
cd backend
npm install
```

Mobile app:

```bash
cd ../mobile-app
npm install
```

Admin dashboard:

```bash
cd ../admin-dashboard
npm install
```

## Environment Configuration

### Backend .env

Create `backend/.env` with:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=5000
```

### Admin dashboard (optional)

To point dashboard API to a non-default backend URL, create `admin-dashboard/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Mobile app API base URL notes

Current mobile implementation uses direct base URLs in source:

- SOS screen: `http://10.0.2.2:5000` (Android emulator)
- Heatmap report service:
  - Android: `http://10.0.2.2:5000`
  - Other platforms default: `http://localhost:5000`

For real devices, replace with your machine LAN IP (for example `http://192.168.1.100:5000`).

## How To Run Backend

```bash
cd backend
npm run dev
```

Production mode:

```bash
npm start
```

Default API base URL:

- `http://localhost:5000`

Health check:

- `GET /`

## How To Run Mobile App

```bash
cd mobile-app
npm start
```

Useful commands:

```bash
npm run android
npm run ios
npm run web
```

Notes:

- Ensure backend is running before testing SOS, reports, and heatmap data.
- In `src/screens/SOSScreen.js`, replace `REPLACE_WITH_LOGGED_IN_USER_ID` with an actual user ID after login integration.

## How To Run Admin Dashboard

```bash
cd admin-dashboard
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Default dashboard URL:

- `http://localhost:5173`

## API Endpoints

Base URL: `http://localhost:5000`

### Auth

- `POST /api/auth/register`
  - Body: `name`, `email`, `phone`, `password`
- `POST /api/auth/login`
  - Body: `email`, `password`

### Alerts

- `POST /api/alerts/sos`
  - Body: `userId`, `latitude`, `longitude`, `triggerType`
  - Allowed `triggerType`: `button`, `shake`, `voice`
- `GET /api/alerts/history`

### Journey (Protected: Bearer token required)

- `POST /api/journey/start`
  - Body:
    - `startLocation` (latitude, longitude, optional address)
    - `destination` (string or object)
    - `expectedArrival`
    - optional `startTime`
- `POST /api/journey/update`
  - Body: `journeyId`, `location` (latitude, longitude, optional address)
- `POST /api/journey/end`
  - Body: `journeyId`, optional `endLocation`

Behavior:

- If expected arrival is exceeded during an ongoing journey, an automatic alert is created.

### Reports

- `POST /api/reports/create` (Protected: Bearer token required)
  - Body: `type`, `location`, `description`
  - Allowed `type`: `harassment`, `unsafe road`, `suspicious activity`
  - `location` requires: `latitude`, `longitude`, optional `address`
- `GET /api/reports/list`

## Project Features

### Authentication

- User registration and login with JWT
- Password hashing using bcrypt

### SOS Safety

- Large panic button in mobile app
- GPS capture via Expo Location
- SOS alert posting to backend
- Confirmation/error feedback in-app

### Journey Tracking

- Start, update, and end journey APIs
- Ongoing location history support
- Overdue journey alert trigger when expected arrival is exceeded

### Unsafe Area Reporting

- Category-based incident reporting
- Structured geo coordinates for future analytics
- Report listing with latest-first sorting

### Heatmap and Mapping

- Mobile heatmap screen reads `/api/reports/list`
- Marker color coding by risk (green/yellow/red)
- Marker tap displays report details
- Admin dashboard Leaflet map visualizes unsafe reports

### Admin Dashboard

- Pages: Dashboard, Alerts, Reports, Users
- KPI cards:
  - Total users
  - Active SOS alerts
  - Reported unsafe locations
- User list supports inferred totals from activity when dedicated admin users endpoint is unavailable

## Current Notes

- Backend currently has no dedicated `/api/admin/users` endpoint.
- Admin dashboard falls back to inferred users from alert/report activity if that endpoint returns 404.
- For production deployment, use secure environment variables, HTTPS, and robust auth/role controls for admin routes.

## Suggested Next Improvements

- Add role-based admin authorization on backend admin endpoints
- Add dedicated analytics endpoints for dashboard KPIs
- Add pagination/filtering for alerts and reports
- Add push notification workflows for emergency contacts
- Add CI/CD and automated test coverage
