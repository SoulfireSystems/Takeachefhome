import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabaseServer } from '@/lib/supabaseServer';

function clean(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

function toInt(value: string) {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const opportunityId = clean(formData.get('opportunity_id'));

    const response = {
      opportunity_id: opportunityId,
      provider_name: clean(formData.get('provider_name')),
      provider_email: clean(formData.get('provider_email')),
      provider_phone: clean(formData.get('provider_phone')) || null,
      profile_url: clean(formData.get('profile_url')) || null,
      message: clean(formData.get('message')),
      quote_amount: toInt(clean(formData.get('quote_amount'))),
    };

    if (!opportunityId || !response.provider_name || !response.provider_email || !response.message) {
      return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { data: opportunity, error: opportunityError } = await supabase
      .from('opportunities')
      .select('id,title,client_name,client_email,status')
      .eq('id', opportunityId)
      .single();

    if (opportunityError || !opportunity) {
      return NextResponse.json({ ok: false, error: 'Opportunity not found.' }, { status: 404 });
    }

    if (!['open', 'responses-received'].includes(opportunity.status)) {
      return NextResponse.json({ ok: false, error: 'This opportunity is no longer accepting responses.' }, { status: 409 });
    }

    const { error: responseError } = await supabase.from('responses').insert(response);
    if (responseError) throw responseError;

    if (opportunity.status === 'open') {
      await supabase.from('opportunities').update({ status: 'responses-received', updated_at: new Date().toISOString() }).eq('id', opportunityId);
    }

    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.MARKETPLACE_FROM_EMAIL;

    if (resendKey && from) {
      const resend = new Resend(resendKey);
      const quote = response.quote_amount ? `$${response.quote_amount.toLocaleString()}` : 'Not provided';

      await resend.emails.send({
        from,
        to: opportunity.client_email,
        subject: `New response: ${opportunity.title}`,
        text: `Hi ${opportunity.client_name},\n\n${response.provider_name} responded to your TakeAChefHome request: ${opportunity.title}.\n\nQuote: ${quote}\nEmail: ${response.provider_email}\nPhone: ${response.provider_phone || 'Not provided'}\nProfile: ${response.profile_url || 'Not provided'}\n\nMessage:\n${response.message}\n`,
      });

      await resend.emails.send({
        from,
        to: response.provider_email,
        subject: `Response sent: ${opportunity.title}`,
        text: `Your response was sent successfully through TakeAChefHome.\n\nOpportunity: ${opportunity.title}\n\nWe'll keep building the marketplace so food-service work moves faster.`,
      });
    }

    return NextResponse.redirect(new URL(`/thanks?response=${opportunityId}`, req.url), 303);
  } catch (error) {
    console.error('CREATE RESPONSE FAILED', error);
    return NextResponse.json({ ok: false, error: 'We could not send this response. Please try again.' }, { status: 500 });
  }
}
