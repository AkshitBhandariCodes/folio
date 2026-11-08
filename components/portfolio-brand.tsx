import Link from 'next/link';

export function PortfolioBrand({ home = false }: { home?: boolean }) {
  const mark = (
    <>
      <img className="toolbar-avatar" src="/icon.png" width={28} height={28} alt="" />
      <span>@akshitbhandaricodes</span>
    </>
  );

  return home
    ? <a href="#top" className="toolbar-home">{mark}</a>
    : <Link href="/" className="toolbar-home">{mark}</Link>;
}
