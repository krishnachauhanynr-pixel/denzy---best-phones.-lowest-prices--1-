import React from 'react';
import {
  Home,
  Smartphone,
  Laptop,
  Shirt,
  User,
  Users,
  Coffee,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Banknote
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  onUpgradeClick: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onSelectCategory,
  onUpgradeClick,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-4 h-4" />;
      case 'Smartphone':
        return <Smartphone className="w-4 h-4" />;
      case 'Laptop':
        return <Laptop className="w-4 h-4" />;
      case 'Shirt':
        return <Shirt className="w-4 h-4" />;
      case 'User':
        return <User className="w-4 h-4" />;
      case 'UserCheck':
        return <Users className="w-4 h-4" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Smartphone className="w-4 h-4" />;
    }
  };

  return (
    <aside className="w-full lg:w-60 flex flex-col gap-5 shrink-0">
      {/* Category Navigation Menu */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200/80 overflow-hidden">
        <nav className="p-1.5 flex flex-col space-y-0.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`sidebar-cat-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 shadow-2xs font-bold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className={isActive ? 'text-gray-900' : 'text-gray-400'}>
                  {getCategoryIcon(cat.icon)}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Why Denzy? Card (Exact match to Screenshot 1) */}
      <div className="bg-[#0f172a] text-white rounded-xl p-4 shadow-sm border border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <Smartphone className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-white tracking-wide">
            Why Denzy?
          </h3>
        </div>
        <ul className="space-y-2.5 text-[11px] text-gray-300">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Lowest Price Guarantee</span>
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% Genuine Products</span>
          </li>
          <li className="flex items-center gap-2">
            <Banknote className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Cash on Delivery</span>
          </li>
          <li className="flex items-center gap-2">
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Easy Returns</span>
          </li>
        </ul>
      </div>

      {/* Upgrade Your World Promo Card (Exact match to Screenshot 1) */}
      <div className="bg-gradient-to-br from-gray-900 to-slate-800 text-white rounded-xl p-4 shadow-sm relative overflow-hidden group border border-slate-700">
        <div className="relative z-10">
          <h4 className="text-sm font-extrabold text-white leading-tight">
            Upgrade<br />Your World
          </h4>
          <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed max-w-[140px]">
            Latest Smartphones at Unbeatable Prices
          </p>
          <button
            id="sidebar-upgrade-btn"
            onClick={onUpgradeClick}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-gray-900 text-[11px] font-bold shadow-xs hover:bg-gray-100 transition group-hover:gap-2"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-3 h-3 text-gray-900" />
          </button>
        </div>

        {/* Floating phone visual */}
        <div className="absolute -right-3 -bottom-2 w-24 h-32 opacity-80 group-hover:scale-105 transition-transform duration-300">
          <img
            src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=300&q=80"
            alt="Denzy Smartphones"
            className="w-full h-full object-contain filter drop-shadow-md"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </aside>
  );
};
