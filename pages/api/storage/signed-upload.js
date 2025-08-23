// pages/api/storage/signed-upload.js
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  // Guard with your ADMIN secret (same you used for product CRUD)
  const token = String(req.headers["x-admin-token"] || "").trim();
  const expected = String(process.env.ADMIN_SECRET || "").trim();
  if (token !== expected) return res.status(401).json({ error: "Unauthorized" });

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { fileName } = req.body || {};
    if (!fileName) return res.status(400).json({ error: "fileName required" });

    const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "products";

    // Ensure a unique path (folder/date prefix helps)
    const ext = fileName.split(".").pop().toLowerCase();
    const safeExt = ["png", "jpg", "jpeg", "webp", "gif"].includes(ext) ? ext : "png";
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;
    const path = uniqueName; // e.g., could prefix with "uploads/" if you like

    const { data, error } = await supabaseAdmin
      .storage
      .from(bucket)
      .createSignedUploadUrl(path); // v2 API

    if (error) return res.status(500).json({ error: error.message });

    // Return path + token so the client can upload
    return res.status(200).json({ path, token: data?.token });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
}
