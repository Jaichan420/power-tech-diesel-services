# Website enquiry notifications

The existing `public/_worker.js` stores enquiries in D1 and calls the `EMAIL_NOTIFIER` service binding at `https://internal/notify`.

Deploy `worker.mjs` as `power-tech-email-notifier`, with a Cloudflare Email Service binding named `EMAIL`. The code sends only from `info@powertechdieselservices.in` to the verified destination `powertechdieselservice@gmail.com`. No API key is required.

In the existing Cloudflare Pages project `power-tech-diesel-services`, add a production service binding named `EMAIL_NOTIFIER` targeting `power-tech-email-notifier`. A new Pages deployment may be required to activate changed bindings. Preserve the existing `DB` binding.

The notifier rejects public requests: only the internal hostname and `/notify` path are accepted. Disable workers.dev and preview URLs for this service when deploying with Wrangler; the included configuration does so.

The Pages worker records notification states separately from successful enquiry saves. A saved enquiry alone does not confirm delivery. Validate with a clearly marked test submission and confirm the notification in Gmail.
