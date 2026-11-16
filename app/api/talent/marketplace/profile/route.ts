import {NextRequest,NextResponse} from 'next/server';
import {PassportBridgeError,passportBody,verifyPassportRequest,passportBridgeVersion} from '@/lib/passport-bridge';
import {getMarketplacePassport} from '@/lib/marketplace-passport';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer'};
export async function POST(req:NextRequest){
 try{const raw=await passportBody(req);await verifyPassportRequest(req,raw,process.env.TACH_PASSPORT_BRIDGE_SECRET);const body=JSON.parse(raw);
  if(body.action==='status')return NextResponse.json({ok:true,version:passportBridgeVersion},{headers});
  if(body.action==='profile')return NextResponse.json({ok:true,summary:await getMarketplacePassport(String(body.profileId||''))},{headers});
  throw new PassportBridgeError('Unsupported profile action.');
 }catch(e){return NextResponse.json({error:e instanceof PassportBridgeError?e.message:'We could not open this Passport.'},{status:e instanceof PassportBridgeError?e.status:400,headers});}
}
