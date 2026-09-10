const toggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('mobleart_theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('mobleart_theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeImageModal = document.getElementById('closeImageModal');

function openImageModal(imgSrc) {
    imageModal.style.display = "flex";
    modalImg.src = imgSrc;
}

closeImageModal.onclick = function() { imageModal.style.display = "none"; }
imageModal.onclick = function(e) { if (e.target === imageModal) imageModal.style.display = "none"; }

const modalStars = document.querySelectorAll('#modalStarRating i');
const modalRatingValueInput = document.getElementById('modalRatingValue');
modalStars.forEach(star => {
    star.addEventListener('click', function() {
        const val = this.getAttribute('data-value');
        modalRatingValueInput.value = val;
        modalStars.forEach(s => {
            if(s.getAttribute('data-value') <= val) s.classList.add('active');
            else s.classList.remove('active');
        });
    });
});

const reviewModal = document.getElementById('reviewModal');
const closeReviewModal = document.getElementById('closeReviewModal');

function openReviewModal(productId) {
    document.getElementById('modalProductId').value = productId;
    reviewModal.style.display = "flex";
}

closeReviewModal.onclick = function() { reviewModal.style.display = "none"; }
reviewModal.onclick = function(e) { if (e.target === reviewModal) reviewModal.style.display = "none"; }

window.toggleComments = function(productId) {
    const section = document.getElementById(`comments-section-${productId}`);
    section.classList.toggle('active');
}

// WhatsApp Teklif Formu açmak üçin esasy funksiýa
window.sendWhatsAppQuote = function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    
    const whatsappMessage = `Merhaba, web sitenizden teklif almak istiyorum.%0AAd Soyad: ${encodeURIComponent(name)}%0ATelefon: ${encodeURIComponent(phone)}%0Aİstediğim Mobilya: ${encodeURIComponent(service)}`;
    
    window.open(`https://wa.me/905077079354?text=${whatsappMessage}`, '_blank');
};

// INDEX.HTML SAHYPASYNDAÇY HABARLAŞMAK FORMASY (ADMIN PANEL "HABARLAR" BÖLÜMINE BAGLANÝAR)
const indexContactForm = document.getElementById('indexContactForm');
if (indexContactForm) {
    indexContactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('visitorName').value;
        const contact = document.getElementById('visitorContact').value;
        const message = document.getElementById('visitorMessage').value;
        const statusMsg = document.getElementById('contactStatusMsg');

        try {
            // Firebase Firestore-a "messages" kolleksiýasyna goşýarys
            // Bu maglumatlar admin panelindäki "Habarlar" düwmesinde göni bolar
            await window.db_addDoc(window.db_collection(window.db, "messages"), {
                name: name,
                email: contact,
                message: message,
                createdAt: new Date()
            });

            statusMsg.style.color = "#22c55e";
            statusMsg.innerHTML = "✓ Hatynyňyz üstünlikli iberildi!";
            indexContactForm.reset();
        } catch (error) {
            console.error("Ýalňyşlyk: ", error);
            statusMsg.style.color = "#ef4444";
            statusMsg.innerHTML = "✕ Ýalňyşlyk ýüze çykdy, täzeden barlaň.";
        }
    });
}
