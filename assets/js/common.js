// Common JS helper for profile data, news, and products using LocalStorage

const DEFAULT_NEWS = [
    {
        id: "news-1",
        title: "Văn Tiến Khánh ra mắt giao diện Profile mới cực ngầu",
        image: "https://i.ibb.co/b5cYhf5m/image.png",
        summary: "Giao diện được thiết kế với phong cách Glassmorphism hiện đại, hỗ trợ chế độ Dark Mode và hiệu ứng tuyết rơi ấn tượng.",
        content: "Hôm nay, Văn Tiến Khánh chính thức giới thiệu phiên bản giao diện profile cá nhân mới. Phiên bản này được tối ưu hóa hiệu năng, cải tiến trải nghiệm người dùng với các hiệu ứng động mượt mà, đồng thời bổ sung thêm các tính năng như nghe nhạc trực tuyến và quản lý nội dung động hoàn toàn thông qua LocalStorage.",
        date: "2026-06-17"
    },
    {
        id: "news-2",
        title: "Xu hướng thiết kế Web Portfolio năm 2026",
        image: "https://i.imgur.com/zEJOvAO.gif",
        summary: "Cùng điểm qua những phong cách thiết kế trang cá nhân đang làm mưa làm gió trong cộng đồng lập trình viên.",
        content: "Thiết kế web tối giản kết hợp với các hiệu ứng vi mô (micro-animations) đang trở thành tiêu chuẩn mới. Việc sử dụng các bảng màu tinh tế, font chữ hiện đại như Inter hay Outfit giúp tăng tính thẩm mỹ vượt trội. Ngoài ra, việc tích hợp trình phát nhạc và các tương tác thú vị như hiệu ứng click chuột cũng giúp giữ chân người dùng lâu hơn.",
        date: "2026-06-16"
    }
];

const DEFAULT_PRODUCTS = [
    {
        id: "prod-1",
        name: "Telegram Payment Verification Bot",
        price: "Open Source",
        image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=400",
        description: "Hệ thống Telegram Bot hỗ trợ tự động xác minh biên lai thanh toán và đồng bộ dữ liệu giao dịch ngân hàng."
    },
    {
        id: "prod-2",
        name: "Auto OTP Service Tester",
        price: "Open Source",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400",
        description: "Công cụ Python tự động gửi yêu cầu kiểm thử hiệu năng gửi nhận mã OTP của các nhà mạng và dịch vụ."
    }
];

const DEFAULT_SOCIALS = [
    {
        id: "soc-1",
        name: "Telegram",
        icon: "ri-telegram-fill",
        url: "https://t.me/iamkyto"
    },
    {
        id: "soc-2",
        name: "Facebook",
        icon: "ri-facebook-fill",
        url: "https://www.facebook.com/khanhtinevna008"
    }
];

const DEFAULT_PAYMENTS = [
    { id: "pay-1", bankName: "Vietcombank", accountNumber: "1064827480", accountName: "VAN TIEN KHANH", logoUrl: "https://api.vietqr.io/img/VCB.png" }
];

const DEFAULT_GUESTBOOK = [
    { id: "msg-1", name: "Nguyễn Hoàng Nam", emoji: "💻", message: "Web xịn đét anh ơi! Hiệu ứng glassmorphism nhìn cực kỳ chuyên nghiệp và mượt.", date: "2026-07-10 14:32" },
    { id: "msg-2", name: "Lê Minh Triết", emoji: "🔥", message: "Em rất thích bộ Telegram payment verification bot của anh. Mong anh ra mắt thêm nhiều project open source chất lượng hơn nữa!", date: "2026-07-11 08:15" },
    { id: "msg-3", name: "Khách viếng thăm", emoji: "✨", message: "Giao diện tối ưu SEO tốt ghê, load cực kỳ nhanh luôn.", date: "2026-07-11 10:05" }
];

// Check if old owner values or empty localStorage to perform migration
const isOldOwner = !localStorage.getItem("profile_name") || localStorage.getItem("profile_name") === "Vuong Thanh Dieu" || localStorage.getItem("profile_name") === "Vương Thanh Diệu";

const DEFAULT_MUSIC = [
    { id: "music-1", title: "Nơi Này Có Anh - Sơn Tùng M-TP", url: "https://archive.org/download/y2meta.net_320kbps-noi-nay-co-anh-official-music-video-son-tung-m-tp/y2meta.net_320kbps-noi-nay-co-anh-official-music-video-son-tung-m-tp.mp3" }
];

if (isOldOwner) {
    localStorage.clear(); // Clear old layout/owner state completely
    localStorage.setItem("profile_name", "Văn Tiến Khánh");
    localStorage.setItem("profile_avatar", "./assets/img/avatar.jpg");
    localStorage.setItem("profile_bio", "Hello, my name is Văn Tiến Khánh.");
    localStorage.setItem("profile_footer_text", "Văn Tiến Khánh");
    localStorage.setItem("profile_footer_url", "#");
    localStorage.setItem("support_link_text", "Liên hệ hỗ trợ");
    localStorage.setItem("support_link_url", "#");
    localStorage.setItem("profile_socials", JSON.stringify(DEFAULT_SOCIALS));
    localStorage.setItem("payment_accounts", JSON.stringify(DEFAULT_PAYMENTS));
    localStorage.setItem("custom_music_tracks", JSON.stringify(DEFAULT_MUSIC));
}

