// Sargyt formasyna ýazylanlary WhatsApp-a uratmak üçin JavaScript
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Sahypanyň täzeden ýüklenmegini saklaýar

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;

    // WhatsApp üçin habary taýýarlamak (Öz WhatsApp belgiňizi şu ýere ýazyň)
    const whatsappNumber = "905077079354"; 
    const message = `Merhaba, yeni bir teklif talebi var!%0A*Ad Soyad:* ${name}%0A*Telefon:* ${phone}%0A*İstediği Hizmet:* ${service}`;

    // WhatsApp-a göni ugratmak
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
});