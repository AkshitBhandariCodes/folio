import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '@/components/navigation';
export default function NotFound(){ return <><Navigation/><main className="container not-found"><span className="eyebrow">404 / A SMALL DETOUR</span><h1>This idea hasn’t<br/>been built yet<span className="blue-period">.</span></h1><p>Let’s get you back to something that has.</p><Link className="button button-primary" href="/"><ArrowLeft size={16}/> Back home</Link></main></>; }
