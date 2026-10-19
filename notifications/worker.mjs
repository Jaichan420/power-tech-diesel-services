const recipient = 'powertechdieselservice@gmail.com';
const sender = 'info@powertechdieselservices.in';
const reply = (body, status = 200) => Response.json(body, {status, headers: {'Cache-Control': 'no-store'}});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Only the existing Pages service binding uses this internal URL.
    if (url.hostname !== 'internal' || url.pathname !== '/notify') return reply({ok: false}, 404);
    if (request.method !== 'POST') return reply({ok: false}, 405);
    if (!env.EMAIL) return reply({ok: false, state: 'not_configured'}, 503);
    let enquiry;
    try {
      const body = await request.text();
      if (body.length > 16384) return reply({ok: false, state: 'failed'}, 413);
      enquiry = JSON.parse(body);
      if (!enquiry || typeof enquiry !== 'object' || Array.isArray(enquiry)) throw new Error('Invalid enquiry');
      for (const key of ['id', 'name', 'phone', 'service', 'location']) {
        if (typeof enquiry[key] !== 'string' || !enquiry[key].trim()) throw new Error('Missing field');
      }
      if (!/^[a-zA-Z0-9-]{1,64}$/.test(enquiry.id)) throw new Error('Invalid ID');
    } catch {
      return reply({ok: false, state: 'failed'}, 400);
    }
    const fields = [['Enquiry ID','id'],['Received','created_at'],['Customer','name'],['Company','company'],['Phone','phone'],['Business type','business_type'],['Service','service'],['Location','location'],['Generator capacity','capacity'],['Generator brand','generator_brand'],['Message','message']];
    const text = fields.map(([label,key]) => `${label}: ${String(enquiry[key] ?? '').slice(0,4000) || 'Not provided'}`).join('\n\n');
    try {
      const result = await env.EMAIL.send({from: sender, to: recipient, subject: `New website enquiry - ${enquiry.id}`, text});
      return reply({ok: true, messageId: result?.messageId || null});
    } catch (error) {
      // Log only the provider code, never customer details or credentials.
      console.error('Notification send failed', String(error?.code || 'EMAIL_SEND_FAILED'));
      return reply({ok: false, state: 'failed'}, 502);
    }
  }
};
