const API_BASE = "http://localhost:3000/api/videos";

export async function getAllVideos() {
  const res = await fetch(API_BASE);
  return await res.json();
}

export async function addVideo(videoData) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(videoData),
  });
  return await res.json();
}
