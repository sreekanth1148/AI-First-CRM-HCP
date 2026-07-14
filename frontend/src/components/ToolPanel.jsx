import { useState } from "react";
import API from "../services/api";

function ToolPanel() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const runTool = async (message) => {
    setLoading(true);

    try {
      const response = await API.post("/interaction/chat", {
        message,
      });

      setResult(response.data.reply);
    } catch (error) {
      console.log(error);
      setResult("❌ Unable to generate AI response.");
    }

    setLoading(false);
  };

  return (
    <div className="card">

      <h2>🤖 AI Agent Panel</h2>

      <h3>System Status</h3>

      <p>🟢 LangGraph Agent : Active</p>
      <p>🟢 Groq LLM : Connected</p>
      <p>🟢 Database : Connected</p>

      <hr />

      <div style={{ marginTop: "20px" }}>
        <h3>📝 Log Interaction</h3>

        <p>
          Capture, analyze, and summarize Healthcare Professional
          interactions.
        </p>

        <button
          onClick={() =>
            runTool("Summarize today's HCP interaction.")
          }
        >
          Open Tool
        </button>
      </div>

      <hr />

      <div>
        <h3>✏️ Edit Interaction</h3>

        <p>
          Update existing interaction records with the latest
          information.
        </p>

        <button
          onClick={() =>
            runTool("Edit the last interaction.")
          }
        >
          Open Tool
        </button>
      </div>

      <hr />

      <div>
        <h3>👨‍⚕️ Get HCP Profile</h3>

        <p>
          View the doctor's profile, specialization, and interaction
          history.
        </p>

        <button
          onClick={() =>
            runTool("Show profile of Dr Ravi Kumar.")
          }
        >
          Open Tool
        </button>
      </div>

      <hr />

      <div>
        <h3>💡 Suggest Next Action</h3>

        <p>
          Receive AI-powered recommendations for the next best action.
        </p>

        <button
          onClick={() =>
            runTool("Suggest next action.")
          }
        >
          Open Tool
        </button>
      </div>

      <hr />

      <div>
        <h3>📧 Generate Follow-up Email</h3>

        <p>
          Generate a professional follow-up email based on the
          interaction.
        </p>

        <button
          onClick={() =>
            runTool("Generate follow-up email.")
          }
        >
          Open Tool
        </button>
      </div>

      {loading && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#eff6ff",
            border: "1px solid #2563eb",
            borderRadius: "8px",
            color: "#2563eb",
            fontWeight: "bold",
          }}
        >
          🤖 AI is generating a response...
        </div>
      )}

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            background: "#eff6ff",
            border: "1px solid #2563eb",
            borderRadius: "10px",
          }}
        >
          <h3>🤖 AI Generated Response</h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
              lineHeight: "1.7",
              fontSize: "15px",
            }}
          >
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ToolPanel;