// Initialize default data if not exists (fallback)
if (!localStorage.getItem("profile_name")) {
    localStorage.setItem("profile_name", "Văn Tiến Khánh");
}
if (!localStorage.getItem("profile_avatar")) {
    localStorage.setItem("profile_avatar", "./assets/img/avatar.jpg");
}
if (!localStorage.getItem("profile_bio")) {
    localStorage.setItem("profile_bio", "Hello, my name is Văn Tiến Khánh.");
}
if (!localStorage.getItem("profile_footer_text")) {
    localStorage.setItem("profile_footer_text", "Văn Tiến Khánh");
}
if (!localStorage.getItem("profile_footer_url")) {
    localStorage.setItem("profile_footer_url", "#");
}
if (!localStorage.getItem("support_link_text")) {
    localStorage.setItem("support_link_text", "Liên hệ hỗ trợ");
}
if (!localStorage.getItem("support_link_url")) {
    localStorage.setItem("support_link_url", "#");
}
if (!localStorage.getItem("profile_socials") || localStorage.getItem("profile_socials").includes("My Github")) {
    localStorage.setItem("profile_socials", JSON.stringify(DEFAULT_SOCIALS));
} else {
    // Migrate or update Facebook link to the requested URL
    try {
        let currentSocials = JSON.parse(localStorage.getItem("profile_socials")) || [];
        const fbIndex = currentSocials.findIndex(s => s.name.toLowerCase() === "facebook" || s.url.includes("facebook.com"));
        if (fbIndex === -1) {
            currentSocials.push({
                id: "soc-2",
                name: "Facebook",
                icon: "ri-facebook-fill",
                url: "https://www.facebook.com/khanhtinevna008"
            });
            localStorage.setItem("profile_socials", JSON.stringify(currentSocials));
        } else {
            currentSocials[fbIndex].url = "https://www.facebook.com/khanhtinevna008";
            localStorage.setItem("profile_socials", JSON.stringify(currentSocials));
        }
    } catch (e) {
        console.error("Failed to migrate socials", e);
    }
}
if (!localStorage.getItem("payment_accounts")) {
    localStorage.setItem("payment_accounts", JSON.stringify(DEFAULT_PAYMENTS));
}
if (!localStorage.getItem("news_articles")) {
    localStorage.setItem("news_articles", JSON.stringify(DEFAULT_NEWS));
}
if (!localStorage.getItem("product_list") || localStorage.getItem("product_list").includes("Source Code Profile Premium V5")) {
    localStorage.setItem("product_list", JSON.stringify(DEFAULT_PRODUCTS));
}
if (!localStorage.getItem("custom_music_tracks") || JSON.parse(localStorage.getItem("custom_music_tracks")).length === 0) {
    localStorage.setItem("custom_music_tracks", JSON.stringify(DEFAULT_MUSIC));
}
if (!localStorage.getItem("guestbook_messages")) {
    localStorage.setItem("guestbook_messages", JSON.stringify(DEFAULT_GUESTBOOK));
}

// Force update profile_bio if it has the old content
if (localStorage.getItem("profile_bio") && localStorage.getItem("profile_bio").includes("I am a freelance programmer")) {
    localStorage.setItem("profile_bio", "Hello, my name is Văn Tiến Khánh.");
}

// Force update profile_avatar if it is not the local avatar path
if (localStorage.getItem("profile_avatar") && localStorage.getItem("profile_avatar") !== "./assets/img/avatar.jpg") {
    localStorage.setItem("profile_avatar", "./assets/img/avatar.jpg");
}

