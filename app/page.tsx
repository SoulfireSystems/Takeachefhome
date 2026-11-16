import {redirect} from 'next/navigation';
import {passportSiteOrigin} from '@/lib/passport-bridge';
export const dynamic='force-dynamic';
export default async function Home({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
 const q=await searchParams,allowed=['utm_source','utm_medium','utm_campaign','utm_term','utm_content'],params=new URLSearchParams();
 for(const key of allowed){const value=q[key];if(typeof value==='string')params.set(key,value.slice(0,200));}
 redirect(passportSiteOrigin+'/'+(params.size?'?'+params.toString():''));
}
