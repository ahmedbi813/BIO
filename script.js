async function loadProducts() {
  const list = document.getElementById("product-list");
  const searchInput = document.getElementById("search");
  if (!list) return;

  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/ahmedbi813/BIO/refs/heads/main/data.json"
    );
    if (!res.ok) throw new Error(`Loading failed: ${res.status}`);

    const products = await res.json();

    // عرض المنتجات
    function displayProducts(items) {
      list.innerHTML = "";

      items.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card fade-in";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.price ? product.price + " USD" : ""}</p>
        `;

        card.onclick = () => {
          window.location.href = product.link;
        };

        list.appendChild(card);
      });
    }

    // جلب آخر 10 منتجات
    function showLast10Products() {
      const last10 = products.slice(-10);
      displayProducts(last10);
    }

    // عرض آخر 10 عند التحميل
    showLast10Products();

    // البحث
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        // السماح بالأرقام فقط
        e.target.value = e.target.value.replace(/\D/g, "");
        const term = e.target.value.trim();

        // إذا كان فارغ → آخر 10 منتجات
        if (term === "") {
          showLast10Products();
          return;
        }

        // بحث بالمطابقة الكاملة مع keyword
        const filtered = products.filter(
          (p) => p.keyword.toString() === term
        );

        displayProducts(filtered);
      });
    }
  } catch (err) {
    console.error("An error occurred while loading the products:", err);
    list.innerHTML = "<p>❌ Product loading failed</p>";
  }
}
