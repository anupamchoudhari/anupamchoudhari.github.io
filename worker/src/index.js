// Engagement Worker for anupamchoudhari.com.
//
//   GET  /claps?slug=x&reader=r   -> { claps, mine, max }
//   POST /clap      {slug, reader, n}   adds up to n claps (capped per reader)
//   POST /view      {slug}              counts a page view (skipped for the owner)
//   GET  /stats[?slug=x]                owner only: views and claps
//   POST /subscribe {email}             sends a confirmation email
//   GET  /confirm?t=…  /unsubscribe?t=…  links inside emails
//   cron (hourly)                       emails confirmed subscribers about new posts listed in /posts.json
//
// Nothing personal is stored for claps: reader ids and IPs are salted hashes.

const SLUG = /^[a-z0-9][a-z0-9-]{0,79}$/;
const EMAIL = /^[^\s@<>"]{1,64}@[^\s@<>"]{1,190}\.[a-z]{2,}$/i;
const IP_DAILY_CAP = 300; // claps per post per network per day: stops scripts, spares shared office/mobile IPs

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const cors = corsHeaders(req, env);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    try {
      const route = `${req.method} ${url.pathname.replace(/\/+$/, "") || "/"}`;
      switch (route) {
        case "GET /claps": return json(await getClaps(url, env), cors);
        case "POST /clap": return json(await addClaps(req, env), cors);
        case "POST /view": return json(await addView(req, env), cors);
        case "GET /stats": return json(await stats(req, url, env), cors);
        case "POST /subscribe": return json(await subscribe(req, env), cors);
        case "GET /confirm": return page(await confirm(url, env), env);
        case "GET /unsubscribe": return page(await unsubscribe(url, env), env);
        case "POST /unsubscribe": await unsubscribe(url, env); return new Response("ok"); // one-click from mail apps
        case "GET /": return new Response("ok");
      }
      return json({ error: "not found" }, cors, 404);
    } catch (e) {
      if (e instanceof HttpError) return json({ error: e.message }, cors, e.status);
      console.error(e);
      return json({ error: "server error" }, cors, 500);
    }
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(Promise.all([announceNewPosts(env), env.DB.prepare("DELETE FROM hits").run()]));
  },
};

/* ---------------- claps and views ---------------- */

async function getClaps(url, env) {
  const slug = needSlug(url.searchParams.get("slug"));
  const row = await env.DB.prepare("SELECT claps FROM posts WHERE slug=?").bind(slug).first();
  let mine = 0;
  const reader = url.searchParams.get("reader");
  if (reader) {
    const r = await env.DB.prepare("SELECT n FROM clappers WHERE slug=? AND who=?")
      .bind(slug, await readerKey(reader, env)).first();
    mine = r ? r.n : 0;
  }
  return { claps: row ? row.claps : 0, mine, max: maxClaps(env) };
}

async function addClaps(req, env) {
  const body = await readJson(req);
  const slug = needSlug(body.slug);
  if (typeof body.reader !== "string" || body.reader.length < 8 || body.reader.length > 64) throw new HttpError(400, "bad reader");
  const want = Math.max(0, Math.min(maxClaps(env), Math.floor(Number(body.n) || 0)));
  const rk = await readerKey(body.reader, env);
  const ik = `i:${await hash(env, ip(req))}:${today()}`;

  const [r, i] = await Promise.all([
    env.DB.prepare("SELECT n FROM clappers WHERE slug=? AND who=?").bind(slug, rk).first(),
    env.DB.prepare("SELECT n FROM clappers WHERE slug=? AND who=?").bind(slug, ik).first(),
  ]);
  const mine = r ? r.n : 0;
  const net = i ? i.n : 0;
  const add = Math.max(0, Math.min(want, maxClaps(env) - mine, IP_DAILY_CAP - net));

  if (add > 0) {
    const up = "INSERT INTO clappers(slug,who,n) VALUES(?,?,?) ON CONFLICT(slug,who) DO UPDATE SET n=n+excluded.n";
    await env.DB.batch([
      env.DB.prepare(up).bind(slug, rk, add),
      env.DB.prepare(up).bind(slug, ik, add),
      env.DB.prepare("INSERT INTO posts(slug,claps) VALUES(?,?) ON CONFLICT(slug) DO UPDATE SET claps=claps+excluded.claps").bind(slug, add),
    ]);
  }
  const row = await env.DB.prepare("SELECT claps FROM posts WHERE slug=?").bind(slug).first();
  return { claps: row ? row.claps : 0, mine: mine + add, max: maxClaps(env) };
}

async function addView(req, env) {
  const body = await readJson(req);
  const slug = needSlug(body.slug);
  if (isOwner(req, env)) return { counted: false };
  await env.DB.prepare("INSERT INTO posts(slug,views) VALUES(?,1) ON CONFLICT(slug) DO UPDATE SET views=views+1").bind(slug).run();
  return { counted: true };
}

