const form = document.getElementById("supplierForm");
const list = document.getElementById("supplierList");

function loadSuppliers() {
  axios.get("/suppliers")
    .then(res => {
      list.innerHTML = "";
      res.data.forEach(s => {
        const li = document.createElement("li");
        li.innerText = `${s.sup_name} - ${s.sup_phone || ""}`;
        list.appendChild(li);
      });
    });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  axios.post("/suppliers", data)
    .then(() => {
      form.reset();
      loadSuppliers();
    });
});

loadSuppliers();
