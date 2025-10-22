import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/videos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVideo(data);
      })
      .catch((err) => console.error("Error fetching video details:", err));
  }, [id]);

  if (!video) return <p>Loading video...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{video.title}</h2>
      <p className="mb-2">{video.description}</p>
      <video width="640" height="360" controls>
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        ← Back to Videos
      </button>
    </div>
  );
}

export default VideoDetail;
