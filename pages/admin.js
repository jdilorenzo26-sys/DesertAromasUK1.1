// pages/admin.js
"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import { supabaseClient } from "@/lib/supabaseClient";

const fetcher = (url) => fetch(url).then((r) => r.json());
const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "products";

/* ---------- chip helpers ---------- */
function splitToArray(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter(Boolean).map((s) => String(s).trim()).filter(Boolean);
  return String(v).split(",").map((s) => s.trim()).filter(Boolean);
}
function toStringOrArray(val) {
  if (!val || (Array.isArray(val) && val.length === 0)) return "";
  return Array.isArray(val) ? val.join(", ") : String(val);
}
function ChipsInput({ label, value, onChange, placeholder = "type and press Enter", disabled }) {
  const [draft, setDraft] = useState("");
  const chips = useMemo(() => splitToArray(value), [value]);
  const add = (t) => {
    const text = t.trim();
    if (!text) return;
    onChange(toStringOrArray([...chips, text]));
    setDraft("");
  };
  const remove = (i) => onChange(toStringOrArray(chips.filter((_, idx) => idx !== i)));
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(draft); }
    else if (e.key === "Backspace" && !draft && chips.length) remove(chips.length - 1);
  };
  return (
    <label className="block">
      <span className="text-sm opacity-80">{label}</span>
      <div className="mt-1 rounded bg-[#1f1c17] border border-[#c5a572]/40 p-2">
        <div className="flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <span key={`${c}-${i}`} className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#c5a572]/40 text-[#e6dccb] text-xs bg-[#2a2723]">
              {c}
              <button type="button" onClick={() => remove(i)} className="text-white/70 hover:text-white" aria-label={`Remove ${c}`}>×</button>
            </span>
          ))}
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-white placeholder-[#c5a572]/60"
          />
        </div>
      </div>
    </label>
  );
}

