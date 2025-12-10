import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

// Supabase client (uses the same env vars you already set in Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Form is sending normal form data, NOT JSON
    const formData = await req.formData();

    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const phone = String(formData.get('phone') || '');
    const need = String(formData.get('type') || formData.get('whatDoYouNeed') || '');
    const details = String(formData.get('details') || formData.get('message') || '');

    // 1) Save to Supabase
    const { error } = await supabase.from('leads').insert({
      tier: 2, // Tier 2 like you chose
      client_name: name,
      client_email: email,
      client_phone: phone || null,
      event_type: need || 'unknown',
      description: details || null,
      status: 'active',
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
    }

    // 2) Send email using Resend
    const toEmail = process.env.LEAD_NOTIFICATION_EMAIL;

    if (toEmail && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'TakeaChefHome <onboarding@resend.dev>', // MUST be this address
        to: [toEmail],
        subject: `New lead from ${name || 'Unknown'}`,
        text: `
New lead from TakeaChefHome.com

Name: ${name}
Email: ${email}
Phone: ${phone}
Need: ${need}

Details:
${details}
        `.trim(),
      });
    } else {
      console.warn('Missing LEAD_NOTIFICATION_EMAIL or RESEND_API_KEY env var');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Unexpected error in /api/leads:', err);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}

// Optional GET so you don't see 405 if you hit the URL directly
export async function GET() {
  return NextResponse.json({ ok: true });
}
