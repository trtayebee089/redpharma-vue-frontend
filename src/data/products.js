import { reactive } from "vue";

export const products = reactive([
  {
    id: 1,
    name: 'Paracetamol 500mg',
    shortDescription: 'Pain & fever relief',
    quantity: 0,
    categoryId: 1, // Tablets
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 2.5,
    strength: '500mg',
    packSize: '10 tablets'
  },
  {
    id: 2,
    name: 'Vitamin C 1000mg',
    shortDescription: 'Boost immunity',
    quantity: 0,
    categoryId: 11, // Vitamins & Supplements
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 3.0,
    strength: '1000mg',
    packSize: '30 tablets'
  },
  {
    id: 3,
    name: 'Cough Syrup',
    shortDescription: 'Relieves cough',
    quantity: 0,
    categoryId: 3, // Liquids & Syrups
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 4.5,
    strength: '100ml',
    packSize: '1 bottle'
  },
  {
    id: 4,
    name: 'Insulin',
    shortDescription: 'Diabetes care',
    quantity: 0,
    categoryId: 4, // Injections
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 25.0,
    strength: '10ml',
    packSize: '1 vial'
  },
  {
    id: 5,
    name: 'Amoxicillin 250mg',
    shortDescription: 'Antibiotic',
    quantity: 0,
    categoryId: 1, // Tablets
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 5.0,
    strength: '250mg',
    packSize: '14 tablets'
  },
  {
    id: 6,
    name: 'Ibuprofen 400mg',
    shortDescription: 'Pain & inflammation',
    quantity: 0,
    categoryId: 1, // Tablets
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 3.5,
    strength: '400mg',
    packSize: '10 tablets'
  },
  {
    id: 7,
    name: 'Vitamin D 2000 IU',
    shortDescription: 'Bone & immune health',
    quantity: 0,
    categoryId: 11, // Vitamins & Supplements
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 4.0,
    strength: '2000 IU',
    packSize: '30 tablets'
  },
  {
    id: 8,
    name: 'Paracetamol Syrup',
    shortDescription: 'Fever & pain relief for kids',
    quantity: 0,
    categoryId: 3, // Liquids & Syrups
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 3.5,
    strength: '60ml',
    packSize: '1 bottle'
  },
  {
    id: 9,
    name: 'Insulin Glargine',
    shortDescription: 'Long-acting insulin',
    quantity: 0,
    categoryId: 4, // Injections
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 30.0,
    strength: '10ml',
    packSize: '1 vial'
  },
  {
    id: 10,
    name: 'Hydrocortisone Cream',
    shortDescription: 'Relieves itching & rash',
    quantity: 0,
    categoryId: 7, // Ointments & Creams
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 6.0,
    strength: '15g',
    packSize: '1 tube'
  },
  {
    id: 11,
    name: 'Salbutamol Inhaler',
    shortDescription: 'Asthma relief',
    quantity: 0,
    categoryId: 5, // Inhalers
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 12.0,
    strength: '100mcg',
    packSize: '1 inhaler'
  },
  {
    id: 12,
    name: 'Eye Drops',
    shortDescription: 'Redness & dryness relief',
    quantity: 0,
    categoryId: 6, // Eye/Ear Drops
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 5.0,
    strength: '10ml',
    packSize: '1 bottle'
  },
  {
    id: 13,
    name: 'Vitamin B Complex',
    shortDescription: 'Energy & metabolism',
    quantity: 0,
    categoryId: 11, // Vitamins & Supplements
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 4.5,
    strength: '1 tablet',
    packSize: '30 tablets'
  },
  {
    id: 14,
    name: 'First Aid Bandage',
    shortDescription: 'Cuts & wounds care',
    quantity: 0,
    categoryId: 12, // First Aid & Bandages
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 2.0,
    strength: '-',
    packSize: '1 roll'
  },
  {
    id: 15,
    name: 'Ointment for Burns',
    shortDescription: 'Soothes minor burns',
    quantity: 0,
    categoryId: 7, // Ointments & Creams
    image: 'https://www.akaciamedical.co.za/wp-content/uploads/woocommerce-placeholder.png',
    price: 7.0,
    strength: '20g',
    packSize: '1 tube'
  }
]);
