import { createI18n } from "vue-i18n";

const messages = {
    en: {
        header: {
            searchPlaceHolders: [
                "Search medicines... (Ex: Napa)",
                "Search by brand... (Ex: Acme Pharma)",
                "Search by category... (Ex: Pain Relief)",
                "Find your prescription... (Ex: Antibiotics)"
            ],
            buttons: {
                coverage: "Coverage",
                login: "Login / Sign Up",
                cart: "Cart",
                track: "Track Order",
                subscribe: "Subscribe",
                logout: "Logout"
            },
            menu: {
                home: "Home",
                about: "About Us",
                services: "Services",
                category: "Categories",
                products: "Products",
                blog: "Blog",
                contact: "Contact Us",
                privacy: "Privacy Policy",
                terms: "Terms of Service",
                coverage: "Coverage Area",
                remove_account: "Remove Account",
                request: "Request Medicines",
                help: "Help Center",
                returns: "Returns & Refunds",
                orders: "My Orders",
                settings: "Settings",
                membership: "Membership",
                logout: "Logout",
                profile: "Profile",
                orders: "Orders",
                cart: "Cart",
            },
        },
        home: {
            hero_section: {
                slides: [
                    {
                        title: "RedPharma BD",
                        subtitle: "Your Trusted Online Pharmacy in Bangladesh",
                        description:
                            "Get genuine medicines delivered fast & safely across Bangladesh. Explore a wide range of medicines, healthcare products, and wellness solutions.",
                        bg: "https://img.freepik.com/free-photo/abstract-blur-shopping-mall_1203-8821.jpg",
                        buttons: {
                            call: "Call Now",
                            whatsapp: "WhatsApp"
                        }
                    },
                    {
                        title: "Expert Healthcare Services",
                        subtitle: "Consult Certified Doctors & Access Lab Tests from Home",
                        description:
                            "Connect with qualified healthcare professionals and order lab tests online without leaving your home. Fast, safe, and reliable.",
                        bg: "https://img.freepik.com/free-photo/abstract-blur-defocused-pharmacy-drug-store_1203-9459.jpg",
                        buttons: {
                            call: "Call Now",
                            whatsapp: "WhatsApp"
                        }
                    },
                    {
                        title: "24/7 Customer Care & Support",
                        subtitle: "We’re Always Here to Assist You",
                        description:
                            "Our dedicated support team ensures smooth order placement, timely delivery, and professional advice for all your healthcare needs.",
                        bg: "https://img.freepik.com/free-photo/abstract-blur-shopping-mall_74190-5812.jpg",
                        buttons: {
                            call: "Call Now",
                            whatsapp: "WhatsApp"
                        }
                    },
                ],
            },
            "cta_section": {
                "upload": {
                    "title": "Upload Your Prescription",
                    "description": "Easily upload your medical prescription and order your medicines online with just a few clicks.",
                    "button": "Upload Now"
                },
                "how_it_works": {
                    "title": "How Does Upload Work?",
                    "steps": [
                        "Capture a clear photo of your prescription.",
                        "Login to upload the photo.",
                        "Our expert pharmacists will verify your prescription.",
                        "Our customer agent will call you to confirm the order."
                    ]
                }
            },
            quick_actions: [
                { text: "Book Appointment", link: "tel:+8801997202010", bg: "bg-red-200", textColor: "text-red-800", icon: "pi pi-calendar" },
                { text: "Call To Order", link: "tel:+8801997202010", bg: "bg-green-400", textColor: "text-green-800", icon: "pi pi-phone" },
                { text: "Doctor Consultation", link: "tel:+8801997202010", bg: "bg-red-200", textColor: "text-red-800", icon: "pi pi-user-md" },
            ],
            how_to_order: {
                title: "How to Order Medicines",
                steps: [
                    "Browse our medicines catalog and select the products you need.",
                    "Upload your prescription securely through our platform.",
                    "Review your order and provide your delivery details.",
                    "Our pharmacists verify your prescription and confirm your order.",
                    "Receive your medicines at your doorstep quickly and safely."
                ]
            },
            testimonials: {
                title: "What Our Customers Say",
                description: "Real experiences from our valued customers."
            },
            product_categories: "Product Categories",
            featured_products: "Featured Products",
            best_selling: "Best Selling Products",
            health_articles: "Health Articles",
            view_all: "View All",
            impact_counter: 'Our Impact in Numbers'
        },
        about: {
            about_us: "About Us",
            title: "Best Online Pharmacy and Healthcare Platform in Bangladesh",
            shortDescription: "RedPharma is Bangladesh’s most trusted online pharmacy and healthcare platform. Access medicines, doctor consultations, lab tests, and more, all from the comfort of your home.",
            why_us: [
                {
                    heading: "Benefits of Using RedPharma",
                    type: "list",
                    items: [
                        "Convenient access to medicines and healthcare services from home.",
                        "Comprehensive database of healthcare providers across Bangladesh.",
                        "24/7 customer support for all your needs.",
                        "Secure and easy-to-use platform.",
                        "Regular discounts and special deals to save money.",
                    ]
                },
                {
                    heading: "Convenience & Affordability",
                    type: "paragraphs",
                    items: [
                        "Order medicines online and get them delivered to your doorstep. RedPharma’s mobile app lets you manage orders and prescriptions easily. Save on both generic and branded medicines with transparent pricing and regular discounts.",
                        "All medicines meet strict quality standards. Refill prescriptions quickly through the website or app with auto-refill reminders. RedPharma offers a wide range of medicines, OTC products, herbal remedies, and personal care items."
                    ]
                }
            ],
            services: {
                title: "Services Offered by RedPharma",
                items: [
                    { title: "Medicine Delivery", description: "Fast and reliable delivery to your doorstep." },
                    { title: "Doctor Consultation", description: "Access qualified medical professionals online." },
                    { title: "Lab Tests", description: "Order lab tests online and receive results quickly." },
                    { title: "Health Records", description: "Manage medical history and prescriptions securely." },
                    { title: "Medical Advice & Support", description: "Get expert guidance from healthcare professionals." },
                    { title: "Healthcare Provider Database", description: "Find and compare doctors and clinics in your area." },
                    // { title: "Discounts & Deals", description: "Save on medicine delivery, consultations, and lab tests." }
                ]
            },
            best_selling: {
                title: "Our Best Selling Medicines"
            }
        },
        cart: {
            title: "My Shopping Cart",
            description: "Review your selected items, adjust quantities, and proceed to checkout.",
            summary: "Order Summary",
            subtotal: "Subtotal",
            shipping: "Shipping Fee",
            grand: "Grand Total",
            alert: "Your cart is empty. Please Add some products first for checkout.",
            form: {
                name: "Full name",
                phone: "Phone Number",
                address: "Shipping Address"
            },
            table: {
                thead: {
                    product: "Product",
                    price: "Unit Price",
                    qty: "Quantity",
                    total: "Total Amount",
                    action: "Action"
                }
            }
        },
        orderConfirmation: {
            title: "Order Confirmation",
            description: "Thank you for your order."
        },
        tracking: {
            title: "Track Your Order",
            description: "Enter your mobile order number in the box above to check your delivery status, view updates, and follow your package journey in real time.",
            placeholder: "Enter your tracking number here...",
            button: "Track Order",
            not_found: "No order found with this tracking number. Please check and try again.",
            loading: "Checking order status...",
        },
        membership: {
            title: "Membership Plans",
            description: "Earn points on your purchases and enjoy exclusive discounts based on your tier!",
            next_tier: "Next Tier",
            benefits: "Benefits",
            points: "Points",
            discount: "Discount",
            points_needed: "Points Needed",
            recent_usage: "Recent Points Usage",
            current_points: "Current Points",
            current_tier: "Current Tier",
            other_cards: "Our Membership Plans & Discounts"
        },
        footer: {
            title: "Quality Medicines, Trusted Care",
            description: "RedPharma BD is your trusted online pharmacy in Bangladesh. Fast delivery, genuine medicines, and top healthcare products.",
            headings: {
                quick_actions: "Quick Actions",
                services: "Our Services",
                contact: "Get in Touch",
                newsletter: "Subscribe to Our Newsletter",
            }
        },
        redundreturn: {
            title: "Refund & Returns Policy",
            description: "Last updated: January 2026"
        },
        add_to_cart: "Add to Cart",
        read_more: "Read More",
        view_all: "View All",
        contact_us: "Contact Us",
    },
    bn: {
        header: {
            searchPlaceHolders: [
                "ওষুধ খুঁজুন... (যেমন: Napa)",
                "ব্র্যান্ড অনুসারে খুঁজুন... (যেমন: Beximco)",
                "ক্যাটাগরি অনুসারে খুঁজুন... (যেমন: Pain Relief)",
                "আপনার প্রেসক্রিপশন খুঁজুন... (যেমন: Antibiotics)"
            ],
            buttons: {
                coverage: "কভারেজ",
                login: "লগইন / সাইন আপ",
                cart: "কার্ট",
                track: "অর্ডার ট্র্যাক",
                subscribe: "সাবস্ক্রাইব করুন",
                logout: "লগ আউট",
            },
            menu: {
                home: "হোম",
                about: "আমাদের সম্পর্কে",
                services: "সেবা সমূহ",
                category: "ঔষধের ধরন সমূহ",
                products: "পণ্য",
                blog: "ব্লগ",
                contact: "যোগাযোগ করুন",
                privacy: "প্রাইভেসি পলিসি",
                terms: "সেবার শর্তাবলী",
                coverage: "কভারেজ এলাকা",
                request: "ওষুধের অনুরোধ",
                help: "হেল্প সেন্টার",
                returns: "রিটার্ন ও রিফান্ড",
                orders: "আমার অর্ডার",
                settings: "সেটিংস",
                membership: "সদস্যপদ",
                logout: "লগআউট",
                profile: "প্রোফাইল",
                cart: "কার্ট",
            },
        },
        home: {
            hero_section: {
                slides: [
                    {
                        title: "রেডফার্মা বিডি",
                        subtitle: "বাংলাদেশে আপনার বিশ্বস্ত অনলাইন ফার্মেসি",
                        description:
                            "আসল ওষুধ দ্রুত ও নিরাপদে বাংলাদেশের যেকোনো স্থানে ডেলিভারি। ওষুধ, স্বাস্থ্যপণ্য ও সুস্থতা সমাধানের বিস্তৃত সংগ্রহ ঘরে বসে পান।",
                        bg: "https://img.freepik.com/free-photo/abstract-blur-shopping-mall_1203-8821.jpg",
                        buttons: {
                            call: "Call Now",
                            whatsapp: "WhatsApp"
                        }
                    },
                    {
                        title: "বিশেষজ্ঞ স্বাস্থ্যসেবা",
                        subtitle: "সার্টিফাইড ডাক্তারদের সাথে পরামর্শ করুন ও বাসা থেকে ল্যাব টেস্ট করুন",
                        description:
                            "যোগ্য স্বাস্থ্য বিশেষজ্ঞদের সাথে সংযুক্ত হোন এবং বাসা থেকে অনলাইনে ল্যাব টেস্ট অর্ডার করুন। দ্রুত, নিরাপদ ও নির্ভরযোগ্য।",
                        bg: "https://img.freepik.com/free-photo/abstract-blur-defocused-pharmacy-drug-store_1203-9459.jpg",
                        buttons: {
                            call: "Call Now",
                            whatsapp: "WhatsApp"
                        }
                    },
                    {
                        title: "২৪/৭ কাস্টমার কেয়ার ও সাপোর্ট",
                        subtitle: "আমরা সবসময় আপনার পাশে আছি",
                        description:
                            "আমাদের নিবেদিত সাপোর্ট টিম নিশ্চিত করে সহজ অর্ডার প্লেসমেন্ট, সময়মতো ডেলিভারি এবং স্বাস্থ্যসেবা সম্পর্কিত পেশাদার পরামর্শ।",
                        bg: "https://img.freepik.com/free-photo/abstract-blur-shopping-mall_74190-5812.jpg",
                        buttons: {
                            call: "Call Now",
                            whatsapp: "WhatsApp"
                        }
                    },
                ],
            },
            "cta_section": {
                "upload": {
                    "title": "আপনার প্রেসক্রিপশন আপলোড করুন",
                    "description": "সহজেই আপনার প্রেসক্রিপশন আপলোড করুন এবং কয়েকটি ক্লিকেই ওষুধ অর্ডার করুন।",
                    "button": "এখনই আপলোড করুন"
                },
                "how_it_works": {
                    "title": "আপলোড কীভাবে কাজ করে?",
                    "steps": [
                        "আপনার প্রেসক্রিপশনের একটি পরিষ্কার ছবি তুলুন।",
                        "ছবিটি আপলোড করতে লগইন করুন।",
                        "আমাদের ফার্মাসিস্টরা প্রেসক্রিপশন যাচাই করবেন।",
                        "আমাদের কাস্টমার এজেন্ট অর্ডার কনফার্ম করতে কল করবেন।"
                    ]
                }
            },
            quick_actions: [
                { text: "অ্যাপয়েন্টমেন্ট নিন", link: "tel:+8801300000000", bg: "bg-red-200", textColor: "text-green-800", icon: "pi pi-calendar" },
                { text: "অর্ডার করতে কল করুন", link: "tel:+8801300000000", bg: "bg-green-400", textColor: "text-green-800", icon: "pi pi-phone" },
                { text: "ডাক্তারের পরামর্শ নিন", link: "tel:+8801300000000", bg: "bg-red-200", textColor: "text-green-800", icon: "pi pi-user-md" },
            ],
            how_to_order: {
                title: "কিভাবে ওষুধ অর্ডার করবেন",
                steps: [
                    "আমাদের ওষুধের ক্যাটালগ ব্রাউজ করুন এবং প্রয়োজনীয় পণ্য নির্বাচন করুন।",
                    "আমাদের প্ল্যাটফর্মের মাধ্যমে নিরাপদভাবে আপনার প্রেসক্রিপশন আপলোড করুন।",
                    "আপনার অর্ডার পর্যালোচনা করুন এবং ডেলিভারি বিবরণ প্রদান করুন।",
                    "আমাদের ফার্মাসিস্টরা আপনার প্রেসক্রিপশন যাচাই করে এবং অর্ডার নিশ্চিত করে।",
                    "দ্রুত ও নিরাপদভাবে আপনার দরজায় ওষুধ পৌঁছান।"
                ]
            },
            testimonials: {
                title: "আমাদের গ্রাহকরা যা বলেন",
                description: "আমাদের গ্রাহকদের কাছ থেকে আসল অভিজ্ঞতা।"
            },
            product_categories: "পণ্যের বিভাগসমূহ",
            featured_products: "বৈশিষ্ট্যযুক্ত পণ্যসমূহ",
            health_articles: "স্বাস্থ্য সম্পর্কিত নিবন্ধসমূহ",
            impact_counter: 'পরিসংখ্যানের আলোকে আমাদের অর্জন'
        },
        about: {
            about_us: "আমাদের সম্পর্কে",
            title: "বাংলাদেশের সেরা অনলাইন ফার্মেসি ও হেলথকেয়ার প্ল্যাটফর্ম",
            shortDescription: "রেডফার্মা বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন ফার্মেসি ও হেলথকেয়ার প্ল্যাটফর্ম। বাড়ির আরাম থেকে ওষুধ, ডাক্তার পরামর্শ, ল্যাব টেস্ট এবং আরও অনেক কিছু অ্যাক্সেস করুন।",

            why_us: [
                {
                    heading: "রেডফার্মা ব্যবহার করার সুবিধা",
                    type: "list",
                    items: [
                        "বাড়ি থেকেই ওষুধ ও হেলথকেয়ার সেবায় সহজ অ্যাক্সেস।",
                        "বাংলাদেশের হেলথকেয়ার প্রোভাইডারদের বিস্তৃত ডাটাবেস।",
                        "২৪/৭ গ্রাহক সহায়তা।",
                        "নিরাপদ এবং সহজ ব্যবহারের প্ল্যাটফর্ম।",
                        "নিয়মিত ডিসকাউন্ট এবং বিশেষ অফার।",
                        "স্বাস্থ্য রেকর্ড, প্রেসক্রিপশন এবং মেডিকেল পরামর্শে অ্যাক্সেস।",
                        "দ্রুত এবং নির্ভরযোগ্য ওষুধ সরবরাহ।",
                        "পেশাদার এবং অভিজ্ঞ হেলথকেয়ার প্রোভাইডারদের দ্বারা প্রদত্ত সেবা।",
                        "স্বাস্থ্য ও সুস্থতা সম্পর্কিত সঠিক এবং নির্ভরযোগ্য তথ্য।"
                    ]
                },
                {
                    heading: "সুবিধা এবং সাশ্রয়ী মূল্য",
                    type: "paragraphs",
                    items: [
                        "ওষুধ অনলাইনে অর্ডার করুন এবং সেগুলো আপনার ঠিকানায় পৌঁছে দিন। রেডফার্মার মোবাইল অ্যাপ দিয়ে অর্ডার এবং প্রেসক্রিপশন সহজেই ম্যানেজ করুন। জেনেরিক এবং ব্র্যান্ডেড উভয় ওষুধে স্বচ্ছ মূল্য এবং নিয়মিত ডিসকাউন্টের সুবিধা নিন।",
                        "সব ওষুধ কঠোর মানের মানদণ্ড পূরণ করে। ওয়েবসাইট বা অ্যাপে অটো-রিফিল রিমাইন্ডারের মাধ্যমে দ্রুত রিফিল করুন। রেডফার্মা বিস্তৃত ওষুধ, ওটিসি পণ্য, হার্বাল রিমেডি এবং পার্সোনাল কেয়ার আইটেম সরবরাহ করে।"
                    ]
                }
            ],

            services: {
                title: "রেডফার্মা প্রদত্ত সেবা",
                items: [
                    { title: "ওষুধ সরবরাহ", description: "দ্রুত এবং নির্ভরযোগ্য ডেলিভারি।" },
                    { title: "ডাক্তার পরামর্শ", description: "যোগ্য মেডিকেল প্রফেশনালদের অনলাইন অ্যাক্সেস।" },
                    { title: "ল্যাব টেস্ট", description: "অনলাইনে ল্যাব টেস্ট অর্ডার করুন এবং দ্রুত ফলাফল পান।" },
                    { title: "স্বাস্থ্য রেকর্ড", description: "মেডিকেল হিস্ট্রি, ল্যাব ফলাফল এবং প্রেসক্রিপশন নিরাপদে ম্যানেজ করুন।" },
                    { title: "মেডিকেল পরামর্শ ও সহায়তা", description: "হেলথকেয়ার প্রফেশনালদের কাছ থেকে এক্সপার্ট গাইডলাইন পান।" },
                    { title: "হেলথকেয়ার প্রোভাইডার ডাটাবেস", description: "আপনার এলাকার ডাক্তার ও ক্লিনিক খুঁজুন এবং তুলনা করুন।" },
                    // { title: "ডিসকাউন্ট ও ডিল", description: "ওষুধ সরবরাহ, পরামর্শ এবং ল্যাব টেস্টে সাশ্রয় করুন।" }
                ]
            },

            best_selling: {
                title: "সেরা বিক্রিত ওষুধসমূহ"
            }
        },
        cart: {
            title: "আমার শপিং কার্ট",
            description: "আপনার নির্বাচিত আইটেমগুলি পর্যালোচনা করুন, পরিমাণ সমন্বয় করুন, এবং চেকআউট করুন।",
            summary: "অর্ডার সংক্ষিপ্তসার",
            subtotal: "মোট অংশ",
            shipping: "শিপিং ফি",
            grand: "মোট মূল্য",
            form: {
                name: "পূর্ণ নাম",
                phone: "ফোন নম্বর",
                address: "শিপিং ঠিকানা"
            },
            table: {
                thead: {
                    product: "পণ্য",
                    price: "একক মূল্য",
                    qty: "পরিমাণ",
                    total: "মোট মূল্য",
                    action: "ক্রিয়া"
                }
            }
        },
        orderConfirmation: {
            title: "অর্ডার নিশ্চিতকরণ",
            description: "আপনার অর্ডারের জন্য ধন্যবাদ।"
        },
        tracking: {
            title: "আপনার অর্ডার ট্র্যাক করুন",
            description: "উপরের বক্সে আপনার অর্ডার নম্বরটি লিখে ডেলিভারি স্ট্যাটাস, আপডেট এবং রিয়েল-টাইমে প্যাকেজের অবস্থান দেখতে পারেন।",
            placeholder: "এখানে আপনার ট্র্যাকিং নম্বর লিখুন...",
            button: "অর্ডার ট্র্যাক করুন",
            not_found: "এই ট্র্যাকিং নম্বরের কোনো অর্ডার পাওয়া যায়নি। দয়া করে যাচাই করে আবার চেষ্টা করুন।",
            loading: "অর্ডার স্ট্যাটাস যাচাই করা হচ্ছে...",
        },
        membership: {
            title: "মেম্বারশিপ প্ল্যান",
            description: "আপনার কেনাকাটায় পয়েন্ট অর্জন করুন এবং আপনার স্তর অনুযায়ী এক্সক্লুসিভ ডিসকাউন্ট উপভোগ করুন!",
            next_tier: "পরবর্তী স্তর",
            benefits: "সুবিধাসমূহ",
            points: "পয়েন্ট",
            discount: "ডিসকাউন্ট",
            points_needed: "প্রয়োজনীয় পয়েন্ট",
            recent_usage: "সাম্প্রতিক পয়েন্ট ব্যবহার",
            current_points: "বর্তমান পয়েন্ট",
            current_tier: "বর্তমান স্তর",
            other_cards: "আমাদের সদস্যপদ পরিকল্পনা এবং ছাড়"
        },
        footer: {
            title: "গুণগতমানসম্পন্ন ওষুধ, বিশ্বাসযোগ্য যত্ন",
            description: "RedPharma BD হলো বাংলাদেশের আপনার বিশ্বাসযোগ্য অনলাইন ফার্মেসি। দ্রুত ডেলিভারি, আসল ওষুধ, এবং সেরা স্বাস্থ্যসেবা পণ্য।",
            headings: {
                quick_actions: "দ্রুত অ্যাকশন",
                services: "আমাদের সেবা",
                contact: "যোগাযোগ করুন",
                newsletter: "নিউজলেটারে সাবস্ক্রাইব করুন",
            }
        },
        help: "হেল্প সেন্টার (প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী)",
        add_to_cart: "কার্টে যোগ করুন",
        read_more: "আরও পড়ুন",
        view_all: "সব দেখুন",
        contact_us: "যোগাযোগ করুন",
    },
};