async function stats(req, url, env) {
  if (!isOwner(req, env)) throw new HttpError(401, "owner only");
  const slug = url.searchParams.get("slug");
  if (slug) {
    const row = await env.DB.prepare("SELECT slug,claps,views FROM posts WHERE slug=?").bind(needSlug(slug)).first();
    return row || { slug, claps: 0, views: 0 };
  }
  const { results } = await env.DB.prepare("SELECT slug,claps,views FROM posts ORDER BY views DESC").all();
  const subs = await env.DB.prepare("SELECT status, COUNT(*) AS n FROM subscribers GROUP BY status").all();
  return { posts: results, subscribers: Object.fromEntries(subs.results.map((s) => [s.status, s.n])) };
}

function isOwner(req, env) {
  if (!env.OWNER_TOKEN) return false;
  const h = req.headers.get("authorization") || "";
  const t = h.startsWith("Bearer ") ? h.slice(7) : new URL(req.url).searchParams.get("token");
  return !!t && timingSafeEqual(t, env.OWNER_TOKEN);
}

/* ---------------- subscriptions ---------------- */

async function subscribe(req, env) {
  const body = await readJson(req);
  if (body.website) return { ok: true }; // honeypot field: bots fill it, people never see it
  const email = String(body.email || "").trim().toLowerCase();
  if (!EMAIL.test(email)) throw new HttpError(400, "That email doesn't look right.");
  await rateLimit(env, `sub:${await hash(env, ip(req))}`, 5);

  const existing = await env.DB.prepare("SELECT token,status FROM subscribers WHERE email=?").bind(email).first();
  if (existing && existing.status === "active") return { ok: true }; // don't reveal who is subscribed
  const token = existing ? existing.token : randomToken();
  const link = `${new URL(req.url).origin}/confirm?t=${token}`;
  await sendEmail(env, {
    to: email,
    subject: "Confirm your subscription",
    text: `Someone (hopefully you) asked to get an email when ${host(env)} has a new post.\n\nConfirm: ${link}\n\nIf it wasn't you, ignore this and nothing more will arrive.`,
    html: shell(env, `<p>Someone (hopefully you) asked to get an email when <a href="${env.SITE}">${host(env)}</a> has a new post.</p>
      <p><a href="${link}" style="${BTN}">Confirm subscription</a></p>
      <p style="color:#5d6371;font-size:14px">If it wasn't you, ignore this and nothing more will arrive.</p>`),
  });
  if (!existing) {
    await env.DB.prepare("INSERT INTO subscribers(email,token,status,created_at) VALUES(?,?,'pending',?)")
      .bind(email, token, new Date().toISOString()).run();
  }
  return { ok: true };
}

async function confirm(url, env) {
  const t = url.searchParams.get("t") || "";
  const r = await env.DB.prepare("UPDATE subscribers SET status='active', confirmed_at=? WHERE token=?")
    .bind(new Date().toISOString(), t).run();
  return r.meta.changes
    ? { title: "You're subscribed", body: "One email per new post, nothing else. Every email has an unsubscribe link." }
    : { title: "Link expired", body: "This confirmation link doesn't match a subscription. Try subscribing again from any post." };
}

async function unsubscribe(url, env) {
  const t = url.searchParams.get("t") || "";
  await env.DB.prepare("DELETE FROM subscribers WHERE token=?").bind(t).run();
  return { title: "Unsubscribed", body: "Your email address has been deleted. No more emails will arrive." };
}

async function announceNewPosts(env) {
  if (!env.RESEND_API_KEY) return;
  const res = await fetch(env.FEED_URL, { headers: { "user-agent": "site-engage-worker" }, cf: { cacheTtl: 0 } });
  if (!res.ok) throw new Error(`feed ${res.status}`);
  const items = ((await res.json()).posts || []).map((p) => ({ ...p, date: Date.parse(p.date) || 0 }));
  if (!items.length) return;

  const seen = await env.DB.prepare("SELECT COUNT(*) AS n FROM sent").first();
  const now = new Date().toISOString();
  if (!seen.n) {
    // First run: everything already published counts as announced.
    await env.DB.batch(items.map((it) => env.DB.prepare("INSERT OR IGNORE INTO sent(link,sent_at) VALUES(?,?)").bind(it.link, now)));
    return;
  }
  const weekAgo = Date.now() - 7 * 864e5;
  for (const it of items) {
    if (it.date && it.date < weekAgo) continue; // never mail old posts, e.g. after a feed change
    const done = await env.DB.prepare("SELECT 1 FROM sent WHERE link=?").bind(it.link).first();
    if (done) continue;
    // Mark first so a failure part-way never double-sends; a failed batch is logged, not retried.
    await env.DB.prepare("INSERT INTO sent(link,sent_at) VALUES(?,?)").bind(it.link, now).run();
    const { results } = await env.DB.prepare("SELECT email,token FROM subscribers WHERE status='active'").all();
    for (let i = 0; i < results.length; i += 100) {
      await sendBatch(env, results.slice(i, i + 100).map((s) => postEmail(env, it, s)));
    }
  }
}

