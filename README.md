# SavannahStack

A minimal, production-grade Full Stack application featuring:

- **Backend**: Asynchronous **FastAPI** (Python 3.13+) with **SQLModel**, Pydantic v2, and **PostgreSQL**.
- **Frontend**: Minimalist **React 19** with **TypeScript**, **MUI 7**, Redux Toolkit, and Vite.

**Live Backend API Docs**: [https://savannahstack-io.onrender.com](https://savannahstack-io.onrender.com)

---

## Architecture Overview

```
savannastack.io/
├── backend/          # FastAPI REST API + SQLModel ORM + PostgreSQL
└── frontend/         # Minimalist React 19 + TypeScript + MUI 7 + Vite
```

### Key Highlights
- **Scoped Data Isolation**: Multi-tenant hierarchical relational data structure (Teacher → Students → Assignments).
- **Dynamic CRUD Routes**: Generic backend route generator automatically producing validated API endpoints for models.
- **Minimalist Aesthetic UI**: Clean neutral palette, crisp typography (Inter), responsive layout, and dark/light mode support.
- **JWT Authentication**: Token-based session authentication with protected route guards.

---

## Getting Started

### 1. Database Setup
Ensure PostgreSQL is running locally or remotely (e.g. on port `5432` or `5434`):
```bash
# Example with standard PostgreSQL or local service:
createdb savannahstack
```

### 2. Backend Setup (`/backend`)
```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Create a .env file with your database connection:
# DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/savannahstack

# Run the API server (available at http://localhost:5001)
python debug.py
# Or: uvicorn main:app --host 0.0.0.0 --port 5001 --reload
```

Interactive API documentation will be available at: [http://localhost:5001/](http://localhost:5001/)

### 3. Frontend Setup (`/frontend`)
```bash
cd frontend

# Install dependencies
npm install

# Start the dev server (available at http://localhost:3365)
npm run dev
# Or: npm start
```

---

## License
MIT License.
