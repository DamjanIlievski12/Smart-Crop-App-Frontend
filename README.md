# Smart Crop App — Frontend

A React + TypeScript frontend for the Smart Crop App, a precision agriculture platform that helps farmers monitor fields, analyze crops, assess disease risk, get fertilizer recommendations, and view weather data.

---

## Tech Stack

- **React 19** with **TypeScript**
- **Vite 8** — build tool & dev server
- **Tailwind CSS v4** — styling
- **React Router v7** — client-side routing
- **Axios** — HTTP client with request/response interceptors
- **Recharts** — data visualization
- **Lucide React** — icons

---

## Environment Variables

This project uses Vite's built-in environment variable system. All variables **must** be prefixed with `VITE_` to be accessible in the browser.

| Variable        | Description                        |
|-----------------|------------------------------------|
| `VITE_API_URL`  | Base URL of the backend REST API   |

### `.env.development` — used when running `npm run dev`

### `.env.production` — used when running `npm run build`


> **Note:** Vite automatically loads the correct `.env` file based on the mode. You do not need to switch files manually.

---

## Running Locally

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Smart-Crop-App-Frontend.git
cd Smart-Crop-App-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.development` file in the project root:

```env
VITE_API_URL=http://localhost:
```

Replace `http://localhost:` with the actual URL of the backend.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** by default.

---

## Connecting to the Backend

The Axios instance in `src/axios/axios.ts` reads `VITE_API_URL` at build time via `import.meta.env.VITE_API_URL`. This becomes the `baseURL` for all API requests.

**Authentication** is handled with JWT tokens stored in `localStorage` under the key `sc_access_token`. The Axios request interceptor automatically attaches the token as a `Bearer` header to every outgoing request.

Make sure your backend:
- Is running and reachable at the URL set in `VITE_API_URL`
- Accepts `Content-Type: application/json`
- Returns a JWT token on successful login

---

## Authentication & Protected Routes

The app uses a context-based auth system (`AuthProvider` + `authContext`). Routes under the dashboard (fields, crop analysis, disease risk, fertilizer, reports, weather) are wrapped in `<ProtectedRoute>`, which redirects unauthenticated users to `/login`.

**Public routes:**
- `/` — Landing page
- `/login` — Login page

**Protected routes (require login):**
- `/fields` — Field management
- `/fields/new` — Add a new field
- `/crop-analysis` — Crop analysis
- `/disease-risk` — Disease risk assessment
- `/fertilizer` — Fertilizer recommendations
- `/reports` — Reports
- `/weather` — Weather data

---

## Building for Production

```bash
npm run build
```

The output will be in the `dist/` folder. Vite will automatically pick up `.env.production` for the build.

To preview the production build locally:

```bash
npm run preview
```

---

## Deployment

The frontend is hosted on **Vercel**.

Live URL: [https://smart-crop-app-frontend.vercel.app](https://smart-crop-app-frontend.vercel.app)