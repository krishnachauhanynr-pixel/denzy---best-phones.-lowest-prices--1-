import React, { useState } from 'react';
import { X, Globe, Link2, FileCode, CheckCircle2, Copy, ExternalLink, Code } from 'lucide-react';
import { SITEMAP_PAGES } from '../data/mockData';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPage?: (path: string) => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onNavigateToPage,
}) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'canonical' | 'schema'>('sitemap');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://denzystore.com';
  const canonicalUrl = `${currentOrigin}/`;

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-tight">
                SEO, Canonical Tag &amp; XML Sitemap
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Configured for search engines, indexing &amp; social share cards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 text-xs font-semibold mt-3">
          <button
            onClick={() => setActiveTab('sitemap')}
            className={`px-4 py-2.5 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'sitemap'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>XML Sitemap ({SITEMAP_PAGES.length} URLs)</span>
          </button>
          <button
            onClick={() => setActiveTab('canonical')}
            className={`px-4 py-2.5 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'canonical'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>Canonical &amp; Meta Tags</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2.5 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'schema'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Schema.org JSON-LD</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto py-4 text-xs">
          {activeTab === 'sitemap' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Valid XML sitemap is actively served at{' '}
                    <code className="bg-white/80 px-1 py-0.5 rounded font-mono font-bold">
                      /sitemap.xml
                    </code>
                  </span>
                </div>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white font-semibold text-emerald-800 shadow-2xs hover:bg-emerald-100 transition"
                >
                  <span>Raw XML</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Indexed URLs Table */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 text-[11px]">
                    <tr>
                      <th className="p-2.5">Route / Page</th>
                      <th className="p-2.5">Priority</th>
                      <th className="p-2.5">Frequency</th>
                      <th className="p-2.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-[11px]">
                    {SITEMAP_PAGES.map((page, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/60">
                        <td className="p-2.5 font-mono text-gray-800 font-medium">
                          <span className="text-gray-400 font-normal">{currentOrigin}</span>
                          {page.path}
                        </td>
                        <td className="p-2.5">
                          <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-bold">
                            {page.priority}
                          </span>
                        </td>
                        <td className="p-2.5 text-gray-500 capitalize">{page.changefreq}</td>
                        <td className="p-2.5 text-right">
                          <button
                            onClick={() => handleCopy(`${currentOrigin}${page.path}`)}
                            className="text-gray-400 hover:text-gray-700 p-1"
                            title="Copy full URL"
                          >
                            {copiedUrl === `${currentOrigin}${page.path}` ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'canonical' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700">Canonical Tag in &lt;head&gt;</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Active
                  </span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-gray-200 font-mono text-[11px] text-gray-800 break-all">
                  &lt;link rel="canonical" href="{canonicalUrl}" /&gt;
                </div>
                <p className="text-[11px] text-gray-500">
                  Prevents duplicate content issues and signals search engine bots that this URL is the primary source of truth.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <span className="font-bold text-gray-700">Page Meta Tags</span>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="p-2 bg-white rounded border border-gray-200">
                    <strong className="text-gray-500">Title:</strong> Denzy – Best Phones. Lowest Prices | Official Store
                  </div>
                  <div className="p-2 bg-white rounded border border-gray-200">
                    <strong className="text-gray-500">Description:</strong> Shop latest smartphones at Denzy with unbeatable prices. Instant UPI scan &amp; pay checkout and free delivery across India.
                  </div>
                  <div className="p-2 bg-white rounded border border-gray-200">
                    <strong className="text-gray-500">Robots.txt:</strong> /robots.txt (Allow: /, Sitemap: /sitemap.xml)
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-3">
              <p className="text-gray-600 text-[11px]">
                Valid Schema.org JSON-LD embedded for rich snippet results on Google Search:
              </p>
              <pre className="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Denzy",
      "url": "https://denzystore.com/",
      "description": "Best Phones. Lowest Prices."
    },
    {
      "@type": "WebSite",
      "name": "Denzy",
      "url": "https://denzystore.com/"
    },
    {
      "@type": "Product",
      "name": "iPhone 16 Pro",
      "brand": "Apple",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "144900",
        "availability": "https://schema.org/InStock"
      }
    }
  ]
}`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
