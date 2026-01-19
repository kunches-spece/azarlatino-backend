export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    service: "azarlatino-backend",
    time: new Date().toISOString()
  });
}
