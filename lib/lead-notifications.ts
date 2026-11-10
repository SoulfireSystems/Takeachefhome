import { Resend } from 'resend';

type LeadNotice = {
  category: 'talent' | 'prep' | 'bookings' | 'support' | 'partners';
  name: string;
  email: string;
  city?: string;
  reference?: string;
};

// Called only AFTER the database insert succeeds. Email failure never rolls back a saved lead.
// Reuse RESEND_API_KEY, TALENT_FROM_EMAIL and LEAD_NOTIFICATION_EMAIL where configured.
// Optional LEAD_EMAIL_FROM overrides TALENT_FROM_EMAIL. Sender domain must be verified in Resend.
// Zoho MX records remain unchanged: Zoho receives the notifications.
export async function notifySavedLead(lead: LeadNotice): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_EMAIL_FROM || process.env.TALENT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.warn('Lead email notification not configured; saved record remains in database.');
    return false;
  }
  const address = process.env.LEAD_NOTIFICATION_EMAIL || (lead.category + '@takeachefhome.com');
  const safe = (s: string | undefined) => (s || '').replace(/[\r\n<>]/g, ' ').slice(0, 180);
  try {
    const result = await new Resend(apiKey).emails.send({
      from,
      to: address,
      subject: 'New TakeAChefHome ' + lead.category + ' submission',
      text: [
        'A new submission was saved to the marketplace database.',
        'Category: ' + lead.category,
        'Name: ' + safe(lead.name),
        'Email: ' + safe(lead.email),
        'City: ' + safe(lead.city),
        'Reference: ' + safe(lead.reference),
        'Review the secure admin database for complete details.'
      ].join('\n')
    });
    if (result.error) throw new Error(result.error.message);
    return true;
  } catch (error) {
    console.error('Saved lead notification failed', error);
    return false;
  }
}
