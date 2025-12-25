# Web Soan Giao An Mam Non

Web application for creating and managing preschool lesson plans and PowerPoint presentations.

## Features

- Generate lesson plans quickly by selecting age group, topic, and lesson name
- Browse and search through activity library with filters
- View suggested activities and recommendations
- Modern, responsive UI

## Tech Stack

- Frontend: React 18 + Vite
- Backend: Python 3 + FastAPI
- Data: Word documents (docx) with lesson content

## Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Backend will run on http://localhost:8000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:3000

## Project Structure

```
web-giao-an-mam-non/
├── backend/
│   ├── api/           # API routes
│   ├── servces/       # Business logic
│   ├── repositories/  # Data access layer
│   ├── data/          # Lesson data (Word documents)
│   └── main.py        # FastAPI application
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   └── App.jsx      # Main app component
│   └── package.json
└── README.md
```

## API Endpoints

- GET `/api/age-groups` - Get all age groups
- GET `/api/topics` - Get topics (optionally filtered by age group)
- POST `/api/lessons/generate` - Generate lesson plan
- GET `/api/lessons` - Get lessons (with optional filters)
- GET `/api/activities` - Get activities (with optional filters)
- GET `/api/lessons/{id}/powerpoint` - Generate PowerPoint

## Notes

- Currently supports .docx files only (not .doc or .pdf)
- Data is loaded into memory on startup
- Powerpoint generation is placeholder (returns slide structure)
- Activities library is hardcoded (can be extended to database)