function postEmail(env, it, s) {
  const unsub = `${apiOrigin(env)}/unsubscribe?t=${s.token}`;
  return {
    to: s.email,
    subject: it.title,
    headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    text: `${it.title}\n\n${it.description}\n\nRead it: ${it.link}\n\n—\nYou subscribed to new posts on ${host(env)}. Unsubscribe: ${unsub}`,
    html: shell(env, `${it.section ? `<p style="margin:0 0 6px;color:#5d6371;font-size:13px;letter-spacing:.06em;text-transform:uppercase">New in ${esc(it.section)}</p>` : ""}<h1 style="font-family:Georgia,serif;font-weight:500;font-size:26px;line-height:1.2;margin:0 0 12px">${esc(it.title)}</h1>
      ${it.description ? `<p style="font-family:Georgia,serif;font-style:italic;font-size:18px;color:#5d6371;margin:0 0 20px">${esc(it.description)}</p>` : ""}
      <p><a href="${esc(it.link)}" style="${BTN}">Read it</a></p>`, unsub),
  };
}

/* ---------------- email ---------------- */

const BTN = "display:inline-block;background:#1f49a0;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;font-family:Helvetica,Arial,sans-serif;font-size:15px";

function shell(env, inner, unsub) {
  return `<!doctype html><html><body style="margin:0;background:#f4f5f7;padding:24px 12px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;padding:28px;color:#17191e;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6">
  <p style="margin:0 0 20px"><a href="${env.SITE}" style="color:#17191e;text-decoration:none;font-family:Georgia,serif;font-size:17px">${host(env)}</a></p>
  ${inner}
  ${unsub ? `<p style="margin-top:28px;border-top:1px solid #d9dce3;padding-top:14px;color:#5d6371;font-size:13px">You subscribed to new posts. <a href="${unsub}" style="color:#5d6371">Unsubscribe</a></p>` : ""}
  </div></body></html>`;
}

async function sendEmail(env, msg) {
  if (!env.RESEND_API_KEY) throw new HttpError(503, "Subscriptions aren't switched on yet.");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from: env.MAIL_FROM, ...msg }),
  });
  if (!r.ok) { console.error("resend", r.status, await r.text()); throw new HttpError(502, "Couldn't send the email. Try again later."); }
}

async function sendBatch(env, msgs) {
  const r = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify(msgs.map((m) => ({ from: env.MAIL_FROM, ...m }))),
  });
  if (!r.ok) console.error("resend batch", r.status, await r.text());
}

/* ---------------- helpers ---------------- */

class HttpError extends Error { constructor(status, msg) { super(msg); this.status = status; } }

function corsHeaders(req, env) {
  const origin = req.headers.get("origin");
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim());
  const h = { "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "content-type,authorization", "access-control-max-age": "86400", vary: "origin" };
  if (origin && allowed.includes(origin)) h["access-control-allow-origin"] = origin;
  return h;
}

function json(data, headers, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...headers, "content-type": "application/json", "cache-control": "no-store" } });
}

function page({ title, body }, env) {
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
  <style>body{margin:0;background:#f4f5f7;color:#17191e;font:17px/1.6 Georgia,serif;display:grid;place-items:center;min-height:100vh;padding:24px;box-sizing:border-box}
  @media (prefers-color-scheme:dark){body{background:#15171c;color:#e7e8ec}a{color:#93b2f0}}main{max-width:30rem}h1{font-weight:500;font-size:2rem;margin:0 0 .6rem}a{color:#1f49a0}</style></head>
  <body><main><h1>${title}</h1><p>${body}</p><p><a href="${env.SITE}">Back to ${host(env)}</a></p></main></body></html>`,
    { headers: { "content-type": "text/html;charset=utf-8", "cache-control": "no-store" } });
}

async function readJson(req) {
  const t = await req.text();
  if (t.length > 2000) throw new HttpError(413, "too large");
  try { return JSON.parse(t || "{}"); } catch { throw new HttpError(400, "bad json"); }
}

function needSlug(s) { if (typeof s !== "string" || !SLUG.test(s)) throw new HttpError(400, "bad slug"); return s; }
const maxClaps = (env) => Number(env.MAX_CLAPS) || 50;
const ip = (req) => req.headers.get("cf-connecting-ip") || "0.0.0.0";
const today = () => new Date().toISOString().slice(0, 10);
const host = (env) => new URL(env.SITE).host.replace(/^www\./, "");
const apiOrigin = (env) => env.API_ORIGIN || "https://api.anupamchoudhari.com";
const readerKey = async (reader, env) => `r:${await hash(env, reader)}`;

async function hash(env, s) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${env.SALT || "dev-salt"}|${s}`));
  return [...new Uint8Array(buf)].slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomToken() {
  return [...crypto.getRandomValues(new Uint8Array(18))].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

async function rateLimit(env, key, max) {
  const k = `${key}:${new Date().toISOString().slice(0, 13)}`; // per hour
  const r = await env.DB.prepare("INSERT INTO hits(key,n) VALUES(?,1) ON CONFLICT(key) DO UPDATE SET n=n+1 RETURNING n").bind(k).first();
  if (r.n > max) throw new HttpError(429, "Too many tries. Give it an hour.");
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
