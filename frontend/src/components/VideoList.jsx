import React, { useEffect, useState } from "react";
import { fetchVideos } from "../api/VideoApi.jsx";

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await fetchVideos();
        if (!mounted) return;
        if (Array.isArray(data)) setVideos(data);
        else if (Array.isArray(data.data)) setVideos(data.data);
        else {
          setVideos([]);
          console.error("Unexpected backend response:", data);
        }
      } catch (err) {
        if (!mounted) return;
        setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <p className="text-center mt-10">Loading videos...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  if (!videos.length) return <p className="text-center mt-10">No videos found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Videos</h2>
      <div className="grid grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video._id || video.id} className="border p-2 rounded-lg shadow">
            <div className="mb-2">
              {video.videoUrl ? (
                <iframe
                  title={video.title}
                  src={video.videoUrl}
                  width="100%"
                  height="180"
                  frameBorder="0"
                  allowFullScreen
                />
              ) : null}
            </div>
            <h3 className="font-semibold">{video.title}</h3>
            <p className="text-sm text-gray-600">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
