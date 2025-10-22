import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/video/:id" element={<VideoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
