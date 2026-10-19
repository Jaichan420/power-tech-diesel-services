// work/native-email.mjs
async function notifyEnquiry(id, env) {
  const db = env.DB;
  try {
    await db.prepare("INSERT OR IGNORE INTO enquiry_notifications (enquiry_id,state,updated_at) VALUES (?,'not_configured',?)").bind(id, (/* @__PURE__ */ new Date()).toISOString()).run();
    const current = await db.prepare("SELECT state FROM enquiry_notifications WHERE enquiry_id=?").bind(id).first();
    if (!env.EMAIL_NOTIFIER) return current.state;
    if (!["not_configured", "pending", "failed"].includes(current.state)) return current.state;
    const claimed = await db.prepare("UPDATE enquiry_notifications SET state='sending',attempts=attempts+1,updated_at=?,error_code=NULL WHERE enquiry_id=? AND state IN ('not_configured','pending','failed')").bind((/* @__PURE__ */ new Date()).toISOString(), id).run();
    if (claimed.meta.changes !== 1) return "sending";
    let state = "unknown", messageId = null, error = "UNCONFIRMED_DELIVERY";
    try {
      const enquiry = await db.prepare("SELECT * FROM enquiries WHERE id=?").bind(id).first();
      const response = await env.EMAIL_NOTIFIER.fetch("https://internal/notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(enquiry), signal: AbortSignal.timeout(2e4) });
      const result = await response.json();
      if (response.ok && result.ok === true) {
        state = "sent";
        messageId = result.messageId || null;
        error = null;
      } else if (result.state === "not_configured") {
        state = "not_configured";
        error = "EMAIL_NOT_CONFIGURED";
      } else if (result.state === "failed") {
        state = "failed";
        error = "EMAIL_REJECTED";
      }
    } catch {
    }
    await db.prepare("UPDATE enquiry_notifications SET state=?,updated_at=?,message_id=?,error_code=? WHERE enquiry_id=?").bind(state, (/* @__PURE__ */ new Date()).toISOString(), messageId, error, id).run();
    return state;
  } catch {
    return "unknown";
  }
}

// work/cloudflare-public-worker.mjs
var json = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
var hash = async (value) => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)))).map((b) => b.toString(16).padStart(2, "0")).join("");
var fields = ["name", "company", "phone", "businessType", "service", "location", "capacity", "generatorBrand", "message"];
async function setup(db) {
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS enquiries (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, name TEXT NOT NULL, company TEXT, phone TEXT NOT NULL, business_type TEXT NOT NULL, service TEXT NOT NULL, location TEXT NOT NULL, capacity TEXT, generator_brand TEXT, message TEXT, status TEXT NOT NULL DEFAULT 'Pending')`),
    db.prepare(`CREATE TABLE IF NOT EXISTS enquiry_notifications (enquiry_id TEXT PRIMARY KEY, state TEXT NOT NULL DEFAULT 'not_configured', attempts INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL, message_id TEXT, error_code TEXT)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS enquiry_dedup (fingerprint TEXT PRIMARY KEY, enquiry_id TEXT NOT NULL UNIQUE, expires INTEGER NOT NULL)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS enquiry_rate_limits (client TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL)`)
  ]);
}
var cloudflare_public_worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
    if (!["/api/enquiry"].includes(url.pathname)) return json({ ok: false, message: "Not found." }, 404);
    if (request.method !== "POST") return json({ ok: false, message: "Method not allowed." }, 405);
    if (request.headers.get("Origin") !== url.origin) return json({ ok: false, message: "Invalid request origin." }, 403);
    if (!request.headers.get("Content-Type")?.includes("application/json")) return json({ ok: false, message: "JSON is required." }, 415);
    if (Number(request.headers.get("Content-Length") || 0) > 16384) return json({ ok: false, message: "Enquiry is too large." }, 413);
    let data;
    try {
      const raw = await request.text();
      if (raw.length > 16384) return json({ ok: false, message: "Enquiry is too large." }, 413);
      data = JSON.parse(raw);
    } catch {
      return json({ ok: false, message: "Invalid enquiry details." }, 400);
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) return json({ ok: false, message: "Invalid enquiry details." }, 400);
    if (!env.DB) return json({ ok: false, message: "Enquiry service unavailable. Please use WhatsApp." }, 503);
    try {
      await setup(env.DB);
      if (data.botcheck) return json({ ok: false, message: "Unable to accept this submission." }, 400);
      const values = {};
      for (const key of fields) {
        if (data[key] !== void 0 && typeof data[key] !== "string") return json({ ok: false, message: "Invalid enquiry details." }, 400);
        values[key] = (data[key] || "").trim();
        if (values[key].length > (key === "message" ? 4e3 : 200)) return json({ ok: false, message: "An enquiry field is too long." }, 400);
      }
      if (["name", "phone", "businessType", "service", "location"].some((key) => !values[key])) return json({ ok: false, message: "Please complete all required fields." }, 400);
      if (!/^[+()\d\s-]{7,20}$/.test(values.phone) || values.phone.replace(/\D/g, "").length < 7) return json({ ok: false, message: "Enter a valid contact number." }, 400);
      const fingerprint = await hash(JSON.stringify(fields.map((key) => values[key])));
      const now = Date.now();
      const prior = await env.DB.prepare("SELECT enquiry_id FROM enquiry_dedup WHERE fingerprint=? AND expires>?").bind(fingerprint, now).first();
      if (prior) {
        const emailStatus2 = await notifyEnquiry(prior.enquiry_id, env);
        return json({ ok: true, enquiryId: prior.enquiry_id, duplicate: true, emailStatus: emailStatus2 });
      }
      const client = await hash(request.headers.get("CF-Connecting-IP") || "unknown");
      const rate = await env.DB.prepare("INSERT INTO enquiry_rate_limits (client,count,expires) VALUES (?,1,?) ON CONFLICT(client) DO UPDATE SET count=CASE WHEN expires<=? THEN 1 ELSE count+1 END,expires=CASE WHEN expires<=? THEN excluded.expires ELSE expires END RETURNING count").bind(client, now + 6e5, now, now).first();
      if (rate.count > 5) return json({ ok: false, message: "Too many enquiries. Please wait 10 minutes or contact us on WhatsApp." }, 429);
      const id = crypto.randomUUID();
      await env.DB.batch([
        env.DB.prepare("INSERT INTO enquiry_dedup (fingerprint,enquiry_id,expires) VALUES (?,?,?) ON CONFLICT(fingerprint) DO UPDATE SET enquiry_id=excluded.enquiry_id,expires=excluded.expires WHERE enquiry_dedup.expires<=?").bind(fingerprint, id, now + 6e5, now),
        env.DB.prepare("INSERT INTO enquiries (id,created_at,name,company,phone,business_type,service,location,capacity,generator_brand,message) SELECT ?,?,?,?,?,?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM enquiry_dedup WHERE fingerprint=? AND enquiry_id=?)").bind(id, (/* @__PURE__ */ new Date()).toISOString(), ...fields.map((key) => values[key]), fingerprint, id),
        env.DB.prepare("INSERT OR IGNORE INTO enquiry_notifications (enquiry_id,state,updated_at) SELECT ?,'not_configured',? WHERE EXISTS (SELECT 1 FROM enquiries WHERE id=?)").bind(id, (/* @__PURE__ */ new Date()).toISOString(), id)
      ]);
      const row = await env.DB.prepare("SELECT enquiry_id FROM enquiry_dedup WHERE fingerprint=?").bind(fingerprint).first();
      const emailStatus = await notifyEnquiry(row.enquiry_id, env);
      return json({ ok: true, enquiryId: row.enquiry_id, duplicate: row.enquiry_id !== id, emailStatus }, row.enquiry_id === id ? 201 : 200);
    } catch {
      return json({ ok: false, message: "Unable to save your enquiry right now. Please try again or contact us on WhatsApp." }, 503);
    }
  }
};
export {
  cloudflare_public_worker_default as default
};
