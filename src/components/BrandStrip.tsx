import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BRANDS } from '../data/mockData';

interface BrandStripProps {
  selectedBrand: string | null;
  onSelectBrand: (brandName: string | null) => void;
}

export const BrandStrip: React.FC<BrandStripProps> = ({
  selectedBrand,
  onSelectBrand,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900 tracking-tight">
          Top Brands
        </h2>
        <button
          id="view-all-brands-btn"
          onClick={() => onSelectBrand(null)}
          className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1 transition"
        >
          <span>View All Brands</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2">
        {BRANDS.map((brand) => {
          const isSelected = selectedBrand === brand.name;
          return (
            <button
              key={brand.name}
              id={`brand-badge-${brand.name.toLowerCase()}`}
              onClick={() => onSelectBrand(isSelected ? null : brand.name)}
              className={`flex items-center justify-center h-12 rounded-xl border transition-all duration-150 p-2 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-gray-400 hover:shadow-xs'
              }`}
            >
              <span className="text-xs font-extrabold tracking-tight truncate">
                {brand.logo}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
