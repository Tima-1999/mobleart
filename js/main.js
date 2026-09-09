document.addEventListener('DOMContentLoaded', () => {
    // 1. Tema çalşmak (Dark / Light)
    const toggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('mobleart_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('mobleart_theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // 2. Surat Modal Açmak
    const imageModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeImageModal = document.getElementById('closeImageModal');

    window.openImageModal = function(imgSrc) {
        if (imageModal && modalImg) {
            imageModal.style.display = "flex";
            modalImg.src = imgSrc;
        }
    };

    if (closeImageModal) {
        closeImageModal.onclick = function() { imageModal.style.display = "none"; }
    }
    if (imageModal) {
        imageModal.onclick = function(e) { if (e.target === imageModal) imageModal.style.display = "none"; }
    }

    // 3. Ýyldyz saýlamak (Yorum üçin)
    const modalStars = document.querySelectorAll('#modalStarRating i');
    const modalRatingValueInput = document.getElementById('modalRatingValue');
    modalStars.forEach(star => {
        star.addEventListener('click', function() {
            const val = this.getAttribute('data-value');
            if (modalRatingValueInput) modalRatingValueInput.value = val;
            modalStars.forEach(s => {
                if(s.getAttribute('data-value') <= val) s.classList.add('active');
                else s.classList.remove('active');
            });
        });
    });

    // 4. Yorum Modal Açmak
    const reviewModal = document.getElementById('reviewModal');
    const closeReviewModal = document.getElementById('closeReviewModal');

    window.openReviewModal = function(productId) {
        const modalProdId = document.getElementById('modalProductId');
        if (modalProdId) modalProdId.value = productId;
        if (reviewModal) reviewModal.style.display = "flex";
    };

    if (closeReviewModal) {
        closeReviewModal.onclick = function() { reviewModal.style.display = "none"; }
    }
    if (reviewModal) {
        reviewModal.onclick = function(e) { if (e.target === reviewModal) reviewModal.style.display = "none"; }
    }

    window.toggleComments = function(productId) {
        const section = document.getElementById(`comments-section-${productId}`);
        if (section) section.classList.toggle('active');
    };

    // 5. WhatsApp Teklif Formu İşlemi (Düzeldilen we işleýän görnüşi)
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameEl = document.getElementById('name');
            const phoneEl = document.getElementById('phone');
            const serviceEl = document.getElementById('service');

            const name = nameEl ? nameEl.value : '';
            const phone = phoneEl ? phoneEl.value : '';
            const service = serviceEl ? serviceEl.value : '';
            
            const whatsappMessage = `Merhaba, web sitenizden teklif almak istiyorum.%0A*Ad Soyad:* ${encodeURIComponent(name)}%0A*Telefon:* ${encodeURIComponent(phone)}%0A*İstediğim Mobilya:* ${encodeURIComponent(service)}`;
            
            window.open(`https://wa.me/905077079354?text=${whatsappMessage}`, '_blank');
        });
    }
});
