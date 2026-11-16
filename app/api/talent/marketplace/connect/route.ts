import {NextRequest,NextResponse} from 'next/server';
import {getTalentProfileId} from '@/lib/talent-session';
import {getMarketplacePassport} from '@/lib/marketplace-passport';
import {PassportBridgeError,passportBody,callPassportBridge,validPassportNonce,passportSiteOrigin} from '@/lib/passport-bridge';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'};
export async function POST(req:NextRequest){
 try{
  if(req.headers.get('origin')!==new URL(req.url).origin)throw new PassportBridgeError('Use the Passport connection page.',403);
  const fields=new URLSearchParams(await passportBody(req,2000)),challenge=fields.get('challenge');
  if(!validPassportNonce(challenge)||fields.get('consent')!=='connect')throw new PassportBridgeError('Start again from My Account.');
  const id=await getTalentProfileId();if(!id)throw new PassportBridgeError('Open this page on the device where you registered your Passport.',401);
  const summary=await getMarketplacePassport(id);
  await callPassportBridge('site',{action:'candidate',challenge,summary},process.env.TACH_PASSPORT_BRIDGE_SECRET);
  return NextResponse.redirect(passportSiteOrigin+'/account?section=profiles',{status:303,headers});
 }catch(e){return NextResponse.json({error:e instanceof PassportBridgeError?e.message:'We could not connect your Passport.'},{status:e instanceof PassportBridgeError?e.status:400,headers});}
}
