import React from 'react';
import { Truck, ShieldCheck, Percent, RotateCcw, Headphones } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const features = [
    {
      icon: <Truck className="w-5 h-5 text-gray-800" />,
      title: 'Free Delivery',
      subtitle: 'On All Orders',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gray-800" />,
      title: '100% Genuine',
      subtitle: 'Original Products',
    },
    {
      icon: <Percent className="w-5 h-5 text-gray-800" />,
      title: 'Best Price Guarantee',
      subtitle: 'Cheapest in India',
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-gray-800" />,
      title: 'Easy Returns',
      subtitle: 'Within 7 Days',
    },
    {
      icon: <Headphones className="w-5 h-5 text-gray-800" />,
      title: '24/7 Support',
      subtitle: "We're Here to Help",
    },
  ];

  return (
    <div
      id="trust-features-bar"
      className="bg-white rounded-xl shadow-xs border border-gray-200/80 p-3.5 my-5"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
        {features.map((f, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 px-2 ${
              index > 0 ? 'pt-2 sm:pt-0' : ''
            }`}
          >
            <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 shrink-0">
              {f.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 leading-tight">
                {f.title}
              </span>
              <span className="text-[11px] text-gray-500 font-medium leading-tight mt-0.5">
                {f.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
