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

loadProducts();
