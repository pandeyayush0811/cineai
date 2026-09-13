// ==========================================================================
// CINEAI STUDIOS — CONTROLLER
// High-performance interactions & video playback
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initApcReelsPlayer();
    initApcFilterTabs();
});

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

        // Single playback enforcement
        const togglePlay = () => {
            document.querySelectorAll('.reel-video').forEach((otherVideo) => {
                if (otherVideo !== video && !otherVideo.paused) {
                    otherVideo.pause();
                    const otherCard = otherVideo.closest('.apc-reel-card');
                    if (otherCard) otherCard.classList.remove('playing');
                }
            });

            if (video.paused) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            card.classList.add('playing');
                            if (placeholder) placeholder.style.opacity = '0';
                        })
                        .catch(() => {
                            // Video not placed in folder yet: toggle state for feedback
                            card.classList.toggle('playing');
                        });
                }
            } else {
                video.pause();
                card.classList.remove('playing');
            }
        };

        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePlay();
            });
        }

        video.addEventListener('click', togglePlay);
        if (placeholder) {
            placeholder.addEventListener('click', togglePlay);
        }

        // Sound toggle
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
   2. CATEGORY FILTER TABS
   ========================================================================== */
function initApcFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab-apc');
    const cards = document.querySelectorAll('.apc-reel-card');

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            cards.forEach((card) => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 30);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}
