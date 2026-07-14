import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginInteraction from "./components/LoginInteraction";
import ChatInterface from "./components/ChatInterface";

function App() {
  return (
    <div className="container">
      <Navbar />

      <Routes>
        <Route path="/" element={<LoginInteraction />} />
        <Route path="/chat" element={<ChatInterface />} />
      </Routes>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "20px",
          borderTop: "1px solid #e5e7eb",
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        <p>
          © 2026 AI-First CRM | Powered by React • FastAPI • PostgreSQL •
          LangGraph • Groq LLM
        </p>

        <p style={{ marginTop: "5px" }}>
          Developed by <strong>Avula Sreekanth</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;