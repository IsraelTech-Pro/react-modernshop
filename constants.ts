
import { Product, Category, NavLinkItem, MobileMoneyProvider } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Apparel', slug: 'apparel' },
  { id: '3', name: 'Home Goods', slug: 'home-goods' },
  { id: '4', name: 'Books', slug: 'books' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Modern Smartphone X',
    description: 'This innovative smartphone offers a blend of advanced technology and sleek design. Featuring a high-resolution display, powerful processor, and long-lasting battery, it\'s perfect for both work and play.',
    price: 699.99,
    imageUrl: 'https://picsum.photos/seed/Ghana_Electronics_SmartphoneX_FrontStudio_GH001/600/600',
    images: [
        'https://picsum.photos/seed/Ghana_Electronics_SmartphoneX_FrontStudio_GH001/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_SmartphoneX_BackAngle_GH001B/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_SmartphoneX_ScreenDetail_GH001C/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_SmartphoneX_InHandLifestyle_GH001D/800/800'
    ],
    category: 'Electronics',
    stock: 15,
    specs: { Display: '6.5-inch OLED', Processor: 'Octa-core 3.0 GHz', Battery: '4500 mAh', Camera: '108 MP rear, 32 MP front' },
    reviews: [
      { id: 'r1', author: 'Ama K.', rating: 5, comment: 'Excellent performance and great value for money! Love it for my business in Accra.', date: '2023-10-15' },
      { id: 'r2', author: 'Kwesi M.', rating: 4, comment: 'Sleek design and user-friendly interface. Battery is good for a full day.', date: '2023-10-20' },
      { id: 'r3', author: 'Yaw B.', rating: 5, comment: 'Absolutely love this phone! Fast delivery to Kumasi.', date: '2023-11-01' },
      { id: 'r4', author: 'Adwoa A.', rating: 4, comment: 'Great camera and display. A bit pricey but the quality is there.', date: '2023-11-05' },
      { id: 'r5', author: 'Kofi G.', rating: 3, comment: 'Good phone, but expected more for the price. Support was helpful though.', date: '2023-11-10' },
    ],
  },
  {
    id: '2',
    name: 'Wireless Headphones Pro',
    description: 'Immerse yourself in high-fidelity audio with these comfortable and stylish wireless headphones. Active noise cancellation and long battery life.',
    price: 199.99,
    imageUrl: 'https://picsum.photos/seed/Ghana_Electronics_HeadphonesPro_MainShot_GH002/600/600',
    images: [
        'https://picsum.photos/seed/Ghana_Electronics_HeadphonesPro_MainShot_GH002/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_HeadphonesPro_SideView_GH002B/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_HeadphonesPro_EarcupDetail_GH002C/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_HeadphonesPro_UserLifestyle_GH002D/800/800'
    ],
    category: 'Electronics',
    stock: 25,
    specs: { Connectivity: 'Bluetooth 5.2', BatteryLife: '30 hours', NoiseCancellation: 'Active Hybrid ANC' },
    reviews: [],
  },
  {
    id: '3',
    name: 'Summer Floral Kente Print Dress',
    description: 'Light and airy floral dress with a modern Kente-inspired print, perfect for Ghanaian summer occasions. Made from breathable cotton.',
    price: 59.99,
    imageUrl: 'https://picsum.photos/seed/Ghana_Apparel_KentePrintDress_ModelFront_GH003/600/600',
    images: [
        'https://picsum.photos/seed/Ghana_Apparel_KentePrintDress_ModelFront_GH003/800/800',
        'https://picsum.photos/seed/Ghana_Apparel_KentePrintDress_ModelSide_GH003B/800/800',
        'https://picsum.photos/seed/Ghana_Apparel_KentePrintDress_FabricDetail_GH003C/800/800',
        'https://picsum.photos/seed/Ghana_Apparel_KentePrintDress_LifestyleOutdoor_GH003D/800/800',
    ],
    category: 'Apparel',
    stock: 50,
    specs: { Material: '100% Cotton (Ghanaian inspired print)', Fit: 'Regular' },
  },
  {
    id: '4',
    name: 'Elegant Wristwatch Classic Gold',
    description: 'A timeless piece that combines classic design with modern precision. Gold-tone stainless steel case and genuine leather strap.',
    price: 299.99,
    imageUrl: 'https://picsum.photos/seed/Ghana_Apparel_WristwatchGold_ProductShot_GH004/600/600',
    images: [
        'https://picsum.photos/seed/Ghana_Apparel_WristwatchGold_ProductShot_GH004/800/800',
        'https://picsum.photos/seed/Ghana_Apparel_WristwatchGold_OnWrist_GH004B/800/800',
        'https://picsum.photos/seed/Ghana_Apparel_WristwatchGold_DialDetail_GH004C/800/800',
    ],
    category: 'Apparel',
    stock: 10,
    specs: { Movement: 'Automatic', CaseMaterial: 'Stainless Steel (Gold-tone)', Strap: 'Genuine Leather' },
  },
  {
    id: '5',
    name: 'Vibrant Red Sneakers',
    description: 'Comfortable and stylish red sneakers for everyday wear, perfect for Accra streets.',
    price: 75.00,
    imageUrl: 'https://picsum.photos/seed/Ghana_Apparel_RedSneakers_Main_GH005/600/600',
    images: [
        'https://picsum.photos/seed/Ghana_Apparel_RedSneakers_Main_GH005/800/800',
        'https://picsum.photos/seed/Ghana_Apparel_RedSneakers_SideView_GH005B/800/800',
        'https://picsum.photos/seed/Ghana_Apparel_RedSneakers_TopView_GH005C/800/800',
        'https://picsum.photos/seed/Ghana_Apparel_RedSneakers_OnFeetLifestyle_GH005D/800/800',
    ],
    category: 'Apparel',
    stock: 30,
  },
  {
    id: '6',
    name: 'Genuine Leather Wallet - Brown',
    description: 'Premium brown leather wallet with multiple card slots and a dedicated MoMo cash section.',
    price: 49.50,
    imageUrl: 'https://picsum.photos/seed/Ghana_Apparel_LeatherWalletBrown_Closed_GH006/600/600',
    images: [
        'https://picsum.photos/seed/Ghana_Apparel_LeatherWalletBrown_Open_GH006B/800/800',
        'https://picsum.photos/seed/Ghana_Apparel_LeatherWalletBrown_Detail_GH006C/800/800',
        'https://picsum.photos/seed/Ghana_Apparel_LeatherWalletBrown_InHand_GH006D/800/800',
    ],
    category: 'Apparel',
    stock: 40,
  },
  {
    id: '7',
    name: 'Colorful Ceramic Mug Set (4pcs)',
    description: 'Set of 4 vibrant ceramic mugs, perfect for your morning Milo or coffee. Locally inspired colors.',
    price: 35.00,
    imageUrl: 'https://picsum.photos/seed/Ghana_HomeGoods_MugSetColorful_Group_GH007/600/600',
    images: [
        'https://picsum.photos/seed/Ghana_HomeGoods_MugSetColorful_Group_GH007/800/800',
        'https://picsum.photos/seed/Ghana_HomeGoods_MugSetColorful_SingleMug_GH007B/800/800',
        'https://picsum.photos/seed/Ghana_HomeGoods_MugSetColorful_LifestyleKitchen_GH007C/800/800',
    ],
    category: 'Home Goods',
    stock: 60,
  },
  {
    id: '8',
    name: 'The Art of Code: African Edition',
    description: 'A comprehensive guide to writing beautiful and efficient code, with examples relevant to African developers.',
    price: 45.99,
    imageUrl: 'https://picsum.photos/seed/Ghana_Books_ArtOfCodeAfricanEd_Cover_GH008/600/600',
    images: [
        'https://picsum.photos/seed/Ghana_Books_ArtOfCodeAfricanEd_Cover_GH008/800/800',
        'https://picsum.photos/seed/Ghana_Books_ArtOfCodeAfricanEd_Spine_GH008B/800/800',
        'https://picsum.photos/seed/Ghana_Books_ArtOfCodeAfricanEd_OpenPages_GH008C/800/800',
    ],
    category: 'Books',
    stock: 22,
  },
  // Add more products with similar image updates...
  {
    id: '9',
    name: 'Smart Home Hub - Ghana Edition',
    description: 'Control all your smart devices from one central hub. Voice assistant compatible, optimized for local networks.',
    price: 129.00,
    imageUrl: 'https://picsum.photos/seed/Ghana_Electronics_SmartHomeHub_Main_GH009/600/600',
    images: [
        'https://picsum.photos/seed/Ghana_Electronics_SmartHomeHub_Main_GH009/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_SmartHomeHub_Ports_GH009B/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_SmartHomeHub_LifestyleLivingRoom_GH009C/800/800',
    ],
    category: 'Electronics',
    stock: 18,
    specs: { Compatibility: 'Wi-Fi, Bluetooth, Zigbee', VoiceAssistant: 'Yes' },
  },
  {
    id: '10',
    name: 'Portable Bluetooth Speaker - Kente Trim',
    description: 'Compact and powerful Bluetooth speaker with long battery life, waterproof design, and stylish Kente trim.',
    price: 89.99,
    imageUrl: 'https://picsum.photos/seed/Ghana_Electronics_BTSpeakerKente_Front_GH010/600/600',
    images: [
        'https://picsum.photos/seed/Ghana_Electronics_BTSpeakerKente_Front_GH010/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_BTSpeakerKente_Side_GH010B/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_BTSpeakerKente_LifestyleBeach_GH010C/800/800',
    ],
    category: 'Electronics',
    stock: 35,
    specs: { BatteryLife: '15 hours', Waterproof: 'IPX7', Connectivity: 'Bluetooth 5.0' },
  },
  {
    id: '11',
    name: 'Pro Gaming Mouse - Adinkra Edition',
    description: 'High-precision gaming mouse with customizable buttons, RGB lighting, and subtle Adinkra symbol design elements.',
    price: 69.99,
    imageUrl: 'https://picsum.photos/seed/Ghana_Electronics_GamingMouseAdinkra_Top_GH011/600/600',
    images: [
        'https://picsum.photos/seed/Ghana_Electronics_GamingMouseAdinkra_Top_GH011/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_GamingMouseAdinkra_SideButtons_GH011B/800/800',
        'https://picsum.photos/seed/Ghana_Electronics_GamingMouseAdinkra_InHand_GH011C/800/800',
    ],
    category: 'Electronics',
    stock: 20,
    specs: { DPI: '16000', Buttons: '8 programmable', Lighting: 'RGB' },
  },
];

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Categories',
    href: '#',
    subLinks: CATEGORIES.map(cat => ({ label: cat.name, href: `/products?category=${cat.slug}` })),
  },
  { label: 'All Products', href: '/products' },
  { label: 'Deals', href: '/deals' },
];

export const SHIPPING_COST = 30.00; // Represents GHS 30.00
export const GHANA_PHONE_NUMBER = '+233240000000'; // Placeholder

export const MOBILE_MONEY_PROVIDERS: { id: MobileMoneyProvider, name: string }[] = [
    { id: 'MTN_MOMO', name: 'MTN MoMo' },
    { id: 'TELECEL_CASH', name: 'Telecel Cash' },
];
