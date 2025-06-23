
export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  images?: string[]; // For product detail gallery
  category: string;
  stock: number;
  specs?: { [key: string]: string };
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
  subLinks?: NavLinkItem[];
}

// Ghana-specific types
export type MobileMoneyProvider = 'MTN_MOMO' | 'TELECEL_CASH';

export interface MobileMoneyDetails {
  number: string;
  nameOnAccount: string;
  provider: MobileMoneyProvider | '';
}

export type CheckoutPaymentOption = 'PAY_ONLINE' | 'DELIVERY_FIRST';

// New types for latest features
export type Theme = 'light' | 'dark';
export type QuickViewProductId = string | null;
