const form = document.getElementById("productForm");
const list = document.getElementById("productList");
const supplierSelect = document.getElementById("supplierSelect");

axios.get("/suppliers")
  .then(res => {
    res.data.forEach(s => {
      const option = document.createElement("option");
      option.value = s.sup_id;
      option.text = s.sup_name;
      supplierSelect.appendChild(option);
    });
  });

function loadProducts() {
  axios.get("/products")
    .then(res => {
      list.innerHTML = "";
      res.data.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `
          ${p.pro_name} - Qty: ${p.quantity} - Supplier: ${p.sup_name || "N/A"}
          <button onclick="deleteProduct(${p.pro_id})">Delete</button>
        `;
        list.appendChild(li);
      });
    });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  axios.post("/products", data)
    .then(() => {
      form.reset();
      loadProducts();
    });
});

function deleteProduct(id) {
  axios.delete("/products/" + id).then(loadProducts);
}

loadProducts();
