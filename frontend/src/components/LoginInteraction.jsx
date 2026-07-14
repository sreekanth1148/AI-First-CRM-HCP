import { useState } from "react";

import DashboardCards from "./DashboardCards";
import InteractionForm from "./InteractionForm";
import ChatInterface from "./ChatInterface";
import InteractionHistory from "./InteractionHistory";
import ToolPanel from "./ToolPanel";

function LoginInteraction() {
  const [activeTab, setActiveTab] = useState("form");

  return (
    <div>

      {/* Welcome Section */}
      <div
        className="card"
        style={{
          marginBottom: "20px",
          background: "#eff6ff",
          borderLeft: "6px solid #2563eb",
        }}
      >
        <h2>👋 Welcome to AI-First CRM</h2>

        <p
          style={{
            marginTop: "10px",
            color: "#555",
            lineHeight: "1.6",
          }}
        >
          Manage Healthcare Professional interactions, track follow-ups,
          and leverage AI-powered insights using LangGraph and Groq LLM.
        </p>
      </div>

      {/* Dashboard */}
      <DashboardCards />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        <div>

          <div
            className="card"
            style={{
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <button
                onClick={() => setActiveTab("form")}
                style={{
                  background:
                    activeTab === "form"
                      ? "#2563eb"
                      : "#d1d5db",
                }}
              >
                Structured Form
              </button>

              <button
                onClick={() => setActiveTab("chat")}
                style={{
                  background:
                    activeTab === "chat"
                      ? "#2563eb"
                      : "#d1d5db",
                }}
              >
                AI Conversation
              </button>
            </div>

            {activeTab === "form" ? (
              <InteractionForm />
            ) : (
              <ChatInterface />
            )}
          </div>

          <InteractionHistory />

        </div>

        <ToolPanel />

      </div>
    </div>
  );
}

export default LoginInteraction;