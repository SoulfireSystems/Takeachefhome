import {NextRequest,NextResponse} from 'next/server';
import {newTalentSession,TALENT_COOKIE,talentCookieOptions} from '@/lib/talent-session';
import {getMarketplacePassport} from '@/lib/marketplace-passport';
import {PassportBridgeError,passportBody,callPassportBridge,validPassportNonce,passportSiteOrigin,passportMainOrigin} from '@/lib/passport-bridge';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'};
export async function POST(req:NextRequest){
 try{
  if(![passportSiteOrigin,passportMainOrigin].includes(req.headers.get('origin')||''))throw new PassportBridgeError('Open your Passport from My Account.',403);
  const ticket=new URLSearchParams(await passportBody(req,2000)).get('ticket');if(!validPassportNonce(ticket))throw new PassportBridgeError('Open your Passport from My Account again.',400);
  const result=await callPassportBridge('site',{action:'redeem',ticket},process.env.TACH_PASSPORT_BRIDGE_SECRET);
  const profile=await getMarketplacePassport(String(result.profileId||''));
  const response=NextResponse.redirect(new URL('/talent/home',req.url),{status:303,headers});
  response.cookies.set(TALENT_COOKIE,newTalentSession(profile.profileId,900),{...talentCookieOptions(),maxAge:900});
  return response;
 }catch(e){return NextResponse.json({error:e instanceof PassportBridgeError?e.message:'We could not open your Passport. Return to My Account and try again.'},{status:e instanceof PassportBridgeError?e.status:400,headers});}
}
