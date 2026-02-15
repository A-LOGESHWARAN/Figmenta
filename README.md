# Figmenta Bookmark Manager

A full-stack web application for managing bookmarks with automatic metadata fetching, categorization, and search capabilities.

## 🚀 Features

- **Add Bookmarks**: Automatically fetches page title and metadata from the URL.
- **Organize**: Tagging system for easy categorization.
- **Search & Filter**: Real-time search by title/URL and filtering by tags.
- **Pagination**: Efficiently browse through large collections of bookmarks.
- **Dark Mode**: Fully responsive UI with toggleable dark/light themes.
- **Responsive Design**: Optimized for desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **React** (v19) with **Vite**
- **Axios** for API requests
- **ESLint** for code quality

### Backend
- **Node.js** with **Express**
- **Cheerio** for scraping metadata (Open Graph tags/HTML title)
- **Express Rate Limit** for API security
- **UUID** for unique ID generation
- **CORS** enabled for frontend communication

## � Project Structure

```
figmenta/
├── backend/                # Express server and API logic
│   ├── data/               # In-memory data store
│   ├── routes/             # API route definitions
│   ├── utils/              # Helper functions (validators)
│   └── server.js           # Entry point for backend
├── frontend/               # React application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images and icons
│   │   ├── components/     # Reusable UI components
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point for React
│   ├── index.html          # HTML template
│   └── vite.config.js      # Vite configuration
└── README.md               # Project documentation
```

## �📦 Setup Instructions

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Backend Setup
Navigate to the `backend` directory, install dependencies, and start the server.

```bash
cd backend
npm install
npm run dev
```

The backend server will start at `http://localhost:5000`.

### 2. Frontend Setup
Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the development server.

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be available at `http://localhost:5173`.

## 🤖 AI Tools Used

- **Google Gemini (Antigravity)**: Used for generating project structure, writing boilerplate code, debugging, and creating documentation.

## ⏱️ Time Spent

- **Approx.  1.5 hours**: Including planning, implementation, debugging, and documentation1
## 📝 Assumptions Made

1. **Data Persistence**: 
   - The application currently uses **in-memory storage** (Javascript array) for simplicity and speed of development. 
   - **Note**: All data will be reset when the backend server restarts. For production, this should be replaced with a database like MongoDB or PostgreSQL.

2. **Environment**:
   - The app assumes standard local development ports (`5000` for backend, `5173` for frontend).
   - No `.env` files are required for the basic setup as defaults are hardcoded strictly for this submission.

3. **Metadata Fetching**:
   - The backend attempts to fetch Open Graph (`og:title`) tags first, falling back to the standard `<title>` tag. If fetching fails or is blocked by the target site, it defaults to the user-provided title or leaves it blank.