export default function Admin() {
  /* ---------- toolbar state ---------- */
  const [filterQ, setFilterQ] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sort, setSort] = useState("created_at");
  const [dir, setDir] = useState("desc");

  const qs = useMemo(() => {
    const u = new URLSearchParams();
    if (filterQ.trim()) u.set("q", filterQ.trim());
    if (filterCategory) u.set("category", filterCategory);
    if (filterStatus) u.set("status", filterStatus);
    u.set("sort", sort);
    u.set("dir", dir);
    u.set("limit", "200");
    return `/api/products?${u.toString()}`;
  }, [filterQ, filterCategory, filterStatus, sort, dir]);

  const { data, error: loadErr, isLoading, mutate } = useSWR(qs, fetcher);
  const items = Array.isArray(data) ? data : [];

  /* ---------- create form ---------- */
  const [form, setForm] = useState({
    name: "",
    price_text: "",
    image_url: "",
    description: "",
    category: "new",
    status: "live",       // NEW
    buy_url: "",
    accords: "",
    top_notes: "",
    heart_notes: "",
    base_notes: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function createProduct(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    const payload = {
      ...form,
      accords: toStringOrArray(splitToArray(form.accords)),
      top_notes: toStringOrArray(splitToArray(form.top_notes)),
      heart_notes: toStringOrArray(splitToArray(form.heart_notes)),
      base_notes: toStringOrArray(splitToArray(form.base_notes)),
    };
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-token": process.env.NEXT_PUBLIC_X_ADMIN || "" },
        body: JSON.stringify(payload),
      });
      const text = await res.text(); let json; try { json = JSON.parse(text); } catch { json = { raw: text }; }
      if (!res.ok) { setError(`Create failed: ${json?.error || json?.raw || text}`); return; }
      setSuccess("✅ Product created!");
      setForm({ name: "", price_text: "", image_url: "", description: "", category: "new", status: "live", buy_url: "", accords: "", top_notes: "", heart_notes: "", base_notes: "" });
      mutate();
    } catch (err) { setError(`Network error: ${String(err)}`); }
  }

  /* ---------- signed upload ---------- */
  const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "products";
  const validateFile = (file) => {
    const maxMB = 8;
    if (!/^image\//.test(file.type)) return `Unsupported file type: ${file.type || "unknown"}`;
    if (file.size > maxMB * 1024 * 1024) return `File too large. Max ${maxMB}MB`;
    return null;
  };
  async function signedUpload(file) {
    const err = validateFile(file); if (err) throw new Error(err);
    const signRes = await fetch("/api/storage/signed-upload", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": process.env.NEXT_PUBLIC_X_ADMIN || "" },
      body: JSON.stringify({ fileName: file.name }),
    });
    const signed = await signRes.json();
    if (!signRes.ok) throw new Error(signed?.error || "Failed to get signed upload URL");
    const { path, token } = signed;
    const { error: upErr } = await supabaseClient.storage.from(BUCKET).uploadToSignedUrl(path, token, file);
    if (upErr) throw new Error(upErr.message || "Upload failed");
    const { data: pub } = supabaseClient.storage.from(BUCKET).getPublicUrl(path);
    return pub?.publicUrl;
  }

  // Create uploader
  const createFileInputRef = useRef(null);
  const [dragCreate, setDragCreate] = useState(false);
  const handleCreateFileChange = async (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    try { setUploading(true); const url = await signedUpload(file); setForm((f) => ({ ...f, image_url: url })); setSuccess("✅ Image uploaded"); }
    catch (err) { setError(`Upload error: ${err.message || String(err)}`); }
    finally { setUploading(false); e.target.value = ""; }
  };
  const onCreateDrop = async (e) => {
    e.preventDefault(); e.stopPropagation(); setDragCreate(false);
    if (uploading) return; const file = e.dataTransfer?.files?.[0]; if (!file) return;
    try { setUploading(true); const url = await signedUpload(file); setForm((f) => ({ ...f, image_url: url })); setSuccess("✅ Image uploaded"); }
    catch (err) { setError(`Upload error: ${err.message || String(err)}`); }
    finally { setUploading(false); }
  };

  /* ---------- delete ---------- */
  async function removeProduct(id) {
    setError(""); setSuccess("");
    const res = await fetch(`/api/products/${id}`, { method: "DELETE", headers: { "x-admin-token": process.env.NEXT_PUBLIC_X_ADMIN || "" } });
    if (!res.ok) { const t = await res.text(); setError(`Delete failed: ${t}`); return; }
    setSuccess("✅ Deleted"); mutate();
  }

  /* ---------- quick status toggle ---------- */
  async function toggleStatus(p) {
    const next = p.status === "live" ? "draft" : "live";
    const res = await fetch(`/api/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-token": process.env.NEXT_PUBLIC_X_ADMIN || "" },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) { const t = await res.text(); setError(`Update failed: ${t}`); return; }
    mutate();
  }

  /* ---------- edit modal ---------- */
  const [editing, setEditing] = useState(null);
  const [editUploading, setEditUploading] = useState(false);
  function openEdit(p) {
    setEditing({
      ...p,
      accords: toStringOrArray(splitToArray(p.accords)),
      top_notes: toStringOrArray(splitToArray(p.top_notes)),
      heart_notes: toStringOrArray(splitToArray(p.heart_notes)),
      base_notes: toStringOrArray(splitToArray(p.base_notes)),
    });
    setError(""); setSuccess("");
  }
  function closeEdit() { setEditing(null); }

  async function saveEdit() {
    if (!editing?.id) return;
    setError(""); setSuccess("");
    const payload = {
      name: editing.name || "",
      price_text: editing.price_text || "",
      image_url: editing.image_url || "",
      description: editing.description || "",
      category: editing.category || "new",
      status: editing.status || "live",
      buy_url: editing.buy_url || "",
      accords: toStringOrArray(splitToArray(editing.accords)),
      top_notes: toStringOrArray(splitToArray(editing.top_notes)),
      heart_notes: toStringOrArray(splitToArray(editing.heart_notes)),
      base_notes: toStringOrArray(splitToArray(editing.base_notes)),
    };
    const res = await fetch(`/api/products/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-token": process.env.NEXT_PUBLIC_X_ADMIN || "" },
      body: JSON.stringify(payload),
    });
    const text = await res.text(); let json; try { json = JSON.parse(text); } catch { json = { raw: text }; }
    if (!res.ok) { setError(`Update failed: ${json?.error || json?.raw || text}`); return; }
    setSuccess("✅ Updated"); setEditing(null); mutate();
  }

  const editFileInputRef = useRef(null);
  const handleEditFileChange = async (e) => {
    const file = e.target.files?.[0]; if (!file || !editing) return;
    try { setEditUploading(true); const url = await signedUpload(file); setEditing((prev) => ({ ...prev, image_url: url })); setSuccess("✅ Image uploaded"); }
    catch (err) { setError(`Upload error: ${err.message || String(err)}`); }
    finally { setEditUploading(false); e.target.value = ""; }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f1c17] to-[#2a2723] text-white px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8 bg-gradient-to-r from-[#b69363] to-[#c5a572] bg-clip-text text-transparent">
        Admin – Products
      </h1>

      {/* Toolbar: search & filters */}
      <div className="max-w-6xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          value={filterQ} onChange={(e) => setFilterQ(e.target.value)}
          placeholder="Search (name, accords, notes)…"
          className="px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white md:col-span-2"
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white">
          <option value="">All categories</option>
          <option value="new">new</option>
          <option value="featured">featured</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white">
          <option value="">All statuses</option>
          <option value="live">live</option>
          <option value="draft">draft</option>
        </select>
        <div className="flex gap-2">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="flex-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white">
            <option value="created_at">Sort by Created</option>
            <option value="name">Sort by Name</option>
            <option value="price_text">Sort by Price Text</option>
          </select>
          <select value={dir} onChange={(e) => setDir(e.target.value)} className="px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white">
            <option value="desc">↓</option>
            <option value="asc">↑</option>
          </select>
        </div>
      </div>

      {/* Create form */}
      <form onSubmit={createProduct} className="max-w-5xl mx-auto bg-[#2a2723]/80 border border-[#c5a572]/30 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <label className="block">
            <span className="text-sm opacity-80">Name *</span>
            <input name="name" value={form.name} onChange={onChange} required className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white" />
          </label>
          {/* Category */}
          <label className="block">
            <span className="text-sm opacity-80">Category</span>
            <select name="category" value={form.category} onChange={onChange} className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white">
              <option value="new">new</option>
              <option value="featured">featured</option>
            </select>
          </label>
          {/* Price */}
          <label className="block">
            <span className="text-sm opacity-80">Price Text *</span>
            <input name="price_text" value={form.price_text} onChange={onChange} required placeholder="£2.50 - £4.00" className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white" />
          </label>
          {/* Status */}
          <label className="block">
            <span className="text-sm opacity-80">Status</span>
            <select name="status" value={form.status} onChange={onChange} className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white">
              <option value="live">live</option>
              <option value="draft">draft</option>
            </select>
          </label>
          {/* Buy URL */}
          <label className="block">
            <span className="text-sm opacity-80">Buy URL (optional)</span>
            <input name="buy_url" value={form.buy_url} onChange={onChange} placeholder="https://www.tiktok.com/..." className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white" />
          </label>
          {/* Upload + URL */}
          <div className="block">
            <span className="text-sm opacity-80">Image *</span>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragCreate(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragCreate(false); }}
              onDrop={onCreateDrop}
              onClick={() => createFileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && createFileInputRef.current?.click()}
              className={[
                "mt-1 w-full h-28 rounded-xl border-2 border-dashed flex items-center justify-center text-center cursor-pointer transition",
                dragCreate ? "border-[#c5a572] bg-[#c5a572]/10" : "border-[#c5a572]/40 hover:border-[#c5a572]/70 hover:bg-white/5",
                uploading ? "opacity-60 cursor-not-allowed" : "",
              ].join(" ")}
            >
              <div className="px-3">
                <div className="text-sm">{uploading ? "Uploading…" : "Drag & drop image here, or click to choose"}</div>
                <div className="text-xs opacity-70 mt-1">PNG, JPG, WEBP • up to 8MB</div>
              </div>
              <input ref={createFileInputRef} type="file" accept="image/*" onChange={handleCreateFileChange} hidden disabled={uploading} />
            </div>
            <input name="image_url" value={form.image_url} onChange={onChange} placeholder="or paste an image URL" className="w-full mt-3 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white" />
            {form.image_url && (
              <div className="mt-2 w-32 h-32 rounded-xl overflow-hidden border border-[#c5a572]/30 bg-[#1f1c17]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          {/* Description */}
          <label className="block md:col-span-2">
            <span className="text-sm opacity-80">Description</span>
            <textarea name="description" value={form.description} onChange={onChange} rows={3} className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white" />
          </label>
          {/* Chips */}
          <ChipsInput label="Accords" value={form.accords} onChange={(v) => setForm((f) => ({ ...f, accords: v }))} placeholder="e.g., Warm Spicy, Woody, Amber" disabled={uploading} />
          <ChipsInput label="Top Notes" value={form.top_notes} onChange={(v) => setForm((f) => ({ ...f, top_notes: v }))} placeholder="e.g., Bergamot, Lemon" disabled={uploading} />
          <ChipsInput label="Heart Notes" value={form.heart_notes} onChange={(v) => setForm((f) => ({ ...f, heart_notes: v }))} placeholder="e.g., Rose, Jasmine" disabled={uploading} />
          <ChipsInput label="Base Notes" value={form.base_notes} onChange={(v) => setForm((f) => ({ ...f, base_notes: v }))} placeholder="e.g., Amber, Musk" disabled={uploading} />
        </div>

        <div className="mt-5 space-y-2">
          <button className="px-6 py-2 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition" disabled={uploading}>
            {uploading ? "Please wait…" : "Create"}
          </button>
          {error && <div className="text-sm text-red-300">{error}</div>}
          {success && <div className="text-sm text-green-300">{success}</div>}
          <p className="text-xs opacity-60">
            Admin header present: {process.env.NEXT_PUBLIC_X_ADMIN ? "yes" : "no"} ·
            preview: {String(process.env.NEXT_PUBLIC_X_ADMIN || "").slice(0, 8)}… ({String(process.env.NEXT_PUBLIC_X_ADMIN || "").length} chars)
          </p>
        </div>
      </form>

      {/* Existing products */}
      <section className="max-w-6xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4">Existing Products</h2>
        {loadErr ? (
          <div className="text-red-300">Failed to load products.</div>
        ) : isLoading ? (
          <div className="text-[#d4c7aa]/80">Loading…</div>
        ) : items.length === 0 ? (
          <div className="opacity-80">No products match these filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <div key={p.id} className="border border-[#c5a572]/30 rounded-xl p-4 bg-[#2a2723]/70">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[#c5a572] font-semibold">{p.name}</div>
                    <div className="opacity-80">{p.price_text}</div>
                    <div className="opacity-70 text-xs mt-1">{p.category} • {p.status || "live"}</div>
                  </div>
                  <div className="w-16 h-16 rounded overflow-hidden border border-[#c5a572]/30 bg-[#1f1c17]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="opacity-70 text-xs break-all mt-1">{p.image_url}</div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <button onClick={() => toggleStatus(p)} className="text-xs px-3 py-1 rounded-full border border-white/30 text-white/90 hover:bg-white/10 transition">
                    Set {p.status === "live" ? "Draft" : "Live"}
                  </button>
                  <button onClick={() => openEdit(p)} className="text-xs px-3 py-1 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-[#c5a572] hover:text-black transition">
                    Edit
                  </button>
                  <button onClick={() => removeProduct(p.id)} className="text-xs px-3 py-1 rounded-full border border-red-400/60 text-red-200 hover:bg-red-400/20 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={(e) => { if (e.target === e.currentTarget) closeEdit(); }}>
          <div className="w-full max-w-3xl bg-[#2a2723] border border-[#c5a572]/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-[#c5a572]">Edit Product</h3>
              <button onClick={closeEdit} className="text-white/80 hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-sm opacity-80">Name *</span>
                <input value={editing.name || ""} onChange={(e) => setEditing((p) => ({ ...p, name: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white" />
              </label>
              <label className="block">
                <span className="text-sm opacity-80">Category</span>
                <select value={editing.category || "new"} onChange={(e) => setEditing((p) => ({ ...p, category: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white">
                  <option value="new">new</option>
                  <option value="featured">featured</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm opacity-80">Price Text *</span>
                <input value={editing.price_text || ""} onChange={(e) => setEditing((p) => ({ ...p, price_text: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white" />
              </label>
              <label className="block">
                <span className="text-sm opacity-80">Status</span>
                <select value={editing.status || "live"} onChange={(e) => setEditing((p) => ({ ...p, status: e.target.value }))} className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white">
                  <option value="live">live</option>
                  <option value="draft">draft</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm opacity-80">Buy URL (optional)</span>
                <input value={editing.buy_url || ""} onChange={(e) => setEditing((p) => ({ ...p, buy_url: e.target.value }))} placeholder="https://www.tiktok.com/..." className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white" />
              </label>

              {/* Image replace */}
              <div className="block">
                <span className="text-sm opacity-80">Image *</span>
                <div
                  onClick={() => editFileInputRef.current?.click()}
                  className={["mt-1 w-full h-24 rounded-xl border-2 border-dashed flex items-center justify-center text-center cursor-pointer transition",
                    editUploading ? "opacity-60 cursor-not-allowed" : "border-[#c5a572]/40 hover:border-[#c5a572]/70 hover:bg-white/5"].join(" ")}
                >
                  <div className="px-3 text-sm">{editUploading ? "Uploading…" : "Click to replace image"}</div>
                  <input ref={editFileInputRef} type="file" accept="image/*" onChange={handleEditFileChange} hidden disabled={editUploading} />
                </div>
                <input value={editing.image_url || ""} onChange={(e) => setEditing((p) => ({ ...p, image_url: e.target.value }))} placeholder="or paste image URL" className="w-full mt-2 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white" />
                {editing.image_url && (
                  <div className="mt-2 w-28 h-28 rounded-xl overflow-hidden border border-[#c5a572]/30 bg-[#1f1c17]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editing.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <label className="block md:col-span-2">
                <span className="text-sm opacity-80">Description</span>
                <textarea value={editing.description || ""} onChange={(e) => setEditing((p) => ({ ...p, description: e.target.value }))} rows={3} className="w-full mt-1 px-3 py-2 rounded bg-[#1f1c17] border border-[#c5a572]/40 text-white" />
              </label>

              <ChipsInput label="Accords" value={editing.accords || ""} onChange={(v) => setEditing((p) => ({ ...p, accords: v }))} />
              <ChipsInput label="Top Notes" value={editing.top_notes || ""} onChange={(v) => setEditing((p) => ({ ...p, top_notes: v }))} />
              <ChipsInput label="Heart Notes" value={editing.heart_notes || ""} onChange={(v) => setEditing((p) => ({ ...p, heart_notes: v }))} />
              <ChipsInput label="Base Notes" value={editing.base_notes || ""} onChange={(v) => setEditing((p) => ({ ...p, base_notes: v }))} />
            </div>

            <div className="mt-5 flex items-center gap-3 justify-end">
              <button onClick={closeEdit} className="px-5 py-2 rounded-full border border-white/30 text-white/90 hover:bg-white hover:text-black transition">
                Cancel
              </button>
              <button onClick={saveEdit} className="px-6 py-2 rounded-full border border-[#c5a572] text-[#c5a572] hover:bg-gradient-to-r hover:from-[#b69363] hover:to-[#c5a572] hover:text-white transition" disabled={editUploading}>
                {editUploading ? "Please wait…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
