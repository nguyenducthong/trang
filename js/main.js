/* ==========================================
   WEDDING INVITATION - JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initGuestName();
    initFloatingHearts();
    initCountdown();
    initMusicPlayer();
    initTabs();
    initMenu();
    initBackToTop();
    initLightbox();
    initWishForm();
    initAOS();
});

/* ==========================================
   GUEST NAME FROM URL
   ========================================== */
function initGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || urlParams.get('name') || urlParams.get('guest');

    const guestNameElements = document.querySelectorAll('.guest-name');

    if (guestName) {
        guestNameElements.forEach(el => {
            el.textContent = guestName;
            el.style.display = 'block';
        });
    } else {
        // Ẩn hoặc hiển thị text mặc định nếu không có tên
        guestNameElements.forEach(el => {
            el.textContent = 'Quý khách';
            el.style.display = 'block';
        });
    }
}

/* ==========================================
   FLOATING HEARTS
   ========================================== */
function initFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    if (!container) return;

    const heartCount = 15;

    for (let i = 0; i < heartCount; i++) {
        createHeart(container);
    }
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '<i class="fas fa-heart"></i>';

    const size = Math.random() * 15 + 10;
    const left = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 5 + 8;

    heart.style.cssText = `
        left: ${left}%;
        font-size: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;

    container.appendChild(heart);
}

/* ==========================================
   COUNTDOWN
   ========================================== */
function initCountdown() {
    // Set your wedding date here
    const weddingDate = new Date(2026, 2, 22, 9, 0, 0).getTime(); // March 22, 2026

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ==========================================
   MUSIC PLAYER - VINYL DISC
   ========================================== */
function initMusicPlayer() {
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const playIndicator = document.getElementById('playIndicator');

    if (musicBtn && bgMusic) {
        // Update indicator icon
        function updateIndicator(isPlaying) {
            if (playIndicator) {
                const icon = playIndicator.querySelector('i');
                if (icon) {
                    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
                }
            }
        }

        musicBtn.addEventListener('click', function() {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicBtn.classList.add('playing');
                    updateIndicator(true);
                }).catch(err => {
                    console.log('Play failed:', err);
                });
            } else {
                bgMusic.pause();
                musicBtn.classList.remove('playing');
                updateIndicator(false);
            }
        });

        // Handle audio ended/paused externally
        bgMusic.addEventListener('pause', function() {
            musicBtn.classList.remove('playing');
            updateIndicator(false);
        });

        bgMusic.addEventListener('play', function() {
            musicBtn.classList.add('playing');
            updateIndicator(true);
        });
    }
}

/* ==========================================
   EVENT TABS
   ========================================== */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.event-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to clicked
            this.classList.add('active');
            document.getElementById(targetTab)?.classList.add('active');
        });
    });
}

/* ==========================================
   MENU TOGGLE
   ========================================== */
function initMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

/* ==========================================
   BACK TO TOP
   ========================================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* ==========================================
   LIGHTBOX
   ========================================== */
let currentSlide = 0;
const galleryImages = [];

function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach((img) => {
        galleryImages.push(img.src);
    });

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    if (!lightbox || !lightboxImg) return;

    currentSlide = index;
    lightboxImg.src = galleryImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function changeSlide(direction) {
    const lightboxImg = document.getElementById('lightboxImg');
    if (!lightboxImg) return;

    currentSlide += direction;

    if (currentSlide >= galleryImages.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = galleryImages.length - 1;

    lightboxImg.src = galleryImages[currentSlide];
}

/* ==========================================
   WISH FORM
   ========================================== */
function initWishForm() {
    const form = document.getElementById('wishForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('wishName').value.trim();
            const message = document.getElementById('wishMessage').value.trim();

            if (!name || !message) {
                showToast('Vui lòng nhập đầy đủ thông tin!');
                return;
            }

            addWish(name, message);
            addSidebarWish(name, message);
            form.reset();
            showToast('Cảm ơn bạn đã gửi lời chúc!');
        });
    }
}

function addWish(name, message) {
    const wishesList = document.getElementById('wishesList');
    if (!wishesList) return;

    const wishItem = document.createElement('div');
    wishItem.className = 'wish-item';
    wishItem.innerHTML = `
        <div class="wish-avatar"><i class="fas fa-heart"></i></div>
        <div class="wish-content">
            <h4>${escapeHtml(name)}</h4>
            <p>${escapeHtml(message)}</p>
        </div>
    `;

    wishesList.insertBefore(wishItem, wishesList.firstChild);
}

function addSidebarWish(name, message) {
    const sidebarList = document.getElementById('sidebarWishesList');
    if (!sidebarList) return;

    const wishItem = document.createElement('div');
    wishItem.className = 'sidebar-wish-item';
    wishItem.innerHTML = `
        <span class="wish-icon"><i class="fas fa-heart"></i></span>
        <div class="wish-text">
            <strong>${escapeHtml(name)}:</strong> ${escapeHtml(message)}
        </div>
    `;

    sidebarList.insertBefore(wishItem, sidebarList.firstChild);

    // Keep only 5 items
    while (sidebarList.children.length > 5) {
        sidebarList.removeChild(sidebarList.lastChild);
    }
}

/* ==========================================
   COPY TO CLIPBOARD
   ========================================== */
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const text = element.textContent;

    navigator.clipboard.writeText(text).then(() => {
        showToast('Đã sao chép số tài khoản!');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Đã sao chép số tài khoản!');
    });
}

/* ==========================================
   TOAST NOTIFICATION
   ========================================== */
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

/* ==========================================
   UTILITIES
   ========================================== */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* ==========================================
   AOS INITIALIZATION
   ========================================== */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
}
