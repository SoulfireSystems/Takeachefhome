import {getSupabaseAdmin} from './supabase-server';
import {passportSummary,PassportBridgeError} from './passport-bridge';
export async function getMarketplacePassport(id:string){
 if(!/^[a-f0-9-]{36}$/i.test(id))throw new PassportBridgeError('Passport unavailable.',404);
 const {data,error}=await getSupabaseAdmin().from('talent_profiles').select('id,talent_id,first_name,last_name,professional_name,primary_role,city,state,profile_completion').eq('id',id).single();
 if(error||!data)throw new PassportBridgeError('Your Passport could not be opened. Contact support if this continues.',404);
 return passportSummary({profileId:data.id,talentId:data.talent_id,name:data.professional_name||[data.first_name,data.last_name].filter(Boolean).join(' '),role:data.primary_role,city:data.city,state:data.state,completion:data.profile_completion});
}
