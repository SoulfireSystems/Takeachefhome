import { createHash, timingSafeEqual } from 'node:crypto';
import { accountUser } from '@/lib/account-server';
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

const allowedKinds = new Set(['resume','headshot','portfolio','certification']);
const allowedTypes = new Set(['application/pdf','image/jpeg','image/png','image/webp']);

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const talentId = String(form.get('talentId') || '').trim();
    const kind = String(form.get('kind') || '').trim();
    const file = form.get('file');

    if (!talentId || !allowedKinds.has(kind) || !(file instanceof File)) {
      return NextResponse.json({ error: 'Invalid upload.' }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024 || !allowedTypes.has(file.type)) {
      return NextResponse.json({ error: 'Use PDF, JPG, PNG or WEBP files up to 10MB.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: profile, error: profileError } = await supabase.from('talent_profiles').select('id,account_id,edit_token_hash').eq('talent_id', talentId).single();
    if (profileError || !profile) return NextResponse.json({ error: 'Talent profile not found.' }, { status: 404 });

    const user = await accountUser();
    const token = String(form.get('uploadToken') || '');
    const digest = createHash('sha256').update(token).digest('hex');
    const expected = profile.edit_token_hash;
    const tokenValid = token.length >= 40 && typeof expected === 'string' && expected.length === digest.length && timingSafeEqual(Buffer.from(expected), Buffer.from(digest));
    if (!(user && profile.account_id === user.id) && !tokenValid) return NextResponse.json({ error: 'Sign in with the email on your Passport before uploading.' }, { status: 403 });

    const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g,'') || 'bin';
    const path = `${profile.id}/${kind}/${crypto.randomUUID()}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabase.storage.from('talent-private').upload(path, bytes, { contentType: file.type, upsert: false });
    if (uploadError) throw uploadError;

    if (kind === 'resume') await supabase.from('talent_profiles').update({ resume_url: path }).eq('id', profile.id);
    if (kind === 'headshot') await supabase.from('talent_profiles').update({ headshot_url: path }).eq('id', profile.id);
    if (kind === 'portfolio') {
      const { data } = await supabase.from('talent_profiles').select('portfolio_urls').eq('id', profile.id).single();
      await supabase.from('talent_profiles').update({ portfolio_urls: [...(data?.portfolio_urls || []), path] }).eq('id', profile.id);
    }
    if (kind === 'certification') {
      const { data } = await supabase.from('talent_profiles').select('portfolio_urls').eq('id', profile.id).single();
      await supabase.from('talent_profiles').update({ portfolio_urls: [...(data?.portfolio_urls || []), `cert:${path}`] }).eq('id', profile.id);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Talent upload error', error);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
