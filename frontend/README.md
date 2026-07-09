# 🩺 AI-First CRM – Healthcare Professional (HCP) Module

An AI-powered CRM application for Pharmaceutical Sales Representatives to efficiently log, manage, and analyze Healthcare Professional (HCP) interactions using **React**, **FastAPI**, **LangGraph**, **Groq LLM**, and **PostgreSQL**.



## 📌 Project Overview

The AI-First CRM HCP Module helps pharmaceutical sales representatives:

- Log HCP interactions using a structured form
- Interact with an AI assistant through a conversational chat
- Store interaction data securely in PostgreSQL
- Generate AI-powered summaries
- Retrieve HCP profiles
- Suggest next best actions
- Generate professional follow-up emails

The application uses **LangGraph** as the AI orchestration framework and **Groq LLM** for intelligent responses.



# 🚀 Features

## Dashboard

- Total HCPs
- Today's Visits
- Pending Follow-ups
- AI Suggestions



## Structured Interaction Form

Capture:

- HCP Name
- Hospital
- Department
- Specialization
- Interaction Type
- Product Discussed
- Visit Date
- Follow-up Date
- Interaction Notes



## AI Chat

Supports conversational interaction logging.

Example:

> "Met Dr Ravi Kumar today. Discussed Insulin-X for Type 2 Diabetes. Doctor requested clinical trial brochure."

The AI automatically extracts:

- Doctor Name
- Hospital
- Product
- Summary
- Follow-up Suggestions



## Interaction History

- Search Interactions
- View Interaction
- Edit Interaction
- Delete Interaction



## AI Agent Panel

Five LangGraph tools are implemented:

### 1. Log Interaction

Captures HCP interaction details and generates:

- Summary
- Key points
- Follow-up action



### 2. Edit Interaction

Updates existing interaction records while preserving important data.

---

### 3. Get HCP Profile

Generates:

- Previous interactions
- Clinical interests
- Products discussed
- Engagement level



### 4. Suggest Next Action

Provides AI recommendations including:

- Next meeting
- Product recommendation
- Sales strategy
- Follow-up plan



### 5. Generate Follow-up Email

Automatically creates professional follow-up emails after meetings.



# 🏗 Technology Stack

## Frontend

- React.js
- React Router
- Axios
- CSS



## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic



## AI

- LangGraph
- LangChain
- Groq LLM
- Llama-3.3-70B-Versatile



## Database

- PostgreSQL



# 📂 Project Structure

```
AI-First-CRM-HCP/

│
├── frontend/
│
│   ├── src/
│   │
│   ├── components/
│   │
│   ├── services/
│   │
│   └── App.jsx
│
├── backend/
│
│   ├── app/
│   │
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── routes.py
│   ├── graph.py
│   ├── tools.py
│   ├── llm.py
│   ├── main.py
│   │
│   └── requirements.txt
│
└── README.md
```



# 🗄 Database

Database Used:

**PostgreSQL**

Example Table:

```
interactions
```

Stores:

- Doctor Name
- Hospital
- Department
- Specialization
- Product
- Notes
- Visit Date
- Follow-up Date



# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI-First-CRM-HCP.git
```



## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```



## PostgreSQL

Create database

```sql
CREATE DATABASE ai_first_crm_hcp;
```

Update `database.py`

```python
DATABASE_URL = "postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/ai_first_crm_hcp"
```



## Environment Variables

Create `.env`

```
GROQ_API_KEY=YOUR_GROQ_API_KEY
```



## Run Backend

```bash
uvicorn app.main:app --reload
```

Runs on

```
http://127.0.0.1:8000
```



## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Runs on


http://localhost:5173
```



# 🔗 API Endpoints

## Interaction


GET     /interaction/history

POST    /interaction/log

PUT     /interaction/update/{id}

DELETE  /interaction/delete/{id}

GET     /interaction/dashboard
```



## AI Agent

```
POST /chat
```

---

# 🤖 LangGraph Workflow

```
User

   │

   ▼

Router

   │

   ├── Log Interaction

   ├── Edit Interaction

   ├── Get HCP Profile

   ├── Suggest Next Action

   └── Generate Follow-up Email

   │

   ▼

Groq LLM

   │

   ▼

AI Response
```



# 📸 Screens

- Dashboard
- Log Interaction
- AI Chat
- Interaction History
- AI Agent Panel



# Future Improvements

- JWT Authentication
- Redux State Management
- Dashboard Charts
- Export to Excel
- Export to PDF
- Deployment on Render & Vercel
- Cloud PostgreSQL
- User Roles


# 👨‍💻 Developed By

**Avula Sreekanth**

B.Tech (Computer Science & Engineering)

Full Stack Developer | AI Enthusiast


# 📧 Contact

Email: your-avulasreekanth1234@gmail.com

LinkedIn: www.linkedin.com/in/avula-sreekanth-72ba813b4

GitHub: https://github.com/sreekanth1148



# License

This project was developed as part of an AI-First CRM Healthcare Professional Module technical assignment using React, FastAPI, LangGraph, Groq LLM, and PostgreSQL.