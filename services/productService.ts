import { Product } from '../types';

export const initialProducts: Product[] = [
  // Electronics
  {
    id: 1,
    name: 'Starlight Laptop X15',
    price: 1499.99,
    description: 'Ultra-thin and powerful, the Starlight Laptop X15 features a stunning 15-inch display and the latest generation processor for seamless multitasking. With its all-day battery life and lightweight aluminum chassis, it\'s the perfect companion for professionals and creatives on the go.',
    image: 'https://picsum.photos/seed/laptopX15/800/600',
    averageRating: 4.8,
    reviewCount: 320,
    category: 'Electronics',
    brand: 'Starlight',
    specifications: [
      { name: 'Processor', value: 'Next-Gen Core Ultra 9' },
      { name: 'RAM', value: '32GB LPDDR5X' },
      { name: 'Storage', value: '1TB NVMe Gen4 SSD' },
      { name: 'Display', value: '15.6" 4K OLED Touchscreen' },
      { name: 'Ports', value: '2x Thunderbolt 4, 1x USB-A, HDMI 2.1' }
    ],
    reviews: [
        { id: 1, author: 'Chris P.', rating: 5, comment: 'This laptop is an absolute beast! The screen is gorgeous and it handles everything I throw at it.', date: '2023-10-20' },
        { id: 2, author: 'Jane D.', rating: 4, comment: 'Great performance and very portable. Battery life is good, but not quite as long as advertised under heavy use.', date: '2023-09-15' },
    ],
    questions: [
        { id: 1, author: 'Mike', question: 'Is the RAM user-upgradeable?', answer: 'No, the RAM is soldered to the motherboard to achieve the thin profile.', date: '2023-11-01' },
    ]
  },
  {
    id: 2,
    name: 'Aura Smartwatch Series 5',
    price: 399.00,
    description: 'Track your fitness, stay connected, and manage your day from your wrist with the Aura Smartwatch. Water-resistant with a vibrant always-on display.',
    image: 'https://picsum.photos/seed/smartwatch5/800/600',
    averageRating: 4.7,
    reviewCount: 1250,
    category: 'Electronics',
    brand: 'Aura',
    specifications: [
        { name: 'Display', value: '1.9" Edge-to-Edge Retina LTPO' },
        { name: 'Sensors', value: 'Heart Rate, SpO2, ECG, Temperature' },
        { name: 'Water Resistance', value: '50 meters' },
        { name: 'Battery Life', value: 'Up to 18 hours' }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 3,
    name: 'CapturePro DSLR Camera Kit',
    price: 899.50,
    description: 'Unleash your creativity with the CapturePro DSLR. Comes with an 18-55mm lens, perfect for both beginners and enthusiasts looking for high-quality photos.',
    image: 'https://picsum.photos/seed/cameraKit/800/600',
    averageRating: 4.9,
    reviewCount: 780,
    category: 'Electronics',
    brand: 'CapturePro',
    specifications: [
        { name: 'Sensor', value: '24.2MP APS-C CMOS' },
        { name: 'ISO Range', value: '100-25600' },
        { name: 'Video', value: '4K UHD at 30fps' },
        { name: 'Lens Mount', value: 'CP Mount' }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 4,
    name: 'SoundWave Noise-Cancelling Headphones',
    price: 249.99,
    description: 'Immerse yourself in music with industry-leading noise cancellation. 30 hours of battery life and a comfortable, lightweight design for all-day wear.',
    image: 'https://picsum.photos/seed/headphonesPro/800/600',
    averageRating: 4.8,
    reviewCount: 2100,
    category: 'Electronics',
    brand: 'SoundWave',
    specifications: [
        { name: 'Connectivity', value: 'Bluetooth 5.2, 3.5mm jack' },
        { name: 'Battery Life', value: '30 hours (ANC on)' },
        { name: 'Driver Size', value: '40mm Dynamic' },
        { name: 'Features', value: 'Active Noise Cancellation, Transparency Mode' }
    ],
    reviews: [],
    questions: []
  },

  // Books
  {
    id: 5,
    name: 'The Echoes of Time',
    price: 14.99,
    description: 'A gripping historical fiction novel that transports you to the bustling streets of ancient Rome. By award-winning author Helena Vance.',
    image: 'https://picsum.photos/seed/bookEchoes/800/600',
    averageRating: 4.6,
    reviewCount: 5430,
    category: 'Books',
    brand: 'Veridian Books',
    specifications: [
        { name: 'Author', value: 'Helena Vance' },
        { name: 'Genre', value: 'Historical Fiction' },
        { name: 'Pages', value: '432' },
        { name: 'Format', value: 'Paperback' }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 6,
    name: 'Astrophysics for Beginners',
    price: 19.95,
    description: 'A beautifully illustrated guide that makes complex cosmological concepts accessible to everyone. Explore the wonders of the universe.',
    image: 'https://picsum.photos/seed/bookAstrophysics/800/600',
    averageRating: 4.9,
    reviewCount: 3210,
    category: 'Books',
    brand: 'Stellar Press',
    specifications: [
        { name: 'Author', value: 'Dr. Evelyn Reed' },
        { name: 'Genre', value: 'Popular Science' },
        { name: 'Pages', value: '280' },
        { name: 'Format', value: 'Hardcover' }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 7,
    name: 'The Culinary Journey: A Cookbook',
    price: 29.99,
    description: 'Master the art of cooking with over 200 recipes from around the world. From simple weeknight meals to elaborate dinner parties.',
    image: 'https://picsum.photos/seed/bookCookbook/800/600',
    averageRating: 4.7,
    reviewCount: 980,
    category: 'Books',
    brand: 'Gourmet Publishing',
    specifications: [
        { name: 'Author', value: 'Marco Bianchi' },
        { name: 'Cuisine', value: 'International' },
        { name: 'Recipes', value: '215' },
        { name: 'Format', value: 'Hardcover' }
    ],
    reviews: [],
    questions: []
  },
  
  // Home & Kitchen
  {
    id: 8,
    name: 'FusionBlend Pro Blender',
    price: 129.95,
    description: 'High-speed blender with a powerful 1200W motor. Perfect for smoothies, soups, and crushing ice. Includes a 64oz BPA-free container.',
    image: 'https://picsum.photos/seed/blenderPro/800/600',
    averageRating: 4.7,
    reviewCount: 1500,
    category: 'Home & Kitchen',
    brand: 'FusionBlend',
    specifications: [
        { name: 'Motor', value: '1200 Watts' },
        { name: 'Capacity', value: '64 oz' },
        { name: 'Material', value: 'BPA-Free Tritan' },
        { name: 'Speeds', value: 'Variable Speed Control + 3 Presets' }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 9,
    name: 'CrispAir Digital Air Fryer',
    price: 99.99,
    description: 'Enjoy your favorite fried foods with up to 85% less fat. Features a 5.8-quart nonstick basket and 8 preset cooking modes.',
    image: 'https://picsum.photos/seed/airFryer/800/600',
    averageRating: 4.6,
    reviewCount: 2340,
    category: 'Home & Kitchen',
    brand: 'CrispAir',
    specifications: [
        { name: 'Capacity', value: '5.8 Quarts' },
        { name: 'Power', value: '1700 Watts' },
        { name: 'Temperature Range', value: '170°F - 400°F' },
        { name: 'Features', value: '8 Cooking Presets, Nonstick Basket' }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 10,
    name: 'Serenity Bamboo Bedding Set (Queen)',
    price: 89.99,
    description: 'Experience luxury with this ultra-soft and breathable bamboo sheet set. Naturally hypoallergenic and temperature regulating for a perfect night\'s sleep.',
    image: 'https://picsum.photos/seed/beddingSet/800/600',
    averageRating: 4.8,
    reviewCount: 1890,
    category: 'Home & Kitchen',
    brand: 'Serenity',
    specifications: [
        { name: 'Material', value: '100% Organic Bamboo Viscose' },
        { name: 'Thread Count', value: '300' },
        { name: 'Size', value: 'Queen' },
        { name: 'Includes', value: '1 Fitted Sheet, 1 Flat Sheet, 2 Pillowcases' }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 11,
    name: 'RoboClean S1 Smart Vacuum',
    price: 299.99,
    description: 'Intelligent robot vacuum with mapping technology. Strong suction for pet hair and debris. Wi-Fi connected and compatible with voice assistants.',
    image: 'https://picsum.photos/seed/roboVacuum/800/600',
    averageRating: 4.5,
    reviewCount: 950,
    category: 'Home & Kitchen',
    brand: 'RoboClean',
    specifications: [
        { name: 'Navigation', value: 'LIDAR Mapping' },
        { name: 'Suction Power', value: '2500 Pa' },
        { name: 'Battery Life', value: '150 minutes' },
        { name: 'Features', value: 'App Control, No-Go Zones, Auto-Recharge' }
    ],
    reviews: [],
    questions: []
  },
  
  // Apparel
  {
    id: 12,
    name: 'Summit All-Weather Jacket',
    price: 189.95,
    description: 'A waterproof and breathable jacket designed for any adventure. Features a durable outer shell, sealed seams, and an adjustable hood.',
    image: 'https://picsum.photos/seed/jacket/800/600',
    averageRating: 4.9,
    reviewCount: 880,
    category: 'Apparel',
    brand: 'NorthPeak',
    specifications: [
        { name: 'Material', value: 'Gore-Tex Paclite' },
        { name: 'Waterproofing', value: '28,000mm' },
        { name: 'Breathability', value: '15,000 g/m²/24h' },
        { name: 'Pockets', value: '3 external, 1 internal' }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 13,
    name: 'FlexRun Athletic Sneakers',
    price: 119.99,
    description: 'Lightweight and flexible running shoes with responsive cushioning. The engineered mesh upper provides breathability and support.',
    image: 'https://picsum.photos/seed/sneakers/800/600',
    averageRating: 4.6,
    reviewCount: 1320,
    category: 'Apparel',
    brand: 'Momentum',
    specifications: [
        { name: 'Use', value: 'Road Running' },
        { name: 'Cushioning', value: 'High-rebound EVA foam' },
        { name: 'Heel-to-toe drop', value: '8mm' },
        { name: 'Weight', value: '9.2 oz (Men\'s size 9)' }
    ],
    reviews: [],
    questions: []
  },
  {
    id: 14,
    name: 'Classic Comfort Cotton T-Shirt',
    price: 24.50,
    description: 'Made from 100% premium Pima cotton, this t-shirt offers superior softness and durability. A timeless wardrobe essential.',
    image: 'https://picsum.photos/seed/tshirt/800/600',
    averageRating: 4.7,
    reviewCount: 3500,
    category: 'Apparel',
    brand: 'EverWear',
    specifications: [
        { name: 'Material', value: '100% Pima Cotton' },
        { name: 'Fit', value: 'Modern Fit' },
        { name: 'Origin', value: 'Made in Peru' },
        { name: 'Care', value: 'Machine wash cold, tumble dry low' }
    ],
    reviews: [],
    questions: []
  },
  
  // Health & Beauty
  {
    id: 15,
    name: 'SonicGlow Electric Toothbrush',
    price: 79.99,
    description: 'Removes up to 10x more plaque than a manual toothbrush. Features 5 brushing modes, a pressure sensor, and a 2-minute timer.',
    image: 'https://picsum.photos/seed/toothbrush/800/600',
    averageRating: 4.8,
    reviewCount: 4100,
    category: 'Health & Beauty',
    brand: 'SonicGlow',
    specifications: [],
    reviews: [],
    questions: []
  },
  {
    id: 16,
    name: 'Revitalize Skincare Starter Set',
    price: 59.00,
    description: 'A complete 3-step routine for radiant skin. Includes a gentle cleanser, hydrating serum, and a daily moisturizer with SPF 30.',
    image: 'https://picsum.photos/seed/skincare/800/600',
    averageRating: 4.6,
    reviewCount: 760,
    category: 'Health & Beauty',
    brand: 'Revitalize',
    specifications: [],
    reviews: [],
    questions: []
  },

  // Toys & Games
  {
    id: 17,
    name: 'Galaxy Explorer Lego Set',
    price: 99.99,
    description: 'Build an epic spaceship with this 1200-piece Lego set. Features a detailed cockpit, retractable landing gear, and astronaut minifigures.',
    image: 'https://picsum.photos/seed/lego/800/600',
    averageRating: 4.9,
    reviewCount: 1100,
    category: 'Toys & Games',
    brand: 'LEGO',
    specifications: [],
    reviews: [],
    questions: []
  },
  {
    id: 18,
    name: 'Settlers of the Island Board Game',
    price: 49.95,
    description: 'A game of strategy and resource management. Compete to build settlements and cities on a newly discovered island. For 3-4 players.',
    image: 'https://picsum.photos/seed/boardgame/800/600',
    averageRating: 4.8,
    reviewCount: 5600,
    category: 'Toys & Games',
    brand: 'Island Games',
    specifications: [],
    reviews: [],
    questions: []
  },
  
  // Sports & Outdoors
  {
    id: 19,
    name: 'ZenFlow Yoga Mat',
    price: 39.99,
    description: 'Extra-thick, non-slip yoga mat for superior comfort and stability. Made from eco-friendly TPE material. Includes a carrying strap.',
    image: 'https://picsum.photos/seed/yogamat/800/600',
    averageRating: 4.7,
    reviewCount: 2200,
    category: 'Sports & Outdoors',
    brand: 'ZenFlow',
    specifications: [],
    reviews: [],
    questions: []
  },
  {
    id: 20,
    name: 'Trailblazer 4-Person Tent',
    price: 179.99,
    description: 'Spacious and easy to set up, this tent is perfect for family camping trips. Weatherproof design with excellent ventilation.',
    image: 'https://picsum.photos/seed/tent/800/600',
    averageRating: 4.6,
    reviewCount: 650,
    category: 'Sports & Outdoors',
    brand: 'Trailblazer',
    specifications: [],
    reviews: [],
    questions: []
  },
  {
    id: 21,
    name: 'HydroFlask Insulated Water Bottle',
    price: 34.95,
    description: 'Keep your drinks cold for 24 hours or hot for 12. Durable stainless steel construction with a leak-proof lid. 32 oz capacity.',
    image: 'https://picsum.photos/seed/waterbottle/800/600',
    averageRating: 4.9,
    reviewCount: 15000,
    category: 'Sports & Outdoors',
    brand: 'HydroFlask',
    specifications: [],
    reviews: [],
    questions: []
  }
];