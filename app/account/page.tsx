import {redirect} from 'next/navigation';
import {passportSiteOrigin} from '@/lib/passport-bridge';
export const dynamic='force-dynamic';
export default async function Account({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
 const q=await searchParams,section=typeof q.section==='string'&&['requests','profiles','messages','settings','admin','marketplace','safety','connections'].includes(q.section)?q.section:'';
 redirect(passportSiteOrigin+'/account'+(section?'?section='+section:''));
}
