// Shared protocol; keep identical in the domain and marketplace repositories.
export const passportSiteOrigin='https://prep-your-shift.ggg398.chatgpt.site';
export const passportMainOrigin='https://www.takeachefhome.com';
export const passportSitePath='/api/passports/bridge';
export const passportMainPath='/api/talent/marketplace/profile';
export const passportBridgeVersion='passport-bridge-v1';
export class PassportBridgeError extends Error{constructor(message:string,public status=400){super(message);}}
const utf8=(s:string)=>new TextEncoder().encode(s);
const hex=(b:Uint8Array)=>Array.from(b,n=>n.toString(16).padStart(2,'0')).join('');
const unhex=(s:string)=>Uint8Array.from(s.match(/../g)||[],n=>parseInt(n,16));
export const passportDigest=async(s:string)=>hex(new Uint8Array(await crypto.subtle.digest('SHA-256',utf8(s))));
export const passportNonce=()=>crypto.randomUUID().replace(/-/g,'')+crypto.randomUUID().replace(/-/g,'');
export const validPassportNonce=(s:unknown):s is string=>typeof s==='string'&&/^[a-f0-9]{64}$/.test(s);
async function key(secret:unknown){if(typeof secret!=='string'||!/^[a-f0-9]{64}$/i.test(secret))throw new PassportBridgeError('Passport connection is temporarily unavailable.',503);return crypto.subtle.importKey('raw',utf8(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);}
async function signatureInput(path:string,raw:string,time:string,nonce:string){return utf8('POST\n'+path+'\n'+time+'\n'+nonce+'\n'+await passportDigest(raw));}
export async function passportHeaders(path:string,raw:string,secret:unknown){
 const time=String(Date.now()),nonce=crypto.randomUUID().replace(/-/g,''),signature=hex(new Uint8Array(await crypto.subtle.sign('HMAC',await key(secret),await signatureInput(path,raw,time,nonce))));
 return {'Content-Type':'application/json','x-tach-time':time,'x-tach-nonce':nonce,'x-tach-signature':signature};
}
export async function verifyPassportRequest(req:Request,raw:string,secret:unknown){
 const time=req.headers.get('x-tach-time')||'',nonce=req.headers.get('x-tach-nonce')||'',signature=req.headers.get('x-tach-signature')||'';
 if(!/^\d{13}$/.test(time)||Math.abs(Date.now()-Number(time))>120000||!/^[a-f0-9]{32}$/.test(nonce)||!/^[a-f0-9]{64}$/.test(signature))throw new PassportBridgeError('Invalid connection proof.',401);
 const valid=await crypto.subtle.verify('HMAC',await key(secret),unhex(signature),await signatureInput(new URL(req.url).pathname,raw,time,nonce));
 if(!valid)throw new PassportBridgeError('Invalid connection proof.',401);
}
export async function passportBody(req:Request,limit=8000){
 if(Number(req.headers.get('content-length'))>limit)throw new PassportBridgeError('Request too large.',413);
 if(!req.body)throw new PassportBridgeError('Request required.');const reader=req.body.getReader(),parts:Uint8Array[]=[];let size=0;
 try{for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>limit){await reader.cancel();throw new PassportBridgeError('Request too large.',413);}parts.push(value);}}finally{reader.releaseLock();}
 const all=new Uint8Array(size);let offset=0;for(const part of parts){all.set(part,offset);offset+=part.byteLength;}return new TextDecoder('utf-8',{fatal:true}).decode(all);
}
export async function callPassportBridge(target:'site'|'main',data:unknown,secret:unknown,request:typeof fetch=fetch){
 const path=target==='site'?passportSitePath:passportMainPath,origin=target==='site'?passportSiteOrigin:passportMainOrigin,raw=JSON.stringify(data);
 try{const response=await request(origin+path,{method:'POST',headers:await passportHeaders(path,raw,secret),body:raw,cache:'no-store',redirect:'error',signal:AbortSignal.timeout(8000)});const body:any=await response.json();if(!response.ok||body?.ok!==true)throw new PassportBridgeError('The other account could not complete this step. Please try again.',response.status===409?409:503);return body;}
 catch(e){if(e instanceof PassportBridgeError)throw e;throw new PassportBridgeError('Passport connection is temporarily unavailable. Please try again.',503);}
}
export type PassportSummary={profileId:string;talentId:string;name:string;role:string;city:string;state:string;completion:number};
export function passportSummary(data:any):PassportSummary{
 if(!data||typeof data.profileId!=='string'||!/^[a-f0-9-]{36}$/i.test(data.profileId))throw new PassportBridgeError('This Passport could not be verified.');
 const text=(v:unknown,max:number)=>typeof v==='string'?v.trim().slice(0,max):'';
 return {profileId:data.profileId,talentId:text(data.talentId,100),name:text(data.name,160),role:text(data.role,160),city:text(data.city,100),state:text(data.state,2),completion:typeof data.completion==='number'&&Number.isFinite(data.completion)?Math.max(0,Math.min(100,Math.round(data.completion))):0};
}

