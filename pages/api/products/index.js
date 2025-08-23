// pages/api/products/index.js
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(req, res) {
  // Write guard for non-GET
  const token = String(req.headers["x-admin-token"] || "").trim();
  const expected = String(process.env.ADMIN_SECRET || "").trim();
  if (req.method !== "GET" && token !== expected) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    const {
      q = "",
      category,
      status,            // "live" | "draft"
      limit = 50,
      sort = "created_at",
      dir = "desc",      // "asc" | "desc"
    } = req.query;

    let query = supabaseAdmin
      .from("products")
      .select("*")
      .order(sort, { ascending: String(dir).toLowerCase() === "asc" })
      .limit(Number(limit));

    if (category) query = query.eq("category", category);
    if (status)   query = query.eq("status", status);

    const term = String(q).trim();
    if (term) {
      const like = `%${term}%`;
      // Match across name + accords + all notes
      query = query.or(
        [
          `name.ilike.${like}`,
          `accords.ilike.${like}`,
          `top_notes.ilike.${like}`,
          `heart_notes.ilike.${like}`,
          `base_notes.ilike.${like}`,
        ].join(",")
      );
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const {
      name,
      price_text,
      price_pennies,
      image_url,
      description,
      category = "new",
      status = "live",     // <— NEW
      buy_url = "",
      accords = "",
      top_notes = "",
      heart_notes = "",
      base_notes = "",
    } = req.body || {};

    if (!name || !price_text || !image_url) {
      return res.status(400).json({ error: "name, price_text, image_url required" });
    }

    const { data, error } = await supabaseAdmin
      .from("products")
      .insert([{
        name, price_text, price_pennies, image_url, description,
        category, status, buy_url, accords, top_notes, heart_notes, base_notes
      }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end("Method Not Allowed");
}
