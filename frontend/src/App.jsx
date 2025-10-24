import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetails";
import VideoUpload from "./components/VideoUpload";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<VideoList searchTerm={searchTerm} />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/upload" element={<VideoUpload />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
