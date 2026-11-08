export function Emphasis({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return text;
  const escaped = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text.split(pattern).map((part, index) =>
    index % 2 ? <strong key={index}>{part}</strong> : part,
  );
}
