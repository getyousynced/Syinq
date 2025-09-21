"use client";
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, Search, ArrowUp, Printer, Link as LinkIcon } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export interface LegalSection { id: string; title: string; content: React.ReactNode; }
interface LegalLayoutProps { docTitle: string; subtitle: string; lastUpdated: string; sections: LegalSection[]; crossLink?: { href: string; label: string; prefix?: string }; }

function nodeToString(node: React.ReactNode): string { if (node == null || typeof node === 'boolean') return ''; if (typeof node === 'string' || typeof node === 'number') return String(node); if (Array.isArray(node)) return node.map(nodeToString).join(' '); if (React.isValidElement(node)) return nodeToString(node.props.children); return ''; }

const LegalLayout: React.FC<LegalLayoutProps> = ({ docTitle, subtitle, lastUpdated, sections, crossLink }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const headingsRef = useRef<Record<string, HTMLElement | null>>({});
  const searchable = useMemo(() => sections.map(s => ({ id: s.id, haystack: (s.title + ' ' + nodeToString(s.content)).toLowerCase() })), [sections]);
  const filteredIds = useMemo(() => { if (!query.trim()) return new Set(sections.map(s => s.id)); const q = query.toLowerCase(); return new Set(searchable.filter(s => s.haystack.includes(q)).map(s => s.id)); }, [query, searchable, sections]);
  // Stable scrollspy (avoids IntersectionObserver jitter for sequential small sections)
  useEffect(() => {
    const HEADER_OFFSET = 100; // navbar + spacing
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPos = window.scrollY + HEADER_OFFSET;
        let current: string | null = null;
        for (const s of sections) {
          const el = document.getElementById(s.id);
            if (!el) continue;
            if (el.offsetTop <= scrollPos) current = s.id; else break; // sections are in order
        }
        // Fallback to first section if above all
        if (!current && sections.length) current = sections[0].id;
        if (current !== activeId) setActiveId(current);
        ticking = false;
      });
    };

    handleScroll(); // initial
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', handleScroll); };
  }, [sections, activeId]);
  const scrollTo = useCallback((id: string) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' }); }, []);
  const [showTop, setShowTop] = useState(false); useEffect(() => { const onScroll = () => setShowTop(window.scrollY > 500); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="pt-24 flex-grow">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex gap-3">
              <Button asChild variant="outline" className="flex items-center gap-2"><Link href="/"><Home className="h-4 w-4" /><span>Home</span></Link></Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => window.print()}><Printer className="h-4 w-4" /><span className="hidden sm:inline">Print / Save PDF</span></Button>
            </div>
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-syinq-gray" />
              <input type="text" placeholder="Search sections..." value={query} onChange={e => setQuery(e.target.value)} className="w-full rounded-md border border-gray-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-syinq-blue/40 focus:border-syinq-blue" />
            </div>
          </div>
          <header className="mb-10 md:mb-14 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{docTitle}</h1>
            <p className="text-syinq-gray max-w-2xl mx-auto">{subtitle}</p>
            <p className="text-xs text-syinq-gray mt-4">Last Updated: {lastUpdated}</p>
          </header>
          <div className="grid md:grid-cols-4 gap-10">
            <aside className="md:col-span-1 hidden md:block self-start sticky top-28">
              <nav className="space-y-2 text-sm" aria-label="Section navigation">
                {sections.filter(s => filteredIds.has(s.id)).map(section => (
                  <button key={section.id} onClick={() => scrollTo(section.id)} className={cn('block w-full text-left px-3 py-2 rounded-md transition-colors', activeId === section.id ? 'bg-syinq-blue text-white shadow-sm' : 'text-syinq-gray hover:bg-syinq-blue/10 hover:text-syinq-blue')}>{section.title}</button>
                ))}
                {sections.filter(s => filteredIds.has(s.id)).length === 0 && <p className="text-xs text-syinq-gray/70">No matches</p>}
              </nav>
            </aside>
            <main className="md:col-span-3">
              <div className="md:hidden mb-6">
                <Accordion type="single" collapsible className="w-full border rounded-lg divide-y">
                  {sections.filter(s => filteredIds.has(s.id)).map(section => (
                    <AccordionItem key={section.id} value={section.id}>
                      <AccordionTrigger className="px-4">{section.title}</AccordionTrigger>
                      <AccordionContent className="px-4"><div className="space-y-4 text-sm leading-relaxed">{section.content}</div></AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <div className="hidden md:block">
                {sections.filter(s => filteredIds.has(s.id)).map(section => (
                  <section key={section.id} id={section.id} ref={el => { headingsRef.current[section.id] = el; }} className="group scroll-mt-32 mb-12 relative">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <button onClick={() => { if (typeof window !== 'undefined') { const url = new URL(window.location.href); url.hash = section.id; navigator.clipboard.writeText(url.toString()).catch(() => {}); } scrollTo(section.id); }} aria-label={`Copy link to ${section.title}`} className="opacity-0 group-hover:opacity-100 transition-opacity text-syinq-blue hover:text-syinq-blue/80"><LinkIcon className="h-4 w-4" /></button>
                      <span>{section.title}</span>
                    </h2>
                    <div className="space-y-4 text-syinq-dark/80 leading-relaxed text-sm">{section.content}</div>
                  </section>
                ))}
                {sections.filter(s => filteredIds.has(s.id)).length === 0 && <p className="text-sm text-syinq-gray">No sections match your search.</p>}
              </div>
              {crossLink && (
                <div className="mt-16 p-5 rounded-xl bg-syinq-blue/5 border border-syinq-blue/20 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-syinq-gray">{crossLink.prefix || 'Looking for the other document?'} <Link href={crossLink.href} className="text-syinq-blue underline font-medium">{crossLink.label}</Link>.</p>
                  <Button asChild size="sm" className="bg-syinq-blue hover:bg-syinq-blue/90"><Link href={crossLink.href}>{crossLink.label}</Link></Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={cn('fixed bottom-6 right-6 z-40 p-3 rounded-full bg-syinq-blue text-white shadow-lg transition-all', showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none')} aria-label="Back to top"><ArrowUp className="h-4 w-4" /></button>
    </div>
  );
};
export default LegalLayout;
