// pages/api/debug-auth.js
export default function handler(req, res) {
  const token = String(req.headers["x-admin-token"] || "").trim();
  const expected = String(process.env.ADMIN_SECRET || "").trim();
  res.status(200).json({
    ok: true,
    // DO NOT expose full secrets; show safe slices/lengths only
    receivedHeaderFirst8: token.slice(0, 8),
    receivedHeaderLen: token.length,
    expectedFirst8: expected.slice(0, 8),
    expectedLen: expected.length,
    match: token === expected,
    hasEnv: Boolean(process.env.ADMIN_SECRET),
  });
}