// Function to update profile elements in DOM
function updateProfileDOM() {
    const name = localStorage.getItem("profile_name");
    const avatar = localStorage.getItem("profile_avatar");
    const bio = localStorage.getItem("profile_bio");
    const footerText = localStorage.getItem("profile_footer_text");
    const footerUrl = localStorage.getItem("profile_footer_url");
    const socials = JSON.parse(localStorage.getItem("profile_socials")) || [];
    const payments = JSON.parse(localStorage.getItem("payment_accounts")) || [];

    // Check layout type
    const isNewLayout = document.querySelector(".layout-grid") !== null;

    // Page title
    document.title = name + " - Portfolio";
    const htmlTag = document.querySelector("html");
    if (htmlTag) {
        htmlTag.setAttribute("data-title-loader", name);
    }

    // Logo text updates
    const logoTexts = document.querySelectorAll(".logo-text");
    logoTexts.forEach(el => {
        if (el) {
            el.innerHTML = `${name.split(' ').map(w => w[0]).join('')}<span>.DEV</span>`;
        }
    });

    // Homepage name elements
    const nameElement = document.getElementById("profile-name-display");
    if (nameElement) {
        const tick = nameElement.querySelector(".blue-tick, .ri-checkbox-circle-fill, .verified-badge");
        if (tick) {
            nameElement.innerHTML = name + " " + tick.outerHTML;
        } else {
            nameElement.innerHTML = `${name} <svg class="verified-badge" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 22px; height: 22px; display: inline-block; vertical-align: middle; filter: drop-shadow(0 0 5px var(--secondary-glow));" title="Tài khoản chính chủ"><defs><linearGradient id="verified-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--secondary)" /><stop offset="100%" stop-color="var(--primary)" /></linearGradient></defs><path d="M12 2.05a2 2 0 0 1 1.73 1l.5.86a2 2 0 0 0 1.73 1l1 .17a2 2 0 0 1 1.45 1.45l.17 1a2 2 0 0 0 1 1.73l.86.5a2 2 0 0 1 0 3.46l-.86.5a2 2 0 0 0-1 1.73l-.17 1a2 2 0 0 1-1.45 1.45l-1 .17a2 2 0 0 0-1.73 1l-.5.86a2 2 0 0 1-3.46 0l-.5-.86a2 2 0 0 0-1.73-1l-1-.17a2 2 0 0 1-1.45-1.45l-.17-1a2 2 0 0 0-1-1.73l-.86-.5a2 2 0 0 1 0-3.46l.86-.5a2 2 0 0 0 1 1.73l.17-1a2 2 0 0 1 1.45-1.45l1-.17a2 2 0 0 0 1.73-1l.5-.86A2 2 0 0 1 12 2.05z" fill="url(#verified-gradient)" /><path d="M9 11.5L11 13.5L15.5 9" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
        }
    }

    const newProfileName = document.querySelector(".profile-name");
    if (newProfileName) {
        newProfileName.innerHTML = `${name} <svg class="verified-badge" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" title="Tài khoản chính chủ"><defs><linearGradient id="verified-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--secondary)" /><stop offset="100%" stop-color="var(--primary)" /></linearGradient></defs><path d="M12 2.05a2 2 0 0 1 1.73 1l.5.86a2 2 0 0 0 1.73 1l1 .17a2 2 0 0 1 1.45 1.45l.17 1a2 2 0 0 0 1 1.73l.86.5a2 2 0 0 1 0 3.46l-.86.5a2 2 0 0 0-1 1.73l-.17 1a2 2 0 0 1-1.45 1.45l-1 .17a2 2 0 0 0-1.73 1l-.5.86a2 2 0 0 1-3.46 0l-.5-.86a2 2 0 0 0-1.73-1l-1-.17a2 2 0 0 1-1.45-1.45l-.17-1a2 2 0 0 0-1-1.73l-.86-.5a2 2 0 0 1 0-3.46l.86-.5a2 2 0 0 0 1 1.73l.17-1a2 2 0 0 1 1.45-1.45l1-.17a2 2 0 0 0 1.73-1l.5-.86A2 2 0 0 1 12 2.05z" fill="url(#verified-gradient)" /><path d="M9 11.5L11 13.5L15.5 9" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>`;
    }

    // Avatar updates
    const avatarElements = document.querySelectorAll(".author-avatar, .logo-ws, .avatar-img");
    avatarElements.forEach(el => {
        if (el) {
            el.src = avatar.startsWith("./") || avatar.startsWith("../") || avatar.startsWith("http") ? avatar : "./assets/img/avatar.jpg";
        }
    });

    // Bio update
    const bioElement = document.getElementById("profile-bio-display");
    if (bioElement) {
        bioElement.innerHTML = bio;
    }
    const newBioElement = document.querySelector(".profile-bio");
    if (newBioElement) {
        newBioElement.innerHTML = bio;
    }

    // Footer website link update
    const footerLink = document.getElementById("footer-website-link");
    if (footerLink) {
        footerLink.textContent = footerText;
        footerLink.href = footerUrl;
    }

    const footerTextEl = document.querySelector(".footer p");
    if (footerTextEl) {
        footerTextEl.innerHTML = `&copy; <span id="year-container">${new Date().getFullYear()}</span> ${footerText}. Built with 💖 and Glassmorphism.`;
    }

    // Footer links updates
    const footerLinksContainer = document.querySelector(".footer-links");
    if (footerLinksContainer) {
        const supportText = localStorage.getItem("support_link_text") || "Liên hệ";
        const supportUrl = localStorage.getItem("support_link_url") || "#";
        footerLinksContainer.innerHTML = `
            <a href="./" class="footer-link">Trang chủ</a>
            <a href="https://github.com/vantienkhanh" target="_blank" class="footer-link">GitHub</a>
            <a href="${supportUrl}" target="_blank" class="footer-link">${supportText}</a>
        `;
    }

    // Render social links
    const socialContainer = document.getElementById("profile-social-container");
    if (socialContainer) {
        // Keep the map pin element & music element
        const pinEl = socialContainer.querySelector(".ri-map-pin-line")?.parentElement;
        const musicEl = document.getElementById("music-display-container");
        socialContainer.innerHTML = "";
        if (pinEl) {
            socialContainer.appendChild(pinEl);
        }
        if (musicEl) {
            socialContainer.appendChild(musicEl);
        }
        
        socials.forEach(soc => {
            const a = document.createElement("a");
            a.className = "flex flex-row items-center justify-center gap-x-2 hover:opacity-75 transition-all text-muted-foreground hover:text-foreground";
            a.href = soc.url;
            a.target = "_blank";
            a.innerHTML = `
                <i class="${soc.icon}"></i>
                <p>${soc.name}</p>
            `;
            socialContainer.appendChild(a);
        });
    }

    const newSocialContainer = document.querySelector(".profile-socials");
    if (newSocialContainer) {
        newSocialContainer.innerHTML = "";
        socials.forEach(soc => {
            const a = document.createElement("a");
            a.className = "social-btn";
            a.href = soc.url;
            a.target = "_blank";
            a.title = soc.name;
            a.innerHTML = `<i class="${soc.icon}"></i>`;
            newSocialContainer.appendChild(a);
        });
    }

    // Render payment accounts
    const paymentContainer = document.getElementById("payment-accounts-container");
    if (paymentContainer) {
        paymentContainer.innerHTML = "";
        if (payments.length === 0) {
            paymentContainer.innerHTML = `<p class="col-span-2 text-center text-muted-foreground">Chưa cấu hình tài khoản thanh toán.</p>`;
        } else {
            payments.forEach(pay => {
                const a = document.createElement("a");
                a.className = "group relative text-sm leading-normal no-underline hover:bg-transparent";
                a.innerHTML = `
                    <div class="relative flex flex-row items-center gap-x-4 px-2 py-1.5 transition-all">
                        <div class="absolute -inset-0 z-10 rounded-lg border border-border bg-muted opacity-0 transition-all group-hover:opacity-50"></div>
                        <img src="${pay.logoUrl || './assets/img/icon/acb.png'}" class="z-20 h-10 w-10 rounded-lg bg-muted p-2" alt="${pay.bankName}">
                        <div class="z-20 flex flex-col">
                            <div class="font-medium">
                                ${pay.accountName} <i data-ws-copy="${pay.accountName}" class="ri-file-copy-line text-muted-foreground cursor-pointer"></i>
                            </div>
                            <div class="font-normal text-muted-foreground">
                                ${pay.accountNumber} <i data-ws-copy="${pay.accountNumber}" class="ri-file-copy-line cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                `;
                paymentContainer.appendChild(a);
            });
        }
    }

    const portfolioPaymentGrid = document.getElementById("portfolio-payment-grid");
    if (portfolioPaymentGrid) {
        portfolioPaymentGrid.innerHTML = "";
        if (payments.length === 0) {
            portfolioPaymentGrid.innerHTML = `<p class="text-center text-muted-foreground" style="grid-column: 1/-1;">Chưa cấu hình tài khoản thanh toán.</p>`;
        } else {
            payments.forEach(pay => {
                // Bank Card
                const bankCard = document.createElement("div");
                bankCard.className = "bank-card";
                bankCard.innerHTML = `
                    <div class="bank-header">
                      <span class="bank-name">${pay.bankName}</span>
                      <i class="ri-bank-fill bank-logo"></i>
                    </div>
                    <div class="bank-number">
                      <span class="card-num-text">${pay.accountNumber}</span>
                      <button class="copy-btn" onclick="copyCardNumText(this, '${pay.accountNumber}')" title="Sao chép số tài khoản">
                        <i class="ri-file-copy-line"></i>
                      </button>
                    </div>
                    <div class="bank-holder">${pay.accountName}</div>
                `;
                portfolioPaymentGrid.appendChild(bankCard);

                // QR Card
                const qrCard = document.createElement("div");
                qrCard.className = "qr-card";
                qrCard.onclick = () => openQRModal(pay);
                qrCard.innerHTML = `
                    <i class="ri-qr-code-line qr-icon"></i>
                    <div class="qr-title">Quét Mã QR (${pay.bankName})</div>
                    <div class="qr-desc">Chuyển khoản nhanh qua VietQR</div>
                `;
                portfolioPaymentGrid.appendChild(qrCard);
            });
        }
    }

    // Render products/projects
    const projectsGrid = document.querySelector(".projects-grid");
    if (projectsGrid) {
        projectsGrid.innerHTML = "";
        const products = JSON.parse(localStorage.getItem("product_list")) || [];
        if (products.length === 0) {
            projectsGrid.innerHTML = `<p class="text-center text-muted-foreground" style="grid-column: 1/-1;">Chưa có sản phẩm hoặc dự án nào.</p>`;
        } else {
            products.forEach(prod => {
                const card = document.createElement("div");
                card.className = "project-card";
                let category = "web";
                const lowerName = prod.name.toLowerCase();
                const lowerDesc = prod.description.toLowerCase();
                if (lowerName.includes("bot") || lowerName.includes("telegram") || lowerDesc.includes("bot")) {
                    category = "bot";
                }
                card.setAttribute("data-category", category);

                const formattedPrice = typeof prod.price === 'string' ? prod.price : (prod.price > 0 ? formatVND(prod.price) : "Open Source");
                const productImg = prod.image && (prod.image.startsWith("http") || prod.image.startsWith("./")) ? prod.image : "./assets/img/avatar.jpg";

                let linksHTML = '';
                if (prod.price === "Open Source") {
                    linksHTML = `
                      <a href="https://github.com/vantienkhanh" target="_blank" class="project-link"><i class="ri-github-line"></i> Xem Code</a>
                      <a href="https://t.me/iamkyto" target="_blank" class="project-link"><i class="ri-chat-3-line"></i> Thảo luận</a>
                    `;
                } else {
                    linksHTML = `
                      <a href="#" class="project-link" onclick="openProductContact('${prod.name.replace(/'/g, "\\'")}')"><i class="ri-shopping-cart-2-line"></i> Mua ngay</a>
                      <a href="https://t.me/iamkyto" target="_blank" class="project-link"><i class="ri-chat-3-line"></i> Tư vấn</a>
                    `;
                }

                card.innerHTML = `
                    <div class="project-banner" style="height: 160px; overflow: hidden; position: relative;">
                      <img src="${productImg}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                      <div class="project-banner-fallback" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--primary-glow), var(--secondary-glow));">
                        <i class="${category === 'bot' ? 'ri-telegram-line' : 'ri-instance-line'}" style="font-size: 3.5rem; opacity: 0.5;"></i>
                      </div>
                      <div class="project-tags">
                        <span class="project-tag">${category === 'bot' ? 'Telegram Bot' : 'Website'}</span>
                        <span class="project-tag" style="background: var(--secondary-glow); color: var(--secondary);">${formattedPrice}</span>
                      </div>
                    </div>
                    <div class="project-content">
                      <h4 class="project-title">${prod.name}</h4>
                      <p class="project-desc">${prod.description}</p>
                      <div class="project-links">
                        ${linksHTML}
                      </div>
                    </div>
                `;
                projectsGrid.appendChild(card);
            });
        }
    }

    // Render news articles
    const newsGrid = document.getElementById("portfolio-news-grid");
    if (newsGrid) {
        newsGrid.innerHTML = "";
        const newsArticles = JSON.parse(localStorage.getItem("news_articles")) || [];
        if (newsArticles.length === 0) {
            newsGrid.innerHTML = `<p class="text-center text-muted-foreground" style="grid-column: 1/-1;">Chưa có bài viết nào.</p>`;
        } else {
            newsArticles.forEach(article => {
                const card = document.createElement("div");
                card.className = "news-card";
                const newsImg = article.image && (article.image.startsWith("http") || article.image.startsWith("./")) ? article.image : "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600";
                card.innerHTML = `
                    <div class="news-image-wrapper">
                      <img src="${newsImg}" alt="${article.title}" class="news-image" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600'">
                    </div>
                    <div class="news-card-content">
                      <div class="news-card-date"><i class="ri-calendar-line"></i> ${article.date}</div>
                      <h4 class="news-card-title">${article.title}</h4>
                      <p class="news-card-summary">${article.summary}</p>
                      <span class="news-card-link" onclick="openNewsDetail('${article.id}')">Xem chi tiết <i class="ri-arrow-right-line"></i></span>
                    </div>
                `;
                newsGrid.appendChild(card);
            });
        }
    }
}

// Custom Music Player Hook with Autoplay, State Persistence, and Gestures
let customAudioInstance = null;
let customTrackIdx = parseInt(localStorage.getItem("music_track_idx") || "0", 10);
let hasAudioStarted = false;

function updateMusicUI(trackTitle, isPlaying) {
    const musicContainer = document.getElementById("music-display-container");
    const musicTitle = document.getElementById("music-track-title");
    const musicIcon = musicContainer ? musicContainer.querySelector("i") : null;

    if (musicContainer && musicTitle) {
        musicContainer.style.display = "flex";
        musicTitle.textContent = trackTitle;
        if (isPlaying) {
            musicTitle.classList.remove("text-muted-foreground");
            musicTitle.classList.add("text-primary");
            if (musicIcon) {
                musicIcon.className = "ri-music-2-fill animate-bounce";
            }
        } else {
            musicTitle.classList.add("text-muted-foreground");
            musicTitle.classList.remove("text-primary");
            if (musicIcon) {
                musicIcon.className = "ri-music-2-line";
            }
            musicTitle.textContent = "[Tạm dừng] " + trackTitle;
        }
    }

    // New layout elements
    const musicWidget = document.getElementById("music-player");
    if (musicWidget) {
        const statusEl = musicWidget.querySelector(".music-status");
        const titleEl = musicWidget.querySelector(".music-title");
        if (isPlaying) {
            musicWidget.classList.remove("paused");
            if (statusEl) statusEl.textContent = "Đang Phát Nhạc";
            if (titleEl) titleEl.textContent = trackTitle;
        } else {
            musicWidget.classList.add("paused");
            if (statusEl) statusEl.textContent = "Nhạc Đang Tắt";
            if (titleEl) titleEl.textContent = trackTitle ? "[Tạm dừng] " + trackTitle : "Click để bật nhạc thư giãn";
        }
    }
}

function playCustomMusic() {
    const tracks = JSON.parse(localStorage.getItem("custom_music_tracks")) || DEFAULT_MUSIC;
    if (tracks.length === 0) return;
    if (customAudioInstance && !customAudioInstance.paused) return; // Already playing

    function playTrack(index) {
        if (customAudioInstance) {
            customAudioInstance.pause();
            customAudioInstance = null;
        }

        const track = tracks[index % tracks.length];
        customAudioInstance = new Audio(track.url);

        // Load saved playback progress if continuing the same track
        const savedTrackIdx = parseInt(localStorage.getItem("music_track_idx") || "0", 10);
        if (savedTrackIdx === index) {
            const savedTime = parseFloat(localStorage.getItem("music_current_time") || "0");
            if (savedTime > 0) {
                customAudioInstance.addEventListener("loadedmetadata", () => {
                    if (customAudioInstance) {
                        customAudioInstance.currentTime = savedTime;
                    }
                }, { once: true });
            }
        }

        // Persist time progress
        customAudioInstance.addEventListener("timeupdate", () => {
            if (customAudioInstance) {
                localStorage.setItem("music_current_time", customAudioInstance.currentTime.toString());
            }
        });

        // Set track indices
        localStorage.setItem("music_track_idx", index.toString());

        customAudioInstance.play().then(() => {
            localStorage.setItem("music_is_playing", "true");
            if (window.FuiToast) {
                FuiToast.success("Đang phát: " + track.title, { isClose: true });
            } else {
                console.log("Đang phát: " + track.title);
            }
            updateMusicUI(track.title, true);
        }).catch(err => {
            console.warn("Autoplay blocked, waiting for user interaction.", err);
            updateMusicUI(track.title, false);
        });

        customAudioInstance.addEventListener("ended", () => {
            localStorage.setItem("music_current_time", "0");
            customTrackIdx = (index + 1) % tracks.length;
            playTrack(customTrackIdx);
        });
    }

    playTrack(customTrackIdx);
}

function initMusicPlayer() {
    playCustomMusic();

    const startOnGesture = () => {
        playCustomMusic();
        document.removeEventListener("click", startOnGesture);
        document.removeEventListener("touchstart", startOnGesture);
    };

    document.addEventListener("click", startOnGesture);
    document.addEventListener("touchstart", startOnGesture);

    // Disable default prompts on Home Page
    $(document).ready(function() {
        $("body").off("click", ".confirm-btn");
        $("#toast-prompt").remove();

        // Specific handler for lock screen click/unlock to play music
        $(".td-lock-screen").on("click touchstart", function() {
            playCustomMusic();
        });

        // Play/Pause when clicking the music container
        $("body").on("click", "#music-display-container", function() {
            if (customAudioInstance) {
                const tracks = JSON.parse(localStorage.getItem("custom_music_tracks")) || DEFAULT_MUSIC;
                const track = tracks[customTrackIdx % tracks.length];
                if (customAudioInstance.paused) {
                    customAudioInstance.play().then(() => {
                        updateMusicUI(track.title, true);
                    });
                } else {
                    customAudioInstance.pause();
                    updateMusicUI(track.title, false);
                }
            } else {
                playCustomMusic();
            }
        });
    });
}

// Format currency
function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Global helpers for new layout page
window.copyCardNumText = function(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        if (window.showToast) {
            showToast('Đã sao chép số tài khoản thành công!');
        } else {
            alert('Đã sao chép: ' + text);
        }
    }).catch(err => {
        console.error('Lỗi khi sao chép: ', err);
    });
};

