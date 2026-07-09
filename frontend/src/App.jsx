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
    </div>
  );
}

export default App;