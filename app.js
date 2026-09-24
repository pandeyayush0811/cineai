// ==========================================================================
// CINEAI STUDIOS — CONTROLLER
// High-performance interactions, video playback & Smart Niche URL Router
// ==========================================================================

function initApp() {
    applySiteConfig();
    initApcReelsPlayer();
    initApcFilterTabs();
    initClientReviews();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

/* ==========================================================================
   1. REELS VIDEO PLAYER CONTROLLER
   ========================================================================== */
function initApcReelsPlayer() {
    const cards = document.querySelectorAll('.apc-reel-card');

    cards.forEach((card) => {
        const video = card.querySelector('.reel-video');
        const playBtn = card.querySelector('.apc-play-trigger');
        const soundBtn = card.querySelector('.apc-sound-trigger');
        const placeholder = card.querySelector('.apc-placeholder-view');

        if (!video) return;

        // Auto-detect when real video file is placed into folder
        const handleVideoAvailable = () => {
            if (placeholder) {
                placeholder.style.opacity = '0';
                placeholder.style.pointerEvents = 'none';
                setTimeout(() => {
                    placeholder.style.display = 'none';
                }, 300);
            }
        };

        video.addEventListener('canplay', handleVideoAvailable);
        video.addEventListener('loadeddata', handleVideoAvailable);

        // Fallback: keep placeholder visible if file missing
        video.addEventListener('error', () => {
            if (placeholder) {
                placeholder.style.display = 'flex';
                placeholder.style.opacity = '1';
                placeholder.style.pointerEvents = 'auto';
            }
        });

        // Ensure continuous looping
        video.loop = true;

        // Sound ON by default as requested
        video.muted = false;
        if (soundBtn) soundBtn.classList.add('unmuted');

        // Play video with audio active
        const playVideo = () => {
            // Pause any other playing video so sounds don't overlap
            document.querySelectorAll('.reel-video').forEach((otherVideo) => {
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                    const otherCard = otherVideo.closest('.apc-reel-card');
                    if (otherCard) otherCard.classList.remove('playing');
                }
            });

            // Ensure audio is ON by default
            video.muted = false;
            if (soundBtn) soundBtn.classList.add('unmuted');

            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        card.classList.add('playing');
                        if (placeholder) {
                            placeholder.style.opacity = '0';
                            placeholder.style.pointerEvents = 'none';
                            setTimeout(() => {
                                placeholder.style.display = 'none';
                            }, 300);
                        }
                    })
                    .catch((err) => {
                        console.warn('Browser sound policy fallback', err);
                        // If browser strictly blocks unmuted start without prior interaction, fallback to muted play
                        video.muted = true;
                        if (soundBtn) soundBtn.classList.remove('unmuted');
                        video.play().then(() => card.classList.add('playing'));
                    });
            }
        };

        const pauseVideo = () => {
            video.pause();
            card.classList.remove('playing');
        };

        const togglePlay = () => {
            if (video.paused) {
                playVideo();
            } else {
                pauseVideo();
            }
        };

        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePlay();
            });
        }

        video.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlay();
        });

        if (placeholder) {
            placeholder.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePlay();
            });
        }

        // Sound toggle button (Mute / Unmute manual switch)
        if (soundBtn) {
            soundBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                video.muted = !video.muted;
                soundBtn.classList.toggle('unmuted', !video.muted);
            });
        }

        video.addEventListener('pause', () => card.classList.remove('playing'));
        video.addEventListener('play', () => card.classList.add('playing'));
    });
}

/* ==========================================================================
   2. CATEGORY FILTER TABS & SMART NICHE ROUTER
   ========================================================================== */
function initApcFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab-apc');
    const cards = document.querySelectorAll('.apc-reel-card');
    const notice = document.getElementById('nicheFocusNotice');
    const noticeNicheName = document.getElementById('noticeNicheName');
    const btnResetNiche = document.getElementById('btnResetNiche');

    const NICHE_MAP = {
        'schools': ['schools', 'school', 'education', 'edtech', 'admission', 'admissions'],
        'healthcare': ['healthcare', 'health', 'doctors', 'doctor', 'clinic', 'clinics', 'hospital', 'dental'],
        'agri': ['agri', 'agriculture', 'kisan', 'farming', 'crops', 'agro'],
        'creators': ['creators', 'creator', 'media', 'youtube', 'influencer', 'channel', '180k'],
        'wedding': ['wedding', 'weddings', 'studios', 'studio', 'photography', 'shoots']
    };

    const NICHE_LABELS = {
        'schools': 'Schools & Education',
        'healthcare': 'Doctors & Healthcare Clinics',
        'agri': 'Agriculture & Agri-Brands',
        'creators': 'Creators & Media (180k+ Audience)',
        'wedding': 'Wedding & Portrait Studios'
    };

    function resolveNicheKey(input) {
        if (!input) return null;
        const clean = input.replace('#', '').toLowerCase().trim();
        for (const [key, aliases] of Object.entries(NICHE_MAP)) {
            if (key === clean || aliases.includes(clean)) {
                return key;
            }
        }
        return null;
    }

    function applyFilter(filterKey, shouldScroll = false) {
        // Update active tab UI
        tabs.forEach((tab) => {
            const isMatch = tab.getAttribute('data-filter') === filterKey;
            tab.classList.toggle('active', isMatch);
        });

        // Show/hide niche sections & reel cards with 3-video cap on main page
        const nicheSections = document.querySelectorAll('.niche-category-section');
        nicheSections.forEach((section) => {
            const secCategory = section.getAttribute('data-niche-section');
            const isMatch = (filterKey === 'all' || secCategory === filterKey);

            if (isMatch) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 30);

                const cards = section.querySelectorAll('.apc-reel-card');
                let expandRow = section.querySelector('.niche-expand-row');

                if (filterKey === 'all') {
                    // MAIN PAGE RULE: Show maximum 3 videos per section
                    cards.forEach((card, idx) => {
                        if (idx < 3) {
                            card.classList.remove('card-cap-hidden');
                        } else {
                            card.classList.add('card-cap-hidden');
                        }
                    });

                    // If more than 3 cards, show "View All X Commercials" button
                    if (cards.length > 3) {
                        if (!expandRow) {
                            expandRow = document.createElement('div');
                            expandRow.className = 'niche-expand-row';
                            const title = section.querySelector('.niche-section-title')?.textContent.trim() || 'Commercials';
                            expandRow.innerHTML = `
                                <button type="button" class="niche-view-all-btn">
                                    <span>View All ${cards.length} ${title} Ads</span>
                                    <span class="btn-arrow">→</span>
                                </button>
                            `;
                            section.appendChild(expandRow);
                            expandRow.querySelector('.niche-view-all-btn').addEventListener('click', () => {
                                applyFilter(secCategory, true);
                                history.replaceState(null, '', '#' + secCategory);
                            });
                        } else {
                            expandRow.style.display = 'flex';
                        }
                    } else if (expandRow) {
                        expandRow.style.display = 'none';
                    }
                } else {
                    // SPECIFIC NICHE PAGE RULE: Show ALL videos without cap!
                    cards.forEach((card) => {
                        card.classList.remove('card-cap-hidden');
                    });
                    if (expandRow) {
                        expandRow.style.display = 'none';
                    }
                }
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 200);
            }
        });

        // Update Niche Focus Notice Banner
        if (notice && noticeNicheName) {
            if (filterKey !== 'all' && NICHE_LABELS[filterKey]) {
                const countCards = document.querySelectorAll(`.niche-category-section[data-niche-section="${filterKey}"] .apc-reel-card`).length;
                noticeNicheName.textContent = `${NICHE_LABELS[filterKey]} (${countCards} Commercials)`;
                notice.style.display = 'block';
                setTimeout(() => {
                    notice.style.opacity = '1';
                    notice.style.transform = 'translateY(0)';
                }, 20);
            } else {
                notice.style.opacity = '0';
                notice.style.transform = 'translateY(-6px)';
                setTimeout(() => {
                    notice.style.display = 'none';
                }, 200);
            }
        }

        // Smooth scroll to showcase section if requested
        if (shouldScroll) {
            setTimeout(() => {
                const showcase = document.getElementById('reels-showcase');
                if (showcase) {
                    showcase.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }

    // Tab button click events
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');
            applyFilter(filter, false);

            // Update URL hash cleanly without page jump
            if (filter === 'all') {
                history.replaceState(null, '', window.location.pathname);
            } else {
                history.replaceState(null, '', '#' + filter);
            }
        });
    });

    // Reset button event (back to all)
    if (btnResetNiche) {
        btnResetNiche.addEventListener('click', () => {
            applyFilter('all', false);
            history.replaceState(null, '', window.location.pathname);
        });
    }

    // Check URL parameters & hash on load
    function checkInitialNiche() {
        const urlParams = new URLSearchParams(window.location.search);
        const nicheQuery = urlParams.get('niche') || urlParams.get('category');
        const hash = window.location.hash;

        const targetKey = resolveNicheKey(nicheQuery) || resolveNicheKey(hash);

        if (targetKey) {
            applyFilter(targetKey, true);
        } else {
            // Apply default 'all' filter to establish 3-video cap on load
            applyFilter('all', false);
        }
    }

    // Hash change listener (when clicking in-page footer/nav links)
    window.addEventListener('hashchange', () => {
        const targetKey = resolveNicheKey(window.location.hash);
        if (targetKey) {
            applyFilter(targetKey, true);
        } else if (window.location.hash === '#reels-showcase') {
            applyFilter('all', true);
        }
    });

    // Initial check
    checkInitialNiche();
}

