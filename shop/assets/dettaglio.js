const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "INSERISCI_IL_TUO_TOKEN_QUI";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const detailContainer = document.getElementById("product-detail");

async function loadDetail() {
  try {
    const res = await fetch(API_URL + productId, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!res.ok) throw new Error("Errore nel recupero del dettaglio");

    const p = await res.json();

    detailContainer.innerHTML = `
      <div class="card shadow">
        <img src="${p.imageUrl}" class="card-img-top" alt="${p.name}" style="height: 300px; object-fit: cover;">
        <div class="card-body">
          <h3 class="card-title">${p.name}</h3>
          <p class="card-text">${p.description}</p>
          <p class="text-muted">Brand: ${p.brand}</p>
          <h4>€${p.price}</h4>
          <a href="/shop/pages/index.html" class="btn btn-secondary mt-3">Torna alla home</a>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Errore nel dettaglio:", error);
  }
}

loadDetail();
