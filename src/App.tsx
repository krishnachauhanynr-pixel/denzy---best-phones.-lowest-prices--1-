/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { TrustBar } from './components/TrustBar';
import { BrandStrip } from './components/BrandStrip';
import { ProductCard } from './components/ProductCard';
import { PromoBanners } from './components/PromoBanners';
import { PaymentScannerCheckout } from './components/PaymentScannerCheckout';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SitemapModal } from './components/SitemapModal';
import { Footer } from './components/Footer';
import { SMARTPHONE_PRODUCTS, FEATURED_PRODUCT } from './data/mockData';
import { Product, CartItem } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'checkout'>('home');
  const [activeCategory, setActiveCategory] = useState<string>('home');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSitemapOpen, setIsSitemapOpen] = useState<boolean>(false);

  // Initial cart with iPhone 16 Pro matching Screenshot 2 (Cart badge 1, iPhone 16 Pro 256GB Natural Titanium)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: FEATURED_PRODUCT,
      quantity: 1,
      selectedStorage: '256GB',
      selectedColor: 'Natural Titanium',
    }
  ]);

  // Initial wishlist items matching Screenshot 2's Wishlist count of 3
  const [wishlist, setWishlist] = useState<string[]>([
    'iphone-15',
    'samsung-galaxy-s24',
    'oneplus-12',
  ]);

  // Order confirmation state for Step 3
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    amount: number;
    paymentMethod: string;
  } | null>(null);

  // Dynamic canonical tag management to satisfy "add cononical tag and sitemap in website"
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
      if (canonicalLink) {
        const path = currentView === 'checkout' ? '/checkout' : '/';
        canonicalLink.href = `${window.location.origin}${path}`;
      }
    }
  }, [currentView]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedStorage: product.storage }];
    });
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleCompleteOrder = (orderId: string, amount: number, paymentMethod: string) => {
    setConfirmedOrder({ orderId, amount, paymentMethod });
  };

  // Filter products by brand and search query
  const filteredProducts = SMARTPHONE_PRODUCTS.filter((p) => {
    const matchesBrand = selectedBrand
      ? p.brand.toLowerCase() === selectedBrand.toLowerCase()
      : true;
    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.processor.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900 selection:bg-slate-900 selection:text-white">
      {/* Top Header Navigation */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'checkout' ? (
          /* Payment Scanner Checkout Page (Screenshot 2 exact) */
          <PaymentScannerCheckout
            onBackToStore={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            cartItems={cartItems}
            onCompleteOrder={handleCompleteOrder}
          />
        ) : (
          /* Store Front Home Page (Screenshot 1 exact) */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Left Sidebar (Categories + Why Denzy + Upgrade Your World) */}
              <Sidebar
                activeCategory={activeCategory}
                onSelectCategory={(catId) => {
                  setActiveCategory(catId);
                  if (catId === 'mobiles') {
                    setSelectedBrand(null);
                  }
                }}
                onUpgradeClick={() => {
                  setCurrentView('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Right Main Store Content */}
              <div className="flex-1 w-full min-w-0">
                {/* Hero Banner (Screenshot 1) */}
                <HeroBanner
                  onShopNow={() => {
                    setCurrentView('checkout');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* Trust & Guarantee Features Bar (Screenshot 1) */}
                <TrustBar />

                {/* Top Brands Strip (Screenshot 1) */}
                <BrandStrip
                  selectedBrand={selectedBrand}
                  onSelectBrand={setSelectedBrand}
                />

                {/* Best Deals on Smartphones Section (Screenshot 1) */}
                <section className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                        Best Deals on Smartphones
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Top selling phones at the lowest prices. Grab your favourite now!
                      </p>
                    </div>

                    <button
                      id="view-all-smartphones-btn"
                      onClick={() => {
                        setSelectedBrand(null);
                        setSearchQuery('');
                      }}
                      className="text-xs font-semibold text-gray-700 hover:text-gray-900 flex items-center gap-1 transition"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Products Grid (6 phones matching screenshot 1) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={(p) => {
                          handleAddToCart(p);
                        }}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlist.includes(product.id)}
                        onSelectProduct={() => {
                          setCurrentView('checkout');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    ))}
                  </div>
                </section>

                {/* Promotional Dual Banners (Samsung Galaxy S24 & realme 13 Pro+) */}
                <PromoBanners
                  onShopSamsung={() => {
                    setSelectedBrand('Samsung');
                  }}
                  onShopRealme={() => {
                    setSelectedBrand('realme');
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigateHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Step 3: Order Confirmation Modal */}
      {confirmedOrder && (
        <OrderConfirmationModal
          orderId={confirmedOrder.orderId}
          amount={confirmedOrder.amount}
          paymentMethod={confirmedOrder.paymentMethod}
          onClose={() => setConfirmedOrder(null)}
          onReturnToStore={() => {
            setConfirmedOrder(null);
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* SEO & XML Sitemap Inspector Modal */}
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
      />
    </div>
  );
}
