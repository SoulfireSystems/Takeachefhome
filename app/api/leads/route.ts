import { NextResponse } from 'next/server';
const intakeUrl = 'https://prep-your-shift.ggg398.chatgpt.site/start';
export function POST() {
  return NextResponse.json({ok:false,error:'This form endpoint has been retired. Open the request builder to save and send your request.',intakeUrl},{status:410});
}
export function GET() {
  return NextResponse.json({ok:true,acceptsSubmissions:false,intakeUrl});
}
