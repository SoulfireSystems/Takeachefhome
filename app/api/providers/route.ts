import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

const allowedServices=new Set(['private-chef','catering','meal-prep','food-truck','experience','class']);
const allowedTypes=new Set(['chef','caterer','meal-prep','food-truck','instructor','culinary-business']);
const allowedImageTypes=new Set(['image/jpeg','image/png','image/webp']);
const maxImageBytes=5*1024*1024;

function clean(value:FormDataEntryValue|null,max=5000){
  return typeof value==='string'?value.trim().slice(0,max):'';
}
function validEmail(value:string){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function toInt(value:string){
  if(!value) return null;
  const n=Number.parseInt(value,10);
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
    const formData=await req.formData();
    if(clean(formData.get('company_website'),500)){
      return NextResponse.json({ok:false},{status:400});
    }

    const services=formData.getAll('services').map(v=>String(v)).filter(v=>allowedServices.has(v));
    const requestedType=clean(formData.get('professional_type'),50);
    const professional_type=allowedTypes.has(requestedType)?requestedType:'chef';

    const contactEmail=clean(formData.get('contact_email'),254).toLowerCase();
    const displayName=clean(formData.get('display_name'),120);
    const city=clean(formData.get('city'),100);
    const bio=clean(formData.get('bio'),3000);
    const contactName=clean(formData.get('contact_name'),120);

    if(!displayName||!city||!bio||!contactName||!validEmail(contactEmail)||services.length===0){
      return NextResponse.json({ok:false,error:'Name, city, bio, contact information and at least one service are required.'},{status:400});
    }

    const supabase=getSupabaseServer();
    let profileImageUrl:string|null=null;
    const image=formData.get('profile_image');

    if(image instanceof File && image.size>0){
      if(!allowedImageTypes.has(image.type)){
        return NextResponse.json({ok:false,error:'Profile photo must be JPG, PNG or WebP.'},{status:400});
      }
      if(image.size>maxImageBytes){
        return NextResponse.json({ok:false,error:'Profile photo must be 5 MB or smaller.'},{status:400});
      }

      const ext=extensionFor(image.type);
      uploadedPath='profiles/'+crypto.randomUUID()+'.'+ext;
      const bytes=new Uint8Array(await image.arrayBuffer());

      const {error:uploadError}=await supabase.storage
        .from('provider-media')
        .upload(uploadedPath,bytes,{contentType:image.type,upsert:false});

      if(uploadError) throw uploadError;

      const {data:publicData}=supabase.storage.from('provider-media').getPublicUrl(uploadedPath);
      profileImageUrl=publicData.publicUrl;
    }

    const profile={
      display_name:displayName,
      professional_type,
      services,
      city,
      state:clean(formData.get('state'),50)||null,
      bio,
      years_experience:toInt(clean(formData.get('years_experience'),3)),
      starting_price:toInt(clean(formData.get('starting_price'),12)),
      profile_image_url:profileImageUrl,
      website_url:clean(formData.get('website_url'),500)||null,
      instagram_url:clean(formData.get('instagram_url'),500)||null,
      contact_name:contactName,
      contact_email:contactEmail,
      contact_phone:clean(formData.get('contact_phone'),50)||null,
      status:'pending',
    };

    const {error}=await supabase.from('provider_profiles').insert(profile);
    if(error) throw error;

    return NextResponse.redirect(new URL('/talent/join?submitted=1',req.url),303);
  }catch(error){
    console.error('CREATE PROVIDER PROFILE FAILED',error);

    if(uploadedPath){
      try{
        const supabase=getSupabaseServer();
        await supabase.storage.from('provider-media').remove([uploadedPath]);
      }catch(cleanupError){
        console.error('PROVIDER IMAGE CLEANUP FAILED',cleanupError);
      }
    }

    return NextResponse.json({ok:false,error:'We could not submit this profile. Please try again.'},{status:500});
  }
}
