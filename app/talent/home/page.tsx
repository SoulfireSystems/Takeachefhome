'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Profile = {
  talent_id:string;first_name:string;last_name:string;professional_name:string|null;email:string;phone:string;
  primary_role:string;city:string;state:string;zip:string;travel_radius:string;overnight_travel:string;
  bio:string|null;application_status:string;verification_status:string;profile_completion:number;
  skills:string[];availability:string[];opportunity_types:string[];available_now:boolean;
  preferred_contact:string;resume_url:string|null;headshot_url:string|null;portfolio_urls:string[];
};
const inputClass='mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-[#101D31] focus:border-[#2467D5] focus:outline-none';
const options=['Weekday mornings','Weekday afternoons','Weekday evenings','Friday','Saturday','Sunday','Overnight','On-call / Last-minute','Flexible'];

export default function TalentHome(){
  const [profile,setProfile]=useState<Profile|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [saving,setSaving]=useState(false);
  const [editing,setEditing]=useState(false);
  const [notice,setNotice]=useState('');
  const [draft,setDraft]=useState({phone:'',preferred_contact:'Text',city:'',state:'',zip:'',travel_radius:'',bio:'',available_now:false,availability:[] as string[]});

  useEffect(()=>{fetch('/api/talent/me',{cache:'no-store'}).then(async r=>{if(!r.ok)throw Error(r.status===401?'Your private session is not available on this device.':'Unable to load your Talent Passport.');return r.json()}).then(j=>{const p=j.profile as Profile;setProfile(p);setDraft({phone:p.phone||'',preferred_contact:p.preferred_contact||'Text',city:p.city||'',state:p.state||'',zip:p.zip||'',travel_radius:p.travel_radius||'',bio:p.bio||'',available_now:!!p.available_now,availability:p.availability||[]})}).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[]);

  const save=async()=>{setSaving(true);setNotice('');try{const r=await fetch('/api/talent/me',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(draft)});const j=await r.json();if(!r.ok)throw Error(j.error||'Unable to save');setProfile(j.profile);setEditing(false);setNotice('Your Talent Passport has been updated.')}catch(e){setNotice(e instanceof Error?e.message:'Unable to save changes.')}finally{setSaving(false)}};
  const signOut=async()=>{await fetch('/api/talent/me',{method:'DELETE'});window.location.assign('/talent')};

  return <main className="min-h-screen bg-[#F5F7FB] text-[#101D31]">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5"><Link href="/talent" className="text-lg font-black text-[#112C4E]">TakeAChefHome<span className="text-[#2467D5]"> / Talent</span></Link><span className="text-xs font-black uppercase tracking-[.16em] text-slate-500">My Talent Home</span></div></header>
    {loading?<section className="mx-auto max-w-6xl px-5 py-20"><p>Opening your private Talent Passport…</p></section>:error?<section className="mx-auto max-w-2xl px-5 py-20"><h1 className="text-3xl font-black">Your Talent Home</h1><p className="mt-4 text-slate-600">{error}</p><p className="mt-4 text-sm leading-7 text-slate-600">For now, private access remains active on the device used to register. Secure access from a different device and email-based recovery are still being developed. Please do not create a duplicate Passport to sign in.</p><Link href="/talent" className="mt-6 inline-flex rounded-full bg-[#2467D5] px-6 py-3 text-sm font-black text-white">BACK TO TALENT</Link></section>:profile&&<>
    <section className="bg-[#101D31] text-white"><div className="mx-auto max-w-6xl px-5 py-14"><p className="text-xs font-black uppercase tracking-[.2em] text-[#A5C6FF]">My Talent Home</p><h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Welcome back, {profile.first_name}.</h1><p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">Your Talent Passport lives here. Keep your availability and contact details current so we know how to reach you when an opportunity fits.</p></div></section>
    <section className="mx-auto max-w-6xl px-5 py-10">
      {notice&&<p role="status" className="mb-5 rounded-2xl border border-[#BFD7FF] bg-[#EAF2FF] px-5 py-4 text-sm font-semibold">{notice}</p>}
      <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#2467D5]">My Talent Passport</p><h2 className="mt-3 text-3xl font-black">{profile.professional_name||profile.first_name+' '+profile.last_name}</h2><p className="mt-2 text-slate-600">{profile.primary_role} · {profile.city}, {profile.state}</p></div><button type="button" onClick={()=>{setEditing(!editing);setNotice('')}} className="rounded-full bg-[#2467D5] px-6 py-3 text-sm font-black text-white">{editing?'CANCEL EDIT':'EDIT PASSPORT'}</button></div>
          <div className="mt-7 grid gap-4 rounded-2xl bg-[#F3F7FF] p-5 sm:grid-cols-2"><div><p className="text-xs font-black uppercase tracking-wide text-slate-500">Talent ID</p><p className="mt-2 font-mono text-lg font-black">{profile.talent_id}</p></div><div><p className="text-xs font-black uppercase tracking-wide text-slate-500">Profile details</p><p className="mt-2 text-lg font-black">{profile.profile_completion}% complete</p></div><div><p className="text-xs font-black uppercase tracking-wide text-slate-500">Application</p><p className="mt-2 font-bold">{profile.application_status.replaceAll('_',' ')}</p></div><div><p className="text-xs font-black uppercase tracking-wide text-slate-500">Credentials</p><p className="mt-2 font-bold">{profile.verification_status.replaceAll('_',' ')}</p></div></div>
          {editing?<div className="mt-7 grid gap-5 sm:grid-cols-2">
            {([['Phone','phone'],['City','city'],['State abbreviation','state'],['ZIP','zip'],['Travel range','travel_radius']] as const).map(([label,key])=><label key={key} className="text-sm font-bold">{label}<input className={inputClass} value={draft[key]} onChange={e=>setDraft(p=>({...p,[key]:e.target.value}))}/></label>)}
            <label className="text-sm font-bold">Contact preference<select className={inputClass} value={draft.preferred_contact} onChange={e=>setDraft(p=>({...p,preferred_contact:e.target.value}))}><option>Text</option><option>Email</option><option>Phone</option></select></label>
            <label className="sm:col-span-2 text-sm font-bold">About your work<textarea className={inputClass} rows={4} value={draft.bio} onChange={e=>setDraft(p=>({...p,bio:e.target.value}))}/></label>
            <div className="sm:col-span-2"><p className="text-sm font-black">Availability</p><div className="mt-3 flex flex-wrap gap-2">{options.map(x=><button key={x} type="button" onClick={()=>setDraft(p=>({...p,availability:p.availability.includes(x)?p.availability.filter(y=>y!==x):[...p.availability,x]}))} className={`rounded-full border px-4 py-2 text-xs font-bold ${draft.availability.includes(x)?'border-[#2467D5] bg-[#2467D5] text-white':'border-slate-200 bg-white'}`}>{x}</button>)}</div></div>
            <label className="sm:col-span-2 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold"><input type="checkbox" checked={draft.available_now} onChange={e=>setDraft(p=>({...p,available_now:e.target.checked}))}/>I'm available for new opportunities</label>
            <div className="sm:col-span-2"><button type="button" onClick={save} disabled={saving} className="rounded-full bg-[#2467D5] px-7 py-4 text-sm font-black text-white disabled:opacity-60">{saving?'SAVING…':'SAVE PASSPORT CHANGES'}</button></div>
          </div>:<div className="mt-7 space-y-5"><div><h3 className="font-black">About my work</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">{profile.bio||'Your introduction will appear here.'}</p></div><div><h3 className="font-black">Skills</h3><p className="mt-2 text-sm leading-7 text-slate-600">{profile.skills?.length?profile.skills.join(' · '):'No extra specialties listed yet.'}</p></div><div><h3 className="font-black">My availability</h3><p className="mt-2 text-sm leading-7 text-slate-600">{profile.available_now?'Open to new opportunities':'Not marked available now'} · {profile.availability?.join(' · ')||'No days selected'}</p></div><div><h3 className="font-black">How to reach me</h3><p className="mt-2 text-sm leading-7 text-slate-600">{profile.email} · {profile.phone} · Prefer {profile.preferred_contact}</p></div></div>}
        </article>
        <aside className="space-y-5">
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><p className="text-xs font-black uppercase tracking-[.16em] text-[#2467D5]">Opportunity updates</p><h2 className="mt-4 text-2xl font-black">Your network is growing.</h2><p className="mt-4 text-sm leading-7 text-slate-600">There are no confirmed matches attached to your Passport right now. If your experience and availability fit an opportunity, our team may contact you. We won't show fake listings or pretend a booking exists.</p></section>
          <section className="rounded-3xl bg-[#101D31] p-7 text-white"><p className="text-xs font-black uppercase tracking-[.16em] text-[#A5C6FF]">What now?</p><h2 className="mt-4 text-2xl font-black">Keep your Passport ready.</h2><p className="mt-3 text-sm leading-7 text-slate-200">Review your details, update availability when it changes, and keep your Talent ID. Registration is not a guarantee of employment or assignments.</p></section>
          <button type="button" onClick={signOut} className="rounded-full border border-slate-300 px-6 py-3 text-sm font-black text-slate-600">SIGN OUT OF THIS DEVICE</button>
        </aside>
      </div>
    </section>
    </>}
  </main>;
}
