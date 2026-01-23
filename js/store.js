document.addEventListener("DOMContentLoaded", async () => {
  // API Configuration
  const API_CONFIG = {
    PACKAGE_ALL: 'http://localhost:5184/api/Package/all'
  };

  const storeContainer = document.getElementById("storePackages");
  if (!storeContainer) return;

  try {
    const res = await fetch(API_CONFIG.PACKAGE_ALL);
    const data = await res.json();
    const packages = data.data ?? data;

    storeContainer.innerHTML = "";

    packages.forEach(pkg => {
      const col = document.createElement("div");
      col.className = "col-md-4 mt-5";

      col.innerHTML = `
        <div class="card text-center h-100 shadow-sm">
          <img src="${pkg.pictureUrl || './Images/arabic-bag.png'}" class="card-img-top" alt="${pkg.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${pkg.title}</h5>
            <p class="card-text flex-grow-1">${pkg.description}</p>
             <p>هدية 🎁 ( كتيب انشطتي مع ماما )</p> <!-- ✅ العبارة الثابتة -->
            <p class="fw-bold">السعر: ${pkg.price} ج.م</p>
           <button class="package-btn btn btn-primary" data-id="${pkg.id}" data-name="${pkg.title}">احجز الباقة</button>
          </div>
        </div>
      `;

      storeContainer.appendChild(col);
    });
  } catch (err) {
    console.error("Error loading store packages:", err);
    storeContainer.innerHTML = `<p class="text-danger">حدث خطأ في تحميل الحقيبة</p>`;
  }
});
