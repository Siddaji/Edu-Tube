const API_BASE = "http://localhost:3000/api/videos";

export async function fetchVideos(params = "") {
  const url = params ? `${API_BASE}${params}` : API_BASE;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}

export async function createVideo(videoData) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(videoData),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}
