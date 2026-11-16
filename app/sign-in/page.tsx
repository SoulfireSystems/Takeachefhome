import {redirect} from 'next/navigation';
import {passportSiteOrigin} from '@/lib/passport-bridge';
export default function Page(){redirect(passportSiteOrigin+'/sign-in');}
