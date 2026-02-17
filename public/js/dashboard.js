axios.get("/dashboard-data")
  .then(res => {
    document.getElementById("totalProducts").innerText = res.data.totalProducts;
    document.getElementById("totalSuppliers").innerText = res.data.totalSuppliers;

    const list = document.getElementById("lowStockList");
    res.data.lowStock.forEach(p => {
      const li = document.createElement("li");
      li.innerText = `${p.pro_name} - Qty: ${p.quantity}`;
      list.appendChild(li);
    });
  })
  .catch(() => {
    alert("Please login first");
    window.location.href = "/login.html";
  });
