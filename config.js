/**
 * ==========================================================================
 * CINEAI STUDIOS — MASTER CONFIGURATION FILE (config.js)
 * ==========================================================================
 * Note: Aap config.json ya config.js kisi me bhi update kar sakte hain!
 * Kisi bhi item me active: false likhne se wo website se automatic hide ho jata hai.
 * ==========================================================================
 */

window.SITE_CONFIG = {

    // --------------------------------------------------------------------------
    // 1. CONTACT & WHATSAPP SETTINGS
    // --------------------------------------------------------------------------
    contact: {
        whatsappNumber: "918084507850",
        displayPhone: "+91 8084507850",
        callingNumber: "+918084507850",
        email: "contact@cineai.in",
        locationText: "Pan-India Digital Operations",
        defaultWhatsappText: "Hi CineAI, I want to get a high-converting AI commercial video made for my business."
    },

    // --------------------------------------------------------------------------
    // 2. SOCIAL MEDIA LINKS
    // --------------------------------------------------------------------------
    socialMedia: [
        {
            platform: "Instagram",
            label: "Instagram (@cineai)",
            url: "https://www.instagram.com/cineai/",
            icon: "📸",
            badge: "",
            active: true
        },
        {
            platform: "Facebook",
            label: "Facebook Page",
            url: "https://facebook.com/cineai",
            icon: "📘",
            badge: "",
            active: true
        },
        {
            platform: "YouTube",
            label: "YouTube Channel",
            url: "https://youtube.com/@cineai",
            icon: "▶️",
            badge: "Commercial Reels",
            active: true
        },
        {
            platform: "LinkedIn",
            label: "LinkedIn",
            url: "https://linkedin.com/company/cineai",
            icon: "💼",
            badge: "",
            active: true
        },
        {
            platform: "Twitter",
            label: "X (Twitter)",
            url: "https://x.com/cineai",
            icon: "🐦",
            badge: "",
            active: false // Inactive: will not show on site
        }
    ],

    // --------------------------------------------------------------------------
    // 3. PARTNERS & AFFILIATES
    // --------------------------------------------------------------------------
    partners: [
        {
            id: "partner-1",
            name: "History Decoded AI",
            handle: "@historydecoded_ai",
            role: "Flagship AI Media Channel",
            url: "https://www.instagram.com/historydecoded_ai/",
            badge: "350k+ Followers",
            icon: "⚡",
            highlight: true,
            active: true
        },
        {
            id: "partner-2",
            name: "GROW MORE Agrichem",
            handle: "@KrishiBioTech",
            role: "Organic Agriculture Partner",
            url: "#agri",
            badge: "",
            icon: "🌾",
            highlight: true,
            active: true
        },
        {
            id: "partner-3",
            name: "Bright Horizon Academy",
            handle: "Education Network",
            role: "School Admissions Commercials",
            url: "#schools",
            badge: "120+ Admissions",
            icon: "🎓",
            highlight: false,
            active: false // Inactive: will not show on site
        },
        {
            id: "partner-4",
            name: "Bhoomi Vaidyam",
            handle: "@BhoomiVaidyam",
            role: "Ayurvedic Healthcare Commercials",
            url: "#healthcare",
            badge: "Ayurvedic Wellness",
            icon: "🌿",
            highlight: true,
            active: true
        },
        {
            id: "partner-5",
            name: "Royal Wedding Cinema",
            handle: "Studio Collaborator",
            role: "Cinematic High-Ticket Trailers",
            url: "#wedding",
            badge: "Wedding Studios",
            icon: "💍",
            highlight: false,
            active: false // Inactive: will not show on site
        }
    ],

    // --------------------------------------------------------------------------
    // 4. PRICING PACKAGES
    // --------------------------------------------------------------------------
    pricing: [
        {
            id: "single-ad",
            title: "Single AI Reel",
            price: "₹2,999",
            originalPrice: "₹3,499",
            subPrice: "Single Test",
            period: "",
            badge: "",
            featured: false,
            active: true,
            desc: "Ideal for testing viral AI video reels on your WhatsApp Status and Instagram feed.",
            features: [
                "1x 4K Vertical Reel (9:16)",
                "AI Voiceover & High-Converting Script",
                "Cinematic Sound FX",
                "48h Express Delivery"
            ],
            whatsappText: "Hi CineAI, I want to order the Single AI Reel package (Rs 2,999)."
        },
        {
            id: "viral-pack",
            title: "3-Reel Growth Pack",
            price: "₹6,999",
            originalPrice: "₹8,999",
            subPrice: "Only ₹2,333 / reel",
            period: "",
            badge: "🔥 Most Popular • Save ₹2,000",
            featured: true,
            active: true,
            desc: "Our #1 recommended trial. High-converting 3-reel sequence to test viral hooks & boost inquiries.",
            features: [
                "3x Custom 4K Reels",
                "Viral Hook & Script Polish Included",
                "3 Free Cover Thumbnails (Save ₹1,500)",
                "A/B Hook Testing",
                "Priority Production Queue",
                "1 Free Revision per Reel"
            ],
            whatsappText: "Hi CineAI, I want to order the 3-Reel Growth Pack (Rs 6,999)."
        },
        {
            id: "monthly-retainer",
            title: "8-Reel Monthly Retainer",
            price: "₹17,599",
            originalPrice: "₹23,999",
            subPrice: "Only ₹2,199 / reel • Save 27%",
            period: "/mo",
            badge: "Best ROI • ₹2,199/Reel",
            featured: false,
            active: true,
            desc: "Complete digital ad dominance. 2 high-converting commercial reels delivered every week.",
            features: [
                "8x 4K Ads per Month (₹2,199/reel)",
                "Dedicated Creative Director",
                "Full Content Calendar & Trend Research",
                "WhatsApp Lead CTAs & Funnel Setup",
                "VIP Priority Queue & Revisions"
            ],
            whatsappText: "Hi CineAI, I want to discuss the 8-Reel Monthly Retainer package (Rs 17,599/mo)."
        }
    ],

    // --------------------------------------------------------------------------
    // 5. CLIENT REVIEWS & TESTIMONIALS (Natural & Real Client Experiences)
    // --------------------------------------------------------------------------
    testimonials: [
        {
            id: "default-rev-1",
            name: "Amit Sharma",
            role: "Apex Public School (Patna)",
            comment: "Bhai sach me video ye log bahut accha bana ke diye hain. Humne campus ki bas 8 normal photos WhatsApp pe bheji thi, inhone  ekdum TV ad jaisa reel bana kar de diya. Kaam bohot genuine hai trustable hai",
            rating: 5,
            metric: "Admission Calls Boosted",
            featured: false,
            active: true
        },
        {
            id: "default-rev-2",
            name: "Rajesh Patel",
            role: "Patel Krishi Kendra (Indore)",
            comment: "bahut accha kaam tha inki team ne pehle contact kiya tha to mujhe scam laga tha but kam bahut accha hai aap log khud try kar sakte ho , haan thora rate mujhe jyda laga par kaam bahut accha hai aap log try kar sakte ho .4 deta rha hoon kyunki kaam bahut accha hai par price mujhe thora jyada laga",
            rating: 4,
            metric: "Dealers Reordered Stock",
            featured: true,
            active: true
        },
        {
            id: "default-rev-3",
            name: "Bhoomi Vaidyam",
            role: "Ayurvedic Healthcare Clinic (Indore)",
            comment: "Hamare clinic ke patient awareness videos ke liye CineAI se reels banwayi thi. Videos se hamare Ayurvedic clinic me piles aur joint pain ke authentic OPD walk-ins kafi boost hue. Truly professional AI commercials!",
            rating: 5,
            metric: "High OPD Walk-ins",
            featured: false,
            active: true
        },
        {
            id: "default-rev-4",
            name: "Deepak Rawat",
            role: "Rawat Digital Studio (Jaipur)",
            comment: "aaplog video to accha banate ho par try karo ki thora price kam karo and calls 24*7  receive karo. kaam accha hai par customer service abhi best nahi hai",
            rating: 2,
            metric: "Instant Client Attention",
            featured: false,
            active: true
        }
    ],

    // --------------------------------------------------------------------------
    // 6. BRAND META INFORMATION
    // --------------------------------------------------------------------------
    brand: {
        name: "cineai",
        tagline: "High-converting AI commercial video ads for schools, clinics, local brands, creators & photo studios.",
        copyright: "CineAI Studios © 2026. All Rights Reserved. Pan-India Creative Operations."
    }
};
