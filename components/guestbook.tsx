'use client';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { ArrowUpRight, Check, Github, Loader2, LogOut, MessageSquareText, PenLine, Send, Trash2 } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { SidelineSticker, PageSideline } from './page-sideline';
type Entry={id:string;name:string;message:string;avatar_url:string|null;created_at:string;status?:string};
export function Guestbook(){const [messages,setMessages]=useState<Entry[]>([]);const [pending,setPending]=useState<Entry[]>([]);const [user,setUser]=useState<User|null>(null);const [admin,setAdmin]=useState(false);const [loading,setLoading]=useState(true);const [draft,setDraft]=useState('');const [notice,setNotice]=useState('');const [busy,setBusy]=useState(false);const [available,setAvailable]=useState(true);
 async function refresh(){try{const r=await fetch('/api/guestbook');const data=await r.json();setMessages(data.messages||[]);setAvailable(data.available)}catch{setAvailable(false)}finally{setLoading(false)}}
 useEffect(()=>{let live=true;const db=getSupabase();refresh();if(!db)return;async function update(next:User|null){if(!live)return;setUser(next);if(next){const {data}=await db!.rpc('current_user_is_admin');if(!live)return;setAdmin(data===true);if(data===true){const {data:rows}=await db!.from('guestbook_messages').select('id,name,message,avatar_url,created_at,status').eq('status','pending').order('created_at',{ascending:false});if(live)setPending(rows||[])}}else {setAdmin(false);setPending([])}}db.auth.getSession().then(({data})=>update(data.session?.user||null));const {data}=db.auth.onAuthStateChange((_event,session)=>{setTimeout(()=>update(session?.user||null),0)});return()=>{live=false;data.subscription.unsubscribe()}},[]);
 async function signIn(provider:'github'|'google'){const db=getSupabase();if(!db)return;setBusy(true);setNotice('');const {error}=await db.auth.signInWithOAuth({provider,options:{redirectTo:window.location.origin+'/#guestbook'}});if(error){setNotice('Sign-in could not start. Please try again.');setBusy(false)}}
 async function submit(e:React.FormEvent){e.preventDefault();const db=getSupabase();if(!db||!user||busy)return;const message=draft.trim();if(!message||message.length>600)return;setBusy(true);setNotice('');try{const {error}=await db.from('guestbook_messages').insert({user_id:user.id,name:user.user_metadata.full_name||user.user_metadata.name||user.user_metadata.user_name||'A fellow builder',email:(user.email||'').toLowerCase(),avatar_url:user.user_metadata.avatar_url||null,message,status:admin?'approved':'pending',approved_at:admin?new Date().toISOString():null});if(error)throw error;setDraft('');setNotice(admin?'Your note is live. Thanks for stopping by!':'Your note is saved and waiting for approval. Thank you!');await refresh()}catch{setNotice('Your note could not be saved. Please try again.')}finally{setBusy(false)}}
 async function moderate(id:string,action:'approve'|'delete'){const db=getSupabase();if(!db||busy)return;setBusy(true);const {error}=action==='approve'?await db.from('guestbook_messages').update({status:'approved',approved_at:new Date().toISOString()}).eq('id',id):await db.from('guestbook_messages').delete().eq('id',id);if(error)setNotice('That action did not go through. Please retry.');else{setPending(items=>items.filter(x=>x.id!==id));await refresh()}setBusy(false)}
  return (
    <section id="guestbook" className="page-divider guestbook-section" aria-labelledby="guestbook-title">
      <PageSideline side="right" note={{ href: '#guestbook', text: 'what’s my vibe?' }}>
        <SidelineSticker />
      </PageSideline>
      <header className="guestbook-heading" data-scroll-reveal>
        <div className="guestbook-stamp" aria-hidden="true"><MessageSquareText size={24} /></div>
        <div className="guestbook-title">
          <span className="eyebrow">06 / GUESTBOOK</span>
          <h2 id="guestbook-title">Leave a little trace.</h2>
          <p>Tell me what this site says about me. Wrong answers welcome.</p>
        </div>
      </header>

      {loading ? (
        <p className="guestbook-loading" role="status"><Loader2 size={15} className="spin" /> Opening the guestbook…</p>
      ) : !available ? (
        <p className="guestbook-empty">The guestbook is resting for a moment. Come back soon.</p>
      ) : (
        <div className="guestbook-spread">
          <div className="guestbook-ledger">
            <div className="guestbook-legend">
              <h3>Visitor notes</h3>
              <span>{String(messages.length).padStart(2, '0')} {messages.length === 1 ? 'ENTRY' : 'ENTRIES'}</span>
            </div>
            {messages.length ? (
              <ul className="guestbook-notes">
                {messages.slice(0, 6).map(entry => (
                  <li key={entry.id} className="guest-note">
                    <span className="guest-avatar" aria-hidden="true">
                      {entry.avatar_url ? <img src={entry.avatar_url} alt="" referrerPolicy="no-referrer" /> : entry.name.charAt(0)}
                    </span>
                    <div className="guest-note-copy">
                      <div className="guest-note-byline">
                        <strong>{entry.name}</strong>
                        <time dateTime={entry.created_at}>{new Date(entry.created_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</time>
                      </div>
                      <p>{entry.message}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : <p className="guestbook-empty">Fresh page. Be the first to leave a note.</p>}
          </div>
          <div className="guestbook-composer">
            <PenLine size={18} className="guestbook-pen" aria-hidden="true" />
            <h3>Sign the guestbook</h3>
            {user ? (
              <form onSubmit={submit} className="guestbook-form">
                <div className="signed-in">
                  <span>Writing as <strong>{user.user_metadata.full_name || user.user_metadata.user_name || 'you'}</strong></span>
                  <button type="button" onClick={() => getSupabase()?.auth.signOut()}><LogOut size={12} /> Sign out</button>
                </div>
                <label className="sr-only" htmlFor="guest-note">Your guestbook message</label>
                <textarea id="guest-note" value={draft} onChange={event => setDraft(event.target.value)} maxLength={600} rows={4} placeholder="Leave a note…" required />
                <div className="guestbook-form-bottom">
                  <span>{draft.length}/600</span>
                  <button type="submit" className="guestbook-primary" disabled={busy || !draft.trim()}>{busy ? <Loader2 size={13} className="spin" /> : <Send size={13} />} Leave a note</button>
                </div>
                <small>Notes are reviewed before appearing.</small>
              </form>
            ) : (
              <>
                <p>Pick a sign-in method to leave your note.</p>
                <div className="guestbook-signin">
                  <button type="button" className="guestbook-primary" onClick={() => signIn('github')} disabled={busy}><Github size={14} /> Continue with GitHub <ArrowUpRight size={13} /></button>
                  <button type="button" onClick={() => signIn('google')} disabled={busy}><img className="google-auth-icon" src="/tech/google-signin.png" width={20} height={20} alt="" /> Continue with Google <ArrowUpRight size={13} /></button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {notice && <p className="guestbook-notice" role="status">{notice}</p>}
      {admin && pending.length > 0 && (
        <div className="guestbook-moderation">
          <h3>Waiting for your approval · {pending.length}</h3>
          {pending.map(entry => (
            <div key={entry.id}>
              <strong>{entry.name}</strong>
              <p>{entry.message}</p>
              <button type="button" onClick={() => moderate(entry.id, 'approve')} disabled={busy}><Check size={12} /> Approve</button>
              <button type="button" onClick={() => moderate(entry.id, 'delete')} disabled={busy}><Trash2 size={12} /> Delete</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
