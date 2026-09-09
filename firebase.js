        import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
        import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyDituAe7mzCIobhpko8NJFDFMmtANehUhs",
            authDomain: "mobleart-db.firebaseapp.com",
            projectId: "mobleart-db",
            storageBucket: "mobleart-db.firebasestorage.app",
            messagingSenderId: "53737008056",
            appId: "1:53737008056:web:ec06ad2b5d4fe0d79d7d4d",
            measurementId: "G-7NJ8ZKDZPW"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        async function loadProductsWithReviews() {
            const grid = document.getElementById('dynamicProductsGrid');
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                if (querySnapshot.empty) {
                    grid.innerHTML = `
                        <div style="grid-column: 1/-1; text-align: center; padding: 50px; background: var(--card-bg); border: 1px dashed var(--border-color); border-radius: 16px;">
                            <i class="fas fa-box-open" style="font-size: 38px; color: var(--accent-color); margin-bottom: 15px;"></i>
                            <h3 style="color: var(--text-color); margin-bottom: 8px; font-size: 18px;">Henüz Ürün Eklenmemiş</h3>
                            <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">Admin paneline girerek ilk tasarımlarınızı yükleyin.</p>
                            <a href="admin.html" class="btn" style="padding: 10px 20px; font-size: 14px;"><i class="fas fa-plus"></i> Ürün Ekle</a>
                        </div>
                    `;
                    return;
                }

                const reviewsSnapshot = await getDocs(collection(db, "product_reviews"));
                let allReviews = [];
                reviewsSnapshot.forEach(doc => {
                    allReviews.push({ id: doc.id, ...doc.data() });
                });

                grid.innerHTML = "";
                querySnapshot.forEach((docSnap) => {
                    const prod = docSnap.data();
                    const prodId = docSnap.id;

                    const prodReviews = allReviews.filter(r => r.productId === prodId);

                    let commentsHtml = '';
                    if (prodReviews.length === 0) {
                        commentsHtml = `<p style="color: var(--text-muted); font-size: 12px; text-align: center; padding: 5px;">Henüz bu ürüne yorum yapılmamış.</p>`;
                    } else {
                        prodReviews.forEach(rev => {
                            let stars = '';
                            for(let i=0; i<5; i++) {
                                stars += (i < rev.rating) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
                            }
                            commentsHtml += `
                                <div class="comment-item">
                                    <div class="comment-item-header">
                                        <span>${rev.author}</span>
                                        <div class="comment-stars">${stars}</div>
                                    </div>
                                    <div class="comment-text">${rev.content}</div>
                                </div>
                            `;
                        });
                    }

                    grid.innerHTML += `
                        <div class="product-card">
                            <div class="product-img-container" onclick="openImageModal('${prod.image}')">
                                <img src="${prod.image}" alt="${prod.title}" class="product-img">
                            </div>
                            <div class="product-info">
                                <div>
                                    <h3>${prod.title}</h3>
                                    <p class="product-desc">${prod.description}</p>
                                </div>
                                
                                <div class="product-actions">
                                    <button class="comment-toggle-btn" onclick="toggleComments('${prodId}')">
                                        <i class="fas fa-comments"></i> Yorumlar (${prodReviews.length})
                                    </button>
                                    <button class="comment-toggle-btn" onclick="openReviewModal('${prodId}')" style="background: var(--accent-glow); color: var(--accent-color); border-color: var(--accent-color);">
                                        <i class="fas fa-pen"></i> Yorum Yaz
                                    </button>
                                </div>

                                <div class="product-comments-section" id="comments-section-${prodId}">
                                    <div style="max-height: 150px; overflow-y: auto; margin-bottom: 8px;">
                                        ${commentsHtml}
                                    </div>
                                </div>

                                <a href="https://wa.me/905077079354?text=Merhaba,%20${encodeURIComponent(prod.title)}%20modeliniz%20hakkında%20bilgi%20almak%20istiyorum." class="btn product-btn" target="_blank" style="margin-top: 12px;">
                                    <i class="fab fa-whatsapp"></i> WhatsApp Bilgi Al
                                </a>
                            </div>
                        </div>
                    `;
                });
            } catch (error) {
                console.error("Hata:", error);
            }
        }

        loadProductsWithReviews();

        document.getElementById('productReviewForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const productId = document.getElementById('modalProductId').value;
            const author = document.getElementById('reviewAuthor').value;
            const content = document.getElementById('reviewContent').value;
            const rating = parseInt(document.getElementById('modalRatingValue').value);

            try {
                await addDoc(collection(db, "product_reviews"), {
                    productId: productId,
                    author: author,
                    content: content,
                    rating: rating,
                    date: new Date().toISOString()
                });
                alert('Yorumunuz başarıyla eklendi!');
                document.getElementById('productReviewForm').reset();
                document.getElementById('reviewModal').style.display = "none";
                loadProductsWithReviews();
            } catch (error) {
                alert("Yorum eklenirken hata oluştu: " + error.message);
            }
        });
