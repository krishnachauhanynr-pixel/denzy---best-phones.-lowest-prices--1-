import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  isWishlisted: boolean;
  onSelectProduct?: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
}) => {
  const [selectedColor, setSelectedColor] = useState(
    product.colorOptions?.find((option) => option.name === product.color) || product.colorOptions?.[0]
  );
  const hasColorChoices = product.brand === 'Apple' && Boolean(product.colorOptions?.length);
  const displayedProduct = selectedColor
    ? { ...product, color: selectedColor.name }
    : product;

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between p-3.5 relative group"
    >
      {/* Top Row: Discount badge & Wishlist button */}
      <div className="flex items-center justify-between z-10">
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold tracking-tight">
          {product.discountBadge}
        </span>

        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`p-1.5 rounded-full transition ${
            isWishlisted
              ? 'text-red-500 bg-red-50'
              : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
          }`}
          aria-label="Wishlist toggle"
        >
          <Heart
            className="w-4 h-4"
            fill={isWishlisted ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      {/* Product Image */}
      <div
        onClick={() => onSelectProduct && onSelectProduct(product)}
        className="relative w-full aspect-square my-2 cursor-pointer flex items-center justify-center p-2 overflow-hidden"
      >
        {hasColorChoices && selectedColor && (
          <div
            className="absolute right-3 bottom-4 w-16 h-28 rounded-[15px] border border-black/10 shadow-lg rotate-[8deg]"
            style={{ backgroundColor: selectedColor.hex }}
            aria-label={`${selectedColor.name} phone back preview`}
          >
            <div className="absolute left-1.5 top-2 w-7 h-8 rounded-lg bg-black/75 p-1 grid grid-cols-2 gap-0.5">
              <span className="rounded-full bg-zinc-400" />
              <span className="rounded-full bg-zinc-400" />
              <span className="rounded-full bg-zinc-400" />
            </div>
            <span className="absolute inset-x-0 bottom-3 text-center text-[6px] font-bold text-black/35">APPLE</span>
          </div>
        )}
        <img
          src={product.image}
          alt={`${product.name} - ${product.storage}`}
          className="relative z-10 max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-col">
        <h3
          onClick={() => onSelectProduct && onSelectProduct(product)}
          className="text-sm font-bold text-gray-900 hover:text-amber-600 transition cursor-pointer truncate"
        >
          {product.name}
        </h3>

        <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
          {product.storage} | {product.processor}
        </p>

        {hasColorChoices && selectedColor && (
          <div className="mt-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-semibold text-gray-600 truncate">
                {selectedColor.name}
              </span>
              <span className="text-[9px] text-gray-400">Color</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5" role="group" aria-label="Choose phone color">
              {product.colorOptions?.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => setSelectedColor(option)}
                  aria-label={`Choose ${option.name}`}
                  aria-pressed={selectedColor.name === option.name}
                  className={`w-4 h-4 rounded-full border-2 transition-transform ${
                    selectedColor.name === option.name
                      ? 'border-slate-900 scale-110'
                      : 'border-white ring-1 ring-gray-300 hover:scale-110'
                  }`}
                  style={{ backgroundColor: option.hex }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Price Row */}
        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-base font-extrabold text-gray-900 tracking-tight">
            ₹{product.discountedPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{product.originalPrice.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Lowest Price Tag (Screenshot 1) */}
        {product.lowestPriceTag && (
          <div className="mt-1">
            <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded">
              Lowest Price in India
            </span>
          </div>
        )}

        {/* Add to Cart Button (Screenshot 1 exact style) */}
        <button
          id={`add-to-cart-${product.id}`}
          onClick={() => onAddToCart(displayedProduct)}
          className="mt-3.5 w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors active:scale-[0.98]"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
