import React from 'react';
import { CheckCircle2, Download, Package, ArrowRight, X } from 'lucide-react';

interface OrderConfirmationModalProps {
  orderId: string;
  amount: number;
  paymentMethod: string;
  onClose: () => void;
  onReturnToStore: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  orderId,
  amount,
  paymentMethod,
  onClose,
  onReturnToStore,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 3 Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-4">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Step 3: Order Confirmed</span>
        </div>

        {/* Animated Green Circle */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <h2 className="text-xl font-black text-gray-900 tracking-tight">
          Payment Successful!
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Thank you for your purchase with Denzy. Your order is being packed.
        </p>

        {/* Order Details Card */}
        <div className="my-5 p-4 rounded-xl bg-gray-50 border border-gray-200 text-left text-xs space-y-2.5">
          <div className="flex justify-between items-center text-gray-600">
            <span>Order ID</span>
            <span className="font-mono font-bold text-gray-900">{orderId}</span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span>Amount Paid</span>
            <span className="font-bold text-gray-900">
              ₹{amount.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span>Payment Mode</span>
            <span className="font-semibold text-emerald-700 capitalize">
              {paymentMethod === 'upi' ? 'UPI QR Scanner (Scan & Pay)' : paymentMethod}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span>Estimated Delivery</span>
            <span className="font-semibold text-gray-900">
              Within 2-3 Business Days
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onReturnToStore}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
          >
            <Package className="w-4 h-4" />
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              alert(`Downloading Invoice receipt for order ${orderId}...`);
            }}
            className="w-full py-2 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Download Tax Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
