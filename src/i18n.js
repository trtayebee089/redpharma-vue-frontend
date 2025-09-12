import { createI18n } from "vue-i18n";

const messages = {
    en: {
        orders: "My Orders",
        settings: "Settings",
        membership: "Membership",
        help: "Help Center (FAQ)",
        logout: "Logout",
        profile: "Profile",
        orders: "Orders",
        product_categories: "Product Categories",
        featured_products: "Featured Products",
        add_to_cart: "Add to Cart",
        health_articles: "Health Articles",
        read_more: "Read More",
        view_all: "View All",
        what_our_customers_say: "What Our Customers Say",
        contact_us: "Contact Us",
    },
    bn: {
        orders: "আমার অর্ডার",
        settings: "সেটিংস",
        membership: "সদস্যপদ",
        help: "হেল্প সেন্টার (প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী)",
        logout: "লগ আউট",
        profile: "প্রোফাইল",
        orders: "অর্ডারসমূহ",
        product_categories: "পণ্যের বিভাগসমূহ",
        featured_products: "বৈশিষ্ট্যযুক্ত পণ্যসমূহ",
        add_to_cart: "কার্টে যোগ করুন",
        health_articles: "স্বাস্থ্য সম্পর্কিত নিবন্ধসমূহ",
        read_more: "আরও পড়ুন",
        view_all: "সব দেখুন",
        what_our_customers_say: "আমাদের গ্রাহকরা যা বলেন",
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
