import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/videos")
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setVideos(data.data);
        } else {
          setVideos(data);
        }
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Videos</h2>
        <button
          onClick={() => navigate("/upload")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Upload Video
        </button>
      </div>

      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {videos.map((video) => (
            <Link key={video._id} to={`/video/${video._id}`}>
              <div className="border p-2 rounded-lg shadow hover:shadow-lg">
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-sm">{video.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoList;
