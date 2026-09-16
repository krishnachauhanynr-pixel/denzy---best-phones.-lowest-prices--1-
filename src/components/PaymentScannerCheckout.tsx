import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  CreditCard,



  ArrowLeft,
  QrCode as QrIcon,
  Sparkles,
} from 'lucide-react';
import { UpiQrCode } from './UpiQrCode';
import {
  UpiLogo,


  GooglePayIcon,
  PhonePeIcon,
  PaytmIcon,
  BhimIcon,
} from './PaymentBadges';
import { AddressInfo, CartItem, PaymentMethodType } from '../types';

interface PaymentScannerCheckoutProps {
  onBackToStore: () => void;
  cartItems: CartItem[];
  onCompleteOrder: (orderId: string, amount: number, paymentMethod: string) => void;
}

export const PaymentScannerCheckout: React.FC<PaymentScannerCheckoutProps> = ({
  onBackToStore,
  cartItems,
  onCompleteOrder,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<1 | 2>(1);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('upi');
  const [selectedCryptoNetwork, setSelectedCryptoNetwork] = useState<'bnb' | 'btc'>('bnb');
  const [address, setAddress] = useState<AddressInfo>({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    addressLine: '',
    city: '',
    state: '',
  });

  // 80% to 90% discount selector (defaults to 85% as requested)
  const [discountPercent, setDiscountPercent] = useState<number>(85);

  // Card form state for when Card is selected
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Calculate pricing from cart or fallback to exact figures
  const primaryItem = cartItems[0] || {
    product: {
      id: 'iphone-16-pro',
      name: 'iPhone 16 Pro',
      storage: '256GB',
      color: 'Natural Titanium',
      originalPrice: 149900,
      discountedPrice: 22485,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    },
    quantity: 1,
  };

  const originalSubtotal = primaryItem.product.originalPrice * primaryItem.quantity;
  // Apply 80% to 90% discount
  const discountAmount = Math.round(originalSubtotal * (discountPercent / 100));
  const totalAmount = Math.max(0, originalSubtotal - discountAmount);

  const handleSimulatePaymentSuccess = () => {
    setTimeout(() => {
      const generatedOrderId = `DNZ-${Math.floor(100000 + Math.random() * 900000)}`;
      onCompleteOrder(generatedOrderId, totalAmount, selectedMethod);
    }, 1200);
  };

  const cryptoWallets = {
    bnb: {
      label: 'BNB Smart Chain',
      ticker: 'USDT',
      address: '0x7AdBFC8e9c35654C3285B9F97664DAdE90937',
      shortAddress: '0x7AdBFC8e9c35654C3285B9F97664DAdE90937',
      accent: 'from-amber-500 to-yellow-500',
    },
    btc: {
      label: 'Bitcoin',
      ticker: 'BTC',
      address: 'bc1Q8am0r1h0s5kajnwcule8x2d2wqjaep67v6nsch0',
      shortAddress: 'bc1Q8am0r1h0s5kajnwcule8x2d2wqjaep67v6nsch0',
      accent: 'from-orange-500 to-amber-400',
    },
  } as const;

  const qrWallet = cryptoWallets[selectedCryptoNetwork];

  return (
    <div id="payment-scanner-checkout-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Breadcrumb & Step Indicator (Exact match to Screenshot 2) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-3">
            <button
              id="back-to-store-btn"
              onClick={onBackToStore}
              className="p-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
              title="Back to store"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Checkout
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 ml-8">
            <Lock className="w-3.5 h-3.5 text-gray-600" />
            <span>Your information is secure and encrypted</span>
          </div>
        </div>

        {/* Stepper Wizard */}
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs">
          {/* Step 1: Shipping Address */}
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${checkoutStep === 1 ? 'bg-black text-white ring-4 ring-gray-200' : 'bg-slate-800 text-white'}`}>
              {checkoutStep === 1 ? '1' : '✓'}
            </div>
            <span className={`${checkoutStep === 1 ? 'text-gray-900 font-bold' : 'text-gray-600 font-medium'} hidden sm:inline`}>
              Shipping Address
            </span>
          </div>

          <div className="w-8 sm:w-12 h-[1px] bg-gray-300" />

          {/* Step 2: Payment */}
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${checkoutStep === 2 ? 'bg-black text-white ring-4 ring-gray-200' : 'border border-gray-300 text-gray-400'}`}>
              2
            </div>
            <span className={`${checkoutStep === 2 ? 'text-gray-900 font-bold' : 'text-gray-400 font-medium'} hidden sm:inline`}>
              Payment
            </span>
          </div>

          <div className="w-8 sm:w-12 h-[1px] bg-gray-300" />

          {/* Step 3: Order Confirmation */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center font-semibold text-xs">
              3
            </div>
            <span className="text-gray-400 font-medium hidden sm:inline">
              Order Confirmation
            </span>
          </div>
        </div>
      </div>

      {checkoutStep === 1 ? (
        <form
          className="mt-6 max-w-3xl bg-white rounded-xl border border-gray-200/90 p-5 sm:p-6 shadow-xs"
          onSubmit={(event) => {
            event.preventDefault();
            setCheckoutStep(2);
          }}
        >
          <div className="mb-5">
            <h2 className="text-base font-bold text-gray-900">Shipping Address</h2>
            <p className="text-xs text-gray-500 mt-1">Enter your delivery details before choosing a payment method.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([
              ['fullName', 'Full Name', 'Enter your full name'],
              ['phoneNumber', 'Phone Number', '10-digit mobile number'],
              ['pincode', 'Pincode', '6-digit pincode'],
              ['city', 'City', 'Enter your city'],
              ['state', 'State', 'Enter your state'],
            ] as const).map(([field, label, placeholder]) => (
              <label key={field} className="block">
                <span className="block text-xs font-semibold text-gray-700">{label}</span>
                <input
                  required
                  type={field === 'phoneNumber' || field === 'pincode' ? 'tel' : 'text'}
                  value={address[field]}
                  onChange={(event) => setAddress({ ...address, [field]: event.target.value })}
                  placeholder={placeholder}
                  className="w-full mt-1.5 p-2.5 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-black"
                />
              </label>
            ))}
            <label className="block sm:col-span-2">
              <span className="block text-xs font-semibold text-gray-700">Address</span>
              <textarea
                required
                value={address.addressLine}
                onChange={(event) => setAddress({ ...address, addressLine: event.target.value })}
                placeholder="House / flat, street and landmark"
                rows={3}
                className="w-full mt-1.5 p-2.5 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-5 w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
          >
            Continue to Payment
          </button>
        </form>
      ) : (
      /* Main 3-Column / Layout from Screenshot 2 */
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Left Column: Payment Method List (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200/90 p-4 sm:p-5 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">
            Payment Method
          </h2>

          <div className="space-y-3">
            {/* Method 1: UPI (Scan & Pay) - Selected by default */}
            <label
              id="payment-method-upi"
              onClick={() => setSelectedMethod('upi')}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedMethod === 'upi'
                  ? 'border-gray-900 bg-gray-50/70 ring-1 ring-gray-900 shadow-2xs'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={selectedMethod === 'upi'}
                  onChange={() => setSelectedMethod('upi')}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                />
                <div>
                  <span className="block text-xs font-bold text-gray-900">
                    UPI (Scan &amp; Pay)
                  </span>
                  <span className="block text-[11px] text-gray-500 mt-0.5">
                    Pay using any UPI app
                  </span>
                </div>
              </div>
              <UpiLogo className="h-5" />
            </label>

            {/* Method 2: Credit / Debit Card */}
            <label
              id="payment-method-card"
              onClick={() => setSelectedMethod('card')}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedMethod === 'card'
                  ? 'border-gray-900 bg-gray-50/70 ring-1 ring-gray-900 shadow-2xs'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={selectedMethod === 'card'}
                  onChange={() => setSelectedMethod('card')}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                />
                <div>
                  <span className="block text-xs font-bold text-gray-900">Credit / Debit Card</span>
                  <span className="block text-[11px] text-gray-500 mt-0.5">Visa, Mastercard and more</span>
                </div>
              </div>
              <CreditCard className="w-5 h-5 text-gray-700" />
            </label>

            {/* Method 3: USDT / Crypto wallet */}
            <label
              id="payment-method-usdt"
              onClick={() => setSelectedMethod('usdt')}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedMethod === 'usdt'
                  ? 'border-gray-900 bg-gray-50/70 ring-1 ring-gray-900 shadow-2xs'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={selectedMethod === 'usdt'}
                  onChange={() => setSelectedMethod('usdt')}
                  className="w-4 h-4 text-black border-gray-300 focus:ring-black accent-black"
                />
                <div>
                  <span className="block text-xs font-bold text-gray-900">USDT / Crypto Wallet</span>
                  <span className="block text-[11px] text-gray-500 mt-0.5">BNB Smart Chain or Bitcoin</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 text-[8px] font-black text-white">
                ₮
              </div>
            </label>
          </div>
        </div>

        {/* Middle Column: The Payment Scanner (Exact Match to Screenshot 2) (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-gray-200/90 p-5 sm:p-6 shadow-xs flex flex-col items-center text-center relative">
          {selectedMethod === 'upi' ? (
            <>
              {/* Header Titles */}
              <h2 className="text-base font-bold text-gray-900 tracking-tight">
                Scan &amp; Pay using UPI
              </h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                Use any UPI app (Google Pay, PhonePe, Paytm, etc.)
              </p>

              {/* The Dedicated QR Code Scanner matching user screenshot */}
              <div className="my-5 flex flex-col items-center">
                <UpiQrCode
                  amount={totalAmount}
                  size={210}
                  onScanSimulate={handleSimulatePaymentSuccess}
                />

                <span className="text-xs font-bold text-gray-900 mt-3.5">
                  Scan this QR code to pay ₹{totalAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-gray-500 font-medium mt-0.5 max-w-[240px]">
                  After payment, your order will be confirmed automatically.
                </span>
              </div>

              {/* Four Supported UPI Apps Row (Google Pay, PhonePe, Paytm, BHIM) */}
              <div className="w-full grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-gray-100">
                <GooglePayIcon />
                <PhonePeIcon />
                <PaytmIcon />
                <BhimIcon />
              </div>

            </>
          ) : selectedMethod === 'card' ? (
            /* Credit / Debit Card Form */
            <div className="w-full text-left">
              <h2 className="text-base font-bold text-gray-900 tracking-tight text-center">
                Credit or Debit Card
              </h2>
              <p className="text-xs text-gray-500 text-center mt-0.5">
                Safe and encrypted with 256-bit SSL
              </p>

              <div className="mt-5 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4111 2222 3333 4444"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <button
                  id="pay-card-btn"
                  onClick={handleSimulatePaymentSuccess}
                  className="w-full mt-4 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
                >
                  Pay ₹{totalAmount.toLocaleString('en-IN')}
                </button>
              </div>
            </div>
          ) : selectedMethod === 'usdt' ? (
            <div className="w-full text-left">
              <h2 className="text-base font-bold text-gray-900 tracking-tight text-center">
                Pay with USDT
              </h2>
              <p className="text-xs text-gray-500 text-center mt-0.5">
                Send crypto to the wallet below and we’ll confirm automatically.
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-bold">
                {(['bnb', 'btc'] as const).map((network) => (
                  <button
                    key={network}
                    type="button"
                    onClick={() => setSelectedCryptoNetwork(network)}
                    className={`px-3 py-1.5 rounded-full border transition ${
                      selectedCryptoNetwork === network
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {network === 'bnb' ? 'BNB Smart Chain' : 'Bitcoin'}
                  </button>
                ))}
              </div>

              <div className="my-5 flex flex-col items-center">
                <UpiQrCode
                  amount={totalAmount}
                  size={220}
                  storageKey={`custom_payment_scanner_${selectedCryptoNetwork}`}
                  scannerLabel={qrWallet.label}
                  onScanSimulate={handleSimulatePaymentSuccess}
                />

                <span className="text-xs font-bold text-gray-900 mt-3.5">
                  {qrWallet.label} Wallet
                </span>
                <span className="text-[11px] text-gray-500 font-medium mt-0.5 max-w-[240px] text-center break-all">
                  {qrWallet.address}
                </span>
              </div>

              <button
                id="pay-usdt-btn"
                onClick={handleSimulatePaymentSuccess}
                className="w-full mt-4 py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
              >
                I have sent {qrWallet.ticker} payment
              </button>
            </div>
          ) : (
            /* Other payment method handlers */
            <div className="w-full py-6 flex flex-col items-center">
              <h2 className="text-base font-bold text-gray-900 capitalize">
                {selectedMethod}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                You will be securely redirected to complete your payment.
              </p>
              <button
                id="complete-other-payment-btn"
                onClick={handleSimulatePaymentSuccess}
                className="mt-6 py-2 px-6 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
              >
                Proceed to Pay
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary (lg:col-span-4) (Exact match to Screenshot 2) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-xs">
            <h2 className="text-sm font-bold text-gray-900 mb-4 tracking-tight">
              Order Summary
            </h2>

            {/* 80% to 90% Flash Discount Selector */}
            <div className="mb-4 p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/50 border border-emerald-300">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-emerald-950 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Festival Sale (80%–90% OFF)
                </span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-mono text-[10px] font-black">
                  {discountPercent}% OFF
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                {[80, 85, 90].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setDiscountPercent(rate)}
                    className={`py-1.5 px-1 rounded-lg font-bold text-[11px] transition-all ${
                      discountPercent === rate
                        ? 'bg-slate-900 text-white shadow-xs scale-[1.02]'
                        : 'bg-white text-emerald-900 border border-emerald-300/80 hover:bg-emerald-50'
                    }`}
                  >
                    {rate}% OFF
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-emerald-800 mt-1.5 text-center font-medium">
                Auto-applied coupon code: <span className="font-mono font-bold text-emerald-950">FESTIVAL{discountPercent}</span>
              </p>
            </div>

            {/* Product Item Row (iPhone 16 Pro matching screenshot 2) */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 p-1 shrink-0 flex items-center justify-center">
                <img
                  src={primaryItem.product.image}
                  alt={primaryItem.product.name}
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-gray-900 truncate">
                  {primaryItem.product.name}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  {primaryItem.product.storage} | {primaryItem.product.color || 'Natural Titanium'}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold text-gray-900">
                    ₹{originalSubtotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    × {primaryItem.quantity}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing breakdown */}
            <div className="space-y-2.5 py-4 border-b border-gray-100 text-xs">
              <div className="flex items-center justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ₹{originalSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-600 font-medium">
                <span>Shipping Fee</span>
                <span className="text-emerald-600 font-bold">
                  FREE
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-600 font-medium">
                <span>Flash Discount ({discountPercent}% OFF)</span>
                <span className="text-emerald-600 font-bold">
                  - ₹{discountAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Total Amount (Prominent Bold from Screenshot 2) */}
            <div className="pt-4 flex items-baseline justify-between">
              <div>
                <span className="text-sm font-bold text-gray-900 block">
                  Total Amount
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">
                  You save ₹{discountAmount.toLocaleString('en-IN')} ({discountPercent}%)
                </span>
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Secure Payment Badges (Screenshot 2 exact) */}
          <div className="bg-white rounded-xl border border-gray-200/90 p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-gray-900" />
              <span className="text-xs font-bold text-gray-900">
                Secure Payment
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium mb-3">
              Your payment information is safe with us.
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex flex-col items-center">
                <Lock className="w-3.5 h-3.5 text-gray-700 mb-1" />
                <span className="font-medium leading-tight">Encrypted Transactions</span>
              </div>
              <div className="flex flex-col items-center">
                <CreditCard className="w-3.5 h-3.5 text-gray-700 mb-1" />
                <span className="font-medium leading-tight">No Card Details Saved</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-700 mb-1" />
                <span className="font-medium leading-tight">100% Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Scan. Pay. Done! Promo Card (Screenshot 2 bottom right) */}
          <div className="bg-gray-50 rounded-xl border border-gray-200/80 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 p-1.5 flex items-center justify-center shrink-0">
                <QrIcon className="w-full h-full text-gray-900" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 leading-tight">
                  Scan. Pay. Done!
                </h4>
                <p className="text-[10px] text-gray-500 leading-tight mt-0.5">
                  Fast, secure and easy payments with Denzy UPI.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-serif italic text-gray-600 font-semibold shrink-0 ml-2">
              Powered by Denzy
            </span>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
