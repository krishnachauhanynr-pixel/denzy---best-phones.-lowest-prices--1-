import React from 'react';
import { Search, User, Heart, ShoppingCart, Tag, Headphones, Menu, FileText, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'checkout';
  onNavigate: (view: 'home' | 'checkout') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenSitemap: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenSitemap,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0f172a] text-white shadow-md">
      {/* 80% to 90% Flash Discount Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 text-[11px] font-black py-1 px-4 text-center tracking-wide flex items-center justify-center gap-2 shadow-xs">
        <span className="px-1.5 py-0.2 rounded bg-slate-950 text-amber-300 text-[9px] uppercase font-mono">
          FLASH SALE
        </span>
        <span>🔥 80% TO 90% OFF APPLIED ON ALL SMARTPHONES • INSTANT UPI SCAN &amp; PAY DISCOUNT ACTIVE!</span>
      </div>

      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div
          id="brand-logo-btn"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 p-[1.5px] shadow-sm">
            <div className="w-full h-full rounded-[7px] bg-[#0f172a] flex items-center justify-center text-amber-400 group-hover:bg-opacity-80 transition">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-400 fill-current">
                <path d="M13 2L3 14h8l-2 8 10-12h-8l2-8z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-white leading-none">
              Denzy
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-0.5">
              Best Phones. Lowest Prices.
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-2xl mx-2">
          <div className="relative">
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for mobiles, brands, accessories..."
              className="w-full py-2 pl-4 pr-10 text-sm text-gray-900 bg-white rounded-full outline-none focus:ring-2 focus:ring-amber-400 shadow-sm transition placeholder-gray-400"
            />
            <button
              id="search-btn"
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs text-gray-300 shrink-0">
          {/* Quick View Toggle for Test Review */}
          <div className="hidden lg:flex items-center bg-slate-800 rounded-full p-0.5 border border-slate-700 text-[11px]">
            <button
              id="nav-tab-store"
              onClick={() => onNavigate('home')}
              className={`px-3 py-1 rounded-full transition font-medium ${
                currentView === 'home'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Store
            </button>
            <button
              id="nav-tab-checkout"
              onClick={() => onNavigate('checkout')}
              className={`px-3 py-1 rounded-full transition font-medium flex items-center gap-1 ${
                currentView === 'checkout'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Payment Scanner
            </button>
          </div>

          {/* Account */}
          <button
            id="user-account-btn"
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            <User className="w-4 h-4 text-gray-300" />
            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className="text-[10px] text-gray-400">Account</span>
              <span className="font-semibold text-white">Sign In / Register</span>
            </div>
          </button>

          {/* Wishlist */}
          <button
            id="wishlist-btn"
            className="flex items-center gap-1 hover:text-white transition relative"
          >
            <div className="relative">
              <Heart className="w-4 h-4 text-gray-300" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-medium">Wishlist</span>
          </button>

          {/* Cart */}
          <button
            id="cart-checkout-btn"
            onClick={() => onNavigate('checkout')}
            className="flex items-center gap-1 hover:text-white transition relative bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-700"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="font-semibold text-white ml-1">Cart</span>
          </button>

          {/* SEO & Sitemap quick inspection badge */}
          <button
            id="seo-sitemap-btn"
            onClick={onOpenSitemap}
            title="View SEO, Canonical & Sitemap Specs"
            className="hidden md:flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 rounded-full hover:bg-emerald-900 transition"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>SEO & Sitemap</span>
          </button>
        </div>
      </div>

      {/* Sub-Header Horizontal Categories Ribbon (Screenshot 2 exact bar) */}
      <div className="bg-[#1e293b] border-t border-slate-700/60 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar py-2 gap-4">
          <div className="flex items-center space-x-6 shrink-0">
            <button
              id="cat-all"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1.5 font-bold text-white hover:text-amber-400 transition"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </button>
            <button
              id="cat-mobiles"
              onClick={() => onNavigate('home')}
              className="text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5"
            >
              Mobiles
            </button>
            <button
              id="cat-electronics"
              onClick={() => onNavigate('home')}
              className="text-gray-300 hover:text-white transition"
            >
              Electronics
            </button>
            <button
              id="cat-fashion"
              onClick={() => onNavigate('home')}
              className="text-gray-300 hover:text-white transition"
            >
              Fashion
            </button>
            <button
              id="cat-men"
              onClick={() => onNavigate('home')}
              className="text-gray-300 hover:text-white transition"
            >
              Men
            </button>
            <button
              id="cat-women"
              onClick={() => onNavigate('home')}
              className="text-gray-300 hover:text-white transition"
            >
              Women
            </button>
            <button
              id="cat-home-kitchen"
              onClick={() => onNavigate('home')}
              className="text-gray-300 hover:text-white transition"
            >
              Home & Kitchen
            </button>
            <button
              id="cat-beauty"
              onClick={() => onNavigate('home')}
              className="text-gray-300 hover:text-white transition"
            >
              Beauty
            </button>
          </div>

          <div className="flex items-center space-x-4 shrink-0 text-gray-300">
            <button
              id="nav-offers"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-1 hover:text-amber-400 transition"
            >
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>Offers</span>
            </button>
            <button
              id="nav-support"
              onClick={() => onNavigate('checkout')}
              className="flex items-center gap-1 hover:text-amber-400 transition"
            >
              <Headphones className="w-3.5 h-3.5 text-emerald-400" />
              <span>Support</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
