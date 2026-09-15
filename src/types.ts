export interface Product {
  id: string;
  name: string;
  brand: string;
  storage: string;
  processor: string;
  color?: string;
  originalPrice: number;
  discountedPrice: number;
  discountBadge: string;
  lowestPriceTag: boolean;
  image: string;
  rating?: number;
  inStock: boolean;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'wallets';

export type CheckoutStep = 1 | 2 | 3; // 1: Shipping Address, 2: Payment, 3: Order Confirmation

export interface AddressInfo {
  fullName: string;
  phoneNumber: string;
  pincode: string;
  addressLine: string;
  city: string;
  state: string;
}
