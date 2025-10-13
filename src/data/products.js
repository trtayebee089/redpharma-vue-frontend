import { ref } from 'vue';
import { categories } from './categories';

const sampleImages = [
  'https://placehold.co/1080x620',
  'https://placehold.co/1080x620',
  'https://placehold.co/1080x620',
  'https://placehold.co/1080x620',
  'https://placehold.co/1080x620',
];

export const products = ref([
  { 
    id: 1, 
    name: 'Paracetamol 500mg', 
    brand: 'RedPharma', 
    categoryId: categories[0].id, 
    image: sampleImages[0], 
    regularPrice: 12, 
    offerPrice: 9,
    discountPercent: 25,
    strength: '500mg',
    packSize: '10 tablets',
    quantity: 0,
    shortDescription: 'Pain & fever relief',
    description: 'Paracetamol 500mg helps reduce pain and fever. Suitable for adults and children.',
    doses: ['Take 1 tablet every 6 hours as needed.', 'Do not exceed 4 tablets in 24 hours.'],
    genericName: 'Paracetamol'  // ✅ added
  },
  { 
    id: 2, 
    name: 'Ibuprofen 200mg', 
    brand: 'BluePharma', 
    categoryId: categories[0].id, 
    image: sampleImages[1], 
    regularPrice: 12, 
    offerPrice: 9,
    discountPercent: 25,
    strength: '200mg',
    packSize: '10 tablets',
    quantity: 0,
    shortDescription: 'Anti-inflammatory & pain relief',
    description: 'Ibuprofen 200mg is used to reduce inflammation and pain.',
    doses: ['Take 1 tablet every 8 hours.', 'Do not exceed 6 tablets in 24 hours.'],
    genericName: 'Ibuprofen'
  },
  { 
    id: 3, 
    name: 'Amoxicillin 500mg', 
    brand: 'GreenPharma', 
    categoryId: categories[1].id, 
    image: sampleImages[2], 
    regularPrice: 15, 
    offerPrice: 12,
    discountPercent: 20,
    strength: '500mg',
    packSize: '14 capsules',
    quantity: 0,
    shortDescription: 'Antibiotic for infections',
    description: 'Amoxicillin is an antibiotic for bacterial infections.',
    doses: ['Take 1 capsule every 8 hours.', 'Complete the full course.'],
    genericName: 'Ibuprofen'
  },
  { 
    id: 4, 
    name: 'Cough Syrup 100ml', 
    brand: 'RedPharma', 
    categoryId: categories[2].id, 
    image: sampleImages[3], 
    regularPrice: 8, 
    offerPrice: 6,
    discountPercent: 25,
    strength: '100ml',
    packSize: '1 bottle',
    quantity: 0,
    shortDescription: 'Relieves cough & throat irritation',
    description: 'Relieves cough and throat irritation.',
    doses: ['Take 10ml three times daily.', 'Shake well before use.'],
    genericName: 'Dextromethorphan'
  },
  { 
    id: 5, 
    name: 'Vitamin D3 1000IU', 
    brand: 'HealthPlus', 
    categoryId: categories[10].id, 
    image: sampleImages[4], 
    regularPrice: 20, 
    offerPrice: 15,
    discountPercent: 25,
    strength: '1000IU',
    packSize: '30 capsules',
    quantity: 0,
    shortDescription: 'Supports bone health',
    description: 'Vitamin D3 helps maintain healthy bones and teeth.',
    doses: ['Take 1 capsule daily.', 'Preferably after food.'],
    genericName: 'Cholecalciferol (Vitamin D3)'
  },
  // ... continue same for all products
]);
