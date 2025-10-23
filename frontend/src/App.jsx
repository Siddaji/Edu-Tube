import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetails";
import VideoUpload from "./components/VideoUpload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/upload" element={<VideoUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
