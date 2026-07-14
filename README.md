# 🩺 AI-First CRM – Healthcare Professional (HCP) Module

**Version:** 1.0

**Status:** ✅ Completed

An AI-powered CRM application for Pharmaceutical Sales Representatives to efficiently log, manage, and analyze Healthcare Professional (HCP) interactions using **React.js**, **FastAPI**, **PostgreSQL**, **LangGraph**, **Groq LLM**, and **SQLAlchemy**.

---

# 📌 Project Overview

AI-First CRM is a modern Healthcare Professional (HCP) Customer Relationship Management application designed for pharmaceutical sales representatives.

The application enables users to record doctor interactions, manage follow-up activities, retrieve previous interaction history, and leverage Artificial Intelligence to automate routine CRM tasks.

The system integrates **LangGraph** with the **Groq Large Language Model (LLM)** to generate AI-powered summaries, suggest next actions, retrieve HCP profiles, and generate professional follow-up emails.

---

# 🚀 Features

## 📊 Dashboard

The dashboard displays real-time CRM statistics fetched from PostgreSQL.

- 👨‍⚕️ Total HCPs
- 📅 Recent Visits
- ⏰ Pending Follow-ups
- 📋 Total Interactions

---

## 📝 Structured Interaction Form

Users can record Healthcare Professional interactions by entering:

- HCP Name
- Hospital
- Department
- Specialization
- Interaction Type
- Product Discussed
- Visit Date
- Follow-up Date
- Interaction Notes

After submission, the interaction is stored in PostgreSQL and analyzed by the AI workflow.

---

## 🤖 AI Generated Summary

After logging an interaction, LangGraph automatically sends the interaction notes to the Groq Large Language Model.

The AI generates a structured summary that helps sales representatives quickly review meeting outcomes and follow-up actions.

---

## 💬 AI Conversation

Users can communicate with the AI assistant using natural language.

Example:

> Generate a follow-up email for Dr. Ravi Kumar.

or

> Suggest the next action for Dr. Priya Sharma.

The AI analyzes the request and generates an intelligent response using LangGraph and Groq LLM.

---

## 📚 Interaction History

The application stores every interaction in PostgreSQL.

Features include:

- Search by Doctor
- Search by Hospital
- Search by Product
- View Interaction
- Edit Interaction
- Delete Interaction

---

## 🤖 AI Agent Panel

The AI Agent Panel provides intelligent CRM tools powered by LangGraph.

### 📝 1. Log Interaction

Captures Healthcare Professional interaction details and generates:

- AI Summary
- Key Discussion Points
- Follow-up Suggestions

---

### ✏️ 2. Edit Interaction

Allows users to update existing interaction records while keeping CRM data accurate and up to date.

---

### 👨‍⚕️ 3. Get HCP Profile

Generates a Healthcare Professional profile including:

- Previous Visits
- Specialization
- Products Discussed
- Clinical Interests
- Engagement History

---

### 💡 4. Suggest Next Action

Provides AI recommendations including:

- Next Meeting Strategy
- Product Recommendations
- Follow-up Plan
- Customer Engagement Suggestions

---

### 📧 5. Generate Follow-up Email

Automatically creates a professional follow-up email based on previous interaction details.

This reduces manual effort and improves communication with Healthcare Professionals.

---

# 🏗 Technology Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS3

---

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic

---

## Artificial Intelligence

- LangGraph
- LangChain
- Groq LLM
- Llama-3.3-70B-Versatile

---

## Database

- PostgreSQL

---

# 📂 Project Structure

```text
AI-First-CRM-HCP/

│
├── frontend/
│
│   ├── src/
│   │
│   ├── components/
│   │     ├── Navbar.jsx
│   │     ├── DashboardCards.jsx
│   │     ├── LoginInteraction.jsx
│   │     ├── InteractionForm.jsx
│   │     ├── InteractionHistory.jsx
│   │     ├── ChatInterface.jsx
│   │     └── ToolPanel.jsx
│   │
│   ├── redux/
│   │
│   ├── services/
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── backend/
│
│   ├── app/
│   │
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   │
│   ├── routers/
│   │     └── interaction.py
│   │
│   ├── langgraph_agent/
│   │     ├── graph.py
│   │     ├── tools.py
│   │     └── llm.py
│   │
│   └── main.py
│
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
# 🗄 Database

The application uses **PostgreSQL** as the primary relational database.

All Healthcare Professional interaction records are stored securely using SQLAlchemy ORM.

### Database Name

```text
ai_first_crm_hcp
```

### Interaction Table

```text
interactions
```

The table stores:

- HCP Name
- Hospital
- Department
- Specialization
- Interaction Type
- Product Discussed
- Visit Date
- Follow-up Date
- Interaction Notes

---

# ⚙ Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/sreekanth1148/AI-First-CRM-HCP.git

cd AI-First-CRM-HCP
```

---

# 🐍 Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate the virtual environment.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

---

# 🗄 PostgreSQL Setup

Open PostgreSQL.

Create a database.

```sql
CREATE DATABASE ai_first_crm_hcp;
```

Update the database connection inside

```text
backend/app/database.py
```

Example:

```python
DATABASE_URL = "postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/ai_first_crm_hcp"
```

---

# 🔐 Environment Variables

Inside the **backend** folder create a file named:

```text
.env
```

