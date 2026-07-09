import { useEffect, useState } from "react";
import API from "../services/api";

function DashboardCards() {

  const [stats, setStats] = useState({
    total_hcps: 0,
    todays_visits: 0,
    pending_followups: 0,
    ai_suggestions: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const response = await API.get("/interaction/dashboard");

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const cards = [

    {
      title: "Total HCPs",
      value: stats.total_hcps,
      icon: "👨‍⚕️",
      color: "#2563eb",
    },

    {
      title: "Today's Visits",
      value: stats.todays_visits,
      icon: "📅",
      color: "#16a34a",
    },

    {
      title: "Pending Follow-ups",
      value: stats.pending_followups,
      icon: "⏰",
      color: "#ea580c",
    },

    {
      title: "AI Suggestions",
      value: stats.ai_suggestions,
      icon: "🤖",
      color: "#7c3aed",
    },

  ];

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "25px",
      }}
    >

      {cards.map((card, index) => (

        <div
          key={index}
          className="card"
          style={{
            borderLeft: `6px solid ${card.color}`,
          }}
        >

          <h3>
            {card.icon} {card.title}
          </h3>

          <h1
            style={{
              color: card.color,
            }}
          >
            {card.value}
          </h1>

          <p>Updated just now</p>

        </div>

      ))}

    </div>

  );

}

export default DashboardCards;