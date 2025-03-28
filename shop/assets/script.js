const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzkxODM4MzRiZjAwMTUwMDA3MWMiLCJpYXQiOjE3NDI1NTEzMjAsImV4cCI6MTc0Mzc2MDkyMH0.Pmqki85ZKZiU0ehxzU1O1XCAa_a-Hj8R7k1k_a1OPQw";

const container = document.getElementById("products-container");

async function loadProducts() {
  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!res.ok) throw new Error("Errore nel recupero dei prodotti");

    const products = await res.json();

    products.forEach((p) => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";

      col.innerHTML = `
        <div class="card h-100">
          <img src="${p.imageUrl}" class="card-img-top w-100" alt="${p.name}" >
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">${p.brand} - <span class="price text-primary fw-bold" >€${p.price}</span</p>
            <div class="d-flex justify-content-between">
              <a href="dettaglio.html?id=${p._id}" class="btn btn-outline-primary btn-sm">Dettaglio</a>
              <a href="backoffice.html?id=${p._id}" class="btn btn-outline-warning btn-sm">Modifica</a>
            </div>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
  } catch (error) {
    console.error("Errore:", error);
  }
}
async function fetchProducts() {
  const loadingIndicator = document.getElementById("loading-indicator");
  const productList = document.getElementById("product-list");

  try {
    // Mostra l'indicatore di caricamento
    loadingIndicator.style.display = "inline-block";

    // Imposta un timeout per nascondere l'indicatore di caricamento dopo 3 secondi
    const timeout = setTimeout(() => {
      loadingIndicator.style.display = "none";
    }, 3000);

    // Recupera i prodotti dall'API
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/"
    );

    // Controlla se la risposta è OK
    if (response.ok) {
      const products = await response.json();

      // Rimuovi il timeout e nascondi l'indicatore se la risposta arriva prima dei 4 secondi
      clearTimeout(timeout);
      loadingIndicator.style.display = "none";

      // Mostra i prodotti nella pagina
      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("col-md-4", "mb-4");

        productCard.innerHTML = `
          <div class="card">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><strong>€ ${product.price}</strong></p>
              <a href="product-detail.html?id=${product._id}" class="btn btn-primary">Dettaglio</a>
            </div>
          </div>
        `;

        productList.appendChild(productCard);
      });
    } else {
      alert("Errore durante il recupero dei prodotti");
    }
  } catch (error) {
    console.error("Errore nella fetch:", error);
  }
}

// Carica i prodotti quando la pagina è pronta
window.onload = fetchProducts;

loadProducts();
