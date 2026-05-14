type LeadPayload = {
  name?: unknown;
  venue?: unknown;
  phone?: unknown;
  type?: unknown;
  hp?: unknown;
};

const MAX_LEN = 200;

function clean(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_LEN) return null;
  return trimmed;
}

function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export async function POST(request: Request) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    return Response.json(
      { error: "Server not configured." },
      { status: 500 },
    );
  }

  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.hp === "string" && body.hp.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const name = clean(body.name);
  const venue = clean(body.venue);
  const phone = clean(body.phone);
  const type = clean(body.type);

  if (!name || !venue || !phone || !type) {
    return Response.json(
      { error: "Please fill out every field." },
      { status: 400 },
    );
  }

  const phoneCompact = phoneDigits(phone);
  if (phoneCompact.length !== 10) {
    return Response.json(
      { error: "Phone must be a 10-digit US number." },
      { status: 400 },
    );
  }

  const submittedAt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

  const slackPayload = {
    text: `New IRL Snaps lead — ${venue} (${type})`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: `New lead — ${venue}` },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Venue type:*\n${type}` },
          { type: "mrkdwn", text: `*Contact:*\n${name}` },
          {
            type: "mrkdwn",
            text: `*Phone:*\n<tel:+1${phoneCompact}|${phone}>`,
          },
        ],
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `Submitted ${submittedAt} PT` },
        ],
      },
    ],
  };

  const slackRes = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(slackPayload),
  });

  if (!slackRes.ok) {
    const detail = await slackRes.text().catch(() => "");
    console.error("Slack webhook failed", slackRes.status, detail);
    return Response.json(
      { error: "Couldn't deliver — try again in a sec." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true }, { status: 200 });
}
