import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Crown, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onShopNow: () => void;
}

const SLIDES = [
  {
    tag: '80%–90% FLASH SALE',
    title: 'iPhone 16 Pro',
    subtitle: 'Powerful. Elegant. Now with 85% Flash Discount.',
    priceFrom: '₹22,485',
    originalPrice: '₹1,49,900',
    savings: '85% OFF • Save ₹1,27,415',
    highlightBadge: 'Premium Phones 80%–90% OFF',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
  },
  {
    tag: '80%–90% MEGA SALE',
    title: 'Samsung Galaxy S24 Ultra',
    subtitle: 'Galaxy AI is here. Epic savings up to 90% off.',
    priceFrom: '₹19,499',
    originalPrice: '₹1,29,999',
    savings: '85% OFF • Save ₹1,10,500',
    highlightBadge: 'Official Brand Warranty',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
  },
  {
    tag: '80%–90% SUPER DEAL',
    title: 'OnePlus 12 5G',
    subtitle: 'Smooth Beyond Belief. 100W SuperVOOC with 85% off.',
    priceFrom: '₹10,499',
    originalPrice: '₹69,999',
    savings: '85% OFF • Save ₹59,500',
    highlightBadge: 'Fastest Charging Smartphone',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1000&q=80',
  }
];

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = SLIDES[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      id="hero-banner"
      className="relative rounded-2xl bg-gradient-to-r from-[#0b0f19] via-[#111827] to-[#1e293b] text-white overflow-hidden shadow-lg border border-slate-800"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-10 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Copy & Pricing */}
        <div className="md:col-span-7 flex flex-col justify-center">
          {/* Eyebrow / Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider bg-white/10 text-gray-200 border border-white/15 w-fit uppercase">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{slide.tag}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-3 leading-none">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-300 font-medium mt-2 leading-relaxed">
            {slide.subtitle}
          </p>

          {/* Price Block (Exact match to screenshot 1) */}
          <div className="flex flex-wrap items-baseline gap-2.5 mt-5">
            <span className="text-xs text-gray-400 font-medium">From</span>
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {slide.priceFrom}
            </span>
            <span className="text-sm text-gray-400 line-through">
              {slide.originalPrice}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              {slide.savings}
            </span>
          </div>

          {/* CTA Button */}
          <div className="mt-6 flex items-center gap-4">
            <button
              id="hero-shop-now-btn"
              onClick={onShopNow}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200 group"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Phone Art & Floating Elements */}
        <div className="md:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center">
            {/* Phone Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />

            {/* Floating Crown Badge (Exact match to screenshot 1) */}
            <div className="absolute -top-2 right-2 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <div className="text-left leading-tight">
                <span className="block text-[11px] font-bold text-white">
                  {slide.highlightBadge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Pagination & Arrows (Bottom Right) */}
      <div className="absolute bottom-4 right-6 z-20 flex items-center gap-2 text-xs font-semibold text-gray-400 select-none">
        <button
          onClick={handlePrev}
          aria-label="Previous Deal"
          className="p-1 rounded-full hover:bg-white/10 hover:text-white transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-[11px] tracking-wider text-gray-300">
          {currentSlideIndex + 1} / {SLIDES.length}
        </span>
        <button
          onClick={handleNext}
          aria-label="Next Deal"
          className="p-1 rounded-full hover:bg-white/10 hover:text-white transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
