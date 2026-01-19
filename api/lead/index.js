const crypto = require("crypto");

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email } = req.body || {};
  if (!name || (!phone && !email)) {
    return res.status(400).json({ error: "Falta name y (phone o email)" });
  }

  const CHATWOOT_HMAC_SECRET = process.env.CHATWOOT_HMAC_SECRET;
  if (!CHATWOOT_HMAC_SECRET) {
    return res.status(500).json({ error: "CHATWOOT_HMAC_SECRET no configurado" });
  }

  const identifier =
    (email && email.toLowerCase()) ||
    phone ||
    crypto.randomUUID();

  const identifier_hash = crypto
    .createHmac("sha256", CHATWOOT_HMAC_SECRET)
    .update(identifier)
    .digest("hex");

  return res.status(200).json({ identifier, identifier_hash });
};
