document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;

    const whatsappNumber = "905077079354"; 
    const message = `Merhaba, yeni bir teklif talebi var!%0A*Ad Soyad:* ${name}%0A*Telefon:* ${phone}%0A*İstediği Hizmet:* ${service}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
});
