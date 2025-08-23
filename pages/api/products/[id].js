// pages/api/products/[id].js
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  const { id } = req.query;

  // Write guard (you already have ADMIN_SECRET set)
  const token = String(req.headers["x-admin-token"] || "").trim();
  const expected = String(process.env.ADMIN_SECRET || "").trim();
  if (req.method !== "GET" && token !== expected) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    const body = req.body || {};
    const { data, error } = await supabaseAdmin
      .from("products")
      .update(body)
      .eq("id", id)
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end("Method Not Allowed");
}
