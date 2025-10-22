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
                products: "Products",
                blog: "Blog",
                contact: "Contact Us",
                privacy: "Privacy Policy",
                terms: "Terms of Service",
                coverage: "Coverage Area",
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
            description: "Last updated: October 2025"
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

const savedLang = localStorage.getItem("language") || "en";

export const i18n = createI18n({
    legacy: false,
    locale: savedLang,
    fallbackLocale: "en",
    messages,
});