/* ==========================================================================
   3. CLIENT REVIEWS & EXPERIENCE SYSTEM (Dynamic Testimonials & Visitor Comments)
   ========================================================================== */
const REVIEW_STORAGE_KEY = 'cineai_user_reviews_v1';

function getStoredReviews() {
    try {
        const data = localStorage.getItem(REVIEW_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveStoredReviews(reviews) {
    try {
        localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
        console.error('Failed to save review to storage', e);
    }
}

function getInitials(name) {
    if (!name) return 'C';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}

// Dynamically render testimonials from config & visitor submissions (No delete buttons)
function renderTestimonialsFromConfig(testimonialsList) {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;

    const list = Array.isArray(testimonialsList) ? testimonialsList.filter((item) => {
        if (!item || typeof item !== 'object') return false;
        if (item.active === false || item.visible === false || item.show === false || item.enabled === false) return false;
        return true;
    }) : [];

    const userReviews = getStoredReviews();
    let html = '';

    // 1. User-submitted reviews from visitors (displayed at the top)
    userReviews.forEach((rev) => {
        const rating = Math.max(1, Math.min(5, parseInt(rev.rating, 10) || 5));
        const starsStr = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        const initials = getInitials(rev.name);
        html += `
            <div class="testimonial-editorial-card user-review-card" data-review-id="${escapeHtml(rev.id)}">
                <div class="card-top-action-row">
                    <span class="verified-client-tag">✓ Verified Client</span>
                </div>
                <div class="stars-row">${starsStr}</div>
                <blockquote class="review-quote-text">
                    "${escapeHtml(rev.comment)}"
                </blockquote>
                <div class="reviewer-footer">
                    <div class="reviewer-avatar-sm">${escapeHtml(initials)}</div>
                    <div class="reviewer-details">
                        <h5 class="reviewer-name-text">${escapeHtml(rev.name)}</h5>
                        <p class="reviewer-studio-text">${escapeHtml(rev.role)}${rev.category ? ' • ' + escapeHtml(rev.category) : ''}</p>
                    </div>
                </div>
                ${rev.metric ? `<div class="result-metric-pill">${escapeHtml(rev.metric)}</div>` : ''}
            </div>
        `;
    });

    // 2. Main testimonials from config.json / config.js
    list.forEach((t) => {
        const rating = Math.max(1, Math.min(5, parseInt(t.rating, 10) || 5));
        const starsStr = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        const initials = getInitials(t.name);
        const isFeatured = t.featured && t.featured !== false && t.featured !== 'false';

        html += `
            <div class="testimonial-editorial-card ${isFeatured ? 'featured-testimonial-card' : ''}" data-review-id="${escapeHtml(t.id || '')}">
                <div class="card-top-action-row">
                    <span class="verified-client-tag">✓ Verified Client</span>
                </div>
                <div class="stars-row">${starsStr}</div>
                <blockquote class="review-quote-text">
                    "${escapeHtml(t.comment)}"
                </blockquote>
                <div class="reviewer-footer">
                    <div class="reviewer-avatar-sm">${escapeHtml(initials)}</div>
                    <div class="reviewer-details">
                        <h5 class="reviewer-name-text">${escapeHtml(t.name)}</h5>
                        <p class="reviewer-studio-text">${escapeHtml(t.role)}</p>
                    </div>
                </div>
                ${t.metric ? `<div class="result-metric-pill">${escapeHtml(t.metric)}</div>` : ''}
            </div>
        `;
    });

    if (html.trim()) {
        grid.innerHTML = html;
    }
}

function initClientReviews() {
    const formPanel = document.getElementById('reviewFormPanel');
    const btnToggle = document.getElementById('btnToggleReviewForm');
    const btnClose = document.getElementById('btnCloseReviewForm');
    const btnCancel = document.getElementById('btnCancelReview');
    const form = document.getElementById('clientReviewForm');

    // Star Picker
    const starPicker = document.getElementById('starPicker');
    const starLabel = document.getElementById('starLabel');
    let currentRating = 5;

    const RATING_LABELS = {
        1: '1 Star (Needs Improvement)',
        2: '2 Stars (Fair)',
        3: '3 Stars (Good)',
        4: '4 Stars (Very Good)',
        5: '5 Stars (Excellent)'
    };

    function updateStars(rating) {
        currentRating = rating;
        const stars = starPicker?.querySelectorAll('.star-item') || [];
        stars.forEach((s) => {
            const val = parseInt(s.getAttribute('data-rating'), 10);
            s.classList.toggle('active', val <= rating);
        });
        if (starLabel) {
            starLabel.textContent = RATING_LABELS[rating] || `${rating} Stars`;
        }
    }

    if (starPicker) {
        const stars = starPicker.querySelectorAll('.star-item');
        stars.forEach((s) => {
            s.addEventListener('click', () => {
                const val = parseInt(s.getAttribute('data-rating'), 10);
                updateStars(val);
            });
            s.addEventListener('mouseenter', () => {
                const val = parseInt(s.getAttribute('data-rating'), 10);
                stars.forEach((st) => {
                    const stVal = parseInt(st.getAttribute('data-rating'), 10);
                    st.style.color = stVal <= val ? '#f59e0b' : '#cbd5e1';
                });
            });
            s.addEventListener('mouseleave', () => {
                stars.forEach((st) => {
                    st.style.color = '';
                });
            });
        });
    }

    // Toggle Form Panel
    const togglePanel = (show) => {
        if (!formPanel) return;
        if (show === undefined) {
            show = formPanel.style.display === 'none';
        }
        formPanel.style.display = show ? 'block' : 'none';
        if (show) {
            const firstInput = formPanel.querySelector('input');
            if (firstInput) firstInput.focus();
        }
    };

    if (btnToggle) btnToggle.addEventListener('click', () => togglePanel());
    if (btnClose) btnClose.addEventListener('click', () => togglePanel(false));
    if (btnCancel) btnCancel.addEventListener('click', () => togglePanel(false));

    // Handle Form Submit (Visitors posting reviews)
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('reviewName').value.trim();
            const role = document.getElementById('reviewRole').value.trim();
            const category = document.getElementById('reviewNiche').value;
            const metric = document.getElementById('reviewMetric').value.trim();
            const comment = document.getElementById('reviewComment').value.trim();

            if (!name || !role || !comment) {
                showToast('Please fill all required fields', '⚠️');
                return;
            }

            const newReview = {
                id: 'rev_' + Date.now(),
                name,
                role,
                category,
                metric,
                comment,
                rating: currentRating,
                timestamp: new Date().toISOString()
            };

            // Save to localStorage
            const list = getStoredReviews();
            list.unshift(newReview);
            saveStoredReviews(list);

            // Re-render immediately
            renderTestimonialsFromConfig(window.SITE_CONFIG?.testimonials);

            // Reset and close form
            form.reset();
            updateStars(5);
            togglePanel(false);

            showToast('Thank you! Your experience has been posted.', '✓');
        });
    }
}

