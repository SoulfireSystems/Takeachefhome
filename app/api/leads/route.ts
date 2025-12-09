import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Helper: accept JSON OR regular <form> submissions
async function getPayload(req: NextRequest): Promise<Record<string, any>> {
  const contentType = req.headers.get('content-type') || '';

  // If someone posts JSON (like from an API client)
  if (contentType.includes('application/json')) {
    return await req.json();
  }

  // If it’s a normal HTML form: application/x-www-form-urlencoded
  if (contentType.includes('application/x-www-form-urlencoded')) {
    const text = await req.text();
    return Object.fromEntries(new URLSearchParams(text));
  }

  // If in the future you use multipart/form-data
  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    return Object.fromEntries(formData.entries());
  }

  // Fallback – try text
  const text = await req.text();
  return { raw: text };
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload(req);

    // These keys come from your form's "name" attributes
    const client_name = (payload.name || '').toString();
    const client_email = (payload.email || '').toString();
    const client_phone = (payload.phone || '').toString() || null;
    const event_type = (
      payload.serviceType ||
      payload.service ||
      payload.need ||
      'Other'
    ).toString();
    const description = (
      payload.details ||
      payload.message ||
      payload.eventDetails ||
      payload['event details'] ||
      ''
    ).toString();

    if (!client_name || !client_email) {
      return NextResponse.json(
        { error: 'Missing name or email' },
        { status: 400 },
      );
    }

    // Adjust tier if you want to map by service type later
    const tier = 2;

    const body = [
      {
        tier,
        client_name,
        client_email,
        client_phone,
        event_type,
        description,
        status: 'active',
      },
    ];

    const resp = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('Supabase insert error:', errText);
      return NextResponse.json(
        { error: 'Failed to save lead', details: errText },
        { status: 500 },
      );
    }

    // On success, send them back to the homepage for now
    return NextResponse.redirect(new URL('/', req.url), 303);
  } catch (err: any) {
    console.error('Lead handler error:', err);
    return NextResponse.json(
      { error: 'Unexpected server error', details: err?.message || String(err) },
      { status: 500 },
    );
  }
}

// Optional: block GET so people don’t hit it in the browser
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 },
  );
}
