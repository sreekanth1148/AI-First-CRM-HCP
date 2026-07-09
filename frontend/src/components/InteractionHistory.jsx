import { useEffect, useState } from "react";
import API from "../services/api";

function InteractionHistory() {

  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedInteraction, setSelectedInteraction] = useState(null);
  const [editingInteraction, setEditingInteraction] = useState(null);

  const [search, setSearch] = useState("");

  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    hcp_name: "",
    hospital: "",
    department: "",
    specialization: "",
    interaction_type: "",
    product: "",
    visit_date: "",
    follow_up_date: "",
    notes: "",
  });

  useEffect(() => {
    loadInteractions();
  }, []);

  const loadInteractions = async () => {
    try {

      setLoading(true);

      const response = await API.get("/interaction/history");

      setInteractions(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = async () => {

    try {

      setSaving(true);

      await API.put(
        `/interaction/${editingInteraction.id}`,
        editForm
      );

      alert("✅ Interaction Updated Successfully");

      setEditingInteraction(null);

      loadInteractions();

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    } finally {

      setSaving(false);

    }

  };

  const deleteInteraction = async (id) => {

    const ok = window.confirm(
      "Delete this interaction?"
    );

    if (!ok) return;

    try {

      await API.delete(`/interaction/${id}`);

      alert("Interaction Deleted Successfully");

      if (
        selectedInteraction &&
        selectedInteraction.id === id
      ) {
        setSelectedInteraction(null);
      }

      if (
        editingInteraction &&
        editingInteraction.id === id
      ) {
        setEditingInteraction(null);
      }

      loadInteractions();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  const filteredInteractions = interactions.filter((item) => {

    const keyword = search.toLowerCase();

    return (

      (item.hcp_name || "")
        .toLowerCase()
        .includes(keyword)

      ||

      (item.hospital || "")
        .toLowerCase()
        .includes(keyword)

      ||

      (item.product || "")
        .toLowerCase()
        .includes(keyword)

    );

  });

  return (

    <div className="card">

      <h2>Interaction History</h2>

      <input
        type="text"
        placeholder="🔍 Search Doctor / Hospital / Product"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
          width:"100%",
          marginBottom:"20px",
          padding:"10px",
          borderRadius:"8px",
        }}
      />

      {loading ? (

        <p>Loading...</p>

      ) : (

        <>

        <table>

          <thead>

            <tr>

              <th>Doctor</th>
              <th>Hospital</th>
              <th>Department</th>
              <th>Type</th>
              <th>Product</th>
              <th>Follow-up</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

          {filteredInteractions.length===0?

          (

            <tr>

              <td
                colSpan="7"
                style={{
                  textAlign:"center",
                  padding:"20px",
                }}
              >

                No interactions found.

              </td>

            </tr>

          )

          :

          (

            filteredInteractions.map((item)=>(

              <tr key={item.id}>

                <td>{item.hcp_name}</td>

                <td>{item.hospital}</td>

                <td>{item.department}</td>

                <td>{item.interaction_type}</td>

                <td>{item.product}</td>

                <td>{item.follow_up_date}</td>

                <td>

                  <button
                    style={{
                      marginRight:"8px",
                      background:"#2563eb",
                    }}
                    onClick={()=>setSelectedInteraction(item)}
                  >
                    View
                  </button>

                  <button
                    style={{
                      marginRight:"8px",
                      background:"#f59e0b",
                    }}
                    onClick={()=>{

                      setEditingInteraction(item);

                      setEditForm({

                        hcp_name:item.hcp_name,
                        hospital:item.hospital,
                        department:item.department,
                        specialization:item.specialization,
                        interaction_type:item.interaction_type,
                        product:item.product,
                        visit_date:item.visit_date,
                        follow_up_date:item.follow_up_date,
                        notes:item.notes,

                      });

                    }}
                  >
                    Edit
                  </button>

                  <button
                    style={{
                      background:"#dc2626",
                    }}
                    onClick={()=>deleteInteraction(item.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

          </tbody>

        </table>
                  {/* View Interaction */}

          {selectedInteraction && (

            <div
              className="card"
              style={{
                marginTop: "20px",
              }}
            >

              <h2>📄 Interaction Details</h2>

              <hr />

              <p>
                <strong>Doctor:</strong>{" "}
                {selectedInteraction.hcp_name}
              </p>

              <p>
                <strong>Hospital:</strong>{" "}
                {selectedInteraction.hospital}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {selectedInteraction.department}
              </p>

              <p>
                <strong>Specialization:</strong>{" "}
                {selectedInteraction.specialization}
              </p>

              <p>
                <strong>Interaction Type:</strong>{" "}
                {selectedInteraction.interaction_type}
              </p>

              <p>
                <strong>Product:</strong>{" "}
                {selectedInteraction.product}
              </p>

              <p>
                <strong>Visit Date:</strong>{" "}
                {selectedInteraction.visit_date}
              </p>

              <p>
                <strong>Follow-up Date:</strong>{" "}
                {selectedInteraction.follow_up_date}
              </p>

              <p>
                <strong>Notes:</strong>
              </p>

              <textarea
                rows="5"
                readOnly
                value={selectedInteraction.notes}
                style={{
                  width: "100%",
                  marginBottom: "15px",
                }}
              />

              <button
                onClick={() =>
                  setSelectedInteraction(null)
                }
                style={{
                  background: "#dc2626",
                }}
              >
                Close
              </button>

            </div>

          )}

          {/* Edit Interaction */}

          {editingInteraction && (

            <div
              className="card"
              style={{
                marginTop: "20px",
              }}
            >

              <h2>✏️ Edit Interaction</h2>

              <input
                name="hcp_name"
                value={editForm.hcp_name}
                onChange={handleEditChange}
                placeholder="Doctor"
              />

              <input
                name="hospital"
                value={editForm.hospital}
                onChange={handleEditChange}
                placeholder="Hospital"
              />

              <input
                name="department"
                value={editForm.department}
                onChange={handleEditChange}
                placeholder="Department"
              />

              <input
                name="specialization"
                value={editForm.specialization}
                onChange={handleEditChange}
                placeholder="Specialization"
              />

              <input
                name="interaction_type"
                value={editForm.interaction_type}
                onChange={handleEditChange}
                placeholder="Interaction Type"
              />

              <input
                name="product"
                value={editForm.product}
                onChange={handleEditChange}
                placeholder="Product"
              />

              <input
                type="date"
                name="visit_date"
                value={editForm.visit_date}
                onChange={handleEditChange}
              />

              <input
                type="date"
                name="follow_up_date"
                value={editForm.follow_up_date}
                onChange={handleEditChange}
              />

              <textarea
                rows="5"
                name="notes"
                value={editForm.notes}
                onChange={handleEditChange}
              />

              <div
                style={{
                  marginTop: "15px",
                }}
              >

                <button
                  onClick={saveEdit}
                  disabled={saving}
                  style={{
                    marginRight: "10px",
                    background: "#16a34a",
                  }}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

                <button
                  onClick={() =>
                    setEditingInteraction(null)
                  }
                  style={{
                    background: "#dc2626",
                  }}
                >
                  Cancel
                </button>

              </div>

            </div>

          )}

        </>

      )}

    </div>

  );

}

export default InteractionHistory;