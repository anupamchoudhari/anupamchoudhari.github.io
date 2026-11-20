# site-engage Worker

A small Cloudflare Worker behind the bar at the end of every post:

- **Claps.** No login. Up to 50 per reader per post (a random id kept in the reader's browser), plus a looser per-network daily cap so scripts can't pump numbers. Reader ids and IPs are stored only as salted hashes.
- **Views, for you only.** Every post load counts once. Open any page once with `#owner=<OWNER_TOKEN>` at the end of the address; that browser then sees a view count on each post, and your own visits stop counting. `#owner=off` undoes it. All posts at once: `https://api.anupamchoudhari.com/stats?token=<OWNER_TOKEN>`.
- **Subscribe.** A reader types an email, gets a confirmation link, and from then on one email per new post. Every hour the Worker reads `/posts.json` from the site and mails anything new (posts older than a week are never mailed). Every email has a one-click unsubscribe that deletes the address.

Storage is Cloudflare D1 (free tier); email goes through [Resend](https://resend.com) (free tier: 3,000 emails a month, 100 a day).

## One-time setup

From this folder, on a computer with Node installed:

```sh
npx wrangler@4 login                                   # opens Cloudflare in the browser
npx wrangler@4 d1 create site-engage                   # copy the database_id it prints into wrangler.toml
npx wrangler@4 d1 execute site-engage --remote --file=schema.sql
openssl rand -hex 24 | npx wrangler@4 secret put SALT
openssl rand -hex 24 | tee owner-token.txt | npx wrangler@4 secret put OWNER_TOKEN   # keep this file private, then delete it
npx wrangler@4 deploy                                  # also creates api.anupamchoudhari.com
```

Email (Resend):

1. Sign up at resend.com, then **Domains → Add domain → `updates.anupamchoudhari.com`**. Its "Sign in to Cloudflare" button adds the DNS records for you.
2. **API Keys → Create** with "Sending access", then `npx wrangler@4 secret put RESEND_API_KEY` and paste it.

Last, set `api = "https://api.anupamchoudhari.com"` under `[params.engage]` in `hugo.toml` and push. Until then posts show only the share links.

## Changing things

- Clap cap: `MAX_CLAPS` in `wrangler.toml`. Sender name and address: `MAIL_FROM`.
- Hide the bar on one post: `engage: false` in its front matter.
- Local test: `npx wrangler@4 dev` here, and `HUGO_PARAMS_ENGAGE_API=http://localhost:8787 hugo server` in the site folder.
