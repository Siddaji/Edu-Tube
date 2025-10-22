import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function VideoList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/videos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched videos:", data);
        setVideos(data.data || []); 
      })
      .catch((err) => console.error("Error fetching videos", err));
  }, []);

  if (!videos || videos.length === 0) {
    return <p>No videos found</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Videos</h2>
      <div className="grid grid-cols-3 gap-4">
        {videos.map((video) => (
          <Link key={video._id} to={`/video/${video._id}`}>
            <div className="border p-2 rounded-lg shadow hover:shadow-lg">
              <h3 className="font-semibold">{video.title}</h3>
              <p>{video.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VideoList;
