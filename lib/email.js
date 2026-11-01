/**
 * Server-only email notifications via the Resend HTTP API (no SDK dependency).
 * Configure with RESEND_API_KEY; without it, sending is skipped and callers carry on.
 */

const RESEND_URL = 'https://api.resend.com/emails';
// Resend's shared sender works without a verified domain, but only delivers to the Resend account's own email.
const DEFAULT_FROM = 'ASVDF Website <onboarding@resend.dev>';

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatIst(iso) {
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

/** Subject, HTML and plain-text bodies for a contact-form enquiry (only name and phone are guaranteed). */
export function buildEnquiryEmail(enquiry) {
  const received = `${formatIst(enquiry.created_at)} IST`;
  const rows = [
    ['Name', enquiry.full_name],
    ['Company', enquiry.company_name],
    ['Phone', enquiry.phone],
    ['Email', enquiry.email],
    ['Service', enquiry.service],
    ['Location', enquiry.location],
    ['Received', received],
  ].filter(([, value]) => value);

  const phoneHref = `tel:${String(enquiry.phone).replace(/[^\d+]/g, '')}`;
  const replyHint = enquiry.email
    ? `Reply to this email to answer ${enquiry.full_name} directly.`
    : `No email address was given — please reply to ${enquiry.full_name} by phone.`;
  const cell = (label, value) => {
    const safe = escapeHtml(value);
    if (label === 'Phone') return `<a href="${phoneHref}" style="color:#6845e8">${safe}</a>`;
    if (label === 'Email') return `<a href="mailto:${safe}" style="color:#6845e8">${safe}</a>`;
    return safe;
  };

  const html = `<!doctype html>
<html><body style="margin:0;background:#f1f2f7;font-family:Arial,Helvetica,sans-serif;color:#141a2e">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
        <tr><td style="background:#6845e8;color:#ffffff;padding:18px 24px;font-size:18px;font-weight:bold">New website enquiry</td></tr>
        <tr><td style="padding:20px 24px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td style="padding:6px 12px 6px 0;color:#5b6478;width:110px;vertical-align:top">${label}</td><td style="padding:6px 0;font-weight:bold">${cell(label, value)}</td></tr>`
              )
              .join('')}
          </table>
          ${
            enquiry.message
              ? `<p style="margin:18px 0 6px;color:#5b6478;font-size:13px">Message</p>
          <div style="white-space:pre-wrap;background:#f6f7fb;border-radius:8px;padding:12px 14px;font-size:14px;line-height:1.6">${escapeHtml(enquiry.message)}</div>`
              : ''
          }
          <p style="margin:18px 0 0;color:#5b6478;font-size:12px">${escapeHtml(replyHint)}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    'New website enquiry',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    ...(enquiry.message ? ['', 'Message:', enquiry.message] : []),
    '',
    replyHint,
  ].join('\n');

  const subject = enquiry.service
    ? `New enquiry: ${enquiry.service} – ${enquiry.full_name}`
    : `New enquiry – ${enquiry.full_name}`;
  return { subject, html, text };
}

/** Subject, HTML and plain-text bodies for a callback request from the timed dialog. */
export function buildCallbackEmail(callback) {
  const received = `${formatIst(callback.created_at)} IST`;
  const phone = escapeHtml(callback.phone);
  const phoneHref = `tel:${String(callback.phone).replace(/[^\d+]/g, '')}`;
  const rows = [
    ['Phone', `<a href="${phoneHref}" style="color:#6845e8">${phone}</a>`, callback.phone],
    ['Page', escapeHtml(callback.page_url), callback.page_url],
    ['Received', escapeHtml(received), received],
  ].filter(([, , value]) => value);

  const html = `<!doctype html>
<html><body style="margin:0;background:#f1f2f7;font-family:Arial,Helvetica,sans-serif;color:#141a2e">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
        <tr><td style="background:#6845e8;color:#ffffff;padding:18px 24px;font-size:18px;font-weight:bold">Callback request</td></tr>
        <tr><td style="padding:20px 24px">
          <p style="margin:0 0 12px;font-size:14px;line-height:1.5">A website visitor asked to be called back.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5">
            ${rows
              .map(
                ([label, cell]) =>
                  `<tr><td style="padding:6px 12px 6px 0;color:#5b6478;width:110px;vertical-align:top">${label}</td><td style="padding:6px 0;font-weight:bold;word-break:break-all">${cell}</td></tr>`
              )
              .join('')}
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    'Callback request',
    '',
    'A website visitor asked to be called back.',
    ...rows.map(([label, , value]) => `${label}: ${value}`),
  ].join('\n');

  return { subject: `Callback request – ${callback.phone}`, html, text };
}

function recipientList(to) {
  const recipients = (Array.isArray(to) ? to : String(to || '').split(','))
    .map((address) => address.trim())
    .filter(Boolean);
  if (!recipients.length) throw new Error('No notification recipient configured.');
  return recipients;
}

async function sendEmail({ to, subject, html, text, replyTo }) {
  const response = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_NOTIFY_FROM || DEFAULT_FROM,
      to: recipientList(to),
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      html,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`);
  }
  return response.json();
}

/** Emails the enquiry to `to` (a string or list). Throws on failure so the caller can log it. */
export function sendEnquiryNotification(enquiry, to) {
  return sendEmail({ to, replyTo: enquiry.email, ...buildEnquiryEmail(enquiry) });
}

/** Emails a callback request to `to` (a string or list). Throws on failure so the caller can log it. */
export function sendCallbackNotification(callback, to) {
  return sendEmail({ to, ...buildCallbackEmail(callback) });
}