window.openQRModal = function(pay) {
    const modal = document.getElementById("qr-modal");
    if (!modal) return;
    
    const modalTitle = modal.querySelector(".qr-title") || modal.querySelector(".modal-title");
    if (modalTitle) modalTitle.textContent = `Mã QR ${pay.bankName}`;
    
    let bankCode = pay.bankName.toLowerCase().replace(/\s/g, '');
    if (bankCode.includes("vietcombank")) bankCode = "vcb";
    else if (bankCode.includes("techcombank")) bankCode = "tcb";
    else if (bankCode.includes("mbbank") || bankCode.includes("mb")) bankCode = "mb";
    else if (bankCode.includes("vietinbank")) bankCode = "vietinbank";
    else if (bankCode.includes("bidv")) bankCode = "bidv";
    else if (bankCode.includes("acb")) bankCode = "acb";
    else if (bankCode.includes("momo")) bankCode = "momo";

    let qrUrl = "";
    if (bankCode === "momo") {
        qrUrl = pay.logoUrl || `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(pay.accountNumber)}`;
    } else {
        qrUrl = `https://img.vietqr.io/image/${bankCode}-${pay.accountNumber}-compact2.png?amount=0&addInfo=Ung%20ho%20VTK&accountName=${encodeURIComponent(pay.accountName)}`;
    }
    
    const qrImg = modal.querySelector(".qr-image-display img") || modal.querySelector(".modal-qr-img");
    if (qrImg) qrImg.src = qrUrl;
    
    const descP = modal.querySelector(".modal-content p:last-of-type") || modal.querySelector(".qr-desc-detail");
    if (descP) {
        descP.innerHTML = `Số tài khoản: <strong>${pay.accountNumber}</strong> - <strong>${pay.accountName}</strong>`;
    }
    toggleModal(true);
};

