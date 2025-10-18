import { useEffect, useState } from "react";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/videos");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchVideos();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>All Videos</h2>
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video._id}>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        ))
      ) : (
        <p>No videos found</p>
      )}
    </div>
  );
};

export default VideoList;
