import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const TALENT_COOKIE = 'tch_talent_session';
const THIRTY_DAYS = 60 * 60 * 24 * 30;

function secret() {
  const value = process.env.TALENT_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!value || value.length < 32) throw new Error('Talent session secret is not configured');
  return value;
}

function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function newTalentSession(profileId: string) {
  const payload = Buffer.from(JSON.stringify({ id: profileId, exp: Math.floor(Date.now()/1000) + THIRTY_DAYS })).toString('base64url');
  return payload + '.' + sign(payload);
}

export function talentCookieOptions() {
  return { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, maxAge: THIRTY_DAYS, path: '/' };
}

export async function getTalentProfileId(): Promise<string|null> {
  const token = (await cookies()).get(TALENT_COOKIE)?.value || '';
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const expected = Buffer.from(sign(parts[0]));
  const actual = Buffer.from(parts[1]);
  if (expected.length !== actual.length || !timingSafeEqual(expected,actual)) return null;
  try {
    const data = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
    if (typeof data.id !== 'string' || !/^[0-9a-f-]{36}$/i.test(data.id) || !Number.isFinite(data.exp) || data.exp < Date.now()/1000) return null;
    return data.id;
  } catch { return null; }
}
