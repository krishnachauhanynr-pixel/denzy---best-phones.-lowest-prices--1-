import React from 'react';

export const UpiLogo: React.FC<{ className?: string }> = ({ className = 'h-5' }) => (
  <div className={`inline-flex items-center gap-1 font-extrabold italic text-sm tracking-tight text-gray-800 select-none ${className}`}>
    <span className="text-gray-900 font-black">UPI</span>
    <div className="flex -space-x-1">
      <div className="w-2.5 h-3 bg-emerald-600 skew-x-[-20deg] rounded-xs" />
      <div className="w-2.5 h-3 bg-amber-500 skew-x-[-20deg] rounded-xs" />
    </div>
  </div>
);

export const CardLogos: React.FC<{ className?: string }> = ({ className = 'h-4' }) => (
  <div className={`inline-flex items-center gap-1.5 ${className}`}>
    {/* VISA */}
    <span className="px-1.5 py-0.5 rounded text-[10px] font-black italic tracking-tighter bg-blue-900 text-white leading-none">
      VISA
    </span>
    {/* MasterCard */}
    <span className="flex items-center -space-x-1">
      <span className="w-3 h-3 rounded-full bg-red-600 inline-block opacity-90" />
      <span className="w-3 h-3 rounded-full bg-amber-400 inline-block opacity-90" />
    </span>
    {/* RuPay */}
    <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold italic bg-cyan-900 text-orange-400 tracking-tight leading-none">
      RuPay
    </span>
  </div>
);

export const WalletLogos: React.FC<{ className?: string }> = ({ className = 'h-4' }) => (
  <div className={`inline-flex items-center gap-1 text-[11px] font-bold ${className}`}>
    <span className="text-sky-500 font-extrabold">Paytm</span>
    <span className="text-purple-600 font-bold">पे</span>
    <span className="text-gray-700 font-bold">GPay</span>
    <span className="text-amber-500 text-[10px]">amazon</span>
  </div>
);

export const GooglePayIcon: React.FC = () => (
  <div className="flex flex-col items-center">
    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center p-1.5">
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
      </svg>
    </div>
    <span className="text-[11px] text-gray-700 mt-1 font-medium">Google Pay</span>
  </div>
);

export const PhonePeIcon: React.FC = () => (
  <div className="flex flex-col items-center">
    <div className="w-9 h-9 rounded-full bg-[#5f259f] shadow-sm flex items-center justify-center text-white font-bold text-lg">
      पे
    </div>
    <span className="text-[11px] text-gray-700 mt-1 font-medium">PhonePe</span>
  </div>
);

export const PaytmIcon: React.FC = () => (
  <div className="flex flex-col items-center">
    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center p-1">
      <span className="text-[#002e6e] font-black text-xs italic tracking-tighter">Pay<span className="text-[#00baf2]">tm</span></span>
    </div>
    <span className="text-[11px] text-gray-700 mt-1 font-medium">Paytm</span>
  </div>
);

export const BhimIcon: React.FC = () => (
  <div className="flex flex-col items-center">
    <div className="w-9 h-9 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center p-1">
      <div className="flex items-center -space-x-0.5">
        <span className="w-2.5 h-3 bg-emerald-600 rounded-xs transform -skew-x-12" />
        <span className="w-2.5 h-3 bg-amber-500 rounded-xs transform -skew-x-12" />
      </div>
    </div>
    <span className="text-[11px] text-gray-700 mt-1 font-medium">BHIM</span>
  </div>
);
