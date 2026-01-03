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

    function displayProducts(filtered) {
      list.innerHTML = "";
      for (let i = 0 ; i < filtered.length; i++) {
        const product = filtered[i];

        const card = document.createElement("div");
        card.className = "product-card fade-in";
        card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.price ? product.price + " USD" : ""}</p>
  `;

        card.onclick = () => {
          window.location.href = `${product.link}`;
        };

        list.appendChild(card);
      }
    }

    displayProducts(products);

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const term = e.target.value;
        if (term != "") {
          displayProducts(
            products.filter((p) => term.toString() == p.keyword.toString())
          );
        } else {
          displayProducts(products.filter((p) => true));
        }
      });
    }
  } catch (err) {
    console.error("An error occurred while loading the products:", err);
    list.innerHTML = "<p> Product loading failed ❌</p>";
  }
}

async function loadProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const res = await fetch("data.json");
    if (!res.ok) throw new Error(`Loading failed: ${res.status}`);

    const products = await res.json();
    const product = products.find((p) => p.id.toString() === id);

    if (product) {
      container.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" class="Image_Size">
        <p id="Description">${product.description || "No description"}</p>
        ${
          product.link
            ? `<a href="${product.link}" target="_blank" class="btn">تفاصيل المنتج</a>`
            : ""
        }
        <a href="index.html" class="btn">🔙 Back</a>
      `;
    } else {
      container.innerHTML = `<p> Product not available ⚠️</p>`;
    }
  } catch (err) {
    console.error("An error occurred while loading product details:", err);
    container.innerHTML = "<p> Product loading failed❌</p>";
  }
}

loadProducts();
loadProductDetail();




