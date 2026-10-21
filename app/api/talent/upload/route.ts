import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

const allowedKinds = new Set(['resume','headshot','portfolio','certification']);
const allowedTypes = new Set(['application/pdf','image/jpeg','image/png','image/webp']);
const hash = (value:string) => createHash('sha256').update(value).digest('hex');

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const talentId = String(form.get('talentId') || '').trim();
    const editToken = String(form.get('editToken') || '').trim();
    const kind = String(form.get('kind') || '').trim();
    const file = form.get('file');

    if (!talentId || !editToken || !allowedKinds.has(kind) || !(file instanceof File)) return NextResponse.json({ error: 'Invalid upload.' }, { status: 400 });
    if (file.size > 10 * 1024 * 1024 || !allowedTypes.has(file.type)) return NextResponse.json({ error: 'Use PDF, JPG, PNG or WEBP files up to 10MB.' }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const { data: profile, error: profileError } = await supabase.from('talent_profiles').select('id,edit_token_hash,portfolio_urls,certification_document_urls').eq('talent_id', talentId).single();
    if (profileError || !profile) return NextResponse.json({ error: 'Talent profile not found.' }, { status: 404 });
    if (!profile.edit_token_hash || profile.edit_token_hash !== hash(editToken)) return NextResponse.json({ error: 'Invalid profile update link.' }, { status: 401 });

    const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g,'') || 'bin';
    const path = `${profile.id}/${kind}/${crypto.randomUUID()}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabase.storage.from('talent-private').upload(path, bytes, { contentType:file.type, upsert:false });
    if (uploadError) throw uploadError;

    const patch:Record<string,unknown> = {};
    if (kind === 'resume') patch.resume_url = path;
    if (kind === 'headshot') patch.headshot_url = path;
    if (kind === 'portfolio') patch.portfolio_urls = [...(profile.portfolio_urls || []), path];
    if (kind === 'certification') patch.certification_document_urls = [...(profile.certification_document_urls || []), path];
    const { error:updateError } = await supabase.from('talent_profiles').update(patch).eq('id',profile.id);
    if(updateError) throw updateError;

    return NextResponse.json({ ok:true,path });
  } catch (error) {
    console.error('Talent upload error', error);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
