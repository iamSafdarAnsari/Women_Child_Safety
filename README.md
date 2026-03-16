# Women & Child Safety Platform

A complete local demo project with three apps:

- `backend` (Node.js + Express + local JSON data files)
- `mobile-app` (React Native with Expo)
- `admin-dashboard` (React + Vite + Leaflet)

This demo does not require MongoDB or any live database API. All records are stored in local JSON files under `backend/data`.

## Root Structure

```text
Women  Child Safety/
  admin-dashboard/
  backend/
  docs/
  mobile-app/
  README.md
```

## Backend Structure

```text
backend/
  data/
    users.json
    alerts.json
    safetyReports.json
    journeys.json
    places.json
  routes/
    users.js
    alerts.js
    reports.js
    journeys.js
  utils/
    fileHandler.js
  server.js
```

## Local API Endpoints

Base URL: `http://localhost:5000`

- `GET /api/users`
- `GET /api/alerts`
- `POST /api/alerts/sos`
- `GET /api/reports`
- `GET /api/reports/heatmap`
- `POST /api/reports/create`
- `POST /api/journey/start`
- `GET /api/journey/list`

## Demo Workflow

1. User opens the mobile app.
2. User presses SOS.
3. Mobile app sends GPS location to `POST /api/alerts/sos`.
4. Backend writes alert into `backend/data/alerts.json`.
5. Admin dashboard loads latest alerts from `GET /api/alerts`.
6. Reports and heatmap points are rendered from `safetyReports.json`.

## Run Instructions

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

### 2) Mobile App

```bash
cd mobile-app
npm install
npx expo start
```

### 3) Admin Dashboard

```bash
cd admin-dashboard
npm install
npm run dev
```

## Notes for Local Testing

- Android emulator base URL is already configured as `http://10.0.2.2:5000`.
- iOS simulator / web uses `http://localhost:5000`.
- For a physical phone, replace the API base URL in `mobile-app/src/services/reportService.js` with your machine LAN IP.

## Sample Payloads

### Send SOS

```json
{
  "userId": "u1",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "triggerType": "button"
}
```

### Create Safety Report

```json
{
  "type": "harassment",
  "latitude": 28.6139,
  "longitude": 77.2090,
  "description": "Street harassment reported",
  "riskLevel": "high"
}
```

### Start Journey

```json
{
  "userId": "u1",
  "startLocation": "Rajiv Chowk",
  "destination": "India Gate",
  "expectedArrival": "2026-03-16T19:30:00"
}
```
