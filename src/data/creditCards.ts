
export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  type: 'premium' | 'super-premium' | 'entry-level' | 'mid-tier';
  annualFee: number;
  joiningFee: number;
  rewardRate: string;
  welcomeBonus: string;
  loungeAccess: boolean;
  fuelSurcharge: boolean;
  minSalary: number;
  benefits: string[];
  categories: string[];
  imageUrl: string;
  color: string;
  rating: number;
  description: string;
  keyHighlights: string[];
  restrictions: string[];
  offerHistory?: {
    date: string;
    offer: string;
    type: 'welcome' | 'cashback' | 'waiver';
  }[];
}

export const creditCardsData: CreditCard[] = [
  {
    id: 'hdfc-regalia',
    name: 'HDFC Regalia',
    bank: 'HDFC Bank',
    type: 'premium',
    annualFee: 2500,
    joiningFee: 2500,
    rewardRate: '4 reward points per ₹150',
    welcomeBonus: '10,000 reward points',
    loungeAccess: true,
    fuelSurcharge: false,
    minSalary: 300000,
    benefits: [
      'Complimentary airport lounge access',
      'Golf privileges at premium courses',
      '1% fuel surcharge waiver',
      'Concierge services',
      'Travel insurance up to ₹1 crore'
    ],
    categories: ['travel', 'dining', 'shopping', 'fuel'],
    imageUrl: '/api/placeholder/300/190',
    color: '#1e40af',
    rating: 4.3,
    description: 'A premium lifestyle credit card with excellent travel benefits and reward points.',
    keyHighlights: [
      'High reward rate on all spends',
      'Comprehensive travel insurance',
      'Premium airport lounge access'
    ],
    restrictions: [
      'High income requirement',
      'Annual fee waiver conditions apply'
    ],
    offerHistory: [
      { date: '2024-12', offer: 'Annual fee waiver for first year', type: 'waiver' },
      { date: '2024-11', offer: '15,000 bonus points on ₹1L spend', type: 'welcome' },
      { date: '2024-10', offer: '5% cashback on dining', type: 'cashback' }
    ]
  },
  {
    id: 'axis-magnus',
    name: 'Axis Magnus',
    bank: 'Axis Bank',
    type: 'super-premium',
    annualFee: 12500,
    joiningFee: 12500,
    rewardRate: '12 EDGE points per ₹200',
    welcomeBonus: '25,000 EDGE points',
    loungeAccess: true,
    fuelSurcharge: false,
    minSalary: 1500000,
    benefits: [
      'Unlimited domestic lounge access',
      '12 international lounge visits',
      'Golf privileges at 500+ courses',
      'Concierge services',
      'Travel insurance up to ₹5 crores',
      'Priority Pass membership'
    ],
    categories: ['travel', 'dining', 'shopping', 'international'],
    imageUrl: '/api/placeholder/300/190',
    color: '#dc2626',
    rating: 4.6,
    description: 'Ultra-premium credit card with exceptional travel benefits and highest reward rates.',
    keyHighlights: [
      'Best-in-class reward rate',
      'Unlimited domestic lounge access',
      'Premium travel insurance coverage'
    ],
    restrictions: [
      'Very high income requirement',
      'Expensive annual fee'
    ],
    offerHistory: [
      { date: '2024-12', offer: '50,000 bonus points on ₹2L spend', type: 'welcome' },
      { date: '2024-11', offer: 'Golf membership worth ₹25,000', type: 'welcome' },
      { date: '2024-10', offer: '10% cashback on international spends', type: 'cashback' }
    ]
  },
  {
    id: 'icici-amazon-pay',
    name: 'ICICI Amazon Pay',
    bank: 'ICICI Bank',
    type: 'entry-level',
    annualFee: 0,
    joiningFee: 0,
    rewardRate: '5% cashback on Amazon',
    welcomeBonus: '₹2000 Amazon voucher',
    loungeAccess: false,
    fuelSurcharge: true,
    minSalary: 200000,
    benefits: [
      '5% cashback on Amazon purchases',
      '2% cashback on bill payments',
      '1% cashback on other purchases',
      'No annual fee',
      'Instant digital card'
    ],
    categories: ['online shopping', 'bill payments', 'everyday spend'],
    imageUrl: '/api/placeholder/300/190',
    color: '#f97316',
    rating: 4.2,
    description: 'Perfect entry-level card for Amazon shopping with excellent cashback rates.',
    keyHighlights: [
      'No annual fee lifetime',
      'High cashback on Amazon',
      'Easy approval process'
    ],
    restrictions: [
      'Limited lounge access',
      'Cashback capped monthly'
    ],
    offerHistory: [
      { date: '2024-12', offer: '₹3000 Amazon voucher on approval', type: 'welcome' },
      { date: '2024-11', offer: '7% cashback on Amazon for Prime members', type: 'cashback' },
      { date: '2024-10', offer: 'No processing fee', type: 'waiver' }
    ]
  },
  {
    id: 'sbi-elite',
    name: 'SBI Elite',
    bank: 'State Bank of India',
    type: 'premium',
    annualFee: 4999,
    joiningFee: 4999,
    rewardRate: '5 reward points per ₹100',
    welcomeBonus: '20,000 reward points',
    loungeAccess: true,
    fuelSurcharge: false,
    minSalary: 500000,
    benefits: [
      '8 domestic lounge visits',
      '4 international lounge visits',
      'Golf privileges',
      'Travel insurance',
      'Concierge services',
      'Priority customer service'
    ],
    categories: ['travel', 'dining', 'entertainment', 'shopping'],
    imageUrl: '/api/placeholder/300/190',
    color: '#059669',
    rating: 4.1,
    description: 'Premium card from India\'s largest bank with comprehensive travel benefits.',
    keyHighlights: [
      'Good reward rate',
      'Trusted bank network',
      'Comprehensive insurance'
    ],
    restrictions: [
      'Limited lounge visits',
      'Reward redemption conditions'
    ],
    offerHistory: [
      { date: '2024-12', offer: 'First year fee waiver', type: 'waiver' },
      { date: '2024-11', offer: '25,000 bonus points on ₹1.5L spend', type: 'welcome' },
      { date: '2024-10', offer: '3% cashback on travel bookings', type: 'cashback' }
    ]
  },
  {
    id: 'amex-platinum-travel',
    name: 'American Express Platinum Travel',
    bank: 'American Express',
    type: 'super-premium',
    annualFee: 60000,
    joiningFee: 60000,
    rewardRate: '5 MR points per ₹100',
    welcomeBonus: '80,000 MR points',
    loungeAccess: true,
    fuelSurcharge: false,
    minSalary: 2500000,
    benefits: [
      'Unlimited airport lounge access worldwide',
      'Centurion Lounge access',
      'Fine Hotels & Resorts program',
      'Concierge services 24/7',
      'Travel insurance up to ₹10 crores',
      'Priority Pass Black membership'
    ],
    categories: ['luxury travel', 'dining', 'hotels', 'international'],
    imageUrl: '/api/placeholder/300/190',
    color: '#6366f1',
    rating: 4.8,
    description: 'Ultra-luxury credit card with unmatched travel privileges and concierge services.',
    keyHighlights: [
      'Unlimited worldwide lounge access',
      'Premium hotel benefits',
      'Exceptional customer service'
    ],
    restrictions: [
      'Very high annual fee',
      'Limited merchant acceptance',
      'High income requirement'
    ],
    offerHistory: [
      { date: '2024-12', offer: '1,00,000 MR points on ₹4L spend', type: 'welcome' },
      { date: '2024-11', offer: 'Taj Hotel membership worth ₹50,000', type: 'welcome' },
      { date: '2024-10', offer: '10% cashback on international travel', type: 'cashback' }
    ]
  },
  {
    id: 'kotak-white-reserve',
    name: 'Kotak White Reserve',
    bank: 'Kotak Mahindra Bank',
    type: 'super-premium',
    annualFee: 10000,
    joiningFee: 10000,
    rewardRate: '10 reward points per ₹100',
    welcomeBonus: '50,000 reward points',
    loungeAccess: true,
    fuelSurcharge: false,
    minSalary: 1000000,
    benefits: [
      'Unlimited domestic lounge access',
      '6 international lounge visits',
      'Golf privileges',
      'Concierge services',
      'Travel insurance',
      'Movie ticket offers'
    ],
    categories: ['travel', 'entertainment', 'dining', 'lifestyle'],
    imageUrl: '/api/placeholder/300/190',
    color: '#0891b2',
    rating: 4.4,
    description: 'Premium lifestyle card with excellent entertainment and travel benefits.',
    keyHighlights: [
      'High reward rate',
      'Unlimited domestic lounges',
      'Great entertainment offers'
    ],
    restrictions: [
      'Annual fee conditions',
      'Reward point expiry'
    ],
    offerHistory: [
      { date: '2024-12', offer: 'Annual fee waiver on ₹5L spend', type: 'waiver' },
      { date: '2024-11', offer: '60,000 bonus points on joining', type: 'welcome' },
      { date: '2024-10', offer: 'Free movie tickets for 6 months', type: 'welcome' }
    ]
  }
];

export const bankLogos = {
  'HDFC Bank': '🏦',
  'Axis Bank': '🏛️',
  'ICICI Bank': '🏢',
  'State Bank of India': '🏪',
  'American Express': '💳',
  'Kotak Mahindra Bank': '🏦'
};

export const categoryIcons = {
  'travel': '✈️',
  'dining': '🍽️',
  'shopping': '🛍️',
  'fuel': '⛽',
  'entertainment': '🎬',
  'online shopping': '💻',
  'bill payments': '📱',
  'everyday spend': '🏪',
  'international': '🌍',
  'luxury travel': '✨',
  'hotels': '🏨',
  'lifestyle': '💫'
};
