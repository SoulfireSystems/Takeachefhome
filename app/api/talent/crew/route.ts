import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

const allowedRoles=new Set(['prep','line','banquet','server','bar','dish','lead','runner','setup','breakdown']);
const allowedAvailability=new Set(['available','limited','unavailable']);
const allowedTransport=new Set(['own','rideshare','public-transit','other','prefer-not']);
const allowedImageTypes=new Set(['image/jpeg','image/png','image/webp']);
const maxImageBytes=5*1024*1024;

function clean(v:FormDataEntryValue|null,max=5000){
  return typeof v==='string'?v.trim().slice(0,max):'';
}
function validEmail(v:string){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function toInt(v:string){
  if(!v) return null;
  const n=Number.parseInt(v,10);
  return Number.isFinite(n)?n:null;
}
function extensionFor(type:string){
  if(type==='image/png') return 'png';
  if(type==='image/webp') return 'webp';
  return 'jpg';
}

export async function POST(req:Request){
  let uploadedPath:string|null=null;

  try{
    const fd=await req.formData();
    if(clean(fd.get('company_website'),500)) return NextResponse.json({ok:false},{status:400});

    const roles=fd.getAll('roles').map(v=>String(v)).filter(v=>allowedRoles.has(v));
    const displayName=clean(fd.get('display_name'),120);
    const city=clean(fd.get('city'),100);
    const contactName=clean(fd.get('contact_name'),120);
    const contactEmail=clean(fd.get('contact_email'),254).toLowerCase();
    const availabilityRaw=clean(fd.get('availability_status'),30);
    const transportRaw=clean(fd.get('transportation_status'),30);
    const certifications=clean(fd.get('certifications'),1200)
      .split(',')
      .map(v=>v.trim())
      .filter(Boolean)
      .slice(0,20);

    if(!displayName||!city||!contactName||!validEmail(contactEmail)||roles.length===0){
      return NextResponse.json({ok:false,error:'Work name, city, at least one role and valid contact information are required.'},{status:400});
    }

    const supabase=getSupabaseServer();
    let profileImageUrl:string|null=null;
    const image=fd.get('profile_image');

    if(image instanceof File&&image.size>0){
      if(!allowedImageTypes.has(image.type)){
        return NextResponse.json({ok:false,error:'Crew Pass photo must be JPG, PNG or WebP.'},{status:400});
      }
      if(image.size>maxImageBytes){
        return NextResponse.json({ok:false,error:'Crew Pass photo must be 5 MB or smaller.'},{status:400});
      }

      uploadedPath='crew/'+crypto.randomUUID()+'.'+extensionFor(image.type);
      const bytes=new Uint8Array(await image.arrayBuffer());
      const {error:uploadError}=await supabase.storage.from('crew-media').upload(uploadedPath,bytes,{contentType:image.type,upsert:false});
      if(uploadError) throw uploadError;

      const {data:publicData}=supabase.storage.from('crew-media').getPublicUrl(uploadedPath);
      profileImageUrl=publicData.publicUrl;
    }

    const item={
      display_name:displayName,
      roles,
      city,
      state:clean(fd.get('state'),50)||null,
      travel_radius_miles:toInt(clean(fd.get('travel_radius_miles'),6)),
      years_experience:toInt(clean(fd.get('years_experience'),3)),
      certifications,
      transportation_status:allowedTransport.has(transportRaw)?transportRaw:null,
      availability_status:allowedAvailability.has(availabilityRaw)?availabilityRaw:'unavailable',
      profile_image_url:profileImageUrl,
      contact_name:contactName,
      contact_email:contactEmail,
      contact_phone:clean(fd.get('contact_phone'),50)||null,
      status:'pending',
      availability_updated_at:new Date().toISOString(),
    };

    const {error}=await supabase.from('crew_profiles').insert(item);
    if(error) throw error;

    return NextResponse.redirect(new URL('/talent/join?submitted=1',req.url),303);
  }catch(error){
    console.error('CREATE CREW PASS FAILED',error);

    if(uploadedPath){
      try{
        const supabase=getSupabaseServer();
        await supabase.storage.from('crew-media').remove([uploadedPath]);
      }catch(cleanupError){
        console.error('CREW IMAGE CLEANUP FAILED',cleanupError);
      }
    }

    return NextResponse.json({ok:false,error:'We could not submit this Crew Pass.'},{status:500});
  }
}
