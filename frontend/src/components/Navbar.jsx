import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#ffffff" : "#e5e7eb",
    background: location.pathname === path ? "#2563eb" : "transparent",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "600",
  });

  return (
    <header
      style={{
        background: "#111827",
        color: "#fff",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "12px",
        marginBottom: "24px",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>🩺 AI-First CRM</h2>
        <small>Healthcare Professional Module</small>
      </div>

      <nav
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <Link to="/" style={linkStyle("/")}>
          Dashboard
        </Link>

        <Link to="/chat" style={linkStyle("/chat")}>
          AI Chat
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;