import { useState } from "react";
import API from "../services/api";

function ChatInterface() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const response = await API.post("/interaction/chat", {
        message,
      });

      const aiMessage = {
        sender: "ai",
        text: response.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Error communicating with AI.",
        },
      ]);

    }

    setMessage("");

    setLoading(false);

  };

  return (

    <div className="card">

      <h2>🤖 AI CRM Assistant</h2>

      <div
        style={{
          height: "420px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px",
          background: "#f9fafb",
        }}
      >

        {messages.length === 0 && (

          <p
            style={{
              color: "#777",
            }}
          >
            Start a conversation with the AI Assistant...
          </p>

        )}

        {messages.map((msg, index) => (

          <div
            key={index}
            style={{
              textAlign:
                msg.sender === "user"
                  ? "right"
                  : "left",

              marginBottom: "15px",
            }}
          >

            <div
              style={{
                display: "inline-block",
                padding: "12px",
                borderRadius: "12px",
                maxWidth: "80%",

                background:
                  msg.sender === "user"
                    ? "#2563eb"
                    : "#e5e7eb",

                color:
                  msg.sender === "user"
                    ? "#fff"
                    : "#111",
              }}
            >
              <strong>
                {msg.sender === "user"
                  ? "You"
                  : "AI"}
              </strong>

              <br /><br />

              <span
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.text}
              </span>

            </div>

          </div>

        ))}

        {loading && (

          <p>🤖 AI is thinking...</p>

        )}

      </div>

      <textarea
        rows="4"
        value={message}
        placeholder="Ask anything about HCP interactions..."
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendMessage}
        style={{
          marginTop: "10px",
          width: "100%",
        }}
      >
        Send
      </button>

    </div>

  );

}

export default ChatInterface;