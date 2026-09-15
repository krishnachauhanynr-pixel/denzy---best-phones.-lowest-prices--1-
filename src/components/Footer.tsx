import React, { useState } from 'react';
import { Send, Instagram, Youtube, Twitter, Facebook, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onOpenSitemap: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onOpenSitemap,
  onSelectCategory,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#0b0f19] text-gray-400 text-xs border-t border-slate-800/80">
      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            <div>
              <div
                onClick={onNavigateHome}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 p-[1.5px]">
                  <div className="w-full h-full rounded-[7px] bg-[#0b0f19] flex items-center justify-center text-amber-400">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400 fill-current">
                      <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" />
                    </svg>
                  </div>
                </div>
                <span className="text-xl font-black text-white tracking-tight">
                  Denzy
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-2 font-medium">
                Better Phones. Bigger Dreams.
              </p>
            </div>

            {/* Social Icons (Exact match to screenshot) */}
            <div className="flex items-center space-x-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-gray-300 hover:text-white transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-gray-300 hover:text-white transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-gray-300 hover:text-white transition"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-gray-300 hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={onNavigateHome} className="hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">About Us</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">Contact Us</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">FAQs</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">Track Order</span>
              </li>
              <li>
                <button
                  onClick={onOpenSitemap}
                  className="text-amber-400 hover:text-amber-300 transition font-medium flex items-center gap-1"
                >
                  <span>Sitemap &amp; SEO</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-[11px]">
              {['Mobiles', 'Electronics', 'Fashion', 'Men', 'Women', 'Home & Kitchen', 'Beauty'].map((c) => (
                <li key={c}>
                  <button
                    onClick={() => onSelectCategory(c.toLowerCase())}
                    className="hover:text-white transition"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Customer Care
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <span className="hover:text-white cursor-pointer transition">Help Center</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">Shipping Policy</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">Return Policy</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">Terms &amp; Conditions</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe Column (Screenshot exact) */}
          <div className="lg:col-span-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Subscribe to Our Newsletter
            </h4>
            <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
              Get the latest deals, offers and updates straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full py-2.5 pl-3.5 pr-10 text-xs text-white bg-slate-800/90 rounded-lg border border-slate-700 outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 placeholder-gray-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-amber-400 transition"
              >
                {subscribed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
            {subscribed && (
              <span className="text-[10px] text-emerald-400 block mt-1.5">
                ✓ Thank you for subscribing!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar (Screenshot exact) */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500">
          <span>© 2025 Denzy. All rights reserved.</span>

          <div className="flex items-center gap-4">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition"
            >
              sitemap.xml
            </a>
            <span className="text-gray-700">•</span>
            <button
              onClick={onNavigateHome}
              className="hover:text-gray-300 flex items-center gap-1 transition"
            >
              <span>Your Next Phone is Here</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
