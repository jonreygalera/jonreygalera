import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "jonreygalera@gmail.com";
// Resend's sandbox sender works until you verify your own domain in Resend.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance throttle: 5 messages / 10 min per IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const field = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if (field(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = field(body.name);
  const email = field(body.email);
  const subject = field(body.subject).replace(/[\r\n]+/g, " ");
  const message = field(body.message);

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Please fill in your name, email, subject and message." }, { status: 400 });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const safeName = escapeHtml(name);
  const html = `
    <h2>New message from your portfolio</h2>
    <p><strong>Name:</strong> ${safeName}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;
  const text = `New message from your portfolio\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject} — ${name.replace(/[\r\n]+/g, " ")}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      console.error("Contact form: Resend error", res.status, await res.text());
      return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form: request to Resend failed", error);
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 502 });
  }
}