window.openProductContact = function(prodName) {
    const supportUrl = localStorage.getItem("support_link_url") || "https://t.me/iamkyto";
    const msg = encodeURIComponent(`Xin chào, tôi muốn mua sản phẩm: ${prodName}`);
    let url = supportUrl;
    if (url.includes("t.me")) {
        if (url.endsWith("/")) url = url.slice(0, -1);
        window.open(url, "_blank");
    } else {
        window.open(url, "_blank");
    }
    if (window.showToast) {
        showToast(`Đang kết nối tới hỗ trợ để mua: ${prodName}`);
    }
};

window.openNewsDetail = function(articleId) {
    const newsArticles = JSON.parse(localStorage.getItem("news_articles")) || [];
    const article = newsArticles.find(a => a.id === articleId);
    if (!article) return;
    
    const modal = document.getElementById("news-modal");
    if (!modal) return;
    
    const dateEl = modal.querySelector(".news-modal-date");
    if (dateEl) dateEl.innerHTML = `<i class="ri-calendar-line"></i> ${article.date}`;
    
    const titleEl = modal.querySelector(".news-modal-title");
    if (titleEl) titleEl.textContent = article.title;
    
    const imgEl = modal.querySelector(".news-modal-img");
    if (imgEl) imgEl.src = article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=600';
    
    const contentEl = modal.querySelector(".news-modal-content");
    if (contentEl) contentEl.innerHTML = article.content.replace(/\n/g, '<br>');
    
    toggleNewsModal(true);
};

