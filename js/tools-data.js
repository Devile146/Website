// ===================================================
// FAHAD TECH - PUBLIC TOOLS METADATA (SAFE FOR GITHUB)
// No direct links here. Links are stored in Firebase Backend.
// ===================================================

const toolsData = [
    // ===== AI WEBSITES =====
    { id: "tool_bytez", name: "Bytez", description: "Access hundreds of AI models", category: "ai", icon: "fas fa-robot", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_claude", name: "Claude AI", description: "Anthropic's AI assistant", category: "ai", icon: "fas fa-brain", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_gemini", name: "Google Gemini", description: "Google's multimodal AI", category: "ai", icon: "fas fa-gem", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_perplexity", name: "Perplexity AI", description: "AI-powered search engine", category: "ai", icon: "fas fa-search", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_copilot", name: "Microsoft Copilot", description: "AI assistant from Microsoft", category: "ai", icon: "fas fa-robot", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_deepseek", name: "DeepSeek AI", description: "Advanced AI chat model", category: "ai", icon: "fas fa-comments", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_meta_ai", name: "Meta AI", description: "Meta's AI assistant", category: "ai", icon: "fas fa-meta", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_elevenlabs", name: "Eleven Labs", description: "AI voice generation", category: "ai", icon: "fas fa-microphone", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_soundraw", name: "Soundraw", description: "AI music generation", category: "ai", icon: "fas fa-music", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_suno", name: "Suno AI", description: "Create songs with AI", category: "ai", icon: "fas fa-music", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_udio", name: "Udio", description: "AI music generator", category: "ai", icon: "fas fa-headphones", type: "free", creditCost: 5, requiresAuth: true },

    // ===== PHOTO AI =====
    { id: "tool_aixploria", name: "AI Exploria", description: "AI image prompts", category: "photo", icon: "fas fa-lightbulb", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_leonardo", name: "Leonardo AI", description: "Generate stunning images", category: "photo", icon: "fas fa-palette", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_midjourney", name: "Midjourney", description: "AI image generation", category: "photo", icon: "fas fa-image", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_stablediffusion", name: "Stable Diffusion", description: "Open-source AI images", category: "photo", icon: "fas fa-image", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_playground", name: "Playground AI", description: "Create and edit images", category: "photo", icon: "fas fa-paint-brush", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_bingimage", name: "Bing Image Creator", description: "DALL-E powered generator", category: "photo", icon: "fas fa-image", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_ideogram", name: "Ideogram AI", description: "AI with typography", category: "photo", icon: "fas fa-font", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_krea", name: "Krea AI", description: "Real-time AI images", category: "photo", icon: "fas fa-bolt", type: "free", creditCost: 5, requiresAuth: true },

    // ===== VIDEO MAKERS =====
    { id: "tool_reelsbundle", name: "150k Reels Bundle", description: "Free Reels Bundles", category: "video", icon: "fas fa-film", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_runway", name: "Runway ML", description: "AI video editing", category: "video", icon: "fas fa-video", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_capcut", name: "CapCut Online", description: "Free online video editor", category: "video", icon: "fas fa-cut", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_pictory", name: "Pictory AI", description: "Text to videos", category: "video", icon: "fas fa-file-video", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_invideo", name: "InVideo", description: "AI video creation", category: "video", icon: "fas fa-video", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_kaiber", name: "Kaiber AI", description: "AI video generation", category: "video", icon: "fas fa-film", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_heygen", name: "HeyGen", description: "AI avatar videos", category: "video", icon: "fas fa-user-circle", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_synthesia", name: "Synthesia", description: "AI video creation", category: "video", icon: "fas fa-video", type: "free", creditCost: 5, requiresAuth: true },

    // ===== OSINT TOOLS =====
    { id: "tool_osintframework", name: "OSINT Framework", description: "Complete OSINT resources", category: "osint", icon: "fas fa-search", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_osintplace", name: "OSINT Place", description: "Ultimate OSINT resources", category: "osint", icon: "fas fa-globe", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_shodan", name: "Shodan", description: "Search internet devices", category: "osint", icon: "fas fa-search", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_hunter", name: "Hunter.io", description: "Find email addresses", category: "osint", icon: "fas fa-envelope", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_googletakeout", name: "Google Takeout", description: "Download Google data", category: "osint", icon: "fas fa-download", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_haveibeenpwned", name: "Have I Been Pwned", description: "Check email breaches", category: "osint", icon: "fas fa-exclamation-triangle", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_intelx", name: "IntelX", description: "OSINT intelligence search", category: "osint", icon: "fas fa-search", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_simowner", name: "SIM Owner Details PK", description: "Pakistan SIM database", category: "osint", icon: "fas fa-mobile-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_simdb", name: "SIM Database PK", description: "Pakistan SIM information", category: "osint", icon: "fas fa-database", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_iptracker", name: "IP Tracker", description: "Track IP addresses", category: "osint", icon: "fas fa-map-marker-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_wayback", name: "Wayback Machine", description: "View archived websites", category: "osint", icon: "fas fa-history", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_censys", name: "Censys", description: "Internet asset discovery", category: "osint", icon: "fas fa-search", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_dehashed", name: "Dehashed", description: "Search breached credentials", category: "osint", icon: "fas fa-key", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_spyse", name: "Spyse", description: "Cybersecurity search", category: "osint", icon: "fas fa-shield-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_greynoise", name: "Greynoise", description: "Internet noise analysis", category: "osint", icon: "fas fa-chart-line", type: "free", creditCost: 5, requiresAuth: true },

    // ===== TELEGRAM BOTS =====
    { id: "tool_fahadbot", name: "Fahad Tricks Bot", description: "Official hacking bot", category: "telegram", icon: "fab fa-telegram", type: "premium", creditCost: 0, requiresAuth: false },
    { id: "tool_2ndbot", name: "2nd Bot", description: "Official FAHAD TECH bot", category: "telegram", icon: "fab fa-telegram", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_savevideobot", name: "Save Video Bot", description: "Download videos", category: "telegram", icon: "fas fa-download", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_ytbot", name: "YouTube Downloader Bot", description: "Download YouTube videos", category: "telegram", icon: "fab fa-youtube", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_spotifybot", name: "Spotify Downloader Bot", description: "Download music", category: "telegram", icon: "fab fa-spotify", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_img2textbot", name: "Image to Text Bot", description: "Extract text from images", category: "telegram", icon: "fas fa-file-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_urlshortener", name: "URL Shortener Bot", description: "Create short URLs", category: "telegram", icon: "fas fa-link", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_proxybot", name: "Proxy Bot", description: "Get Telegram proxies", category: "telegram", icon: "fas fa-shield-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_idbot", name: "ID Bot", description: "Get Telegram IDs", category: "telegram", icon: "fas fa-id-card", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_fileconverter", name: "File Converter Bot", description: "Convert file formats", category: "telegram", icon: "fas fa-exchange-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_virustotalbot", name: "Virus Total Bot", description: "Scan files for viruses", category: "telegram", icon: "fas fa-shield-virus", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_igbot", name: "Instagram Downloader Bot", description: "Download Instagram content", category: "telegram", icon: "fab fa-instagram", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_tiktokbot", name: "TikTok Downloader Bot", description: "Download TikTok videos", category: "telegram", icon: "fab fa-tiktok", type: "free", creditCost: 5, requiresAuth: true },

    // ===== ENCODERS =====
    { id: "tool_base64", name: "Base64 Decode", description: "Encode/decode Base64", category: "encoder", icon: "fas fa-code", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_md5", name: "MD5 Generator", description: "Generate MD5 hashes", category: "encoder", icon: "fas fa-hashtag", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_cyberchef", name: "CyberChef", description: "Cyber Swiss Army knife", category: "encoder", icon: "fas fa-utensils", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_urlencoder", name: "URL Encoder", description: "Encode/decode URLs", category: "encoder", icon: "fas fa-link", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_jwtdecoder", name: "JWT Decoder", description: "Decode JWT tokens", category: "encoder", icon: "fas fa-key", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_hashgen", name: "Hash Generator", description: "Generate various hashes", category: "encoder", icon: "fas fa-hashtag", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_cryptii", name: "Cryptii", description: "Modular conversion tool", category: "encoder", icon: "fas fa-exchange-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_rot13", name: "ROT13 Converter", description: "ROT13 cipher tool", category: "encoder", icon: "fas fa-rotate-right", type: "free", creditCost: 5, requiresAuth: true },

    // ===== SOCIAL MEDIA =====
    { id: "tool_zefoy", name: "Zefoy", description: "Free TikTok likes", category: "social", icon: "fab fa-tiktok", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_ytwatchtime", name: "YT Watch Time", description: "Increase YouTube watch time", category: "social", icon: "fab fa-youtube", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_fbblackbadge", name: "FB Black Badge", description: "Facebook badge trick", category: "social", icon: "fab fa-facebook", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_fbemojiname", name: "FB Emoji Name", description: "Facebook stylish name", category: "social", icon: "fab fa-facebook", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_igdownloader", name: "Instagram Downloader", description: "Download Instagram content", category: "social", icon: "fab fa-instagram", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_tiktokdownloader", name: "TikTok Downloader", description: "Download TikTok videos", category: "social", icon: "fab fa-tiktok", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_twdownloader", name: "Twitter Downloader", description: "Download Twitter videos", category: "social", icon: "fab fa-twitter", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_fbdownloader", name: "Facebook Downloader", description: "Download Facebook videos", category: "social", icon: "fab fa-facebook", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_tiktokregion", name: "TikTok UK/USA Method", description: "TikTok region unlock", category: "social", icon: "fas fa-globe", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_tiktokviral", name: "TikTok Viral Trick", description: "Make videos go viral", category: "social", icon: "fas fa-fire", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_socialblade", name: "Social Blade", description: "Social media stats", category: "social", icon: "fas fa-chart-bar", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_hashtaggen", name: "Hashtag Generator", description: "Generate hashtags", category: "social", icon: "fas fa-hashtag", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_later", name: "Later", description: "Social media scheduling", category: "social", icon: "fas fa-calendar", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_waseemore", name: "WhatsApp See More Maker", description: "Create See More messages", category: "social", icon: "fab fa-whatsapp", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_waseemoregen", name: "WA See More Generator", description: "Long preview generator", category: "social", icon: "fab fa-whatsapp", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_wafontgen", name: "WhatsApp Font Generator", description: "Stylish WhatsApp fonts", category: "social", icon: "fas fa-font", type: "free", creditCost: 5, requiresAuth: true },

    // ===== MOD APPS =====
    { id: "tool_liteapks", name: "LiteAPKs", description: "Premium APKs for free", category: "mods", icon: "fas fa-mobile-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_an1", name: "An1.com", description: "Modded apps and games", category: "mods", icon: "fas fa-gamepad", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_modyolo", name: "Modyolo", description: "Free modded APKs", category: "mods", icon: "fas fa-mobile", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_gbwhatsapp", name: "GB WhatsApp", description: "Modified WhatsApp", category: "mods", icon: "fab fa-whatsapp", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_ytvanced", name: "YouTube Vanced", description: "Ad-free YouTube", category: "mods", icon: "fab fa-youtube", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_spotifymod", name: "Spotify Premium Mod", description: "Free Spotify Premium", category: "mods", icon: "fab fa-spotify", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_capcutmod", name: "CapCut Mod", description: "Premium video editor", category: "mods", icon: "fas fa-video", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_picsartmod", name: "PicsArt Mod", description: "Premium photo editor", category: "mods", icon: "fas fa-image", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_fmwhatsapp", name: "FM WhatsApp", description: "Feature-rich WhatsApp mod", category: "mods", icon: "fab fa-whatsapp", type: "free", creditCost: 5, requiresAuth: true },

    // ===== HACKING TOOLS (Educational) =====
    { id: "tool_cctvhack", name: "CCTV Hacking", description: "CCTV hack tutorial", category: "hacking", icon: "fas fa-video", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_speakerhack", name: "Hack Speaker (Linux)", description: "Hack speakers using Linux", category: "hacking", icon: "fas fa-volume-up", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_mobilehack", name: "Full Mobile Hack", description: "Complete mobile hacking toolkit", category: "hacking", icon: "fas fa-mobile-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_wahack", name: "WhatsApp Hack", description: "WhatsApp hacking method", category: "hacking", icon: "fab fa-whatsapp", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_wametaverify", name: "WhatsApp Meta Verify", description: "Meta verification trick", category: "hacking", icon: "fas fa-check-circle", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_camerahack", name: "Easy Camera Hack", description: "Camera hacking tricks", category: "hacking", icon: "fas fa-camera", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_lochack", name: "Location Hack", description: "GPS location hacking", category: "hacking", icon: "fas fa-map-marker-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_hacklinks", name: "Hacking Links", description: "Collection of hacking links", category: "hacking", icon: "fas fa-link", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_waban", name: "WhatsApp Ban", description: "WhatsApp ban solution", category: "hacking", icon: "fab fa-whatsapp", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_unbanapk", name: "Unban Report APK", description: "Unban tool", category: "hacking", icon: "fas fa-unlock", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_tgproxy", name: "Proxy for Telegram", description: "Telegram proxy app", category: "hacking", icon: "fas fa-shield-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_unlimitedgmail", name: "Unlimited Gmail", description: "Create unlimited Gmail", category: "hacking", icon: "fas fa-envelope", type: "free", creditCost: 5, requiresAuth: true },

    // ===== PRANK TOOLS =====
    { id: "tool_easypaisafake", name: "EasyPaisa Fake", description: "Fake EasyPaisa screenshot", category: "prank", icon: "fas fa-money-bill", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_jazzcashfake", name: "JazzCash Fake", description: "Fake JazzCash screenshot", category: "prank", icon: "fas fa-money-bill", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_fakecnic", name: "Fake CNIC Maker", description: "Create fake CNIC", category: "prank", icon: "fas fa-id-card", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_fakesms", name: "Fake SMS Maker", description: "Create fake SMS", category: "prank", icon: "fas fa-sms", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_fakegps", name: "Fake GPS", description: "Change GPS location", category: "prank", icon: "fas fa-map-marker-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_hiddencam", name: "Hidden Camera", description: "Hidden camera methods", category: "prank", icon: "fas fa-camera", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_phonecontrol", name: "Phone Control App", description: "Remote phone control", category: "prank", icon: "fas fa-mobile-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_prankdial", name: "Prank Dial", description: "Prank call generator", category: "prank", icon: "fas fa-phone", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_hackertyper", name: "Hackertyper", description: "Fake hacker screen", category: "prank", icon: "fas fa-keyboard", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_geekprank", name: "Geek Prank", description: "Windows XP prank", category: "prank", icon: "fas fa-desktop", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_fakeupdate", name: "Fake Update", description: "Fake Windows update", category: "prank", icon: "fas fa-sync", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_prankmenot", name: "Prank Me Not", description: "Collection of pranks", category: "prank", icon: "fas fa-laugh", type: "free", creditCost: 5, requiresAuth: true },

    // ===== COURSES =====
    { id: "tool_termuxcourse", name: "Termux Course", description: "Complete Termux tutorial", category: "courses", icon: "fas fa-terminal", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_bugbountycourse", name: "Bug Bounty Course", description: "Bug hunting from scratch", category: "courses", icon: "fas fa-bug", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_androidhackcourse", name: "Android Hacking Course", description: "Android pentesting", category: "courses", icon: "fab fa-android", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_canvacourse", name: "Canva Full Course", description: "Complete Canva design", category: "courses", icon: "fas fa-palette", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_500tbcourses", name: "500 TB Courses", description: "Massive course collection", category: "courses", icon: "fas fa-database", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_ytseocourse", name: "YT SEO Course", description: "YouTube SEO mastery", category: "courses", icon: "fab fa-youtube", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_editingpack", name: "Full Editing Pack", description: "Video editing resources", category: "courses", icon: "fas fa-film", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_memespack", name: "Memes Pack", description: "Meme collection", category: "courses", icon: "fas fa-laugh", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_designerbundle", name: "Biggest Designer Bundle", description: "Designer resources", category: "courses", icon: "fas fa-drafting-compass", type: "free", creditCost: 5, requiresAuth: true },

    // ===== GAMING =====
    { id: "tool_vicecity", name: "Vice City", description: "GTA Vice City with cheats", category: "gaming", icon: "fas fa-gamepad", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_gtasanandreas", name: "GTA San Andreas", description: "GTA San Andreas", category: "gaming", icon: "fas fa-gamepad", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_cheatengine", name: "Cheat Engine", description: "Game hacking tool", category: "gaming", icon: "fas fa-cog", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_luckypatcher", name: "Lucky Patcher", description: "Modify Android apps", category: "gaming", icon: "fab fa-android", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_gameguardian", name: "Game Guardian", description: "Game hacker for Android", category: "gaming", icon: "fas fa-shield-alt", type: "free", creditCost: 5, requiresAuth: true },

    // ===== FONTS =====
    { id: "tool_pixellabfonts", name: "3K Pixellab Fonts", description: "3000+ fonts for PixelLab", category: "fonts", icon: "fas fa-font", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_stylishkb", name: "Stylish Keyboard", description: "Custom keyboard fonts", category: "fonts", icon: "fas fa-keyboard", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_fontgenerator", name: "Font Generator", description: "Generate stylish fonts", category: "fonts", icon: "fas fa-font", type: "free", creditCost: 5, requiresAuth: true },

    // ===== UTILITIES =====
    { id: "tool_fastsettings", name: "Mobile Fast Setting", description: "Mobile settings trick", category: "utility", icon: "fas fa-tachometer-alt", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_unofficialfix", name: "Solve Unofficial Problem", description: "Fix app issues", category: "utility", icon: "fas fa-wrench", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_100l5", name: "100L5", description: "Online Tools Provider", category: "utility", icon: "fas fa-tools", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_removeads", name: "Remove Phone Ads", description: "Remove mobile ads", category: "utility", icon: "fas fa-ban", type: "free", creditCost: 5, requiresAuth: true },
    { id: "tool_ownerpage", name: "OWNER", description: "Official owner page", category: "utility", icon: "fas fa-user", type: "free", creditCost: 5, requiresAuth: true },

    // ===== PREMIUM TOOLS =====
    { id: "tool_fahadtechsite", name: "Fahad Tech Website", description: "Professional hacking Tools Website", category: "premium", icon: "fas fa-crown", type: "premium", creditCost: 0, requiresAuth: false },
    { id: "tool_galleryhack", name: "Gallery Hack", description: "Make Any Type Of Gallery Rat APK", category: "premium", icon: "fas fa-crown", type: "premium", creditCost: 0, requiresAuth: false },
    { id: "tool_premiumbot", name: "Premium Bot", description: "Collection of premium Tricks & Tools", category: "premium", icon: "fas fa-crown", type: "premium", creditCost: 0, requiresAuth: false },
    { id: "tool_devilex", name: "Devile-X Toolkit", description: "Advanced Hacking Toolkit", category: "premium", icon: "fas fa-crown", type: "premium", creditCost: 0, requiresAuth: false },
    { id: "tool_maketoolkit", name: "Make Your Own Toolkit", description: "Custom toolkit creation", category: "premium", icon: "fas fa-crown", type: "premium", creditCost: 0, requiresAuth: false }
];
