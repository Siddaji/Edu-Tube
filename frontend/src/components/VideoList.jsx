import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function VideoList({ searchTerm }) {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("");

  const categories = ["DSA", "React", "Python", "JavaScript"]; 
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const url = new URL("http://localhost:3000/api/videos");
        if (searchTerm) url.searchParams.append("search", searchTerm);
        if (category) url.searchParams.append("category", category);

        const res = await fetch(url);
        const data = await res.json();
        if (data.data) setVideos(data.data);
        else setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, [searchTerm, category]);

  return (
    <div className="p-4">
      {/* Category Filter */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setCategory("")}
          className={`px-3 py-1 rounded ${
            category === "" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded ${
              category === cat ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link key={video._id} to={`/video/${video._id}`}>
              <div className="border rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform overflow-hidden bg-white">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{video.description}</p>
                  <p className="text-gray-500 text-xs mt-1">{video.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoList;
