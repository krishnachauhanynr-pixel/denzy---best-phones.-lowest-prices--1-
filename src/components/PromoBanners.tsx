import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PromoBannersProps {
  onShopSamsung: () => void;
  onShopRealme: () => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({
  onShopSamsung,
  onShopRealme,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-4">
      {/* Banner 1: Samsung Galaxy S24 Series (Exact style from screenshot 1) */}
      <div
        id="promo-banner-samsung"
        className="relative rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-6 flex items-center justify-between overflow-hidden border border-slate-800 shadow-sm group"
      >
        <div className="relative z-10 max-w-[200px] sm:max-w-[240px]">
          <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase block">
            SAMSUNG
          </span>
          <h3 className="text-lg sm:text-xl font-black text-white mt-1 leading-tight">
            Galaxy S24 Series
          </h3>
          <p className="text-xs text-amber-400 mt-1 font-bold">
            Now 85% OFF • From ₹11,249!
          </p>
          <button
            onClick={onShopSamsung}
            className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-slate-950 text-xs font-bold hover:bg-gray-100 transition group-hover:gap-2"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-36 sm:w-44 h-28 relative shrink-0">
          <img
            src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80"
            alt="Samsung Galaxy S24 Series"
            className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Banner 2: realme 13 Pro+ (Exact style from screenshot 1) */}
      <div
        id="promo-banner-realme"
        className="relative rounded-2xl bg-gradient-to-r from-purple-50 via-amber-50 to-orange-50 border border-amber-200/60 p-6 flex items-center justify-between overflow-hidden shadow-sm group"
      >
        <div className="relative z-10 max-w-[200px] sm:max-w-[240px]">
          <span className="text-[11px] font-bold text-amber-800 tracking-wider uppercase block">
            realme
          </span>
          <h3 className="text-lg sm:text-xl font-black text-gray-900 mt-1 leading-tight">
            realme 13 Pro+
          </h3>
          <p className="text-xs text-emerald-700 mt-1 font-bold">
            Ultra Clear Camera • 85% Flash Discount
          </p>
          <div className="mt-1 text-xs font-black text-gray-900">
            From ₹6,449 <span className="line-through text-gray-400 font-normal ml-1">₹42,999</span>
          </div>
          <button
            onClick={onShopRealme}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition group-hover:gap-2"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="w-36 sm:w-44 h-28 relative shrink-0">
          <img
            src="https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=400&q=80"
            alt="realme 13 Pro+"
            className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};
