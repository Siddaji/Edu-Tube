export default function validateVideoBody(req, res, next) {
  const allowed = ["title", "creator", "videoUrl", "description", "category"];
  const bodyKeys = Object.keys(req.body || {});
  for (const key of bodyKeys) {
    if (!allowed.includes(key)) {
      return res.status(400).json({ message: `Field not allowed: ${key}` });
    }
  }
  next();
}