window.toggleNewsModal = function(show) {
    const modal = document.getElementById('news-modal');
    if (!modal) return;
    if (show) {
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
};

window.closeNewsModalOnOuterClick = function(evt) {
    const modal = document.getElementById('news-modal');
    if (evt.target === modal) {
        toggleNewsModal(false);
    }
};


// Load profile on start
document.addEventListener("DOMContentLoaded", () => {
    updateProfileDOM();
    initMusicPlayer();
    initGuestbook();
    initTerminal();
    initTiltEffect();

    // Dynamically load corrected cursor effect globally if not already present on desktop
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (!isMobile && !document.querySelector('script[src*="cursor-magic.js"]')) {
        const script = document.createElement("script");
        script.src = "./assets/js/cursor-magic.js?v=4.3";
        document.head.appendChild(script);
    }
});

// ==========================================
// FEATURE: INTERACTIVE GUESTBOOK LOGIC
// ==========================================
function initGuestbook() {
    loadGuestbookMessages();
}

function loadGuestbookMessages() {
    const listContainer = document.getElementById("guestbook-messages-list");
    if (!listContainer) return;

    const messages = JSON.parse(localStorage.getItem("guestbook_messages")) || DEFAULT_GUESTBOOK;
    listContainer.innerHTML = "";

    if (messages.length === 0) {
        listContainer.innerHTML = `<div style="text-align: center; padding: 1.5rem; color: var(--text-muted); font-size: 0.85rem;">Chưa có lời nhắn nào. Hãy là người đầu tiên để lại lời chúc! 😊</div>`;
        return;
    }

    messages.forEach(msg => {
        const item = document.createElement("div");
        item.style.background = "rgba(255, 255, 255, 0.02)";
        item.style.border = "1px solid var(--border-color)";
        item.style.borderRadius = "12px";
        item.style.padding = "0.75rem 1rem";
        item.style.display = "flex";
        item.style.gap = "0.75rem";
        item.style.alignItems = "flex-start";

        item.innerHTML = `
            <div style="font-size: 1.5rem; background: var(--primary-glow); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.05);">${msg.emoji || '✨'}</div>
            <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                    <strong style="color: var(--text-main); font-size: 0.85rem;">${msg.name}</strong>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${msg.date}</span>
                </div>
                <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.4; white-space: pre-wrap;">${msg.message}</p>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

window.submitGuestbookMessage = function(event) {
    event.preventDefault();
    const nameEl = document.getElementById("guestbook-name");
    const emojiEl = document.getElementById("guestbook-emoji");
    const msgEl = document.getElementById("guestbook-msg");

    if (!nameEl || !msgEl) return;

    const name = nameEl.value.trim();
    const emoji = emojiEl ? emojiEl.value : "✨";
    const message = msgEl.value.trim();

    if (!name || !message) return;

    const messages = JSON.parse(localStorage.getItem("guestbook_messages")) || DEFAULT_GUESTBOOK;
    const now = new Date();
    const dateStr = now.getFullYear() + '-' + 
                    String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                    String(now.getDate()).padStart(2, '0') + ' ' + 
                    String(now.getHours()).padStart(2, '0') + ':' + 
                    String(now.getMinutes()).padStart(2, '0');

    const newMsg = {
        id: "msg-" + Date.now(),
        name,
        emoji,
        message,
        date: dateStr
    };

    messages.unshift(newMsg);
    localStorage.setItem("guestbook_messages", JSON.stringify(messages));

    nameEl.value = "";
    msgEl.value = "";

    loadGuestbookMessages();
    if (window.showToast) {
        showToast("Đã gửi lời nhắn thành công! Cảm ơn bạn 💖");
    } else {
        alert("Đã gửi lời nhắn!");
    }
};

// ==========================================
// FEATURE: TERMINAL CLI SYSTEM LOGIC
// ==========================================
let matrixInterval = null;
let commandHistory = [];
let historyIndex = -1;

function initTerminal() {
    const input = document.getElementById("terminal-input");
    const outputContainer = document.getElementById("terminal-output-container");

    if (!input || !outputContainer) return;

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const rawCommand = input.value.trim();
            input.value = "";
            
            if (rawCommand) {
                commandHistory.push(rawCommand);
                historyIndex = commandHistory.length;
            }

            // Print prompt & input
            const promptLine = document.createElement("div");
            promptLine.innerHTML = `<span style="color: #60a5fa;">guest@vtk.dev:~$</span> <span style="color: #ffffff;">${escapeHTML(rawCommand)}</span>`;
            outputContainer.appendChild(promptLine);

            // Execute command
            const reply = handleTerminalCommand(rawCommand);
            if (reply) {
                const replyDiv = document.createElement("div");
                replyDiv.innerHTML = reply;
                outputContainer.appendChild(replyDiv);
            }

            // Scroll to bottom
            const body = document.querySelector(".terminal-body");
            if (body) {
                body.scrollTop = body.scrollHeight;
            }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = "";
            }
        }
    });

    // Handle auto-focus terminal input when clicking the terminal card
    const terminalPanel = document.getElementById("terminal-tab");
    if (terminalPanel) {
        terminalPanel.addEventListener("click", () => {
            input.focus();
        });
    }
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function handleTerminalCommand(rawCmd) {
    const parts = rawCmd.trim().split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (!cmd) return "";

    switch (cmd) {
        case "help":
            return `
Các lệnh khả dụng:<br>
&nbsp;&nbsp;<span style="color: #10b981;">neofetch</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Hiển thị thông tin hệ thống và chủ sở hữu<br>
&nbsp;&nbsp;<span style="color: #10b981;">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Danh sách các kỹ năng lập trình (biểu đồ)<br>
&nbsp;&nbsp;<span style="color: #10b981;">projects</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Xem danh sách sản phẩm & dự án cá nhân<br>
&nbsp;&nbsp;<span style="color: #10b981;">music [play/pause/next]</span> - Điều khiển trình phát nhạc<br>
&nbsp;&nbsp;<span style="color: #10b981;">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Xóa sạch màn hình terminal<br>
&nbsp;&nbsp;<span style="color: #10b981;">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Thông tin liên hệ nhanh<br>
&nbsp;&nbsp;<span style="color: #10b981;">matrix</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Bật/tắt hiệu ứng rơi mã độc đáo<br>
&nbsp;&nbsp;<span style="color: #10b981;">sudo rm -rf /</span>- Cảnh báo: Tự hủy hệ thống! 😉<br>
`;
        case "neofetch":
            const name = localStorage.getItem("profile_name") || "Văn Tiến Khánh";
            const uptime = Math.floor(performance.now() / 1000);
            return `
<pre style="font-family: inherit; line-height: 1.35; color: #34d399;">
          vtk.dev
       \`:oDFOkkOFDo:\`       <span style="color: #60a5fa; font-weight: bold;">${name}</span>
     \`+d00k+.  .+k00d+\`     --------------------
    .k00/.        ./00k.    OS: VTK-Core Custom OS v1.0.0
    d00/   \`++++\`   /00b    Host: vantienkhanh.com
   .00d    /0000/    d00.   Kernel: ES2026 Javascript Engine
   .00d    /0000/    d00.   Uptime: ${uptime}s (active session)
    d00/   \`++++\`   /00b    Shell: Antigravity bash v5.2
    .k00/.        ./00k.    Display: Glassmorphic Full-Responsive
     \`+d00k+.  .+k00d+\`     CPU: Intel Core i9-VTK-Gen
       \`:oDFOkkOFDo:\`       RAM: 64 GB / 64 GB
                            Theme: Cyan Dark Cyberpunk
</pre>
`;
        case "skills":
            return `
<pre style="font-family: inherit; line-height: 1.4; color: #a78bfa;">
======================================================
KỸ NĂNG & CÔNG CỤ (Tech Stack Matrix)
======================================================
- HTML5/CSS3 (Nâng cao)     [██████████████████░] 95%
- JavaScript (Chuyên nghiệp)[██████████████████░] 90%
- Python (Chuyên sâu/Bot)   [██████████████████░] 90%
- React.js/Vite (Thành thạo) [████████████████░░░] 80%
- Node.js/Express (Cơ bản)  [████████████░░░░░░░] 60%
- Git/Github/DevOps         [████████████████░░░] 80%
======================================================
</pre>
`;
        case "projects":
            const products = JSON.parse(localStorage.getItem("product_list")) || DEFAULT_PRODUCTS;
            let listStr = `======================================================<br>DANH SÁCH DỰ ÁN & SẢN PHẨM<br>======================================================<br>`;
            products.forEach((prod, index) => {
                listStr += `<span style="color: #60a5fa; font-weight: 600;">${index + 1}. ${prod.name}</span> (${typeof prod.price === 'string' ? prod.price : formatVND(prod.price)})<br>&nbsp;&nbsp;* ${prod.description}<br>`;
            });
            listStr += `======================================================<br>Muốn xem mã nguồn hoặc đặt hàng? Gõ 'contact' để nhận liên hệ nhanh.`;
            return listStr;

        case "contact":
            const supportUrl = localStorage.getItem("support_link_url") || "https://t.me/iamkyto";
            return `
======================================================<br>
THÔNG TIN LIÊN HỆ<br>
======================================================<br>
- Email: contact@vantienkhanh.com<br>
- Telegram: <a href="${supportUrl}" target="_blank" style="color: #10b981; text-decoration: underline;">${supportUrl}</a><br>
- GitHub: <a href="https://github.com/vantienkhanh" target="_blank" style="color: #10b981; text-decoration: underline;">https://github.com/vantienkhanh</a><br>
======================================================<br>
`;
        case "clear":
            const container = document.getElementById("terminal-output-container");
            if (container) {
                container.innerHTML = "";
            }
            return "";

        case "music":
            const sub = args[0] ? args[0].toLowerCase() : "";
            if (!customAudioInstance) {
                playCustomMusic();
                return "Đang khởi tạo trình phát nhạc...";
            }
            const tracks = JSON.parse(localStorage.getItem("custom_music_tracks")) || DEFAULT_MUSIC;
            const track = tracks[customTrackIdx % tracks.length];

            if (sub === "play" || sub === "resume") {
                if (customAudioInstance.paused) {
                    customAudioInstance.play();
                    updateMusicUI(track.title, true);
                    return `Đang phát nhạc: <span style="color: #10b981;">${track.title}</span>`;
                }
                return "Nhạc đang phát rồi.";
            } else if (sub === "pause" || sub === "stop") {
                if (!customAudioInstance.paused) {
                    customAudioInstance.pause();
                    updateMusicUI(track.title, false);
                    return "Đã tạm dừng nhạc nền.";
                }
                return "Nhạc đã dừng sẵn.";
            } else if (sub === "next") {
                customTrackIdx = (customTrackIdx + 1) % tracks.length;
                localStorage.setItem("music_current_time", "0");
                if (customAudioInstance) {
                    customAudioInstance.pause();
                    customAudioInstance = null;
                }
                playCustomMusic();
                return "Đang chuyển bài tiếp theo...";
            } else {
                return "Cách dùng: music [play | pause | next]";
            }

        case "matrix":
            return toggleMatrixRain();

        case "sudo":
            if (args[0] === "rm" && args[1] === "-rf" && args[2] === "/") {
                return `
<span style="color: #ef4444; font-weight: bold;">WARNING: SYSTEM DESTROY INITIATED...</span><br>
[░░░░░░░░░░░░░░░░░░░░] 0%<br>
[████████░░░░░░░░░░░░] 40%<br>
[████████████████████] 100%<br>
<span style="color: #f59e0b;">ERROR: Permission denied. Nice try, hacker! 😉</span><br>
Hệ thống được bảo mật chặt chẽ bởi VTK Shield.
`;
            }
            return "Quyền lực tối cao bị thiếu. Gõ 'sudo rm -rf /' nếu bạn đủ can đảm.";

        default:
            return `Lệnh không hợp lệ: '<span style="color: #ef4444;">${escapeHTML(cmd)}</span>'. Gõ 'help' để xem các lệnh hợp lệ.`;
    }
}

function toggleMatrixRain() {
    let canvas = document.getElementById("matrix-rain-canvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "matrix-rain-canvas";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.zIndex = "9999";
        canvas.style.pointerEvents = "none";
        canvas.style.opacity = "0.35";
        document.body.appendChild(canvas);
    }

    if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
        canvas.remove();
        return "Đã tắt hiệu ứng Matrix rain.";
    }

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet[Math.floor(Math.random() * alphabet.length)];
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    matrixInterval = setInterval(draw, 30);
    return "Đã kích hoạt Matrix falling rain! Gõ 'matrix' lần nữa để tắt.";
}

// ==========================================
// FEATURE: 3D CARD TILT DYNAMIC EFFECT
// ==========================================
function initTiltEffect() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile) return;

    const selector = '.glass-card, .project-card, .skill-card, .bank-card, .qr-card, .terminal-card';
    
    // Add tilt event listeners
    document.addEventListener('mousemove', (e) => {
        const target = e.target.closest(selector);
        if (!target) return;

        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const angleX = (yc - y) / 18; 
        const angleY = (x - xc) / 18;

        target.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
        target.style.boxShadow = `0 15px 35px rgba(99, 102, 241, 0.15)`;
        target.style.transition = 'none';
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest(selector);
        if (!target) return;
        
        target.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        target.style.boxShadow = '';
        target.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    });
}
