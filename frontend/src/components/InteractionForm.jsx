import { useState } from "react";
import API from "../services/api";

function InteractionForm() {
  const [formData, setFormData] = useState({
    hcpName: "",
    hospital: "",
    department: "",
    specialization: "",
    interactionType: "",
    product: "",
    visitDate: "",
    followUpDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await API.post("/interaction/log", {
        hcp_name: formData.hcpName,
        hospital: formData.hospital,
        department: formData.department,
        specialization: formData.specialization,
        interaction_type: formData.interactionType,
        product: formData.product,
        visit_date: formData.visitDate,
        follow_up_date: formData.followUpDate,
        notes: formData.notes,
      });

      // Display AI Summary
      setSummary(response.data.ai_summary);

      alert("✅ Interaction Logged Successfully!");

      // Reset form
      setFormData({
        hcpName: "",
        hospital: "",
        department: "",
        specialization: "",
        interactionType: "",
        product: "",
        visitDate: "",
        followUpDate: "",
        notes: "",
      });

    } catch (error) {
      console.error(error);

      alert(
        "❌ Error\n\n" +
        (error.response?.data?.detail || error.message)
      );
    }

    setLoading(false);
  };

  return (
    <div className="card">

      <h2>Log HCP Interaction</h2>

      <form onSubmit={handleSubmit}>

        <label>HCP Name</label>
        <input
          type="text"
          name="hcpName"
          value={formData.hcpName}
          onChange={handleChange}
          placeholder="Dr. John Smith"
          required
        />

        <label>Hospital</label>
        <input
          type="text"
          name="hospital"
          value={formData.hospital}
          onChange={handleChange}
          placeholder="Apollo Hospital"
          required
        />

        <label>Department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Cardiology"
        />

        <label>Specialization</label>
        <input
          type="text"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="Cardiologist"
        />

        <label>Interaction Type</label>
        <select
          name="interactionType"
          value={formData.interactionType}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option>Face to Face</option>
          <option>Phone Call</option>
          <option>Email</option>
          <option>Conference</option>
        </select>

        <label>Product Discussed</label>
        <input
          type="text"
          name="product"
          value={formData.product}
          onChange={handleChange}
          placeholder="Example: Insulin-X"
        />

        <label>Visit Date</label>
        <input
          type="date"
          name="visitDate"
          value={formData.visitDate}
          onChange={handleChange}
        />

        <label>Follow-up Date</label>
        <input
          type="date"
          name="followUpDate"
          value={formData.followUpDate}
          onChange={handleChange}
        />

        <label>Interaction Notes</label>
        <textarea
          rows="6"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter meeting notes, doctor feedback, product discussion and follow-up details..."
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "12px",
            fontSize: "16px",
          }}
        >
          {loading ? "Saving Interaction..." : "💾 Save Interaction"}
        </button>

      </form>

      {summary && (
        <div
          style={{
            marginTop: "25px",
            padding: "20px",
            background: "#f8fafc",
            border: "1px solid #2563eb",
            borderRadius: "10px",
          }}
        >
          <h3>🤖 AI Generated Summary</h3>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
              lineHeight: "1.7",
              fontSize: "15px",
            }}
          >
            {summary}
          </pre>
        </div>
      )}

    </div>
  );
}

export default InteractionForm;
