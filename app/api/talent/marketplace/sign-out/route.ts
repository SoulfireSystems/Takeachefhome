import {NextResponse} from 'next/server';
import {TALENT_COOKIE,talentCookieOptions} from '@/lib/talent-session';
import {passportSiteOrigin} from '@/lib/passport-bridge';
export const dynamic='force-dynamic';
export async function GET(){
 const response=NextResponse.redirect(passportSiteOrigin+'/auth/sign-out',{status:303,headers:{'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'}});
 response.cookies.set(TALENT_COOKIE,'',{...talentCookieOptions(),maxAge:0});return response;
}
