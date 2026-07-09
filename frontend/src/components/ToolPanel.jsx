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

      setResult("Error calling AI Tool.");

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

      <div style={{marginTop:"20px"}}>

        <h3>📝 Log Interaction</h3>

        <p>Capture and summarize HCP interactions.</p>

        <button
          onClick={() =>
            runTool("Summarize today's HCP interaction.")
          }
        >
          Run Tool
        </button>

      </div>

      <hr />

      <div>

        <h3>✏️ Edit Interaction</h3>

        <p>Update existing interaction records.</p>

        <button
          onClick={() =>
            runTool("Edit the last interaction.")
          }
        >
          Run Tool
        </button>

      </div>

      <hr />

      <div>

        <h3>👨‍⚕️ Get HCP Profile</h3>

        <p>Retrieve HCP profile and visit history.</p>

        <button
          onClick={() =>
            runTool("Show profile of Dr Ravi Kumar.")
          }
        >
          Run Tool
        </button>

      </div>

      <hr />

      <div>

        <h3>💡 Suggest Next Action</h3>

        <p>Recommend the next best action.</p>

        <button
          onClick={() =>
            runTool("Suggest next action.")
          }
        >
          Run Tool
        </button>

      </div>

      <hr />

      <div>

        <h3>📧 Generate Follow-up Email</h3>

        <p>Create an AI-generated follow-up email.</p>

        <button
          onClick={() =>
            runTool("Generate follow-up email.")
          }
        >
          Run Tool
        </button>

      </div>

      {loading && (

        <div
          style={{
            marginTop:"20px"
          }}
        >
          Thinking...
        </div>

      )}

      {result && (

        <div
          style={{
            marginTop:"20px",
            padding:"20px",
            background:"#f4f4f4",
            borderRadius:"8px",
          }}
        >

          <h3>AI Response</h3>

          <pre
            style={{
              whiteSpace:"pre-wrap",
              fontFamily:"inherit"
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