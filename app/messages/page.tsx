import {redirect} from 'next/navigation';
import {passportSiteOrigin} from '@/lib/passport-bridge';
export default function Messages(){redirect(passportSiteOrigin+'/account?section=messages');}
