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
            name: "Care Dental & Wellness",
            handle: "Clinic Network",
            role: "Healthcare Awareness Commercials",
            url: "#healthcare",
            badge: "High Patient Trust",
            icon: "🩺",
            highlight: false,
            active: false // Inactive: will not show on site
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
            title: "Single AI Ad",
            price: "₹2499",
            period: "",
            badge: "",
            featured: false,
            active: true,
            desc: "Ideal for testing viral AI video reels on your WhatsApp Status and Instagram feed.",
            features: [
                "1x 4K Vertical Reel (9:16)",
                "24h Express Delivery",
                "AI Voiceover & High-Converting Script",
                "Cinematic Sound FX"
            ],
            whatsappText: "Hi CineAI, I want to order the Single AI Ad package (Rs 2499)."
        },
        {
            id: "viral-pack",
            title: "Viral Growth Pack",
            price: "₹4,999",
            period: "",
            badge: "Most Popular",
            featured: true,
            active: true,
            desc: "For ambitious businesses, schools, clinics & studios wanting consistent high-converting inquiries.",
            features: [
                "3x Custom 4K Reels",
                "A/B Viral Hook Testing",
                "Custom Scripts & Voiceover",
                "Priority Production Queue",
                "WhatsApp Lead CTAs Included"
            ],
            whatsappText: "Hi CineAI, I want to order the Viral Growth Pack (Rs 4,999)."
        },
        {
            id: "monthly-retainer",
            title: "Monthly Retainer",
            price: "₹11,999",
            period: "/mo",
            badge: "Best ROI",
            featured: false,
            active: true,
            desc: "Complete digital ad dominance in your city. Weekly fresh commercials ready to post.",
            features: [
                "8x 4K Ads per Month",
                "Dedicated Creative Director",
                "Full WhatsApp Funnel Setup",
                "24h Revision Guarantee",
                "Audience Analytics Review"
            ],
            whatsappText: "Hi CineAI, I want to discuss the Monthly Retainer package (Rs 11,999/mo)."
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
            name: "Dr. Kunal Singhal",
            role: "Smile Dental & Implant Centre (Lucknow)",
            comment: "Apne clinic ke naye branch ke dental awareness ke liye video banwaya hai hmne. Voiceover aur visual great hai, kuch faltu over-promising nahi.",
            rating: 4,
            metric: "New Clinic OPD Walk-ins",
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
        copyright: "CineAI Studios B.V. 2026 © All Rights Reserved"
    }
};
