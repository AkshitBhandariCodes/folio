import { NextResponse } from 'next/server';
export async function GET(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL;const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!url||!key)return NextResponse.json({messages:[],available:false},{status:503});
 try{const response=await fetch(`${url}/rest/v1/guestbook_messages?select=id,name,message,avatar_url,created_at&status=eq.approved&order=created_at.desc&limit=12`,{headers:{apikey:key,Authorization:`Bearer ${key}`},signal:AbortSignal.timeout(8000),cache:'no-store'});if(!response.ok)throw new Error('Guestbook unavailable');return NextResponse.json({messages:await response.json(),available:true});}catch{return NextResponse.json({messages:[],available:false},{status:503})}
}