Example:

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
MODEL_NAME=llama-3.3-70b-versatile
```

> **Note:** Never commit your real `.env` file to GitHub. Use `.env.example` as a template.

---

# ▶ Run Backend

Navigate to the backend folder.

```bash
cd backend
```

Start the FastAPI server.

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

# ⚛ Frontend Setup

Open another terminal.

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run the React application.

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔗 API Endpoints

## Interaction APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/interaction/log` | Log a new Healthcare Professional interaction |
| GET | `/interaction/history` | Retrieve all interaction records |
| PUT | `/interaction/{interaction_id}` | Update an interaction |
| DELETE | `/interaction/{interaction_id}` | Delete an interaction |
| GET | `/interaction/dashboard` | Fetch dashboard statistics |

---

## AI APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/interaction/chat` | Conversational AI Assistant |

---

# 🤖 LangGraph Workflow

```text
                 User

                  │

                  ▼

          React Frontend

                  │

                  ▼

           FastAPI Backend

                  │

                  ▼

             LangGraph

                  │

     ┌────────────┼─────────────┐
     │            │             │
     ▼            ▼             ▼

 Log Interaction  AI Chat  AI Agent Tools

                  │

                  ▼

           Groq LLM

                  │

                  ▼

        AI Generated Response

                  │

                  ▼

          React Frontend
```

---

# 🔄 Application Workflow

1. User enters Healthcare Professional interaction details.
2. React sends the request to the FastAPI backend.
3. FastAPI validates the request using Pydantic.
4. SQLAlchemy stores the interaction in PostgreSQL.
5. LangGraph processes the interaction.
6. Groq LLM generates an AI summary or response.
7. FastAPI returns the response.
8. React displays the AI-generated result to the user.
# 📸 Application Screenshots

The application includes the following user interfaces:

- 🏠 Dashboard
- 📝 Log Interaction Form
- 🤖 AI Generated Summary
- 💬 AI Conversation
- 📚 Interaction History
- 🤖 AI Agent Panel
- 📊 Dashboard Statistics

> **Note:** Screenshots can be added inside the `screenshots/` folder and referenced here.

Example:

```text
screenshots/dashboard.png
screenshots/interaction-form.png
screenshots/ai-chat.png
screenshots/history.png
screenshots/tool-panel.png
```

---

# 🌟 Future Improvements

The following enhancements can be implemented in future versions:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Dashboard Analytics & Charts
- Export Interactions to Excel
- Export Reports to PDF
- Email Integration
- Cloud PostgreSQL Deployment
- Docker Support
- CI/CD Pipeline
- Deployment using Render & Vercel
- Notification & Reminder System
- Calendar Integration
- Advanced Search & Filters
- AI Meeting Insights
- Mobile Responsive UI

---

# 🎯 Learning Outcomes

Through this project, I gained practical experience in:

- Building REST APIs using FastAPI
- Developing modern React applications
- Database design using PostgreSQL
- SQLAlchemy ORM
- AI workflow orchestration using LangGraph
- Large Language Model integration using Groq
- Prompt Engineering
- CRUD Operations
- API Integration
- State Management
- Git & GitHub Version Control
- Technical Documentation

---

# 👨‍💻 Developed By

**Avula Sreekanth**

Bachelor of Technology (Computer Science & Engineering)

Full Stack Developer | Python Developer | React Developer | AI Enthusiast

---

# 📧 Contact

**Email**

```text
avulasreekanth1234@gmail.com
```

**LinkedIn**

```text
https://www.linkedin.com/in/avula-sreekanth-72ba813b4
```

**GitHub**

```text
https://github.com/sreekanth1148
```

---

# 📄 License

This project was developed as part of the **AI-First CRM – Healthcare Professional (HCP) Module** technical assignment.

The application demonstrates the integration of:

- React.js
- FastAPI
- PostgreSQL
- SQLAlchemy
- LangGraph
- Groq Large Language Model (LLM)

for AI-powered Healthcare Professional interaction management.

This project is intended for educational, learning, and technical evaluation purposes.

---

# 🙏 Acknowledgements

Special thanks to:

- FastAPI Community
- React Community
- PostgreSQL Documentation
- SQLAlchemy Documentation
- LangChain & LangGraph
- Groq AI

for providing excellent tools and documentation that made this project possible.

---

# ⭐ Repository

GitHub Repository:

```text
https://github.com/sreekanth1148/AI-First-CRM-HCP
```

If you found this project useful, please consider giving it a ⭐ on GitHub.

---

# ✅ Project Status

**Project Name**

AI-First CRM – Healthcare Professional (HCP) Module

**Status**

✅ Completed Successfully

### Frontend

- ✅ React.js

### Backend

- ✅ FastAPI

### Database

- ✅ PostgreSQL

### ORM

- ✅ SQLAlchemy

### AI Workflow

- ✅ LangGraph

### Large Language Model

- ✅ Groq LLM (Llama-3.3-70B-Versatile)

### Features Implemented

- ✅ Dashboard
- ✅ Structured Interaction Form
- ✅ AI Generated Summary
- ✅ Interaction History
- ✅ Search Functionality
- ✅ View Interaction
- ✅ Edit Interaction
- ✅ Delete Interaction
- ✅ AI Conversation
- ✅ AI Agent Panel
- ✅ Dashboard Statistics
- ✅ PostgreSQL Integration
- ✅ GitHub Repository
- ✅ README Documentation

---

# 🚀 Thank You

Thank you for reviewing my project.

This AI-First CRM application demonstrates my skills in:

- Full Stack Development
- React.js Frontend Development
- FastAPI Backend Development
- PostgreSQL Database Integration
- SQLAlchemy ORM
- REST API Development
- LangGraph AI Workflow
- Groq LLM Integration
- AI-Powered CRM Automation

I appreciate your time and consideration.

---

**Developed with ❤️ by Avula Sreekanth**