/* ==========================================================================
   5. MASTER CONFIGURATION APPLIER (SITE_CONFIG & config.json Auto-Sync)
   ========================================================================== */
function applySiteConfig() {
    // Immediate render with available window.SITE_CONFIG
    renderConfigToDom();

    // Also attempt to fetch config.json dynamically (if user edited config.json)
    if (typeof fetch === 'function') {
        fetch('./config.json?t=' + Date.now())
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error('Could not load config.json');
            })
            .then((freshJson) => {
                if (freshJson && freshJson.contact) {
                    window.SITE_CONFIG = freshJson;
                    renderConfigToDom();
                }
            })
            .catch(() => {
                // Silently keep using window.SITE_CONFIG from config.js
            });
    }
}

function renderConfigToDom() {
    const config = window.SITE_CONFIG;
    if (!config) return;

    const contact = config.contact || {};

    // 1. Update all WhatsApp links dynamically
    if (contact.whatsappNumber) {
        document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
            const currentHref = link.getAttribute('href') || '';
            try {
                // If it contains existing pre-filled text query, preserve it
                let textQuery = '';
                if (currentHref.includes('text=')) {
                    const parts = currentHref.split('text=');
                    textQuery = parts[1] || '';
                }
                const newHref = `https://wa.me/${contact.whatsappNumber}${textQuery ? '?text=' + textQuery : ''}`;
                link.setAttribute('href', newHref);
            } catch (err) {
                console.warn('Could not parse wa.me link', err);
            }
        });
    }

    // 2. Update Phone & Email across website
    if (contact.callingNumber) {
        document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
            link.setAttribute('href', `tel:${contact.callingNumber}`);
        });
    }
    const footerPhone = document.getElementById('footerPhone');
    if (footerPhone && contact.displayPhone) {
        footerPhone.textContent = contact.displayPhone;
    }
    const footerEmail = document.getElementById('footerEmail');
    if (footerEmail && contact.email) {
        footerEmail.textContent = contact.email;
        footerEmail.setAttribute('href', `mailto:${contact.email}`);
    }
    const footerLocation = document.getElementById('footerLocation');
    if (footerLocation && contact.locationText) {
        footerLocation.textContent = contact.locationText;
    }

    // Helper: checks if item is explicitly disabled by user
    const isEnabled = (item) => {
        if (!item || typeof item !== 'object') return false;
        if (item.active === false || item.visible === false || item.show === false || item.enabled === false) return false;
        return true;
    };

    // 3. Render Pricing Packages from SITE_CONFIG (Skip any with active: false)
    const pricingGrid = document.getElementById('pricingGrid');
    if (pricingGrid && Array.isArray(config.pricing)) {
        const activePackages = config.pricing.filter(isEnabled);
        pricingGrid.innerHTML = activePackages.map((pkg) => {
            const waText = encodeURIComponent(pkg.whatsappText || `Hi CineAI, I want to order the ${pkg.title} package`);
            const waNumber = contact.whatsappNumber || '918084507850';
            const featuresHtml = (pkg.features || []).map((f) => `<span class="sage-pill">${f}</span>`).join('');
            const hasBadge = pkg.badge && pkg.badge !== false && pkg.badge !== 'false';
            
            return `
                <div class="sage-card ${pkg.featured ? 'featured-sage' : ''}">
                    ${hasBadge ? `<div class="card-corner-badge">${pkg.badge}</div>` : ''}
                    <div class="sage-card-top">
                        <h3 class="sage-title">${pkg.title}</h3>
                        <span class="package-price">${pkg.price}${pkg.period ? `<span>${pkg.period}</span>` : ''}</span>
                    </div>
                    <p class="sage-desc">${pkg.desc || ''}</p>
                    <div class="sage-pill-group">
                        ${featuresHtml}
                    </div>
                    <div class="sage-card-bottom">
                        <a href="https://wa.me/${waNumber}?text=${waText}" target="_blank" class="sage-circle-btn" title="Choose ${pkg.title}">
                            <span>→</span>
                        </a>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 4. Render Partners from SITE_CONFIG (Skip any with active: false)
    const partnersGrid = document.getElementById('partnersGrid');
    const partnersSection = document.getElementById('partners');
    if (partnersGrid && Array.isArray(config.partners)) {
        const activePartners = config.partners.filter(isEnabled);
        
        // If all partners are disabled or none, hide the whole section
        if (partnersSection) {
            partnersSection.style.display = activePartners.length > 0 ? 'block' : 'none';
        }

        partnersGrid.innerHTML = activePartners.map((p) => {
            const isExternal = p.url && p.url.startsWith('http');
            const hasBadge = p.badge && p.badge !== false && p.badge !== 'false';
            const isHighlight = p.highlight && p.highlight !== false;

            return `
                <a href="${p.url || '#'}" ${isExternal ? 'target="_blank" rel="noopener"' : ''} class="partner-card ${isHighlight ? 'highlight-partner' : ''}">
                    <div>
                        <div class="partner-top-row">
                            <span class="partner-icon">${p.icon || '🤝'}</span>
                            ${hasBadge ? `<span class="partner-badge">${p.badge}</span>` : ''}
                        </div>
                        <h4 class="partner-name">${p.name}</h4>
                        <p class="partner-role">${p.role}</p>
                    </div>
                    <div class="partner-link-action">
                        <span>${p.handle || 'View Partner'}</span>
                        <span class="partner-arrow-circle">→</span>
                    </div>
                </a>
            `;
        }).join('');
    }

    // 5. Render Social Media Links in Footer (Skip any with active: false)
    const footerSocial = document.getElementById('footerSocialLinks');
    if (footerSocial && Array.isArray(config.socialMedia)) {
        const activeList = config.socialMedia.filter(isEnabled);
        footerSocial.innerHTML = activeList.map((s) => {
            const hasBadge = s.badge && s.badge !== false && s.badge !== 'false';
            return `
                <a href="${s.url}" target="_blank" rel="noopener" class="footer-social-pill">
                    <span>${s.icon || '🔗'}</span>
                    <span>${s.platform}</span>
                    ${hasBadge ? `<span class="niche-count-pill" style="padding: 0.15rem 0.5rem; font-size: 0.7rem; border-color: rgba(4,42,34,0.1);">${s.badge}</span>` : ''}
                </a>
            `;
        }).join('');
    }

    // 6. Update Instagram channel links & handle everywhere
    const activeSocialList = (config.socialMedia || []).filter(isEnabled);
    const insta = activeSocialList.find((s) => s.platform === 'Instagram') || (config.socialMedia || []).find((s) => s.platform === 'Instagram');
    
    // Check partner-1 for flagship creator handle & badge
    const flagshipPartner = (config.partners || []).find((p) => p.id === 'partner-1' || p.highlight);
    const flagshipHandle = flagshipPartner ? flagshipPartner.handle : (insta ? insta.label.match(/@[\w_.]+/)?.[0] : '@historydecoded_ai');
    const flagshipBadge = (flagshipPartner && flagshipPartner.badge) ? flagshipPartner.badge : '350k+ Followers';
    const flagshipUrl = (flagshipPartner && flagshipPartner.url) ? flagshipPartner.url : (insta ? insta.url : 'https://www.instagram.com/historydecoded_ai/');

    // Update Hero badge
    const heroBadge = document.querySelector('.hero-authority-badge');
    if (heroBadge) {
        heroBadge.setAttribute('href', flagshipUrl);
        const heroBadgeText = heroBadge.querySelector('span:last-child');
        if (heroBadgeText) {
            heroBadgeText.innerHTML = `Scale Partner: <strong>${flagshipHandle}</strong> (${flagshipBadge}) ↗`;
        }
    }

    // Update creator section handles
    const creatorSection = document.querySelector('.niche-category-section[data-niche-section="creators"]');
    if (creatorSection) {
        const authorTag = creatorSection.querySelector('.author-tag');
        if (authorTag) authorTag.textContent = flagshipHandle;
        const metaTitle = creatorSection.querySelector('.meta-title');
        if (metaTitle) metaTitle.textContent = flagshipHandle;
        const footnoteTitle = creatorSection.querySelector('.footnote-title');
        if (footnoteTitle) footnoteTitle.textContent = `${flagshipHandle} (${flagshipBadge})`;
        const creatorLink = creatorSection.querySelector('.creator-link-pill');
        if (creatorLink) creatorLink.setAttribute('href', flagshipUrl);
        const footnoteCircle = creatorSection.querySelector('.footnote-circle');
        if (footnoteCircle) footnoteCircle.setAttribute('href', flagshipUrl);
    }

    // 7. Render Testimonials dynamically from SITE_CONFIG / config.json
    if (config.testimonials) {
        renderTestimonialsFromConfig(config.testimonials);
    }

    // 8. Update Brand Copyright
    const footerCopyright = document.getElementById('footerCopyright');
    if (footerCopyright && config.brand && config.brand.copyright) {
        footerCopyright.textContent = config.brand.copyright;
    }
}

/* ==========================================================================
   6. TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message, icon = '✓') {
    const toast = document.getElementById('cineaiToast');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    if (!toast) return;

    if (toastMsg) toastMsg.textContent = message;
    if (toastIcon) toastIcon.textContent = icon;

    toast.classList.add('show');

    clearTimeout(window._cineaiToastTimer);
    window._cineaiToastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}



