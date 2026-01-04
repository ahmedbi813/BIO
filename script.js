// ===============================
// تحميل المنتجات في index.html
// ===============================
async function loadProducts() {
  const list = document.getElementById("product-list");
  const searchInput = document.getElementById("search");
  if (!list) return;

  try {
    const res = await fetch("https://ahmedbi813.github.io/BIO/data.json");
    if (!res.ok) throw new Error(`فشل التحميل: ${res.status}`);

    const products = await res.json();

    // عرض المنتجات
    function displayProducts(items) {
  list.innerHTML = "";

  // أخذ آخر 10 عناصر فقط
  const lastTenItems = items.slice(-10);

  lastTenItems.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card fade-in";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price ? product.price + " USDT" : ""}</p>
    `;

    card.onclick = () => {
      window.location.href = product.link;
    };

    list.appendChild(card);
  });
}

    function clearAllCookies() {
  document.cookie.split(";").forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
}




    // مسج الكوكيز
    clearAllCookies();
    // 👉 عند التحميل: عرض آخر 10 منتجات
    displayProducts(products.slice(-10));

    // البحث
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        // السماح بالأرقام فقط
        e.target.value = e.target.value.replace(/\D/g, "");

        // تحويل الرقم إلى نص
        const term = String(e.target.value).trim();

        // إذا كان البحث فارغ → آخر 10 منتجات
        if (term === "") {
          displayProducts(products.slice(-10));
          return;
        }

        // مطابقة كاملة مع keyword (نص مع نص)
        const filtered = products.filter(
          (p) => String(p.keyword) === term
        );

        displayProducts(filtered);
      });
    }
  } catch (err) {
    console.error("حدث خطأ أثناء تحميل المنتجات:", err);
    list.innerHTML = "<p>❌ فشل تحميل المنتجات</p>";
  }
}

// ===============================
// تحميل تفاصيل المنتج
// ===============================
async function loadProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const res = await fetch("https://ahmedbi813.github.io/BIO/data.json");
    if (!res.ok) throw new Error(`فشل التحميل: ${res.status}`);

    const products = await res.json();
    const product = products.find(
      (p) => String(p.id) === String(id)
    );

    if (product) {
      container.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" class="Image_Size">
        <p id="Description">${product.description || "لا يوجد وصف"}</p>
        ${
          product.link
            ? `<a href="${product.link}" target="_blank" class="btn">تفاصيل المنتج</a>`
            : ""
        }
        <a href="index.html" class="btn">🔙 رجوع</a>
      `;
    } else {
      container.innerHTML = `<p>⚠️ المنتج غير موجود</p>`;
    }
  } catch (err) {
    console.error("حدث خطأ أثناء تحميل تفاصيل المنتج:", err);
    container.innerHTML = "<p>❌ فشل تحميل المنتج</p>";
  }
}




// ===============================
// استدعاء الدوال
// ===============================
loadProducts();
loadProductDetail();




