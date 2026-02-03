/* ==========================================
   WEDDING INVITATION - JAVASCRIPT
   ========================================== */

// ===================================
// CẤU HÌNH GOOGLE SHEETS
// ===================================
const CONFIG = {
    googleSheets: {
        enabled: true,
        // Thay URL này bằng URL của Google Apps Script Web App của bạn
        apiUrl: 'https://script.google.com/macros/s/AKfycbz9sxVbwsTS4WNufMhduGkj1IIn9sQM58wyt8ChP17hFJwLISdEsFzuu6Yh90iF2f_v2Q/exec'
    }
};

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
    const delay = Math.random() * 5;
    const duration = Math.random() * 5 + 8;
    // Vị trí Y ban đầu ngẫu nhiên để trái tim phân bố đều khi mở trang
    const startY = Math.random() * 100;

    heart.style.cssText = `
        left: ${left}%;
        top: ${startY}%;
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
    const weddingDate = new Date(2026, 2, 22, 10, 0, 0).getTime(); // March 22, 2026 - 10:00 AM

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
   WISH FORM - GỬI VÀ LOAD TỪ GOOGLE SHEETS
   ========================================== */
function initWishForm() {
    const form = document.getElementById('wishForm');

    // Load lời chúc từ Google Sheets khi trang load
    loadWishesFromGoogleSheets();

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('wishName').value.trim();
            const message = document.getElementById('wishMessage').value.trim();
            const attendance = form.querySelector('input[name="attendance"]:checked')?.value || 'yes';

            if (!name || !message) {
                showToast('Vui lòng nhập đầy đủ thông tin!');
                return;
            }

            // Hiện loading
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
            submitBtn.disabled = true;

            // Gửi lên Google Sheets
            const success = await sendToGoogleSheets({
                type: 'wish',
                name: name,
                message: message,
                attendance: attendance
            });

            if (success) {
                // Thêm vào DOM
                addWishToDOM({
                    name: name,
                    message: message,
                    date: new Date().toLocaleDateString('vi-VN')
                }, true);

                form.reset();
                showToast('Cảm ơn bạn đã gửi lời chúc!');
            } else {
                showToast('Có lỗi xảy ra, vui lòng thử lại!');
            }

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
}

// Load lời chúc từ Google Sheets
async function loadWishesFromGoogleSheets() {
    const wishesList = document.getElementById('wishesList');
    const wishesListInner = document.getElementById('wishesListInner');
    if (!wishesList) return;

    // Xóa lời chúc mẫu
    if (wishesListInner) {
        wishesListInner.innerHTML = '<div class="loading-wishes"><i class="fas fa-spinner fa-spin"></i> Đang tải...</div>';
    }

    if (!CONFIG.googleSheets.enabled || CONFIG.googleSheets.apiUrl.includes('YOUR_SCRIPT_ID')) {
        // Giữ nguyên lời chúc mẫu nếu chưa cấu hình Google Sheets
        console.log('Google Sheets chưa được cấu hình - giữ lời chúc mẫu');
        return;
    }

    try {
        const url = `${CONFIG.googleSheets.apiUrl}?action=getWishes`;
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow'
        });

        const result = await response.json();

        if (wishesListInner) {
            wishesListInner.innerHTML = '';
        }

        if (result.success && result.wishes && result.wishes.length > 0) {
            result.wishes.forEach(wish => {
                addWishToDOM(wish, false);
            });
            // Duplicate content for seamless auto-scroll loop
            duplicateWishesForLoop();
        } else {
            if (wishesListInner) {
                wishesListInner.innerHTML = '<p style="text-align:center; color: rgba(255,255,255,0.7);">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>';
            }
        }
    } catch (error) {
        console.error('Error loading wishes:', error);
        if (wishesListInner) {
            wishesListInner.innerHTML = '<p style="text-align:center; color: rgba(255,255,255,0.7);">Không thể tải lời chúc</p>';
        }
    }
}

// Duplicate wishes for seamless auto-scroll loop
function duplicateWishesForLoop() {
    const wishesListInner = document.getElementById('wishesListInner');
    if (!wishesListInner) return;

    const originalItems = wishesListInner.querySelectorAll('.wish-item');
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        wishesListInner.appendChild(clone);
    });
}

// Thêm lời chúc vào DOM
function addWishToDOM(wish, prepend = false) {
    const wishesListInner = document.getElementById('wishesListInner');
    if (!wishesListInner) return;

    const wishItem = document.createElement('div');
    wishItem.className = 'wish-item';
    wishItem.innerHTML = `
        <div class="wish-avatar"><i class="fas fa-heart"></i></div>
        <div class="wish-content">
            <h4>${escapeHtml(wish.name)}</h4>
            <p>${escapeHtml(wish.message)}</p>
            ${wish.date ? `<span class="wish-date">${wish.date}</span>` : ''}
        </div>
    `;

    if (prepend) {
        wishesListInner.insertBefore(wishItem, wishesListInner.firstChild);
    } else {
        wishesListInner.appendChild(wishItem);
    }
}


// ===================================
// GOOGLE SHEETS API
// ===================================
async function sendToGoogleSheets(data) {
    if (!CONFIG.googleSheets || !CONFIG.googleSheets.enabled || !CONFIG.googleSheets.apiUrl) {
        console.log('Google Sheets not enabled or no API URL');
        return false;
    }

    try {
        // Sử dụng URL parameters thay vì JSON body để tương thích tốt hơn
        const params = new URLSearchParams(data).toString();
        const url = `${CONFIG.googleSheets.apiUrl}?${params}`;

        // Sử dụng phương pháp fetch với redirect: 'follow'
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow'
        });

        console.log('Google Sheets response:', response.status);
        return true;
    } catch (error) {
        console.error('Error sending to Google Sheets:', error);
        // Fallback: thử với image beacon (luôn hoạt động)
        try {
            const params = new URLSearchParams(data).toString();
            const img = new Image();
            img.src = `${CONFIG.googleSheets.apiUrl}?${params}`;
            return true;
        } catch (e) {
            return false;
        }
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
