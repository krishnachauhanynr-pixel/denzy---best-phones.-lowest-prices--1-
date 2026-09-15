import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, X, Sparkles, Download, ShieldCheck, Upload, RotateCcw } from 'lucide-react';

interface UpiQrCodeProps {
  amount?: number;
  size?: number;
  isHovered?: boolean;
  onScanSimulate?: () => void;
}

export const UpiQrCode: React.FC<UpiQrCodeProps> = ({
  amount = 22485,
  size = 210,
  isHovered = false,
  onScanSimulate
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [scannerSrc, setScannerSrc] = useState<string>('/qr.png');
  const [isCustomUploaded, setIsCustomUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('custom_payment_scanner');
    if (saved) {
      setScannerSrc(saved);
      setIsCustomUploaded(true);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setScannerSrc(result);
      setIsCustomUploaded(true);
      try {
        localStorage.setItem('custom_payment_scanner', result);
      } catch (err) {
        console.warn('Storage full');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = scannerSrc;
    link.download = 'upi-qr.png';
    link.click();
  };

  return (
    <>
      <div className="relative flex flex-col items-center bg-[#101114] rounded-3xl p-4 shadow-xl border border-zinc-800 w-full max-w-sm mx-auto">
        <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-400 rounded-tl-md pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-400 rounded-tr-md pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-400 rounded-bl-md pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-400 rounded-br-md pointer-events-none" />

        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsZoomed(true)}
            title="Enlarge Scanner"
            className="w-7 h-7 rounded-full bg-black/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 flex items-center justify-center transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        <div
          onClick={onScanSimulate}
          className="relative bg-black rounded-2xl overflow-hidden cursor-pointer flex items-center justify-center shadow-inner group/box"
          style={{ width: size, height: size }}
          title="Click to simulate payment scan"
        >
          {scannerSrc ? (
             <img
               src={scannerSrc}
               alt="QR Code"
               className="w-full h-full object-contain rounded-xl transform transition duration-300 group-hover:scale-[1.02]"
               onError={(e) => {
                 // Fallback if /qr.png is missing and no custom upload
                 if (!isCustomUploaded) {
                   (e.target as HTMLImageElement).src = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=merchant@upi&pn=Merchant&am=22485';
                 }
               }}
             />
          ) : null}

          <div
            className={`absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent pointer-events-none transition-all duration-700 ${
              isHovered
                ? 'opacity-100 translate-y-12 animate-pulse'
                : 'opacity-40 -translate-y-2'
            }`}
          />
        </div>

        <div className="mt-3 flex items-center justify-between w-full px-1 text-[11px]">
          <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
              {isCustomUploaded ? 'VERIFIED SCANNER' : 'OFFICIAL SCANNER'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsZoomed(true)}
            className="text-zinc-400 hover:text-amber-300 transition text-[10px] font-medium flex items-center gap-1"
          >
            <span>Tap to Enlarge</span>
          </button>
        </div>

        <div className="w-full mt-2.5 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px]">
          <div className="w-full flex items-center justify-between text-zinc-400">
            <span className="text-zinc-400">Scan via PhonePe, GPay, Paytm</span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-zinc-500 hover:text-amber-300 flex items-center gap-1 text-[9px] transition"
            >
              <Upload className="w-2.5 h-2.5" />
              <span>Upload Custom QR</span>
            </button>
          </div>
        </div>
      </div>

      {isZoomed && (
        <div
          id="scanner-enlarge-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative bg-[#0d1117] border border-amber-500/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-zinc-800 text-zinc-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 text-amber-400 text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Full Screen UPI Scanner</span>
            </div>

            <div className="w-72 h-72 sm:w-80 sm:h-80 bg-black rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center p-2">
               <img src={scannerSrc} alt="Zoomed QR" className="w-full h-full object-contain" />
            </div>

            <p className="text-xs text-zinc-300 text-center mt-4 font-medium">
              Point your PhonePe, Google Pay, or Paytm camera directly at this QR code to complete payment of <span className="text-white font-bold">₹{amount.toLocaleString('en-IN')}</span>.
            </p>

            <div className="flex gap-2 w-full mt-4">
               <button
                onClick={handleDownloadQr}
                className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-bold text-xs shadow-md transition flex items-center justify-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                Save QR
              </button>
              <button
                onClick={() => {
                  setIsZoomed(false);
                  if (onScanSimulate) onScanSimulate();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
              >
                Simulate Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
