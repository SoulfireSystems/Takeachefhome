import Link from 'next/link';
import {getTalentProfileId} from '@/lib/talent-session';
import {getMarketplacePassport} from '@/lib/marketplace-passport';
import {callPassportBridge,validPassportNonce,passportSiteOrigin} from '@/lib/passport-bridge';
export const dynamic='force-dynamic';
export const metadata={title:'Connect your Talent Passport | TakeaChefHome',robots:{index:false,follow:false}};
export default async function ConnectPassport({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
 const query=await searchParams,challenge=typeof query.challenge==='string'?query.challenge:'';
 let profile=null,account:{name:string;email:string}|null=null,message='';
 if(validPassportNonce(challenge)){
  try{const id=await getTalentProfileId();if(id){profile=await getMarketplacePassport(id);account=(await callPassportBridge('site',{action:'inspect',challenge},process.env.TACH_PASSPORT_BRIDGE_SECRET)).account;}}
  catch{message='This connection is unavailable or has expired. Start again from My Account.';}
 }
 return <main className="min-h-screen bg-[#F4EEDF] px-5 py-12 text-[#101D31]"><section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"><Link href={passportSiteOrigin+'/' }><img src={passportSiteOrigin+'/brand/takeachefhome-logo.png'} alt="TakeaChefHome.com" width={240} height={100} className="mb-8 h-auto max-w-full"/></Link><p className="text-xs font-bold uppercase tracking-widest text-[#135DFF]">Your professional account</p><h1 className="mt-3 text-3xl font-black">Connect your Talent Passport</h1>
 {message?<p className="mt-5" role="alert">{message}</p>:profile&&account?<><p className="mt-5 leading-7">Connect <strong>{profile.name}</strong> ({profile.role}, {profile.city}, {profile.state}) to the TakeaChefHome account <strong>{account.email}</strong>.</p><p className="mt-4 leading-7">You will review the same Passport in My Account before the connection is saved. Your original profile stays in place. This does not publish it or approve your credentials.</p><form action="/api/talent/marketplace/connect" method="post" className="mt-7"><input type="hidden" name="challenge" value={challenge}/><button name="consent" value="connect" className="rounded-full bg-[#135DFF] px-6 py-3 font-bold text-white">Continue to My Account</button></form></>:validPassportNonce(challenge)?<><p className="mt-5 leading-7">To connect an existing Passport, open this page on the device where you registered it. After connecting, you can open it from your TakeaChefHome account on other devices.</p><p className="mt-4 leading-7">Creating your first Talent Passport?</p><Link className="mt-4 inline-flex rounded-full bg-[#135DFF] px-6 py-3 font-bold text-white" href={'/talent/passport?marketplace_challenge='+challenge}>Create my Talent Passport</Link></>:<p className="mt-5 leading-7">Start in My Account, choose My profiles, then connect your Talent Passport.</p>}
 <p className="mt-7"><a className="font-bold text-[#135DFF]" href={passportSiteOrigin+'/account?section=profiles'}>Return to My Account →</a></p></section></main>;
}
