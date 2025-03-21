const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzkxODM4MzRiZjAwMTUwMDA3MWMiLCJpYXQiOjE3NDI1NTEzMjAsImV4cCI6MTc0Mzc2MDkyMH0.Pmqki85ZKZiU0ehxzU1O1XCAa_a-Hj8R7k1k_a1OPQw";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const form = document.getElementById("product-form");
const deleteBtn = document.getElementById("delete-btn");
const formTitle = document.getElementById("form-title");

if (productId) {
  formTitle.innerText = "Modifica Prodotto";
  deleteBtn.style.display = "inline-block";

  fetch(API_URL + productId, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Errore nel recupero del prodotto");
      return res.json();
    })
    .then((product) => {
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("imageUrl").value = product.imageUrl;
      document.getElementById("price").value = product.price;
    })
    .catch((err) => console.error(err));
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: parseFloat(document.getElementById("price").value),
  };

  const method = productId ? "PUT" : "POST";
  const url = productId ? API_URL + productId : API_URL;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Errore nel salvataggio");

    alert(productId ? "Prodotto aggiornato!" : "Prodotto creato!");
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert("Errore durante il salvataggio");
  }
});

deleteBtn.addEventListener("click", async () => {
  const confirmDelete = confirm("Vuoi davvero cancellare questo prodotto?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(API_URL + productId, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!res.ok) throw new Error("Errore nella cancellazione");

    alert("Prodotto eliminato");
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert("Errore durante la cancellazione");
  }
});