const extraMessages = {
    en: {
        common: {
            customer: "Customer",
            show: "Show",
            hide: "Hide",
            or: "OR",
            close: "Close",
            confirm: "Confirm",
            loading: "Loading...",
            processing: "Processing...",
            saving: "Saving...",
            success: "Success",
            error: "Error",
            name: "Name",
            email: "Email",
            phone: "Phone",
            address: "Address",
            breadcrumb: "Breadcrumb",
            modalClose: "Close modal",
            maximumStockReached: "Maximum stock reached",
            followUs: "FOLLOW US",
            allRightsReserved: "All rights reserved.",
            home: "Home",
            view: "View",
        },
        auth: {
            login: "Login",
            register: "Register",
            welcomeBack: "Welcome Back",
            loginSubtitle: "Login to your account",
            createAccount: "Create Account",
            registerSubtitle: "Sign up to get started",
            welcomeBackName: "Welcome back, {name}",
            welcomeName: "Welcome, {name}",
            signedInSuccess: "You've signed in successfully. Your account is ready and you can continue where you left off.",
            accountCreatedSuccess: "Your account has been successfully created and you are now signed in.",
            loginSuccessful: "Login successful",
            mobileNumber: "Mobile number",
            mobileNumberTitle: "Mobile Number",
            password: "Password",
            confirmPassword: "Confirm Password",
            email: "Email",
            name: "Name",
            fullName: "Full Name",
            forgotPassword: "Forgot Password?",
            backToLogin: "Back to Login",
            signUp: "Sign up",
            signingIn: "Signing in...",
            registering: "Registering...",
            alreadyHaveAccount: "Already have an account?",
            dontHaveAccount: "Don't have an account?",
            byContinuing: "By continuing, you agree to our",
            byRegistering: "By registering, you agree to our",
            terms: "Terms & Conditions",
            privacy: "Privacy Policy",
            refund: "Refund Policy",
            and: "&",
            placeholders: {
                name: "Enter your name",
                emailOptional: "Email (optional)",
                mobile: "Enter your mobile number",
                mobileShort: "Mobile Number",
                password: "Enter your password",
                passwordShort: "Password",
                newPassword: "Enter new password",
                confirmPassword: "Confirm password",
                confirmPasswordTitle: "Confirm Password",
                confirmNewPassword: "Confirm new password",
                otp: "Enter OTP",
            },
            aria: {
                showPassword: "Show password",
                hidePassword: "Hide password",
                showConfirmPassword: "Show confirm password",
                hideConfirmPassword: "Hide confirm password",
            },
            errors: {
                passwordsDoNotMatch: "Passwords do not match",
                loginFailed: "Login failed:",
                registrationFailed: "Registration failed:",
            },
        },
        product: {
            addedToCart: "{name} added to cart!",
            maxStockReached: "Maximum stock reached",
            stockOut: "Stock Out",
            pack: "Pack",
        },
        forms: {
            gender: "Gender",
            selectGender: "Select Gender",
            male: "Male",
            female: "Female",
            other: "Other",
        },
        account: {
            profileUpdating: "Updating profile...",
            editProfile: "Edit Profile",
            profileSubtitle: "Manage your personal information and account settings",
            avatarHelp: "Click the image to change your avatar",
            saveChanges: "Save Changes",
        },
        orders: {
            title: "My Orders",
            subtitle: "Manage your orders and track their status",
            orderId: "Order ID",
            date: "Date",
            status: "Status",
            items: "Items",
            total: "Total",
            actions: "Actions",
            loading: "Loading orders...",
            noOrdersForTab: "No orders found for this tab.",
            filters: {
                all: "All",
                delivered: "Delivered",
                canceled: "Canceled",
                processing: "Processing",
            },
        },
        membership: {
            memberName: "Member Name",
            frozen: "FROZEN",
            needHelp: "Need help? Call our hotline:",
        },
        filters: {
            filterBy: "Filter by",
            maxPrice: "Max Price",
            brand: "Brand",
            allBrands: "All Brands",
            availability: "Availability",
            inStockOnly: "In Stock Only",
            rating: "Rating",
            starsAndUp: "{count} stars & up",
            reset: "Reset Filters",
        },
        contact: {
            title: "Contact Us",
            subtitle: "We'd love to hear from you. Send us a message and we will get back to you promptly.",
            subject: "Subject",
            message: "Message",
            sendMessage: "Send Message",
            information: "Contact Information",
            alertSent: "Message sent!\nName: {name}\nEmail: {email}\nSubject: {subject}\nMessage: {message}",
        },
        helpCenter: {
            title: "Help Center",
            subtitle: "Find answers to the most frequently asked questions.",
            faqs: [
                { question: "How to place an order?", answer: "Browse our medicines or products, add them to your cart, and proceed to checkout. You can pay via multiple payment methods." },
                { question: "How to contact with a doctor?", answer: "You can contact our partnered doctors via the consultation section. Fill out the form and a doctor will reach out to you." },
                { question: "How to use my points?", answer: "Points earned from previous purchases can be redeemed at checkout for discounts according to your membership tier." },
                { question: "How to know about available doctors?", answer: "Our website lists all available doctors with their specialties and reviews. You can filter based on your needs." },
                { question: "How to track my order?", answer: "Use the Order Tracking page and enter your order ID to get the latest updates on your delivery." },
            ],
        },
        notFound: {
            title: "Page Not Found",
            description: "Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
            goHome: "Go Home",
        },
        policy: {
            lastUpdated: "Last updated: {date}",
            labels: { email: "Email:", phone: "Phone:", address: "Address:" },
            contact: { address: "Rajshahi, Bangladesh" },
            privacy: {
                title: "Privacy Policy",
                description: "We respect your privacy and are committed to protecting your personal information.",
                intro: "At <strong>RedPharma</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.",
                updated: "September 2025",
                sections: [
                    { title: "Information We Collect", body: "We may collect the following information:", items: ["Personal information such as name, email, phone number, and address.", "Health-related information that you provide to us for orders or consultations.", "Payment and transaction details for purchases.", "Website usage data including IP addresses, device information, and browsing activity."] },
                    { title: "How We Use Your Information", items: ["To process and deliver your orders efficiently.", "To provide customer support and respond to inquiries.", "To personalize your experience on our platform.", "To send promotional offers, updates, and newsletters with your consent.", "To ensure website security and prevent fraudulent activities."] },
                    { title: "Sharing Your Information", body: "We do not sell or rent your personal information to third parties. We may share information:", items: ["With trusted service providers to process orders and payments.", "To comply with legal obligations or protect our rights.", "With healthcare professionals as necessary for consultations and prescriptions."] },
                    { title: "Security", body: "We implement appropriate technical and organizational measures to protect your data from unauthorized access, alteration, disclosure, or destruction." },
                    { title: "Your Rights", body: "You have the right to:", items: ["Access, update, or delete your personal information.", "Opt out of marketing communications.", "Request a copy of the information we hold about you."] },
                    { title: "Contact Us", body: "If you have any questions or concerns regarding your privacy, please contact us at:" },
                ],
            },
            terms: {
                title: "Terms & Conditions",
                description: "Please review these terms before using RedPharma BD.",
                sections: [
                    { title: "Use of Our Website", body: "By accessing or using RedPharma BD, you agree to use our website and services only for lawful purposes and in a way that does not affect the rights, safety, or experience of other customers." },
                    { title: "Account Information", body: "You are responsible for providing accurate account, delivery, and contact information. Please keep your login details secure and notify us if you believe your account has been used without permission." },
                    { title: "Orders and Availability", body: "Product availability, prices, discounts, and delivery timelines may change based on stock, supplier updates, or operational needs. We may contact you to confirm, adjust, or cancel an order when required." },
                    { title: "Healthcare Products", body: "Medicine and healthcare product information on this website is provided for shopping convenience and should not replace professional medical advice. Always follow the guidance of a qualified healthcare professional for prescriptions, dosage, and treatment decisions." },
                    { title: "Payments and Delivery", body: "Orders may be paid through the payment methods available at checkout. Delivery charges, estimated delivery times, and service coverage may vary by location and order type." },
                    { title: "Returns and Refunds", body: "Returns and refunds are handled according to our Refund & Returns Policy. For pharmaceutical and healthcare safety reasons, some items cannot be returned once opened, used, or delivered in proper condition." },
                    { title: "Contact Us", body: "If you have questions about these terms, please contact RedPharma BD support." },
                ],
            },
        },
    },
    bn: {
        common: {
            customer: "গ্রাহক",
            show: "দেখান",
            hide: "লুকান",
            or: "অথবা",
            close: "বন্ধ করুন",
            confirm: "নিশ্চিত করুন",
            loading: "লোড হচ্ছে...",
            processing: "প্রক্রিয়াকরণ হচ্ছে...",
            saving: "সংরক্ষণ হচ্ছে...",
            success: "সফল",
            error: "ত্রুটি",
            name: "নাম",
            email: "ইমেইল",
            phone: "ফোন",
            address: "ঠিকানা",
            breadcrumb: "ব্রেডক্রাম্ব",
            modalClose: "মডাল বন্ধ করুন",
            maximumStockReached: "সর্বোচ্চ স্টক সীমায় পৌঁছেছে",
            followUs: "আমাদের অনুসরণ করুন",
            allRightsReserved: "সর্বস্বত্ব সংরক্ষিত।",
            home: "হোম",
            view: "দেখুন",
        },
        auth: {
            login: "লগইন",
            register: "রেজিস্টার",
            welcomeBack: "আবার স্বাগতম",
            loginSubtitle: "আপনার অ্যাকাউন্টে লগইন করুন",
            createAccount: "অ্যাকাউন্ট তৈরি করুন",
            registerSubtitle: "শুরু করতে সাইন আপ করুন",
            welcomeBackName: "আবার স্বাগতম, {name}",
            welcomeName: "স্বাগতম, {name}",
            signedInSuccess: "আপনি সফলভাবে সাইন ইন করেছেন। আপনার অ্যাকাউন্ট প্রস্তুত, এখন আগের কাজ চালিয়ে যেতে পারেন।",
            accountCreatedSuccess: "আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে এবং আপনি এখন সাইন ইন করেছেন।",
            loginSuccessful: "লগইন সফল হয়েছে",
            mobileNumber: "মোবাইল নম্বর",
            mobileNumberTitle: "মোবাইল নম্বর",
            password: "পাসওয়ার্ড",
            confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
            email: "ইমেইল",
            name: "নাম",
            fullName: "পূর্ণ নাম",
            forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
            backToLogin: "লগইনে ফিরে যান",
            signUp: "সাইন আপ",
            signingIn: "সাইন ইন হচ্ছে...",
            registering: "রেজিস্টার হচ্ছে...",
            alreadyHaveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
            dontHaveAccount: "অ্যাকাউন্ট নেই?",
            byContinuing: "চালিয়ে গেলে আপনি সম্মত হচ্ছেন আমাদের",
            byRegistering: "রেজিস্টার করলে আপনি সম্মত হচ্ছেন আমাদের",
            terms: "শর্তাবলি",
            privacy: "প্রাইভেসি পলিসি",
            refund: "রিফান্ড পলিসি",
            and: "ও",
            placeholders: {
                name: "আপনার নাম লিখুন",
                emailOptional: "ইমেইল (ঐচ্ছিক)",
                mobile: "আপনার মোবাইল নম্বর লিখুন",
                mobileShort: "মোবাইল নম্বর",
                password: "আপনার পাসওয়ার্ড লিখুন",
                passwordShort: "পাসওয়ার্ড",
                newPassword: "নতুন পাসওয়ার্ড লিখুন",
                confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
                confirmPasswordTitle: "পাসওয়ার্ড নিশ্চিত করুন",
                confirmNewPassword: "নতুন পাসওয়ার্ড নিশ্চিত করুন",
                otp: "ওটিপি লিখুন",
            },
            aria: {
                showPassword: "পাসওয়ার্ড দেখান",
                hidePassword: "পাসওয়ার্ড লুকান",
                showConfirmPassword: "নিশ্চিতকরণ পাসওয়ার্ড দেখান",
                hideConfirmPassword: "নিশ্চিতকরণ পাসওয়ার্ড লুকান",
            },
            errors: {
                passwordsDoNotMatch: "পাসওয়ার্ড মিলছে না",
                loginFailed: "লগইন ব্যর্থ:",
                registrationFailed: "রেজিস্ট্রেশন ব্যর্থ:",
            },
        },
        product: {
            addedToCart: "{name} কার্টে যোগ করা হয়েছে!",
            maxStockReached: "সর্বোচ্চ স্টক সীমায় পৌঁছেছে",
            stockOut: "স্টক শেষ",
            pack: "প্যাক",
        },
        forms: {
            gender: "লিঙ্গ",
            selectGender: "লিঙ্গ নির্বাচন করুন",
            male: "পুরুষ",
            female: "নারী",
            other: "অন্যান্য",
        },
        account: {
            profileUpdating: "প্রোফাইল আপডেট হচ্ছে...",
            editProfile: "প্রোফাইল সম্পাদনা",
            profileSubtitle: "আপনার ব্যক্তিগত তথ্য ও অ্যাকাউন্ট সেটিংস পরিচালনা করুন",
            avatarHelp: "অ্যাভাটার পরিবর্তন করতে ছবিতে ক্লিক করুন",
            saveChanges: "পরিবর্তন সংরক্ষণ করুন",
        },
        orders: {
            title: "আমার অর্ডার",
            subtitle: "আপনার অর্ডার দেখুন এবং স্ট্যাটাস ট্র্যাক করুন",
            orderId: "অর্ডার আইডি",
            date: "তারিখ",
            status: "স্ট্যাটাস",
            items: "পণ্য",
            total: "মোট",
            actions: "অ্যাকশন",
            loading: "অর্ডার লোড হচ্ছে...",
            noOrdersForTab: "এই ট্যাবে কোনো অর্ডার পাওয়া যায়নি।",
            filters: {
                all: "সব",
                delivered: "ডেলিভার্ড",
                canceled: "বাতিল",
                processing: "প্রসেসিং",
            },
        },
        membership: {
            memberName: "মেম্বারের নাম",
            frozen: "ফ্রোজেন",
            needHelp: "সহায়তা লাগবে? আমাদের হটলাইনে কল করুন:",
        },
        filters: {
            filterBy: "ফিল্টার করুন",
            maxPrice: "সর্বোচ্চ দাম",
            brand: "ব্র্যান্ড",
            allBrands: "সব ব্র্যান্ড",
            availability: "উপলভ্যতা",
            inStockOnly: "শুধু স্টকে আছে",
            rating: "রেটিং",
            starsAndUp: "{count} স্টার বা বেশি",
            reset: "ফিল্টার রিসেট করুন",
        },
        contact: {
            title: "যোগাযোগ করুন",
            subtitle: "আপনার কথা শুনতে আমরা প্রস্তুত। আমাদের মেসেজ পাঠান, আমরা দ্রুত যোগাযোগ করব।",
            subject: "বিষয়",
            message: "মেসেজ",
            sendMessage: "মেসেজ পাঠান",
            information: "যোগাযোগের তথ্য",
            alertSent: "মেসেজ পাঠানো হয়েছে!\nনাম: {name}\nইমেইল: {email}\nবিষয়: {subject}\nমেসেজ: {message}",
        },
        helpCenter: {
            title: "হেল্প সেন্টার",
            subtitle: "সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের উত্তর খুঁজুন।",
            faqs: [
                { question: "কীভাবে অর্ডার করব?", answer: "ওষুধ বা পণ্য ব্রাউজ করে কার্টে যোগ করুন এবং চেকআউটে যান। একাধিক পেমেন্ট পদ্ধতিতে পেমেন্ট করতে পারবেন।" },
                { question: "ডাক্তারের সঙ্গে কীভাবে যোগাযোগ করব?", answer: "কনসালটেশন সেকশনের মাধ্যমে আমাদের পার্টনার ডাক্তারদের সঙ্গে যোগাযোগ করতে পারেন। ফর্ম পূরণ করলে একজন ডাক্তার আপনার সঙ্গে যোগাযোগ করবেন।" },
                { question: "আমার পয়েন্ট কীভাবে ব্যবহার করব?", answer: "পূর্বের কেনাকাটা থেকে অর্জিত পয়েন্ট আপনার মেম্বারশিপ টিয়ার অনুযায়ী চেকআউটে ছাড় হিসেবে ব্যবহার করা যাবে।" },
                { question: "উপলভ্য ডাক্তার সম্পর্কে কীভাবে জানব?", answer: "আমাদের ওয়েবসাইটে বিশেষত্ব ও রিভিউসহ উপলভ্য ডাক্তারদের তালিকা থাকে। প্রয়োজন অনুযায়ী ফিল্টার করতে পারবেন।" },
                { question: "আমার অর্ডার কীভাবে ট্র্যাক করব?", answer: "অর্ডার ট্র্যাকিং পেজে গিয়ে অর্ডার আইডি লিখে ডেলিভারির সর্বশেষ আপডেট দেখুন।" },
            ],
        },
        notFound: {
            title: "পৃষ্ঠা পাওয়া যায়নি",
            description: "দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন হয়েছে, অথবা সাময়িকভাবে উপলভ্য নয়।",
            goHome: "হোমে যান",
        },
        policy: {
            lastUpdated: "সর্বশেষ আপডেট: {date}",
            labels: { email: "ইমেইল:", phone: "ফোন:", address: "ঠিকানা:" },
            contact: { address: "রাজশাহী, বাংলাদেশ" },
            privacy: {
                title: "প্রাইভেসি পলিসি",
                description: "আমরা আপনার ব্যক্তিগত তথ্য সুরক্ষায় প্রতিশ্রুতিবদ্ধ।",
                intro: "<strong>RedPharma</strong>-এ আমরা আপনার গোপনীয়তাকে সম্মান করি এবং ব্যক্তিগত তথ্য সুরক্ষায় প্রতিশ্রুতিবদ্ধ। আপনি আমাদের ওয়েবসাইট বা সেবা ব্যবহার করলে আমরা কীভাবে তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষা করি তা এই নীতিতে ব্যাখ্যা করা হয়েছে।",
                updated: "সেপ্টেম্বর ২০২৫",
                sections: [
                    { title: "আমরা যে তথ্য সংগ্রহ করি", body: "আমরা নিম্নলিখিত তথ্য সংগ্রহ করতে পারি:", items: ["নাম, ইমেইল, ফোন নম্বর ও ঠিকানার মতো ব্যক্তিগত তথ্য।", "অর্ডার বা পরামর্শের জন্য আপনার দেওয়া স্বাস্থ্য-সম্পর্কিত তথ্য।", "ক্রয়ের পেমেন্ট ও লেনদেনের তথ্য।", "আইপি ঠিকানা, ডিভাইস তথ্য ও ব্রাউজিং কার্যক্রমসহ ওয়েবসাইট ব্যবহারের তথ্য।"] },
                    { title: "আমরা আপনার তথ্য কীভাবে ব্যবহার করি", items: ["আপনার অর্ডার প্রক্রিয়াকরণ ও ডেলিভারির জন্য।", "গ্রাহক সহায়তা দিতে এবং প্রশ্নের উত্তর দিতে।", "আমাদের প্ল্যাটফর্মে আপনার অভিজ্ঞতা ব্যক্তিগতকরণ করতে।", "আপনার সম্মতিতে অফার, আপডেট ও নিউজলেটার পাঠাতে।", "ওয়েবসাইটের নিরাপত্তা নিশ্চিত ও প্রতারণা প্রতিরোধ করতে।"] },
                    { title: "তথ্য শেয়ারিং", body: "আমরা আপনার ব্যক্তিগত তথ্য বিক্রি বা ভাড়া দিই না। প্রয়োজনে তথ্য শেয়ার করতে পারি:", items: ["অর্ডার ও পেমেন্ট প্রক্রিয়াকরণে বিশ্বস্ত সেবা প্রদানকারীর সঙ্গে।", "আইনি বাধ্যবাধকতা পূরণ বা আমাদের অধিকার রক্ষায়।", "পরামর্শ ও প্রেসক্রিপশনের প্রয়োজনে স্বাস্থ্যসেবা পেশাজীবীদের সঙ্গে।"] },
                    { title: "নিরাপত্তা", body: "অননুমোদিত প্রবেশ, পরিবর্তন, প্রকাশ বা ধ্বংস থেকে আপনার তথ্য সুরক্ষায় আমরা উপযুক্ত প্রযুক্তিগত ও সাংগঠনিক ব্যবস্থা গ্রহণ করি।" },
                    { title: "আপনার অধিকার", body: "আপনার অধিকার রয়েছে:", items: ["আপনার ব্যক্তিগত তথ্য দেখা, আপডেট করা বা মুছে ফেলা।", "মার্কেটিং যোগাযোগ থেকে বেরিয়ে আসা।", "আমাদের কাছে থাকা আপনার তথ্যের কপি অনুরোধ করা।"] },
                    { title: "যোগাযোগ", body: "গোপনীয়তা নিয়ে কোনো প্রশ্ন বা উদ্বেগ থাকলে আমাদের সঙ্গে যোগাযোগ করুন:" },
                ],
            },
            terms: {
                title: "শর্তাবলি",
                description: "RedPharma BD ব্যবহারের আগে অনুগ্রহ করে এই শর্তগুলো পড়ুন।",
                sections: [
                    { title: "ওয়েবসাইট ব্যবহার", body: "RedPharma BD ব্যবহার করলে আপনি আইনসম্মত উদ্দেশ্যে এবং অন্য গ্রাহকের অধিকার, নিরাপত্তা বা অভিজ্ঞতা ক্ষতিগ্রস্ত না করে আমাদের সেবা ব্যবহারে সম্মত হন।" },
                    { title: "অ্যাকাউন্ট তথ্য", body: "সঠিক অ্যাকাউন্ট, ডেলিভারি ও যোগাযোগ তথ্য দেওয়ার দায়িত্ব আপনার। লগইন তথ্য নিরাপদে রাখুন এবং অনুমতি ছাড়া ব্যবহার হয়েছে মনে হলে আমাদের জানান।" },
                    { title: "অর্ডার ও উপলভ্যতা", body: "স্টক, সরবরাহকারী আপডেট বা অপারেশনাল প্রয়োজনে পণ্যের উপলভ্যতা, দাম, ছাড় ও ডেলিভারি সময় পরিবর্তিত হতে পারে। প্রয়োজনে অর্ডার নিশ্চিত, পরিবর্তন বা বাতিল করতে আমরা যোগাযোগ করতে পারি।" },
                    { title: "স্বাস্থ্যসেবা পণ্য", body: "ওয়েবসাইটের ওষুধ ও স্বাস্থ্যপণ্যের তথ্য কেনাকাটার সুবিধার জন্য, পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়। প্রেসক্রিপশন, ডোজ ও চিকিৎসার জন্য যোগ্য স্বাস্থ্যসেবা পেশাজীবীর নির্দেশনা অনুসরণ করুন।" },
                    { title: "পেমেন্ট ও ডেলিভারি", body: "চেকআউটে উপলভ্য পেমেন্ট পদ্ধতিতে অর্ডার পরিশোধ করা যায়। অবস্থান ও অর্ডারের ধরন অনুযায়ী ডেলিভারি চার্জ, সময় ও কভারেজ ভিন্ন হতে পারে।" },
                    { title: "রিটার্ন ও রিফান্ড", body: "রিটার্ন ও রিফান্ড আমাদের রিফান্ড ও রিটার্ন পলিসি অনুযায়ী পরিচালিত হয়। ফার্মাসিউটিক্যাল ও স্বাস্থ্য নিরাপত্তার কারণে কিছু পণ্য খোলা, ব্যবহৃত বা সঠিক অবস্থায় ডেলিভারির পর ফেরতযোগ্য নয়।" },
                    { title: "যোগাযোগ", body: "এই শর্তাবলি নিয়ে প্রশ্ন থাকলে RedPharma BD সাপোর্টে যোগাযোগ করুন।" },
                ],
            },
        },
    },
};

function mergeMessages(target, source) {
    Object.entries(source).forEach(([key, value]) => {
        if (value && typeof value === "object" && !Array.isArray(value)) {
            target[key] = mergeMessages(target[key] || {}, value);
            return;
        }

        target[key] = value;
    });

    return target;
}

mergeMessages(messages.en, extraMessages.en);
mergeMessages(messages.bn, extraMessages.bn);

const savedLang = localStorage.getItem("language") || "en";

export const i18n = createI18n({
    legacy: false,
    locale: savedLang,
    fallbackLocale: "en",
    missingWarn: false,
    fallbackWarn: false,
    messages,
});
